import { STAR_D, STAR_STROKE } from '@/lib/star';

/* Kreslená šestícípá hvězdička (značka). Barva se bere z currentColor. */
export default function Star({ className = '' }: { className?: string }) {
  return (
    <svg className={`star${className ? ` ${className}` : ''}`} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <path d={STAR_D} fill="none" stroke="currentColor" strokeWidth={STAR_STROKE} strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}
