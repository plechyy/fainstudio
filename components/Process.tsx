'use client';

import { useEffect, useRef, useState } from 'react';
import { process } from '@/lib/content';
import { STAR_D } from '@/lib/star';
import { ico, Svg } from './systems/live/scene';

/*
 * Postup jako „načítání“: nad každým krokem jeden úsek zlaté linky, po které jede hvězda
 * (stejná jako v heru). Úseky se plní jeden po druhém, právě plněný krok je rozsvícený,
 * pod každým krokem je lístek s tím, co z něj máte, a u hotových se rozsvítí fajfka;
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
  const [mobile, setMobile] = useState(false); // pod 900 px se kroky plní podle scrollu, ne samy
  const [prog, setProg] = useState<number[]>(() => steps.map(() => 0));
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    setStill(matchMedia('(prefers-reduced-motion: reduce)').matches);
    const el = listRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // mobil: každý krok se plní podle toho, jak ho scroll přivádí do horní části obrazovky
  useEffect(() => {
    const mq = matchMedia('(max-width: 899px)');
    setMobile(mq.matches);
    const onMq = () => setMobile(mq.matches);
    mq.addEventListener('change', onMq);
    return () => mq.removeEventListener('change', onMq);
  }, []);

  useEffect(() => {
    if (!mobile) return;
    const el = listRef.current;
    if (!el) return;
    let raf = 0;
    const calc = () => {
      raf = 0;
      const vh = innerHeight;
      const items = Array.from(el.children) as HTMLElement[];
      const next = items.map((li) => {
        const top = li.getBoundingClientRect().top;
        // 0 na 82 % výšky obrazovky, 1 na 52 %
        return Math.round(Math.min(1, Math.max(0, (vh * 0.82 - top) / (vh * 0.3))) * 100) / 100;
      });
      setProg((o) => (o.length === next.length && o.every((v, i) => v === next[i]) ? o : next));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(calc);
    };
    calc();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    return () => {
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [mobile]);

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
  const playing = inView && held === null && !still && !done && !mobile;

  return (
    <section className="section proc-section" id="postup" aria-labelledby="postup-title">
      <div className="wrap">
        <header className="proc-head reveal">
          <p className="label shead__index" aria-hidden="true">
            <b>04</b>
            Průběh spolupráce
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
            const p = prog[i] ?? 0;
            const state = mobile
              ? p >= 1
                ? 'done'
                : p > 0
                  ? 'now'
                  : 'next'
              : still || done
                ? 'done'
                : i < shown
                  ? 'done'
                  : i === shown
                    ? 'now'
                    : 'next';
            return (
              <li
                key={i}
                className="step"
                data-state={state}
                tabIndex={0}
                onMouseEnter={() => !mobile && setHeld(i)}
                onMouseLeave={() => !mobile && setHeld(null)}
                onFocus={() => !mobile && setHeld(i)}
                onBlur={() => !mobile && setHeld(null)}
              >
                <span className="step__bar" aria-hidden="true">
                  <span
                    key={mobile ? 'scroll' : state === 'now' ? `run-${active}-${held ?? 'x'}` : state}
                    className="step__fill"
                    data-run={!mobile && state === 'now' && held === null ? '' : undefined}
                    style={
                      mobile
                        ? { transform: `scaleX(${p})` }
                        : { animationPlayState: playing ? 'running' : 'paused' }
                    }
                    onAnimationEnd={!mobile && state === 'now' && held === null ? next : undefined}
                  />
                  {/* hvězda jede po lince na čele postupu (jako v heru) */}
                  {state === 'now' && (
                    <svg
                      key={mobile ? 'scroll' : `star-${active}-${held ?? 'x'}`}
                      className="step__star"
                      viewBox="-6 -6 112 112"
                      data-run={!mobile && held === null ? '' : undefined}
                      style={
                        mobile
                          ? { left: `${p * 100}%` }
                          : { animationPlayState: playing ? 'running' : 'paused', left: held === null ? undefined : '100%' }
                      }
                    >
                      <path className="star-o" d={STAR_D} />
                      <path className="star-f" d={STAR_D} />
                    </svg>
                  )}
                </span>
                <h3 className="step__name">{s.name}</h3>
                <p className="step__text">{s.text}</p>
                <span className="step__get">
                  <span className="step__tick" aria-hidden="true">
                    <Svg>{ico.check}</Svg>
                  </span>
                  {s.get}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
