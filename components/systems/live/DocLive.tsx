'use client';

import { ico, Layer, Scene, Svg, Toast, useLoop } from './scene';

/*
 * Dokumenty: přijde faktura v PDF, přes papír přejede čtecí linka, systém
 * označí důležitá pole a jedno po druhém je přepíše do karty vedle.
 *
 * Fáze: 0 faktura přijde · 1 čtení · 2–5 pole jedno po druhém · 6 zapsáno · 7 doznění
 */
const DUR = [700, 1500, 420, 420, 420, 420, 2800, 450];
const DONE = 6;

const fields = [
  { k: 'Dodavatel', v: 'Kovoobrábění Brno s.r.o.' },
  { k: 'Variabilní symbol', v: '2026114' },
  { k: 'Splatnost', v: '30. 10. 2026' },
  { k: 'Částka k úhradě', v: '48 300 Kč' },
];

export default function DocLive() {
  const { s, ref } = useLoop(DUR, DONE);
  // kolik polí už je přečtených
  const got = s === 7 ? 4 : Math.max(0, Math.min(4, s - 1));
  const hit = (i: number) => (got > i ? ' is-hit' : '');

  return (
    <Scene sceneRef={ref} className={`sc--doc${s === 7 ? ' is-out' : ''}`}>
      <Layer z={-90} className="sc__ghost" />

      {/* papír s fakturou */}
      <div className={`dc${s === 1 ? ' is-scan' : ''}`}>
        <div className="dc__head">
          <span className={`dc__f dc__from${hit(0)}`}>
            <b>Kovoobrábění Brno s.r.o.</b>
            <span>Hybešova 12, 602 00 Brno</span>
            <span>IČO 27184563</span>
          </span>
          <span className="dc__title">
            <b>FAKTURA</b>
            <span className="num">č. 2026114</span>
          </span>
        </div>

        <div className="dc__meta">
          <span className={`dc__f${hit(1)}`}>
            <i>Variabilní symbol</i>
            <b className="num">2026114</b>
          </span>
          <span className={`dc__f${hit(2)}`}>
            <i>Splatnost</i>
            <b className="num">30. 10. 2026</b>
          </span>
        </div>

        <div className="dc__rows">
          {[
            ['Profil 40×40, 6 m', '24 ks', '28 800'],
            ['Řezání na míru', '24 ks', '7 200'],
            ['Doprava', '1', '1 900'],
          ].map(([a, b, c]) => (
            <span className="dc__row" key={a}>
              <span>{a}</span>
              <span className="num">{b}</span>
              <span className="num">{c}</span>
            </span>
          ))}
        </div>

        <div className="dc__sum">
          <span className={`dc__f${hit(3)}`}>
            <i>Celkem k úhradě</i>
            <b className="num">48 300 Kč</b>
          </span>
        </div>

        <i className="dc__scan" aria-hidden="true" />
      </div>

      {/* co z toho systém vytáhl */}
      <Layer z={80} className="dx-l">
        <div className="win dx">
          <div className="win__bar">
            <Svg className="dx__pdf">{ico.invoice}</Svg>
            <b className="win__name">Vytaženo z PDF</b>
          </div>
          <dl className="dx__list">
            {fields.map((f, i) => (
              <div className={`dx__row${got > i ? ' is-on' : ''}`} key={f.k}>
                <dt>{f.k}</dt>
                <dd>
                  <span className="dx__v">{f.v}</span>
                  <i className="dx__ph" />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Layer>

      <Layer z={130} className="dc__toast">
        <Toast show={s === DONE} icon={ico.table} title="Zapsáno do tabulky Faktury 2026" sub="Nikdo nic nepřepisoval" />
      </Layer>
    </Scene>
  );
}
