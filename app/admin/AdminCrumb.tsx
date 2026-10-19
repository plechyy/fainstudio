'use client';

import { usePathname } from 'next/navigation';

const NAMES: Record<string, string> = { todo: 'To do', soubory: 'Soubory', analytika: 'Analytika' };

/* Cesta v tmavé hlavičce: Administrace / aktuální sekce. */
export default function AdminCrumb() {
  const section = usePathname().split('/')[2] || '';
  return (
    <p className="adm__crumb">
      Administrace
      <i aria-hidden="true">/</i>
      <b>{NAMES[section] || 'Přehled'}</b>
    </p>
  );
}
