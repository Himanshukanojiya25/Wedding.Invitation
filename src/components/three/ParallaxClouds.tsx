import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface ParallaxCloudsProps {
  count?: number;
  layers?: number;
  speed?: number;
  depth?: number;
  colors?: string[];
  area?: [number, number, number];
}

export const ParallaxClouds: React.FC<ParallaxCloudsProps> = ({
  count = 20,
  layers = 3,
  speed = 0.1,
  depth = 50,
  colors = ['#FFFFFF', '#F0F8FF', '#E6E6FA', '#B0E0E6'],
  area = [30, 10, 30],
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  // Create cloud data for each layer
  const cloudData = useMemo(() => {
    const data = [];
    for (let layer = 0; layer < layers; layer++) {
      const layerSpeed = speed * (layer + 1) * 0.5;
      const layerDepth = -depth * (layer / layers);
      const layerCount = Math.floor(count / layers);
      const layerScale = 0.5 + (layer / layers) * 1.5;

      for (let i = 0; i < layerCount; i++) {
        data.push({
          position: [
            (Math.random() - 0.5) * area[0],
            (Math.random() - 0.5) * area[1] + 3,
            layerDepth + (Math.random() - 0.5) * area[2],
          ],
          scale: layerScale * (0.8 + Math.random() * 0.4),
          speed: layerSpeed * (0.8 + Math.random() * 0.4),
          rotation: [
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI,
          ],
          color: colors[Math.floor(Math.random() * colors.length)],
          layer,
          offset: Math.random() * Math.PI * 2,
        });
      }
    }
    return data;
  }, [count, layers, speed, depth, area, colors]);

  // Cloud geometry with organic shape
  const cloudGeometry = useMemo(() => {
    const group = new THREE.Group();

    // Create base cloud shape by combining multiple spheres
    const baseGeometry = new THREE.SphereGeometry(1, 8, 6);
    
    // Create variations by scaling and positioning spheres
    const spheres = [
      { position: [0, 0, 0], scale: [1, 0.8, 1] },
      { position: [0.8, 0.3, 0.2], scale: [0.7, 0.6, 0.7] },
      { position: [-0.6, 0.2, -0.3], scale: [0.6, 0.5, 0.6] },
      { position: [0.3, -0.4, 0.4], scale: [0.5, 0.4, 0.5] },
      { position: [-0.4, -0.2, -0.5], scale: [0.4, 0.3, 0.4] },
    ];

    spheres.forEach((sphere, i) => {
      const mesh = new THREE.Mesh(baseGeometry);
      mesh.position.set(...sphere.position);
      mesh.scale.set(...sphere.scale);
      group.add(mesh);
    });

    // Merge geometries into one
    const mergedGeometry = mergeGeometries(
      group.children.map(child => (child as THREE.Mesh).geometry)
    );

    return mergedGeometry;
  }, []);

  // Helper function to merge geometries
  const mergeGeometries = (geometries: THREE.BufferGeometry[]) => {
    const merged = new THREE.BufferGeometry();
    const attributes: { [key: string]: number[] } = {};

    geometries.forEach((geometry, index) => {
      const positionAttr = geometry.getAttribute('position');
      const normalAttr = geometry.getAttribute('normal');
      const uvAttr = geometry.getAttribute('uv');

      if (index === 0) {
        attributes.positions = [];
        attributes.normals = [];
        attributes.uvs = [];
      }

      for (let i = 0; i < positionAttr.count; i++) {
        attributes.positions.push(
          positionAttr.getX(i),
          positionAttr.getY(i),
          positionAttr.getZ(i)
        );
        attributes.normals.push(
          normalAttr.getX(i),
          normalAttr.getY(i),
          normalAttr.getZ(i)
        );
        if (uvAttr) {
          attributes.uvs.push(uvAttr.getX(i), uvAttr.getY(i));
        }
      }
    });

    merged.setAttribute('position', new THREE.Float32BufferAttribute(attributes.positions, 3));
    merged.setAttribute('normal', new THREE.Float32BufferAttribute(attributes.normals, 3));
    if (attributes.uvs.length > 0) {
      merged.setAttribute('uv', new THREE.Float32BufferAttribute(attributes.uvs, 2));
    }

    return merged;
  };

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (groupRef.current) {
      groupRef.current.children.forEach((cloud, index) => {
        const data = cloudData[index];
        if (!data) return;

        // Parallax movement based on layer
        const parallaxX = Math.sin(time * data.speed + data.offset) * 2;
        const parallaxY = Math.cos(time * data.speed * 0.7 + data.offset) * 0.5;
        
        cloud.position.x = data.position[0] + parallaxX;
        cloud.position.y = data.position[1] + parallaxY;
        
        // Gentle rotation
        cloud.rotation.x = data.rotation[0] + time * data.speed * 0.1;
        cloud.rotation.y = data.rotation[1] + time * data.speed * 0.05;
        
        // Subtle scale pulsation
        const pulse = 0.95 + 0.1 * Math.sin(time * data.speed * 2 + data.offset);
        cloud.scale.setScalar(data.scale * pulse);
      });

      // Gentle overall group movement
      groupRef.current.rotation.y = time * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      {cloudData.map((data, index) => (
        <Cloud
          key={index}
          geometry={cloudGeometry}
          position={data.position as [number, number, number]}
          scale={data.scale}
          color={data.color}
          layer={data.layer}
        />
      ))}
      
      {/* Atmospheric particles */}
      <AtmosphericParticles 
        count={100}
        area={area}
        depth={depth}
        speed={speed}
      />
    </group>
  );
};

// Individual Cloud Component
const Cloud: React.FC<{
  geometry: THREE.BufferGeometry;
  position: [number, number, number];
  scale: number;
  color: string;
  layer: number;
}> = ({ geometry, position, scale, color, layer }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  const material = useMemo(() => 
    new THREE.MeshPhysicalMaterial({
      color: color,
      transparent: true,
      opacity: 0.8 - (layer * 0.2),
      roughness: 0.9,
      metalness: 0,
      flatShading: true,
    })
  , [color, layer]);

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      material={material}
      position={position}
      scale={scale}
      castShadow={false}
      receiveShadow={false}
    />
  );
};

