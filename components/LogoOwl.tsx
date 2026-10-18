import { useId } from 'react';

/*
 * Značka FainStudio: sova, která pracuje ve dne i v noci. Levé oko je měsíc (noc),
 * pravé plný kotouč (den). Barvy jedou za primární, takže se při změně palety
 * přebarví samy. Se `live` se probudí, rozhlíží se a mrká (styly .owl* v components.css).
 *
 * Zdroj pro export (PNG/SVG v brand/) drží scripts/brand-export.mjs, geometrie je stejná.
 */
export default function LogoOwl({ className = '', live = false }: { className?: string; live?: boolean }) {
  const id = useId();
  const g = `ow-g${id}`;
  const m = `ow-m${id}`;
  return (
    <svg
      className={`owl${live ? ' owl--live' : ''}${className ? ` ${className}` : ''}`}
      viewBox="12 18 96 96"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={g} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: 'oklch(from var(--primary) calc(l + 0.05) calc(c * 0.8) h)' }} />
          <stop offset="1" style={{ stopColor: 'oklch(from var(--primary) calc(l - 0.17) c h)' }} />
        </linearGradient>
        <mask id={m} maskUnits="userSpaceOnUse" x="20" y="35" width="44" height="48">
          <rect x="20" y="35" width="44" height="48" fill="#fff" />
          <circle className="owl__phase" cx="42" cy="59" r="9.4" fill="#000" />
        </mask>
      </defs>

      <g className="owl__body">
        <path
          d="M24 24 41 37Q60 30 79 37L96 24Q102 44 102 64C102 92 86 109 60 109 34 109 18 92 18 64Q18 44 24 24Z"
          fill={`url(#${g})`}
          stroke={`url(#${g})`}
          strokeWidth="5"
          strokeLinejoin="round"
        />
        <path
          d="M20 68C20 90 33 103 47 107 38 96 33 84 33 70Z M100 68C100 90 87 103 73 107 82 96 87 84 87 70Z"
          fill="#6b2a73"
          fillOpacity=".22"
        />
        <path
          d="M60 41C48 31 27 38 27 59 27 77 43 85 60 82 77 85 93 77 93 59 93 38 72 31 60 41Z"
          fill="#fff"
          fillOpacity=".26"
        />
        <path
          d="M46 92l6 5 6-5M62 92l6 5 6-5"
          fill="none"
          stroke="#6b2a73"
          strokeOpacity=".35"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      <g className="owl__eye owl__eye--l">
        <circle cx="42" cy="59" r="15.5" fill="#1d1424" />
        <circle className="owl__pupil owl__pupil--moon" cx="42" cy="59" r="10.5" fill="#ffe8fa" mask={`url(#${m})`} />
      </g>
      <g className="owl__eye owl__eye--r">
        <circle cx="78" cy="59" r="15.5" fill="#1d1424" />
        <circle className="owl__pupil owl__pupil--sun" cx="78" cy="59" r="10.5" fill="#ffe8fa" />
      </g>

      <path d="M55 71Q60 68.5 65 71L60 81Z" fill="#1d1424" stroke="#1d1424" strokeWidth="2.6" strokeLinejoin="round" />
    </svg>
  );
}
