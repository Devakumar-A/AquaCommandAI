import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Box, Stars } from "@react-three/drei";
import * as THREE from "three";

function FarmField({ recommendedCrop }) {
  const cropsGroupRef = useRef();
  const windmillBladeRef = useRef();
  const tractorRef = useRef();

  // Growth animation multiplier (0.1 = seed, 1.0 = fully grown)
  const growthRef = useRef(0.15);

  useEffect(() => {
    if (recommendedCrop) {
      // Trigger growth
      growthRef.current = 0.15;
    }
  }, [recommendedCrop]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Lerp crop growth to 1.0 if crop recommended, else animate gentle breathing
    const targetGrowth = recommendedCrop ? 1.0 : 0.25;
    growthRef.current = THREE.MathUtils.lerp(growthRef.current, targetGrowth, 0.03);

    if (cropsGroupRef.current) {
      cropsGroupRef.current.children.forEach((mesh, index) => {
        // Adjust individual scales
        const scaleY = growthRef.current * (1 + Math.sin(time * 2 + index) * 0.08);
        mesh.scale.set(1, scaleY, 1);
      });
    }

    // Windmill blades rotation
    if (windmillBladeRef.current) {
      windmillBladeRef.current.rotation.z += 0.025;
    }

    // Tractor patrol circle path
    if (tractorRef.current) {
      const radius = 1.6;
      const speed = 0.6;
      const angle = time * speed;
      tractorRef.current.position.x = Math.cos(angle) * radius;
      tractorRef.current.position.z = Math.sin(angle) * radius;
      tractorRef.current.rotation.y = -angle + Math.PI / 2; // align direction
    }
  });

  // Procedural Grid positions for crop nodes
  const cropPositions = useMemo(() => {
    const coords = [];
    const size = 6;
    for (let x = -size / 2; x <= size / 2; x += 0.8) {
      for (let z = -size / 2; z <= size / 2; z += 0.8) {
        // Avoid placing crops in the center (where farm assets are)
        if (Math.abs(x) > 0.6 || Math.abs(z) > 0.6) {
          coords.push([x, -0.4, z]);
        }
      }
    }
    return coords;
  }, []);

  return (
    <group>
      {/* Ground Grid Terrain */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[7, 7]} />
        <meshStandardMaterial color="#0f2027" roughness={0.9} metalness={0.1} />
      </mesh>

      {/* Futuristic Grid border */}
      <gridHelper args={[7, 14, "#06b6d4", "#1e293b"]} position={[0, -0.49, 0]} />

      {/* Smart Irrigation Pipes (cyan glowing bars) */}
      <Box args={[7, 0.05, 0.05]} position={[0, -0.47, 0.5]}>
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.6} />
      </Box>
      <Box args={[7, 0.05, 0.05]} position={[0, -0.47, -0.5]}>
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.6} />
      </Box>

      {/* Autonomous Tractor (Futuristic hover pod) */}
      <group ref={tractorRef} position={[0, -0.3, 1.8]}>
        {/* Cabin */}
        <mesh>
          <boxGeometry args={[0.3, 0.18, 0.45]} />
          <meshStandardMaterial color="#06b6d4" emissive="#0284c7" emissiveIntensity={0.2} />
        </mesh>
        {/* Cabin glow light */}
        <mesh position={[0, 0.1, 0.1]}>
          <boxGeometry args={[0.2, 0.08, 0.1]} />
          <meshBasicMaterial color="#34d399" />
        </mesh>
      </group>

      {/* Wind turbine asset */}
      <group position={[0, 1.1, -1.8]}>
        {/* Tower */}
        <mesh>
          <cylinderGeometry args={[0.06, 0.1, 3.2, 8]} />
          <meshStandardMaterial color="#334155" roughness={0.4} />
        </mesh>
        {/* Head */}
        <mesh position={[0, 1.6, 0.08]}>
          <sphereGeometry args={[0.16, 8, 8]} />
          <meshStandardMaterial color="#475569" />
        </mesh>
        {/* Blades group */}
        <group ref={windmillBladeRef} position={[0, 1.6, 0.25]}>
          {[0, 120, 240].map((angle) => (
            <group key={angle} rotation={[0, 0, (angle * Math.PI) / 180]}>
              <mesh position={[0, 0.6, 0]}>
                <boxGeometry args={[0.08, 1.1, 0.02]} />
                <meshBasicMaterial color="#e2e8f0" />
              </mesh>
            </group>
          ))}
        </group>
      </group>

      {/* Procedural growing crops */}
      <group ref={cropsGroupRef}>
        {cropPositions.map((pos, idx) => (
          <mesh key={idx} position={pos}>
            <cylinderGeometry args={[0.06, 0.04, 0.8, 5]} />
            <meshStandardMaterial
              color={recommendedCrop ? "#10b981" : "#047857"}
              roughness={0.7}
              emissive="#10b981"
              emissiveIntensity={recommendedCrop ? 0.35 : 0.05}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// Clouds generator
function Clouds() {
  const groupRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.children.forEach((cloud, index) => {
        cloud.position.x = ((time * 0.1 + index * 3.5) % 10) - 5;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {[0, 1].map((idx) => (
        <group key={idx} position={[-3 + idx * 6, 2.3, -1 - idx * 2]}>
          <Sphere args={[0.35, 8, 8]} position={[0, 0, 0]}>
            <meshBasicMaterial color="#1e293b" transparent opacity={0.4} />
          </Sphere>
          <Sphere args={[0.25, 8, 8]} position={[0.25, 0.1, 0]}>
            <meshBasicMaterial color="#1e293b" transparent opacity={0.4} />
          </Sphere>
          <Sphere args={[0.2, 8, 8]} position={[-0.2, 0.05, 0]}>
            <meshBasicMaterial color="#1e293b" transparent opacity={0.4} />
          </Sphere>
        </group>
      ))}
    </group>
  );
}

function Farm3D({ recommendedCrop }) {
  return (
    <div className="w-full h-full relative min-h-[350px]">
      <Canvas camera={{ position: [0, 2.5, 5], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 6, 2]} intensity={1.2} color="#fef08a" />
        <pointLight position={[-3, 2, -2]} intensity={0.6} color="#06b6d4" />
        
        <Stars radius={100} depth={20} count={100} factor={2} fade speed={1} />
        
        <FarmField recommendedCrop={recommendedCrop} />
        <Clouds />
      </Canvas>
    </div>
  );
}

export default Farm3D;
