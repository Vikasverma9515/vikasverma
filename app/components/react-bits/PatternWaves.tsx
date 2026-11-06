'use client';

import { useEffect, useMemo, useRef, CSSProperties } from 'react';
import { Renderer, Program, Mesh, Triangle, RenderTarget, Texture } from 'ogl';
import './PatternWaves.css';

const SURFACE_PRESETS: Record<string, Record<string, number | string>> = {
  silk: { pattern: 'dot', wave: 'silk', spacing: 9, markSize: 0.95, depth: 0.95, light: 0, shine: 0.8, contrast: 1.2, speed: 0.35, scale: 1, direction: 20 },
  ocean: { pattern: 'dot', wave: 'swell', spacing: 10, markSize: 0.9, depth: 0.42, light: 0, shine: 1, contrast: 1.2, speed: 0.5, scale: 1, direction: 100 },
  pond: { pattern: 'dot', wave: 'ripple', spacing: 10, markSize: 0.9, depth: 0.55, light: 0, shine: 1.2, contrast: 1.2, speed: 0.5, scale: 1, direction: 35 },
  lines: { pattern: 'line', wave: 'silk', spacing: 12, markSize: 0.42, depth: 0.9, light: 0, shine: 0.6, contrast: 1.2, speed: 0.3, scale: 1, direction: 20 },
  terminal: { pattern: 'glyph', wave: 'ripple', spacing: 13, markSize: 0.95, depth: 0.75, light: 0, shine: 0.9, contrast: 1.4, speed: 0.3, scale: 1.1, direction: 200 },
  mesh: { pattern: 'plus', wave: 'silk', spacing: 14, markSize: 0.8, depth: 0.95, light: 0, shine: 1, contrast: 1.45, speed: 0.4, scale: 1.1, direction: 325 },
};

const PATTERNS: Record<string, number> = { dot: 0, square: 1, plus: 2, line: 3, glyph: 4 };
const WAVES: Record<string, number> = { silk: 0, swell: 1, ripple: 2 };
const FADES: Record<string, number> = { none: 0, edges: 1, center: 2, bottom: 3, top: 4 };
const DEFAULT_CHARACTERS = '.:-=+*#%@';
const GLYPH_FONT = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';
const ATLAS_TILE = 128;
const WAVE_UNIT = 520;
const RIPPLE_CELL = 8;
const RIPPLE_RATE = 60;
const PIXEL_BUDGET = 4.5e6;
const INTRO_SECONDS = 2;

const clamp = (v: number, a: number, b: number) => Math.min(Math.max(v, a), b);
const luminance = (rgba: number[]) => 0.2126 * rgba[0] + 0.7152 * rgba[1] + 0.0722 * rgba[2];

const parseColor = (value: string, fallback: number[]): number[] => {
  try {
    const ctx = document.createElement('canvas').getContext('2d');
    if (!ctx) return fallback;
    ctx.fillStyle = '#000000';
    ctx.fillStyle = value;
    const r = ctx.fillStyle;
    if (r.startsWith('#')) {
      const n = parseInt(r.slice(1), 16);
      return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255, 1];
    }
    const parts = r.match(/[\d.]+/g);
    if (!parts || parts.length < 3) return fallback;
    return [+parts[0] / 255, +parts[1] / 255, +parts[2] / 255, parts[3] ? +parts[3] : 1];
  } catch { return fallback; }
};

const buildAtlas = (characters: string) => {
  const glyphs = Array.from(characters?.length ? characters : DEFAULT_CHARACTERS);
  const columns = Math.ceil(Math.sqrt(glyphs.length));
  const lines = Math.ceil(glyphs.length / columns);
  const canvas = document.createElement('canvas');
  canvas.width = columns * ATLAS_TILE;
  canvas.height = lines * ATLAS_TILE;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `500 ${Math.round(ATLAS_TILE * 0.86)}px ${GLYPH_FONT}`;
  glyphs.forEach((g, i) => {
    ctx.fillText(g, (i % columns) * ATLAS_TILE + ATLAS_TILE / 2, Math.floor(i / columns) * ATLAS_TILE + ATLAS_TILE / 2);
  });
  return { canvas, columns, lines, count: glyphs.length };
};

