# fainstudio.com

Jednostránkový web FaiN Studio. Má jediný úkol: návštěvník si ověří, že jde o skutečného dodavatele, pochopí nabídku a zarezervuje si dvacetiminutový hovor.

- **Dev:** `npm run dev` → http://localhost:4321 (port 3000 je obsazený, proto Astro default 4321)
- **Build:** `npm run build` → `dist/`
- **Náhled buildu:** `npm run preview -- --port 4322`
- **Test kontrastu:** `npm test` (zároveň přegeneruje `src/styles/fallback.css`)
- **Ladění barev:** přidej `?tweak=1` do adresy nebo stiskni klávesu **C**

Node ≥ 22.18 (kvůli Astro 7 a nativnímu spouštění `.ts` v testu).

---

## Proč tenhle stack

**Astro 7, statický výstup, bez CSS frameworku.**

1. **Nulový JS ve výchozím stavu.** Astro vyrenderuje HTML při buildu a do prohlížeče pošle jen skripty, které komponenta opravdu potřebuje. Celá interaktivita (přepínač tématu, záložky systémů, reveal při scrollu, spouštění videa) má dohromady pár kilobajtů. Next.js by kvůli jedné statické stránce posílal React runtime.
2. **Komponenty bez runtime.** Každá sekce je vlastní `.astro` soubor se scoped CSS. Struktura zůstane čitelná, ale do prohlížeče nejde nic navíc. S čistým HTML by stejné rozdělení znamenalo ruční skládání nebo vlastní šablonovací skript.
3. **Cesta dál bez přepisování.** Zadání zní „nemá to být úplně statický, kdyžtak přidáme víc". Astro umí přidat serverové routy (např. odesílání formuláře, webhook, API) přes `@astrojs/vercel` a u konkrétní stránky `export const prerender = false`. Zbytek webu zůstane statický. Adaptér zatím záměrně není nainstalovaný, protože ho nic nepotřebuje.
4. **Žádný Tailwind.** Barevný systém stojí na CSS proměnných a OKLCH. Vlastní CSS je kratší a čitelnější než utility třídy, které by stejně odkazovaly na proměnné.
5. **Žádná animační knihovna.** Sekvence při načtení je čistě CSS `@keyframes`, reveal běží přes `IntersectionObserver` a CSS transition. Motion One ani GSAP nebyly potřeba.
6. **Žádný Three.js.** 3D je předrenderované (viz níže). V prohlížeči se nic nepočítá.

Závislosti: `astro`, `@fontsource-variable/bricolage-grotesque`, `@fontsource-variable/instrument-sans`. Fonty se z balíčků jen jednou zkopírovaly do `public/fonts/` (latin + latin-ext), takže se servírují z vlastní domény a bez požadavku na Google.

---

## Art direction

> **„Technická dokumentace dílny"**: výkresový list s čísly pozic a kótami, ve kterém leží clay modely jako na pracovním stole.

- **Signature prvek:** tmavé „výřezy" (`Plate.astro`) s rohovými značkami a popiskem `OBR. 0X`. V obou tématech mají stejné studiové pozadí jako předrenderované video, takže na sebe rendery bezešvě navazují.
- **Hlavičky sekcí** jsou pozice ve výkresu (`02 — Systémy` + vlasová linka). Postup je kóta s kosočtverci, v CTA je výkresová mřížka.
- **Typografie:** Bricolage Grotesque (nadpisy, variabilní řez 200–800) a Instrument Sans (text, 400–700). Dvě rodiny, dva variabilní soubory na každou sadu znaků.
- **Barva:** jeden odstín, akcent pokrývá zhruba 5–10 % plochy (CTA, aktivní stavy, číslování).

---

## Barevný systém

Vše vychází z `--brand-h` (odstín 0–360) a `--brand-c` (chroma) v `src/styles/tokens.css`.

