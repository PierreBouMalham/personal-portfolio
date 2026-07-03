import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { GammaCorrectionShader } from "three/examples/jsm/shaders/GammaCorrectionShader.js";
import { CopyShader } from "three/examples/jsm/shaders/CopyShader.js";

/* ============================================================
   Pinwheel Galaxy — ~120k additive points in a logarithmic
   spiral with differential rotation. Page scroll dives the
   camera into the core, accelerates the spin, expands the disc
   and injects chaos; the cursor pushes points aside.
   ============================================================ */

const CONFIG = {
  atmoColor: "#ffd9f2",
  atmoCount: 200,
  atmoSize: 22,
  atmoSpeed: 0.8,
  coreColor: "#ffd1f5",
  midColor: "#c026d3",
  rimColor: "#1a0833",
  armAccent: "#33f59a",
  bulgeColor: "#ffb3ec",
  armCount: 6,
  coreConcentration: 1.15,
  armSpread: 0.29,
  windingFactor: 2.25,
  spinSpeed: 0.06,
  coreSoftening: 0.02,
  gradientPow: 0.8,
  shimmerSpeed: 1,
  shimmerAmount: 0.35,
  pointerRadius: 0.35,
  pointerStrength: 0.5,
  scrollDiveZ: 3.5,
  scrollSpin: 4,
  scrollExpand: 0.4,
  scrollChaos: 0.5,
  sparkColor: "#ffe066",
  sparkColorTop: "#ff7ae0",
  sparkCount: 5000,
  sparkRise: 0.17,
  sparkSpeed: 0.22,
  sparkSize: 33,
  cornerBlue: "#1a0833",
  cornerOrange: "#3a0d5a",
};

const LAYERS = { NONE: 0, TORUS_SCENE: 1, BLOOM_SCENE: 2, ENTIRE_SCENE: 3 };

const Lerp = (a, b, t = 0.075) => a + (b - a) * t;
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

function hexToVec3(hex) {
  const n = parseInt(hex.slice(1), 16);
  return new THREE.Vector3(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255);
}

/* ---------------- shaders — arms ---------------- */

const ARMS_VERT = /* glsl */ `
attribute float size; attribute float id;
uniform float iTime; uniform float iAnimate; uniform float uExpand;
uniform vec2 iMouse; uniform float uSpinPhase; uniform float uWinding;
uniform float uCoreSoftening; uniform float uChaos; uniform float uR;
uniform float uAspect; uniform float uPointerRadius; uniform float uPointerStrength;
varying float vR; varying float vAngle;
void main() {
  float r = position.x;
  float h = position.y;
  float baseAngle = position.z;
  float ang = baseAngle + uWinding * r + uSpinPhase / (r + uCoreSoftening);
  float rr = r * uExpand;
  vec3 p = vec3(rr * cos(ang), h, rr * sin(ang));
  vec3 jitter = vec3(
    fract(sin(id * 12.9898) * 43758.5453) - 0.5,
    fract(sin(id * 78.233 ) * 12345.6789) - 0.5,
    fract(sin(id * 39.123 ) * 65432.1234) - 0.5
  );
  p += jitter * uChaos;
  vR = clamp(r / uR, 0.0, 1.0);
  vAngle = ang;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_PointSize = size / -mv.z * (0.5 + 0.5 * iAnimate);
  vec4 res = projectionMatrix * mv;
  // pointer repulsion in NDC, aspect-corrected so it tracks the cursor exactly
  vec2 ndc = res.xy / res.w;
  vec2 diff = ndc - iMouse;
  float pdist = length(diff * vec2(uAspect, 1.0));
  float f = clamp(uPointerRadius - pdist, 0.0, 1.0);
  vec2 dir = length(diff) > 1e-4 ? normalize(diff) : vec2(0.0);
  res.xy += dir * (f * f * uPointerStrength) * res.w;
  // staggered appear
  float a = pow(iAnimate, 0.6);
  res.xy *= clamp(2.0 * a + pow(id, 0.7) - 1.0, 0.0, 1.0);
  gl_Position = res;
}
`;

