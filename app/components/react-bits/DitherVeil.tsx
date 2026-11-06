'use client';

import { useEffect, useRef, CSSProperties } from 'react';
import { Renderer, Program, Mesh, Triangle, Texture, RenderTarget } from 'ogl';
import './DitherVeil.css';

const DEFAULT_SRC = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80&auto=format&fit=crop';
const ORDERED: Record<string, number> = { bayer: 0, noise: 1, lines: 2 };
const KERNELS: Record<string, [number, number, number][]> = {
  atkinson: [[1,0,1/8],[2,0,1/8],[-1,1,1/8],[0,1,1/8],[1,1,1/8],[0,2,1/8]],
  floyd: [[1,0,7/16],[-1,1,3/16],[0,1,5/16],[1,1,1/16]],
};
const MASK_SCALE = 0.5, MAX_BURSTS = 4, BURST_SECONDS = 1.2, HOLD = 1.6, INTRO_MS = 1100;

const hexToRgb = (hex: string): number[] => {
  let h = String(hex||'').replace('#','');
  if(h.length===3) h=h.replace(/./g,c=>c+c);
  const n=parseInt(h.slice(0,6),16);
  return Number.isNaN(n)?[0,0,0]:[((n>>16)&255)/255,((n>>8)&255)/255,(n&255)/255];
};

const fitScale = (w:number,h:number,iw:number,ih:number,contain:boolean): [number,number] => {
  const ratio=w/h/(iw/ih);
  if(contain) return ratio>1?[ratio,1]:[1,1/ratio];
  return ratio>1?[1,1/ratio]:[ratio,1];
};

const wanderAt=(t:number,w:number,h:number):[number,number]=>[
  w*(0.5+0.33*Math.sin(t*0.53)+0.08*Math.sin(t*1.31+0.6)),
  h*(0.5+0.28*Math.sin(t*0.71+1.1)+0.07*Math.cos(t*1.57)),
];

const measureEdge=(ctx:CanvasRenderingContext2D,img:HTMLImageElement)=>{
  const size=32; ctx.canvas.width=size; ctx.canvas.height=size;
  ctx.drawImage(img,0,0,size,size);
  const data=ctx.getImageData(0,0,size,size).data;
  const sum=[0,0,0],squares=[0,0,0]; let count=0;
  for(let y=0;y<size;y++) for(let x=0;x<size;x++){
    if(x>0&&y>0&&x<size-1&&y<size-1) continue;
    for(let c=0;c<3;c++){const v=data[(y*size+x)*4+c]/255;sum[c]+=v;squares[c]+=v*v;} count++;
  }
  const matte=[sum[0]/count,sum[1]/count,sum[2]/count];
  const spread=matte.reduce((t,m,c)=>t+Math.sqrt(Math.max(0,squares[c]/count-m*m)),0)/3;
  return {matte,plain:spread<0.06};
};

let blueNoise: Uint8Array|null=null;
const getBlueNoise=()=>{
  if(blueNoise) return blueNoise;
  const size=64,n=size*size,wrap=size-1,taps:number[]=[];
  for(let dy=-6;dy<=6;dy++) for(let dx=-6;dx<=6;dx++) taps.push(dx,dy,Math.exp(-(dx*dx+dy*dy)/4.5));
  const energy=new Float32Array(n),on=new Uint8Array(n);
  const splat=(i:number,sign:number)=>{const x=i%size,y=(i-x)/size;for(let k=0;k<taps.length;k+=3)energy[((y+taps[k+1])&wrap)*size+((x+taps[k])&wrap)]+=sign*taps[k+2];};
  const find=(state:number,highest:boolean)=>{let best=0,value=highest?-Infinity:Infinity;for(let i=0;i<n;i++){if(on[i]!==state)continue;if(highest?energy[i]>value:energy[i]<value){value=energy[i];best=i;}}return best;};
  let seed=7;const random=()=>{seed=(seed*16807)%2147483647;return seed/2147483647;};
  const initial=Math.round(n*0.1);
  for(let placed=0;placed<initial;){const i=Math.floor(random()*n);if(on[i])continue;on[i]=1;splat(i,1);placed++;}
  for(let guard=0;guard<n;guard++){const cluster=find(1,true);on[cluster]=0;splat(cluster,-1);const gap=find(0,false);on[gap]=1;splat(gap,1);if(gap===cluster)break;}
  const seedOn=on.slice(),seedEnergy=energy.slice(),rank=new Uint16Array(n);
  for(let r=initial-1;r>=0;r--){const cluster=find(1,true);on[cluster]=0;splat(cluster,-1);rank[cluster]=r;}
  on.set(seedOn);energy.set(seedEnergy);
  for(let r=initial;r<n;r++){const gap=find(0,false);on[gap]=1;splat(gap,1);rank[gap]=r;}
  const data=new Uint8Array(n*4);
  for(let i=0;i<n;i++){const v=Math.floor((rank[i]/n)*256);data[i*4]=v;data[i*4+1]=v;data[i*4+2]=v;data[i*4+3]=255;}
  blueNoise=data; return data;
};

