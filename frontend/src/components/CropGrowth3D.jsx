import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Cylinder, Stars } from "@react-three/drei";
import * as THREE from "three";

function GrowthMesh({ yieldValue }) {
  const stemRef = useRef();
  const leafRef = useRef();

  // Maps yieldValue to a growth fraction (0.1 to 1.0)
  const targetFraction = (() => {
    if (!yieldValue) return 0.25; // default sprout stage
    const val = parseFloat(yieldValue);
    if (!isNaN(val)) {
      // Say max yield is 50,000 kg/ha
      return Math.min(Math.max(val / 45000, 0.15), 1.0);
    }
    return 0.65;
  })();

  const currentFractionRef = useRef(0.2);

  useEffect(() => {
    // reset animation tracker
    currentFractionRef.current = 0.15;
  }, [yieldValue]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Lerp growth fraction
    currentFractionRef.current = THREE.MathUtils.lerp(currentFractionRef.current, targetFraction, 0.035);

    if (stemRef.current) {
      // Growth height scaling
      stemRef.current.scale.y = currentFractionRef.current * 2.8;
      stemRef.current.position.y = -1.2 + (stemRef.current.scale.y) / 2;

      // Gentle swaying in wind
      stemRef.current.rotation.z = Math.sin(time * 2) * 0.03;
    }

    if (leafRef.current) {
      // Leaf scale grows and bobs
      const leafScale = currentFractionRef.current * 1.5;
      leafRef.current.scale.set(leafScale, leafScale, leafScale);
      leafRef.current.position.y = -1.2 + (stemRef.current ? stemRef.current.scale.y : 0);
      leafRef.current.rotation.y = time * 0.5;
    }
  });

  return (
    <group>
      {/* Soil Ground Mound */}
      <Cylinder args={[1.2, 1.4, 0.4, 24]} position={[0, -1.4, 0]}>
        <meshStandardMaterial color="#0f172a" roughness={0.9} />
      </Cylinder>
      <gridHelper args={[4, 10, "#06b6d4", "#1e293b"]} position={[0, -1.19, 0]} />

      {/* Main plant stem */}
      <mesh ref={stemRef} position={[0, -1.2, 0]}>
        <cylinderGeometry args={[0.04, 0.07, 1, 8]} />
        <meshStandardMaterial color="#10b981" roughness={0.6} />
      </mesh>

      {/* Sprouted Leaf / Flower Head */}
      <group ref={leafRef} position={[0, -1.2, 0]}>
        {/* Leaf 1 */}
        <mesh rotation={[0.4, 0, 0.5]} position={[0.2, 0, 0]}>
          <boxGeometry args={[0.3, 0.02, 0.15]} />
          <meshStandardMaterial color="#34d399" roughness={0.5} />
        </mesh>
        {/* Leaf 2 */}
        <mesh rotation={[-0.4, 0, -0.5]} position={[-0.2, 0, 0]}>
          <boxGeometry args={[0.3, 0.02, 0.15]} />
          <meshStandardMaterial color="#34d399" roughness={0.5} />
        </mesh>
        {/* Golden Harvest Crown (Shows up when close to fully grown) */}
        {targetFraction > 0.6 && (
          <Sphere args={[0.15, 8, 8]} position={[0, 0.15, 0]}>
            <meshBasicMaterial color="#facc15" />
          </Sphere>
        )}
      </group>
    </group>
  );
}

function CropGrowth3D({ yieldValue }) {
  return (
    <div className="w-full h-full relative min-h-[350px]">
      <Canvas camera={{ position: [0, 0.5, 3.8], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[4, 5, 2]} intensity={1.5} color="#fef08a" />
        <pointLight position={[-3, -1, 1]} intensity={0.8} color="#10b981" />
        
        <Stars radius={100} depth={20} count={60} factor={2} fade speed={1} />
        
        <GrowthMesh yieldValue={yieldValue} />
      </Canvas>
    </div>
  );
}

export default CropGrowth3D;