const ARMS_FRAG = /* glsl */ `
uniform float iTime; uniform float uOpacity;
uniform vec3 uCore; uniform vec3 uMid; uniform vec3 uRim; uniform vec3 uAccent;
uniform float uGradientPow; uniform float uShimmerSpeed; uniform float uShimmerAmount;
uniform float uArmCount;
varying float vR; varying float vAngle;
vec3 grad3(vec3 a, vec3 b, vec3 c, float t) {
  return t < 0.5 ? mix(a, b, t * 2.0) : mix(b, c, clamp((t - 0.5) * 2.0, 0.0, 1.0));
}
void main() {
  float t = pow(vR, uGradientPow);
  vec3 col = grad3(uCore, uMid, uRim, t);
  float sh = 0.5 + 0.5 * sin(vAngle * uArmCount - iTime * uShimmerSpeed);
  col = mix(col, uAccent, sh * uShimmerAmount * (1.0 - t));
  col *= (0.45 + 0.7 * (1.0 - t));
  float tex = 1.0 - smoothstep(0.5, 1.0, length(2.0 * gl_PointCoord - 1.0));
  gl_FragColor = vec4(col * tex, tex * uOpacity);
}
`;

/* ---------------- shaders — bulge ---------------- */

const BULGE_VERT = /* glsl */ `
attribute float size; attribute float id;
uniform float iTime; uniform float iAnimate; uniform float uExpand;
uniform vec2 iMouse; uniform float uAspect; uniform float uPointerRadius; uniform float uPointerStrength;
varying float vId;
void main() {
  vId = id;
  vec3 p = position * uExpand;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_PointSize = size / -mv.z * (0.8 + 0.2 * sin(iTime * (1.0 + id) * 2.0)) * (0.5 + 0.5 * iAnimate);
  vec4 res = projectionMatrix * mv;
  float a = pow(iAnimate, 0.9);
  res.xy *= clamp(2.0 * a + pow(id, 0.7) - 1.0, 0.0, 1.0);
  vec2 pndc = res.xy / res.w;
  vec2 pdiff = pndc - iMouse;
  float pdist = length(pdiff * vec2(uAspect, 1.0));
  float pf = clamp(uPointerRadius - pdist, 0.0, 1.0);
  vec2 pdir = length(pdiff) > 1e-4 ? normalize(pdiff) : vec2(0.0);
  res.xy += pdir * (pf * pf * uPointerStrength) * res.w;
  gl_Position = res;
}
`;

const BULGE_FRAG = /* glsl */ `
uniform float uOpacity; uniform vec3 uCore; varying float vId;
void main() {
  float tex = 1.0 - smoothstep(0.2, 1.0, length(2.0 * gl_PointCoord - 1.0));
  gl_FragColor = vec4(uCore * tex * 0.7, tex * (0.5 + 0.5 * vId) * uOpacity);
}
`;

/* ---------------- shaders — sparks ---------------- */

const SPARKS_VERT = /* glsl */ `
attribute float size; attribute float speed;
uniform float iTime; uniform float iAnimate; uniform float uExpand;
uniform float uSpinPhase; uniform float uWinding; uniform float uCoreSoftening;
uniform float uSparkRise; uniform float uSparkSpeed; uniform float uSparkSize;
uniform vec2 iMouse; uniform float uAspect; uniform float uPointerRadius; uniform float uPointerStrength;
varying float vLife;
void main() {
  float r = position.x;
  float baseAngle = position.y;
  float seed = position.z;
  // ride the same differential-rotation arm angle the lines use
  float ang = baseAngle + uWinding * r + uSpinPhase / (r + uCoreSoftening);
  float rr = r * uExpand;
  // looping lifecycle: 0 = just left the line, 1 = faded out at the top
  float life = fract(iTime * uSparkSpeed * speed + seed);
  vLife = life;
  float rise = life * uSparkRise;          // lift off the disc along local up
  vec3 p = vec3(rr * cos(ang), rise, rr * sin(ang));
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  // shrink as it rises so it reads as a dissipating ember
  gl_PointSize = size * uSparkSize / -mv.z * (1.0 - 0.55 * life) * (0.4 + 0.6 * iAnimate);
  vec4 res = projectionMatrix * mv;
  vec2 pndc = res.xy / res.w;
  vec2 pdiff = pndc - iMouse;
  float pdist = length(pdiff * vec2(uAspect, 1.0));
  float pf = clamp(uPointerRadius - pdist, 0.0, 1.0);
  vec2 pdir = length(pdiff) > 1e-4 ? normalize(pdiff) : vec2(0.0);
  res.xy += pdir * (pf * pf * uPointerStrength) * res.w;
  gl_Position = res;
}
`;

