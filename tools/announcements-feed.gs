/**
 * QFIN announcements feed for qfinformatics.com
 *
 * Runs in the qfinformatics@gmail.com account (script.google.com) and gives
 * the website the latest emails sent to the qfin@list.uva.nl mailing list.
 * Only list announcements are shared. Nothing else in the inbox is touched.
 *
 * Setup
 *   1. Make sure qfinformatics@gmail.com is subscribed to qfin@list.uva.nl.
 *   2. Signed in as qfinformatics@gmail.com, go to script.google.com and
 *      create a New project. Replace the code with this file and save.
 *   3. Run "testFeed" once from the toolbar and allow access when asked.
 *      Google warns the app is unverified because QFIN wrote it. Click
 *      Advanced, then "Go to ... (unsafe)", then Allow.
 *   4. Deploy > New deployment > type "Web app".
 *      Execute as: Me. Who has access: Anyone. Click Deploy.
 *   5. Copy the Web app URL (ends in /exec) into announcements_feed_url
 *      in _config.yml.
 *
 * After editing this code, use Deploy > Manage deployments > Edit > New
 * version, so the same URL keeps working.
 */

// Emails addressed to the list, either received through it or sent from
// this account (Gmail hides its own list copies, so sent mail counts too).
var QUERY = 'to:qfin@list.uva.nl (list:qfin.list.uva.nl OR in:sent)';
var MAX_ITEMS = 3;
var CACHE_SECONDS = 15 * 60; // the website sees new announcements within 15 minutes
var MAX_TEXT = 4000;

function doGet() {
  var cache = CacheService.getScriptCache();
  var json = cache.get('feed');
  if (!json) {
    json = JSON.stringify(buildFeed_());
    cache.put('feed', json, CACHE_SECONDS);
  }
  return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON);
}

function buildFeed_() {
  var seen = {};
  var items = [];
  GmailApp.search(QUERY, 0, 25).forEach(function (thread) {
    thread.getMessages().forEach(function (m) {
      if (m.isDraft() || m.isInTrash()) return;
      if (!/qfin@list\.uva\.nl/i.test(m.getTo() + ' ' + m.getCc())) return;
      var key = m.getHeader('Message-ID') || (m.getSubject() + m.getDate().getTime());
      if (seen[key]) return;
      seen[key] = true;
      items.push({
        date: m.getDate().toISOString(),
        title: cleanSubject_(m.getSubject()),
        text: cleanBody_(m.getPlainBody())
      });
    });
  });
  items.sort(function (a, b) { return b.date < a.date ? -1 : b.date > a.date ? 1 : 0; });
  return { updated: new Date().toISOString(), items: items.slice(0, MAX_ITEMS) };
}

function cleanSubject_(subject) {
  // Drop the [Qfin] list prefix and any Fwd:/Fw: in front, in any order
  var s = String(subject || ''), prev;
  do {
    prev = s;
    s = s.replace(/^\s*\[[^\]]*\]\s*/, '').replace(/^\s*(fwd?|fw)\s*:\s*/i, '');
  } while (s !== prev);
  return s.trim();
}

function cleanBody_(body) {
  var text = String(body || '').replace(/\r\n/g, '\n');
  // Cut the mailing list footer (line of underscores, then "... mailing list -- ...")
  var footer = text.search(/\n_{10,}\s*\n[^\n]*mailing list\s*--/i);
  if (footer > -1) text = text.slice(0, footer);
  // Cut anything quoted from earlier emails
  var quoted = text.search(/\n(On .+wrote:|-{2,}\s*Original Message|From: .+\nSent: )/i);
  if (quoted > -1) text = text.slice(0, quoted);
  return text.replace(/\n{3,}/g, '\n\n').trim().slice(0, MAX_TEXT);
}

// Run this from the editor to check what the website will receive.
function testFeed() {
  CacheService.getScriptCache().remove('feed');
  Logger.log(JSON.stringify(buildFeed_(), null, 2));
}
