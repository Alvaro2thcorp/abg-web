// Motor de movimiento compartido por las webs de demostración.
// Todo se activa con atributos data-* en el HTML. Si el visitante pide menos
// movimiento, o el script no llega a cargar, el contenido se ve igualmente.
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, SplitText);

export { gsap, ScrollTrigger, SplitText };

export type Contexto = {
  lenis: Lenis | null;
  fino: boolean; // puntero de ratón (no táctil)
  ancho: boolean; // pantalla de escritorio
};

const $$ = <T extends Element = HTMLElement>(sel: string, raiz: ParentNode = document) =>
  Array.from(raiz.querySelectorAll<T>(sel));

const num = (el: Element, attr: string, def: number) => {
  const v = parseFloat(el.getAttribute(attr) || "");
  return Number.isFinite(v) ? v : def;
};

// Lo que ya está en pantalla al cargar se anima sin esperar al scroll
const inicio = (el: Element, def = "top 88%") =>
  el.getBoundingClientRect().top < window.innerHeight ? "top bottom" : def;

// Los retrasos están pensados para la entrada; más abajo en la página no se espera
const retrasoDe = (el: Element) => {
  const d = num(el, "data-delay", 0);
  return el.getBoundingClientRect().top < window.innerHeight ? d : Math.min(d, 0.2);
};

function listo() {
  (window as any).__mo = true;
  document.documentElement.classList.add("motion-lista");
}

export function iniciar(pagina?: (ctx: Contexto) => void) {
  const html = document.documentElement;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fino = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const ancho = window.matchMedia("(min-width: 900px)").matches;

  if (reduce) {
    html.classList.remove("motion");
    listo();
    return;
  }

  // --- Scroll suave (solo rueda/trackpad; en táctil se queda el nativo) ---
  const lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 1, anchors: { offset: -70 } });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  ScrollTrigger.config({ ignoreMobileResize: true });

  const ctx: Contexto = { lenis, fino, ancho };

  const arrancar = () => {
    try {
      textos();
      apariciones();
      parallax();
      contadores();
      marquesinas(lenis);
      palabras();
      horizontales(ancho);
      cabecera();
      progreso();
      if (fino) {
        magneticos();
        inclinaciones();
        cursor();
      }
      pagina?.(ctx);
    } catch (e) {
      console.error(e);
      html.classList.remove("motion");
    }
    listo();
    telon();
    // Los fijados se crean en distinto orden del que ocupan en la página: se ordenan antes de medir
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
  };

  const fuentes = (document as any).fonts?.ready ?? Promise.resolve();
  Promise.race([fuentes, new Promise((r) => setTimeout(r, 1800))]).then(arrancar);
  window.addEventListener("load", () => { ScrollTrigger.sort(); ScrollTrigger.refresh(); });
}

// --- Telón de entrada ---
function telon() {
  const t = document.querySelector<HTMLElement>(".telon");
  if (!t) return;
  gsap.to(t, {
    yPercent: -100, duration: 1.1, ease: "expo.inOut", delay: 0.15,
    onComplete: () => t.remove(),
  });
}

// --- Titulares que suben línea a línea (data-split="lines|words|chars") ---
function textos() {
  $$("[data-split]").forEach((el) => {
    const tipo = el.getAttribute("data-split") || "lines";
    const retraso = retrasoDe(el);
    const esChars = tipo === "chars";
    const esWords = tipo === "words";
    SplitText.create(el, {
      type: esChars ? "words,chars" : esWords ? "lines,words" : "lines",
      mask: esChars ? "words" : "lines",
      linesClass: "ln",
      wordsClass: "wd",
      charsClass: "ch",
      autoSplit: true,
      onSplit(self) {
        gsap.set(el, { visibility: "visible" });
        const piezas = esChars ? self.chars : esWords ? self.words : self.lines;
        return gsap.from(piezas, {
          yPercent: 115,
          rotate: esChars ? 6 : 0,
          duration: esChars ? 0.9 : 1.15,
          ease: "expo.out",
          stagger: esChars ? 0.022 : esWords ? 0.035 : 0.09,
          delay: retraso,
          scrollTrigger: { trigger: el, start: inicio(el, "top 90%"), once: true },
        });
      },
    });
  });
}

