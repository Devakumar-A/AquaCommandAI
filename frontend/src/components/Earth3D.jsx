import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Stars } from "@react-three/drei";
import * as THREE from "three";

// Helper to generate 3D coordinates on a sphere of a given radius
function latLngToVector3(lat, lng, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.sin(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.cos(theta)
  );
}

// Sub-component: Glowing Connection Lines (River Network streams)
function RiverNetworks({ radius }) {
  // Generate random coordinates for river paths
  const paths = useMemo(() => {
    const coords = [
      { from: [37.77, -122.41], to: [40.71, -74.00] }, // SF to NY
      { from: [40.71, -74.00], to: [51.50, -0.12] },  // NY to London
      { from: [51.50, -0.12], to: [35.67, 139.65] },  // London to Tokyo
      { from: [35.67, 139.65], to: [-33.86, 151.20] }, // Tokyo to Sydney
      { from: [-33.86, 151.20], to: [-23.55, -46.63] }, // Sydney to Sao Paulo
      { from: [-23.55, -46.63], to: [37.77, -122.41] }, // Sao Paulo to SF
      { from: [19.07, 72.87], to: [31.23, 121.47] },   // Mumbai to Shanghai
      { from: [31.23, 121.47], to: [51.50, -0.12] },   // Shanghai to London
      { from: [28.61, 77.20], to: [30.04, 31.23] },    // Delhi to Cairo
      { from: [30.04, 31.23], to: [-26.20, 28.04] },   // Cairo to Joburg
    ];

    return coords.map((pair) => {
      const start = latLngToVector3(pair.from[0], pair.from[1], radius);
      const end = latLngToVector3(pair.to[0], pair.to[1], radius);

      // Create an arc curve extending outwards
      const midPoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
      const distance = start.distanceTo(end);
      midPoint.normalize().multiplyScalar(radius + distance * 0.25);

      const curve = new THREE.CatmullRomCurve3([start, midPoint, end]);
      const points = curve.getPoints(50);
      return points;
    });
  }, [radius]);

  return (
    <group>
      {paths.map((points, idx) => (
        <line key={idx}>
          <bufferGeometry attach="geometry">
            <float32BufferAttribute
              attach="attributes-position"
              args={[new Float32Array(points.flatMap(p => [p.x, p.y, p.z])), 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial
            attach="material"
            color={idx % 2 === 0 ? "#22d3ee" : "#34d399"} // Cyan and emerald streams
            transparent
            opacity={0.65}
            linewidth={1.5}
          />
        </line>
      ))}
    </group>
  );
}

// Sub-component: Orbiting Satellites
function Satellites({ radius }) {
  const satellitesRef = useRef([]);

  const data = useMemo(() => [
    { speed: 0.8, color: "#818cf8", size: 0.08, height: 1.5 },
    { speed: 1.2, color: "#22d3ee", size: 0.06, height: 1.8 },
    { speed: 0.5, color: "#34d399", size: 0.07, height: 2.1 },
  ], []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    satellitesRef.current.forEach((sat, index) => {
      if (!sat) return;
      const config = data[index];
      const angle = time * config.speed + index * 10;
      sat.position.x = Math.cos(angle) * (radius * config.height);
      sat.position.z = Math.sin(angle) * (radius * config.height);
      sat.position.y = Math.sin(angle * 0.5) * (radius * 0.6);
      sat.rotation.y = angle;
    });
  });

  return (
    <group>
      {data.map((sat, idx) => (
        <mesh key={idx} ref={(el) => (satellitesRef.current[idx] = el)}>
          <octahedronGeometry args={[sat.size]} />
          <meshBasicMaterial color={sat.color} wireframe />
        </mesh>
      ))}
    </group>
  );
}

// Sub-component: Main Globe Mesh
function GlobeGroup({ radius }) {
  const groupRef = useRef();

  // Reservoir coordinates (small glowing nodes on the surface)
  const reservoirNodes = useMemo(() => {
    const coords = [
      [37.77, -122.41], [40.71, -74.00], [51.50, -0.12], 
      [35.67, 139.65], [-33.86, 151.20], [-23.55, -46.63], 
      [19.07, 72.87], [31.23, 121.47], [28.61, 77.20], 
      [30.04, 31.23], [-26.20, 28.04], [48.85, 2.35]
    ];
    return coords.map(([lat, lng]) => latLngToVector3(lat, lng, radius));
  }, [radius]);

  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Slow continuous rotation
    groupRef.current.rotation.y += 0.0015;

    // Interactive mouse-tilt response
    const targetX = state.pointer.y * 0.25;
    const targetY = state.pointer.x * 0.25;
    
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.05);
    // Add default rotation to the mouse tracking
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, -targetY, 0.05);
  });

  return (
    <group ref={groupRef}>
      {/* Central Solid core */}
      <Sphere args={[radius, 32, 32]}>
        <meshPhongMaterial
          color="#0b1329"
          emissive="#030712"
          shininess={15}
          specular="#1e293b"
        />
      </Sphere>

      {/* Cyber Grid/Wireframe shell */}
      <Sphere args={[radius + 0.02, 30, 30]}>
        <meshBasicMaterial
          color="#1e1b4b"
          wireframe
          transparent
          opacity={0.25}
        />
      </Sphere>

      {/* Futuristic Atmosphere glow boundary */}
      <Sphere args={[radius + 0.08, 16, 16]}>
        <meshBasicMaterial
          color="#06b6d4"
          transparent
          opacity={0.06}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* River Networks/Streams */}
      <RiverNetworks radius={radius} />

      {/* Reservoir Nodes */}
      {reservoirNodes.map((pos, idx) => (
        <group key={idx} position={pos}>
          {/* Main Node */}
          <mesh>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshBasicMaterial color={idx % 3 === 0 ? "#06b6d4" : "#10b981"} />
          </mesh>
          {/* Glowing Aura ring */}
          <mesh scale={[1.8, 1.8, 1.8]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshBasicMaterial
              color={idx % 3 === 0 ? "#06b6d4" : "#10b981"}
              transparent
              opacity={0.3}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </group>
      ))}

      {/* Satellites Orbiting Earth */}
      <Satellites radius={radius} />
    </group>
  );
}

function Earth3D() {
  return (
    <div className="w-full h-full relative select-none">
      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 3, 5]} intensity={1.5} color="#e0f2fe" />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#3b82f6" />
        
        {/* Futuristic Space Background Elements */}
        <Stars radius={100} depth={50} count={350} factor={4} saturation={0.5} fade speed={1} />
        
        <GlobeGroup radius={2.2} />
      </Canvas>
    </div>
  );
}

export default Earth3D;
