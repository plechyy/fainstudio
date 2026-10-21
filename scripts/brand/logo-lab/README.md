# Generátor návrhů loga

Skládá návrhy loga ze značek, slovních podob, písem a palet (text se převádí na křivky, výstup je SVG).
Hotové návrhy patří do administrace (Soubory, `loga/navrhy-100`), ne do repozitáře.

```
python3 -m venv .venv && .venv/bin/pip install fonttools brotli uharfbuzz
mkdir fonts && cd fonts && npm init -y && npm i @fontsource-variable/{bricolage-grotesque,instrument-sans,geist,sora,space-grotesk,familjen-grotesk,unbounded,fraunces,syne,epilogue,playfair-display,outfit,lexend} @fontsource/{dm-serif-display,instrument-serif,jetbrains-mono,archivo-black,dela-gothic-one,righteous,bungee} && cd ..
.venv/bin/python build.py out      # 100 SVG + přehledy
node render.mjs out/prehled-1.svg out/prehled-1.png 2000
node ../../admin-upload.mjs loga/navrhy-100 out/*
```

Písma hledá v `fonts/node_modules` (nebo v `FONT_PKGS`). Návrhy jsou řádky v `build.py` (`add(...)`).
