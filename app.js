const app = document.getElementById('app');
const cfg = siteConfig, courses = coursesData.courses;
let cur = [];

/* ---------- helpers ---------- */
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const rich = s => esc(s).replace(/\*(.+?)\*/g, '<span class="hl">$1</span>');
const safeUrl = u => /^https?:\/\//i.test(u || '') ? u : '';
const waUrl = v => { v = String(v || '').trim(); if (/^https?:\/\//i.test(v)) return v; const d = v.replace(/\D/g, ''); return d ? 'https://wa.me/' + d : ''; };
const isLeaf = n => !n.children || !n.children.length;
function el(tag, cls, html) { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }

const ICONS = {
  facebook: '<svg viewBox="0 0 24 24"><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"/></svg>',
  instagram: '<svg class="line" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
  tiktok: '<svg viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>',
  youtube: '<svg viewBox="0 0 24 24"><path fill-rule="evenodd" d="M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.3 5 12 5 12 5s-6.3 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2C2 8.76 2 12 2 12s0 3.24.4 4.8a2.5 2.5 0 0 0 1.76 1.77C5.7 19 12 19 12 19s6.3 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77C22 15.24 22 12 22 12s0-3.24-.4-4.8ZM10 15V9l5.2 3L10 15Z"/></svg>',
  whatsapp: '<svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>',
  back: '<svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg>'
};
const NETS = [['facebook','Facebook'],['instagram','Instagram'],['tiktok','TikTok'],['youtube','YouTube'],['whatsapp','WhatsApp']];
const netUrl = k => k === 'whatsapp' ? waUrl(cfg.social.whatsapp) : safeUrl(cfg.social[k]);

/* ---------- fixed header + footer ---------- */
function buildChrome() {
  const h = document.getElementById('site-header');
  const brand = el('a', 'brand'); brand.href = '#/';
  const logo = new Image(); logo.alt = ''; logo.src = cfg.logo;
  logo.onerror = () => logo.replaceWith(el('span', 'mark', 'YC'));
  brand.append(logo, document.createTextNode(cfg.name));
  const soc = el('nav', 'socials'); soc.setAttribute('aria-label', 'تواصل اجتماعي');
  NETS.forEach(([k, label]) => { const u = netUrl(k); if (!u) return;
    const a = el('a', '', ICONS[k]); a.href = u; a.target = '_blank'; a.rel = 'noopener'; a.title = label; a.setAttribute('aria-label', label); soc.append(a); });
  h.append(brand, soc);

  const f = document.getElementById('site-footer'), w = el('div', 'wrap');
  w.append(el('div', 'f-name', esc(cfg.name)));
  if (cfg.footer) w.append(el('div', '', esc(cfg.footer)));
  const links = el('div', 'links');
  NETS.forEach(([k, label]) => { const u = netUrl(k); if (u) { const a = el('a', '', label); a.href = u; a.target = '_blank'; a.rel = 'noopener'; links.append(a); } });
  w.append(links); f.append(w);
}

/* ---------- routing (hash) ---------- */
function resolve() {
  const ids = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean).map(decodeURIComponent);
  let list = courses; const p = [];
  for (const id of ids) { const n = (list || []).find(x => x.id === id); if (!n) break; p.push(n); list = n.children; }
  return p;
}
const go = nodes => { location.hash = '#/' + nodes.map(n => encodeURIComponent(n.id)).join('/'); };

function enter(n) {
  if (!isLeaf(n)) return go([...cur, n]);
  const u = safeUrl(n.link); if (u) window.open(u, '_blank', 'noopener');
}

/* ---------- pieces ---------- */
function card(n) {
  const leaf = isLeaf(n), c = el('article', 'card' + (leaf ? ' leaf' : ''));
  const m = el('div', 'media');
  if (n.image) { const i = new Image(); i.alt = ''; i.loading = 'lazy'; i.src = n.image; i.onerror = () => i.remove(); m.append(i); }
  c.append(m);
  if (n.badge) c.append(el('span', 'badge' + (leaf ? ' pill' : ''), esc(n.badge)));
  c.append(el('h3', '', esc(n.title)));
  if (n.subtitle) c.append(el('p', 'sub', esc(n.subtitle)));
  c.append(el('span', 'sp'));
  const hasLink = leaf && safeUrl(n.link);
  const b = el('button', 'btn', leaf ? (hasLink ? esc(n.button || 'عرض تفاصيل PDF') : 'قريبًا') : 'استكشف'); b.type = 'button';
  if (leaf && !hasLink) b.disabled = true;
  c.append(b);
  c.addEventListener('click', () => enter(n));
  return c;
}

function contactBlock() {
  const b = el('div', 'contact', '<span>' + esc(cfg.contactText) + '</span>');
  const u = waUrl(cfg.social.whatsapp);
  if (u) { const a = el('a', 'wa', ICONS.whatsapp); a.href = u; a.target = '_blank'; a.rel = 'noopener'; a.setAttribute('aria-label', 'واتساب'); b.append(a); }
  return b;
}

function home() {
  const h = cfg.hero, hero = el('section', 'hero'), w = el('div', 'wrap'), t = el('div');
  t.append(el('h1', '', rich(h.title)), el('p', '', esc(h.text)));
  const btn = el('button', 'btn', esc(h.button)); btn.onclick = () => document.getElementById('courses').scrollIntoView();
  t.append(btn); w.append(t);
  if (h.image) { const i = new Image(); i.className = 'hero-img'; i.alt = ''; i.src = h.image; i.onerror = () => i.remove(); w.append(i); }
  hero.append(w);
  if (h.tagline) { const tw = el('div', 'wrap'); tw.append(el('div', 'tagline', rich(h.tagline))); hero.append(tw); }

  const sec = el('section', 'sec'); sec.id = 'courses';
  const sw = el('div', 'wrap'); sw.append(el('div', 'sec-head', '<h2>' + esc(cfg.coursesTitle) + '</h2><p>' + esc(cfg.coursesText) + '</p>'));
  const g = el('div', 'grid'); courses.forEach(c => g.append(card(c))); sw.append(g); sec.append(sw);

  const cta = el('section', 'cta'), cw = el('div', 'wrap');
  cw.append(el('h2', '', esc(cfg.cta.title)), el('p', '', esc(cfg.cta.text)));
  const u = waUrl(cfg.social.whatsapp);
  if (u) { const a = el('a', 'btn', esc(cfg.cta.button)); a.href = u; a.target = '_blank'; a.rel = 'noopener'; cw.append(a); }
  cta.append(cw);
  app.append(hero, sec, cta);
}

function level(p) {
  const n = p[p.length - 1], dark = p[0].theme === 'dark';
  const sec = el('section', 'sec' + (dark ? ' dark' : '')), w = el('div', 'wrap');
  const back = el('button', 'back', ICONS.back + ' رجوع'); back.type = 'button';
  back.onclick = () => go(p.slice(0, -1));
  w.append(back);
  if (p.length > 1) w.append(el('div', 'crumb', p.map(x => esc(x.title)).join(' / ')));
  w.append(el('div', 'sec-head', '<h2>' + esc(n.title) + '</h2>' + (n.subtitle ? '<p>' + esc(n.subtitle) + '</p>' : '')));
  const g = el('div', 'grid'); n.children.forEach(c => g.append(card(c))); w.append(g);
  if (n.children.every(isLeaf)) w.append(contactBlock());
  sec.append(w); app.append(sec);
}

function render() {
  cur = resolve(); app.innerHTML = '';
  cur.length ? level(cur) : home();
  window.scrollTo(0, 0);
}

buildChrome();
window.addEventListener('hashchange', render);
render();
