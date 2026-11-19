// Demo reformas · baño en 3D configurable: paredes, suelo, mueble y grifería cambian al momento.
import {
  Scene, PerspectiveCamera, WebGLRenderer, Group, Mesh, BoxGeometry, CylinderGeometry, SphereGeometry, TorusGeometry,
  MeshStandardMaterial, HemisphereLight, DirectionalLight, PointLight, CanvasTexture, RepeatWrapping, SRGBColorSpace,
  PCFSoftShadowMap, Texture, PlaneGeometry,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export type Wall = 'blanco' | 'salvia' | 'arena' | 'grafito';
export type Floor = 'gris' | 'madera' | 'terrazo' | 'micro';
export type Vanity = 'roble' | 'blanco' | 'negro';
export type Tap = 'cromo' | 'negro' | 'oro';

/* ---------- texturas dibujadas en canvas (sin descargar imágenes) */
const rnd = (s: number) => () => { s = (s * 16807) % 2147483647; return s / 2147483647; };
function tiles(base: string, tw: number, th: number, cols: number, rows: number, opts: { vary?: number; grout?: string; gw?: number; gloss?: boolean; brick?: boolean } = {}) {
  const c = document.createElement('canvas'); c.width = 512; c.height = Math.round(512 * (rows * th) / (cols * tw));
  const g = c.getContext('2d')!; const r = rnd(7);
  const w = c.width / cols, h = c.height / rows;
  g.fillStyle = opts.grout ?? '#d9d6cf'; g.fillRect(0, 0, c.width, c.height);
  const gw = opts.gw ?? 3;
  for (let j = 0; j < rows; j++) for (let i = -1; i < cols + 1; i++) {
    const x = i * w + (opts.brick && j % 2 ? w / 2 : 0), y = j * h;
    const v = (r() - 0.5) * (opts.vary ?? 0.04);
    g.fillStyle = shade(base, v); g.fillRect(x + gw / 2, y + gw / 2, w - gw, h - gw);
    if (opts.gloss) { const gr = g.createLinearGradient(x, y, x + w, y + h); gr.addColorStop(0, 'rgba(255,255,255,.18)'); gr.addColorStop(0.5, 'rgba(255,255,255,0)'); g.fillStyle = gr; g.fillRect(x + gw / 2, y + gw / 2, w - gw, h - gw); }
  }
  return c;
}
function shade(hex: string, v: number) {
  const n = parseInt(hex.slice(1), 16); const f = (x: number) => Math.max(0, Math.min(255, Math.round(x * (1 + v))));
  return `rgb(${f(n >> 16)},${f((n >> 8) & 255)},${f(n & 255)})`;
}
function wood() {
  const c = document.createElement('canvas'); c.width = 512; c.height = 512; const g = c.getContext('2d')!; const r = rnd(3);
  for (let i = 0; i < 8; i++) {
    const y = i * 64; g.fillStyle = shade('#b8916a', (r() - 0.5) * 0.18); g.fillRect(0, y, 512, 64);
    for (let k = 0; k < 14; k++) { g.strokeStyle = `rgba(90,60,35,${0.06 + r() * 0.08})`; g.lineWidth = 1 + r() * 1.5; g.beginPath(); const yy = y + r() * 64; g.moveTo(0, yy); g.bezierCurveTo(170, yy + (r() - 0.5) * 10, 340, yy + (r() - 0.5) * 10, 512, yy + (r() - 0.5) * 6); g.stroke(); }
    g.fillStyle = 'rgba(60,40,25,.45)'; g.fillRect(0, y, 512, 2); const cut = r() * 512; g.fillRect(cut, y, 2, 64);
  }
  return c;
}
function speckle(base: string, dots: string[], n: number, size: number) {
  const c = document.createElement('canvas'); c.width = 512; c.height = 512; const g = c.getContext('2d')!; const r = rnd(11);
  g.fillStyle = base; g.fillRect(0, 0, 512, 512);
  for (let i = 0; i < n; i++) { g.fillStyle = dots[Math.floor(r() * dots.length)]; g.beginPath(); g.ellipse(r() * 512, r() * 512, size * (0.4 + r()), size * (0.3 + r() * 0.8), r() * 3, 0, 6.3); g.fill(); }
  return c;
}
function micro() {
  const c = document.createElement('canvas'); c.width = 512; c.height = 512; const g = c.getContext('2d')!; const r = rnd(5);
  g.fillStyle = '#cfcac1'; g.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 260; i++) { const x = r() * 512, y = r() * 512, rad = 20 + r() * 70; const gr = g.createRadialGradient(x, y, 0, x, y, rad); const a = 0.05 + r() * 0.07; gr.addColorStop(0, r() > 0.5 ? `rgba(255,255,255,${a})` : `rgba(120,110,95,${a})`); gr.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = gr; g.fillRect(x - rad, y - rad, rad * 2, rad * 2); }
  return c;
}