const passVertex = `#version 300 es\nin vec2 position;\nvoid main(){gl_Position=vec4(position,0.,1.);}`;

const fieldFragment = `#version 300 es
precision highp float;precision highp int;
uniform vec2 uSize;uniform float uDpr;uniform vec2 uOrigin;uniform vec2 uPitch;uniform int uWave;uniform float uTime;uniform float uUnit;uniform vec2 uHeading;uniform float uAmp;uniform float uDepth;uniform vec3 uLight;uniform float uShine;uniform float uContrast;uniform float uInk;uniform float uOpacity;uniform int uFade;uniform float uFadeSize;uniform float uAppear;uniform sampler2D tRipple;uniform float uRipple;
out vec4 fragColor;
const float FOLDS=5.5;
uvec3 scramble(uvec3 v){v=v*1664525u+1013904223u;v.x+=v.y*v.z;v.y+=v.z*v.x;v.z+=v.x*v.y;v^=v>>16u;v.x+=v.y*v.z;v.y+=v.z*v.x;v.z+=v.x*v.y;return v;}
vec3 lattice(vec3 c){uvec3 h=scramble(uvec3(ivec3(c)+4096));return vec3(h&65535u)/32767.5-1.;}
float gradientNoise(vec3 p){vec3 i=floor(p);vec3 f=p-i;vec3 u=f*f*f*(f*(f*6.-15.)+10.);float n000=dot(lattice(i),f);float n100=dot(lattice(i+vec3(1,0,0)),f-vec3(1,0,0));float n010=dot(lattice(i+vec3(0,1,0)),f-vec3(0,1,0));float n110=dot(lattice(i+vec3(1,1,0)),f-vec3(1,1,0));float n001=dot(lattice(i+vec3(0,0,1)),f-vec3(0,0,1));float n101=dot(lattice(i+vec3(1,0,1)),f-vec3(1,0,1));float n011=dot(lattice(i+vec3(0,1,1)),f-vec3(0,1,1));float n111=dot(lattice(i+vec3(1,1,1)),f-vec3(1,1,1));return mix(mix(mix(n000,n100,u.x),mix(n010,n110,u.x),u.y),mix(mix(n001,n101,u.x),mix(n011,n111,u.x),u.y),u.z);}
float surface(vec2 p,float t){if(uWave==0){vec2 side=vec2(-uHeading.y,uHeading.x);float u=dot(p,uHeading);float v=dot(p,side);float bend=gradientNoise(vec3(v*.85,u*.3,t*.05))*1.7+.4*sin(v*1.6+t*.2);float phase=u*FOLDS+bend-t*.45;float swell=.6+.4*gradientNoise(vec3(u*.55+3.,v*.45,t*.04));float fold=sin(phase)+.32*sin(2.*phase+1.3);float ripple=.16*sin(u*FOLDS*2.5+bend*1.9-t*.9+2.1);return(fold+ripple)*swell;}if(uWave==1){float bend=gradientNoise(vec3(p*.6,t*.05))*.6;float phase=dot(p,uHeading)*15.+bend*2.2-t*1.4;float swell=sin(phase)+.3*sin(2.*phase-.8);float roll=.75+.25*gradientNoise(vec3(p*.9+11.,t*.05));return .8*swell*roll;}float r=length(p+uHeading*1.2);float bend=gradientNoise(vec3(p*1.2,t*.05))*.1;return sin((r+bend)*9.-t*1.8)*(.45+.55*exp(-(r-.6)*.8));}
float heightAt(vec2 css){float h=surface((css-.5*uSize)/uUnit,uTime)*uAmp;if(uRipple>0.)h+=texture(tRipple,css/uSize).r*uRipple;return h;}
void main(){vec2 cell=floor(gl_FragCoord.xy);vec2 center=uOrigin+(cell+.5)*uPitch;vec2 css=center/uDpr;vec2 uv=css/uSize;float e=max(uPitch.y/uDpr,4.);float h=heightAt(css);float hx=(heightAt(css+vec2(e,0))-heightAt(css-vec2(e,0)))/(2.*e);float hy=(heightAt(css+vec2(0,e))-heightAt(css-vec2(0,e)))/(2.*e);vec2 grad=vec2(hx,hy)*uUnit*uDepth*.4;vec3 n=normalize(vec3(-grad,1.));float diffuse=clamp(dot(n,uLight),0.,1.);vec3 halfway=normalize(uLight+vec3(0,0,1));float spec=pow(clamp(dot(n,halfway),0.,1.),160.)*uShine*1.15;float hollow=.7+.3*clamp(h*.5+.5,0.,1.);float tone=clamp(diffuse*hollow*.78+spec,0.,1.);tone=clamp((tone-.42)*uContrast+.42,0.,1.);float level=uInk>.5?pow(clamp(1.-tone/.46,0.,1.),2.4)*.72:pow(tone,2.2);float emphasis=uInk>.5?smoothstep(.55,.95,level):clamp(spec*1.6,0.,1.);float fade=1.;vec2 c=uv*2.-1.;if(uFade==1){fade=1.-smoothstep(1.-uFadeSize,1.18,length(c));}else if(uFade==2){fade=mix(.05,1.,smoothstep(.08,.08+uFadeSize,length(c*vec2(1,1.35))));}else if(uFade==3){fade=smoothstep(0.,uFadeSize,uv.y);}else if(uFade==4){fade=smoothstep(0.,uFadeSize,1.-uv.y);}float reach=length(css-.5*uSize)/max(.5*length(uSize),1.);float appear=smoothstep(reach-.05,reach+.3,uAppear*1.35);float alpha=uOpacity*fade*appear*(.22+.78*level);float lift=clamp(h*uDepth*.42,-.48,.48);fragColor=vec4(level,alpha,emphasis,lift+.5);}`;

