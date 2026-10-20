'use client';

import { useEffect, useRef, useState } from 'react';
import { CAL_URL } from '@/lib/config';
import { cases } from '@/lib/content';
import FirmLogo from './FirmLogo';
import { StoryFig, StoryText } from './Story';

/*
 * Varianta 3 — přehled a detail. Žádný carousel: vlevo je vždycky vidět všech sedm případů
 * (logo, co dělá, výsledek) a zůstávají přilepené, vpravo je detail vybraného případu.
 * Příběh se čte v pravém sloupci pod animací; přepnutím případu vlevo se sbalí a ukáže jiný.
 */
export default function CasesMaster() {
  const [sel, setSel] = useState(0);
  const [reading, setReading] = useState(false);
  const detail = useRef<HTMLDivElement>(null);
  const L = cases.labels;
  const c = cases.items[sel];

  const pick = (i: number) => {
    setSel(i);
    setReading(false);
    // na mobilu list leží nad detailem; po výběru ukážeme začátek detailu
    if (window.matchMedia('(max-width: 899px)').matches) {
      window.setTimeout(() => detail.current && window.scrollTo({ top: detail.current.getBoundingClientRect().top + window.scrollY - 150, behavior: 'smooth' }), 60);
    }
  };

  useEffect(() => {
    if (!reading) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setReading(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [reading]);

  const read = () => {
    const open = !reading;
    setReading(open);
    if (open) window.setTimeout(() => detail.current && window.scrollTo({ top: detail.current.querySelector('.cm-read')!.getBoundingClientRect().top + window.scrollY - 110, behavior: 'smooth' }), 120);
  };

  return (
    <div className="cm">
      <nav className="cm-list" aria-label="Případy">
        <ol>
          {cases.items.map((it, i) => (
            <li key={it.id} style={{ ['--co' as string]: it.hue }}>
              <button type="button" aria-current={i === sel ? 'true' : undefined} onClick={() => pick(i)}>
                <FirmLogo id={it.id} />
                <span className="cm-list__t">{it.title}</span>
                <span className="cm-list__r num">
                  {it.result.before} → <b>{it.result.after}</b>
                </span>
              </button>
            </li>
          ))}
        </ol>
      </nav>

      <div className="cm-detail ca" key={c.id} style={{ ['--co' as string]: c.hue }} ref={detail}>
        <StoryFig c={c} />
        <h3 className="cm-detail__t">{c.title}</h3>
        <p className="ca-hero__lead">{c.standfirst}</p>
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
        <button type="button" className="cx-read" aria-expanded={reading} onClick={read}>
          {reading ? 'Sbalit příběh' : L.more}
          <svg viewBox="0 0 24 24" aria-hidden="true" style={{ transform: reading ? 'rotate(-90deg)' : 'rotate(90deg)' }}>
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>

        <div className={`cm-read${reading ? ' is-open' : ''}`}>
          <div className="cm-read__in">
            <div className="cm-read__body">
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
              {reading && <StoryText id={c.id} />}
              <footer className="ca-end">
                <p>
                  <a className="btn btn--primary" href={CAL_URL}>
                    {cases.cta}
                  </a>
                </p>
                <button type="button" className="cm-next" onClick={() => pick((sel + 1) % cases.items.length)}>
                  <small>Další případ</small>
                  <span>
                    {cases.items[(sel + 1) % cases.items.length].firm}: {cases.items[(sel + 1) % cases.items.length].title}
                  </span>
                </button>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
