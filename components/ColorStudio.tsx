'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { makePack, updateFavicon } from '@/lib/brandAssets';

/*
 * Color studio — ladění primární barvy v rohu webu.
 *  • odstín (0–360), sytost, jas akcentu (±0.08)
 *  • sedm předvoleb, náhodná barva
 *  • kopírování hotového CSS, reset
 *  • klávesy: C = otevřít/zavřít panel, R = náhodná barva, Esc = zavřít
 * Na localhostu je v liště tlačítko „Uložit na web“: přepíše výchozí barvu, vygeneruje znovu
 * favicon a sadu log a pushne to (viz app/api/brand/save). Favicon se při ladění mění živě.
 * Hodnoty se ukládají do localStorage a obnovují před prvním vykreslením (layout.tsx).
 */

const KEY = 'brand-v5';
const DEF = { h: 48, c: 0.16, l: 0.035 };
type Brand = typeof DEF;

const PRESETS: { name: string; h: number; c: number; l?: number }[] = [
  { name: 'Ledová', h: 239, c: 0.135, l: 0.08 },
  { name: 'Fialová', h: 267, c: 0.2 },
  { name: 'Tyrkys', h: 185, c: 0.15 },
  { name: 'Limetka', h: 128, c: 0.19 },
  { name: 'Jantar', h: 55, c: 0.17 },
  { name: 'Korál', h: 28, c: 0.19 },
  { name: 'Magenta', h: 330, c: 0.21 },
];

const HUE_TRACK = `linear-gradient(90deg, ${Array.from({ length: 13 }, (_, i) => `oklch(0.78 0.15 ${i * 30})`).join(', ')})`;
const round = (n: number, d = 3) => +n.toFixed(d);

function load(): Brand {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (v && typeof v.h === 'number') return { h: v.h, c: v.c ?? DEF.c, l: v.l ?? 0 };
  } catch {}
  return { ...DEF };
}

export default function ColorStudio() {
  const [b, setB] = useState<Brand>(DEF);
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
    d.style.setProperty('--brand-h', String(b.h));
    d.style.setProperty('--brand-c', String(b.c));
    d.style.setProperty('--brand-l-adj', String(b.l));
    try {
      localStorage.setItem(KEY, JSON.stringify(b));
    } catch {}
    setSave('idle');
    // favicon sleduje barvu (po krátké pauze, ať se nerenderuje při každém pixelu posuvníku)
    const t = setTimeout(updateFavicon, 350);
    return () => clearTimeout(t);
  }, [b, loaded]);

  useEffect(() => {
    setB(load());
    setLoaded(true);
    setLocal(/^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname));
  }, []);

  const random = useCallback(() => {
    setB({
      h: Math.floor(Math.random() * 360),
      c: round(0.12 + Math.random() * 0.1, 3),
      l: round((Math.random() - 0.5) * 0.08, 3),
    });
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
    const css = `--brand-h: ${b.h};\n--brand-c: ${b.c};\n--brand-l-adj: ${b.l};`;
    try {
      await navigator.clipboard.writeText(css);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {}
  };

  const changed = b.h !== DEF.h || b.c !== DEF.c || b.l !== DEF.l;

  const saveToWeb = async () => {
    setSave('busy');
    setSaveMsg('');
    try {
      const files = await makePack();
      const fd = new FormData();
      fd.set('h', String(b.h));
      fd.set('c', String(b.c));
      fd.set('l', String(b.l));
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

  const isPreset = (p: { h: number; c: number; l?: number }) => b.h === p.h && b.c === p.c && b.l === (p.l ?? 0);

  return (
    <aside
      className="cs glass"
      data-open={open || undefined}
      data-save={local && (changed || save !== 'idle') ? '' : undefined}
      aria-label="Color studio"
    >
      <div className="cs__bar">
        <span className="cs__swatch" aria-hidden="true" />
        <label className="cs__hue">
          <span className="sr-only">Primární barva — odstín</span>
          <input
            type="range"
            min={0}
            max={360}
            step={1}
            value={b.h}
            onChange={(e) => setB((p) => ({ ...p, h: +e.target.value }))}
            style={{ background: HUE_TRACK }}
          />
        </label>
        {local && (changed || save !== 'idle') && (
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
          <div className="cs__presets" role="group" aria-label="Předvolby barev">
            {PRESETS.map((p) => (
              <button
                key={p.name}
                type="button"
                className="cs__preset"
                aria-label={p.name}
                title={p.name}
                aria-pressed={isPreset(p)}
                style={{ background: `oklch(0.78 ${p.c} ${p.h})` }}
                onClick={() => setB({ h: p.h, c: p.c, l: p.l ?? 0 })}
              />
            ))}
          </div>

          <label className="cs__row">
            <span>Sytost</span>
            <input
              type="range"
              min={0}
              max={0.26}
              step={0.005}
              value={b.c}
              onChange={(e) => setB((p) => ({ ...p, c: +e.target.value }))}
              style={{ background: `linear-gradient(90deg, oklch(0.78 0 ${b.h}), oklch(0.78 0.26 ${b.h}))` }}
            />
          </label>
          <label className="cs__row">
            <span>Jas</span>
            <input
              type="range"
              min={-0.08}
              max={0.08}
              step={0.005}
              value={b.l}
              onChange={(e) => setB((p) => ({ ...p, l: +e.target.value }))}
              style={{ background: `linear-gradient(90deg, oklch(0.62 ${b.c} ${b.h}), oklch(0.9 ${b.c} ${b.h}))` }}
            />
          </label>

          <div className="cs__actions">
            <button type="button" className="cs__btn" onClick={random} title="Náhodná barva (R)">
              <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
                <rect x="2" y="2" width="12" height="12" rx="3" fill="none" stroke="currentColor" strokeWidth="1.4" />
                <circle cx="5.5" cy="5.5" r="1" fill="currentColor" />
                <circle cx="10.5" cy="10.5" r="1" fill="currentColor" />
                <circle cx="8" cy="8" r="1" fill="currentColor" />
              </svg>
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
          <p className="cs__read num">
            h {b.h} · c {b.c.toFixed(3)} · jas {b.l >= 0 ? '+' : ''}
            {b.l.toFixed(3)}
          </p>
          <p className="cs__hint">
            <kbd>C</kbd> panel · <kbd>R</kbd> náhoda · <kbd>Esc</kbd> zavřít
          </p>
        </div>
      )}
    </aside>
  );
}
