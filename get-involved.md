---
layout: default
title: "Get Involved - QFIN"
permalink: /get-involved/
---

{% include qfin-header.html %}

<div class="qfin-wrap">

  <div class="qfin-section">
    <h2>Stay in Touch</h2>
    <p class="qfin-subtle">
      Each of our channels has one job, so you always know where to look.
    </p>

    <div class="qfin-grid">
      <div class="qfin-card qfin-channel">
        <div class="qfin-channel-label">Announcements</div>
        <h3>Mailing list</h3>
        <p>Events, calls for volunteers and a short monthly round-up. This is the one channel that reaches everyone, so anything important goes here first. Low volume, and you can leave at any time.</p>
        <div class="qfin-actions">
          <a class="qfin-btn" href="{{ site.mailing_list_subscribe_url }}" target="_blank" rel="noopener">Join the mailing list</a>
        </div>
      </div>

      <div class="qfin-card qfin-channel">
        <div class="qfin-channel-label">Conversation</div>
        <h3>Discord</h3>
        <p>Our community space for chat, introductions, reading and opportunities. You can join with any handle you like. To keep it a safe space, the invite link is in the welcome email you get when you join the mailing list.</p>
      </div>

      <div class="qfin-card qfin-channel">
        <div class="qfin-channel-label">What's on</div>
        <h3>Events calendar</h3>
        <p>Every QFIN event in one public calendar. Subscribe once and new events appear in your own calendar.</p>
        <div class="qfin-actions">
          <a class="qfin-btn" href="{{ '/events/' | relative_url }}">See the calendar</a>
        </div>
      </div>

      <div class="qfin-card qfin-channel">
        <div class="qfin-channel-label">Contact</div>
        <h3>Email us</h3>
        <p>For partners, speakers, collaborations and any questions. This address reaches the whole committee.</p>
        <div class="qfin-actions">
          <a class="qfin-btn" href="mailto:{{ site.contact_email }}">{{ site.contact_email }}</a>
        </div>
      </div>
    </div>
  </div>

  <div class="qfin-section">
    <h2>Take on a Role</h2>
    <p class="qfin-subtle">
      QFIN is volunteer-run and there's room for people with any amount of time. We're looking for working group chairs and members, community representatives and project volunteers. Fill in the involvement survey and someone from the <a href="{{ '/committee/' | relative_url }}">committee</a> will get in touch.
    </p>
    <div class="qfin-actions">
      <a class="qfin-btn" href="{{ site.involvement_survey_url }}" target="_blank" rel="noopener">Involvement survey</a>
    </div>
  </div>

  <div class="qfin-section">
    <h2>Follow Us</h2>
    <p class="qfin-subtle">
      We share news and event recaps on <a href="{{ site.linkedin_url }}" target="_blank" rel="noopener">LinkedIn</a>.
    </p>
  </div>

  {% include qfin-footer.html %}
</div>
