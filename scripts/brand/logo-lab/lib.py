"""Pomocné funkce pro generování log: písmo na křivky, jednoduché skládání prvků."""
import io, math, functools, os
import uharfbuzz as hb
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen

SP = os.environ.get('FONT_PKGS', os.path.join(os.path.dirname(os.path.abspath(__file__)), 'fonts', 'node_modules'))
V = SP + '/@fontsource-variable'
S = SP + '/@fontsource'
PROJ = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', '..'))

FONTS = {
    'bricolage': V + '/bricolage-grotesque/files/bricolage-grotesque-latin-wght-normal.woff2',
    'instrument': V + '/instrument-sans/files/instrument-sans-latin-wght-normal.woff2',
    'geist': V + '/geist/files/geist-latin-wght-normal.woff2',
    'sora': V + '/sora/files/sora-latin-wght-normal.woff2',
    'space': V + '/space-grotesk/files/space-grotesk-latin-wght-normal.woff2',
    'familjen': V + '/familjen-grotesk/files/familjen-grotesk-latin-wght-normal.woff2',
    'unbounded': V + '/unbounded/files/unbounded-latin-wght-normal.woff2',
    'fraunces': V + '/fraunces/files/fraunces-latin-wght-normal.woff2',
    'syne': V + '/syne/files/syne-latin-wght-normal.woff2',
    'epilogue': V + '/epilogue/files/epilogue-latin-wght-normal.woff2',
    'playfair': V + '/playfair-display/files/playfair-display-latin-wght-normal.woff2',
    'playfairi': V + '/playfair-display/files/playfair-display-latin-wght-italic.woff2',
    'outfit': V + '/outfit/files/outfit-latin-wght-normal.woff2',
    'lexend': V + '/lexend/files/lexend-latin-wght-normal.woff2',
    'dmserif': S + '/dm-serif-display/files/dm-serif-display-latin-400-normal.woff2',
    'dmserifi': S + '/dm-serif-display/files/dm-serif-display-latin-400-italic.woff2',
    'instrserif': S + '/instrument-serif/files/instrument-serif-latin-400-normal.woff2',
    'instrserifi': S + '/instrument-serif/files/instrument-serif-latin-400-italic.woff2',
    'mono': S + '/jetbrains-mono/files/jetbrains-mono-latin-700-normal.woff2',
    'archivo': S + '/archivo-black/files/archivo-black-latin-400-normal.woff2',
    'dela': S + '/dela-gothic-one/files/dela-gothic-one-latin-400-normal.woff2',
    'righteous': S + '/righteous/files/righteous-latin-400-normal.woff2',
    'bungee': S + '/bungee/files/bungee-latin-400-normal.woff2',
    'calsans': PROJ + '/public/fonts/cal-sans-latin.woff2',
    'inter': PROJ + '/public/fonts/inter-latin.woff2',
    'finger': PROJ + '/node_modules/@fontsource/finger-paint/files/finger-paint-latin-400-normal.woff2',
}


def num(v):
    s = ('%.2f' % v).rstrip('0').rstrip('.')
    return '0' if s in ('-0', '') else s


class Face:
    def __init__(self, key, wght=None):
        f = TTFont(FONTS[key])
        if 'fvar' in f:
            loc = {}
            for a in f['fvar'].axes:
                if a.axisTag == 'wght' and wght is not None:
                    loc['wght'] = max(a.minValue, min(a.maxValue, wght))
                else:
                    loc[a.axisTag] = a.defaultValue
            f = instancer.instantiateVariableFont(f, loc)
        f.flavor = None
        buf = io.BytesIO()
        f.save(buf)
        self.f = TTFont(io.BytesIO(buf.getvalue()))
        self.gs = self.f.getGlyphSet()
        self.upem = self.f['head'].unitsPerEm
        self.hbfont = hb.Font(hb.Face(buf.getvalue()))
        os2 = self.f['OS/2']
        self.cap = (os2.sCapHeight or 0.7 * self.upem) / self.upem
        self.xh = (os2.sxHeight or 0.5 * self.upem) / self.upem
        self._b = {}

    def bounds(self, name):
        if name not in self._b:
            bp = BoundsPen(self.gs)
            self.gs[name].draw(bp)
            self._b[name] = bp.bounds  # None pro mezeru
        return self._b[name]

    def run(self, text, size, tracking=0.0, features=None):
        buf = hb.Buffer()
        buf.add_str(text)
        buf.guess_segment_properties()
        hb.shape(self.hbfont, buf, features or {'kern': True, 'liga': False, 'calt': False})
        k = size / self.upem
        x = 0.0
        out = []
        for info, pos in zip(buf.glyph_infos, buf.glyph_positions):
            name = self.f.getGlyphName(info.codepoint)
            out.append(dict(name=name, x=x + pos.x_offset * k, y=-pos.y_offset * k, ch=info.cluster, adv=pos.x_advance * k))
            x += pos.x_advance * k + tracking * size
        return out, x - tracking * size

    def path(self, name, size, x, y):
        k = size / self.upem
        pen = SVGPathPen(self.gs, ntos=num)
        self.gs[name].draw(TransformPen(pen, (k, 0, 0, -k, x, y)))
        return pen.getCommands()


