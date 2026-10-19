/*
 * Vyrobí hash hesla a podpisový klíč pro administraci.
 *
 *   node scripts/admin-hash.mjs           vypíše tři řádky pro .env.local a Vercel
 *   node scripts/admin-hash.mjs --write   rovnou je zapíše do .env.local (nikdy se necommituje)
 *
 * Zeptá se na e-mail (Enter = matyas@fainstudio.com) a heslo (při psaní se nezobrazuje).
 * Heslo se nikam neukládá, jen jeho hash. Doporučení: aspoň 14 znaků, ze správce hesel.
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { randomBytes, scryptSync } from 'node:crypto';
import { createInterface } from 'node:readline';

const rl = createInterface({ input: process.stdin, output: process.stdout, terminal: true });
const ask = (q, hidden) =>
  new Promise((resolve) => {
    if (hidden) {
      rl._writeToOutput = (s) => (s.includes(q) ? process.stdout.write(s) : process.stdout.write(s.replace(/[^\r\n]/g, '')));
    }
    rl.question(q, (a) => {
      if (hidden) process.stdout.write('\n');
      resolve(a);
    });
  });

const DEFAULT_EMAIL = 'matyas@fainstudio.com';
const email = ((await ask(`E-mail pro přihlášení [${DEFAULT_EMAIL}]: `, false)).trim() || DEFAULT_EMAIL).toLowerCase();
const pw = await ask('Heslo: ', true);
const pw2 = await ask('Heslo znovu: ', true);
rl.close();
if (!email.includes('@')) throw new Error('Neplatný e-mail.');
if (pw !== pw2) throw new Error('Hesla se neshodují.');
if (pw.length < 12) throw new Error('Heslo má mít aspoň 12 znaků.');

const N = 16384, r = 8, p = 1;
const salt = randomBytes(16);
const hash = scryptSync(pw, salt, 32, { N, r, p, maxmem: 128 * 1024 * 1024 });
const lines = {
  ADMIN_EMAIL: email,
  ADMIN_PASSWORD_HASH: `scrypt:${N}:${r}:${p}:${salt.toString('hex')}:${hash.toString('hex')}`,
  ADMIN_SESSION_SECRET: randomBytes(48).toString('base64url'),
};

if (process.argv.includes('--write')) {
  const file = new URL('../.env.local', import.meta.url);
  let text = existsSync(file) ? readFileSync(file, 'utf8') : '';
  for (const [k, v] of Object.entries(lines)) {
    const re = new RegExp(`^${k}=.*$`, 'm');
    text = re.test(text) ? text.replace(re, `${k}=${v}`) : text.replace(/\n*$/, '\n') + `${k}=${v}\n`;
  }
  writeFileSync(file, text);
  console.log('\nZapsáno do .env.local (restartujte dev server). Do Vercelu stejné tři hodnoty vložte ručně:');
  console.log('Settings → Environment Variables. Pro jistotu je vypisuji znovu:\n');
} else {
  console.log('\nPřidejte do .env.local a do Vercelu (Settings → Environment Variables):\n');
}
for (const [k, v] of Object.entries(lines)) console.log(`${k}=${v}`);
console.log('\nPo změně .env.local restartujte dev server.\n');
