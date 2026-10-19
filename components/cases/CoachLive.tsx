'use client';

import { ico, Layer, Scene, Svg, useLoop } from '../systems/live/scene';
import type { CaseVisual } from './types';

/*
 * Kouč obchodníků: běží hovor (vlna, čas), obchodník zavěsí a do pár vteřin mu
 * v mobilu naskočí hodnocení řádek po řádku a nakonec, jak se zlepšuje.
 *
 * Fáze: 0 hovor · 1 zavěšeno · 2 vyhodnocuje · 3–6 řádky · 7 trend · 8 drží · 9 doznění
 */
const DUR = [1900, 500, 900, 450, 450, 450, 450, 700, 2600, 450];
const DONE = 8;

export default function CoachLive({ v }: { v: CaseVisual<'score'> }) {
  const { s, ref } = useLoop(DUR, DONE);
  const live = s === 0;
  const card = s >= 2 && s <= 8;

  return (
    <Scene sceneRef={ref} base={440} className={`sc--coach${s === 9 ? ' is-out' : ''}`}>
      <Layer z={-90} className="sc__ghost" />

      {/* hovor: vlna se hýbe, dokud se mluví */}
      <div className={`win cz-call${live ? ' is-live' : ''}`}>
        <div className="win__bar">
          <span className="win__dots" />
          <b className="win__name">{v.who}</b>
          <span className={`win__live${live ? '' : ' is-off'}`}>{live ? v.live : v.ended}</span>
        </div>
        <div className="cz-call__body">
          <span className="cz-call__av">
            <Svg>{ico.user}</Svg>
          </span>
          <span className="cz-call__wave" aria-hidden="true">
            {Array.from({ length: 28 }, (_, i) => (
              <i key={i} style={{ ['--k' as string]: (i * 37) % 11 }} />
            ))}
          </span>
          <b className="cz-call__time num">12:04</b>
        </div>
      </div>

      {/* hodnocení v mobilu obchodníka */}
      <Layer z={120} className={`cz-score-l${card ? ' is-in' : ''}`}>
        <div className="cz-score">
          <p className="cz-score__h">
            {v.card}
            {s === 2 && <i className="sc-spin" />}
          </p>
          {s === 2 && <p className="cz-score__wait">{v.analyzing}</p>}
          <ul>
            {v.rows.map((r, i) => (
              <li className={`is-${r.k}${s >= 3 + i && s <= 8 ? ' is-in' : ''}`} key={r.k}>
                <b>{r.label}</b>
                {r.t}
              </li>
            ))}
          </ul>
          <p className={`cz-score__trend${s >= 7 && s <= 8 ? ' is-in' : ''}`}>
            <span aria-hidden="true">▲</span> {v.trend}
          </p>
        </div>
      </Layer>
    </Scene>
  );
}
