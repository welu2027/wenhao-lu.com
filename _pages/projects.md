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
</style>

<div class="publications">

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
