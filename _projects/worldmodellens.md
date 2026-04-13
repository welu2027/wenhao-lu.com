---
layout: page
title: WorldModelLens
description: The first interpretability and observability library for World Models.
img: assets/img/worldmodels.png
importance: 1
category: research
github: https://github.com/Bhavith-Chandra/WorldModelLens
---

[WorldModelLens](https://github.com/Bhavith-Chandra/WorldModelLens) is the first dedicated **interpretability and observability library** for **World Models** and **[State Space Models (SSMs)](https://arxiv.org/abs/2312.00752)**. It is analogous to [TransformerLens](https://github.com/TransformerLensOrg/TransformerLens) for LLMs, but purpose-built for WM architectures: [IRIS](https://arxiv.org/abs/2209.00588), [DreamerV3](https://arxiv.org/abs/2301.04104), [V-JEPA](https://arxiv.org/abs/2404.08471), video prediction models, and robotics/autonomous-driving world models.

---

## What is a world model?

A **world model** is an internal neural network that lets an AI agent simulate how the world evolves over time. It learns environment dynamics: physics, object interactions, causality, and spatial/temporal structure. The agent can then imagine future states, plan actions, and reason about outcomes without touching the real world. World models matter because they let agents make smart decisions in complex situations by simulating possible futures internally. This (i) dramatically improves planning accuracy, (ii) eliminates dangerous real-world trial-and-error, and (iii) enables far better generalization to new scenarios.

---

## Motivation

**[Mechanistic interpretability](https://transformer-circuits.pub/2022/mech-interp-essay/index.html)** research has focused almost entirely on transformer-based LLMs. Researchers working on world models have had to write custom, one-off probing and analysis code from scratch for every new architecture. That is a massive barrier. WorldModelLens provides a **unified toolkit** to hook into activations, cache hidden states, perform **causal interventions**, run probes, and analyze internal dynamics across diverse WM architectures. What previously took months of custom engineering now takes a few lines of code.

---

## Impact

World models are rapidly becoming the foundation of next-generation AI systems. Making them interpretable is a direct **[AI safety](https://www.anthropic.com/safety)** imperative. WorldModelLens lets researchers inspect an agent's beliefs, uncertainties, misrepresentations, and potential **deceptive signals** before they affect real-world behavior. It makes debugging compounding errors and hallucinations tractable. As world models scale into high-stakes domains like **robotics** and **autonomous driving**, transparent and auditable internals are not optional. They are essential.
