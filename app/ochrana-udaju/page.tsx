import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { EMAIL, ICO, NAME } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Zásady zpracování osobních údajů',
  description: 'Jak FaiN Studio nakládá s osobními údaji z formuláře a jaké cookies a úložiště web používá.',
  alternates: { canonical: '/ochrana-udaju' },
  robots: { index: true, follow: true },
};

const UPDATED = '19. října 2026';

export default function Privacy() {
  return (
    <>
      <header className="legal__top">
        <div className="wrap">
          <Link href="/" className="legal__back">
            ← Zpět na web
          </Link>
        </div>
      </header>
      <main className="wrap legal" id="obsah">
        <h1 className="display legal__h1">Zásady zpracování osobních údajů</h1>
        <p className="legal__meta">Platné od {UPDATED}</p>

        <h2>1. Kdo údaje zpracovává</h2>
        <p>
          Správcem osobních údajů je <b>{NAME}</b>, IČO {ICO} (dále „FaiN Studio“). Kontakt:{' '}
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
        </p>

        <h2>2. Jaké údaje a proč</h2>
        <p>
          Když napíšete přes formulář na webu, zpracováváme <b>jméno, e-mail, telefon (pokud ho uvedete) a text zprávy</b>, které sami vyplníte. Používáme je
          výhradně k tomu, abychom vám odpověděli a vyřídili vaši poptávku. Jiné údaje o návštěvnících webu nesbíráme.
        </p>
        <p>
          Právním základem je provedení opatření před uzavřením smlouvy na vaši žádost a náš oprávněný zájem odpovědět na vaši
          zprávu (čl. 6 odst. 1 písm. b) a f) nařízení GDPR). Poskytnutí údajů je dobrovolné, bez nich ale nemůžeme odpovědět.
        </p>

        <h2>3. Jak dlouho údaje uchováváme</h2>
        <p>
          Po dobu komunikace a následně nejdéle <b>3 roky</b> od posledního kontaktu, abychom mohli prokázat, co jsme si
          domluvili. Poté údaje smažeme. Pokud se stanete klientem, další zpracování se řídí smlouvou a zákonnými povinnostmi (například
          účetními).
        </p>

        <h2>4. Komu údaje předáváme</h2>
        <p>Údaje nikomu neprodáváme. Na zpracování se podílejí jen poskytovatelé, bez kterých by web a formulář nefungovaly:</p>
        <ul>
          <li>poskytovatel hostingu webu (Vercel Inc.),</li>
          <li>služba pro doručení zprávy z formuláře do e-mailu (Resend),</li>
          <li>poskytovatel naší e-mailové schránky.</li>
        </ul>
        <p>
          Někteří z nich sídlí mimo Evropskou unii (USA). K předání dochází na základě standardních smluvních doložek nebo
          rozhodnutí o odpovídající ochraně podle GDPR.
        </p>

        <h2>5. Cookies a úložiště v prohlížeči</h2>
        <p>
          Web <b>nepoužívá analytické ani reklamní cookies</b> a nesleduje vás. V prohlížeči si pouze pamatuje vaši volbu světlého
          nebo tmavého režimu (úložiště localStorage). Je to technicky nezbytné pro zobrazení webu, nikam se to nepředává, a proto
          nevyžaduje souhlas ani cookie lištu. Písma jsou uložená přímo na webu a nenačítají se od třetích stran.
        </p>

        <h2>6. Vaše práva</h2>
        <p>
          Máte právo na přístup k údajům, jejich opravu nebo výmaz, omezení zpracování, přenositelnost a právo vznést námitku.
          Napište nám na <a href={`mailto:${EMAIL}`}>{EMAIL}</a> a vyřídíme to bez zbytečného odkladu. Pokud se domníváte, že
          s údaji nakládáme nesprávně, můžete podat stížnost u{' '}
          <a href="https://uoou.gov.cz" rel="noopener noreferrer" target="_blank">
            Úřadu pro ochranu osobních údajů
          </a>
          .
        </p>

        <h2>7. Automatizované rozhodování</h2>
        <p>Neprovádíme žádné automatizované rozhodování ani profilování.</p>
      </main>
      <Footer />
    </>
  );
}
