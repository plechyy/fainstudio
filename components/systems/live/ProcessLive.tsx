'use client';

import { useEffect, useRef, useState } from 'react';
import { Cursor, ico, Layer, Scene, Svg, useCount, useLoop } from './scene';

/*
 * Procesy: nástup nové kolegyně. Kurzor klikne „Spustit nástup“, formulář se
 * stáhne do jednoho bodu a od něj se rozběhne šest věcí naráz: smlouva,
 * notebook, účty, přístupy, první den v kalendáři a uvítání.
 *
 * Fáze: 0 formulář · 1 kurzor přijede · 2 klik · 3 rozběhne se · 4 rozsvítí se kroky
 *       5 drží · 6 doznění
 */
const DUR = [900, 900, 350, 900, 1700, 2800, 450];
const DONE = 5;

// kde kroky leží (v % plochy); všechny v jedné rovině se spojnicemi, ať na sebe přesně sedí
const nodes = [
  { ico: ico.pen, t: 'Smlouva', d: 'k podpisu', x: 0, y: 3 },
  { ico: ico.laptop, t: 'Notebook', d: 'objednaný', x: 66, y: 3 },
  { ico: ico.mail, t: 'E-mail a účty', d: 'založené', x: -5, y: 41 },
  { ico: ico.key, t: 'Přístupy', d: 'Disk, Figma', x: 71, y: 41 },
  { ico: ico.cal, t: 'První den', d: 'v kalendáři', x: 0, y: 79 },
  { ico: ico.chat, t: 'Uvítání', d: 'od vedoucí', x: 66, y: 79 },
];

type Geo = { w: number; h: number; lines: [number, number, number, number][] };

/** Spojnice ze středu plochy k nejbližší hraně každého kroku, změřené ze skutečného rozložení. */
function useLines(box: React.RefObject<HTMLDivElement | null>) {
  const [geo, setGeo] = useState<Geo | null>(null);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const measure = () => {
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      const cx = w / 2;
      const cy = h / 2;
      const lines = [...el.querySelectorAll<HTMLElement>('.ob__node')].map((n) => {
        const hw = n.offsetWidth / 2;
        const hh = n.offsetHeight / 2;
        const nx = n.offsetLeft + hw;
        const ny = n.offsetTop + hh;
        // bod na okraji kroku, který leží na přímce ke středu
        const dx = cx - nx;
        const dy = cy - ny;
        const t = Math.min(dx ? hw / Math.abs(dx) : Infinity, dy ? hh / Math.abs(dy) : Infinity);
        return [cx, cy, nx + dx * t, ny + dy * t] as [number, number, number, number];
      });
      setGeo({ w, h, lines });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [box]);
  return geo;
}

export default function ProcessLive() {
  const { s, ref } = useLoop(DUR, DONE);
  const box = useRef<HTMLDivElement>(null);
  const geo = useLines(box);
  const lit = useCount(0, 6, s, 4, 1500);
  const started = s >= 3 && s <= 5;
  const on = (i: number) => (s === 4 ? lit > i : s === 5);

  return (
    <Scene sceneRef={ref} base={560} className={`sc--proc${s === 6 ? ' is-out' : ''}`}>
      <div className="ob" ref={box}>
        {geo && (
          <svg className="ob__lines" viewBox={`0 0 ${geo.w} ${geo.h}`} aria-hidden="true">
            {geo.lines.map(([x1, y1, x2, y2], i) => (
              <path
                key={i}
                d={`M${x1} ${y1} L${x2} ${y2}`}
                pathLength={1}
                className={`${started ? 'is-drawn' : ''}${on(i) ? ' is-on' : ''}`}
                style={{ transitionDelay: started && s === 3 ? `${i * 80}ms` : undefined }}
              />
            ))}
          </svg>
        )}

        {nodes.map((n, i) => (
          <Layer z={0} style={{ left: `${n.x}%`, top: `${n.y}%` }} className={`ob__node${started ? ' is-in' : ''}${on(i) ? ' is-on' : ''}`} key={n.t}>
            <div style={{ transitionDelay: started && s === 3 ? `${i * 80}ms` : undefined }}>
              <span className="ob__ico">
                <Svg>{n.ico}</Svg>
              </span>
              <span>
                <b>{n.t}</b>
                <span>{n.d}</span>
              </span>
              <Svg className="sc-ok ob__ok">{ico.check}</Svg>
            </div>
          </Layer>
        ))}

        {/* formulář, který se po kliknutí stáhne do středu */}
        <div className={`win ob__core${started ? ' is-small' : ''}`}>
          <div className="win__bar">
            <span className="win__dots" />
            <b className="win__name">Nový kolega</b>
          </div>
          <div className="ob__form">
            <p>
              <i>Jméno</i>
              <b>Tereza Malá</b>
            </p>
            <p>
              <i>Pozice</i>
              <b>Grafička</b>
            </p>
            <p>
              <i>Nástup</i>
              <b className="num">3. 11. 2026</b>
            </p>
            <span className="ob__go">
              <span className={`sc-btn${s === 2 ? ' is-press' : ''}`}>Spustit nástup</span>
              <Cursor state={s === 1 ? 'in' : s === 2 ? 'click' : 'off'} />
            </span>
          </div>
          <div className="ob__who">
            <span className="ob__av">TM</span>
            <span>
              <b>Tereza Malá</b>
              <span className={s === 5 ? 'is-done' : ''}>
                {s === 5 ? 'Vše připraveno' : `Hotovo ${s === 4 ? lit : 0} z 6`}
              </span>
            </span>
          </div>
        </div>
      </div>
    </Scene>
  );
}
