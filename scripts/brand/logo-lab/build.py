import os, sys, re, unicodedata, json
from compose import *

OUT = sys.argv[1] if len(sys.argv) > 1 else 'out'
os.makedirs(OUT, exist_ok=True)


def sym(name, **kw):
    f = SYMBOLS[name]
    return lambda p: f(p, **kw) if kw else f(p)


def mono(txt, fk, w, kind, treat, bw=100, bh=100, **kw):
    return lambda p: monogram(txt, fk, w, kind, treat, p, w=bw, h=bh, **kw)


def wd(style, fk, w=None, **kw):
    return lambda p: word(style, fk, w, p, **kw)


def bt(txt, fk, w, style, **kw):
    return lambda p: bigtext(txt, fk, w, p, style, **kw)


# (název, koncept, značka, slovo, rozložení, paleta, poměr značky, písmo-popis)
L = []


def add(title, note, mark, wordf, layout, pal, mr=None, font=''):
    L.append(dict(title=title, note=note, mark=mark, word=wordf, layout=layout, pal=pal, mr=mr, font=font))


# ── A: „ai“ a písmena v tvarech ──────────────────────────────────────────
add('ai v kruhu', 'Název obsahuje ai, tak ho dáme do kruhu jako tlačítko.', mono('ai', 'bricolage', 800, 'circle', 'fill'), wd('plain', 'bricolage', 700), 'h', 'violet', font='Bricolage Grotesque')
add('ai v zaobleném čtverci', 'Ikona jako aplikace, limetková je ostrá a moderní.', mono('ai', 'geist', 800, 'squircle', 'accent'), wd('plain', 'geist', 600), 'h', 'lime', font='Geist')
add('ai ve štítu', 'Důvěra: štít se značkou ai nad dvouřádkovým názvem.', mono('ai', 'sora', 700, 'shield', 'fill'), wd('caps', 'sora', 700), 'v', 'cobalt', font='Sora')
add('ai v oblouku', 'Oblouk jako dveře nebo okno, jemný serif.', mono('ai', 'fraunces', 700, 'arch', 'accent'), wd('duo', 'fraunces', 600), 'h', 'burgundy', font='Fraunces')
add('ai v šestiúhelníku', 'Technická šestihranná matice, mřížkové písmo.', mono('ai', 'space', 700, 'hex', 'duo'), wd('plain', 'space', 600), 'h', 'cyan', font='Space Grotesk')
add('ai jako lístek', 'Lístek s vykousnutými rohy a kontrastní serif kurzíva.', mono('ai', 'dmserif', 400, 'ticket', 'accent'), wd('serif', 'dmserif', 400, sfk='dmserifi'), 'h', 'sand', font='DM Serif Display')
add('ai v kapsli', 'Dlouhá pilulka, jako štítek nebo tlačítko.', mono('ai', 'outfit', 700, 'pill', 'fill', bw=170), wd('ai-studio', 'outfit', 500), 'h', 'teal', font='Outfit')
add('ai v listu', 'List se dvěma zaoblenými rohy, rostoucí a živý.', mono('ai', 'lexend', 800, 'leaf', 'accent'), wd('plain', 'syne', 700), 'h', 'orange', font='Syne')
add('ai v osmiúhelníku, obrys', 'Jen linka, široké písmo, vzdušné.', mono('ai', 'unbounded', 700, 'octagon', 'outline'), wd('caps-line', 'unbounded', 600), 'v', 'electric', font='Unbounded')
add('ai v kapce', 'Měkký organický tvar, teplé barvy.', mono('ai', 'epilogue', 800, 'blob', 'fill'), wd('duo', 'epilogue', 700), 'h', 'peach', font='Epilogue')
add('ai ve čtverci, černobíle', 'Ostrý čtverec, těžké písmo, jen černá a bílá.', mono('ai', 'archivo', 400, 'slab', 'fill'), wd('plain', 'archivo', 400), 'h', 'ink', font='Archivo Black')
add('ai v kosočtverci', 'Šikmý kosočtverec, sytá červená.', mono('ai', 'dela', 400, 'diamond', 'accent'), wd('plain', 'dela', 400), 'h', 'tomato', font='Dela Gothic One')

