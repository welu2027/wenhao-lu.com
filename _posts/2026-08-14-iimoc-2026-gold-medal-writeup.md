---
layout: post_redesigned
title: IIMOC 2026 gold medal writeup
date: 2026-08-14
---

The [International Invitational Math Optimization Challenge (IIMOC)](https://iimoc.org/) sources its problems from the [Frontier CS benchmark](https://arxiv.org/abs/2512.15699), a set of NP-hard optimization tasks where the global optimum is likely unknown. It is a team-based competition, and entrants are scored on how good a solution they can construct rather than proving optimality.

Competing solo, I placed **8th out of 306 teams** across **15,346 total submissions**, earning a gold medal. See the [final leaderboard](https://iimoc.org/leaderboard2026.html).

<div class="img-duo">
  <img class="duo-art" src="{{ '/assets/img/dexters-lab.png' | relative_url }}" alt="Dexter mixing a beaker in his lab" loading="lazy" width="362" height="282">
  <p class="duo-text">I think this was a fun change of pace from USACO/Codeforces problems because we kept pushing each others limits for better constructive solutions; I hope a whole category of competitive optimization contests grows around this idea.</p>
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

**Tactic.** A union-find pass splits the input into connected components solved independently, which is also where most of the speed comes from: a component of $m$ rectangles has a compressed grid of at most $(2m-1) \times (2m-1)$ cells. Inside a component, rectangles are placed greedily under a _zero-excess_ rule, restricting candidates to lie entirely within the uncovered part of $A$ so the best one falls out of a largest-rectangle-under-a-histogram sweep in $O(n_x n_y)$. That beat the more expressive _max-gain_ rule (new area minus wasted area, i.e. maximum-sum subrectangle in $O(n_x^2 n_y)$) by roughly $25\times$ in speed and on score, because swallowing excess early distorts the residual problem every later placement sees.

$K$ is then spread across components by always granting the next rectangle to the largest pending marginal gain, the standard greedy for monotone submodular maximization. The detail that mattered most: every component starts at budget _zero_. Guaranteeing each one a rectangle looks safe but starves the large components when $K$ is near the cluster count, and dropping that floor was worth $+0.0245$ average score. Finally, edge sliding closes the seams greedy construction leaves behind, optimizing each of a rectangle's four edges in turn with the other three fixed, coordinate descent with exact $O(1)$ per-cell move evaluation, worth about $+0.011$.

### Chromatic Block Harmony (99.92%)

Given an array $a[1..n]$ of integers in $[0, 50]$ with $n \le 50000$ and a color budget $B \le 20$, select pairwise disjoint blocks (contiguous subarrays) and assign each a color in $[1, B]$ such that all blocks of one color have equal sum, maximizing

$$
\text{OBJ} = \alpha k - \beta C,
$$

for $k$ blocks and $C$ colors used, under a 3 s limit. Selecting nothing scores 0, which is sometimes optimal.

**Tactic.** The equal-sum constraint makes the color labels immaterial: relabel so that each color _is_ a distinct sum, and any assignment of blocks to at most $B$ sums is feasible. So the problem is exactly:

> choose a set $S$ of at most $B$ sums, then select a maximum number of pairwise disjoint blocks whose sums lie in $S$.

The inner packing problem is interval scheduling, which the earliest-finish-time greedy solves _exactly_, so all of the approximation lives in the choice of $S$. Blocks of a fixed sum are enumerated with prefix sums and binary search, breaking ties toward the shortest block at each right endpoint. Selection runs in three phases: an exact single-element baseline, where disjointness is automatic, the objective decomposes as $\alpha \sum_{v \in S} \text{freq}(v) - \beta \lvert S \rvert$, and a frequency-sorted greedy is optimal; incremental greedy addition of sums, kept affordable by maintaining a merge of the chosen blocks sorted by right endpoint so each candidate costs one merge plus one sweep instead of a rebuild; and budgeted swap refinement, with prefix and suffix merges precomputed so removing a sum costs one merge rather than $B$.

### Certificate

<figure class="cert-embed">
  <img src="{{ '/assets/img/iimoc-2026-certificate.webp' | relative_url }}" alt="IIMOC 2026 gold award certificate for Wenhao Lu" loading="lazy" width="1840" height="1931">
</figure>
