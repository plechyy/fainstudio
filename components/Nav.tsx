'use client';

import { useEffect, useRef, useState } from 'react';
import { CAL_URL } from '@/lib/config';

const LINKS = [
  { href: '#systemy', label: 'Systémy' },
  { href: '#postup', label: 'Postup' },
  { href: '#pred-po', label: 'Před a po' },
  { href: '#srovnani', label: 'Srovnání' },
  { href: '#proof', label: 'Čísla' },
  { href: '#faq', label: 'FAQ' },
];
const TRACKED = LINKS.map((l) => l.href.slice(1));

type Lens = { x: number; w: number; on: boolean; snap: boolean };

export default function Nav() {
  const [menu, setMenu] = useState(false);
  const [compact, setCompact] = useState(false);
  const [hover, setHover] = useState<number | null>(null);
  const [active, setActive] = useState<string | null>(null);
  const [lens, setLens] = useState<Lens>({ x: 0, w: 0, on: false, snap: true });
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    // Aktivní sekce = ta, která je uprostřed obrazovky.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive('#' + e.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    TRACKED.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    // Kompaktní stav: jakmile spodek hero tlačítek přejede pod úroveň navigace.
    const actions = document.querySelector<HTMLElement>('.hero__actions');
    let ticking = false;
    const check = () => {
      ticking = false;
      if (window.scrollY < 240) setActive(null);
      if (actions) setCompact(actions.getBoundingClientRect().bottom < 86);
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(check);
    };
    check();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Čočka sedí pod hoverovaným odkazem, jinak pod aktivní sekcí.
  const activeIdx = LINKS.findIndex((l) => l.href === active);
  const target = hover ?? (activeIdx >= 0 ? activeIdx : null);
  useEffect(() => {
    if (target === null) {
      setLens((l) => ({ ...l, on: false }));
      return;
    }
    const a = linkRefs.current[target];
    if (!a) return;
    setLens((l) => ({ x: a.offsetLeft, w: a.offsetWidth, on: true, snap: !l.on }));
  }, [target]);

  return (
    <header className="nav">
      <div className={`nav__pill${compact ? ' nav__pill--solid' : ''}`}>
        <a className="logo" href="#top" aria-label="FainStudio, na začátek stránky">
          FaiN<span className="logo__sub">Studio</span>
        </a>

        <nav className="nav__links" aria-label="Hlavní" onMouseLeave={() => setHover(null)}>
          <span
            className="nav__lens"
            aria-hidden="true"
            data-on={lens.on || undefined}
            data-snap={lens.snap || undefined}
            style={{ transform: `translateX(${lens.x}px)`, width: lens.w }}
          />
          <ul>
            {LINKS.map((l, i) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  ref={(el) => {
                    linkRefs.current[i] = el;
                  }}
                  aria-current={active === l.href ? 'location' : undefined}
                  onMouseEnter={() => setHover(i)}
                  onFocus={() => setHover(i)}
                  onBlur={() => setHover(null)}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav__end">
          <a className="nav__cta" href={CAL_URL}>
            <span className="nav__cta-long">Rezervovat hovor</span>
            <span className="nav__cta-short">Rezervovat</span>
          </a>

          <button
            className="burger"
            type="button"
            aria-label="Menu"
            aria-expanded={menu}
            onClick={() => setMenu((v) => !v)}
          >
            <span aria-hidden="true" />
          </button>
        </div>
      </div>

      {menu && (
        <div className="menu glass" onClick={(e) => (e.target as HTMLElement).closest('a') && setMenu(false)}>
          <ul>
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
