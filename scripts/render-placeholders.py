"""
Zástupné 3D rendery (clay) pro fainstudio.com.

Raymarching SDF v čistém numpy, žádné další závislosti. Výstup jsou jen
placeholdery ve správných rozměrech a formátech — finální rendery dodá
zadavatel a nahradí soubory ve public/media/ pod stejnými názvy.

Spuštění:  python3 scripts/render-placeholders.py [hero|stills|all]
Vyžaduje:  numpy, ffmpeg (libvpx-vp9, libx264), cwebp
"""
import math
import os
import struct
import subprocess
import sys
import tempfile
import zlib
from multiprocessing import Pool

import numpy as np

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "public", "media")

# ── vektorové pomůcky ────────────────────────────────────────────────

def norm(v):
    return v / np.linalg.norm(v, axis=-1, keepdims=True)


def length(v):
    return np.sqrt(np.sum(v * v, axis=-1))


def rot(p, axis, a):
    """Inverzní rotace bodu p (otáčí prostor, ne objekt)."""
    c, s = math.cos(-a), math.sin(-a)
    x, y, z = p[..., 0], p[..., 1], p[..., 2]
    if axis == "x":
        return np.stack([x, c * y - s * z, s * y + c * z], -1)
    if axis == "y":
        return np.stack([c * x + s * z, y, -s * x + c * z], -1)
    return np.stack([c * x - s * y, s * x + c * y, z], -1)


def tr(p, x=0.0, y=0.0, z=0.0):
    return p - np.array([x, y, z])


# ── SDF primitiva ────────────────────────────────────────────────────

def rbox(p, bx, by, bz, r):
    b = np.array([bx, by, bz])
    q = np.abs(p) - (b - r)
    return length(np.maximum(q, 0.0)) + np.minimum(np.max(q, axis=-1), 0.0) - r


def sphere(p, r):
    return length(p) - r


def cyl(p, r, h, rr=0.02):
    """Svislý válec se zaoblenou hranou."""
    d0 = np.sqrt(p[..., 0] ** 2 + p[..., 2] ** 2) - r + rr
    d1 = np.abs(p[..., 1]) - h + rr
    return np.minimum(np.maximum(d0, d1), 0.0) + np.sqrt(
        np.maximum(d0, 0) ** 2 + np.maximum(d1, 0) ** 2
    ) - rr


def torus(p, R, r):
    q0 = np.sqrt(p[..., 0] ** 2 + p[..., 2] ** 2) - R
    return np.sqrt(q0 ** 2 + p[..., 1] ** 2) - r


def smin(a, b, k):
    h = np.clip(0.5 + 0.5 * (b - a) / k, 0.0, 1.0)
    return b * (1 - h) + a * h - k * h * (1 - h)


def U(*ds):
    out = ds[0]
    for d in ds[1:]:
        out = np.minimum(out, d)
    return out


# ── scény ────────────────────────────────────────────────────────────

def hero_scene(t):
    """Modulární deska 4×4, kterou prochází radiální vlna. t ∈ [0,1) je bezešvé."""
    cells = []
    for cx in (-1.2, -0.4, 0.4, 1.2):
        for cz in (-1.2, -0.4, 0.4, 1.2):
            wave = 0.5 + 0.5 * math.cos(2 * math.pi * (math.hypot(cx, cz) / 1.7 - t))
            cells.append((cx, cz, 0.14 + 0.42 * wave ** 2))

    def f(p):
        # obálka celé scény — přesné SDF se počítá jen poblíž
        d = rbox(tr(p, y=0.7), 1.75, 0.72, 1.75, 0.0)
        near = np.nonzero(d < 0.25)[0]
        if near.size:
            q = p[near]
            out = rbox(tr(q, y=0.11), 1.72, 0.11, 1.72, 0.08)
            for cx, cz, h in cells:
                out = np.minimum(out, rbox(tr(q, cx, 0.22 + h, cz), 0.27, h, 0.27, 0.07))
            d[near] = out
        return d
    return f


def s_poptavky(p):
    # podnos s vertikálními obálkami a „notifikační“ koulí
    tray_o = rbox(tr(p, y=0.22), 1.1, 0.22, 0.72, 0.1)
    tray_i = rbox(tr(p, y=0.44), 1.0, 0.3, 0.62, 0.06)
    tray = np.maximum(tray_o, -tray_i)
    cards = []
    for i, (x, h, a) in enumerate([(-0.55, 0.62, 0.10), (-0.15, 0.78, -0.04), (0.25, 0.56, 0.08)]):
        q = rot(tr(p, x=x, y=0.2 + h), "z", a)
        cards.append(rbox(q, 0.07, h, 0.5, 0.04))
    ball = sphere(tr(p, x=0.78, y=1.55, z=0.05), 0.26)
    return U(tray, *cards, ball)


