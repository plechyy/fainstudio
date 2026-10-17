'use client';

import { Cursor, ico, Layer, Scene, Svg, useLoop } from './scene';

/*
 * Poptávky realitní kanceláře: zprávy z webu, Instagramu a mailu se slijí do
 * jedné schránky, každá dostane odpověď. Zájemkyně si v telefonu ťukne termín
 * a schránka se přetočí v kalendář makléře, kde už prohlídka sedí.
 *
 * Fáze: 0 zprávy přijdou · 1 slijí se · 2 odpovědi a telefon · 3 prst přijede
 *       4 ťuk · 5 přetočení · 6 drží · 7 doznění
 */
const DUR = [1100, 900, 1100, 850, 350, 1000, 2800, 450];
const DONE = 6;

const sources = [
  { ico: ico.globe, ch: 'Formulář na webu', msg: 'Je byt 2+kk v Karlíně ještě volný?', who: 'Jana Nováková', cls: 'mx__src--web' },
  { ico: ico.chat, ch: 'Instagram', msg: 'Šla by prohlídka ještě tento týden?', who: '@martin.kral', cls: 'mx__src--ig' },
  { ico: ico.mail, ch: 'E-mail', msg: 'Hledáme kancelář kolem 60 m², Vinohrady.', who: 'Orbis s.r.o.', cls: 'mx__src--mail' },
];

const slots = ['Út 17:00', 'St 9:30', 'Čt 16:00'];

export default function MailLive() {
  const { s, ref } = useLoop(DUR, DONE);
  const merged = s >= 1 && s <= 6;
  const replied = s >= 2 && s <= 6;
  const flipped = s >= 5 && s <= 6;
  const picked = s >= 4 && s <= 6;

  return (
    <Scene sceneRef={ref} base={460} className={`sc--mail${s === 7 ? ' is-out' : ''}`}>
      <Layer z={-90} className="sc__ghost" />

      {/* zprávy z různých míst, které se slijí do schránky */}
      {sources.map((m, i) => (
        <Layer z={[90, 140, 60][i]} className={`mx__src ${m.cls}${s === 0 ? ' is-in' : s === 1 ? ' is-merge' : ''}`} key={m.ch}>
          <div style={{ transitionDelay: s === 0 ? `${i * 220}ms` : undefined }}>
            <p className="mx__ch">
              <Svg>{m.ico}</Svg>
              {m.ch}
            </p>
            <p className="mx__msg">{m.msg}</p>
            <p className="mx__by">{m.who}</p>
          </div>
        </Layer>
      ))}

      {/* schránka a z druhé strany kalendář */}
      <div className={`mx__flip${flipped ? ' is-flipped' : ''}`}>
        <div className="win mx__face">
          <div className="win__bar">
            <span className="win__dots" />
            <b className="win__name">Poptávky · Byty Vltava</b>
            <span className="win__live">{replied ? 'Vše zodpovězeno' : '3 nové'}</span>
          </div>
          <ul className="mx__list">
            {sources.map((m, i) => (
              <li className={`mx__row${merged ? ' is-in' : ''}`} key={m.ch} style={{ transitionDelay: merged && s === 1 ? `${i * 160}ms` : undefined }}>
                <span className="mx__rico">
                  <Svg>{m.ico}</Svg>
                </span>
                <span className="mx__rmain">
                  <b>{m.who}</b>
                  <span>{m.msg}</span>
                </span>
                <span className={`mx__tag${replied ? ' is-on' : ''}`} style={{ transitionDelay: replied && s === 2 ? `${i * 200}ms` : undefined }}>
                  {replied ? 'Odpovězeno' : m.ch === 'E-mail' ? 'Mail' : m.ch === 'Instagram' ? 'IG' : 'Web'}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="win mx__face mx__face--back">
          <div className="win__bar">
            <span className="win__dots" />
            <b className="win__name">Kalendář · makléř Petr</b>
          </div>
          <div className="mx__cal">
            <span />
            {['Út 28.', 'St 29.', 'Čt 30.'].map((d) => (
              <b key={d}>{d}</b>
            ))}
            {['9:00', '11:00', '13:00', '15:00', '17:00'].map((h) => (
              <i key={h} className="num">
                {h}
              </i>
            ))}
            <span className="mx__ev" style={{ gridColumn: 2, gridRow: '3 / 4' }}>
              Předání bytu
            </span>
            <span className="mx__ev" style={{ gridColumn: 4, gridRow: '5 / 6' }}>
              Focení 3+1
            </span>
            <span className={`mx__ev mx__ev--new${flipped ? ' is-in' : ''}`} style={{ gridColumn: 3, gridRow: '2 / 3' }}>
              <b>Prohlídka 2+kk Karlín</b>
              Jana Nováková · 9:30
            </span>
          </div>
        </div>
      </div>

      {/* telefon zájemkyně: odpověď přišla, vybere si termín */}
      <Layer z={110} className={`mx__phone-l${replied ? ' is-in' : ''}`}>
        <div className="mx__phone">
          <span className="mx__notch" />
          <p className="mx__bub">Dobrý den, byt je volný. Kdy se vám hodí prohlídka?</p>
          <div className="mx__slots">
            {slots.map((t, i) => (
              <span className={`mx__slot${i === 1 && picked ? ' is-on' : ''}`} key={t}>
                {t}
                {i === 1 && <Cursor state={s === 3 ? 'in' : s === 4 ? 'click' : 'off'} className="mx__cur" />}
              </span>
            ))}
          </div>
          <p className={`mx__ok${s >= 5 && s <= 6 ? ' is-in' : ''}`}>
            <Svg className="sc-ok">{ico.check}</Svg>
            Potvrzeno, St 29. 10. v 9:30
          </p>
        </div>
      </Layer>
    </Scene>
  );
}
