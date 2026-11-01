"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollProgress } from "./ScrollStory";

// Scroll timeline of the scene (p = smoothed scroll progress 0 → 1):
//   0.00–0.45  scattered tools converge onto the core   (beat "Connect")
//   0.30–0.60  links to the core switch on               (beat "Automate")
//   0.55–0.85  Grow / Serve / Run rings appear            (beat "Grow")
const NODE_COUNT = 90;
const OUTCOME_COLORS = ["#5ee6ff", "#5b9bff", "#a596ff"];
const { smoothstep, damp } = THREE.MathUtils;

// Seeded so the layout is identical on every load.
function seeded(seed: number) {
  return () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
}

function buildNodes() {
  const rand = seeded(42);
  return Array.from({ length: NODE_COUNT }, (_, i) => {
    const y = 1 - (i / (NODE_COUNT - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = i * 2.39996; // golden angle → even spread on a sphere
    return {
      scatter: new THREE.Vector3(rand() * 13 - 4, (rand() - 0.5) * 9, (rand() - 0.5) * 6 - 2),
      target: new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r).multiplyScalar(2.1),
      size: 0.022 + rand() * 0.035,
    };
  });
}

function Scene({ still }: { still: boolean }) {
  const progress = useScrollProgress();
  const p = useRef(progress.current);
  const group = useRef<THREE.Group>(null);
  const nodesMesh = useRef<THREE.InstancedMesh>(null);
  const links = useRef<THREE.LineSegments>(null);
  const core = useRef<THREE.Mesh>(null);
  const rings = useRef<THREE.Group>(null);

  const nodes = useMemo(() => buildNodes(), []);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const linkGeometry = useMemo(() => {
    const pts = nodes.flatMap((n) => [0, 0, 0, n.target.x, n.target.y, n.target.z]);
    return new THREE.BufferGeometry().setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
  }, [nodes]);

  useFrame((state, dt) => {
    p.current = damp(p.current, progress.current, 5, dt);
    const converge = smoothstep(p.current, 0, 0.45);
    const linked = smoothstep(p.current, 0.3, 0.6);
    const ringsIn = smoothstep(p.current, 0.55, 0.85);

    nodes.forEach((n, i) => {
      dummy.position.lerpVectors(n.scatter, n.target, converge);
      dummy.scale.setScalar(n.size * (1 + linked * 0.3));
      dummy.updateMatrix();
      nodesMesh.current!.setMatrixAt(i, dummy.matrix);
    });
    nodesMesh.current!.instanceMatrix.needsUpdate = true;

    (links.current!.material as THREE.LineBasicMaterial).opacity = linked * 0.22;
    core.current!.scale.setScalar(0.4 + converge * 0.6 + Math.sin(state.clock.elapsedTime * 2) * 0.02);
    rings.current!.scale.setScalar(ringsIn);
    rings.current!.visible = ringsIn > 0.01;

    if (!still) {
      group.current!.rotation.y += dt * 0.08;
      rings.current!.children.forEach((ring, i) => (ring.rotation.z += dt * (0.15 + i * 0.07)));
    }
    // Slow dolly-in plus a gentle pointer parallax.
    state.camera.position.x = damp(state.camera.position.x, state.pointer.x * 0.6, 2, dt);
    state.camera.position.y = damp(state.camera.position.y, state.pointer.y * 0.4, 2, dt);
    state.camera.position.z = 10 - converge * 2;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={group}>
      <instancedMesh ref={nodesMesh} args={[undefined, undefined, NODE_COUNT]}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshBasicMaterial color="#8be8ff" toneMapped={false} />
      </instancedMesh>

      <lineSegments ref={links} geometry={linkGeometry}>
        <lineBasicMaterial color="#5b9bff" transparent opacity={0} />
      </lineSegments>

      <mesh ref={core}>
        <icosahedronGeometry args={[0.9, 1]} />
        <meshBasicMaterial color="#1868db" wireframe toneMapped={false} />
        <mesh>
          <sphereGeometry args={[0.45, 32, 32]} />
          <meshBasicMaterial color="#5b9bff" toneMapped={false} />
        </mesh>
      </mesh>

      <group ref={rings}>
        {OUTCOME_COLORS.map((color, i) => (
          <group key={color} rotation={[Math.PI / 2.3 + i * 0.5, i * 0.9, 0]}>
            <mesh>
              <torusGeometry args={[2.9 + i * 0.45, 0.012, 8, 160]} />
              <meshBasicMaterial color={color} toneMapped={false} />
            </mesh>
            <mesh position={[2.9 + i * 0.45, 0, 0]}>
              <sphereGeometry args={[0.11, 16, 16]} />
              <meshBasicMaterial color={color} toneMapped={false} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}

export default function HeroScene() {
  const wrapper = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  // Client-only component (ssr: false), so window is safe here.
  const [still] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  useEffect(() => {
    // Stop rendering when the hero is off-screen.
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    io.observe(wrapper.current!);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapper} className="absolute inset-0" aria-hidden>
      <Canvas
        frameloop={visible ? "always" : "never"}
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 10], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene still={still} />
      </Canvas>
    </div>
  );
}
