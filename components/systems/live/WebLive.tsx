'use client';

import { Cursor, ico, Layer, Scene, Svg, Toast, useLoop, useTyped } from './scene';

/*
 * Chytrý web fitness studia: stránka se poskládá, návštěvnice se v okénku na webu
 * zeptá, jestli je dnes večer volno. Asistent webu se podívá do rozvrhu, odpoví
 * a po ťuknutí ji rovnou přihlásí. Na stránce naskočí „Obsazeno“ a majitelce přijde
 * upozornění. Všechno se hýbe jen posunem a průhledností, nic se nepřeskládává.
 *
 * Fáze: 0 web se poskládá · 1 otevře se okénko · 2 píše se otázka · 3 asistent hledá
 *       4 píše odpověď · 5 kurzor přijede · 6 ťuk · 7 přihlášeno · 8 drží · 9 doznění
 */
const DUR = [1300, 600, 1300, 900, 1500, 850, 350, 1300, 2600, 450];
const DONE = 8;

const Q = 'Máte dnes večer volno na jógu?';
const A = 'Ano, v 18:00 zbývá poslední místo. Mám vás zapsat?';

const lessons = [
  { t: 'Jóga', h: '18:00', left: 'poslední místo' },
  { t: 'Pilates', h: '19:15', left: '4 místa' },
  { t: 'Kruhový trénink', h: '20:00', left: '6 míst' },
];

export default function WebLive() {
  const { s, ref } = useLoop(DUR, DONE);
  const q = useTyped(Q, s, 2, DUR[2]);
  const a = useTyped(A, s, 4, DUR[4]);
  const open = s >= 1 && s <= 8;
  const booked = s >= 7 && s <= 8;

  return (
    <Scene sceneRef={ref} base={500} className={`sc--web${s === 9 ? ' is-out' : ''}`}>
      <Layer z={-90} className="sc__ghost" />

      <div className={`win fw${s === 0 ? ' is-build' : ''}`}>
        <div className="win__bar">
          <span className="win__dots" />
          <span className="fw__url">
            <Svg>{ico.lock}</Svg>
            studioflow.cz
          </span>
        </div>

        <div className="fw__page">
          <p className="fw__nav fw__b">
            <b>Studio Flow</b>
            <span>Rozvrh</span>
            <span>Ceník</span>
          </p>
          <div className="fw__hero fw__b">
            <div>
              <p className="fw__h">Lekce, na které se budete těšit.</p>
              <p className="fw__p">Jóga, pilates a kruháče v centru Olomouce.</p>
            </div>
            <span className="fw__img" />
          </div>
          <p className="fw__sub fw__b">Dnes</p>
          <ul className="fw__list fw__b">
            {lessons.map((l, i) => {
              const full = i === 0 && booked;
              return (
                <li className={full ? 'is-full' : ''} key={l.t}>
                  <span>
                    <b>{l.t}</b>
                    <span className="num fw__swap">
                      <span>
                        {l.h} · {l.left}
                      </span>
                      {i === 0 && <span>{l.h} · obsazeno</span>}
                    </span>
                  </span>
                  <span className="fw__ghost">{full ? 'Plno' : 'Přihlásit se'}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* okénko asistenta na webu: vyjede z pravého dolního rohu */}
      <Layer z={90} className={`fw__chat-l${open ? ' is-in' : ''}`}>
        <div className="fw__chat">
          <p className="fw__ch">
            <span className="fw__av">
              <Svg>{ico.chat}</Svg>
            </span>
            <span>
              <b>Studio Flow</b>
              <span>odpovídá hned</span>
            </span>
          </p>
          <div className="fw__log">
            {/* bublina má od začátku velikost celého textu (neviditelná kopie), takže při psaní nic neposkakuje */}
            <p className={`fw__q${s >= 2 && s <= 8 ? ' is-in' : ''}`}>
              <span className="fw__full">{Q}</span>
              <span>
                {s === 2 ? q : Q}
                {s === 2 && <i className="sc-caret" />}
              </span>
            </p>
            <div className="fw__slot">
              <p className={`fw__think${s === 3 ? ' is-in' : ''}`}>
                <i className="sc-spin" />
                Dívám se do rozvrhu
              </p>
              <div className={`fw__a${s >= 4 && s <= 8 ? ' is-in' : ''}`}>
                <p className="fw__typed">
                  <span className="fw__full">{A}</span>
                  <span>
                    {s === 4 ? a : A}
                    {s === 4 && <i className="sc-caret" />}
                  </span>
                </p>
              <span className={`fw__act${s >= 5 ? ' is-in' : ''}`}>
                <span className={`sc-btn fw__btn${s === 6 ? ' is-press' : ''}${booked ? ' is-gone' : ''}`}>Zapsat mě</span>
                <span className={`fw__done${booked ? ' is-in' : ''}`}>
                  <Svg className="sc-ok">{ico.check}</Svg>
                  Zapsáno, potvrzení je v e-mailu
                </span>
                <Cursor state={s === 5 ? 'in' : s === 6 ? 'click' : 'off'} />
              </span>
              </div>
            </div>
          </div>
        </div>
      </Layer>

      <Layer z={140} className="fw__toast">
        <Toast show={booked} delay={350} icon={ico.user} title="Nová přihláška na jógu" sub="Klára D. · přes web, lekce je plná" />
      </Layer>
    </Scene>
  );
}
