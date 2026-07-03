import { useEffect, useRef } from "react";
import * as THREE from "three";

/* ============================================================
   Prism Streaks — full-screen fragment-shader background.
   Curved chromatic light filaments lean toward the cursor,
   with a pool of sparkle dust following the pointer.
   ============================================================ */

const CONFIG = {
  coreColor: 0x0033ff,
  warmFringe: 0xff5900,
  coolFringe: 0x00aeff,
  dustColor: 0xff8929,
  bgColor: 0x000000,
  bgTint: 0x000529,
  speed: 2.0,
  twist: 5.0,
  bend: 0.06,
  waist: 0.0,
  width: 0.33,
  dispersion: 0.048,
  brightness: 1.19,
  dustAmount: 1.28,
  dustRadius: 0.44,
  exposure: 1.97,
  mouseLean: 0.06,
  mainAlpha: 2.0,
};

const VERTEX = /* glsl */ `
void main() { gl_Position = vec4(position, 1.0); }
`;

const FRAGMENT = /* glsl */ `
uniform float iTime, iAlpha;
uniform vec2  iResolution, uMouse;
uniform vec3  uCore, uWarm, uCool, uDust, uBg, uBgTint;
uniform float uSpeed, uTwist, uBend, uWaist, uWidth, uDisperse, uBright, uDustAmt, uDustRadius, uExposure, uLean;

const int STREAKS = 34;   // constant loop bound — density fixed; art-direct via uWidth/uBright

float hash(float n){ return fract(sin(n) * 43758.5453123); }
float hash2(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

// thin bright filament profile around a signed distance e (sharp core, soft tails)
float fila(float e, float th){ float v = th / (abs(e) + th); return v * v; }

// chromatic streak field — one bundle of curved vertical filaments
vec3 field(vec2 p, float t){
  vec3 acc = vec3(0.0);
  float flow = t * uSpeed;
  float sway = uMouse.x * uLean;                              // cursor leans the bundle
  float env  = mix(uWaist, 1.0, smoothstep(0.0, 0.95, abs(p.y - uMouse.y * 0.5)));  // waist follows cursor.y
  for (int i = 0; i < STREAKS; i++){
    float fi = float(i);
    float s1 = hash(fi * 1.37);
    float s2 = hash(fi * 2.11 + 5.3);
    float lane = s1 * 2.0 - 1.0;
    float bend = sin(p.y * uTwist + s2 * 6.2831 + t * (0.3 + 0.5 * s2)) * uBend;
    float x = lane * uWidth * env + bend + sway * (0.6 + 0.4 * s1);
    float th = mix(0.0035, 0.016, s2);
    float dx = p.x - x;
    float disp = uDisperse * (0.25 + abs(dx) * 2.0);          // dispersion grows toward the fringe
    float cr = fila(dx + disp, th);
    float cg = fila(dx, th);
    float cb = fila(dx - disp, th);
    float fl = (0.45 + 0.55 * sin(p.y * 7.0 - flow * (0.6 + s1) + s2 * 15.0))
             * (0.6 + 0.4 * sin(p.y * 2.0 + s1 * 9.0 - flow * 0.3));   // streaking dashes along length
    float bright = (0.35 + 0.85 * s2) * uBright * max(fl, 0.0);
    acc += (cr * uWarm + cg * uCore + cb * uCool) * bright;
  }
  return acc;
}

// drifting sparkle dust — randomised position/size/brightness per cell (no grid feel)
float dust(vec2 uv, float t){
  vec2 q = uv * 130.0; q.y += t * uSpeed * 9.0;
  vec2 ip = floor(q), fp = fract(q);
  vec2 jit = vec2(hash2(ip), hash2(ip + 31.7));    // random sparkle pos inside the cell
  float d  = length(fp - jit);
  float on = step(0.80, hash2(ip + 13.1));         // ~20% of cells lit, scattered
  float sz = mix(0.05, 0.22, hash2(ip + 7.3));     // random grain size
  float br = 0.35 + 0.65 * hash2(ip + 53.9);       // random brightness
  float tw = 0.5 + 0.5 * sin(t * 6.0 + hash2(ip) * 40.0);
  return smoothstep(sz, 0.0, d) * on * br * tw;
}

void main(){
  vec2 uv = (2.0 * gl_FragCoord.xy - iResolution.xy) / iResolution.y;
  float t = iTime;
  vec2 p = uv * (1.0 + 0.02 * sin(t * 0.2));                  // gentle breathing

  // dark scene-coloured radial gradient (not flat black)
  float rg = length(uv * vec2(0.6, 0.45));
  vec3 col = mix(uBgTint, uBg, smoothstep(0.0, 1.4, rg));

  col += field(p, t);                                        // the prism filaments

  // sparkle dust ONLY in a soft pool that follows the cursor
  float md = length(uv - uMouse);
  float dustMask = exp(-md * md / (uDustRadius * uDustRadius));
  col += uDust * dust(uv, t) * uDustAmt * dustMask;

  col += uCore * exp(-md * md * 6.0) * 0.10;                 // soft glow under the cursor

  col = vec3(1.0) - exp(-col * uExposure);                   // filmic-ish rolloff: cores burn to white
  gl_FragColor = vec4(col, iAlpha);
}
`;

