/*
 * Značkové obrázky generované v prohlížeči ze stejného kouřového shaderu jako hero:
 * favicon, ikony a sada log. Používá je Color studio (živý favicon při ladění barvy
 * a uložení celé sady na web). Barva se bere z aktuální primární barvy (--primary).
 */

const FRAG = `#version 300 es
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec3 u_brand;
uniform vec3 u_bg;
uniform float u_motion;
uniform float u_sides;
uniform float u_zoom; // 0 = volně, 1 = boky (hero), 2 = jeden mrak uprostřed
out vec4 outColor;

float hash(vec2 p){ p = fract(p*vec2(123.34, 456.21)); p += dot(p, p+45.32); return fract(p.x*p.y); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  float a = hash(i), b = hash(i+vec2(1.,0.)), c = hash(i+vec2(0.,1.)), d = hash(i+vec2(1.,1.));
  vec2 u = f*f*(3.-2.*f);
  return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
}
float fbm(vec2 p){
  float v = 0., a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for(int i=0;i<3;i++){ v += a*noise(p); p = m*p; a *= 0.5; }
  return v;
}

void main(){
  vec2 p = (gl_FragCoord.xy - 0.5*u_res) / u_res.y * u_zoom;   // y-normalizované, střed = 0
  float t = u_time * 0.08 * u_motion;

  // Jemnozrnný šum + prahování smoothstepem → tvar je rozmanitý a bohatý.
  // POZOR: pole šumu se pohybuje po UZAVŘENÝCH drahách (sin/cos), ne lineárně v čase.
  // Lineární posun (dřív) pole po čase vynesl do oblasti se slabým šumem a mrak
  // zhasl; takhle se pole vrací a vzhled zůstává stejný celé hodiny.
  vec2 w = vec2(
    fbm(p*2.0 + vec2(0.9*sin(t*1.0), 0.9*cos(t*0.86))),
    fbm(p*2.0 + vec2(3.3 + 0.8*cos(t*0.74), -0.8*sin(t*1.04)))
  );
  float n = fbm(p*2.4 + 2.1*(w - 0.5) + vec2(0.5*sin(t*0.62), 0.5*cos(t*0.54)));
  float f = smoothstep(0.28, 0.72, n);

  // Dva body s původními širokými drahami přes CELÝ hero (dráhy jsou periodické,
  // takže se opakují do nekonečna bez nabobtnávání).
  vec2 c1 = vec2(0.52*sin(t*0.65), 0.30*cos(t*0.8));
  vec2 c2 = vec2(0.58*cos(t*0.45 + 2.0), 0.34*sin(t*0.55 + 1.0));
  // Režim „boky": stejné pomalé dráhy, ale každý bod je vázaný na jednu polovinu hera
  // (levý/pravý okraj). A = polovina šířky v jednotkách výšky.
  float A = 0.5 * u_res.x / u_res.y;
  if (u_sides > 1.5) {
    // jeden bod, který se jen pomalu potuluje kolem středu
    c1 = vec2(A * 0.22 * sin(t*0.65), 0.12 * cos(t*0.8));
  } else if (u_sides > 0.5) {
    c1 = vec2(-A * (0.74 + 0.16*sin(t*0.65)), 0.30*cos(t*0.8));
    c2 = vec2( A * (0.74 + 0.16*cos(t*0.45 + 2.0)), 0.34*sin(t*0.55 + 1.0));
  }
  float g1 = exp(-dot(p - c1, p - c1) * 2.2);
  float g2 = exp(-dot(p - c2, p - c2) * 2.7);
  // probabilistic union — překryv dvou bodů nesčítá jas
  float gm = g1 + g2 - g1*g2;
  float d = clamp(f * (0.35 + 1.6 * gm), 0.0, 1.0);
  if (u_sides > 1.5) {
    // jeden široký mrak (do šířky protažený), se stejným stálým základem jako boky v hero
    vec2 q = (p - c1) * vec2(0.9, 1.0);
    float gc = exp(-dot(q, q) * 2.4);
    d = clamp(mix(0.25, 1.0, f) * (1.9 * gc - 0.14), 0.0, 1.0);
  }
  // Střed s textem zůstává volný: mrak jen u okrajů, plynule zeslabený směrem ke středu.
  if (u_sides > 0.5 && u_sides < 1.5) {
    // Šum jen tvaruje okraje, základ mraku na obou bocích je tu VŽDY (min. 45 % šumu),
    // takže žádná strana nikdy nezmizí, když je šum zrovna slabý
    // (změřeno: na 2 h animace nejslabší moment 0.45, nikdy pod čtvrtinou jasu).
    d = clamp(mix(0.45, 1.0, f) * (0.18 + 1.7 * gm), 0.0, 1.0);
    float ax = abs(gl_FragCoord.x / u_res.x - 0.5);
    d *= smoothstep(0.17, 0.40, ax);
  }

  // Strop = jasná verze brand barvy; v nejvyšších špičkách lehce k bílé (ne na plno).
  vec3 peak = u_brand * 0.95;
  vec3 col = u_bg;
  col = mix(col, u_brand * 0.38, smoothstep(0.08, 0.55, d));
  col = mix(col, peak, smoothstep(0.50, 0.92, d));
  col = mix(col, mix(peak, vec3(1.0), 0.35), smoothstep(0.86, 1.0, d));
  col = mix(col, u_bg, smoothstep(0.80, 1.5, length(p)));
  col = mix(col, u_bg, smoothstep(0.43, 0.50, length(gl_FragCoord.xy/u_res - 0.5)));

  // film grain
  float gr = hash(gl_FragCoord.xy * 1.3 + fract(u_time) * 180.0);
  col += (gr - 0.5) * 0.0;

  outColor = vec4(max(col, 0.0), 1.0);
}`;
const VERT = `#version 300 es
in vec2 a; void main(){ gl_Position = vec4(a, 0.0, 1.0); }`;

