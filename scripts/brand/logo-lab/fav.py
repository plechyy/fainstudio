"""Druhé kolo: varianty z oblíbených návrhů (hvězdy jinak, F z tvarů, klíčová dírka, ručně malé, pilulky)."""
import os, sys, re, json, math, shutil, unicodedata
from compose import *

OUT = sys.argv[1] if len(sys.argv) > 1 else 'out2'
PREV = 'out'  # první kolo (originály oblíbených)
os.makedirs(OUT, exist_ok=True)


def wd(style, fk, w=None, **kw):
    return lambda p: word(style, fk, w, p, **kw)


def rot(svg, deg, cx=50, cy=50):
    return f'<g transform="rotate({num(deg)} {num(cx)} {num(cy)})">{svg}</g>'


# ── nové značky místo „gemini“ hvězdy ─────────────────────────────────────
def star_n(p, n=8, inner=0.55, col=None, rnd=4, R=46, rotdeg=0):
    col = col or p['ac']
    R = R - rnd / 2
    pts = []
    for i in range(2 * n):
        r = R if i % 2 == 0 else R * inner
        a = math.radians(rotdeg - 90 + i * 180 / n)
        pts.append((50 + r * math.cos(a), 50 + r * math.sin(a)))
    d = 'M' + ' L'.join(f'{num(x)},{num(y)}' for x, y in pts) + 'Z'
    return pth(d, col, col, rnd)


def mk(svg):
    return It(svg, 0, 0, 100, 100)


def b_star8(p): return mk(star_n(p, 8, 0.5, rnd=5))
def b_star6(p): return mk(star_n(p, 6, 0.36, rnd=4))
def b_seal12(p): return mk(star_n(p, 12, 0.84, rnd=3))
def b_star5(p): return mk(star_n(p, 5, 0.52, rnd=10))
def b_star16(p): return mk(star_n(p, 16, 0.56, rnd=1.5))
def b_star3(p): return mk(star_n(p, 3, 0.3, rnd=8, rotdeg=0))


def b_flower6(p):
    s = ''
    for k in range(6):
        a = math.radians(k * 60)
        s += circ(50 + 27 * math.cos(a), 50 + 27 * math.sin(a), 20, p['ac'] if k % 2 == 0 else p['ac2'])
    return mk(s + circ(50, 50, 12, p['fg']))


def b_pinwheel(p):
    blade = 'M50,50 L50,3 Q86,10 97,50 Z'
    s = ''.join(rot(pth(blade, p['ac'] if k % 2 == 0 else p['fg']), 90 * k) for k in range(4))
    return mk(s)


def b_triskele(p):
    blade = 'M50,50 C50,18 72,4 94,14 C84,38 68,50 50,50Z'
    cols = [p['ac'], p['fg'], p['ac2']]
    return mk(''.join(rot(pth(blade, cols[k]), 120 * k) for k in range(3)))


def b_swirl(p):
    pts = []
    for i in range(0, 260):
        t = i / 259
        a = t * 5.2 * math.pi
        r = 4 + t * 42
        pts.append((50 + r * math.cos(a), 50 + r * math.sin(a)))
    return mk(pth('M' + ' L'.join(f'{num(x)},{num(y)}' for x, y in pts), 'none', p['ac'], 9) + circ(50, 50, 6, p['fg']))


def b_atom(p):
    s = ''.join(f'<ellipse cx="50" cy="50" rx="46" ry="17" fill="none" stroke="{p["fg"] if k else p["ac"]}" stroke-width="6" transform="rotate({k * 60} 50 50)"/>' for k in range(3))
    return mk(s + circ(50, 50, 10, p['ac2']))


def b_petals5(p):
    s = ''.join(f'<ellipse cx="50" cy="22" rx="14" ry="26" fill="{p["ac"] if k % 2 == 0 else p["ac2"]}" transform="rotate({k * 72} 50 50)"/>' for k in range(5))
    return mk(s + circ(50, 50, 9, p['bg']))


def b_crescent(p):
    return mk(pth('M58,8 A44,44 0 1 0 58,92 A62,62 0 0 1 58,8Z', p['ac']) + circ(78, 30, 9, p['fg']))


def b_clover(p):
    s = ''.join(circ(50 + 22 * dx, 50 + 22 * dy, 22, p['ac'] if (dx + dy) % 2 else p['ac2']) for dx, dy in ((0, -1), (1, 0), (0, 1), (-1, 0)))
    return mk(s + f'<rect x="36" y="36" width="28" height="28" fill="{p["ac"]}"/>')


