import { useId } from 'react';

/*
 * Značka FainStudio: sova, kterou tvoří jen oči a zobák. Levé oko je měsíc (noc),
 * pravé plný kotouč (den): systém pracuje ve dne i v noci. Barvy jedou za primární,
 * takže se při změně palety přebarví samy.
 */
export default function LogoMark({ className }: { className?: string }) {
  const id = useId();
  const g = `lm-g${id}`;
  const m = `lm-m${id}`;
  return (
    <svg className={className} viewBox="14 36 92 56" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={g} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: 'oklch(from var(--primary) calc(l + 0.05) c h)' }} />
          <stop offset="1" style={{ stopColor: 'oklch(from var(--primary) calc(l - 0.17) c h)' }} />
        </linearGradient>
        <mask id={m} maskUnits="userSpaceOnUse" x="0" y="0" width="120" height="120">
          <rect width="120" height="120" fill="#fff" />
          <circle cx="43" cy="56.5" r="9" fill="#000" />
        </mask>
      </defs>
      <circle cx="38" cy="60" r="22" fill={`url(#${g})`} />
      <circle cx="82" cy="60" r="22" fill={`url(#${g})`} />
      <circle cx="38" cy="60" r="13.5" fill="#1d1424" />
      <circle cx="82" cy="60" r="13.5" fill="#1d1424" />
      <circle cx="38" cy="60" r="10" fill="#ffe8fa" mask={`url(#${m})`} />
      <circle cx="82" cy="60" r="10" fill="#ffe8fa" />
      <path
        d="M52.5 66Q60 62 67.5 66L60 86Z"
        fill="#ffc4f3"
        stroke="#141217"
        strokeWidth="3.2"
        strokeLinejoin="round"
        paintOrder="stroke"
      />
    </svg>
  );
}
