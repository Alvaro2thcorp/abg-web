// Maqueta 3D girable con dos modelos:
//  · "ceyra": Leo Villa, el modelo real de Ceyra Studio (Rhino → glb comprimido, 160 KB)
//  · "ejemplo": una casa de dos plantas hecha con código
// Se carga solo cuando la sección se acerca a la pantalla (ver site.ts). Arrastrar = girar.
// Cada parte se selecciona con la caja de la marca; "abrir" levanta cubiertas o separa plantas.
import {
  Scene, PerspectiveCamera, WebGLRenderer, Group, Mesh, BoxGeometry, CylinderGeometry, IcosahedronGeometry,
  MeshStandardMaterial, HemisphereLight, DirectionalLight, Box3, Vector3, Vector2, Raycaster, EdgesGeometry,
  LineSegments, LineBasicMaterial, PCFSoftShadowMap, SRGBColorSpace, BufferGeometry, Float32BufferAttribute, Object3D, Color,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';

const ACERO = 0x45627f;
const TINT = new Color(0x9db3c8);

type Part = { objs: Object3D[]; anchor: Object3D; mats: MeshStandardMaterial[]; base: Color[] };
type Model = { id: string; root: Group; parts: Record<string, Part>; lifts: { o: Object3D; to: number }[]; ty: [number, number] };

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

  /* ---------- Piezas comunes ---------- */
  const edgeMat = new LineBasicMaterial({ color: 0x8f8d87, transparent: true, opacity: 0.45 });
  const glassEdge = new LineBasicMaterial({ color: 0x7f97ae, transparent: true, opacity: 0.6 });
  const glassMat = new MeshStandardMaterial({ color: 0xc9d7e4, transparent: true, opacity: 0.32, roughness: 0.08, depthWrite: false });
  const waterMat = new MeshStandardMaterial({ color: 0x6f8fae, roughness: 0.2 });
  const std = (color: number, rough = 0.92) => new MeshStandardMaterial({ color, roughness: rough });

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
  const part = (objs: Object3D[], mats: MeshStandardMaterial[], anchor = objs[0]): Part => ({ objs, anchor, mats, base: mats.map((m) => m.color.clone()) });

  /* ---------- Modelo 1: casa de ejemplo de dos plantas (código) ---------- */
  function buildEjemplo(): Model {
    const rootG = new Group();
    const mk = () => ({ white: std(0xf8f7f4), slab: std(0xe2e0da, 0.95), furn: std(0xebe9e4, 0.9) });
    type M = ReturnType<typeof mk>;
    const glassX = (g: Group, m: M, x0: number, x1: number, z: number, y0: number, y1: number) => {
      box(g, glassMat, x0, y0, z - 0.03, x1, y1, z + 0.03);
      const n = Math.max(1, Math.round((x1 - x0) / 1.6));
      for (let i = 0; i <= n; i++) { const x = x0 + ((x1 - x0) * i) / n; box(g, m.white, x - 0.05, y0, z - 0.06, x + 0.05, y1, z + 0.06, false); }
    };
    const glassZ = (g: Group, m: M, z0: number, z1: number, x: number, y0: number, y1: number) => {
      box(g, glassMat, x - 0.03, y0, z0, x + 0.03, y1, z1);
      const n = Math.max(1, Math.round((z1 - z0) / 1.6));
      for (let i = 0; i <= n; i++) { const z = z0 + ((z1 - z0) * i) / n; box(g, m.white, x - 0.06, y0, z - 0.05, x + 0.06, y1, z + 0.05, false); }
    };
    const G = () => { const g = new Group(); rootG.add(g); return g; };
    // Planta baja
    const pb = G(), mpb = mk();
    {
      const g = pb, m = mpb, y0 = 0.3, y1 = 3.2;
      box(g, m.slab, -8.3, 0, -5.3, 4.3, 0.3, 3.3);
      box(g, m.white, -8, y0, -5, -7.8, y1, 3);
      glassX(g, m, -7.8, 2, 2.9, y0, y1);
      box(g, m.white, 2, y0, 2.8, 4, y1, 3);
      box(g, m.white, -7.8, y0, -5, -4, y1, -4.8);
      glassX(g, m, -4, -1, -4.9, y0, y1);
      box(g, m.white, -1, y0, -5, 4, y1, -4.8);
      glassZ(g, m, -4.8, -1, 3.9, y0, y1);
      box(g, m.white, 3.8, y0, -1, 4, y1, 2.8);
      box(g, m.white, -2.1, y0, -4.8, -1.9, y1, -1.5);
      box(g, m.white, 1, y0, -2.1, 3.8, y1, -1.9);
      box(g, m.white, 0.9, y0, -4.8, 1.1, y1, -2.1);
      box(g, m.furn, -7.3, y0, 0.6, -4.6, 0.85, 1.5);
      box(g, m.furn, -7.3, y0, -1.5, -6.4, 0.85, 0.6);
      box(g, m.furn, -5.8, y0, -0.7, -4.8, 0.62, 0.2);
      box(g, m.furn, -0.4, y0, -0.9, 2.6, 1.2, 0.1);
      box(g, m.furn, -1.8, y0, -4.8, 0.8, 1.2, -4.2);
      box(g, m.furn, -3.6, y0, 0.7, -1.6, 1.05, 1.8);
    }
    // Terraza sobre la planta baja
    const te = G(), mte = mk();
    {
      const g = te, m = mte;
      box(g, m.white, -8.3, 3.2, -5.3, 4.3, 3.5, 3.3);
      box(g, m.white, -8.3, 3.5, 3.1, -4.1, 4.4, 3.3);
      box(g, m.white, -8.3, 3.5, -5.3, -8.1, 4.4, 3.1);
      box(g, m.white, -8.1, 3.5, -5.3, -4.1, 4.4, -5.1);
      for (const [x, z] of [[-8, -5], [-4.5, -5], [-8, 2.85], [-4.5, 2.85]]) box(g, m.white, x, 3.5, z, x + 0.14, 6.1, z + 0.14, false);
      for (let z = -5; z <= 2.9; z += 0.55) box(g, m.white, -8.1, 6.0, z, -4.3, 6.12, z + 0.14, false);
      box(g, m.furn, -7.5, 3.5, 0.2, -6.9, 3.78, 2.3);
      box(g, m.furn, -6.5, 3.5, 0.2, -5.9, 3.78, 2.3);
    }
    // Planta primera (vuela sobre la piscina) y su cubierta
    const p1 = G(), mp1 = mk();
    {
      const g = p1, m = mp1, y0 = 3.8, y1 = 6.6;
      box(g, m.slab, -4.1, 3.5, -6.1, 7.1, 3.8, 1.6);
      box(g, m.white, -4, y0, 1.3, -1, y1, 1.5);
      glassX(g, m, -1, 6.85, 1.4, y0, y1);
      glassZ(g, m, -5.8, 1.3, 6.9, y0, y1);
      box(g, m.white, -4, y0, -6, 7, y1, -5.8);
      box(g, m.white, -4, y0, -5.8, -3.8, y1, 1.3);
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
    const roof = G();
    box(roof, mp1.white, -4.2, 6.6, -6.2, 7.2, 6.9, 1.7);
    // Parcela, piscina y jardín
    const ja = G(), mja = mk();
    {
      const g = ja, m = mja;
      box(g, m.slab, -14, -0.7, -10, 14, 0, 10);
      box(g, m.white, -14, 0, -10, 14, 0.8, -9.8);
      box(g, m.white, -14, 0, -9.8, -13.8, 0.8, 10);
      box(g, m.white, 13.8, 0, -9.8, 14, 0.8, 10);
      box(g, m.slab, -8.3, 0, 3.3, 4.3, 0.12, 6.2);
      box(g, waterMat, 4.6, 0, -0.5, 11.4, 0.04, 3.4, false);
      box(g, m.white, 4.3, 0, -0.8, 11.7, 0.1, -0.5);
      box(g, m.white, 4.3, 0, 3.4, 11.7, 0.1, 3.7);
      box(g, m.white, 4.3, 0, -0.5, 4.6, 0.1, 3.4);
      box(g, m.white, 11.4, 0, -0.5, 11.7, 0.1, 3.4);
      const trunk = new CylinderGeometry(0.07, 0.07, 1.5, 6);
      for (const [x, z, r] of [[-11, -7, 1.3], [-11.6, 5.4, 1.1], [9, -7.2, 1.25], [12, 6.6, 1], [-3.2, 7.8, 0.9], [1.6, 8, 1.05], [11.8, -3.6, 0.85], [-12, -1, 0.9]]) {
        const t = new Mesh(trunk, m.white); t.position.set(x, 0.75, z); t.castShadow = true; g.add(t);
        const c = new Mesh(new IcosahedronGeometry(r, 1), m.white); c.position.set(x, 1.5 + r * 0.8, z); c.castShadow = true; c.receiveShadow = true; g.add(c);
      }
    }
    const v = (m: M) => [m.white, m.slab, m.furn];
    return {
      id: 'ejemplo', root: rootG,
      parts: { pb: part([pb], v(mpb)), terraza: part([te], v(mte)), p1: part([p1, roof], v(mp1)), jardin: part([ja], v(mja)) },
      lifts: [{ o: te, to: 3 }, { o: p1, to: 6.5 }, { o: roof, to: 9.5 }],
      ty: [2.2, 5],
    };
  }

  /* ---------- Modelo 2: Leo Villa, de Ceyra Studio (modelo real) ---------- */
  // Colores de maqueta por capa del modelo de Rhino
  const PAL: Record<string, number> = {
    '03-HORM1': 0xf1efea, '10-FT1': 0xf7f6f3, '05-GRAVA1': 0xe4e1da, '04-MADERA1': 0xd2b893, '08-MADERA2': 0xbf9a73,
    '07-ACERO1': 0x8e9399, '06-AZULEJOS': 0xb7ccd9, '09-AZULEJO2': 0xe8e5df, '13-AZULEJO3': 0xd5e2e6, '01-PAVIM1': 0xdcd7ce,
    '02-PAVIM2': 0xcbd5c0, '14-ESPEJO': 0xc9d3dc,
  };
  async function buildCeyra(): Promise<Model> {
    const loader = new GLTFLoader();
    loader.setMeshoptDecoder(MeshoptDecoder);
    const gltf = await loader.loadAsync('/models/leo-villa.glb');
    const src = gltf.scene;
    const rootG = new Group();
    const groups: Record<string, Group> = { modulos: new Group(), cubierta: new Group(), piscina: new Group(), jardin: new Group() };
    const mats: Record<string, MeshStandardMaterial[]> = { modulos: [], cubierta: [], piscina: [], jardin: [] };
    Object.values(groups).forEach((g) => rootG.add(g));
    const meshes: Mesh[] = [];
    src.traverse((o) => { if ((o as Mesh).isMesh) meshes.push(o as Mesh); });
    for (const m of meshes) {
      // el nombre llega como "grupo__capa" (GLTFLoader quita caracteres raros)
      const name = m.name || m.parent?.name || '';
      const [grp, layer = ''] = name.split('__');
      const g = groups[grp] ? grp : 'modulos';
      m.updateWorldMatrix(true, false);
      // posiciones cuantizadas (meshopt) → números normales antes de transformar
      const geo = new BufferGeometry();
      const pa = m.geometry.getAttribute('position');
      const arr = new Float32Array(pa.count * 3);
      for (let i = 0; i < pa.count; i++) { arr[i * 3] = pa.getX(i); arr[i * 3 + 1] = pa.getY(i); arr[i * 3 + 2] = pa.getZ(i); }
      geo.setAttribute('position', new Float32BufferAttribute(arr, 3));
      if (m.geometry.index) geo.setIndex(Array.from(m.geometry.index.array as ArrayLike<number>));
      geo.applyMatrix4(m.matrixWorld);
      geo.computeVertexNormals();
      let mat: MeshStandardMaterial;
      const isGlass = /VIDRIO/.test(layer), isWater = /AGUA/.test(layer);
      if (isGlass) mat = glassMat;
      else if (isWater) mat = waterMat;
      else { mat = std(PAL[layer] ?? 0xf1efea); mats[g].push(mat); }
      const mesh = new Mesh(geo, mat);
      mesh.castShadow = !isGlass;
      mesh.receiveShadow = true;
      groups[g].add(mesh);
      if (!/ACERO/.test(layer) && !isWater) groups[g].add(new LineSegments(new EdgesGeometry(geo, 30), isGlass ? glassEdge : edgeMat));
    }
    // centrar, escalar como maqueta y poner un zócalo debajo
    const bb = new Box3().setFromObject(rootG);
    const c = bb.getCenter(new Vector3());
    const S = 1;
    rootG.children.forEach((g) => g.children.forEach((o) => { o.position.x -= c.x; o.position.z -= c.z; o.position.y -= -0.62; }));
    rootG.scale.setScalar(S);
    const w = bb.max.x - bb.min.x + 3, d = bb.max.z - bb.min.z + 3;
    const base = new Group();
    const plinth = std(0xe2e0da, 0.95);
    mats.jardin.push(plinth);
    box(base, plinth, -w / 2, -1.2, -d / 2, w / 2, 0, d / 2);
    // palmeras de maqueta alrededor (Leo Villa está entre palmeras)
    const palm = std(0xf8f7f4);
    mats.jardin.push(palm);
    const leaf = new BoxGeometry(1.7, 0.04, 0.32);
    leaf.translate(0.85, 0, 0);
    const spots: [number, number, number][] = [[-w / 2 + 0.6, -d / 2 + 0.6, 5.2], [w / 2 - 0.6, -d / 2 + 2, 6], [w / 2 - 0.6, d / 2 - 1.5, 4.6], [-w / 2 + 0.6, d / 2 - 3, 5.6], [-w / 2 + 0.6, -2, 4.4]];
    for (const [x, z, h] of spots) {
      const p = new Group();
      const t = new Mesh(new CylinderGeometry(0.07, 0.11, h, 6), palm);
      t.position.y = h / 2; t.castShadow = true; p.add(t);
      for (let i = 0; i < 8; i++) {
        const l = new Mesh(leaf, palm);
        l.position.y = h;
        l.rotation.set(0, (i / 8) * Math.PI * 2 + x, -0.45 - (i % 2) * 0.25);
        l.castShadow = true; p.add(l);
      }
      p.position.set(x, 0, z);
      p.rotation.z = (x > 0 ? -1 : 1) * 0.06;
      base.add(p);
    }
    groups.jardin.add(base);
    return {
      id: 'ceyra', root: rootG,
      parts: {
        modulos: part([groups.modulos], mats.modulos),
        cubierta: part([groups.cubierta], mats.cubierta),
        piscina: part([groups.piscina], mats.piscina),
        jardin: part([groups.jardin], mats.jardin),
      },
      lifts: [{ o: groups.cubierta, to: 3.2 }],
      ty: [1.4, 3.2],
    };
  }

  /* ---------- Cámara y controles ---------- */
  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 2.2, 0);
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
  controls.addEventListener('start', () => { controls.autoRotate = false; aimAz = null; aimPol = null; root.classList.add('touched'); });

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
  camera.position.set(d0 * 0.56, d0 * 0.46, d0 * 0.68).add(controls.target);
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

  /* ---------- Modelos y selector ---------- */
  const models: Record<string, Model> = {};
  let cur: Model | null = null;
  const sets = Array.from(root.querySelectorAll<HTMLElement>('[data-mq-set]'));
  const swBtns = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-mq-model]'));
  const exBtn = root.querySelector<HTMLButtonElement>('[data-mq-explode]');
  const exLabel = exBtn?.querySelector('[data-mq-exlabel]');
  const nameEl = root.querySelector('[data-mq-name]');
  const infoEl = root.querySelector('[data-mq-info]');

  const use = (m: Model) => {
    if (cur === m) return;
    if (cur) { select(null); cur.root.visible = false; }
    exploded = false;
    m.lifts.forEach(({ o }) => (o.position.y = 0));
    exBtn?.setAttribute('aria-pressed', 'false');
    cur = m;
    if (!m.root.parent) scene.add(m.root);
    m.root.visible = true;
    const set = sets.find((s) => s.dataset.mqSet === m.id);
    sets.forEach((s) => (s.hidden = s !== set));
    swBtns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.mqModel === m.id)));
    if (exLabel && set) exLabel.textContent = set.dataset.ex!;
    if (nameEl && set) nameEl.textContent = set.dataset.name!;
    if (infoEl && set) infoEl.textContent = set.dataset.info!;
    root.dataset.model = m.id;
    dirty = true;
  };
  swBtns.forEach((b) => b.addEventListener('click', async () => {
    const id = b.dataset.mqModel!;
    controls.autoRotate = false;
    if (!models[id]) {
      if (id === 'ejemplo') models[id] = buildEjemplo();
      else { root.classList.add('loading'); try { models[id] = await buildCeyra(); } catch { return; } finally { root.classList.remove('loading'); } }
    }
    use(models[id]);
    (window as any).dataLayer?.push({ event: 'maqueta_modelo', modelo: id });
  }));

  /* ---------- Selección con la caja de la marca ---------- */
  const selMat = new LineBasicMaterial({ color: ACERO });
  const handleMat = new MeshStandardMaterial({ color: ACERO, roughness: 0.6 });
  let selBox: Group | null = null;
  let selected: string | null = null;
  let aimAz: number | null = null, aimPol: number | null = null;
  const btns = () => Array.from(root.querySelectorAll<HTMLButtonElement>(`[data-mq-set="${cur?.id}"] [data-mq-level]`));

  const tint = (p: Part, on: boolean) => p.mats.forEach((m, i) => m.color.copy(p.base[i]).lerp(TINT, on ? 0.45 : 0));
  function select(id: string | null) {
    if (!cur) return;
    if (selected && cur.parts[selected]) tint(cur.parts[selected], false);
    if (selBox) { selBox.parent?.remove(selBox); selBox = null; }
    selected = id === selected ? null : id;
    btns().forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.mqLevel === selected)));
    const set = sets.find((s) => s.dataset.mqSet === cur!.id);
    if (!selected) {
      if (nameEl && set) nameEl.textContent = set.dataset.name!;
      if (infoEl && set) infoEl.textContent = set.dataset.info!;
      dirty = true; return;
    }
    const p = cur.parts[selected];
    tint(p, true);
    // caja calculada en reposo y colgada de la pieza, para que suba con ella al abrir
    const keep = p.objs.map((o) => o.position.y);
    p.objs.forEach((o) => (o.position.y = 0));
    cur.root.updateMatrixWorld(true);
    const bb = new Box3();
    p.objs.forEach((o) => bb.union(new Box3().setFromObject(o)));
    p.objs.forEach((o, i) => (o.position.y = keep[i]));
    // la cámara gira sola hacia la parte elegida (si no está en el centro)
    const ctr = bb.getCenter(new Vector3());
    aimAz = Math.hypot(ctr.x, ctr.z) > 2.5 ? Math.atan2(ctr.x, ctr.z) : null;
    // en la villa los muros de la parcela son altos: se mira más desde arriba
    aimPol = cur.id === 'ceyra' ? 0.62 : null;
    bb.expandByScalar(0.3);
    // a coordenadas de la pieza (que puede estar escalada dentro del modelo)
    p.anchor.updateWorldMatrix(true, false);
    const inv = p.anchor.matrixWorld.clone().invert();
    const sc = new Vector3().setFromMatrixScale(p.anchor.matrixWorld).x;
    selBox = outline(bb, inv, 0.32 / sc);
    p.anchor.add(selBox);
    const b = btns().find((x) => x.dataset.mqLevel === selected);
    if (nameEl && b) nameEl.textContent = b.dataset.name!;
    if (infoEl && b) infoEl.textContent = b.dataset.info!;
    (window as any).dataLayer?.push({ event: 'maqueta_parte', modelo: cur.id, parte: selected });
    dirty = true;
  }
  function outline(bb: Box3, inv: import('three').Matrix4, hs: number) {
    const g = new Group();
    const { min: a, max: b } = bb;
    const c = [[a.x, a.y, a.z], [b.x, a.y, a.z], [b.x, a.y, b.z], [a.x, a.y, b.z], [a.x, b.y, a.z], [b.x, b.y, a.z], [b.x, b.y, b.z], [a.x, b.y, b.z]]
      .map(([x, y, z]) => new Vector3(x, y, z).applyMatrix4(inv));
    const idx = [0, 1, 1, 2, 2, 3, 3, 0, 4, 5, 5, 6, 6, 7, 7, 4, 0, 4, 1, 5, 2, 6, 3, 7];
    const geo = new BufferGeometry();
    geo.setAttribute('position', new Float32BufferAttribute(idx.flatMap((i) => c[i].toArray()), 3));
    g.add(new LineSegments(geo, selMat));
    const hg = new BoxGeometry(hs, hs, hs);
    c.forEach((p) => { const h = new Mesh(hg, handleMat); h.position.copy(p); g.add(h); });
    return g;
  }
  root.querySelectorAll<HTMLButtonElement>('[data-mq-level]').forEach((b) => b.addEventListener('click', () => { controls.autoRotate = false; select(b.dataset.mqLevel!); }));

  // Tocar una parte en la maqueta también la selecciona
  const ray = new Raycaster();
  const ptr = new Vector2();
  const pick = (cx: number, cy: number): string | null => {
    if (!cur) return null;
    const r = canvas.getBoundingClientRect();
    ptr.set(((cx - r.left) / r.width) * 2 - 1, -((cy - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ptr, camera);
    const hit = ray.intersectObject(cur.root, true).find((h) => (h.object as Mesh).isMesh && (h.object as Mesh).material !== glassMat);
    if (!hit) return null;
    for (const [id, p] of Object.entries(cur.parts)) {
      let o: Object3D | null = hit.object;
      while (o) { if (p.objs.includes(o)) return id; o = o.parent; }
    }
    return null;
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

  /* ---------- Abrir: levantar cubiertas o separar plantas ---------- */
  let exploded = false;
  exBtn?.addEventListener('click', () => {
    exploded = !exploded;
    exBtn.setAttribute('aria-pressed', String(exploded));
    (window as any).dataLayer?.push({ event: 'maqueta_abrir', modelo: cur?.id, abierto: exploded });
    dirty = true;
  });
  const animLift = () => {
    if (!cur) return false;
    let moving = false;
    for (const { o, to } of cur.lifts) {
      const t = exploded ? to : 0, d = t - o.position.y;
      if (Math.abs(d) > 0.005) { o.position.y += reduce ? d : d * 0.12; moving = true; } else o.position.y = t;
    }
    if (aimAz !== null) {
      const off = camera.position.clone().sub(controls.target);
      const az = Math.atan2(off.x, off.z);
      let d = aimAz - az; d = Math.atan2(Math.sin(d), Math.cos(d));
      if (Math.abs(d) < 0.01) aimAz = null;
      else { off.applyAxisAngle(new Vector3(0, 1, 0), reduce ? d : d * 0.08); camera.position.copy(controls.target).add(off); moving = true; }
    }
    if (aimPol !== null) {
      const off = camera.position.clone().sub(controls.target);
      const len = off.length(), pol = Math.acos(off.y / len), d = aimPol - pol;
      if (Math.abs(d) < 0.01) aimPol = null;
      else {
        const np = pol + (reduce ? d : d * 0.08), az = Math.atan2(off.x, off.z);
        off.set(len * Math.sin(np) * Math.sin(az), len * Math.cos(np), len * Math.sin(np) * Math.cos(az));
        camera.position.copy(controls.target).add(off); moving = true;
      }
    }
    // al abrir, la cámara sube y se aleja un poco para que quepa todo
    const ty = cur.ty[exploded ? 1 : 0];
    if (Math.abs(controls.target.y - ty) > 0.01) {
      const d = (ty - controls.target.y) * (reduce ? 1 : 0.12);
      controls.target.y += d; camera.position.y += d;
      camera.position.sub(controls.target).multiplyScalar(exploded ? 1.004 : 0.996).clampLength(controls.minDistance, controls.maxDistance).add(controls.target);
      moving = true;
    }
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

  // Arranque: la villa real de Ceyra; si no carga, la casa de ejemplo
  const first = root.dataset.first || 'ceyra';
  (first === 'ceyra' ? buildCeyra() : Promise.resolve(buildEjemplo()))
    .catch(() => buildEjemplo())
    .then((m) => {
      models[m.id] = m;
      use(m);
      controls.target.y = m.ty[0];
      camera.position.set(d0 * 0.56, d0 * 0.46, d0 * 0.68).add(controls.target);
      controls.update();
      renderer.render(scene, camera);
      root.classList.add('is-live');
    });
}
