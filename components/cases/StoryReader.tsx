'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { CAL_URL } from '@/lib/config';
import { cases } from '@/lib/content';
import FirmLogo from './FirmLogo';
import { StoryFig, StoryHero, StoryText } from './Story';

/*
 * Varianta 1 — čtečka. Příběh se otevře jako velký list přes celou obrazovku (ne malé okno):
 * vyjede zespodu přes rozmazané pozadí, nahoře je lišta s postupem čtení, šipkami na další
 * a předchozí případ a křížkem. Esc, křížek i tlačítko Zpět v prohlížeči ho zavřou.
 * Stránka pod ním se nehýbe; focus zůstává uvnitř a po zavření se vrátí na tlačítko.
 */
const CLOSE_MS = 480;

type Props = { index: number | null; onClose: () => void; onGo: (i: number) => void };

export default function StoryReader({ index, onClose, onGo }: Props) {
  const open = index !== null;
  const [mounted, setMounted] = useState(false);
  const [shown, setShown] = useState(false);
  const [progress, setProgress] = useState(0);
  const [last, setLast] = useState(0);
  const sheet = useRef<HTMLDivElement>(null);
  const scroll = useRef<HTMLDivElement>(null);
  const back = useRef<HTMLElement | null>(null);

  if (index !== null && index !== last) setLast(index);
  const i = index ?? last;
  const c = cases.items[i];
  const next = cases.items[(i + 1) % cases.items.length];

  useEffect(() => {
    if (open) {
      back.current = document.activeElement as HTMLElement | null;
      setMounted(true);
      const t = window.setTimeout(() => setShown(true), 40);
      return () => clearTimeout(t);
    }
    setShown(false);
    const t = window.setTimeout(() => setMounted(false), CLOSE_MS);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!mounted) return;
    const el = document.documentElement;
    const gap = window.innerWidth - el.clientWidth;
    const prev = { o: el.style.overflow, p: el.style.paddingRight };
    el.style.overflow = 'hidden';
    if (gap > 0) el.style.paddingRight = `${gap}px`;
    return () => {
      el.style.overflow = prev.o;
      el.style.paddingRight = prev.p;
      back.current?.focus?.({ preventScroll: true });
    };
  }, [mounted]);

  useEffect(() => {
    if (shown) sheet.current?.querySelector<HTMLElement>('[data-close]')?.focus({ preventScroll: true });
  }, [shown]);

  // nový případ začíná od začátku
  useEffect(() => {
    if (scroll.current) scroll.current.scrollTop = 0;
    setProgress(0);
  }, [i]);

  const onScroll = useCallback(() => {
    const el = scroll.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    setProgress(max > 0 ? Math.min(1, el.scrollTop / max) : 1);
  }, []);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      onClose();
      return;
    }
    if (e.key !== 'Tab' || !sheet.current) return;
    const f = Array.from(sheet.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'));
    if (!f.length) return;
    const first = f[0];
    const lastEl = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      lastEl.focus();
    } else if (!e.shiftKey && document.activeElement === lastEl) {
      e.preventDefault();
      first.focus();
    }
  };

  if (!mounted) return null;

  return createPortal(
    <div className={`rd${shown ? ' is-open' : ''}`} onKeyDown={onKey} style={{ ['--co' as string]: c.hue }}>
      <div className="rd__bg" onClick={onClose} aria-hidden="true" />
      <div className="rd__sheet" role="dialog" aria-modal="true" aria-label={`${c.firm}: ${cases.labels.more}`} ref={sheet}>
        <div className="rd__bar">
          <FirmLogo id={c.id} />
          <span className="rd__count num">
            {i + 1} / {cases.items.length}
          </span>
          <span className="rd__nav">
            <button type="button" aria-label={cases.labels.prev} onClick={() => onGo((i - 1 + cases.items.length) % cases.items.length)}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M15 5l-7 7 7 7" />
              </svg>
            </button>
            <button type="button" aria-label={cases.labels.next} onClick={() => onGo((i + 1) % cases.items.length)}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button type="button" data-close className="rd__x" aria-label="Zavřít" onClick={onClose}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </span>
          <i className="rd__prog" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
        </div>

        <div className="rd__scroll" ref={scroll} onScroll={onScroll}>
          <div className="ca rd__ca" key={c.id}>
            <div className="rd__in">
              <StoryHero c={c} />
              <StoryFig c={c} />
              <StoryText id={c.id} />
              <footer className="ca-end">
                <p>
                  <a className="btn btn--primary" href={CAL_URL} onClick={onClose}>
                    {cases.cta}
                  </a>
                </p>
                <button type="button" className="ca-next" onClick={() => onGo((i + 1) % cases.items.length)}>
                  <small>Další případ</small>
                  <span>
                    {next.firm}: {next.title}
                  </span>
                </button>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
