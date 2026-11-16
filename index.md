---
layout: default
title: "QFIN - Queer and Feminist Informatics Network"
---

{% include qfin-header.html home=true %}

<div class="qfin-wrap">

  <div class="qfin-section">
    <h2>Welcome</h2>
    <p class="qfin-subtle">
      The Queer and Feminist Informatics Network (QFIN) brings together researchers, students and allies working on queer and feminist approaches to informatics, AI and computing. We run talks, workshops, reading groups and community events, mostly in Lab42 at Amsterdam Science Park. Membership is informal and everyone is welcome.
    </p>
    <p><a href="{{ '/about/' | relative_url }}">Read more about QFIN</a></p>
  </div>

  <div class="qfin-section">
    <h2>Upcoming Events</h2>
    {% include calendar-embed.html height=420 %}
    {% include calendar-subscribe.html %}
  </div>

  <div class="qfin-section">
    <h2>Get Involved</h2>
    <div class="qfin-grid qfin-grid--3">
      <a class="qfin-card qfin-cta" href="{{ site.mailing_list_subscribe_url }}" target="_blank" rel="noopener">
        <h3>Join the mailing list</h3>
        <p>Event announcements, calls for volunteers and a short monthly round-up. The welcome email has the link to our Discord.</p>
      </a>
      <a class="qfin-card qfin-cta" href="{{ '/events/' | relative_url }}">
        <h3>Come to an event</h3>
        <p>See what's coming up and subscribe to the QFIN calendar so new events appear in your own.</p>
      </a>
      <a class="qfin-card qfin-cta" href="{{ '/committee/' | relative_url }}">
        <h3>Meet the committee</h3>
        <p>Who runs QFIN, what each of us looks after, and who to contact about what.</p>
      </a>
    </div>
  </div>

  <div class="logo-row">
    <img src="{{ '/assets/images/dilab-logo-white.png' | relative_url }}" alt="DILab">
    <img src="{{ '/assets/images/uva-ivi-white.png' | relative_url }}" alt="UvA Informatics Institute" class="logo-ivi">
  </div>

  {% include qfin-footer.html %}
</div>
