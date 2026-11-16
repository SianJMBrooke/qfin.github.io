---
layout: default
title: "Work With Us - QFIN"
permalink: /work-with-us/
---

{% include qfin-header.html %}

{% capture workshop_mailto %}mailto:{{ site.contact_email }}?subject=QFIN%20workshop%20request&body=Hi%20QFIN%2C%0D%0A%0D%0AWe%27d%20like%20to%20request%20a%20QFIN%20workshop.%0D%0A%0D%0AWho%20we%20are%3A%0D%0AWhat%20the%20workshop%20is%20for%20%28course%2C%20team%2C%20event%2C%20conference%29%3A%0D%0APossible%20dates%3A%0D%0AExpected%20group%20size%3A%0D%0ALocation%20%28or%20online%29%3A%0D%0ABudget%2C%20if%20any%3A%0D%0A{% endcapture %}
{% capture sponsor_mailto %}mailto:{{ site.contact_email }}?subject=Sponsoring%20QFIN&body=Hi%20QFIN%2C%0D%0A%0D%0AWe%27re%20interested%20in%20sponsoring%20QFIN.%0D%0A%0D%0AOrganisation%3A%0D%0AWhat%20we%27d%20like%20to%20support%20%28an%20event%2C%20the%20year%27s%20programme%2C%20in-kind%20support%29%3A%0D%0AContact%20person%3A%0D%0A{% endcapture %}
{% if site.workshop_request_url and site.workshop_request_url != "" %}{% assign workshop_link = site.workshop_request_url %}{% else %}{% assign workshop_link = workshop_mailto %}{% endif %}
{% if site.sponsor_url and site.sponsor_url != "" %}{% assign sponsor_link = site.sponsor_url %}{% else %}{% assign sponsor_link = sponsor_mailto %}{% endif %}

<div class="qfin-wrap">

  <div class="qfin-section">
    <h2>Work With Us</h2>
    <p class="qfin-subtle">
      QFIN is volunteer-run and grows through partnerships. If your organisation wants to support queer and feminist work in computing, or you'd like us to run a session for your course, team or event, we'd love to hear from you.
    </p>
    <div class="qfin-grid">
      <a class="qfin-card qfin-cta" href="#request-a-workshop">
        <h3>Request a workshop</h3>
        <p>Hands-on sessions for courses, research groups, conferences, community events and organisations.</p>
      </a>
      <a class="qfin-card qfin-cta" href="#sponsor-qfin">
        <h3>Sponsor QFIN</h3>
        <p>Help keep our events free and open to everyone, with credit on our website and event materials.</p>
      </a>
    </div>
  </div>

  <div class="qfin-section" id="request-a-workshop">
    <h2>Request a Workshop</h2>
    <p class="qfin-subtle">
      Our workshops are hands-on and often use making and crafts as a way into critical theory and design. They work well for people with no technical background as well as computing students and researchers. Recent sessions include:
    </p>
    <div class="workshop-grid">
      <div class="workshop-card">
        <h4>Don't Worry Mum, ChatGPT Says I'll Be Fine</h4>
        <p>How LLMs, web search and "no tools" shape what AI knows about queer rights.</p>
      </div>
      <div class="workshop-card">
        <h4>Face/Off: Adversarial Drag in the Age of Capture</h4>
        <p>Drag and adversarial makeup against facial surveillance.</p>
      </div>
      <div class="workshop-card">
        <h4>Worn Otherwise: Designing Something Queerly</h4>
        <p>Speculative futures of wearables and AI through queer and crip design.</p>
      </div>
    </div>
    <p class="qfin-subtle" style="margin-top:1.25rem;">
      Tell us a bit about your group and what you have in mind, and we'll work out the format, length and costs with you.
    </p>
    <div class="qfin-actions">
      <a class="qfin-btn" href="{{ workshop_link }}"{% if site.workshop_request_url and site.workshop_request_url != "" %} target="_blank" rel="noopener"{% endif %}>Request a workshop</a>
    </div>
    <p class="qfin-small" style="margin-top:0.75rem;">Or email <a href="mailto:{{ site.contact_email }}">{{ site.contact_email }}</a> with "Workshop request" in the subject.</p>
  </div>

  <div class="qfin-section" id="sponsor-qfin">
    <h2>Sponsor QFIN</h2>
    <p class="qfin-subtle">
      QFIN events are free to attend and run entirely by volunteers. Sponsorship covers the things that make them open to everyone, like catering, poster printing and accessibility costs. We're happy to credit sponsors on our website and event materials, and to send a short report on what your support made possible.
    </p>
    <p class="qfin-subtle">
      We also welcome in-kind support, such as rooms, catering or printing. You can support a single event or our programme for the year.
    </p>
    <div class="qfin-actions">
      <a class="qfin-btn" href="{{ sponsor_link }}"{% if site.sponsor_url and site.sponsor_url != "" %} target="_blank" rel="noopener"{% endif %}>Become a sponsor</a>
    </div>
    <p class="qfin-small" style="margin-top:0.75rem;">Or email <a href="mailto:{{ site.contact_email }}">{{ site.contact_email }}</a> with "Sponsorship" in the subject.</p>
  </div>

  {% include qfin-footer.html %}
</div>
