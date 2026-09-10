---
layout: post_redesigned
title: a geometric (23_4) configuration
date: 2026-09-09
---

A geometric $(n_4)$ configuration is a set of $n$ points and $n$ straight lines in the real projective plane where every point lies on exactly four of the lines and every line passes through exactly four of the points. Which $n$ admit one has been open at a single value for years: examples were known for every $n \ge 18$ except $n = 23$, and no proof of nonexistence existed either.

I found two of them. Together with the known constructions this closes the problem: a geometric $(n_4)$ configuration exists **if and only if $n \ge 18$ and $n \ne 19$**. The paper also bounds the order of the projective symmetry group of a geometric $(23_4)$ configuration by four, and gives an exact Gröbner-basis classification of the Klein-symmetric case — 4018 Nullstellensatz certificates verified in exact rational arithmetic with no computer-algebra system in the trusted path, plus Lean checks of the two configurations themselves.

<div class="img-duo">
  <p class="duo-text">I submitted this as an abstract to the 2027 Joint Mathematics Meetings on <strong>September 7, 2026</strong>. An independent solution by W. Strinz was made public the following day, September 8. The two were arrived at independently, and I acknowledge theirs in a note in the paper; receipts for the submission date are in the repository.</p>
  <a class="repo-img" href="https://github.com/welu2027/23_4-configuration" target="_blank" rel="noopener">
    <img src="{{ '/assets/img/n4-repo-octocat.png' | relative_url }}" alt="welu2027/23_4-configuration on GitHub" loading="lazy" width="1460" height="1077">
  </a>
</div>
