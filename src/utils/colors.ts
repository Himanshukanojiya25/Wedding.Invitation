// 🎨 SUPER ATTRACTIVE COLOR SYSTEM

// Mobile performance check
export const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth <= 768;
};

// 🌈 NEON GRADIENTS
export const neonGradients = {
  royalGold: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
  deepPurple: 'linear-gradient(135deg, #4A0072 0%, #8A2BE2 100%)',
  electricPink: 'linear-gradient(135deg, #FF1493 0%, #FF69B4 100%)',
  cyberBlue: 'linear-gradient(135deg, #00FFFF 0%, #0080FF 100%)',
  luxuryBlack: 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 100%)',
  rainbow: 'linear-gradient(135deg, #FF1493 0%, #FFD700 25%, #00FFFF 50%, #8A2BE2 75%, #FF1493 100%)',
};

// ✨ GLOW EFFECTS - Optimized for mobile
export const glowEffects = {
  gold: isMobile() 
    ? '0 0 10px rgba(255, 215, 0, 0.7)' 
    : '0 0 20px rgba(255, 215, 0, 0.7), 0 0 40px rgba(255, 215, 0, 0.5), 0 0 60px rgba(255, 215, 0, 0.3)',
  
  pink: isMobile()
    ? '0 0 10px rgba(255, 20, 147, 0.7)'
    : '0 0 20px rgba(255, 20, 147, 0.7), 0 0 40px rgba(255, 20, 147, 0.5), 0 0 60px rgba(255, 20, 147, 0.3)',
  
  blue: isMobile()
    ? '0 0 10px rgba(0, 255, 255, 0.7)'
    : '0 0 20px rgba(0, 255, 255, 0.7), 0 0 40px rgba(0, 255, 255, 0.5), 0 0 60px rgba(0, 255, 255, 0.3)',
  
  purple: isMobile()
    ? '0 0 10px rgba(138, 43, 226, 0.7)'
    : '0 0 20px rgba(138, 43, 226, 0.7), 0 0 40px rgba(138, 43, 226, 0.5), 0 0 60px rgba(138, 43, 226, 0.3)',
  
  multi: isMobile()
    ? '0 0 15px rgba(255, 215, 0, 0.5)'
    : '0 0 20px rgba(255, 215, 0, 0.5), 0 0 40px rgba(255, 20, 147, 0.5), 0 0 60px rgba(0, 255, 255, 0.5)',
};

// 🎭 THEME COLORS
export const themeColors = {
  // Primary Colors
  royalGold: '#FFD700',
  deepPurple: '#4A0072',
  neonPink: '#FF1493',
  electricBlue: '#00FFFF',
  luxuryBlack: '#0A0A0A',
  sparkleWhite: '#FFFFFF',

  // Secondary Colors
  goldLight: '#FFE55C',
  goldDark: '#E5C158',
  purpleLight: '#7B3FE4',
  purpleDark: '#32005C',
  pinkLight: '#FF69B4',
  pinkDark: '#CC0066',
  blueLight: '#66FFFF',
  blueDark: '#009999',

  // Background Gradients
  bgDark: 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 50%, #2A2A2A 100%)',
  bgPurple: 'linear-gradient(135deg, #4A0072 0%, #32005C 50%, #1A0046 100%)',
  bgGold: 'linear-gradient(135deg, #FFD700 0%, #E5C158 50%, #CCAA33 100%)',
  bgRainbow: 'linear-gradient(135deg, #FF1493 0%, #FFD700 25%, #00FFFF 50%, #8A2BE2 75%, #FF1493 100%)',
};

// 💫 ANIMATED GRADIENTS (CSS Keyframes ready) - Mobile optimized
export const animatedGradients = {
  shimmer: isMobile() ? `
    background: linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.4), transparent);
    background-size: 200% 100%;
    animation: shimmer 4s infinite;
  ` : `
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 215, 0, 0.4),
      rgba(255, 20, 147, 0.4),
      rgba(0, 255, 255, 0.4),
      transparent
    );
    background-size: 200% 100%;
    animation: shimmer 3s infinite;
  `,
  
  pulse: isMobile() ? `
    background: linear-gradient(135deg, #FFD700, #FF1493);
    background-size: 200% 200%;
    animation: gradientPulse 6s ease infinite;
  ` : `
    background: linear-gradient(135deg, #FFD700, #FF1493, #00FFFF);
    background-size: 400% 400%;
    animation: gradientPulse 4s ease infinite;
  `,
  
  flow: isMobile() ? `
    background: linear-gradient(-45deg, #FF1493, #FFD700);
    background-size: 200% 200%;
    animation: gradientFlow 8s ease infinite;
  ` : `
    background: linear-gradient(-45deg, #FF1493, #FFD700, #00FFFF, #8A2BE2);
    background-size: 400% 400%;
    animation: gradientFlow 6s ease infinite;
  `,
};

