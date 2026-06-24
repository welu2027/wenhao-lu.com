---
layout: post_redesigned
title: "I got 14th place (gold) at IIMOC 2026"
date: 2026-05-26 00:00:00
description: Competed solo against college teams in an international math optimization contest and somehow ended up with a gold medal.
tags: competitive-programming optimization algorithms
categories: competition
featured: true
giscus_comments: false
---

So IIMOC 2026 just wrapped up and I ended up placing 14th overall with a total score of 199.11, which landed me a gold medal. Pretty happy about that.

## What even is IIMOC?

[IIMOC](https://iimoc.org/) (International Invitational Math Optimization Challenge) is a global competition focused on hard optimization problems. The format is a bit different from your typical competitive programming contest — instead of solving problems within a few hours, you get a whole month to iteratively improve your solutions and climb the leaderboard. Points are awarded based on your **final rank** when submissions close, so it's less about getting a correct answer and more about getting the *best* answer.

This year the contest ran on problems from [FrontierCS](https://frontier-cs.org), and it draws participants from universities and clubs across 20+ countries. Most teams are college students or organized university clubs. I competed solo.

## The problems

There were two main problems this year:

**Square Approximation** — given a union of N axis-aligned rectangles (set A), output K rectangles whose union approximates A as closely as possible, minimizing the symmetric difference |A △ B|. My solution scored 58.197 (99.19th percentile). The approach was a greedy build-up using coordinate compression and a largest-rectangle-in-histogram sweep, combined with edge-sliding local search that iteratively nudges each rectangle's four edges to locally optimal positions. For small inputs, I also ran a full global 2D Kadane pass over all coordinate combinations to catch cross-cluster merges.

**Block Harmony** — given an array and parameters α and β, select up to B "colors" (target sums) and choose non-overlapping contiguous blocks, each assigned a color equal to its sum. Objective: maximize α·(# blocks) − β·(# distinct colors used). My solution scored 11,390,835,555,349 (99.92nd percentile). The key insight was treating this as an activity selection problem on candidate block lists sorted by right endpoint, with a greedy forward pass over sum candidates ranked by their independent coverage count, followed by a swap-refinement phase using precomputed prefix/suffix merges.

## Solo vs. teams

Most competitors are part of organized teams — university clubs, CS orgs, that kind of thing. Competing solo means no one to bounce ideas off, no one to parallelize the grind with. On the other hand it also means all the ranking points go to one person, so there's that.

I'll be honest, going into the final stretch I wasn't sure where I'd land. The leaderboard was pretty compressed at the top and a small improvement on either problem could shift you several spots. Ending up 14th felt like a good result given the field.

## Takeaways

The month-long format is something I really enjoy. You get time to actually think, read papers, try things that don't work, and iterate. It rewards persistence and incremental improvement rather than just speed. Local search and coordinate compression ended up being the workhorses for the geometry problem, and for Block Harmony the big unlock was realizing the activity selection structure could be exploited with sorted merge lists to make the inner loop fast enough.

Anyway — gold medal, 14th place, happy with how it went. On to the next one.