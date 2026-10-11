import { CAL_URL } from '@/lib/config';

/** Samostatné CTA tlačítko mezi sekcemi (text přebírá existující popisky z briefu). */
export default function CtaRow({ label }: { label: string }) {
  return (
    <div className="cta-row reveal">
      <a className="btn btn--primary" href={CAL_URL}>
        {label}
        <span className="btn__arrow" aria-hidden="true">
          →
        </span>
      </a>
    </div>
  );
}
