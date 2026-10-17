import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

/*
 * Hero /hero2: stroj z modelíny na kulatém podstavci (inspirace clay.com, ale živě
 * ve three.js). Zleva doprava: zmačkané papíry padají do trychtýře, projedou
 * trubkou (je vidět, jak se trubka nafoukne, když jimi papír jede), vyjedou na pás,
 * lupa je prohlédne, lis je orazítkuje a z papíru je hotový dopis, dokument nebo
 * poznámka. Ty pak skočí do schránky, do grafu nebo do kalendáře.
 *
 * Všechno se počítá z času, ne z událostí: stejný čas = stejný snímek. Díky tomu
 * jde vykreslit i jeden nehybný snímek (prefers-reduced-motion).
 */

// ── časování ──────────────────────────────────────────────────────────
const I = 2.5; // po kolika sekundách padá další papír
const V = 0.8; // rychlost pásu (jednotek za sekundu)
const T_FALL = 0.9; // pád do trychtýře
const T_SPIN = 0.8; // točení v trychtýři
const T_TUBE = 1.6; // jízda trubkou
const T_POP = 0.3; // vyskočení na pás
const T_BELT = T_FALL + T_SPIN + T_TUBE + T_POP; // kdy papír dosedne na pás
const BELT_X0 = -2.8; // kde papír dosedne
const BELT_X1 = 3.3; // konec pásu
const LENS_X = -1.2;
const PRESS_X = 1.15;
const T_LENS = T_BELT + (LENS_X - BELT_X0) / V;
const T_PRESS = T_BELT + (PRESS_X - BELT_X0) / V;
const T_END = T_BELT + (BELT_X1 - BELT_X0) / V;
const T_HOP = 0.85;
const T_ARRIVE = T_END + T_HOP;
const LIFE = T_ARRIVE + 0.05;

// pořadí papírů; šest papírů = šest objektů, které se pořád dokola používají
type Kind = 'mail' | 'doc' | 'note';
const SEQ: Kind[] = ['mail', 'doc', 'note', 'doc', 'mail', 'note'];

const BELT_TOP = 0.84;
const BALL_R = 0.28;

// ── barvy modelíny ────────────────────────────────────────────────────
const PAL = {
  paper: '#F4EDE2',
  white: '#FBF7F0',
  cream: '#E6D7C0',
  sand: '#D8BE97',
  terracotta: '#C8714D',
  orange: '#DE7C4E',
  caramel: '#B5844F',
  choco: '#4A3A30',
  cocoa: '#6A5244',
  sage: '#8BA07F',
  olive: '#6C7F60',
  moss: '#58694E',
};

// ── pomocné funkce ────────────────────────────────────────────────────
const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const seg = (t: number, a: number, b: number) => clamp01((t - a) / (b - a));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const easeIn = (t: number) => t * t * t;
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeBack = (t: number) => {
  const c1 = 1.9;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};
/** obálka 0 → 1 → 0: náběh, držení, doběh */
const pulse = (t: number, up: number, hold: number, down: number) =>
  t < 0 ? 0 : t < up ? easeOut(t / up) : t < up + hold ? 1 : 1 - easeInOut(seg(t, up + hold, up + hold + down));

/** barva z CSS proměnné (oklch → sRGB přes canvas) */
function cssColor(name: string) {
  const probe = document.createElement('span');
  probe.style.color = `var(${name})`;
  document.body.appendChild(probe);
  const col = getComputedStyle(probe).color;
  probe.remove();
  const cv = document.createElement('canvas');
  cv.width = cv.height = 1;
  const cx = cv.getContext('2d')!;
  cx.fillStyle = col;
  cx.fillRect(0, 0, 1, 1);
  const [r, g, b] = cx.getImageData(0, 0, 1, 1).data;
  return new THREE.Color().setRGB(r / 255, g / 255, b / 255, THREE.SRGBColorSpace);
}

/** jemná struktura modelíny: šedý šum z měkkých skvrn, opakovatelný bez švů */
function clayBump() {
  const s = 256;
  const cv = document.createElement('canvas');
  cv.width = cv.height = s;
  const g = cv.getContext('2d')!;
  g.fillStyle = '#808080';
  g.fillRect(0, 0, s, s);
  for (let i = 0; i < 900; i++) {
    const x = Math.random() * s;
    const y = Math.random() * s;
    const r = 2 + Math.random() * 10;
    const v = Math.random() < 0.5 ? 0 : 255;
    for (const ox of [-s, 0, s])
      for (const oy of [-s, 0, s]) {
        const grd = g.createRadialGradient(x + ox, y + oy, 0, x + ox, y + oy, r);
        grd.addColorStop(0, `rgba(${v},${v},${v},0.09)`);
        grd.addColorStop(1, `rgba(${v},${v},${v},0)`);
        g.fillStyle = grd;
        g.fillRect(x + ox - r, y + oy - r, r * 2, r * 2);
      }
  }
  const t = new THREE.CanvasTexture(cv);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(1.5, 1.5);
  return t;
}

type Opts = {
  onReady?: () => void;
  /** kde (px od horního okraje plátna) končí text nad strojem; stroj se posadí pod něj */
  textBottom?: () => number;
};

