---
layout: page
title: Graph2Proof
description: The first topology-aware framework for natural language theorem proving in LLMs.
img: assets/img/graph.png
importance: 2
category: work
github: https://github.com/welu2027/Graph2Proof
---

[Graph2Proof](https://github.com/welu2027/Graph2Proof) is the first framework that brings **topology-aware methods** to **natural language theorem proving** in LLMs. It converts mathematical proofs into **directed acyclic graphs (DAGs)** and uses a pre-trained **Graph Attention Network (ProofGAT)** to provide dense structural feedback during reinforcement learning.

---

## What is spectral graph theory?

**[Spectral graph theory](https://en.wikipedia.org/wiki/Spectral_graph_theory)** studies graphs through the **eigenvalues and eigenvectors** of associated matrices (such as the [Laplacian](https://en.wikipedia.org/wiki/Laplacian_matrix)). Applied to mathematical proofs, it reveals hidden structural properties. How tightly connected are the logical steps? How efficiently does information flow through the argument? How resilient is the reasoning structure to disruption? These questions are invisible when looking only at text. Spectral methods let us quantify logical coherence directly, which dramatically improves how we evaluate, debug, and train LLMs for mathematical reasoning.

---

## Motivation

Training approaches for **[natural language theorem proving](https://arxiv.org/abs/2205.12615)** have focused almost entirely on **binary outcome correctness**. Researchers have been forced to rely on sparse, outcome-only rewards with no signal about the quality or coherence of the reasoning chain. Graph2Proof solves this. It provides a unified framework to construct proof graphs, pre-train a topology-aware encoder (ProofGAT), and inject a **structural reward during [GRPO](https://arxiv.org/abs/2402.03300)**. The result: dense, topology-aware supervision instead of weak, outcome-only gradients.

---

## Impact

Together with its companion paper **"Topological Signatures of Correct Mathematical Proofs,"** Graph2Proof establishes a new paradigm for topology-aware mathematical reasoning. The interpretability paper shows for the first time that correct proofs carry **measurable topological signatures**: more compact structure, higher **closeness centrality**, more scale-free degree distributions, and greater structural resilience than incorrect proofs. Graph2Proof turns these findings into practical gains. It boosts performance on **[FIMO](https://arxiv.org/abs/2309.04295)** and **[PutnamBench](https://arxiv.org/abs/2407.11214)** (modified natural language versions from the [DeepTheorem](https://arxiv.org/abs/2505.23754) paper), generates proofs with **9.5% richer graph structure** (measured by [Von Neumann entropy](https://en.wikipedia.org/wiki/Von_Neumann_entropy)), and enables **spectral node scoring** to pinpoint logical weak points in incorrect proofs. As LLMs tackle harder mathematics, topology-aware methods are essential for building theorem provers that reason the way mathematicians actually do.
