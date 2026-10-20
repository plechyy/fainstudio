'use client';

import { useEffect, useRef, useState } from 'react';
import { StoryClose } from './stories/ctx';

/*
 * Panel s průběhem spolupráce. Zakryje jen pole se scénou (ne text vlevo), vyjede s rozmazáním
 * a zaostří. Uvnitř se dá scrollovat; zavře se křížkem nebo klávesou Esc. Po zavření se focus
 * vrátí na tlačítko, které panel otevřelo. Žádný vyskakovací dialog, stránka pod ním se hýbe dál.
 *
 * Poznámka „Ukázkový případ“ je vypnutá; zapíná se konstantou níž, kdyby ji někdy bylo potřeba.
 */
const SHOW_STORY_NOTE = false;
const NOTE = 'Ukázkový případ.';
const CLOSE_MS = 380;

type Props = { open: boolean; onClose: () => void; label: string; title: string; children: React.ReactNode };

export default function StoryPanel({ open, onClose, label, title, children }: Props) {
  const [mounted, setMounted] = useState(false);
  const [shown, setShown] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const back = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open) {
      back.current = document.activeElement as HTMLElement | null;
      setMounted(true);
      const id = requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)));
      return () => cancelAnimationFrame(id);
    }
    setShown(false);
    const t = window.setTimeout(() => {
      setMounted(false);
      back.current?.focus?.({ preventScroll: true });
    }, CLOSE_MS);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (shown) root.current?.querySelector<HTMLElement>('[data-close]')?.focus({ preventScroll: true });
  }, [shown]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!mounted) return null;

  return (
    <div className={`cp${shown ? ' is-open' : ''}`} role="region" aria-label={label} ref={root}>
      <header className="cp__bar">
        <b>{title}</b>
        <button type="button" className="cp__close" data-close onClick={onClose}>
          Zavřít
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      </header>
      <div className="cp__body" tabIndex={0}>
        <StoryClose.Provider value={onClose}>{children}</StoryClose.Provider>
        {SHOW_STORY_NOTE && <p className="st__note">{NOTE}</p>}
      </div>
    </div>
  );
}
