'use client';

import { useEffect, useState } from 'react';
import CasesExpand from './cases/CasesExpand';
import CasesMaster from './cases/CasesMaster';
import CasesReader from './cases/CasesReader';

/*
 * Tři varianty, jak se čtou případy (výběr jedné se pak smaže ostatní):
 *   1 čtečka: příběh jako velký list přes celou obrazovku
 *   2 rozbalení: carousel se sbalí a příběh se otevře na jeho místě s přilepenou animací
 *   3 přehled: vlevo vždy všech sedm případů, vpravo detail a příběh
 * Přepínač je vidět na localhostu nebo když je v adrese ?lab (volba se pamatuje po dobu návštěvy).
 */
const NAMES = ['Čtečka', 'Rozbalení', 'Přehled'] as const;

export default function CasesVariants() {
  const [v, setV] = useState(1);
  const [lab, setLab] = useState(false);

  useEffect(() => {
    try {
      const q = new URLSearchParams(location.search);
      const isLab = location.hostname === 'localhost' || q.has('lab') || sessionStorage.getItem('cases-lab') === '1';
      if (q.has('lab')) sessionStorage.setItem('cases-lab', '1');
      setLab(isLab);
      const wanted = Number(q.get('v') ?? sessionStorage.getItem('cases-v') ?? 1);
      if (wanted >= 1 && wanted <= 3) setV(wanted);
    } catch {
      /* bez úložiště zůstane výchozí varianta */
    }
  }, []);

  const pick = (n: number) => {
    setV(n);
    try {
      sessionStorage.setItem('cases-v', String(n));
    } catch {}
  };

  return (
    <>
      {v === 1 && <CasesReader key="1" />}
      {v === 2 && <CasesExpand key="2" />}
      {v === 3 && <CasesMaster key="3" />}
      {lab && (
        <div className="cv-lab" role="group" aria-label="Varianta čtení případů">
          {NAMES.map((n, i) => (
            <button type="button" aria-pressed={v === i + 1} onClick={() => pick(i + 1)} key={n}>
              <b>{i + 1}</b> {n}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
