// Cloudflare Worker for wenhao-lu.com.
//
// Static files in _site are served by Workers Assets before this code runs.
// The only route handled here is GET /api/fantasy, which reads the ESPN
// fantasy basketball league server-side (ESPN does not allow browsers on
// other sites to call it directly) and returns a trimmed JSON for /fantasy/.
//
// Config (wrangler.jsonc "vars"): ESPN_LEAGUE_ID, ESPN_TEAM_ID, ESPN_SEASON
// Secrets, only needed while the league is private (Cloudflare dashboard →
// Workers → wenhao-lu-com → Settings → Variables and Secrets, type "Secret"):
//   ESPN_S2   – value of the espn_s2 cookie on espn.com
//   ESPN_SWID – value of the SWID cookie, e.g. {XXXXXXXX-XXXX-...}

import { shapeLeague } from "./espn.js";

const ESPN_API = "https://lm-api-reads.fantasy.espn.com/apis/v3/games/fba";
const VIEWS = ["mTeam", "mRoster", "mMatchupScore", "mSettings", "mStandings"];
const FRESH_SECONDS = 300; // serve from cache for 5 minutes
const STALE_SECONDS = 60 * 60 * 24 * 14; // keep a last-good copy for 2 weeks

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === "/api/fantasy" || url.pathname === "/api/fantasy/") {
      return handleFantasy(request, env, ctx, url);
    }
    return env.ASSETS.fetch(request);
  },
};

function json(body, status, maxAge) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": maxAge ? `public, max-age=${maxAge}` : "no-store",
    },
  });
}

async function handleFantasy(request, env, ctx, url) {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return json({ ok: false, error: "method_not_allowed" }, 405);
  }

  const cache = caches.default;
  const freshKey = new Request(`${url.origin}/api/fantasy?v=fresh`);
  const staleKey = new Request(`${url.origin}/api/fantasy?v=last-good`);

  const cached = await cache.match(freshKey);
  if (cached) return cached;

  const leagueId = env.ESPN_LEAGUE_ID;
  const teamId = Number(env.ESPN_TEAM_ID);
  const season = env.ESPN_SEASON;
  if (!leagueId || !teamId || !season) {
    return json({ ok: false, error: "not_configured" }, 500);
  }

  let payload;
  try {
    payload = await loadFromEspn(env, leagueId, teamId, season);
  } catch (err) {
    console.error("fantasy:", err.code || "", err.message);
    const stale = await cache.match(staleKey);
    if (stale) {
      const body = await stale.json();
      const res = json({ ...body, stale: true }, 200, 60);
      ctx.waitUntil(cache.put(freshKey, res.clone())); // retry ESPN in a minute, not every request
      return res;
    }
    const status = err.code === "PRIVATE_LEAGUE" ? 503 : 502;
    return json({ ok: false, error: err.code || "espn_unavailable" }, status);
  }

  const body = { ...payload, updated: new Date().toISOString() };
  const fresh = json(body, 200, FRESH_SECONDS);
  ctx.waitUntil(Promise.all([cache.put(freshKey, fresh.clone()), cache.put(staleKey, json(body, 200, STALE_SECONDS))]));
  return fresh;
}

async function loadFromEspn(env, leagueId, teamId, season) {
  const qs = VIEWS.map((v) => `view=${v}`).join("&");
  const endpoint = `${ESPN_API}/seasons/${season}/segments/0/leagues/${leagueId}?${qs}`;
  const headers = {
    accept: "application/json",
    "user-agent": "wenhao-lu.com fantasy widget",
  };
  if (env.ESPN_S2 && env.ESPN_SWID) {
    const swid = env.ESPN_SWID.trim().replace(/^\{?/, "{").replace(/\}?$/, "}");
    headers.cookie = `espn_s2=${env.ESPN_S2.trim()}; SWID=${swid}`;
  }

  const res = await fetch(endpoint, { headers, cf: { cacheTtl: 0 } });
  if (res.status === 401 || res.status === 403) {
    const err = new Error(`ESPN returned ${res.status}; league is private and cookies are missing or expired`);
    err.code = "PRIVATE_LEAGUE";
    throw err;
  }
  if (!res.ok) {
    const err = new Error(`ESPN returned ${res.status}`);
    err.code = "espn_unavailable";
    throw err;
  }
  return shapeLeague(await res.json(), teamId);
}
