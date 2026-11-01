// Serves the static site, plus one route that reads my private ESPN fantasy
// team. The ESPN cookies stay here as Worker secrets and never reach the browser.
const ESPN_API = "https://lm-api-reads.fantasy.espn.com/apis/v3/games/fba/seasons";
const CACHE_SECONDS = 900;
const BENCH_SLOT = 12;
const POSITIONS = { 1: "PG", 2: "SG", 3: "SF", 4: "PF", 5: "C" };
const INJURIES = { OUT: "O", DAY_TO_DAY: "DTD", SUSPENSION: "SSPD" };

function json(body, status = 200) {
  const headers = { "content-type": "application/json; charset=utf-8" };
  headers["cache-control"] = status === 200 ? `public, max-age=${CACHE_SECONDS}` : "no-store";
  return new Response(JSON.stringify(body), { status, headers });
}

function round(value) {
  return typeof value === "number" ? Math.round(value * 10) / 10 : null;
}

// allowlist the fields so nothing else from ESPN's response is ever public
export function shapeTeam(league, teamId, season) {
  const team = league.teams.find((t) => t.id === teamId);
  if (!team) return null;
  const record = team.record?.overall ?? {};
  const entries = team.roster?.entries ?? [];
  const roster = entries.map((entry) => {
    const pool = entry.playerPoolEntry ?? {};
    const player = pool.player ?? {};
    const stats = (player.stats ?? []).find((s) => s.seasonId === season && s.statSourceId === 0 && s.statSplitTypeId === 0);
    return {
      name: player.fullName ?? "unknown",
      position: POSITIONS[player.defaultPositionId] ?? "",
      injury: INJURIES[player.injuryStatus] ?? "",
      starter: entry.lineupSlotId < BENCH_SLOT,
      average: round(stats?.appliedAverage),
      total: round(pool.appliedStatTotal),
    };
  });
  roster.sort((a, b) => Number(b.starter) - Number(a.starter) || (b.average ?? 0) - (a.average ?? 0));
  return {
    wins: record.wins ?? 0,
    losses: record.losses ?? 0,
    ties: record.ties ?? 0,
    points: round(record.pointsFor ?? team.points),
    rank: team.playoffSeed ?? null,
    teams: league.teams.length,
    roster,
  };
}

async function fantasy(request, env, ctx) {
  if (request.method !== "GET") return json({ error: "method not allowed" }, 405);
  if (!env.ESPN_S2 || !env.ESPN_SWID) return json({ error: "not configured" }, 503);

  const cache = caches.default;
  const cacheKey = new Request(new URL("/api/fantasy", request.url));
  const cached = await cache.match(cacheKey);
  if (cached) return cached;

  const season = Number(env.ESPN_SEASON);
  const url = `${ESPN_API}/${season}/segments/0/leagues/${env.ESPN_LEAGUE}?view=mTeam&view=mRoster`;
  let espn;
  try {
    espn = await fetch(url, {
      headers: { accept: "application/json", cookie: `espn_s2=${env.ESPN_S2}; SWID=${env.ESPN_SWID}` },
    });
  } catch (err) {
    console.error(JSON.stringify({ message: "espn request failed", error: String(err) }));
    return json({ error: "upstream unavailable" }, 502);
  }
  if (!espn.ok) {
    // 401 here means the cookies expired and need replacing
    console.error(JSON.stringify({ message: "espn rejected request", status: espn.status }));
    return json({ error: "upstream rejected request" }, 502);
  }

  const team = shapeTeam(await espn.json(), Number(env.ESPN_TEAM), season);
  if (!team) return json({ error: "team not found" }, 404);
  const response = json(team);
  ctx.waitUntil(cache.put(cacheKey, response.clone()));
  return response;
}

export default {
  async fetch(request, env, ctx) {
    if (new URL(request.url).pathname === "/api/fantasy") return fantasy(request, env, ctx);
    return env.ASSETS.fetch(request);
  },
};
