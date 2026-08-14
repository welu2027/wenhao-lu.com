---
layout: post_redesigned
title: IIMOC 2026 gold medal writeup
date: 2026-08-14
---

The [International Invitational Math Optimization Challenge (IIMOC)](https://iimoc.org/) sources its problems from the [Frontier CS benchmark](https://arxiv.org/abs/2512.15699), a set of NP-hard optimization tasks where the global optimum is likely unknown. Entrants are scored on how good a solution they can construct rather than proving optimality.

Competing solo, I placed **8th out of 306 teams** across **15,346 total submissions**, earning a gold medal. See the [final leaderboard](https://iimoc.org/leaderboard2026.html).

<div class="img-duo">
  <img class="duo-art" src="{{ '/assets/img/dexters-lab.png' | relative_url }}" alt="Dexter mixing a beaker in his lab" loading="lazy" width="362" height="282">
  <p class="duo-text">I think this was a fun change of pace from USACO/Codeforces problems because we kept pushing each others limits for better constructive solutions; I hope a whole category of competitive optimization contests grows around this idea.</p>
  <a class="repo-img" href="https://github.com/welu2027/IIMOC-2026" target="_blank" rel="noopener">
    <img src="{{ '/assets/img/iimoc-repo-octocat.png' | relative_url }}" alt="welu2027/IIMOC-2026 on GitHub" loading="lazy" width="1266" height="934">
  </a>
</div>

### Solutions

<figure class="paper-scroll">
  {% for n in (1..9) %}
    {% assign num = n | prepend: '0' | slice: -2, 2 %}
    <img src="{{ '/assets/img/iimoc-solutions/page-' | append: num | append: '.webp' | relative_url }}" alt="IIMOC 2026 solutions, page {{ n }} of 9" loading="lazy" width="1400" height="1812">
  {% endfor %}
</figure>

### Certificate

<figure class="cert-embed">
  <img src="{{ '/assets/img/iimoc-2026-certificate.webp' | relative_url }}" alt="IIMOC 2026 gold award certificate for Wenhao Lu" loading="lazy" width="1840" height="1931">
</figure>
