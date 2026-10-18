'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { CAL_URL } from '@/lib/config';
import { articles, findArticle, why, type Article } from '@/lib/blog';
import ArticleBody from './blog/ArticleBody';
import ShaderBackground from './ShaderBackground';

/*
 * Sekce „Proč AI“: klidný úvod (co AI ve firmě dělá, krátký příklad, jak s ní
 * pracujeme) a vpravo blog. Článek se otevře v panelu nad stránkou a adresa se změní
 * na ?clanek=slug, takže jde sdílet; zpět v prohlížeči panel zavře.
 */

const PARAM = 'clanek';

export default function WhyAi() {
  const [open, setOpen] = useState<Article | null>(null);

  // stav panelu podle adresy (první načtení i tlačítko zpět)
  useEffect(() => {
    const sync = () => setOpen(findArticle(new URLSearchParams(location.search).get(PARAM)) ?? null);
    sync();
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);

  const show = useCallback((a: Article) => {
    const p = new URLSearchParams(location.search);
    const had = p.has(PARAM);
    p.set(PARAM, a.slug);
    const url = `${location.pathname}?${p.toString()}`;
    // přechod mezi články nepřidává další krok do historie: zpět zavře panel
    if (had) history.replaceState(history.state, '', url);
    else history.pushState(history.state, '', url);
    setOpen(a);
  }, []);

  const close = useCallback(() => {
    const p = new URLSearchParams(location.search);
    if (!p.has(PARAM)) return setOpen(null);
    p.delete(PARAM);
    const q = p.toString();
    history.replaceState(history.state, '', `${location.pathname}${q ? `?${q}` : ''}${location.hash}`);
    setOpen(null);
  }, []);

  const [lead, ...rest] = articles;

  return (
    <section className="section why" id="proc-ai" aria-labelledby="proc-ai-title">
      <div className="wrap why__grid">
        <div className="why__intro reveal">
          <p className="label shead__index" aria-hidden="true">
            <b>{why.index}</b>
            {why.name}
          </p>
          <h2 className="h2" id="proc-ai-title">
            <span className="silver silver--block">{why.titleA}</span>
            <span className="hd__accent">{why.titleB}</span>
          </h2>
          <p className="lead why__lead">{why.lead}</p>

          <figure className="why__ex">
            <figcaption className="label">{why.example.label}</figcaption>
            <p>{why.example.text}</p>
          </figure>

          <ul className="why__rules">
            {why.principles.map((r) => (
              <li key={r.b}>
                <b>{r.b}</b> {r.t}
              </li>
            ))}
          </ul>
        </div>

        <div className="why__blog reveal">
          <p className="label why__more">{why.more}</p>

          <button type="button" className="why__feat" onClick={() => show(lead)}>
            <span className="why__feat-bg" aria-hidden="true">
              <ShaderBackground center phase={110} brandVar="--primary" />
            </span>
            <span className="why__meta">
              {lead.cat} · {lead.min} min čtení
            </span>
            <span className="why__feat-title">{lead.title}</span>
            <span className="why__teaser">{lead.teaser}</span>
            <span className="why__go" aria-hidden="true">
              {why.read} <span>→</span>
            </span>
          </button>

          <ul className="why__list">
            {rest.map((a) => (
              <li key={a.slug}>
                <button type="button" className="why__row" onClick={() => show(a)}>
                  <span className="why__meta">
                    {a.cat} · {a.min} min
                  </span>
                  <span className="why__row-title">{a.title}</span>
                  <span className="why__teaser">{a.teaser}</span>
                  <span className="why__arrow" aria-hidden="true">
                    →
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ArticleSheet a={open} onClose={close} onOpen={show} />
    </section>
  );
}

/** Panel s článkem: na počítači vyjede zprava, na mobilu zespodu. */
function ArticleSheet({ a, onClose, onOpen }: { a: Article | null; onClose: () => void; onOpen: (a: Article) => void }) {
  const [shown, setShown] = useState<Article | null>(a);
  const [on, setOn] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const back = useRef<HTMLElement | null>(null);

  // otevření a zavření s animací: obsah zůstane vidět, dokud panel neodjede
  useEffect(() => {
    if (a) {
      back.current ??= document.activeElement as HTMLElement | null;
      setShown(a);
      // panel se nejdřív vykreslí zavřený, pak vyjede (časovač běží i ve skryté kartě, rAF ne)
      const r = window.setTimeout(() => setOn(true), 30);
      return () => clearTimeout(r);
    }
    setOn(false);
    const t = window.setTimeout(() => {
      setShown(null);
      back.current?.focus?.();
      back.current = null;
    }, 380);
    return () => clearTimeout(t);
  }, [a]);

  // při přepnutí článku nahoru, fokus do panelu, Esc zavře, stránka pod panelem se nehýbe
  useEffect(() => {
    if (!a) return;
    panel.current?.scrollTo({ top: 0 });
    panel.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      html.style.overflow = prev;
    };
  }, [a, onClose]);

  if (!shown) return null;
  const i = articles.indexOf(shown);
  const next = articles[(i + 1) % articles.length];

  return (
    <div className={`sheet${on ? ' is-on' : ''}`}>
      <div className="sheet__scrim" onClick={onClose} aria-hidden="true" />
      <div
        className="sheet__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sheet-title"
        tabIndex={-1}
        ref={panel}
      >
        <div className="sheet__top">
          <span className="sheet__smoke" aria-hidden="true">
            <ShaderBackground center phase={40 + i * 17} brandVar="--primary" />
          </span>
          <button type="button" className="sheet__close" onClick={onClose} aria-label="Zavřít článek">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
          <p className="why__meta sheet__meta">
            {shown.cat} · {shown.min} min čtení
          </p>
          <h2 className="sheet__title" id="sheet-title">
            {shown.title}
          </h2>
          <p className="sheet__teaser">{shown.teaser}</p>
        </div>

        <ArticleBody a={shown} />

        <div className="sheet__end">
          <p>Chcete vědět, co by systém zvládl u vás?</p>
          <a className="btn btn--primary" href={CAL_URL}>
            Chci úvodní hovor
          </a>
          <button type="button" className="sheet__next" onClick={() => onOpen(next)}>
            <span className="why__meta">Další článek</span>
            <span>{next.title} →</span>
          </button>
        </div>
      </div>
    </div>
  );
}