const rippleFragment = `#version 300 es
precision highp float;
uniform sampler2D tState;uniform vec2 uTexel;uniform vec2 uSize;uniform vec2 uFrom;uniform vec2 uTo;uniform float uRadius;uniform float uImpulse;uniform float uDamping;
out vec4 fragColor;
void main(){vec2 uv=gl_FragCoord.xy*uTexel;vec2 state=texture(tState,uv).rg;float left=texture(tState,uv-vec2(uTexel.x,0)).r;float right=texture(tState,uv+vec2(uTexel.x,0)).r;float below=texture(tState,uv-vec2(0,uTexel.y)).r;float above=texture(tState,uv+vec2(0,uTexel.y)).r;float next=((left+right+below+above)*.5-state.g)*uDamping;vec2 p=uv*uSize;vec2 seg=uTo-uFrom;float along=clamp(dot(p-uFrom,seg)/max(dot(seg,seg),1e-4),0.,1.);float d=length(p-uFrom-seg*along)/uRadius;next-=uImpulse*exp(-d*d*2.);fragColor=vec4(next,state.r,0,1);}`;

const markFragment = `#version 300 es
precision highp float;precision highp int;
uniform sampler2D tField;uniform sampler2D tAtlas;uniform vec2 uOrigin;uniform vec2 uPitch;uniform vec2 uGrid;uniform int uPattern;uniform float uMarkSize;uniform float uStroke;uniform vec3 uColor;uniform vec3 uAccent;uniform vec4 uBackground;uniform vec3 uAtlas;
out vec4 fragColor;
float box(vec2 p,vec2 b,float r){vec2 q=abs(p)-b+r;return length(max(q,0.))+min(max(q.x,q.y),0.)-r;}
float coverage(vec2 local,float level){float span=uPitch.y*uMarkSize;float area=max(sqrt(level),.14);if(uPattern==0)return clamp(.5-(length(local)-.5*span*area),0.,1.);if(uPattern==1){float extent=.5*span*area;return clamp(.5-box(local,vec2(extent),extent*.3),0.,1.);}if(uPattern==2){float arm=.5*span*mix(.3,1.,level);float width=.5*uStroke;return clamp(.5-min(box(local,vec2(arm,width),width),box(local,vec2(width,arm),width)),0.,1.);}if(uAtlas.z<1.)return 0.;vec2 g=local/span+.5;if(g.x<0.||g.y<0.||g.x>1.||g.y>1.)return 0.;float index=min(floor(level*uAtlas.z),uAtlas.z-1.);vec2 tile=vec2(mod(index,uAtlas.x),floor(index/uAtlas.x));vec2 atlasUv=(tile+vec2(g.x,1.-g.y))/uAtlas.xy;vec2 texel=1./(span*uAtlas.xy);return textureGrad(tAtlas,atlasUv,vec2(texel.x,0),vec2(0,texel.y)).a;}
vec4 lineInk(vec2 rel){float fx=rel.x/uPitch.x-.5;float c0=clamp(floor(fx),0.,uGrid.x-1.);float c1=min(c0+1.,uGrid.x-1.);float t=clamp(fx-c0,0.,1.);float row=floor(rel.y/uPitch.y);vec4 ink=vec4(0);for(int k=-1;k<=1;k++){float cy=row+float(k);if(cy<0.||cy>=uGrid.y)continue;vec4 a=texelFetch(tField,ivec2(int(c0),int(cy)),0);vec4 b=texelFetch(tField,ivec2(int(c1),int(cy)),0);vec4 f=mix(a,b,t);if(f.g<.002)continue;float y=(cy+.5+f.a-.5)*uPitch.y;float slope=(b.a-a.a)*uPitch.y/uPitch.x;float thickness=max(uStroke,uPitch.y*uMarkSize*f.r);float d=abs(rel.y-y)/sqrt(1.+slope*slope)-.5*thickness;float alpha=clamp(.5-d,0.,1.)*f.g;if(alpha>ink.a)ink=vec4(mix(uColor,uAccent,f.b)*alpha,alpha);}return ink;}
void main(){vec2 rel=gl_FragCoord.xy-uOrigin;vec4 background=vec4(uBackground.rgb*uBackground.a,uBackground.a);vec4 ink=vec4(0);if(uPattern==3){ink=lineInk(rel);}else{float cx=floor(rel.x/uPitch.x);float row=floor(rel.y/uPitch.y);if(cx>=0.&&cx<uGrid.x){for(int k=-1;k<=1;k++){float cy=row+float(k);if(cy<0.||cy>=uGrid.y)continue;vec4 f=texelFetch(tField,ivec2(int(cx),int(cy)),0);if(f.g<.002)continue;vec2 center=(vec2(cx,cy)+.5)*uPitch+vec2(0,(f.a-.5)*uPitch.y);float alpha=coverage(rel-center,f.r)*f.g;if(alpha>ink.a)ink=vec4(mix(uColor,uAccent,f.b)*alpha,alpha);}}}fragColor=ink+background*(1.-ink.a);}`;