- Akcent, tmavý akcent, wash i **všechny neutrály** (pozadí, text, linky) mají stejný odstín. Neutrály mají chroma ~0.01, takže ladí s akcentem a nepůsobí jako šablonová šedá.
- Témata jsou definovaná jen na úrovni proměnných: světlé na `:root`, tmavé v `@media (prefers-color-scheme: dark)` (pokud uživatel nepřepnul na světlé) a pod `[data-theme="dark"]`. Přepínač v navigaci volbu ukládá do `localStorage` a nastavuje ji před prvním vykreslením, takže nic neprobliká.
- **Text na akcentu:** `onBrand()` v `src/lib/color.ts` převede OKLCH do sRGB (s gamut mappingem podle CSS Color 4), spočítá WCAG kontrast proti tmavému i světlému textu a vybere lepší variantu. Akcent má pevnou světlost L = 0.70, takže vychází tmavý text na celém kruhu. To je výhoda OKLCH oproti HSL, kde se právě žlutá a tmavě modrá lámou.
- **Fallback:** `npm test` vygeneruje `src/styles/fallback.css` se sRGB hodnotami pod `@supports not (color: oklch(0 0 0))`.

### Výsledek `npm test`

12 odstínů × 6 chromat (0–0.22) × 2 témata. Kontroluje text, sekundární text a akcentní text na všech pozadích a text na akcentu. **Vše prošlo.**

| odstín | akcent (c 0.14) | text na akcentu | kontrast | akcentní text světlé / tmavé |
|---|---|---|---|---|
| 0 | `#e3769b` | tmavý | 6.36 : 1 | 6.02 / 9.70 |
| 60 | `#dd8736` | tmavý | 6.55 : 1 | 5.79 / 9.91 |
| 120 | `#94ab39` | tmavý | 6.97 : 1 | 5.43 / 10.52 |
| 180 | `#00b8a1` | tmavý | 7.15 : 1 | 5.33 / 10.84 |
| 240 | `#37a8ec` | tmavý | 6.88 : 1 | 5.51 / 10.38 |
| 300 | `#ac89e8` | tmavý | 6.47 : 1 | 5.93 / 9.88 |

Nejhorší případ na celém rozsahu: 6.12 : 1 (odstín 330, chroma 0.22).

### Ladicí panel

Je to nástroj pro zadavatele, ne pro návštěvníky. Otevře se přes `?tweak=1` nebo klávesou **C**. Umí posuvník odstínu a chromatu, přepnutí tématu, živý kontrast textu na akcentu a tlačítko „Kopírovat CSS". Volba se pamatuje v `localStorage` (jen v daném prohlížeči). Kód panelu (`src/scripts/tweak-panel.ts`) se stahuje dynamicky až při otevření, takže běžný návštěvník ho nenačte.

**Až bude barva vybraná:** vlož vypsané `--brand-h` / `--brand-c` do `tokens.css` a spusť `npm test`. Pokud chceš panel z produkce úplně odstranit, smaž blok „Panel pro ladění barev" v `src/layouts/Base.astro`.

---

## 3D vizuály — co kam patří

Všechno v `public/media/` jsou **zástupné clay rendery**. Generuje je `scripts/render-placeholders.py` (SDF raymarching v numpy, potřebuje `ffmpeg` a `cwebp`). Stačí je přepsat finálními rendery **pod stejným názvem a ve stejném rozměru**, kód se měnit nemusí.

