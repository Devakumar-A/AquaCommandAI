import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Stars } from "@react-three/drei";
import * as THREE from "three";

function HologramCore() {
  const coreRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // 1. Slow floating bobbing motion for the entire core
    if (coreRef.current) {
      coreRef.current.position.y = Math.sin(time * 1.5) * 0.15;
      coreRef.current.rotation.y = time * 0.45;
      coreRef.current.rotation.x = Math.sin(time * 0.5) * 0.25;

      // Pulse size to simulate voice indicator
      const pulse = 1 + Math.sin(time * 8) * 0.04;
      coreRef.current.scale.set(pulse, pulse, pulse);
    }

    // 2. Rotate orbiting hologram rings at differing speeds
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = time * 0.8;
      ring1Ref.current.rotation.y = time * 0.4;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -time * 1.1;
      ring2Ref.current.rotation.z = time * 0.6;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x = -time * 0.5;
      ring3Ref.current.rotation.z = -time * 1.3;
    }
  });

  return (
    <group>
      {/* Floating Holographic Core Group */}
      <group ref={coreRef}>
        {/* Core Solid Geodesic Sphere */}
        <Sphere args={[0.75, 12, 12]}>
          <meshBasicMaterial
            color="#22d3ee"
            wireframe
            transparent
            opacity={0.4}
            blending={THREE.AdditiveBlending}
          />
        </Sphere>

        {/* Core Inner Glow */}
        <Sphere args={[0.4, 16, 16]}>
          <meshBasicMaterial
            color="#818cf8"
            transparent
            opacity={0.65}
            blending={THREE.AdditiveBlending}
          />
        </Sphere>
      </group>

      {/* Hologram Rings */}
      {/* Ring 1 */}
      <mesh ref={ring1Ref}>
        <ringGeometry args={[1.1, 1.14, 32]} />
        <meshBasicMaterial
          color="#06b6d4"
          side={THREE.DoubleSide}
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Ring 2 */}
      <mesh ref={ring2Ref}>
        <ringGeometry args={[1.25, 1.29, 32]} />
        <meshBasicMaterial
          color="#a855f7"
          side={THREE.DoubleSide}
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Ring 3 (Outer visualizer ring) */}
      <mesh ref={ring3Ref}>
        <ringGeometry args={[1.4, 1.44, 4]} />
        <meshBasicMaterial
          color="#34d399"
          side={THREE.DoubleSide}
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

function AIAssistant3D() {
  return (
    <div className="w-full h-full relative min-h-[350px]">
      <Canvas camera={{ position: [0, 0, 3.5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        
        {/* Ambient background particles */}
        <Stars radius={100} depth={20} count={90} factor={3} fade speed={2} />
        
        <HologramCore />
      </Canvas>
    </div>
  );
}

export default AIAssistant3D;