const SPARKS_FRAG = /* glsl */ `
uniform float uOpacity; uniform vec3 uSpark; uniform vec3 uSparkTop;
varying float vLife;
void main() {
  // warm yellow at birth, cooling to pink as it climbs
  vec3 col = mix(uSpark, uSparkTop, smoothstep(0.0, 0.9, vLife));
  // fade in fast, ease out — never pops, never lingers
  float fade = sin(clamp(vLife, 0.0, 1.0) * 3.14159265);
  float tex = 1.0 - smoothstep(0.15, 1.0, length(2.0 * gl_PointCoord - 1.0));
  gl_FragColor = vec4(col * tex, tex * fade * uOpacity);
}
`;

/* ---------------- shaders — ambient motes ---------------- */

const MOTES_VERT = /* glsl */ `
attribute float size; attribute float seed; uniform float uTime; uniform vec2 uRes;
varying float vA;
vec3 warp(vec3 p, float t){ float c=0.9,a=1.9,b=0.02,s=0.05; p*=2.;
  p.x+=c*sin(s*t+a*p.y)+t*b; p.y+=c*cos(s*t+a*p.x); p.y+=c*sin(s*t+a*p.z)+t*b;
  p.z+=c*cos(s*t+a*p.y); p.z+=c*sin(s*t+a*p.x)+t*b; p.x+=c*cos(s*t+a*p.z);
  return cos(p+vec3(1,2,4)); }
void main(){
  vec3 v = position*4.0 + warp(position, uTime)*1.2;
  vec4 mv = modelViewMatrix * vec4(v, 1.0);
  float r = length(v); float farF = 1.0 - smoothstep(5.0, 6.5, r); float nearF = smoothstep(0.0, 0.5, -mv.z);
  vA = farF * nearF;
  gl_PointSize = size * uRes.y / 900.0 / -mv.z; gl_PointSize = max(gl_PointSize, 1.0);
  gl_Position = projectionMatrix * mv;
}
`;

const MOTES_FRAG = /* glsl */ `
uniform vec3 uColor; varying float vA;
void main(){ vec2 p = gl_PointCoord - 0.5; float l = length(p); if (l > 0.5) discard;
  float tex = smoothstep(0.5, 0.0, l); gl_FragColor = vec4(uColor * tex, tex * vA * 0.55); }
`;

/* ---------------- FinalPass composite (corner warp-glow) ---------------- */

