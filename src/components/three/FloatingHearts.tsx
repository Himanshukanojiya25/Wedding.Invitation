import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FloatingHeartsProps {
  count?: number;
  speed?: number;
  size?: number;
  colors?: string[];
  area?: [number, number, number];
  isMobile?: boolean;
}

export const FloatingHearts: React.FC<FloatingHeartsProps> = ({
  count = 20,
  speed = 0.5,
  size = 0.3,
  colors = ['#FF1493', '#FF69B4', '#FFD700', '#00FFFF'],
  area = [15, 10, 15],
  isMobile = false,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const heartsRef = useRef<THREE.InstancedMesh>(null);

  // Adjust for mobile
  const mobileCount = isMobile ? Math.floor(count * 0.4) : count;
  const mobileSize = isMobile ? size * 0.7 : size;
  const mobileArea = isMobile ? [area[0] * 0.7, area[1] * 0.7, area[2] * 0.7] : area;

  // Create heart geometry
  const heartGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    const x = 0, y = 0;
    
    shape.moveTo(x, y + 0.25);
    shape.bezierCurveTo(x, y, x - 0.25, y, x - 0.25, y + 0.25);
    shape.bezierCurveTo(x - 0.25, y + 0.5, x, y + 0.75, x, y + 1);
    shape.bezierCurveTo(x, y + 0.75, x + 0.25, y + 0.5, x + 0.25, y + 0.25);
    shape.bezierCurveTo(x + 0.25, y, x, y, x, y + 0.25);
    
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: 0.1,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: isMobile ? 4 : 8,
    });
    
    geometry.scale(mobileSize, mobileSize, mobileSize);
    return geometry;
  }, [mobileSize, isMobile]);

  // Create heart material with gradient
  const heartMaterial = useMemo(() => {
    const materials = colors.map(color => 
      new THREE.MeshPhysicalMaterial({
        color: color,
        metalness: 0.8,
        roughness: 0.2,
        transmission: 0.9,
        transparent: true,
        opacity: 0.8,
        emissive: new THREE.Color(color).multiplyScalar(0.3),
        emissiveIntensity: 0.5,
      })
    );
    return materials;
  }, [colors]);

  // Initialize heart instances
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const heartData = useMemo(() => {
    return Array.from({ length: mobileCount }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * mobileArea[0],
        (Math.random() - 0.5) * mobileArea[1],
        (Math.random() - 0.5) * mobileArea[2],
      ],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      ],
      scale: 0.5 + Math.random() * 0.5,
      speed: 0.2 + Math.random() * speed,
      offset: Math.random() * Math.PI * 2,
      colorIndex: Math.floor(Math.random() * colors.length),
      rotationSpeed: [
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
      ],
    }));
  }, [mobileCount, mobileArea, speed, colors.length]);

  // Update heart positions and animations
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (heartsRef.current) {
      heartData.forEach((data, i) => {
        const { position, rotation, scale, speed, offset, colorIndex, rotationSpeed } = data;
        
        // Calculate floating motion
        const floatY = Math.sin(time * speed + offset) * 0.5;
        const floatX = Math.cos(time * speed * 0.7 + offset) * 0.2;
        const floatZ = Math.sin(time * speed * 0.5 + offset) * 0.2;
        
        // Update position with floating motion
        dummy.position.set(
          position[0] + floatX,
          position[1] + floatY,
          position[2] + floatZ
        );
        
        // Update rotation
        dummy.rotation.set(
          rotation[0] + time * rotationSpeed[0],
          rotation[1] + time * rotationSpeed[1],
          rotation[2] + time * rotationSpeed[2]
        );
        
        // Pulsating scale
        const pulseScale = scale * (0.9 + 0.1 * Math.sin(time * speed * 2 + offset));
        dummy.scale.set(pulseScale, pulseScale, pulseScale);
        
        dummy.updateMatrix();
        heartsRef.current.setMatrixAt(i, dummy.matrix);
        
        // Set color based on material index
        heartsRef.current.setColorAt(i, new THREE.Color(colors[colorIndex]));
      });
      
      heartsRef.current.instanceMatrix.needsUpdate = true;
      if (heartsRef.current.instanceColor) {
        heartsRef.current.instanceColor.needsUpdate = true;
      }
    }

    // Gentle group rotation
    if (groupRef.current && !isMobile) {
      groupRef.current.rotation.y = time * 0.05;
      groupRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main floating hearts */}
      <instancedMesh
        ref={heartsRef}
        args={[heartGeometry, heartMaterial[0], mobileCount]}
        frustumCulled={false}
      >
        {/* Fallback material for instanced mesh */}
        <meshPhysicalMaterial
          color="#FF1493"
          metalness={0.8}
          roughness={0.2}
          transmission={0.9}
          transparent={true}
          opacity={0.8}
          emissive="#FF1493"
          emissiveIntensity={0.5}
        />
      </instancedMesh>

      {/* Additional sparkle effects - Only on desktop */}
      {!isMobile && (
        <SparkleParticles 
          count={mobileCount}
          area={mobileArea}
          colors={colors}
          parentTime={useFrame((state) => state.clock.getElapsedTime())}
        />
      )}
    </group>
  );
};

