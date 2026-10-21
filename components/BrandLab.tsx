'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { LOGO_VERSIONS, type LogoId } from '@/lib/logoVersions';

/*
 * Brand lab (jen localhost, na ostrém webu se nevykreslí). Přepíná verze loga a pro každou verzi
 * si pamatuje vlastní barvy: primární, druhá barva loga (jen verze s třemi barvami), sekundární a pozadí.
 *  • klasický výběr: čtverec sytost × jas + pruh odstínu + pole pro hex
 *  • barvy se přepočítají na OKLCH proměnné webu (primary, secondary a pozadí z globals.css)
 *  • klávesy: C = panel, V = další verze loga, R = náhodná primární, Esc = zavřít
 * Stav drží localStorage; layout.tsx ho na localhostu obnoví před prvním vykreslením.
 */

const KEY = 'brandlab-v1';
const VARS_KEY = 'brandlab-vars';
const SECONDARY_HUE = 168; // šedá nemá odstín, neutrály si drží tenhle

type Brand = { p: string; p2: string; s: string; bd: string; bl: string };

const round = (n: number, d = 3) => +n.toFixed(d);
const clamp = (n: number, a: number, b: number) => Math.min(b, Math.max(a, n));

// ── barevná matematika ──────────────────────────────────────────────
type Hsv = { h: number; s: number; v: number };

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function rgbToHex(r: number, g: number, b: number) {
  return '#' + [r, g, b].map((v) => Math.round(clamp(v, 0, 255)).toString(16).padStart(2, '0')).join('');
}
function hexToHsv(hex: string): Hsv {
  const [r, g, b] = hexToRgb(hex).map((v) => v / 255);
  const max = Math.max(r, g, b);
  const d = max - Math.min(r, g, b);
  let h = 0;
  if (d) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  return { h, s: max ? d / max : 0, v: max };
}
function hsvToHex({ h, s, v }: Hsv) {
  const f = (n: number) => {
    const k = (n + h / 60) % 6;
    return v - v * s * Math.max(0, Math.min(k, 4 - k, 1));
  };
  return rgbToHex(f(5) * 255, f(3) * 255, f(1) * 255);
}
/** hex → OKLCH, aby primární barva seděla na stávající systém (--secondary = hex). */
function hexToOklch(hex: string) {
  const lin = (c: number) => ((c /= 255) <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  const [r, g, b] = hexToRgb(hex).map(lin);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  const C = Math.hypot(A, B);
  let h = (Math.atan2(B, A) * 180) / Math.PI;
  if (h < 0) h += 360;
  return { L, C, h };
}
const isHex = (v: string) => /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.test(v.trim());
function normHex(v: string) {
  let x = v.trim().replace('#', '').toLowerCase();
  if (x.length === 3) x = x.split('').map((ch) => ch + ch).join('');
  return '#' + x;
}


/** Libovolná CSS barva → hex (přes canvas), aby šlo ukázat výchozí pozadí v pickeru. */
function cssToHex(color: string) {
  const cv = document.createElement('canvas');
  cv.width = cv.height = 1;
  const cx = cv.getContext('2d')!;
  cx.fillStyle = color;
  cx.fillRect(0, 0, 1, 1);
  const [r, g, b] = cx.getImageData(0, 0, 1, 1).data;
  return rgbToHex(r, g, b);
}

/** Pozadí jedné barvy → světlost / sytost / odstín, ze kterých CSS odvodí všechny neutrály. */
function bgVars(hex: string, key: 'bgd' | 'bgl') {
  const { L, C, h } = hexToOklch(hex);
  return {
    [`--${key}-l`]: String(round(clamp(L, key === 'bgd' ? 0.04 : 0.8, key === 'bgd' ? 0.35 : 1), 4)),
    [`--${key}-c`]: String(round(Math.min(C, 0.06), 4)),
    [`--${key}-h`]: String(round(C < 0.004 ? 0 : h, 1)),
  } as Record<string, string>;
}

/** Barva tlačítek a nadpisů → odstín / sytost / posun světlosti (stejné přepočty jako u primární). */

/** Barva → odstín / sytost / posun světlosti (základ 0,78). Šedá si ponechá zadaný odstín. */
function oklchVars(hex: string, name: 'primary' | 'secondary', greyHue: number) {
  const { L, C, h } = hexToOklch(hex);
  return {
    [`--${name}-h`]: String(C < 0.012 ? greyHue : round(h, 1)),
    [`--${name}-c`]: String(round(C, 4)),
    [`--${name}-l-adj`]: String(round(clamp(L - 0.78, -0.3, 0.2), 4)),
  } as Record<string, string>;
}

// ── výběr barvy: čtverec + pruh odstínu ─────────────────────────────
function Picker({ hex, onChange, label }: { hex: string; onChange: (hex: string) => void; label: string }) {
  const [hsv, setHsv] = useState<Hsv>(() => hexToHsv(hex));
  const [text, setText] = useState(hex);
  const drag = useRef<'sv' | 'h' | null>(null);
  const sv = useRef<HTMLDivElement>(null);
  const hue = useRef<HTMLDivElement>(null);

  // vnější změna (náhoda, výchozí, načtení) → přepsat; šedé zachová odstín
  useEffect(() => {
    if (hsvToHex(hsv) !== hex) {
      const n = hexToHsv(hex);
      setHsv((o) => ({ h: n.s === 0 || n.v === 0 ? o.h : n.h, s: n.s, v: n.v }));
    }
    setText(hex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hex]);

  const apply = (n: Hsv) => {
    setHsv(n);
    onChange(hsvToHex(n));
  };

  const pointSv = (e: React.PointerEvent) => {
    const r = sv.current!.getBoundingClientRect();
    apply({ ...hsv, s: clamp((e.clientX - r.left) / r.width, 0, 1), v: 1 - clamp((e.clientY - r.top) / r.height, 0, 1) });
  };
  const pointHue = (e: React.PointerEvent) => {
    const r = hue.current!.getBoundingClientRect();
    apply({ ...hsv, h: clamp((e.clientX - r.left) / r.width, 0, 1) * 360 });
  };

  const onSvKey = (e: React.KeyboardEvent) => {
    const d = 0.02;
    const m: Record<string, Partial<Hsv>> = {
      ArrowLeft: { s: clamp(hsv.s - d, 0, 1) },
      ArrowRight: { s: clamp(hsv.s + d, 0, 1) },
      ArrowUp: { v: clamp(hsv.v + d, 0, 1) },
      ArrowDown: { v: clamp(hsv.v - d, 0, 1) },
    };
    if (m[e.key]) {
      e.preventDefault();
      apply({ ...hsv, ...m[e.key] });
    }
  };
  const onHueKey = (e: React.KeyboardEvent) => {
    const d = e.key === 'ArrowLeft' || e.key === 'ArrowDown' ? -3 : e.key === 'ArrowRight' || e.key === 'ArrowUp' ? 3 : 0;
    if (d) {
      e.preventDefault();
      apply({ ...hsv, h: (hsv.h + d + 360) % 360 });
    }
  };

  return (
    <div className="cp">
      <div
        ref={sv}
        className="cp__sv"
        style={{ ['--cp-h' as string]: hsv.h }}
        role="slider"
        tabIndex={0}
        aria-label={`${label}: sytost a jas`}
        aria-valuetext={hex}
        onKeyDown={onSvKey}
        onPointerDown={(e) => {
          drag.current = 'sv';
          e.currentTarget.setPointerCapture(e.pointerId);
          pointSv(e);
        }}
        onPointerMove={(e) => drag.current === 'sv' && pointSv(e)}
        onPointerUp={() => (drag.current = null)}
      >
        <span className="cp__thumb" style={{ left: `${hsv.s * 100}%`, top: `${(1 - hsv.v) * 100}%`, background: hex }} />
      </div>
      <div
        ref={hue}
        className="cp__hue"
        role="slider"
        tabIndex={0}
        aria-label={`${label}: odstín`}
        aria-valuemin={0}
        aria-valuemax={360}
        aria-valuenow={Math.round(hsv.h)}
        onKeyDown={onHueKey}
        onPointerDown={(e) => {
          drag.current = 'h';
          e.currentTarget.setPointerCapture(e.pointerId);
          pointHue(e);
        }}
        onPointerMove={(e) => drag.current === 'h' && pointHue(e)}
        onPointerUp={() => (drag.current = null)}
      >
        <span className="cp__thumb cp__thumb--h" style={{ left: `${(hsv.h / 360) * 100}%` }} />
      </div>
      <label className="cp__hex">
        <span>Hex</span>
        <input
          type="text"
          spellCheck={false}
          autoComplete="off"
          maxLength={7}
          value={text}
          aria-label={`${label}: hex`}
          onChange={(e) => {
            setText(e.target.value);
            if (isHex(e.target.value)) {
              const h = normHex(e.target.value);
              setHsv(hexToHsv(h));
              onChange(h);
            }
          }}
          onBlur={() => setText(hex)}
        />
      </label>
    </div>
  );
}

function oklchToHex(L: number, C: number, hdeg: number) {
  const a = C * Math.cos((hdeg * Math.PI) / 180);
  const b = C * Math.sin((hdeg * Math.PI) / 180);
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  const lin = [4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s, -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s, -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s];
  const gam = (c: number) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);
  return rgbToHex(...(lin.map((c) => clamp(gam(clamp(c, 0, 1)), 0, 1) * 255) as [number, number, number]));
}

const SECONDARY_DEF = oklchToHex(0.8632, 0.039, 168);

const defOf = (id: LogoId): Brand => {
  const v = LOGO_VERSIONS.find((x) => x.id === id)!;
  return { p: v.p, p2: ('p2' in v ? v.p2 : v.p) as string, s: SECONDARY_DEF, bd: '', bl: '' };
};

function varsOf(b: Brand) {
  const out: Record<string, string> = { ...oklchVars(b.p, 'primary', 0), ...oklchVars(b.s, 'secondary', SECONDARY_HUE), '--logo-2': b.p2 };
  for (const [hex, key] of [[b.bd, 'bgd'], [b.bl, 'bgl']] as const) if (hex) Object.assign(out, bgVars(hex, key));
  return out;
}

type Store = { v: LogoId; by: Partial<Record<LogoId, Brand>> };

function load(): Store {
  try {
    const x = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (x && typeof x.v === 'string' && x.by) return x as Store;
  } catch {}
  return { v: 'clover', by: {} };
}

export default function BrandLab() {
  const [store, setStore] = useState<Store>({ v: 'clover', by: {} });
  const [which, setWhich] = useState<'p' | 'p2' | 's' | 'b'>('p');
  const [theme, setTheme] = useState<'d' | 'l'>('d');
  const [bgDefault, setBgDefault] = useState('#0b100e');
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const openRef = useRef(open);
  openRef.current = open;

  const ver = LOGO_VERSIONS.find((x) => x.id === store.v)!;
  const hasP2 = 'p2' in ver;
  const def = defOf(store.v);
  const b: Brand = { ...def, ...store.by[store.v] };

  // přepíše CSS proměnné i vybranou verzi loga; čtyřlístek beze změny zůstane na hodnotách z globals.css
  useEffect(() => {
    if (!loaded) return;
    const d = document.documentElement;
    const vars = varsOf(b);
    const all = ['--primary-h', '--primary-c', '--primary-l-adj', '--secondary-h', '--secondary-c', '--secondary-l-adj', '--logo-2', '--bgd-l', '--bgd-c', '--bgd-h', '--bgl-l', '--bgl-c', '--bgl-h'];
    const pristine = store.v === 'clover' && !store.by.clover;
    all.forEach((k) => d.style.removeProperty(k));
    if (!pristine) {
      const keep = { ...vars };
      if (b.s === SECONDARY_DEF) ['--secondary-h', '--secondary-c', '--secondary-l-adj'].forEach((k) => delete keep[k]);
      for (const [k, v] of Object.entries(keep)) d.style.setProperty(k, v);
    }
    d.dataset.logo = store.v;
    try {
      localStorage.setItem(KEY, JSON.stringify(store));
      localStorage.setItem(VARS_KEY, JSON.stringify({ logo: store.v, vars: pristine ? {} : vars }));
    } catch {}
  }, [store, loaded]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const read = () => setTheme(document.documentElement.dataset.theme === 'light' ? 'l' : 'd');
    read();
    const mo = new MutationObserver(read);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => mo.disconnect();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    if (theme === 'd' ? b.bd : b.bl) return;
    const t = setTimeout(() => setBgDefault(cssToHex(getComputedStyle(document.body).backgroundColor)), 50);
    return () => clearTimeout(t);
  }, [loaded, theme, b.bd, b.bl, which, store.v]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setStore(load());
    setLoaded(true);
  }, []);

  const patch = useCallback((p: Partial<Brand>) => setStore((o) => ({ ...o, by: { ...o.by, [o.v]: { ...defOf(o.v), ...o.by[o.v], ...p } } })), []);
  const setBg = useCallback((hex: string) => patch({ [theme === 'l' ? 'bl' : 'bd']: hex }), [patch, theme]);
  const pick = useCallback((v: LogoId) => {
    setStore((o) => ({ ...o, v }));
    setWhich((w) => (w === 'p2' && !('p2' in LOGO_VERSIONS.find((x) => x.id === v)!) ? 'p' : w));
  }, []);
  const next = useCallback(() => setStore((o) => ({ ...o, v: LOGO_VERSIONS[(LOGO_VERSIONS.findIndex((x) => x.id === o.v) + 1) % LOGO_VERSIONS.length].id })), []);

  const random = useCallback(() => {
    const h = Math.random() * 360;
    patch({ p: hsvToHex({ h, s: 0.55 + Math.random() * 0.4, v: 0.78 + Math.random() * 0.22 }) });
  }, [patch]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if ((e.target as HTMLElement).closest('input, textarea, select, [contenteditable]')) return;
      const k = e.key.toLowerCase();
      if (k === 'c') setOpen((v) => !v);
      else if (k === 'v') next();
      else if (k === 'r' && openRef.current) random();
      else if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [random, next]);

  const copy = async () => {
    const css = `/* verze loga: ${ver.label} (${ver.n}) */\n` + Object.entries(varsOf(b)).map(([k, v]) => `${k}: ${v};`).join('\n');
    try {
      await navigator.clipboard.writeText(css);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {}
  };

  const bgHex = (theme === 'l' ? b.bl : b.bd) || bgDefault;
  const open_ = (w: 'p' | 'p2' | 's' | 'b') => {
    setWhich(w);
    setOpen(true);
  };

  return (
    <aside className="cs glass" data-open={open || undefined} aria-label="Brand lab">
      <div className="cs__ver" role="tablist" aria-label="Verze loga">
        {LOGO_VERSIONS.map((v) => (
          <button key={v.id} type="button" role="tab" aria-selected={store.v === v.id} onClick={() => pick(v.id)} title={`${v.label} (č. ${v.n})`}>
            <b>{v.n}</b>
            <span>{v.label}</span>
          </button>
        ))}
      </div>
      <div className="cs__bar">
        <button type="button" className="cs__sw" aria-label="Primární barva" aria-pressed={open && which === 'p'} title="Primární barva" style={{ background: b.p }} onClick={() => open_('p')} />
        {hasP2 && <button type="button" className="cs__sw" aria-label="Druhá barva loga" aria-pressed={open && which === 'p2'} title="Druhá barva loga" style={{ background: b.p2 }} onClick={() => open_('p2')} />}
        <button type="button" className="cs__sw" aria-label="Sekundární barva" aria-pressed={open && which === 's'} title="Sekundární barva" style={{ background: b.s }} onClick={() => open_('s')} />
        <button type="button" className="cs__sw cs__sw--bg" aria-label="Barva pozadí" aria-pressed={open && which === 'b'} title="Barva pozadí" style={{ background: bgHex }} onClick={() => open_('b')} />
        <span className="cs__title">{ver.label}</span>
        <button type="button" className="cs__more" aria-expanded={open} aria-label={open ? 'Skrýt panel barev' : 'Otevřít panel barev'} title="Barvy (C)" onClick={() => setOpen((v) => !v)}>
          <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
            <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="cs__panel">
          <div className="cs__tabs" role="tablist" aria-label="Která barva">
            <button type="button" role="tab" aria-selected={which === 'p'} onClick={() => setWhich('p')}>
              <i style={{ background: b.p }} /> Primární
            </button>
            {hasP2 && (
              <button type="button" role="tab" aria-selected={which === 'p2'} onClick={() => setWhich('p2')}>
                <i style={{ background: b.p2 }} /> Druhá
              </button>
            )}
            <button type="button" role="tab" aria-selected={which === 's'} onClick={() => setWhich('s')}>
              <i style={{ background: b.s }} /> Sekundární
            </button>
            <button type="button" role="tab" aria-selected={which === 'b'} onClick={() => setWhich('b')}>
              <i style={{ background: bgHex }} /> Pozadí
            </button>
          </div>

          {which === 'p' ? (
            <>
              <Picker key={`p-${store.v}`} hex={b.p} onChange={(hex) => patch({ p: hex })} label="Primární" />
              <p className="cs__hint">Tlačítka, barevné části nadpisů, kouř, čáry, čísla a barevné části loga.</p>
            </>
          ) : which === 'p2' ? (
            <>
              <Picker key={`p2-${store.v}`} hex={b.p2} onChange={(hex) => patch({ p2: hex })} label="Druhá barva loga" />
              <p className="cs__hint">Druhá barva tvarů v logu (jen verze se třemi barvami).</p>
            </>
          ) : which === 's' ? (
            <>
              <Picker key={`s-${store.v}`} hex={b.s} onChange={(hex) => patch({ s: hex })} label="Sekundární" />
              <p className="cs__hint">Decentní doplňky a odstín neutrálních ploch.</p>
            </>
          ) : (
            <>
              <Picker key={`b-${theme}-${store.v}`} hex={bgHex} onChange={setBg} label="Pozadí" />
              <p className="cs__hint">Edituje se {theme === 'l' ? 'světlé' : 'tmavé'} téma, druhé má vlastní pozadí.</p>
            </>
          )}

          <div className="cs__actions">
            <button type="button" className="cs__btn" onClick={random} title="Náhodná primární (R)">
              Náhoda
            </button>
            <button type="button" className="cs__btn" onClick={copy}>
              {copied ? 'Zkopírováno' : 'Kopírovat CSS'}
            </button>
            <button type="button" className="cs__btn" onClick={() => setStore((o) => ({ ...o, by: { ...o.by, [o.v]: undefined } }))}>
              Výchozí
            </button>
          </div>
          <p className="cs__hint">
            Každá verze loga má vlastní barvy. <kbd>C</kbd> panel · <kbd>V</kbd> další verze · <kbd>R</kbd> náhoda · <kbd>Esc</kbd> zavřít
          </p>
        </div>
      )}
    </aside>
  );
}
