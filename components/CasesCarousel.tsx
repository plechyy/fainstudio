'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { cases } from '@/lib/content';

type Item = (typeof cases.items)[number];
const L = cases.labels;

function Visual({ v }: { v: Item['visual'] }) {
  switch (v.type) {
    case 'feed':
      // nové inzeráty: od majitelů jdou makléři, realitky a duplicity vypadnou
      return (
        <figure className="cx-vis cx-feed">
          <ul>
            {v.rows.map((r, i) => (
              <li className={r.ok ? 'is-ok' : 'is-out'} key={r.t + r.meta} style={{ ['--i' as string]: i }}>
                <span>
                  <b>{r.t}</b>
                  <small>{r.meta}</small>
                </span>
                <em>{r.tag}</em>
              </li>
            ))}
          </ul>
        </figure>
      );
    case 'score':
      // hodnocení hovoru, jak ho obchodník uvidí v mobilu po zavěšení
      return (
        <figure className="cx-vis cx-score">
          <p className="cx-score__call">{v.call}</p>
          <ul>
            {v.rows.map((r, i) => (
              <li className={`is-${r.k}`} key={r.k} style={{ ['--i' as string]: i }}>
                <b>{r.label}</b>
                {r.t}
              </li>
            ))}
          </ul>
          <p className="cx-score__trend">
            <span aria-hidden="true">▲</span> {v.trend}
          </p>
        </figure>
      );
    case 'photo':
      // „fotka“ koupelny (jen kreslené plochy, žádný obrázek), AI do ní připíchne, co poznala, a pod ní cena
      return (
        <figure className="cx-vis cx-photo">
          <div className="cx-photo__img" aria-hidden="true">
            <span className="cx-photo__tile" />
            <span className="cx-photo__tub" />
            <span className="cx-photo__sink" />
            <span className="cx-photo__scan" />
            {v.tags.map((t, i) => (
              <em key={t.t} style={{ ...(t.x < 50 ? { left: `${t.x}%` } : { right: `${100 - t.x}%` }), top: `${t.y}%`, ['--i' as string]: i }}>
                {t.t}
              </em>
            ))}
          </div>
          <p className="cx-photo__price">
            <small>{v.price.k}</small>
            <b className="num">{v.price.v}</b>
            <span>{v.price.s}</span>
          </p>
          <ul className="sr-only">
            {v.tags.map((t) => (
              <li key={t.t}>{t.t}</li>
            ))}
          </ul>
        </figure>
      );
    case 'contract':
      // smlouva s barevně zvýrazněnými riziky a návrhem, co chtít jinak
      return (
        <figure className="cx-vis cx-con">
          <div className="cx-con__page">
            <b className="cx-con__h">{v.title}</b>
            <span className="cx-con__lines" aria-hidden="true" />
            <ol>
              {v.flags.map((f, i) => (
                <li className={`is-${f.lvl}`} key={f.at} style={{ ['--i' as string]: i }}>
                  <small>{f.at}</small>
                  <b>{f.t}</b>
                  <span>→ {f.fix}</span>
                </li>
              ))}
            </ol>
          </div>
        </figure>
      );
    case 'meeting':
      // věta z porady → úkoly se jménem a termínem
      return (
        <figure className="cx-vis cx-meet">
          <p className="cx-meet__q">
            <span className="cx-meet__wave" aria-hidden="true">
              {Array.from({ length: 5 }, (_, i) => (
                <i key={i} style={{ ['--j' as string]: i }} />
              ))}
            </span>
            {v.quote}
          </p>
          <ul>
            {v.tasks.map((t, i) => (
              <li key={t.t} style={{ ['--i' as string]: i }}>
                <span className="cx-meet__who">{t.who[0]}</span>
                <span>
                  <b>{t.t}</b>
                  <small>
                    {t.who} · {t.when}
                  </small>
                </span>
              </li>
            ))}
          </ul>
        </figure>
      );
    case 'dunning':
      // život jedné faktury: splatnost, dvě připomínky, zaplaceno
      return (
        <figure className="cx-vis cx-dun">
          <p className="cx-dun__inv">{v.invoice}</p>
          <ol>
            {v.steps.map((st, i) => (
              <li className={`is-${st.s}`} key={st.d} style={{ ['--i' as string]: i }}>
                <i aria-hidden="true" />
                <small>{st.d}</small>
                <b>{st.t}</b>
              </li>
            ))}
          </ol>
        </figure>
      );
    case 'brain':
      // nováček se zeptá u stroje, asistent odpoví mistrovými slovy a ukáže, odkud to ví
      return (
        <figure className="cx-vis cx-brain">
          <p className="cx-brain__q">{v.q}</p>
          <div className="cx-brain__a">
            <p>{v.a}</p>
            <small>— {v.who}</small>
          </div>
          <ul className="cx-brain__src">
            {v.sources.map((x, i) => (
              <li key={x} style={{ ['--i' as string]: i }}>
                {x}
              </li>
            ))}
          </ul>
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
        <p className="cx__count" style={{ ['--co' as string]: items[active].hue }} aria-live="polite">
          <b className="num">0{active + 1}</b>
          <span className="num">/0{items.length}</span>
          <em key={active}>{items[active].firm}</em>
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
        <div className="cx__arrows">
          <button type="button" className="cx__arrow" aria-label={L.prev} disabled={active === 0} onClick={() => go((target.current ?? active) - 1)}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>
          <button type="button" className="cx__arrow" aria-label={L.next} disabled={active === items.length - 1} onClick={() => go((target.current ?? active) + 1)}>
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
                  <span className={`cx-res__after${c.result.after.length > 7 ? ' is-long' : ''}`}>
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
