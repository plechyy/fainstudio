#!/usr/bin/env bash
# Podmnožina fontů: jen latinka + české/slovenské znaky, osa wght omezená na použité řezy.
# Vyžaduje fonttools + brotli:  python3 -m venv .venv && .venv/bin/pip install fonttools brotli
set -euo pipefail
PY=${PY:-.venv/bin}
N=node_modules/@fontsource-variable
OUT=public/fonts
LAT="U+0020-007E,U+00A0-00FF,U+2010-2027,U+2030-203A,U+20AC,U+2122,U+2190-2193,U+2212"
CZ="U+0100-0101,U+010C-0111,U+011A-011B,U+0139-013E,U+0147-0148,U+0150-0155,U+0158-0161,U+0164-0165,U+016E-0171,U+017D-017E"
FEAT='kern,liga,calt,ccmp,locl,mark,mkmk,tnum,case'
tmp=$(mktemp -d)
sub() { # src rozsah wght výstup
  "$PY/pyftsubset" "$1" --unicodes="$2" --layout-features="$FEAT" --flavor=woff2 --output-file="$tmp/s.woff2"
  "$PY/fonttools" varLib.instancer "$tmp/s.woff2" "wght=$3" -o "$4" -q
}
sub $N/bricolage-grotesque/files/bricolage-grotesque-latin-wght-normal.woff2 "$LAT" 450:720 $OUT/bricolage-latin.woff2
sub $N/bricolage-grotesque/files/bricolage-grotesque-latin-ext-wght-normal.woff2 "$CZ" 450:720 $OUT/bricolage-cz.woff2
sub $N/instrument-sans/files/instrument-sans-latin-wght-normal.woff2 "$LAT" 400:650 $OUT/instrument-latin.woff2
sub $N/instrument-sans/files/instrument-sans-latin-ext-wght-normal.woff2 "$CZ" 400:650 $OUT/instrument-cz.woff2
ls -la $OUT
