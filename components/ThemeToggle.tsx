'use client';

import { useEffect, useState } from 'react';

/* Přepínač světlého / tmavého motivu. Výběr se pamatuje; výchozí je tmavý (layout.tsx ho nastaví před vykreslením). */
export default function ThemeToggle({ className = '' }: { className?: string }) {
  const [light, setLight] = useState(false);

  useEffect(() => {
    setLight(document.documentElement.dataset.theme === 'light');
  }, []);

  const toggle = () => {
    const next = light ? 'dark' : 'light';
    document.documentElement.dataset.theme = next;
    // lišta prohlížeče na iOS má držet barvu pozadí
    const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    if (meta) meta.content = next === 'light' ? '#fcfaf6' : '#222222';
    try {
      localStorage.setItem('theme', next);
    } catch {}
    setLight(!light);
  };

  return (
    <button
      type="button"
      className={`theme-toggle ${className}`.trim()}
      onClick={toggle}
      aria-label={light ? 'Přepnout na tmavý motiv' : 'Přepnout na světlý motiv'}
      title={light ? 'Tmavý motiv' : 'Světlý motiv'}
    >
      {light ? (
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M5 5l1.8 1.8M17.2 17.2L19 19M19 5l-1.8 1.8M6.8 17.2L5 19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      )}
    </button>
  );
}
