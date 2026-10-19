'use client';

import { Layer, Scene, useLoop } from '../systems/live/scene';
import type { CaseVisual } from './types';

/*
 * Cena z fotky: zákazník míří telefonem na koupelnu, cvakne, fotkou projede sken,
 * AI do ní připíchne, co poznala, a vedle vyjede předběžná cena s tlačítkem na obhlídku.
 *
 * Fáze: 0 hledáček · 1 cvak · 2 sken · 3–5 štítky · 6 cena · 7 drží · 8 doznění
 */
const DUR = [1100, 350, 1100, 420, 420, 420, 1000, 2600, 450];
const DONE = 7;

export default function PhotoLive({ v }: { v: CaseVisual<'photo'> }) {
  const { s, ref } = useLoop(DUR, DONE);
  const shot = s >= 1 && s <= 7;

  return (
    <Scene sceneRef={ref} base={440} className={`sc--photo${s === 8 ? ' is-out' : ''}`}>
      <Layer z={-90} className="sc__ghost" />

      <div className={`cz-cam${shot ? ' is-shot' : ''}${s === 1 ? ' is-flash' : ''}${s === 2 ? ' is-scan' : ''}`}>
        <div className="cz-cam__view" aria-hidden="true">
          <span className="cz-cam__tile" />
          <span className="cz-cam__tub" />
          <span className="cz-cam__sink" />
          <span className="cz-cam__mirror" />
          <span className="cz-cam__corners" />
          <span className="cz-cam__scan" />
          <span className="cz-cam__flash" />
          {v.tags.map((t, i) => (
            <em
              className={s >= 3 + i && s <= 7 ? 'is-in' : undefined}
              key={t.t}
              style={{ ...(t.x < 50 ? { left: `${t.x}%` } : { right: `${100 - t.x}%` }), top: `${t.y}%` }}
            >
              {t.t}
            </em>
          ))}
        </div>
        <p className="cz-cam__bar">
          <span className={s === 2 ? 'is-on' : undefined}>{s === 2 ? v.analyzing : ''}</span>
          <i className="cz-cam__shutter" />
        </p>
      </div>

      <Layer z={120} className={`cz-price-l${s >= 6 && s <= 7 ? ' is-in' : ''}`}>
        <div className="cz-price">
          <small>{v.price.k}</small>
          <b className="num">{v.price.v}</b>
          <span>{v.price.s}</span>
          <span className="sc-btn">{v.price.btn}</span>
        </div>
      </Layer>
    </Scene>
  );
}
