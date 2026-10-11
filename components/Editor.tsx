'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/*
 * Editor textů přímo na stránce. Pro návštěvníky se nic nenačte: panel se objeví jen na
 * adrese s ?edit, nebo když je v prohlížeči cookie přihlášené relace. Přihlášení i uložení
 * řeší server (/api/edit/*), tady je jen úprava textu a odeslání změn.
 */

type Phase = 'off' | 'login' | 'on';
type Saved = { ok: boolean; text: string };

// co se nikdy needituje (UI prvky, skrytý text, ozdoby)
const SKIP = '.editor, .cs, .loader, .logo, script, style, noscript, svg, [aria-hidden="true"], .sr-only';

const own = (el: Element) =>
  Array.from(el.childNodes)
    .filter((n) => n.nodeType === Node.TEXT_NODE)
    .map((n) => n.textContent ?? '')
    .join('')
    .replace(/\s+/g, ' ')
    .trim();

function isCandidate(el: Element) {
  if (el.closest(SKIP)) return false;
  const texts = Array.from(el.childNodes).filter((n) => n.nodeType === Node.TEXT_NODE && (n.textContent ?? '').trim());
  if (texts.length !== 1) return false;
  // děti smí být jen ozdoby (šipka, ikona, skrytý text), jinak by se text míchal s cizím prvkem
  return Array.from(el.children).every((c) => c.matches(SKIP) || !(c.textContent ?? '').trim());
}

export default function Editor() {
  const [phase, setPhase] = useState<Phase>('off');
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const [count, setCount] = useState(0);
  const [msg, setMsg] = useState<Saved | null>(null);
  const changes = useRef(new Map<string, string>()); // původní text → nový text

  // ── zjistit, jestli se má editor vůbec ukázat ───────────────────────
  useEffect(() => {
    const wants = location.search.includes('edit') || document.cookie.includes('fain_edit_on=1');
    if (!wants) return;
    fetch('/api/edit/me', { cache: 'no-store' })
      .then((r) => r.json())
      .then((j: { ok: boolean }) => setPhase(j.ok ? 'on' : location.search.includes('edit') ? 'login' : 'off'))
      .catch(() => {});
  }, []);

  // ── zapnout úpravy ──────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== 'on') return;
    const root = document.documentElement;
    root.classList.add('is-editing');

    const mark = () => {
      document.querySelectorAll<HTMLElement>('main *, footer *, header.nav *').forEach((el) => {
        if (el.dataset.editOrig !== undefined || el.dataset.editWrap !== undefined) return;
        if (!isCandidate(el)) return;
        let target = el;
        // tlačítka s ozdobou (šipka, kouř): upravuje se jen obalený text, ne celý odkaz,
        // jinak Ctrl+A zachytí i ozdoby a text se rozpadne
        if (el.children.length) {
          const tn = Array.from(el.childNodes).find((n) => n.nodeType === Node.TEXT_NODE && (n.textContent ?? '').trim());
          if (!tn) return;
          const w = document.createElement('span');
          w.dataset.editWrap = '';
          el.insertBefore(w, tn);
          w.appendChild(tn);
          target = w;
        }
        target.dataset.editOrig = own(target);
        target.contentEditable = 'plaintext-only';
        if (target.contentEditable !== 'plaintext-only') target.contentEditable = 'true';
        target.spellcheck = true;
      });
    };
    mark();
    let t: ReturnType<typeof setTimeout>;
    const mo = new MutationObserver(() => {
      clearTimeout(t);
      t = setTimeout(mark, 120);
    });
    mo.observe(document.body, { childList: true, subtree: true });

    const onInput = (e: Event) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-edit-orig]');
      if (!el) return;
      const o = el.dataset.editOrig!;
      let n = own(el);
      if (!o.includes(' ')) n = n.replace(/ /g, ' ');
      if (n === o || !n) changes.current.delete(o);
      else changes.current.set(o, n);
      setCount(changes.current.size);
      setMsg(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && (e.target as HTMLElement).closest('[data-edit-orig]')) {
        e.preventDefault();
        (e.target as HTMLElement).blur();
      }
    };
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a');
      if (a && !a.closest('.editor')) e.preventDefault(); // odkazy při úpravách nenavigují
    };
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      if (changes.current.size) e.preventDefault();
    };
    document.addEventListener('input', onInput, true);
    document.addEventListener('keydown', onKey, true);
    document.addEventListener('click', onClick, true);
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => {
      mo.disconnect();
      document.removeEventListener('input', onInput, true);
      document.removeEventListener('keydown', onKey, true);
      document.removeEventListener('click', onClick, true);
      window.removeEventListener('beforeunload', onBeforeUnload);
      root.classList.remove('is-editing');
    };
  }, [phase]);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErr('');
    const r = await fetch('/api/edit/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pw }),
    }).catch(() => null);
    const j = r ? ((await r.json().catch(() => ({}))) as { ok?: boolean; error?: string }) : {};
    setBusy(false);
    if (j.ok) {
      setPw('');
      setPhase('on');
    } else setErr(j.error || 'Přihlášení se nepovedlo.');
  };

  const save = useCallback(async () => {
    if (!changes.current.size) return;
    setBusy(true);
    setMsg(null);
    const list = Array.from(changes.current, ([o, n]) => ({ o, n }));
    const r = await fetch('/api/edit/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ changes: list }),
    }).catch(() => null);
    const j = r
      ? ((await r.json().catch(() => ({}))) as {
          ok?: boolean;
          error?: string;
          results?: { o: string; n: string; count: number; error?: string }[];
        })
      : {};
    setBusy(false);
    if (!j.ok) {
      setMsg({ ok: false, text: j.error || 'Uložení se nepovedlo.' });
      return;
    }
    const failed = (j.results ?? []).filter((x) => x.error);
    for (const x of j.results ?? []) {
      if (x.error) continue;
      changes.current.delete(x.o);
      document.querySelectorAll<HTMLElement>('[data-edit-orig]').forEach((el) => {
        if (el.dataset.editOrig === x.o) el.dataset.editOrig = x.n;
      });
    }
    setCount(changes.current.size);
    setMsg(
      failed.length
        ? { ok: false, text: `Neuloženo ${failed.length}: „${failed[0].o.slice(0, 40)}…“ – ${failed[0].error}` }
        : { ok: true, text: 'Uloženo. Web se za chvíli přenasadí.' },
    );
  }, []);

  const logout = async () => {
    await fetch('/api/edit/logout', { method: 'POST' }).catch(() => {});
    changes.current.clear();
    location.href = location.pathname;
  };

  if (phase === 'off') return null;

  if (phase === 'login') {
    return (
      <form className="editor editor--login" onSubmit={login}>
        <label className="editor__label" htmlFor="editor-pw">
          Editor textů
        </label>
        <input
          id="editor-pw"
          className="editor__input"
          type="password"
          autoComplete="current-password"
          placeholder="Heslo"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          autoFocus
        />
        <button className="editor__btn editor__btn--go" type="submit" disabled={busy || !pw}>
          Přihlásit
        </button>
        {err && <p className="editor__msg editor__msg--bad">{err}</p>}
      </form>
    );
  }

  return (
    <div className="editor" role="region" aria-label="Editor textů">
      <span className="editor__label">Editor textů</span>
      <span className="editor__hint">Klikni na text a přepiš ho.</span>
      <button className="editor__btn editor__btn--go" type="button" onClick={save} disabled={busy || !count}>
        {busy ? 'Ukládám…' : count ? `Uložit (${count})` : 'Uložit'}
      </button>
      <button className="editor__btn" type="button" onClick={() => location.reload()} disabled={busy || !count}>
        Zahodit
      </button>
      <button className="editor__btn" type="button" onClick={logout}>
        Odhlásit
      </button>
      {msg && (
        <p className={`editor__msg ${msg.ok ? 'editor__msg--ok' : 'editor__msg--bad'}`} role="status">
          {msg.text}
        </p>
      )}
    </div>
  );
}
