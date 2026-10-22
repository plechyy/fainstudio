'use client';

import { useEffect, useRef } from 'react';

/*
 * Živé pozadí hera jako na screenshotu: zrnitá, morfující se amber „mlha".
 * Vlastní WebGL2 fragment shader (žádná knihovna) — doménově warpovaný fBm
 * šum + film grain, pomalu se hýbe a transformuje. Barva se bere z --secondary
 * (slider i téma se promítnou živě). Bez WebGL nebo při prefers-reduced-motion
 * se vykreslí statická varianta.
 */

const FRAG = `#version 300 es
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec3 u_brand;
uniform vec3 u_bg;
uniform float u_motion;
uniform float u_sides; // 0 = volně, 1 = boky (hero), 2 = jeden mrak uprostřed
uniform float u_light; // 1 = světlý motiv: mrak je sytě barevný na světlém podkladu
out vec4 outColor;

float hash(vec2 p){ p = fract(p*vec2(123.34, 456.21)); p += dot(p, p+45.32); return fract(p.x*p.y); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  float a = hash(i), b = hash(i+vec2(1.,0.)), c = hash(i+vec2(0.,1.)), d = hash(i+vec2(1.,1.));
  vec2 u = f*f*(3.-2.*f);
  return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
}
float fbm(vec2 p){
  float v = 0., a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for(int i=0;i<3;i++){ v += a*noise(p); p = m*p; a *= 0.5; }
  return v;
}

void main(){
  vec2 p = (gl_FragCoord.xy - 0.5*u_res) / u_res.y;   // y-normalizované, střed = 0
  float t = u_time * 0.08 * u_motion;

  // Jemnozrnný šum + prahování smoothstepem → tvar je rozmanitý a bohatý.
  // POZOR: pole šumu se pohybuje po UZAVŘENÝCH drahách (sin/cos), ne lineárně v čase.
  // Lineární posun (dřív) pole po čase vynesl do oblasti se slabým šumem a mrak
  // zhasl; takhle se pole vrací a vzhled zůstává stejný celé hodiny.
  vec2 w = vec2(
    fbm(p*2.0 + vec2(0.9*sin(t*1.0), 0.9*cos(t*0.86))),
    fbm(p*2.0 + vec2(3.3 + 0.8*cos(t*0.74), -0.8*sin(t*1.04)))
  );
  float n = fbm(p*2.4 + 2.1*(w - 0.5) + vec2(0.5*sin(t*0.62), 0.5*cos(t*0.54)));
  float f = smoothstep(0.28, 0.72, n);

  // Dva body s původními širokými drahami přes CELÝ hero (dráhy jsou periodické,
  // takže se opakují do nekonečna bez nabobtnávání).
  vec2 c1 = vec2(0.52*sin(t*0.65), 0.30*cos(t*0.8));
  vec2 c2 = vec2(0.58*cos(t*0.45 + 2.0), 0.34*sin(t*0.55 + 1.0));
  // Režim „boky": stejné pomalé dráhy, ale každý bod je vázaný na jednu polovinu hera
  // (levý/pravý okraj). A = polovina šířky v jednotkách výšky.
  float A = 0.5 * u_res.x / u_res.y;
  bool portrait = u_res.y > u_res.x;
  if (u_sides > 1.5) {
    // jeden bod, který se jen pomalu potuluje kolem středu
    c1 = vec2(A * 0.22 * sin(t*0.65), 0.12 * cos(t*0.8));
  } else if (u_sides > 0.5) {
    if (portrait) {
      // mobil na výšku: jeden vodorovný pás mlhy za nadpisem, pod navigací a nad tlačítky
      c1 = vec2(0.10*sin(t*0.65), 0.19 + 0.03*cos(t*0.8));
      c2 = vec2(0.10*cos(t*0.45 + 2.0), 0.15 + 0.03*sin(t*0.55 + 1.0));
    } else {
      c1 = vec2(-A * (0.74 + 0.16*sin(t*0.65)), 0.30*cos(t*0.8));
      c2 = vec2( A * (0.74 + 0.16*cos(t*0.45 + 2.0)), 0.34*sin(t*0.55 + 1.0));
    }
  }
  // na výšku je mrak zploštělý do pásu (jinak by zalil celou výšku úzkého displeje)
  vec2 k = (u_sides > 0.5 && u_sides < 1.5 && portrait) ? vec2(1.0, 4.2) : vec2(1.0);
  vec2 e1 = (p - c1) * k;
  vec2 e2 = (p - c2) * k;
  float g1 = exp(-dot(e1, e1) * 2.2);
  float g2 = exp(-dot(e2, e2) * 2.7);
  // probabilistic union — překryv dvou bodů nesčítá jas
  float gm = g1 + g2 - g1*g2;
  float d = clamp(f * (0.35 + 1.6 * gm), 0.0, 1.0);
  if (u_sides > 1.5) {
    // jeden široký mrak (do šířky protažený), se stejným stálým základem jako boky v hero
    vec2 q = (p - c1) * vec2(0.62, 1.0);
    float gc = exp(-dot(q, q) * 2.4);
    d = clamp(mix(0.45, 1.0, f) * (0.12 + 1.6 * gc), 0.0, 1.0);
  }
  // Střed s textem zůstává volný: mrak jen u okrajů, plynule zeslabený směrem ke středu.
  if (u_sides > 0.5 && u_sides < 1.5) {
    // Šum jen tvaruje okraje, základ mraku na obou bocích je tu VŽDY (min. 45 % šumu),
    // takže žádná strana nikdy nezmizí, když je šum zrovna slabý
    // (změřeno: na 2 h animace nejslabší moment 0.45, nikdy pod čtvrtinou jasu).
    float base = portrait ? 0.03 : 0.18;
    d = clamp(mix(0.45, 1.0, f) * (base + 1.7 * gm), 0.0, 1.0);
    // na šířku zůstává střed volný pro text; na výšku mrak text přímo podkládá
    if (!portrait) {
      float ax = abs(gl_FragCoord.x / u_res.x - 0.5);
      d *= smoothstep(0.17, 0.40, ax);
    } else {
      d *= 0.62;
    }
  }

  // Strop = jasná verze brand barvy; v nejvyšších špičkách lehce k bílé (ne na plno).
  vec3 peak = u_brand * 0.95;
  vec3 col = u_bg;
  if (u_light > 0.5) {
    // světlý podklad: mlha jde z bledého nádechu do sytější barvy, nikdy do bílé
    col = mix(col, mix(u_bg, u_brand, 0.5), smoothstep(0.08, 0.55, d) * 0.85);
    col = mix(col, u_brand * 0.9, smoothstep(0.45, 0.95, d) * 0.9);
  } else {
    col = mix(col, u_brand * 0.38, smoothstep(0.08, 0.55, d));
    col = mix(col, peak, smoothstep(0.50, 0.92, d));
    col = mix(col, mix(peak, vec3(1.0), 0.35), smoothstep(0.86, 1.0, d));
  }
  col = mix(col, u_bg, smoothstep(0.80, 1.5, length(p)));
  // hero na výšku: celé pozadí o pětinu tmavší
  if (u_sides > 0.5 && u_sides < 1.5 && portrait && u_light < 0.5) col *= 0.8;

  // film grain
  float gr = hash(gl_FragCoord.xy * 1.3 + fract(u_time) * 180.0);
  col += (gr - 0.5) * 0.02;

  outColor = vec4(max(col, 0.0), 1.0);
}`;

