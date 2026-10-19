import { CAL_URL } from '@/lib/config';

/** Samostatné CTA tlačítko mezi sekcemi (text přebírá existující popisky z briefu). */
export default function CtaRow({ label, align = 'center' }: { label: string; align?: 'left' | 'center' | 'right' }) {
  return (
    <div className={`cta-row cta-row--${align} reveal`}>
      <a className="btn btn--primary" href={CAL_URL}>
        {label}
      </a>
    </div>
  );
}