def b_squares8(p):
    return mk(f'<rect x="14" y="14" width="72" height="72" rx="6" fill="{p["ac"]}"/>' + f'<rect x="14" y="14" width="72" height="72" rx="6" fill="{p["ac2"]}" transform="rotate(45 50 50)"/>')


def b_ring_dots(p):
    s = ''.join(circ(50 + 38 * math.cos(math.radians(k * 30)), 50 + 38 * math.sin(math.radians(k * 30)), 7.5 if k % 3 else 10, p['ac'] if k % 3 == 0 else p['fg']) for k in range(12))
    return mk(s + circ(50, 50, 14, p['ac2']))


def b_burst_rays(p):
    s = ''
    for k in range(10):
        a = math.radians(k * 36 - 90)
        r0, r1 = 14, 46 if k % 2 == 0 else 34
        s += line(50 + r0 * math.cos(a), 50 + r0 * math.sin(a), 50 + r1 * math.cos(a), 50 + r1 * math.sin(a), p['ac'] if k % 2 == 0 else p['fg'], 9)
    return mk(s)


BURSTS = [b_star8, b_star6, b_seal12, b_star5, b_star16, b_star3, b_flower6, b_pinwheel, b_triskele, b_swirl, b_atom, b_petals5, b_crescent, b_clover, b_squares8, b_ring_dots, b_burst_rays]


# ── F z barevných tvarů (podle Bauhausu) ──────────────────────────────────
def cell(kind, r, col, x, y, s):
    if kind == 'sq':
        el = f'<rect x="{num(x)}" y="{num(y)}" width="{s}" height="{s}" fill="{col}"/>'
    elif kind == 'circle':
        el = circ(x + s / 2, y + s / 2, s / 2, col)
    elif kind == 'q':
        el = pth(f'M{num(x)},{num(y + s)} L{num(x)},{num(y)} A{s},{s} 0 0 1 {num(x + s)},{num(y + s)}Z', col)
    elif kind == 'half':
        el = pth(f'M{num(x)},{num(y + s)} A{s / 2},{s / 2} 0 0 1 {num(x + s)},{num(y + s)}Z', col)
    elif kind == 'halfbig':
        el = pth(f'M{num(x)},{num(y)} L{num(x)},{num(y + s)} A{s},{s} 0 0 0 {num(x + s)},{num(y)}Z', col) if False else pth(f'M{num(x)},{num(y + s)} A{s / 2},{s / 2} 0 0 1 {num(x + s)},{num(y + s)}Z', col)
    elif kind == 'tri':
        el = pth(f'M{num(x)},{num(y)} L{num(x + s)},{num(y + s)} L{num(x)},{num(y + s)}Z', col)
    elif kind == 'pill':
        el = f'<rect x="{num(x + s * .18)}" y="{num(y)}" width="{num(s * .64)}" height="{s}" rx="{num(s * .32)}" fill="{col}"/>'
    elif kind == 'ring':
        el = circ(x + s / 2, y + s / 2, s / 2 - s * .13, 'none', f'stroke="{col}" stroke-width="{num(s * .26)}"')
    elif kind == 'dot':
        el = circ(x + s / 2, y + s / 2, s * .3, col)
    else:
        raise KeyError(kind)
    return rot(el, 90 * r, x + s / 2, y + s / 2) if r else el


POS = [(0, 0), (1, 0), (2, 0), (0, 1), (0, 2), (1, 2), (0, 3)]


def bauhaus_f(p, recipe, s=30, g=3):
    out = ''
    for (c, r), (kind, rt, ck) in zip(POS, recipe):
        out += cell(kind, rt, p[ck], c * (s + g), r * (s + g), s)
    return It(out, 0, 0, 3 * s + 2 * g, 4 * s + 3 * g)