const hex2v3 = (h) =>
  new THREE.Vector3(((h >> 16) & 255) / 255, ((h >> 8) & 255) / 255, (h & 255) / 255);

export default function PrismBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

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

    const uniforms = {
      iTime: { value: 0 },
      iAlpha: { value: 0 },
      iResolution: { value: new THREE.Vector2(1, 1) },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uCore: { value: hex2v3(CONFIG.coreColor) },
      uWarm: { value: hex2v3(CONFIG.warmFringe) },
      uCool: { value: hex2v3(CONFIG.coolFringe) },
      uDust: { value: hex2v3(CONFIG.dustColor) },
      uBg: { value: hex2v3(CONFIG.bgColor) },
      uBgTint: { value: hex2v3(CONFIG.bgTint) },
      uSpeed: { value: CONFIG.speed },
      uTwist: { value: CONFIG.twist },
      uBend: { value: CONFIG.bend },
      uWaist: { value: CONFIG.waist },
      uWidth: { value: CONFIG.width },
      uDisperse: { value: CONFIG.dispersion },
      uBright: { value: CONFIG.brightness },
      uDustAmt: { value: CONFIG.dustAmount },
      uDustRadius: { value: CONFIG.dustRadius },
      uExposure: { value: CONFIG.exposure },
      uLean: { value: CONFIG.mouseLean },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: VERTEX,
      fragmentShader: FRAGMENT,
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });

    const geometry = new THREE.PlaneGeometry(4, 4);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.frustumCulled = false;
    scene.add(mesh);

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      renderer.setPixelRatio(dpr);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      uniforms.iResolution.value.set(w * dpr, h * dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const mouseTarget = new THREE.Vector2(0, 0);
    const onPointerMove = (e) => {
      mouseTarget.set(
        (2 * e.clientX - window.innerWidth) / window.innerHeight,
        -(2 * e.clientY - window.innerHeight) / window.innerHeight
      );
    };
    window.addEventListener("pointermove", onPointerMove);

    let firstFrame = 0;
    renderer.setAnimationLoop(() => {
      const now = performance.now();
      if (!firstFrame) firstFrame = now;
      const elapsed = now - firstFrame;

      uniforms.uMouse.value.lerp(mouseTarget, 0.3);
      uniforms.iTime.value = now / 1000;
      uniforms.iAlpha.value =
        Math.min(Math.max((elapsed - 400) / 1000, 0), 1) * CONFIG.mainAlpha;

      renderer.render(scene, camera);
    });

    return () => {
      renderer.setAnimationLoop(null);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="bg3d" aria-hidden="true" />;
}
