'use client';

import { useEffect, useRef, useState } from 'react';

/*
 * 3D mozek z neuronové sítě (canvas 2D, žádná knihovna).
 * ~700 bodů na povrchu dvou hemisfér + mozeček + kmen; každý bod je spojený se dvěma
 * nejbližšími sousedy. Mozek se pomalu natáčí, náhodné spoje „jiskří“. Kmen končí přesně
 * uprostřed spodní hrany plátna — odtud vedou vodiče do karty (viz BeforeAfter).
 */

type V3 = [number, number, number];

const FPS = 30;

function rng(seed: number) {
  return () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
}

function buildBrain() {
  const rand = rng(7);
  const pts: V3[] = [];
  const dir = (): V3 => {
    // rovnoměrný směr na kouli
    const u = rand() * 2 - 1;
    const a = rand() * Math.PI * 2;
    const r = Math.sqrt(1 - u * u);
    return [r * Math.cos(a), u, r * Math.sin(a)];
  };
  // dvě hemisféry (x = šířka, y = výška, z = předo-zadní délka)
  for (const side of [-1, 1]) {
    for (let i = 0; i < 430; i++) {
      const [dx, dy, dz] = dir();
      if (dx * side < -0.55) continue; // vnitřní stěna u podélné rýhy jen řídce
      const inner = rand() < 0.08 ? 0.55 + rand() * 0.35 : 1; // pár bodů uvnitř kvůli hloubce
      const gyri = 1 + 0.05 * Math.sin(dx * 9 + 1) * Math.sin(dy * 8) * Math.sin(dz * 10 + 2);
      let x = side * 0.44 + dx * 0.42 * inner * gyri;
      let y = dy * 0.6 * inner * gyri;
      const z = dz * 0.86 * inner * gyri;
      if (y < -0.22) y = -0.22 + (y + 0.22) * 0.45; // zploštělá spodní strana
      x -= side * 0.03 * Math.max(0, -dy); // spodek lehce k sobě
      pts.push([x, y, z]);
    }
  }
  // mozeček vzadu dole
  for (let i = 0; i < 120; i++) {
    const [dx, dy, dz] = dir();
    pts.push([dx * 0.5, -0.38 + dy * 0.17, -0.58 + dz * 0.26]);
  }
  // kmen (x = z = 0, aby jeho spodní konec zůstal při natáčení na místě)
  for (let i = 0; i < 30; i++) {
    const k = i / 29;
    const a = rand() * Math.PI * 2;
    const r = 0.07 * (1 - k * 0.4);
    pts.push([Math.cos(a) * r, -0.3 - k * 0.5, Math.sin(a) * r * 0.8]);
  }
  pts.push([0, -0.8, 0]); // přesný konec kmene

  // spoje: každý bod se třemi nejbližšími sousedy
  const edges: [number, number][] = [];
  const seen = new Set<number>();
  for (let i = 0; i < pts.length; i++) {
    const best: [number, number][] = []; // [vzdálenost², index], seřazené, max 3
    for (let j = 0; j < pts.length; j++) {
      if (i === j) continue;
      const dx = pts[i][0] - pts[j][0];
      const dy = pts[i][1] - pts[j][1];
      const dz = pts[i][2] - pts[j][2];
      const d = dx * dx + dy * dy + dz * dz;
      if (best.length < 3 || d < best[best.length - 1][0]) {
        best.push([d, j]);
        best.sort((a, b) => a[0] - b[0]);
        if (best.length > 3) best.pop();
      }
    }
    for (const [, j] of best) {
      const key = Math.min(i, j) * 4096 + Math.max(i, j);
      if (!seen.has(key)) {
        seen.add(key);
        edges.push([i, j]);
      }
    }
  }
  // kouř: měkké obláčky zakotvené UVNITŘ objemu mozku (68 % vzdálenosti povrchu od středu
  // hemisféry), takže se točí s ním a nemají jak vyjít ven
  const puffs: { base: V3; ph: number; r: number }[] = [];
  const surface = pts.slice(0, 860);
  for (let i = 0; i < 46; i++) {
    const [x, y, z] = surface[(rand() * surface.length) | 0];
    const side = x < 0 ? -1 : 1;
    const cx = side * 0.44;
    puffs.push({
      base: [cx + (x - cx) * 0.62, y * 0.62, z * 0.62],
      ph: rand() * Math.PI * 2,
      r: 0.17 + rand() * 0.12,
    });
  }
  return { pts, edges, puffs };
}

function brandRgb(): [number, number, number] {
  const probe = document.createElement('span');
  probe.style.color = 'var(--brand)';
  document.body.appendChild(probe);
  const col = getComputedStyle(probe).color;
  probe.remove();
  const cv = document.createElement('canvas');
  cv.width = cv.height = 1;
  const cx = cv.getContext('2d')!;
  cx.fillStyle = col;
  cx.fillRect(0, 0, 1, 1);
  const [r, g, b] = cx.getImageData(0, 0, 1, 1).data;
  return [r, g, b];
}

