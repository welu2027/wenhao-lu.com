---
layout: page
title: "Graph2Proof: Topology-Aware Reward Shaping for Natural Language Theorem Proving"
description: GNN-derived structural reward for RL-based natural language theorem proving.
github: https://github.com/welu2027/Graph2Proof
---

**Graph2Proof** augments [GRPO](https://arxiv.org/abs/2402.03300) reinforcement learning with a graph neural network-derived structural reward for natural language theorem proving. To appear in [IEEE Xplore](https://ieeexplore.ieee.org/).

---

## Motivation

Training LLMs to prove theorems in natural language is harder than formal proof generation because proofs cannot be mechanically checked. Existing RL approaches reward only binary outcome correctness (right/wrong), providing zero signal about the quality of the reasoning chain. This makes training unstable and fails to teach models to construct logically well-formed arguments.

---

## Novelty

A two-phase framework built on the [DeepTheorem](https://arxiv.org/abs/2505.00701) dataset of 121,754 theorem-proof pairs. In Phase 1, **ProofGAT** is pre-trained contrastively on proof dependency graphs, learning to discriminate valid from invalid proof structures (cosine separation margin 1.141). In Phase 2, the frozen ProofGAT serves as a structural reward signal inside GRPO, augmenting binary outcome signals without requiring formal translation.

[Spectral graph theory](https://en.wikipedia.org/wiki/Spectral_graph_theory) analysis of the generated proofs reveals that Graph2Proof produces graphs with 9.5% higher [Von Neumann entropy](https://en.wikipedia.org/wiki/Von_Neumann_entropy) than vanilla baselines, showing richer proof structure. Spectral node scoring also enables identification of logical weak points in incorrect proofs, which flat token sequence representations cannot support.

---

## Impact

Graph2Proof-7B achieves **58.73% on [FIMO](https://arxiv.org/abs/2309.04295)** and **61.46% on [PutnamBench](https://arxiv.org/abs/2407.11214)** under the [DeepTheorem](https://arxiv.org/abs/2505.00701) multi-variant protocol, ranking **3rd and 4th overall** and outperforming all open-source models at 32-72B scale. The controlled comparison against DeepTheorem-RL-7B (identical setup, one added component) isolates the structural reward as the direct source of improvement.
