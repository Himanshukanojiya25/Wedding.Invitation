// 🎨 SUPER ATTRACTIVE COLOR SYSTEM

// 🌈 NEON GRADIENTS
export const neonGradients = {
  royalGold: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
  deepPurple: 'linear-gradient(135deg, #4A0072 0%, #8A2BE2 100%)',
  electricPink: 'linear-gradient(135deg, #FF1493 0%, #FF69B4 100%)',
  cyberBlue: 'linear-gradient(135deg, #00FFFF 0%, #0080FF 100%)',
  luxuryBlack: 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 100%)',
  rainbow: 'linear-gradient(135deg, #FF1493 0%, #FFD700 25%, #00FFFF 50%, #8A2BE2 75%, #FF1493 100%)',
};

// ✨ GLOW EFFECTS
export const glowEffects = {
  gold: '0 0 20px rgba(255, 215, 0, 0.7), 0 0 40px rgba(255, 215, 0, 0.5), 0 0 60px rgba(255, 215, 0, 0.3)',
  pink: '0 0 20px rgba(255, 20, 147, 0.7), 0 0 40px rgba(255, 20, 147, 0.5), 0 0 60px rgba(255, 20, 147, 0.3)',
  blue: '0 0 20px rgba(0, 255, 255, 0.7), 0 0 40px rgba(0, 255, 255, 0.5), 0 0 60px rgba(0, 255, 255, 0.3)',
  purple: '0 0 20px rgba(138, 43, 226, 0.7), 0 0 40px rgba(138, 43, 226, 0.5), 0 0 60px rgba(138, 43, 226, 0.3)',
  multi: '0 0 20px rgba(255, 215, 0, 0.5), 0 0 40px rgba(255, 20, 147, 0.5), 0 0 60px rgba(0, 255, 255, 0.5)',
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

// 💫 ANIMATED GRADIENTS (CSS Keyframes ready)
export const animatedGradients = {
  shimmer: `
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
  pulse: `
    background: linear-gradient(135deg, #FFD700, #FF1493, #00FFFF);
    background-size: 400% 400%;
    animation: gradientPulse 4s ease infinite;
  `,
  flow: `
    background: linear-gradient(-45deg, #FF1493, #FFD700, #00FFFF, #8A2BE2);
    background-size: 400% 400%;
    animation: gradientFlow 6s ease infinite;
  `,
};

// 🎪 PARTICLE COLORS
export const particleColors = {
  hearts: ['#FF1493', '#FF69B4', '#FFB6C1', '#FFD700'],
  sparkles: ['#FFFFFF', '#FFD700', '#00FFFF', '#FF1493'],
  stars: ['#FFFFFF', '#FFD700', '#FFA500', '#FFFF00'],
  magic: ['#FF1493', '#00FFFF', '#FFD700', '#8A2BE2'],
};

// 📱 COMPONENT SPECIFIC COLORS
export const componentColors = {
  // Hero Section
  hero: {
    background: 'linear-gradient(135deg, #4A0072 0%, #FF1493 50%, #FFD700 100%)',
    text: '#FFFFFF',
    accent: '#FFD700',
    glow: glowEffects.multi,
  },

  // Cards & Sections
  cards: {
    background: 'linear-gradient(135deg, rgba(10, 10, 10, 0.9) 0%, rgba(74, 0, 114, 0.8) 100%)',
    border: '2px solid transparent',
    borderGradient: 'linear-gradient(135deg, #FFD700, #FF1493, #00FFFF)',
    glow: glowEffects.gold,
  },

  // Buttons
  buttons: {
    primary: {
      background: neonGradients.royalGold,
      text: '#0A0A0A',
      glow: glowEffects.gold,
    },
    secondary: {
      background: neonGradients.deepPurple,
      text: '#FFFFFF',
      glow: glowEffects.purple,
    },
    neon: {
      background: neonGradients.electricPink,
      text: '#FFFFFF',
      glow: glowEffects.pink,
    },
  },

  // Text Colors
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