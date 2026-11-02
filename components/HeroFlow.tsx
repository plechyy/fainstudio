'use client';

import { ico, Svg } from './systems/live/scene';
import { STAR_D, STAR_STROKE } from '@/lib/star';

/*
 * Pozadí hera: pás běžné firemní práce, který jede zleva doprava a projde zlatou hvězdou (značka FaiN).
 * Vlevo od hvězdy je práce ruční: šedé, nakřivo pohozené lístky s pracovními názvy.
 * Vpravo od hvězdy vyjíždí ta samá práce hotová: rovně, se zlatou fajfkou a výsledkem.
 * Obě vrstvy jedou stejně rychle a každá je oříznutá na svou polovinu, takže se lístek „přepne“
 * přesně ve chvíli, kdy projde hvězdou. Jen obrázek, čtečky ho přeskočí.
 */

type Task = { i: keyof typeof ico; raw: string; done: string };

const ROW_A: Task[] = [
  { i: 'mail', raw: 'Re: Re: poptávka na web', done: 'Poptávka zodpovězena' },
  { i: 'invoice', raw: 'faktura_final_v3.pdf', done: 'Faktura zaúčtovaná' },
  { i: 'table', raw: 'dochazka_rijen.xlsx', done: 'Docházka spočítaná' },
  { i: 'chat', raw: 'Kdy mi to dorazí?', done: 'Zákazník má odpověď' },
  { i: 'approve', raw: 'Schválit dovolenou', done: 'Schváleno' },
];
const ROW_B: Task[] = [
  { i: 'cal', raw: 'Domluvit schůzku…', done: 'Termín v kalendáři' },
  { i: 'pen', raw: 'Smlouva ke kontrole', done: 'Smlouva zkontrolovaná' },
  { i: 'board', raw: 'Objednávka po telefonu', done: 'Objednávka v systému' },
  { i: 'search', raw: 'Pohlídat ceny konkurence', done: 'Přehled v mailu' },
  { i: 'folder', raw: 'Najít loňskou nabídku', done: 'Nalezeno za 2 s' },
];

function Row({ tasks, done, slow }: { tasks: Task[]; done?: boolean; slow?: boolean }) {
  // seznam čtyřikrát za sebou: pás posouvá o polovinu (dvě sady), takže je vždy plný i na širokém displeji a jede dokola bez švu
  const all = [...tasks, ...tasks, ...tasks, ...tasks];
  return (
    <div className={`hf__row${slow ? ' hf__row--slow' : ''}`}>
      {all.map((t, k) => (
        <span className="hf__chip" key={k} data-k={k % tasks.length}>
          {done ? (
            <span className="hf__tick">
              <Svg>{ico.check}</Svg>
            </span>
          ) : (
            <span className="hf__ico">
              <Svg>{ico[t.i]}</Svg>
            </span>
          )}
          {done ? t.done : t.raw}
        </span>
      ))}
    </div>
  );
}

export default function HeroFlow() {
  return (
    <div className="hf" aria-hidden="true">
      <div className="hf__layer hf__layer--raw">
        <Row tasks={ROW_A} />
        <Row tasks={ROW_B} slow />
      </div>
      <div className="hf__layer hf__layer--done">
        <Row tasks={ROW_A} done />
        <Row tasks={ROW_B} done slow />
      </div>
      <svg className="hf__star" viewBox="-6 -6 112 112">
        <path d={STAR_D} strokeWidth={STAR_STROKE} strokeLinejoin="round" />
      </svg>
    </div>
  );
}