| Soubor | Rozměr | Délka / formát | Limit | Kde na stránce |
|---|---|---|---|---|
| `hero-loop.webm` | 640 × 640 | 4 s, 24 fps, bezešvá smyčka, VP9, bez zvuku | ≤ 400 KB | Hero, Obr. 01 |
| `hero-loop.mp4` | 640 × 640 | totéž, H.264 (fallback pro Safari) | ≤ 400 KB | Hero |
| `hero-poster.webp` | 640 × 640 | první snímek smyčky | ≤ 200 KB | Hero (poster, reduced motion) |
| `hero-poster.jpg` | 640 × 640 | první snímek (og:image) | — | Náhled při sdílení odkazu |
| `system-01-poptavky.webp` / `.png` | 800 × 800 | still s alfou | ≤ 200 KB (webp) | Systémy, záložka 01 |
| `system-02-dokumenty.webp` / `.png` | 800 × 800 | still s alfou | ≤ 200 KB | Záložka 02 |
| `system-03-asistent.webp` / `.png` | 800 × 800 | still s alfou | ≤ 200 KB | Záložka 03 |
| `system-04-data.webp` / `.png` | 800 × 800 | still s alfou | ≤ 200 KB | Záložka 04 |
| `system-05-weby.webp` / `.png` | 800 × 800 | still s alfou | ≤ 200 KB | Záložka 05 |
| `system-06-video.webp` / `.png` | 800 × 800 | still s alfou | ≤ 200 KB | Záložka 06 |
| `matyas.webp` (+ `.jpg`) | 960 × 1200 (4 : 5) | portrét | ≤ 200 KB | Kdo to staví — **zatím chybí**, viz `About.astro` |

**Pravidla pro finální rendery:**
- Pozadí hero videa musí odpovídat výřezu: vertikální přechod `#1b1a18` → `#0f0e0e`. Jinak bude vidět hrana. Případně změň `--plate-top` / `--plate-bot` v `tokens.css`.
- Stilly jsou s průhledností a leží na stejném tmavém výřezu. Stín na podlaze patří do alfy.
- Ideální osvětlení je zleva shora, objekt uprostřed s rezervou ~10 % kolem.
- Export: `ffmpeg -i frames/%03d.png -c:v libvpx-vp9 -b:v 0 -crf 40 -row-mt 1 -an hero-loop.webm` a `ffmpeg -i frames/%03d.png -c:v libx264 -crf 28 -preset slow -pix_fmt yuv420p -movflags +faststart -an hero-loop.mp4`.

**Chování:** Hero video se spouští z JS. Při `prefers-reduced-motion: reduce` se nepřehrává a zůstane poster. Mimo obrazovku a ve skrytém panelu se pauzne. Stilly mají první obrázek `eager`, ostatní `lazy`. Všech šest leží v DOMu nad sebou a přepínají se jen průhledností, takže přepnutí záložky nic nenačítá. Na hover/focus záložky se obrázek předem dekóduje.

---

## Animace

- **Načtení:** jedna CSS sekvence v hero (nadtitulek → titulek → podtitulek → tlačítka → pás faktů). Odstup 60 ms, celé to trvá do ~600 ms.
- **Scroll:** `.reveal` posune o 20 px a zprůhlední. `IntersectionObserver` s kladným `rootMargin` spustí animaci těsně před vstupem do pohledu, a to jen jednou. `will-change` se nastaví při startu a po `transitionend` odebere.
- **Hover:** tlačítka, záložky, řádky tabulky, FAQ, vše do 150 ms.
- Animují se jen `transform` a `opacity`. Výjimkou jsou barvy pozadí a okrajů u hover stavů, které nespouštějí layout.
- `prefers-reduced-motion: reduce` vypne všechno a obsah zůstane plně viditelný. Bez JS je obsah viditelný taky, protože reveal se aktivuje až třídou `.js`.

---

## Obsahová pravidla (dodržená)

- **Reference jsou skryté.** V `src/content.ts` mají `show: false` a poznámku, že před zobrazením je potřeba písemný souhlas klienta. Sekce se vykreslí sama, jakmile má aspoň jedna položka `show: true`.
- **Cal.com odkaz** je v jediné konstantě `CAL_URL` v `src/config.ts`. Zatím je zástupný: `https://cal.com/fainstudio/20min`.
- Na webu nejsou cizí loga, vymyšlená čísla, odpočty ani „náš tým". Formulář není, hlavní cesta je rezervace.
- Odkaz „Cena" v navigaci vede na otázku „Kolik to stojí?" ve FAQ a rovnou ji rozbalí.
- **Jediný text navíc oproti briefu** je nadpis FAQ „Na co se lidi ptají", protože brief nadpis neuváděl. Klidně ho změň v `Faq.astro`.

