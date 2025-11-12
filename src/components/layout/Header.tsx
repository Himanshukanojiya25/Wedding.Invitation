import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  isMobile?: boolean;
}

export const Header = ({ isMobile = false }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = ['Our Story', 'Events', 'Family', 'Venue'];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (item: string) => {
    setIsMenuOpen(false);
    // Smooth scroll to section
    const element = document.getElementById(item.toLowerCase().replace(' ', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50 p-4 md:p-6"
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: isMobile ? 1 : 1.1 }}
          className="flex items-center space-x-2 text-white"
        >
          <Heart className="w-5 h-5 md:w-6 md:h-6 text-[#FF1493] fill-current" />
          <span className="text-lg md:text-xl font-light">Praful & Pranjali</span>
        </motion.div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 lg:space-x-8">
          {navigationItems.map((item) => (
            <motion.button
              key={item}
              onClick={() => handleNavClick(item)}
              whileHover={{ scale: 1.1, color: '#FFD700' }}
              className="text-white/80 hover:text-[#FFD700] transition-colors duration-300 font-light text-sm lg:text-base bg-transparent border-none cursor-pointer"
            >
              {item}
            </motion.button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={toggleMenu}
          className="md:hidden p-2 text-white/80 hover:text-[#FFD700] transition-colors duration-300 bg-transparent border-none cursor-pointer z-60"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </motion.button>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="md:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
            />
            
            {/* Menu Content */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="md:hidden fixed top-0 left-0 right-0 bg-black/95 backdrop-blur-lg border-b border-white/20 z-50 pt-20 pb-6"
            >
              <nav className="container mx-auto px-4">
                <div className="space-y-6">
                  {navigationItems.map((item, index) => (
                    <motion.button
                      key={item}
                      onClick={() => handleNavClick(item)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="block w-full text-left text-white/80 hover:text-[#FFD700] transition-colors duration-300 font-light text-xl py-4 border-b border-white/10 bg-transparent border-none cursor-pointer"
                    >
                      {item}
                    </motion.button>
                  ))}
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};