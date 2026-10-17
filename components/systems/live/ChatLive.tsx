'use client';

import { ico, Layer, Scene, Svg, useLoop, useTyped } from './scene';

/*
 * Asistent: kolega napíše otázku normální češtinou, asistent odpoví a vedle
 * se otevře smlouva se zvýrazněnou větou, ze které odpověď vzal.
 *
 * Fáze: 0 píše se otázka · 1 asistent přemýšlí · 2 píše odpověď · 3 zdroj · 4 drží · 5 doznění
 */
const DUR = [1500, 900, 1700, 900, 2800, 450];
const DONE = 4;

const Q = 'Jakou dáváme záruku na montáž?';
const A = 'Na montáž dáváme 24 měsíců. Na dodané díly platí záruka výrobce, většinou 12 měsíců.';

export default function ChatLive() {
  const { s, ref } = useLoop(DUR, DONE);
  const q = useTyped(Q, s, 0, DUR[0]);
  const a = useTyped(A, s, 2, DUR[2]);
  const src = s >= 3 && s <= 4;

  return (
    <Scene sceneRef={ref} className={`sc--chat${s === 5 ? ' is-out' : ''}`}>
      <Layer z={-90} className="sc__ghost" />

      <div className="win ch">
        <div className="win__bar">
          <span className="win__dots" />
          <b className="win__name">Firemní asistent</b>
          <span className="win__live">Zná 214 dokumentů</span>
        </div>

        <div className="ch__log">
          <p className={`ch__q${s >= 1 && s <= 4 ? ' is-in' : ''}`}>{Q}</p>
          {s === 1 && (
            <p className="ch__dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </p>
          )}
          {s >= 2 && s <= 4 && (
            <div className="ch__a">
              <p>
                {a}
                {s === 2 && <i className="sc-caret" />}
              </p>
              <span className={`ch__src${src ? ' is-in' : ''}`}>
                <Svg>{ico.invoice}</Svg>
                Smlouva o dílo · čl. 6.2
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

      {/* odkud odpověď je: stránka smlouvy se zvýrazněnou větou */}
      <Layer z={90} className="ch__doc-l">
        <div className={`ch__doc${src ? ' is-in' : ''}`}>
          <p className="ch__dochead">
            <Svg>{ico.invoice}</Svg>
            Smlouva o dílo.pdf · str. 4
          </p>
          <i className="ch__line" style={{ width: '86%' }} />
          <i className="ch__line" style={{ width: '64%' }} />
          <p className="ch__hl">
            <b>6.2</b> Na montáž poskytuje zhotovitel záruku <mark>24 měsíců</mark> ode dne předání díla.
          </p>
          <i className="ch__line" style={{ width: '92%' }} />
          <i className="ch__line" style={{ width: '48%' }} />
        </div>
      </Layer>
    </Scene>
  );
}