export const PHASE = 70; // vybraný okamžik animace kouře
const ZOOM = 1.55;

export function brandHex(): string {
  const probe = document.createElement('span');
  probe.style.color = 'var(--primary)';
  document.body.appendChild(probe);
  const col = getComputedStyle(probe).color;
  probe.remove();
  const cv = document.createElement('canvas');
  cv.width = cv.height = 1;
  const cx = cv.getContext('2d', { willReadFrequently: true })!;
  cx.fillStyle = col;
  cx.fillRect(0, 0, 1, 1);
  const [r, g, b] = cx.getImageData(0, 0, 1, 1).data;
  return '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('');
}

const hex3 = (h: string): [number, number, number] => {
  const n = parseInt(h.replace('#', ''), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};

/** Kouřový mrak na průhledném pozadí (černá = průhledná). */
export function renderCloud(size: number, color: string): HTMLCanvasElement | null {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const gl = c.getContext('webgl2', { antialias: false, alpha: false, preserveDrawingBuffer: true });
  if (!gl) return null;
  const sh = (t: number, s: string) => {
    const x = gl.createShader(t)!;
    gl.shaderSource(x, s);
    gl.compileShader(x);
    return x;
  };
  const pr = gl.createProgram()!;
  gl.attachShader(pr, sh(gl.VERTEX_SHADER, VERT));
  gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(pr);
  gl.useProgram(pr);
  const b = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, b);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const l = gl.getAttribLocation(pr, 'a');
  gl.enableVertexAttribArray(l);
  gl.vertexAttribPointer(l, 2, gl.FLOAT, false, 0, 0);
  gl.viewport(0, 0, size, size);
  const u = (n: string) => gl.getUniformLocation(pr, n);
  gl.uniform2f(u('u_res'), size, size);
  gl.uniform1f(u('u_time'), PHASE);
  const br = hex3(color);
  gl.uniform3f(u('u_brand'), br[0], br[1], br[2]);
  gl.uniform3f(u('u_bg'), 0, 0, 0);
  gl.uniform1f(u('u_motion'), 1);
  gl.uniform1f(u('u_sides'), 2);
  gl.uniform1f(u('u_zoom'), ZOOM);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
  const px = new Uint8Array(size * size * 4);
  gl.readPixels(0, 0, size, size, gl.RGBA, gl.UNSIGNED_BYTE, px);
  gl.getExtension('WEBGL_lose_context')?.loseContext();

  const out = document.createElement('canvas');
  out.width = out.height = size;
  const cx = out.getContext('2d')!;
  const img = cx.createImageData(size, size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = ((size - 1 - y) * size + x) * 4;
      const o = (y * size + x) * 4;
      const r = px[i], g = px[i + 1], bl = px[i + 2];
      const a = Math.min(255, Math.max(r, g, bl) * 1.15);
      if (a <= 0) continue;
      const k = 255 / a;
      img.data[o] = Math.min(255, r * k);
      img.data[o + 1] = Math.min(255, g * k);
      img.data[o + 2] = Math.min(255, bl * k);
      img.data[o + 3] = a;
    }
  }
  cx.putImageData(img, 0, 0);
  return out;
}

