/* QFIN 98: taskbar, Start menu, clock and draggable pop-up windows */
(function () {
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }

  var bar = $('[data-w98-taskbar]');
  if (!bar) return;
  var tasks = $('[data-w98-tasks]', bar);
  var startBtn = $('[data-w98-start]', bar);
  var menu = $('[data-w98-startmenu]');
  var clock = $('[data-w98-clock]', bar);
  var wins = $$('[data-w98-window]');
  var floatMQ = window.matchMedia('(min-width: 1360px)');
  var z = 10 + wins.length;

  /* ---- windows ---- */
  function focusWin(w) {
    z += 1; w.style.zIndex = z;
    wins.forEach(function (o) { o.classList.toggle('is-active', o === w); });
    sync();
  }
  function topVisible() {
    return wins.filter(function (o) { return !o.classList.contains('is-hidden'); })
      .sort(function (a, b) { return (+b.style.zIndex || 0) - (+a.style.zIndex || 0); })[0];
  }
  function hide(w) {
    w.classList.add('is-hidden');
    w.classList.remove('is-max');
    var t = topVisible();
    if (t) focusWin(t); else { wins.forEach(function (o) { o.classList.remove('is-active'); }); sync(); }
  }
  function show(w) { w.classList.remove('is-hidden'); focusWin(w); }

  function sync() {
    tasks.innerHTML = '';
    var page = document.createElement('span');
    page.className = 'w98-task w98-task-page' + (wins.some(function (w) { return w.classList.contains('is-active'); }) ? '' : ' is-pressed');
    page.textContent = bar.getAttribute('data-page-title') || document.title;
    tasks.appendChild(page);
    wins.forEach(function (w) {
      var b = document.createElement('button');
      b.type = 'button';
      var on = w.classList.contains('is-active') && !w.classList.contains('is-hidden');
      b.className = 'w98-task' + (on ? ' is-pressed' : '');
      b.textContent = w.getAttribute('data-w98-title');
      b.addEventListener('click', function () {
        if (w.classList.contains('is-hidden')) show(w);
        else if (w.classList.contains('is-active')) hide(w);
        else focusWin(w);
      });
      tasks.appendChild(b);
    });
  }

  wins.forEach(function (w, i) {
    w.style.zIndex = 10 + i;
    w.addEventListener('pointerdown', function () { focusWin(w); });
    $$('[data-w98-close],[data-w98-min]', w).forEach(function (b) {
      b.addEventListener('click', function (e) { e.stopPropagation(); hide(w); });
    });
    var max = $('[data-w98-max]', w);
    if (max) max.addEventListener('click', function (e) {
      e.stopPropagation(); w.classList.toggle('is-max'); focusWin(w);
    });

    var handle = $('[data-w98-handle]', w);
    var area = w.parentElement;
    var sx, sy, ox, oy, dragging = false;
    handle.addEventListener('pointerdown', function (e) {
      if (e.target.closest('button') || !floatMQ.matches || w.classList.contains('is-max')) return;
      dragging = true; sx = e.clientX; sy = e.clientY; ox = w.offsetLeft; oy = w.offsetTop;
      try { handle.setPointerCapture(e.pointerId); } catch (err) {}
      e.preventDefault();
    });
    handle.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      var nx = Math.max(0, Math.min(area.clientWidth - w.offsetWidth, ox + e.clientX - sx));
      var ny = Math.max(0, Math.min(area.clientHeight - 60, oy + e.clientY - sy));
      w.style.left = nx + 'px'; w.style.top = ny + 'px';
    });
    function end() { dragging = false; }
    handle.addEventListener('pointerup', end);
    handle.addEventListener('pointercancel', end);
  });

  /* Going between wide and narrow layouts resets any dragged positions */
  var onChange = function () { wins.forEach(function (w) { w.style.left = ''; w.style.top = ''; }); };
  if (floatMQ.addEventListener) floatMQ.addEventListener('change', onChange); else if (floatMQ.addListener) floatMQ.addListener(onChange);

  /* ---- Start menu ---- */
  function setMenu(open) {
    if (!menu) return;
    menu.classList.toggle('is-open', open);
    startBtn.classList.toggle('is-pressed', open);
    startBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  startBtn.addEventListener('click', function (e) { e.stopPropagation(); setMenu(!menu.classList.contains('is-open')); });
  document.addEventListener('click', function (e) { if (menu && !menu.contains(e.target)) setMenu(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { setMenu(false); wins.forEach(function (w) { w.classList.remove('is-max'); }); } });

  /* ---- clock ---- */
  function tick() {
    var d = new Date();
    clock.textContent = ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2);
  }
  tick(); setInterval(tick, 20000);

  sync();
})();
