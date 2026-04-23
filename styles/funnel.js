/* ══════════════════════════════════════════════════════════════════
   LUR Growth · Calm Infrastructure Webinar Funnel
   Shared behavior · funnel.js
   ══════════════════════════════════════════════════════════════════ */

// Target: Thursday May 21, 2026, 12:00 PM Eastern Time
// ET = UTC-4 (EDT in May), so 12pm ET = 16:00 UTC
const WEBINAR_TARGET = new Date('2026-05-21T16:00:00Z');

function pad2(n) { return (n < 10 ? '0' : '') + n; }

function startCountdown(selector, target) {
  const root = typeof selector === 'string' ? document.querySelector(selector) : selector;
  if (!root) return;
  const t = target || WEBINAR_TARGET;
  const d = root.querySelector('[data-c="d"]');
  const h = root.querySelector('[data-c="h"]');
  const m = root.querySelector('[data-c="m"]');
  const s = root.querySelector('[data-c="s"]');

  function tick() {
    const now = new Date();
    let diff = Math.max(0, (t.getTime() - now.getTime()) / 1000);
    const days = Math.floor(diff / 86400); diff -= days * 86400;
    const hrs  = Math.floor(diff / 3600);  diff -= hrs * 3600;
    const mins = Math.floor(diff / 60);    diff -= mins * 60;
    const secs = Math.floor(diff);
    if (d) d.textContent = pad2(days);
    if (h) h.textContent = pad2(hrs);
    if (m) m.textContent = pad2(mins);
    if (s) s.textContent = pad2(secs);
    if (t.getTime() - now.getTime() <= 0) {
      root.dispatchEvent(new CustomEvent('countdown-zero'));
      return;
    }
    setTimeout(tick, 1000);
  }
  tick();
}

function wireForm(selector, onSubmit) {
  const form = typeof selector === 'string' ? document.querySelector(selector) : selector;
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let ok = true;
    form.querySelectorAll('[data-validate]').forEach((el) => {
      const rule = el.dataset.validate;
      const v = (el.value || '').trim();
      let valid = true;
      if (rule === 'required') valid = v.length > 0;
      else if (rule === 'email') valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      el.classList.toggle('invalid', !valid);
      if (!valid) ok = false;
    });
    if (!ok) return;
    if (typeof onSubmit === 'function') onSubmit(form);
  });
}

function showToast(msg) {
  let layer = document.querySelector('.toast-layer');
  if (!layer) {
    layer = document.createElement('div');
    layer.className = 'toast-layer';
    document.body.appendChild(layer);
  }
  const t = document.createElement('div');
  t.className = 'toast-item';
  t.textContent = msg;
  layer.appendChild(t);
  setTimeout(() => t.remove(), 3800);
}

/* ── Tweaks panel: live accent + headline + urgency ───────── */
function wireTweaks(defaults) {
  const panel = document.querySelector('.tweaks');
  if (!panel) return;

  // Slide it in after a beat so it feels intentional, not janky
  setTimeout(() => panel.classList.add('show'), 800);

  // Accent swatches
  panel.querySelectorAll('.swatch').forEach((sw) => {
    sw.addEventListener('click', () => {
      panel.querySelectorAll('.swatch').forEach((s) => s.classList.remove('active'));
      sw.classList.add('active');
      const accent = sw.dataset.accent;
      const val = accent === 'teal'
        ? '#5bb9b0'
        : accent === 'green'
        ? '#7fae6f'
        : '#fd9d7d';
      document.documentElement.style.setProperty('--coral', val);
    });
  });

  // Headline variants (data-opt-group="headline")
  panel.querySelectorAll('.opt[data-opt-group="headline"]').forEach((opt) => {
    opt.addEventListener('click', () => {
      panel.querySelectorAll('.opt[data-opt-group="headline"]').forEach((o) => o.classList.remove('active'));
      opt.classList.add('active');
      const which = opt.dataset.opt;
      document.querySelectorAll('[data-headline]').forEach((el) => {
        el.style.display = el.dataset.headline === which ? '' : 'none';
      });
    });
  });

  // Urgency switch
  const urgSwitch = panel.querySelector('[data-switch="urgency"]');
  if (urgSwitch) {
    urgSwitch.addEventListener('click', () => {
      urgSwitch.classList.toggle('on');
      const on = urgSwitch.classList.contains('on');
      document.querySelectorAll('[data-urgency-only]').forEach((el) => {
        el.style.display = on ? '' : 'none';
      });
    });
  }
}
