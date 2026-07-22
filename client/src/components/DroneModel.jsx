import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export default function DroneModel({ scrollSpeed = 0 }) {
  const groupRef = useRef();
  const propellersRef = useRef([]);
  const hoverY = useRef(0);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    hoverY.current = Math.sin(t * 0.8) * 0.3;
    groupRef.current.position.y = hoverY.current;
    groupRef.current.rotation.y = t * 0.3 + scrollSpeed * 0.5;
    groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.05;

    propellersRef.current.forEach((prop, i) => {
      if (prop) {
        prop.rotation.y = t * (i % 2 === 0 ? 8 : -8);
      }
    });
  });

  return (
    <group ref={groupRef}>
      <DroneBody />
      <Arm position={[-1.2, 0, 1.2]} angle={-Math.PI / 4} ref={(el) => (propellersRef.current[0] = el)} />
      <Arm position={[1.2, 0, 1.2]} angle={Math.PI / 4} ref={(el) => (propellersRef.current[1] = el)} />
      <Arm position={[-1.2, 0, -1.2]} angle={-3 * Math.PI / 4} ref={(el) => (propellersRef.current[2] = el)} />
      <Arm position={[1.2, 0, -1.2]} angle={3 * Math.PI / 4} ref={(el) => (propellersRef.current[3] = el)} />
    </group>
  );
}

function DroneBody() {
  return (
    <group>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.8, 0.8, 0.3, 24]} />
        <meshStandardMaterial
          color="#0B1E3D"
          metalness={0.8}
          roughness={0.2}
          emissive="#1E90FF"
          emissiveIntensity={0.1}
        />
      </mesh>
      <mesh position={[0, 0.2, 0]}>
        <sphereGeometry args={[0.45, 16, 16]} />
        <meshStandardMaterial
          color="#132A52"
          metalness={0.6}
          roughness={0.3}
          emissive="#0099CC"
          emissiveIntensity={0.05}
        />
      </mesh>
      <mesh position={[0, -0.15, 0]}>
        <boxGeometry args={[0.6, 0.08, 0.6]} />
        <meshStandardMaterial color="#1E90FF" emissive="#1E90FF" emissiveIntensity={0.3} />
      </mesh>
      <Camera position={[0, 0.1, 0.5]} />
    </group>
  );
}

function Camera({ position }) {
  return (
    <mesh position={position}>
      <boxGeometry args={[0.15, 0.1, 0.1]} />
      <meshStandardMaterial color="#111" metalness={0.9} roughness={0.1} />
      <mesh position={[0, 0, 0.08]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#1E90FF" emissive="#0099CC" emissiveIntensity={0.5} />
      </mesh>
    </mesh>
  );
}

const Arm = ({ position, angle, ...props }) => {
  const ref = useRef();
  return (
    <group position={position} ref={ref}>
      <mesh rotation={[0, 0, Math.PI / 6]} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.04, 0.06, 1.2, 6]} />
        <meshStandardMaterial color="#1E90FF" metalness={0.7} roughness={0.3} />
      </mesh>
      <group position={[0, 0, 0.65]} {...props}>
        <mesh>
          <cylinderGeometry args={[0.5, 0.5, 0.03, 32]} />
          <meshStandardMaterial
            color="white"
            transparent
            opacity={0.15}
            metalness={0.3}
            roughness={0.8}
          />
        </mesh>
        <mesh>
          <ringGeometry args={[0.15, 0.5, 32]} />
          <meshStandardMaterial
            color="#1E90FF"
            transparent
            opacity={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh position={[0, 0.02, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.04, 8]} />
          <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
    </group>
  );
};
