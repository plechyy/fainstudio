import { CATEGORIES, listFiles, storageStatus } from '@/lib/admin-files';
import { deleteFile } from './files-actions';
import FileUpload from './FileUpload';

const size = (n: number) => (n < 1024 ? `${n} B` : n < 1_048_576 ? `${Math.round(n / 1024)} kB` : `${(n / 1_048_576).toFixed(1).replace('.', ',')} MB`);
const when = (t: number) => new Date(t).toLocaleString('cs-CZ', { day: 'numeric', month: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });

export default async function AdminFiles() {
  const st = storageStatus();
  const files = st.ok ? await listFiles() : [];
  return (
    <section className="fl" aria-labelledby="fl-title">
      <header className="fl__head">
        <h2 className="td__h" id="fl-title">
          Soubory
        </h2>
        <p className="fl__where">{st.where}</p>
      </header>

      {st.ok && <FileUpload />}

      <div className="fl__grid">
        {(Object.keys(CATEGORIES) as (keyof typeof CATEGORIES)[]).map((c) => {
          const rows = files.filter((f) => f.cat === c);
          return (
            <div className="td__card" key={c}>
              <h3 className="td__gh">
                {CATEGORIES[c]}
                <small>{rows.length}</small>
              </h3>
              {rows.length === 0 ? (
                <p className="fl__empty">Zatím nic.</p>
              ) : (
                <ul className="fl__list">
                  {rows.map((f) => (
                    <li key={f.name}>
                      <a href={`/admin/files/${c}/${encodeURIComponent(f.name)}`} target="_blank" rel="noopener">
                        {f.name}
                      </a>
                      <span>
                        {size(f.size)} · {when(f.at)}
                      </span>
                      <form action={deleteFile}>
                        <input type="hidden" name="cat" value={c} />
                        <input type="hidden" name="name" value={f.name} />
                        <button type="submit" className="td__x" aria-label={`Smazat ${f.name}`}>
                          ×
                        </button>
                      </form>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
      <p className="td__note">Soubory vidí jen přihlášený správce. Nejsou ve veřejné složce ani v gitu.</p>
    </section>
  );
}
