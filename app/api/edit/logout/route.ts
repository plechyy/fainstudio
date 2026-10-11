import { NextRequest, NextResponse } from 'next/server';
import { COOKIE, FLAG, sameOrigin } from '@/lib/editAuth';

export async function POST(req: NextRequest) {
  if (!sameOrigin(req)) return NextResponse.json({ ok: false }, { status: 403 });
  const res = NextResponse.json({ ok: true });
  res.cookies.set({ name: COOKIE, value: '', path: '/', maxAge: 0 });
  res.cookies.set({ name: FLAG, value: '', path: '/', maxAge: 0 });
  return res;
}