def s_dokumenty(p):
    def stack(q, n, w, d):
        y = q[..., 1]
        i = np.clip(np.floor(y / 0.09), 0, n - 1)
        qq = np.stack([q[..., 0], y - (i * 0.09 + 0.04), q[..., 2]], -1)
        return rbox(qq, w, 0.032, d, 0.03)
    a = stack(rot(tr(p, x=-0.9), "y", 0.12), 7, 0.5, 0.66)
    b = stack(rot(tr(p, x=0.4, z=-0.25), "y", -0.08), 4, 0.5, 0.66)
    c = stack(rot(tr(p, x=0.55, z=0.75), "y", 0.2), 2, 0.5, 0.66)
    fly = rbox(rot(rot(tr(p, x=-0.15, y=1.15, z=0.25), "z", -0.45), "x", 0.25), 0.5, 0.03, 0.66, 0.03)
    return U(a * 0.9, b * 0.9, c * 0.9, fly)


def s_asistent(p):
    q = rot(tr(p, y=0.95, z=-0.1), "y", 0.62)
    bubble = rbox(q, 1.05, 0.62, 0.22, 0.2)
    tail = rbox(rot(tr(q, x=-0.55, y=-0.68), "z", 0.7), 0.16, 0.16, 0.16, 0.06)
    body = smin(bubble, tail, 0.12)
    dots = U(*[sphere(tr(q, x=x, z=0.24), 0.13) for x in (-0.42, 0.0, 0.42)])
    small = rbox(rot(tr(p, x=1.05, y=0.32, z=0.75), "y", 0.4), 0.42, 0.28, 0.14, 0.12)
    return U(body, dots, small)


def s_data(p):
    base = rbox(tr(p, y=0.07), 1.45, 0.07, 0.6, 0.06)
    cols = []
    hs = [0.3, 0.52, 0.42, 0.78, 1.08]
    for i, h in enumerate(hs):
        cols.append(cyl(tr(p, x=-1.08 + i * 0.54, y=0.14 + h), 0.2, h, 0.06))
    marker = sphere(tr(p, x=1.08, y=2.54), 0.17)
    ring = torus(rot(tr(p, x=1.08, y=2.54), "x", 1.2), 0.32, 0.035)
    return U(base, *cols, marker, ring)


def s_weby(p):
    q = rot(rot(tr(p, y=1.0), "y", 0.62), "x", -0.12)
    panel = rbox(q, 1.15, 0.85, 0.06, 0.06)
    bar = rbox(tr(q, y=0.64, z=0.07), 1.0, 0.07, 0.03, 0.03)
    block = rbox(tr(q, x=-0.42, y=0.08, z=0.07), 0.5, 0.36, 0.03, 0.03)
    btn = rbox(tr(q, x=0.42, y=-0.48, z=0.1), 0.34, 0.11, 0.06, 0.1)
    stand = rbox(tr(p, y=0.05, z=0.12), 0.7, 0.05, 0.45, 0.05)
    return U(panel, bar, block, btn, stand)


def s_video(p):
    q = rot(tr(p, y=0.55), "y", -0.5)
    body = rbox(q, 0.78, 0.45, 0.42, 0.12)
    lens_q = rot(tr(q, x=1.0), "z", math.pi / 2)
    lens = cyl(lens_q, 0.3, 0.26, 0.05)
    lens_ring = torus(rot(tr(q, x=1.26), "z", math.pi / 2), 0.3, 0.05)
    reel1 = cyl(rot(tr(q, x=-0.3, y=0.88), "x", math.pi / 2), 0.38, 0.07, 0.03)
    reel2 = cyl(rot(tr(q, x=0.42, y=0.8), "x", math.pi / 2), 0.3, 0.07, 0.03)
    return U(body, lens, lens_ring, reel1, reel2)


STILLS = [
    ("system-01-poptavky", s_poptavky),
    ("system-02-dokumenty", s_dokumenty),
    ("system-03-asistent", s_asistent),
    ("system-04-data", s_data),
    ("system-05-weby", s_weby),
    ("system-06-video", s_video),
]

# ── renderer ─────────────────────────────────────────────────────────

LIGHT = norm(np.array([-0.55, 0.85, 0.45]))
FILL = norm(np.array([0.7, 0.35, -0.55]))
CLAY = np.array([0.80, 0.77, 0.73])
BG_TOP = np.array([0.105, 0.100, 0.095])
BG_BOT = np.array([0.060, 0.057, 0.054])


def camera(w, h, theta, dist, height, target, fov):
    ro = np.array([math.cos(theta) * dist, height, math.sin(theta) * dist])
    fw = norm(np.array(target) - ro)
    rt = norm(np.cross(fw, np.array([0.0, 1.0, 0.0])))
    up = np.cross(rt, fw)
    ys, xs = np.mgrid[0:h, 0:w].astype(np.float64)
    u = (xs + 0.5) / w * 2 - 1
    v = 1 - (ys + 0.5) / h * 2
    k = math.tan(math.radians(fov) / 2)
    rd = norm(fw + u[..., None] * k * rt * (w / h) + v[..., None] * k * up)
    return ro, rd.reshape(-1, 3)