export default function BrainCanvas({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLCanvasElement>(null);
  const [logo, setLogo] = useState<{ x: number; y: number; size: number } | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { pts, edges, puffs } = buildBrain();
    const N = pts.length;
    const sx = new Float32Array(N);
    const sy = new Float32Array(N);
    const near = new Float32Array(N);
    let brand = brandRgb();
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let w = 0,
      h = 0,
      S = 1,
      cy = 0,
      dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = wrap.clientWidth;
      h = wrap.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      S = Math.min(w * 0.44, h / 1.5);
      cy = h - S * 0.86 - 1; // konec kmene (y = -0.8) sedí na spodní hraně
      setLogo({ x: w / 2, y: cy - 0.08 * S, size: S * 0.3 });
      draw(lastT);
    };

    // jiskry: [index spoje, čas zrodu]
    const sparks: [number, number][] = [];
    let lastT = 0;

    const draw = (t: number) => {
      lastT = t;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const yaw = Math.PI / 2 - 0.5 + 0.38 * Math.sin(t * 0.00022); // tříčtvrteční pohled
      const pitch = 0.26 + 0.05 * Math.sin(t * 0.00017);
      const ca = Math.cos(yaw),
        sa = Math.sin(yaw),
        cb = Math.cos(pitch),
        sb = Math.sin(pitch);
      const f = 3.2;
      for (let i = 0; i < N; i++) {
        const [x, y, z] = pts[i];
        const x1 = x * ca + z * sa;
        const z1 = -x * sa + z * ca;
        const y2 = y * cb - z1 * sb;
        const z2 = y * sb + z1 * cb;
        const s = f / (f + z2);
        sx[i] = w / 2 + x1 * S * s;
        sy[i] = cy - y2 * S * s;
        near[i] = Math.min(1, Math.max(0, (1 - z2) / 2)); // 1 = blízko
      }
      const [r, g, b] = brand;

      // kouř pod sítí: 'lighter' sčítá světlo, takže se obláčky slévají do mlhy
      ctx.globalCompositeOperation = 'lighter';
      for (const pf of puffs) {
        const a = t * 0.00035 + pf.ph;
        const x = pf.base[0] + 0.07 * Math.sin(a * 1.1);
        const y = pf.base[1] + 0.06 * Math.sin(a * 0.9 + 1.7);
        const z = pf.base[2] + 0.07 * Math.cos(a * 0.8);
        const x1 = x * ca + z * sa;
        const z1 = -x * sa + z * ca;
        const y2 = y * cb - z1 * sb;
        const z2 = y * sb + z1 * cb;
        const s = f / (f + z2);
        const px = w / 2 + x1 * S * s;
        const py = cy - y2 * S * s;
        const rad = pf.r * S * s * (1 + 0.18 * Math.sin(a * 1.6));
        const al = 0.1 + 0.1 * ((1 - z2) / 2);
        const gr = ctx.createRadialGradient(px, py, 0, px, py, rad);
        gr.addColorStop(0, `rgba(${r},${g},${b},${al})`);
        gr.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.fillStyle = gr;
        ctx.fillRect(px - rad, py - rad, rad * 2, rad * 2);
      }
      ctx.globalCompositeOperation = 'source-over';

      // spoje po čtyřech hladinách hloubky (jeden stroke na hladinu)
      ctx.lineWidth = 0.7;
      for (let k = 0; k < 4; k++) {
        ctx.beginPath();
        for (const [i, j] of edges) {
          const n = (near[i] + near[j]) / 2;
          if (Math.min(3, Math.floor(n * 4)) !== k) continue;
          ctx.moveTo(sx[i], sy[i]);
          ctx.lineTo(sx[j], sy[j]);
        }
        ctx.strokeStyle = `rgba(${r},${g},${b},${0.08 + k * 0.12})`;
        ctx.stroke();
      }
      // body
      for (let k = 0; k < 4; k++) {
        ctx.fillStyle = `rgba(${Math.round(r * 0.5 + 127)},${Math.round(g * 0.5 + 127)},${Math.round(
          b * 0.5 + 127,
        )},${0.22 + k * 0.24})`;
        const sz = 0.9 + k * 0.45;
        for (let i = 0; i < N; i++) {
          if (Math.min(3, Math.floor(near[i] * 4)) !== k) continue;
          ctx.fillRect(sx[i] - sz / 2, sy[i] - sz / 2, sz, sz);
        }
      }
      // jiskry
      if (!reduce) {
        if (Math.random() < 0.55) sparks.push([(Math.random() * edges.length) | 0, t]);
        ctx.lineWidth = 1.4;
        ctx.shadowColor = `rgb(${r},${g},${b})`;
        ctx.shadowBlur = 8;
        for (let s = sparks.length - 1; s >= 0; s--) {
          const age = (t - sparks[s][1]) / 520;
          if (age > 1) {
            sparks.splice(s, 1);
            continue;
          }
          const [i, j] = edges[sparks[s][0]];
          const a = (1 - age) * (0.35 + 0.65 * (near[i] + near[j]) / 2);
          ctx.strokeStyle = `rgba(${Math.round(r * 0.4 + 153)},${Math.round(g * 0.4 + 153)},${Math.round(
            b * 0.4 + 153,
          )},${a})`;
          ctx.beginPath();
          ctx.moveTo(sx[i], sy[i]);
          ctx.lineTo(sx[j], sy[j]);
          ctx.stroke();
        }
        ctx.shadowBlur = 0;
      }
    };

    let raf = 0,
      last = 0,
      visible = false;
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (now - last < 1000 / FPS - 2) return;
      last = now;
      draw(now);
    };
    const start = () => {
      if (!raf && !reduce) raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    resize();
    draw(performance.now());

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !document.hidden) start();
      else stop();
    });
    io.observe(wrap);
    const onVis = () => (document.hidden || !visible ? stop() : start());
    document.addEventListener('visibilitychange', onVis);
    // přebarvení z color studia
    const mo = new MutationObserver(() => {
      brand = brandRgb();
      draw(lastT || performance.now());
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['style'] });

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  return (
    <div ref={wrapRef} className={`brain${className ? ' ' + className : ''}`} aria-hidden="true">
      <canvas ref={ref} className="brain__canvas" />
      {logo && (
        <span className="brain__logo" style={{ left: logo.x, top: logo.y, fontSize: logo.size }}>
          FaiN
        </span>
      )}
    </div>
  );
}
