'use client';

import { Cursor, ico, Layer, Scene, Svg, useLoop } from '../systems/live/scene';
import type { CaseVisual } from './types';

/*
 * Hlídač nabídek realitky: systém prochází portály, nové inzeráty padají do seznamu
 * jeden po druhém. Od majitelů svítí, realitky a duplicity se přeškrtnou a zmizí.
 * Nakonec makléři pípne telefon a jedním ťukem volá.
 *
 * Fáze: 0 prochází · 1–4 inzeráty · 5 upozornění · 6 kurzor · 7 ťuk · 8 drží · 9 doznění
 */
const DUR = [1300, 750, 750, 750, 750, 1000, 800, 350, 2400, 450];
const DONE = 8;

export default function RealtyLive({ v }: { v: CaseVisual<'feed'> }) {
  const { s, ref } = useLoop(DUR, DONE);
  const alert = s >= 5 && s <= 8;

  return (
    <Scene sceneRef={ref} base={440} className={`sc--realty${s === 9 ? ' is-out' : ''}`}>
      <Layer z={-90} className="sc__ghost" />

      <div className="win cz-feed">
        <div className="win__bar">
          <span className="win__dots" />
          <b className="win__name">{v.window}</b>
          <span className="win__live">{s === 0 ? v.scanning : v.found}</span>
        </div>
        <ul>
          {v.rows.map((r, i) => {
            const shown = s >= i + 1 && s <= 8;
            return (
              <li className={`${r.ok ? 'is-ok' : 'is-bad'}${shown ? ' is-in' : ''}`} key={r.t + r.meta}>
                <span className="cz-feed__ico">
                  <Svg>{r.ok ? ico.user : ico.globe}</Svg>
                </span>
                <span className="cz-feed__t">
                  <b>{r.t}</b>
                  <small>{r.meta}</small>
                </span>
                <em>{r.tag}</em>
              </li>
            );
          })}
        </ul>
      </div>

      {/* makléřův telefon: upozornění a hovor jedním ťukem */}
      <Layer z={130} className={`cz-feed__phone${alert ? ' is-in' : ''}`}>
        <div className="cz-push">
          <span className="cz-push__ico">
            <Svg>{ico.bell}</Svg>
          </span>
          <span className="cz-push__t">
            <b>{v.alert.title}</b>
            <span>{v.alert.sub}</span>
          </span>
          <span className={`sc-btn cz-push__btn${s === 7 ? ' is-press' : ''}`}>
            {v.alert.btn}
            <Cursor state={s === 6 ? 'in' : s === 7 ? 'click' : 'off'} />
          </span>
        </div>
      </Layer>
    </Scene>
  );
}