add('F v kruhu', 'Jedno písmeno, současné písmo webu.', mono('F', 'calsans', 600, 'circle', 'accent'), wd('plain', 'calsans', 600), 'h', 'night', font='Cal Sans')
add('fn jako ligatura', 'Dvě písmena spojená do jedné značky: fajn.', mono('fn', 'instrument', 700, 'squircle', 'fill'), wd('ai-studio', 'instrument', 600), 'h', 'sage', font='Instrument Sans')
add('FS monogram ve štítu', 'FaiN Studio zkráceně, zelený štít.', mono('FS', 'familjen', 700, 'shield', 'accent'), wd('caps', 'familjen', 700), 'v', 'forest', font='Familjen Grotesk')
add('F s tečkou, přechod', 'F a tečka, barevný přechod v čtverci.', mono('F.', 'bricolage', 800, 'squircle', 'grad'), wd('dotend', 'bricolage', 700), 'h', 'violetL', font='Bricolage Grotesque')
add('f v šestiúhelníku, serif', 'Malé f s kontrastem, hořčicová na černé.', mono('f', 'playfair', 800, 'hex', 'fill'), wd('serif', 'playfair', 700, sfk='playfairi'), 'h', 'mustard', font='Playfair Display')
add('F v obloukových dveřích', 'Vysoký serifový monogram, klidný a dospělý.', mono('F', 'instrserif', 400, 'arch', 'fill'), wd('plain', 'instrserif', 400), 'h', 'lav', font='Instrument Serif')
add('ai obrys ve čtverci', 'Barevný obrys, přívětivé písmo.', mono('ai', 'lexend', 700, 'squircle', 'outline-ac'), wd('plain', 'lexend', 500), 'h', 'ocean', font='Lexend')
add('AI kapitálky, mono', 'Terminálová estetika: kapitálky v kruhu.', mono('AI', 'mono', 700, 'circle', 'soft'), wd('mono-lower', 'mono', 700), 'h', 'mint', font='JetBrains Mono')
add('FaiN v pilulce', 'Celé jméno jako štítek, nic víc.', mono('FaiN', 'bungee', 400, 'pill', 'accent', bw=240, fill_ratio=0.8), None, 'h', 'bubble', font='Bungee')
add('ai ve čtverci, červeno-černá', 'Důrazný čtverec, červená a černá.', mono('ai', 'righteous', 400, 'square', 'duo'), wd('plain', 'righteous', 400), 'h', 'red', font='Righteous')

