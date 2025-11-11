import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SparkleEffectsProps {
  count?: number;
  colors?: string[];
  size?: number;
  speed?: number;
  area?: [number, number, number];
  intensity?: number;
  twinkleSpeed?: number;
  shape?: 'star' | 'circle' | 'diamond' | 'cross';
}

export const SparkleEffects: React.FC<SparkleEffectsProps> = ({
  count = 100,
  colors = ['#FFFFFF', '#FFD700', '#00FFFF', '#FF1493'],
  size = 0.2,
  speed = 1,
  area = [15, 10, 15],
  intensity = 1,
  twinkleSpeed = 2,
  shape = 'star',
}) => {
  const pointsRef = useRef<THREE.Points>(null);
  const groupRef = useRef<THREE.Group>(null);

  // Generate sparkle data
  const sparkles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colorsArray = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const offsets = new Float32Array(count);
    const speeds = new Float32Array(count);
    const phases = new Float32Array(count);
    const rotations = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Random positions in 3D space
      positions[i3] = (Math.random() - 0.5) * area[0];
      positions[i3 + 1] = (Math.random() - 0.5) * area[1];
      positions[i3 + 2] = (Math.random() - 0.5) * area[2];
      
      // Bright colors with variation
      const color = new THREE.Color(colors[Math.floor(Math.random() * colors.length)]);
      const brightness = 0.7 + Math.random() * 0.3;
      colorsArray[i3] = color.r * brightness;
      colorsArray[i3 + 1] = color.g * brightness;
      colorsArray[i3 + 2] = color.b * brightness;
      
      // Varied sizes
      sizes[i] = size * (0.3 + Math.random() * 0.7);
      
      // Animation properties
      offsets[i] = Math.random() * Math.PI * 2;
      speeds[i] = speed * (0.5 + Math.random() * 0.5);
      phases[i] = Math.random() * Math.PI * 2;
      rotations[i] = Math.random() * Math.PI * 2;
    }

    return { 
      positions, 
      colors: colorsArray, 
      sizes, 
      offsets,
      speeds,
      phases,
      rotations
    };
  }, [count, colors, size, area, speed]);

  // Create custom sparkle geometry based on shape
  const sparkleGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    
    // Create shape vertices
    let vertices: number[] = [];
    
    switch (shape) {
      case 'star':
        // 5-point star
        for (let i = 0; i < 5; i++) {
          const angle = (i / 5) * Math.PI * 2;
          const nextAngle = ((i + 2) % 5 / 5) * Math.PI * 2;
          
          // Outer point
          vertices.push(
            Math.cos(angle) * 0.5, Math.sin(angle) * 0.5, 0,
            Math.cos(nextAngle) * 0.5, Math.sin(nextAngle) * 0.5, 0,
            0, 0, 0
          );
        }
        break;
        
      case 'cross':
        // Plus sign
        vertices = [
          -0.5, 0, 0,  0.5, 0, 0,  // Horizontal
          0, -0.5, 0,  0, 0.5, 0,  // Vertical
        ];
        break;
        
      case 'diamond':
        // Diamond shape
        vertices = [
          0, 0.5, 0,  0.5, 0, 0,
          0.5, 0, 0,  0, -0.5, 0,
          0, -0.5, 0,  -0.5, 0, 0,
          -0.5, 0, 0,  0, 0.5, 0,
        ];
        break;
        
      default: // circle
        // Simple circle with points
        const segments = 8;
        for (let i = 0; i < segments; i++) {
          const angle1 = (i / segments) * Math.PI * 2;
          const angle2 = ((i + 1) / segments) * Math.PI * 2;
          vertices.push(
            Math.cos(angle1) * 0.5, Math.sin(angle1) * 0.5, 0,
            Math.cos(angle2) * 0.5, Math.sin(angle2) * 0.5, 0,
          );
        }
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(sparkles.colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sparkles.sizes, 1));
    geometry.setAttribute('offset', new THREE.BufferAttribute(sparkles.offsets, 1));
    geometry.setAttribute('speed', new THREE.BufferAttribute(sparkles.speeds, 1));
    geometry.setAttribute('phase', new THREE.BufferAttribute(sparkles.phases, 1));
    geometry.setAttribute('rotation', new THREE.BufferAttribute(sparkles.rotations, 1));

    return geometry;
  }, [sparkles, shape]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (pointsRef.current) {
      const positions = sparkleGeometry.attributes.position.array as Float32Array;
      const sizes = sparkleGeometry.attributes.size.array as Float32Array;
      const offsets = sparkleGeometry.attributes.offset.array as Float32Array;
      const speeds = sparkleGeometry.attributes.speed.array as Float32Array;
      const phases = sparkleGeometry.attributes.phase.array as Float32Array;

      // Update sparkle properties
      for (let i = 0; i < count; i++) {
        // Twinkling effect - size pulsation
        const twinkle = 0.5 + 0.5 * Math.sin(time * twinkleSpeed * speeds[i] + phases[i]);
        sizes[i] = sparkles.sizes[i] * twinkle * intensity;

        // Gentle floating motion
        const i3 = i * 3;
        positions[i3 + 1] = sparkles.positions[i3 + 1] + Math.sin(time * speeds[i] + offsets[i]) * 0.2;
      }

      sparkleGeometry.attributes.size.needsUpdate = true;
      sparkleGeometry.attributes.position.needsUpdate = true;

      // Update material opacity for overall intensity
      if (pointsRef.current.material instanceof THREE.PointsMaterial) {
        pointsRef.current.material.opacity = 0.8 * intensity;
      }
    }

    // Gentle group rotation
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.02;
      groupRef.current.rotation.x = Math.sin(time * 0.1) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef} geometry={sparkleGeometry}>
        <pointsMaterial
          size={0.1}
          vertexColors={true}
          transparent={true}
          opacity={0.8 * intensity}
          sizeAttenuation={true}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};

