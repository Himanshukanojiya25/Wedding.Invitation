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
    placeholders: 12,
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
  gradientHero: 'linear-gradient(135deg, #4A0072 0%, #FF1493 50%, #FFD700 100%)',
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

// ✨ ANIMATION CONFIGURATIONS
export const ANIMATIONS = {
  // Page Transitions
  pageEnter: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] },
  sectionStagger: { duration: 0.8, delay: 0.2 },
  
  // Hover Effects
  hoverScale: { scale: 1.05, transition: { duration: 0.3 } },
  hoverLift: { y: -10, transition: { duration: 0.4 } },
  hoverGlow: { boxShadow: '0 0 30px rgba(255, 215, 0, 0.5)' },
  
  // 3D Animations
  float: { y: [0, -20, 0], transition: { duration: 3, repeat: Infinity } },
  rotate: { rotateY: 360, transition: { duration: 8, repeat: Infinity } },
  pulse: { scale: [1, 1.1, 1], transition: { duration: 2, repeat: Infinity } },
};

// 🌟 PARTICLE CONFIGURATIONS
export const PARTICLES = {
  hearts: {
    count: 50,
    speed: 0.5,
    size: { min: 0.5, max: 2 },
    colors: ['#FF1493', '#FFD700', '#00FFFF'],
  },
  sparkles: {
    count: 100,
    speed: 1,
    size: { min: 0.1, max: 1 },
    colors: ['#FFFFFF', '#FFD700', '#00FFFF'],
  },
  floating: {
    count: 30,
    speed: 0.3,
    size: { min: 0.3, max: 1.5 },
    colors: ['#FFD700', '#4A0072', '#FF1493'],
  },
};

export const FONTS = {
  heading: 'Playfair Display, serif',
  script: 'Great Vibes, cursive', 
  body: 'Inter, sans-serif',
  luxury: 'Cinzel, serif',
  neon: 'Orbitron, monospace',
};