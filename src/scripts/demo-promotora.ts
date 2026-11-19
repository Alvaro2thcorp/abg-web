// Demo promotora · Residencial Alba: edificio 3D con cada vivienda seleccionable, filtros, sol por horas,
// ficha con plano, reserva de visita e idiomas. Datos ficticios.
import {
  Scene, PerspectiveCamera, WebGLRenderer, Group, Mesh, BoxGeometry, CylinderGeometry, IcosahedronGeometry,
  MeshStandardMaterial, HemisphereLight, DirectionalLight, Box3, Vector3, Vector2, Raycaster, EdgesGeometry,
  LineSegments, LineBasicMaterial, PCFSoftShadowMap, SRGBColorSpace, Color, BufferGeometry, Float32BufferAttribute,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export type Unit = {
  id: string; floor: number; pos: 'A' | 'B' | 'C' | 'PH1' | 'PH2'; beds: number; baths: number; m2: number; terrace: number;
  price: number; status: 's' | 'r' | 'v'; orient: string; type: string;
};

/* ------------------------------------------------------------------ datos ficticios */
const ORIENT: Record<string, string> = { A: 'SO', B: 'S', C: 'SE', PH1: 'SO', PH2: 'SE' };
const STATUS: Unit['status'][][] = [
  ['v', 's', 'r'], // PB
  ['s', 'v', 's'],
  ['r', 's', 's'],
  ['s', 's', 'v'],
];
export const UNITS: Unit[] = [];
STATUS.forEach((row, f) => row.forEach((st, i) => {
  const pos = (['A', 'B', 'C'] as const)[i];
  const beds = pos === 'B' ? 2 : 3;
  const m2 = (pos === 'B' ? 84 : 112) + f * 2;
  const terrace = f === 0 ? (pos === 'B' ? 38 : 64) : pos === 'B' ? 14 : 22; // PB con jardín privado
  const price = Math.round((pos === 'B' ? 289000 : 365000) * (1 + f * 0.035) / 1000) * 1000;
  UNITS.push({ id: `${f === 0 ? 'B' : f}${pos}`, floor: f, pos, beds, baths: beds === 3 ? 2 : 2, m2, terrace, price, status: st, orient: ORIENT[pos], type: f === 0 ? 'garden' : 'flat' });
}));
UNITS.push({ id: 'ÁT1', floor: 4, pos: 'PH1', beds: 3, baths: 2, m2: 128, terrace: 86, price: 545000, status: 's', orient: 'SO', type: 'ph' });
UNITS.push({ id: 'ÁT2', floor: 4, pos: 'PH2', beds: 3, baths: 3, m2: 134, terrace: 92, price: 579000, status: 'r', orient: 'SE', type: 'ph' });

/* ------------------------------------------------------------------ textos en 3 idiomas */
type L = 'es' | 'en' | 'de';
export const T: Record<L, Record<string, string>> = {
  es: { s: 'Disponible', r: 'Reservada', v: 'Vendida', beds: 'dormitorios', baths: 'baños', built: 'construidos', terrace: 'Terraza', garden: 'Jardín privado', solarium: 'Solárium', orient: 'Orientación', floor: 'Planta', pb: 'Planta baja', ph: 'Ático', from: 'Precio', book: 'Reservar visita', dossier: 'Descargar dosier', avail: 'disponibles', of: 'de', pick: 'Toca una vivienda en el edificio', bed: 'Dormitorio', living: 'Salón · cocina', bath: 'Baño', hall: 'Recibidor', laundry: 'Lavadero', sun: 'Sol en la terraza', close: 'Cerrar', sent: 'Visita solicitada', sentD: 'En la web real, esta petición te llegaría al momento con la vivienda, el día y la hora.', dossierD: 'En la web real se descarga el dosier en PDF de esta vivienda, con planos y calidades.', none: 'Ninguna vivienda cumple estos filtros.', sold: 'Esta vivienda está vendida. Te avisamos si se libera alguna parecida.', notify: 'Avisarme', when: 'Elige día y hora', send: 'Confirmar visita', name: 'Nombre', phone: 'Teléfono' },
  en: { s: 'Available', r: 'Reserved', v: 'Sold', beds: 'bedrooms', baths: 'bathrooms', built: 'built', terrace: 'Terrace', garden: 'Private garden', solarium: 'Sun deck', orient: 'Orientation', floor: 'Floor', pb: 'Ground floor', ph: 'Penthouse', from: 'Price', book: 'Book a viewing', dossier: 'Download brochure', avail: 'available', of: 'of', pick: 'Tap a home on the building', bed: 'Bedroom', living: 'Living · kitchen', bath: 'Bathroom', hall: 'Hall', laundry: 'Utility', sun: 'Sun on the terrace', close: 'Close', sent: 'Viewing requested', sentD: 'On the real website this request would reach you instantly, with the home, day and time.', dossierD: 'On the real website the PDF brochure for this home downloads, with plans and specifications.', none: 'No homes match these filters.', sold: 'This home is sold. We will let you know if a similar one becomes available.', notify: 'Notify me', when: 'Pick a day and time', send: 'Confirm viewing', name: 'Name', phone: 'Phone' },
  de: { s: 'Verfügbar', r: 'Reserviert', v: 'Verkauft', beds: 'Schlafzimmer', baths: 'Bäder', built: 'Wohnfläche', terrace: 'Terrasse', garden: 'Privatgarten', solarium: 'Sonnendeck', orient: 'Ausrichtung', floor: 'Etage', pb: 'Erdgeschoss', ph: 'Penthouse', from: 'Preis', book: 'Besichtigung buchen', dossier: 'Exposé herunterladen', avail: 'verfügbar', of: 'von', pick: 'Tippen Sie auf eine Wohnung', bed: 'Schlafzimmer', living: 'Wohnen · Küche', bath: 'Bad', hall: 'Diele', laundry: 'Hauswirtschaft', sun: 'Sonne auf der Terrasse', close: 'Schließen', sent: 'Besichtigung angefragt', sentD: 'Auf der echten Website erreicht Sie diese Anfrage sofort, mit Wohnung, Tag und Uhrzeit.', dossierD: 'Auf der echten Website wird das PDF-Exposé dieser Wohnung mit Plänen und Ausstattung heruntergeladen.', none: 'Keine Wohnung entspricht diesen Filtern.', sold: 'Diese Wohnung ist verkauft. Wir informieren Sie, wenn eine ähnliche frei wird.', notify: 'Benachrichtigen', when: 'Tag und Uhrzeit wählen', send: 'Besichtigung bestätigen', name: 'Name', phone: 'Telefon' },
};
const LOCALE: Record<L, string> = { es: 'es-ES', en: 'en-GB', de: 'de-DE' };

/* ------------------------------------------------------------------ plano en SVG generado por tipo */
export function planSVG(u: Unit, lang: L) {
  const t = T[lang];
  const W = 300, H = 210, g = 6;
  const rooms: [number, number, number, number, string][] = [];
  if (u.beds === 2) {
    rooms.push([0, 0, 170, 120, t.living], [170, 0, 130, 70, `${t.bed} 1`], [170, 70, 130, 70, `${t.bed} 2`], [0, 120, 90, 90, t.bath], [90, 120, 80, 90, t.hall], [170, 140, 130, 70, t.bath + ' 2']);
  } else {
    rooms.push([0, 0, 180, 120, t.living], [180, 0, 120, 70, `${t.bed} 1`], [180, 70, 120, 70, `${t.bed} 2`], [180, 140, 120, 70, `${t.bed} 3`], [0, 120, 80, 90, t.bath], [80, 120, 100, 50, t.hall], [80, 170, 100, 40, t.laundry]);
  }
  const terrLabel = u.type === 'garden' ? t.garden : u.type === 'ph' ? t.solarium : t.terrace;
  const r = rooms.map(([x, y, w, h, l]) => `<rect x="${x + g}" y="${y + g}" width="${w}" height="${h}" class="pl-r"/><text x="${x + g + w / 2}" y="${y + g + h / 2}" class="pl-t">${l}</text>`).join('');
  return `<svg viewBox="0 0 ${W + 2 * g} ${H + 2 * g + 54}" class="plan" role="img" aria-label="${u.id}">
    <rect x="${g}" y="${g}" width="${W}" height="${H}" class="pl-o"/>${r}
    <rect x="${g}" y="${H + g + 10}" width="${W}" height="40" class="pl-ter"/><text x="${g + W / 2}" y="${H + g + 31}" class="pl-t">${terrLabel} · ${u.terrace} m²</text>
    <path d="M${W - 18} ${H + g + 18} l8 -10 l8 10" class="pl-n"/><text x="${W - 10}" y="${H + g + 4}" class="pl-t pl-s">S</text>
  </svg>`;
}

/* ------------------------------------------------------------------ escena */
export function mountBuilding(root: HTMLElement, api: { onPick: (u: Unit | null) => void }) {
  const stage = root.querySelector<HTMLElement>('[data-b-stage]')!;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const small = innerWidth < 700;
  let renderer: WebGLRenderer;
  try { renderer = new WebGLRenderer({ antialias: true, alpha: true }); } catch { return null; }
  renderer.setPixelRatio(Math.min(devicePixelRatio, small ? 1.75 : 2));
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFSoftShadowMap;
  const canvas = renderer.domElement;
  canvas.setAttribute('role', 'img');
  canvas.setAttribute('aria-label', stage.dataset.label || '');
  stage.appendChild(canvas);

  let dirty = true, visible = true, raf = 0, padX = 0;
  const scene = new Scene();
  const camera = new PerspectiveCamera(28, 1, 1, 500);
  const hemi = new HemisphereLight(0xffffff, 0xe2ddd2, 1.35);
  scene.add(hemi);
  const sun = new DirectionalLight(0xfff6e8, 2.3);
  sun.castShadow = true;
  sun.shadow.mapSize.set(small ? 1024 : 2048, small ? 1024 : 2048);
  Object.assign(sun.shadow.camera, { left: -26, right: 26, top: 26, bottom: -26, near: 1, far: 120 });
  sun.shadow.bias = -0.0004; sun.shadow.normalBias = 0.03;
  scene.add(sun, sun.target);

  const std = (c: number, r = 0.9) => new MeshStandardMaterial({ color: c, roughness: r });
  const edge = new LineBasicMaterial({ color: 0x8f8d87, transparent: true, opacity: 0.4 });
  const glass = new MeshStandardMaterial({ color: 0xbcd0e2, transparent: true, opacity: 0.38, roughness: 0.05, depthWrite: false });
  const box = (g: Group, m: MeshStandardMaterial, x0: number, y0: number, z0: number, x1: number, y1: number, z1: number, e = true) => {
    const geo = new BoxGeometry(x1 - x0, y1 - y0, z1 - z0);
    const me = new Mesh(geo, m);
    me.position.set((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
    me.castShadow = m !== glass; me.receiveShadow = true; g.add(me);
    if (e) { const l = new LineSegments(new EdgesGeometry(geo), edge); l.position.copy(me.position); g.add(l); }
    return me;
  };

  // Parcela, piscina, jardín
  const site = new Group(); scene.add(site);
  const grass = std(0xd3d9c8), slab = std(0xe4e1da, 0.95), white = std(0xf8f7f4), wood = std(0xc8a57d, 0.8), water = std(0x6f8fae, 0.25);
  box(site, slab, -20, -1, -14, 20, 0, 16);
  box(site, grass, -19, 0, 7, -3, 0.06, 15, false);
  box(site, grass, 8, 0, 7, 19, 0.06, 15, false);
  box(site, water, -2, 0, 8.5, 7, 0.08, 13, false);
  box(site, white, -2.3, 0, 8.2, 7.3, 0.12, 8.5); box(site, white, -2.3, 0, 13, 7.3, 0.12, 13.3);
  box(site, white, -2.3, 0, 8.5, -2, 0.12, 13); box(site, white, 7, 0, 8.5, 7.3, 0.12, 13);
  const palm = std(0xf8f7f4);
  const leaf = new BoxGeometry(1.5, 0.04, 0.28); leaf.translate(0.75, 0, 0);
  for (const [x, z, h] of [[-17, 12, 6], [-12, 14, 5], [11, 13, 6.5], [17, 9, 5], [16, -11, 6], [-17, -11, 5.5]]) {
    const t = new Mesh(new CylinderGeometry(0.06, 0.1, h, 6), palm); t.position.set(x, h / 2, z); t.castShadow = true; site.add(t);
    for (let i = 0; i < 8; i++) { const l = new Mesh(leaf, palm); l.position.set(x, h, z); l.rotation.set(0, (i / 8) * Math.PI * 2 + x, -0.45 - (i % 2) * 0.25); l.castShadow = true; site.add(l); }
  }
  for (const [x, z, r] of [[-9, 11, 0.9], [-6, 13.5, 0.7], [13, 11, 0.8]]) { const c = new Mesh(new IcosahedronGeometry(r, 1), white); c.position.set(x, r, z); c.castShadow = true; site.add(c); }

  // Edificio: 4 plantas × 3 viviendas + 2 áticos. Fachada principal al sur (+z).
  const H = 3.2, W = 7, D = 10, X0 = -10.5;
  const unitGroups = new Map<string, { g: Group; body: MeshStandardMaterial; base: Color; u: Unit }>();
  const core = new Group(); scene.add(core);
  box(core, std(0xe9e6df), X0 - 0.3, 0, -6.3, X0 + 3 * W + 0.3, 0.4, D - 5.7); // forjado de arranque
  for (const u of UNITS) {
    const g = new Group(); g.userData.unit = u.id;
    const bodyMat = std(0xf8f7f4);
    const y0 = 0.4 + u.floor * H;
    if (u.type === 'ph') {
      const x0 = u.pos === 'PH1' ? X0 + 1.2 : X0 + 1.5 * W + 0.3, x1 = x0 + 1.5 * W - 1.5;
      box(g, bodyMat, x0, y0, -5.5, x1, y0 + 2.9, 1.6);
      box(g, glass, x0 + 0.3, y0 + 0.2, 1.6, x1 - 0.3, y0 + 2.6, 1.7, false);
      box(g, std(0xebe8e2), x0 - 0.5, y0 + 2.9, -6, x1 + 0.5, y0 + 3.15, 2); // cubierta
      box(g, wood, x0, y0 - 0.05, 1.7, x1, y0 + 0.05, 4.4, false); // tarima solárium
      for (let z = 1.9; z < 4.4; z += 0.5) box(g, wood, x0, y0 + 2.75, z, x1, y0 + 2.85, z + 0.12, false); // pérgola
      box(g, white, x0, y0, 4.3, x0 + 0.12, y0 + 2.85, 4.4, false); box(g, white, x1 - 0.12, y0, 4.3, x1, y0 + 2.85, 4.4, false);
      box(g, glass, x0, y0, 4.4, x1, y0 + 1.05, 4.45, false);
    } else {
      const i = ['A', 'B', 'C'].indexOf(u.pos), x0 = X0 + i * W, x1 = x0 + W;
      box(g, bodyMat, x0 + 0.08, y0, -5.5, x1 - 0.08, y0 + H - 0.25, D - 7);
      box(g, glass, x0 + 0.6, y0 + 0.15, D - 7, x1 - 0.6, y0 + H - 0.5, D - 6.9, false);
      // terraza volada con barandilla de vidrio
      const tz = u.floor === 0 ? D - 2 : D - 5.1;
      box(g, std(0xefece6), x0 + 0.08, y0 - 0.25, D - 7, x1 - 0.08, y0, tz);
      if (u.floor > 0) box(g, glass, x0 + 0.1, y0, tz - 0.06, x1 - 0.1, y0 + 1.05, tz, false);
      // celosía de madera en el lado
      if (u.pos !== 'B') { const sx = u.pos === 'A' ? x0 + 0.12 : x1 - 0.42; for (let k = 0; k < 6; k++) box(g, wood, sx, y0, D - 7 + 0.2 + k * 0.42, sx + 0.3, y0 + H - 0.3, D - 7 + 0.32 + k * 0.42, false); }
      if (u.floor === 0) { box(g, std(0xd3d9c8), x0 + 0.3, 0.02, tz, x1 - 0.3, 0.1, tz + 3.5, false); }
    }
    g.traverse((o) => { o.userData.unit = u.id; });
    scene.add(g);
    unitGroups.set(u.id, { g, body: bodyMat, base: bodyMat.color.clone(), u });
  }
  // escaleras/núcleo trasero
  box(core, std(0xe9e6df), X0 + W - 1, 0.4, -7.5, X0 + 2 * W + 1, 0.4 + 4 * H + 0.5, -5.5);

  /* -------- cámara y controles */
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true; controls.dampingFactor = 0.08; controls.enablePan = false;
  controls.maxPolarAngle = 1.38; controls.minPolarAngle = 0.3; controls.rotateSpeed = 0.7;
  controls.autoRotate = !reduce; controls.autoRotateSpeed = 0.35;
  controls.target.set(0, 6, 1);
  stage.addEventListener('wheel', (e) => e.stopPropagation(), { capture: true });
  canvas.style.touchAction = 'pan-y';
  controls.addEventListener('start', () => { controls.autoRotate = false; root.classList.add('touched'); });
  const fit = () => {
    const w = stage.clientWidth, h = stage.clientHeight; if (!w || !h) return 0;
    renderer.setSize(w, h, false); camera.aspect = w / h;
    if (padX) camera.setViewOffset(w + padX, h, padX, 0, w, h); else camera.clearViewOffset();
    camera.updateProjectionMatrix();
    const d = camera.aspect < 0.9 ? 96 : camera.aspect < 1.3 ? 80 : 70;
    controls.minDistance = d * 0.55; controls.maxDistance = d * 1.3; return d;
  };
  const d0 = fit() || 54;
  camera.position.set(d0 * 0.38, d0 * 0.36, d0 * 0.85).add(controls.target);
  new ResizeObserver(() => { fit(); dirty = true; }).observe(stage);

  /* -------- sol según la hora (fachada al sur) */
  const setSun = (hour: number) => {
    const t = (hour - 6) / 15; // 6 h → 21 h
    const az = Math.PI * (1 - t); // este (+x) → oeste (-x)
    const el = Math.sin(Math.PI * t) * 1.05 + 0.08;
    const r = 60;
    sun.position.set(Math.cos(az) * r * Math.cos(el), Math.sin(el) * r, 35 * Math.cos(el) + 10);
    sun.target.position.set(0, 0, 0);
    const warm = 1 - Math.sin(Math.PI * t);
    sun.color.setRGB(1, 0.93 - warm * 0.2, 0.86 - warm * 0.35);
    sun.intensity = 1.2 + Math.sin(Math.PI * t) * 1.3;
    hemi.intensity = 0.75 + Math.sin(Math.PI * t) * 0.45;
    dirty = true;
  };
  setSun(16);

  /* -------- estado visual de cada vivienda */
  const TINT: Record<Unit['status'], number> = { s: 0xffffff, r: 0xe9c88a, v: 0x8f8d87 };
  const SEL = new Color(0x9db3c8);
  let mode: 'status' | 'plain' = 'status';
  let selected: string | null = null;
  let matches = new Set(UNITS.map((u) => u.id));
  const selMat = new LineBasicMaterial({ color: 0x45627f });
  const hMat = new MeshStandardMaterial({ color: 0x45627f });
  let selBox: Group | null = null;
  const paint = () => {
    for (const [id, o] of unitGroups) {
      const c = new Color(mode === 'status' ? TINT[o.u.status] : 0xf8f7f4);
      if (id === selected) c.lerp(SEL, 0.55);
      o.body.color.copy(c);
      const on = matches.has(id);
      o.body.transparent = !on; o.body.opacity = on ? 1 : 0.22; o.body.depthWrite = on;
      o.g.position.z += ((id === selected ? 0.9 : 0) - o.g.position.z) * 1; // salida hacia fuera
    }
    dirty = true;
  };
  const outline = (bb: Box3) => {
    const g = new Group(); const { min: a, max: b } = bb;
    const c = [[a.x, a.y, a.z], [b.x, a.y, a.z], [b.x, a.y, b.z], [a.x, a.y, b.z], [a.x, b.y, a.z], [b.x, b.y, a.z], [b.x, b.y, b.z], [a.x, b.y, b.z]];
    const idx = [0, 1, 1, 2, 2, 3, 3, 0, 4, 5, 5, 6, 6, 7, 7, 4, 0, 4, 1, 5, 2, 6, 3, 7];
    const geo = new BufferGeometry(); geo.setAttribute('position', new Float32BufferAttribute(idx.flatMap((i) => c[i]), 3));
    g.add(new LineSegments(geo, selMat));
    const hg = new BoxGeometry(0.3, 0.3, 0.3);
    c.forEach(([x, y, z]) => { const h = new Mesh(hg, hMat); h.position.set(x, y, z); g.add(h); });
    return g;
  };
  const select = (id: string | null, fromApi = false) => {
    selected = id;
    if (selBox) { selBox.parent?.remove(selBox); selBox = null; }
    paint();
    if (id) {
      const o = unitGroups.get(id)!;
      const bb = new Box3().setFromObject(o.g).expandByScalar(0.25);
      selBox = outline(bb); scene.add(selBox);
      controls.autoRotate = false;
      // girar la cámara hacia el frente si mira por detrás
      const off = camera.position.clone().sub(controls.target);
      if (off.z < 0) { off.z = Math.abs(off.z); camera.position.copy(controls.target).add(off); }
      const ty = bb.getCenter(new Vector3()).y;
      aimY = Math.max(3, Math.min(12, ty));
    }
    if (!fromApi) api.onPick(id ? unitGroups.get(id)!.u : null);
  };
  let aimY: number | null = null;

  /* -------- tocar en el edificio */
  const ray = new Raycaster(), ptr = new Vector2();
  const pick = (cx: number, cy: number) => {
    const r = canvas.getBoundingClientRect();
    ptr.set(((cx - r.left) / r.width) * 2 - 1, -((cy - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ptr, camera);
    const hit = ray.intersectObjects([...unitGroups.values()].map((o) => o.g), true).find((h) => (h.object as Mesh).isMesh && (h.object as Mesh).material !== glass && matches.has(h.object.userData.unit));
    return (hit?.object.userData.unit as string) ?? null;
  };
  let down: [number, number] | null = null;
  canvas.addEventListener('pointerdown', (e) => { down = [e.clientX, e.clientY]; });
  canvas.addEventListener('pointerup', (e) => { if (down && Math.hypot(e.clientX - down[0], e.clientY - down[1]) < 6) { const id = pick(e.clientX, e.clientY); if (id) select(id); } });
  if (matchMedia('(hover:hover)').matches) {
    let pend = false;
    canvas.addEventListener('pointermove', (e) => { if (pend || e.buttons) return; pend = true; requestAnimationFrame(() => { pend = false; const id = pick(e.clientX, e.clientY); canvas.style.cursor = id ? 'pointer' : 'grab'; root.dispatchEvent(new CustomEvent('unit-hover', { detail: id })); }); });
  }

  /* -------- bucle */
  // (dirty/visible/raf se declaran arriba)
  controls.addEventListener('change', () => { dirty = true; });
  const loop = () => {
    raf = 0; if (!visible || document.hidden) return;
    let moving = controls.update();
    if (aimY !== null) { const d = (aimY - controls.target.y) * 0.1; controls.target.y += d; camera.position.y += d; moving = true; if (Math.abs(d) < 0.005) aimY = null; }
    if (moving || dirty || controls.autoRotate) { renderer.render(scene, camera); dirty = false; }
    raf = requestAnimationFrame(loop);
  };
  const kick = () => { if (!raf && visible && !document.hidden) raf = requestAnimationFrame(loop); };
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; kick(); }).observe(stage);
  document.addEventListener('visibilitychange', kick);
  paint(); renderer.render(scene, camera); root.classList.add('is-live'); kick();

  return {
    select: (id: string | null) => { select(id, true); kick(); },
    filter: (ids: Set<string>) => { matches = ids; if (selected && !ids.has(selected)) select(null); paint(); kick(); },
    setMode: (m: 'status' | 'plain') => { mode = m; paint(); kick(); },
    setSun: (h: number) => { setSun(h); kick(); },
    // deja hueco a la ficha lateral: el edificio se centra en la parte visible
    pad: (px: number) => { padX = px; fit(); dirty = true; kick(); },
    fmt: (n: number, l: L) => new Intl.NumberFormat(LOCALE[l], { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n),
  };
}
