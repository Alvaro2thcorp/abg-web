/*!
 * Piezas adaptadas de React Bits (https://reactbits.dev): Dot Grid, Scroll Reveal, Magnet y Spotlight Card.
 * Pasadas a JavaScript sin React ni librerías para que la web siga cargando rápido, con los colores de la marca.
 *
 * Copyright (c) 2026 David Haz — MIT + Commons Clause License Condition v1.0
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, and distribute the Software as part of an application, website,
 * or product, subject to the following conditions: The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software. Commons Clause: you may use this Software,
 * including for any commercial purpose, so long as you do not sell, sublicense, or redistribute the components
 * themselves, whether alone, in a bundle, or as a ported version. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT
 * WARRANTY OF ANY KIND.
 */
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));

/* ---------------------------------------------------------------------------------------------
 * Dot Grid · rejilla de puntos como el lienzo de una herramienta de diseño. El cursor empuja los
 * puntos (vuelven con muelle) y los tiñe de azul acero; un clic lanza una onda.
 * ------------------------------------------------------------------------------------------- */
export function dotGrid(canvas: HTMLCanvasElement, area: HTMLElement) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const S = {
    size: Number(canvas.dataset.size) || 2.6, gap: Number(canvas.dataset.gap) || 22,
    base: hex(canvas.dataset.base || '#C9C7C0'), active: hex(canvas.dataset.active || '#45627F'),
    proximity: 150, strength: 1, bounce: 0.6, returnDuration: 0.8, shockRadius: 320, shockStrength: 5, swell: 0.9,
  };
  let W = 0, H = 0, ratio = 1, n = 0;
  let rest = new Float32Array(0), off = new Float32Array(0), vel = new Float32Array(0), en = new Float32Array(0);
  const ptr = { x: 0, y: 0, vx: 0, vy: 0, t: 0, inside: false };
  const shocks: { x: number; y: number; t: number }[] = [];
  let introT = reduce ? -1 : 0, raf = 0, last = 0, visible = true;

  const build = () => {
    const r = canvas.getBoundingClientRect();
    W = Math.round(r.width); H = Math.round(r.height);
    ratio = Math.min(devicePixelRatio || 1, 2);
    canvas.width = W * ratio; canvas.height = H * ratio;
    const cell = S.size + S.gap;
    const cols = Math.max(1, Math.floor((W + S.gap) / cell)), rows = Math.max(1, Math.floor((H + S.gap) / cell));
    const sx = (W - (cols * cell - S.gap)) / 2 + S.size / 2, sy = (H - (rows * cell - S.gap)) / 2 + S.size / 2;
    n = cols * rows;
    rest = new Float32Array(n * 2); off = new Float32Array(n * 2); vel = new Float32Array(n * 2); en = new Float32Array(n);
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) { const k = (j * cols + i) * 2; rest[k] = sx + i * cell; rest[k + 1] = sy + j * cell; }
    draw(performance.now());
  };

  const step = (dt: number, now: number) => {
    const zeta = 1 - 0.85 * S.bounce, omega = 4 / (zeta * S.returnDuration);
    const k = omega * omega, c = 2 * zeta * omega, R = S.proximity;
    const speed = Math.hypot(ptr.vx, ptr.vy);
    const drive = ptr.inside ? 6500 * Math.tanh(speed / 900) * S.strength : 0;
    const fresh = now - ptr.t < 120;
    let busy = false;
    for (let i = 0; i < n; i++) {
      const a = i * 2, x = rest[a] + off[a], y = rest[a + 1] + off[a + 1];
      let fx = -k * off[a] - c * vel[a], fy = -k * off[a + 1] - c * vel[a + 1], target = 0;
      if (ptr.inside) {
        const dx = x - ptr.x, dy = y - ptr.y, d = Math.hypot(dx, dy);
        if (d < R) {
          const f = (1 - d / R) ** 2;
          target = f;
          if (fresh && d > 0.01) { fx += (dx / d) * f * drive + ptr.vx * f * 2.2; fy += (dy / d) * f * drive + ptr.vy * f * 2.2; }
        }
      }
      for (const s of shocks) {
        const age = (now - s.t) / 1000, ring = age * 900, dx = x - s.x, dy = y - s.y, d = Math.hypot(dx, dy) || 1;
        const band = 1 - Math.min(1, Math.abs(d - ring) / 60), fall = 1 - Math.min(1, d / S.shockRadius);
        if (band > 0 && fall > 0) { const f = band * fall * S.shockStrength * 900; fx += (dx / d) * f; fy += (dy / d) * f; target = Math.max(target, band * fall); }
      }
      vel[a] += fx * dt; vel[a + 1] += fy * dt;
      off[a] += vel[a] * dt; off[a + 1] += vel[a + 1] * dt;
      en[i] += (target - en[i]) * Math.min(1, dt * (target > en[i] ? 14 : 3.5));
      if (en[i] > 0.002 || Math.abs(off[a]) + Math.abs(off[a + 1]) > 0.05 || Math.abs(vel[a]) + Math.abs(vel[a + 1]) > 0.5) busy = true;
    }
    for (let i = shocks.length - 1; i >= 0; i--) if (now - shocks[i].t > 700) shocks.splice(i, 1);
    return busy || shocks.length > 0;
  };

  const draw = (now: number) => {
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.clearRect(0, 0, W, H);
    const cx = W / 2, cy = H / 2, reach = Math.hypot(cx, cy);
    const intro = introT < 0 ? 1 : clamp01((now - introT) / 1100);
    const [br, bg, bb] = S.base, [ar, ag, ab] = S.active;
    for (let i = 0; i < n; i++) {
      const a = i * 2, x = rest[a] + off[a], y = rest[a + 1] + off[a + 1], e = en[i];
      let alpha = 1;
      if (intro < 1) alpha = clamp01((intro * 1.4 - Math.hypot(rest[a] - cx, rest[a + 1] - cy) / reach * 0.4) / 1);
      if (alpha <= 0) continue;
      const r = (S.size / 2) * (1 + S.swell * e);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = e > 0.01 ? `rgb(${br + (ar - br) * e | 0},${bg + (ag - bg) * e | 0},${bb + (ab - bb) * e | 0})` : `rgb(${br},${bg},${bb})`;
      ctx.beginPath(); ctx.arc(x, y, r, 0, 6.2832); ctx.fill();
    }
    ctx.globalAlpha = 1;
    return intro < 1;
  };

  const frame = (now: number) => {
    raf = 0;
    if (!visible) return;
    const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60;
    last = now;
    const steps = Math.ceil(dt / (1 / 120));
    let busy = false;
    if (!reduce) for (let s = 0; s < steps; s++) busy = step(dt / steps, now) || busy;
    const intro = draw(now);
    if (busy || intro || ptr.inside) raf = requestAnimationFrame(frame);
    else last = 0;
  };
  const wake = () => { if (!raf && visible) raf = requestAnimationFrame(frame); };

  if (!reduce) {
    area.addEventListener('pointermove', (e) => {
      if (e.pointerType === 'touch') return;
      const r = canvas.getBoundingClientRect(), now = performance.now(), x = e.clientX - r.left, y = e.clientY - r.top;
      const dt = Math.max(8, now - ptr.t) / 1000;
      if (ptr.inside) { ptr.vx = (x - ptr.x) / dt; ptr.vy = (y - ptr.y) / dt; }
      Object.assign(ptr, { x, y, t: now, inside: true });
      wake();
    }, { passive: true });
    area.addEventListener('pointerleave', () => { ptr.inside = false; wake(); });
    area.addEventListener('pointerdown', (e) => {
      if ((e.target as Element).closest('a,button,input,select,textarea')) return;
      const r = canvas.getBoundingClientRect();
      shocks.push({ x: e.clientX - r.left, y: e.clientY - r.top, t: performance.now() });
      wake();
    });
  }
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) wake(); }).observe(canvas);
  new ResizeObserver(() => { build(); wake(); }).observe(canvas);
  build();
  if (introT === 0) introT = performance.now();
  wake();
}

