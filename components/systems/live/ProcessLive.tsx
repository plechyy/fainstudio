'use client';

import { Cursor, ico, Layer, Scene, Svg, useCount, useLoop } from './scene';

/*
 * Procesy: nástup nové kolegyně. Kurzor klikne „Spustit nástup“, formulář se
 * stáhne do jednoho bodu a od něj se rozběhne šest věcí naráz: smlouva,
 * notebook, účty, přístupy, první den v kalendáři a uvítání.
 *
 * Fáze: 0 formulář · 1 kurzor přijede · 2 klik · 3 rozběhne se · 4 rozsvítí se kroky
 *       5 drží · 6 doznění
 */
const DUR = [900, 900, 350, 900, 1700, 2800, 450];
const DONE = 5;

// kde kroky leží (v % plochy) a jak blízko jsou k divákovi
const nodes = [
  { ico: ico.pen, t: 'Smlouva', d: 'odeslaná k podpisu', x: 2, y: 4, z: 70 },
  { ico: ico.laptop, t: 'Notebook', d: 'objednaný na 31. 10.', x: 64, y: 2, z: -30 },
  { ico: ico.mail, t: 'E-mail a účty', d: 'založené', x: -4, y: 40, z: 20 },
  { ico: ico.key, t: 'Přístupy', d: 'Disk, Figma, fakturace', x: 70, y: 40, z: 100 },
  { ico: ico.cal, t: 'První den', d: 'v kalendáři týmu', x: 4, y: 78, z: -40 },
  { ico: ico.chat, t: 'Uvítání', d: 'zpráva od vedoucí', x: 64, y: 78, z: 50 },
];
// střed každého kroku pro spojnice (viewBox 100 × 100)
const ends = nodes.map((n) => [n.x + 17, n.y + 9]);

export default function ProcessLive() {
  const { s, ref } = useLoop(DUR, DONE);
  const lit = useCount(0, 6, s, 4, 1500);
  const started = s >= 3 && s <= 5;
  const on = (i: number) => (s === 4 ? lit > i : s === 5);

  return (
    <Scene sceneRef={ref} base={460} className={`sc--proc${s === 6 ? ' is-out' : ''}`}>
      <div className="ob">
        <svg className="ob__lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {ends.map(([x, y], i) => (
            <path
              key={i}
              d={`M50 50 L${x} ${y}`}
              pathLength={1}
              className={`${started ? 'is-drawn' : ''}${on(i) ? ' is-on' : ''}`}
              style={{ transitionDelay: started && s === 3 ? `${i * 80}ms` : undefined }}
            />
          ))}
        </svg>

        {nodes.map((n, i) => (
          <Layer z={n.z} style={{ left: `${n.x}%`, top: `${n.y}%` }} className={`ob__node${started ? ' is-in' : ''}${on(i) ? ' is-on' : ''}`} key={n.t}>
            <div style={{ transitionDelay: started && s === 3 ? `${i * 80}ms` : undefined }}>
              <span className="ob__ico">
                <Svg>{n.ico}</Svg>
              </span>
              <span>
                <b>{n.t}</b>
                <span>{n.d}</span>
              </span>
              <Svg className="sc-ok ob__ok">{ico.check}</Svg>
            </div>
          </Layer>
        ))}

        {/* formulář, který se po kliknutí stáhne do středu */}
        <div className={`win ob__core${started ? ' is-small' : ''}`}>
          <div className="win__bar">
            <span className="win__dots" />
            <b className="win__name">Nový kolega</b>
          </div>
          <div className="ob__form">
            <p>
              <i>Jméno</i>
              <b>Tereza Malá</b>
            </p>
            <p>
              <i>Pozice</i>
              <b>Grafička</b>
            </p>
            <p>
              <i>Nástup</i>
              <b className="num">3. 11. 2026</b>
            </p>
            <span className="ob__go">
              <span className={`sc-btn${s === 2 ? ' is-press' : ''}`}>Spustit nástup</span>
              <Cursor state={s === 1 ? 'in' : s === 2 ? 'click' : 'off'} />
            </span>
          </div>
          <div className="ob__who">
            <span className="ob__av">TM</span>
            <span>
              <b>Tereza Malá</b>
              <span className={s === 5 ? 'is-done' : ''}>
                {s === 5 ? 'Všechno připraveno na 3. 11.' : `Hotovo ${s === 4 ? lit : 0} z 6`}
              </span>
            </span>
          </div>
        </div>
      </div>
    </Scene>
  );
}
