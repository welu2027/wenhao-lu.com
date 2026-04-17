---
layout: page
title: Where Does Knowledge Go?
description: Mechanistic tracing of temporal forgetting in RL-trained LLMs.
importance: 4
category: research
github: https://github.com/welu2027/Temporal_Forgetting_Layer
tags: [mechanistic-interpretability, llms, rl, ai4math, reasoning]
abstract: "Localizes temporal forgetting in RL-trained LLMs to a critical transformer layer range using activation patching, logit-lens, and representational geometry on Qwen2.5-7B DeepScaler checkpoints, showing that forgetting reflects targeted overwriting of specific computational substructures."
---

**Where Does Knowledge Go?** traces how and where correct knowledge disappears inside LLMs as they are fine-tuned, localizing forgetting to specific components rather than attributing it to global weight drift.

---

## Motivation

Prior work on forgetting in LLMs tracks *what* is forgotten through benchmark drops, but provides no insight into *where* inside the network that forgetting occurs. Opening the black box is essential for building circuit-level strategies to preserve reasoning during training. Without mechanistic understanding of where forgetting occurs, interventions are guesswork.

---

## Novelty

Using training checkpoints of [Qwen2.5-7B](https://arxiv.org/abs/2412.15115) on [DeepScaler](https://arxiv.org/abs/2504.02756), this project identifies cases where earlier checkpoints answer correctly but later ones fail, then applies [logit lens](https://www.lesswrong.com/posts/AcKRB8wDpdaN6v6ru/interpreting-gpt-the-logit-lens), [activation patching](https://arxiv.org/abs/2202.05262), and [representational geometry](https://arxiv.org/abs/2106.09685) (centered kernel alignment, PCA trajectory analysis) to pinpoint the layers and attention heads responsible for the loss.

---

## Impact

Localizing forgetting to specific transformer components provides actionable targets for regularization and circuit preservation during [RL fine-tuning](https://arxiv.org/abs/2501.12599). This work contributes to building more stable reasoning models by explaining how a fundamental training phenomenon manifests internally and guiding more principled control over model behavior over time.
