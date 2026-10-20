'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { cases } from '@/lib/content';
import FirmLogo from './cases/FirmLogo';
import Live from './cases/Live';
import Result from './cases/Result';

const L = cases.labels;

/*
 * Carousel případů: obyčejný vodorovný scroll s přichytáváním (palcem na mobilu, šipkami
 * a záložkami na počítači). Aktivní případ hlídá IntersectionObserver; vizuál se přehraje,
 * když na případ přijdete poprvé. Žádné nekonečné smyčky ani 3D, ať to na telefonu nic nestojí.
 */
export default function CasesCarousel({ onRead }: { onRead: (i: number) => void }) {
  const items = cases.items;
  const track = useRef<HTMLDivElement>(null);
  // kam carousel právě jede: rychlé klikání na šipku počítá od cíle, ne od karty, která je ještě vidět
  const target = useRef<number | null>(null);
  const [active, setActive] = useState(0);
  const [seen, setSeen] = useState<Set<number>>(() => new Set());

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const slides = Array.from(el.children) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const i = slides.indexOf(e.target as HTMLElement);
          if (target.current !== null && target.current !== i) continue;
          target.current = null;
          setActive(i);
          setSeen((s) => (s.has(i) ? s : new Set(s).add(i)));
        }
      },
      { root: el, threshold: 0.6 },
    );
    slides.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const go = useCallback((i: number) => {
    const el = track.current;
    if (!el) return;
    const n = Math.max(0, Math.min(items.length - 1, i));
    target.current = n;
    setActive(n);
    // pojistka: kdyby se cíl nikdy „neprotnul“ (už byl vidět), za chvíli se hlídání vrátí k normálu
    window.setTimeout(() => {
      if (target.current === n) target.current = null;
    }, 1200);
    const slide = el.children[n] as HTMLElement;
    const pad = parseFloat(getComputedStyle(el).scrollPaddingLeft) || 0;
    el.scrollTo({ left: slide.offsetLeft - el.offsetLeft - pad, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }, [items.length]);

  return (
    <div className="cx">
      <div className="cx__bar">
        {/* počítadlo: velké číslo případu v jeho barvě a obor; mění se s kartou */}
        <p className="cx__count" style={{ ['--co' as string]: items[active].hue }}>
          <b className="num">0{active + 1}</b>
          <span className="cx__of num">/0{items.length}</span>
          <span className="cx__nav">
            <button type="button" aria-label={L.prev} disabled={active === 0} onClick={() => go((target.current ?? active) - 1)}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M15 5l-7 7 7 7" />
              </svg>
            </button>
            <button type="button" aria-label={L.next} disabled={active === items.length - 1} onClick={() => go((target.current ?? active) + 1)}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </span>
          <span className="cx__logo" key={active}>
            <FirmLogo id={items[active].id} />
          </span>
          <span className="sr-only" aria-live="polite">
            {active + 1} z {items.length}: {items[active].firm}
          </span>
        </p>
        {/* úseky jako v Postupu: hotové zůstanou podbarvené, aktuální svítí barvou případu */}
        <div className="cx__segs" role="tablist" aria-label="Případy">
          {items.map((it, i) => (
            <button
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-controls={`pripad-${it.id}`}
              aria-label={`${i + 1}. ${it.firm}`}
              title={it.firm}
              className="cx__seg"
              data-state={i < active ? 'done' : i === active ? 'now' : 'next'}
              style={{ ['--co' as string]: it.hue }}
              onClick={() => go(i)}
              key={it.id}
            >
              <i />
            </button>
          ))}
        </div>
      </div>

      <div className="cx__stage">
        <button type="button" className="cx__arrow cx__arrow--prev" aria-label={L.prev} disabled={active === 0} onClick={() => go((target.current ?? active) - 1)}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" />
          </svg>
        </button>
        <button type="button" className="cx__arrow cx__arrow--next" aria-label={L.next} disabled={active === items.length - 1} onClick={() => go((target.current ?? active) + 1)}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      <div className="cx__track" ref={track}>
        {items.map((c, i) => (
          <article
            className={`cx-case${seen.has(i) ? ' is-seen' : ''}${i === active ? ' is-active' : ''}`}
            id={`pripad-${c.id}`}
            style={{ ['--co' as string]: c.hue }}
            aria-roledescription="případ"
            aria-label={`${i + 1} z ${items.length}: ${c.firm}`}
            key={c.id}
          >
            <div className="cx-case__head">
              <h3 className="cx-case__title">{c.title}</h3>
              <Result c={c} />
            </div>

            <div className="cx-case__stage">
              <div className="art" style={{ ['--ac-h' as string]: `calc(var(--pal-h) + ${c.hue})` }} aria-hidden="true">
                <Live v={c.visual} />
              </div>
            </div>

            <div className="cx-case__cta">
              <p className="cx-case__lead">{c.summary}</p>
              <button type="button" className="cx-read" onClick={() => onRead(i)}>
                  {L.more}
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
              </button>
            </div>

          </article>
        ))}
      </div>
      </div>

    </div>
  );
}
