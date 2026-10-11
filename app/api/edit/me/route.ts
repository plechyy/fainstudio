import { NextRequest, NextResponse } from 'next/server';
import { authed } from '@/lib/editAuth';

export async function GET(req: NextRequest) {
  return NextResponse.json({ ok: authed(req) }, { headers: { 'Cache-Control': 'no-store' } });
}
