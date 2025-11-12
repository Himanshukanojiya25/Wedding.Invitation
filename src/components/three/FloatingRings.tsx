import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FloatingRingsProps {
  isMobile?: boolean;
}

export const FloatingRings = ({ isMobile = false }: FloatingRingsProps) => {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  // Mobile optimizations
  const ringSegments = isMobile ? 50 : 100;
  const ringSize = isMobile ? 0.8 : 1;
  const animationSpeed = isMobile ? 0.15 : 0.2;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = Math.sin(t * 0.3) * 0.2;
      ring1Ref.current.rotation.y = t * animationSpeed;
      ring1Ref.current.position.y = Math.sin(t * 0.5) * 0.3;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = Math.cos(t * 0.3) * 0.2;
      ring2Ref.current.rotation.y = -t * animationSpeed;
      ring2Ref.current.position.y = Math.cos(t * 0.5) * 0.3;
    }
  });

  return (
    <group>
      <mesh ref={ring1Ref} position={[-1.5, 0, 0]}>
        <torusGeometry args={[ringSize, 0.1, 16, ringSegments]} />
        <meshStandardMaterial
          color="#D4AF37"
          metalness={0.8}
          roughness={0.2}
          emissive="#D4AF37"
          emissiveIntensity={0.3}
        />
      </mesh>

      <mesh ref={ring2Ref} position={[1.5, 0, 0]}>
        <torusGeometry args={[ringSize, 0.1, 16, ringSegments]} />
        <meshStandardMaterial
          color="#D4AF37"
          metalness={0.8}
          roughness={0.2}
          emissive="#D4AF37"
          emissiveIntensity={0.3}
        />
      </mesh>

      <pointLight position={[0, 0, 5]} intensity={1} color="#D4AF37" />
      <pointLight position={[-5, 5, 0]} intensity={0.5} color="#F8E6E8" />
      <pointLight position={[5, 5, 0]} intensity={0.5} color="#F8E6E8" />
      <ambientLight intensity={0.5} />
    </group>
  );
};