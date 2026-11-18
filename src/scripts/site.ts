// Todo el JavaScript de la web. Sin librerías: más rápido de cargar y de responder (LCP e INP).
declare global { interface Window { dataLayer: any[] } }
const $ = <T extends Element = HTMLElement>(s: string, el: ParentNode = document) => el.querySelector<T>(s as any) as T | null;
const $$ = <T extends Element = HTMLElement>(s: string, el: ParentNode = document) => Array.from(el.querySelectorAll<T>(s as any)) as T[];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const track = (event: string, data: Record<string, unknown> = {}) => { (window.dataLayer = window.dataLayer || []).push({ event, ...data }); };

/* Cabecera: filete al bajar, menú móvil y desplegable de servicios */
const hd = $('#hd');
const wa = $('#wa');
const hero = $('[data-hero]');
let ticking = false;
const onScroll = () => {
  ticking = false;
  const y = scrollY;
  hd?.classList.toggle('scrolled', y > 8);
  const limit = hero ? hero.offsetHeight * 0.8 : 480;
  wa?.classList.toggle('show', y > limit);
};
addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
onScroll();

const burger = $<HTMLButtonElement>('.hd__burger');
const mnav = $('#mnav');
burger?.addEventListener('click', () => {
  const open = burger.getAttribute('aria-expanded') !== 'true';
  burger.setAttribute('aria-expanded', String(open));
  burger.textContent = open ? burger.dataset.close! : burger.dataset.open!;
  if (mnav) mnav.hidden = !open;
  document.documentElement.style.overflow = open ? 'hidden' : '';
});
const serv = $<HTMLDetailsElement>('.hd__serv');
document.addEventListener('click', (e) => { if (serv?.open && !serv.contains(e.target as Node)) serv.open = false; });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && serv?.open) { serv.open = false; $('summary', serv)?.focus(); } });

/* Revelados: texto que sube y cajas de selección que se dibujan */
const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });
$$('.rv, .sel[data-draw]').forEach((el) => io.observe(el));
// grupos: escalonado de 80 ms
$$('[data-stagger]').forEach((g) => $$('.rv', g).forEach((el, i) => { el.style.transitionDelay = `${Math.min(i * 80, 400)}ms`; }));
// red de seguridad: nada se queda oculto si el observador no avisa
setTimeout(() => $$('.rv:not(.in), .sel[data-draw]:not(.in)').forEach((el) => { if (el.getBoundingClientRect().top < innerHeight) el.classList.add('in'); }), 1200);

/* Momento 1: la palabra seleccionada del titular cambia entre los cuatro resultados */
const cyc = $('[data-cycle]');
if (cyc) {
  const words: string[] = JSON.parse(cyc.dataset.cycle!);
  const w = $('[data-word]', cyc)!;
  let k = 0;
  let timer = 0;
  const step = () => {
    k = (k + 1) % words.length;
    if (reduce) { w.textContent = words[k]; return; }
    cyc.classList.add('off');
    setTimeout(() => { w.textContent = words[k]; cyc.classList.remove('off'); }, 380);
  };
  const start = () => { clearInterval(timer); timer = window.setInterval(step, 2800); };
  new IntersectionObserver(([e]) => (e.isIntersecting ? start() : clearInterval(timer))).observe(cyc);
  document.addEventListener('visibilitychange', () => (document.hidden ? clearInterval(timer) : start()));
}

/* Momento 2: la foto enmarcada crece hasta llenar la pantalla al bajar */
const zoom = $('[data-zoom]');
if (zoom && !reduce) {
  const media = $('[data-zoom-media]', zoom)!;
  const box = $('[data-zoom-box]', zoom)!;
  const cap = $('[data-zoom-cap]', zoom);
  let raf = 0;
  const calc = () => {
    raf = 0;
    const r = zoom.getBoundingClientRect();
    const total = r.height - innerHeight;
    const p = Math.min(1, Math.max(0, -r.top / (total * 0.75)));
    const e = 1 - Math.pow(1 - p, 3);
    const vw = innerWidth, vh = innerHeight;
    const startW = Math.min(vw * (vw < 700 ? 0.82 : 0.46), 760);
    const startH = startW * (vw < 700 ? 1.2 : 0.66);
    const ix = ((vw - startW) / 2) * (1 - e);
    const iy = ((vh - startH) / 2) * (1 - e);
    media.style.clipPath = `inset(${iy}px ${ix}px ${iy}px ${ix}px)`;
    box.style.inset = `${iy}px ${ix}px`;
    box.style.opacity = String(1 - Math.max(0, (e - 0.85) / 0.15));
    const co = String(Math.max(0, (e - 0.7) / 0.3));
    if (cap) cap.style.opacity = co;
    zoom.style.setProperty("--o", co);
  };
  const req = () => { if (!raf) raf = requestAnimationFrame(calc); };
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { addEventListener('scroll', req, { passive: true }); addEventListener('resize', req); req(); }
    else { removeEventListener('scroll', req); removeEventListener('resize', req); }
  }).observe(zoom);
  zoom.classList.add('is-live');
}

