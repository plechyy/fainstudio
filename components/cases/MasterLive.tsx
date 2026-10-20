'use client';

import { ico, Layer, Scene, Svg, useLoop, useTyped } from '../systems/live/scene';
import type { CaseVisual } from './types';

/*
 * Know-how mistra. Okno asistenta v dílně: nahoře stroje (ten, u kterého nováček stojí, svítí), pod nimi
 * se píše otázka, asistent hledá v mistrových zápiscích a odpoví jeho slovy; pod odpovědí naskočí zdroje.
 * Záměrně jen ploché prvky a průhlednost/posun (žádný telefon se zaoblením a ořezem, žádné sklo):
 * dřív tahle scéna blikala.
 *
 * Fáze: 0 píše otázku · 1 odesláno · 2 hledá · 3 píše odpověď · 4 podpis a zdroje · 5 drží · 6 doznění
 */
const DUR = [1300, 450, 1300, 1800, 900, 2600, 450];
const DONE = 5;

export default function MasterLive({ v }: { v: CaseVisual<'brain'> }) {
  const { s, ref } = useLoop(DUR, DONE);
  const q = useTyped(v.q, s, 0, DUR[0]);
  const a = useTyped(v.a, s, 3, DUR[3]);
  const sent = s >= 1 && s <= 5;

  return (
    <Scene sceneRef={ref} base={460} className={`sc--master${s === 6 ? ' is-out' : ''}`}>
      <Layer z={-90} className="sc__ghost" />

      <div className="win mk">
        <div className="win__bar">
          <span className="win__dots" />
          <b className="win__name">{v.app}</b>
          <span className="win__live">{v.machine}</span>
        </div>

        <div className="mk__body">
          <ul className="mk__machines">
            {v.machines.map((m, i) => (
              <li className={i === 0 ? 'is-on' : undefined} key={m}>
                {m}
              </li>
            ))}
          </ul>

          <div className="mk__log">
            <p className={`mk__q${sent ? ' is-in' : ''}`}>{v.q}</p>

            <p className={`mk__think${s === 2 ? ' is-in' : ''}`}>
              <i className="sc-spin" />
              {v.thinking}
            </p>

            <div className={`mk__a${s >= 3 && s <= 5 ? ' is-in' : ''}`}>
              <p>
                {s === 3 ? a : s >= 4 && s <= 5 ? v.a : ''}
                {s === 3 && <i className="sc-caret" />}
              </p>
              <small className={s >= 4 && s <= 5 ? 'is-in' : undefined}>— {v.who}</small>
            </div>
          </div>

          <div className="mk__src">
            <span className={s >= 4 && s <= 5 ? 'is-in' : undefined}>{v.from}</span>
            {v.sources.map((x, i) => (
              <em className={s >= 4 && s <= 5 ? 'is-in' : undefined} style={{ transitionDelay: s >= 4 ? `${i * 120}ms` : undefined }} key={x}>
                <Svg>{[ico.chat, ico.pen, ico.search][i]}</Svg>
                {x}
              </em>
            ))}
          </div>

          <p className={`mk__input${s === 0 ? ' is-typing' : ''}`}>
            {s === 0 ? q : ''}
            {s === 0 && <i className="sc-caret" />}
            <span className="mk__send">
              <Svg>{ico.send}</Svg>
            </span>
          </p>
        </div>
      </div>
    </Scene>
  );
}
