'use client';

import { CountUp, Cursor, ico, Layer, Scene, Svg, useLoop } from './scene';

/*
 * Hlídání trhu pro stavební firmu: systém ráno projde desítky portálů
 * s veřejnými zakázkami, z tisíců vyfiltruje tři, které firma zvládne,
 * a po kliknutí k té nejlepší rovnou připraví koncept nabídky.
 *
 * Fáze: 0 prochází zdroje · 1–4 filtry jeden po druhém · 5 výsledky
 *       6 kurzor přijede · 7 klik · 8 koncept nabídky · 9 drží · 10 doznění
 */
const DUR = [1600, 480, 480, 480, 480, 1000, 850, 350, 1300, 2600, 450];
const DONE = 9;

const sources = [
  'Věstník zakázek',
  'Národní elektronický nástroj',
  'Jihomoravský kraj',
  'Město Brno',
  'Kraj Vysočina',
  'Statutární město Zlín',
  'Správa silnic',
  'Ředitelství vodních cest',
  'Fakultní nemocnice',
  'Masarykova univerzita',
  'Město Kuřim',
  'Obec Šlapanice',
];

const filters = [
  { t: 'Obor: stavby a rekonstrukce', n: 186 },
  { t: 'Kraj: Jihomoravský', n: 41 },
  { t: 'Hodnota do 15 mil. Kč', n: 9 },
  { t: 'Termín, který stihnete', n: 3 },
];
const nums = [2341, ...filters.map((f) => f.n)];

const results = [
  { t: 'Rekonstrukce ZŠ Líšeň', v: '12,4 mil. Kč', m: 94 },
  { t: 'Oprava fasády radnice, Kuřim', v: '6,8 mil. Kč', m: 81 },
  { t: 'Chodníky Brno-Slatina', v: '3,2 mil. Kč', m: 77 },
];

const draft = ['Reference ze 3 podobných staveb', 'Rozpočet podle výkazu výměr', 'Harmonogram na 14 týdnů', 'Podklady k podpisu'];

export default function WatchLive() {
  const { s, ref } = useLoop(DUR, DONE);
  const f = Math.min(s, 4);
  // počítadlo běží ve vlastní komponentě, ať se kvůli němu nepřekresluje celá scéna v každém snímku
  const n =
    s === 0 ? (
      <CountUp from={0} to={nums[0]} s={s} phase={0} ms={1450} />
    ) : s <= 4 ? (
      <CountUp key={s} from={nums[f - 1]} to={nums[f]} s={s} phase={s} ms={420} />
    ) : (
      nums[4]
    );
  const view = s === 0 ? 'scan' : s <= 4 ? 'funnel' : 'results';

  return (
    <Scene sceneRef={ref} base={460} className={`sc--watch${s === 10 ? ' is-out' : ''}`}>
      <Layer z={-90} className="sc__ghost" />

      <div className="win tn">
        <div className="win__bar">
          <span className="win__dots" />
          <b className="win__name">Hlídání zakázek · Stavby Brabec</b>
          <span className="win__live">{s === 0 ? 'Prochází zdroje' : 'Dnes 6:00'}</span>
        </div>

        <p className="tn__count">
          <b className="num">{n}</b>
          <span>{s === 0 ? 'nových zakázek dnes' : s <= 4 ? 'po filtrech' : 'zakázky pro vás'}</span>
        </p>

        <div className="tn__stage">
          <ul className={`tn__src${view === 'scan' ? ' is-on' : ''}`}>
            {sources.map((x, i) => (
              <li key={x} style={{ animationDelay: `${i * 110}ms` }}>
                <Svg>{ico.globe}</Svg>
                {x}
              </li>
            ))}
          </ul>

          <ol className={`tn__fun${view === 'funnel' ? ' is-on' : ''}`}>
            {filters.map((x, i) => (
              <li className={s >= i + 1 ? 'is-on' : ''} key={x.t} style={{ width: `${100 - i * 15}%` }}>
                <span>{x.t}</span>
                <b className="num">{x.n}</b>
              </li>
            ))}
          </ol>

          <ul className={`tn__res${view === 'results' ? ' is-on' : ''}`}>
            {results.map((r, i) => (
              <li className={i === 0 ? 'is-best' : ''} key={r.t} style={{ transitionDelay: view === 'results' && s === 5 ? `${i * 140}ms` : undefined }}>
                <span>
                  <b>{r.t}</b>
                  <span className="num">{r.v}</span>
                </span>
                <span className="tn__m num">{r.m} %</span>
                {i === 0 && (
                  <span className="tn__go">
                    <span className={`sc-btn${s === 7 ? ' is-press' : ''}`}>Připravit nabídku</span>
                    <Cursor state={s === 6 ? 'in' : s === 7 ? 'click' : 'off'} />
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* koncept nabídky, který vyletí dopředu */}
      <Layer z={120} className={`tn__draft-l${s === 8 || s === 9 ? ' is-in' : ''}`}>
        <div className="tn__draft">
          <p className="tn__dh">
            <Svg>{ico.invoice}</Svg>
            Koncept nabídky
          </p>
          <b className="tn__dt">Rekonstrukce ZŠ Líšeň</b>
          <ul>
            {draft.map((d, i) => (
              <li key={d} style={{ transitionDelay: s === 8 ? `${250 + i * 220}ms` : undefined }}>
                <Svg className="sc-ok">{ico.check}</Svg>
                {d}
              </li>
            ))}
          </ul>
        </div>
      </Layer>
    </Scene>
  );
}
