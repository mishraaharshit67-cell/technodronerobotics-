import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import ParticleField from './ParticleField';

export default function TechParticleCanvas() {
  return (
    <Canvas dpr={[1, 2]}>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={60} />
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 5, 5]} intensity={0.8} color="#1E90FF" />
      <ParticleField count={500} />
    </Canvas>
  );
}
