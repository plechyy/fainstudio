import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { COOKIE, SESSION_DAYS, createSessionToken, verifySessionToken } from './admin-auth';

/** Ověření přímo v stránce (proxy.ts je jen první, rychlá kontrola). */
export async function requireAdmin() {
  const store = await cookies();
  if (!verifySessionToken(store.get(COOKIE)?.value)) redirect('/adminlogin');
}

export async function isAdmin() {
  const store = await cookies();
  return verifySessionToken(store.get(COOKIE)?.value);
}

export async function startSession() {
  const store = await cookies();
  store.set(COOKIE, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: SESSION_DAYS * 86_400,
  });
}

export async function endSession() {
  const store = await cookies();
  store.delete(COOKIE);
}