/* ---------------------------------------------------------------------------------------------
 * Scroll Reveal · el texto se aclara palabra a palabra mientras bajas (de borroso y tenue a nítido).
 * ------------------------------------------------------------------------------------------- */
export function scrollReveal(el: HTMLElement) {
  if (reduce) return;
  const baseOpacity = 0.12, blur = 4, rotation = Number(el.dataset.rotate ?? 2), gap = 0.05, span = 0.5;
  // partir en palabras (solo nodos de texto; se respetan <br>, <span>…)
  const pieces: HTMLElement[] = [];
  const walk = (node: Node) => {
    Array.from(node.childNodes).forEach((ch) => {
      if (ch.nodeType === 3) {
        const frag = document.createDocumentFragment();
        ch.textContent!.split(/(\s+)/).forEach((w) => {
          if (!w) return;
          if (!w.trim()) { frag.append(w); return; }
          const s = document.createElement('span');
          s.className = 'sr-w'; s.textContent = w; pieces.push(s); frag.append(s);
        });
        ch.replaceWith(frag);
      } else if (ch.nodeType === 1) walk(ch);
    });
  };
  walk(el);
  el.style.transformOrigin = '0% 50%';
  const total = span + Math.max(0, pieces.length - 1) * gap;
  const lastT = pieces.map(() => -1);
  let raf = 0;
  const render = () => {
    raf = 0;
    const r = el.getBoundingClientRect(), vh = innerHeight;
    // empieza al asomar por abajo y termina cuando el texto llega a media pantalla
    const start = vh * 0.95, end = vh * 0.45;
    const p = clamp01((start - r.top) / (start - end));
    const q = clamp01((vh - r.top) / (vh * 0.5));
    if (rotation) el.style.transform = q >= 1 ? '' : `rotate(${(rotation * (1 - q)).toFixed(3)}deg)`;
    const at = p * total;
    pieces.forEach((w, i) => {
      const t = clamp01((at - i * gap) / span);
      if (t === lastT[i]) return;
      lastT[i] = t;
      w.style.opacity = t >= 1 ? '' : (baseOpacity + (1 - baseOpacity) * t).toFixed(3);
      w.style.filter = t < 1 ? `blur(${(blur * (1 - t)).toFixed(2)}px)` : '';
    });
  };
  const req = () => { if (!raf) raf = requestAnimationFrame(render); };
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { addEventListener('scroll', req, { passive: true }); addEventListener('resize', req); req(); }
    else { removeEventListener('scroll', req); removeEventListener('resize', req); }
  }, { rootMargin: '20% 0px' }).observe(el);
  // sin pintar hasta que se acerca: lejos de la pantalla el texto queda normal (accesible y medible)
}

