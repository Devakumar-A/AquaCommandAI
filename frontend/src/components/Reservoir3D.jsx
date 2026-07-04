import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Box, Stars } from "@react-three/drei";
import * as THREE from "three";

function Reservoir({ waterLevel }) {
  const waterRef = useRef();

  const levelFraction = parseFloat(waterLevel) / 100 || 0.5;
  const currentFractionRef = useRef(0.5);

  useEffect(() => {
    // reset animation tracker
    currentFractionRef.current = 0.2;
  }, [waterLevel]);

  // Determine color status based on level
  const statusConfig = (() => {
    const lvl = levelFraction * 100;
    if (lvl > 80) return { color: "#ef4444", glow: "#b91c1c", text: "CRITICAL" }; // Red
    if (lvl > 60) return { color: "#facc15", glow: "#a16207", text: "WARNING" }; // Yellow
    return { color: "#06b6d4", glow: "#0891b2", text: "SAFE" }; // Cyan/Blue
  })();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Smoothly lerp water scale
    currentFractionRef.current = THREE.MathUtils.lerp(currentFractionRef.current, levelFraction, 0.04);

    if (waterRef.current) {
      // Scale height
      waterRef.current.scale.y = currentFractionRef.current;
      // Position height offset (base sits at bottom -1.2)
      waterRef.current.position.y = -1.2 + (2 * currentFractionRef.current) / 2;

      // Animate dynamic water plane ripples
      const material = waterRef.current.material;
      if (material) {
        // Subtle color pulsing if critical
        if (levelFraction > 0.8) {
          const pulse = (Math.sin(time * 6) + 1) * 0.2;
          material.color.set(new THREE.Color(0.9 + pulse * 0.1, 0.2, 0.2));
        } else {
          material.color.set(new THREE.Color(statusConfig.color));
        }
      }
    }
  });

  return (
    <group>
      {/* 1. Valley Terrain Boundary (Mountains on the sides) */}
      {/* Left Hill */}
      <mesh rotation={[0, 0, Math.PI / 6]} position={[-2.4, -0.2, 0]}>
        <boxGeometry args={[3, 3, 4]} />
        <meshStandardMaterial color="#0f172a" roughness={0.9} />
      </mesh>
      {/* Right Hill */}
      <mesh rotation={[0, 0, -Math.PI / 6]} position={[2.4, -0.2, 0]}>
        <boxGeometry args={[3, 3, 4]} />
        <meshStandardMaterial color="#0f172a" roughness={0.9} />
      </mesh>

      {/* 2. Concrete Dam Wall Structure */}
      <Box args={[3.2, 2.5, 0.6]} position={[0, -0.4, 0.6]}>
        <meshStandardMaterial color="#334155" roughness={0.5} metalness={0.4} />
      </Box>
      {/* Dam catwalk railing line */}
      <Box args={[3.2, 0.05, 0.05]} position={[0, 0.88, 0.9]}>
        <meshBasicMaterial color="#06b6d4" />
      </Box>

      {/* 3. Dynamic Water Body (Behind the dam) */}
      <Box
        ref={waterRef}
        args={[2.8, 2.0, 2.6]}
        position={[0, -1.2 + 0.5, -1.0]}
        scale={[1, 0.5, 1]}
      >
        <meshStandardMaterial
          color={statusConfig.color}
          roughness={0.1}
          metalness={0.2}
          transparent
          opacity={0.8}
        />
      </Box>

      {/* 4. Digital Grid Line tracking current level */}
      <group position={[0, -1.2 + 2 * levelFraction, -1.0]}>
        <Box args={[2.85, 0.03, 2.65]}>
          <meshBasicMaterial color={statusConfig.color} transparent opacity={0.5} />
        </Box>
      </group>
    </group>
  );
}

function Reservoir3D({ waterLevel }) {
  return (
    <div className="w-full h-full relative min-h-[350px]">
      <Canvas camera={{ position: [0, 2.2, 4.2], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[4, 5, 2]} intensity={1.2} color="#f8fafc" />
        <pointLight position={[-4, 1, -1]} intensity={0.8} color="#06b6d4" />
        
        <Stars radius={100} depth={20} count={80} factor={2} fade speed={1} />
        
        <group rotation={[0.08, -0.6, 0]}>
          <Reservoir waterLevel={waterLevel} />
        </group>
      </Canvas>
    </div>
  );
}

export default Reservoir3D;
