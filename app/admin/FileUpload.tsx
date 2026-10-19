'use client';

import { useActionState } from 'react';
import { CATEGORIES } from '@/lib/admin-files-meta';
import { uploadFile, type UploadState } from './files-actions';

export default function FileUpload() {
  const [state, action, pending] = useActionState<UploadState, FormData>(uploadFile, {});
  return (
    <form className="fl__up" action={action}>
      <select name="cat" defaultValue="audity" aria-label="Složka">
        {Object.entries(CATEGORIES).map(([k, v]) => (
          <option key={k} value={k}>
            {v}
          </option>
        ))}
      </select>
      <input type="file" name="file" required aria-label="Soubor" />
      <button type="submit" disabled={pending}>
        {pending ? 'Nahrávám…' : 'Nahrát'}
      </button>
      {state.error && <p className="adm__err">{state.error}</p>}
      {state.ok && <p className="fl__ok">{state.ok}</p>}
    </form>
  );
}
