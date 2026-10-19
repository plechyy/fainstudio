'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { makePack, updateFavicon } from '@/lib/brandAssets';

/*
 * Color studio. Barvy webu jsou čtyři:
 *   primární   (růžová): tlačítka, barevné části nadpisů, kouř, čáry a čísla
 *   sekundární (světlá): decentní doplňky a odstín neutrálů
 *   bílá a pozadí: bílá je pevná, pozadí se mění tady (každé téma má vlastní)
 *  • klasický výběr: čtverec sytost × jas + pruh odstínu + pole pro hex
 *  • každá barva se přepočítá na OKLCH (--primary-h/c/l-adj, --secondary-h/c/l-adj)
 *  • klávesy: C = otevřít/zavřít panel, R = náhodná primární, Esc = zavřít
 * Na localhostu je v liště „Uložit na web“: přepíše výchozí barvy, znovu vygeneruje favicon
 * a sadu log a pushne to (app/api/brand/save). Spočítané proměnné se drží v localStorage
 * (layout.tsx je obnoví před prvním vykreslením).
 */

const KEY = 'brand-v8';
const VARS_KEY = 'brand-vars-v3'; // všechny spočítané CSS proměnné; layout.tsx je obnoví před prvním vykreslením
// p = primární (béžová), s = sekundární (světlá), bd / bl = pozadí tmavého / světlého tématu
type Brand = { p: string; s: string; bd: string; bl: string };
const DEF: Brand = { p: '#ff9efe', s: '#d8cce7', bd: '#141217', bl: '#dfe2ff' };
const SECONDARY_HUE = 198.7; // šedá nemá odstín, neutrály si drží tenhle

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

/** Všechny proměnné, které Color studio nastavuje (pozadí jen když je zadané). */
function allVars(b: Brand) {
  const v: Record<string, string> = {
    ...oklchVars(b.p, 'primary', 0),
    ...oklchVars(b.s, 'secondary', SECONDARY_HUE),
  };
  for (const [hex, key] of [[b.bd, 'bgd'], [b.bl, 'bgl']] as const) if (hex) Object.assign(v, bgVars(hex, key));
  return v;
}

function load(): Brand {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (v && typeof v.p === 'string' && typeof v.s === 'string') return { ...DEF, ...v };
  } catch {}
  return { ...DEF };
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

