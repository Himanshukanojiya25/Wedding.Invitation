import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { FloatingRings } from '../three/FloatingRings';
import { WEDDING_DATA } from '../../utils/constants';
import { smoothScroll } from '../../utils/helpers';

interface HeroProps {
  isMobile?: boolean;
}

export const Hero = ({ isMobile = false }: HeroProps) => {
  return (
    <section
      id="hero"
      className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0A0A0A] via-[#1A1A1A] to-[#2A2A2A]"
    >
      {/* Subtle 3D Background - Conditionally render for mobile */}
      {!isMobile && (
        <div className="absolute inset-0 opacity-30">
          <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
            <FloatingRings />
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={0.6} color="#D4AF37" />
          </Canvas>
        </div>
      )}

      {/* Elegant Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/20" />

      {/* Main Content */}
      <div className="relative z-20 text-center px-4 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="space-y-6"
        >
          {/* Invitation Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-lg md:text-xl text-[#D4AF37] tracking-wider uppercase font-light"
            style={{ fontFamily: 'Great Vibes, cursive' }}
          >
            You Are Cordially Invited
          </motion.p>

          {/* Couple Names - Elegant Gold */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.7 }}
            className={`text-4xl md:text-6xl lg:text-8xl text-[#D4AF37] ${isMobile ? 'text-5xl' : ''}`}
            style={{ 
              fontFamily: 'Great Vibes, cursive',
              textShadow: '0 4px 20px rgba(212, 175, 55, 0.3)'
            }}
          >
            {WEDDING_DATA.couple.fullNames}
          </motion.h1>

          {/* Wedding Date Only - Location Removed */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            <p
              className="text-xl md:text-2xl lg:text-3xl text-white font-light"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              {WEDDING_DATA.events.wedding.displayDate}
            </p>
          </motion.div>
        </motion.div>

        {/* Simple Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="pt-12"
        >
          <button
            onClick={() => smoothScroll('story')}
            className="group flex flex-col items-center space-y-2 text-gray-400 hover:text-[#D4AF37] transition-colors duration-300"
          >
            <span className="text-sm tracking-wider uppercase">Discover Our Story</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronDown className="w-6 h-6" />
            </motion.div>
          </button>
        </motion.div>
      </div>

      {/* Subtle Floating Particles - Only on desktop */}
      {!isMobile && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#D4AF37] rounded-full opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
};