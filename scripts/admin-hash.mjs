/*
 * Vyrobí hash hesla a podpisový klíč pro administraci.
 *
 *   node scripts/admin-hash.mjs
 *
 * Zeptá se na heslo (při psaní se nezobrazuje), vypíše tři řádky pro .env.local a Vercel.
 * Heslo se nikam neukládá. Doporučení: aspoň 14 znaků, nejlépe z hlavy nebo ze správce hesel.
 */
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

const email = (await ask('E-mail pro přihlášení: ', false)).trim().toLowerCase();
const pw = await ask('Heslo: ', true);
const pw2 = await ask('Heslo znovu: ', true);
rl.close();
if (!email.includes('@')) throw new Error('Neplatný e-mail.');
if (pw !== pw2) throw new Error('Hesla se neshodují.');
if (pw.length < 12) throw new Error('Heslo má mít aspoň 12 znaků.');

const N = 16384, r = 8, p = 1;
const salt = randomBytes(16);
const hash = scryptSync(pw, salt, 32, { N, r, p, maxmem: 128 * 1024 * 1024 });
console.log('\nPřidejte do .env.local a do Vercelu (Settings → Environment Variables):\n');
console.log(`ADMIN_EMAIL=${email}`);
console.log(`ADMIN_PASSWORD_HASH=scrypt:${N}:${r}:${p}:${salt.toString('hex')}:${hash.toString('hex')}`);
console.log(`ADMIN_SESSION_SECRET=${randomBytes(48).toString('base64url')}`);
console.log('\nPo změně .env.local restartujte dev server.\n');
