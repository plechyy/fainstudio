'use client';

import { useEffect, useRef, useState } from 'react';

/*
 * Úvodní loading obrazovka: jen slovo „FaiN“, které se vybarvuje kouřem jako v hero.
 * Slovo je v HTML od prvního bajtu (tmavě šedé, žádné probliknutí obsahu); WebGL ho pak
 * zleva doprava zaplní kouřem v primární barvě. Plnění jede k ~85 %, dokud se stránka
 * nenačte, pak dobarví do konce a loader zmizí. Bez JS ho schová <noscript> v layoutu,
 * bez WebGL nebo při reduced motion zůstane slovo jednobarevné.
 */

const MIN = 1450; // nejkratší doba zobrazení
const FILL_MS = 1400; // vyplnění loga jede rovnoměrně přes celou dobu načítání
const HOLD = 350; // pauza na plně vybarveném slově

const FRAG = `#version 300 es
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform float u_fill;
uniform vec3 u_brand;
uniform vec3 u_base;
uniform sampler2D u_tex;
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
  for(int i=0;i<4;i++){ v += a*noise(p); p = m*p; a *= 0.5; }
  return v;
}

void main(){
  vec2 uv = gl_FragCoord.xy / u_res;
  float a = texture(u_tex, uv).a;
  vec2 p = (uv - 0.5) * vec2(u_res.x / u_res.y, 1.0);
  float t = u_time * 0.35;

  // stejný doménově warpovaný šum jako kouř v hero
  vec2 w = vec2(
    fbm(p*2.2 + vec2(0.9*sin(t), 0.9*cos(t*0.86))),
    fbm(p*2.2 + vec2(3.3 + 0.8*cos(t*0.74), -0.8*sin(t*1.04)))
  );
  float n = fbm(p*2.6 + 2.1*(w - 0.5) + vec2(0.5*sin(t*0.62), 0.5*cos(t*0.54)));
  float f = smoothstep(0.25, 0.75, n);

  // čelo vybarvování jde zleva doprava a okraj mu kouř roztřepí
  float edge = uv.x*0.9 + (n - 0.5)*0.5;
  float k = smoothstep(0.0, 0.1, u_fill*1.75 - edge - 0.25);

  vec3 smoke = mix(u_brand*0.78, u_brand*1.0, smoothstep(0.15, 0.9, f));
  smoke = mix(smoke, vec3(1.0), 0.2*smoothstep(0.85, 1.0, f));
  vec3 base = u_base;
  vec3 col = mix(base, smoke, k);
  outColor = vec4(col*a, a);
}`;

const VERT = `#version 300 es
in vec2 a; void main(){ gl_Position = vec4(a, 0.0, 1.0); }`;

function brandRgb(): [number, number, number] {
  const probe = document.createElement('span');
  probe.style.color = 'var(--cta)';
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

export default function Loader() {
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);
  const wordRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const word = wordRef.current!;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t0 = performance.now();
    let ready = false;
    let finished = false;
    let raf = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const finish = () => {
      if (finished) return;
      finished = true;
      cancelAnimationFrame(raf);
      timers.push(
        setTimeout(() => {
          setDone(true);
          root.classList.remove('is-loading');
          timers.push(setTimeout(() => setGone(true), 800));
        }, HOLD),
      );
    };

    Promise.all([
      document.fonts?.ready ?? Promise.resolve(),
      document.readyState === 'complete'
        ? Promise.resolve()
        : new Promise<void>((r) => window.addEventListener('load', () => r(), { once: true })),
    ]).then(
      () => (ready = true),
      () => (ready = true),
    );
    timers.push(setTimeout(finish, 6000)); // nikdy nezůstat viset

    const fallback = () => {
      word.classList.add('is-static');
      const tick = () => {
        if (ready && performance.now() - t0 >= (reduce ? 600 : MIN)) finish();
        else raf = requestAnimationFrame(tick);
      };
      tick();
    };

    const start = async () => {
      const canvas = canvasRef.current;
      const text = textRef.current;
      if (!canvas || !text || reduce) return fallback();
      const gl = canvas.getContext('webgl2', { antialias: false, alpha: true, premultipliedAlpha: true });
      if (!gl) return fallback();
      try {
        await document.fonts.load('700 100px FingerPaint');
      } catch {}

      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const fs = parseFloat(getComputedStyle(text).fontSize);
      const rect = text.getBoundingClientRect();
      const cssW = Math.round(rect.width + fs * 0.6);
      const cssH = Math.round(fs * 1.7);
      canvas.style.width = cssW + 'px';
      canvas.style.height = cssH + 'px';
      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);

      // maska písmen: bílý text na průhledné ploše
      const tex = document.createElement('canvas');
      tex.width = canvas.width;
      tex.height = canvas.height;
      const tx = tex.getContext('2d')!;
      tx.font = `700 ${fs * dpr}px FingerPaint`;
      tx.textAlign = 'center';
      tx.textBaseline = 'alphabetic';
      tx.fillStyle = '#fff';
      tx.fillText('FaiN', tex.width / 2, tex.height / 2 + fs * dpr * 0.34);

      const compile = (type: number, src: string) => {
        const s = gl.createShader(type)!;
        gl.shaderSource(s, src);
        gl.compileShader(s);
        return s;
      };
      const prog = gl.createProgram()!;
      gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
      gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return fallback();
      gl.useProgram(prog);

      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      const loc = gl.getAttribLocation(prog, 'a');
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.uniform1i(gl.getUniformLocation(prog, 'u_tex'), 0);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(gl.getUniformLocation(prog, 'u_res'), canvas.width, canvas.height);
      const [r, g, b] = brandRgb();
      gl.uniform3f(gl.getUniformLocation(prog, 'u_brand'), r, g, b);
      const light = root.dataset.theme === 'light';
      if (light) gl.uniform3f(gl.getUniformLocation(prog, 'u_base'), 0.86, 0.855, 0.85);
      else gl.uniform3f(gl.getUniformLocation(prog, 'u_base'), 0.165, 0.165, 0.18);
      const uTime = gl.getUniformLocation(prog, 'u_time');
      const uFill = gl.getUniformLocation(prog, 'u_fill');

      word.classList.add('is-gl');
      let fill = 0;
      let last = performance.now();
      const frame = (now: number) => {
        const dt = Math.min(0.05, (now - last) / 1000);
        last = now;
        // rovnoměrně od 0 do plna přes celou dobu (nezrychluje se, když je web hotový dřív)
        const target = Math.min(1, (now - t0) / FILL_MS);
        fill += (target - fill) * (1 - Math.exp(-dt * 10));
        gl.uniform1f(uTime, (now - t0) / 1000 + 20);
        gl.uniform1f(uFill, fill);
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
        if (ready && fill > 0.985 && now - t0 >= MIN) finish();
        else raf = requestAnimationFrame(frame);
      };
      raf = requestAnimationFrame(frame);
    };
    start();

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
    };
  }, []);

  if (gone) return null;
  return (
    <div className={`loader${done ? ' is-done' : ''}`} aria-hidden="true">
      <div className="loader__inner">
        <span className="loader__word" ref={wordRef}>
          <span className="loader__text" ref={textRef}>
            FaiN
          </span>
          <canvas className="loader__canvas" ref={canvasRef} />
        </span>
      </div>
    </div>
  );
}
