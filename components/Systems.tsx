'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { systems } from '@/lib/content';
import { route, type Pt } from '@/lib/wire';
import CtaRow from './CtaRow';
import { hero } from '@/lib/content';

/*
 * Systémy: vlevo šest položek, vpravo jeden výstup. Každá položka má vlastní „vodič“,
 * všechny se symetricky slévají do jedné linky, která vede do výstupu. Aktivní vodič
 * se rozsvítí v primární barvě a běží po něm výboj; ostatní zůstávají tlumené.
 * Trasy se počítají z reálných rozměrů prvků (ResizeObserver), takže sedí na každé šířce.
 */

const AUTO_MS = 6500; // autopřepínání, dokud uživatel na nic neklikne

type Geo = { w: number; h: number; paths: string[]; starts: Pt[]; end: Pt; vertical: boolean };

export default function Systems() {
  const items = systems.items;
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(false); // zapne se až po mountu (reduced-motion → zůstane vypnuté)
  const [inView, setInView] = useState(false);
  const [geo, setGeo] = useState<Geo | null>(null);

  const boardRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const outRef = useRef<HTMLDivElement>(null);

  // ── geometrie vodičů ─────────────────────────────────────────────
  const measure = useCallback(() => {
    const board = boardRef.current;
    const out = outRef.current;
    if (!board || !out) return;
    const b = board.getBoundingClientRect();
    const o = out.getBoundingClientRect();
    const tabs = tabRefs.current.filter(Boolean) as HTMLButtonElement[];
    if (!tabs.length) return;
    const rects = tabs.map((t) => t.getBoundingClientRect());

    // vedle sebe (desktop) → vodiče jdou doprava; pod sebou (mobil) → sběrnice vlevo a dolů
    const vertical = o.left < rects[0].right;
    const paths: string[] = [];
    const starts: Pt[] = [];
    let end: Pt;

    if (!vertical) {
      const x0 = rects[0].right - b.left;
      const x1 = o.left - b.left;
      const trunk = x0 + (x1 - x0) * 0.42;
      const midY = (rects[0].top + rects[rects.length - 1].bottom) / 2 - b.top;
      end = [x1, midY];
      rects.forEach((r) => {
        const y = r.top + r.height / 2 - b.top;
        starts.push([x0, y]);
        paths.push(route([[x0, y], [trunk, y], [trunk, midY], [x1, midY]]));
      });
    } else {
      const x0 = rects[0].left - b.left;
      const bus = Math.max(6, x0 - 14);
      const entryX = Math.max(bus + 1, o.left - b.left + 28);
      const y1 = o.top - b.top;
      end = [entryX, y1];
      rects.forEach((r) => {
        const y = r.top + r.height / 2 - b.top;
        starts.push([x0, y]);
        paths.push(route([[x0, y], [bus, y], [bus, y1 - 18], [entryX, y1 - 18], [entryX, y1]]));
      });
    }
    setGeo({ w: b.width, h: b.height, paths, starts, end, vertical });
  }, []);

  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (boardRef.current) ro.observe(boardRef.current);
    document.fonts?.ready.then(measure).catch(() => {});
    return () => ro.disconnect();
  }, [measure]);

  // ── autopřepínání + pauza mimo obrazovku ─────────────────────────
  useEffect(() => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) setAuto(true);
    const el = boardRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // SMIL (jiskření) a CSS animace stojí, když sekce není vidět
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    if (inView) svg.unpauseAnimations?.();
    else svg.pauseAnimations?.();
  }, [inView, geo]);

  const pick = (i: number) => {
    setAuto(false);
    setActive(i);
  };

  const onKey = (e: React.KeyboardEvent) => {
    const n = items.length;
    const map: Record<string, number> = {
      ArrowDown: (active + 1) % n,
      ArrowRight: (active + 1) % n,
      ArrowUp: (active - 1 + n) % n,
      ArrowLeft: (active - 1 + n) % n,
      Home: 0,
      End: n - 1,
    };
    if (e.key in map) {
      e.preventDefault();
      const i = map[e.key];
      pick(i);
      tabRefs.current[i]?.focus();
    }
  };

  const s = items[active];

  return (
    <section className="section" id="systemy" aria-labelledby="systemy-title">
      <div className="wrap">
        <header className="sys-head reveal">
          <p className="label shead__index" aria-hidden="true">
            <b>02</b>
            Systémy
          </p>
          <h2 className="h2 sys-head__title" id="systemy-title">
            <span className="silver silver--block">Šest věcí,</span>
            <span className="sys-head__accent">které stavíme.</span>
          </h2>
          <p className="sys-head__lead">{systems.lead}</p>
        </header>

        <div
          ref={boardRef}
          className="sys reveal"
          data-live={inView || undefined}
          style={{ ['--auto' as string]: `${AUTO_MS}ms` }}
        >
          {/* vodiče */}
          {geo && (
            <svg
              ref={svgRef}
              className={`sys__wires${geo.vertical ? ' sys__wires--v' : ''}`}
              width={geo.w}
              height={geo.h}
              viewBox={`0 0 ${geo.w} ${geo.h}`}
              aria-hidden="true"
            >
              <defs>
                <filter id="sys-arc" x="-10%" y="-10%" width="120%" height="120%">
                  <feTurbulence type="fractalNoise" baseFrequency="0.09" numOctaves="1" seed="1">
                    <animate attributeName="seed" values="1;7;3;9;5;2;8" dur="0.7s" calcMode="discrete" repeatCount="indefinite" />
                  </feTurbulence>
                  <feDisplacementMap in="SourceGraphic" scale="5" />
                </filter>
                <filter id="sys-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" />
                </filter>
              </defs>

              {/* tlumené vodiče všech položek */}
              {geo.paths.map((d, i) => (
                <path key={i} d={d} className="wire" />
              ))}
              {geo.starts.map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r="3" className={`port${i === active ? ' port--on' : ''}`} />
              ))}

              {/* aktivní vodič — key restartuje animace při přepnutí */}
              <g key={active} className="live">
                <path d={geo.paths[active]} className="live__glow" pathLength={1000} filter="url(#sys-glow)" />
                <path d={geo.paths[active]} className="live__core" pathLength={1000} />
                <path d={geo.paths[active]} className="live__arc" pathLength={1000} filter="url(#sys-arc)" />
                <path d={geo.paths[active]} className="live__pulse" pathLength={1000} />
              </g>

              <circle cx={geo.end[0]} cy={geo.end[1]} r="4" className="port port--end" />
            </svg>
          )}

          {/* položky */}
          <div className="sys__tabs" role="tablist" aria-label="Systémy" aria-orientation="vertical" onKeyDown={onKey}>
            {items.map((it, i) => (
              <button
                key={it.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                className="sys__tab"
                type="button"
                role="tab"
                id={`tab-${it.id}`}
                aria-controls="sys-out"
                aria-selected={i === active}
                tabIndex={i === active ? 0 : -1}
                onClick={() => pick(i)}
              >
                <span className="sys__num num" aria-hidden="true">
                  0{i + 1}
                </span>
                <span className="sys__name">{it.name}</span>
                {i === active && auto && (
                  <span
                    className="sys__timer"
                    aria-hidden="true"
                    onAnimationEnd={() => setActive((a) => (a + 1) % items.length)}
                  />
                )}
              </button>
            ))}
          </div>

          {/* výstup */}
          <div
            ref={outRef}
            className="sys__out"
            id="sys-out"
            role="tabpanel"
            aria-labelledby={`tab-${s.id}`}
            aria-live="polite"
          >
            <div className="sys__flash" key={`f${active}`} aria-hidden="true" />
            <div className="sys__visual" aria-hidden="true">
              <span className="sys__ph">Vizuál · {s.short}</span>
            </div>
            <div className="sys__copy" key={`c${active}`}>
              <p className="label sys__meta num">
                Systém 0{active + 1} <span>/ 06</span>
              </p>
              <h3 className="sys__title">{s.name}</h3>
              <p className="sys__text">{s.text}</p>
            </div>
          </div>
        </div>
        <CtaRow label={hero.primary} />
      </div>
    </section>
  );
}