F_RECIPES = [
    [('q', 3, 'fg'), ('sq', 0, 'ac'), ('q', 0, 'ac2'), ('sq', 0, 'fg'), ('circle', 0, 'ac'), ('half', 1, 'ac2'), ('q', 2, 'fg')],
    [('circle', 0, 'fg'), ('sq', 0, 'fg'), ('half', 1, 'ac'), ('tri', 0, 'ac2'), ('sq', 0, 'ac'), ('circle', 0, 'fg'), ('pill', 0, 'ac2')],
    [('q', 3, 'ac'), ('q', 3, 'fg'), ('q', 0, 'ac2'), ('sq', 0, 'ac2'), ('circle', 0, 'ac'), ('q', 0, 'fg'), ('half', 2, 'ac')],
    [('sq', 0, 'ac'), ('circle', 0, 'fg'), ('tri', 1, 'ac2'), ('pill', 0, 'fg'), ('sq', 0, 'ac2'), ('half', 1, 'fg'), ('circle', 0, 'ac')],
    [('ring', 0, 'ac'), ('ring', 0, 'fg'), ('ring', 0, 'ac2'), ('ring', 0, 'fg'), ('ring', 0, 'ac'), ('ring', 0, 'ac2'), ('ring', 0, 'fg')],
    [('tri', 3, 'fg'), ('tri', 0, 'ac'), ('q', 0, 'fg'), ('sq', 0, 'ac2'), ('tri', 3, 'ac'), ('half', 1, 'fg'), ('tri', 2, 'ac2')],
    [('circle', 0, 'ac'), ('circle', 0, 'ac2'), ('circle', 0, 'fg'), ('circle', 0, 'fg'), ('circle', 0, 'ac'), ('circle', 0, 'ac2'), ('circle', 0, 'fg')],
    [('q', 3, 'fg'), ('half', 0, 'ac'), ('half', 1, 'ac2'), ('sq', 0, 'fg'), ('q', 1, 'ac'), ('q', 3, 'ac2'), ('q', 2, 'fg')],
    [('sq', 0, 'fg'), ('sq', 0, 'fg'), ('sq', 0, 'fg'), ('sq', 0, 'fg'), ('sq', 0, 'fg'), ('half', 1, 'ac'), ('circle', 0, 'ac')],
    [('pill', 1, 'ac'), ('pill', 1, 'fg'), ('q', 0, 'ac2'), ('pill', 0, 'fg'), ('pill', 0, 'ac'), ('circle', 0, 'ac2'), ('dot', 0, 'ac')],
    [('q', 3, 'ac2'), ('tri', 0, 'fg'), ('circle', 0, 'ac'), ('tri', 3, 'fg'), ('half', 1, 'ac'), ('sq', 0, 'ac2'), ('tri', 1, 'fg')],
    [('half', 3, 'ac'), ('circle', 0, 'fg'), ('half', 1, 'ac2'), ('half', 2, 'fg'), ('circle', 0, 'ac'), ('half', 0, 'ac2'), ('half', 2, 'ac')],
]


def kh(cx, cy, sc, col):
    return f'<g transform="translate({num(cx)} {num(cy)}) scale({num(sc)}) translate(-50 -50)">' + circ(50, 41, 14, col) + pth('M43,50 L57,50 L65,78 L35,78Z', col) + '</g>'


def kh_mark(p, kind, treat):
    if treat == 'line':
        s = '<g>' + circ(50, 41, 14, 'none', f'stroke="{p["fg"]}" stroke-width="7"') + pth('M42,52 L36,82 L64,82 L58,52', 'none', p['fg'], 7) + '</g>'
        return It(circ(50, 50, 47, 'none', f'stroke="{p["ac"]}" stroke-width="5"') + s, 0, 0, 100, 100)
    bgcol, kc = {'a': (p['fg'], p['ac']), 'b': (p['ac'], ink(p['ac'])), 'c': (p['ac2'], p['fg'] if lum(p['ac2']) < .35 else '#0c0b10'), 'd': (p['fg'], p['ac2'])}[treat]
    return It(cont(kind, 100, 100, bgcol) + kh(50, 52 if kind != 'shield' else 48, 1.0, kc), 0, 0, 100, 100)


# ── ručně malé ────────────────────────────────────────────────────────────
def hand_ring(p, txt, fk, col_ring=None, col_text=None):
    t = text(face(fk), txt, 100, col_text or p['fg'])
    t = fit_in(t, 50, 52, 52, 46)
    ring = pth('M18,62 C8,30 46,8 80,22 C102,32 96,76 62,88 C30,98 4,76 20,44', 'none', col_ring or p['ac'], 6)
    return It(ring + t.svg, 0, 0, 104, 100)


