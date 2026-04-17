---
layout: page
title: WorldModelLens
description: The first interpretability and observability library for World Models.
importance: 1
category: research
github: https://github.com/Bhavith-Chandra/WorldModelLens
tags: [world-models, mechanistic-interpretability, state-space-models, ai-safety]
abstract: "The first interpretability and observability library for World Models, providing a unified toolkit for activation hooking, causal interventions, and internal probing across IRIS, DreamerV3, V-JEPA, and robotics/autonomous-driving architectures."
---

**[WorldModelLens](https://github.com/Bhavith-Chandra/WorldModelLens)** is the first dedicated interpretability and observability library for [World Models](https://arxiv.org/abs/1803.10122) and [State Space Models](https://arxiv.org/abs/2312.00752). It plays the same role that [TransformerLens](https://github.com/TransformerLensOrg/TransformerLens) plays for LLMs, built specifically for WM architectures like [IRIS](https://arxiv.org/abs/2209.00588), [DreamerV3](https://arxiv.org/abs/2301.04104), and [V-JEPA](https://arxiv.org/abs/2404.08471).

---

## Motivation

[Mechanistic interpretability](https://transformer-circuits.pub/2022/mech-interp-essay/index.html) tools like [TransformerLens](https://github.com/TransformerLensOrg/TransformerLens) and [Neuronpedia](https://www.neuronpedia.org/) were built entirely for LLMs. Researchers working on world models had to write custom one-off probing code per architecture, creating a massive barrier to the field. WorldModelLens provides shared infrastructure so that interpretability research on world models is no longer a per-project engineering problem.

---

## Novelty

WorldModelLens provides a unified API for activation caching, causal interventions ([activation patching](https://arxiv.org/abs/2202.05262), path patching), [linear probing](https://arxiv.org/abs/1610.01644), [SAE](https://arxiv.org/abs/2309.08600)-style concept discovery, OOD detection, and belief/uncertainty tracking across diverse WM architectures. A Neuronpedia-style interactive visualization platform (in development) will allow real-time inspection of world model internals.

---

## Impact

Making world models interpretable is a direct [AI safety](https://www.anthropic.com/safety) imperative. As world models scale into [robotics](https://arxiv.org/abs/2211.10861) and [autonomous driving](https://arxiv.org/abs/2306.07580), WorldModelLens enables researchers to detect deceptive signals, belief instability, and hallucinations before they affect real-world behavior, making auditable world model internals tractable for the first time.
