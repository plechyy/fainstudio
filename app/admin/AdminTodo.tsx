'use client';

import { useEffect, useMemo, useState } from 'react';

/*
 * To do list pro web. Odškrtávání a vlastní úkoly se ukládají jen v tomhle prohlížeči (localStorage),
 * na server se nic neposílá. Výchozí úkoly jsou z auditu: to, co zbývá k 9/10 ve všech oblastech.
 */

type Item = { id: string; t: string };
const GROUPS: { id: string; name: string; from: string; items: Item[] }[] = [
  {
    id: 'visitor',
    name: 'Návštěvník',
    from: '7 → 9',
    items: [
      { id: 'logos', t: 'Skutečná loga klientů se souhlasem (jinak pás log odstranit)' },
      { id: 'photo', t: 'Fotka do sekce „O nás“ (teď je tam zástupný rámeček)' },
      { id: 'case', t: 'Jedna skutečná případovka: co bylo ručně, co dělá systém, kolik hodin týdně odpadlo' },
      { id: 'form', t: 'Ověřit formulář: RESEND_API_KEY, CONTACT_TO, CONTACT_FROM ve Vercelu a poslat zkušební zprávu' },
    ],
  },
  {
    id: 'copy',
    name: 'Copywriter',
    from: '8,5 → 9',
    items: [
      { id: 'nums', t: 'Zmírnit „až 90 %“ a „Ihned“ na věci, které jdou doložit' },
      { id: 'proof', t: 'Čísla v Přínosech podložit případovkou' },
    ],
  },
  {
    id: 'design',
    name: 'Designér',
    from: '8,5 → 9',
    items: [
      { id: 'icon', t: 'Nová ikona webu a aplikační ikona ve fialové (teď béžový kouř ze staré palety)' },
      { id: 'smoke', t: 'Ztlumit kouř pod textem: tabulka srovnání a závěrečná karta na mobilu' },
      { id: 'mark', t: 'Symbol značky pro malé velikosti (monogram nebo „F“) do ikony, sítí a Google profilu' },
    ],
  },
  {
    id: 'rival',
    name: 'Konkurent',
    from: '6,5 → 9',
    items: [
      { id: 'refs', t: 'Skutečné reference a první recenze' },
      { id: 'gbp', t: 'Google Business Profile (název FaiN Studio, kategorie Softwarová společnost, oblast Česko)' },
      { id: 'linkedin', t: 'LinkedIn firmy a odkaz do patičky' },
      { id: 'faq', t: 'FAQ „Co když s vámi skončíme?“ (předání, dokumentace, přístupy)' },
      { id: 'legal', t: 'Sjednotit adresu v zásadách a doplnit živnost pro IT služby v rejstříku' },
    ],
  },
];

const COLORS: Record<string, string> = { visitor: 'oklch(0.58 0.2 324)', copy: 'oklch(0.62 0.2 352)', design: '#0d9488', rival: '#d97706' };

const KEY = 'fs-admin-todo-v1';
type Saved = { done: Record<string, boolean>; custom: { id: string; t: string; done: boolean }[] };

export default function AdminTodo() {
  const [saved, setSaved] = useState<Saved>({ done: {}, custom: [] });
  const [ready, setReady] = useState(false);
  const [draft, setDraft] = useState('');

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setSaved(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(saved));
    } catch {}
  }, [saved, ready]);

  const toggle = (id: string) => setSaved((s) => ({ ...s, done: { ...s.done, [id]: !s.done[id] } }));
  const toggleCustom = (id: string) =>
    setSaved((s) => ({ ...s, custom: s.custom.map((c) => (c.id === id ? { ...c, done: !c.done } : c)) }));
  const removeCustom = (id: string) => setSaved((s) => ({ ...s, custom: s.custom.filter((c) => c.id !== id) }));
  const add = (e: React.FormEvent) => {
    e.preventDefault();
    const t = draft.trim();
    if (!t) return;
    setSaved((s) => ({ ...s, custom: [...s.custom, { id: `c${Date.now()}`, t: t.slice(0, 200), done: false }] }));
    setDraft('');
  };

  const stats = useMemo(() => {
    const base = GROUPS.flatMap((g) => g.items);
    const total = base.length + saved.custom.length;
    const done = base.filter((i) => saved.done[i.id]).length + saved.custom.filter((c) => c.done).length;
    return { total, done };
  }, [saved]);

  const pct = stats.total ? Math.round((stats.done / stats.total) * 100) : 0;

  return (
    <section className="td" aria-labelledby="td-title">
      <header className="adm__head">
        <div>
          <h1 className="adm__title" id="td-title">
            To do
          </h1>
          <p className="adm__sub">Co zbývá, aby web byl na 9/10.</p>
        </div>
      </header>

      <div className="adm__stats">
        <div className="st__card">
          <span>Hotovo</span>
          <b>{stats.done}</b>
        </div>
        <div className="st__card">
          <span>Zbývá</span>
          <b>{stats.total - stats.done}</b>
        </div>
        <div className="st__card">
          <span>Postup</span>
          <b>
            {pct}
            <small>%</small>
          </b>
          <span className="td__bar" aria-hidden="true">
            <i style={{ width: `${pct}%` }} />
          </span>
        </div>
      </div>

      <div className="td__grid">
        {GROUPS.map((g) => {
          const done = g.items.filter((i) => saved.done[i.id]).length;
          return (
            <div className="td__card" key={g.id} style={{ ['--g' as string]: COLORS[g.id] }}>
              <h3 className="td__gh">
                {g.name}
                <small>
                  {g.from} · {done}/{g.items.length}
                </small>
              </h3>
              <ul>
                {g.items.map((i) => (
                  <li key={i.id}>
                    <label className={saved.done[i.id] ? 'is-done' : ''}>
                      <input type="checkbox" checked={Boolean(saved.done[i.id])} onChange={() => toggle(i.id)} />
                      <span>{i.t}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}

        <div className="td__card">
          <h3 className="td__gh">
            Vlastní úkoly<small>{saved.custom.filter((c) => c.done).length}/{saved.custom.length}</small>
          </h3>
          <ul>
            {saved.custom.map((c) => (
              <li key={c.id} className="td__own">
                <label className={c.done ? 'is-done' : ''}>
                  <input type="checkbox" checked={c.done} onChange={() => toggleCustom(c.id)} />
                  <span>{c.t}</span>
                </label>
                <button type="button" className="td__x" onClick={() => removeCustom(c.id)} aria-label="Smazat úkol">
                  ×
                </button>
              </li>
            ))}
          </ul>
          <form className="td__add" onSubmit={add}>
            <input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Přidat úkol…" maxLength={200} aria-label="Nový úkol" />
            <button type="submit">Přidat</button>
          </form>
        </div>
      </div>
      <p className="td__note">Odškrtnutí se ukládá jen v tomto prohlížeči.</p>
    </section>
  );
}
