---
layout: page
title: CIPHER
description: "CIPHER (Calibrated Introspection via Partially Hidden Environment Rules) is a procedural benchmark for metacognitive calibration in large language models."
importance: 3
category: research
github: https://github.com/welu2027/CIPHER
tags: [benchmarks, metacognition, llms, agi, reasoning]
abstract: "A procedurally-generated benchmark testing metacognitive calibration in LLMs by placing them in synthetic worlds with deliberately hidden causal rules and fully invented vocabulary, scoring responses across objective performance, calibration, attention to unknowns, and plan quality."
---

**[CIPHER](https://github.com/welu2027/CIPHER)** (Calibrated Introspection via Partially Hidden Environment Rules) is a procedural benchmark testing whether LLMs can recognize and act on what they *don't* know. Hosted on [Kaggle Benchmarks](https://www.kaggle.com/benchmarks/wenhaolu49/cipher).

---

## Motivation

Most benchmarks test what a model *knows*. Current leaderboards reward recall and pattern-matching in environments where answers are recoverable from training data. Genuine [metacognition](https://en.wikipedia.org/wiki/Metacognition) goes unmeasured. For systems targeting [AGI](https://en.wikipedia.org/wiki/Artificial_general_intelligence), overconfidence in unfamiliar domains is a critical failure mode that existing benchmarks cannot expose.

---

## Novelty

CIPHER constructs fully abstract "micro-worlds" with invented quantities (phase, flux) and deliberately hidden causal rules. The model must assess its own knowledge, prioritize unknowns, design exploratory probes, produce an action plan, and self-evaluate reliability. A simulator then scores responses across objective performance, calibration, attention to unknowns, and execution quality. Because every instance is generated fresh from abstract math with a random seed, [memorization](https://arxiv.org/abs/2310.05309) is impossible.

---

## Impact

CIPHER provides a concrete diagnostic for AI [calibration](https://arxiv.org/abs/1706.04599) and overconfidence detection before deployment in high-stakes settings. For [AI safety](https://www.anthropic.com/safety) and alignment research, it exposes the gap between what a model *can* do and how well it understands what it *cannot*, targeting a dimension that output-only benchmarks miss entirely.
