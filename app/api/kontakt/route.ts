import { EMAIL } from '@/lib/config';

/*
 * Formulář ze závěrečné karty. Pošle zprávu e-mailem přes Resend (https://resend.com).
 * Potřebuje proměnné prostředí (ve Vercelu: Settings → Environment Variables):
 *   RESEND_API_KEY   povinné, klíč z Resendu
 *   CONTACT_TO       komu zprávy chodí (výchozí: EMAIL z lib/config.ts)
 *   CONTACT_FROM     odesílatel, např. "FainStudio <web@fainstudio.com>" (doména musí být v Resendu ověřená;
 *                    výchozí "FaiN Studio <onboarding@resend.dev>" pošle jen na e-mail majitele účtu Resend)
 * Bez klíče vrací 503 a formulář nabídne e-mail jako náhradu.
 */

const MAX = { name: 120, email: 160, message: 4000 };
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const esc = (v: string) => v.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'bad_request' }, { status: 400 });
  }

  // past na roboty: lidé toto pole nevidí a nevyplní
  if (typeof body.web === 'string' && body.web.trim() !== '') return Response.json({ ok: true });

  const name = String(body.name ?? '').trim();
  const email = String(body.email ?? '').trim();
  const message = String(body.message ?? '').trim();

  if (!name || name.length > MAX.name) return Response.json({ error: 'name' }, { status: 422 });
  if (!isEmail(email) || email.length > MAX.email) return Response.json({ error: 'email' }, { status: 422 });
  if (message.length > MAX.message) return Response.json({ error: 'message' }, { status: 422 });

  const key = process.env.RESEND_API_KEY;
  if (!key) return Response.json({ error: 'not_configured' }, { status: 503 });

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM || 'FaiN Studio <onboarding@resend.dev>',
      to: [process.env.CONTACT_TO || EMAIL],
      reply_to: email,
      subject: `Web: zpráva od ${name}`,
      text: `Jméno: ${name}\nE-mail: ${email}\n\n${message || '(bez zprávy)'}`,
      html: `<p><b>Jméno:</b> ${esc(name)}<br><b>E-mail:</b> ${esc(email)}</p><p>${esc(message || '(bez zprávy)').replace(/\n/g, '<br>')}</p>`,
    }),
  });

  if (!res.ok) return Response.json({ error: 'send_failed' }, { status: 502 });
  return Response.json({ ok: true });
}