def march(scene, ro, rd, tmax, steps=200):
    n = rd.shape[0]
    t = np.full(n, 0.01)
    hit = np.zeros(n, bool)
    active = np.arange(n)
    for _ in range(steps):
        if active.size == 0:
            break
        p = ro + rd[active] * t[active, None]
        d = scene(p)
        t[active] += d
        done = d < 0.0008 * t[active]
        hit[active[done]] = True
        keep = ~done & (t[active] < tmax)
        active = active[keep]
    return t, hit


def normal(scene, p):
    e = 0.0015
    k = np.array([[1, -1, -1], [-1, -1, 1], [-1, 1, -1], [1, 1, 1]], float)
    n = np.zeros_like(p)
    for kk in k:
        n += kk * scene(p + kk * e)[:, None]
    return norm(n)


def soft_shadow(scene, p, ld, k=10.0, steps=40):
    res = np.ones(p.shape[0])
    t = np.full(p.shape[0], 0.03)
    for _ in range(steps):
        d = scene(p + ld * t[:, None])
        res = np.minimum(res, np.clip(k * d / t, 0, 1))
        t += np.clip(d, 0.02, 0.25)
    return np.clip(res, 0, 1) ** 1.3


def ao(scene, p, n):
    occ = np.zeros(p.shape[0])
    for i in range(1, 6):
        h = 0.04 * i * i
        occ += (h - scene(p + n * h)) / (2 ** i)
    return np.clip(1 - 2.2 * occ, 0, 1)


def tonemap(c):
    c = 1 - np.exp(-c * 1.35)
    return np.clip(c, 0, 1) ** (1 / 2.2)


def render(scene, w, h, theta, dist, height, target, fov, alpha):
    ro, rd = camera(w, h, theta, dist, height, target, fov)
    n_px = rd.shape[0]
    t, hit = march(scene, ro, rd, tmax=dist * 2.5)

    # podlaha y = 0
    with np.errstate(divide="ignore", invalid="ignore"):
        tg = np.where(rd[:, 1] < -1e-4, -ro[1] / rd[:, 1], np.inf)
    ground = (~hit | (tg < t)) & np.isfinite(tg)
    obj = hit & ~ground

    col = np.zeros((n_px, 3))
    a = np.zeros(n_px)

    # objekty
    if obj.any():
        idx = np.nonzero(obj)[0]
        p = ro + rd[idx] * t[idx, None]
        nn = normal(scene, p)
        v = -rd[idx]
        sh = soft_shadow(scene, p + nn * 0.004, LIGHT)
        oc = ao(scene, p, nn)
        dif = np.clip(np.sum(nn * LIGHT, -1), 0, 1) * sh
        fil = np.clip(np.sum(nn * FILL, -1) * 0.5 + 0.5, 0, 1) ** 2
        sky = 0.5 + 0.5 * nn[:, 1]
        hv = norm(LIGHT + v)
        spe = np.clip(np.sum(nn * hv, -1), 0, 1) ** 40 * sh
        fre = (1 - np.clip(np.sum(nn * v, -1), 0, 1)) ** 4
        lin = (
            dif[:, None] * np.array([1.25, 1.15, 1.02]) * 1.15
            + fil[:, None] * np.array([0.30, 0.34, 0.42]) * 0.55 * oc[:, None]
            + sky[:, None] * np.array([0.32, 0.31, 0.30]) * oc[:, None]
        )
        c = CLAY * lin + spe[:, None] * 0.35 + fre[:, None] * 0.12 * oc[:, None]
        col[idx] = tonemap(c)
        a[idx] = 1.0

    # podlaha: stín + kontaktní AO
    if ground.any():
        idx = np.nonzero(ground)[0]
        p = ro + rd[idx] * tg[idx, None]
        sh = soft_shadow(scene, p + np.array([0, 0.002, 0]), LIGHT, k=6.0)
        dn = scene(p)
        cont = np.clip(dn / 0.45, 0, 1) ** 0.6
        occl = 1 - sh * (0.45 + 0.55 * cont)
        if alpha:
            fade = np.exp(-np.maximum(length(p[:, [0, 2]]) - 1.6, 0) * 0.9)
            a[idx] = np.clip(occl * 0.62 * fade, 0, 1)
            col[idx] = 0.0
        else:
            yy = idx // w / h
            bg = BG_TOP * (1 - yy[:, None]) + BG_BOT * yy[:, None]
            lit = 1.0 + 0.55 * sh * cont - 0.65 * (1 - sh * (0.5 + 0.5 * cont))
            col[idx] = np.clip(bg * lit[:, None], 0, 1) ** (1 / 1.0)
            a[idx] = 1.0

    if not alpha:
        rest = ~(obj | ground)
        idx = np.nonzero(rest)[0]
        yy = idx // w / h
        col[idx] = BG_TOP * (1 - yy[:, None]) + BG_BOT * yy[:, None]
        a[:] = 1.0

    return col.reshape(h, w, 3), a.reshape(h, w)


