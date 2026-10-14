'use client';

import { useEffect, useRef } from 'react';
import { hero } from '@/lib/content';
import CtaRow from './CtaRow';
import Panel from './systems/Panel';

/*
 * Sekce „Systémy“. Hlavičku i obsah sází Panel, tady zůstává jen rám sekce
 * a tlačítko pod ním.
 */

export default function Systems() {
  const root = useRef<HTMLElement>(null);

  // na mobilu se obsah přemountuje až po hydrataci, takže ho společný reveal v Enhance minul
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
  }, []);

  return (
    <section className="section section--tight" id="systemy" aria-labelledby="systemy-title" ref={root}>
      <div className="wrap">
        <Panel />

        <CtaRow label={hero.primary} />
      </div>
    </section>
  );
}
