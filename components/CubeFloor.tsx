'use client';

import { useEffect, useRef } from 'react';

/*
 * Pozadí hera, varianta /hero2: podlaha z kostek v perspektivě. Kostky se vlní,
 * celá podlaha pomalu jede ke kameře a občas jedna kostka vyjede nahoru, rozsvítí
 * se a zase zapadne. Vzadu se kostky rozpustí do průhledna, takže je za nimi
 * vidět CSS pozadí (záře u horizontu). Barvy se berou z --primary a --bg-deep
 * a mění se s motivem. Vlastní WebGL2, žádná knihovna. Bez WebGL zůstane jen
 * CSS pozadí, při prefers-reduced-motion se vykreslí jeden nehybný snímek.
 */

const NX = 61; // kostek do šířky
const NZ = 44; // kostek do hloubky
const PITCH = 1; // rozestup středů
const SIZE = 0.9; // šířka kostky (zbytek je spára)
const SPEED = 0.22; // o kolik kostek za sekundu podlaha přijede blíž

const VERT = `#version 300 es
in vec3 a_pos;
in vec3 a_nrm;
in vec2 a_cell;
uniform mat4 u_vp;
uniform vec3 u_eye;
uniform float u_time;
uniform float u_scroll;
out vec3 v_nrm;
out vec3 v_lp;
out float v_h;
out float v_glow;
out float v_dist;

float hash(vec2 p){ p = fract(p*vec2(123.34, 456.21)); p += dot(p, p+45.32); return fract(p.x*p.y); }

void main(){
  float t = u_time;
  float fz = fract(u_scroll);
  // id řady je ukotvené ve světě: když podlaha poposkočí o jednu řadu zpátky,
  // řada o jednu blíž dostane stejné id, takže výška ani blikání neskočí
  float X = a_cell.x;
  float Z = a_cell.y + floor(u_scroll);

  // vlnění
  float w1 = sin(X*0.36 + t*0.75 + 1.4*sin(Z*0.21 + t*0.31));
  float w2 = cos(Z*0.33 - t*0.62 + 0.8*sin(X*0.17 - t*0.2));
  float wave = 0.5 + 0.5*(0.6*w1 + 0.4*w2);
  float h = 0.14 + 0.95*wave*wave;

  // občas jedna kostka vyjede nahoru a rozsvítí se
  float r = hash(vec2(X, Z));
  float glow = 0.0;
  float lift = 0.0;
  if (r > 0.955) {
    float ph = fract(t*0.085 + r*17.0);
    float b = smoothstep(0.0, 0.16, ph) * (1.0 - smoothstep(0.38, 0.58, ph));
    // jen v dálce: blízko kamery by vyjetá kostka zakryla nadpis
    b *= smoothstep(8.0, 13.0, a_cell.y - fz);
    glow = b;
    lift = b * (1.1 + 1.6*fract(r*53.0));
  }

  vec3 lp = a_pos;
  vec3 world = vec3(
    (X - 0.5*float(${NX - 1})) * ${PITCH.toFixed(1)} + lp.x*${SIZE.toFixed(2)},
    lp.y*h + lift,
    -(a_cell.y - fz) * ${PITCH.toFixed(1)} + lp.z*${SIZE.toFixed(2)}
  );
  gl_Position = u_vp * vec4(world, 1.0);
  v_nrm = a_nrm;
  v_lp = lp;
  v_h = clamp((h - 0.14)/0.95, 0.0, 1.0);
  v_glow = glow;
  v_dist = length(world - u_eye);
}`;

