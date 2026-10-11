import { createHash, createHmac, timingSafeEqual } from 'node:crypto';
import type { NextRequest } from 'next/server';

/*
 * Přihlášení do editoru textů. Heslo a tajný klíč jsou jen v proměnných prostředí
 * (EDIT_PASSWORD, EDIT_SECRET). Když chybí, editor je zavřený pro všechny.
 */

export const COOKIE = 'fain_edit';
export const FLAG = 'fain_edit_on'; // nečitelný údaj o relaci, jen aby klient věděl, že se má zeptat serveru
export const MAX_AGE = 60 * 60 * 12; // 12 hodin

const hmac = (v: string, secret: string) => createHmac('sha256', secret).update(v).digest('hex');
const digest = (v: string) => createHash('sha256').update(v).digest();

export function configured() {
  return Boolean(process.env.EDIT_PASSWORD && process.env.EDIT_SECRET);
}

export function passwordOk(input: string) {
  const pw = process.env.EDIT_PASSWORD;
  if (!pw) return false;
  return timingSafeEqual(digest(input), digest(pw));
}

export function sign() {
  const exp = String(Date.now() + MAX_AGE * 1000);
  return `${exp}.${hmac(exp, process.env.EDIT_SECRET!)}`;
}

export function authed(req: NextRequest) {
  const secret = process.env.EDIT_SECRET;
  const tok = req.cookies.get(COOKIE)?.value;
  if (!secret || !tok) return false;
  const [exp, sig] = tok.split('.');
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  const want = Buffer.from(hmac(exp, secret));
  const got = Buffer.from(sig);
  return want.length === got.length && timingSafeEqual(want, got);
}

/** Požadavek musí přijít ze stejného webu (ochrana proti CSRF navíc k SameSite=strict). */
export function sameOrigin(req: NextRequest) {
  const origin = req.headers.get('origin');
  if (!origin) return false;
  try {
    return new URL(origin).host === req.headers.get('host');
  } catch {
    return false;
  }
}
