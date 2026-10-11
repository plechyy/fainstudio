import { NextRequest, NextResponse } from 'next/server';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { authed, sameOrigin } from '@/lib/editAuth';
import { applyChanges, type Change } from '@/lib/editApply';

/*
 * Uložení textů. Produkce: změny se commitnou do GitHubu (jeden commit přes Git Data API),
 * Vercel pak web sám přenasadí. Lokální dev bez GITHUB_TOKEN: přepíšou se soubory na disku.
 */

const REPO = process.env.GITHUB_REPO || 'plechyy/fainstudio';
const BRANCH = process.env.GITHUB_BRANCH || 'main';
const SOURCE = (p: string) => p === 'lib/content.ts' || /^components\/[^/]+\.tsx$/.test(p);
const EXCLUDE = new Set(['components/Editor.tsx']);

async function gh<T>(token: string, url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`https://api.github.com/repos/${REPO}${url}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`GitHub ${res.status}: ${(await res.text()).slice(0, 200)}`);
  return res.json() as Promise<T>;
}

async function saveToGithub(token: string, changes: Change[]) {
  const ref = await gh<{ object: { sha: string } }>(token, `/git/ref/heads/${BRANCH}`);
  const head = ref.object.sha;
  const commit = await gh<{ tree: { sha: string } }>(token, `/git/commits/${head}`);
  const tree = await gh<{ tree: { path: string; type: string; sha: string }[] }>(
    token,
    `/git/trees/${commit.tree.sha}?recursive=1`,
  );
  const entries = tree.tree.filter((e) => e.type === 'blob' && SOURCE(e.path) && !EXCLUDE.has(e.path));

  const files: Record<string, string> = {};
  await Promise.all(
    entries.map(async (e) => {
      const b = await gh<{ content: string }>(token, `/git/blobs/${e.sha}`);
      files[e.path] = Buffer.from(b.content, 'base64').toString('utf8');
    }),
  );

  const { files: next, results } = applyChanges(files, changes);
  const changed = Object.keys(next).filter((p) => next[p] !== files[p]);
  if (!changed.length) return { results, commit: null as string | null };

  const items = await Promise.all(
    changed.map(async (p) => {
      const blob = await gh<{ sha: string }>(token, '/git/blobs', {
        method: 'POST',
        body: JSON.stringify({ content: next[p], encoding: 'utf-8' }),
      });
      return { path: p, mode: '100644', type: 'blob', sha: blob.sha };
    }),
  );
  const newTree = await gh<{ sha: string }>(token, '/git/trees', {
    method: 'POST',
    body: JSON.stringify({ base_tree: commit.tree.sha, tree: items }),
  });
  const n = results.filter((r) => !r.error).length;
  const created = await gh<{ sha: string }>(token, '/git/commits', {
    method: 'POST',
    body: JSON.stringify({ message: `Úprava textů přes editor (${n})`, tree: newTree.sha, parents: [head] }),
  });
  await gh(token, `/git/refs/heads/${BRANCH}`, { method: 'PATCH', body: JSON.stringify({ sha: created.sha }) });
  return { results, commit: created.sha };
}

async function saveToDisk(changes: Change[]) {
  const root = /*turbopackIgnore: true*/ process.cwd();
  const names = ['lib/content.ts'];
  const { readdir } = await import('node:fs/promises');
  for (const f of await readdir(path.join(/*turbopackIgnore: true*/ root, 'components'))) {
    if (f.endsWith('.tsx') && !EXCLUDE.has(`components/${f}`)) names.push(`components/${f}`);
  }
  const files: Record<string, string> = {};
  for (const p of names) files[p] = await readFile(path.join(/*turbopackIgnore: true*/ root, p), 'utf8');
  const { files: next, results } = applyChanges(files, changes);
  for (const p of names) if (next[p] !== files[p]) await writeFile(path.join(/*turbopackIgnore: true*/ root, p), next[p]);
  return { results, commit: null as string | null };
}

export async function POST(req: NextRequest) {
  if (!sameOrigin(req) || !authed(req)) return NextResponse.json({ ok: false, error: 'Nepřihlášeno.' }, { status: 401 });

  const body = (await req.json().catch(() => null)) as { changes?: Change[] } | null;
  const changes = (body?.changes ?? [])
    .filter((c) => typeof c?.o === 'string' && typeof c?.n === 'string' && c.o.trim() && c.n.trim() && c.o !== c.n)
    .slice(0, 100);
  if (!changes.length) return NextResponse.json({ ok: false, error: 'Žádné změny.' }, { status: 400 });

  try {
    const token = process.env.GITHUB_TOKEN;
    let out;
    if (token) out = await saveToGithub(token, changes);
    else if (process.env.NODE_ENV === 'development') out = await saveToDisk(changes);
    else return NextResponse.json({ ok: false, error: 'Chybí GITHUB_TOKEN.' }, { status: 503 });
    return NextResponse.json({ ok: true, ...out });
  } catch (e) {
    return NextResponse.json({ ok: false, error: e instanceof Error ? e.message : 'Uložení selhalo.' }, { status: 500 });
  }
}
