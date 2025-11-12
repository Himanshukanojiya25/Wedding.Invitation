import { useRef, useMemo } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import * as THREE from 'three';

// Custom shader for neon glow effect
class NeonMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        time: { value: 0 },
        glowColor: { value: new THREE.Color('#FF1493') },
        glowIntensity: { value: 1.0 },
        pulseSpeed: { value: 1.0 },
        baseColor: { value: new THREE.Color('#FFFFFF') },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        varying vec3 vNormal;
        
        void main() {
          vUv = uv;
          vPosition = position;
          vNormal = normal;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 glowColor;
        uniform float glowIntensity;
        uniform float pulseSpeed;
        uniform vec3 baseColor;
        
        varying vec2 vUv;
        varying vec3 vPosition;
        varying vec3 vNormal;
        
        void main() {
          // Pulsing effect
          float pulse = sin(time * pulseSpeed) * 0.5 + 0.5;
          float intensity = glowIntensity * (0.8 + 0.4 * pulse);
          
          // Edge glow based on normal
          float edge = dot(vNormal, vec3(0.0, 0.0, 1.0));
          edge = abs(edge);
          edge = 1.0 - edge;
          
          // UV-based glow pattern
          float uvGlow = sin(vUv.x * 20.0 + time * 2.0) * 0.5 + 0.5;
          uvGlow *= sin(vUv.y * 15.0 + time * 1.5) * 0.5 + 0.5;
          
          // Combine effects
          float finalGlow = edge * uvGlow * intensity;
          
          // Base color with glow
          vec3 color = mix(baseColor, glowColor, finalGlow);
          
          // Add some sparkle
          float sparkle = sin(vUv.x * 50.0 + time * 5.0) * sin(vUv.y * 50.0 + time * 3.0);
          sparkle = max(0.0, sparkle);
          color += sparkle * 0.3 * glowColor;
          
          gl_FragColor = vec4(color, 1.0);
        }
      `,
    });
  }
}

extend({ NeonMaterial });

interface NeonGlowProps {
  text?: string;
  color?: string;
  intensity?: number;
  pulseSpeed?: number;
  position?: [number, number, number];
  fontSize?: number;
  geometry?: 'text' | 'ring' | 'cube' | 'sphere';
  isMobile?: boolean;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      neonMaterial: any;
    }
  }
}

export const NeonGlow: React.FC<NeonGlowProps> = ({
  text = 'PRAFUL & PRANJALI',
  color = '#FF1493',
  intensity = 1.0,
  pulseSpeed = 1.0,
  position = [0, 0, 0],
  fontSize = 0.5,
  geometry = 'text',
  isMobile = false,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<NeonMaterial>(null);

  // Mobile optimizations
  const mobileIntensity = isMobile ? intensity * 0.7 : intensity;
  const mobilePulseSpeed = isMobile ? pulseSpeed * 0.8 : pulseSpeed;

  // Create geometry based on type
  const sceneGeometry = useMemo(() => {
    switch (geometry) {
      case 'text':
        // For text, we'll use a simple plane as placeholder
        return new THREE.PlaneGeometry(isMobile ? 3 : 5, isMobile ? 0.6 : 1);
      
      case 'ring':
        return new THREE.TorusGeometry(1, 0.1, isMobile ? 12 : 16, isMobile ? 60 : 100);
      
      case 'cube':
        return new THREE.BoxGeometry(1, 1, 1);
      
      case 'sphere':
        return new THREE.SphereGeometry(1, isMobile ? 16 : 32, isMobile ? 12 : 32);
      
      default:
        return new THREE.PlaneGeometry(isMobile ? 3 : 5, isMobile ? 0.6 : 1);
    }
  }, [geometry, isMobile]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = time;
      materialRef.current.uniforms.glowColor.value.set(color);
      materialRef.current.uniforms.glowIntensity.value = mobileIntensity;
      materialRef.current.uniforms.pulseSpeed.value = mobilePulseSpeed;
    }

    // Gentle floating animation
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.2;
      if (!isMobile) {
        groupRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.1;
      }
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh geometry={sceneGeometry}>
        <neonMaterial
          ref={materialRef}
          key={NeonMaterial.key}
          transparent={true}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Additional glow effects - Only on desktop */}
      {!isMobile && (
        <GlowOrbs 
          count={6}
          radius={1.5}
          color={color}
          pulseSpeed={mobilePulseSpeed * 0.5}
        />
      )}
    </group>
  );
};

// Orbiting glow orbs for extra effect
const GlowOrbs: React.FC<{
  count: number;
  radius: number;
  color: string;
  pulseSpeed: number;
}> = ({ count, radius, color, pulseSpeed }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  const orbs = useMemo(() => 
    Array.from({ length: count }, (_, i) => ({
      angle: (i / count) * Math.PI * 2,
      speed: 0.5 + Math.random() * 0.5,
      size: 0.1 + Math.random() * 0.1,
      offset: Math.random() * Math.PI * 2,
    }))
  , [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (groupRef.current) {
      groupRef.current.children.forEach((orb, i) => {
        const data = orbs[i];
        const angle = data.angle + time * data.speed * 0.2;
        const pulse = 0.8 + 0.4 * Math.sin(time * pulseSpeed + data.offset);
        
        orb.position.x = Math.cos(angle) * radius * pulse;
        orb.position.z = Math.sin(angle) * radius * pulse;
        orb.position.y = Math.sin(time * data.speed + data.offset) * 0.5;
        
        orb.scale.setScalar(data.size * pulse);
      });
    }
  });

  return (
    <group ref={groupRef}>
      {orbs.map((_, i) => (
        <mesh key={i}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial
            color={color}
            transparent={true}
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
};

// Neon Text Component with advanced effects
export const NeonText: React.FC<{
  children: string;
  color?: string;
  fontSize?: number;
  position?: [number, number, number];
  intensity?: number;
  isMobile?: boolean;
}> = ({ 
  children, 
  color = '#FF1493', 
  fontSize = 0.5,
  position = [0, 0, 0],
  intensity = 1.0,
  isMobile = false
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const textMaterialRef = useRef<NeonMaterial>(null);

  // Mobile optimizations
  const mobileFontSize = isMobile ? fontSize * 0.8 : fontSize;
  const mobileIntensity = isMobile ? intensity * 0.8 : intensity;

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (textMaterialRef.current) {
      textMaterialRef.current.uniforms.time.value = time;
      textMaterialRef.current.uniforms.glowColor.value.set(color);
      textMaterialRef.current.uniforms.glowIntensity.value = mobileIntensity;
    }

    // Text floating animation - Only on desktop
    if (groupRef.current && !isMobile) {
      groupRef.current.position.y = position[1] + Math.sin(time * 0.3) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Front text */}
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[children.length * mobileFontSize * 0.6, mobileFontSize]} />
        <neonMaterial
          ref={textMaterialRef}
          key={NeonMaterial.key}
          transparent={true}
        />
      </mesh>
      
      {/* Glow halo - Only on desktop */}
      {!isMobile && (
        <GlowHalo 
          size={children.length * mobileFontSize * 0.7}
          color={color}
          intensity={mobileIntensity}
        />
      )}
    </group>
  );
};

// Glow halo around text
const GlowHalo: React.FC<{
  size: number;
  color: string;
  intensity: number;
}> = ({ size, color, intensity }) => {
  const haloRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (haloRef.current) {
      const pulse = 0.8 + 0.2 * Math.sin(time * 2);
      haloRef.current.scale.setScalar(pulse);
      haloRef.current.rotation.z = time * 0.1;
    }
  });

  return (
    <mesh ref={haloRef}>
      <ringGeometry args={[size * 0.8, size * 1.2, 64]} />
      <meshBasicMaterial
        color={color}
        transparent={true}
        opacity={0.3 * intensity}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

// Neon Border Component
export const NeonBorder: React.FC<{
  width: number;
  height: number;
  color?: string;
  thickness?: number;
  position?: [number, number, number];
  isMobile?: boolean;
}> = ({ 
  width, 
  height, 
  color = '#00FFFF',
  thickness = 0.1,
  position = [0, 0, 0],
  isMobile = false
}) => {
  const borderRef = useRef<THREE.Group>(null);
  
  // Mobile optimizations
  const mobileThickness = isMobile ? thickness * 0.8 : thickness;
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (borderRef.current && !isMobile) {
      borderRef.current.children.forEach((line, i) => {
        const pulse = 0.7 + 0.3 * Math.sin(time * 2 + i * 0.5);
        (line as THREE.Mesh).material.opacity = 0.8 * pulse;
      });
    }
  });

  const borderPoints = useMemo(() => [
    // Top border
    { position: [-width/2, height/2, 0], size: [width, mobileThickness] },
    // Bottom border
    { position: [-width/2, -height/2, 0], size: [width, mobileThickness] },
    // Left border
    { position: [-width/2, 0, 0], size: [mobileThickness, height] },
    // Right border
    { position: [width/2, 0, 0], size: [mobileThickness, height] },
  ], [width, height, mobileThickness]);

  return (
    <group ref={borderRef} position={position}>
      {borderPoints.map((point, i) => (
        <mesh key={i} position={point.position as [number, number, number]}>
          <planeGeometry args={point.size as [number, number]} />
          <meshBasicMaterial
            color={color}
            transparent={true}
            opacity={0.8}
          />
        </mesh>
      ))}
      
      {/* Corner accents - Only on desktop */}
      {!isMobile && (
        <CornerAccents 
          width={width}
          height={height}
          color={color}
        />
      )}
    </group>
  );
};

// Corner accent pieces
const CornerAccents: React.FC<{
  width: number;
  height: number;
  color: string;
}> = ({ width, height, color }) => {
  const corners = useMemo(() => [
    { position: [-width/2, height/2, 0.01], rotation: 0 },
    { position: [width/2, height/2, 0.01], rotation: Math.PI / 2 },
    { position: [-width/2, -height/2, 0.01], rotation: -Math.PI / 2 },
    { position: [width/2, -height/2, 0.01], rotation: Math.PI },
  ], [width, height]);

  return (
    <group>
      {corners.map((corner, i) => (
        <mesh
          key={i}
          position={corner.position as [number, number, number]}
          rotation={[0, 0, corner.rotation]}
        >
          <boxGeometry args={[0.2, 0.2, 0.05]} />
          <meshBasicMaterial
            color={color}
            transparent={true}
            opacity={0.9}
          />
        </mesh>
      ))}
    </group>
  );
};

export default NeonGlow;