const diffuse=(pixels:Uint8ClampedArray,cols:number,rows:number,kernel:[number,number,number][],levels:number,rgb:boolean,grade:(v:number)=>number)=>{
  const channels=rgb?3:1,values=new Float32Array(cols*rows*channels);
  for(let i=0;i<cols*rows;i++){const r=pixels[i*4]/255,g=pixels[i*4+1]/255,b=pixels[i*4+2]/255;if(rgb){values[i*3]=grade(r);values[i*3+1]=grade(g);values[i*3+2]=grade(b);}else values[i]=grade(0.2126*r+0.7152*g+0.0722*b);}
  const steps=levels-1,out=new Uint8Array(cols*rows*4);
  for(let y=0;y<rows;y++){const dir=y&1?-1:1;for(let i=0;i<cols;i++){const x=dir>0?i:cols-1-i,p=y*cols+x;for(let c=0;c<channels;c++){const old=values[p*channels+c],q=Math.min(steps,Math.max(0,Math.round(old*steps)))/steps,err=old-q,byte=Math.round(q*255);if(rgb)out[p*4+c]=byte;else out[p*4]=out[p*4+1]=out[p*4+2]=byte;for(let k=0;k<kernel.length;k++){const nx=x+kernel[k][0]*dir,ny=y+kernel[k][1];if(nx<0||nx>=cols||ny>=rows)continue;values[(ny*cols+nx)*channels+c]+=err*kernel[k][2];}}out[p*4+3]=255;}}
  return out;
};

const vertex=`#version 300 es\nin vec2 position;in vec2 uv;out vec2 vUv;\nvoid main(){vUv=uv;gl_Position=vec4(position,0.,1.);}`;

const maskFragment=`#version 300 es
precision highp float;
uniform sampler2D tPrev;uniform vec2 uSize;uniform vec2 uFrom;uniform vec2 uTo;uniform float uRadius;uniform float uSoftness;uniform float uStrength;uniform float uFade;uniform float uHold;
in vec2 vUv;out vec4 fragColor;
float strokeDistance(vec2 p,vec2 a,vec2 b){vec2 ab=b-a;float h=clamp(dot(p-a,ab)/max(dot(ab,ab),.0001),0.,1.);return length(p-a-ab*h);}
void main(){vec2 p=vec2(vUv.x,1.-vUv.y)*uSize;float trail=max(texture(tPrev,vUv).r-uFade,0.);float band=max(uRadius*uSoftness,1.)*uHold;float d=strokeDistance(p,uFrom,uTo);trail=max(trail,clamp((uRadius-d)/band,0.,1.)*uStrength);fragColor=vec4(trail,0,0,1);}`;