const FinalPass = {
  uniforms: {
    iTime: { value: 0 },
    tDiffuse: { value: null },
    torusTexture: { value: null },
    bloomTexture: { value: null },
    haloTexture: { value: null },
    iCornerBlue: { value: hexToVec3(CONFIG.cornerBlue) },
    iCornerOrange: { value: hexToVec3(CONFIG.cornerOrange) },
  },
  vertexShader: /* glsl */ `
varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position, 1.0); }
`,
  fragmentShader: /* glsl */ `
uniform float iTime; uniform sampler2D tDiffuse; uniform sampler2D bloomTexture; uniform sampler2D torusTexture; uniform sampler2D haloTexture;
uniform vec3 iCornerBlue; uniform vec3 iCornerOrange; varying vec2 vUv;
vec3 warp3d(vec3 pos, float t) {
  float curv = .8, a = 1.9, b = 0.7; pos *= 2.;
  pos.x += curv * sin(t + a * pos.y) + t * b; pos.y += curv * cos(t + a * pos.x);
  pos.y += curv * sin(t + a * pos.z) + t * b; pos.z += curv * cos(t + a * pos.y);
  pos.z += curv * sin(t + a * pos.x) + t * b; pos.x += curv * cos(t + a * pos.z);
  return 0.5 + 0.5 * cos(pos.xyz + vec3(1, 2, 4));
}
void main() {
  vec2 uv = 2. * vUv - 1.;
  vec3 w = pow(warp3d(vec3(uv.x, sin(uv.y), uv.y), iTime * 1.5), vec3(1.5));
  vec3 col = 1.5 * iCornerBlue * w.x; col *= w.y; col += iCornerOrange * w.z;
  col *= smoothstep(0.6, 1., abs(uv.y));
  col *= smoothstep(-.5, 1., -uv.y * uv.x); col *= smoothstep(-.5, 1., -uv.y * uv.x);
  vec3 halo = texture2D(haloTexture, vUv).xyz;
  vec3 atmoBg = vec3(0.06, 0.02, 0.10) * (1.0 - 0.4 * length(uv));
  gl_FragColor = vec4(atmoBg + col * 0.2 + texture2D(bloomTexture, vUv).xyz + texture2D(torusTexture, vUv).xyz + texture2D(tDiffuse, vUv).xyz + halo, 1.);
}
`,
};

/* ---------------- geometry builders ---------------- */

const R = 1.9; // disc radius
const H = 0.12; // disc half-thickness
const COUNT = { arms: 120000, bulge: 2500 };

function buildArmsGeometry() {
  const N = COUNT.arms;
  const positions = new Float32Array(N * 3);
  const sizes = new Float32Array(N);
  const ids = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    const arm = Math.floor(Math.random() * CONFIG.armCount);
    const r = R * Math.pow(Math.random(), CONFIG.coreConcentration);
    const armOffset = arm * ((2 * Math.PI) / CONFIG.armCount);
    const scatter = (Math.random() + Math.random() - 1) * CONFIG.armSpread;
    const baseAngle = armOffset + scatter;
    const h = (Math.random() * 2 - 1) * H * (0.25 + (1 - r / R));
    // polar storage: x = radius, y = height, z = base angle
    positions[i * 3] = r;
    positions[i * 3 + 1] = h;
    positions[i * 3 + 2] = baseAngle;
    sizes[i] = 5 + 9 * Math.random();
    ids[i] = Math.random();
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
  geo.setAttribute("id", new THREE.BufferAttribute(ids, 1));
  return geo;
}

function buildBulgeGeometry() {
  const N = COUNT.bulge;
  const positions = new Float32Array(N * 3);
  const sizes = new Float32Array(N);
  const ids = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    const rr = 0.32 * Math.pow(Math.random(), 1.5);
    const a = Math.random() * 2 * Math.PI;
    const u = Math.random() * 2 - 1;
    positions[i * 3] = rr * Math.sin(a);
    positions[i * 3 + 1] = u * 0.12 * (1 - rr / 0.32);
    positions[i * 3 + 2] = rr * Math.cos(a);
    sizes[i] = 12 + 14 * Math.random();
    ids[i] = Math.random();
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
  geo.setAttribute("id", new THREE.BufferAttribute(ids, 1));
  return geo;
}

function buildSparksGeometry() {
  const N = CONFIG.sparkCount;
  const positions = new Float32Array(N * 3);
  const sizes = new Float32Array(N);
  const speeds = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    const arm = Math.floor(Math.random() * CONFIG.armCount);
    const r = R * Math.pow(Math.random(), CONFIG.coreConcentration);
    const armOffset = arm * ((2 * Math.PI) / CONFIG.armCount);
    const scatter = (Math.random() + Math.random() - 1) * CONFIG.armSpread;
    // polar storage: x = radius, y = base angle, z = phase seed
    positions[i * 3] = r;
    positions[i * 3 + 1] = armOffset + scatter;
    positions[i * 3 + 2] = Math.random();
    sizes[i] = 0.6 + 0.8 * Math.random();
    speeds[i] = 0.6 + 0.9 * Math.random();
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
  geo.setAttribute("speed", new THREE.BufferAttribute(speeds, 1));
  return geo;
}

