---
layout: default
title: "Events - QFIN"
permalink: /events/
---

{% include qfin-header.html %}

<div class="qfin-wrap">

  <div class="qfin-section">
    <h2>Upcoming Events</h2>
    <p class="qfin-subtle">
      All QFIN events are in our public calendar. Subscribe and new events will appear in your own calendar automatically. Last-minute changes go out on the mailing list and Discord.
    </p>
    {% include calendar-embed.html height=560 %}
    {% include calendar-subscribe.html %}
  </div>

  {% assign now = site.time | date: "%s" | plus: 0 %}
  {% assign events = site.data.events | sort: "date" %}

  {% assign has_upcoming = false %}
  {% for event in events %}
    {% assign event_time = event.date | date: "%s" | plus: 86400 %}
    {% if event_time >= now %}{% assign has_upcoming = true %}{% endif %}
  {% endfor %}

  {% if has_upcoming %}
  <div class="qfin-section">
    <h2>Event Details</h2>
    {% for event in events %}
      {% assign event_time = event.date | date: "%s" | plus: 86400 %}
      {% if event_time >= now %}
        {% include event-card.html event=event %}
      {% endif %}
    {% endfor %}
  </div>
  {% endif %}

  <div class="qfin-section">
    <h2>Past Events</h2>
    {% assign past_events = site.data.events | sort: "date" | reverse %}
    {% for event in past_events %}
      {% assign event_time = event.date | date: "%s" | plus: 86400 %}
      {% if event_time < now %}
        {% include event-card.html event=event past=true %}
      {% endif %}
    {% endfor %}
  </div>

  {% include qfin-footer.html %}
</div>