const viewFragment=`#version 300 es
precision highp float;precision highp int;
uniform sampler2D tImage;uniform sampler2D tMask;uniform sampler2D tNoise;uniform sampler2D tDiffused;uniform vec2 uResolution;uniform vec2 uCover;uniform float uLod;uniform float uCell;uniform int uPattern;uniform int uPalette;uniform float uLevels;uniform vec3 uInk;uniform vec3 uPaper;uniform vec3 uRimColor;uniform float uRim;uniform float uContrast;uniform float uBrightness;uniform float uReverse;uniform float uIntro;uniform float uHold;uniform vec3 uMatte;uniform float uKey;uniform vec2 uSize;uniform vec4 uBursts[4];uniform float uBurstWidth;
in vec2 vUv;out vec4 fragColor;
float bayer(vec2 cell){ivec2 p=ivec2(mod(cell,8.));int v=p.x^p.y;int m=((v&1)<<5)|((p.y&1)<<4)|((v&2)<<2)|((p.y&2)<<1)|((v&4)>>1)|((p.y&4)>>2);return(float(m)+.5)/64.;}
float blueNoiseF(vec2 cell){return(texelFetch(tNoise,ivec2(mod(cell,64.)),0).r*255.+.5)/256.;}
float engraving(vec2 cell){float period=6.;float f=(mod(cell.x+cell.y,period)+.5)/period;return clamp(abs(f*2.-1.)+(bayer(cell)-.5)*(2./period),0.,1.);}
vec2 imageUv(vec2 uv){return(uv-.5)*uCover+.5;}
float within(vec2 p){vec2 s=step(vec2(0.),p)*step(p,vec2(1.));return s.x*s.y;}
vec3 grade(vec3 c){return pow(clamp((c-.5)*uContrast+.5+uBrightness,0.,1.),vec3(1.6));}
float shockwave(vec2 p){float value=0.;for(int i=0;i<4;i++){vec4 burst=uBursts[i];if(burst.w<=0.)continue;float offset=distance(p,burst.xy)-burst.z;float edge=offset>0.?offset/(uBurstWidth*.35):-offset/uBurstWidth;value=max(value,clamp(1.-edge,0.,1.)*burst.w);}return value;}
vec3 toned(vec3 c){return uPalette==1?grade(c):grade(vec3(dot(c,vec3(.2126,.7152,.0722))));}
vec3 quantize(vec3 v,float t){float steps=max(uLevels-1.,1.);vec3 s=v*steps;vec3 base=floor(s);return min(base+step(vec3(t),s-base),vec3(steps))/steps;}
void main(){vec2 px=vec2(gl_FragCoord.x,uResolution.y-gl_FragCoord.y);vec2 cell=floor(px/uCell);vec2 center=(cell+.5)*uCell;vec2 cellUv=vec2(center.x/uResolution.x,1.-center.y/uResolution.y);vec2 sampleUv=imageUv(cellUv);float framed=within(sampleUv);vec3 level;if(uPattern==3){level=texelFetch(tDiffused,ivec2(cell),0).rgb;}else{vec3 c=mix(uMatte,textureLod(tImage,sampleUv,uLod).rgb,framed);float t=uPattern==1?blueNoiseF(cell):(uPattern==2?engraving(cell):bayer(cell));level=quantize(toned(c),t);}vec3 color=mix(uInk,mix(uInk,uPaper,level),max(framed,uKey));vec3 backdrop=mix(uInk,uPaper,toned(uMatte));vec2 photoUv=imageUv(vUv);vec3 raw=texture(tImage,photoUv).rgb;float plain=uKey*(1.-smoothstep(.05,.22,distance(raw,uMatte)));vec3 photo=mix(mix(uInk,backdrop,uKey),mix(raw,backdrop,plain),within(photoUv));vec2 point=vec2(cellUv.x,1.-cellUv.y)*uSize;float mask=max(clamp(texture(tMask,cellUv).r*uHold,0.,1.),shockwave(point));float shown=mix(mask,1.-mask,uReverse);float order=bayer(cell.yx);float low=order*(1.-uRim);color=mix(color,uRimColor,step(low,shown)*step(.001,uRim));color=mix(color,photo,step(low+uRim,shown));vec2 aspect=vec2(uResolution.x/uResolution.y,1.);float spread=length((cellUv-.5)*aspect)/length(aspect*.5);float appear=step(spread*.72+bayer(cell+vec2(3,5))*.28,uIntro*1.001);fragColor=vec4(mix(uInk,color,appear),1.);}`;

