import { process } from '@/lib/content';
import ShaderBackground from './ShaderBackground';

/*
 * Postup: časová osa. Jedna tenká linka přes všechny kroky, na ní čtvercové uzly
 * (stejný motiv jako vodiče v Systémech, ale klidný, bez výbojů). Mrak je atmosféra
 * za nadpisem a k řadě kroků se rozpustí, aby text ležel na klidném podkladu.
 */
export default function Process() {
  const steps = process.steps;

  return (
    <section className="section proc-section" id="postup" aria-labelledby="postup-title">
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

        <ol className="tl reveal">
          {steps.map((s, i) => (
            <li key={i} className="tl__step" style={{ ['--i' as string]: i }}>
              <div className="tl__mark" aria-hidden="true">
                <i className="tl__node" />
                <span className="tl__num num">0{i + 1}</span>
              </div>
              <h3 className="tl__name">{s.name}</h3>
              <p className="tl__text">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
