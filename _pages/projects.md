---
layout: redesign_default
title: projects
permalink: /projects/
nav: false
---

<div class="page-anim">
    <div class="page-header">
      <div>
        <h1 class="page-title">projects</h1>
      </div>
    </div>

    <div class="now-grid">
      <div class="now-card">
        <h2 class="now-title">Symmetric, rational and infinitely many (23<sub>4</sub>) configurations, and the end of the existence problem for geometric (n<sub>4</sub>) configurations</h2>
        <p class="now-desc">
          I prove that geometric (n<sub>4</sub>) configurations exist if and only if n &ge; 18 and n &ne; 19
          by resolving the last open case, n = 23, using a symmetry bound and an exact classification by
          Gr&ouml;bner bases. I also prove there are infinitely many (23<sub>4</sub>) configurations with
          rational coordinates by computing a continuous family of them and parametrizing it by a rational number.
        </p>
      </div>
      <div class="now-card now-card-img is-diagram is-cta">
        <img src="{{ '/assets/img/config-23-4-sphere.png' | relative_url }}" alt="A geometric (23_4) configuration drawn on the sphere" loading="lazy" width="1458" height="1458">
        <div class="now-cta-row">
          <a class="now-cta" href="https://arxiv.org/abs/2610.14099" target="_blank" rel="noopener">arXiv <span class="now-cta-arrow">&#8599;</span></a>
          <a class="now-cta" href="https://mathworld.wolfram.com/n-4Configuration.html" target="_blank" rel="noopener">Wolfram MathWorld <span class="now-cta-arrow">&#8599;</span></a>
        </div>
      </div>
    </div>

    <div class="now-grid">
      <div class="now-card">
        <h2 class="now-title">UCL Load Lab</h2>
        <p class="now-desc">
          Physics-based elbow injury risk for baseball pitchers. I rebuilt elbow torque from 411
          motion-captured pitches with Newton&ndash;Euler inverse dynamics (r = 0.90 vs the lab's own),
          modeled UCL wear as tissue fatigue calibrated to MLB injury rates, and mapped every 2026 MLB
          pitcher by pitch count and elbow stress. Includes a 3D replay and a risk calculator.
        </p>
        <span class="shelf-note">Motion data from Driveline OpenBiomechanics (CC BY-NC-SA 4.0).</span>
      </div>
      <div class="now-card now-card-img is-diagram is-cta">
        <img src="{{ '/assets/img/ucl-thumb.png' | relative_url }}" alt="3D replay of a pitching delivery from UCL Load Lab" loading="lazy" width="1200" height="675">
        <div class="now-cta-row">
          <a class="now-cta" href="{{ '/ucl/' | relative_url }}" target="_blank" rel="noopener">Live site <span class="now-cta-arrow">&#8599;</span></a>
        </div>
      </div>
    </div>

</div>
