/*
 * Přepis textu ve zdrojácích. Editor pošle dvojice { o: původní text, n: nový text } přesně tak,
 * jak je uživatel vidí na stránce. Tady je dohledáme ve zdrojových souborech:
 *   1) jako celý řetězcový literál ('…', "…", `…`) – texty v lib/content.ts a pole v komponentách,
 *   2) jako text v JSX (mezi > a <).
 * Nahradí se všechny výskyty (stejný text na více místech se tím drží pohromadě).
 */

export type Change = { o: string; n: string };
export type Result = { o: string; n: string; count: number; error?: string };

const NBSP = ' ';

const escRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function escLiteral(s: string, q: string) {
  let r = s.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/ /g, '\\u00a0');
  r = r.split(q).join('\\' + q);
  if (q === '`') r = r.replace(/\$\{/g, '\\${');
  return r;
}

/** Varianty původního textu, jak může být zapsaný v řetězci (nbsp jako znak nebo jako  ). */
function literalForms(o: string, q: string) {
  const base = o.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').split(q).join('\\' + q);
  const forms = new Set([base.replace(/ /g, '\\u00a0'), base]);
  return [...forms];
}

function jsxSafe(n: string) {
  if (/[{}<>]/.test(n)) return null;
  return n.replace(/&/g, '&amp;');
}

function applyOne(src: string, o: string, n: string) {
  let count = 0;
  let out = src;

  // 1) řetězcové literály
  for (const q of ["'", '"', '`']) {
    for (const form of literalForms(o, q)) {
      const needle = q + form + q;
      if (!out.includes(needle)) continue;
      // hodnota JSX atributu (aria-label="…") není JS řetězec, nesahat na ni
      const re = new RegExp('(?<!=)' + escRe(needle), 'g');
      out = out.replace(re, () => {
        count++;
        return q + escLiteral(n, q) + q;
      });
    }
  }

  // 2) JSX text
  const safe = jsxSafe(n);
  let jsxHits = 0;
  const jsxForms = new Set([o.replace(/ /g, '&nbsp;'), o]);
  for (const form of jsxForms) {
    const re = new RegExp('(>\\s*)' + escRe(form.replace(/&(?!nbsp;)/g, '&amp;')) + '(\\s*<)', 'g');
    out = out.replace(re, (_m, a: string, b: string) => {
      jsxHits++;
      count++;
      return safe === null ? _m : a + safe + b;
    });
  }
  return { out, count, jsxRejected: safe === null && jsxHits > 0 };
}

export function applyChanges(files: Record<string, string>, changes: Change[]) {
  const next = { ...files };
  const results: Result[] = [];
  for (const { o, n } of changes) {
    if (!o || o === n) continue;
    let count = 0;
    let rejected = false;
    for (const path of Object.keys(next)) {
      const r = applyOne(next[path], o, n);
      if (r.out !== next[path]) next[path] = r.out;
      count += r.count;
      rejected ||= r.jsxRejected;
    }
    results.push({
      o,
      n,
      count,
      error: count === 0 ? 'Text se nepodařilo najít ve zdrojích.' : rejected ? 'Text obsahuje znaky { } < >, které tu nejdou.' : undefined,
    });
  }
  return { files: next, results };
}