// Atmospheric particles for depth
const AtmosphericParticles: React.FC<{
  count: number;
  area: [number, number, number];
  depth: number;
  speed: number;
}> = ({ count, area, depth, speed }) => {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const speeds = new Float32Array(count);
    const offsets = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Distribute particles in 3D space
      positions[i3] = (Math.random() - 0.5) * area[0] * 2;
      positions[i3 + 1] = (Math.random() - 0.5) * area[1] * 2;
      positions[i3 + 2] = (Math.random() - 0.5) * depth;
      
      // Soft white/blue colors
      const intensity = 0.7 + Math.random() * 0.3;
      colors[i3] = intensity;
      colors[i3 + 1] = intensity;
      colors[i3 + 2] = 1.0;
      
      sizes[i] = 0.01 + Math.random() * 0.03;
      speeds[i] = 0.1 + Math.random() * speed;
      offsets[i] = Math.random() * Math.PI * 2;
    }

    return { positions, colors, sizes, speeds, offsets };
  }, [count, area, depth, speed]);

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
      const time = state.clock.getElapsedTime();
      const positions = geometry.attributes.position.array as Float32Array;
      const speeds = geometry.attributes.speed.array as Float32Array;
      const offsets = geometry.attributes.offset.array as Float32Array;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        
        // Gentle floating motion
        positions[i3 + 1] += Math.sin(time * speeds[i] + offsets[i]) * 0.001;
        positions[i3] += Math.cos(time * speeds[i] * 0.7 + offsets[i]) * 0.001;
      }

      geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.05}
        vertexColors={true}
        transparent={true}
        opacity={0.6}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Background Sky Gradient
export const SkyGradient: React.FC<{
  colors?: string[];
  height?: number;
}> = ({ 
  colors = ['#87CEEB', '#98FB98', '#FFD700', '#FF69B4'],
  height = 20 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  const material = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const context = canvas.getContext('2d')!;

    // Create vertical gradient
    const gradient = context.createLinearGradient(0, 0, 0, canvas.height);
    colors.forEach((color, index) => {
      gradient.addColorStop(index / (colors.length - 1), color);
    });

    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;

    return new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.BackSide,
      transparent: true,
      opacity: 0.8,
    });
  }, [colors]);

  return (
    <mesh ref={meshRef} position={[0, height / 2, 0]}>
      <boxGeometry args={[100, height, 100]} />
      <primitive object={material} />
    </mesh>
  );
};

// Moving Cloud Layer for specific sections
export const MovingCloudLayer: React.FC<{
  direction?: 'left' | 'right';
  speed?: number;
  density?: number;
}> = ({ 
  direction = 'right',
  speed = 0.5,
  density = 10 
}) => {
  const groupRef = useRef<THREE.Group>(null);
  
  const clouds = useMemo(() => 
    Array.from({ length: density }, (_, i) => ({
      x: (i / density) * 40 - 20,
      y: Math.random() * 4 + 2,
      z: -10 + Math.random() * 5,
      scale: 0.5 + Math.random() * 1,
      speed: speed * (0.8 + Math.random() * 0.4),
    }))
  , [density, speed]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (groupRef.current) {
      groupRef.current.children.forEach((cloud, i) => {
        const data = clouds[i];
        const moveDirection = direction === 'right' ? 1 : -1;
        
        cloud.position.x = data.x + time * data.speed * moveDirection;
        
        // Wrap around when out of bounds
        if (direction === 'right' && cloud.position.x > 25) {
          cloud.position.x = -25;
        } else if (direction === 'left' && cloud.position.x < -25) {
          cloud.position.x = 25;
        }
        
        // Gentle floating
        cloud.position.y = data.y + Math.sin(time * data.speed + i) * 0.2;
      });
    }
  });

  const cloudGeometry = useMemo(() => new THREE.SphereGeometry(1, 7, 6), []);

  return (
    <group ref={groupRef}>
      {clouds.map((data, i) => (
        <mesh
          key={i}
          geometry={cloudGeometry}
          position={[data.x, data.y, data.z]}
          scale={data.scale}
        >
          <meshPhysicalMaterial
            color="#FFFFFF"
            transparent={true}
            opacity={0.7}
            roughness={0.8}
          />
        </mesh>
      ))}
    </group>
  );
};

export default ParallaxClouds;