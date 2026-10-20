'use client';

import { Cursor, ico, Layer, Scene, Svg, Toast, useLoop } from '../systems/live/scene';
import type { CaseVisual } from './types';

/*
 * Cena z fotky. Okno webu firmy: zákazník nahraje tři fotky koupelny, systém z nich vyčte, co v ní je,
 * a vedle vyjede předběžná cena. Zákazník klikne na „Domluvit obhlídku“ a majiteli přijde upozornění.
 * Záměrně jen ploché prvky a průhlednost/posun (žádné sklo, žádný náklon telefonu): dřív tahle scéna
 * blikala, protože mívala sklo a ořezávání zaoblených rohů kolem pohyblivého obsahu.
 *
 * Fáze: 0 prázdno · 1–3 fotky přistanou · 4 vyčítá · 5–7 poznané věci · 8 cena · 9 kurzor · 10 klik
 *       11 upozornění · 12 drží · 13 doznění
 */
const DUR = [900, 500, 500, 500, 1100, 500, 500, 500, 1000, 800, 350, 1200, 2400, 450];
const DONE = 12;

export default function PhotoLive({ v }: { v: CaseVisual<'photo'> }) {
  const { s, ref } = useLoop(DUR, DONE);
  const photos = s >= 1 ? Math.min(3, s) : 0;
  const hold = s <= 12;

  return (
    <Scene sceneRef={ref} base={460} className={`sc--photo${s === 13 ? ' is-out' : ''}`}>
      <Layer z={-90} className="sc__ghost" />

      <div className="win ph">
        <div className="win__bar">
          <span className="win__dots" />
          <b className="win__name">{v.window}</b>
          <span className="win__live">{s >= 8 && hold ? 'Cena hotová' : s >= 4 ? 'Vyčítám' : 'Čeká na fotky'}</span>
        </div>

        <div className="ph__body">
          <div className="ph__tiles">
            {[0, 1, 2].map((k) => (
              <span className={`ph__tile ph__tile--${k}${photos > k && hold ? ' is-in' : ''}`} key={k}>
                <i />
                <i />
              </span>
            ))}
          </div>

          <p className="ph__status">
            {s === 4 && <i className="sc-spin" />}
            {s < 1 ? v.dropHint : s < 4 ? `${photos} z 3 fotek` : s === 4 ? v.analyzing : v.found}
          </p>

          <div className="ph__row">
            <ul className="ph__found">
              {v.items.map((it, i) => (
                <li className={s >= 5 + i && hold ? 'is-in' : undefined} key={it.t}>
                  <Svg className="sc-ok">{ico.check}</Svg>
                  <b>{it.t}</b>
                  <span>{it.v}</span>
                </li>
              ))}
            </ul>

            <div className={`ph__price${s >= 8 && hold ? ' is-in' : ''}`}>
              <small>{v.price.k}</small>
              <b className="num">{v.price.v}</b>
              <span>{v.price.s}</span>
              <span className={`sc-btn ph__btn${s === 10 ? ' is-press' : ''}`}>
                {v.price.btn}
                <Cursor state={s === 9 ? 'in' : s === 10 ? 'click' : 'off'} />
              </span>
            </div>
          </div>
        </div>
      </div>

      <Layer z={110} className="ph__toast">
        <Toast show={s >= 11 && hold} icon={ico.bell} title={v.toast.title} sub={v.toast.sub} />
      </Layer>
    </Scene>
  );
}
