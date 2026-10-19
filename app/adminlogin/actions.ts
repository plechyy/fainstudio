'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { adminConfigured, checkCredentials } from '@/lib/admin-auth';
import { endSession, startSession } from '@/lib/admin-session';

export type LoginState = { error?: string; email?: string };

/* Omezení pokusů podle IP. Paměť instance, takže na serverless je to jen první zábrana,
   skutečnou ochranu dělá silné heslo a pomalý hash. */
const fails = new Map<string, { n: number; until: number }>();
const LIMIT = 5;
const WINDOW = 15 * 60_000;

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function login(_prev: LoginState, form: FormData): Promise<LoginState> {
  const h = await headers();
  const ip = (h.get('x-forwarded-for') || h.get('x-real-ip') || 'neznama').split(',')[0].trim();
  const now = Date.now();
  const rec = fails.get(ip);
  if (rec && rec.until > now && rec.n >= LIMIT) {
    return { error: 'Příliš mnoho pokusů. Zkuste to za chvíli.' };
  }

  if (!adminConfigured()) {
    return { error: 'Přihlášení zatím není nastavené (chybí proměnné prostředí ADMIN_*).' };
  }

  const email = String(form.get('email') || '').slice(0, 200);
  const password = String(form.get('password') || '').slice(0, 200);

  if (!checkCredentials(email, password)) {
    const cur = rec && rec.until > now ? rec : { n: 0, until: now + WINDOW };
    fails.set(ip, { n: cur.n + 1, until: cur.until });
    await wait(700);
    return { error: 'Nesprávný e-mail nebo heslo.', email };
  }

  fails.delete(ip);
  await startSession();
  redirect('/admin');
}

export async function logout() {
  await endSession();
  redirect('/adminlogin');
}
