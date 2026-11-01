---
layout: post_redesigned
title: Almost Optimal
date: 2026-08-14
---

The [International Invitational Math Optimization Challenge (IIMOC)](https://iimoc.org/) sources its problems from the [Frontier CS benchmark](https://arxiv.org/abs/2512.15699), a set of NP-hard optimization tasks where the global optimum is likely unknown. It is a team-based competition, and entrants are scored on how optimal a solution they can construct.

Competing solo, I placed **8th out of 306 teams** across **15,346 total submissions**, earning a gold medal. See the [final leaderboard](https://iimoc.org/leaderboard2026.html).

<div class="img-duo">
  <img class="duo-art" src="{{ '/assets/img/dexters-lab.png' | relative_url }}" alt="Dexter mixing a beaker in his lab" loading="lazy" width="362" height="282">
  <p class="duo-text">I think this was a fun change of pace from USACO/Codeforces problems because me and my fellow competitors kept pushing each others limits for better constructive solutions; I hope a whole category of competitive optimization contests grows around this idea.</p>
  <a class="repo-img" href="https://github.com/welu2027/IIMOC-2026" target="_blank" rel="noopener">
    <img src="{{ '/assets/img/iimoc-repo-octocat.png' | relative_url }}" alt="welu2027/IIMOC-2026 on GitHub" loading="lazy" width="1266" height="934">
  </a>
</div>

### Rectangle Approximation (99.19%)

Given $N \le 1000$ axis-aligned integer rectangles in $[-1000, 1000]$, possibly overlapping, and a budget $K \le N$, output exactly $K$ rectangles. With $A$ the union of the input and $B$ the union of the output, the score is

$$
\text{score} = \max\!\left(0,\; 1 - \frac{|A \triangle B|}{|A|}\right), \qquad |A \triangle B| = |A| + |B| - 2\,|A \cap B|,
$$

under a 5 s limit. $K$ is typically far below $N$, so overlapping rectangles have to be merged into fewer, better ones.

**Tactic.** Split the input into connected components, greedily place rectangles that stay inside the uncovered area, and give each next rectangle to whichever component gains the most from it. Edge sliding then closes the seams the greedy construction leaves behind.

### Chromatic Block Harmony (99.92%)

Given an array $a[1..n]$ of integers in $[0, 50]$ with $n \le 50000$ and a color budget $B \le 20$, select pairwise disjoint blocks (contiguous subarrays) and assign each a color in $[1, B]$ such that all blocks of one color have equal sum, maximizing

$$
\text{OBJ} = \alpha k - \beta C,
$$

for $k$ blocks and $C$ colors used, under a 3 s limit. Selecting nothing scores 0, which is sometimes optimal.

**Tactic.** Colors are really just distinct sums, so the problem reduces to choosing at most $B$ sums and packing as many disjoint blocks with those sums as possible. For fixed sums, earliest-finish-time greedy packs blocks exactly, so the only hard part is choosing the sums: start from the best single-element solution, add sums greedily, then refine with swaps.

### Certificate

<figure class="cert-embed">
  <img src="{{ '/assets/img/iimoc-2026-certificate.webp' | relative_url }}" alt="IIMOC 2026 gold award certificate for Wenhao Lu" loading="lazy" width="1840" height="1931">
</figure>
