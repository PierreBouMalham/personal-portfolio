import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

// Morphing liquid-metal blob that drifts toward the cursor
function Blob({ mouse }) {
  const mesh = useRef();
  const { viewport } = useThree();
  // sit to the right on wide screens, center on narrow ones
  const baseX = viewport.width > 7 ? 1.7 : 0;

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.12;
    mesh.current.position.x = THREE.MathUtils.lerp(
      mesh.current.position.x,
      baseX + mouse.current[0] * 0.5,
      0.025
    );
    mesh.current.position.y = THREE.MathUtils.lerp(
      mesh.current.position.y,
      mouse.current[1] * 0.4,
      0.025
    );
  });

  return (
    <Float speed={1.4} rotationIntensity={0.5} floatIntensity={1.1}>
      <mesh ref={mesh} position={[1.7, 0, -0.5]} scale={1.9}>
        <icosahedronGeometry args={[1, 48]} />
        <MeshDistortMaterial
          color="#2450b8"
          emissive="#14235c"
          emissiveIntensity={0.5}
          roughness={0.12}
          metalness={0.92}
          distort={0.42}
          speed={1.6}
        />
      </mesh>
    </Float>
  );
}

// Slowly rotating starfield surrounding the scene
function Particles({ mouse, count = 1100 }) {
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

  useFrame((_, delta) => {
    if (!points.current) return;
    points.current.rotation.y += delta * 0.018;
    points.current.rotation.x = THREE.MathUtils.lerp(
      points.current.rotation.x,
      mouse.current[1] * 0.08,
      0.02
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

export default function HeroScene({ mouse }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.35} />
      <pointLight position={[6, 4, 6]} intensity={90} color="#3b82f6" />
      <pointLight position={[-6, -3, 4]} intensity={60} color="#8b5cf6" />
      <pointLight position={[0, 5, -4]} intensity={40} color="#22d3ee" />
      <Blob mouse={mouse} />
      <Particles mouse={mouse} />
    </Canvas>
  );
}