/* ---------------------------------------------------------------------------------------------
 * Magnet · el botón se deja atraer un poco por el cursor y vuelve con muelle. Solo con ratón.
 * ------------------------------------------------------------------------------------------- */
const magnets = new Set<{ el: HTMLElement; wake: () => void }>();
let pointer: { x: number; y: number } | null = null;
let owner: HTMLElement | null = null;
const reach = (r: DOMRect, p: { x: number; y: number }) => {
  const dx = p.x - (r.left + r.width / 2), dy = p.y - (r.top + r.height / 2);
  return { dx, dy, out: Math.hypot(Math.max(0, Math.abs(dx) - r.width / 2), Math.max(0, Math.abs(dy) - r.height / 2)) };
};
const arbitrate = (pad: number) => {
  let best: HTMLElement | null = null, near = Infinity;
  if (pointer) for (const m of magnets) { const r = reach(m.el.getBoundingClientRect(), pointer); if (r.out <= pad && r.out < near) { near = r.out; best = m.el; } }
  owner = best;
  magnets.forEach((m) => m.wake());
};
export function magnet(el: HTMLElement) {
  if (reduce || !finePointer) return;
  const pad = Number(el.dataset.magnet) || 70, strength = 3, maxOff = 14, K = 170, D = 16;
  const cur = { x: 0, y: 0 }, vel = { x: 0, y: 0 };
  let raf = 0, last = 0;
  const frame = (now: number) => {
    raf = 0;
    const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60; last = now;
    const tgt = { x: 0, y: 0 };
    if (pointer && owner === el) {
      const r = el.getBoundingClientRect(), { dx, dy, out } = reach(r, pointer);
      const t = clamp01((out - pad * 0.5) / (pad * 0.5)), pull = 1 - t * t * (3 - 2 * t);
      let x = (dx / strength) * pull, y = (dy / strength) * pull;
      const l = Math.hypot(x, y); if (l > maxOff) { x *= maxOff / l; y *= maxOff / l; }
      tgt.x = x; tgt.y = y;
    }
    let rest = true;
    for (let s = 0, st = Math.ceil(dt * 120); s < st; s++) {
      const h = dt / st;
      (['x', 'y'] as const).forEach((k) => {
        vel[k] += (K * (tgt[k] - cur[k]) - D * vel[k]) * h; cur[k] += vel[k] * h;
        if (Math.abs(tgt[k] - cur[k]) > 0.05 || Math.abs(vel[k]) > 0.05) rest = false;
      });
    }
    if (rest) { cur.x = tgt.x; cur.y = tgt.y; vel.x = vel.y = 0; }
    el.style.transform = cur.x || cur.y ? `translate3d(${cur.x.toFixed(2)}px,${cur.y.toFixed(2)}px,0)` : '';
    if (!rest) raf = requestAnimationFrame(frame); else last = 0;
  };
  const m = { el, wake: () => { if (!raf) raf = requestAnimationFrame(frame); } };
  magnets.add(m);
  if (magnets.size === 1) {
    addEventListener('pointermove', (e) => { if (e.pointerType === 'touch') return; pointer = { x: e.clientX, y: e.clientY }; arbitrate(pad); }, { passive: true });
    document.documentElement.addEventListener('pointerleave', () => { pointer = null; arbitrate(pad); });
  }
}

