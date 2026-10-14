'use client';

import { useEffect, useRef } from 'react';
import { hero } from '@/lib/content';
import CtaRow from './CtaRow';
import Board from './systems/Board';
import SysHead from './systems/SysHead';
import VariantP from './systems/VariantP';
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
        {/* nová varianta si hlavičku sází sama — má ji ve svém levém sloupci */}
        {v === 'now' && <SysHead />}

        {v === 'now' ? <Board /> : <VariantP />}

        <CtaRow label={hero.primary} />
      </div>
      <VariantSwitch />
    </section>
  );
}
