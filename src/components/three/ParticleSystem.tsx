import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleSystemProps {
  count?: number;
  colors?: string[];
  size?: number;
  speed?: number;
  area?: [number, number, number];
  shape?: 'sphere' | 'cube' | 'plane' | 'star';
  behavior?: 'float' | 'orbit' | 'explode' | 'fountain';
  opacity?: number;
  blinking?: boolean;
}

export const ParticleSystem: React.FC<ParticleSystemProps> = ({
  count = 100,
  colors = ['#FF1493', '#FFD700', '#00FFFF', '#8A2BE2'],
  size = 0.1,
  speed = 1,
  area = [10, 10, 10],
  shape = 'sphere',
  behavior = 'float',
  opacity = 0.8,
  blinking = false,
}) => {
  const pointsRef = useRef<THREE.Points>(null);
  const groupRef = useRef<THREE.Group>(null);

  // Generate particle data
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colorsArray = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const velocities = new Float32Array(count * 3);
    const originalPositions = new Float32Array(count * 3);
    const offsets = new Float32Array(count);
    const speeds = new Float32Array(count);
    const phases = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Random positions within area
      positions[i3] = (Math.random() - 0.5) * area[0];
      positions[i3 + 1] = (Math.random() - 0.5) * area[1];
      positions[i3 + 2] = (Math.random() - 0.5) * area[2];
      
      // Store original positions for certain behaviors
      originalPositions[i3] = positions[i3];
      originalPositions[i3 + 1] = positions[i3 + 1];
      originalPositions[i3 + 2] = positions[i3 + 2];
      
      // Random color from palette
      const color = new THREE.Color(colors[Math.floor(Math.random() * colors.length)]);
      colorsArray[i3] = color.r;
      colorsArray[i3 + 1] = color.g;
      colorsArray[i3 + 2] = color.b;
      
      // Random sizes
      sizes[i] = size * (0.5 + Math.random() * 0.5);
      
      // Random velocities based on behavior
      switch (behavior) {
        case 'orbit':
          velocities[i3] = (Math.random() - 0.5) * 0.02;
          velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;
          break;
        case 'explode':
          velocities[i3] = (Math.random() - 0.5) * 0.1;
          velocities[i3 + 1] = (Math.random() - 0.5) * 0.1;
          velocities[i3 + 2] = (Math.random() - 0.5) * 0.1;
          break;
        case 'fountain':
          velocities[i3] = (Math.random() - 0.5) * 0.02;
          velocities[i3 + 1] = Math.random() * 0.05 + 0.02;
          velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;
          break;
        default: // float
          velocities[i3] = (Math.random() - 0.5) * 0.01;
          velocities[i3 + 1] = (Math.random() - 0.5) * 0.01;
          velocities[i3 + 2] = (Math.random() - 0.5) * 0.01;
      }
      
      offsets[i] = Math.random() * Math.PI * 2;
      speeds[i] = speed * (0.5 + Math.random() * 0.5);
      phases[i] = Math.random() * Math.PI * 2;
    }

    return { 
      positions, 
      colors: colorsArray, 
      sizes, 
      velocities, 
      originalPositions,
      offsets,
      speeds,
      phases
    };
  }, [count, colors, size, area, behavior, speed]);

  // Create geometry based on shape
  const particleGeometry = useMemo(() => {
    let geometry: THREE.BufferGeometry;

    switch (shape) {
      case 'cube':
        geometry = new THREE.BoxGeometry(1, 1, 1);
        break;
      case 'plane':
        geometry = new THREE.PlaneGeometry(1, 1);
        break;
      case 'star':
        // Simple star shape
        const starShape = new THREE.Shape();
        for (let i = 0; i < 5; i++) {
          const angle = (i / 5) * Math.PI * 2;
          const radius = i % 2 === 0 ? 0.5 : 0.2;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          if (i === 0) {
            starShape.moveTo(x, y);
          } else {
            starShape.lineTo(x, y);
          }
        }
        starShape.closePath();
        geometry = new THREE.ShapeGeometry(starShape);
        break;
      default: // sphere
        geometry = new THREE.SphereGeometry(0.5, 8, 6);
    }

    // Add particle attributes
    geometry.setAttribute('position', new THREE.BufferAttribute(particles.positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(particles.colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(particles.sizes, 1));
    geometry.setAttribute('velocity', new THREE.BufferAttribute(particles.velocities, 3));
    geometry.setAttribute('originalPosition', new THREE.BufferAttribute(particles.originalPositions, 3));
    geometry.setAttribute('offset', new THREE.BufferAttribute(particles.offsets, 1));
    geometry.setAttribute('speed', new THREE.BufferAttribute(particles.speeds, 1));
    geometry.setAttribute('phase', new THREE.BufferAttribute(particles.phases, 1));

    return geometry;
  }, [particles, shape]);

  // Animation frame
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (pointsRef.current) {
      const positions = particleGeometry.attributes.position.array as Float32Array;
      const velocities = particleGeometry.attributes.velocity.array as Float32Array;
      const originalPositions = particleGeometry.attributes.originalPosition.array as Float32Array;
      const offsets = particleGeometry.attributes.offset.array as Float32Array;
      const speeds = particleGeometry.attributes.speed.array as Float32Array;
      const phases = particleGeometry.attributes.phase.array as Float32Array;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        
        switch (behavior) {
          case 'float':
            // Gentle floating with noise
            positions[i3] = originalPositions[i3] + Math.sin(time * speeds[i] + offsets[i]) * 0.5;
            positions[i3 + 1] = originalPositions[i3 + 1] + Math.cos(time * speeds[i] * 0.7 + offsets[i]) * 0.5;
            positions[i3 + 2] = originalPositions[i3 + 2] + Math.sin(time * speeds[i] * 0.3 + offsets[i]) * 0.5;
            break;
            
          case 'orbit':
            // Orbital motion around center
            const orbitRadius = Math.sqrt(
              originalPositions[i3] * originalPositions[i3] + 
              originalPositions[i3 + 2] * originalPositions[i3 + 2]
            );
            const angle = Math.atan2(originalPositions[i3 + 2], originalPositions[i3]) + time * speeds[i];
            positions[i3] = Math.cos(angle) * orbitRadius;
            positions[i3 + 2] = Math.sin(angle) * orbitRadius;
            positions[i3 + 1] = originalPositions[i3 + 1] + Math.sin(time * speeds[i] + offsets[i]) * 0.3;
            break;
            
          case 'explode':
            // Explosion with gravity-like pull back
            const explosionTime = time % 5; // Reset every 5 seconds
            const explosionProgress = Math.min(explosionTime * 2, 1);
            
            if (explosionProgress < 1) {
              // Exploding out
              positions[i3] = originalPositions[i3] + velocities[i3] * explosionProgress * 10;
              positions[i3 + 1] = originalPositions[i3 + 1] + velocities[i3 + 1] * explosionProgress * 10;
              positions[i3 + 2] = originalPositions[i3 + 2] + velocities[i3 + 2] * explosionProgress * 10;
            } else {
              // Pulling back
              const returnProgress = (explosionTime - 0.5) * 2;
              positions[i3] = originalPositions[i3] + (positions[i3] - originalPositions[i3]) * (1 - returnProgress);
              positions[i3 + 1] = originalPositions[i3 + 1] + (positions[i3 + 1] - originalPositions[i3 + 1]) * (1 - returnProgress);
              positions[i3 + 2] = originalPositions[i3 + 2] + (positions[i3 + 2] - originalPositions[i3 + 2]) * (1 - returnProgress);
            }
            break;
            
          case 'fountain':
            // Fountain with gravity
            positions[i3] += velocities[i3];
            positions[i3 + 1] += velocities[i3 + 1];
            positions[i3 + 2] += velocities[i3 + 2];
            
            // Apply gravity
            velocities[i3 + 1] -= 0.001;
            
            // Reset particles that fall too low
            if (positions[i3 + 1] < -area[1] / 2) {
              positions[i3] = originalPositions[i3];
              positions[i3 + 1] = originalPositions[i3 + 1];
              positions[i3 + 2] = originalPositions[i3 + 2];
              velocities[i3 + 1] = Math.random() * 0.05 + 0.02;
            }
            break;
        }

        // Blinking effect
        if (blinking) {
          const blink = 0.5 + 0.5 * Math.sin(time * 3 + phases[i]);
          if (pointsRef.current.material instanceof THREE.PointsMaterial) {
            pointsRef.current.material.opacity = opacity * blink;
          }
        }
      }

      particleGeometry.attributes.position.needsUpdate = true;
    }

    // Gentle group rotation for some behaviors
    if (groupRef.current && behavior !== 'fountain') {
      groupRef.current.rotation.y = time * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef} geometry={particleGeometry}>
        <pointsMaterial
          size={0.1}
          vertexColors={true}
          transparent={true}
          opacity={opacity}
          sizeAttenuation={true}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};

