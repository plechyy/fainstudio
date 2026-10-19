import { cookies } from 'next/headers';
import { COOKIE, verifySessionToken } from '@/lib/admin-auth';
import { cleanName, contentType, isCat, isInline, readStored } from '@/lib/admin-files';

/*
 * Stažení souboru z administrace. Bez platného přihlášení vrací 404 (nezjistí se ani, že soubor existuje).
 * Soubory se nikdy necachují a nezobrazují se jinde než v prohlížeči přihlášeného správce.
 */
const hidden = () => new Response('Not found', { status: 404, headers: { 'Cache-Control': 'no-store' } });

export async function GET(_req: Request, ctx: { params: Promise<{ cat: string; name: string }> }) {
  const store = await cookies();
  if (!verifySessionToken(store.get(COOKIE)?.value)) return hidden();

  const { cat, name: raw } = await ctx.params;
  const name = cleanName(decodeURIComponent(raw));
  if (!isCat(cat) || !name || name !== decodeURIComponent(raw)) return hidden();

  const file = await readStored(cat, name);
  if (!file) return hidden();

  const disp = isInline(name) ? 'inline' : 'attachment';
  const body = (file.body instanceof Uint8Array ? new Uint8Array(file.body) : file.body) as BodyInit;
  return new Response(body, {
    headers: {
      'Content-Type': contentType(name),
      'Content-Length': String(file.size),
      'Content-Disposition': `${disp}; filename*=UTF-8''${encodeURIComponent(name)}`,
      'Cache-Control': 'private, no-store, max-age=0',
      'X-Content-Type-Options': 'nosniff',
      'X-Robots-Tag': 'noindex, nofollow, noarchive',
      'Content-Security-Policy': "default-src 'none'; img-src 'self' data:; style-src 'unsafe-inline'; sandbox",
    },
  });
}
