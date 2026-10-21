import type { Metadata } from 'next';
import { listFilesCached, readStored, storageStatus } from '@/lib/admin-files';
import LogoGallery, { type Logo } from './LogoGallery';
import { LIKES_FILE } from './likes';

export const metadata: Metadata = { title: 'Loga' };

const DIR = 'loga/navrhy-100';
type Meta = { title: string; note: string; pal: string; font: string; file: string };

/* Návrhy loga se prohlížejí přímo tady, velké a bez stahování. Soubory zůstávají v soukromých Souborech. */
export default async function Page() {
  const st = storageStatus();
  const all = st.ok ? await listFilesCached() : [];
  const svgs = all.filter((f) => f.dir === DIR && f.name.endsWith('.svg')).sort((a, b) => a.name.localeCompare(b.name, 'cs', { numeric: true }));

  let meta: Meta[] = [];
  try {
    const r = await readStored(DIR, 'index.json');
    if (r) meta = JSON.parse(await new Response(r.body as BodyInit).text());
  } catch {}
  let likes: string[] = [];
  try {
    const r = await readStored(DIR, LIKES_FILE);
    if (r) likes = JSON.parse(await new Response(r.body as BodyInit).text());
  } catch {}
  const byFile = new Map(meta.map((m) => [m.file, m]));

  const items: Logo[] = svgs.map((f) => {
    const m = byFile.get(f.name);
    return {
      src: `/admin/files/${DIR}/${encodeURIComponent(f.name)}`,
      n: f.name.slice(0, 3),
      title: m?.title ?? f.name.replace(/^\d+-/, '').replace(/\.svg$/, '').replace(/-/g, ' '),
      note: m?.note ?? '',
      pal: m?.pal ?? '',
      font: m?.font ?? '',
    };
  });

  return (
    <section aria-labelledby="lg-title">
      <header className="adm__head">
        <div>
          <h1 className="adm__title" id="lg-title">
            Loga
          </h1>
          <p className="adm__sub">{items.length} návrhů. Kliknutím otevřete velký náhled, šipky ← → listují, Esc zavře. Srdíčkem (nebo klávesou L) si návrh olajkujete.</p>
        </div>
      </header>
      {items.length ? <LogoGallery items={items} initialLikes={likes} /> : <p className="adm__sub">Žádné návrhy ve složce {DIR}.</p>}
    </section>
  );
}
