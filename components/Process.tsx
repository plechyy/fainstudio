'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { process } from '@/lib/content';
import { route, type Pt } from '@/lib/wire';
import ShaderBackground from './ShaderBackground';

/*
 * Postup: čtyři karty rozházené do vln a jeden „elektrický“ drát, který vede přes všechny.
 * Výboj projde postupně 1 → 2 → 3 → 4; karta se rozsvítí ve chvíli, kdy do ní dorazí.
 * Časování je čisté CSS (stejná délka cyklu, posunuté zpoždění), JS jen měří trasy.
 */

const HOP = 0.95; // s mezi dvěma kartami
const TRAVEL = 0.7; // s, kolik trvá cesta výboje po jednom úseku
const CYCLE = 5.2; // s, celý cyklus včetně pauzy na konci

type Geo = { w: number; h: number; segs: string[]; ports: Pt[] };

export default function Process() {
  const steps = process.steps;
  const [geo, setGeo] = useState<Geo | null>(null);
  const [inView, setInView] = useState(false);
  const boardRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLLIElement | null)[]>([]);

  const measure = useCallback(() => {
    const board = boardRef.current;
    if (!board) return;
    const b = board.getBoundingClientRect();
    const rs = (cardRefs.current.filter(Boolean) as HTMLLIElement[]).map((c) => c.getBoundingClientRect());
    if (rs.length < 2) return;
    // vedle sebe (desktop) → drát mezi bočními hranami; pod sebou (mobil) → mezi spodní a horní hranou
    const vertical = rs[1].top >= rs[0].bottom - 1;
    const segs: string[] = [];
    const ports: Pt[] = [];
    for (let i = 0; i < rs.length - 1; i++) {
      const a = rs[i];
      const c = rs[i + 1];
      let pts: Pt[];
      if (!vertical) {
        const y0 = a.top + Math.min(64, a.height / 2) - b.top;
        const y1 = c.top + Math.min(64, c.height / 2) - b.top;
        const x0 = a.right - b.left;
        const x1 = c.left - b.left;
        const mx = (x0 + x1) / 2;
        pts = [
          [x0, y0],
          [mx, y0],
          [mx, y1],
          [x1, y1],
        ];
      } else {
        const x0 = a.left + 32 - b.left;
        const x1 = c.left + 32 - b.left;
        const y0 = a.bottom - b.top;
        const y1 = c.top - b.top;
        const my = (y0 + y1) / 2;
        pts = [
          [x0, y0],
          [x0, my],
          [x1, my],
          [x1, y1],
        ];
      }
      segs.push(route(pts, 2));
      ports.push(pts[0], pts[pts.length - 1]);
    }
    setGeo({ w: b.width, h: b.height, segs, ports });
  }, []);

  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (boardRef.current) ro.observe(boardRef.current);
    document.fonts?.ready.then(measure).catch(() => {});
    return () => ro.disconnect();
  }, [measure]);

  useEffect(() => {
    const el = boardRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold: 0.2,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="section proc-section" id="postup" aria-labelledby="postup-title">
      {/* stejný mrak jako v hero, ale jeden uprostřed, tlumený a rozpuštěný do stránky */}
      <div className="proc-bg" aria-hidden="true">
        <ShaderBackground center phase={70} />
      </div>
      <div className="wrap">
        <header className="proc-head reveal">
          <p className="label shead__index" aria-hidden="true">
            <b>03</b>
            Postup
          </p>
          <h2 className="h2 proc-head__title silver" id="postup-title">
            {process.title}
          </h2>
          <p className="proc-head__lead">{process.lead}</p>
        </header>

        <div
          ref={boardRef}
          className="proc reveal"
          data-live={inView || undefined}
          style={{ ['--cycle' as string]: `${CYCLE}s` }}
        >
          {geo && (
            <svg
              className="proc__wires"
              width={geo.w}
              height={geo.h}
              viewBox={`0 0 ${geo.w} ${geo.h}`}
              aria-hidden="true"
            >
              <defs>
                <filter id="proc-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" />
                </filter>
              </defs>
              {geo.segs.map((d, i) => (
                <g key={i} style={{ ['--d' as string]: `${i * HOP + (HOP - TRAVEL)}s` }}>
                  <path d={d} className="pwire" />
                  <path d={d} className="pwire__glow" filter="url(#proc-glow)" />
                  <path d={d} className="pwire__pulse" pathLength={1000} />
                </g>
              ))}
              {geo.ports.map(([x, y], i) => (
                <rect
                  key={i}
                  x={x - 3}
                  y={y - 3}
                  width="6"
                  height="6"
                  className="pport"
                  style={{ ['--d' as string]: `${Math.ceil(i / 2) * HOP}s` }}
                />
              ))}
            </svg>
          )}

          <ol className="proc__list">
            {steps.map((s, i) => (
              <li
                key={i}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="pcard"
                style={{ ['--d' as string]: `${i * HOP}s` }}
              >
                <div className="pcard__top">
                  <span className="pcard__num num" aria-hidden="true">
                    0{i + 1}
                  </span>
                  <span className="pcard__of num" aria-hidden="true">
                    / 04
                  </span>
                </div>
                <h3 className="pcard__name">{s.name}</h3>
                <p className="pcard__text">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
