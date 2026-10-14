'use client';

import { useEffect } from 'react';

/*
 * Mrak uvnitř tlačítek.
 * Jeden sdílený WebGL2 mrak (detached canvas, nízké rozlišení). Každé .btn dostane
 * vlastní 2D canvas a vlastní PEVNÝ výřez sdíleného mraku (jiný pro každé tlačítko).
 * Výřez nezávisí na pozici na obrazovce → mrak v tlačítku je vždy na stejném místě
 * tlačítka a při scrollu se nemění; mění se jen v čase (animace).
 * Žádný další WebGL kontext na tlačítko. Běží jen když je aspoň jedno tlačítko vidět;
 * kadence ~25 fps rovnoměrně na vsync.
 */

const FRAG = `#version 300 es
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec3 u_brand;
uniform vec3 u_bg;
out vec4 o;

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
  // jemnější měřítko než v hero → i v malém tlačítku je vidět struktura mraku
  vec2 p = (gl_FragCoord.xy - 0.5*u_res) / u_res.y * 9.0;
  float t = u_time * 0.3;                       // ≈3× rychlejší než hero → pohyb je vidět i v malém okně
  p += vec2(t * 0.55, t * 0.2);                 // plynulý driftem posun celého pole
  vec2 w = vec2(fbm(p*0.9 + vec2(0.0, t)), fbm(p*0.9 + vec2(3.3, -t*0.8)));
  float n = fbm(p*1.2 + 2.2*(w - 0.5) + 0.25*t);
  // stejná barevná rampa jako mrak v sekcích (hero, před/po, srovnání, CTA):
  // černá → tlumená barva → plná barva, jen s nižším stropem jasu, ať je bílý text čitelný
  float d = clamp(0.2 + 1.0 * smoothstep(0.2, 0.75, n), 0.0, 1.0);
  vec3 peak = u_brand * 0.95;
  vec3 lin = pow(peak, vec3(2.2));
  float Y = dot(lin, vec3(0.2126, 0.7152, 0.0722));
  lin *= min(1.0, 0.24 / max(Y, 1e-4));
  peak = pow(lin, vec3(1.0 / 2.2));
  vec3 col = u_bg;
  col = mix(col, u_brand * 0.38, smoothstep(0.08, 0.55, d));
  col = mix(col, peak, smoothstep(0.50, 0.92, d));
  // film grain jako v sekcích
  float gr = hash(gl_FragCoord.xy * 1.3 + fract(u_time) * 180.0);
  col += (gr - 0.5) * 0.045;
  o = vec4(max(col, 0.0), 1.0);
}`;

const VERT = `#version 300 es
in vec2 a; void main(){ gl_Position = vec4(a, 0.0, 1.0); }`;

const BASE_BG: [number, number, number] = [5 / 255, 5 / 255, 5 / 255]; // #050505

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

type Entry = {
  btn: HTMLElement;
  cv: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  visible: boolean;
  fx: number; // pevná pozice výřezu ve sdíleném mraku (0–1), jiná pro každé tlačítko
  fy: number;
};

