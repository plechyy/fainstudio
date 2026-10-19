/*
 * Přihlášení do administrace (/adminlogin → /admin). Jen na serveru.
 *
 * Bez databáze: přihlašovací údaje jsou v proměnných prostředí, relace je podepsaná cookie.
 *   ADMIN_EMAIL          přihlašovací e-mail
 *   ADMIN_PASSWORD_HASH  hash hesla (vyrobí ho `node scripts/admin-hash.mjs`), heslo se nikde neukládá
 *   ADMIN_SESSION_SECRET dlouhý náhodný řetězec pro podpis cookie (vyrobí ho stejný skript)
 * Nastavit v .env.local a ve Vercelu (Settings → Environment Variables).
 */
import { createHmac, scryptSync, timingSafeEqual } from 'node:crypto';

export const COOKIE = 'fs_admin';
export const SESSION_DAYS = 7;

const b64 = (b: Buffer | string) => Buffer.from(b).toString('base64url');

function safeEqual(a: string, b: string) {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

export function adminConfigured() {
  return Boolean(process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD_HASH && (process.env.ADMIN_SESSION_SECRET || '').length >= 32);
}

/** Hash ve tvaru scrypt:N:r:p:sůl:hash (hex; dvojtečky, protože $ by v .env souborech rozbilo rozbalování proměnných). Vždy se spočítá i při špatném e-mailu, ať se čas neliší. */
export function checkCredentials(email: string, password: string) {
  const wantEmail = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
  const stored = process.env.ADMIN_PASSWORD_HASH || '';
  const [scheme, N, r, p, salt, hash] = stored.split(':');
  let passOk = false;
  if (scheme === 'scrypt' && salt && hash) {
    try {
      const got = scryptSync(password, Buffer.from(salt, 'hex'), hash.length / 2, { N: +N, r: +r, p: +p, maxmem: 128 * 1024 * 1024 });
      passOk = timingSafeEqual(got, Buffer.from(hash, 'hex'));
    } catch {
      passOk = false;
    }
  } else {
    // hash chybí nebo je špatný: stejně chvíli počítat, ať se nedá poznat stav konfigurace
    scryptSync(password, 'x', 32);
  }
  const mailOk = safeEqual(email.trim().toLowerCase(), wantEmail);
  return passOk && mailOk && adminConfigured();
}

function sign(payload: string) {
  return createHmac('sha256', process.env.ADMIN_SESSION_SECRET || '').update(payload).digest('base64url');
}

export function createSessionToken() {
  const payload = b64(JSON.stringify({ sub: 'admin', exp: Date.now() + SESSION_DAYS * 86_400_000 }));
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token?: string | null) {
  if (!token || !adminConfigured()) return false;
  const [payload, sig] = token.split('.');
  if (!payload || !sig || !safeEqual(sig, sign(payload))) return false;
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString());
    return data.sub === 'admin' && typeof data.exp === 'number' && data.exp > Date.now();
  } catch {
    return false;
  }
}