/* ---------------------------------------------------------------------------------------------
 * Spotlight Card · un foco suave sigue al cursor dentro de la tarjeta y alcanza el borde de las vecinas.
 * ------------------------------------------------------------------------------------------- */
export function spotlight(group: HTMLElement) {
  if (!finePointer) return;
  const cards = Array.from(group.querySelectorAll<HTMLElement>('[data-spot]'));
  if (!cards.length) return;
  cards.forEach((c) => c.classList.add('spot'));
  let raf = 0, px = 0, py = 0, on = false;
  const paint = () => {
    raf = 0;
    cards.forEach((c) => {
      const r = c.getBoundingClientRect();
      const x = px - r.left, y = py - r.top;
      const out = Math.hypot(Math.max(0, -x, x - r.width), Math.max(0, -y, y - r.height));
      c.style.setProperty('--sx', `${x.toFixed(0)}px`);
      c.style.setProperty('--sy', `${y.toFixed(0)}px`);
      c.style.setProperty('--so', on ? (out === 0 ? '1' : clamp01(1 - out / 220).toFixed(2)) : '0');
      c.style.setProperty('--se', on ? (out === 0 ? '1' : clamp01(1 - out / 220).toFixed(2)) : '0');
    });
  };
  const req = () => { if (!raf) raf = requestAnimationFrame(paint); };
  group.addEventListener('pointermove', (e) => { px = e.clientX; py = e.clientY; on = true; req(); }, { passive: true });
  group.addEventListener('pointerleave', () => { on = false; req(); });
}