const FRAG = `#version 300 es
precision highp float;
in vec3 v_nrm;
in vec3 v_lp;
in float v_h;
in float v_glow;
in float v_dist;
uniform vec3 u_brand;
uniform vec3 u_bg;
uniform float u_light;
uniform vec2 u_fog;
out vec4 outColor;

void main(){
  vec3 L = normalize(vec3(-0.35, 0.85, 0.45));
  float lam = max(dot(v_nrm, L), 0.0);
  bool top = v_nrm.y > 0.5;

  // barva vršku: tmavý podklad s nádechem primární barvy, vyšší kostky víc do barvy
  float mixAmt = u_light > 0.5 ? 0.22 + 0.38*v_h : 0.13 + 0.34*v_h;
  vec3 base = mix(u_bg, u_brand, mixAmt);
  vec3 col = base * (top ? 1.0 : 0.38 + 0.55*lam);

  if (top) {
    // světlá hrana kolem vršku, jako zkosení
    float d = max(abs(v_lp.x), abs(v_lp.z));
    float rim = smoothstep(0.40, 0.5, d);
    col = mix(col, mix(col, u_brand, 0.7), rim*(0.45 + 0.45*v_h));
  } else {
    // boky ke spodku tmavnou
    col *= mix(0.55, 1.0, v_lp.y + 0.5);
  }

  // vyjetá kostka svítí primární barvou
  vec3 hot = mix(u_brand, vec3(1.0), 0.18);
  col = mix(col, top ? hot : hot*(0.45 + 0.4*lam), v_glow*0.85);

  // vzadu se podlaha rozpustí do průhledna (premultiplied alfa)
  // svítící kostky prosvítají i z mlhy
  float a = 1.0 - smoothstep(u_fog.x, u_fog.y, v_dist);
  a = max(a, v_glow * (1.0 - smoothstep(u_fog.y, u_fog.y + 14.0, v_dist)));
  outColor = vec4(col*a, a);
}`;

// pět stěn kostky (spodek není nikdy vidět), x a z v ±0.5, y v 0..1
function cubeMesh() {
  const v: number[] = [];
  const face = (n: number[], c: number[][]) => {
    for (const i of [0, 1, 2, 0, 2, 3]) v.push(...c[i], ...n);
  };
  const a = 0.5;
  face([0, 1, 0], [[-a, 1, -a], [-a, 1, a], [a, 1, a], [a, 1, -a]]);
  face([0, 0, 1], [[-a, 0, a], [a, 0, a], [a, 1, a], [-a, 1, a]]);
  face([0, 0, -1], [[a, 0, -a], [-a, 0, -a], [-a, 1, -a], [a, 1, -a]]);
  face([1, 0, 0], [[a, 0, a], [a, 0, -a], [a, 1, -a], [a, 1, a]]);
  face([-1, 0, 0], [[-a, 0, -a], [-a, 0, a], [-a, 1, a], [-a, 1, -a]]);
  return new Float32Array(v);
}

type V3 = [number, number, number];
const sub = (a: V3, b: V3): V3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const cross = (a: V3, b: V3): V3 => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const norm = (a: V3): V3 => {
  const l = Math.hypot(...a);
  return [a[0] / l, a[1] / l, a[2] / l];
};
const dot = (a: V3, b: V3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];

/** projekce × pohled, sloupcově jako v GL */
function viewProj(eye: V3, target: V3, fovY: number, aspect: number) {
  const f = norm(sub(target, eye));
  const s = norm(cross(f, [0, 1, 0]));
  const u = cross(s, f);
  const view = [s[0], u[0], -f[0], 0, s[1], u[1], -f[1], 0, s[2], u[2], -f[2], 0, -dot(s, eye), -dot(u, eye), dot(f, eye), 1];
  const near = 0.1;
  const far = 100;
  const t = 1 / Math.tan(fovY / 2);
  const proj = [t / aspect, 0, 0, 0, 0, t, 0, 0, 0, 0, (far + near) / (near - far), -1, 0, 0, (2 * far * near) / (near - far), 0];
  const out = new Float32Array(16);
  for (let c = 0; c < 4; c++)
    for (let r = 0; r < 4; r++) {
      let sum = 0;
      for (let k = 0; k < 4; k++) sum += proj[k * 4 + r] * view[c * 4 + k];
      out[c * 4 + r] = sum;
    }
  return out;
}

function srgb(name: string): V3 {
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
  return [r / 255, g / 255, b / 255];
}

