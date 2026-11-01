// Turns ESPN's fantasy basketball league payload into the small, public-safe
// shape that /fantasy/ renders. Only one team's roster and its own matchups
// are kept; league members, other rosters and transactions are dropped.

// defaultPositionId (1-based)
const POSITION = { 1: "PG", 2: "SG", 3: "SF", 4: "PF", 5: "C", 6: "G", 7: "F" };

// lineupSlotId
const SLOT = {
  0: "PG",
  1: "SG",
  2: "SF",
  3: "PF",
  4: "C",
  5: "G",
  6: "F",
  7: "SG/SF",
  8: "G/F",
  9: "PF/C",
  10: "F/C",
  11: "UT",
  12: "BE",
  13: "IR",
};

const PRO_TEAM = {
  0: "FA",
  1: "ATL",
  2: "BOS",
  3: "NOP",
  4: "CHI",
  5: "CLE",
  6: "DAL",
  7: "DEN",
  8: "DET",
  9: "GSW",
  10: "HOU",
  11: "IND",
  12: "LAC",
  13: "LAL",
  14: "MIA",
  15: "MIL",
  16: "MIN",
  17: "BKN",
  18: "NYK",
  19: "ORL",
  20: "PHI",
  21: "PHX",
  22: "POR",
  23: "SAC",
  24: "SAS",
  25: "OKC",
  26: "UTA",
  27: "WAS",
  28: "TOR",
  29: "MEM",
  30: "CHA",
};

const INJURY = {
  OUT: "OUT",
  DAY_TO_DAY: "DTD",
  QUESTIONABLE: "Q",
  DOUBTFUL: "D",
  PROBABLE: "P",
  SUSPENSION: "SUSP",
  INJURY_RESERVE: "IR",
};

// ESPN stat ids used for the per-game line
const STAT = { pts: "0", blk: "1", stl: "2", ast: "3", reb: "6", tov: "11", tpm: "17", min: "40", gp: "42" };

const round = (n, d = 1) => (Number.isFinite(n) ? Math.round(n * 10 ** d) / 10 ** d : null);

function teamName(t) {
  if (!t) return "BYE";
  return t.name || [t.location, t.nickname].filter(Boolean).join(" ") || t.abbrev || `Team ${t.id}`;
}

function findSplit(stats, season, source, split) {
  return (stats || []).find((s) => s.seasonId === season && s.statSourceId === source && s.statSplitTypeId === split);
}

// Fantasy points for a split: ESPN's own number when present, otherwise
// worked out from the league's scoring rules.
function fantasyPoints(split, scoringItems) {
  if (!split) return { total: null, avg: null };
  const gp = split.stats?.[STAT.gp] || 0;
  let total = split.appliedTotal;
  let avg = split.appliedAverage;
  if (!Number.isFinite(total) && scoringItems.length && split.stats) {
    total = scoringItems.reduce((sum, it) => sum + (split.stats[String(it.statId)] || 0) * (it.points || 0), 0);
  }
  if (!Number.isFinite(avg) && Number.isFinite(total)) avg = gp ? total / gp : 0;
  return { total: round(total), avg: round(avg) };
}

function shapePlayer(entry, season, scoringItems) {
  const ppe = entry.playerPoolEntry || {};
  const p = ppe.player || {};
  const seasonSplit = findSplit(p.stats, season, 0, 0);
  const last7Split = findSplit(p.stats, season, 0, 1);
  const fp = fantasyPoints(seasonSplit, scoringItems);
  const fp7 = fantasyPoints(last7Split, scoringItems);
  if (fp.total == null && Number.isFinite(ppe.appliedStatTotal)) fp.total = round(ppe.appliedStatTotal);

  const avg = seasonSplit?.averageStats || {};
  const gp = seasonSplit?.stats?.[STAT.gp] ?? avg[STAT.gp] ?? 0;
  const injuryRaw = p.injuryStatus || entry.injuryStatus || "ACTIVE";
  const slotId = entry.lineupSlotId;
  const positions = (p.eligibleSlots || []).filter((s) => s >= 0 && s <= 4).map((s) => SLOT[s]);

  return {
    id: entry.playerId ?? p.id,
    name: p.fullName || "Unknown player",
    pos: positions.length ? positions.join("/") : POSITION[p.defaultPositionId] || "",
    team: PRO_TEAM[p.proTeamId] || "",
    slot: SLOT[slotId] ?? "",
    group: slotId === 13 ? "ir" : slotId === 12 ? "bench" : "starter",
    slotOrder: slotId ?? 99,
    injury: INJURY[injuryRaw] || null,
    fpts: fp.total,
    fptsAvg: fp.avg,
    last7Avg: fp7.avg,
    gp,
    line: {
      pts: round(avg[STAT.pts]),
      reb: round(avg[STAT.reb]),
      ast: round(avg[STAT.ast]),
      stl: round(avg[STAT.stl]),
      blk: round(avg[STAT.blk]),
      tpm: round(avg[STAT.tpm]),
      min: round(avg[STAT.min]),
    },
  };
}

