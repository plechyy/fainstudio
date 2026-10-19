'use client';

import { ico, Layer, Scene, Svg, Toast, useLoop } from '../systems/live/scene';
import type { CaseVisual } from './types';

/*
 * Upomínky: faktura je po splatnosti, ukazatel dnů jede po ose, ve správný den odletí
 * přátelská připomínka, potom připomínka s QR platbou. Přijde platba, na fakturu
 * dopadne razítko a v bance se to samo spáruje.
 *
 * Fáze: 0 po splatnosti · 1 první připomínka · 2 připomínka s QR · 3 zaplaceno · 4 drží · 5 doznění
 */
const DUR = [1300, 1300, 1300, 1200, 2600, 450];
const DONE = 4;

export default function DunningLive({ v }: { v: CaseVisual<'dunning'> }) {
  const { s, ref } = useLoop(DUR, DONE);
  const step = Math.min(s, 3);
  const paid = s >= 3 && s <= 4;

  return (
    <Scene sceneRef={ref} base={440} className={`sc--dun${s === 5 ? ' is-out' : ''}`}>
      <Layer z={-90} className="sc__ghost" />

      <div className="win cz-inv">
        <div className="win__bar">
          <span className="win__dots" />
          <b className="win__name">{v.number}</b>
          <span className={`cz-inv__st${paid ? ' is-paid' : ''}`}>{paid ? v.paid : v.late}</span>
        </div>
        <div className="cz-inv__body">
          <p className="cz-inv__who">{v.customer}</p>
          <b className="cz-inv__sum num">{v.amount}</b>
          <ol className="cz-inv__axis" style={{ ['--p' as string]: step / 3 }}>
            {v.steps.map((st, i) => (
              <li className={`is-${st.s}${step >= i ? ' is-on' : ''}`} key={st.d}>
                <i />
                <small>{st.d}</small>
                <span>{st.t}</span>
              </li>
            ))}
          </ol>
          <span className={`cz-inv__stamp${paid ? ' is-in' : ''}`}>{v.paid}</span>
        </div>
      </div>

      {/* odcházející připomínky */}
      {[1, 2].map((k) => (
        <Layer z={70 + k * 30} className={`cz-mail cz-mail--${k}${s === k ? ' is-fly' : ''}`} key={k}>
          <p>
            <Svg>{k === 2 ? ico.invoice : ico.mail}</Svg>
            {v.steps[k].t}
          </p>
        </Layer>
      ))}

      <Layer z={150} className="cz-inv__toast">
        <Toast show={paid} icon={ico.check} title={v.bank.title} sub={v.bank.sub} />
      </Layer>
    </Scene>
  );
}
