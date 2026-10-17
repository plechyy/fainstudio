'use client';

import { ico, Layer, Scene, Svg, Toast, useLoop } from './scene';

/*
 * Sběr dat: ráno v 6:00 systém projde ceny u tří dodavatelů, u jednoho najde
 * změnu a pošle upozornění. Vedle je graf ceny za posledních 30 dní.
 *
 * Fáze: 0–2 kontrola řádku po řádku · 3 změna ceny · 4 upozornění · 5 drží · 6 doznění
 */
const DUR = [700, 700, 700, 900, 900, 2600, 450];
const DONE = 5;

const rows = [
  { who: 'Dodavatel A', was: '1 405 Kč', now: '1 290 Kč', d: '−8 %' },
  { who: 'Dodavatel B', was: '1 410 Kč', now: '1 410 Kč', d: '' },
  { who: 'Dodavatel C', was: '1 355 Kč', now: '1 355 Kč', d: '' },
];

export default function WatchLive() {
  const { s, ref } = useLoop(DUR, DONE);
  const changed = s >= 3 && s <= 5;

  return (
    <Scene sceneRef={ref} className={`sc--watch${s === 6 ? ' is-out' : ''}`}>
      <Layer z={-90} className="sc__ghost" />

      <div className="win wt">
        <div className="win__bar">
          <span className="win__dots" />
          <b className="win__name">Ceny dodavatelů</b>
          <span className="win__live">{s < 3 ? 'Kontroluje se' : 'Dnes 6:00'}</span>
        </div>

        <div className="wt__head">
          <span>Profil 40×40, 6 m</span>
          <span>Cena</span>
          <span>Od včera</span>
        </div>
        {rows.map((r, i) => {
          const checking = s === i;
          const done = s > i && s < 6;
          const hot = i === 0 && changed;
          return (
            <div className={`wt__row${hot ? ' is-hot' : ''}`} key={r.who}>
              <span className="wt__who">
                {checking ? <i className="sc-spin" /> : <Svg className={`sc-ok${done ? '' : ' is-off'}`}>{ico.check}</Svg>}
                {r.who}
              </span>
              <span className="wt__price num">{hot ? r.now : r.was}</span>
              <span className={`wt__d${hot ? ' is-on' : ''}`}>{hot ? r.d : done ? 'beze změny' : '—'}</span>
            </div>
          );
        })}

        <p className={`win__foot${s >= 3 && s <= 5 ? ' is-done' : ''}`}>
          {s < 3 ? `Prochází zdroje · ${s + 1} ze 3` : '1 změna od včera, poslali jsme ji do mailu'}
        </p>
      </div>

      {/* graf ceny za 30 dní: na konci spadne dolů */}
      <Layer z={60} className="wt__chart-l">
        <div className="wt__chart">
          <p>
            <b>Dodavatel A</b> · 30 dní
          </p>
          <svg viewBox="0 0 200 64" preserveAspectRatio="none" aria-hidden="true">
            <path className="wt__base" d="M0 34 L20 30 L40 33 L60 26 L80 28 L100 22 L120 25 L140 20 L160 22 L172 20" />
            <path className={`wt__drop${changed ? ' is-on' : ''}`} d="M172 20 L200 50" pathLength={1} />
            <circle className={`wt__pt${changed ? ' is-on' : ''}`} cx="200" cy="50" r="3.5" />
          </svg>
        </div>
      </Layer>

      <Layer z={120} className="wt__toast">
        <Toast show={s === 4 || s === 5} icon={ico.bell} title="Dodavatel A zlevnil o 8 %" sub="Profil 40×40 · teď 1 290 Kč" />
      </Layer>
    </Scene>
  );
}