interface PatternWavesProps {
  preset?: 'silk' | 'ocean' | 'pond' | 'lines' | 'terminal' | 'mesh';
  pattern?: string;
  wave?: string;
  spacing?: number;
  markSize?: number;
  depth?: number;
  light?: number;
  shine?: number;
  contrast?: number;
  speed?: number;
  scale?: number;
  direction?: number;
  color?: string;
  backgroundColor?: string;
  opacity?: number;
  fade?: 'edges' | 'center' | 'bottom' | 'top' | 'none';
  fadeSize?: number;
  characters?: string;
  interactive?: boolean;
  cursorSize?: number;
  cursorStrength?: number;
  intro?: boolean;
  paused?: boolean;
  className?: string;
  style?: CSSProperties;
}

const PatternWaves = ({
  preset = 'silk', pattern, wave, spacing, markSize, depth, light, shine, contrast, speed, scale, direction,
  color = '#ffffff', backgroundColor = '#000000', opacity = 1, fade = 'edges', fadeSize = 0.5,
  characters = DEFAULT_CHARACTERS, interactive = true, cursorSize = 50, cursorStrength = 0.6,
  intro = true, paused = false, className = '', style,
}: PatternWavesProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<Record<string, unknown> | null>(null);
  const wakeRef = useRef<(() => void) | null>(null);

  const base = SURFACE_PRESETS[preset] || SURFACE_PRESETS.silk;
  const pick = (value: unknown, key: string) => (value === undefined || value === null ? base[key] : value);

  const colors = useMemo(() => ({
    color: parseColor(color, [1, 1, 1, 1]),
    background: parseColor(backgroundColor, [0, 0, 0, 1]),
  }), [color, backgroundColor]);

  useEffect(() => {
    settingsRef.current = {
      ...colors,
      pattern: pick(pattern, 'pattern'), wave: pick(wave, 'wave'), spacing: pick(spacing, 'spacing'),
      markSize: pick(markSize, 'markSize'), depth: pick(depth, 'depth'), light: pick(light, 'light'),
      shine: pick(shine, 'shine'), contrast: pick(contrast, 'contrast'), speed: pick(speed, 'speed'),
      scale: pick(scale, 'scale'), direction: pick(direction, 'direction'),
      opacity, fade, fadeSize, characters, interactive, cursorSize, cursorStrength, intro, paused,
    };
    wakeRef.current?.();
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const renderer = new Renderer({ alpha: true, premultipliedAlpha: true, antialias: false, depth: false });
    const gl = renderer.gl;
    if (!(renderer as unknown as { isWebgl2: boolean }).isWebgl2) {
      (gl.getExtension('WEBGL_lose_context') as unknown as { loseContext: () => void })?.loseContext();
      return;
    }
    gl.clearColor(0, 0, 0, 0);
    const canvas = gl.canvas as HTMLCanvasElement;
    canvas.style.display = 'block'; canvas.style.width = '100%'; canvas.style.height = '100%';
    canvas.setAttribute('aria-hidden', 'true');
    container.appendChild(canvas);
    const geometry = new Triangle(gl);
    const blank = new Texture(gl);
    const floatTargets = !!gl.getExtension('EXT_color_buffer_float');
    const dispose = (target: RenderTarget) => {
      gl.deleteFramebuffer(target.buffer);
      gl.deleteTexture((target.texture as unknown as { texture: WebGLTexture }).texture);
    };
    const fieldTargetFor = (w: number, h: number) => new RenderTarget(gl, { width: w, height: h, depth: false, minFilter: gl.NEAREST, magFilter: gl.NEAREST });
    const rippleTargetFor = (w: number, h: number) => new RenderTarget(gl, { width: w, height: h, depth: false, type: (gl as WebGL2RenderingContext).HALF_FLOAT, format: gl.RGBA, internalFormat: (gl as WebGL2RenderingContext).RGBA16F, minFilter: gl.LINEAR, magFilter: gl.LINEAR });
    let fieldTarget = fieldTargetFor(1, 1);
    let ripple: { width: number; height: number; read: RenderTarget; write: RenderTarget } | null = null;
    const atlasTexture = new Texture(gl, { generateMipmaps: true, minFilter: gl.LINEAR_MIPMAP_LINEAR, magFilter: gl.LINEAR, flipY: false });
    const fU = { uSize:{value:[1,1]}, uDpr:{value:1}, uOrigin:{value:[0,0]}, uPitch:{value:[1,1]}, uWave:{value:0}, uTime:{value:0}, uUnit:{value:WAVE_UNIT}, uHeading:{value:[1,0]}, uAmp:{value:0}, uDepth:{value:0.5}, uLight:{value:[0,0,1]}, uShine:{value:0.8}, uContrast:{value:1}, uInk:{value:0}, uOpacity:{value:1}, uFade:{value:0}, uFadeSize:{value:0.5}, uAppear:{value:0}, tRipple:{value:blank}, uRipple:{value:0} };
    const fieldMesh = new Mesh(gl, { geometry, program: new Program(gl, { vertex: passVertex, fragment: fieldFragment, uniforms: fU, depthTest: false, depthWrite: false }) });
    const rU = { tState:{value:blank}, uTexel:{value:[1,1]}, uSize:{value:[1,1]}, uFrom:{value:[0,0]}, uTo:{value:[0,0]}, uRadius:{value:40}, uImpulse:{value:0}, uDamping:{value:0.975} };
    const rippleMesh = new Mesh(gl, { geometry, program: new Program(gl, { vertex: passVertex, fragment: rippleFragment, uniforms: rU, depthTest: false, depthWrite: false }) });
    const mU = { tField:{value:fieldTarget.texture}, tAtlas:{value:atlasTexture}, uOrigin:{value:[0,0]}, uPitch:{value:[1,1]}, uGrid:{value:[1,1]}, uPattern:{value:0}, uMarkSize:{value:0.9}, uStroke:{value:2}, uColor:{value:[1,1,1]}, uAccent:{value:[1,1,1]}, uBackground:{value:[0,0,0,1]}, uAtlas:{value:[1,1,0]} };
    const markMesh = new Mesh(gl, { geometry, program: new Program(gl, { vertex: passVertex, fragment: markFragment, uniforms: mU, depthTest: false, depthWrite: false }) });
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    let width = 1, height = 1, raf = 0, last = performance.now(), time = 0, introClock = 0, visible = true, alive = true, dirty = true;
    let rippleUntil = 0, rippleLive = false, rippleClock = 0, atlasKey = '';
    const pointer = { x: 0, y: 0, inside: false, placed: false, lastX: 0, lastY: 0, burst: 0 };
    const buildRipple = () => {
      if (!floatTargets) return;
      const w = clamp(Math.ceil(width / RIPPLE_CELL), 4, 512), h = clamp(Math.ceil(height / RIPPLE_CELL), 4, 512);
      if (ripple && ripple.width === w && ripple.height === h) return;
      if (ripple) { dispose(ripple.read); dispose(ripple.write); }
      ripple = { width: w, height: h, read: rippleTargetFor(w, h), write: rippleTargetFor(w, h) };
      rippleLive = false;
    };
    const clearRipple = () => {
      if (!ripple) return;
      [ripple.read, ripple.write].forEach(t => { renderer.bindFramebuffer(t); gl.viewport(0,0,t.width,t.height); gl.clear(gl.COLOR_BUFFER_BIT); });
      renderer.bindFramebuffer();
    };
    const refreshAtlas = (s: Record<string, unknown>) => {
      if (s.characters === atlasKey) return;
      atlasKey = s.characters as string;
      const built = buildAtlas(s.characters as string);
      if (!built) return;
      (atlasTexture as unknown as { image: HTMLCanvasElement }).image = built.canvas;
      mU.uAtlas.value = [built.columns, built.lines, built.count];
    };
    const resize = () => {
      width = Math.max(1, container.clientWidth); height = Math.max(1, container.clientHeight);
      renderer.dpr = Math.min(window.devicePixelRatio || 1, 2, Math.sqrt(PIXEL_BUDGET / (width * height)));
      renderer.setSize(width, height); buildRipple(); dirty = true; start();
    };
    const stepRipple = (field: typeof ripple & object, s: Record<string, unknown>, dt: number) => {
      rippleClock = Math.min(rippleClock + dt * RIPPLE_RATE, 4);
      const strength = clamp(s.cursorStrength as number, 0, 1);
      const moved = Math.hypot(pointer.x - pointer.lastX, pointer.y - pointer.lastY);
      let impulse = (pointer.inside ? Math.min(moved/14,1)*.35*strength : 0) + pointer.burst * strength;
      pointer.burst = 0;
      rU.uTexel.value = [1/field.width, 1/field.height]; rU.uSize.value = [width, height];
      rU.uFrom.value = [pointer.lastX, height - pointer.lastY]; rU.uTo.value = [pointer.x, height - pointer.y];
      rU.uRadius.value = clamp(s.cursorSize as number, 8, 400);
      while (rippleClock >= 1) {
        rippleClock -= 1; rU.tState.value = field.read.texture; rU.uImpulse.value = impulse;
        renderer.render({ scene: rippleMesh, target: field.write, clear: false });
        const next = field.read; field.read = field.write; field.write = next; impulse = 0;
      }
      pointer.lastX = pointer.x; pointer.lastY = pointer.y;
    };
    const frame = (now: number) => {
      raf = 0; if (!alive) return;
      const s = settingsRef.current; if (!s) return;
      const dt = Math.min(0.05, Math.max(1/240, (now - last)/1000)); last = now;
      const moving = !s.paused && !reducedMotion && s.speed !== 0;
      if (moving) time += dt * (s.speed as number);
      introClock = s.intro && !reducedMotion ? Math.min(1, introClock + dt/INTRO_SECONDS) : 1;
      const appear = 1 - Math.pow(1 - clamp(introClock/0.75,0,1), 3);
      const rise = clamp((introClock-0.1)/0.9,0,1), amp = rise*rise*(3-2*rise);
      const rippling = s.interactive && !reducedMotion && !!ripple && (s.cursorStrength as number) > 0;
      if (rippling && pointer.inside && !pointer.placed) { pointer.lastX = pointer.x; pointer.lastY = pointer.y; pointer.placed = true; }
      if (rippling && (pointer.inside || pointer.burst > 0)) rippleUntil = now + 5000;
      const rippleActive = rippling && now < rippleUntil;
      if (rippleActive && ripple) { stepRipple(ripple, s, dt); rippleLive = true; }
      else if (rippleLive) { clearRipple(); rippleLive = false; }
      const patternIndex = PATTERNS[s.pattern as string] ?? 0;
      if (patternIndex === 4) refreshAtlas(s);
      const canvasW = canvas.width, canvasH = canvas.height, dpr = canvasW / width;
      const pitchY = Math.max(4, Math.round(clamp(s.spacing as number, 4, 120) * dpr));
      const pitchX = patternIndex === 3 ? Math.max(2, Math.round(pitchY/4)) : pitchY;
      const cols = Math.min(4096, Math.ceil(canvasW/pitchX)+1), rows = Math.min(4096, Math.ceil(canvasH/pitchY)+2);
      const origin = [Math.floor((canvasW - cols*pitchX)/2), Math.floor((canvasH - rows*pitchY)/2)];
      if (fieldTarget.width !== cols || fieldTarget.height !== rows) { dispose(fieldTarget); fieldTarget = fieldTargetFor(cols, rows); mU.tField.value = fieldTarget.texture; }
      const heading = ((s.direction as number) * Math.PI)/180;
      const lightAngle = (((s.direction as number) + 180 + clamp(s.light as number, -90, 90)) * Math.PI)/180;
      const background = s.background as number[];
      const ink = background[3] > 0.02 ? luminance(s.color as number[]) < luminance(background) : luminance(s.color as number[]) < 0.5;
      fU.uSize.value=[width,height]; fU.uDpr.value=dpr; fU.uOrigin.value=origin; fU.uPitch.value=[pitchX,pitchY];
      fU.uWave.value=WAVES[s.wave as string]??0; fU.uTime.value=time; fU.uUnit.value=WAVE_UNIT*clamp(s.scale as number,0.2,5);
      fU.uHeading.value=[Math.cos(heading),Math.sin(heading)]; fU.uAmp.value=amp; fU.uDepth.value=clamp(s.depth as number,0,1.5);
      fU.uLight.value=[Math.cos(lightAngle)*.78,Math.sin(lightAngle)*.78,.62]; fU.uShine.value=clamp(s.shine as number,0,2);
      fU.uContrast.value=clamp(s.contrast as number,0.3,3); fU.uInk.value=ink?1:0; fU.uOpacity.value=clamp(s.opacity as number,0,1);
      fU.uFade.value=FADES[s.fade as string]??0; fU.uFadeSize.value=clamp(s.fadeSize as number,0.05,1); fU.uAppear.value=appear;
      fU.tRipple.value=ripple&&rippleLive?ripple.read.texture:blank; fU.uRipple.value=rippleLive?.32:0;
      renderer.render({ scene: fieldMesh, target: fieldTarget });
      mU.uOrigin.value=origin; mU.uPitch.value=[pitchX,pitchY]; mU.uGrid.value=[cols,rows]; mU.uPattern.value=patternIndex;
      mU.uMarkSize.value=clamp(s.markSize as number,0.05,1);
      mU.uStroke.value=patternIndex===3?.9*dpr:Math.max(1.1*dpr,pitchY*.08);
      const tint=ink?0:1, blend=ink?.35:.55;
      mU.uColor.value=(s.color as number[]).slice(0,3);
      mU.uAccent.value=(s.color as number[]).slice(0,3).map((c:number)=>c+(tint-c)*blend);
      mU.uBackground.value=background; renderer.render({ scene: markMesh }); dirty=false;
      if (visible && (moving||introClock<1||rippleActive||dirty)) raf=requestAnimationFrame(frame);
    };
    const start = () => { if (raf||!visible||!alive) return; last=performance.now(); raf=requestAnimationFrame(frame); };
    const locate = (e: PointerEvent) => { const r=container.getBoundingClientRect(); const x=e.clientX-r.left, y=e.clientY-r.top; return {x,y,inside:x>=0&&y>=0&&x<=r.width&&y<=r.height}; };
    const onPointerMove = (e: PointerEvent) => { const s=locate(e); pointer.x=s.x; pointer.y=s.y; if(s.inside!==pointer.inside) pointer.placed=false; pointer.inside=s.inside; if(s.inside) start(); };
    const onPointerDown = (e: PointerEvent) => { const s=locate(e); if(!s.inside) return; pointer.x=s.x; pointer.y=s.y; if(!pointer.inside){pointer.lastX=s.x;pointer.lastY=s.y;} pointer.burst=1.2; start(); };
    const onPointerLeave = () => { pointer.inside=false; pointer.placed=false; start(); };
    const onPointerOut = (e: PointerEvent) => { if(!e.relatedTarget) onPointerLeave(); };
    const onPointerUp = (e: PointerEvent) => { if(e.pointerType==='touch') onPointerLeave(); };
    window.addEventListener('pointermove', onPointerMove, {passive:true});
    window.addEventListener('pointerdown', onPointerDown, {passive:true});
    window.addEventListener('pointerout', onPointerOut, {passive:true});
    window.addEventListener('pointerup', onPointerUp, {passive:true});
    window.addEventListener('blur', onPointerLeave);
    document.addEventListener('visibilitychange', ()=>{if(!document.hidden) start();});
    const ro = new ResizeObserver(resize); ro.observe(container);
    const io = new IntersectionObserver(([e])=>{visible=e.isIntersecting; start();}); io.observe(container);
    wakeRef.current = () => { dirty=true; start(); };
    resize();
    return () => {
      alive=false; visible=false; cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
      window.removeEventListener('pointermove', onPointerMove); window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerout', onPointerOut); window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('blur', onPointerLeave); wakeRef.current=null;
      if(ripple){dispose(ripple.read);dispose(ripple.write);}
      dispose(fieldTarget); gl.deleteTexture((atlasTexture as unknown as {texture:WebGLTexture}).texture);
      (gl.getExtension('WEBGL_lose_context') as unknown as {loseContext:()=>void})?.loseContext();
      if(canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };
  }, []);

  return <div ref={containerRef} className={`pattern-waves ${className}`.trim()} style={style} />;
};

export default PatternWaves;
