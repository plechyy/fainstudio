'use client';

import { useEffect, useState } from 'react';

/*
 * Úvodní loading obrazovka: logo + vodič, po kterém běží výboj. Je v HTML od prvního bajtu
 * (žádné probliknutí obsahu), mizí až po načtení fontů a stránky, minimálně po MIN ms.
 * Bez JS ji schová <noscript> v layoutu.
 */

const MIN = 1300;

export default function Loader() {
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const t0 = performance.now();
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      const wait = Math.max(0, MIN - (performance.now() - t0));
      setTimeout(() => {
        setDone(true);
        root.classList.remove('is-loading');
        setTimeout(() => setGone(true), 800);
      }, wait);
    };
    const ready = Promise.all([
      document.fonts?.ready ?? Promise.resolve(),
      document.readyState === 'complete'
        ? Promise.resolve()
        : new Promise<void>((r) => window.addEventListener('load', () => r(), { once: true })),
    ]);
    ready.then(finish, finish);
    const safety = setTimeout(finish, 5000); // nikdy nezůstat viset
    return () => clearTimeout(safety);
  }, []);

  if (gone) return null;
  return (
    <div className={`loader${done ? ' is-done' : ''}`} aria-hidden="true">
      <div className="loader__inner">
        <span className="loader__logo">
          FaiN<span className="loader__sub">Studio</span>
        </span>
        <span className="loader__wire">
          <i className="loader__node" />
          <i className="loader__pulse" />
          <i className="loader__node" />
        </span>
      </div>
    </div>
  );
}
