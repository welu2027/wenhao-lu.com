---
layout: page
title: CIPHER
description: "CIPHER (Calibrated Introspection via Partially Hidden Environment Rules) — a procedural benchmark for metacognitive calibration in large language models."
importance: 3
category: research
github: https://github.com/welu2027/CIPHER
tags: [benchmarks, metacognition, llms, agi, reasoning]
abstract: "A procedurally-generated benchmark testing metacognitive calibration in LLMs by placing them in synthetic worlds with deliberately hidden causal rules and fully invented vocabulary, scoring responses across objective performance, calibration, attention to unknowns, and plan quality — isolating genuine reasoning under uncertainty from memorization."
---

**CIPHER** (Calibrated Introspection via Partially Hidden Environment Rules) is a procedural benchmark that evaluates whether LLMs can recognize and act on their own uncertainty by testing metacognitive calibration and reasoning in synthetic worlds with hidden rules.

---

## Summary

CIPHER is a benchmarking framework to evaluate whether large language models (LLMs) can recognize and reason about their own uncertainty, also known as metacognition. The benchmark consists of thousands of small, synthetic "micro-worlds" with abstract rules, including invented quantities such as phase and flux, and key causal components are intentionally hidden. Within each world, the model must perform a sequence of tasks: assess what it knows, prioritize unknowns, design exploratory probes, produce an optimal action plan, and evaluate its own reliability. A simulator then reveals the full rule set and scores the model across multiple dimensions, including: objective performance, calibration accuracy, attention to important uncertainties, and overall execution quality. The overall purpose of CIPHER is to directly measure structured reasoning over uncertainty.

---

## Motivation

Progress towards artificial general intelligence (AGI) is often framed in terms of solving increasingly difficult tasks. However, this overlooks a critical dimension: knowing what you *don't* know. Current benchmarks reward recall, pattern matching, and shallow planning in environments where answers are recoverable from training data. CIPHER isolates metacognition and executive reasoning by constructing fully novel, abstract environments where memorization is impossible. This benchmark exposes a key weakness in modern systems: they can produce high-quality outputs while remaining poorly calibrated and overconfident. In the context of AGI, this gap is fundamental because a system that cannot accurately model its own ignorance is not reliable for decision-making in unfamiliar domains.

---

## Impact

CIPHER introduces a concrete, quantifiable way to evaluate and improve metacognition in AI systems. For researchers, it provides a diagnostic tool to evaluate different cognitive components to enable more targeted model development and training strategies. For safety and alignment, it provides a way to detect overconfidence and hidden failure modes before deployment, especially in high-stakes settings. Broadly, CIPHER reframes progress in AI from what models *can* do to how well they understand what they *cannot* do.