def brush_f2(p):  # F dvěma silnými tahy a tečkou
    s = pth('M34,92 C30,62 36,34 32,10', 'none', p['fg'], 20) + pth('M28,16 C54,8 74,18 94,10', 'none', p['fg'], 18) + pth('M32,54 C48,48 64,56 80,50', 'none', p['ac'], 16) + circ(88, 88, 9, p['ac'])
    return mk(s)


def brush_f3(p):  # tah fixou, špičaté konce
    s = f'<path d="M30,92 L26,10 L34,10 L38,92Z" fill="{p["fg"]}"/><path d="M26,12 L92,6 L92,20 L30,26Z" fill="{p["fg"]}"/><path d="M33,48 L72,45 L72,57 L33,60Z" fill="{p["ac"]}"/>'
    return mk(s)


def brush_f4(p):  # F jedním tahem
    return mk(pth('M92,14 C64,6 40,10 30,14 C24,40 28,66 26,92 M30,52 C46,48 62,54 76,50', 'none', p['ac'], 15))


def splat(p):
    d = 'M50,8 C58,8 62,20 72,16 C82,12 92,24 86,34 C98,42 96,56 84,60 C90,72 80,88 66,84 C60,96 42,96 36,84 C22,90 8,76 16,62 C4,54 6,38 18,34 C12,22 24,10 36,16 C40,10 44,8 50,8Z'
    return mk(pth(d, p['ac']) + circ(50, 50, 16, p['fg']))


def swoosh(p, w=300):
    return It(f'<path d="M0,12 C{w * .25},0 {w * .6},22 {w},6" fill="none" stroke="{p["ac"]}" stroke-width="9" stroke-linecap="round"/>', 0, 0, w, 24)


# ── slovní podoby (nové) ──────────────────────────────────────────────────
def w_dotshape(fk, w, p, shape, size=100, studio=True, k=0.78, wd_up=0.4):
    fc = face(fk, w)
    t = text(fc, 'FaıN Studio' if studio else 'FaıN', size, p['fg'])
    gl, _ = fc.run('FaıN', size)
    g = gl[2]
    b = fc.bounds(g['name'])
    kk = size / fc.upem
    cx = g['x'] + (b[0] + b[2]) / 2 * kk
    sh = shape(p)
    d = size * k
    sc = sh.scaled(d / 100)
    cy = -(fc.xh + wd_up) * size
    sc = sc.at(cx - (sc.x0 + sc.x1) / 2, cy - (sc.y0 + sc.y1) / 2)
    return It(t.svg + sc.svg, t.x0, min(t.y0, sc.y0), t.x1, t.y1, t.cy)


def pill_it(fc, size, t, fill, stroke=None, padx=0.32, pady=0.22, grad=None, rotate=0):
    cap = fc.cap * size
    px, py = size * padx, size * pady
    w, h = t.w + 2 * px, cap + 2 * py
    x0, y0 = t.x0 - px, -cap - py
    f = grad or fill
    st = f' stroke="{stroke}" stroke-width="{num(size * 0.045)}"' if stroke else ''
    rect = f'<rect x="{num(x0)}" y="{num(y0)}" width="{num(w)}" height="{num(h)}" rx="{num(h / 2)}" fill="{f}"{st}/>'
    it = It(rect + t.svg, x0, y0, x0 + w, y0 + h, -cap / 2)
    return it


