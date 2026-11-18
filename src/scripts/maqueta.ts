// Maqueta 3D de una vivienda de ejemplo, hecha con código (sin archivo 3D que descargar).
// Se carga solo cuando la sección se acerca a la pantalla (ver site.ts). Arrastrar = girar.
// Plantas seleccionables con la caja de la marca y vista "por plantas" que separa los pisos.
import {
  Scene, PerspectiveCamera, WebGLRenderer, Group, Mesh, BoxGeometry, CylinderGeometry, IcosahedronGeometry,
  MeshStandardMaterial, HemisphereLight, DirectionalLight, Box3, Vector3, Vector2, Raycaster, EdgesGeometry,
  LineSegments, LineBasicMaterial, PCFSoftShadowMap, SRGBColorSpace, BufferGeometry, Float32BufferAttribute, Object3D,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

type LevelId = 'pb' | 'p1' | 'terraza' | 'jardin';
const ACERO = 0x45627f;

export function mountMaqueta(root: HTMLElement) {
  const stage = root.querySelector<HTMLElement>('[data-mq-stage]')!;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const small = innerWidth < 700;

  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  } catch { return; } // sin WebGL: se queda la imagen fija
  renderer.setPixelRatio(Math.min(devicePixelRatio, small ? 1.75 : 2));
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFSoftShadowMap;
  const canvas = renderer.domElement;
  canvas.tabIndex = 0;
  canvas.setAttribute('role', 'img');
  canvas.setAttribute('aria-label', stage.dataset.label || '');
  stage.appendChild(canvas);

  const scene = new Scene();
  const camera = new PerspectiveCamera(30, 1, 1, 400);

  scene.add(new HemisphereLight(0xffffff, 0xcfccc4, 1.15));
  const sun = new DirectionalLight(0xffffff, 2.1);
  sun.position.set(-16, 30, 20);
  sun.castShadow = true;
  sun.shadow.mapSize.set(small ? 1024 : 2048, small ? 1024 : 2048);
  Object.assign(sun.shadow.camera, { left: -22, right: 22, top: 22, bottom: -22, near: 1, far: 90 });
  sun.shadow.bias = -0.0004;
  sun.shadow.normalBias = 0.03;
  scene.add(sun);

  /* ---------- Construcción ---------- */
  const edgeMat = new LineBasicMaterial({ color: 0x8f8d87, transparent: true, opacity: 0.45 });
  const glassEdge = new LineBasicMaterial({ color: 0x7f97ae, transparent: true, opacity: 0.6 });
  const glassMat = new MeshStandardMaterial({ color: 0xc9d7e4, transparent: true, opacity: 0.32, roughness: 0.08, depthWrite: false });
  const waterMat = new MeshStandardMaterial({ color: 0x6f8fae, roughness: 0.2 });

  type Mats = { white: MeshStandardMaterial; slab: MeshStandardMaterial; furn: MeshStandardMaterial };
  const BASE = { white: 0xf8f7f4, slab: 0xe2e0da, furn: 0xebe9e4 };
  const mats = (): Mats => ({
    white: new MeshStandardMaterial({ color: BASE.white, roughness: 0.92 }),
    slab: new MeshStandardMaterial({ color: BASE.slab, roughness: 0.95 }),
    furn: new MeshStandardMaterial({ color: BASE.furn, roughness: 0.9 }),
  });

  const box = (g: Object3D, m: MeshStandardMaterial, x0: number, y0: number, z0: number, x1: number, y1: number, z1: number, edges = true) => {
    const w = x1 - x0, h = y1 - y0, d = z1 - z0;
    const geo = new BoxGeometry(w, h, d);
    const mesh = new Mesh(geo, m);
    mesh.position.set(x0 + w / 2, y0 + h / 2, z0 + d / 2);
    mesh.castShadow = m !== glassMat;
    mesh.receiveShadow = true;
    g.add(mesh);
    if (edges) { const e = new LineSegments(new EdgesGeometry(geo), m === glassMat ? glassEdge : edgeMat); e.position.copy(mesh.position); g.add(e); }
    return mesh;
  };
  // Cristalera a lo largo de X (plano z) o de Z (plano x), con montantes cada ~1,6 m
  const glassX = (g: Group, m: Mats, x0: number, x1: number, z: number, y0: number, y1: number) => {
    box(g, glassMat, x0, y0, z - 0.03, x1, y1, z + 0.03);
    const n = Math.max(1, Math.round((x1 - x0) / 1.6));
    for (let i = 0; i <= n; i++) { const x = x0 + ((x1 - x0) * i) / n; box(g, m.white, x - 0.05, y0, z - 0.06, x + 0.05, y1, z + 0.06, false); }
  };
  const glassZ = (g: Group, m: Mats, z0: number, z1: number, x: number, y0: number, y1: number) => {
    box(g, glassMat, x - 0.03, y0, z0, x + 0.03, y1, z1);
    const n = Math.max(1, Math.round((z1 - z0) / 1.6));
    for (let i = 0; i <= n; i++) { const z = z0 + ((z1 - z0) * i) / n; box(g, m.white, x - 0.06, y0, z - 0.05, x + 0.06, y1, z + 0.05, false); }
  };

  const groups = {} as Record<LevelId, Group>;
  const gmats = {} as Record<LevelId, Mats>;
  const mk = (id: LevelId) => { const g = new Group(); g.userData.level = id; groups[id] = g; gmats[id] = mats(); scene.add(g); return [g, gmats[id]] as const; };

  // Planta baja: x[-8,4] z[-5,3]
  {
    const [g, m] = mk('pb');
    box(g, m.slab, -8.3, 0, -5.3, 4.3, 0.3, 3.3);
    const y0 = 0.3, y1 = 3.2;
    box(g, m.white, -8, y0, -5, -7.8, y1, 3);
    glassX(g, m, -7.8, 2, 2.9, y0, y1);
    box(g, m.white, 2, y0, 2.8, 4, y1, 3);
    box(g, m.white, -7.8, y0, -5, -4, y1, -4.8);
    glassX(g, m, -4, -1, -4.9, y0, y1);
    box(g, m.white, -1, y0, -5, 4, y1, -4.8);
    glassZ(g, m, -4.8, -1, 3.9, y0, y1);
    box(g, m.white, 3.8, y0, -1, 4, y1, 2.8);
    // tabiques
    box(g, m.white, -2.1, y0, -4.8, -1.9, y1, -1.5);
    box(g, m.white, 1, y0, -2.1, 3.8, y1, -1.9);
    box(g, m.white, 0.9, y0, -4.8, 1.1, y1, -2.1);
    // muebles
    box(g, m.furn, -7.3, y0, 0.6, -4.6, 0.85, 1.5);
    box(g, m.furn, -7.3, y0, -1.5, -6.4, 0.85, 0.6);
    box(g, m.furn, -5.8, y0, -0.7, -4.8, 0.62, 0.2);
    box(g, m.furn, -0.4, y0, -0.9, 2.6, 1.2, 0.1);
    box(g, m.furn, -1.8, y0, -4.8, 0.8, 1.2, -4.2);
    box(g, m.furn, -3.6, y0, 0.7, -1.6, 1.05, 1.8);
  }
  // Terraza sobre la planta baja (cubierta de la PB, peto y pérgola)
  {
    const [g, m] = mk('terraza');
    box(g, m.white, -8.3, 3.2, -5.3, 4.3, 3.5, 3.3);
    box(g, m.white, -8.3, 3.5, 3.1, -4.1, 4.4, 3.3);
    box(g, m.white, -8.3, 3.5, -5.3, -8.1, 4.4, 3.1);
    box(g, m.white, -8.1, 3.5, -5.3, -4.1, 4.4, -5.1);
    for (const [x, z] of [[-8, -5], [-4.5, -5], [-8, 2.85], [-4.5, 2.85]]) box(g, m.white, x, 3.5, z, x + 0.14, 6.1, z + 0.14, false);
    for (let z = -5; z <= 2.9; z += 0.55) box(g, m.white, -8.1, 6.0, z, -4.3, 6.12, z + 0.14, false);
    box(g, m.furn, -7.5, 3.5, 0.2, -6.9, 3.78, 2.3);
    box(g, m.furn, -6.5, 3.5, 0.2, -5.9, 3.78, 2.3);
  }
  // Planta primera: x[-4,7] z[-6,1.5] · vuela sobre la piscina
  {
    const [g, m] = mk('p1');
    box(g, m.slab, -4.1, 3.5, -6.1, 7.1, 3.8, 1.6);
    const y0 = 3.8, y1 = 6.6;
    box(g, m.white, -4, y0, 1.3, -1, y1, 1.5);
    glassX(g, m, -1, 6.85, 1.4, y0, y1);
    glassZ(g, m, -5.8, 1.3, 6.9, y0, y1);
    box(g, m.white, -4, y0, -6, 7, y1, -5.8);
    box(g, m.white, -4, y0, -5.8, -3.8, y1, 1.3);
    // dormitorios
    box(g, m.white, 0.9, y0, -5.8, 1.1, y1, -1.5);
    box(g, m.white, 3.9, y0, -5.8, 4.1, y1, -1.5);
    box(g, m.white, -3.8, y0, -1.7, 0.1, y1, -1.5);
    box(g, m.white, 1.1, y0, -1.7, 3.1, y1, -1.5);
    box(g, m.white, 4.1, y0, -1.7, 6.0, y1, -1.5);
    box(g, m.furn, -2.7, y0, -5.6, -0.8, 4.3, -3.4);
    box(g, m.furn, 1.6, y0, -5.6, 3.4, 4.3, -3.7);
    box(g, m.furn, 4.7, y0, -5.6, 6.6, 4.3, -3.3);
    box(g, m.furn, 2.2, y0, -0.6, 4.6, 4.45, 0.4);
  }
  // Cubierta de la planta primera (va con la planta primera al seleccionar)
  const roof = new Group();
  {
    const m = gmats.p1;
    box(roof, m.white, -4.2, 6.6, -6.2, 7.2, 6.9, 1.7);
    roof.userData.level = 'p1';
    scene.add(roof);
  }
  // Parcela, piscina y jardín
  {
    const [g, m] = mk('jardin');
    box(g, m.slab, -14, -0.7, -10, 14, 0, 10);
    box(g, m.white, -14, 0, -10, 14, 0.8, -9.8);
    box(g, m.white, -14, 0, -9.8, -13.8, 0.8, 10);
    box(g, m.white, 13.8, 0, -9.8, 14, 0.8, 10);
    box(g, m.slab, -8.3, 0, 3.3, 4.3, 0.12, 6.2);
    // piscina 7 × 4 bajo el voladizo
    box(g, waterMat, 4.6, 0, -0.5, 11.4, 0.04, 3.4, false);
    box(g, m.white, 4.3, 0, -0.8, 11.7, 0.1, -0.5);
    box(g, m.white, 4.3, 0, 3.4, 11.7, 0.1, 3.7);
    box(g, m.white, 4.3, 0, -0.5, 4.6, 0.1, 3.4);
    box(g, m.white, 11.4, 0, -0.5, 11.7, 0.1, 3.4);
    // árboles de maqueta
    const trunk = new CylinderGeometry(0.07, 0.07, 1.5, 6);
    for (const [x, z, r] of [[-11, -7, 1.3], [-11.6, 5.4, 1.1], [9, -7.2, 1.25], [12, 6.6, 1], [-3.2, 7.8, 0.9], [1.6, 8, 1.05], [11.8, -3.6, 0.85], [-12, -1, 0.9]]) {
      const t = new Mesh(trunk, m.white); t.position.set(x, 0.75, z); t.castShadow = true; g.add(t);
      const c = new Mesh(new IcosahedronGeometry(r, 1), m.white); c.position.set(x, 1.5 + r * 0.8, z); c.castShadow = true; c.receiveShadow = true; g.add(c);
    }
  }
  // Para el despiece, la cubierta de la planta primera viaja con ella
  const lift: Record<LevelId, number> = { pb: 0, terraza: 3, p1: 6.5, jardin: 0 };
  const roofLift = 9.5;

  /* ---------- Cámara y controles ---------- */
  const target = new Vector3(0, 2.2, 0);
  const controls = new OrbitControls(camera, canvas);
  controls.target.copy(target);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.enablePan = false;
  controls.rotateSpeed = 0.7;
  controls.maxPolarAngle = 1.32;
  controls.minPolarAngle = 0.25;
  controls.autoRotate = !reduce;
  controls.autoRotateSpeed = 0.55;
  // La rueda del ratón sigue bajando la página (no la secuestramos)
  stage.addEventListener('wheel', (e) => e.stopPropagation(), { capture: true });
  // En el móvil: deslizar en horizontal gira; en vertical, la página baja con normalidad
  canvas.style.touchAction = 'pan-y';
  controls.addEventListener('start', () => { controls.autoRotate = false; root.classList.add('touched'); });

  const frame = () => {
    const w = stage.clientWidth, h = stage.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    const dist = camera.aspect < 0.9 ? 60 : camera.aspect < 1.3 ? 50 : 40;
    controls.minDistance = dist * 0.6;
    controls.maxDistance = dist * 1.35;
    camera.updateProjectionMatrix();
    return dist;
  };
  const d0 = frame() || 44;
  camera.position.set(d0 * 0.56, d0 * 0.46, d0 * 0.68).add(target);
  controls.update();
  new ResizeObserver(() => { frame(); dirty = true; }).observe(stage);

  // Teclado: flechas giran, + y − acercan
  canvas.addEventListener('keydown', (e) => {
    const off = camera.position.clone().sub(controls.target);
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') off.applyAxisAngle(new Vector3(0, 1, 0), e.key === 'ArrowLeft' ? -0.2 : 0.2);
    else if (e.key === '+' || e.key === '=' || e.key === '-') off.multiplyScalar(e.key === '-' ? 1.12 : 0.89).clampLength(controls.minDistance, controls.maxDistance);
    else return;
    e.preventDefault(); controls.autoRotate = false;
    camera.position.copy(controls.target).add(off);
  });

  /* ---------- Selección con la caja de la marca ---------- */
  const selMat = new LineBasicMaterial({ color: ACERO });
  const handleMat = new MeshStandardMaterial({ color: ACERO, roughness: 0.6 });
  const handleGeo = new BoxGeometry(0.32, 0.32, 0.32);
  let selBox: Group | null = null;
  let selected: LevelId | null = null;
  const nameEl = root.querySelector('[data-mq-name]');
  const infoEl = root.querySelector('[data-mq-info]');
  const btns = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-mq-level]'));

  const tint = (id: LevelId, on: boolean) => {
    const m = gmats[id];
    m.white.color.set(on ? 0xe1e9f1 : BASE.white);
    m.slab.color.set(on ? 0xcfdae5 : BASE.slab);
    m.furn.color.set(on ? 0xd5dfe9 : BASE.furn);
  };
  const select = (id: LevelId | null) => {
    if (selected) tint(selected, false);
    if (selBox) { selBox.parent?.remove(selBox); selBox = null; }
    selected = id === selected ? null : id;
    btns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.mqLevel === selected)));
    if (!selected) {
      if (nameEl) nameEl.textContent = nameEl.getAttribute('data-default');
      if (infoEl) infoEl.textContent = infoEl.getAttribute('data-default');
      dirty = true; return;
    }
    tint(selected, true);
    const g = groups[selected];
    // caja calculada en reposo y colgada del grupo, para que suba con él en el despiece
    const keepY = g.position.y; g.position.y = 0; g.updateMatrixWorld(true);
    const bb = new Box3().setFromObject(g);
    if (selected === 'p1') { roof.position.y = 0; roof.updateMatrixWorld(true); bb.union(new Box3().setFromObject(roof)); }
    g.position.y = keepY;
    bb.expandByScalar(0.3);
    selBox = outline(bb);
    g.add(selBox);
    const b = btns.find((x) => x.dataset.mqLevel === selected);
    if (nameEl && b) nameEl.textContent = b.dataset.name!;
    if (infoEl && b) infoEl.textContent = b.dataset.info!;
    (window as any).dataLayer?.push({ event: 'maqueta_planta', planta: selected });
    dirty = true;
  };
  function outline(bb: Box3) {
    const g = new Group();
    const { min: a, max: b } = bb;
    const c = [[a.x, a.y, a.z], [b.x, a.y, a.z], [b.x, a.y, b.z], [a.x, a.y, b.z], [a.x, b.y, a.z], [b.x, b.y, a.z], [b.x, b.y, b.z], [a.x, b.y, b.z]];
    const idx = [0, 1, 1, 2, 2, 3, 3, 0, 4, 5, 5, 6, 6, 7, 7, 4, 0, 4, 1, 5, 2, 6, 3, 7];
    const geo = new BufferGeometry();
    geo.setAttribute('position', new Float32BufferAttribute(idx.flatMap((i) => c[i]), 3));
    g.add(new LineSegments(geo, selMat));
    c.forEach(([x, y, z]) => { const h = new Mesh(handleGeo, handleMat); h.position.set(x, y, z); g.add(h); });
    return g;
  }
  btns.forEach((b) => b.addEventListener('click', () => { controls.autoRotate = false; select(b.dataset.mqLevel as LevelId); }));

  // Tocar una planta en la maqueta también la selecciona
  const ray = new Raycaster();
  const ptr = new Vector2();
  const pick = (cx: number, cy: number): LevelId | null => {
    const r = canvas.getBoundingClientRect();
    ptr.set(((cx - r.left) / r.width) * 2 - 1, -((cy - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ptr, camera);
    const hit = ray.intersectObjects([groups.pb, groups.terraza, groups.p1, roof, groups.jardin], true).find((h) => (h.object as Mesh).isMesh);
    let o: Object3D | null = hit?.object ?? null;
    while (o && !o.userData.level) o = o.parent;
    return (o?.userData.level as LevelId) ?? null;
  };
  let down: [number, number] | null = null;
  canvas.addEventListener('pointerdown', (e) => { down = [e.clientX, e.clientY]; });
  canvas.addEventListener('pointerup', (e) => {
    if (!down || Math.hypot(e.clientX - down[0], e.clientY - down[1]) > 6) return;
    const id = pick(e.clientX, e.clientY);
    if (id) select(id);
  });
  if (matchMedia('(hover: hover)').matches) {
    let pend = false;
    canvas.addEventListener('pointermove', (e) => {
      if (pend || e.buttons) return; pend = true;
      requestAnimationFrame(() => { pend = false; canvas.style.cursor = pick(e.clientX, e.clientY) ? 'pointer' : 'grab'; });
    });
  }

  /* ---------- Vista por plantas ---------- */
  let exploded = false;
  const exBtn = root.querySelector<HTMLButtonElement>('[data-mq-explode]');
  exBtn?.addEventListener('click', () => {
    exploded = !exploded;
    exBtn.setAttribute('aria-pressed', String(exploded));
    root.classList.toggle('exploded', exploded);
    (window as any).dataLayer?.push({ event: 'maqueta_despiece', abierto: exploded });
    dirty = true;
  });
  const animLift = () => {
    let moving = false;
    const step = (o: Object3D, to: number) => {
      const d = to - o.position.y;
      if (Math.abs(d) > 0.005) { o.position.y += reduce ? d : d * 0.12; moving = true; } else o.position.y = to;
    };
    step(groups.terraza, exploded ? lift.terraza : 0);
    step(groups.p1, exploded ? lift.p1 : 0);
    step(roof, exploded ? roofLift : 0);
    // al abrir por plantas, la cámara sube y se aleja un poco para que quepa todo
    const ty = exploded ? 5 : 2.2;
    if (Math.abs(controls.target.y - ty) > 0.01) { const d = (ty - controls.target.y) * (reduce ? 1 : 0.12); controls.target.y += d; camera.position.y += d; camera.position.sub(controls.target).multiplyScalar(exploded ? 1.004 : 0.996).clampLength(controls.minDistance, controls.maxDistance).add(controls.target); moving = true; }
    return moving;
  };

  /* ---------- Bucle: solo mientras se ve ---------- */
  let dirty = true, visible = false, raf = 0;
  controls.addEventListener('change', () => { dirty = true; });
  const loop = () => {
    raf = 0;
    if (!visible || document.hidden) return;
    const c = controls.update();
    const m = animLift();
    if (c || m || dirty || controls.autoRotate) { renderer.render(scene, camera); dirty = false; }
    raf = requestAnimationFrame(loop);
  };
  const kick = () => { if (!raf && visible && !document.hidden) raf = requestAnimationFrame(loop); };
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; kick(); }, { rootMargin: '100px 0px' }).observe(stage);
  document.addEventListener('visibilitychange', kick);

  renderer.render(scene, camera);
  root.classList.add('is-live');
}