export default function ColorStudio() {
  const [b, setB] = useState<Brand>(DEF);
  const [which, setWhich] = useState<'p' | 's' | 'b'>('p');
  const [theme, setTheme] = useState<'d' | 'l'>('d');
  const [bgDefault, setBgDefault] = useState('#0f0e0e');
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [local, setLocal] = useState(false);
  const [save, setSave] = useState<'idle' | 'busy' | 'ok' | 'err'>('idle');
  const [saveMsg, setSaveMsg] = useState('');
  const openRef = useRef(open);
  openRef.current = open;

  // Ukládá se až po načtení (loaded) — jinak by výchozí hodnoty přepsaly uložené
  // (a StrictMode v dev režimu spouští efekty dvakrát).
  useEffect(() => {
    if (!loaded) return;
    const d = document.documentElement;
    const vars = allVars(b);
    // pozadí: nastavené hodnoty přebijí výchozí z CSS, prázdné se vrátí na výchozí
    for (const [hex, key] of [[b.bd, 'bgd'], [b.bl, 'bgl']] as const) {
      if (!hex) ['l', 'c', 'h'].forEach((n) => d.style.removeProperty(`--${key}-${n}`));
    }
    for (const [k, v] of Object.entries(vars)) d.style.setProperty(k, v);
    try {
      localStorage.setItem(KEY, JSON.stringify(b));
      localStorage.setItem(VARS_KEY, JSON.stringify(vars));
    } catch {}
    setSave('idle');
    // favicon sleduje primární barvu (po krátké pauze, ať se nerenderuje při každém pixelu)
    const t = setTimeout(updateFavicon, 350);
    return () => clearTimeout(t);
  }, [b, loaded]);

  // téma, které se právě edituje v záložce Pozadí (světlé a tmavé mají každé vlastní pozadí)
  useEffect(() => {
    const read = () => setTheme(document.documentElement.dataset.theme === 'light' ? 'l' : 'd');
    read();
    const mo = new MutationObserver(read);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => mo.disconnect();
  }, []);

  // výchozí barva pozadí pro picker, když není nic nastaveno
  useEffect(() => {
    if (!loaded) return;
    if (theme === 'd' ? b.bd : b.bl) return;
    const t = setTimeout(() => setBgDefault(cssToHex(getComputedStyle(document.body).backgroundColor)), 50);
    return () => clearTimeout(t);
  }, [loaded, theme, b.bd, b.bl, which]);

  useEffect(() => {
    setB(load());
    setLoaded(true);
    setLocal(/^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname));
  }, []);

  const setPrimary = useCallback((hex: string) => setB((o) => ({ ...o, p: hex })), []);
  const setSecondary = useCallback((hex: string) => setB((o) => ({ ...o, s: hex })), []);
  const setBg = useCallback((hex: string) => setB((o) => ({ ...o, [theme === 'l' ? 'bl' : 'bd']: hex })), [theme]);

  const random = useCallback(() => {
    const h = Math.random() * 360;
    const x = hsvToHex({ h, s: 0.45 + Math.random() * 0.4, v: 0.88 + Math.random() * 0.12 });
    setB((o) => ({ ...o, p: x }));
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if ((e.target as HTMLElement).closest('input, textarea, select, [contenteditable]')) return;
      const k = e.key.toLowerCase();
      if (k === 'c') setOpen((v) => !v);
      else if (k === 'r' && openRef.current) random();
      else if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [random]);

  const copy = async () => {
    const css = Object.entries(allVars(b)).map(([k, v]) => `${k}: ${v};`).join('\n');
    try {
      await navigator.clipboard.writeText(css);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {}
  };

  const changed = b.p !== DEF.p || b.s !== DEF.s || b.bd !== DEF.bd || b.bl !== DEF.bl;
  const bgHex = (theme === 'l' ? b.bl : b.bd) || bgDefault;

  const saveToWeb = async () => {
    setSave('busy');
    setSaveMsg('');
    try {
      const files = await makePack();
      const fd = new FormData();
      fd.set('p', b.p);
      fd.set('s', b.s);
      for (const [k, v] of Object.entries(allVars(b))) fd.set(k.slice(2), v);
      fd.set('bgd', b.bd);
      fd.set('bgl', b.bl);
      for (const [name, blob] of Object.entries(files)) fd.set(name, blob, name);
      const res = await fetch('/api/brand/save', { method: 'POST', body: fd });
      const j = (await res.json().catch(() => ({}))) as { ok?: boolean; pushed?: boolean; error?: string };
      if (!j.ok) throw new Error(j.error || 'Uložení se nepovedlo.');
      setSave('ok');
      setSaveMsg(j.pushed ? 'Uloženo, web se nasazuje' : 'Uloženo, push se nepovedl');
    } catch (e) {
      setSave('err');
      setSaveMsg(e instanceof Error ? e.message : 'Uložení se nepovedlo.');
    }
  };

  const showSave = local && (changed || save !== 'idle');
  const open_ = (w: 'p' | 's' | 'b') => {
    setWhich(w);
    setOpen(true);
  };

  return (
    <aside
      className="cs glass"
      data-open={open || undefined}
      data-save={showSave ? '' : undefined}
      aria-label="Color studio"
    >
      <div className="cs__bar">
        <button
          type="button"
          className="cs__sw"
          aria-label="Primární barva"
          aria-pressed={open && which === 'p'}
          title="Primární barva"
          style={{ background: b.p }}
          onClick={() => open_('p')}
        />
        <button
          type="button"
          className="cs__sw"
          aria-label="Sekundární barva"
          aria-pressed={open && which === 's'}
          title="Sekundární barva"
          style={{ background: b.s }}
          onClick={() => open_('s')}
        />
        <button
          type="button"
          className="cs__sw cs__sw--bg"
          aria-label="Barva pozadí"
          aria-pressed={open && which === 'b'}
          title="Barva pozadí"
          style={{ background: bgHex }}
          onClick={() => open_('b')}
        />
        <span className="cs__title">Barvy</span>
        {showSave && (
          <button type="button" className="cs__save" data-state={save} onClick={saveToWeb} disabled={save === 'busy'} title={saveMsg || undefined}>
            {save === 'busy' ? 'Ukládám…' : save === 'ok' ? '✓ Uloženo' : save === 'err' ? 'Chyba, znovu' : 'Uložit na web'}
          </button>
        )}
        <button
          type="button"
          className="cs__more"
          aria-expanded={open}
          aria-label={open ? 'Skrýt color studio' : 'Otevřít color studio'}
          title="Color studio (C)"
          onClick={() => setOpen((v) => !v)}
        >
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
            <button type="button" role="tab" aria-selected={which === 's'} onClick={() => setWhich('s')}>
              <i style={{ background: b.s }} /> Sekundární
            </button>
            <button type="button" role="tab" aria-selected={which === 'b'} onClick={() => setWhich('b')}>
              <i style={{ background: bgHex }} /> Pozadí
            </button>
          </div>

          {which === 'p' ? (
            <>
              <Picker key="p" hex={b.p} onChange={setPrimary} label="Primární" />
              <p className="cs__hint">Tlačítka, barevné části nadpisů, kouř, čáry a čísla.</p>
            </>
          ) : which === 's' ? (
            <>
              <Picker key="s" hex={b.s} onChange={setSecondary} label="Sekundární" />
              <p className="cs__hint">Decentní doplňky a odstín neutrálních ploch.</p>
            </>
          ) : (
            <>
              <Picker key={`b-${theme}`} hex={bgHex} onChange={setBg} label="Pozadí" />
              <p className="cs__hint">
                Edituje se {theme === 'l' ? 'světlé' : 'tmavé'} téma, druhé má vlastní pozadí. Ostatní plochy a linky se dopočítají.
              </p>
            </>
          )}

          <div className="cs__actions">
            <button type="button" className="cs__btn" onClick={random} title="Náhodná primární (R)">
              Náhoda
            </button>
            <button type="button" className="cs__btn" onClick={copy}>
              {copied ? 'Zkopírováno' : 'Kopírovat CSS'}
            </button>
            <button type="button" className="cs__btn" onClick={() => setB({ ...DEF })}>
              Výchozí
            </button>
          </div>

          {saveMsg && (
            <p className="cs__hint" role="status">
              {saveMsg}
            </p>
          )}
          <p className="cs__hint">
            <kbd>C</kbd> panel · <kbd>R</kbd> náhoda · <kbd>Esc</kbd> zavřít
          </p>
        </div>
      )}
    </aside>
  );
}