function sideScore(side) {
  if (!side) return null;
  const live = side.totalPointsLive;
  const pts = Number.isFinite(live) ? live : side.totalPoints;
  const cs = side.cumulativeScore;
  return {
    pts: round(pts),
    cats: cs && cs.scoreByStat ? { w: cs.wins || 0, l: cs.losses || 0, t: cs.ties || 0 } : null,
  };
}

export function shapeLeague(raw, teamId) {
  const season = raw.seasonId;
  const settings = raw.settings || {};
  const scoring = settings.scoringSettings || {};
  const scoringType = scoring.scoringType || "";
  const scoringItems = scoring.scoringItems || [];
  const isPoints = !/CATEGOR|ROTO/i.test(scoringType);
  const teams = raw.teams || [];
  const byId = new Map(teams.map((t) => [t.id, t]));
  const me = byId.get(teamId);
  if (!me) {
    const err = new Error(`Team ${teamId} is not in league ${raw.id}`);
    err.code = "TEAM_NOT_FOUND";
    throw err;
  }

  const overall = (t) => t.record?.overall || {};
  const rec = overall(me);

  // standing: ESPN's playoff seed when it has one, otherwise win % then points
  const seeded = teams.every((t) => t.playoffSeed > 0);
  const standings = [...teams].sort((a, b) =>
    seeded
      ? a.playoffSeed - b.playoffSeed
      : (overall(b).percentage || 0) - (overall(a).percentage || 0) || (overall(b).pointsFor || 0) - (overall(a).pointsFor || 0)
  );
  const pointsOrder = [...teams].sort((a, b) => (overall(b).pointsFor || 0) - (overall(a).pointsFor || 0));

  const currentPeriod = raw.status?.currentMatchupPeriod ?? null;
  const matchups = (raw.schedule || [])
    .filter((m) => m.home?.teamId === teamId || m.away?.teamId === teamId)
    .filter((m) => currentPeriod == null || m.matchupPeriodId <= currentPeriod)
    .map((m) => {
      const home = m.home?.teamId === teamId;
      const mine = home ? m.home : m.away;
      const theirs = home ? m.away : m.home;
      let result = null;
      if (m.winner && m.winner !== "UNDECIDED") {
        result = m.winner === "TIE" ? "T" : (m.winner === "HOME") === home ? "W" : "L";
      }
      return {
        period: m.matchupPeriodId,
        playoff: Boolean(m.playoffTierType && m.playoffTierType !== "NONE"),
        opp: theirs ? teamName(byId.get(theirs.teamId)) : "BYE",
        oppAbbrev: theirs ? byId.get(theirs.teamId)?.abbrev || "" : "",
        my: sideScore(mine),
        oppScore: sideScore(theirs),
        result,
      };
    })
    .sort((a, b) => a.period - b.period);

  const current = matchups.find((m) => m.period === currentPeriod && !m.result) || null;
  const log = matchups.filter((m) => m.result);

  const roster = (me.roster?.entries || [])
    .map((e) => shapePlayer(e, season, scoringItems))
    .sort((a, b) => {
      const g = { starter: 0, bench: 1, ir: 2 };
      if (g[a.group] !== g[b.group]) return g[a.group] - g[b.group];
      if (a.group === "starter") return a.slotOrder - b.slotOrder;
      return (b.fptsAvg ?? -1) - (a.fptsAvg ?? -1);
    })
    .map(({ slotOrder, ...p }) => p);

  return {
    ok: true,
    league: {
      name: settings.name || "",
      size: settings.size || teams.length,
      season,
      scoringType,
      isPoints,
      matchupPeriod: currentPeriod,
      matchupPeriods: settings.scheduleSettings?.matchupPeriodCount ?? null,
    },
    team: {
      id: me.id,
      name: teamName(me),
      abbrev: me.abbrev || "",
      record: { w: rec.wins || 0, l: rec.losses || 0, t: rec.ties || 0 },
      pointsFor: round(rec.pointsFor),
      pointsAgainst: round(rec.pointsAgainst),
      streak: rec.streakLength ? { type: rec.streakType === "LOSS" ? "L" : "W", len: rec.streakLength } : null,
      rank: standings.indexOf(me) + 1,
      pointsRank: pointsOrder.indexOf(me) + 1,
    },
    current,
    log,
    roster,
  };
}