def w_pills(fk, w, p, mode, size=100):
    fc = face(fk, w)
    fg, ac, ac2 = p['fg'], p['ac'], p['ac2']
    if mode == 'two':
        a = pill_it(fc, size, text(fc, 'FaiN', size, ink(ac)), ac)
        b = pill_it(fc, size, text(face(fk, max(300, (w or 500) - 250)), 'Studio', size, fg), 'none', stroke=fg)
        return hstack([a, b], size * 0.14)
    if mode == 'stack':
        a = pill_it(fc, size, text(fc, 'FaiN', size, ink(ac)), ac)
        b = pill_it(fc, size, text(face(fk, max(300, (w or 500) - 250)), 'Studio', size, fg), 'none', stroke=fg)
        return vstack([a, b], size * 0.14, 'l')
    if mode == 'status':
        t = text(fc, 'FaiN Studio', size, fg)
        dot = It(circ(0, 0, size * 0.13, ac), -size * .13, -size * .13, size * .13, size * .13, 0)
        dot = dot.at(0, -fc.cap * size / 2)
        body = hstack([dot, t], size * 0.2)
        pw, ph = body.w + size * 0.8, fc.cap * size + size * 0.6
        rect = f'<rect x="{num(body.x0 - size * .4)}" y="{num(-ph / 2)}" width="{num(pw)}" height="{num(ph)}" rx="{num(ph / 2)}" fill="none" stroke="{fg}" stroke-width="{num(size * .045)}"/>'
        return It(rect + body.svg, body.x0 - size * .4, -ph / 2, body.x0 - size * .4 + pw, ph / 2, 0)
    if mode == 'aiin':
        t = text(fc, 'FaiN', size, ink(fg), colors=lambda i: ac if i in (1, 2) else None)
        pill = pill_it(fc, size, t, fg)
        return hstack([pill, text(face(fk, max(300, (w or 500) - 250)), 'Studio', size, fg)], size * 0.2)
    if mode == 'grad':
        g = uid('g')
        gd = f'<defs><linearGradient id="{g}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="{ac}"/><stop offset="1" stop-color="{ac2}"/></linearGradient></defs>'
        a = pill_it(fc, size, text(fc, 'FaiN', size, ink(ac)), ac, grad=f'url(#{g})')
        a.svg = gd + a.svg
        return hstack([a, text(face(fk, max(300, (w or 500) - 250)), 'Studio', size, fg)], size * 0.2)
    if mode == 'one':
        a = pill_it(fc, size, text(fc, 'FaiN Studio', size, ink(ac)), ac, padx=0.5)
        return a
    if mode == 'ai':
        a = pill_it(fc, size, text(fc, 'ai', size, ink(ac)), ac, padx=0.3)
        b = text(fc, 'FaiN Studio', size, fg)
        return hstack([a, b], size * 0.2)
    if mode == 'rot':
        a = pill_it(fc, size, text(fc, 'FaiN', size, ink(ac)), ac)
        b = text(face(fk, max(300, (w or 500) - 250)), 'Studio', size, fg)
        h = hstack([a, b], size * 0.2)
        return It(f'<g transform="rotate(-4)">{h.svg}</g>', h.x0, h.y0 - 10, h.x1, h.y1 + 10, 0)
    raise KeyError(mode)


def w_aipill_lower(fk, w, p, size=100, studio=False):
    fc = face(fk, w)
    f = text(fc, 'f', size, p['fg'])
    ai = text(fc, 'ai', size, ink(p['ac']))
    pill = pill_it(fc, size, ai, p['ac'], padx=0.16, pady=0.14)
    n = text(fc, 'n', size, p['fg'])
    parts = [f, pill, n]
    if studio:
        parts.append(text(face(fk, max(300, (w or 500) - 250)), 'studio', size * 0.5, p['ac']))
    return hstack(parts, size * 0.12)


def w_hand(style, fk, p, size=100):
    fc = face(fk)
    if style == 'duo':
        return text(fc, 'FaiN Studio', size, p['fg'], colors=lambda i: p['ac'] if i >= 5 else None)
    if style == 'ai':
        return text(fc, 'FaiN Studio', size, p['fg'], colors=lambda i: p['ac'] if i in (1, 2) else None)
    if style == 'plain':
        return text(fc, 'FaiN Studio', size, p['fg'])
    if style == 'swoosh':
        t = text(fc, 'FaiN Studio', size, p['fg'])
        sw = swoosh(p, t.w).scaled(1.0).at(t.x0, size * 0.1)
        return It(t.svg + sw.svg, t.x0, t.y0, t.x1, size * 0.34, t.cy)
    if style == 'stack':
        a = text(fc, 'FaiN', size, p['fg'])
        b = text(fc, 'Studio', size * 0.8, p['ac'])
        return vstack([a, b], size * 0.04, 'l')
    raise KeyError(style)


# ── seznam ────────────────────────────────────────────────────────────────
L = []


def add(title, note, mark, wordf, layout, pal, mr=None, font='', src=''):
    L.append(dict(title=title, note=note, mark=mark, word=wordf, layout=layout, pal=pal, mr=mr, font=font, src=src))


def S_(f):
    return lambda p: f(p)


