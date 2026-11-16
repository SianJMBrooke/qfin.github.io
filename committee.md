---
layout: default
title: "Committee - QFIN"
permalink: /committee/
---

{% include qfin-header.html %}

<div class="qfin-wrap">

  <div class="qfin-section">
    <h2>The Committee</h2>
    <p class="qfin-subtle">
      QFIN is run by a volunteer committee. Each of us looks after a different part of the network, so if you have a question, an idea or want to collaborate, the cards below tell you who to talk to. For anything general, email <a href="mailto:{{ site.contact_email }}">{{ site.contact_email }}</a> and it will reach all of us.
    </p>
  </div>

  {% if site.data.members and site.data.members.size > 0 %}
    <div class="qfin-profile-list">
      {% for m in site.data.members %}
        <div class="qfin-card qfin-profile">
          <div class="qfin-profile-photo">
            {% if m.image %}
              <img src="{{ m.image | relative_url }}" alt="{{ m.name }} portrait">
            {% else %}
              <img src="{{ '/assets/images/icon-192.png' | relative_url }}" alt="" class="qfin-photo-placeholder">
            {% endif %}
          </div>
          <div class="qfin-profile-body">
            <h3>{{ m.name }}</h3>
            <div class="qfin-role">
              {% if m.role and m.role != "" %}{{ m.role }}{% else %}<span class="qfin-tbc">Role to be confirmed</span>{% endif %}
            </div>
            {% if m.pronouns %}<div class="qfin-small">{{ m.pronouns }}</div>{% endif %}
            {% if m.position %}<div class="qfin-small">{{ m.position }}</div>{% endif %}

            <h4>Looks after</h4>
            {% if m.responsibilities and m.responsibilities.size > 0 %}
              <ul class="qfin-resp">
                {% for r in m.responsibilities %}<li>{{ r }}</li>{% endfor %}
              </ul>
            {% else %}
              <p class="qfin-small qfin-tbc">Responsibilities to be confirmed</p>
            {% endif %}

            <h4>Contact me about</h4>
            {% if m.contact_about and m.contact_about != "" %}
              <p class="qfin-small">{{ m.contact_about }}</p>
            {% else %}
              <p class="qfin-small qfin-tbc">To be confirmed</p>
            {% endif %}

            <div class="qfin-profile-links">
              {% if m.email %}<a href="mailto:{{ m.email }}">{{ m.email }}</a>{% endif %}
              {% if m.profile %}<a href="{{ m.profile }}" target="_blank" rel="noopener">Staff profile</a>{% endif %}
            </div>
          </div>
        </div>
      {% endfor %}
    </div>
  {% endif %}

  <div class="qfin-section">
    <h2>Join Us</h2>
    <p class="qfin-subtle">
      We're looking for working group chairs and members, community representatives and project volunteers. If you'd like to take on a role, fill in the involvement survey and we'll get in touch.
    </p>
    <div class="qfin-actions">
      <a class="qfin-btn" href="{{ site.involvement_survey_url }}" target="_blank" rel="noopener">Involvement survey</a>
      <a class="qfin-btn" href="{{ '/get-involved/' | relative_url }}">Other ways to get involved</a>
    </div>
  </div>

  {% include qfin-footer.html %}
</div>
