'use client';

import { useActionState } from 'react';
import { createFolder, uploadFile, type UploadState } from './files-actions';

export default function FileUpload({ dir }: { dir: string }) {
  const [state, action, pending] = useActionState<UploadState, FormData>(uploadFile, {});
  return (
    <div className="fl__tools">
      <form className="fl__up" action={action}>
        <input type="hidden" name="dir" value={dir} />
        <input type="file" name="file" required aria-label="Soubor" />
        <button type="submit" disabled={pending}>
          {pending ? 'Nahrávám…' : 'Nahrát'}
        </button>
        {state.error && <p className="adm__err">{state.error}</p>}
        {state.ok && <p className="fl__ok">{state.ok}</p>}
      </form>
      <form className="fl__up fl__new" action={createFolder}>
        <input type="hidden" name="dir" value={dir} />
        <input type="text" name="name" required maxLength={60} placeholder="Název nové složky" aria-label="Název nové složky" autoComplete="off" />
        <button type="submit">Vytvořit</button>
      </form>
    </div>
  );
}
