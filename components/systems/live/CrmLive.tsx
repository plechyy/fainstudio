'use client';

import { Cursor, fmt, ico, Layer, Scene, Svg, Toast, useCount, useLoop } from './scene';

/*
 * CRM marketingové agentury: kurzor chytí obchod ve sloupci Nabídka a přetáhne
 * ho do Podepsáno. Tím se samo rozjede všechno ostatní: záloha, projekt
 * s úkoly, uvítací mail a schůzka v kalendáři.
 *
 * Fáze: 0 nástěnka · 1 kurzor přijede · 2 chytí · 3 táhne · 4 pustí
 *       5 rozjede se zbytek · 6 drží · 7 doznění
 */
const DUR = [900, 900, 350, 1000, 450, 1200, 2800, 450];
const DONE = 6;

type Deal = { t: string; d: string; v: string; who: string };

const cols: { name: string; deals: Deal[] }[] = [
  {
    name: 'Nový kontakt',
    deals: [
      { t: 'Bistro Zelená', d: 'Nový web', v: '48 000', who: 'JK' },
      { t: 'Fyzio Plus', d: 'Kampaň', v: '32 000', who: 'MV' },
    ],
  },
  { name: 'Schůzka', deals: [{ t: 'Hotel Kamýk', d: 'Rebranding', v: '120 000', who: 'JK' }] },
  { name: 'Nabídka', deals: [{ t: 'Autoškola Max', d: 'Video', v: '64 000', who: 'MV' }] },
  { name: 'Podepsáno', deals: [{ t: 'Studio Jóga', d: 'Web', v: '54 000', who: 'TP' }] },
];

const target: Deal = { t: 'Kavárna Lísek', d: 'E-shop a fotky', v: '186 000', who: 'TP' };

function Card({ deal, className = '', children }: { deal: Deal; className?: string; children?: React.ReactNode }) {
  return (
    <div className={`crm__card ${className}`}>
      <b>{deal.t}</b>
      <span className="crm__d">{deal.d}</span>
      <span className="crm__foot">
        <span className="num">{deal.v} Kč</span>
        <i className="crm__who">{deal.who}</i>
      </span>
      {children}
    </div>
  );
}

export default function CrmLive() {
  const { s, ref } = useLoop(DUR, DONE);
  const kpi = useCount(412000, 598000, s, 5, 1000);
  const moved = s >= 4 && s <= 6;
  const cascade = s === 5 || s === 6;

  const cardState = s === 2 ? ' is-lift' : s === 3 ? ' is-drag' : moved ? ' is-moved' : '';
  const cur = s === 1 || s === 4 ? 'in' : s === 2 || s === 3 ? 'click' : 'off';

  return (
    <Scene sceneRef={ref} base={560} className={`sc--crm${s === 7 ? ' is-out' : ''}`}>
      <Layer z={-90} className="sc__ghost" />

      <div className="win crm">
        <div className="win__bar">
          <span className="win__dots" />
          <b className="win__name">Obchody</b>
          <span className={`crm__kpi${cascade ? ' is-up' : ''}`}>
            Podepsáno v říjnu <b className="num">{fmt(kpi)} Kč</b>
          </span>
        </div>

        <div className="crm__board">
          {cols.map((c, i) => {
            const n = c.deals.length + (i === 2 ? (moved ? 0 : 1) : i === 3 ? (moved ? 1 : 0) : 0);
            return (
              <div className={`crm__col${i === 3 && (s === 3 || s === 4) ? ' is-target' : ''}`} key={c.name}>
                <p className="crm__head">
                  {c.name} <span className="num">{n}</span>
                </p>
                {i === 2 && (
                  <Card deal={target} className={`crm__card--hot${cardState}`}>
                    <Cursor state={cur} className="crm__cur" />
                  </Card>
                )}
                {i === 3 && <div className={`crm__slot${s === 2 || s === 3 ? ' is-on' : ''}`} />}
                {c.deals.map((d) => (
                  <Card deal={d} key={d.t} />
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {/* co se rozjede samo, každé v jiné hloubce */}
      <Layer z={140} className="crm__t1">
        <Toast show={cascade} icon={ico.invoice} title="Zálohová faktura vystavena" sub="Kavárna Lísek · 93 000 Kč" />
      </Layer>
      <Layer z={70} className="crm__t2">
        <Toast show={cascade} delay={350} icon={ico.board} title="Projekt založen" sub="8 úkolů rozdělených týmu" />
      </Layer>
      <Layer z={170} className="crm__t3">
        <Toast show={cascade} delay={700} icon={ico.mail} title="Uvítací mail odeslán" sub="Kontakty a postup prvních dní" />
      </Layer>
      <Layer z={40} className="crm__t4">
        <Toast show={cascade} delay={1050} icon={ico.cal} title="Úvodní schůzka v kalendáři" sub="Út 4. 11. v 10:00 · celý tým" />
      </Layer>
    </Scene>
  );
}
