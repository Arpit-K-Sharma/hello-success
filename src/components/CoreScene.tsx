"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { SCRUB_QUERY, useScrollProgress } from "./ScrollStory";

const STARS = 900;
const { damp } = THREE.MathUtils;

function buildStars() {
  let seed = 7;
  const rand = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
  const pts = new Float32Array(STARS * 3);
  for (let i = 0; i < STARS; i++) {
    const r = 4 + rand() * 14;
    const t = rand() * Math.PI * 2;
    const u = rand() * 2 - 1;
    const s = Math.sqrt(1 - u * u);
    pts.set([Math.cos(t) * s * r, u * r * 0.6, Math.sin(t) * s * r - 4], i * 3);
  }
  return new THREE.BufferGeometry().setAttribute("position", new THREE.BufferAttribute(pts, 3));
}

/** Space scene behind the services orbit: starfield + wireframe core that spins with the scroll. */
function Scene({ x, y, size }: { x: number; y: number; size: number }) {
  const progress = useScrollProgress();
  const { viewport } = useThree();
  const stars = useMemo(() => buildStars(), []);
  const world = useRef<THREE.Group>(null);
  const core = useRef<THREE.Group>(null);
  const rings = useRef<THREE.Group>(null);
  const last = useRef(progress.current);
  const spin = useRef(0);

  useFrame((state, dt) => {
    // Scroll speed drives the spin: the core turns with the ring of services, then settles.
    const velocity = Math.abs(progress.current - last.current) / Math.max(dt, 1e-3);
    last.current = progress.current;
    spin.current = damp(spin.current, 0.15 + Math.min(velocity * 6, 2.5), 4, dt);
    core.current!.rotation.y += dt * spin.current;
    core.current!.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
    rings.current!.rotation.z += dt * spin.current * 0.5;
    world.current!.rotation.y += dt * 0.02;
    core.current!.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 1.6) * 0.02);
    state.camera.position.x = damp(state.camera.position.x, state.pointer.x * 0.5, 2, dt);
    state.camera.position.y = damp(state.camera.position.y, state.pointer.y * 0.3, 2, dt);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <group ref={world}>
        <points geometry={stars}>
          <pointsMaterial color="#8be8ff" size={0.035} sizeAttenuation transparent opacity={0.8} />
        </points>
      </group>
      <group position={[(x - 0.5) * viewport.width, (0.5 - y) * viewport.height, 0]} scale={size}>
        <group ref={core}>
          <mesh>
            <icosahedronGeometry args={[1.25, 1]} />
            <meshBasicMaterial color="#1868db" wireframe toneMapped={false} />
          </mesh>
          <mesh>
            <icosahedronGeometry args={[1.6, 0]} />
            <meshBasicMaterial color="#5b9bff" wireframe transparent opacity={0.25} />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.7, 32, 32]} />
            <meshBasicMaterial color="#5b9bff" toneMapped={false} />
          </mesh>
        </group>
        <group ref={rings} rotation={[Math.PI / 2.4, 0, 0]}>
          {["#5ee6ff", "#5b9bff", "#a596ff"].map((c, i) => (
            <mesh key={c} rotation={[i * 0.35, i * 0.6, 0]}>
              <torusGeometry args={[2 + i * 0.25, 0.008, 8, 160]} />
              <meshBasicMaterial color={c} toneMapped={false} transparent opacity={0.7} />
            </mesh>
          ))}
        </group>
      </group>
    </>
  );
}

/** x / y: where the core sits, as a fraction of the stage (0.5 = centre). size scales the core. */
export default function CoreScene({ x = 0.5, y = 0.5, size = 0.62, className = "" }: { x?: number; y?: number; size?: number; className?: string }) {
  const wrapper = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  // Client-only (ssr: false). Only the pinned desktop layout shows this scene.
  const [enabled] = useState(() => window.matchMedia(SCRUB_QUERY).matches);

  useEffect(() => {
    if (!enabled) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(wrapper.current!);
    return () => io.disconnect();
  }, [enabled]);

  if (!enabled) return null;
  return (
    <div ref={wrapper} className={`absolute inset-0 ${className}`} aria-hidden>
      <Canvas frameloop={visible ? "always" : "never"} dpr={[1, 1.75]} camera={{ position: [0, 0, 10], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        <Scene x={x} y={y} size={size} />
      </Canvas>
    </div>
  );
}
