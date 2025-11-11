import { useState, useEffect, useRef } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

interface MouseInteractionState {
  position: MousePosition;
  isHovering: boolean;
  isClicking: boolean;
  velocity: number;
  direction: 'left' | 'right' | 'up' | 'down' | 'none';
  distance: number;
}

interface UseMouseInteractionReturn extends MouseInteractionState {
  ref: React.RefObject<HTMLElement>;
  trailRef: React.RefObject<HTMLDivElement>;
  addTrail: (event: MouseEvent) => void;
  clearTrails: () => void;
}

export const useMouseInteraction = (): UseMouseInteractionReturn => {
  const ref = useRef<HTMLElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const lastPosition = useRef<MousePosition>({ x: 0, y: 0 });
  const lastTime = useRef<number>(Date.now());
  
  const [state, setState] = useState<MouseInteractionState>({
    position: { x: 0, y: 0 },
    isHovering: false,
    isClicking: false,
    velocity: 0,
    direction: 'none',
    distance: 0,
  });

  // Track mouse position and movement
  useEffect(() => {
    let animationFrameId: number;

    const updateMousePosition = (event: MouseEvent) => {
      const currentTime = Date.now();
      const deltaTime = currentTime - lastTime.current;
      
      if (deltaTime > 0) {
        const newPosition = { x: event.clientX, y: event.clientY };
        const deltaX = newPosition.x - lastPosition.current.x;
        const deltaY = newPosition.y - lastPosition.current.y;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const velocity = distance / deltaTime;

        // Determine direction
        let direction: MouseInteractionState['direction'] = 'none';
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          direction = deltaX > 0 ? 'right' : 'left';
        } else if (Math.abs(deltaY) > Math.abs(deltaX)) {
          direction = deltaY > 0 ? 'down' : 'up';
        }

        setState(prev => ({
          ...prev,
          position: newPosition,
          velocity,
          direction,
          distance: prev.distance + distance,
        }));

        lastPosition.current = newPosition;
        lastTime.current = currentTime;
      }

      animationFrameId = requestAnimationFrame(() => {});
    };

    const handleMouseEnter = () => {
      setState(prev => ({ ...prev, isHovering: true }));
    };

    const handleMouseLeave = () => {
      setState(prev => ({ ...prev, isHovering: false }));
    };

    const handleMouseDown = () => {
      setState(prev => ({ ...prev, isClicking: true }));
    };

    const handleMouseUp = () => {
      setState(prev => ({ ...prev, isClicking: false }));
    };

    // Add event listeners
    document.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Add element-specific events if ref exists
    const element = ref.current;
    if (element) {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
      element.addEventListener('mousedown', handleMouseDown);
      element.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);

      if (element) {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
        element.removeEventListener('mousedown', handleMouseDown);
        element.removeEventListener('mouseup', handleMouseUp);
      }
    };
  }, []);

  // Create mouse trail effect
  const addTrail = (event: MouseEvent) => {
    if (!trailRef.current) return;

    const trail = document.createElement('div');
    const colors = ['#FF1493', '#FFD700', '#00FFFF', '#8A2BE2'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    trail.style.cssText = `
      position: fixed;
      width: 8px;
      height: 8px;
      background: ${randomColor};
      border-radius: 50%;
      pointer-events: none;
      left: ${event.clientX - 4}px;
      top: ${event.clientY - 4}px;
      z-index: 9999;
      opacity: 0.8;
      box-shadow: 0 0 10px ${randomColor};
      transition: all 0.3s ease-out;
    `;

    trailRef.current.appendChild(trail);

    // Animate trail
    setTimeout(() => {
      trail.style.transform = 'scale(2)';
      trail.style.opacity = '0';
    }, 10);

    // Remove trail after animation
    setTimeout(() => {
      if (trail.parentNode) {
        trail.parentNode.removeChild(trail);
      }
    }, 300);
  };

  // Clear all trails
  const clearTrails = () => {
    if (trailRef.current) {
      trailRef.current.innerHTML = '';
    }
  };

  // Add trail effect on mouse move
  useEffect(() => {
    const handleTrailMove = (event: MouseEvent) => {
      if (state.velocity > 2) { // Only add trails when moving fast enough
        addTrail(event);
      }
    };

    document.addEventListener('mousemove', handleTrailMove);
    return () => document.removeEventListener('mousemove', handleTrailMove);
  }, [state.velocity]);

  return {
    ...state,
    ref,
    trailRef,
    addTrail,
    clearTrails,
  };
};