// Specialized Particle Systems
export const SparkleParticles: React.FC<{
  count?: number;
  intensity?: number;
}> = ({ count = 50, intensity = 1 }) => {
  return (
    <ParticleSystem
      count={count}
      colors={['#FFFFFF', '#FFD700', '#00FFFF']}
      size={0.05}
      speed={2}
      shape="star"
      behavior="float"
      blinking={true}
      opacity={0.9 * intensity}
    />
  );
};

export const LoveParticles: React.FC<{
  count?: number;
}> = ({ count = 30 }) => {
  return (
    <ParticleSystem
      count={count}
      colors={['#FF1493', '#FF69B4', '#DC143C']}
      size={0.15}
      speed={1}
      shape="sphere"
      behavior="orbit"
      opacity={0.8}
    />
  );
};

export const MagicParticles: React.FC<{
  count?: number;
}> = ({ count = 80 }) => {
  return (
    <ParticleSystem
      count={count}
      colors={['#8A2BE2', '#4B0082', '#9400D3', '#00FFFF']}
      size={0.08}
      speed={1.5}
      shape="cube"
      behavior="float"
      blinking={true}
      opacity={0.7}
    />
  );
};

// Interactive Particle Emitter
export const ParticleEmitter: React.FC<{
  position?: [number, number, number];
  burstCount?: number;
  color?: string;
  onEmit?: () => void;
}> = ({ 
  position = [0, 0, 0],
  burstCount = 10,
  color = '#FF1493',
  onEmit 
}) => {
  const particlesRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const [particles, setParticles] = useState<Array<{
    position: [number, number, number];
    velocity: [number, number, number];
    life: number;
    maxLife: number;
  }>>([]);

  const emitParticles = useCallback(() => {
    const newParticles = Array.from({ length: burstCount }, () => ({
      position: [position[0], position[1], position[2]] as [number, number, number],
      velocity: [
        (Math.random() - 0.5) * 0.1,
        (Math.random() - 0.5) * 0.1,
        (Math.random() - 0.5) * 0.1,
      ] as [number, number, number],
      life: 1,
      maxLife: 1 + Math.random() * 2,
    }));
    
    setParticles(prev => [...prev, ...newParticles]);
    onEmit?.();
  }, [position, burstCount, onEmit]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    setParticles(prev => 
      prev.map(particle => ({
        ...particle,
        position: [
          particle.position[0] + particle.velocity[0],
          particle.position[1] + particle.velocity[1],
          particle.position[2] + particle.velocity[2],
        ] as [number, number, number],
        life: particle.life - 0.016, // ~60fps
      })).filter(particle => particle.life > 0)
    );

    // Update instanced mesh
    if (particlesRef.current && particles.length > 0) {
      particles.forEach((particle, i) => {
        const lifeRatio = particle.life / particle.maxLife;
        const scale = 0.1 * lifeRatio;
        
        dummy.position.set(...particle.position);
        dummy.scale.set(scale, scale, scale);
        dummy.updateMatrix();
        
        particlesRef.current!.setMatrixAt(i, dummy.matrix);
      });
      
      particlesRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  const sphereGeometry = useMemo(() => new THREE.SphereGeometry(0.1, 8, 6), []);

  return (
    <group>
      <instancedMesh
        ref={particlesRef}
        args={[sphereGeometry, undefined, burstCount]}
        frustumCulled={false}
      >
        <meshBasicMaterial
          color={color}
          transparent={true}
          opacity={0.8}
        />
      </instancedMesh>
      
      {/* Auto-emit periodically */}
      <EmitController onEmit={emitParticles} />
    </group>
  );
};

// Controls particle emission
const EmitController: React.FC<{
  onEmit: () => void;
  interval?: number;
}> = ({ onEmit, interval = 3 }) => {
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (time % interval < 0.1) {
      onEmit();
    }
  });

  return null;
};

export default ParticleSystem;