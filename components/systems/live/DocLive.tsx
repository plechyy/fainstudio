'use client';

import { Cursor, ico, Layer, Scene, Svg, useLoop } from './scene';

/*
 * Dokumenty účetní kanceláře: kurzor vtáhne do okna hromádku dokladů od
 * klienta. Rozprostřou se, každý dostane štítek, odletí do své složky a údaje
 * naskáčou do tabulky pro účetnictví.
 *
 * Fáze: 0 kurzor táhne hromádku · 1 pustí · 2 rozprostřou se · 3 odletí do složek
 *       4 tabulka · 5 drží · 6 doznění
 */
const DUR = [1100, 350, 1000, 1100, 900, 2600, 450];
const DONE = 5;

const folders = ['Faktury', 'Účtenky', 'Smlouvy', 'Výpisy'];

// f = složka, kam doklad patří
const docs = [
  { kind: 'Faktura', who: 'Licence software', v: '1 450 Kč', f: 0 },
  { kind: 'Účtenka', who: 'Čerpací stanice', v: '1 820 Kč', f: 1 },
  { kind: 'Smlouva', who: 'Nájem kanceláře', v: '18 000 Kč', f: 2 },
  { kind: 'Faktura', who: 'Elektronika', v: '24 990 Kč', f: 0 },
  { kind: 'Výpis', who: 'Banka · září', v: '62 pohybů', f: 3 },
  { kind: 'Účtenka', who: 'Kavárna', v: '168 Kč', f: 1 },
  { kind: 'Faktura', who: 'Mobilní operátor', v: '1 290 Kč', f: 0 },
  { kind: 'Účtenka', who: 'Papírnictví', v: '486 Kč', f: 1 },
];

/** Kde doklad v dané fázi je: x, y v % plochy, natočení, hloubka, zmenšení, průhlednost. */
function place(i: number, s: number) {
  const d = docs[i];
  if (s === 6) return { x: 108, y: 20 + i * 2, r: 8, z: 0, k: 1, o: 0 };
  if (s <= 1) return { x: 39 + (i % 3) * 1.5, y: 22 + (i % 4) * 1.2, r: (i % 2 ? 1 : -1) * (2 + i), z: i * 4, k: 1, o: 1 };
  if (s === 2) return { x: 4 + (i % 4) * 24, y: 19 + Math.floor(i / 4) * 31, r: (i % 3) - 1, z: [40, -20, 70, 10, -30, 60, 0, 30][i], k: 1, o: 1 };
  return { x: 8 + d.f * 23.5, y: 72, r: 0, z: 0, k: 0.35, o: 0 };
}

export default function DocLive() {
  const { s, ref } = useLoop(DUR, DONE);
  const sorted = s >= 3 && s <= 5;
  const count = (f: number) => (sorted ? docs.filter((d) => d.f === f).length : 0);

  return (
    <Scene sceneRef={ref} base={480} className={`sc--doc${s === 6 ? ' is-out' : ''}`}>
      <Layer z={-90} className="sc__ghost" />

      <div className="win dk">
        <div className="win__bar">
          <span className="win__dots" />
          <b className="win__name">Doklady · Studio Hana</b>
          <span className="win__live">{sorted ? 'Roztříděno' : s >= 1 ? '8 nových' : 'Čeká na doklady'}</span>
        </div>
        <div className="dk__area">
          <p className={`dk__drop${s === 0 ? ' is-on' : ''}`}>{sorted ? '8 dokladů je ve složkách' : 'Sem doklady přetáhněte'}</p>
          <div className="dk__folders">
            {folders.map((f, i) => (
              <span className={`dk__folder${count(i) ? ' is-on' : ''}`} key={f} style={{ transitionDelay: sorted && s === 3 ? `${300 + i * 120}ms` : undefined }}>
                <Svg>{ico.folder}</Svg>
                {f}
                <b className="num">{count(i)}</b>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* jednotlivé doklady: volně v prostoru, ať se můžou rozletět do hloubky */}
      {docs.map((d, i) => {
        const p = place(i, s);
        return (
          <div
            className="dk__doc"
            key={i}
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              opacity: p.o,
              transform: `translateZ(${p.z}px) rotate(${p.r}deg) scale(${p.k})`,
              transitionDelay: s === 2 || s === 3 ? `${i * 50}ms` : undefined,
              zIndex: docs.length - i,
            }}
          >
            <span className={`dk__kind dk__kind--${d.f}${s === 2 ? ' is-on' : ''}`}>{d.kind}</span>
            <b>{d.who}</b>
            <i />
            <i />
            <span className="num">{d.v}</span>
            {i === 0 && <Cursor state={s === 0 ? 'click' : s === 1 ? 'in' : 'off'} className="dk__cur" />}
          </div>
        );
      })}

      <Layer z={110} className={`dk__out-l${s === 4 || s === 5 ? ' is-in' : ''}`}>
        <div className="dk__out">
          <p className="dk__outh">
            <Svg>{ico.table}</Svg>
            Do účetnictví
          </p>
          {docs
            .filter((d) => d.kind === 'Faktura')
            .map((d) => (
              <p className="dk__line" key={d.who}>
                <span>{d.who}</span>
                <span className="num">{d.v}</span>
                <span>DPH 21 %</span>
              </p>
            ))}
          <p className="dk__more">a dalších 5 dokladů</p>
        </div>
      </Layer>
    </Scene>
  );
}
