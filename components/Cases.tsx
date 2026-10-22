import { cases } from '@/lib/content';
import { CAL_URL } from '@/lib/config';
import CasesReader from './cases/CasesReader';

export default function Cases() {
  return (
    <section className="section" id="pripady" aria-labelledby="pripady-title">
      <div className="wrap">
        <header className="hd hd--wide reveal">
          <p className="label shead__index" aria-hidden="true">
            <b>05</b>
            Projekty
          </p>
          <h2 className="h2 hd__title" id="pripady-title">
            <span className="silver silver--block">{cases.title}</span>
            <span className="hd__accent">{cases.accent}</span>
          </h2>
          <p className="hd__lead">{cases.lead}</p>
        </header>

        <div className="reveal">
          <CasesReader />
        </div>

        <div className="cs__cta cs__cta--mid">
          <a className="btn btn--primary" href={CAL_URL}>
            {cases.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