// ✨ ENHANCED MOUSE EFFECTS HOOK
export const useMouseEffects = () => {
  const mouse = useMouseInteraction();
  const [effects, setEffects] = useState<Array<{ id: number; x: number; y: number; type: string }>>([]);
  const effectId = useRef(0);

  // Add sparkle effect at mouse position
  const addSparkle = (x: number, y: number) => {
    const id = effectId.current++;
    setEffects(prev => [...prev, { id, x, y, type: 'sparkle' }]);
    
    setTimeout(() => {
      setEffects(prev => prev.filter(effect => effect.id !== id));
    }, 1000);
  };

  // Add ripple effect at mouse position
  const addRipple = (x: number, y: number) => {
    const id = effectId.current++;
    setEffects(prev => [...prev, { id, x, y, type: 'ripple' }]);
    
    setTimeout(() => {
      setEffects(prev => prev.filter(effect => effect.id !== id));
    }, 600);
  };

  // Add heart effect at mouse position
  const addHeart = (x: number, y: number) => {
    const id = effectId.current++;
    setEffects(prev => [...prev, { id, x, y, type: 'heart' }]);
    
    setTimeout(() => {
      setEffects(prev => prev.filter(effect => effect.id !== id));
    }, 1200);
  };

  // Auto-add effects based on mouse behavior
  useEffect(() => {
    if (mouse.isClicking) {
      addRipple(mouse.position.x, mouse.position.y);
    }

    if (mouse.velocity > 5) {
      addSparkle(mouse.position.x, mouse.position.y);
    }

    if (mouse.distance > 1000 && Math.random() > 0.9) {
      addHeart(mouse.position.x, mouse.position.y);
    }
  }, [mouse.isClicking, mouse.velocity, mouse.distance, mouse.position]);

  return {
    ...mouse,
    effects,
    addSparkle,
    addRipple,
    addHeart,
    clearEffects: () => setEffects([]),
  };
};

// 🎯 CUSTOM CURSOR HOOK
export const useCustomCursor = (cursorType: 'default' | 'pointer' | 'heart' | 'sparkle' = 'default') => {
  const [cursor, setCursor] = useState(cursorType);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateCursorPosition = (event: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${event.clientX}px`;
        cursorRef.current.style.top = `${event.clientY}px`;
      }
    };

    document.addEventListener('mousemove', updateCursorPosition);
    return () => document.removeEventListener('mousemove', updateCursorPosition);
  }, []);

  const setCursorType = (type: typeof cursorType) => {
    setCursor(type);
  };

  const getCursorStyle = () => {
    const styles = {
      default: 'cursor-default',
      pointer: 'cursor-pointer',
      heart: 'cursor-heart',
      sparkle: 'cursor-sparkle',
    };
    return styles[cursor];
  };

  return {
    cursor,
    setCursorType,
    cursorRef,
    getCursorStyle,
  };
};

// 🎪 MOUSE INTERACTION PRESETS
export const mousePresets = {
  gentle: {
    trailColor: '#FFD700',
    trailSize: 6,
    trailDuration: 300,
  },
  romantic: {
    trailColor: '#FF1493',
    trailSize: 8,
    trailDuration: 400,
  },
  magical: {
    trailColor: '#00FFFF',
    trailSize: 10,
    trailDuration: 500,
  },
  royal: {
    trailColor: '#8A2BE2',
    trailSize: 12,
    trailDuration: 600,
  },
};

export default useMouseInteraction;