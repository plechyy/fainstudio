'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { cases } from '@/lib/content';
import CoachLive from './cases/CoachLive';
import ContractLive from './cases/ContractLive';
import DunningLive from './cases/DunningLive';
import MasterLive from './cases/MasterLive';
import MeetingLive from './cases/MeetingLive';
import PhotoLive from './cases/PhotoLive';
import RealtyLive from './cases/RealtyLive';
import FirmLogo from './cases/FirmLogo';
import CaseModal from './cases/CaseModal';
import Story from './cases/stories';

type Item = (typeof cases.items)[number];
const L = cases.labels;

/* živá scéna případu: stejný 3D styl jako v sekci 2, každá ukazuje, co systém u té firmy dělá */
function Live({ v }: { v: Item['visual'] }) {
  switch (v.type) {
    case 'feed':
      return <RealtyLive v={v} />;
    case 'score':
      return <CoachLive v={v} />;
    case 'photo':
      return <PhotoLive v={v} />;
    case 'contract':
      return <ContractLive v={v} />;
    case 'brain':
      return <MasterLive v={v} />;
    case 'meeting':
      return <MeetingLive v={v} />;
    case 'dunning':
      return <DunningLive v={v} />;
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
  // který případ má právě otevřené okno s průběhem spolupráce
  const [story, setStory] = useState<number | null>(null);
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
              <p className="cx-case__tag">
                <FirmLogo id={c.id} />
              </p>
              <h3 className="cx-case__title">{c.title}</h3>
              <p className="cx-res">
                <span className="cx-res__before">
                  <small>{L.before}</small>
                  <s className="num">{c.result.before}</s>
                </span>
                <span className="cx-res__arrow" aria-hidden="true" />
                <span className="cx-res__after">
                  <small>{L.after}</small>
                  <b className="num">{c.result.after}</b>
                </span>
                <span className="cx-res__unit">{c.result.unit}</span>
              </p>
              <button type="button" className="cx-more" onClick={() => setStory(i)}>
                {L.more}
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            </div>

            <div className="cx-case__stage art" style={{ ['--ac-h' as string]: `calc(var(--pal-h) + ${c.hue})` }} aria-hidden="true">
              <Live v={c.visual} />
            </div>

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
          </article>
        ))}
      </div>
      </div>

      <CaseModal open={story !== null} onClose={() => setStory(null)} label={story !== null ? `${items[story].firm}: jak to probíhalo` : ''} hue={story !== null ? items[story].hue : 0}>
        {story !== null && <Story id={items[story].id} title={items[story].title} />}
      </CaseModal>
    </div>
  );
}
