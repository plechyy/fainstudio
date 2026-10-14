'use client';

/*
 * Dočasný přepínač variant sekce „Systémy“. Výběr se drží v localStorage a dá se
 * vynutit odkazem (?sys=b). Až si jednu variantu vybereme, zbytek i tenhle soubor zmizí.
 */

export type SysVariant = 'now' | 'a' | 'b' | 'c' | 'd';

export const VARIANTS: { id: SysVariant; label: string; note: string }[] = [
  { id: 'now', label: 'Teď', note: 'Současná sekce s vodiči' },
  { id: 'a', label: 'A', note: 'Výstupy — všech šest vedle sebe' },
  { id: 'b', label: 'B', note: 'Rejstřík — seznam, který se otevírá' },
  { id: 'c', label: 'C', note: 'Dílna — jeden výstup přes celou šířku' },
  { id: 'd', label: 'D', note: 'Posuv — výstup se mění při scrollu' },
];

const KEY = 'sys-variant';
const DEF: SysVariant = 'a';
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
