import { Variants } from 'framer-motion';

// Mobile detection with performance optimization
export const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth <= 768;
};

// Check device performance
export const isHighPerformanceDevice = () => {
  if (typeof window === 'undefined') return true;
  return !isMobile() || 
         (navigator.hardwareConcurrency && navigator.hardwareConcurrency > 4) ||
         (navigator.deviceMemory && navigator.deviceMemory > 4);
};

// All your original animations remain SAME, just add performance checks
export const pageTransitions: Variants = {
  initial: {
    opacity: 0,
    y: 50,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: isMobile() ? 0.8 : 1.2, // Only duration adjust for performance
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    y: -50,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// SECTION ANIMATIONS - Original same, just mobile check
export const sectionAnimations: Variants = {
  offscreen: {
    opacity: 0,
    y: isMobile() ? 50 : 100, // Slightly less movement on mobile
  },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      bounce: isMobile() ? 0.3 : 0.4,
      duration: 1.2,
    },
  },
};

// FLOATING ANIMATIONS - All preserved, just optimized
export const floatingAnimations = {
  gentle: {
    y: [0, -20, 0],
    transition: {
      duration: isMobile() ? 4 : 3, // Slower on mobile for better performance
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
  moderate: {
    y: [0, -30, 0],
    transition: {
      duration: isMobile() ? 3.5 : 2.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
  dramatic: {
    y: [0, -50, 0],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: isMobile() ? 5 : 4, // Slower on mobile
      repeat: isHighPerformanceDevice() ? Infinity : 0, // Limited on low-end
      ease: "easeInOut",
    },
  },
};

// PARTICLE ANIMATIONS - Conditional for mobile
export const particleAnimations = {
  float: {
    y: [0, -100],
    opacity: [0, 1, 0],
    transition: {
      duration: isMobile() ? 4 : 3,
      repeat: isHighPerformanceDevice() ? Infinity : 0,
      ease: "easeOut",
    },
  },
  sparkle: {
    scale: [0, 1, 0],
    rotate: [0, 180],
    transition: {
      duration: isMobile() ? 2 : 1.5,
      repeat: isHighPerformanceDevice() ? Infinity : 0,
      ease: "easeInOut",
    },
  },
};

// Add this new utility for components
export const getAnimationConfig = (component: string) => {
  if (isMobile()) {
    // Mobile-specific optimizations
    switch(component) {
      case 'particles':
        return { maxParticles: 20, enabled: isHighPerformanceDevice() };
      case 'threejs':
        return { enabled: isHighPerformanceDevice() };
      case 'floating':
        return { intensity: 0.5 };
      default:
        return { enabled: true };
    }
  }
  return { enabled: true }; // Desktop - full power
};

// ALL YOUR ORIGINAL ANIMATIONS REMAIN EXACTLY SAME BELOW
// ✨ SECTION ENTRANCE ANIMATIONS
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const staggerItem: Variants = {
  initial: {
    opacity: 0,
    y: 30,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// 💫 HOVER ANIMATIONS
export const hoverAnimations: Variants = {
  rest: {
    scale: 1,
    y: 0,
    boxShadow: "0 0 0 rgba(0,0,0,0)",
  },
  hover: {
    scale: 1.05,
    y: -10,
    boxShadow: "0 20px 40px rgba(255, 215, 0, 0.3)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
};

export const hoverGlow: Variants = {
  rest: {
    boxShadow: "0 0 0 rgba(255, 215, 0, 0)",
  },
  hover: {
    boxShadow: [
      "0 0 0 rgba(255, 215, 0, 0)",
      "0 0 20px rgba(255, 215, 0, 0.5)",
      "0 0 40px rgba(255, 215, 0, 0.3)",
      "0 0 60px rgba(255, 215, 0, 0.1)",
    ],
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// 🌈 GRADIENT ANIMATIONS
export const gradientAnimations = {
  pulse: {
    background: [
      "linear-gradient(135deg, #FF1493 0%, #FFD700 50%, #00FFFF 100%)",
      "linear-gradient(135deg, #00FFFF 0%, #FF1493 50%, #FFD700 100%)",
      "linear-gradient(135deg, #FFD700 0%, #00FFFF 50%, #FF1493 100%)",
    ],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "linear",
    },
  },
  flow: {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

// 🌀 3D ROTATION ANIMATIONS
export const threeDAnimations = {
  rotateY: {
    rotateY: 360,
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "linear",
    },
  },
  rotateX: {
    rotateX: 360,
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "linear",
    },
  },
  rotate3D: {
    rotateX: 360,
    rotateY: 360,
    transition: {
      duration: 12,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

// ⚡ NEON GLOW ANIMATIONS
export const neonGlowAnimations = {
  pulse: {
    textShadow: [
      "0 0 5px rgba(255, 215, 0, 0.5)",
      "0 0 20px rgba(255, 215, 0, 0.8)",
      "0 0 40px rgba(255, 215, 0, 0.6)",
      "0 0 5px rgba(255, 215, 0, 0.5)",
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
  flicker: {
    textShadow: [
      "0 0 5px rgba(255, 20, 147, 0.5)",
      "0 0 10px rgba(255, 20, 147, 0.8)",
      "0 0 15px rgba(255, 20, 147, 1)",
      "0 0 20px rgba(255, 20, 147, 0.8)",
      "0 0 5px rgba(255, 20, 147, 0.5)",
    ],
    opacity: [1, 0.8, 1, 0.9, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// 🎪 SCROLL TRIGGERED ANIMATIONS
export const scrollAnimations = {
  fadeInUp: {
    initial: {
      opacity: 0,
      y: 100,
    },
    whileInView: {
      opacity: 1,
      y: 0,
    },
    viewport: {
      once: true,
      margin: "-50px",
    },
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
  fadeInLeft: {
    initial: {
      opacity: 0,
      x: -100,
    },
    whileInView: {
      opacity: 1,
      x: 0,
    },
    viewport: {
      once: true,
    },
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
  fadeInRight: {
    initial: {
      opacity: 0,
      x: 100,
    },
    whileInView: {
      opacity: 1,
      x: 0,
    },
    viewport: {
      once: true,
    },
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
  scaleIn: {
    initial: {
      opacity: 0,
      scale: 0.8,
    },
    whileInView: {
      opacity: 1,
      scale: 1,
    },
    viewport: {
      once: true,
    },
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// 💖 HEART BEAT ANIMATION
export const heartBeat: Variants = {
  animate: {
    scale: [1, 1.2, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// 🎯 ANIMATION CONFIGURATIONS
export const animationConfig = {
  // Durations
  fast: 0.3,
  normal: 0.6,
  slow: 1.2,
  verySlow: 2,

  // Easing curves
  ease: [0.25, 0.46, 0.45, 0.94],
  bounce: [0.68, -0.55, 0.265, 1.55],
  elastic: [0.175, 0.885, 0.32, 1.275],
  smooth: [0.4, 0, 0.2, 1],

  // Stagger delays
  staggerShort: 0.1,
  staggerNormal: 0.2,
  staggerLong: 0.3,
};

// 🛠 ANIMATION UTILITY FUNCTIONS
export const animationUtils = {
  // Generate random delay
  randomDelay: (max: number = 1): number => Math.random() * max,

  // Generate staggered delays for multiple items
  staggeredDelays: (count: number, baseDelay: number = 0.1): number[] => 
    Array.from({ length: count }, (_, i) => i * baseDelay),

  // Parallax effect calculator
  parallax: (speed: number, scrollY: number): number => scrollY * speed,

  // Easing functions
  easeInOut: (t: number): number => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  easeOutBack: (t: number): number => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  },

  // Mobile performance helpers
  isMobile,
  isHighPerformanceDevice,
  getAnimationConfig,
};

export default {
  pageTransitions,
  sectionAnimations,
  staggerContainer,
  staggerItem,
  floatingAnimations,
  hoverAnimations,
  hoverGlow,
  gradientAnimations,
  threeDAnimations,
  neonGlowAnimations,
  scrollAnimations,
  heartBeat,
  particleAnimations,
  animationConfig,
  animationUtils,
};