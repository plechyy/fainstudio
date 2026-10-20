'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { StoryClose } from './stories/ctx';

/*
 * Okno s průběhem spolupráce. Vyjede přes rozmazané pozadí a samo je při příchodu rozmazané,
 * ostří při dosednutí. Zavře se křížkem, Esc nebo kliknutím mimo okno. Při otevření se focus
 * přesune do okna a drží se v něm (Tab se točí uvnitř), po zavření se vrátí na tlačítko.
 * Stránka pod oknem se nescrolluje. Mobil: spodní list přes celou obrazovku.
 *
 * Poznámka „Ukázkový případ“ je vypnutá; zapíná se konstantou níž, kdyby ji někdy bylo potřeba.
 */
const SHOW_STORY_NOTE = false;
const NOTE = 'Ukázkový případ.';
const CLOSE_MS = 420;

type Props = { open: boolean; onClose: () => void; label: string; hue: number; children: React.ReactNode };

export default function CaseModal({ open, onClose, label, hue, children }: Props) {
  const [mounted, setMounted] = useState(false);
  const [shown, setShown] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const back = useRef<HTMLElement | null>(null);

  // otevření: namontovat, na další snímek spustit přechod; zavření: spustit přechod a po něm odmontovat
  useEffect(() => {
    if (open) {
      back.current = document.activeElement as HTMLElement | null;
      setMounted(true);
      const id = requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)));
      return () => cancelAnimationFrame(id);
    }
    setShown(false);
    const t = window.setTimeout(() => setMounted(false), CLOSE_MS);
    return () => clearTimeout(t);
  }, [open]);

  // stránka pod oknem se nehýbe (a nic neposkočí, když zmizí posuvník)
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
      back.current?.focus?.();
    };
  }, [mounted]);

  useEffect(() => {
    if (shown) panel.current?.querySelector<HTMLElement>('[data-close]')?.focus({ preventScroll: true });
  }, [shown]);

  const onKey = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panel.current) return;
      const f = Array.from(panel.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'));
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [onClose],
  );

  if (!mounted) return null;

  return createPortal(
    <div className={`cm${shown ? ' is-open' : ''}`} style={{ ['--co' as string]: hue }} onKeyDown={onKey}>
      <div className="cm__bg" onClick={onClose} aria-hidden="true" />
      <div className="cm__panel" role="dialog" aria-modal="true" aria-label={label} ref={panel}>
        <button type="button" className="cm__close" data-close onClick={onClose} aria-label="Zavřít">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
        <div className="cm__scroll">
          <StoryClose.Provider value={onClose}>{children}</StoryClose.Provider>
          {SHOW_STORY_NOTE && <p className="st__note">{NOTE}</p>}
        </div>
      </div>
    </div>,
    document.body,
  );
}
