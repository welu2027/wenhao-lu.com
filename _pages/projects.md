---
layout: page
title: projects
permalink: /projects/
description: A growing collection of my cool projects.
nav: true
nav_order: 3
---

<style>
  .bib-no-header h2.bibliography { display: none; }
  .publications .row { margin-bottom: 2rem; }
  .publications .row .links a.btn {
    color: var(--global-text-color);
    border: 1px solid var(--global-text-color);
    min-width: 2.2rem; height: 2.2rem;
    display: inline-flex; align-items: center; justify-content: center;
    font-size: 1.1rem; padding: 0 0.5rem;
  }
  .publications .row .links a.btn:hover { color: var(--global-theme-color); border-color: var(--global-theme-color); }
  .publications .row .hidden {
    font-size: 0.875rem; max-height: 0px; overflow: hidden;
    text-align: justify; transition: all 0.15s ease;
  }
  .publications .row .hidden p { line-height: 1.4em; margin: 10px; }
  .publications .row .hidden.open { max-height: 100em; transition: all 0.15s ease; }
  .publications .row div.abstract.hidden { border: dashed 1px var(--global-bg-color); }
  .publications .row div.abstract.hidden.open { border-color: var(--global-text-color); }
  .proj-tags { font-size: 0.78rem; color: var(--global-theme-color); margin-top: 0.3rem; letter-spacing: 0.01em; }

  #proj-tag-filter { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1.5rem; }
  .ptag {
    padding: 0.2rem 0.75rem; border: 1px solid var(--global-text-color);
    border-radius: 1rem; background: transparent; color: var(--global-text-color);
    font-size: 0.76rem; cursor: pointer; transition: all 0.15s ease; line-height: 1.6;
  }
  .ptag:hover, .ptag.active {
    background: var(--global-theme-color); border-color: var(--global-theme-color); color: white;
  }
</style>

<div class="publications">

<div id="proj-tag-filter">
  <button class="ptag active" data-tag="all">All</button>
  <button class="ptag" data-tag="ai4math">AI4Math</button>
  <button class="ptag" data-tag="world-models">World Models</button>
  <button class="ptag" data-tag="ai-safety">AI Safety</button>
  <button class="ptag" data-tag="mechanistic-interpretability">Mech. Interp.</button>
  <button class="ptag" data-tag="llms">LLMs</button>
  <button class="ptag" data-tag="agi">AGI</button>
  <button class="ptag" data-tag="spectral-graph-theory">Spectral Graph Theory</button>
  <button class="ptag" data-tag="mathematical-modeling">Math Modeling</button>
  <button class="ptag" data-tag="policy">Policy</button>
  <button class="ptag" data-tag="health-equity">Health Equity</button>
  <button class="ptag" data-tag="social-good">Social Good</button>
</div>

<script>
(function() {
  var selected = new Set();
  function filterItems() {
    document.querySelectorAll('.publications .row[data-tags]').forEach(function(row) {
      var raw = row.dataset.tags || '';
      var tags = raw.split(',').map(function(t) { return t.trim(); }).filter(Boolean);
      var visible = selected.size === 0 || tags.some(function(t) { return selected.has(t); });
      var container = row.closest('li') || row;
      container.style.display = visible ? '' : 'none';
    });
  }
  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.ptag').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var tag = this.dataset.tag;
        if (tag === 'all') {
          selected.clear();
          document.querySelectorAll('.ptag').forEach(function(b) { b.classList.remove('active'); });
          this.classList.add('active');
        } else {
          document.querySelector('.ptag[data-tag="all"]').classList.remove('active');
          if (selected.has(tag)) { selected.delete(tag); this.classList.remove('active'); }
          else { selected.add(tag); this.classList.add('active'); }
          if (selected.size === 0) { document.querySelector('.ptag[data-tag="all"]').classList.add('active'); }
        }
        filterItems();
      });
    });
  });
})();
</script>

<h2 class="bibliography">research</h2>

{% assign research_projects = site.projects | where: "category", "research" | sort: "importance" %}
{% for project in research_projects %}
  {% include project_pub.liquid %}
{% endfor %}

<div class="bib-no-header">
{% bibliography --query @*[graph2proof=true] %}
</div>

<div class="bib-no-header">
{% bibliography --query @*[show_in_projects=true] %}
</div>

<h2 class="bibliography">fun</h2>

{% assign fun_projects = site.projects | where: "category", "fun" | sort: "importance" %}
{% for project in fun_projects %}
  {% include project_pub.liquid %}
{% endfor %}

</div>
