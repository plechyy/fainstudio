"""Značky (symboly, monogramy v tvarech) a slovní podoby. Všechno se kreslí v mřížce zhruba 100 x 100."""
import math, itertools
from lib import *

_id = itertools.count(1)


def uid(p='k'):
    return f'{p}{next(_id)}'


def lum(c):
    c = c.lstrip('#')
    r, g, b = [int(c[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    f = lambda v: v / 12.92 if v <= 0.03928 else ((v + 0.055) / 1.055) ** 2.4
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)


def ink(c, dark='#0c0b10', light='#ffffff'):
    return dark if lum(c) > 0.35 else light


def box(svg, w=100, h=100):
    return It(svg, 0, 0, w, h)


# ── kontejnery ────────────────────────────────────────────────────────────
def cont(kind, w, h, fill, stroke=None, sw=0, defs=''):
    i = sw / 2 if stroke else 0
    W, H = w - 2 * i, h - 2 * i
    cx, cy = w / 2, h / 2
    a = f'fill="{fill}"' + (f' stroke="{stroke}" stroke-width="{num(sw)}" stroke-linejoin="round"' if stroke else '')
    if kind == 'circle':
        return f'<ellipse cx="{num(cx)}" cy="{num(cy)}" rx="{num(W / 2)}" ry="{num(H / 2)}" {a}/>'
    if kind == 'squircle':
        return f'<rect x="{num(i)}" y="{num(i)}" width="{num(W)}" height="{num(H)}" rx="{num(min(W, H) * 0.3)}" {a}/>'
    if kind == 'square':
        return f'<rect x="{num(i)}" y="{num(i)}" width="{num(W)}" height="{num(H)}" rx="{num(min(W, H) * 0.04)}" {a}/>'
    if kind == 'pill':
        return f'<rect x="{num(i)}" y="{num(i)}" width="{num(W)}" height="{num(H)}" rx="{num(H / 2)}" {a}/>'
    if kind == 'hex':
        R = min(H / 2, W / math.sqrt(3))
        pts = [(cx + R * math.sqrt(3) / 2 * math.cos(math.radians(60 * k + 30 - 30)) * 1.0, cy + R * math.sin(math.radians(60 * k - 90 + 60))) for k in range(6)]
        pts = [(cx + R * math.cos(math.radians(60 * k - 90)), cy + R * math.sin(math.radians(60 * k - 90))) for k in range(6)]
        return f'<polygon points="{" ".join(num(x) + "," + num(y) for x, y in pts)}" {a}/>'
    if kind == 'octagon':
        R = min(W, H) / 2
        pts = [(cx + R * math.cos(math.radians(45 * k + 22.5)) / math.cos(math.radians(22.5)) * 0.98, cy + R * math.sin(math.radians(45 * k + 22.5)) / math.cos(math.radians(22.5)) * 0.98) for k in range(8)]
        return f'<polygon points="{" ".join(num(x) + "," + num(y) for x, y in pts)}" {a}/>'
    if kind == 'diamond':
        return f'<polygon points="{num(cx)},{num(i)} {num(w - i)},{num(cy)} {num(cx)},{num(h - i)} {num(i)},{num(cy)}" {a}/>'
    if kind == 'shield':
        d = f'M{num(i)},{num(i + .1 * H)} L{num(cx)},{num(i)} L{num(w - i)},{num(i + .1 * H)} L{num(w - i)},{num(i + .55 * H)} Q{num(w - i)},{num(i + .86 * H)} {num(cx)},{num(h - i)} Q{num(i)},{num(i + .86 * H)} {num(i)},{num(i + .55 * H)} Z'
        return f'<path d="{d}" {a}/>'
    if kind == 'arch':
        r = W / 2
        d = f'M{num(i)},{num(h - i)} L{num(i)},{num(i + r)} A{num(r)},{num(r)} 0 0 1 {num(w - i)},{num(i + r)} L{num(w - i)},{num(h - i)} Z'
        return f'<path d="{d}" {a}/>'
    if kind == 'leaf':
        r = min(W, H) * 0.5
        d = f'M{num(i + r)},{num(i)} H{num(w - i)} V{num(h - i - r)} A{num(r)},{num(r)} 0 0 1 {num(w - i - r)},{num(h - i)} H{num(i)} V{num(i + r)} A{num(r)},{num(r)} 0 0 1 {num(i + r)},{num(i)} Z'
        return f'<path d="{d}" {a}/>'
    if kind == 'ticket':
        nr = min(W, H) * 0.12
        d = f'M{num(i)},{num(i)} H{num(w - i)} V{num(cy - nr)} A{num(nr)},{num(nr)} 0 0 0 {num(w - i)},{num(cy + nr)} V{num(h - i)} H{num(i)} V{num(cy + nr)} A{num(nr)},{num(nr)} 0 0 0 {num(i)},{num(cy - nr)} Z'
        return f'<path d="{d}" {a}/>'
    if kind == 'blob':
        sx, sy = w / 100, h / 100
        d = 'M50,5 C74,3 95,20 96,46 C97,73 77,97 50,95 C24,94 3,77 5,50 C7,25 26,7 50,5Z'
        return f'<path transform="scale({num(sx)} {num(sy)})" d="{d}" {a.replace("stroke-width=" + chr(34) + num(sw) + chr(34), "stroke-width=" + chr(34) + num(sw / sx) + chr(34))}/>'
    if kind == 'slab':
        return f'<rect x="{num(i)}" y="{num(i)}" width="{num(W)}" height="{num(H)}" {a}/>'
    raise KeyError(kind)


def monogram(txt, fk, wght, kind, treat, p, w=100, h=100, fill_ratio=0.56, tracking=0.0, skew=0):
    fc = face(fk, wght)
    g = uid('g')
    defs = ''
    if treat == 'fill':
        cf, tf, st = p['fg'], p['bg'], None
    elif treat == 'accent':
        cf, tf, st = p['ac'], ink(p['ac']), None
    elif treat == 'duo':
        cf, tf, st = p['fg'], p['ac'], None
    elif treat == 'outline':
        cf, tf, st = 'none', p['fg'], p['fg']
    elif treat == 'outline-ac':
        cf, tf, st = 'none', p['ac'], p['ac']
    elif treat == 'soft':
        cf, tf, st = p['ac2'], p['fg'] if lum(p['ac2']) < 0.4 else '#0c0b10', None
    elif treat == 'grad':
        defs = f'<defs><linearGradient id="{g}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="{p["ac"]}"/><stop offset="1" stop-color="{p["ac2"]}"/></linearGradient></defs>'
        cf, tf, st = f'url(#{g})', ink(p['ac']), None
    else:
        raise KeyError(treat)
    c = cont(kind, w, h, cf, st, 6 if st else 0)
    fill_ratio = {'diamond': 0.38, 'ticket': 0.5, 'hex': 0.5, 'octagon': 0.52}.get(kind, fill_ratio) if fill_ratio == 0.56 else fill_ratio
    t = text(fc, txt, 100, tf, tracking=tracking, skew=skew)
    t = fit_in(t, w / 2, h / 2 + (2 if kind in ('arch',) else 0) + (-4 if kind == 'shield' else 0), w * fill_ratio, h * fill_ratio * 0.9)
    return It(defs + c + t.svg, 0, 0, w, h)


def bigtext(txt, fk, wght, p, style='solid', size=100, tracking=0, skew=0):
    fc = face(fk, wght)
    if style == 'solid':
        return text(fc, txt, size, p['fg'], tracking=tracking, skew=skew)
    if style == 'accent':
        return text(fc, txt, size, p['ac'], tracking=tracking, skew=skew)
    if style == 'outline':
        t = text(fc, txt, size, 'none', stroke=p['fg'], sw=size * 0.035, tracking=tracking)
        return It(t.svg, t.x0, t.y0, t.x1, t.y1, t.cy)
    if style == 'split':
        t1 = text(fc, txt, size, p['fg'], tracking=tracking)
        t2 = text(fc, txt, size, p['ac'], tracking=tracking)
        cid = uid('c')
        mid = (t1.y0 + t1.y1) / 2
        clip = f'<clipPath id="{cid}"><rect x="{num(t1.x0 - 5)}" y="{num(mid)}" width="{num(t1.w + 10)}" height="{num(t1.h)}"/></clipPath>'
        return It(f'<defs>{clip}</defs>{t1.svg}<g clip-path="url(#{cid})">{t2.svg}</g>', t1.x0, t1.y0, t1.x1, t1.y1, t1.cy)
    if style == 'shadow':
        t1 = text(fc, txt, size, p['ac'], tracking=tracking).at(size * 0.05, size * 0.05)
        t2 = text(fc, txt, size, p['fg'], tracking=tracking)
        return It(t1.svg + t2.svg, t2.x0, t2.y0, t1.x1, t1.y1, t2.cy)
    if style == 'duo':
        n = len(txt)
        t = text(fc, txt, size, p['fg'], tracking=tracking, colors=lambda i: p['ac'] if i >= n / 2 else None)
        return t
    raise KeyError(style)


# ── symboly ───────────────────────────────────────────────────────────────
def S(**kw):
    return ''.join(f'{k.replace("_", "-")}="{v}" ' for k, v in kw.items())


def line(x1, y1, x2, y2, col, w, extra=''):
    return f'<line x1="{num(x1)}" y1="{num(y1)}" x2="{num(x2)}" y2="{num(y2)}" stroke="{col}" stroke-width="{num(w)}" stroke-linecap="round" {extra}/>'


def circ(x, y, r, fill, extra=''):
    return f'<circle cx="{num(x)}" cy="{num(y)}" r="{num(r)}" fill="{fill}" {extra}/>'


def pth(d, fill='none', stroke=None, sw=0, extra=''):
    st = f' stroke="{stroke}" stroke-width="{num(sw)}" stroke-linecap="round" stroke-linejoin="round"' if stroke else ''
    return f'<path d="{d}" fill="{fill}"{st} {extra}/>'


def star4(cx, cy, r, fill, pinch=0.12):
    q = r * pinch
    d = f'M{num(cx)},{num(cy - r)} C{num(cx + q)},{num(cy - q * 1.2)} {num(cx + q * 1.2)},{num(cy - q)} {num(cx + r)},{num(cy)} C{num(cx + q * 1.2)},{num(cy + q)} {num(cx + q)},{num(cy + q * 1.2)} {num(cx)},{num(cy + r)} C{num(cx - q)},{num(cy + q * 1.2)} {num(cx - q * 1.2)},{num(cy + q)} {num(cx - r)},{num(cy)} C{num(cx - q * 1.2)},{num(cy - q)} {num(cx - q)},{num(cy - q * 1.2)} {num(cx)},{num(cy - r)}Z'
    return pth(d, fill)


def arc_d(cx, cy, r, a0, a1):
    x0, y0 = cx + r * math.cos(math.radians(a0)), cy + r * math.sin(math.radians(a0))
    x1, y1 = cx + r * math.cos(math.radians(a1)), cy + r * math.sin(math.radians(a1))
    large = 1 if (a1 - a0) % 360 > 180 else 0
    return f'M{num(x0)},{num(y0)} A{num(r)},{num(r)} 0 {large} 1 {num(x1)},{num(y1)}'


def tick(p, col, sw, cx=50, cy=50, s=1.0):
    pts = [(cx - 24 * s, cy + 2 * s), (cx - 8 * s, cy + 18 * s), (cx + 25 * s, cy - 18 * s)]
    return pth('M' + ' L'.join(f'{num(x)},{num(y)}' for x, y in pts), 'none', col, sw)


def m_check_ring(p):
    return box(circ(50, 50, 44, 'none', S(stroke=p['fg'], stroke_width=8)) + tick(p, p['ac'], 11))


def m_check_disc(p):
    return box(circ(50, 50, 48, p['ac']) + tick(p, ink(p['ac']), 11))


def m_check_flow(p):
    pts = [(12, 58), (38, 84), (88, 20)]
    s = pth('M' + ' L'.join(f'{x},{y}' for x, y in pts), 'none', p['fg'], 8)
    return box(s + ''.join(circ(x, y, 10, c) for (x, y), c in zip(pts, [p['ac'], p['fg'], p['ac']])))


def m_nodes_f(p):
    s = line(30, 16, 30, 86, p['fg'], 8) + line(30, 16, 80, 16, p['fg'], 8) + line(30, 50, 66, 50, p['fg'], 8)
    s += circ(30, 86, 10, p['fg']) + circ(80, 16, 10, p['ac']) + circ(66, 50, 10, p['ac2']) + circ(30, 16, 10, p['fg'])
    return box(s)


def m_pulse(p):
    d = 'M4,56 L28,56 L40,26 L54,84 L66,40 L74,56 L88,56'
    return box(pth(d, 'none', p['fg'], 8) + circ(94, 56, 7, p['ac']))


def m_spark(p):
    return box(star4(46, 56, 42, p['ac']) + star4(84, 16, 15, p['fg']))


def m_spark_one(p):
    return box(star4(50, 50, 48, p['ac'], 0.08))


def m_spark_trio(p):
    return box(star4(36, 62, 34, p['ac']) + star4(78, 28, 20, p['fg']) + star4(80, 78, 12, p['ac2']))


def m_bubble(p):
    on = ink(p['fg'])
    bub = pth('M30,6 H70 Q94,6 94,30 V48 Q94,72 70,72 H46 L22,94 L26,72 H30 Q6,72 6,48 V30 Q6,6 30,6Z', p['fg'])
    face_ = circ(36, 34, 6, on) + circ(64, 34, 6, on) + pth('M34,50 Q50,62 66,50', 'none', on, 6)
    return box(bub + face_)


def m_smile(p):
    on = ink(p['ac'])
    return box(circ(50, 50, 48, p['ac']) + circ(36, 40, 6, on) + circ(64, 40, 6, on) + pth('M30,60 Q50,80 70,60', 'none', on, 7))


def m_smile_arc(p):
    return box(pth('M8,34 Q50,96 92,34', 'none', p['fg'], 11) + circ(50, 14, 10, p['ac']))


def ring_text(fc, txt, r, size, cx, cy, fill, fill_ratio=0.985):
    gl, w = fc.run(txt, size, 0)
    circ_len = 2 * math.pi * r
    tr = (circ_len * fill_ratio - w) / len(gl)
    out = []
    pos = 0
    for g in gl:
        a = g['adv']
        mid = pos + a / 2
        ang = mid / r  # rad
        d = fc.path(g['name'], size, cx - a / 2, cy - r)
        if d:
            out.append(f'<path transform="rotate({num(math.degrees(ang))} {num(cx)} {num(cy)})" d="{d}" fill="{fill}"/>')
        pos += a + tr
    return ''.join(out)


def m_stamp(p, fk='bricolage', mono_txt='F'):
    fc = face(fk, 700)
    s = circ(50, 50, 49, 'none', S(stroke=p['fg'], stroke_width=2.5)) + circ(50, 50, 33, 'none', S(stroke=p['fg'], stroke_width=1.5))
    s += ring_text(fc, 'FAIN STUDIO · AI · FAJN · ', 37.5, 11, 50, 50, p['fg'])
    t = fit_in(text(face(fk, 800), mono_txt, 100, p['ac']), 50, 50, 34, 34)
    return box(s + t.svg)


def m_pixel_f(p):
    rows = ['#####', '#....', '####.', '#....', '#....', '#....', '#....']
    cell, gap = 12.5, 2
    s = ''
    for r, row in enumerate(rows):
        for c, ch in enumerate(row):
            if ch == '#':
                col = p['ac'] if (r, c) == (0, 4) else p['fg']
                s += f'<rect x="{num(c * (cell + gap) + 12)}" y="{num(r * (cell + gap) - 2)}" width="{cell}" height="{cell}" rx="3" fill="{col}"/>'
    s += f'<rect x="{num(3 * (cell + gap) + 12)}" y="{num(2 * (cell + gap) - 2)}" width="{cell}" height="{cell}" rx="3" fill="{p["ac2"]}"/>'
    return It(s, 12, -2, 12 + 5 * (cell + gap) - gap, -2 + 7 * (cell + gap) - gap)


def m_brush_f(p):
    s = pth('M36,90 C32,62 38,38 34,12', 'none', p['fg'], 17)
    s += pth('M30,18 C52,10 72,16 90,12', 'none', p['fg'], 15)
    s += pth('M32,54 C46,48 62,54 76,50', 'none', p['ac'], 14)
    s += circ(82, 88, 8, p['ac2'])
    return box(s)


def m_bauhaus(p):
    s = circ(25, 25, 23, p['fg'])
    s += pth('M52,48 A46,46 0 0 1 98,2 L98,48 Z', p['ac'])  # čtvrtkruh
    s += pth('M2,98 L48,98 L48,52 Z', p['ac2'])
    s += pth('M52,98 A23,23 0 0 1 98,98 Z', p['fg']) + pth('M52,52 H98 V74 H52 Z', 'none')
    return box(s)


def m_cube(p):
    s = pth('M50,6 L90,28 L50,50 L10,28Z', p['ac2']) + pth('M10,28 L50,50 L50,94 L10,72Z', p['fg']) + pth('M50,50 L90,28 L90,72 L50,94Z', p['ac'])
    return box(s)


def m_loop(p):
    return box(pth('M50,50 C50,20 8,20 8,50 C8,80 50,80 50,50', 'none', p['fg'], 10) + pth('M50,50 C50,20 92,20 92,50 C92,80 50,80 50,50', 'none', p['ac'], 10))


def m_cycle(p):
    cx = cy = 50
    r = 36
    s = pth(arc_d(cx, cy, r, -165, -25), 'none', p['fg'], 10) + pth(arc_d(cx, cy, r, 15, 155), 'none', p['ac'], 10)
    for ang, col in ((-25, p['fg']), (155, p['ac'])):
        t = math.radians(ang)
        P = (cx + r * math.cos(t), cy + r * math.sin(t))
        tg = (-math.sin(t), math.cos(t))
        n = (math.cos(t), math.sin(t))
        tip = (P[0] + tg[0] * 15, P[1] + tg[1] * 15)
        b1 = (P[0] + n[0] * 15 - tg[0] * 3, P[1] + n[1] * 15 - tg[1] * 3)
        b2 = (P[0] - n[0] * 15 - tg[0] * 3, P[1] - n[1] * 15 - tg[1] * 3)
        s += pth(f'M{num(tip[0])},{num(tip[1])} L{num(b1[0])},{num(b1[1])} L{num(b2[0])},{num(b2[1])}Z', col, col, 3)
    return box(s)


def m_dots_ai(p):
    a = ['.###.', '....#', '.####', '#...#', '.####']
    pitch, r = 15, 6
    s = ''
    for ri, row in enumerate(a):
        for ci, ch in enumerate(row):
            if ch == '#':
                s += circ(ci * pitch + r, (ri + 2) * pitch + r, r, p['fg'])
    ix = 6 * pitch + r
    s += circ(ix, r, r, p['ac'])
    for ri in range(5):
        s += circ(ix, (ri + 2) * pitch + r, r, p['fg'])
    return It(s, 0, 0, 7 * pitch - (pitch - 2 * r), 7 * pitch - (pitch - 2 * r))


def m_ripple(p):
    s = circ(16, 84, 10, p['ac'])
    for k, r in enumerate((28, 48, 68, 88)):
        s += pth(arc_d(16, 84, r, -90, 0), 'none', p['fg'], 8, f'opacity="{1 - k * 0.2}"')
    return It(s, 6, -4, 104, 94)


def m_prompt(p):
    return box(pth('M12,24 L46,50 L12,76', 'none', p['ac'], 13) + line(56, 80, 92, 80, p['fg'], 13))


def m_stitch(p, dots=True):
    da = 'stroke-dasharray="0.1 19"' if dots else 'stroke-dasharray="16 11"'
    return box(pth('M30,90 V14 H88 M30,52 H72', 'none', p['fg'], 11, da) + circ(88, 14, 0.1, p['ac']))


def m_brackets(p):
    s = pth('M34,10 H12 V90 H34', 'none', p['fg'], 9) + pth('M66,10 H88 V90 H66', 'none', p['fg'], 9) + circ(50, 50, 13, p['ac'])
    return box(s)


def m_layers(p):
    def rh(cy, col, op=1):
        return pth(f'M50,{cy - 20} L96,{cy} L50,{cy + 20} L4,{cy}Z', col, extra=f'opacity="{op}"')
    return box(rh(74, p['fg'], 0.55) + rh(52, p['fg'], 0.8) + rh(30, p['ac']))


def m_wave(p):
    hs = [26, 52, 80, 100, 70, 44, 22]
    s = ''
    for k, h in enumerate(hs):
        x = k * 14.5 + 1
        col = p['ac'] if k == 3 else p['fg']
        s += f'<rect x="{num(x)}" y="{num(50 - h / 2)}" width="10" height="{h}" rx="5" fill="{col}"/>'
    return box(s)


def m_shield_check(p):
    return box(cont('shield', 100, 100, p['fg']) + tick(p, p['ac'], 11, 50, 50))


def m_keyhole(p):
    on = p['bg']
    return box(cont('squircle', 100, 100, p['fg']) + circ(50, 41, 14, p['ac']) + pth('M43,50 L57,50 L65,78 L35,78Z', p['ac']))


def m_sun(p):
    s = circ(50, 50, 22, p['ac'])
    for k in range(12):
        t = math.radians(k * 30)
        s += line(50 + 33 * math.cos(t), 50 + 33 * math.sin(t), 50 + 47 * math.cos(t), 50 + 47 * math.sin(t), p['fg'], 7)
    return box(s)


def m_ring_gap(p):
    return box(pth(arc_d(50, 50, 38, 40, 320), 'none', p['fg'], 13) + circ(88, 50, 11, p['ac']))


def m_circuit_f(p):
    s = pth('M30,90 V30 Q30,16 44,16 H84 M30,54 H64', 'none', p['fg'], 8)
    s += circ(86, 16, 9, p['ac']) + circ(66, 54, 9, p['ac']) + circ(30, 90, 9, p['fg'])
    return box(s)


def m_venn(p):
    cid = uid('c')
    s = f'<defs><clipPath id="{cid}"><circle cx="36" cy="50" r="34"/></clipPath></defs>'
    s += circ(36, 50, 34, p['fg']) + circ(64, 50, 34, p['ac']) + f'<circle cx="64" cy="50" r="34" fill="{p["ac2"]}" clip-path="url(#{cid})"/>'
    return It(s, 2, 16, 98, 84)


def m_stripes(p):
    cid = uid('c')
    s = f'<defs><clipPath id="{cid}"><circle cx="50" cy="50" r="48"/></clipPath></defs><g clip-path="url(#{cid})">'
    cols = [p['fg'], p['ac'], p['ac2'], p['fg'], p['ac']]
    for k in range(5):
        s += f'<polygon points="{-30 + k * 30},100 {k * 30 + 12},100 {k * 30 + 72},0 {k * 30 + 30},0" fill="{cols[k]}"/>'
    return box(s + '</g>')


def m_arrow_ring(p):
    s = circ(50, 50, 46, 'none', S(stroke=p['fg'], stroke_width=7))
    s += pth('M34,66 L66,34 M42,34 H66 V58', 'none', p['ac'], 10)
    return box(s)


def m_asterisk(p):
    s = ''
    for k in range(3):
        s += f'<rect x="43" y="2" width="14" height="96" rx="7" fill="{p["ac"] if k != 1 else p["fg"]}" transform="rotate({k * 60} 50 50)"/>'
    return box(s)


def m_plane(p):
    s = pth('M4,46 L96,6 L46,60Z', p['ac']) + pth('M96,6 L60,94 L46,60Z', p['fg']) + pth('M46,60 L60,94 L38,72Z', p['ac2'])
    return box(s)


def m_halftone(p):
    s = ''
    n = 9
    for i in range(n):
        for j in range(n):
            x, y = 6 + i * 11, 6 + j * 11
            d = math.hypot(x - 50, y - 50)
            if d < 46:
                s += circ(x, y, max(1.2, 5.2 - d * 0.1), p['ac'] if d < 24 else p['fg'])
    return box(s)


def m_bars(p):
    s = ''
    for k, (h, col) in enumerate(((34, p['fg']), (62, p['fg']), (92, p['ac']))):
        s += f'<rect x="{num(6 + k * 32)}" y="{num(96 - h)}" width="24" height="{h}" rx="12" fill="{col}"/>'
    return box(s)


def m_half_f(p):
    """F složené z půlkruhu a čtverce: dvě jednoduché plochy."""
    return box(f'<rect x="10" y="6" width="26" height="88" fill="{p["fg"]}"/><path d="M36,6 H90 A0,0 0 0 1 90,6 V34 H36Z" fill="{p["ac"]}"/><path d="M36,46 H70 A14,14 0 0 1 70,74 H36Z" fill="{p["ac2"]}"/>')


def m_orbit(p):
    s = f'<ellipse cx="50" cy="50" rx="46" ry="19" fill="none" stroke="{p["fg"]}" stroke-width="6" transform="rotate(-28 50 50)"/>'
    s += circ(50, 50, 17, p['ac']) + circ(84, 33, 7, p['fg'])
    return box(s)


def m_cursor(p):
    return box(f'<rect x="30" y="8" width="40" height="84" rx="6" fill="{p["ac"]}"/>' + line(8, 96, 92, 96, p['fg'], 6))


def m_ai_dots_i(p):
    """Dotless i s velkou tečkou jako slunce."""
    return box(f'<rect x="38" y="40" width="24" height="58" rx="12" fill="{p["fg"]}"/>' + circ(50, 16, 14, p['ac']))


def m_corner(p):
    """Dvě L-roviny: rohy rámečku jako hledáček (zaostření)."""
    s = ''
    for (x, y, dx, dy) in ((8, 8, 1, 1), (92, 8, -1, 1), (8, 92, 1, -1), (92, 92, -1, -1)):
        s += pth(f'M{x},{y + dy * 26} V{y} H{x + dx * 26}', 'none', p['fg'], 9)
    return box(s + circ(50, 50, 12, p['ac']))


def m_blocks(p):
    s = f'<rect x="4" y="52" width="42" height="42" rx="10" fill="{p["fg"]}"/><rect x="54" y="52" width="42" height="42" rx="10" fill="{p["ac"]}"/><rect x="29" y="6" width="42" height="42" rx="10" fill="{p["ac2"]}"/>'
    return box(s)


def m_chat_lines(p):
    s = f'<rect x="6" y="14" width="64" height="22" rx="11" fill="{p["fg"]}"/><rect x="30" y="44" width="64" height="22" rx="11" fill="{p["ac"]}"/><rect x="6" y="74" width="40" height="22" rx="11" fill="{p["fg"]}"/>'
    return box(s)


def m_eye(p):
    s = pth('M4,50 Q50,2 96,50 Q50,98 4,50Z', 'none', p['fg'], 8) + circ(50, 50, 19, p['ac']) + circ(50, 50, 7, p['bg'])
    return box(s)


def m_leaf_f(p):
    """Dva listy z jedné stopky (vyrůstá, roste)."""
    s = f'<path d="M50,96 V48" stroke="{p["fg"]}" stroke-width="8" stroke-linecap="round"/>'
    s += pth('M50,52 C22,52 10,32 12,8 C38,8 52,24 50,52Z', p['ac']) + pth('M50,64 C74,64 90,48 90,24 C66,24 50,40 50,64Z', p['fg'])
    return box(s)


SYMBOLS = {k[2:]: v for k, v in globals().items() if k.startswith('m_')}


# ── slovní podoby ─────────────────────────────────────────────────────────
def word(style, fk, wght, p, size=100, sfk=None, swght=None):
    fc = face(fk, wght)
    fg, ac, ac2 = p['fg'], p['ac'], p['ac2']
    if style == 'plain':
        return text(fc, 'FaiN Studio', size, fg)
    if style == 'duo':
        return text(fc, 'FaiN Studio', size, fg, colors=lambda i: ac if i >= 5 else None)
    if style == 'duo-n':
        return text(fc, 'FaiN Studio', size, fg, colors=lambda i: ac if i == 3 else None)
    if style == 'ai':
        return text(fc, 'fain', size, fg, colors=lambda i: ac if i in (1, 2) else None)
    if style == 'ai-studio':
        return text(fc, 'fain studio', size, fg, colors=lambda i: ac if i in (1, 2) else None)
    if style == 'F-ai-N':
        return text(fc, 'FaiN', size, fg, colors=lambda i: ac if i in (1, 2) else None)
    if style == 'caps':
        a = text(fc, 'FAIN', size, fg, tracking=0.06)
        b = text(face(fk, max(400, wght - 200) if wght else None), 'STUDIO', size * 0.3, ac, tracking=0.5)
        return vstack([a, b], size * 0.2)
    if style == 'caps-line':
        return text(fc, 'FAIN STUDIO', size, fg, tracking=0.12, colors=lambda i: ac if i == 5 else None)
    if style == 'dot':
        return text(fc, 'FaiN·Studio', size, fg, colors=lambda i: ac if i == 4 else None, tracking=0.0)
    if style == 'dotend':
        return text(fc, 'FaiN Studio.', size, fg, colors=lambda i: ac if i == 11 else None)
    if style == 'slash':
        return text(fc, 'FaiN/Studio', size, fg, colors=lambda i: ac if i == 4 else None)
    if style == 'outline':
        t = text(fc, 'FaiN Studio', size, 'none', stroke=fg, sw=size * 0.03)
        return t
    if style == 'serif':
        a = text(fc, 'FaiN', size, fg)
        b = text(face(sfk or 'instrserifi'), 'Studio', size * 1.12, ac)
        return hstack([a, b], size * 0.14)
    if style == 'under':
        t = text(fc, 'FaiN Studio', size, fg)
        bar = f'<rect x="{num(t.x0)}" y="{num(size * 0.16)}" width="{num(t.w)}" height="{num(size * 0.1)}" rx="{num(size * 0.05)}" fill="{ac}"/>'
        return It(t.svg + bar, t.x0, t.y0, t.x1, size * 0.26, t.cy)
    if style == 'strike':
        t = text(fc, 'FaiN Studio', size, fg)
        bar = f'<rect x="{num(t.x0 - size * .06)}" y="{num(-size * 0.27)}" width="{num(t.w + size * .12)}" height="{num(size * 0.07)}" fill="{ac}"/>'
        return It(t.svg + bar, t.x0, t.y0, t.x1, t.y1, t.cy)
    if style == 'split':
        return bigtext('FaiN Studio', fk, wght, p, 'split', size)
    if style == 'shadow':
        return bigtext('FaiN Studio', fk, wght, p, 'shadow', size)
    if style == 'alt':
        cols = [ac, fg, ac, fg]
        return text(fc, 'FaiN Studio', size, fg, colors=lambda i: cols[i % 4] if i < 4 else (ac2 if i >= 5 else None))
    if style == 'italic':
        return text(fc, 'FaiN Studio', size, fg, skew=10)
    if style == 'italic-duo':
        return text(fc, 'FaiN Studio', size, fg, skew=10, colors=lambda i: ac if i >= 5 else None)
    if style == 'stack':
        a = text(fc, 'FaiN', size, fg)
        b = text(fc, 'Studio', size, ac)
        return vstack([a, b], -size * 0.02, 'l')
    if style == 'tracked':
        a = text(fc, 'F A I N', size, fg, tracking=0.12)
        b = text(face(fk, 400), 'studio', size * 0.34, ac, tracking=0.9)
        return vstack([a, b], size * 0.22)
    if style == 'weightmix':
        a = text(face(fk, 900), 'F', size, fg)
        b = text(face(fk, 250), 'ai', size, ac)
        c = text(face(fk, 900), 'N', size, fg)
        d = text(face(fk, 250), 'Studio', size, fg)
        return hstack([a, b, c, d], size * 0.04)
    if style == 'weightmix2':
        a = text(face(fk, 900), 'FaiN', size, fg)
        b = text(face(fk, 250), 'Studio', size, ac)
        return hstack([a, b], size * 0.12)
    if style == 'spark':
        t = text(fc, 'FaıN Studio', size, fg)
        gl, _ = fc.run('FaıN', size)
        g = gl[2]
        b = fc.bounds(g['name'])
        k = size / fc.upem
        cxi = g['x'] + (b[0] + b[2]) / 2 * k
        dot = circ(cxi, -(fc.xh + 0.24) * size + size * 0.02, size * 0.1, ac)
        return It(t.svg + dot, t.x0, min(t.y0, -(fc.xh + 0.36) * size), t.x1, t.y1, t.cy)
    if style == 'spark-star':
        t = text(fc, 'FaıN Studio', size, fg)
        gl, _ = fc.run('FaıN', size)
        g = gl[2]
        b = fc.bounds(g['name'])
        k = size / fc.upem
        cxi = g['x'] + (b[0] + b[2]) / 2 * k
        dot = star4(cxi, -(fc.xh + 0.26) * size, size * 0.3, ac)
        return It(t.svg + dot, t.x0, -(fc.xh + 0.56) * size, t.x1, t.y1, t.cy)
    if style == 'aibox':
        a = text(fc, 'F', size, fg)
        bx = text(fc, 'ai', size * 0.9, ink(ac))
        pad = size * 0.1
        rect = f'<rect x="{num(bx.x0 - pad)}" y="{num(-fc.cap * size - pad * 0.2)}" width="{num(bx.w + 2 * pad)}" height="{num(fc.cap * size + pad * 1.4)}" rx="{num(size * 0.14)}" fill="{ac}"/>'
        box_ = It(rect + bx.svg, bx.x0 - pad, -fc.cap * size, bx.x1 + pad, 0, -fc.cap * size / 2)
        c = text(fc, 'N Studio', size, fg)
        return hstack([a, box_, c], size * 0.07)
    if style == 'label':
        t = text(fc, 'FaiN Studio', size, ink(fg))
        pad = size * 0.28
        rect = f'<rect x="{num(t.x0 - pad)}" y="{num(-fc.cap * size - pad)}" width="{num(t.w + 2 * pad)}" height="{num(fc.cap * size + 2 * pad)}" rx="{num(size * 0.12)}" fill="{fg}"/>'
        return It(rect + t.svg, t.x0 - pad, -fc.cap * size - pad, t.x1 + pad, pad, -fc.cap * size / 2)
    if style == 'pill':
        t = text(fc, 'FaiN', size, ink(ac))
        pad = size * 0.3
        rect = f'<rect x="{num(t.x0 - pad)}" y="{num(-fc.cap * size - pad * 0.7)}" width="{num(t.w + 2 * pad)}" height="{num(fc.cap * size + pad * 1.4)}" rx="{num((fc.cap * size + pad * 1.4) / 2)}" fill="{ac}"/>'
        a = It(rect + t.svg, t.x0 - pad, -fc.cap * size - pad * .7, t.x1 + pad, pad * .7, -fc.cap * size / 2)
        b = text(face(fk, max(300, (wght or 500) - 200)), 'Studio', size, fg)
        return hstack([a, b], size * 0.2)
    if style == 'mono-lower':
        return text(fc, 'fain_studio', size, fg, colors=lambda i: ac if i == 4 else None)
    if style == 'bracket':
        return text(fc, '[ FaiN ]', size, fg, colors=lambda i: ac if i in (0, 7) else None)
    if style == 'caret':
        t = text(fc, 'FaiN Studio', size, fg)
        bar = f'<rect x="{num(t.x1 + size * 0.2)}" y="{num(-fc.cap * size * 1.02)}" width="{num(size * 0.5)}" height="{num(fc.cap * size * 1.04)}" fill="{ac}"/>'
        return It(t.svg + bar, t.x0, t.y0, t.x1 + size * 0.7, t.y1, t.cy)
    if style == 'prompt':
        return text(fc, '> fain', size, fg, colors=lambda i: ac if i == 0 else None)
    if style == 'plus':
        return text(fc, 'FaiN + Studio', size, fg, colors=lambda i: ac if i == 5 else None)
    if style == 'one':
        return text(fc, 'FaiNStudio', size, fg, colors=lambda i: ac if i >= 4 else None)
    if style == 'only':
        return text(fc, 'FaiN', size, fg)
    if style == 'only-ai':
        return text(fc, 'FaiN', size, fg, colors=lambda i: ac if i in (1, 2) else None)
    raise KeyError(style)
