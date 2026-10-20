'use client';

import { useEffect, useRef, useState } from 'react';
import { CAL_URL } from '@/lib/config';
import { cases } from '@/lib/content';
import CasesCarousel from '../CasesCarousel';
import FirmLogo from './FirmLogo';
import { StoryFig, StoryText } from './Story';

/*
 * Varianta 2 — rozbalení na místě. Carousel se po kliknutí sbalí a na jeho místě se otevře příběh:
 * vlevo zůstane přilepená animace s výsledkem (při čtení se pořád dívá), vpravo se čte text.
 * Žádné okno ani nová stránka. Zpět vede tlačítko vlevo, Esc nebo odkaz na konci.
 */
export default function CasesExpand() {
  const [open, setOpen] = useState<number | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const L = cases.labels;

  const toTop = () => {
    const el = root.current;
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };
  const show = (i: number | null) => {
    setOpen(i);
    window.setTimeout(toTop, 60);
  };

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') show(null);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const c = open !== null ? cases.items[open] : null;
  const next = open !== null ? cases.items[(open + 1) % cases.items.length] : null;

  return (
    <div className="ce" ref={root}>
      <div className={`ce__car${c ? ' is-hidden' : ''}`} aria-hidden={c ? true : undefined} inert={c ? true : undefined}>
        <CasesCarousel onRead={(i) => show(i)} />
      </div>

      {c && next && (
        <section className="ca ce__story" key={c.id} style={{ ['--co' as string]: c.hue }} aria-label={`${c.firm}: ${L.more}`}>
          <aside className="ce__side">
            <button type="button" className="ce__back" onClick={() => show(null)}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 12H5M11 6l-6 6 6 6" />
              </svg>
              Všechny případy
            </button>
            <FirmLogo id={c.id} className="fl--lg" />
            <h3 className="ce__t">{c.title}</h3>
            <p className="cx-res ca-res">
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
            <StoryFig c={c} />
          </aside>

          <div className="ce__main">
            <p className="ca-open ce__lead">{c.standfirst}</p>
            <dl className="ca-facts">
              <div>
                <dt>Klient</dt>
                <dd>{c.firm}</dd>
              </div>
              <div>
                <dt>Obor</dt>
                <dd>{c.industry}</dd>
              </div>
              <div>
                <dt>Co jsme postavili</dt>
                <dd>{c.built}</dd>
              </div>
            </dl>
            <StoryText id={c.id} />
            <footer className="ca-end">
              <p>
                <a className="btn btn--primary" href={CAL_URL}>
                  {cases.cta}
                </a>
              </p>
              <button type="button" className="ca-next" onClick={() => show((open! + 1) % cases.items.length)}>
                <small>Další případ</small>
                <span>
                  {next.firm}: {next.title}
                </span>
              </button>
              <button type="button" className="ce__close" onClick={() => show(null)}>
                ↑ Zpět ke všem případům
              </button>
            </footer>
          </div>
        </section>
      )}
    </div>
  );
}
