'use client';

import { useEffect, useRef, useState } from 'react';
import { StoryClose } from './stories/ctx';

/*
 * Rozbalení průběhu spolupráce přímo pod případem, na celou šířku. Výška se plynule roztáhne,
 * obsah při tom ostří z rozmazání. Žádný vnitřní scroll: čte se normálním scrollem stránky,
 * která se po otevření sama doposune tak, aby začátek studie byl pod menu.
 * Zavře se tlačítkem u případu nebo klávesou Esc; focus se vrátí na tlačítko.
 *
 * Poznámka „Ukázkový případ“ je vypnutá; zapíná se konstantou níž, kdyby ji někdy bylo potřeba.
 */
const SHOW_STORY_NOTE = false;
const NOTE = 'Ukázkový případ.';
const CLOSE_MS = 520;

type Props = { id: string; open: boolean; onClose: () => void; label: string; children: React.ReactNode };

export default function StoryDrawer({ id, open, onClose, label, children }: Props) {
  const [mounted, setMounted] = useState(false);
  const [shown, setShown] = useState(false);
  const inner = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const back = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open) {
      back.current = document.activeElement as HTMLElement | null;
      setMounted(true);
      // krátká prodleva, aby prohlížeč stihl vykreslit zavřený stav; časovač (ne rAF) funguje i na pozadí
      const t = window.setTimeout(() => setShown(true), 40);
      return () => clearTimeout(t);
    }
    setShown(false);
    const t = window.setTimeout(() => setMounted(false), CLOSE_MS);
    return () => clearTimeout(t);
  }, [open]);

  // doposun: začátek studie pod menu, a když se vejde, i její konec na obrazovku
  useEffect(() => {
    if (!shown) return;
    const t = window.setTimeout(() => {
      const el = root.current;
      const h = inner.current?.scrollHeight ?? 0;
      if (!el || !h) return;
      const top = el.getBoundingClientRect().top;
      const delta = Math.min(top - 110, top + h - window.innerHeight + 28);
      if (Math.abs(delta) > 8) window.scrollBy({ top: delta, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    }, 240);
    return () => clearTimeout(t);
  }, [shown]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        back.current?.focus?.({ preventScroll: true });
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!mounted) return null;

  return (
    <div className={`sd${shown ? ' is-open' : ''}`} id={id} role="region" aria-label={label} ref={root}>
      <div className="sd__in" ref={inner}>
        <div className="sd__body">
          <StoryClose.Provider value={onClose}>{children}</StoryClose.Provider>
          {SHOW_STORY_NOTE && <p className="st__note">{NOTE}</p>}
        </div>
      </div>
    </div>
  );
}
