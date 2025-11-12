// Mobile detection utility
export const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth <= 768;
};

export const isLowPerformanceDevice = () => {
  if (typeof window === 'undefined') return false;
  const userAgent = navigator.userAgent || navigator.vendor;
  return (/android|iphone|ipad|ipod/i.test(userAgent) && /mobi|mobile/i.test(userAgent)) || 
         window.innerWidth <= 768;
};

export const WEDDING_DATA = {
  couple: {
    groom: 'Praful',
    bride: 'Pranjali', 
    fullNames: 'Praful & Pranjali',
  },
  parents: {
    father: 'Mr. Deorao Matte',
    mother: 'Mrs. Jyoti Matte',
  },
  events: {
    haldi: {
      name: 'Haldi Ceremony',
      date: '2025-11-28',
      displayDate: '28th November 2025',
      time: '04:00 PM',
      location: 'Nagpur, Maharashtra',
      venue: 'Our House, Mauli Road',
      address: 'Jailata, Nagpur, Maharashtra',
    },
    wedding: {
      name: 'Wedding Ceremony', 
      date: '2025-11-30',
      displayDate: '30th November 2025',
      time: '12:01 PM',
      location: 'Chandrapur, Maharashtra',
      venue: 'V.G. Lawn, Datala Road',
      address: 'Chandrapur, Maharashtra',
    },
  },
  loveStory: [
    {
      year: '2019',
      title: 'First Meeting',
      description: 'Our paths crossed at a mutual friend\'s celebration. Little did we know, that moment would change our lives forever. A simple hello became the beginning of our beautiful journey.',
    },
    {
      year: '2020', 
      title: 'Growing Together',
      description: 'Through countless conversations and shared dreams, we discovered the depth of our connection. Every moment spent together made us realize we had found something truly special.',
    },
    {
      year: '2022',
      title: 'The Proposal', 
      description: 'Under a starlit sky, surrounded by the people we love, Praful asked the most important question. With tears of joy and a heart full of love, Pranjali said yes!',
    },
    {
      year: '2025',
      title: 'Our Forever Begins',
      description: 'As we stand on the threshold of this new chapter, we\'re excited to celebrate our love with family and friends. Join us as we promise to love, honor, and cherish each other for eternity.',
    },
  ],
  gallery: {
    placeholders: isMobile() ? 8 : 12, // Fewer images on mobile
  },
  social: {
    hashtag: '#PrafulPranjaliForever',
  },
};

// 🎨 SUPER ATTRACTIVE COLOR PALETTE
export const COLORS = {
  // Primary Colors
  royalGold: '#FFD700',
  deepPurple: '#4A0072', 
  neonPink: '#FF1493',
  electricBlue: '#00FFFF',
  luxuryBlack: '#0A0A0A',
  
  // Gradient Combinations
  gradientHero: isMobile() 
    ? 'linear-gradient(135deg, #4A0072 0%, #FF1493 100%)'
    : 'linear-gradient(135deg, #4A0072 0%, #FF1493 50%, #FFD700 100%)',
  gradientGold: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
  gradientPurple: 'linear-gradient(135deg, #4A0072 0%, #8A2BE2 100%)',
  gradientNeon: 'linear-gradient(135deg, #FF1493 0%, #00FFFF 100%)',
  
  // Backgrounds
  backgroundDark: '#0A0A0A',
  backgroundLight: '#1A1A1A',
  
  // Text Colors
  textPrimary: '#FFFFFF',
  textSecondary: '#CCCCCC',
  textAccent: '#FFD700',
};

