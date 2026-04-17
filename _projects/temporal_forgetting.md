---
layout: page
title: Where Does Knowledge Go?
description: Mechanistic tracing of temporal forgetting in LLMs.
importance: 4
category: research
github: https://github.com/welu2027/Temporal_Forgetting_Layer
tags: [mechanistic-interpretability, llms, rl, ai4math, reasoning]
abstract: "Localizes temporal forgetting in RL-trained LLMs to a critical transformer layer range using activation patching, logit-lens, and representational geometry on Qwen2.5-7B DeepScaler checkpoints, showing that forgetting reflects targeted overwriting of specific computational substructures rather than global weight drift."
---

**Where Does Knowledge Go?** is a mechanistic interpretability study that traces how and where correct knowledge disappears inside LLMs as they are fine-tuned over time.

---

## Summary

This project studies the phenomenon of "temporal forgetting" in LLMs, which is when correct knowledge disappears as a model is fine-tuned over time. Using checkpoints of Qwen2.5-7B trained on the DeepScaler dataset, it identifies cases where earlier versions are correct but later ones fail, then applies mechanistic interpretability techniques (logit lens, activation patching, representation similarity) to pinpoint layers or attention heads responsible for the loss, thus tracing how knowledge degrades during training.

---

## Motivation

Prior work on temporal forgetting in LLMs focuses on *what* is forgotten through drops in benchmark performance, but provides little insight into where or *how* that forgetting occurs inside the network. This project reframes forgetting as a mechanistic interpretability problem by opening the black box to analyze how internal representations change over time during fine-tuning. Understanding these mechanisms is essential for building a deeper circuit-level picture of how training dynamics reshape model behavior.

---

## Impact

By localizing forgetting to specific components in a network, this work provides actionable insights into how training alters internal representations and can guide strategies to preserve important reasoning circuits. For interpretability research, this work contributes to building more stable and trustworthy AI systems by explaining how a fundamental phenomenon occurs in order to guide more principled control over model behavior during training.
