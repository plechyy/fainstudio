import { process } from '@/lib/content';
import ShaderBackground from './ShaderBackground';

/*
 * Postup: čtyři kroky v jedné řadě, jen typografie na kouři (žádné karty ani vodič).
 */
export default function Process() {
  const steps = process.steps;

  return (
    <section className="section proc-section" id="postup" aria-labelledby="postup-title">
      {/* jeden mrak uprostřed, plná síla jako v hero */}
      <div className="proc-bg" aria-hidden="true">
        <ShaderBackground center phase={70} />
      </div>
      <div className="wrap">
        <header className="proc-head reveal">
          <p className="label shead__index" aria-hidden="true">
            <b>03</b>
            Postup
          </p>
          <h2 className="h2 proc-head__title silver" id="postup-title">
            {process.title}
          </h2>
          <p className="proc-head__lead">{process.lead}</p>
        </header>

        <ol className="proc__list reveal">
          {steps.map((s, i) => (
            <li key={i} className="pcard">
              <div className="pcard__top">
                <span className="pcard__num num" aria-hidden="true">
                  0{i + 1}
                </span>
                <span className="pcard__of num" aria-hidden="true">
                  / 04
                </span>
              </div>
              <h3 className="pcard__name">{s.name}</h3>
              <p className="pcard__text">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
