'use client';

import { useState } from 'react';
import { EMAIL, PRIVACY_URL } from '@/lib/config';

type State = 'idle' | 'sending' | 'ok' | 'error';

/*
 * Formulář v závěrečné kartě. Posílá na /api/kontakt (viz app/api/kontakt/route.ts).
 * Když odeslání selže (třeba server ještě nemá klíč k e-mailu), nabídne e-mail jako náhradu
 * s už předvyplněnou zprávou, takže se nic neztratí.
 */
export default function ContactForm() {
  const [state, setState] = useState<State>('idle');
  const [fields, setFields] = useState({ name: '', email: '', phone: '', message: '', web: '' });

  const set = (k: keyof typeof fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFields((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state === 'sending') return;
    setState('sending');
    try {
      const res = await fetch('/api/kontakt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      });
      setState(res.ok ? 'ok' : 'error');
    } catch {
      setState('error');
    }
  };

  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent('Chci to u nás')}&body=${encodeURIComponent(
    `${fields.message}\n\n${fields.name}${fields.email ? ` (${fields.email})` : ''}${fields.phone ? `, tel. ${fields.phone}` : ''}`,
  )}`;

  if (state === 'ok') {
    return (
      <div className="cf cf--done" role="status">
        <p className="cf__done-t">Dorazilo. Díky.</p>
        <p className="cf__done-d">Ozveme se vám na {fields.email}. Mezitím můžete klidně přemýšlet, co všechno by za vás mohl dělat systém.</p>
      </div>
    );
  }

  return (
    <form className="cf" onSubmit={onSubmit} noValidate={false} aria-label="Napište nám">
      <label className="cf__f">
        <span>Jméno</span>
        <input type="text" name="name" autoComplete="name" required maxLength={120} placeholder="Jan Novák" value={fields.name} onChange={set('name')} />
      </label>
      <label className="cf__f">
        <span>E-mail</span>
        <input type="email" name="email" autoComplete="email" required maxLength={160} placeholder="jan@firma.cz" value={fields.email} onChange={set('email')} />
      </label>
      <label className="cf__f">
        <span>
          Telefon <small>(nepovinné)</small>
        </span>
        <input type="tel" name="phone" autoComplete="tel" inputMode="tel" maxLength={32} placeholder="+420 777 123 456" value={fields.phone} onChange={set('phone')} />
      </label>
      <label className="cf__f">
        <span>Co by za vás měl dělat systém?</span>
        <textarea name="message" rows={4} maxLength={4000} placeholder="Stačí pár vět. Když nevíte, napište, co vás ve firmě zdržuje nejvíc." value={fields.message} onChange={set('message')} />
      </label>
      {/* past na roboty */}
      <label className="cf__trap" aria-hidden="true">
        Web
        <input type="text" name="web" tabIndex={-1} autoComplete="off" value={fields.web} onChange={set('web')} />
      </label>

      <button className="btn btn--primary btn--white cf__send" type="submit" disabled={state === 'sending'}>
        {state === 'sending' ? 'Odesílám…' : 'Chci to u nás'}
      </button>

      {state === 'error' && (
        <p className="cf__err" role="alert">
          Odeslání se nepovedlo. Napište nám to prosím <a href={mailto}>e-mailem</a>, zpráva už je v něm připravená.
        </p>
      )}
      <p className="cf__note">
        Raději mailem? Pište na <a href={`mailto:${EMAIL}`}>{EMAIL}</a>. Údaje použijeme jen na odpověď, <a href={PRIVACY_URL}>více v zásadách</a>.
      </p>
    </form>
  );
}