---

## Výkon a přístupnost

Lighthouse 12, produkční build (`npm run build && npm run preview`), měřeno 7. 10. 2026:

| Profil | Výkon | Přístupnost | Best practices | SEO | LCP | FCP | CLS | TBT |
|---|---|---|---|---|---|---|---|---|
| Mobil, výchozí „Slow 4G" (1,6 Mb/s, RTT 150 ms, CPU 4×) | 100 | 100 | 100 | 100 | 1,8 s | 1,1 s | 0 | 0 ms |
| Mobil, 4G (9 Mb/s, RTT 60 ms, CPU 4×) | 100 | 100 | 100 | 100 | 0,5 s | 0,4 s | 0 | 0 ms |
| Desktop | 100 | 100 | 100 | 100 | 0,4 s | 0,2 s | 0 | 0 ms |

**LCP pod 1,5 s:** splněno na 4G. Na výchozím profilu Lighthouse („Slow 4G", ten je přísnější než běžné 4G) vychází 1,8 s. LCP je titulek a čeká na nadpisové písmo. Co jsem udělal:
- Fonty jsem zmenšil podmnožinou jen na latinku a češtinu a omezil osu `wght` na použité řezy (`scripts/subset-fonts.sh`). Nadpisové písmo kleslo z 60 na 39 KB, všechny fonty ze 100 na 71 KB.
- Přednačítá se jen nadpisové písmo, textové se načte samo.
- Titulek při načtení jen vyjede (`transform`) a nezprůhledňuje se, protože prvky s `opacity: 0` se do LCP nepočítají.
- Zbývající cesta k 1,5 s i na Slow 4G je `font-display: optional` pro nadpisy. Brief ale chce `swap`, takže to nechávám na rozhodnutí.

JS v prohlížeči: ~5 KB gzip (limit 60 KB). Ladicí panel má dalších 2,5 KB a stahuje se jen na vyžádání. Celá stránka při prvním načtení: ~230 KB včetně videa.

Opatření:
- CSS je inlinované v HTML (`inlineStylesheets: 'always'`), takže žádný blokující požadavek.
- Fonty jsou podmnožina (71 KB celkem), přednačítá se jen nadpisové písmo (39 KB). Záložní písma mají změřený `size-adjust`, aby výměna fontu neposouvala layout.
- Každý obrázek a video má `width`/`height` nebo `aspect-ratio`, takže CLS je 0.
- Záložky mají ARIA `tablist` a ovládání šipkami, Home a End. FAQ je nativní `<details>`. Je tu skip link, viditelné focus stavy a srovnávací tabulka s `<caption>` a `scope`.

---

## Nasazení (Vercel)

1. Repo pushnout na GitHub a ve Vercelu ho importovat. Framework se detekuje sám (Astro), build `npm run build`, výstup `dist`.
2. Doménu `fainstudio.com` přidat v Settings → Domains.
3. `vercel.json` nastavuje dlouhé cache pro fonty a hashované assety a základní bezpečnostní hlavičky.

---

## Co ještě chybí

- [ ] Finální 3D rendery (hero smyčka + 6 stillů) místo zástupných
- [ ] Fotka do „Kdo to staví" (`public/media/matyas.webp`)
- [ ] Skutečný Cal.com odkaz v `src/config.ts`
- [ ] Souhlasy s referencemi, pak `show: true`
- [ ] Výběr finálního tématu a barvy, pak případně odstranit druhé téma a přepínač
- [ ] OG obrázek na míru (teď se používá poster hero videa)
