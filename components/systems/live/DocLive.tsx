'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Cursor, ico, Layer, Scene, Svg, useLoop } from './scene';

/*
 * Dokumenty účetní kanceláře: kurzor přinese do okna úhlednou hromádku dokladů
 * od klienta. Systém je pak bere jeden po druhém z vršku: přečte, doklad dostane
 * štítek a odletí do své složky, ve které cvakne počítadlo. Nakonec údaje
 * naskáčou do tabulky pro účetnictví.
 *
 * Fáze: 0 příprava (hromádka mimo okno) · 1 kurzor ji přitáhne · 2 pustí
 *       3 třídění jeden po druhém · 4 tabulka · 5 drží · 6 doznění
 */
const STEP = 430; // po kolika ms odletí další doklad
const READ = 230; // jak dlouho se doklad „čte“ (štítek svítí), než odletí
const FLY = 640; // let do složky
const SORT = 8 * STEP + FLY + 150;
const DUR = [80, 1050, 420, SORT, 900, 2600, 450];
const DONE = 5;

const folders = ['Faktury', 'Účtenky', 'Smlouvy', 'Výpisy'];

// pořadí = pořadí, ve kterém odletí (první je navrchu hromádky); f = složka
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
const N = docs.length;

type Pt = { x: number; y: number };
type Geo = { stack: Pt; folders: Pt[] };

/** pozice prvku vůči předkovi `to` (offsety, takže je nezajímá 3D náklon ani zoom) */
function rel(el: HTMLElement, to: HTMLElement): Pt {
  let x = 0;
  let y = 0;
  for (let e: HTMLElement | null = el; e && e !== to; e = e.offsetParent as HTMLElement | null) {
    x += e.offsetLeft;
    y += e.offsetTop;
  }
  return { x: x + el.offsetWidth / 2, y: y + el.offsetHeight / 2 };
}

/** milisekundy od začátku fáze `phase`, jinak 0 */
function useElapsed(s: number, phase: number) {
  const [t, setT] = useState(0);
  useEffect(() => {
    if (s !== phase) return;
    const t0 = performance.now();
    setT(0);
    const id = window.setInterval(() => setT(performance.now() - t0), 40);
    return () => clearInterval(id);
  }, [s, phase]);
  return s === phase ? t : 0;
}

export default function DocLive() {
  const { s, ref } = useLoop(DUR, DONE);
  const t = useElapsed(s, 3);
  const layer = useRef<HTMLDivElement>(null);
  const drop = useRef<HTMLParagraphElement>(null);
  const folderRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [geo, setGeo] = useState<Geo | null>(null);

  // kde je střed hromádky a středy složek (v px vrstvy s doklady)
  useLayoutEffect(() => {
    const L = layer.current;
    const d = drop.current;
    if (!L || !d) return;
    const measure = () => {
      const to = L.offsetParent as HTMLElement | null;
      if (!to) return;
      const o = rel(L, to);
      const base = { x: o.x - L.offsetWidth / 2, y: o.y - L.offsetHeight / 2 };
      const at = (el: HTMLElement) => {
        const p = rel(el, to);
        return { x: p.x - base.x, y: p.y - base.y };
      };
      setGeo({ stack: at(d), folders: folderRefs.current.map((f) => (f ? at(f) : { x: 0, y: 0 })) });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(L);
    return () => ro.disconnect();
  }, []);

  // stav každého dokladu ve fázi třídění
  const launched = (i: number) => s > 3 || (s === 3 && t >= i * STEP + READ);
  const reading = (i: number) => s === 3 && t >= i * STEP && !launched(i);
  const arrived = (i: number) => s > 3 || (s === 3 && t >= i * STEP + READ + FLY);
  const filed = s >= 3 && s <= 6;
  const count = (f: number) => (filed ? docs.filter((d, i) => d.f === f && arrived(i)).length : 0);
  // složka krátce blikne, když do ní doklad zrovna dopadl
  const hit = (f: number) =>
    s === 3 && docs.some((d, i) => d.f === f && t >= i * STEP + READ + FLY && t < i * STEP + READ + FLY + 320);
  const allIn = s >= 4 && s <= 5;

  return (
    <Scene sceneRef={ref} base={480} className={`sc--doc${s === 6 ? ' is-out' : ''}`}>
      <Layer z={-90} className="sc__ghost" />

      <div className="win dk">
        <div className="win__bar">
          <span className="win__dots" />
          <b className="win__name">Doklady · Studio Hana</b>
          <span className="win__live">{allIn ? 'Roztříděno' : s === 3 ? `Třídím ${Math.min(N, docs.filter((_, i) => launched(i)).length)}/${N}` : s >= 2 ? '8 nových' : 'Čeká na doklady'}</span>
        </div>
        <div className="dk__area">
          <p className={`dk__drop${s === 1 ? ' is-on' : ''}`} ref={drop}>
            <span className={allIn ? 'is-on' : ''}>{allIn || s === 6 ? '8 dokladů je ve složkách' : s >= 2 ? '' : 'Sem doklady přetáhněte'}</span>
          </p>
          <div className="dk__folders">
            {folders.map((f, i) => (
              <span
                className={`dk__folder${count(i) ? ' is-on' : ''}${hit(i) ? ' is-hit' : ''}`}
                key={f}
                ref={(el) => {
                  folderRefs.current[i] = el;
                }}
              >
                <Svg>{ico.folder}</Svg>
                {f}
                <b className="num">{count(i)}</b>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* doklady: vlastní vrstva, ať je scéna při doznění neztlumí naráz se vším */}
      <div className="dk__docs" ref={layer}>
        {geo &&
          docs.map((d, i) => {
            const depth = N - 1 - i; // 0 = spodek hromádky
            const st = geo.stack;
            let x = st.x - 1.2 * depth;
            let y = st.y - 2.2 * depth;
            let r = (i % 2 ? 1 : -1) * (0.6 + (i % 3) * 0.7);
            let k = 1;
            let o = 1;
            let mode = 'stack';
            if (s === 0) {
              // čeká mimo okno vpravo nahoře, neviditelná, bez animace
              x += 150;
              y -= 70;
              r += 8;
              o = 0;
              mode = 'prep';
            } else if (s === 1) {
              mode = 'drag';
            } else if (launched(i) && s !== 0) {
              const f = geo.folders[d.f];
              x = f.x;
              y = f.y;
              r = 0;
              k = 0.22;
              o = 0;
              mode = 'fly';
            } else if (reading(i)) {
              y -= 10;
              k = 1.05;
              r = 0;
              mode = 'read';
            }
            return (
              <div
                key={i}
                className={`dk__doc-x is-${mode}`}
                style={{ transform: `translate3d(${x}px, 0, 0)`, zIndex: N - i }}
              >
                <div className="dk__doc-y" style={{ transform: `translate3d(0, ${y}px, ${i === 0 ? 2 : 0}px)` }}>
                  <div className="dk__doc" style={{ transform: `translate(-50%, -50%) rotate(${r}deg) scale(${k})`, opacity: o }}>
                    <span className={`dk__kind dk__kind--${d.f}${reading(i) || launched(i) ? ' is-on' : ''}`}>{d.kind}</span>
                    <b>{d.who}</b>
                    <i />
                    <i />
                    <span className="num">{d.v}</span>
                    {i === 0 && <Cursor state={s === 1 ? 'click' : s === 2 ? 'in' : 'off'} className="dk__cur" />}
                  </div>
                </div>
              </div>
            );
          })}
      </div>

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