// 🎪 PARTICLE COLORS - Reduced complexity on mobile
export const particleColors = {
  hearts: isMobile() 
    ? ['#FF1493', '#FFD700']  // Fewer colors on mobile
    : ['#FF1493', '#FF69B4', '#FFB6C1', '#FFD700'],
  
  sparkles: isMobile()
    ? ['#FFFFFF', '#FFD700']
    : ['#FFFFFF', '#FFD700', '#00FFFF', '#FF1493'],
  
  stars: isMobile()
    ? ['#FFFFFF', '#FFD700']
    : ['#FFFFFF', '#FFD700', '#FFA500', '#FFFF00'],
  
  magic: isMobile()
    ? ['#FF1493', '#00FFFF']
    : ['#FF1493', '#00FFFF', '#FFD700', '#8A2BE2'],
};

// 📱 COMPONENT SPECIFIC COLORS - Mobile optimized
export const componentColors = {
  // Hero Section - Simplified for mobile
  hero: {
    background: isMobile() 
      ? 'linear-gradient(135deg, #4A0072 0%, #FF1493 100%)'
      : 'linear-gradient(135deg, #4A0072 0%, #FF1493 50%, #FFD700 100%)',
    text: '#FFFFFF',
    accent: '#FFD700',
    glow: isMobile() ? glowEffects.gold : glowEffects.multi,
  },

  // Cards & Sections - Lighter effects on mobile
  cards: {
    background: 'linear-gradient(135deg, rgba(10, 10, 10, 0.9) 0%, rgba(74, 0, 114, 0.8) 100%)',
    border: isMobile() ? '1px solid rgba(255, 215, 0, 0.3)' : '2px solid transparent',
    borderGradient: isMobile() 
      ? 'linear-gradient(135deg, #FFD700, #FF1493)'
      : 'linear-gradient(135deg, #FFD700, #FF1493, #00FFFF)',
    glow: isMobile() ? '0 0 10px rgba(255, 215, 0, 0.3)' : glowEffects.gold,
  },

  // Buttons - Simpler on mobile
  buttons: {
    primary: {
      background: neonGradients.royalGold,
      text: '#0A0A0A',
      glow: isMobile() ? '0 0 8px rgba(255, 215, 0, 0.5)' : glowEffects.gold,
    },
    secondary: {
      background: neonGradients.deepPurple,
      text: '#FFFFFF',
      glow: isMobile() ? '0 0 8px rgba(138, 43, 226, 0.5)' : glowEffects.purple,
    },
    neon: {
      background: neonGradients.electricPink,
      text: '#FFFFFF',
      glow: isMobile() ? '0 0 8px rgba(255, 20, 147, 0.5)' : glowEffects.pink,
    },
  },

  // Text Colors - Same for all devices
  text: {
    primary: '#FFFFFF',
    secondary: '#CCCCCC',
    accent: '#FFD700',
    neon: '#00FFFF',
    warning: '#FF1493',
  },
};

// 🎯 COLOR UTILITY FUNCTIONS
export const colorUtils = {
  // Convert hex to rgba
  hexToRgba: (hex: string, alpha: number = 1): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  },

  // Generate random neon color
  randomNeon: (): string => {
    const neons = ['#FF1493', '#FFD700', '#00FFFF', '#8A2BE2', '#00FF00'];
    return neons[Math.floor(Math.random() * neons.length)];
  },

  // Darken color
  darken: (hex: string, percent: number): string => {
    const num = parseInt(hex.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) - amt;
    const G = (num >> 8 & 0x00FF) - amt;
    const B = (num & 0x0000FF) - amt;
    return '#' + (
      0x1000000 +
      (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
      (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
      (B < 255 ? B < 1 ? 0 : B : 255)
    ).toString(16).slice(1);
  },

  // Lighten color
  lighten: (hex: string, percent: number): string => {
    const num = parseInt(hex.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return '#' + (
      0x1000000 +
      (R > 255 ? 255 : R) * 0x10000 +
      (G > 255 ? 255 : G) * 0x100 +
      (B > 255 ? 255 : B)
    ).toString(16).slice(1);
  },

  // Mobile detection utility
  isMobile,
  
  // Get optimized colors for current device
  getOptimizedColors: () => {
    return {
      glow: isMobile() ? 'simple' : 'intensive',
      gradients: isMobile() ? 'simple' : 'complex',
      particles: isMobile() ? 'reduced' : 'full'
    };
  }
};

export default {
  neonGradients,
  glowEffects,
  themeColors,
  animatedGradients,
  particleColors,
  componentColors,
  colorUtils,
};