export function mountMachine(canvas: HTMLCanvasElement, { onReady, textBottom }: Opts = {}) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTex;
  scene.environmentIntensity = 0.5;
  const fog = new THREE.Fog(0x171412, 20, 40);
  scene.fog = fog;

  const camera = new THREE.PerspectiveCamera(30, 1, 0.5, 120);

  // světla: teplé shora zleva, slabší protisvětlo zezadu, měkké okolí
  const hemi = new THREE.HemisphereLight(0xfff1dc, 0x2a2018, 0.85);
  const key = new THREE.DirectionalLight(0xffe7c8, 2.5);
  key.position.set(-6, 12, 8);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  Object.assign(key.shadow.camera, { left: -11, right: 11, top: 9, bottom: -9, near: 1, far: 45 });
  key.shadow.bias = -0.0004;
  key.shadow.normalBias = 0.025;
  const rim = new THREE.DirectionalLight(0xffcf9a, 1.2);
  rim.position.set(7, 6, -9);
  scene.add(hemi, key, rim);

  // ── materiály ──
  const bump = clayBump();
  const disposables: { dispose(): void }[] = [bump, envTex, pmrem];
  const clay = (color: THREE.ColorRepresentation, extra: THREE.MeshStandardMaterialParameters = {}) => {
    const m = new THREE.MeshStandardMaterial({ color, roughness: 0.82, metalness: 0, bumpMap: bump, bumpScale: 0.6, ...extra });
    disposables.push(m);
    return m;
  };
  const M = {
    paper: clay(PAL.paper, { flatShading: true, roughness: 0.9 }),
    white: clay(PAL.white),
    cream: clay(PAL.cream),
    sand: clay(PAL.sand),
    terracotta: clay(PAL.terracotta),
    orange: clay(PAL.orange),
    caramel: clay(PAL.caramel),
    choco: clay(PAL.choco),
    cocoa: clay(PAL.cocoa),
    sage: clay(PAL.sage),
    olive: clay(PAL.olive),
    moss: clay(PAL.moss),
    // barvy, které jdou z webu (primární a podstavec), se doplní v applyTheme()
    primary: clay('#d8c4a0'),
    platform: clay('#2a231e', { roughness: 0.95 }),
    funnel: clay(PAL.cream, { side: THREE.DoubleSide }),
    lights: new THREE.MeshStandardMaterial({ color: '#d8c4a0', emissive: '#d8c4a0', emissiveIntensity: 0.4, roughness: 0.5 }),
    glass: new THREE.MeshPhysicalMaterial({
      color: '#ffffff',
      roughness: 0.04,
      metalness: 0,
      clearcoat: 1,
      transparent: true,
      opacity: 0.16,
      depthWrite: false,
    }),
    beam: new THREE.MeshBasicMaterial({
      color: '#d8c4a0',
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    }),
    ring: new THREE.MeshBasicMaterial({ color: '#d8c4a0', transparent: true, opacity: 0, depthWrite: false }),
  };
  disposables.push(M.lights, M.glass, M.beam, M.ring);

  const geo = <G extends THREE.BufferGeometry>(g: G) => {
    disposables.push(g);
    return g;
  };
  const mesh = (g: THREE.BufferGeometry, m: THREE.Material, shadow = true) => {
    const o = new THREE.Mesh(g, m);
    o.castShadow = shadow;
    o.receiveShadow = true;
    return o;
  };
  const rbox = (w: number, h: number, d: number, r: number, seg = 4) => geo(new RoundedBoxGeometry(w, h, d, seg, r));
  /** zaoblená tyčka mezi dvěma body */
  const rod = (a: THREE.Vector3, b: THREE.Vector3, r: number, m: THREE.Material) => {
    const len = a.distanceTo(b);
    const o = mesh(geo(new THREE.CapsuleGeometry(r, Math.max(0.001, len), 6, 14)), m);
    o.position.copy(a).add(b).multiplyScalar(0.5);
    o.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), b.clone().sub(a).normalize());
    return o;
  };
  const v3 = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);

  const root = new THREE.Group();
  scene.add(root);

  // ── podstavec: široký zaoblený disk, na kterém celý stroj stojí ──
  {
    const R = 9.6;
    const H = 0.9;
    const rr = 0.38;
    const pts: THREE.Vector2[] = [new THREE.Vector2(0.001, -H)];
    for (let i = 0; i <= 8; i++) {
      const a = -Math.PI / 2 + (i / 8) * (Math.PI / 2);
      pts.push(new THREE.Vector2(R - rr + Math.cos(a) * rr, -H + rr + Math.sin(a) * rr));
    }
    for (let i = 0; i <= 8; i++) {
      const a = (i / 8) * (Math.PI / 2);
      pts.push(new THREE.Vector2(R - rr + Math.cos(a) * rr, -rr + Math.sin(a) * rr));
    }
    pts.push(new THREE.Vector2(0.001, 0));
    const plate = mesh(geo(new THREE.LatheGeometry(pts, 120)), M.platform, false);
    plate.scale.set(1, 1, 0.52);
    root.add(plate);
  }

  // ── stromky a kamínky po okrajích ──
  const tree = (x: number, z: number, h: number, m: THREE.Material, lean = 0) => {
    const g = new THREE.Group();
    g.add(rod(v3(0, 0, 0), v3(0, h * 0.35, 0), 0.06, M.cocoa));
    const crown = mesh(geo(new THREE.SphereGeometry(0.42, 28, 20)), m);
    crown.scale.set(1, (h * 0.75) / 0.42 / 2, 1);
    crown.position.y = h * 0.3 + h * 0.375;
    g.add(crown);
    const top = mesh(geo(new THREE.SphereGeometry(0.28, 24, 16)), m);
    top.scale.set(1, 1.5, 1);
    top.position.y = h * 0.3 + h * 0.75;
    g.add(top);
    g.position.set(x, 0, z);
    g.rotation.z = lean;
    root.add(g);
  };
  tree(-7.6, -1.5, 2.2, M.sage, 0.04);
  tree(-6.7, -2.7, 1.6, M.olive, -0.05);
  tree(-8.3, 0.3, 1.3, M.moss);
  tree(7.9, -1.6, 2.4, M.olive, -0.04);
  tree(8.6, -0.1, 1.5, M.sage, 0.05);
  tree(6.9, -3.0, 1.7, M.moss);
  const bush = (x: number, z: number, s: number, m: THREE.Material) => {
    const b = mesh(geo(new THREE.SphereGeometry(s, 24, 16)), m);
    b.scale.y = 0.75;
    b.position.set(x, s * 0.45, z);
    root.add(b);
  };
  bush(-7.1, 2.0, 0.45, M.sage);
  bush(-6.6, 2.5, 0.3, M.olive);
  bush(7.4, 2.1, 0.4, M.olive);
  for (const [x, z, s] of [
    [-3.2, 2.6, 0.16],
    [-2.9, 2.85, 0.1],
    [2.4, 2.9, 0.14],
    [5.2, 2.6, 0.12],
    [-1.0, -2.6, 0.13],
  ]) {
    const p = mesh(geo(new THREE.SphereGeometry(s, 16, 12)), M.cocoa);
    p.scale.y = 0.6;
    p.position.set(x, s * 0.3, z);
    root.add(p);
  }

  // ── trychtýř na nožkách ──
  const FUNNEL = v3(-5.2, 2.75, 0);
  {
    const prof = [
      [0.2, 0],
      [0.27, 0.06],
      [0.3, 0.38],
      [1.26, 1.46],
      [1.4, 1.6],
      [1.33, 1.68],
      [1.18, 1.58],
      [0.21, 0.42],
      [0.15, 0.12],
      [0.2, 0],
    ].map(([x, y]) => new THREE.Vector2(x, y));
    const f = mesh(geo(new THREE.LatheGeometry(prof, 64)), M.funnel);
    f.position.copy(FUNNEL);
    root.add(f);
    const lip = mesh(geo(new THREE.TorusGeometry(1.38, 0.085, 14, 64)), M.terracotta);
    lip.rotation.x = Math.PI / 2;
    lip.position.copy(FUNNEL).add(v3(0, 1.64, 0));
    root.add(lip);
    for (const a of [Math.PI / 3, Math.PI, (5 * Math.PI) / 3]) {
      const top = v3(FUNNEL.x + Math.cos(a) * 0.72, FUNNEL.y + 0.62, Math.sin(a) * 0.72);
      const bot = v3(FUNNEL.x + Math.cos(a) * 1.15, 0, Math.sin(a) * 1.15);
      root.add(rod(top, bot, 0.07, M.caramel));
      const foot = mesh(geo(new THREE.SphereGeometry(0.13, 16, 12)), M.choco);
      foot.scale.y = 0.5;
      foot.position.copy(bot);
      root.add(foot);
    }
  }

  // ── trubka se smyčkou z trychtýře na pás ──
  const tubeCurve = new THREE.CatmullRomCurve3(
    [
      v3(-5.2, 2.85, 0),
      v3(-5.2, 2.2, 0),
      v3(-5.0, 1.55, 0.2),
      v3(-4.45, 1.2, 0.45),
      v3(-3.85, 1.45, 0.45),
      v3(-3.75, 2.05, 0.2),
      v3(-4.15, 2.25, -0.1),
      v3(-4.45, 1.85, -0.3),
      v3(-4.15, 1.35, -0.3),
      v3(-3.6, 1.16, -0.1),
      v3(-3.1, 1.16, 0),
    ],
    false,
    'catmullrom',
    0.5,
  );
  const TUBE_R = 0.27;
  root.add(mesh(geo(new THREE.TubeGeometry(tubeCurve, 260, TUBE_R, 24, false)), M.terracotta));
  {
    // límec na konci trubky
    const end = tubeCurve.getPointAt(1);
    const tan = tubeCurve.getTangentAt(1);
    const collar = mesh(geo(new THREE.TorusGeometry(TUBE_R + 0.02, 0.07, 12, 32)), M.primary);
    collar.position.copy(end);
    collar.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), tan);
    root.add(collar);
  }
  // nafouknutí trubky, které jede s papírem uvnitř
  const bulge = mesh(geo(new THREE.SphereGeometry(TUBE_R * 1.38, 28, 20)), M.terracotta);
  root.add(bulge);

  // ── pás ──
  {
    const base = mesh(rbox(6.9, 0.72, 1.55, 0.14), M.cream);
    base.position.set(0.05, 0.36, 0);
    root.add(base);
    const belt = mesh(rbox(6.7, 0.16, 1.25, 0.07), M.choco);
    belt.position.set(0.05, BELT_TOP - 0.08, 0);
    root.add(belt);
    // nožky
    for (const x of [-3.0, 3.1])
      for (const z of [-0.55, 0.55]) {
        const ft = mesh(geo(new THREE.CylinderGeometry(0.16, 0.2, 0.12, 20)), M.choco);
        ft.position.set(x, 0.04, z);
        root.add(ft);
      }
  }
  const CLEAT_GAP = 0.45;
  const CLEAT_X0 = -3.15;
  const CLEAT_LEN = 6.4;
  const cleatGeo = rbox(0.08, 0.04, 1.12, 0.018, 2);
  const cleats: THREE.Mesh[] = [];
  for (let i = 0; i < Math.round(CLEAT_LEN / CLEAT_GAP); i++) {
    const c = mesh(cleatGeo, M.cocoa, false);
    c.position.set(0, BELT_TOP + 0.005, 0);
    root.add(c);
    cleats.push(c);
  }
  // kontrolky na předním boku pásu
  const leds: THREE.Mesh[] = [];
  const ledMats: THREE.MeshStandardMaterial[] = [];
  for (let i = 0; i < 7; i++) {
    const m = M.lights.clone();
    disposables.push(m);
    ledMats.push(m);
    const l = mesh(geo(new THREE.SphereGeometry(0.075, 16, 12)), m, false);
    l.position.set(-2.55 + i * 0.85, 0.4, 0.79);
    l.scale.z = 0.6;
    root.add(l);
    leds.push(l);
  }

  // ── lupa nad pásem ──
  const lens = new THREE.Group();
  const LENS_Y = 2.05;
  {
    root.add(rod(v3(LENS_X, 0, -1.05), v3(LENS_X, 2.7, -1.05), 0.085, M.caramel));
    const foot = mesh(geo(new THREE.CylinderGeometry(0.28, 0.34, 0.12, 24)), M.choco);
    foot.position.set(LENS_X, 0.06, -1.05);
    root.add(foot);
    root.add(rod(v3(LENS_X, 2.7, -1.05), v3(LENS_X, 2.55, -0.55), 0.075, M.caramel));
    const ring = mesh(geo(new THREE.TorusGeometry(0.52, 0.085, 16, 48)), M.primary);
    const glass = mesh(geo(new THREE.CircleGeometry(0.5, 48)), M.glass, false);
    glass.receiveShadow = false;
    const inner = new THREE.Group();
    inner.add(ring, glass);
    inner.rotation.x = -Math.PI / 2 + 0.6; // skoro vodorovně, trochu natočená ke kameře
    lens.add(inner);
    lens.position.set(LENS_X, LENS_Y, 0);
    root.add(lens);
  }
  const lensRing = lens.children[0].children[0] as THREE.Mesh;
  const lensRingMat = M.primary.clone();
  disposables.push(lensRingMat);
  lensRing.material = lensRingMat;
  const beam = new THREE.Mesh(geo(new THREE.ConeGeometry(0.46, 1, 40, 1, true)), M.beam);
  beam.position.set(LENS_X, (LENS_Y + BELT_TOP) / 2, 0);
  beam.scale.y = LENS_Y - BELT_TOP - 0.05;
  root.add(beam);

  // ── lis s razítkem ──
  const PRESS_Z = -1.08;
  const ARM_Y = 2.66;
  const HEAD_REST = 1.95; // spodek razítka v klidu
  const HEAD_HIT = BELT_TOP + BALL_R * 2 * 0.6; // spodek razítka při úderu (papír se zmáčkne)
  const head = new THREE.Group();
  const piston = mesh(geo(new THREE.CylinderGeometry(0.1, 0.1, 1, 18)), M.cream);
  {
    // sloup stojí za pásem a rameno vede nad pás, ať je razítkování vidět
    const post = mesh(rbox(0.32, 2.85, 0.32, 0.11), M.terracotta);
    post.position.set(PRESS_X, 1.425, PRESS_Z);
    root.add(post);
    const foot = mesh(geo(new THREE.CylinderGeometry(0.34, 0.4, 0.14, 24)), M.choco);
    foot.position.set(PRESS_X, 0.07, PRESS_Z);
    root.add(foot);
    const arm = mesh(rbox(0.5, 0.38, 1.5, 0.15), M.terracotta);
    arm.position.set(PRESS_X, ARM_Y, PRESS_Z + 0.62);
    root.add(arm);
    const block = mesh(rbox(0.74, 0.28, 0.74, 0.09), M.primary);
    block.position.y = 0.14;
    const pad = mesh(rbox(0.6, 0.08, 0.6, 0.03), M.choco);
    pad.position.y = 0.0;
    head.add(block, pad);
    head.position.set(PRESS_X, HEAD_REST, 0);
    root.add(head, piston);
  }
  // kruh, který se rozběhne při orazítkování
  const ring = new THREE.Mesh(geo(new THREE.TorusGeometry(1, 0.03, 8, 64)), M.ring);
  ring.rotation.x = Math.PI / 2;
  ring.position.set(PRESS_X, BELT_TOP + 0.05, 0);
  root.add(ring);

  // ── ozubená kola nad lisem ──
  const gearGeo = (r: number, teeth: number) => {
    const depth = 0.12;
    const ro = r + depth / 2;
    const ri = r - depth / 2;
    const shape = new THREE.Shape();
    const step = (Math.PI * 2) / teeth;
    for (let i = 0; i < teeth; i++) {
      const a0 = i * step;
      const pts: [number, number][] = [
        [ri, a0],
        [ri, a0 + step * 0.14],
        [ro, a0 + step * 0.34],
        [ro, a0 + step * 0.66],
        [ri, a0 + step * 0.86],
      ];
      pts.forEach(([rr, a], j) => {
        const x = Math.cos(a) * rr;
        const y = Math.sin(a) * rr;
        if (i === 0 && j === 0) shape.moveTo(x, y);
        else shape.lineTo(x, y);
      });
    }
    shape.closePath();
    const hole = new THREE.Path();
    hole.absarc(0, 0, r * 0.26, 0, Math.PI * 2, true);
    shape.holes.push(hole);
    const g = new THREE.ExtrudeGeometry(shape, {
      depth: 0.16,
      bevelEnabled: true,
      bevelThickness: 0.04,
      bevelSize: 0.035,
      bevelSegments: 3,
      curveSegments: 20,
    });
    g.translate(0, 0, -0.08);
    return geo(g);
  };
  const G1 = { r: 0.56, n: 14, at: v3(PRESS_X - 0.3, 3.55, PRESS_Z + 0.55) };
  const G2 = { r: 0.36, n: 9, at: v3(0, 0, 0) };
  {
    // druhé kolo sedí tak, aby do sebe zuby zapadly
    const dir = new THREE.Vector2(0.97, -0.24).normalize();
    const d = G1.r + G2.r - 0.02;
    G2.at.set(G1.at.x + dir.x * d, G1.at.y + dir.y * d, G1.at.z);
  }
  const contact = Math.atan2(G2.at.y - G1.at.y, G2.at.x - G1.at.x);
  const gear1 = mesh(gearGeo(G1.r, G1.n), M.sage);
  const gear2 = mesh(gearGeo(G2.r, G2.n), M.caramel);
  gear1.position.copy(G1.at);
  gear2.position.copy(G2.at);
  root.add(gear1, gear2);
  for (const g of [G1, G2]) {
    const hub = mesh(geo(new THREE.CylinderGeometry(0.1, 0.1, 0.42, 16)), M.choco);
    hub.rotation.x = Math.PI / 2;
    hub.position.copy(g.at);
    root.add(hub);
  }
  root.add(rod(v3(PRESS_X - 0.12, ARM_Y + 0.15, G1.at.z), G1.at.clone(), 0.06, M.choco));
  root.add(rod(v3(PRESS_X + 0.16, ARM_Y + 0.15, G1.at.z), G2.at.clone(), 0.05, M.choco));

  // ── cíle: schránka, kalendář, graf ──
  const MAILBOX = v3(4.4, 0, 1.45);
  const mailbox = new THREE.Group();
  const flag = new THREE.Group();
  {
    mailbox.add(rod(v3(0, 0, 0), v3(0, 0.85, 0), 0.07, M.cocoa));
    // klasická schránka: rovný spodek a půlkulatá střecha
    const low = mesh(rbox(0.66, 0.4, 1.05, 0.08), M.sage);
    low.position.y = 1.02;
    const roof = mesh(geo(new THREE.CylinderGeometry(0.33, 0.33, 1.05, 32)), M.sage);
    roof.rotation.x = Math.PI / 2;
    roof.position.y = 1.2;
    mailbox.add(low, roof);
    const door = mesh(geo(new THREE.CylinderGeometry(0.27, 0.27, 0.05, 32)), M.olive);
    door.rotation.x = Math.PI / 2;
    door.position.set(0, 1.14, 0.53);
    const knob = mesh(geo(new THREE.SphereGeometry(0.05, 12, 10)), M.choco);
    knob.position.set(0, 1.2, 0.57);
    mailbox.add(door, knob);
    const pole = mesh(rbox(0.05, 0.42, 0.06, 0.02), M.orange);
    pole.position.y = 0.21;
    const cloth = mesh(rbox(0.05, 0.16, 0.24, 0.02), M.orange);
    cloth.position.set(0, 0.34, -0.12);
    flag.add(pole, cloth);
    flag.position.set(0.37, 1.02, 0.1);
    mailbox.add(flag);
    mailbox.position.copy(MAILBOX);
    mailbox.rotation.y = -0.5;
    root.add(mailbox);
  }
  const CAL = v3(4.75, 0, -1.25);
  const cal = new THREE.Group();
  const badge = new THREE.Group();
  {
    const page = mesh(rbox(1.0, 1.0, 0.24, 0.1), M.white);
    page.position.y = 0.62;
    const band = mesh(rbox(1.0, 0.26, 0.27, 0.08), M.terracotta);
    band.position.y = 1.02;
    cal.add(page, band);
    for (const x of [-0.25, 0.25]) {
      const r = mesh(geo(new THREE.TorusGeometry(0.07, 0.025, 8, 20)), M.choco);
      r.position.set(x, 1.17, 0);
      r.rotation.y = Math.PI / 2;
      cal.add(r);
    }
    for (let r = 0; r < 3; r++)
      for (let c = 0; c < 3; c++) {
        const dot = mesh(geo(new THREE.CylinderGeometry(0.055, 0.055, 0.03, 12)), r === 1 && c === 2 ? M.terracotta : M.sand, false);
        dot.rotation.x = Math.PI / 2;
        dot.position.set(-0.27 + c * 0.27, 0.78 - r * 0.22, 0.125);
        cal.add(dot);
      }
    const disc = mesh(geo(new THREE.SphereGeometry(0.23, 24, 16)), M.primary);
    disc.scale.z = 0.55;
    const c1 = mesh(rbox(0.07, 0.16, 0.06, 0.025), M.choco);
    c1.position.set(-0.05, -0.02, 0.12);
    c1.rotation.z = 0.75;
    const c2 = mesh(rbox(0.07, 0.28, 0.06, 0.025), M.choco);
    c2.position.set(0.05, 0.03, 0.12);
    c2.rotation.z = -0.6;
    badge.add(disc, c1, c2);
    badge.position.set(0.42, 1.08, 0.18);
    cal.add(badge);
    cal.position.copy(CAL);
    cal.rotation.y = -0.4;
    root.add(cal);
  }
  const BAR_X = [5.55, 6.12, 6.69, 7.26];
  const BAR_Z = 0.15;
  const BAR_H = [0.75, 1.2, 1.7, 2.35];
  const barMats = [M.cream, M.sand, M.primary, M.terracotta];
  const barGeo = rbox(0.5, 1, 0.5, 0.1);
  barGeo.translate(0, 0.5, 0);
  const bars = BAR_X.map((x, i) => {
    const b = mesh(barGeo, barMats[i]);
    b.position.set(x, 0, BAR_Z);
    root.add(b);
    return b;
  });
  const topBall = mesh(geo(new THREE.SphereGeometry(0.19, 24, 16)), M.orange);
  root.add(topBall);

  // ── papíry ──
  const crumpled = [0, 1, 2].map((k) => {
    let g: THREE.BufferGeometry = new THREE.IcosahedronGeometry(BALL_R, 1);
    g.deleteAttribute('normal');
    g.deleteAttribute('uv');
    g = mergeVertices(g);
    const p = g.attributes.position as THREE.BufferAttribute;
    let s = 7 + k * 13;
    const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
    for (let i = 0; i < p.count; i++) {
      const f = 0.82 + rnd() * 0.32;
      p.setXYZ(i, p.getX(i) * f, p.getY(i) * f, p.getZ(i) * f);
    }
    g.computeVertexNormals();
    return geo(g);
  });
  const stampMark = (m: THREE.Material) => {
    const s = mesh(geo(new THREE.CylinderGeometry(0.085, 0.085, 0.016, 20)), m, false);
    return s;
  };
  const makeCard = (kind: Kind) => {
    const g = new THREE.Group();
    if (kind === 'mail') {
      const body = mesh(rbox(0.64, 0.07, 0.44, 0.025, 3), M.white);
      const tri = new THREE.Shape();
      tri.moveTo(-0.3, -0.2);
      tri.lineTo(0.3, -0.2);
      tri.lineTo(0, 0.04);
      tri.closePath();
      const flap = mesh(geo(new THREE.ShapeGeometry(tri)), M.terracotta, false);
      flap.rotation.x = -Math.PI / 2;
      flap.position.y = 0.037;
      const s = stampMark(M.primary);
      s.position.set(0.2, 0.04, 0.12);
      g.add(body, flap, s);
    } else if (kind === 'doc') {
      const body = mesh(rbox(0.46, 0.06, 0.6, 0.022, 3), M.white);
      g.add(body);
      for (let i = 0; i < 3; i++) {
        const l = mesh(rbox(i === 2 ? 0.2 : 0.3, 0.012, 0.035, 0.006, 1), M.sand, false);
        l.position.set(i === 2 ? -0.05 : 0, 0.034, -0.18 + i * 0.1);
        g.add(l);
      }
      const s = stampMark(M.primary);
      s.position.set(0.11, 0.036, 0.17);
      g.add(s);
    } else {
      const body = mesh(rbox(0.5, 0.06, 0.5, 0.022, 3), M.primary);
      const s = stampMark(M.choco);
      s.position.set(0, 0.036, 0);
      g.add(body, s);
    }
    return g;
  };
  type Item = { kind: Kind; slot: number; g: THREE.Group; ball: THREE.Mesh; card: THREE.Group };
  const items: Item[] = SEQ.map((kind, slot) => {
    const g = new THREE.Group();
    const ball = mesh(crumpled[slot % 3], M.paper);
    const card = makeCard(kind);
    g.add(ball, card);
    root.add(g);
    return { kind, slot, g, ball, card };
  });

  // ── kdy co dorazí (počítá se z času, ne z událostí) ──
  const arrivalOf = (n: number) => n * I + T_ARRIVE;
  /** čas posledního doručení daného druhu (nebo -∞) */
  const lastArrival = (kind: Kind, t: number) => {
    const m = Math.floor((t - T_ARRIVE) / I);
    for (let n = m; n > m - SEQ.length - 1; n--) if (n >= 0 && SEQ[n % SEQ.length] === kind) return arrivalOf(n);
    return -Infinity;
  };
  const DOC_OFFS = SEQ.map((k, i) => (k === 'doc' ? i : -1)).filter((i) => i >= 0);
  /** n-tý dokument v pořadí → číslo papíru */
  const docItem = (k: number) => Math.floor(k / DOC_OFFS.length) * SEQ.length + DOC_OFFS[k % DOC_OFFS.length];
  /** kolik dokumentů už dorazilo */
  const docsArrived = (t: number) => {
    const m = Math.floor((t - T_ARRIVE) / I);
    if (m < 0) return 0;
    const full = Math.floor((m + 1) / SEQ.length);
    const rest = (m + 1) % SEQ.length;
    return full * DOC_OFFS.length + DOC_OFFS.filter((o) => o < rest).length;
  };
  const BARS_CYCLE = BAR_X.length + 1; // čtyři dokumenty sloupce zvednou, pátý je srovná

  /** výška sloupce grafu v čase t (0..1 = jak moc je vyrostlý) */
  const barLevel = (i: number, t: number) => {
    const j = docsArrived(t);
    const c = j % BARS_CYCLE;
    const s = j - c;
    if (i < c) return easeBack(seg(t - arrivalOf(docItem(s + i)), 0, 0.55));
    if (s >= 1) return 1 - easeInOut(seg(t - arrivalOf(docItem(s - 1)), 0, 1.1));
    return 0;
  };
  const barHeight = (i: number, t: number) => BAR_H[i] * (0.42 + 0.58 * barLevel(i, t));

  /** kam papír doskočí */
  const target = (kind: Kind, n: number, out: THREE.Vector3) => {
    if (kind === 'mail') return out.set(MAILBOX.x, 1.5, MAILBOX.z);
    if (kind === 'note') return out.set(CAL.x - 0.05, 1.1, CAL.z + 0.25);
    // pořadí dokumentu → na který sloupec dopadne (pátý srovná graf a dopadne na poslední)
    const k = DOC_OFFS.length * Math.floor(n / SEQ.length) + DOC_OFFS.indexOf(n % SEQ.length);
    const bar = Math.min(k % BARS_CYCLE, BAR_X.length - 1);
    return out.set(BAR_X[bar], barHeight(bar, arrivalOf(n) - 0.01) + 0.1, BAR_Z);
  };

  const tmp = new THREE.Vector3();
  const tmp2 = new THREE.Vector3();
  const START = new THREE.Vector3();

  // ── jeden snímek v čase t ──
  const update = (t: number) => {
    // pás a kontrolky
    cleats.forEach((c, i) => {
      const u = (i * CLEAT_GAP + t * V) % CLEAT_LEN;
      c.position.x = CLEAT_X0 + u;
      const edge = Math.min(u, CLEAT_LEN - u);
      c.scale.set(1, 1, clamp01(edge / 0.15));
    });
    ledMats.forEach((m, i) => {
      const w = Math.pow(Math.max(0, Math.cos(t * 2.2 - i * 0.7)), 6);
      m.emissiveIntensity = 0.15 + 1.6 * w;
    });

    // ozubená kola
    const w1 = t * 0.55;
    gear1.rotation.z = contact + w1;
    gear2.rotation.z = contact + Math.PI - Math.PI / G2.n - (w1 * G1.n) / G2.n;

    // lupa se jemně houpe
    lens.position.y = LENS_Y + Math.sin(t * 1.4) * 0.05;
    lens.rotation.z = Math.sin(t * 0.9) * 0.05;

    let press = 0;
    let scan = 0;
    let burst = -1;
    let tubeU = -1;

    for (const it of items) {
      // poslední papír, který tento objekt veze
      const k = Math.floor((t - it.slot * I) / (I * SEQ.length));
      const n = k * SEQ.length + it.slot;
      const age = t - n * I;
      if (n < 0 || age < 0 || age > LIFE) {
        it.g.visible = false;
        continue;
      }
      it.g.visible = true;
      const rnd = Math.sin(n * 12.9898) * 43758.5453;
      const r1 = rnd - Math.floor(rnd);
      const showBall = age < T_PRESS + 0.05;
      it.ball.visible = showBall;
      it.card.visible = !showBall;
      it.g.scale.setScalar(1);
      it.ball.scale.setScalar(1);
      it.g.rotation.set(0, 0, 0);

      if (age < T_FALL) {
        // pád shora do trychtýře
        const u = age / T_FALL;
        const a0 = r1 * Math.PI * 2;
        // papír se objeví kousek nad trychtýřem, ať nepadá přes text nad strojem
        it.g.position.set(FUNNEL.x + Math.cos(a0) * 0.85, 5.6 - (5.6 - 4.25) * u * u, Math.sin(a0) * 0.85);
        it.g.rotation.set(age * 3 + r1, age * 2, 0);
        it.ball.scale.setScalar(Math.max(0.001, easeBack(seg(u, 0, 0.45))));
      } else if (age < T_FALL + T_SPIN) {
        // točí se dolů po stěně trychtýře
        const u = (age - T_FALL) / T_SPIN;
        const a = r1 * Math.PI * 2 + u * Math.PI * 4.5;
        const rad = 0.85 * (1 - easeIn(u)) + 0.05;
        it.g.position.set(FUNNEL.x + Math.cos(a) * rad, 4.25 - (4.25 - 3.0) * u, Math.sin(a) * rad);
        it.g.rotation.set(age * 4, age * 3, 0);
        it.ball.scale.setScalar(1 - 0.35 * easeIn(u));
      } else if (age < T_FALL + T_SPIN + T_TUBE) {
        // uvnitř trubky: papír není vidět, trubka se nafukuje
        it.g.visible = false;
        tubeU = (age - T_FALL - T_SPIN) / T_TUBE;
      } else if (age < T_BELT) {
        // vyskočí z trubky na pás
        const u = (age - T_FALL - T_SPIN - T_TUBE) / T_POP;
        tubeCurve.getPointAt(1, tmp);
        const y0 = BELT_TOP + BALL_R;
        it.g.position.set(tmp.x + (BELT_X0 - tmp.x) * u, tmp.y + (y0 - tmp.y) * u + Math.sin(u * Math.PI) * 0.25, 0);
        it.ball.scale.setScalar(0.65 + 0.35 * easeBack(u));
      } else if (age < T_END) {
        // jede po pásu
        const x = BELT_X0 + (age - T_BELT) * V;
        const d = age - T_PRESS;
        // razítko: dolů, chvilku drží, nahoru
        const p = d < -0.32 ? 0 : d < 0 ? easeIn(seg(d, -0.32, 0)) : d < 0.1 ? 1 : 1 - easeOut(seg(d, 0.1, 0.45));
        press = Math.max(press, p);
        const scanW = 1 - Math.min(1, Math.abs(age - T_LENS) / 0.55);
        scan = Math.max(scan, scanW);
        if (showBall) {
          const headY = HEAD_REST + (HEAD_HIT - HEAD_REST) * p;
          const sy = clamp01((headY - BELT_TOP) / (BALL_R * 2));
          const squash = Math.max(0.55, Math.min(1, sy));
          it.ball.scale.set(1 / Math.sqrt(squash), squash, 1 / Math.sqrt(squash));
          it.g.position.set(x, BELT_TOP + BALL_R * squash, 0);
          it.g.rotation.y = Math.sin(age * 1.3 + r1 * 6) * 0.3;
          it.ball.rotation.set(r1 * 6, r1 * 3, 0);
        } else {
          const s = easeBack(seg(d, 0.05, 0.38));
          it.card.scale.setScalar(Math.max(0.001, s));
          it.g.position.set(x, BELT_TOP + 0.035, 0);
          it.g.rotation.y = -0.15 + r1 * 0.3;
          if (d < 0.7) burst = Math.max(burst, d);
        }
      } else {
        // skok do cíle
        const u = (age - T_END) / T_HOP;
        START.set(BELT_X1, BELT_TOP + 0.035, 0);
        target(it.kind, n, tmp);
        tmp2.copy(START).lerp(tmp, 0.5);
        tmp2.y = Math.max(START.y, tmp.y) + 1.25;
        const a = (1 - u) * (1 - u);
        const b = 2 * (1 - u) * u;
        const c = u * u;
        it.g.position.set(
          a * START.x + b * tmp2.x + c * tmp.x,
          a * START.y + b * tmp2.y + c * tmp.y,
          a * START.z + b * tmp2.z + c * tmp.z,
        );
        it.g.rotation.set(Math.sin(u * Math.PI) * 0.5, -0.15 + r1 * 0.3, u * Math.PI * 2 * (r1 > 0.5 ? 1 : -1));
        it.card.scale.setScalar(1 - easeIn(seg(u, 0.7, 1)));
      }
    }

    // nafouknutí trubky
    if (tubeU >= 0) {
      bulge.visible = true;
      tubeCurve.getPointAt(Math.min(0.995, Math.max(0.005, tubeU)), tmp);
      bulge.position.copy(tmp);
      const env = Math.sin(Math.PI * clamp01(tubeU * 1.05));
      bulge.scale.setScalar(0.72 + 0.28 * env);
    } else bulge.visible = false;

    // razítko a píst
    const headY = HEAD_REST + (HEAD_HIT - HEAD_REST) * press;
    head.position.y = headY;
    const beamBottom = ARM_Y - 0.17;
    const len = beamBottom - (headY + 0.28);
    piston.scale.y = Math.max(0.01, len);
    piston.position.set(PRESS_X, headY + 0.28 + len / 2, 0);

    // kruh po orazítkování
    if (burst >= 0) {
      const u = seg(burst, 0.05, 0.7);
      ring.visible = true;
      ring.scale.setScalar(0.35 + easeOut(u) * 0.95);
      M.ring.opacity = 0.85 * (1 - u);
    } else ring.visible = false;

    // lupa: když je pod ní papír, rozsvítí se a vrhne světlo
    M.beam.opacity = 0.2 * scan;
    beam.visible = scan > 0.01;
    lensRingMat.emissive.copy(lensRingMat.color);
    lensRingMat.emissiveIntensity = 0.55 * scan;

    // schránka: vlajka nahoru, když přijde dopis
    const mt = t - lastArrival('mail', t);
    flag.rotation.x = -Math.PI / 2 + (Math.PI / 2) * pulse(mt, 0.25, 1.4, 0.5);
    mailbox.scale.set(1, 1 - 0.07 * Math.sin(Math.PI * seg(mt, 0, 0.3)), 1);

    // kalendář: odškrtnutí
    const nt = t - lastArrival('note', t);
    const bs = nt < 0.4 ? easeBack(seg(nt, 0, 0.4)) : 1 - easeInOut(seg(nt, 1.8, 2.2));
    badge.scale.setScalar(Math.max(0.001, bs));
    cal.scale.set(1, 1 - 0.06 * Math.sin(Math.PI * seg(nt, 0, 0.3)), 1);

    // graf
    let tallest = 0;
    bars.forEach((b, i) => {
      const h = barHeight(i, t);
      b.scale.y = h;
      if (i === bars.length - 1) tallest = h;
    });
    const dt = t - lastArrival('doc', t);
    const hop = Math.sin(Math.PI * seg(dt, 0.1, 0.6)) * 0.35;
    topBall.position.set(BAR_X[3], tallest + 0.19 + hop, BAR_Z);
  };

  // ── kamera a velikost ──
  let dist = 20;
  const center = new THREE.Vector3();
  let portrait = false;
  const frame = () => {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    const aspect = w / h;
    camera.aspect = aspect;
    portrait = aspect < 1.05;
    const fitW = portrait ? 10.8 : 19.5;
    const vfov = THREE.MathUtils.degToRad(camera.fov);
    const hfov = 2 * Math.atan(Math.tan(vfov / 2) * aspect);
    dist = fitW / 2 / Math.tan(hfov / 2);
    // na široké nízké obrazovce by stroj přetekl nahoru: držíme i výšku
    dist = Math.max(dist, 6.4 / Math.tan(vfov / 2) / 2 / (portrait ? 0.5 : 0.78));
    center.set(portrait ? -0.2 : 0.2, portrait ? 1.8 : 2.0, 0);
    // text je nahoře, stroj leží ve spodní části hera jako podlaha
    let focus = portrait ? 0.76 : 0.72;
    // vršek stroje (trychtýř, kola) musí zůstat pod tlačítky, i na nízké obrazovce
    // stroj sedí pod textem; když se mezi text a spodní okraj nevejde, zmenší se
    if (textBottom) {
      const minTop = (textBottom() + 32) / h;
      const avail = 0.97 - minTop;
      const measure = () => {
        camera.clearViewOffset();
        placeCamera(0);
        camera.updateMatrixWorld();
        const top = tmp.set(FUNNEL.x, 4.6, 0).project(camera).y;
        const mid = tmp.copy(center).project(camera).y;
        const bot = tmp.set(0, 0.1, 1.5).project(camera).y;
        return { top, mid, span: (top - bot) / 2 };
      };
      let m = measure();
      for (let i = 0; i < 3 && m.span > avail; i++) {
        dist *= (m.span / avail) * 1.02;
        m = measure();
      }
      focus = Math.max(focus, minTop + (m.top - m.mid) / 2);
    }
    camera.setViewOffset(w, h, 0, (0.5 - focus) * h, w, h);
    fog.near = dist + 1;
    fog.far = dist + 16;
  };
  const placeCamera = (t: number) => {
    // na výšku se díváme šikmo podél stroje, ať se vejde celý a je větší
    const yaw = (portrait ? -0.72 : 0) + Math.sin(t * 0.07) * 0.08;
    const pitch = 0.36 + Math.sin(t * 0.05) * 0.015;
    camera.position.set(
      center.x + Math.sin(yaw) * Math.cos(pitch) * dist,
      center.y + Math.sin(pitch) * dist,
      center.z + Math.cos(yaw) * Math.cos(pitch) * dist,
    );
    camera.lookAt(center);
    camera.updateProjectionMatrix();
  };

  // ── barvy z webu (primární, pozadí) a přepínání motivu ──
  const applyTheme = () => {
    const primary = cssColor('--primary');
    const bg = cssColor('--bg-deep');
    const light = document.documentElement.dataset.theme === 'light';
    // celý stroj je z jedné modelíny: jen odstíny primární barvy, od světlé po tmavou
    const W = new THREE.Color('#ffffff');
    const D = light ? new THREE.Color(PAL.choco) : bg;
    const tone = (t: number) => (t >= 0 ? primary.clone().lerp(W, t) : primary.clone().lerp(D, -t));
    const tones: [THREE.MeshStandardMaterial, number][] = [
      [M.paper, 0.62],
      [M.white, 0.5],
      [M.funnel, 0.3],
      [M.cream, 0.26],
      [M.sand, 0.08],
      [M.orange, 0.14],
      [M.terracotta, -0.32],
      [M.caramel, -0.48],
      [M.sage, -0.4],
      [M.olive, -0.52],
      [M.moss, -0.62],
      [M.cocoa, -0.7],
      [M.choco, -0.8],
    ];
    for (const [m, t] of tones) m.color.copy(tone(t));
    for (const m of [M.primary, lensRingMat]) m.color.copy(primary);
    M.lights.color.copy(primary);
    for (const m of ledMats) {
      m.color.copy(primary);
      m.emissive.copy(primary);
    }
    M.beam.color.copy(primary);
    M.ring.color.copy(primary);
    fog.color.copy(bg);
    M.platform.color.copy(light ? bg.clone().lerp(primary, 0.4) : bg.clone().lerp(primary, 0.16));
    hemi.color.copy(primary.clone().lerp(W, 0.6));
    hemi.groundColor.copy(light ? primary.clone().lerp(D, 0.3) : bg.clone().lerp(primary, 0.1));
    hemi.intensity = light ? 1.1 : 0.85;
  };
  applyTheme();
  const mo = new MutationObserver(() => {
    applyTheme();
    if (!running) render();
  });
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'style'] });

  // ── smyčka ──
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const start = performance.now();
  const WARM = 60; // scéna je od prvního snímku plná papírů
  const STILL = WARM + 9.1; // nehybný snímek: papír je zrovna pod razítkem
  let ready = false;
  const render = () => {
    const t = reduce.matches ? STILL : WARM + (performance.now() - start) / 1000;
    update(t);
    placeCamera(reduce.matches ? 0 : t);
    renderer.render(scene, camera);
    if (!ready) {
      ready = true;
      onReady?.();
    }
  };

  let raf = 0;
  let running = false;
  let visible = true;
  const tick = () => {
    if (!visible || document.hidden || reduce.matches) {
      running = false;
      return;
    }
    render();
    raf = requestAnimationFrame(tick);
  };
  const loop = () => {
    if (running) return;
    running = true;
    raf = requestAnimationFrame(tick);
  };
  const stop = () => {
    running = false;
    cancelAnimationFrame(raf);
  };

  const ro = new ResizeObserver(() => {
    frame();
    if (!running) render();
  });
  ro.observe(canvas);
  const io = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible && !reduce.matches) loop();
  });
  io.observe(canvas);
  const onVis = () => (document.hidden ? stop() : !reduce.matches && loop());
  document.addEventListener('visibilitychange', onVis);
  const onReduce = () => (reduce.matches ? (stop(), render()) : loop());
  reduce.addEventListener('change', onReduce);

  frame();
  render();
  if (!reduce.matches) loop();

  return () => {
    stop();
    ro.disconnect();
    io.disconnect();
    mo.disconnect();
    document.removeEventListener('visibilitychange', onVis);
    reduce.removeEventListener('change', onReduce);
    disposables.forEach((d) => d.dispose());
    renderer.dispose();
  };
}