export default function ButtonSmoke() {
  useEffect(() => {
    const buttons = Array.from(document.querySelectorAll<HTMLElement>('.btn--primary:not([data-smoke])'));
    if (!buttons.length) return;

    const src = document.createElement('canvas');
    const gl = src.getContext('webgl2', { antialias: false, alpha: false, powerPreference: 'low-power' });
    if (!gl) return; // zůstane statický CSS gradient

    const compile = (type: number, code: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, code);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.error('button smoke shader', gl.getShaderInfoLog(s));
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error('button smoke link', gl.getProgramInfoLog(prog));
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

    const reduce = matchMedia('(prefers-reduced-motion: reduce)');
    const SCALE = 0.3; // sdílený mrak = 0.3× okna; je rozmazaný, stačí
    let brand = srgb('--brand');
    const resize = () => {
      src.width = Math.max(160, Math.round(innerWidth * SCALE));
      src.height = Math.max(90, Math.round(innerHeight * SCALE));
      gl.viewport(0, 0, src.width, src.height);
    };
    resize();

    const entries: Entry[] = buttons.flatMap((btn, i) => {
      const cv = document.createElement('canvas');
      cv.className = 'btn__smoke';
      cv.setAttribute('aria-hidden', 'true');
      const ctx = cv.getContext('2d', { alpha: false });
      if (!ctx) return [];
      ctx.imageSmoothingQuality = 'high';
      btn.setAttribute('data-smoke', '');
      btn.prepend(cv);
      const frac = (n: number) => n - Math.floor(n);
      return [{ btn, cv, ctx, visible: false, fx: frac(0.13 + i * 0.618), fy: frac(0.37 + i * 0.381) }];
    });

    const PHASE = 60;
    const start = performance.now() - PHASE * 1000;

    const render = () => {
      gl.uniform2f(uRes, src.width, src.height);
      gl.uniform1f(uTime, reduce.matches ? PHASE : (performance.now() - start) / 1000);
      gl.uniform3f(uBrand, brand[0], brand[1], brand[2]);
      gl.uniform3f(uBg, BASE_BG[0], BASE_BG[1], BASE_BG[2]);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      // kopie výřezů MUSÍ proběhnout ve stejném tasku jako drawArrays (jinak je buffer prázdný)
      const k = src.width / innerWidth; // stejné měřítko jako dřív: 1 px tlačítka = k px mraku
      for (const e of entries) {
        if (!e.visible) continue;
        const w = Math.max(1, e.btn.offsetWidth);
        const h = Math.max(1, e.btn.offsetHeight);
        if (e.cv.width !== w || e.cv.height !== h) {
          e.cv.width = w;
          e.cv.height = h;
          e.ctx.imageSmoothingQuality = 'high';
        }
        // pevný výřez: poloha je dána jen indexem tlačítka, ne scrollem
        const sw = Math.min(src.width, w * k);
        const sh = Math.min(src.height, h * k);
        const ox = e.fx * (src.width - sw);
        const oy = e.fy * (src.height - sh);
        e.ctx.drawImage(src, ox, oy, sw, sh, 0, 0, w, h);
      }
    };

    // Kadence: každý N-tý vsync (N z obnovovací frekvence) → rovnoměrně ~25 fps.
    const TARGET_FPS = 25;
    let step = 2;
    let frameN = 0;
    let running = false;
    let raf = 0;
    let measured = false;
    let mStart = 0;
    let mCount = 0;
    const anyVisible = () => entries.some((e) => e.visible);

    const tick = (now: number) => {
      if (document.hidden || reduce.matches || !anyVisible()) {
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

    // Viditelnost nejdřív spočítat přímo z pozice: IntersectionObserver ve skryté záložce
    // nevolá callbacky, takže bez tohohle by tlačítka zůstala prázdná/černá.
    const syncVisible = () => {
      for (const e of entries) {
        const r = e.btn.getBoundingClientRect();
        e.visible = r.bottom > 0 && r.top < innerHeight && r.right > 0 && r.left < innerWidth;
      }
    };
    syncVisible();
    if (anyVisible()) {
      render();
      if (!reduce.matches) loop();
    }

    const io = new IntersectionObserver((list) => {
      for (const it of list) {
        const e = entries.find((x) => x.btn === it.target);
        if (e) e.visible = it.isIntersecting;
      }
      if (anyVisible()) {
        render(); // okamžitý první snímek, ať tlačítko nikdy není prázdné
        if (!reduce.matches) loop();
      }
    });
    entries.forEach((e) => io.observe(e.btn));

    const mo = new MutationObserver(() => {
      brand = srgb('--brand');
      if (reduce.matches && anyVisible()) render();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['style'] });

    const onResize = () => {
      resize();
      if (anyVisible()) render();
    };
    addEventListener('resize', onResize);
    const onVis = () => (document.hidden ? stop() : anyVisible() && !reduce.matches && loop());
    document.addEventListener('visibilitychange', onVis);
    // při scrollu se výřez nemění; jen se případně rozjede smyčka, když tlačítko přijde do záběru
    const onScroll = () => {
      const before = entries.map((e) => e.visible).join();
      syncVisible();
      if (!anyVisible()) return;
      if (reduce.matches) {
        if (entries.map((e) => e.visible).join() !== before) render(); // jen nově viditelná
      } else loop();
    };
    addEventListener('scroll', onScroll, { passive: true });

    return () => {
      stop();
      io.disconnect();
      mo.disconnect();
      removeEventListener('resize', onResize);
      removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVis);
      entries.forEach((e) => {
        e.cv.remove();
        e.btn.removeAttribute('data-smoke');
      });
    };
  }, []);

  return null;
}
