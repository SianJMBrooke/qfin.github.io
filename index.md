---
layout: default
title: "QFIN - Queer and Feminist Informatics Network"
---

{% include qfin-header.html home=true %}

<div class="qfin-wrap">

  <div class="qfin-section">
    <h2>Welcome</h2>
    <p class="qfin-subtle">
      The Queer and Feminist Informatics Network (QFIN) is an open, inclusive network for queer and feminist approaches to computing. We bring together researchers, students and allies working across informatics, AI and data, and we work to broaden who takes part in computing education and research. We run talks, workshops, reading groups and community events, mostly in Lab42 at Amsterdam Science Park. Membership is informal and everyone is welcome.
    </p>
    <p>
      <a href="{{ '/about/' | relative_url }}">Read more about QFIN</a>
      {% if site.data.press and site.data.press.size > 0 %}{% assign news = site.data.press | first %} · <a href="{{ news.url }}" target="_blank" rel="noopener">{{ news.source }}: {{ news.title }}</a>{% endif %}
    </p>
  </div>

  {% include popup-gallery.html %}

  <div class="qfin-section" id="announcements">
    <h2>Announcements</h2>
    {% if site.data.announcements and site.data.announcements.size > 0 %}
      {% assign announcements = site.data.announcements | sort: "date" | reverse %}
      <div class="qfin-announcements">
        {% for a in announcements limit: 3 %}
          <article class="qfin-card qfin-announcement">
            <div class="qfin-meta">{{ a.date | date: "%-d %B %Y" }}</div>
            <h3>{{ a.title }}</h3>
            {% if a.text %}<div class="qfin-desc">{{ a.text | markdownify }}</div>{% endif %}
            {% if a.url and a.url != "" %}<a href="{{ a.url }}" target="_blank" rel="noopener">Read more</a>{% endif %}
          </article>
        {% endfor %}
      </div>
      <p class="qfin-subtle">These go out first on the mailing list.</p>
    {% else %}
      <p class="qfin-subtle">Nothing sent yet. Join the mailing list and the first announcement comes straight to your inbox.</p>
    {% endif %}
    <div class="qfin-actions">
      <a class="qfin-btn" href="{{ site.mailing_list_subscribe_url }}" target="_blank" rel="noopener">Join the mailing list</a>
    </div>
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
        <p>Event announcements, calls for volunteers and a short monthly round-up, via the UvA list. No UvA account needed. The welcome email has the link to our Discord.</p>
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

  <div class="qfin-card qfin-partner-strip">
    <div>
      <h3>Work with us</h3>
      <p>Sponsor QFIN or invite us to run a workshop for your course, team or event.</p>
    </div>
    <div class="qfin-actions" style="margin-top:0;">
      <a class="qfin-btn" href="{{ '/work-with-us/#request-a-workshop' | relative_url }}">Request a workshop</a>
      <a class="qfin-btn" href="{{ '/work-with-us/#sponsor-qfin' | relative_url }}">Sponsor us</a>
    </div>
  </div>


  {% include qfin-footer.html %}
</div>
