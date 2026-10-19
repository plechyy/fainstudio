'use client';

import { useActionState } from 'react';
import { login, type LoginState } from './actions';

export default function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(login, {});
  return (
    <form className="adm__form" action={action}>
      <label className="adm__f">
        <span>E-mail</span>
        <input name="email" type="email" autoComplete="username" defaultValue={state.email} required autoFocus={!state.email} />
      </label>
      <label className="adm__f">
        <span>Heslo</span>
        <input name="password" type="password" autoComplete="current-password" required autoFocus={Boolean(state.email)} />
      </label>
      {state.error && (
        <p className="adm__err" role="alert">
          {state.error}
        </p>
      )}
      <button type="submit" className="btn btn--primary adm__btn" disabled={pending}>
        {pending ? 'Přihlašuji…' : 'Přihlásit se'}
      </button>
    </form>
  );
}
