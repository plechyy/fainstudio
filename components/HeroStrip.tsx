/*
 * Pás log pod hero. ZATÍM ZÁSTUPNÝ: deset vymyšlených firem, jen aby bylo vidět, jak pás vypadá.
 * Nejsou to skuteční klienti. Před spuštěním nahradit skutečnými logy klientů se souhlasem
 * (jinak by web tvrdil reference, které neexistují), nebo pás odstranit.
 *
 * Logo = jeden záznam v LOGOS. Různé styly schválně: zkratky, slovo, ikona + název.
 */
import type { ReactNode } from 'react';

type Logo = { name: string; node: ReactNode };

const LOGOS: Logo[] = [
  {
    name: 'NTRK',
    node: (
      <span className="lg lg--ntrk">
        <i />
        NTRK
      </span>
    ),
  },
  {
    name: 'Halvor & Finch',
    node: (
      <span className="lg lg--serif">
        Halvor <em>&amp;</em> Finch
      </span>
    ),
  },
  {
    name: 'Orbitel',
    node: (
      <span className="lg lg--orbitel">
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <ellipse cx="16" cy="16" rx="13" ry="6" transform="rotate(-28 16 16)" />
          <circle cx="16" cy="16" r="4.2" className="fill" />
        </svg>
        orbitel
      </span>
    ),
  },
  {
    name: 'KAIRO',
    node: (
      <span className="lg lg--kairo">
        <b />
        KAIRO
      </span>
    ),
  },
  {
    name: 'mersa',
    node: <span className="lg lg--mersa">mersa<i>.</i></span>,
  },
  {
    name: 'ZX',
    node: (
      <span className="lg lg--zx">
        <svg viewBox="0 0 36 40" aria-hidden="true">
          <path d="M18 2 33 10.5v19L18 38 3 29.5v-19z" />
          <text x="18" y="25.5" textAnchor="middle">ZX</text>
        </svg>
      </span>
    ),
  },
  {
    name: 'Lumenfold',
    node: (
      <span className="lg lg--lumen">
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path d="M16 3 29 13 16 17 3 13z" className="fill" />
          <path d="m3 18 13 4 13-4M3 23.5 16 28l13-4.5" />
        </svg>
        Lumenfold
      </span>
    ),
  },
  {
    name: 'Brightway',
    node: (
      <span className="lg lg--bright">
        Brightway
        <svg viewBox="0 0 120 10" aria-hidden="true">
          <path d="M2 7c26-6 66-7 116-2" />
        </svg>
      </span>
    ),
  },
  {
    name: 'QUILLON',
    node: (
      <span className="lg lg--quillon">
        QUILLON
        <i />
      </span>
    ),
  },
  {
    name: 'Atlas Nine',
    node: (
      <span className="lg lg--atlas">
        <svg viewBox="0 0 36 36" aria-hidden="true">
          <circle cx="18" cy="18" r="15.5" />
          <text x="18" y="24" textAnchor="middle">9</text>
        </svg>
        <span>
          ATLAS
          <small>NINE</small>
        </span>
      </span>
    ),
  },
];

export default function HeroStrip() {
  return (
    <div className="hero__strip seq" style={{ ['--i' as string]: 5 }} aria-hidden="true">
      <div className="lgs">
        <div className="lgs__track">
          {[0, 1].map((k) => (
            <ul className="lgs__row" key={k}>
              {LOGOS.map((l) => (
                <li key={`${k}-${l.name}`}>{l.node}</li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
