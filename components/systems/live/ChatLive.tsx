'use client';

import { Cursor, ico, Layer, Scene, Svg, Toast, useLoop, useTyped } from './scene';

/*
 * Asistent zubní kliniky: sestra se zeptá, jestli si může vzít pátek volno.
 * Asistent se podívá do dovolené i rozpisu směn, odpoví a nabídne žádost.
 * Kurzor klikne, rozpis se sám přepíše a vedoucí žádost schválí.
 *
 * Fáze: 0 píše se otázka · 1 asistent hledá · 2 píše odpověď · 3 kurzor přijede
 *       4 klik · 5 rozpis se přepíše · 6 drží · 7 doznění
 */
const DUR = [1300, 1100, 1500, 900, 350, 1300, 2600, 450];
const DONE = 6;

const Q = 'Můžu si vzít příští pátek volno?';
const A = 'Ano. Zbývá vám 6 dní dovolené a v pátek 7. 11. vás může zastoupit Petra, má ten den volno.';

export default function ChatLive() {
  const { s, ref } = useLoop(DUR, DONE);
  const q = useTyped(Q, s, 0, DUR[0]);
  const a = useTyped(A, s, 2, DUR[2]);
  const looked = s >= 1 && s <= 6;
  const swapped = s >= 5 && s <= 6;

  return (
    <Scene sceneRef={ref} base={420} className={`sc--chat${s === 7 ? ' is-out' : ''}`}>
      {/* kam se asistent podíval: dovolená a rozpis směn */}
      <Layer z={30} className={`as__src as__src--a${looked ? ' is-in' : ''}`}>
        <div>
          <p className="as__srch">
            <Svg>{ico.user}</Svg>
            Dovolená · Lucie K.
          </p>
          <p className="as__big">
            <b className="num">6</b> dní zbývá
          </p>
          <span className="as__bar">
            <i style={{ width: '76%' }} />
          </span>
        </div>
      </Layer>
      <Layer z={70} className={`as__src as__src--b${looked ? ' is-in' : ''}`}>
        <div style={{ transitionDelay: looked && s === 1 ? '200ms' : undefined }}>
          <p className="as__srch">
            <Svg>{ico.cal}</Svg>
            Rozpis směn · pá 7. 11.
          </p>
          <p className={`as__shift${swapped ? ' is-off' : ''}`}>
            <span>Lucie K.</span>
            <b>{swapped ? 'dovolená' : 'ordinace 2'}</b>
          </p>
          <p className={`as__shift${swapped ? ' is-on' : ''}`}>
            <span>Petra S.</span>
            <b>{swapped ? 'ordinace 2' : 'volno'}</b>
          </p>
        </div>
      </Layer>

      <div className="win as">
        <div className="win__bar">
          <span className="win__dots" />
          <b className="win__name">Asistent · Klinika Úsměv</b>
          <span className="win__live">Interní</span>
        </div>

        <div className="as__log">
          <p className={`as__q${s >= 1 && s <= 6 ? ' is-in' : ''}`}>{Q}</p>
          {s === 1 && (
            <p className="as__think">
              <i className="sc-spin" />
              Dívám se do dovolené a rozpisu směn
            </p>
          )}
          {s >= 2 && s <= 6 && (
            <div className="as__a">
              <p>
                {a}
                {s === 2 && <i className="sc-caret" />}
              </p>
              <span className={`as__act${s >= 3 ? ' is-in' : ''}`}>
                {swapped ? (
                  <span className="as__sent">
                    <Svg className="sc-ok">{ico.check}</Svg>
                    Žádost odeslaná vedoucí
                  </span>
                ) : (
                  <span className={`sc-btn${s === 4 ? ' is-press' : ''}`}>Zažádat o volno</span>
                )}
                <Cursor state={s === 3 ? 'in' : s === 4 ? 'click' : 'off'} />
              </span>
            </div>
          )}
        </div>

        <div className="ch__input">
          <span className={s === 0 && q ? 'ch__typed' : 'ch__ph'}>
            {s === 0 && q ? q : 'Zeptejte se na cokoli…'}
            {s === 0 && <i className="sc-caret" />}
          </span>
          <span className="ch__send">
            <Svg>{ico.send}</Svg>
          </span>
        </div>
      </div>

      <Layer z={130} className="as__toast">
        <Toast show={swapped} delay={600} icon={ico.approve} title="Vedoucí volno schválila" sub="Pátek 7. 11. je v kalendáři kliniky" />
      </Layer>
    </Scene>
  );
}
