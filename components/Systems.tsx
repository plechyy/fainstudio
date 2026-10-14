'use client';

import { useEffect, useRef } from 'react';
import { hero, systems } from '@/lib/content';
import CtaRow from './CtaRow';
import Board from './systems/Board';
import VariantC from './systems/VariantC';
import VariantSwitch, { useSysVariant } from './systems/VariantSwitch';

/*
 * Sekce „Systémy“. Hlavička a tlačítko jsou společné, vnitřek se přepíná mezi
 * variantami (dočasné — po výběru zůstane jedna a zbytek zmizí).
 */

export default function Systems() {
  const v = useSysVariant();
  const root = useRef<HTMLElement>(null);

  // varianty se mountují až po hydrataci, takže je společný reveal v Enhance minul
  useEffect(() => {
    const els = root.current?.querySelectorAll<HTMLElement>('.reveal:not(.is-in)');
    if (!els?.length) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      },
      { rootMargin: '0px 0px -14% 0px', threshold: 0.08 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [v]);

  return (
    <section className="section" id="systemy" aria-labelledby="systemy-title" ref={root}>
      <div className="wrap">
        <header className="sys-head reveal">
          <p className="label shead__index" aria-hidden="true">
            <b>02</b>
            Systémy
          </p>
          <h2 className="h2 sys-head__title" id="systemy-title">
            <span className="silver silver--block">Šest věcí,</span>
            <span className="sys-head__accent">které stavíme.</span>
          </h2>
          <p className="sys-head__lead">{systems.lead}</p>
        </header>

        {v === 'now' ? <Board /> : <VariantC />}

        <CtaRow label={hero.primary} />
      </div>
      <VariantSwitch />
    </section>
  );
}
