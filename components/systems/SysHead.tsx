import { systems } from '@/lib/content';

/** Hlavička sekce „Systémy“ — společná pro všechny varianty. */
export default function SysHead() {
  return (
    <header className="sys-head reveal">
      <p className="label shead__index" aria-hidden="true">
        <b>02</b>
        Systémy
      </p>
      <h2 className="h2 sys-head__title" id="systemy-title">
        <span className="silver silver--block">Šest věcí,</span>
        <span className="sys-head__accent">které stavíme.</span>
      </h2>
      <p className="sys-head__lead">{systems.lead}</p>
    </header>
  );
}