# 0) Vaše výběry (beze změny z prvního kola)
FAV = [('027-jiskra', 'Jiskra', 'violet', 'Instrument Sans'), ('034-domalovane-f', 'Domalované F', 'orange', 'Finger Paint'), ('035-bauhaus', 'Bauhaus', 'mint', 'Syne'),
       ('048-klicova-dirka', 'Klíčová dírka', 'night', 'Geist'), ('073-fain-ai-zvyrazneno', 'fain, ai zvýrazněno', 'electric', 'Unbounded'),
       ('089-jiskra-nad-i', 'Jiskra nad i', 'forest', 'Bricolage Grotesque'), ('092-fain-v-pilulce', 'FaiN v pilulce', 'lav', 'Lexend'), ('100-dnesni-logo-vychozi-bod', 'Dnešní logo', 'violet', 'Finger Paint')]

# A) „fain“ + hvězda jinak (jako 027)
fonts_a = ['instrument', 'unbounded', 'geist', 'bricolage', 'sora', 'epilogue', 'space', 'outfit', 'lexend', 'familjen', 'syne', 'dela', 'archivo', 'fraunces', 'geist', 'bricolage', 'sora']
pals_a = ['violet', 'lime', 'electric', 'orange', 'cobalt', 'pink', 'mustard', 'night', 'forest', 'ocean', 'teal', 'red', 'bubble', 'mint', 'cyan', 'peach', 'inkneg']
names_a = ['Osmicípá hvězda', 'Šestcípá hvězdice', 'Pečeť s dvanácti cípy', 'Pěticípá, měkká', 'Šestnáct cípů', 'Tříbodá hvězda', 'Květ o šesti lupenech', 'Větrník', 'Triskelion', 'Spirála', 'Atom', 'Pět lupenů', 'Půlměsíc', 'Čtyřlístek', 'Dva čtverce jako osm cípů', 'Kruh teček', 'Paprsky']
for i, fn in enumerate(BURSTS):
    st = 'ai' if i % 2 == 0 else 'ai-studio'
    add(f'{names_a[i]} + fain', 'Místo jedné ostré jiskry jiný tvar, jméno malými s barevným ai.', fn, wd(st, fonts_a[i], 700 if fonts_a[i] not in ('dela', 'archivo') else None), 'h', pals_a[i], font=fonts_a[i], src='027')

# A2) tvar místo tečky nad i (jako 089)
dots = [(b_star8, 'Osmicípá nad i'), (b_flower6, 'Květ nad i'), (b_seal12, 'Pečeť nad i'), (b_pinwheel, 'Větrník nad i'), (b_triskele, 'Triskelion nad i'), (b_crescent, 'Měsíc nad i'), (b_star5, 'Pětka nad i'), (b_ring_dots, 'Kruh teček nad i')]
dfonts = ['bricolage', 'geist', 'sora', 'space', 'instrument', 'outfit', 'epilogue', 'familjen']
dpals = ['forest', 'peach', 'cyan', 'ink', 'violet', 'mustard', 'cobalt', 'sage']
for (fn, nm), f, pa in zip(dots, dfonts, dpals):
    add(nm, 'Tečka nad i se mění v jiný znak než hvězda.', None, (lambda fn=fn, f=f: (lambda p: w_dotshape(f, 800 if f in ('bricolage', 'geist') else 700, p, fn)))(), 'h', pa, font=f, src='089')

# B) F ze tvarů (jako 035)
bpals = ['mint', 'sand', 'lav', 'peach', 'ink', 'electric', 'cobalt', 'sage', 'bubble', 'night', 'orange', 'teal']
bfonts = ['syne', 'bricolage', 'unbounded', 'geist', 'archivo', 'sora', 'familjen', 'dmserif', 'outfit', 'epilogue', 'space', 'lexend']
bstyle = ['caps', 'plain', 'caps-line', 'plain', 'plain', 'caps', 'duo', 'plain', 'duo', 'caps', 'plain', 'caps']
bnames = ['F ze čtyř tvarů', 'F z kruhů a půlkruhů', 'F z čtvrtkruhů', 'F z pruhů a polokruhů', 'F z prstenců', 'F z trojúhelníků', 'F z teček', 'F z oblouků', 'F z kostek a půlkruhů', 'F z tablet', 'F z mozaiky', 'F ze zrcadlených půlkruhů']
for i, rcp in enumerate(F_RECIPES):
    layout = 'v' if (i % 3 == 0 or bstyle[i] in ('caps', 'caps-line')) else 'h'
    add(bnames[i], 'F složené z barevných geometrických tvarů, odvozeno z Bauhausu.', (lambda r=rcp, g=(3 if i % 4 else 0): (lambda p: bauhaus_f(p, r, 30, g)))(), wd(bstyle[i], bfonts[i], 700), layout, bpals[i], mr=2.7 if layout == 'h' else 3.6, font=bfonts[i], src='035')

