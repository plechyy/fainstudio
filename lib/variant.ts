'use client';

/*
 * Dočasný přepínač variant sekce „Systémy“. Výběr se drží v localStorage a dá se
 * vynutit odkazem (?sys=b). Až si jednu variantu vybereme, zbytek i tenhle soubor zmizí.
 */

export type SysVariant = 'now' | 'c' | 'p';

export const VARIANTS: { id: SysVariant; label: string; note: string }[] = [
  { id: 'now', label: 'Teď', note: 'Původní sekce s vodiči' },
  { id: 'c', label: 'C', note: 'Dílna — jména nahoře, jeden vizuál' },
  { id: 'p', label: 'P', note: 'Původní rozvržení, bez čísel a vodičů' },
];

const KEY = 'sys-variant';
const DEF: SysVariant = 'c';
const isVariant = (v: unknown): v is SysVariant => VARIANTS.some((x) => x.id === v);

let current: SysVariant = DEF;
const subs = new Set<() => void>();

export const getVariant = () => current;
export const getServerVariant = () => DEF;

export function setVariant(v: SysVariant) {
  if (v === current) return;
  current = v;
  try {
    localStorage.setItem(KEY, v);
  } catch {}
  subs.forEach((f) => f());
}

export function subscribeVariant(f: () => void) {
  subs.add(f);
  return () => {
    subs.delete(f);
  };
}

/** Jednorázové načtení z URL / localStorage po mountu. */
export function restoreVariant() {
  let v: string | null = null;
  try {
    v = new URLSearchParams(location.search).get('sys') || localStorage.getItem(KEY);
  } catch {}
  if (isVariant(v)) setVariant(v);
}
