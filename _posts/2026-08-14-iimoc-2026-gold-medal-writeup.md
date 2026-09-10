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

### Rectangle Approximation — 99.19%

Given $N \le 1000$ axis-aligned integer rectangles with coordinates in $[-1000, 1000]$, possibly overlapping, and a budget $K \le N$, output exactly $K$ axis-aligned integer rectangles. Let $A$ be the union of the input and $B$ the union of the output. The score is

$$
\text{score} = \max\!\left(0,\; 1 - \frac{|A \triangle B|}{|A|}\right), \qquad |A \triangle B| = |A| + |B| - 2\,|A \cap B|,
$$

under a 5 s time limit. The budget always suffices to touch every cluster but is typically far below $N$, so overlapping rectangles have to be merged into fewer, better ones.

**Tactic.** Rectangles whose interiors don't intersect, directly or transitively, can't affect each other's contribution, so a union-find pass splits the input into connected components solved independently — which is also where most of the speed comes from, since each component's grid is tiny. Coordinates are compressed, so a component of $m$ rectangles yields at most a $(2m-1) \times (2m-1)$ grid regardless of geometric extent.

Within a component, output rectangles are placed greedily. I tried two value functions: **max gain**, where a candidate's value is new area of $A$ covered minus area wasted outside $A$ (exactly the maximum-sum subrectangle problem, $O(n_x^2 n_y)$ via Kadane), and **zero excess**, where candidates are restricted to lie entirely inside the uncovered part of $A$, so value is plain area and the best one falls out of the stack-based largest-rectangle-in-a-histogram sweep in $O(n_x n_y)$. The weaker primitive won — roughly $25\times$ faster and a higher final score — because a max-gain rectangle that swallows excess distorts the residual problem every later placement sees, whereas zero-excess placements leave a clean residual and defer boundary decisions to the local search, which evaluates them exactly.

Allocating $K$ across components reduces to repeatedly granting the next rectangle to whichever component has the largest pending marginal gain, the classical greedy for monotone submodular maximization, implemented as a max-heap in $O((N+K)\log C)$. The detail that mattered most: every component starts at budget _zero_. Guaranteeing each component one rectangle looks safe, but when $K$ is near the cluster count it starves the large components — letting a big component's second and third rectangles outbid a small one's first was worth $+0.0245$ average score, the single largest architectural win.

Greedy construction leaves seams of uncovered area between adjacent placements, since zero-excess rectangles never cross the boundary of what's already covered. An **edge-sliding** local search fixes this: for each output rectangle, each of its four edges is optimized in turn while the other three stay fixed, coordinate descent until the time slice expires. Move values are exact and $O(1)$ per cell from two arrays — `signed[c]` ($\pm$ area depending on whether cell $c$ is inside $A$) and `coverage[c]`, the number of output rectangles containing $c$. It grows rectangles across the seams, accepting slivers of excess in exchange for more coverage, worth about $+0.011$ average.

### Chromatic Block Harmony — 99.92%

Given an array $a[1..n]$ of integers in $[0, 50]$ with $n \le 50000$, and a color budget $B \le 20$, select a set of pairwise disjoint blocks (contiguous subarrays) and assign each a color in $[1, B]$ such that all blocks of one color have equal sum. The objective is

$$
\text{OBJ} = \alpha k - \beta C,
$$

where $k$ is the number of blocks, $C$ the number of colors used, $\alpha \le 10^9$ the per-block reward, and $\beta \le 5 \times 10^8$ the per-color penalty. Selecting nothing scores 0, which is sometimes optimal. Time limit 3 s.

**Tactic.** The equal-sum constraint makes the color labels themselves immaterial: any feasible coloring can be relabeled so each color _is_ a distinct sum value, and conversely any assignment of blocks to at most $B$ sums is feasible. So the problem is exactly:

> choose a set $S$ of at most $B$ sums, then select a maximum number of pairwise disjoint blocks whose sums lie in $S$.

The inner packing problem is interval scheduling, and the earliest-finish-time greedy solves it _exactly_ — sort candidate blocks by right endpoint, take each block that doesn't overlap the last one taken. All the approximation therefore lives in the choice of $S$; given $S$, packing is optimal in linear time. Blocks of a fixed sum $s$ are enumerated with prefix sums (a block starting at $L$ with sum $s$ ends where $P[r] = P[L-1] + s$, found by binary search), with ties broken toward the shortest block at each $r$, which is the one most useful to the scheduler.

Selection then runs in three phases. **Phase 1** restricts to single-element blocks, where disjointness is automatic and the objective decomposes as $\alpha \sum_{v \in S} \text{freq}(v) - \beta \lvert S \rvert$, optimized exactly by a frequency-sorted greedy — an instant lower bound that is often optimal outright when $\beta$ is large relative to $\alpha$. **Phase 2** adds sums to $S$ one at a time, each chosen to maximize the resulting objective; the enabling structure is an incrementally maintained merge of the chosen sums' block lists kept sorted by right endpoint, so evaluating a candidate is one linear merge plus one scheduling sweep instead of a rebuild. **Phase 3** tentatively swaps each chosen sum for each unchosen candidate, with prefix and suffix merges precomputed so removing the $i$-th sum costs one merge rather than $B$, running under a 2.4 s budget and stopping as soon as a full pass finds no improving swap.

### Certificate

<figure class="cert-embed">
  <img src="{{ '/assets/img/iimoc-2026-certificate.webp' | relative_url }}" alt="IIMOC 2026 gold award certificate for Wenhao Lu" loading="lazy" width="1840" height="1931">
</figure>