# C) klíčová dírka (jako 048)
khs = [('squircle', 'a', 'night', 'caps', 'geist', 'v'), ('circle', 'b', 'cobalt', 'plain', 'sora', 'h'), ('shield', 'a', 'forest', 'caps', 'familjen', 'v'), ('arch', 'd', 'lav', 'plain', 'instrument', 'h'),
       ('squircle', 'line', 'inkneg', 'caps-line', 'space', 'v'), ('hex', 'b', 'orange', 'plain', 'bricolage', 'h'), ('blob', 'c', 'teal', 'duo', 'outfit', 'h')]
kn = ['Klíčová dírka, černá', 'Dírka v kruhu', 'Dírka ve štítu', 'Dírka v oblouku', 'Dírka linkou', 'Dírka v šestiúhelníku', 'Dírka v kapce']
for (kind, treat, pa, ws, f, lay), nm in zip(khs, kn):
    add(nm, 'Přístup jen pro koho určíte: klíčová dírka jako značka důvěry.', (lambda k=kind, t=treat: (lambda p: kh_mark(p, k, t)))(), wd(ws, f, 700), lay, pa, mr=2.0 if lay == 'h' else 3.4, font=f, src='048')

# D) ručně malé (jako 034 a 100)
add('Marker: F dvěma tahy', 'F dvěma silnými tahy štětce, hrdě ručně.', brush_f2, wd('duo', 'finger', 400), 'h', 'night', font='Finger Paint', src='034')
add('F z fixy', 'Rovné ostré tahy jako od fixy.', brush_f3, w_hand and (lambda p: w_hand('duo', 'marker', p)), 'h', 'peach', font='Permanent Marker', src='034')
add('F jedním tahem', 'F jedním plynulým tahem, růžový.', brush_f4, lambda p: w_hand('plain', 'knewave', p), 'h', 'ink', font='Knewave', src='034')
add('Kaňka', 'Barevná kaňka s tečkou, jako otisk štětce.', splat, lambda p: w_hand('ai', 'chewy', p), 'h', 'lime', font='Chewy', src='034')
add('ai v ručním kroužku', 'ai zakroužkované fixou.', lambda p: hand_ring(p, 'ai', 'marker'), lambda p: w_hand('plain', 'marker', p), 'h', 'sand', font='Permanent Marker', src='034')
add('Podtržené štětcem', 'Dnešní písmo s barevným tahem pod jménem.', None, lambda p: w_hand('swoosh', 'finger', p), 'h', 'orange', font='Finger Paint', src='100')
add('Caveat Brush', 'Tenčí ruční štětec, klidnější.', brush_f4, lambda p: w_hand('duo', 'caveatb', p), 'h', 'forest', font='Caveat Brush', src='034')
add('Gochi, poznámky', 'Psané rukou jako poznámka na okraji.', lambda p: hand_ring(p, 'F', 'gochi'), lambda p: w_hand('stack', 'gochi', p), 'h', 'lav', font='Gochi Hand', src='034')
add('Dnešní logo, světlé', 'Finger Paint na krémové s barevným ai.', None, lambda p: w_hand('ai', 'finger', p), 'h', 'sand', font='Finger Paint', src='100')
add('Dnešní logo, limetka', 'To samé na černé, limetková.', None, lambda p: w_hand('duo', 'finger', p), 'h', 'lime', font='Finger Paint', src='100')
add('Dnešní logo, kobalt', 'Bílé písmo na sytě modré.', None, lambda p: w_hand('plain', 'finger', p), 'h', 'electric', font='Finger Paint', src='100')
add('Dnešní logo, razítko', 'Finger Paint ve dvou řádcích.', splat, lambda p: w_hand('stack', 'finger', p), 'h', 'pink', font='Finger Paint', src='100')

