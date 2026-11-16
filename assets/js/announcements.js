/* Live mailing list announcements for the homepage.
 * Reads the JSON feed from the Apps Script in the qfinformatics@gmail.com
 * account (see tools/announcements-feed.gs). If the feed can't be reached
 * or is empty, the box keeps whatever the page was built with. */
(function () {
  var box = document.querySelector('[data-qfin-announcements]');
  if (!box) return;
  var feed = box.getAttribute('data-feed');
  if (!feed) return;

  var EXCERPT = 280;

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  // Escape first, then turn bare links into anchors and line breaks into <br>.
  function format(text) {
    return esc(text)
      .replace(/\bhttps?:\/\/[^\s<]+[^\s<.,;:!?)\]'"]/g, function (url) {
        return '<a href="' + url + '" target="_blank" rel="noopener">' + url + '</a>';
      })
      .replace(/\n{3,}/g, '\n\n')
      .replace(/\n/g, '<br>');
  }

  function excerpt(text) {
    var flat = text.replace(/\s+/g, ' ').trim();
    if (flat.length <= EXCERPT) return null;
    var cut = flat.slice(0, EXCERPT);
    var space = cut.lastIndexOf(' ');
    return (space > 200 ? cut.slice(0, space) : cut) + '…';
  }

  function dateLabel(iso) {
    var d = new Date(iso);
    if (isNaN(d)) return '';
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Amsterdam' });
  }

  function card(item) {
    var text = (item.text || '').trim();
    var short = excerpt(text);
    var body = short
      ? '<p>' + esc(short) + '</p><details class="qfin-announcement-more"><summary>Read the full announcement</summary><div>' + format(text) + '</div></details>'
      : '<p>' + format(text) + '</p>';
    return '<article class="qfin-card qfin-announcement">' +
      '<div class="qfin-meta">' + esc(dateLabel(item.date)) + '</div>' +
      '<h3>' + esc(item.title || 'Announcement') + '</h3>' +
      '<div class="qfin-desc">' + body + '</div>' +
      '</article>';
  }

  fetch(feed, { redirect: 'follow' })
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(function (data) {
      var items = (data && data.items) || [];
      if (!items.length) return;
      box.innerHTML =
        '<div class="qfin-announcements">' + items.slice(0, 3).map(card).join('') + '</div>' +
        '<p class="qfin-subtle">These go out first on the mailing list.</p>';
    })
    .catch(function () { /* keep the built-in fallback */ });
})();
