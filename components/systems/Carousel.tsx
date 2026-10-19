'use client';

import { useEffect, useRef } from 'react';
import { systems } from '@/lib/content';
import Artifact from './Artifact';

/*
 * Mobilní carousel: každý systém je vlastní container, listuje se prstem.
 * Nekonečno dělá trojitý seznam — jakmile se scroll dostane k okraji, skočí
 * o jednu sadu zpátky. Skok je přes stejné karty, takže ho není vidět.
 */

export default function Carousel() {
  const items = systems.items;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const n = items.length;

    /* Šířka jedné sady se musí brát z rozestupu karet, ne ze scrollWidth — v tom je
       i odsazení po stranách, takže by skok vyšel delší a vrátil by to o kartu zpátky. */
    const setWidth = () => {
      const kids = el.children as HTMLCollectionOf<HTMLElement>;
      return kids.length > n ? kids[n].offsetLeft - kids[0].offsetLeft : 0;
    };

    // při skoku vypnout přichytávání, ať ho snap engine nezačne dojíždět zpátky
    const jump = (dx: number) => {
      const snap = el.style.scrollSnapType;
      el.style.scrollSnapType = 'none';
      el.scrollLeft += dx;
      void el.offsetWidth;
      el.style.scrollSnapType = snap;
    };

    const center = () => {
      const w = setWidth();
      if (w > 0) el.scrollLeft = w;
    };
    center();
    document.fonts?.ready.then(center).catch(() => {});

    /* Posouvá se to až když scroll dojede. Měnit scrollLeft během setrvačného
       pohybu iOS neumí — scrollování se tím zasekne. */
    let t = 0;
    let touching = false;
    const settle = () => {
      // dokud je prst na displeji, scrollem nehýbat
      if (touching) {
        t = window.setTimeout(settle, 140);
        return;
      }
      const w = setWidth();
      if (w <= 0) return;
      if (el.scrollLeft < w * 0.5) jump(w);
      else if (el.scrollLeft > w * 1.5) jump(-w);
    };
    const onScroll = () => {
      clearTimeout(t);
      t = window.setTimeout(settle, 140);
    };
    const onDown = () => {
      touching = true;
    };
    const onUp = () => {
      touching = false;
      onScroll();
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    el.addEventListener('touchstart', onDown, { passive: true });
    el.addEventListener('touchend', onUp, { passive: true });
    el.addEventListener('touchcancel', onUp, { passive: true });
    /* Na mobilu se při scrollu stránkou schovává a ukazuje adresní řádek, což spouští `resize`.
       Carousel se kvůli tomu nesmí vracet na začátek: reaguje jen na změnu šířky a drží
       aktuální kartu (stejný podíl v sadě). */
    let lastW = innerWidth;
    let lastSet = setWidth();
    const onResize = () => {
      if (innerWidth === lastW) return;
      lastW = innerWidth;
      const w = setWidth();
      if (w > 0 && lastSet > 0) el.scrollLeft = (el.scrollLeft / lastSet) * w;
      else center();
      lastSet = w;
    };
    addEventListener('resize', onResize);
    return () => {
      el.removeEventListener('scroll', onScroll);
      el.removeEventListener('touchstart', onDown);
      el.removeEventListener('touchend', onUp);
      el.removeEventListener('touchcancel', onUp);
      removeEventListener('resize', onResize);
      clearTimeout(t);
    };
  }, [items.length]);

  // tři sady za sebou: dozadu i dopředu je vždycky kam scrollovat
  const slides = [...items, ...items, ...items];

  return (
    <div className="sysx" ref={ref} role="list" aria-label="Systémy">
      {slides.map((it, i) => (
        <article
          className={`sysx__slide sys-ac--${it.id}`}
          key={`${it.id}-${i}`}
          role="listitem"
          aria-hidden={i < items.length || i >= items.length * 2 || undefined}
        >
          <Artifact id={it.id} />
          <div>
            <h3 className="sysx__name">{it.name}</h3>
            <p className="sysx__text">{it.text}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
