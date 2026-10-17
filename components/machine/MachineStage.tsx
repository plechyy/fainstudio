'use client';

import { useEffect, useRef, useState } from 'react';

/*
 * Plátno pro 3D stroj v hero (/hero2). three.js se stáhne až v prohlížeči
 * a jen na stránce, která stroj má; hlavní stránka ho nenačítá.
 */
export default function MachineStage() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let dispose: (() => void) | undefined;
    let dead = false;
    import('./scene').then(({ mountMachine }) => {
      if (dead || !ref.current) return;
      try {
        dispose = mountMachine(ref.current, { onReady: () => setReady(true) });
      } catch (e) {
        // bez WebGL zůstane jen CSS pozadí
        console.error('machine scene', e);
      }
    });
    return () => {
      dead = true;
      dispose?.();
    };
  }, []);

  return <canvas ref={ref} className={`hero-canvas hero-machine${ready ? ' is-ready' : ''}`} aria-hidden="true" />;
}