// --- Apariciones (data-reveal, data-stagger) ---
function apariciones() {
  $$("[data-reveal]").forEach((el) => {
    const tipo = el.getAttribute("data-reveal") || "up";
    const retraso = retrasoDe(el);
    const st = { trigger: el, start: inicio(el), once: true };
    if (tipo === "clip") {
      // La imagen se descubre de abajo arriba y se asienta
      gsap.set(el, { visibility: "visible" });
      gsap.fromTo(el, { clipPath: "inset(100% 0% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut", delay: retraso, scrollTrigger: st });
      const img = el.querySelector("img");
      if (img) gsap.from(img, { scale: 1.35, duration: 1.9, ease: "expo.out", delay: retraso, scrollTrigger: st });
    } else if (tipo === "linea") {
      gsap.set(el, { visibility: "visible" });
      gsap.from(el, { scaleX: 0, transformOrigin: "left center", duration: 1.3, ease: "expo.inOut", delay: retraso, scrollTrigger: st });
    } else {
      const d = tipo === "left" ? { x: -50 } : tipo === "right" ? { x: 50 } : tipo === "fade" ? {} : { y: 44 };
      gsap.from(el, { ...d, autoAlpha: 0, duration: 1.1, ease: "power3.out", delay: retraso, scrollTrigger: st });
    }
  });

  $$("[data-stagger]").forEach((grupo) => {
    const hijos = Array.from(grupo.children) as HTMLElement[];
    gsap.from(hijos, {
      y: 48, autoAlpha: 0, duration: 1, ease: "power3.out",
      stagger: num(grupo, "data-stagger", 0.09),
      scrollTrigger: { trigger: grupo, start: inicio(grupo, "top 86%"), once: true },
    });
  });
}

// --- Parallax y zoom ligados al scroll ---
function parallax() {
  $$("[data-parallax]").forEach((el) => {
    const v = num(el, "data-parallax", 10);
    gsap.fromTo(el, { yPercent: -v }, {
      yPercent: v, ease: "none",
      scrollTrigger: { trigger: el.parentElement || el, start: "top bottom", end: "bottom top", scrub: true },
    });
  });
  $$("[data-zoom]").forEach((el) => {
    const v = num(el, "data-zoom", 1.2);
    gsap.fromTo(el, { scale: v }, {
      scale: 1, ease: "none",
      scrollTrigger: { trigger: el.parentElement || el, start: "top bottom", end: "bottom top", scrub: true },
    });
  });
  $$("[data-gira]").forEach((el) => {
    gsap.to(el, {
      rotate: num(el, "data-gira", 180), ease: "none",
      scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 1 },
    });
  });
}

// --- Cifras que cuentan (data-count="840") ---
const fmt = (n: number, dec: number) =>
  n.toLocaleString("es-ES", { minimumFractionDigits: dec, maximumFractionDigits: dec });

export function contar(el: HTMLElement, hasta: number, opciones: { dec?: number; dur?: number; desde?: number; miles?: boolean } = {}) {
  const dec = opciones.dec ?? 0;
  const o = { v: opciones.desde ?? 0 };
  const miles = opciones.miles ?? true;
  return gsap.to(o, {
    v: hasta, duration: opciones.dur ?? 1.8, ease: "power3.out",
    onUpdate: () => {
      el.textContent = miles
        ? o.v.toLocaleString("es-ES", { minimumFractionDigits: dec, maximumFractionDigits: dec, useGrouping: "always" } as any)
        : o.v.toFixed(dec);
    },
  });
}

function contadores() {
  $$("[data-count]").forEach((el) => {
    const hasta = num(el, "data-count", 0);
    const dec = num(el, "data-dec", 0);
    const miles = el.getAttribute("data-miles") !== "no";
    el.textContent = miles ? fmt(0, dec) : "0";
    ScrollTrigger.create({
      trigger: el, start: "top 90%", once: true,
      onEnter: () => contar(el, hasta, { dec, miles, dur: num(el, "data-dur", 2) }),
    });
  });
}

// --- Marquesinas que aceleran con el scroll (data-marquee) ---
function marquesinas(lenis: Lenis) {
  $$("[data-marquee]").forEach((el) => {
    const pista = el.firstElementChild as HTMLElement | null;
    if (!pista) return;
    const copia = pista.cloneNode(true) as HTMLElement;
    copia.setAttribute("aria-hidden", "true");
    el.appendChild(copia);
    const dir = el.getAttribute("data-marquee") === "der" ? 1 : -1;
    const vel = num(el, "data-vel", 60); // px por segundo
    let x = dir === 1 ? -pista.offsetWidth : 0;
    let extra = 0;
    lenis.on("scroll", (e: any) => { extra = Math.min(Math.abs(e.velocity) * 2.2, 40); });
    gsap.ticker.add((_t, dt) => {
      const w = pista.offsetWidth;
      if (!w) return;
      x += dir * (vel * dt / 1000 + extra * dt / 16);
      extra *= 0.92;
      if (dir === -1 && x <= -w) x += w;
      if (dir === 1 && x >= 0) x -= w;
      gsap.set([pista, copia], { x });
    });
  });
}