# ── B: symboly + slovní podoba ───────────────────────────────────────────
add('Odškrtnuto: fajn', 'Plný kruh s odškrtnutím, „fajn“ znamená v pořádku.', sym('check_disc'), wd('duo', 'calsans', 600), 'h', 'lime', font='Cal Sans')
add('Odškrtnutí z bodů', 'Tři uzly spojené do ptáčka: kroky automatizace.', sym('check_flow'), wd('plain', 'geist', 600), 'h', 'cobalt', font='Geist')
add('F z uzlů a čar', 'Schéma toku, ze kterého vyrostlo F.', sym('nodes_f'), wd('weightmix2', 'bricolage', 700), 'h', 'ink', font='Bricolage Grotesque')
add('Tep', 'Puls jako přenos dat, zakončený tečkou.', sym('pulse'), wd('slash', 'sora', 600), 'h', 'cyan', font='Sora')
add('Jiskra', 'Jedna ostrá jiskra, symbol „chytrého“.', sym('spark_one'), wd('ai', 'instrument', 600), 'h', 'violet', font='Instrument Sans')
add('Tři jiskry', 'Velká, střední a malá: nápad, který se množí.', sym('spark_trio'), wd('serif', 'fraunces', 600, sfk='instrserifi'), 'h', 'night', font='Fraunces + Instrument Serif')
add('Bublina s úsměvem', 'Lidský rozhovor s AI, odpověď s úsměvem.', sym('bubble'), wd('duo', 'outfit', 700), 'h', 'bubble', font='Outfit')
add('Smajlík', 'Přímé „fajn“, žlutá na černé.', sym('smile'), wd('plain', 'familjen', 700), 'h', 'mustard', font='Familjen Grotesk')
add('Úsměv a tečka', 'Minimalistický úsměv s jednou tečkou, kurzíva.', sym('smile_arc'), wd('italic', 'bricolage', 700), 'h', 'peach', font='Bricolage Grotesque')
add('Razítko', 'Kulaté razítko „FAIN STUDIO · AI · FAJN“, kvalita schválená.', lambda p: SYMBOLS['stamp'](p), None, 'h', 'sand', font='Bricolage Grotesque')
add('Pixelové F', 'F poskládané ze čtverečků, jeden je barevný.', sym('pixel_f'), wd('mono-lower', 'mono', 700), 'h', 'forest', font='JetBrains Mono')
add('Domalované F', 'Tah prstem: zachovává dnešní malovaný nádech.', sym('brush_f'), wd('duo', 'finger', 400), 'h', 'orange', font='Finger Paint')
add('Bauhaus', 'Čtyři tvary, jedna kompozice, silné kapitálky.', sym('bauhaus'), wd('caps', 'syne', 800), 'h', 'mint', font='Syne')
add('Kostka', 'Studio jako objekt: tři strany, tři barvy.', sym('cube'), wd('plain', 'unbounded', 500), 'h', 'ocean', font='Unbounded')
add('Smyčka', 'Nekonečná smyčka: procesy, které běží samy.', sym('loop'), wd('one', 'lexend', 600), 'h', 'teal', font='Lexend')
add('Cyklus', 'Dvě šipky dokola: automatizace opakovaného.', sym('cycle'), wd('duo-n', 'space', 700), 'h', 'red', font='Space Grotesk')
add('Tečkové ai', 'ai z teček jako na displeji.', sym('dots_ai'), wd('ai-studio', 'mono', 700), 'h', 'inkneg', font='JetBrains Mono')
add('Signál', 'Vlny vycházející z bodu: odpověď AI.', sym('ripple'), wd('plain', 'epilogue', 600), 'h', 'pink', font='Epilogue')
add('Příkazový řádek', 'Prompt >_ , poctivě vývojářské.', sym('prompt'), wd('plain', 'mono', 700), 'h', 'silver', font='JetBrains Mono')
add('Stehy', 'Tečkované F jako steh: ruční práce, rozepsané pod sebou.', sym('stitch'), wd('tracked', 'instrument', 500), 'v', 'sage', font='Instrument Sans')
add('Přerušovaná čára', 'Čárkované F, kreslicí rýsování, podtržené jméno.', sym('stitch', dots=False), wd('under', 'geist', 600), 'h', 'tomato', font='Geist')
add('Závorky', 'Závorky kolem bodu: kód a kontext, serif.', sym('brackets'), wd('plain', 'dmserif', 400), 'h', 'ink', font='DM Serif Display')
add('Vrstvy', 'Tři vrstvy, jedna nad druhou, dvouřádkový název.', sym('layers'), wd('stack', 'bricolage', 800), 'h', 'cobalt', font='Bricolage Grotesque')
add('Zvuková vlna', 'Hlas a asistent: zvuková stopa s jedním barevným sloupcem.', sym('wave'), wd('caps-line', 'familjen', 600), 'h', 'cyan', font='Familjen Grotesk')
add('Štít s odškrtnutím', 'Data zůstávají vaše: štít a odškrtnutí.', sym('shield_check'), wd('plain', 'instrument', 700), 'h', 'teal', font='Instrument Sans')
add('Klíčová dírka', 'Přístup jen pro koho určíte: klíčová dírka.', sym('keyhole'), wd('caps', 'geist', 700), 'v', 'night', font='Geist')
add('Slunce', 'Dobrá nálada, paprsky kolem kruhu.', sym('sun'), wd('duo', 'outfit', 600), 'h', 'mustard', font='Outfit')
add('Kruh s mezerou', 'Načítací kroužek s tečkou ve výřezu.', sym('ring_gap'), wd('plain', 'sora', 500), 'h', 'violet', font='Sora')
add('F jako obvod', 'Plošný spoj: F z cest s uzly.', sym('circuit_f'), wd('dot', 'space', 700), 'h', 'ocean', font='Space Grotesk')
add('Průnik', 'Dva kruhy, kde se potkáváte vy a my.', sym('venn'), wd('plain', 'instrument', 600), 'h', 'burgundy', font='Instrument Sans')
add('Pruhy', 'Šikmé pruhy v kruhu, rychlost a energie, kurzíva.', sym('stripes'), wd('italic-duo', 'archivo', 400), 'h', 'bubble', font='Archivo Black')
add('Šipka v kruhu', 'Růst, posun vpřed, červená a černá.', sym('arrow_ring'), wd('plain', 'calsans', 600), 'h', 'red', font='Cal Sans')
add('Hvězdice', 'Šest ramen, jedno těžiště, kapitálky.', sym('asterisk'), wd('caps-line', 'bricolage', 700), 'h', 'orange', font='Bricolage Grotesque')
add('Papírová vlaštovka', 'Papírové letadlo: odešleme a doletí.', sym('plane'), wd('duo', 'instrument', 600), 'h', 'sand', font='Instrument Sans')
add('Raster', 'Půltónový raster jako koule, tiskařská hrdost.', sym('halftone'), wd('plain', 'fraunces', 500), 'h', 'violetL', font='Fraunces')
add('Sloupce', 'Tři rostoucí sloupce, nejvyšší barevný.', sym('bars'), wd('plain', 'geist', 700), 'h', 'ink', font='Geist')
add('Dvě plochy', 'F ze dvou ploch: ostré a odvážné.', sym('half_f'), wd('plain', 'dela', 400), 'h', 'silver', font='Dela Gothic One')
add('Hledáček', 'Zaostřeno: čtyři rohy a bod uprostřed.', sym('corner'), wd('tracked', 'sora', 600), 'v', 'inkneg', font='Sora')
add('Kostky', 'Tři skládací bloky, jak se systém staví.', sym('blocks'), wd('duo', 'familjen', 700), 'h', 'lav', font='Familjen Grotesk')
add('Zprávy', 'Tři řádky konverzace v pilulkách.', sym('chat_lines'), wd('plain', 'lexend', 500), 'h', 'mint', font='Lexend')
add('Oko', 'Dohlížíme: oko s barevnou duhovkou.', sym('eye'), wd('under', 'epilogue', 700), 'h', 'burgundy', font='Epilogue')
add('Výhonek', 'Roste z jedné stopky: začínáme malým a rosteme.', sym('leaf_f'), wd('plain', 'fraunces', 700), 'h', 'sage', font='Fraunces')

