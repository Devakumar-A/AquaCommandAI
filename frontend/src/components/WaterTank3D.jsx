import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Cylinder, Stars } from "@react-three/drei";
import * as THREE from "three";

function TankLiquid({ irrigationLevel }) {
  const liquidRef = useRef();
  
  // Maps irrigation output levels ("Low" -> 30%, "Medium" -> 60%, "High" -> 90%, or direct percentage)
  const targetLevel = (() => {
    if (!irrigationLevel) return 0.2; // default low level
    if (typeof irrigationLevel === "string") {
      const lower = irrigationLevel.toLowerCase();
      if (lower.includes("low")) return 0.3;
      if (lower.includes("high")) return 0.9;
      return 0.6; // medium
    }
    const val = parseFloat(irrigationLevel);
    if (!isNaN(val)) return Math.min(Math.max(val / 100, 0.1), 0.95);
    return 0.55;
  })();

  const currentLevelRef = useRef(0.2);

  useEffect(() => {
    // reset animation tracker
    currentLevelRef.current = 0.2;
  }, [irrigationLevel]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Lerp height level
    currentLevelRef.current = THREE.MathUtils.lerp(currentLevelRef.current, targetLevel, 0.04);
    
    if (liquidRef.current) {
      // Scale height
      liquidRef.current.scale.y = currentLevelRef.current;
      // Offset Y position accordingly so base stays at bottom of tank
      liquidRef.current.position.y = -1.5 + (3 * currentLevelRef.current) / 2;

      // Simulate ripples by rotating and stretching radius very slightly
      const wave = Math.sin(time * 3) * 0.015;
      liquidRef.current.scale.x = 1 + wave;
      liquidRef.current.scale.z = 1 - wave;
    }
  });

  return (
    <group>
      {/* Dynamic Liquid */}
      <Cylinder
        ref={liquidRef}
        args={[0.88, 0.9, 3, 24, 1]}
        position={[0, -1.5 + 0.3, 0]}
        scale={[1, 0.2, 1]}
      >
        <meshStandardMaterial
          color="#0ea5e9"
          roughness={0.1}
          metalness={0.1}
          transparent
          opacity={0.8}
          emissive="#0284c7"
          emissiveIntensity={0.4}
        />
      </Cylinder>
    </group>
  );
}

function TankStructure() {
  const structureRef = useRef();

  useFrame(() => {
    if (structureRef.current) {
      // Slow rotation for visual effect
      structureRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={structureRef}>
      {/* Transparent Outer Tank Shell */}
      <Cylinder args={[1.0, 1.0, 3.2, 24, 1, true]}>
        <meshStandardMaterial
          color="#94a3b8"
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
        />
      </Cylinder>

      {/* Ring structures (Top, Bottom, Middle girdles) */}
      <Cylinder args={[1.04, 1.04, 0.08, 24, 1]} position={[0, 1.6, 0]}>
        <meshStandardMaterial color="#475569" roughness={0.4} metalness={0.7} />
      </Cylinder>
      <Cylinder args={[1.04, 1.04, 0.08, 24, 1]} position={[0, -1.6, 0]}>
        <meshStandardMaterial color="#475569" roughness={0.4} metalness={0.7} />
      </Cylinder>
      
      {/* Sensor grid markers */}
      {[-1, -0.5, 0, 0.5, 1].map((y, idx) => (
        <group key={idx} position={[1.05, y * 1.2, 0]}>
          <mesh>
            <boxGeometry args={[0.08, 0.02, 0.02]} />
            <meshBasicMaterial color="#06b6d4" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function WaterTank3D({ irrigationLevel }) {
  return (
    <div className="w-full h-full relative min-h-[350px]">
      <Canvas camera={{ position: [0, 1, 4.5], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 5, 2]} intensity={1.5} color="#e0f2fe" />
        <pointLight position={[-3, -2, 2]} intensity={0.8} color="#0ea5e9" />
        
        <Stars radius={100} depth={20} count={60} factor={2} fade speed={1} />
        
        <group position={[0, 0.2, 0]}>
          <TankLiquid irrigationLevel={irrigationLevel} />
          <TankStructure />
        </group>
      </Canvas>
    </div>
  );
}

export default WaterTank3D;
