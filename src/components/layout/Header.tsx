import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50 p-6"
    >
      <div className="container mx-auto flex justify-between items-center">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="flex items-center space-x-2 text-white"
        >
          <Heart className="w-6 h-6 text-[#FF1493] fill-current" />
          <span className="text-xl font-light">Praful & Pranjali</span>
        </motion.div>
        
        <nav className="hidden md:flex space-x-8">
          {['Our Story', 'Events', 'Family', 'Venue'].map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase().replace(' ', '')}`}
              whileHover={{ scale: 1.1, color: '#FFD700' }}
              className="text-white/80 hover:text-[#FFD700] transition-colors duration-300 font-light"
            >
              {item}
            </motion.a>
          ))}
        </nav>
      </div>
    </motion.header>
  );
};