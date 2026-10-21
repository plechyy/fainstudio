from marks import *

P = {
    'ink': dict(bg='#ffffff', fg='#0b0b10', ac='#0b0b10', ac2='#6b6b76'),
    'inkneg': dict(bg='#0b0b10', fg='#ffffff', ac='#ffffff', ac2='#8a8a96'),
    'silver': dict(bg='#ececec', fg='#111114', ac='#111114', ac2='#80808a'),
    'violet': dict(bg='#0f0e12', fg='#f4f1ff', ac='#b79cff', ac2='#ff7ad9'),
    'violetL': dict(bg='#f6f3ff', fg='#1b1233', ac='#6a3dff', ac2='#ff5fb0'),
    'lime': dict(bg='#0b0b0b', fg='#f3f3ee', ac='#c8ff3d', ac2='#7aff9e'),
    'orange': dict(bg='#fff4e6', fg='#1a1410', ac='#ff5a1f', ac2='#ffb020'),
    'cobalt': dict(bg='#eef2ff', fg='#0a1a66', ac='#2340ff', ac2='#00c2ff'),
    'forest': dict(bg='#0e3b2e', fg='#f2efe2', ac='#7dffb3', ac2='#f5d060'),
    'pink': dict(bg='#0a1030', fg='#ffffff', ac='#ff3d8b', ac2='#ffd23d'),
    'mustard': dict(bg='#0d0d0d', fg='#fff7e0', ac='#ffc21a', ac2='#ff6a3d'),
    'teal': dict(bg='#ffffff', fg='#06312e', ac='#00b3a4', ac2='#ff7a59'),
    'burgundy': dict(bg='#f7e8e4', fg='#4a0d25', ac='#d6336c', ac2='#ff9f7a'),
    'cyan': dict(bg='#07122b', fg='#e8f6ff', ac='#2ee6ff', ac2='#7b5cff'),
    'red': dict(bg='#ffffff', fg='#101010', ac='#e5202e', ac2='#101010'),
    'sage': dict(bg='#e8ebdc', fg='#25301f', ac='#c8553d', ac2='#7f9a62'),
    'lav': dict(bg='#cfc3ff', fg='#1a0f4d', ac='#ffffff', ac2='#5b36ff'),
    'peach': dict(bg='#ffd9c2', fg='#14213d', ac='#ff4d2e', ac2='#3b5bff'),
    'sand': dict(bg='#f3eadb', fg='#2a1d12', ac='#1f5eff', ac2='#e0a100'),
    'mint': dict(bg='#d8fff0', fg='#052e22', ac='#0fbf7a', ac2='#5b36ff'),
    'night': dict(bg='#14121c', fg='#ece8f7', ac='#ff8a5c', ac2='#b79cff'),
    'electric': dict(bg='#3a1cff', fg='#ffffff', ac='#c8ff3d', ac2='#ff7ad9'),
    'tomato': dict(bg='#e5322d', fg='#fff2e0', ac='#14110f', ac2='#ffd23d'),
    'ocean': dict(bg='#0a3d62', fg='#ffffff', ac='#ffd166', ac2='#4cc9f0'),
    'bubble': dict(bg='#ffe3f1', fg='#3d0a2b', ac='#ff2e93', ac2='#7a2bff'),
}


def compose(mark, wordf, layout, p, mr=None):
    """mark, wordf: funkce palette -> It (nebo None). Vrací It celého loga."""
    m = mark(p) if mark else None
    w = wordf(p) if wordf else None
    if m and not w:
        return m
    if w and not m:
        return w
    if layout in ('h', 'hr', 'sep', 'frame'):
        r = mr or 2.0
        m2 = m.scaled(w.h * r / m.h)
        gap = w.h * 0.5
        if layout == 'hr':
            return hstack([w, m2], gap)
        if layout == 'sep':
            rule = It(f'<rect x="0" y="0" width="2" height="{num(m2.h * 0.8)}" fill="{p["fg"]}" opacity="0.35"/>', 0, 0, 2, m2.h * 0.8)
            return hstack([m2, rule, w], gap * 0.7)
        if layout == 'frame':
            body = hstack([m2, w], gap * 0.8)
            pad = w.h * 0.9
            fr = f'<rect x="{num(body.x0 - pad)}" y="{num(body.y0 - pad)}" width="{num(body.w + 2 * pad)}" height="{num(body.h + 2 * pad)}" rx="{num(pad * 0.9)}" fill="none" stroke="{p["fg"]}" stroke-width="{num(w.h * 0.05)}"/>'
            return It(fr + body.svg, body.x0 - pad, body.y0 - pad, body.x1 + pad, body.y1 + pad)
        return hstack([m2, w], gap)
    if layout in ('v', 'vs'):
        r = mr or 3.4
        m2 = m.scaled(w.h * r / m.h)
        return vstack([m2, w], w.h * (0.7 if layout == 'v' else 0.45))
    raise KeyError(layout)


W, H = 640, 420


def logo_svg(it, p, maxw=470, maxh=235, bg=True):
    k = min(maxw / it.w, maxh / it.h)
    s = it.scaled(k)
    s = s.at(W / 2 - (s.x0 + s.x1) / 2, H / 2 - (s.y0 + s.y1) / 2)
    r = f'<rect width="{W}" height="{H}" fill="{p["bg"]}"/>' if bg else ''
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">{r}{s.svg}</svg>'


def sheet(entries, cols, title='', cell=(320, 210), cap=34):
    """entries: list of (svgstring, caption). Vrací jeden SVG s dlaždicemi."""
    n = len(entries)
    rows = (n + cols - 1) // cols
    cw, ch = cell
    out = [f'<svg xmlns="http://www.w3.org/2000/svg" width="{cols * cw}" height="{rows * (ch + cap)}" viewBox="0 0 {cols * cw} {rows * (ch + cap)}"><rect width="100%" height="100%" fill="#d9d9d9"/>']
    for i, (svg, capt) in enumerate(entries):
        x, y = (i % cols) * cw, (i // cols) * (ch + cap)
        inner = svg.replace(f' width="{W}" height="{H}">', '>', 1).replace('<svg xmlns="http://www.w3.org/2000/svg"', f'<svg x="{x + 3}" y="{y + 3}" width="{cw - 6}" height="{ch - 6}" xmlns="http://www.w3.org/2000/svg"', 1)
        out.append(inner)
        out.append(f'<text x="{x + 8}" y="{y + ch + 20}" font-family="Helvetica, Arial, sans-serif" font-size="13" fill="#222">{capt}</text>')
    out.append('</svg>')
    return ''.join(out)