/* Momento 3: pestañas de las cuatro líneas */
$$('[data-tabs]').forEach((tabs) => {
  const btns = $$<HTMLButtonElement>('[role=tab]', tabs);
  const panels = $$('[role=tabpanel]', tabs);
  const show = (i: number, focus = false) => {
    btns.forEach((b, j) => { b.setAttribute('aria-selected', String(i === j)); b.tabIndex = i === j ? 0 : -1; });
    panels.forEach((p, j) => { p.hidden = i !== j; });
    if (focus) btns[i].focus();
  };
  btns.forEach((b, i) => {
    b.addEventListener('click', () => { show(i); track('linea_tab', { linea: b.dataset.key }); });
    b.addEventListener('keydown', (e) => {
      const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (d) { e.preventDefault(); show((i + d + btns.length) % btns.length, true); }
    });
  });
});

/* Piezas en miniatura */
// Selector de viviendas
$$('[data-units]').forEach((root) => {
  const out = $('[data-unit-out]', root)!;
  $$<HTMLButtonElement>('button[data-u]', root).forEach((b) => b.addEventListener('click', () => {
    $$('button[data-u]', root).forEach((x) => x.setAttribute('aria-pressed', 'false'));
    b.setAttribute('aria-pressed', 'true');
    out.textContent = b.dataset.u!;
  }));
});
// Portfolio
$$('[data-pf]').forEach((root) => {
  const main = $<HTMLImageElement>('[data-pf-main]', root)!;
  const cap = $('[data-pf-cap]', root)!;
  $$<HTMLButtonElement>('button[data-src]', root).forEach((b) => b.addEventListener('click', () => {
    $$('button[data-src]', root).forEach((x) => x.setAttribute('aria-pressed', 'false'));
    b.setAttribute('aria-pressed', 'true');
    main.srcset = ''; main.src = b.dataset.src!; main.alt = b.dataset.alt!; cap.textContent = b.dataset.cap!;
  }));
});
// Antes / después
$$('[data-ba]').forEach((root) => {
  const range = $<HTMLInputElement>('input[type=range]', root)!;
  const set = () => root.style.setProperty('--p', `${range.value}%`);
  range.addEventListener('input', set); set();
});
// Valorador (datos de ejemplo)
$$('[data-val]').forEach((root) => {
  const form = root as HTMLFormElement;
  const out = $('[data-val-out]', root)!;
  const fmt = new Intl.NumberFormat(document.documentElement.lang.startsWith('es') ? 'es-ES' : 'en-GB', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
  const calc = () => {
    const m2 = Math.max(30, Math.min(600, Number((form.elements.namedItem('m2') as HTMLInputElement).value) || 0));
    const zona = Number((form.elements.namedItem('zona') as HTMLSelectElement).value);
    const extra = (form.elements.namedItem('terraza') as HTMLInputElement).checked ? 1.06 : 1;
    const mid = m2 * zona * extra;
    const lo = Math.round((mid * 0.93) / 1000) * 1000, hi = Math.round((mid * 1.07) / 1000) * 1000;
    out.textContent = `${fmt.format(lo)} – ${fmt.format(hi)}`;
  };
  form.addEventListener('input', calc);
  form.addEventListener('submit', (e) => { e.preventDefault(); calc(); });
  calc();
});

/* Formulario de contacto (Formspree, sin salir de la página) */
$$<HTMLFormElement>('form[data-form]').forEach((f) => {
  const status = $('.status', f)!;
  let started = false;
  f.addEventListener('focusin', () => { if (!started) { started = true; track('form_start', { form: f.closest('section')?.id }); } });
  f.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = $<HTMLButtonElement>('button[type=submit]', f)!;
    btn.disabled = true;
    status.className = 'status';
    status.textContent = '…';
    try {
      const res = await fetch(f.action, { method: 'POST', body: new FormData(f), headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(String(res.status));
      const tipo = (f.elements.namedItem('tipo') as RadioNodeList)?.value || 'sin_tipo';
      track('generate_lead', { tipo, idioma: document.documentElement.lang });
      f.reset();
      status.classList.add('ok');
      status.textContent = status.dataset.ok!;
    } catch {
      status.classList.add('err');
      status.textContent = status.dataset.err!;
    } finally { btn.disabled = false; }
  });
});

/* Clics que interesa medir (WhatsApp, email, CTA) */
document.addEventListener('click', (e) => {
  const a = (e.target as Element).closest<HTMLElement>('[data-track], a[href^="mailto:"], a[href^="tel:"]');
  if (!a) return;
  track(a.dataset.track || (a.getAttribute('href')!.startsWith('mailto') ? 'email_click' : 'phone_click'), { page: location.pathname });
});

export {};
