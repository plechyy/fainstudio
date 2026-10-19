'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { cases } from '@/lib/content';

type Item = (typeof cases.items)[number];
const L = cases.labels;

/* sporné doklady jsou rozházené nepravidelně, ať to nevypadá jako vzor */
const HUMAN = [6, 19, 33, 41, 58, 64, 77, 85, 93, 104, 112, 121, 130, 139, 147];

function Visual({ v }: { v: Item['visual'] }) {
  switch (v.type) {
    case 'timeline':
      return (
        <figure className="cx-vis cx-time">
          {v.rows.map((r, i) => (
            <div className={`cx-time__row${i ? ' is-after' : ''}`} key={r.label}>
              <span className="cx-time__l">{r.label}</span>
              <span className="cx-time__axis">
                <span className="cx-time__wait" style={{ left: `${r.in}%`, width: `${r.out - r.in}%` }} />
                <i className="cx-time__in" style={{ left: `${r.in}%` }} />
                <i className="cx-time__out" style={{ left: `${r.out}%` }} />
                <small className="cx-time__t" style={{ left: `${r.out}%` }}>
                  {r.outT}
                </small>
              </span>
            </div>
          ))}
          <p className="cx-time__scale" aria-hidden="true">
            <span>{v.start}</span>
            <span>{v.end}</span>
          </p>
        </figure>
      );
    case 'dots': {
      const human = new Set(HUMAN.slice(0, v.human));
      return (
        <figure className="cx-vis cx-dots" aria-label={`${v.total} dokladů, ${v.human} z nich šlo ke kontrole`}>
          <div className="cx-dots__grid" aria-hidden="true">
            {Array.from({ length: v.total }, (_, i) => (
              <i className={human.has(i) ? 'is-human' : undefined} style={{ ['--i' as string]: i }} key={i} />
            ))}
          </div>
          <figcaption>
            <span>
              <i /> {v.auto} <b className="num">{v.total - v.human}</b>
            </span>
            <span className="is-human">
              <i /> {v.toHuman} <b className="num">{v.human}</b>
            </span>
          </figcaption>
        </figure>
      );
    }
    case 'funnel':
      return (
        <figure className="cx-vis cx-fun">
          <ol>
            {v.steps.map((s, i) => (
              <li key={s.label} style={{ ['--i' as string]: i }}>
                <span className="cx-fun__bar" style={{ width: `${s.w}%` }} aria-hidden="true" />
                <span className="cx-fun__t">{s.label}</span>
                <b className="num">{s.n}</b>
              </li>
            ))}
          </ol>
        </figure>
      );
    case 'week':
      return (
        <figure className="cx-vis cx-week">
          {[v.beforeLabel, v.afterLabel].map((label, row) => (
            <div className={`cx-week__row${row ? ' is-after' : ''}`} key={label}>
              <span className="cx-week__l">{label}</span>
              <ol>
                {v.days.map((d, i) => (
                  <li key={d} style={{ ['--i' as string]: i }}>
                    <span>{d}</span>
                    <i />
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </figure>
      );
    case 'chain':
      return (
        <figure className="cx-vis cx-chain">
          <p className="cx-chain__trigger">
            <span className="cx-chain__card">Zakázka</span>
            <span aria-hidden="true">→</span>
            <b>Podepsáno</b>
          </p>
          <ol>
            {v.steps.map((s, i) => (
              <li key={s} style={{ ['--i' as string]: i }}>
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
                </svg>
                {s}
              </li>
            ))}
          </ol>
        </figure>
      );
  }
}

/*
 * Carousel případů: obyčejný vodorovný scroll s přichytáváním (palcem na mobilu, šipkami
 * a záložkami na počítači). Aktivní případ hlídá IntersectionObserver; vizuál se přehraje,
 * když na případ přijdete poprvé. Žádné nekonečné smyčky ani 3D, ať to na telefonu nic nestojí.
 */
export default function CasesCarousel() {
  const items = cases.items;
  const track = useRef<HTMLDivElement>(null);
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
    const slide = el.children[n] as HTMLElement;
    const pad = parseFloat(getComputedStyle(el).scrollPaddingLeft) || 0;
    el.scrollTo({ left: slide.offsetLeft - el.offsetLeft - pad, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }, [items.length]);

  return (
    <div className="cx">
      <div className="cx__bar">
        <div className="cx__tabs" role="tablist" aria-label="Případy">
          {items.map((it, i) => (
            <button
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-controls={`pripad-${it.id}`}
              className="cx__tab"
              style={{ ['--co' as string]: it.hue }}
              onClick={() => go(i)}
              key={it.id}
            >
              <b className="num">0{i + 1}</b>
              <span>{it.firm}</span>
            </button>
          ))}
        </div>
        <div className="cx__arrows">
          <button type="button" className="cx__arrow" aria-label={L.prev} disabled={active === 0} onClick={() => go(active - 1)}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>
          <button type="button" className="cx__arrow" aria-label={L.next} disabled={active === items.length - 1} onClick={() => go(active + 1)}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div className="cx__track" ref={track}>
        {items.map((c, i) => (
          <article
            className={`cx-case cx-case--${c.visual.type}${seen.has(i) ? ' is-seen' : ''}`}
            id={`pripad-${c.id}`}
            style={{ ['--co' as string]: c.hue }}
            aria-roledescription="případ"
            aria-label={`${i + 1} z ${items.length}: ${c.firm}`}
            key={c.id}
          >
            <div className="cx-case__text">
              <p className="cx-case__tag">
                <b className="num">0{i + 1}</b>
                {c.firm}
                {c.kind === 'model' && <span>{cases.modelLabel}</span>}
              </p>
              <h3 className="cx-case__title">{c.title}</h3>
              <dl className="cx-case__dl">
                <div>
                  <dt>{L.problem}</dt>
                  <dd>{c.problem}</dd>
                </div>
                <div>
                  <dt>{L.how}</dt>
                  <dd>{c.how}</dd>
                </div>
                <div>
                  <dt>{L.why}</dt>
                  <dd>{c.why}</dd>
                </div>
              </dl>
            </div>

            <div className="cx-case__side">
              <Visual v={c.visual} />
              <div className="cx-res">
                <p className="cx-res__k">{L.result}</p>
                <p className="cx-res__nums">
                  <span className="cx-res__before">
                    <small>{L.before}</small>
                    <s className="num">{c.result.before}</s>
                  </span>
                  <span className="cx-res__arrow" aria-hidden="true">
                    →
                  </span>
                  <span className="cx-res__after">
                    <small>{L.after}</small>
                    <b className="num">{c.result.after}</b>
                  </span>
                </p>
                <p className="cx-res__unit">{c.result.unit}</p>
                <p className="cx-res__math">{c.result.math}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