@functools.lru_cache(None)
def face(key, wght=None):
    return Face(key, wght)


class It:
    """Prvek loga: svg + obrysový rámeček (y dolů) + svislý střed pro zarovnání."""

    def __init__(s, svg, x0, y0, x1, y1, cy=None):
        s.svg, s.x0, s.y0, s.x1, s.y1 = svg, x0, y0, x1, y1
        s.cy = (y0 + y1) / 2 if cy is None else cy

    @property
    def w(s):
        return s.x1 - s.x0

    @property
    def h(s):
        return s.y1 - s.y0

    def at(s, dx, dy):
        return It(f'<g transform="translate({num(dx)} {num(dy)})">{s.svg}</g>', s.x0 + dx, s.y0 + dy, s.x1 + dx, s.y1 + dy, s.cy + dy)

    def scaled(s, k):
        return It(f'<g transform="scale({num(k)})">{s.svg}</g>', s.x0 * k, s.y0 * k, s.x1 * k, s.y1 * k, s.cy * k)

    def norm(s):
        return s.at(-s.x0, -s.y0)


def union(items):
    return It(''.join(i.svg for i in items), min(i.x0 for i in items), min(i.y0 for i in items), max(i.x1 for i in items), max(i.y1 for i in items))


def hstack(items, gap, align='cy'):
    x = 0
    out = []
    for i in items:
        out.append(i.at(x - i.x0, -i.cy if align == 'cy' else -(i.y0 + i.y1) / 2))
        x += i.w + gap
    u = union(out)
    u.cy = 0
    return u


def vstack(items, gap, align='c'):
    y = 0
    out = []
    mw = max(i.w for i in items)
    for i in items:
        dx = (mw - i.w) / 2 if align == 'c' else (0 if align == 'l' else mw - i.w)
        out.append(i.at(dx - i.x0, y - i.y0))
        y += i.h + gap
    return union(out)


def text(fc, txt, size, fill, tracking=0.0, colors=None, stroke=None, sw=0, skew=0, features=None, upper_cap=False):
    """Text na křivkách. colors: funkce index znaku -> barva (nebo None = fill). Základní čára je y=0."""
    gl, w = fc.run(txt, size, tracking, features)
    k = size / fc.upem
    parts, x0, x1, y0, y1 = [], 1e9, -1e9, 1e9, -1e9
    for g in gl:
        b = fc.bounds(g['name'])
        d = fc.path(g['name'], size, g['x'], g['y'])
        if b:
            x0 = min(x0, g['x'] + b[0] * k); x1 = max(x1, g['x'] + b[2] * k)
            y0 = min(y0, g['y'] - b[3] * k); y1 = max(y1, g['y'] - b[1] * k)
        if not d:
            continue
        col = (colors(g['ch']) if colors else None) or fill
        st = f' stroke="{stroke}" stroke-width="{num(sw)}" stroke-linejoin="round" paint-order="stroke"' if stroke else ''
        parts.append(f'<path d="{d}" fill="{col}"{st}/>')
    svg = ''.join(parts)
    cy = -fc.cap * size / 2
    it = It(svg, x0, y0, x1, y1, cy)
    if skew:
        a = math.tan(math.radians(skew))
        it = It(f'<g transform="skewX({num(-skew)})">{svg}</g>', x0 - a * y1, y0, x1 - a * y0, y1, cy)
    return it


def glyph_item(fc, ch, size, fill, **kw):
    return text(fc, ch, size, fill, **kw)


def fit_in(it, cx, cy, maxw, maxh):
    """Zmenší/zvětší prvek do rámečku a vycentruje na (cx, cy) podle obrysu."""
    k = min(maxw / it.w, maxh / it.h)
    s = it.scaled(k)
    return s.at(cx - (s.x0 + s.x1) / 2, cy - (s.y0 + s.y1) / 2)
