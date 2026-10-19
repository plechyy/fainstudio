'use client';

import { ico, Layer, Scene, Svg, Toast, useLoop } from '../systems/live/scene';
import type { CaseVisual } from './types';

/*
 * Kontrola smlouvy: stránkou projede čtecí linka, pak se jeden po druhém rozsvítí
 * tři riskantní články a vedle každého vyjede návrh, co chtít jinak. Nakonec shrnutí.
 *
 * Fáze: 0 čte · 1–3 rizika · 4 shrnutí · 5 drží · 6 doznění
 */
const DUR = [1500, 900, 900, 900, 1000, 2600, 450];
const DONE = 5;

/* kde v textu smlouvy jednotlivá rizika leží (pořadí řádků) */
const AT = [2, 5, 8];

export default function ContractLive({ v }: { v: CaseVisual<'contract'> }) {
  const { s, ref } = useLoop(DUR, DONE);
  const lines = Array.from({ length: 11 }, (_, i) => i);

  return (
    <Scene sceneRef={ref} base={440} className={`sc--contract${s === 6 ? ' is-out' : ''}`}>
      <Layer z={-90} className="sc__ghost" />

      <div className={`cz-doc${s === 0 ? ' is-reading' : ''}`}>
        <b className="cz-doc__h">{v.title}</b>
        <div className="cz-doc__body">
          {lines.map((l) => {
            const f = AT.indexOf(l);
            if (f < 0) return <span className="cz-doc__line" key={l} style={{ width: `${[92, 86, 0, 95, 78, 0, 90, 84, 0, 93, 64][l]}%` }} />;
            const flag = v.flags[f];
            return (
              <p className={`cz-doc__flag is-${flag.lvl}${s >= 1 + f && s <= 5 ? ' is-on' : ''}`} key={l}>
                <small>{flag.at}</small>
                {flag.t}
                {/* návrh změny vyjede vedle rizikového článku */}
                <span className="cz-doc__fix">
                  <Svg className="sc-ok">{ico.check}</Svg>
                  {flag.fix}
                </span>
              </p>
            );
          })}
          <span className="cz-doc__reader" aria-hidden="true" />
        </div>
      </div>

      <Layer z={140} className="cz-doc__toast">
        <Toast show={s >= 4 && s <= 5} icon={ico.approve} title={v.summary.title} sub={v.summary.sub} />
      </Layer>
    </Scene>
  );
}