// Specialized Sparkle Effects
export const GoldenSparkles: React.FC<{
  count?: number;
  intensity?: number;
}> = ({ count = 80, intensity = 1 }) => {
  return (
    <SparkleEffects
      count={count}
      colors={['#FFD700', '#FFA500', '#FFFF00']}
      size={0.15}
      speed={1.5}
      shape="star"
      intensity={intensity}
      twinkleSpeed={3}
    />
  );
};

export const RomanticSparkles: React.FC<{
  count?: number;
}> = ({ count = 60 }) => {
  return (
    <SparkleEffects
      count={count}
      colors={['#FF1493', '#FF69B4', '#DC143C']}
      size={0.12}
      speed={1.2}
      shape="diamond"
      intensity={0.9}
      twinkleSpeed={2}
    />
  );
};

export const MagicalSparkles: React.FC<{
  count?: number;
}> = ({ count = 100 }) => {
  return (
    <SparkleEffects
      count={count}
      colors={['#00FFFF', '#8A2BE2', '#4B0082']}
      size={0.1}
      speed={2}
      shape="cross"
      intensity={1}
      twinkleSpeed={4}
    />
  );
};

// Interactive Sparkle Burst
export const SparkleBurst: React.FC<{
  position?: [number, number, number];
  burstCount?: number;
  color?: string;
  onComplete?: () => void;
}> = ({ 
  position = [0, 0, 0],
  burstCount = 20,
  color = '#FFD700',
  onComplete 
}) => {
  const burstRef = useRef<THREE.Group>(null);
  const [particles, setParticles] = useState<Array<{
    position: [number, number, number];
    velocity: [number, number, number];
    life: number;
    scale: number;
  }>>([]);

  // Trigger burst
  useEffect(() => {
    const newParticles = Array.from({ length: burstCount }, () => ({
      position: [position[0], position[1], position[2]] as [number, number, number],
      velocity: [
        (Math.random() - 0.5) * 0.2,
        (Math.random() - 0.5) * 0.2,
        (Math.random() - 0.5) * 0.2,
      ] as [number, number, number],
      life: 1,
      scale: 0.1 + Math.random() * 0.2,
    }));
    
    setParticles(newParticles);
  }, [position, burstCount]);

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
        life: particle.life - 0.02, // Fast fade
      })).filter(particle => particle.life > 0)
    );

    // Notify when complete
    if (particles.length === 0 && onComplete) {
      onComplete();
    }
  });

  const starGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2;
      const radius = i % 2 === 0 ? 0.5 : 0.2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (i === 0) {
        shape.moveTo(x, y);
      } else {
        shape.lineTo(x, y);
      }
    }
    shape.closePath();
    return new THREE.ShapeGeometry(shape);
  }, []);

  return (
    <group ref={burstRef}>
      {particles.map((particle, i) => (
        <mesh
          key={i}
          geometry={starGeometry}
          position={particle.position}
          scale={particle.scale * particle.life}
        >
          <meshBasicMaterial
            color={color}
            transparent={true}
            opacity={particle.life}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
};

// Sparkle Trail for mouse/cursor
export const SparkleTrail: React.FC<{
  points?: [number, number, number][];
  color?: string;
  length?: number;
}> = ({ 
  points = [],
  color = '#FFFFFF',
  length = 10 
}) => {
  const trailRef = useRef<THREE.Group>(null);
  
  const trailPoints = useMemo(() => 
    points.slice(-length), // Keep only recent points
  [points, length]);

  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(trailPoints.length * 3);
    
    trailPoints.forEach((point, i) => {
      const i3 = i * 3;
      positions[i3] = point[0];
      positions[i3 + 1] = point[1];
      positions[i3 + 2] = point[2];
    });
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, [trailPoints]);

  return (
    <group ref={trailRef}>
      {/* Sparkle line */}
      <line geometry={lineGeometry}>
        <lineBasicMaterial
          color={color}
          transparent={true}
          opacity={0.6}
          linewidth={2}
        />
      </line>
      
      {/* Individual sparkles along the trail */}
      {trailPoints.map((point, i) => (
        <mesh key={i} position={point} scale={0.05}>
          <sphereGeometry args={[0.1, 8, 6]} />
          <meshBasicMaterial
            color={color}
            transparent={true}
            opacity={0.8 * (i / trailPoints.length)}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
};

// Ambient Sparkle Field
export const AmbientSparkles: React.FC<{
  density?: number;
  intensity?: number;
}> = ({ density = 0.5, intensity = 1 }) => {
  const count = Math.floor(200 * density);
  
  return (
    <SparkleEffects
      count={count}
      colors={['#FFFFFF', '#FFD700', '#00FFFF']}
      size={0.08}
      speed={0.5}
      area={[30, 20, 30]}
      intensity={intensity}
      twinkleSpeed={1}
      shape="circle"
    />
  );
};

export default SparkleEffects;