import { useId } from 'react';

/*
 * Značka FainStudio: sova, která pracuje ve dne i v noci. Levé oko je měsíc (noc),
 * pravé plný kotouč (den). Barvy jedou za primární, takže se při změně palety
 * přebarví samy. Plná barva, žádné detaily navíc. Se `live` se probudí, rozhlíží se a mrká (styly .owl* v components.css).
 *
 * Zdroj pro export (PNG/SVG v brand/) drží scripts/brand-export.mjs, geometrie je stejná.
 */
export default function LogoOwl({ className = '', live = false }: { className?: string; live?: boolean }) {
  const id = useId();
  const m = `ow-m${id}`;
  return (
    <svg
      className={`owl${live ? ' owl--live' : ''}${className ? ` ${className}` : ''}`}
      viewBox="12 18 96 96"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <mask id={m} maskUnits="userSpaceOnUse" x="20" y="36" width="44" height="48">
          <rect x="20" y="36" width="44" height="48" fill="#fff" />
          <circle className="owl__phase" cx="42" cy="60" r="9.4" fill="#000" />
        </mask>
      </defs>

      <path
        className="owl__body"
        d="M26 26 44 38Q60 33 76 38L94 26Q100 44 100 64C100 92 84 106 60 106 36 106 20 92 20 64Q20 44 26 26Z"
        fill="var(--primary)"
        stroke="var(--primary)"
        strokeWidth="4"
        strokeLinejoin="round"
      />

      <g className="owl__eye owl__eye--l">
        <circle cx="42" cy="60" r="16" fill="#1d1424" />
        <circle className="owl__pupil owl__pupil--moon" cx="42" cy="60" r="10.5" fill="#ffe8fa" mask={`url(#${m})`} />
      </g>
      <g className="owl__eye owl__eye--r">
        <circle cx="78" cy="60" r="16" fill="#1d1424" />
        <circle className="owl__pupil owl__pupil--sun" cx="78" cy="60" r="10.5" fill="#ffe8fa" />
      </g>

      <path d="M55 74Q60 72 65 74L60 83Z" fill="#1d1424" stroke="#1d1424" strokeWidth="2.6" strokeLinejoin="round" />
    </svg>
  );
}
