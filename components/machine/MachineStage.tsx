'use client';

import { useEffect, useRef, useState } from 'react';

/*
 * Plátno pro 3D stroj v hero (/hero2). three.js se stáhne až v prohlížeči
 * a jen na stránce, která stroj má; hlavní stránka ho nenačítá.
 */
export default function MachineStage({ look = 'clay' }: { look?: 'clay' | 'silhouette' }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let dispose: (() => void) | undefined;
    let dead = false;
    import('./scene').then(({ mountMachine }) => {
      if (dead || !ref.current) return;
      try {
        const canvas = ref.current;
        // nadpis, perex a tlačítka v px hera; offset* nezávisí na úvodní animaci (transform)
        const textBoxes = () => {
          const hero = canvas.closest<HTMLElement>('.hero');
          if (!hero) return [];
          return [...hero.querySelectorAll<HTMLElement>('.hero__title, .hero__lead, .hero__actions')].map((el) => {
            let l = 0;
            let t = 0;
            for (let e: HTMLElement | null = el; e && e !== hero; e = e.offsetParent as HTMLElement | null) {
              l += e.offsetLeft;
              t += e.offsetTop;
            }
            return { l, r: l + el.offsetWidth, b: t + el.offsetHeight };
          });
        };
        dispose = mountMachine(canvas, { onReady: () => setReady(true), textBoxes, look });
      } catch (e) {
        // bez WebGL zůstane jen CSS pozadí
        console.error('machine scene', e);
      }
    });
    return () => {
      dead = true;
      dispose?.();
    };
  }, [look]);

  return <canvas ref={ref} className={`hero-canvas hero-machine${ready ? ' is-ready' : ''}`} aria-hidden="true" />;
}
