'use client';

import { useEffect, useRef, useState } from 'react';

/*
 * Společný základ živých vizuálů v sekci Systémy.
 * Scéna je nakloněná ve 3D: hlavní okno uprostřed, karta za ním a upozornění
 * před ním, každé v jiné hloubce. Smyčka běží jen když je scéna vidět;
 * kdo má vypnuté animace, vidí rovnou hotový stav.
 */

/** Krokuje fáze 0…n-1 podle délek v `dur`. `final` je stav pro vypnuté animace. */
export function useLoop(dur: number[], final: number) {
  const [s, setS] = useState(0);
  const [live, setLive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setS(final);
      return;
    }
    const io = new IntersectionObserver(([e]) => setLive(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, [final]);

  useEffect(() => {
    if (!live) return;
    const t = window.setTimeout(() => setS((v) => (v + 1) % dur.length), dur[s]);
    return () => clearTimeout(t);
  }, [s, live, dur]);

  return { s, ref };
}

/* Nejmenší šířka, ve které se scéna skládá. Na užším místě (carousel na mobilu)
   se poskládá v téhle šířce a celá se zmenší, jako fotka obrazovky. */
const BASE = 400;

/** Nakloněná scéna. Děti se vrství přes `Layer` s vlastní hloubkou. */
export function Scene({
  children,
  sceneRef,
  className = '',
}: {
  children: React.ReactNode;
  sceneRef: React.RefObject<HTMLDivElement | null>;
  className?: string;
}) {
  const fit = useRef<HTMLDivElement>(null);
  const [k, setK] = useState(1);

  useEffect(() => {
    const el = fit.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setK(Math.min(1, e.contentRect.width / BASE)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="sc-fit" ref={fit}>
      <div
        className={`sc ${className}`}
        ref={sceneRef}
        style={k < 1 ? { width: BASE, zoom: k } : undefined}
      >
        <div className="sc__obj">{children}</div>
      </div>
    </div>
  );
}

/** Vrstva ve scéně, posunutá do hloubky o `z` pixelů (kladné = blíž k divákovi). */
export function Layer({ z, className = '', children }: { z: number; className?: string; children?: React.ReactNode }) {
  return (
    <div className={`sc__layer ${className}`} style={{ ['--z' as string]: `${z}px` }}>
      {children}
    </div>
  );
}

export function Svg({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

export const ico = {
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </>
  ),
  table: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <path d="M3 10h18M3 15h18M10 4v16" />
    </>
  ),
  approve: (
    <>
      <path d="M12 3.5 19 6v5c0 4.4-2.9 7.7-7 9.5-4.1-1.8-7-5.1-7-9.5V6z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </>
  ),
  invoice: (
    <>
      <path d="M6 3h8.5L19 7.5V21H6z" />
      <path d="M14 3v5h5M9 13h7M9 17h4.5" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  clip: <path d="m20 11.5-8.2 8.2a5 5 0 0 1-7-7l8.5-8.5a3.3 3.3 0 0 1 4.7 4.7l-8.5 8.5a1.7 1.7 0 0 1-2.4-2.4l7.8-7.8" />,
};

/** Kurzor myši, který přijede a klikne. */
export function Cursor({ state }: { state: 'off' | 'in' | 'click' }) {
  return (
    <svg className={`sc-cur${state === 'off' ? '' : ` is-${state}`}`} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 3.5 18.5 10l-6 1.7-2.6 6.3z" />
    </svg>
  );
}

/** Upozornění, které vyjede před okno. */
export function Toast({ show, title, sub, icon }: { show: boolean; title: string; sub: string; icon: React.ReactNode }) {
  return (
    <div className={`sc-toast${show ? ' is-in' : ''}`}>
      <span className="sc-toast__ico">
        <Svg>{icon}</Svg>
      </span>
      <span>
        <b>{title}</b>
        <span>{sub}</span>
      </span>
    </div>
  );
}