// ✨ ANIMATION CONFIGURATIONS - Mobile optimized
export const ANIMATIONS = {
  // Page Transitions
  pageEnter: { 
    duration: isMobile() ? 0.8 : 1.2, 
    ease: [0.25, 0.46, 0.45, 0.94] 
  },
  sectionStagger: { 
    duration: isMobile() ? 0.6 : 0.8, 
    delay: isMobile() ? 0.1 : 0.2 
  },
  
  // Hover Effects
  hoverScale: { 
    scale: isMobile() ? 1.02 : 1.05, 
    transition: { duration: 0.3 } 
  },
  hoverLift: { 
    y: isMobile() ? -5 : -10, 
    transition: { duration: 0.4 } 
  },
  hoverGlow: { 
    boxShadow: isMobile() 
      ? '0 0 15px rgba(255, 215, 0, 0.3)' 
      : '0 0 30px rgba(255, 215, 0, 0.5)' 
  },
  
  // 3D Animations - Reduced on mobile
  float: { 
    y: [0, isMobile() ? -10 : -20, 0], 
    transition: { 
      duration: isMobile() ? 4 : 3, 
      repeat: isLowPerformanceDevice() ? 0 : Infinity 
    } 
  },
  rotate: { 
    rotateY: 360, 
    transition: { 
      duration: isMobile() ? 12 : 8, 
      repeat: isLowPerformanceDevice() ? 0 : Infinity 
    } 
  },
  pulse: { 
    scale: [1, 1.1, 1], 
    transition: { 
      duration: isMobile() ? 3 : 2, 
      repeat: isLowPerformanceDevice() ? 0 : Infinity 
    } 
  },
};

// 🌟 PARTICLE CONFIGURATIONS - Drastically reduced on mobile
export const PARTICLES = {
  hearts: {
    count: isMobile() ? 15 : 50,
    speed: isMobile() ? 0.3 : 0.5,
    size: { min: 0.5, max: isMobile() ? 1.2 : 2 },
    colors: isMobile() ? ['#FF1493', '#FFD700'] : ['#FF1493', '#FFD700', '#00FFFF'],
    enabled: !isLowPerformanceDevice(),
  },
  sparkles: {
    count: isMobile() ? 30 : 100,
    speed: isMobile() ? 0.5 : 1,
    size: { min: 0.1, max: isMobile() ? 0.6 : 1 },
    colors: isMobile() ? ['#FFFFFF', '#FFD700'] : ['#FFFFFF', '#FFD700', '#00FFFF'],
    enabled: !isLowPerformanceDevice(),
  },
  floating: {
    count: isMobile() ? 15 : 30,
    speed: isMobile() ? 0.2 : 0.3,
    size: { min: 0.3, max: isMobile() ? 1 : 1.5 },
    colors: isMobile() ? ['#FFD700', '#4A0072'] : ['#FFD700', '#4A0072', '#FF1493'],
    enabled: !isLowPerformanceDevice(),
  },
};

export const FONTS = {
  heading: 'Playfair Display, serif',
  script: 'Great Vibes, cursive', 
  body: 'Inter, sans-serif',
  luxury: 'Cinzel, serif',
  neon: 'Orbitron, monospace',
};

// 📱 MOBILE SPECIFIC CONFIGURATIONS
export const MOBILE_CONFIG = {
  // Performance settings
  reduceAnimations: isMobile(),
  disableHeavyEffects: isLowPerformanceDevice(),
  lazyLoadImages: true,
  
  // Touch optimizations
  touchDelay: 300,
  scrollThreshold: 50,
  
  // Memory management
  maxParticles: isMobile() ? 20 : 100,
  maxSimultaneousAnimations: isMobile() ? 3 : 10,
  
  // Battery optimizations
  reduceFPS: isMobile(),
  throttleEvents: true,
};

// 🚀 PERFORMANCE UTILITIES
export const PERFORMANCE = {
  // Debounce scroll events
  scrollDebounce: isMobile() ? 100 : 50,
  
  // Throttle resize events  
  resizeThrottle: isMobile() ? 250 : 100,
  
  // Animation frame rate
  targetFPS: isMobile() ? 30 : 60,
  
  // Memory limits
  maxTextureSize: isMobile() ? 1024 : 2048,
  
  // Cache settings
  enableCaching: true,
  cacheDuration: isMobile() ? 30000 : 60000, // 30s vs 60s
};

export default {
  WEDDING_DATA,
  COLORS,
  ANIMATIONS,
  PARTICLES,
  FONTS,
  MOBILE_CONFIG,
  PERFORMANCE,
  isMobile,
  isLowPerformanceDevice,
};