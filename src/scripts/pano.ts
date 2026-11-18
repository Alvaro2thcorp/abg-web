// Visita virtual 360º: fotos esféricas de cada estancia unidas con puntos de paso, como en Street View.
// Se carga solo cuando la sección se acerca a la pantalla (ver site.ts). Comparte three.js con la maqueta.
import { Scene, PerspectiveCamera, WebGLRenderer, Mesh, SphereGeometry, MeshBasicMaterial, TextureLoader, SRGBColorSpace, Vector3, Texture, LinearMipmapLinearFilter } from 'three';

type Hot = { to: string; u: number; v: number };
type Room = { id: string; name: string; src: string; start: [number, number]; hot: Hot[] };

// Punto de la foto (u, v de 0 a 1, desde arriba a la izquierda) → dirección en la esfera
const dir = (u: number, v: number, out = new Vector3()) => {
  const p = 2 * Math.PI * u, t = Math.PI * v;
  return out.set(Math.cos(p) * Math.sin(t), Math.cos(t), Math.sin(p) * Math.sin(t));
};

export function mountPano(root: HTMLElement) {
  const stage = root.querySelector<HTMLElement>('[data-pano-stage]')!;
  const rooms: Room[] = JSON.parse(root.dataset.rooms!);
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const big = Math.max(screen.width, screen.height) * devicePixelRatio > 1600 && !(navigator as any).connection?.saveData;
  const size = big ? 4096 : 2048;

  let renderer: WebGLRenderer;
  try { renderer = new WebGLRenderer({ antialias: false, powerPreference: 'high-performance' }); } catch { return; }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.outputColorSpace = SRGBColorSpace;
  const canvas = renderer.domElement;
  canvas.tabIndex = 0;
  canvas.setAttribute('role', 'img');
  canvas.setAttribute('aria-label', stage.dataset.label || '');
  stage.prepend(canvas);

  const scene = new Scene();
  const camera = new PerspectiveCamera(75, 1, 1, 1100);
  const geo = new SphereGeometry(500, 72, 36);
  geo.scale(-1, 1, 1);
  const mat = new MeshBasicMaterial();
  scene.add(new Mesh(geo, mat));

  const loader = new TextureLoader();
  const cache = new Map<string, Promise<Texture>>();
  const tex = (r: Room) => {
    if (!cache.has(r.id)) cache.set(r.id, loader.loadAsync(`${r.src}-${size}.webp`).then((t) => {
      t.colorSpace = SRGBColorSpace; t.minFilter = LinearMipmapLinearFilter; t.anisotropy = renderer.capabilities.getMaxAnisotropy();
      return t;
    }));
    return cache.get(r.id)!;
  };

  /* Mirada: u (giro) y v (arriba/abajo) */
  let u = 0.5, v = 0.5, fov = 75, curFov = 75, baseFov = 75, auto = !reduce;
  const look = new Vector3();
  const resize = () => {
    const w = stage.clientWidth, h = stage.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    const nb = camera.aspect < 0.9 ? 85 : 72;
    if (nb !== baseFov) { fov += nb - baseFov; curFov += nb - baseFov; baseFov = nb; }
    dirty = true;
  };

  /* Puntos de paso (HTML encima del lienzo) */
  const hotWrap = stage.querySelector<HTMLElement>('[data-pano-hots]')!;
  const nameEl = root.querySelector('[data-pano-name]');
  const tabs = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-pano-room]'));
  let cur: Room = rooms[0];
  let hotEls: { el: HTMLElement; p: Vector3 }[] = [];
  const buildHots = () => {
    hotWrap.innerHTML = '';
    hotEls = cur.hot.map((h) => {
      const to = rooms.find((r) => r.id === h.to)!;
      const el = document.createElement('button');
      el.type = 'button';
      el.className = 'pano__hot';
      el.innerHTML = `<i aria-hidden="true"></i><span>${to.name}</span>`;
      el.addEventListener('click', () => go(to.id));
      hotWrap.appendChild(el);
      return { el, p: dir(h.u, h.v).multiplyScalar(100) };
    });
  };
  const v3 = new Vector3();
  const placeHots = () => {
    const w = stage.clientWidth, h = stage.clientHeight;
    for (const { el, p } of hotEls) {
      v3.copy(p).project(camera);
      const vis = v3.z < 1 && Math.abs(v3.x) < 1.1 && Math.abs(v3.y) < 1.1;
      el.style.visibility = vis ? 'visible' : 'hidden';
      if (vis) { el.style.transform = `translate(${((v3.x + 1) / 2) * w}px, ${((1 - v3.y) / 2) * h}px)`; el.classList.toggle("l", v3.x > 0.25); }
    }
  };

  /* Cambio de estancia: acercarse, fundido y aparecer en la siguiente */
  let busy = false;
  const go = async (id: string, first = false) => {
    const next = rooms.find((r) => r.id === id);
    if (!next || busy || (next === cur && !first)) return;
    busy = true;
    tabs.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.panoRoom === id)));
    const t = tex(next);
    if (!first) {
      if (!reduce) fov = baseFov - 24; // paso hacia delante
      root.classList.add('fading');
      await Promise.all([t, new Promise((r) => setTimeout(r, reduce ? 0 : 320))]);
    }
    mat.map = await t; mat.needsUpdate = true;
    cur = next;
    [u, v] = next.start;
    fov = baseFov; if (!reduce) curFov = baseFov + 12;
    buildHots();
    if (nameEl) nameEl.textContent = next.name;
    root.classList.remove('fading');
    dirty = true; busy = false;
    if (first) root.classList.add('is-live');
    else (window as any).dataLayer?.push({ event: 'visita360_estancia', estancia: id });
    // precarga del resto de estancias, sin prisa
    if (first) setTimeout(() => rooms.forEach((r) => tex(r)), 1200);
  };
  tabs.forEach((b) => b.addEventListener('click', () => { auto = false; go(b.dataset.panoRoom!); }));

  /* Arrastrar para mirar. En el móvil, el gesto vertical sigue bajando la página */
  let dragging = false, px = 0, py = 0, vu = 0;
  canvas.style.touchAction = 'pan-y';
  canvas.addEventListener('pointerdown', (e) => { dragging = true; auto = false; px = e.clientX; py = e.clientY; vu = 0; canvas.setPointerCapture(e.pointerId); root.classList.add('touched'); });
  const end = () => { dragging = false; };
  canvas.addEventListener('pointerup', end);
  canvas.addEventListener('pointercancel', end);
  canvas.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const w = stage.clientWidth, h = stage.clientHeight;
    const hf = (2 * Math.atan(Math.tan((fov * Math.PI) / 360) * camera.aspect) * 180) / Math.PI;
    const du = -((e.clientX - px) / w) * (hf / 360);
    u += du; vu = du;
    if (e.pointerType === 'mouse') v -= ((e.clientY - py) / h) * (fov / 180);
    px = e.clientX; py = e.clientY;
    dirty = true;
  });
  canvas.addEventListener('keydown', (e) => {
    const k: Record<string, () => void> = {
      ArrowLeft: () => (u -= 0.02), ArrowRight: () => (u += 0.02), ArrowUp: () => (v -= 0.02), ArrowDown: () => (v += 0.02),
      '+': () => (fov -= 6), '=': () => (fov -= 6), '-': () => (fov += 6),
    };
    if (!k[e.key]) return;
    e.preventDefault(); auto = false; k[e.key](); dirty = true;
  });
  root.querySelector('[data-pano-in]')?.addEventListener('click', () => { auto = false; fov -= 10; dirty = true; });
  root.querySelector('[data-pano-out]')?.addEventListener('click', () => { auto = false; fov += 10; dirty = true; });
  const fs = root.querySelector<HTMLButtonElement>('[data-pano-fs]');
  if (fs && document.fullscreenEnabled) {
    fs.hidden = false;
    fs.addEventListener('click', () => (document.fullscreenElement ? document.exitFullscreen() : stage.requestFullscreen()));
  }

  /* Bucle: solo mientras se ve */
  let dirty = true, visible = false, raf = 0, last = 0;
  const loop = (t: number) => {
    raf = 0;
    if (!visible || document.hidden) return;
    const dt = Math.min(50, t - (last || t)); last = t;
    if (auto) { u += dt * 0.0000075; dirty = true; }
    if (!dragging && Math.abs(vu) > 0.00002) { u += vu; vu *= 0.9; dirty = true; }
    fov = Math.min(Math.max(fov, 35), 100);
    if (Math.abs(curFov - fov) > 0.05) { curFov += (fov - curFov) * (reduce ? 1 : 0.1); dirty = true; }
    v = Math.min(0.82, Math.max(0.18, v));
    if (dirty) {
      camera.fov = curFov; camera.updateProjectionMatrix();
      camera.lookAt(dir(u, v, look));
      renderer.render(scene, camera);
      placeHots();
      dirty = false;
    }
    raf = requestAnimationFrame(loop);
  };
  const kick = () => { if (!raf && visible && !document.hidden) { last = 0; raf = requestAnimationFrame(loop); } };
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; kick(); }).observe(stage);
  document.addEventListener('visibilitychange', kick);
  new ResizeObserver(resize).observe(stage);
  resize();
  go(rooms[0].id, true);
}