const VERT = `#version 300 es
in vec2 a; void main(){ gl_Position = vec4(a, 0.0, 1.0); }`;

function srgb(name: string): [number, number, number] {
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

function hex(h: string): [number, number, number] {
  const n = parseInt(h.replace('#', ''), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

export default function ShaderBackground({
  bg: bgHex,
  bgVar,
  brandVar = '--secondary',
  phase = 30,
  sides = false,
  center = false,
}: {
  /** pevná barva pozadí mraku (např. '#050505'); bez ní se bere --bg-deep z tématu */
  bg?: string;
  /** název CSS proměnné s barvou pozadí (např. '--smoke-bg'), mění se s motivem */
  bgVar?: string;
  /** název CSS proměnné s barvou mraku (výchozí --secondary; --primary = barva tlačítek) */
  brandVar?: string;
  /** výchozí fáze animace v sekundách — ať dvě instance nevypadají stejně */
  phase?: number;
  /** mrak jen u levého a pravého okraje, střed zůstává volný (hero) */
  sides?: boolean;
  /** jeden mrak uprostřed (tlumené pozadí sekcí) */
  center?: boolean;
} = {}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl2', { antialias: false, alpha: false, powerPreference: 'low-power' });
    if (!gl) {
      canvas.classList.add('is-fallback');
      return;
    }

    const reduce = matchMedia('(prefers-reduced-motion: reduce)');
    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error('shader compile', gl.getShaderInfoLog(s));
      }
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error('program link', gl.getProgramInfoLog(prog));
      canvas.classList.add('is-fallback');
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'a');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, 'u_res');
    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uBrand = gl.getUniformLocation(prog, 'u_brand');
    const uBg = gl.getUniformLocation(prog, 'u_bg');
    const uMotion = gl.getUniformLocation(prog, 'u_motion');
    const uSides = gl.getUniformLocation(prog, 'u_sides');
    const uLight = gl.getUniformLocation(prog, 'u_light');
    const isLight = () => !bgHex && document.documentElement.dataset.theme === 'light';

    let brand = srgb(brandVar);
    const pickBg = () => (bgHex ? hex(bgHex) : srgb(bgVar ?? '--bg-deep'));
    let bg = pickBg();
    const refreshColors = () => {
      brand = srgb(brandVar);
      bg = pickBg();
    };
    refreshColors();
    // color studio mění style na <html>
    const mo = new MutationObserver(refreshColors);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['style', 'data-theme'] });

    // Mlha je rozmazaná → stačí nízké rozlišení. Backing store ~0.42× CSS px,
    // CSS ho roztáhne. Výrazně míň fragmentů = plynulé i na slabším GPU.
    const SCALE = 0.62; // vyšší rozlišení mraku — po roztažení není vidět zrno
    const resize = () => {
      const w = Math.max(1, Math.round(canvas.clientWidth * SCALE));
      const h = Math.max(1, Math.round(canvas.clientHeight * SCALE));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    let visible = true;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !reduce.matches) loop();
    });
    io.observe(canvas);

    let raf = 0;
    const PHASE = phase; // s — animace začíná tam, kde je mrak nejhezčí
    const start = performance.now() - PHASE * 1000;
    const draw = (time: number) => {
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, time);
      gl.uniform3f(uBrand, brand[0], brand[1], brand[2]);
      gl.uniform3f(uBg, bg[0], bg[1], bg[2]);
      gl.uniform1f(uMotion, reduce.matches ? 0 : 1);
      gl.uniform1f(uSides, center ? 2 : sides ? 1 : 0);
      gl.uniform1f(uLight, isLight() ? 1 : 0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    const render = () => draw((performance.now() - start) / 1000);

    // Kadence: místo tvrdého časového stropu (který na vsyncu trhá) kreslíme každý
    // N-tý snímek, kde N vychází z obnovovací frekvence displeje tak, aby cíl byl
    // ~25 fps, ale s ROVNOMĚRNÝM rozestupem. 60 Hz → N=2 (30 fps), 120 Hz → N=5
    // (24 fps), 144 Hz → N=6. Rovný krok = žádné mikro-trhání.
    const TARGET_FPS = 25;
    let step = 2;
    let frameN = 0;
    let running = false;
    // odhad Hz z prvních snímků
    let measured = false;
    let mStart = 0;
    let mCount = 0;

    const tick = (now: number) => {
      if (!visible || document.hidden || reduce.matches) {
        running = false;
        return;
      }
      if (!measured) {
        if (mCount === 0) {
          mStart = now;
          mCount = 1;
        } else if (++mCount >= 24) {
          const hz = (1000 * (mCount - 1)) / (now - mStart);
          step = Math.min(8, Math.max(1, Math.round(hz / TARGET_FPS)));
          measured = true;
        }
      }
      if (frameN % step === 0) render();
      frameN++;
      raf = requestAnimationFrame(tick);
    };
    const loop = () => {
      if (running) return;
      running = true;
      frameN = 0;
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onReduce = () => {
      if (reduce.matches) {
        stop();
        render();
      } else loop();
    };
    reduce.addEventListener('change', onReduce);
    document.addEventListener('visibilitychange', () => (document.hidden ? stop() : loop()));

    // Vždy hned vykreslit jeden snímek — i když je záložka skrytá nebo má reduced
    // motion, pozadí tak nikdy nezůstane prázdné/černé.
    render();
    if (!reduce.matches) loop();

    return () => {
      stop();
      mo.disconnect();
      ro.disconnect();
      io.disconnect();
      reduce.removeEventListener('change', onReduce);
    };
  }, [bgHex, bgVar, brandVar, phase, sides, center]);

  return <canvas ref={ref} className="hero-canvas" aria-hidden="true" />;
}
