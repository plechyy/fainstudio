'use client';

import { useEffect, useRef } from 'react';
import CtaRow from './CtaRow';
import Panel from './systems/Panel';

/*
 * Sekce „Systémy“. Hlavičku i obsah sází Panel, tady zůstává jen rám sekce
 * a tlačítko pod ním.
 */

export default function Systems() {
  const root = useRef<HTMLElement>(null);

  /*
   * Na mobilu se obsah sekce přemountuje až po hydrataci (seznam → carousel), takže
   * ho společný reveal v Enhance minul a zůstal by neviditelný. Hlídáme proto přírůstky
   * v sekci a každý nový .reveal doobsloužíme sami.
   */
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const plain = matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window);
    const io = plain
      ? null
      : new IntersectionObserver(
          (entries) => {
            for (const e of entries) {
              if (!e.isIntersecting) continue;
              e.target.classList.add('is-in');
              io?.unobserve(e.target);
            }
          },
          { rootMargin: '0px 0px -14% 0px', threshold: 0.08 },
        );
    const scan = () => {
      el.querySelectorAll<HTMLElement>('.reveal:not(.is-in)').forEach((n) => (io ? io.observe(n) : n.classList.add('is-in')));
    };
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(el, { childList: true, subtree: true });
    return () => {
      mo.disconnect();
      io?.disconnect();
    };
  }, []);

  return (
    <section className="section section--tight" id="systemy" aria-labelledby="systemy-title" ref={root}>
      <div className="wrap">
        <Panel />

        <CtaRow label="Mám zájem" align="right" />
      </div>
    </section>
  );
}
