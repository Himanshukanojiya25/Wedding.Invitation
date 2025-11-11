import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export const Loading = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#FFFBF5] via-[#F8E6E8] to-[#FFFBF5]"
    >
      <div className="text-center space-y-6">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="flex justify-center"
        >
          <Heart className="w-16 h-16 text-[#D4AF37] fill-current" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl text-[#D4AF37]"
          style={{ fontFamily: 'Great Vibes, cursive' }}
        >
          Praful & Pranjali
        </motion.h2>

        <motion.div
          className="flex space-x-2 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-[#D4AF37] rounded-full"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>

        <p className="text-gray-600 text-sm">Loading your invitation...</p>
      </div>
    </motion.div>
  );
};