export default function CubeFloor() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl2', { antialias: true, alpha: true, premultipliedAlpha: true });
    if (!gl) {
      canvas.classList.add('is-fallback');
      return;
    }

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.error('cube shader', gl.getShaderInfoLog(s));
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error('cube program', gl.getProgramInfoLog(prog));
      canvas.classList.add('is-fallback');
      return;
    }
    gl.useProgram(prog);

    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    const mesh = cubeMesh();
    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, mesh, gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, 'a_pos');
    const aNrm = gl.getAttribLocation(prog, 'a_nrm');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 3, gl.FLOAT, false, 24, 0);
    gl.enableVertexAttribArray(aNrm);
    gl.vertexAttribPointer(aNrm, 3, gl.FLOAT, false, 24, 12);

    const cells = new Float32Array(NX * NZ * 2);
    for (let z = 0, i = 0; z < NZ; z++) for (let x = 0; x < NX; x++, i += 2) {
      cells[i] = x;
      cells[i + 1] = z;
    }
    const ibo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, ibo);
    gl.bufferData(gl.ARRAY_BUFFER, cells, gl.STATIC_DRAW);
    const aCell = gl.getAttribLocation(prog, 'a_cell');
    gl.enableVertexAttribArray(aCell);
    gl.vertexAttribPointer(aCell, 2, gl.FLOAT, false, 0, 0);
    gl.vertexAttribDivisor(aCell, 1);

    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.clearColor(0, 0, 0, 0);

    const uVP = gl.getUniformLocation(prog, 'u_vp');
    const uEye = gl.getUniformLocation(prog, 'u_eye');
    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uScroll = gl.getUniformLocation(prog, 'u_scroll');
    const uBrand = gl.getUniformLocation(prog, 'u_brand');
    const uBg = gl.getUniformLocation(prog, 'u_bg');
    const uLight = gl.getUniformLocation(prog, 'u_light');
    const uFog = gl.getUniformLocation(prog, 'u_fog');

    let brand = srgb('--primary');
    let bg = srgb('--bg-deep');
    let light = document.documentElement.dataset.theme === 'light';
    const mo = new MutationObserver(() => {
      brand = srgb('--primary');
      bg = srgb('--bg-deep');
      light = document.documentElement.dataset.theme === 'light';
      if (!running) render();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['style', 'data-theme'] });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };

    const reduce = matchMedia('(prefers-reduced-motion: reduce)');
    const start = performance.now() - 40_000; // ať jsou od začátku vidět i vyjeté kostky
    const draw = (time: number) => {
      resize();
      const aspect = canvas.width / canvas.height;
      const portrait = aspect < 1;
      // nízká kamera, skoro vodorovný pohled: horizont leží kousek nad středem hera
      const eye: V3 = [0, portrait ? 2.9 : 2.5, 3];
      const fov = ((portrait ? 58 : 40) * Math.PI) / 180;
      const tilt = portrait ? 0.07 : 0.035; // o kolik se kamera dívá dolů
      const target: V3 = [0, eye[1] - Math.tan(tilt) * 20, eye[2] - 20];
      gl.uniformMatrix4fv(uVP, false, viewProj(eye, target, fov, aspect));
      gl.uniform3f(uEye, eye[0], eye[1], eye[2]);
      gl.uniform1f(uTime, time);
      gl.uniform1f(uScroll, time * SPEED);
      gl.uniform3f(uBrand, brand[0], brand[1], brand[2]);
      gl.uniform3f(uBg, bg[0], bg[1], bg[2]);
      gl.uniform1f(uLight, light ? 1 : 0);
      gl.uniform2f(uFog, 12, 36);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.drawArraysInstanced(gl.TRIANGLES, 0, mesh.length / 6, NX * NZ);
    };
    const render = () => draw((performance.now() - start) / 1000);

    let raf = 0;
    let running = false;
    let visible = true;
    let last = 0;
    const tick = (now: number) => {
      if (!visible || document.hidden || reduce.matches) {
        running = false;
        return;
      }
      // nad 60 Hz se kreslí každý druhý snímek, pohyb je pomalý a stačí to
      if (now - last > 14) {
        last = now;
        render();
      }
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

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !reduce.matches) loop();
    });
    io.observe(canvas);
    const ro = new ResizeObserver(() => !running && render());
    ro.observe(canvas);
    const onVis = () => (document.hidden ? stop() : !reduce.matches && loop());
    document.addEventListener('visibilitychange', onVis);
    const onReduce = () => (reduce.matches ? (stop(), render()) : loop());
    reduce.addEventListener('change', onReduce);

    render();
    if (!reduce.matches) loop();

    return () => {
      stop();
      mo.disconnect();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      reduce.removeEventListener('change', onReduce);
    };
  }, []);

  return <canvas ref={ref} className="hero-canvas" aria-hidden="true" />;
}