def downsample(img, f):
    h, w = img.shape[:2]
    return img.reshape(h // f, f, w // f, f, *img.shape[2:]).mean(axis=(1, 3))


def write_png(path, rgb, alpha=None):
    h, w = rgb.shape[:2]
    if alpha is not None:
        data = np.concatenate([rgb, alpha[..., None]], -1)
        ctype, ch = 6, 4
    else:
        data, ctype, ch = rgb, 2, 3
    raw = (np.clip(data, 0, 1) * 255 + 0.5).astype(np.uint8)
    rows = b"".join(b"\x00" + raw[y].tobytes() for y in range(h))

    def chunk(tag, payload):
        c = struct.pack(">I", len(payload)) + tag + payload
        return c + struct.pack(">I", zlib.crc32(tag + payload) & 0xFFFFFFFF)

    png = b"\x89PNG\r\n\x1a\n"
    png += chunk(b"IHDR", struct.pack(">IIBBBBB", w, h, 8, ctype, 0, 0, 0))
    png += chunk(b"IDAT", zlib.compress(rows, 9))
    png += chunk(b"IEND", b"")
    with open(path, "wb") as fh:
        fh.write(png)


# ── úlohy ────────────────────────────────────────────────────────────

HERO_W = 640
HERO_FRAMES = 96  # 4 s × 24 fps


def hero_frame(args):
    i, tmp = args
    t = i / HERO_FRAMES
    theta = math.radians(38) + t * (math.pi / 2)  # 90° otočka, scéna je 4× symetrická
    ss = 2
    rgb, _ = render(hero_scene(t), HERO_W * ss, HERO_W * ss, theta, 7.4, 4.9, (0, 0.35, 0), 33, alpha=False)
    rgb = downsample(rgb, ss)
    write_png(os.path.join(tmp, f"f{i:03d}.png"), rgb)
    return i


def do_hero():
    tmp = tempfile.mkdtemp(prefix="fain-hero-")
    with Pool(os.cpu_count()) as pool:
        for i in pool.imap_unordered(hero_frame, [(i, tmp) for i in range(HERO_FRAMES)]):
            print(f"hero frame {i}", flush=True)
    src = os.path.join(tmp, "f%03d.png")
    webm = os.path.join(OUT, "hero-loop.webm")
    mp4 = os.path.join(OUT, "hero-loop.mp4")
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-framerate", "24", "-i", src,
                    "-c:v", "libvpx-vp9", "-b:v", "0", "-crf", "42", "-row-mt", "1",
                    "-pix_fmt", "yuv420p", "-an", webm], check=True)
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-framerate", "24", "-i", src,
                    "-c:v", "libx264", "-crf", "30", "-preset", "slow", "-pix_fmt", "yuv420p",
                    "-movflags", "+faststart", "-an", mp4], check=True)
    subprocess.run(["cwebp", "-quiet", "-q", "78", os.path.join(tmp, "f000.png"),
                    "-o", os.path.join(OUT, "hero-poster.webp")], check=True)
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", os.path.join(tmp, "f000.png"),
                    "-q:v", "4", os.path.join(OUT, "hero-poster.jpg")], check=True)


STILL_W = 800


def still(job):
    name, scene = job
    ss = 2
    rgb, a = render(scene, STILL_W * ss, STILL_W * ss, math.radians(52), 6.3, 3.9, (0, 0.7, 0), 33, alpha=True)
    rgb, a = downsample(rgb * a[..., None], ss), downsample(a, ss)
    with np.errstate(invalid="ignore", divide="ignore"):
        rgb = np.where(a[..., None] > 0, rgb / np.maximum(a[..., None], 1e-6), 0)
    png = os.path.join(OUT, f"{name}.png")
    write_png(png, rgb, a)
    subprocess.run(["cwebp", "-quiet", "-q", "80", "-alpha_q", "85", "-exact", png,
                    "-o", os.path.join(OUT, f"{name}.webp")], check=True)
    return name


def do_stills():
    with Pool(min(6, os.cpu_count())) as pool:
        for n in pool.imap_unordered(still, STILLS):
            print(f"still {n}", flush=True)


if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    what = sys.argv[1] if len(sys.argv) > 1 else "all"
    if what in ("stills", "all"):
        do_stills()
    if what in ("hero", "all"):
        do_hero()
