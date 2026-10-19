import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { COOKIE, verifySessionToken } from '@/lib/admin-auth';

/* Rychlá kontrola před vykreslením: bez platné relace se z /admin jde rovnou na přihlášení.
   Stránky si relaci ověřují znovu samy (lib/admin-session.ts), tohle je jen první zábrana. */
export function proxy(request: NextRequest) {
  if (!verifySessionToken(request.cookies.get(COOKIE)?.value)) {
    return NextResponse.redirect(new URL('/adminlogin', request.url));
  }
  const res = NextResponse.next();
  res.headers.set('Cache-Control', 'no-store');
  return res;
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
