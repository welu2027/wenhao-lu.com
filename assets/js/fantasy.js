// Renders /fantasy/ from the site's own /api/fantasy endpoint (see _worker/).
(function () {
  "use strict";

  var root = document.getElementById("ff-root");
  var leagueLabel = document.getElementById("ff-league");
  if (!root) return;

  var GROUP_LABEL = { bench: "bench", ir: "injured reserve" };

  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function num(n, digits) {
    if (n == null || !isFinite(n)) return "—";
    var d = digits == null ? 1 : digits;
    return Number(n).toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });
  }

  function ordinal(n) {
    var s = ["th", "st", "nd", "rd"];
    var v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }

  function ago(iso) {
    var mins = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
    if (!isFinite(mins) || mins < 1) return "just now";
    if (mins < 60) return mins + " min ago";
    var hrs = Math.round(mins / 60);
    if (hrs < 48) return hrs + " h ago";
    return Math.round(hrs / 24) + " days ago";
  }

  function record(r) {
    return r.w + "–" + r.l + (r.t ? "–" + r.t : "");
  }

  function sectionHead(title, aside) {
    return (
      '<div class="section-head"><h2 class="section-title">' +
      esc(title) +
      '</h2><div class="section-rule"></div>' +
      (aside ? '<span class="section-aside">' + esc(aside) + "</span>" : "") +
      "</div>"
    );
  }

  function teamBlock(d) {
    var t = d.team;
    var cells = [
      ["record", esc(record(t.record))],
      ["standing", esc(ordinal(t.rank)) + "<small>of " + esc(d.league.size) + "</small>"],
    ];
    if (d.league.isPoints) {
      cells.push(["fantasy pts", esc(num(t.pointsFor)) + "<small>" + esc(ordinal(t.pointsRank)) + "</small>"]);
    }
    cells.push(["streak", t.streak ? esc(t.streak.type + t.streak.len) : "—"]);
    return (
      '<section class="ff-team"><div class="ff-kicker">' +
      esc(d.league.name || "espn fantasy basketball") +
      '</div><h2 class="ff-team-name">' +
      esc(t.name) +
      '</h2><dl class="ff-stats">' +
      cells
        .map(function (c) {
          return "<div><dt>" + c[0] + "</dt><dd>" + c[1] + "</dd></div>";
        })
        .join("") +
      "</dl></section>"
    );
  }

  function scoreText(side, isPoints) {
    if (!side) return "—";
    if (!isPoints && side.cats) return side.cats.w + "-" + side.cats.l + "-" + side.cats.t;
    return num(side.pts);
  }

  function matchupBlock(d) {
    var m = d.current;
    if (!m) return "";
    var isPoints = d.league.isPoints;
    var mine = m.my || {};
    var theirs = m.oppScore || {};
    var a = isPoints ? mine.pts || 0 : mine.cats ? mine.cats.w + mine.cats.t / 2 : 0;
    var b = isPoints ? theirs.pts || 0 : theirs.cats ? theirs.cats.w + theirs.cats.t / 2 : 0;
    var share = a + b > 0 ? Math.round((a / (a + b)) * 100) : 50;
    var diff = a - b;
    var note;
    if (m.opp === "BYE") note = "bye week";
    else if (diff === 0) note = "dead even so far";
    else note = (diff > 0 ? "up " : "down ") + (isPoints ? num(Math.abs(diff)) + " pts" : Math.abs(diff) + " cats");

    return (
      "<section>" +
      sectionHead("this week", "matchup " + m.period + (m.playoff ? " · playoffs" : "") + " · live") +
      '<div class="ff-score">' +
      '<div class="ff-side is-me"><span class="ff-side-name">' +
      esc(d.team.name) +
      "</span><b>" +
      esc(scoreText(mine, isPoints)) +
      "</b></div>" +
      '<div class="ff-vs">vs</div>' +
      '<div class="ff-side is-opp"><span class="ff-side-name">' +
      esc(m.opp) +
      "</span><b>" +
      esc(scoreText(theirs, isPoints)) +
      "</b></div>" +
      '<div class="ff-bar" role="img" aria-label="' +
      esc(share) +
      '% of the points this week"><i style="width:' +
      share +
      '%"></i></div>' +
      '<p class="ff-note">' +
      esc(note) +
      "</p></div></section>"
    );
  }

  function playerRow(p, isPoints) {
    var tag = "";
    if (p.injury) {
      tag = '<span class="ff-tag' + (p.injury === "OUT" || p.injury === "IR" ? " is-out" : "") + '">' + esc(p.injury) + "</span>";
    }
    var line = p.line || {};
    var bits = [esc(p.pos), esc(p.team)];
    if (p.gp) bits.push(esc(num(line.pts)) + " pts · " + esc(num(line.reb)) + " reb · " + esc(num(line.ast)) + " ast");
    var trend = "";
    if (p.gp && p.last7Avg != null && p.fptsAvg != null && Math.abs(p.last7Avg - p.fptsAvg) >= 3) {
      trend = p.last7Avg > p.fptsAvg ? ' class="ff-up"' : ' class="ff-down"';
    }

    var cells =
      '<td class="ff-slot">' +
      esc(p.slot) +
      '</td><td class="ff-player"><span class="ff-name">' +
      esc(p.name) +
      "</span>" +
      tag +
      '<span class="ff-sub">' +
      bits.join(" · ") +
      "</span></td>";

    if (isPoints) {
      cells +=
        '<td class="ff-avg">' +
        (p.gp ? esc(num(p.fptsAvg)) : "—") +
        "</td><td>" +
        (p.gp ? esc(num(p.fpts, 0)) : "—") +
        '</td><td class="ff-wide"><span' +
        trend +
        ">" +
        (p.gp ? esc(num(p.last7Avg)) : "—") +
        "</span></td>";
    } else {
      cells += "<td>" + esc(num(line.stl)) + "</td><td>" + esc(num(line.blk)) + '</td><td class="ff-wide">' + esc(num(line.tpm)) + "</td>";
    }
    cells += '<td class="ff-wide">' + esc(p.gp || 0) + "</td>";
    return '<tr class="is-' + esc(p.group) + '">' + cells + "</tr>";
  }

  function rosterBlock(d) {
    var isPoints = d.league.isPoints;
    var head = isPoints
      ? '<th>slot</th><th>player</th><th title="fantasy points per game">fp/g</th><th title="season fantasy points">total</th><th class="ff-wide" title="fantasy points per game, last 7 days">last 7</th><th class="ff-wide">gp</th>'
      : '<th>slot</th><th>player</th><th>stl</th><th>blk</th><th class="ff-wide">3pm</th><th class="ff-wide">gp</th>';
    var rows = [];
    var lastGroup = "starter";
    d.roster.forEach(function (p) {
      if (p.group !== lastGroup && GROUP_LABEL[p.group]) {
        rows.push('<tr class="ff-group"><td colspan="6">' + GROUP_LABEL[p.group] + "</td></tr>");
        lastGroup = p.group;
      }
      rows.push(playerRow(p, isPoints));
    });
    return (
      "<section>" +
      sectionHead("roster", d.roster.length + " players") +
      '<table class="ff-table"><thead><tr>' +
      head +
      "</tr></thead><tbody>" +
      rows.join("") +
      "</tbody></table></section>"
    );
  }

  function logBlock(d) {
    if (!d.log || !d.log.length) return "";
    var isPoints = d.league.isPoints;
    var max = 0;
    d.log.forEach(function (m) {
      max = Math.max(max, (m.my && m.my.pts) || 0, (m.oppScore && m.oppScore.pts) || 0);
    });
    var items = d.log
      .slice()
      .reverse()
      .map(function (m) {
        var mine = (m.my && m.my.pts) || 0;
        var theirs = (m.oppScore && m.oppScore.pts) || 0;
        var bars =
          isPoints && max > 0
            ? '<span class="ff-bars" aria-hidden="true"><i class="is-me" style="width:' +
              Math.round((mine / max) * 100) +
              '%"></i><i style="width:' +
              Math.round((theirs / max) * 100) +
              '%"></i></span>'
            : "<span></span>";
        return (
          '<li><span class="ff-wk">wk ' +
          esc(m.period) +
          '</span><span class="ff-res' +
          (m.result === "W" ? " is-w" : "") +
          '">' +
          esc(m.result) +
          "</span>" +
          bars +
          '<span class="ff-log-score">' +
          esc(scoreText(m.my, isPoints)) +
          " – " +
          esc(scoreText(m.oppScore, isPoints)) +
          "<small>vs " +
          esc(m.opp) +
          "</small></span></li>"
        );
      })
      .join("");
    return "<section>" + sectionHead("season log", record(d.team.record)) + '<ol class="ff-log">' + items + "</ol></section>";
  }

  function render(d) {
    var seasonLabel = d.league.season ? d.league.season - 1 + "–" + String(d.league.season).slice(2) : "";
    if (leagueLabel) leagueLabel.textContent = "nba " + seasonLabel + " · espn fantasy";
    root.innerHTML =
      teamBlock(d) +
      matchupBlock(d) +
      rosterBlock(d) +
      logBlock(d) +
      '<p class="ff-foot">' +
      (d.stale ? "showing the last saved numbers · " : "") +
      "updated " +
      esc(ago(d.updated)) +
      " · data from ESPN Fantasy</p>";
    root.setAttribute("aria-busy", "false");
  }

  function fail(reason) {
    if (window.console) console.warn("fantasy:", reason);
    root.innerHTML = '<p class="ff-empty">The roster is taking a timeout right now. Check back soon.</p>';
    root.setAttribute("aria-busy", "false");
  }

  fetch("/api/fantasy", { headers: { accept: "application/json" } })
    .then(function (res) {
      return res.json().then(
        function (body) {
          return { res: res, body: body };
        },
        function () {
          return { res: res, body: null };
        }
      );
    })
    .then(function (r) {
      if (!r.res.ok || !r.body || !r.body.ok) return fail((r.body && r.body.error) || "HTTP " + r.res.status);
      render(r.body);
    })
    .catch(function (err) {
      fail(err && err.message);
    });
})();
