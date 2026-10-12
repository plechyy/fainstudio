'use client';

import { useEffect, useRef, useState } from 'react';
import { process } from '@/lib/content';
import ShaderBackground from './ShaderBackground';

/*
 * Postup jako „načítání“: nad každým krokem jeden úsek progress baru (jako příběhy na
 * sociálních sítích). Úseky se plní jeden po druhém, právě plněný krok je rozsvícený,
 * hotové zůstanou plné, budoucí čekají ztlumené. Po posledním krátká pauza a znovu.
 * Najetí / fokus na krok ho podrží. Reduced motion: všechno plné a rozsvícené.
 */

const STEP_MS = 3200; // jak dlouho se plní jeden úsek
const HOLD_MS = 1600; // pauza na plném baru před dalším kolem

export default function Process() {
  const steps = process.steps;
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState<number | null>(null); // krok pod myší / fokusem
  const [inView, setInView] = useState(false);
  const [still, setStill] = useState(false); // reduced motion
  const [done, setDone] = useState(false); // celé kolo doběhlo, drží se plné
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    setStill(matchMedia('(prefers-reduced-motion: reduce)').matches);
    const el = listRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // po doběhnutí posledního úseku chvíli podržet a začít znovu
  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => {
      setDone(false);
      setActive(0);
    }, HOLD_MS);
    return () => clearTimeout(t);
  }, [done]);

  const next = () => {
    if (active < steps.length - 1) setActive(active + 1);
    else setDone(true);
  };

  const shown = held ?? active;
  const playing = inView && held === null && !still && !done;

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

        <ol
          ref={listRef}
          className="steps reveal"
          data-still={still || undefined}
          style={{ ['--step' as string]: `${STEP_MS}ms` }}
        >
          {steps.map((s, i) => {
            const state = still || done ? 'done' : i < shown ? 'done' : i === shown ? 'now' : 'next';
            return (
              <li
                key={i}
                className="step"
                data-state={state}
                tabIndex={0}
                onMouseEnter={() => setHeld(i)}
                onMouseLeave={() => setHeld(null)}
                onFocus={() => setHeld(i)}
                onBlur={() => setHeld(null)}
              >
                <span className="step__bar" aria-hidden="true">
                  <span
                    key={state === 'now' ? `run-${active}-${held ?? 'x'}` : state}
                    className="step__fill"
                    data-run={state === 'now' && held === null ? '' : undefined}
                    style={{ animationPlayState: playing ? 'running' : 'paused' }}
                    onAnimationEnd={state === 'now' && held === null ? next : undefined}
                  />
                </span>
                <h3 className="step__name">{s.name}</h3>
                <p className="step__text">{s.text}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
