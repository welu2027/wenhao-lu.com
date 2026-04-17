---
layout: page
title: "Topological and Spectral Fingerprints of Mathematical Proof Correctness"
description: Network science characterization of proof correctness from graph topology alone.
github: https://github.com/welu2027/Graph2Proof
---

**Can a flawed proof be detected without reading it?** This paper shows partial detection is possible from graph topology alone. We model 10,000 theorem-proof pairs as directed dependency graphs and measure whether correct and incorrect proofs occupy different regions of [graph-theoretic](https://en.wikipedia.org/wiki/Graph_theory) space. To appear in [IEEE Xplore](https://ieeexplore.ieee.org/).

---

## Motivation

[Automated theorem proving](https://arxiv.org/abs/2304.01082) systems generate natural language proofs whose validity is hard to check without full formal verification. Structural signals derived purely from proof graph topology could serve as lightweight, scalable proxies for proof quality. This is the first study to apply [network science](https://en.wikipedia.org/wiki/Network_science) to mathematical proof correctness. All prior work on proof structure used only syntactic or semantic analysis.

---

## Novelty

Using 10,000 theorem-proof pairs from [DeepTheorem](https://arxiv.org/abs/2505.00701) (5,000 correct, 5,000 incorrect), each proof is converted to a directed dependency graph where nodes are logical claims and edges encode inferential flow. No semantic content is used.

Key findings across structural, spectral, and kernel-based analyses:

- **Correct proofs are more compact**: higher edge density (r=0.072), shorter path lengths (r=0.071), higher bridge ratios (r=0.079)
- **Higher [Fiedler values](https://en.wikipedia.org/wiki/Algebraic_connectivity)** (r=0.064): by [Cheeger's inequality](https://en.wikipedia.org/wiki/Cheeger_constant_(graph_theory)), correct proof graphs resist fragmentation such that no small bipartition cuts the reasoning in two
- **Fingerprinting effect**: under the [Weisfeiler-Lehman kernel](https://arxiv.org/abs/1101.5955), proof graphs are **3.2x more similar within a theorem** than across theorems (p < 10⁻¹⁰), while correctness drives no significant pairwise similarity difference (p > 0.20). Proof graphs are problem fingerprints first, correctness signals second

---

## Impact

Establishes the **Fiedler value as a principled measure of logical robustness**, provides the first empirical characterization of proof correctness through network science, and opens proof dependency graphs as a new domain for [spectral graph analysis](https://en.wikipedia.org/wiki/Spectral_graph_theory). The calibrated AUC = 0.513 baseline honestly quantifies topology's contribution and benchmarks future structural proof evaluation work.
