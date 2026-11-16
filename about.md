---
layout: default
title: "About - QFIN"
permalink: /about/
---

{% include qfin-header.html %}

<div class="qfin-wrap">

  <div class="qfin-section">
    <h2>About QFIN</h2>
    <p class="qfin-subtle">
The Queer and Feminist Informatics Network (QFIN) is an open, inclusive community that brings together researchers, students, and allies to advance feminist and queer scholarship across informatics and computer science, and to broaden participation in computing education and research. Embedded in the Digital Interactions Lab (DILab) at the Informatics Institute (IvI), University of Amsterdam, QFIN connects work already happening across the Netherlands and creates new opportunities for collaboration, mentorship, and visibility.</p>

<p class="qfin-subtle">
QFIN aims to strengthen research that interrogates how digital systems shape power, identity, and everyday life, while also building a supportive space for queer and trans researchers to thrive. The network welcomes work spanning HCI, AI and data science, software engineering, sociotechnical systems, critical data studies, and adjacent fields. Core values include intersectionality, accessibility, community accountability, and consent-based, privacy-respecting research practices.
</p>

<p class="qfin-subtle">
The network hosts book talks, research seminars, methods workshops, and reading groups, alongside low-barrier community events such as writing sessions and mentoring meetups. To lower barriers to participation and make events convivial, lunch is provided at most in-person sessions. QFIN also surfaces resources, shares opportunities, and facilitates collaborations across institutions, with informal advice on inclusive study design, ethics applications for working with sensitive data and communities.
</p>

<p class="qfin-subtle">
Most events take place in Lab42 at Amsterdam Science Park, with hybrid participation when possible. Membership is informal and open: anyone interested in feminist or queer approaches to computing — or simply curious to learn more — is welcome.
</p>
  </div>

  <div class="qfin-section">
    <h2>Sponsors</h2>
    <p class="qfin-subtle">QFIN is supported by:</p>
    {% include sponsors-list.html %}
    <p class="qfin-small" style="margin-top:1rem;">Interested in supporting QFIN? See <a href="{{ '/work-with-us/#sponsor-qfin' | relative_url }}">sponsor us</a>.</p>
  </div>

  {% if site.data.press and site.data.press.size > 0 %}
  <div class="qfin-section">
    <h2>In the News</h2>
    <ul class="pub-list">
      {% for item in site.data.press %}
        <li>
          <a href="{{ item.url }}" target="_blank" rel="noopener" class="pub-title" style="text-decoration:none;">{{ item.title }}</a>
          <div class="qfin-small">{{ item.source }}, {{ item.date | date: "%-d %B %Y" }}</div>
        </li>
      {% endfor %}
    </ul>
  </div>
  {% endif %}


  {% include qfin-footer.html %}
</div>