export const WALLS: Record<Wall, () => HTMLCanvasElement> = {
  blanco: () => tiles('#f4f2ee', 30, 60, 4, 2, { vary: 0.02, grout: '#e2ded6', gw: 2 }),
  salvia: () => tiles('#9fb09a', 7.5, 15, 8, 6, { vary: 0.16, grout: '#e8e4da', gw: 4, gloss: true, brick: true }),
  arena: () => tiles('#d9c9b0', 60, 120, 2, 1, { vary: 0.03, grout: '#cbbba3', gw: 2 }),
  grafito: () => tiles('#55585b', 60, 120, 2, 1, { vary: 0.05, grout: '#46494b', gw: 2 }),
};
const WALL_M: Record<Wall, number> = { blanco: 0.6, salvia: 1.2, arena: 1.2, grafito: 1.2 }; // metros que ocupa la textura
export const FLOORS: Record<Floor, () => HTMLCanvasElement> = {
  gris: () => tiles('#b9b7b2', 60, 60, 2, 2, { vary: 0.03, grout: '#a5a39e', gw: 2 }),
  madera: wood,
  terrazo: () => speckle('#e7e2d8', ['#b9a58a', '#8e9a92', '#d6c3a5', '#6f6a63', '#ffffff'], 1600, 3.2),
  micro,
};
const FLOOR_M: Record<Floor, number> = { gris: 1.2, madera: 1.6, terrazo: 0.8, micro: 2.2 };
const VANITY_C: Record<Vanity, number> = { roble: 0xb8916a, blanco: 0xf3f1ec, negro: 0x2a2a2a };
const TAP_C: Record<Tap, [number, number, number]> = { cromo: [0xe3e7ea, 0.35, 0.2], negro: [0x1d1d1d, 0.2, 0.5], oro: [0xd2ad6c, 0.45, 0.3] };

