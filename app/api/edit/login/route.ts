import { NextRequest, NextResponse } from 'next/server';
import { COOKIE, FLAG, MAX_AGE, configured, passwordOk, sameOrigin, sign } from '@/lib/editAuth';

export async function POST(req: NextRequest) {
  if (!sameOrigin(req)) return NextResponse.json({ ok: false }, { status: 403 });
  if (!configured()) return NextResponse.json({ ok: false, error: 'Editor není nastavený.' }, { status: 503 });

  const body = (await req.json().catch(() => null)) as { password?: string } | null;
  if (!body?.password || !passwordOk(body.password)) {
    await new Promise((r) => setTimeout(r, 800)); // zpomalí hádání hesla
    return NextResponse.json({ ok: false, error: 'Špatné heslo.' }, { status: 401 });
  }

  const secure = process.env.NODE_ENV === 'production';
  const res = NextResponse.json({ ok: true });
  res.cookies.set({ name: COOKIE, value: sign(), httpOnly: true, secure, sameSite: 'strict', path: '/', maxAge: MAX_AGE });
  res.cookies.set({ name: FLAG, value: '1', httpOnly: false, secure, sameSite: 'strict', path: '/', maxAge: MAX_AGE });
  return res;
}
