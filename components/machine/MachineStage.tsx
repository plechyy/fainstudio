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
        // spodek tlačítek v hero; offsetTop nezávisí na úvodní animaci (transform)
        const textBottom = () => {
          const el = canvas.closest('.hero')?.querySelector<HTMLElement>('.hero__actions');
          return el ? el.offsetTop + el.offsetHeight : 0;
        };
        dispose = mountMachine(canvas, { onReady: () => setReady(true), textBottom, look });
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