function scaled(src: HTMLCanvasElement, size: number) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const x = c.getContext('2d')!;
  x.imageSmoothingQuality = 'high';
  x.drawImage(src, 0, 0, size, size);
  return c;
}

type Part = { t: string; w: string; c: string; width?: number };
function textCanvas(parts: Part[], px: number, pad: number) {
  const m = document.createElement('canvas').getContext('2d')!;
  const gap = px * 0.14;
  let w = 0;
  parts.forEach((p, i) => {
    m.font = `${p.w} ${px}px FingerPaint`;
    p.width = m.measureText(p.t).width;
    w += p.width + (i ? gap : 0);
  });
  const c = document.createElement('canvas');
  c.width = Math.ceil(w + pad * 2);
  c.height = Math.ceil(px * 1.3 + pad * 2);
  const x = c.getContext('2d')!;
  let cur = pad;
  parts.forEach((p) => {
    x.font = `${p.w} ${px}px FingerPaint`;
    x.fillStyle = p.c;
    x.fillText(p.t, cur, pad + px);
    cur += (p.width ?? 0) + gap;
  });
  return c;
}

const toBlob = (c: HTMLCanvasElement) => new Promise<Blob>((r) => c.toBlob((b) => r(b!), 'image/png'));

/** Živý favicon při ladění barvy (jen v tomhle prohlížeči). */
export function updateFavicon() {
  const cloud = renderCloud(64, brandHex());
  if (!cloud) return;
  const url = cloud.toDataURL('image/png');
  document.querySelectorAll<HTMLLinkElement>('link[rel~="icon"]').forEach((l) => l.remove());
  const link = document.createElement('link');
  link.rel = 'icon';
  link.type = 'image/png';
  link.href = url;
  document.head.appendChild(link);
}

/** Celá sada: ikony, favicony, slovo a logo. Klíč = název souboru. */
export async function makePack(): Promise<Record<string, Blob>> {
  await document.fonts.load('700 200px FingerPaint');
  await document.fonts.load('400 200px FingerPaint');
  const color = brandHex();
  const icon = renderCloud(1024, color);
  if (!icon) throw new Error('WebGL není k dispozici');
  const files: Record<string, Blob> = {};
  files['1-ikona-kour.png'] = await toBlob(icon);
  files['icon-512.png'] = await toBlob(scaled(icon, 512));
  files['apple-icon.png'] = await toBlob(scaled(icon, 180));
  for (const s of [16, 32, 48, 64, 192]) files[`favicon-${s}.png`] = await toBlob(scaled(icon, s));

  files['2-fain-slovo.png'] = await toBlob(textCanvas([{ t: 'FaiN', w: '700', c: '#e4e4e7' }], 360, 40));

  const word = textCanvas(
    [
      { t: 'FaiN', w: '700', c: '#f2f2f4' },
      { t: 'Studio', w: '400', c: color },
    ],
    300,
    20,
  );
  const H = word.height;
  const I = Math.round(H * 1.25);
  const lock = document.createElement('canvas');
  lock.width = I + Math.round(H * 0.1) + word.width;
  lock.height = Math.max(I, H);
  const lx = lock.getContext('2d')!;
  lx.drawImage(scaled(icon, I), 0, (lock.height - I) / 2);
  lx.drawImage(word, I + Math.round(H * 0.1), (lock.height - H) / 2);
  files['3-logo-fain-studio.png'] = await toBlob(lock);

  files['fain-studio-slovo.png'] = await toBlob(
    textCanvas(
      [
        { t: 'FaiN', w: '700', c: '#f2f2f4' },
        { t: 'Studio', w: '400', c: color },
      ],
      360,
      40,
    ),
  );
  return files;
}
