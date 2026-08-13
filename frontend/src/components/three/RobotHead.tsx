"use client";

import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, RoundedBox } from "@react-three/drei";
import { Group, MathUtils } from "three";

/**
 * A full robot — landscape head with two eyes, a tapered stand/neck, and a
 * cube body it sits on (matching the reference). Only the head tracks the
 * pointer; it pivots on top of the neck so the motion reads naturally.
 * Built from primitive meshes so it needs no external model file.
 */
function RobotModel() {
  const rootRef = useRef<Group>(null);
  const headRef = useRef<Group>(null);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    // Gentle idle float + breathing sway so the robot feels alive.
    const root = rootRef.current;
    if (root) {
      root.position.y = 0.15 + Math.sin(t * 1.1) * 0.055;
      root.rotation.z = Math.sin(t * 0.6) * 0.015;
    }

    const head = headRef.current;
    if (!head) return;

    // state.pointer is normalized device coords: x/y in [-1, 1].
    const maxAngle = 0.5;
    const targetY = state.pointer.x * maxAngle; // yaw: cursor right -> look right
    const targetX = -state.pointer.y * maxAngle; // pitch: cursor up -> look up

    // Frame-rate independent smoothing for the lerp.
    const smoothing = 1 - Math.pow(0.0015, delta);
    head.rotation.y = MathUtils.lerp(head.rotation.y, targetY, smoothing);
    head.rotation.x = MathUtils.lerp(head.rotation.x, targetX, smoothing);
  });

  return (
    <group ref={rootRef} position={[0, 0.15, 0]} scale={0.92} dispose={null}>
      {/* ── Cube body ── */}
      <RoundedBox args={[1.3, 1.3, 1.3]} radius={0.06} smoothness={4} position={[0, -1.15, 0]}>
        <meshStandardMaterial color="#c2c8d2" metalness={0.9} roughness={0.3} />
      </RoundedBox>

      {/* ── Stand / neck ── */}
      <mesh position={[0, -0.34, 0]}>
        <cylinderGeometry args={[0.2, 0.42, 0.34, 48]} />
        <meshStandardMaterial color="#9aa3b2" metalness={0.9} roughness={0.35} />
      </mesh>
      <mesh position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.26, 0.2, 0.42, 48]} />
        <meshStandardMaterial color="#9aa3b2" metalness={0.9} roughness={0.35} />
      </mesh>

      {/* ── Head (tracks the pointer, pivots on the neck) ── */}
      <group ref={headRef} position={[0, 0.28, 0]}>
        {/* frame */}
        <RoundedBox args={[1.75, 1.2, 0.52]} radius={0.28} smoothness={6} position={[0, 0.42, 0]}>
          <meshStandardMaterial color="#d8dde6" metalness={0.92} roughness={0.26} />
        </RoundedBox>

        {/* dark glossy face */}
        <RoundedBox args={[1.42, 0.9, 0.16]} radius={0.2} smoothness={6} position={[0, 0.42, 0.24]}>
          <meshStandardMaterial color="#0b0d0f" metalness={0.5} roughness={0.1} />
        </RoundedBox>

        {/* eyes */}
        {[-0.32, 0.32].map((x) => (
          <mesh key={x} position={[x, 0.46, 0.34]}>
            <sphereGeometry args={[0.14, 32, 32]} />
            <meshStandardMaterial
              color="#eef2f8"
              metalness={0.15}
              roughness={0.18}
              emissive="#8ea6c2"
              emissiveIntensity={0.28}
            />
          </mesh>
        ))}

        {/* side ear nubs */}
        {[-0.9, 0.9].map((x) => (
          <mesh key={x} position={[x, 0.42, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.12, 0.12, 0.16, 24]} />
            <meshStandardMaterial color="#9aa3b2" metalness={0.9} roughness={0.34} />
          </mesh>
        ))}
      </group>

    </group>
  );
}

/**
 * Canvas that centers the robot and fills its parent. Give the parent a height.
 * The canvas is transparent so it blends onto whatever background it sits on.
 */
export default function RobotHead() {
  // The R3F canvas can miss its initial ResizeObserver callback and stay at the
  // default 300x150 until something triggers a resize. Nudge it once on mount so
  // it always fills its container on first paint.
  useEffect(() => {
    const nudge = () => window.dispatchEvent(new Event("resize"));
    const raf = requestAnimationFrame(nudge);
    const t1 = setTimeout(nudge, 120);
    const t2 = setTimeout(nudge, 400);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="h-full w-full">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 6.4], fov: 32 }} gl={{ antialias: true, alpha: true }}>
        {/* Clean, standard lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[4, 6, 5]} intensity={2.2} />
        <pointLight position={[-5, -2, 3]} intensity={0.6} color="#36b8ff" />

        <Suspense fallback={null}>
          <RobotModel />

          {/* Local studio environment for modern metal reflections (no remote fetch). */}
          <Environment resolution={256}>
            <Lightformer form="rect" intensity={2} position={[0, 3, 4]} scale={[6, 4, 1]} color="#ffffff" />
            <Lightformer form="rect" intensity={1.2} position={[-4, 0, 2]} scale={[3, 6, 1]} color="#36b8ff" />
            <Lightformer form="rect" intensity={1} position={[4, -1, 2]} scale={[3, 4, 1]} color="#ffffff" />
          </Environment>
        </Suspense>
      </Canvas>
    </div>
  );
}