# E) pilulky (jako 092)
add('Dvě pilulky', 'FaiN plná, Studio jen obrysem.', None, lambda p: w_pills('lexend', 600, p, 'two'), 'h', 'ink', font='Lexend', src='092')
add('Pilulky pod sebou', 'FaiN nad Studio, zarovnané vlevo.', None, lambda p: w_pills('geist', 700, p, 'stack'), 'h', 'violetL', font='Geist', src='092')
add('Stav online', 'Tečka jako „online“ v obrysové pilulce.', None, lambda p: w_pills('instrument', 600, p, 'status'), 'h', 'night', font='Instrument Sans', src='092')
add('ai uvnitř pilulky', 'FaiN v tmavé pilulce, ai barevně.', None, lambda p: w_pills('sora', 700, p, 'aiin'), 'h', 'peach', font='Sora', src='092')
add('Pilulka s přechodem', 'Pilulka z barvy do barvy.', None, lambda p: w_pills('bricolage', 800, p, 'grad'), 'h', 'violetL', font='Bricolage Grotesque', src='092')
add('Celé jméno v pilulce', 'Jedna pilulka, jedno jméno.', None, lambda p: w_pills('unbounded', 600, p, 'one'), 'h', 'lime', font='Unbounded', src='092')
add('ai pilulka + jméno', 'Samotné ai v pilulce před jménem.', None, lambda p: w_pills('outfit', 600, p, 'ai'), 'h', 'cobalt', font='Outfit', src='092')
add('Pilulka nakřivo', 'Pilulka mírně nakloněná, hravě.', None, lambda p: w_pills('epilogue', 700, p, 'rot'), 'h', 'mustard', font='Epilogue', src='092')

# G) fain s barevným ai (jako 073)
gf = [('dela', None, 'tomato', 'Dela Gothic'), ('archivo', None, 'lime', 'Archivo Black'), ('bricolage', 800, 'violet', 'Bricolage'), ('syne', 800, 'cobalt', 'Syne'), ('sora', 800, 'orange', 'Sora'), ('space', 700, 'forest', 'Space Grotesk'), ('geist', 800, 'bubble', 'Geist'), ('unbounded', 800, 'inkneg', 'Unbounded')]
for i, (f, wg, pa, nm) in enumerate(gf):
    if i % 2 == 0:
        add(f'fain, {nm}', 'Jen jméno malými, ai tvoří srdce.', None, (lambda f=f, wg=wg: (lambda p: word('ai', f, wg, p)))(), 'h', pa, font=nm, src='073')
    else:
        add(f'fain, ai v pilulce, {nm}', 'ai uvnitř jména zabalené do pilulky.', None, (lambda f=f, wg=wg: (lambda p: w_aipill_lower(f, wg, p)))(), 'h', pa, font=nm, src='073')

assert len(L) + len(FAV) == 80 or True


def slug(s):
    s = unicodedata.normalize('NFKD', s).encode('ascii', 'ignore').decode().lower()
    return re.sub(r'[^a-z0-9]+', '-', s).strip('-')


svgs, meta = [], []
n = 0
for fid, title, pa, font in FAV:
    n += 1
    name = f'{n:03d}-{slug("vas vyber " + title)}.svg'
    shutil.copy(os.path.join(PREV, fid + '.svg'), os.path.join(OUT, name))
    svgs.append((open(os.path.join(OUT, name)).read(), f'{n:03d} · TVŮJ VÝBĚR · {title}'))
    meta.append(dict(title=f'Váš výběr: {title}', note=f'Beze změny z prvního kola (původně č. {fid[:3]}).', pal=pa, font=font, file=name))
for d in L:
    n += 1
    p = P[d['pal']]
    it = compose(d['mark'], d['word'], d['layout'], p, d['mr'])
    only_mark = d['mark'] and not d['word']
    maxh = 240 if (d['layout'] == 'v' or only_mark) else 215
    s = logo_svg(it, p, maxw=250 if only_mark else 470, maxh=maxh)
    name = f'{n:03d}-{slug(d["title"])}.svg'
    open(os.path.join(OUT, name), 'w').write(s)
    svgs.append((s, f'{n:03d} · {d["title"]} · {d["pal"]}'))
    meta.append(dict(title=d['title'], note=d['note'] + (f' (podle č. {d["src"]})' if d['src'] else ''), pal=d['pal'], font=d['font'], file=name))

per = 20
for k in range(0, len(svgs), per):
    open(os.path.join(OUT, f'prehled-{k // per + 1}.svg'), 'w').write(sheet(svgs[k:k + per], 4, cell=(400, 262)))
json.dump(meta, open(os.path.join(OUT, 'index.json'), 'w'), ensure_ascii=False, indent=1)
print('hotovo', len(svgs))
