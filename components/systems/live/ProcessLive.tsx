'use client';

import { Cursor, ico, Layer, Scene, Svg, Toast, useLoop } from './scene';

/*
 * Procesy: objednávka projde čtyřmi kroky sama, na schválení se zastaví,
 * kurzor klikne „Schválit“ a faktura odejde.
 *
 * Fáze: 0 mail · 1 tabulka · 2 čeká na vás · 3 kurzor jede · 4 klik
 *       5 faktura · 6 hotovo · 7 doznění před dalším kolem
 */
const DUR = [1100, 1100, 900, 950, 380, 1100, 3000, 450];
const DONE = 6;
const FILL = [0, 33.3, 66.6, 66.6, 66.6, 84, 100, 100];

type St = 'pending' | 'run' | 'wait' | 'done';

function stateOf(step: number, s: number): St {
  if (step === 0) return s === 0 ? 'run' : 'done';
  if (step === 1) return s < 1 ? 'pending' : s === 1 ? 'run' : 'done';
  if (step === 2) return s < 2 ? 'pending' : s <= 4 ? 'wait' : 'done';
  return s < 5 ? 'pending' : s === 5 ? 'run' : 'done';
}

const steps = [
  { ico: ico.mail, t: 'Přišla objednávka', d: 'Kovo Brno · 120 ks', time: '8:41' },
  { ico: ico.table, t: 'Zápis do tabulky', d: 'Objednávky 2026 · řádek 214', time: '8:41' },
  { ico: ico.approve, t: 'Schválení', d: 'Částka nad 40 000 Kč', time: '8:43' },
  { ico: ico.invoice, t: 'Faktura odeslána', d: 'FV 2026114 · 48 300 Kč', time: '8:43' },
];

export default function ProcessLive() {
  const { s, ref } = useLoop(DUR, DONE);

  const foot =
    s >= DONE
      ? { text: 'Hotovo za 2 minuty. Klikli jste jednou.', done: true }
      : s >= 2 && s <= 4
        ? { text: 'Čeká na jeden klik od vás', done: false }
        : { text: `Běží samo · krok ${s === 5 ? 4 : s + 1} ze 4`, done: false };

  return (
    <Scene sceneRef={ref} className={`sc--proc${s === 7 ? ' is-out' : ''}`}>
      <Layer z={-90} className="sc__ghost" />

      <div className="win pw">
        <div className="win__bar">
          <span className="win__dots" />
          <b className="win__name">Objednávky z webu</b>
          <span className="win__live">Běží</span>
        </div>

        <ol className="pw__steps">
          <li className="pw__rail" aria-hidden="true">
            <i style={{ height: `${s === 7 ? 100 : FILL[s]}%` }} />
          </li>
          {steps.map((st, i) => {
            const state = stateOf(i, s);
            return (
              <li className={`pw__step is-${state}`} key={st.t}>
                <span className="pw__ico">
                  <Svg>{st.ico}</Svg>
                </span>
                <span>
                  <b className="pw__t">{st.t}</b>
                  <span className="pw__d">{st.d}</span>
                </span>
                <span className="pw__st">
                  {state === 'run' && <i className="sc-spin" />}
                  {state === 'done' && (
                    <>
                      <Svg className="sc-ok">{ico.check}</Svg>
                      <span className="num">{st.time}</span>
                    </>
                  )}
                  {state === 'wait' && <span className={`sc-btn${s === 4 ? ' is-press' : ''}`}>Schválit</span>}
                  {i === 2 && <Cursor state={s === 3 ? 'in' : s === 4 ? 'click' : 'off'} />}
                </span>
              </li>
            );
          })}
        </ol>

        <p className={`win__foot${foot.done ? ' is-done' : ''}`}>{foot.text}</p>
      </div>

      <Layer z={110} className="pw__toast">
        <Toast show={s === DONE} icon={ico.mail} title="Faktura odešla zákazníkovi" sub="Kovo Brno · FV 2026114.pdf" />
      </Layer>
    </Scene>
  );
}