// --- Párrafo que se ilumina palabra a palabra (data-words) ---
function palabras() {
  $$("[data-words]").forEach((el) => {
    SplitText.create(el, {
      type: "words", wordsClass: "wd", autoSplit: true,
      onSplit(self) {
        gsap.set(el, { visibility: "visible" });
        return gsap.fromTo(self.words, { opacity: 0.14 }, {
          opacity: 1, ease: "none", stagger: 0.12,
          scrollTrigger: { trigger: el, start: "top 78%", end: "bottom 45%", scrub: 0.6 },
        });
      },
    });
  });
}

// --- Galería horizontal fijada (data-hscroll > .hs__pista) ---
function horizontales(ancho: boolean) {
  if (!ancho) return; // en móvil, la pista se desliza con el dedo (CSS)
  $$("[data-hscroll]").forEach((sec) => {
    const pista = sec.querySelector<HTMLElement>(".hs__pista");
    if (!pista) return;
    const dist = () => Math.max(0, pista.scrollWidth - window.innerWidth);
    const tween = gsap.to(pista, {
      x: () => -dist(), ease: "none",
      scrollTrigger: {
        trigger: sec, start: "top top", end: () => "+=" + dist(),
        pin: true, scrub: 0.8, invalidateOnRefresh: true, anticipatePin: 1,
      },
    });
    // Elementos internos que reaccionan al avance horizontal
    $$("[data-hpar]", sec).forEach((el) => {
      const v = num(el, "data-hpar", 8);
      gsap.fromTo(el, { xPercent: -v }, {
        xPercent: v, ease: "none",
        scrollTrigger: { trigger: el.parentElement || el, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
      });
    });
    const barra = sec.querySelector<HTMLElement>(".hs__barra i");
    if (barra) gsap.fromTo(barra, { scaleX: 0 }, {
      scaleX: 1, ease: "none", transformOrigin: "left center",
      scrollTrigger: { trigger: sec, start: "top top", end: () => "+=" + dist(), scrub: true },
    });
    (sec as any).__tween = tween;
  });
}

// --- Cabecera: se esconde al bajar y vuelve al subir ---
function cabecera() {
  const cab = document.querySelector<HTMLElement>("[data-cab]");
  if (!cab) return;
  ScrollTrigger.create({
    start: 0, end: "max",
    onUpdate: (s) => {
      const y = s.scroll();
      cab.classList.toggle("cab--fuera", s.direction === 1 && y > 260);
      cab.classList.toggle("cab--solida", y > 80);
    },
  });
}

function progreso() {
  const b = document.querySelector<HTMLElement>("[data-progreso]");
  if (!b) return;
  gsap.fromTo(b, { scaleX: 0 }, {
    scaleX: 1, ease: "none", transformOrigin: "left center",
    scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 0.3 },
  });
}

// --- Botones magnéticos, tarjetas que se inclinan y cursor propio (solo ratón) ---
function magneticos() {
  $$("[data-magnetic]").forEach((el) => {
    const f = num(el, "data-magnetic", 0.3);
    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - r.left - r.width / 2) * f);
      yTo((e.clientY - r.top - r.height / 2) * f);
    });
    el.addEventListener("pointerleave", () => { xTo(0); yTo(0); });
  });
}

function inclinaciones() {
  $$("[data-tilt]").forEach((el) => {
    const max = num(el, "data-tilt", 7);
    gsap.set(el, { transformPerspective: 900, transformStyle: "preserve-3d" });
    const rx = gsap.quickTo(el, "rotationX", { duration: 0.6, ease: "power3.out" });
    const ry = gsap.quickTo(el, "rotationY", { duration: 0.6, ease: "power3.out" });
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      ry(px * max * 2); rx(-py * max * 2);
      el.style.setProperty("--mx", `${(px + 0.5) * 100}%`);
      el.style.setProperty("--my", `${(py + 0.5) * 100}%`);
    });
    el.addEventListener("pointerleave", () => { rx(0); ry(0); });
  });
}

function cursor() {
  const c = document.querySelector<HTMLElement>("[data-cursor]");
  if (!c) return;
  document.documentElement.classList.add("con-cursor");
  gsap.set(c, { xPercent: -50, yPercent: -50 });
  const xTo = gsap.quickTo(c, "x", { duration: 0.35, ease: "power3.out" });
  const yTo = gsap.quickTo(c, "y", { duration: 0.35, ease: "power3.out" });
  window.addEventListener("pointermove", (e) => { xTo(e.clientX); yTo(e.clientY); c.classList.add("on"); }, { passive: true });
  document.addEventListener("pointerleave", () => c.classList.remove("on"));
  const etq = c.querySelector<HTMLElement>("span");
  document.addEventListener("pointerover", (e) => {
    const t = (e.target as HTMLElement).closest<HTMLElement>("[data-cur], a, button, summary, label, input, select, textarea");
    const texto = t?.getAttribute("data-cur") || "";
    c.classList.toggle("activo", !!t && !texto);
    c.classList.toggle("texto", !!texto);
    if (etq) etq.textContent = texto;
  });
}