# ── C: jen značky (ikony aplikace, avatar) ───────────────────────────────
add('Ikona: dvě plochy', 'Samotné F pro avatar a favikonu.', sym('half_f'), None, 'h', 'electric', font='-')
add('Ikona: odškrtnuto', 'Odškrtnutí jako avatar na červené.', sym('check_disc'), None, 'h', 'tomato', font='-')
add('Ikona: úsměv', 'Samotný úsměv a tečka, hořčice.', sym('smile_arc'), None, 'h', 'mustard', font='-')
add('Ikona: pixelové F', 'Pixelové F, limetka na černé.', sym('pixel_f'), None, 'h', 'lime', font='-')
add('Ikona: jiskra v kruhu', 'Jiskra jako tlačítko: bílý kruh a fialová hvězda.', lambda p: monogram('', 'geist', 700, 'circle', 'fill', p) if False else It(cont('circle', 100, 100, p['fg']) + star4(50, 50, 36, p['ac']), 0, 0, 100, 100), None, 'h', 'violet', font='-')
add('Ikona: razítko', 'Razítko jako značka kvality, fialové.', lambda p: SYMBOLS['stamp'](p, fk='fraunces'), None, 'h', 'forest', font='Fraunces')

# ── D: čisté slovní značky ───────────────────────────────────────────────
add('Cal Sans, dvě barvy', 'Písmo, které máme na webu, Studio v barvě.', None, wd('duo', 'calsans', 600), 'h', 'violet', font='Cal Sans')
add('Bricolage, oranžová', 'Výrazné nadpisové písmo s drobnými zářezy.', None, wd('duo', 'bricolage', 800), 'h', 'orange', font='Bricolage Grotesque')
add('fain, ai zvýrazněno', 'Malými: ai uprostřed světí barvou.', None, wd('ai', 'unbounded', 700), 'h', 'electric', font='Unbounded')
add('F-ai-N, ai fialově', 'Jen jméno, ai v barvě, hodně vzduchu.', None, wd('F-ai-N', 'instrument', 700), 'h', 'violetL', font='Instrument Sans')
add('FAIN STUDIO, široké', 'Kapitálky, široké řezy, tmavě modrá a růžová.', None, wd('caps', 'unbounded', 600), 'h', 'pink', font='Unbounded')
add('FAIN STUDIO, jedna řada', 'Rozkročená jednořádková sazba.', None, wd('caps-line', 'syne', 800), 'h', 'lime', font='Syne')
add('Serifová kurzíva', 'FaiN přímé, Studio v elegantní kurzívě.', None, wd('serif', 'instrument', 600, sfk='instrserifi'), 'h', 'sand', font='Instrument Sans + Serif')
add('Obrys', 'Jen obrys písma, tučné široké.', None, wd('outline', 'dela', 400), 'h', 'tomato', font='Dela Gothic One')
add('Podtržení', 'Silná podtržítka v barvě.', None, wd('under', 'sora', 700), 'h', 'cobalt', font='Sora')
add('Dvoubarevné půlené', 'Horní polovina písma bíle, spodní barevně.', None, wd('split', 'archivo', 400), 'h', 'mustard', font='Archivo Black')
add('Posunutý stín', 'Tisk mimo registr: barevný stín za černým písmem.', None, wd('shadow', 'bungee', 400), 'h', 'peach', font='Bungee')
add('Střídavé barvy', 'Každé písmeno jinak, hravé.', None, wd('alt', 'righteous', 400), 'h', 'bubble', font='Righteous')
add('Kurzíva, tučně', 'Šikmé písmo, rychle a sebejistě.', None, wd('italic', 'geist', 800), 'h', 'teal', font='Geist')
add('FaiN nad Studio', 'Dvě řádky těsně pod sebou, červená a černá.', None, wd('stack', 'familjen', 800), 'h', 'red', font='Familjen Grotesk')
add('F A I N, rozteč', 'Rozepsané s velkou mezerou, mikropísmo pod tím.', None, wd('tracked', 'fraunces', 400), 'h', 'burgundy', font='Fraunces')
add('Střídání tloušťky', 'Tučné F a N, tenké ai a Studio.', None, wd('weightmix', 'epilogue', 800), 'h', 'night', font='Epilogue')
add('FaiN tučně, Studio tence', 'Dva stupně tloušťky jednoho písma.', None, wd('weightmix2', 'outfit', 800), 'h', 'mint', font='Outfit')
add('Tečka nad i', 'Tečka z písma nahrazená barevným kruhem.', None, wd('spark', 'space', 700), 'h', 'cyan', font='Space Grotesk')
add('Jiskra nad i', 'Tečka nad i se mění v jiskru.', None, wd('spark-star', 'bricolage', 800), 'h', 'forest', font='Bricolage Grotesque')
add('ai v rámečku uvnitř jména', 'Tečka na i: ai jako zvýrazněná buňka.', None, wd('aibox', 'sora', 700), 'h', 'silver', font='Sora')
add('Štítek', 'Celé jméno na plném štítku, serif.', None, wd('label', 'dmserif', 400), 'h', 'ink', font='DM Serif Display')
add('FaiN v pilulce', 'FaiN v barevné pilulce, Studio lehčím řezem.', None, wd('pill', 'lexend', 600), 'h', 'lav', font='Lexend')
add('fain_studio', 'Podtržítko jako v kódu, jméno malým.', None, wd('mono-lower', 'mono', 700), 'h', 'inkneg', font='JetBrains Mono')
add('[ FaiN ]', 'Hranaté závorky, technický styl.', None, wd('bracket', 'space', 700), 'h', 'ocean', font='Space Grotesk')
add('Blikající kurzor', 'Za jménem bliká kurzor, jako v našem hero.', None, wd('caret', 'instrument', 600), 'h', 'sage', font='Instrument Sans')
add('> fain', 'Příkazový řádek, jen fain.', None, wd('prompt', 'mono', 700), 'h', 'lime', font='JetBrains Mono')
add('FaiN + Studio', 'Plusko, vy a my dohromady.', None, wd('plus', 'playfair', 700), 'h', 'peach', font='Playfair Display')
add('FaiNStudio, jedno slovo', 'Bez mezery, dvě barvy.', None, wd('one', 'fraunces', 600), 'h', 'orange', font='Fraunces')
add('FaiN/Studio', 'Lomítko jako dělicí čára.', None, wd('slash', 'instrument', 600), 'h', 'violet', font='Instrument Sans')
add('Dnešní logo, výchozí bod', 'Finger Paint, tak jak ho máme teď. Pro srovnání.', None, wd('duo', 'finger', 400), 'h', 'violet', font='Finger Paint')

