import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

// Scroll journey keyframes: the blob travels, morphs and recolors
// as the visitor moves through the page (p = 0 top … 1 bottom)
const KEYFRAMES = [
  { p: 0.0, x: 1.7, y: 0.0, scale: 1.9, distort: 0.42, color: "#2450b8" },
  { p: 0.25, x: -2.4, y: 0.6, scale: 1.35, distort: 0.52, color: "#4338ca" },
  { p: 0.5, x: 2.4, y: 0.2, scale: 1.55, distort: 0.58, color: "#7c3aed" },
  { p: 0.75, x: -2.2, y: -0.4, scale: 1.25, distort: 0.46, color: "#0e7490" },
  { p: 1.0, x: 0.0, y: 0.2, scale: 2.1, distort: 0.36, color: "#2563eb" },
].map((k) => ({ ...k, color: new THREE.Color(k.color) }));

function sampleKeyframes(p, out) {
  const clamped = Math.min(Math.max(p, 0), 1);
  let a = KEYFRAMES[0];
  let b = KEYFRAMES[KEYFRAMES.length - 1];
  for (let i = 0; i < KEYFRAMES.length - 1; i++) {
    if (clamped >= KEYFRAMES[i].p && clamped <= KEYFRAMES[i + 1].p) {
      a = KEYFRAMES[i];
      b = KEYFRAMES[i + 1];
      break;
    }
  }
  const t = b.p === a.p ? 0 : (clamped - a.p) / (b.p - a.p);
  out.x = THREE.MathUtils.lerp(a.x, b.x, t);
  out.y = THREE.MathUtils.lerp(a.y, b.y, t);
  out.scale = THREE.MathUtils.lerp(a.scale, b.scale, t);
  out.distort = THREE.MathUtils.lerp(a.distort, b.distort, t);
  out.color.copy(a.color).lerp(b.color, t);
  return out;
}

function Blob({ scroll, mouse }) {
  const mesh = useRef();
  const material = useRef();
  const { viewport } = useThree();
  const target = useMemo(
    () => ({ x: 0, y: 0, scale: 1.9, distort: 0.42, color: new THREE.Color("#2450b8") }),
    []
  );
  // keep the journey on-screen on narrow viewports
  const xFactor = Math.min(1, viewport.width / 9);

  useFrame((state) => {
    if (!mesh.current || !material.current) return;
    sampleKeyframes(scroll.current, target);

    const targetX = target.x * xFactor + mouse.current[0] * 0.5;
    const targetY = target.y + mouse.current[1] * 0.35;

    // inertial trailing: ease toward the scroll-driven target
    mesh.current.position.x = THREE.MathUtils.lerp(mesh.current.position.x, targetX, 0.05);
    mesh.current.position.y = THREE.MathUtils.lerp(mesh.current.position.y, targetY, 0.05);
    const s = THREE.MathUtils.lerp(mesh.current.scale.x, target.scale, 0.05);
    mesh.current.scale.setScalar(s);

    mesh.current.rotation.y = state.clock.elapsedTime * 0.12 + scroll.current * 2.2;
    mesh.current.rotation.x = scroll.current * 0.9;

    material.current.color.lerp(target.color, 0.06);
    material.current.distort = THREE.MathUtils.lerp(
      material.current.distort,
      target.distort,
      0.06
    );
  });

  return (
    <mesh ref={mesh} position={[1.7, 0, -0.5]} scale={1.9}>
      <icosahedronGeometry args={[1, 48]} />
      <MeshDistortMaterial
        ref={material}
        color="#2450b8"
        emissive="#14235c"
        emissiveIntensity={0.5}
        roughness={0.12}
        metalness={0.92}
        distort={0.42}
        speed={1.6}
      />
    </mesh>
  );
}

function Particles({ scroll, mouse, count = 1100 }) {
  const points = useRef();

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 5 + Math.random() * 9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi) - 5;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!points.current) return;
    // scroll spins the whole field; mouse adds a gentle tilt
    points.current.rotation.y = state.clock.elapsedTime * 0.018 + scroll.current * 1.6;
    points.current.rotation.x = THREE.MathUtils.lerp(
      points.current.rotation.x,
      scroll.current * 0.5 + mouse.current[1] * 0.08,
      0.03
    );
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#60a5fa"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function CameraRig({ scroll }) {
  useFrame((state) => {
    // subtle dolly + tilt as the page scrolls
    state.camera.position.z = THREE.MathUtils.lerp(
      state.camera.position.z,
      6 - scroll.current * 0.6,
      0.05
    );
    state.camera.rotation.z = THREE.MathUtils.lerp(
      state.camera.rotation.z,
      scroll.current * 0.06,
      0.05
    );
  });
  return null;
}

export default function Background3D() {
  const scroll = useRef(0);
  const mouse = useRef([0, 0]);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scroll.current = max > 0 ? window.scrollY / max : 0;
    };
    const onPointerMove = (e) => {
      mouse.current = [
        (e.clientX / window.innerWidth) * 2 - 1,
        -((e.clientY / window.innerHeight) * 2 - 1),
      ];
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <div className="bg3d" aria-hidden="true">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.35} />
        <pointLight position={[6, 4, 6]} intensity={90} color="#3b82f6" />
        <pointLight position={[-6, -3, 4]} intensity={60} color="#8b5cf6" />
        <pointLight position={[0, 5, -4]} intensity={40} color="#22d3ee" />
        <CameraRig scroll={scroll} />
        <Blob scroll={scroll} mouse={mouse} />
        <Particles scroll={scroll} mouse={mouse} />
      </Canvas>
    </div>
  );
}
