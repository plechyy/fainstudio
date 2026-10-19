'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Artifact from './systems/Artifact';

/*
 * Vizuál pod tlačítky v hero. Dvě verze (výběr přes ?hero=a nebo ?hero=b, na localhostu je vlevo dole přepínač):
 *   A  v hero je jiná scéna (Automatizace procesů), takže se sekce 2 neopakuje.
 *   B  jedna scéna (CRM) a dva záchytné body: v hero a v sekci 2. Když sekce 2 dojede
 *      do spodní poloviny obrazovky, scéna se jedním plynulým pohybem přesune z hero na své
 *      místo v sekci 2 (a při scrollu zpět se vrátí). Nikdy nestojí mezi sekcemi.
 *      Panel (sekce 2) pro CRM nechá prázdné místo se značkou data-dock="sys".
 */

type Mode = 'a' | 'b';
const FLY_MS = 900;

export default function HeroScene() {
  const [mode, setMode] = useState<Mode>('b');
  const [lab, setLab] = useState(false);
  const [desktop, setDesktop] = useState(true);

  useEffect(() => {
    const q = new URLSearchParams(location.search).get('hero');
    if (q === 'a' || q === 'b') setMode(q);
    setLab(process.env.NODE_ENV === 'development' || q === 'a' || q === 'b');
    const mq = matchMedia('(min-width: 900px)');
    const sync = () => setDesktop(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const dock = mode === 'b' && desktop;

  // Panel v sekci 2 se podle toho rozhodne, jestli má pro CRM nechat místo
  useEffect(() => {
    document.documentElement.dataset.heroDock = dock ? 'on' : 'off';
    window.dispatchEvent(new Event('hero-dock'));
    return () => {
      delete document.documentElement.dataset.heroDock;
    };
  }, [dock]);

  const pick = (m: Mode) => {
    setMode(m);
    const u = new URL(location.href);
    u.searchParams.set('hero', m);
    history.replaceState(null, '', u);
  };

  return (
    <>
      {dock ? (
        <div className="hero__slot seq" data-dock="hero" style={{ ['--i' as string]: 5 }} />
      ) : (
        <div className="hero__scene seq" style={{ ['--i' as string]: 5 }}>
          <Artifact id="procesy" />
        </div>
      )}
      {dock && <Dock />}
      {lab && (
        <div className="hs-lab" role="group" aria-label="Verze vizuálu v hero">
          <button type="button" aria-pressed={mode === 'a'} onClick={() => pick('a')}>
            A · jiná scéna
          </button>
          <button type="button" aria-pressed={mode === 'b'} onClick={() => pick('b')}>
            B · přesun do sekce 2
          </button>
        </div>
      )}
    </>
  );
}

/** Létající scéna: leží v dokumentu (absolutně), takže se s ním při scrollu hýbe jako běžný obsah. */
function Dock() {
  const el = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const spot = useRef<'hero' | 'sys' | 'none'>('hero');

  useLayoutEffect(() => setMounted(true), []);

  const place = useCallback((instant = false) => {
    const node = el.current;
    if (!node) return;
    const sec = document.getElementById('systemy');
    const heroSlot = document.querySelector<HTMLElement>('[data-dock="hero"]');
    const sysSlot = document.querySelector<HTMLElement>('[data-dock="sys"]');
    if (!sec || !heroSlot) return;

    // do sekce 2 se scéna přesune, až její horní okraj dojede do spodní poloviny obrazovky
    const inSys = sec.getBoundingClientRect().top < innerHeight * 0.55;
    const revealed = !sysSlot || (sysSlot.closest('.reveal')?.classList.contains('is-in') ?? true);
    let want: 'hero' | 'sys' | 'none' = inSys ? 'sys' : 'hero';
    if (want === 'sys' && (!sysSlot || !revealed)) want = sysSlot ? 'hero' : 'none';

    const slot = want === 'sys' ? sysSlot : want === 'hero' ? heroSlot : null;
    node.style.transitionDuration = instant ? '0ms' : `${FLY_MS}ms`;
    if (slot) {
      const r = slot.getBoundingClientRect();
      const w = Math.min(r.width, 580);
      node.style.width = `${w}px`;
      node.style.transform = `translate3d(${r.left + scrollX + (r.width - w) / 2}px, ${r.top + scrollY}px, 0)`;
      // slot má mít stejnou výšku jako scéna, ať se kolem ní nic nehýbe
      const h = node.offsetHeight;
      if (h && Math.abs(slot.offsetHeight - h) > 1) slot.style.height = `${h}px`;
    }
    node.style.opacity = want === 'none' ? '0' : '1';
    spot.current = want;
  }, []);

  useEffect(() => {
    if (!mounted) return;
    let raf = 0;
    const later = (instant = false) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => place(instant));
    };
    later(true);
    const onScroll = () => later();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', () => later(true));
    const ro = new ResizeObserver(() => later(true));
    ro.observe(document.body);
    if (el.current) ro.observe(el.current);
    const mo = new MutationObserver(() => later());
    const sec = document.getElementById('systemy');
    if (sec) mo.observe(sec, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
    document.fonts?.ready.then(() => later(true));
    const t = setTimeout(() => later(true), 1200); // po doběhnutí úvodní animace hero
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
      removeEventListener('scroll', onScroll);
      ro.disconnect();
      mo.disconnect();
    };
  }, [mounted, place]);

  if (!mounted) return null;
  return createPortal(
    <div className="dock" ref={el} aria-hidden="true">
      <Artifact id="nastroje" />
    </div>,
    document.body,
  );
}