assert len(L) == 100, len(L)


def slug(s):
    s = unicodedata.normalize('NFKD', s).encode('ascii', 'ignore').decode().lower()
    return re.sub(r'[^a-z0-9]+', '-', s).strip('-')


svgs = []
for n, d in enumerate(L, 1):
    p = P[d['pal']]
    it = compose(d['mark'], d['word'], d['layout'], p, d['mr'])
    maxh = 240 if d['layout'] in ('v',) or (d['mark'] and not d['word']) else 215
    maxw = 470 if d['word'] else 250
    if d['mark'] and not d['word']:
        maxw = 250 if d['title'] != 'FaiN v pilulce' else 440
    s = logo_svg(it, p, maxw=maxw, maxh=maxh)
    name = f"{n:03d}-{slug(d['title'])}.svg"
    open(os.path.join(OUT, name), 'w').write(s)
    svgs.append((s, f"{n:03d} · {d['title']} · {d['pal']}"))
    d['file'] = name

per = 20
for k in range(0, 100, per):
    sh = sheet(svgs[k:k + per], 4, cell=(400, 262))
    open(os.path.join(OUT, f'prehled-{k // per + 1}.svg'), 'w').write(sh)

json.dump([{k: v for k, v in d.items() if k in ('title', 'note', 'pal', 'font', 'file', 'layout')} for d in L], open(os.path.join(OUT, 'index.json'), 'w'), ensure_ascii=False, indent=1)
print('hotovo', len(L))