export function mountBath(stage: HTMLElement) {
  let renderer: WebGLRenderer;
  try { renderer = new WebGLRenderer({ antialias: true, alpha: true }); } catch { return null; }
  const small = innerWidth < 700;
  renderer.setPixelRatio(Math.min(devicePixelRatio, small ? 1.75 : 2));
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = PCFSoftShadowMap;
  const canvas = renderer.domElement; canvas.setAttribute('role', 'img'); canvas.setAttribute('aria-label', stage.dataset.label || '');
  stage.appendChild(canvas);
  let dirty = true, visible = true, raf = 0;

  const scene = new Scene();
  const camera = new PerspectiveCamera(38, 1, 0.05, 50);
  scene.add(new HemisphereLight(0xffffff, 0xd8d2c6, 1.25));
  const sun = new DirectionalLight(0xfff3e2, 1.6); sun.position.set(4, 5, 4); sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024); Object.assign(sun.shadow.camera, { left: -4, right: 4, top: 4, bottom: -4, near: 0.5, far: 20 }); sun.shadow.bias = -0.0005;
  scene.add(sun);
  const mirrorLight = new PointLight(0xfff1dc, 1.1, 2.5, 2); mirrorLight.position.set(1.8, 1.6, 0.35); scene.add(mirrorLight);

  const X = 2.8, Z = 2.1, Y = 2.55, T = 0.08;
  const mat = (c: number, r = 0.6, m = 0) => new MeshStandardMaterial({ color: c, roughness: r, metalness: m });
  const add = (g: Group | Scene, geo: BoxGeometry | CylinderGeometry | SphereGeometry | TorusGeometry | PlaneGeometry, m: MeshStandardMaterial, x: number, y: number, z: number) => {
    const me = new Mesh(geo, m); me.position.set(x, y, z); me.castShadow = true; me.receiveShadow = true; g.add(me); return me;
  };
  const tex = (c: HTMLCanvasElement, rx: number, ry: number) => { const t = new CanvasTexture(c); t.colorSpace = SRGBColorSpace; t.wrapS = t.wrapT = RepeatWrapping; t.repeat.set(rx, ry); t.anisotropy = 8; return t; };

  // paredes y suelo
  const backM = new MeshStandardMaterial({ roughness: 0.45 }), leftM = new MeshStandardMaterial({ roughness: 0.45 }), floorM = new MeshStandardMaterial({ roughness: 0.7 });
  add(scene, new BoxGeometry(X, Y, T), backM, X / 2, Y / 2, -T / 2);
  add(scene, new BoxGeometry(T, Y, Z), leftM, -T / 2, Y / 2, Z / 2);
  add(scene, new BoxGeometry(X + T, T, Z + T), floorM, X / 2 - T / 2, -T / 2, Z / 2 - T / 2);
  // zócalo exterior para que parezca una maqueta cortada
  add(scene, new BoxGeometry(X + T + 0.02, 0.18, Z + T + 0.02), mat(0xe9e6e0, 0.9), X / 2 - T / 2, -0.17, Z / 2 - T / 2);

  // ducha: plato, mampara, rociador, hornacina
  const white = mat(0xf7f6f3, 0.25);
  add(scene, new BoxGeometry(1.0, 0.035, 0.9), white, 0.5, 0.018, 0.45);
  const glass = new MeshStandardMaterial({ color: 0xd5e2ea, transparent: true, opacity: 0.22, roughness: 0.02, metalness: 0.1, depthWrite: false });
  const g1 = add(scene, new BoxGeometry(0.012, 2.0, 0.9), glass, 1.0, 1.04, 0.45); g1.castShadow = false;
  const metal = mat(0xe3e7ea, 0.2, 0.35);
  add(scene, new CylinderGeometry(0.012, 0.012, 0.35, 12), metal, 0.45, 2.15, 0.17).rotation.x = Math.PI / 2;
  add(scene, new CylinderGeometry(0.13, 0.13, 0.012, 32), metal, 0.45, 2.14, 0.33);
  add(scene, new CylinderGeometry(0.012, 0.012, 1.0, 12), metal, 0.15, 1.6, 0.012);
  add(scene, new BoxGeometry(0.06, 0.12, 0.06), metal, 0.15, 1.05, 0.03);
  add(scene, new BoxGeometry(0.5, 0.32, 0.02), mat(0xe8e5df, 0.5), 0.6, 1.25, 0.005); // hornacina (fondo)
  // mueble de lavabo suspendido
  const vanM = mat(0xb8916a, 0.55);
  add(scene, new BoxGeometry(1.0, 0.42, 0.48), vanM, 1.85, 0.72, 0.24);
  add(scene, new BoxGeometry(1.02, 0.03, 0.5), mat(0xf3f1ec, 0.3), 1.85, 0.945, 0.25);
  const sink = add(scene, new CylinderGeometry(0.2, 0.17, 0.12, 40), white, 1.85, 1.02, 0.27);
  add(scene, new CylinderGeometry(0.17, 0.17, 0.005, 40), mat(0xe5e3de, 0.3), 1.85, 1.08, 0.27);
  void sink;
  const tapM = mat(0xe3e7ea, 0.2, 0.35);
  add(scene, new CylinderGeometry(0.015, 0.015, 0.26, 16), tapM, 1.85, 1.1, 0.05);
  add(scene, new BoxGeometry(0.03, 0.03, 0.16), tapM, 1.85, 1.22, 0.12);
  add(scene, new CylinderGeometry(0.012, 0.012, 0.42, 12), tapM, 0.15, 1.6, 0.012);
  add(scene, new CylinderGeometry(0.11, 0.11, 0.012, 32), tapM, 0.45, 2.13, 0.33);
  // espejo con luz
  const mirror = add(scene, new BoxGeometry(0.9, 0.75, 0.03), new MeshStandardMaterial({ color: 0xc9d3d7, roughness: 0.06, metalness: 0.2 }), 1.85, 1.6, 0.02);
  add(scene, new BoxGeometry(0.94, 0.79, 0.01), new MeshStandardMaterial({ color: 0xfff6e8, emissive: 0xfff1d8, emissiveIntensity: 0.45 }), 1.85, 1.6, 0.004);
  void mirror;
  // inodoro suspendido y pulsador
  add(scene, new BoxGeometry(0.36, 0.34, 0.52), white, 2.55, 0.42, 0.28);
  add(scene, new BoxGeometry(0.22, 0.14, 0.012), tapM, 2.55, 1.0, 0.006);
  // toallero en la pared izquierda
  for (let i = 0; i < 7; i++) add(scene, new CylinderGeometry(0.012, 0.012, 0.5, 10), tapM, 0.03, 0.9 + i * 0.1, 1.55).rotation.x = Math.PI / 2;
  add(scene, new CylinderGeometry(0.015, 0.015, 0.75, 10), tapM, 0.03, 1.2, 1.3); add(scene, new CylinderGeometry(0.015, 0.015, 0.75, 10), tapM, 0.03, 1.2, 1.8);
  add(scene, new BoxGeometry(0.04, 0.5, 0.36), mat(0xe8e2d6, 0.95), 0.08, 1.15, 1.55); // toalla
  // planta
  add(scene, new CylinderGeometry(0.11, 0.09, 0.26, 20), mat(0xd8cbb8, 0.9), 2.55, 0.13, 1.6);
  for (let i = 0; i < 9; i++) { const l = add(scene, new SphereGeometry(0.09, 8, 6), mat(0x6f8f6a, 0.8), 2.55 + Math.cos(i) * 0.08, 0.38 + (i % 3) * 0.1, 1.6 + Math.sin(i) * 0.08); l.scale.set(0.6, 1.4, 0.6); }

  const set = { wall: 'blanco' as Wall, floor: 'gris' as Floor, vanity: 'roble' as Vanity, tap: 'cromo' as Tap };
  const disp: Texture[] = [];
  const apply = () => {
    disp.splice(0).forEach((t) => t.dispose());
    const wc = WALLS[set.wall](), wm = WALL_M[set.wall];
    const ratio = wc.height / wc.width;
    backM.map = tex(wc, X / wm, Y / (wm * ratio)); leftM.map = tex(wc, Z / wm, Y / (wm * ratio));
    const fc = FLOORS[set.floor](), fm = FLOOR_M[set.floor];
    floorM.map = tex(fc, X / fm, Z / fm);
    [backM, leftM, floorM].forEach((m) => { disp.push(m.map!); m.color.set(0xffffff); m.needsUpdate = true; });
    backM.roughness = leftM.roughness = set.wall === 'salvia' ? 0.25 : 0.45;
    floorM.roughness = set.floor === 'micro' ? 0.55 : set.floor === 'madera' ? 0.7 : 0.4;
    vanM.color.set(VANITY_C[set.vanity]); vanM.roughness = set.vanity === 'blanco' ? 0.3 : 0.6;
    const [c, m, r] = TAP_C[set.tap]; tapM.color.set(c); tapM.metalness = m; tapM.roughness = r;
    metal.color.set(c); metal.metalness = m; metal.roughness = r;
    dirty = true; kick();
  };

  const controls = new OrbitControls(camera, canvas);
  controls.target.set(1.3, 1.0, 0.7);
  controls.enableDamping = true; controls.enablePan = false;
  controls.minAzimuthAngle = -0.15; controls.maxAzimuthAngle = 1.45;
  controls.minPolarAngle = 0.55; controls.maxPolarAngle = 1.42;
  controls.minDistance = 3; controls.maxDistance = 7;
  stage.addEventListener('wheel', (e) => e.stopPropagation(), { capture: true });
  canvas.style.touchAction = 'pan-y';
  const fit = () => { const w = stage.clientWidth, h = stage.clientHeight; if (!w || !h) return; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); dirty = true; };
  fit();
  const dist = camera.aspect < 0.9 ? 6.6 : 5.4;
  camera.position.set(1.3 + dist * 0.62, 1.0 + dist * 0.42, 0.7 + dist * 0.66);
  new ResizeObserver(fit).observe(stage);
  controls.addEventListener('change', () => { dirty = true; });
  controls.addEventListener('start', () => stage.classList.add('touched'));

  const loop = () => { raf = 0; if (!visible || document.hidden) return; const m = controls.update(); if (m || dirty) { renderer.render(scene, camera); dirty = false; } raf = requestAnimationFrame(loop); };
  const kick = () => { if (!raf && visible && !document.hidden) raf = requestAnimationFrame(loop); };
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; kick(); }).observe(stage);
  document.addEventListener('visibilitychange', kick);
  apply(); stage.classList.add('is-live');

  return {
    set: <K extends keyof typeof set>(k: K, v: (typeof set)[K]) => { set[k] = v; apply(); },
    swatch: (kind: 'wall' | 'floor', key: string) => (kind === 'wall' ? WALLS[key as Wall]() : FLOORS[key as Floor]()).toDataURL('image/png'),
  };
}