interface DitherVeilProps {
  src?: string;
  fit?: 'contain' | 'cover';
  pattern?: 'bayer' | 'noise' | 'atkinson' | 'floyd' | 'lines';
  pixelSize?: number;
  levels?: number;
  palette?: 'duotone' | 'rgb';
  inkColor?: string;
  paperColor?: string;
  contrast?: number;
  brightness?: number;
  revealRadius?: number;
  softness?: number;
  linger?: number;
  rimColor?: string;
  rim?: number;
  reverse?: boolean;
  wander?: boolean;
  clickBurst?: boolean;
  className?: string;
  style?: CSSProperties;
}

const DitherVeil = ({
  src = DEFAULT_SRC, fit = 'contain', pattern = 'floyd', pixelSize = 2, levels = 2, palette = 'duotone',
  inkColor = '#120f17', paperColor = '#f4f1ea', contrast = 1.15, brightness = 0, revealRadius = 200,
  softness = 0.6, linger = 1, rimColor = '#a78bfa', rim = 0, reverse = false, wander = false,
  clickBurst = true, className = '', style,
}: DitherVeilProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<Record<string, unknown> | null>(null);
  const wakeRef = useRef<() => void>(() => {});

  useEffect(() => {
    settingsRef.current = { fit, pattern, pixelSize, levels, palette, inkColor, paperColor, contrast, brightness, revealRadius, softness, linger, rimColor, rim, reverse, wander, clickBurst };
    wakeRef.current();
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const renderer = new Renderer({ dpr: Math.min(window.devicePixelRatio||1,2), alpha: false, antialias: false });
    const gl = renderer.gl;
    const canvas = gl.canvas as HTMLCanvasElement;
    canvas.style.display = 'block'; canvas.style.width = '100%'; canvas.style.height = '100%';
    container.appendChild(canvas);
    const floatMask = (renderer as unknown as { isWebgl2: boolean }).isWebgl2 && !!renderer.getExtension('EXT_color_buffer_float');
    const geometry = new Triangle(gl);
    const dataTexture = () => new Texture(gl, { image: new Uint8Array(4), width: 1, height: 1, generateMipmaps: false, flipY: false, minFilter: gl.NEAREST, magFilter: gl.NEAREST });
    const imageTexture = new Texture(gl, { minFilter: gl.LINEAR_MIPMAP_LINEAR, magFilter: gl.LINEAR });
    const noiseTexture = dataTexture();
    const diffusedTexture = dataTexture();
    const createMask = (w: number, h: number) => new RenderTarget(gl, { width: w, height: h, depth: false, type: floatMask ? (gl as WebGL2RenderingContext).HALF_FLOAT : gl.UNSIGNED_BYTE, internalFormat: floatMask ? (gl as WebGL2RenderingContext).RGBA16F : gl.RGBA, minFilter: gl.LINEAR, magFilter: gl.LINEAR });
    const destroyMask = (t: RenderTarget) => { gl.deleteFramebuffer(t.buffer); gl.deleteTexture((t.texture as unknown as { texture: WebGLTexture }).texture); };
    let masks = [createMask(2, 2), createMask(2, 2)];
    const maskU = { tPrev:{value:masks[0].texture}, uSize:{value:[1,1]}, uFrom:{value:[0,0]}, uTo:{value:[0,0]}, uRadius:{value:1}, uSoftness:{value:0.5}, uStrength:{value:0}, uFade:{value:1}, uHold:{value:HOLD} };
    const viewU = { tImage:{value:imageTexture}, tMask:{value:masks[0].texture}, tNoise:{value:noiseTexture}, tDiffused:{value:diffusedTexture}, uResolution:{value:[1,1]}, uCover:{value:[1,1]}, uLod:{value:0}, uCell:{value:3}, uPattern:{value:0}, uPalette:{value:0}, uLevels:{value:2}, uInk:{value:[0,0,0]}, uPaper:{value:[1,1,1]}, uRimColor:{value:[1,1,1]}, uRim:{value:0}, uContrast:{value:1}, uBrightness:{value:0}, uReverse:{value:0}, uIntro:{value:0}, uHold:{value:HOLD}, uMatte:{value:[0,0,0]}, uKey:{value:0}, uSize:{value:[1,1]}, uBursts:{value:Array.from({length:MAX_BURSTS*4},()=>0)}, uBurstWidth:{value:60} };
    const prog = (frag: string, u: Record<string, unknown>) => new Program(gl, { vertex, fragment: frag, uniforms: u, depthTest: false, depthWrite: false });
    const maskMesh = new Mesh(gl, { geometry, program: prog(maskFragment, maskU) });
    const viewMesh = new Mesh(gl, { geometry, program: prog(viewFragment, viewU) });
    const sampler = document.createElement('canvas');
    const samplerCtx = sampler.getContext('2d', { willReadFrequently: true });
    let image: HTMLImageElement|null=null, introStart=0, diffusedKey='', diffusionBlocked=false;
    let width=1, height=1, visible=true, raf=0, last=performance.now(), trailUntil=0, presence=0, drift=0;
    const pointer={x:0,y:0,inside:false,fresh:true,placed:false};
    const brush={x:0,y:0,px:0,py:0};
    const bursts: {x:number;y:number;start:number}[]=[];
    const layout=()=>{
      width=Math.max(1,container.clientWidth); height=Math.max(1,container.clientHeight);
      renderer.setSize(width,height); viewU.uResolution.value=[canvas.width,canvas.height];
      maskU.uSize.value=[width,height]; viewU.uSize.value=[width,height];
      const mw=Math.max(2,Math.round(width*MASK_SCALE)),mh=Math.max(2,Math.round(height*MASK_SCALE));
      if(mw!==masks[0].width||mh!==masks[0].height){masks.forEach(destroyMask);masks=[createMask(mw,mh),createMask(mw,mh)];}
      if(!pointer.placed){pointer.x=width/2;pointer.y=height/2;}
    };
    const updateDiffusion=(cell:number,s:Record<string,unknown>)=>{
      if(!image||!samplerCtx) return;
      const cols=Math.ceil(canvas.width/cell),rows=Math.ceil(canvas.height/cell);
      const key=[s.pattern,s.levels,s.palette,s.contrast,s.brightness,s.fit,cols,rows,canvas.width,canvas.height].join('|');
      if(key===diffusedKey) return; diffusedKey=key;
      const [cx,cy]=viewU.uCover.value as number[];
      const iw=image.naturalWidth,ih=image.naturalHeight;
      sampler.width=cols; sampler.height=rows;
      samplerCtx.imageSmoothingEnabled=true; samplerCtx.imageSmoothingQuality='high';
      const [mr,mg,mb]=viewU.uMatte.value as number[];
      samplerCtx.fillStyle=`rgb(${mr*255},${mg*255},${mb*255})`; samplerCtx.fillRect(0,0,cols,rows);
      const sx=(0.5-0.5*cx)*iw,sy=(0.5-0.5*cy)*ih,sw=((cols*cell)/canvas.width)*cx*iw,sh=((rows*cell)/canvas.height)*cy*ih;
      const x0=Math.max(sx,0),y0=Math.max(sy,0),x1=Math.min(sx+sw,iw),y1=Math.min(sy+sh,ih);
      if(x1>x0&&y1>y0) samplerCtx.drawImage(image,x0,y0,x1-x0,y1-y0,((x0-sx)/sw)*cols,((y0-sy)/sh)*rows,((x1-x0)/sw)*cols,((y1-y0)/sh)*rows);
      const grade=(v:number)=>Math.pow(Math.min(1,Math.max(0,(v-.5)*(s.contrast as number)+.5+(s.brightness as number))),1.6);
      const pixels=samplerCtx.getImageData(0,0,cols,rows).data;
      const kernel=KERNELS[s.pattern as string]||KERNELS.floyd;
      (diffusedTexture as unknown as {image:Uint8Array}).image=diffuse(pixels,cols,rows,kernel,s.levels as number,s.palette==='rgb',grade);
      (diffusedTexture as unknown as {width:number}).width=cols;
      (diffusedTexture as unknown as {height:number}).height=rows;
      (diffusedTexture as unknown as {needsUpdate:boolean}).needsUpdate=true;
    };
    const frame=(now:number)=>{
      raf=0; const s=settingsRef.current; if(!s) return;
      const dt=Math.min(0.05,Math.max(0,(now-last)/1000)); last=now;
      const wanderOn=s.wander&&!reducedMotion;
      let targetX=pointer.x,targetY=pointer.y;
      if(!pointer.inside&&wanderOn){drift=Math.min(1,drift+dt/1.2);const [wx,wy]=wanderAt(now/1000,width,height);const k=drift*drift*(3-2*drift);targetX+=(wx-targetX)*k;targetY+=(wy-targetY)*k;}else drift=0;
      presence+=((pointer.inside||wanderOn?1:0)-presence)*(1-Math.exp(-dt/0.16));
      if(pointer.fresh){brush.x=brush.px=targetX;brush.y=brush.py=targetY;pointer.fresh=false;}
      else{const follow=1-Math.exp(-dt/0.035);brush.x+=(targetX-brush.x)*follow;brush.y+=(targetY-brush.y)*follow;}
      const burstData=viewU.uBursts.value as number[];
      burstData.fill(0);
      for(let i=bursts.length-1;i>=0;i--)if((now-bursts[i].start)/1000>=BURST_SECONDS)bursts.splice(i,1);
      bursts.forEach((b,i)=>{const k=Math.max(0,(now-b.start)/1000/BURST_SECONDS);const reach=Math.hypot(Math.max(b.x,width-b.x),Math.max(b.y,height-b.y))+viewU.uBurstWidth.value;burstData[i*4]=b.x;burstData[i*4+1]=b.y;burstData[i*4+2]=reach*Math.sin((k*Math.PI)/2);burstData[i*4+3]=1-k*k*k;});
      if(presence>0.002) trailUntil=now+(s.linger as number)*1000+150;
      const minFade=floatMask?0:1.5/255,fade=s.linger as number>0?dt/(s.linger as number):1;
      maskU.tPrev.value=masks[0].texture;
      maskU.uFrom.value=[brush.px,brush.py]; maskU.uTo.value=[brush.x,brush.y];
      maskU.uRadius.value=(s.revealRadius as number)*(0.45+0.55*presence); maskU.uSoftness.value=s.softness as number;
      maskU.uStrength.value=presence; maskU.uFade.value=Math.max(fade,minFade);
      viewU.uBurstWidth.value=Math.max(60,(s.revealRadius as number)*0.9);
      renderer.render({scene:maskMesh,target:masks[1]});
      masks.reverse(); brush.px=brush.x; brush.py=brush.y;
      const cell=Math.max(1,Math.round((s.pixelSize as number)*renderer.dpr));
      if(image) viewU.uCover.value=fitScale(canvas.width,canvas.height,image.naturalWidth,image.naturalHeight,s.fit==='contain');
      let patternIndex=ORDERED[s.pattern as string]??0;
      if(KERNELS[s.pattern as string]){patternIndex=0;if(image&&!diffusionBlocked){try{updateDiffusion(cell,s);patternIndex=3;}catch{diffusionBlocked=true;}}}
      if(patternIndex===1&&(noiseTexture as unknown as {width:number}).width!==64){(noiseTexture as unknown as {image:Uint8Array}).image=getBlueNoise();(noiseTexture as unknown as {width:number}).width=64;(noiseTexture as unknown as {height:number}).height=64;(noiseTexture as unknown as {needsUpdate:boolean}).needsUpdate=true;}
      const texelsPerPixel=image?(viewU.uCover.value as number[])[0]*image.naturalWidth/canvas.width:1;
      viewU.tMask.value=masks[0].texture; viewU.uCell.value=cell;
      viewU.uLod.value=Math.log2(Math.max(cell*texelsPerPixel,1)); viewU.uPattern.value=patternIndex;
      viewU.uPalette.value=s.palette==='rgb'?1:0; viewU.uLevels.value=Math.max(2,Math.round(s.levels as number));
      viewU.uInk.value=hexToRgb(s.inkColor as string); viewU.uPaper.value=hexToRgb(s.paperColor as string);
      viewU.uRimColor.value=hexToRgb(s.rimColor as string); viewU.uRim.value=Math.min(Math.max(s.rim as number,0),0.95);
      viewU.uContrast.value=s.contrast as number; viewU.uBrightness.value=s.brightness as number; viewU.uReverse.value=s.reverse?1:0;
      const intro=image?Math.min(1,(now-introStart)/INTRO_MS):0;
      viewU.uIntro.value=1-Math.pow(1-intro,2);
      renderer.render({scene:viewMesh});
      const busy=pointer.inside||(wanderOn as unknown as boolean)||presence>0.002||bursts.length>0||now<trailUntil||(!!image&&intro<1);
      if(busy&&visible) raf=requestAnimationFrame(frame);
    };
    const wake=()=>{if(raf||!visible)return;last=performance.now();raf=requestAnimationFrame(frame);};
    wakeRef.current=wake;
    const img=new Image(); img.crossOrigin='anonymous'; img.decoding='async';
    img.onload=()=>{image=img;(imageTexture as unknown as {image:HTMLImageElement}).image=img;try{if(samplerCtx){const edge=measureEdge(samplerCtx,img);viewU.uMatte.value=edge.matte;viewU.uKey.value=edge.plain?1:0;}}catch{}introStart=performance.now();wake();};
    img.src=src;
    const locate=(e:PointerEvent)=>{const r=container.getBoundingClientRect();pointer.x=e.clientX-r.left;pointer.y=e.clientY-r.top;pointer.placed=true;};
    const onMove=(e:PointerEvent)=>{locate(e);if(!pointer.inside){pointer.inside=true;pointer.fresh=true;}wake();};
    const onLeave=()=>{pointer.inside=false;wake();};
    const onDown=(e:PointerEvent)=>{onMove(e);if(!(settingsRef.current?.clickBurst)||(e.pointerType==='mouse'&&e.button!==0))return;bursts.push({x:pointer.x,y:pointer.y,start:performance.now()});if(bursts.length>MAX_BURSTS)bursts.shift();};
    container.addEventListener('pointermove',onMove,{passive:true});
    container.addEventListener('pointerenter',onMove,{passive:true});
    container.addEventListener('pointerdown',onDown,{passive:true});
    container.addEventListener('pointerleave',onLeave,{passive:true});
    container.addEventListener('pointercancel',onLeave,{passive:true});
    const ro=new ResizeObserver(()=>{layout();wake();}); ro.observe(container);
    const io=new IntersectionObserver(([e])=>{visible=e.isIntersecting;wake();}); io.observe(container);
    layout(); wake();
    return ()=>{
      cancelAnimationFrame(raf); wakeRef.current=()=>{};
      ro.disconnect(); io.disconnect(); img.onload=null;
      container.removeEventListener('pointermove',onMove); container.removeEventListener('pointerenter',onMove);
      container.removeEventListener('pointerdown',onDown); container.removeEventListener('pointerleave',onLeave);
      container.removeEventListener('pointercancel',onLeave);
      (gl.getExtension('WEBGL_lose_context') as unknown as {loseContext:()=>void})?.loseContext();
      if(canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };
  }, [src]);

  return <div ref={containerRef} className={`dither-veil ${className}`.trim()} style={style} />;
};

export default DitherVeil;
