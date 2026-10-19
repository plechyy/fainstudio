'use client';

import { ico, Layer, Scene, Svg, useLoop, useTyped } from '../systems/live/scene';
import type { CaseVisual } from './types';

/*
 * Know-how mistra: nováček u stroje napíše otázku. Kolem telefonu se rozsvítí, kde
 * asistent hledá (rozhovor u stroje, poznámky, fotka), a odpověď přijde mistrovými slovy.
 *
 * Fáze: 0 píše otázku · 1 odesláno · 2 hledá ve zdrojích · 3 píše odpověď · 4 podpis a zdroje
 *       5 drží · 6 doznění
 */
const DUR = [1300, 400, 1300, 1800, 600, 2600, 450];
const DONE = 5;

export default function MasterLive({ v }: { v: CaseVisual<'brain'> }) {
  const { s, ref } = useLoop(DUR, DONE);
  const q = useTyped(v.q, s, 0, DUR[0]);
  const a = useTyped(v.a, s, 3, DUR[3]);
  const looking = s === 2;
  const used = s >= 2 && s <= 5;

  return (
    <Scene sceneRef={ref} base={420} className={`sc--master${s === 6 ? ' is-out' : ''}`}>
      {/* zdroje mistrova know-how kolem telefonu */}
      <Layer z={-40} className={`cz-src cz-src--0${used ? ' is-used' : ''}${looking ? ' is-look' : ''}`}>
        <div>
          <p>
            <Svg>{ico.chat}</Svg>
            {v.sources[0]}
          </p>
          <span className="cz-src__wave" aria-hidden="true">
            {Array.from({ length: 16 }, (_, i) => (
              <i key={i} style={{ ['--k' as string]: (i * 29) % 9 }} />
            ))}
          </span>
        </div>
      </Layer>
      <Layer z={-10} className={`cz-src cz-src--1${used ? ' is-used' : ''}${looking ? ' is-look' : ''}`}>
        <div>
          <p>
            <Svg>{ico.pen}</Svg>
            {v.sources[1]}
          </p>
          <span className="cz-src__lines" aria-hidden="true" />
        </div>
      </Layer>
      <Layer z={20} className={`cz-src cz-src--2${used ? ' is-used' : ''}${looking ? ' is-look' : ''}`}>
        <div>
          <p>
            <Svg>{ico.search}</Svg>
            {v.sources[2]}
          </p>
          <span className="cz-src__img" aria-hidden="true" />
        </div>
      </Layer>

      <div className="cz-chat">
        <p className="cz-chat__app">
          <span />
          {v.app}
        </p>
        <div className="cz-chat__log">
          <p className={`cz-chat__q${s >= 1 && s <= 5 ? ' is-in' : ''}`}>{v.q}</p>
          {looking && (
            <p className="cz-chat__think">
              <i className="sc-spin" />
              {v.thinking}
            </p>
          )}
          {s >= 3 && s <= 5 && (
            <div className="cz-chat__a">
              <p>
                {s === 3 ? a : v.a}
                {s === 3 && <i className="sc-caret" />}
              </p>
              <small className={s >= 4 ? 'is-in' : undefined}>— {v.who}</small>
            </div>
          )}
        </div>
        <p className="cz-chat__input">
          {s === 0 ? q : ''}
          {s === 0 && <i className="sc-caret" />}
          <span className="cz-chat__send">
            <Svg>{ico.send}</Svg>
          </span>
        </p>
      </div>
    </Scene>
  );
}
