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

/** Kolik písmen z `text` je napsaných: ve fázi `phase` se píše, po ní je celý, před ní nic. */
export function useTyped(text: string, s: number, phase: number, ms: number) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (s !== phase) {
      setN(s > phase ? text.length : 0);
      return;
    }
    setN(0);
    const per = Math.max(14, (ms - 250) / text.length);
    const t = window.setInterval(() => setN((v) => Math.min(text.length, v + 1)), per);
    return () => clearInterval(t);
  }, [s, phase, ms, text]);
  return text.slice(0, n);
}

/** Číslo, které ve fázi `phase` doběhne z `from` na `to`. */
export function useCount(from: number, to: number, s: number, phase: number, ms: number) {
  const [v, setV] = useState(from);
  useEffect(() => {
    if (s !== phase) {
      setV(s > phase ? to : from);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / ms);
      setV(Math.round(from + (to - from) * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [s, phase, from, to, ms]);
  return v;
}

/** 1290000 → „1 290 000“ */
export const fmt = (n: number) => n.toLocaleString('cs-CZ').replace(/\u00a0/g, ' ');

/* Nejmenší šířka, ve které se scéna skládá (`base`). Na užším místě (carousel na
   mobilu) se poskládá v téhle šířce a celá se zmenší, jako fotka obrazovky. */

/** Nakloněná scéna. Děti se vrství přes `Layer` s vlastní hloubkou. */
export function Scene({
  children,
  sceneRef,
  className = '',
  base = 420,
}: {
  children: React.ReactNode;
  sceneRef: React.RefObject<HTMLDivElement | null>;
  className?: string;
  base?: number;
}) {
  const fit = useRef<HTMLDivElement>(null);
  const [k, setK] = useState(1);

  useEffect(() => {
    const el = fit.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setK(Math.min(1, e.contentRect.width / base)));
    ro.observe(el);
    return () => ro.disconnect();
  }, [base]);

  return (
    <div className="sc-fit" ref={fit}>
      <div
        className={`sc ${className}`}
        ref={sceneRef}
        style={k < 1 ? { width: base, zoom: k } : undefined}
      >
        <div className="sc__obj">{children}</div>
      </div>
    </div>
  );
}

/** Vrstva ve scéně, posunutá do hloubky o `z` pixelů (kladné = blíž k divákovi). */
export function Layer({
  z,
  className = '',
  style,
  children,
}: {
  z: number;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}) {
  return (
    <div className={`sc__layer ${className}`} style={{ ...style, ['--z' as string]: `${z}px` }}>
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
  bell: (
    <>
      <path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z" />
      <path d="M10 20.5a2.2 2.2 0 0 0 4 0" />
    </>
  ),
  send: <path d="M4 12 20 4l-5 16-3.5-6.5z" />,
  lock: (
    <>
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8.5" r="3.5" />
      <path d="M5 20a7 7 0 0 1 14 0" />
    </>
  ),
  board: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <path d="M9 4v16M15 4v16" />
    </>
  ),
  folder: <path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H10l2 2.5h6.5A2.5 2.5 0 0 1 21 10v7.5a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5z" />,
  cal: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  laptop: (
    <>
      <rect x="5" y="5" width="14" height="10" rx="1.5" />
      <path d="M3 18.5h18" />
    </>
  ),
  key: (
    <>
      <circle cx="8" cy="12" r="3.5" />
      <path d="M11.5 12H21M17.5 12v3M20.5 12v2.5" />
    </>
  ),
  pen: <path d="M4 20l1-4.5L16 4.5a2.1 2.1 0 0 1 3 3L8 18.5zM14 6.5l3 3" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.4 2.4 3.5 5.2 3.5 8.5s-1.1 6.1-3.5 8.5c-2.4-2.4-3.5-5.2-3.5-8.5s1.1-6.1 3.5-8.5z" />
    </>
  ),
  chat: <path d="M4 5.5h16v10.5H10l-4.5 3.5V16H4z" />,
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6" />
      <path d="m15 15 5 5" />
    </>
  ),
  clip: <path d="m20 11.5-8.2 8.2a5 5 0 0 1-7-7l8.5-8.5a3.3 3.3 0 0 1 4.7 4.7l-8.5 8.5a1.7 1.7 0 0 1-2.4-2.4l7.8-7.8" />,
};

/** Kurzor myši, který přijede a klikne. Sedí v pravém dolním rohu rodiče, `className` ho posune jinam. */
export function Cursor({ state, className = '' }: { state: 'off' | 'in' | 'click'; className?: string }) {
  return (
    <svg
      className={`sc-cur${state === 'off' ? '' : ` is-${state}`}${className ? ` ${className}` : ''}`}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M5 3.5 18.5 10l-6 1.7-2.6 6.3z" />
    </svg>
  );
}

/** Upozornění, které vyjede před okno. `delay` (ms) ho pošle o kus později, ať jich víc nevyjede naráz. */
export function Toast({
  show,
  title,
  sub,
  icon,
  delay = 0,
}: {
  show: boolean;
  title: string;
  sub: string;
  icon: React.ReactNode;
  delay?: number;
}) {
  return (
    <div className={`sc-toast${show ? ' is-in' : ''}`} style={show && delay ? { transitionDelay: `${delay}ms` } : undefined}>
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
