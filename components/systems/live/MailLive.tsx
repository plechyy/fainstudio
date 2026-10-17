'use client';

import { useEffect, useState } from 'react';
import { ico, Layer, Scene, Svg, Toast, useLoop } from './scene';

/*
 * Poptávky: do schránky přijde poptávka, systém napíše odpověď, odešle ji
 * a zapíše poptávku do přehledu.
 *
 * Fáze: 0 mail přijde · 1 píše se odpověď · 2 odesláno · 3 zapsáno · 4 drží · 5 doznění
 */
const DUR = [1000, 2400, 900, 1000, 2600, 450];
const DONE = 4;

const REPLY =
  'Dobrý den, 120 krabic máme skladem a dovezeme je do 24. 10. Nabídku posíláme v příloze. Hodí se vám krátký hovor ve středu v 10:00?';

const older = [
  { who: 'Dodavatel obalů', sub: 'Ceník na listopad', time: '8:12', av: 'DO' },
  { who: 'Účetní', sub: 'Doklady za září', time: 'Včera', av: 'ÚČ' },
  { who: 'Petr Novák', sub: 'Re: Termín montáže', time: 'Včera', av: 'PN' },
];

export default function MailLive() {
  const { s, ref } = useLoop(DUR, DONE);
  const [n, setN] = useState(0);

  // odpověď se píše po písmenkách jen ve fázi 1, jinak je prázdná nebo celá
  useEffect(() => {
    if (s !== 1) {
      setN(s === 0 || s === 5 ? 0 : REPLY.length);
      return;
    }
    setN(0);
    const step = Math.max(12, Math.floor((DUR[1] - 300) / REPLY.length));
    const t = window.setInterval(() => setN((v) => (v >= REPLY.length ? v : v + 2)), step * 2);
    return () => clearInterval(t);
  }, [s]);

  const sent = s >= 2 && s <= 4;

  return (
    <Scene sceneRef={ref} className={`sc--mail${s === 5 ? ' is-out' : ''}`}>
      <Layer z={-90} className="sc__ghost" />

      <div className="win ml">
        <div className="win__bar">
          <span className="win__dots" />
          <b className="win__name">Doručená pošta</b>
          <span className="win__live">{sent ? 'Vyřízeno' : '1 nová'}</span>
        </div>
        <ul className="ml__list">
          <li className={`ml__row ml__row--new${s === 5 ? ' is-hidden' : ''}`}>
            <span className="ml__av">PM</span>
            <span className="ml__main">
              <span className="ml__top">
                <b>Pekárna U Mostu</b>
                <span className="num">8:41</span>
              </span>
              <span className="ml__sub">Poptávka: 120 krabic na dorty</span>
              <span className="ml__snip">Dobrý den, potřebovali bychom cenu na 120 ks a termín do konce měsíce…</span>
            </span>
            <span className={`ml__tag${sent ? ' is-on' : ''}`}>{sent ? 'Odpovězeno' : 'Nová'}</span>
          </li>
          {older.map((m) => (
            <li className="ml__row" key={m.who}>
              <span className="ml__av">{m.av}</span>
              <span className="ml__main">
                <span className="ml__top">
                  <b>{m.who}</b>
                  <span className="num">{m.time}</span>
                </span>
                <span className="ml__sub">{m.sub}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* odpověď, kterou systém napíše sám */}
      <Layer z={70} className="ml__reply-l">
        <div className={`ml__reply${s >= 1 && s <= 4 ? ' is-in' : ''}`}>
          <p className="ml__rhead">
            <b>Odpověď · Pekárna U Mostu</b>
            {sent ? (
              <span className="ml__rstate is-sent">
                <Svg className="sc-ok">{ico.check}</Svg>
                Odesláno <span className="num">8:42</span>
              </span>
            ) : (
              <span className="ml__rstate">
                <i className="sc-spin" />
                Systém píše
              </span>
            )}
          </p>
          <p className="ml__rbody">
            {REPLY.slice(0, n)}
            {s === 1 && <i className="ml__caret" />}
          </p>
          <span className="ml__att">
            <Svg>{ico.clip}</Svg>
            Nabidka_120ks.pdf
          </span>
        </div>
      </Layer>

      <Layer z={120} className="ml__toast">
        <Toast
          show={s === 3 || s === 4}
          icon={ico.table}
          title="Zapsáno do přehledu poptávek"
          sub="Odpověď za 1 min 12 s · čeká na potvrzení"
        />
      </Layer>
    </Scene>
  );
}