function buildMotesGeometry() {
  const N = Math.round(CONFIG.atmoCount);
  const positions = new Float32Array(N * 3);
  const sizes = new Float32Array(N);
  const seeds = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    positions[i * 3] = 2 * Math.random() - 1;
    positions[i * 3 + 1] = 2 * Math.random() - 1;
    positions[i * 3 + 2] = 2 * Math.random() - 1;
    sizes[i] = CONFIG.atmoSize * (0.4 + Math.random());
    seeds[i] = Math.random();
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
  geo.setAttribute("seed", new THREE.BufferAttribute(seeds, 1));
  return geo;
}

export default function GalaxyBackground() {
  const canvasRef = useRef(null);
  const veilRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const veil = veilRef.current;

    /* ---- raw cursor in pixels ---- */
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", onMouseMove);

    /* ---- renderer / scene / camera ---- */
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.VSMShadowMap;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    scene.fog = new THREE.Fog(0x000000, 0, 15);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      80
    );
    camera.position.set(0, 0, 3);
    camera.layers.enable(LAYERS.TORUS_SCENE);
    camera.layers.enable(LAYERS.BLOOM_SCENE);
    camera.layers.enable(LAYERS.ENTIRE_SCENE);
    scene.add(camera);

    /* ---- shared uniforms ---- */
    const common = {
      iTime: { value: 0 },
      iAnimate: { value: 0 },
      uOpacity: { value: 1 },
      uExpand: { value: 1 },
    };
    const mouseCurrent = new THREE.Vector3(0, 0, 0); // smoothed pointer in NDC
    const aspect = window.innerWidth / window.innerHeight;

    const pointerUniforms = () => ({
      iMouse: { value: mouseCurrent },
      uAspect: { value: aspect },
      uPointerRadius: { value: CONFIG.pointerRadius },
      uPointerStrength: { value: CONFIG.pointerStrength },
    });

    /* ---- galaxy group: arms + bulge + sparks ---- */
    const instance = new THREE.Group();
    const POSITION = { visible: [0, 0, 0], hidden: [0, 0, -20] };
    const PARTICLE_POSITION = [0, 0, -0.8];
    const PARTICLE_ROTATION = [0.55, 0, 0];
    instance.position.set(...POSITION.hidden);

    const matArms = new THREE.ShaderMaterial({
      uniforms: {
        ...common,
        ...pointerUniforms(),
        uSpinPhase: { value: 0 },
        uWinding: { value: CONFIG.windingFactor },
        uCoreSoftening: { value: CONFIG.coreSoftening },
        uChaos: { value: 0 },
        uR: { value: R },
        uArmCount: { value: CONFIG.armCount },
        uCore: { value: hexToVec3(CONFIG.coreColor) },
        uMid: { value: hexToVec3(CONFIG.midColor) },
        uRim: { value: hexToVec3(CONFIG.rimColor) },
        uAccent: { value: hexToVec3(CONFIG.armAccent) },
        uGradientPow: { value: CONFIG.gradientPow },
        uShimmerSpeed: { value: CONFIG.shimmerSpeed },
        uShimmerAmount: { value: CONFIG.shimmerAmount },
      },
      vertexShader: ARMS_VERT,
      fragmentShader: ARMS_FRAG,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      transparent: true,
    });

    const matBulge = new THREE.ShaderMaterial({
      uniforms: {
        ...common,
        ...pointerUniforms(),
        uCore: { value: hexToVec3(CONFIG.bulgeColor) },
      },
      vertexShader: BULGE_VERT,
      fragmentShader: BULGE_FRAG,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      transparent: true,
    });

    const matSparks = new THREE.ShaderMaterial({
      uniforms: {
        ...common,
        ...pointerUniforms(),
        uSpinPhase: { value: 0 },
        uWinding: { value: CONFIG.windingFactor },
        uCoreSoftening: { value: CONFIG.coreSoftening },
        uSparkRise: { value: CONFIG.sparkRise },
        uSparkSpeed: { value: CONFIG.sparkSpeed },
        uSparkSize: { value: CONFIG.sparkSize },
        uSpark: { value: hexToVec3(CONFIG.sparkColor) },
        uSparkTop: { value: hexToVec3(CONFIG.sparkColorTop) },
      },
      vertexShader: SPARKS_VERT,
      fragmentShader: SPARKS_FRAG,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      transparent: true,
    });

    const geoArms = buildArmsGeometry();
    const geoBulge = buildBulgeGeometry();
    const geoSparks = buildSparksGeometry();

    for (const [geo, mat] of [
      [geoArms, matArms],
      [geoBulge, matBulge],
      [geoSparks, matSparks],
    ]) {
      const cloud = new THREE.Points(geo, mat);
      cloud.position.set(...PARTICLE_POSITION);
      cloud.rotation.set(...PARTICLE_ROTATION);
      cloud.layers.enable(LAYERS.ENTIRE_SCENE);
      instance.add(cloud);
    }
    scene.add(instance);

    /* ---- ambient motes (camera-attached drifters) ---- */
    const matMotes = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: hexToVec3(CONFIG.atmoColor) },
        uRes: {
          value: new THREE.Vector2(
            window.innerWidth * window.devicePixelRatio,
            window.innerHeight * window.devicePixelRatio
          ),
        },
      },
      vertexShader: MOTES_VERT,
      fragmentShader: MOTES_FRAG,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      depthTest: false,
    });
    const geoMotes = buildMotesGeometry();
    const motes = new THREE.Points(geoMotes, matMotes);
    motes.frustumCulled = false;
    motes.layers.enable(LAYERS.ENTIRE_SCENE);
    motes.onBeforeRender = () => {
      const t = performance.now() / 1000;
      matMotes.uniforms.uTime.value = t * CONFIG.atmoSpeed * 8.0;
      motes.position.copy(camera.position);
      finalPass.uniforms.iTime.value = t;
    };
    scene.add(motes);

    /* ---- postprocessing: three composers ---- */
    const size = new THREE.Vector2(window.innerWidth, window.innerHeight);
    const renderScene = new RenderPass(scene, camera);

    const torusComposer = new EffectComposer(renderer);
    torusComposer.renderToScreen = false;
    torusComposer.addPass(renderScene);
    torusComposer.addPass(new ShaderPass(GammaCorrectionShader));
    torusComposer.addPass(new UnrealBloomPass(size.clone(), 0.22, 0.2, 0));
    torusComposer.addPass(new ShaderPass(CopyShader));

    const bloomComposer = new EffectComposer(renderer);
    bloomComposer.renderToScreen = false;
    bloomComposer.addPass(renderScene);
    bloomComposer.addPass(new UnrealBloomPass(size.clone(), 0.38, 0.55, 0));
    bloomComposer.addPass(new ShaderPass(GammaCorrectionShader));

    const finalPass = new ShaderPass(FinalPass);
    finalPass.uniforms.bloomTexture.value = bloomComposer.renderTarget1.texture;
    finalPass.uniforms.torusTexture.value = torusComposer.renderTarget1.texture;

    const finalComposer = new EffectComposer(renderer);
    finalComposer.addPass(renderScene);
    finalComposer.addPass(finalPass);

    /* ---- scroll → normalized progress (whole page drives the dive) ---- */
    let scrollTarget = 0;
    let scrollCurrent = 0;
    /* readability veil: clear over the hero, ~60% dark once content arrives */
    const VEIL_MAX = 0.6;
    let veilTarget = 0;
    let veilCurrent = 0;
    const updateScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollTarget = max > 0 ? clamp(window.scrollY / max, 0, 1) : 0;
      veilTarget = clamp(window.scrollY / (window.innerHeight * 0.8), 0, 1) * VEIL_MAX;
    };
    window.addEventListener("scroll", updateScroll, { passive: true });
    updateScroll();
    const baseCameraZ = camera.position.z;

    /* ---- pointer → NDC ---- */
    const getScenePointer = () =>
      new THREE.Vector3(
        (mouse.x / canvas.clientWidth) * 2 - 1,
        (mouse.y / canvas.clientHeight) * -2 + 1,
        0.5
      );

    /* ---- appear-in + per-frame update ---- */
    const startTime = performance.now();
    let spinPhase = 0;
    let t0 = performance.now() / 1000;

    const galaxyRender = (scrollT) => {
      const t = performance.now() / 1000;
      const dt = Math.min(0.05, t - t0); // clamp dt so a slow frame doesn't jump the phase
      t0 = t;
      spinPhase += CONFIG.spinSpeed * (1 + scrollT * CONFIG.scrollSpin) * dt;
      common.iTime.value = t;
      common.uExpand.value = 1 + scrollT * CONFIG.scrollExpand;
      matArms.uniforms.uSpinPhase.value = spinPhase;
      matSparks.uniforms.uSpinPhase.value = spinPhase;
      matArms.uniforms.uChaos.value = scrollT * scrollT * CONFIG.scrollChaos;
      const target = getScenePointer();
      mouseCurrent.x = Lerp(mouseCurrent.x, target.x, 0.09);
      mouseCurrent.y = Lerp(mouseCurrent.y, target.y, 0.09);
    };

    /* ---- resize ---- */
    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const dpr = window.devicePixelRatio;
      renderer.setPixelRatio(dpr);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      for (const composer of [torusComposer, bloomComposer, finalComposer]) {
        composer.setPixelRatio(dpr);
        composer.setSize(w, h);
      }
      for (const m of [matArms, matBulge, matSparks]) {
        m.uniforms.uAspect.value = w / h;
      }
      matMotes.uniforms.uRes.value.set(w * dpr, h * dpr);
      updateScroll();
    };
    onResize();
    window.addEventListener("resize", onResize);

    /* ---- render loop ---- */
    let rafId;
    const render = () => {
      rafId = requestAnimationFrame(render);

      // appear-in: slide hidden→visible + staggered shader appear
      const now = performance.now();
      const tSlide = clamp((now - startTime - 500) / 1500, 0, 1);
      const eased = 1 - Math.pow(1 - tSlide, 4);
      instance.position.z = Lerp(POSITION.hidden[2], POSITION.visible[2], eased);
      common.uOpacity.value = eased;
      const tAnim = clamp((now - startTime) / 2000, 0, 1);
      common.iAnimate.value = tAnim * tAnim * (3 - 2 * tAnim);

      scrollCurrent = Lerp(scrollCurrent, scrollTarget, 0.08);
      veilCurrent = Lerp(veilCurrent, veilTarget, 0.08);
      veil.style.opacity = veilCurrent.toFixed(3);
      camera.position.z = baseCameraZ - scrollCurrent * CONFIG.scrollDiveZ;
      galaxyRender(scrollCurrent);
      finalPass.uniforms.iTime.value = now / 1000;

      camera.layers.set(LAYERS.TORUS_SCENE);
      torusComposer.render();
      camera.layers.set(LAYERS.BLOOM_SCENE);
      bloomComposer.render();
      camera.layers.set(LAYERS.ENTIRE_SCENE);
      finalComposer.render();
    };
    render();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", onResize);
      for (const composer of [torusComposer, bloomComposer, finalComposer]) {
        composer.dispose();
      }
      for (const geo of [geoArms, geoBulge, geoSparks, geoMotes]) geo.dispose();
      for (const mat of [matArms, matBulge, matSparks, matMotes]) mat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="bg3d"
        aria-hidden="true"
        style={{ width: "100vw", height: "100vh", display: "block" }}
      />
      {/* readability veil — dims the scene under content, stays clear at the hero */}
      <div
        ref={veilRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          background: "#05030a",
          opacity: 0,
          pointerEvents: "none",
        }}
      />
    </>
  );
}
