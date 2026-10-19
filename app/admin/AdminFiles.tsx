import Link from 'next/link';
import { listFiles, storageStatus } from '@/lib/admin-files';
import { deleteFile } from './files-actions';
import FileUpload from './FileUpload';

const size = (n: number) => (n < 1024 ? `${n} B` : n < 1_048_576 ? `${Math.round(n / 1024)} kB` : `${(n / 1_048_576).toFixed(1).replace('.', ',')} MB`);
const when = (t: number) => new Date(t).toLocaleString('cs-CZ', { day: 'numeric', month: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
const url = (dir: string) => `/admin/soubory${dir ? `/${dir.split('/').map(encodeURIComponent).join('/')}` : ''}`;
const label = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const IMG = /\.(png|jpe?g|webp|gif)$/i;
const kind = (name: string) => {
  const e = (name.split('.').pop() || '').toLowerCase();
  if (e === 'pdf') return 'pdf';
  if (['md', 'txt', 'csv', 'json'].includes(e)) return 'txt';
  if (['docx', 'xlsx', 'pptx'].includes(e)) return 'doc';
  if (e === 'zip') return 'zip';
  return 'other';
};
const plural = (n: number) => (n === 1 ? 'soubor' : n >= 2 && n <= 4 ? 'soubory' : 'souborů');

export default async function AdminFiles({ dir }: { dir: string }) {
  const st = storageStatus();
  const all = st.ok ? await listFiles() : [];
  const inside = (d: string) => (dir ? d === dir || d.startsWith(`${dir}/`) : true);

  // podsložky přímo pod aktuální složkou a počet souborů v nich
  const folders = new Map<string, number>();
  for (const f of all) {
    if (!inside(f.dir) || f.dir === dir) continue;
    const rest = dir ? f.dir.slice(dir.length + 1) : f.dir;
    const first = rest.split('/')[0];
    folders.set(first, (folders.get(first) || 0) + 1);
  }
  const files = all.filter((f) => f.dir === dir).sort((a, b) => a.name.localeCompare(b.name, 'cs', { numeric: true }));
  const crumbs = dir ? dir.split('/') : [];
  const sortedFolders = [...folders.entries()].sort((a, b) => a[0].localeCompare(b[0], 'cs'));

  return (
    <section aria-labelledby="fl-title">
      <header className="adm__head">
        <div>
          <h1 className="adm__title" id="fl-title">
            Soubory
          </h1>
          <p className="adm__sub">Úložiště: {st.where}.</p>
        </div>
      </header>

      <div className="fl__bar">
        <nav className="fl__crumbs" aria-label="Cesta">
          <Link href="/admin/soubory">Vše</Link>
          {crumbs.map((c, i) => (
            <span key={c + i} style={{ display: 'contents' }}>
              <i aria-hidden="true">/</i>
              {i === crumbs.length - 1 ? <b>{label(c)}</b> : <Link href={url(crumbs.slice(0, i + 1).join('/'))}>{label(c)}</Link>}
            </span>
          ))}
        </nav>
        {st.ok && <FileUpload dir={dir} />}
      </div>

      {sortedFolders.length > 0 && (
        <ul className="fl__folders">
          {sortedFolders.map(([name, n], i) => (
            <li key={name}>
              <Link className="fl__fc" data-c={i % 5} href={url(dir ? `${dir}/${name}` : name)}>
                <span className="fl__fi" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M3 7.5A1.5 1.5 0 0 1 4.5 6h4.2l2 2.2h8.8A1.5 1.5 0 0 1 21 9.7v8.8a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18.5z" />
                  </svg>
                </span>
                <div>
                  <b>{label(name)}</b>
                  <span>
                    {n} {plural(n)}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {(files.length > 0 || sortedFolders.length === 0) && (
        <div className="fl__table">
          {files.length === 0 ? (
            <p className="fl__empty">Tady zatím nic není. Nahrajte první soubor.</p>
          ) : (
            <>
              <div className="fl__row fl__row--head" aria-hidden="true">
                <span />
                <span>Název</span>
                <span className="fl__cell-size">Velikost</span>
                <span className="fl__cell-at">Změněno</span>
                <span />
              </div>
              {files.map((f) => {
                const href = `/admin/files/${[...(dir ? dir.split('/') : []), f.name].map(encodeURIComponent).join('/')}`;
                return (
                  <div className="fl__row" key={f.name}>
                    {IMG.test(f.name) ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img className="fl__th" src={href} alt="" loading="lazy" width={44} height={44} />
                    ) : (
                      <span className="fl__th fl__th--ext" data-t={kind(f.name)} aria-hidden="true">
                        {(f.name.split('.').pop() || '').slice(0, 4)}
                      </span>
                    )}
                    <div>
                      <a className="fl__name" href={href} target="_blank" rel="noopener">
                        {f.name}
                      </a>
                      <span className="fl__meta">
                        {size(f.size)} · {when(f.at)}
                      </span>
                    </div>
                    <span className="fl__cell-size">{size(f.size)}</span>
                    <span className="fl__cell-at">{when(f.at)}</span>
                    <div className="fl__act">
                      <form action={deleteFile}>
                        <input type="hidden" name="dir" value={dir} />
                        <input type="hidden" name="name" value={f.name} />
                        <button type="submit" className="td__x" aria-label={`Smazat ${f.name}`}>
                          ×
                        </button>
                      </form>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      )}
    </section>
  );
}