// Sparkle particle system for extra magic - Only used on desktop
const SparkleParticles: React.FC<{
  count: number;
  area: [number, number, number];
  colors: string[];
  parentTime: number;
}> = ({ count, area, colors, parentTime }) => {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colorsArray = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const speeds = new Float32Array(count);
    const offsets = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * area[0];
      positions[i3 + 1] = (Math.random() - 0.5) * area[1];
      positions[i3 + 2] = (Math.random() - 0.5) * area[2];

      const color = new THREE.Color(colors[Math.floor(Math.random() * colors.length)]);
      colorsArray[i3] = color.r;
      colorsArray[i3 + 1] = color.g;
      colorsArray[i3 + 2] = color.b;

      sizes[i] = Math.random() * 0.1 + 0.05;
      speeds[i] = 0.5 + Math.random() * 1;
      offsets[i] = Math.random() * Math.PI * 2;
    }

    return { positions, colors: colorsArray, sizes, speeds, offsets };
  }, [count, area, colors]);

  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(particles.positions, 3));
    geom.setAttribute('color', new THREE.BufferAttribute(particles.colors, 3));
    geom.setAttribute('size', new THREE.BufferAttribute(particles.sizes, 1));
    geom.setAttribute('speed', new THREE.BufferAttribute(particles.speeds, 1));
    geom.setAttribute('offset', new THREE.BufferAttribute(particles.offsets, 1));
    return geom;
  }, [particles]);

  useFrame((state) => {
    if (pointsRef.current) {
      const time = parentTime;
      const positions = geometry.attributes.position.array as Float32Array;
      const sizes = geometry.attributes.size.array as Float32Array;
      const speeds = geometry.attributes.speed.array as Float32Array;
      const offsets = geometry.attributes.offset.array as Float32Array;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        // Floating motion
        positions[i3 + 1] += Math.sin(time * speeds[i] + offsets[i]) * 0.01;
        
        // Pulsating size
        sizes[i] = particles.sizes[i] * (0.8 + 0.4 * Math.sin(time * speeds[i] * 2 + offsets[i]));
      }

      geometry.attributes.position.needsUpdate = true;
      geometry.attributes.size.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.1}
        vertexColors={true}
        transparent={true}
        opacity={0.8}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Special single heart component for interactive elements
export const InteractiveHeart: React.FC<{
  position?: [number, number, number];
  color?: string;
  size?: number;
  pulseSpeed?: number;
  isMobile?: boolean;
}> = ({ 
  position = [0, 0, 0], 
  color = '#FF1493', 
  size = 1,
  pulseSpeed = 1,
  isMobile = false
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const mobileSize = isMobile ? size * 0.7 : size;
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      
      // Heartbeat animation
      const pulse = 1 + 0.1 * Math.sin(time * pulseSpeed * 4);
      meshRef.current.scale.setScalar(mobileSize * pulse);
      
      // Gentle floating
      meshRef.current.position.y = position[1] + Math.sin(time * pulseSpeed) * 0.2;
      
      // Slow rotation - Only on desktop
      if (!isMobile) {
        meshRef.current.rotation.y = time * 0.5;
        meshRef.current.rotation.x = Math.sin(time * 0.3) * 0.1;
      }
    }
  });

  const heartGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    const x = 0, y = 0;
    
    shape.moveTo(x, y + 0.25);
    shape.bezierCurveTo(x, y, x - 0.25, y, x - 0.25, y + 0.25);
    shape.bezierCurveTo(x - 0.25, y + 0.5, x, y + 0.75, x, y + 1);
    shape.bezierCurveTo(x, y + 0.75, x + 0.25, y + 0.5, x + 0.25, y + 0.25);
    shape.bezierCurveTo(x + 0.25, y, x, y, x, y + 0.25);
    
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: 0.2,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.05,
      bevelSegments: isMobile ? 8 : 12,
    });
    
    geometry.scale(mobileSize, mobileSize, mobileSize);
    return geometry;
  }, [mobileSize, isMobile]);

  return (
    <mesh ref={meshRef} position={position} geometry={heartGeometry}>
      <meshPhysicalMaterial
        color={color}
        metalness={0.9}
        roughness={0.1}
        transmission={0.95}
        transparent={true}
        opacity={0.9}
        emissive={color}
        emissiveIntensity={0.3}
        clearcoat={1}
        clearcoatRoughness={0.1}
      />
    </mesh>
  );
};

export default FloatingHearts;