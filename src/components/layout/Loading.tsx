import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { isMobile, isLowPerformanceDevice } from '../../utils/helpers';

export const Loading = () => {
  const mobile = isMobile();
  const lowPerformance = isLowPerformanceDevice();

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#FFFBF5] via-[#F8E6E8] to-[#FFFBF5]"
    >
      <div className={`text-center ${mobile ? 'space-y-4' : 'space-y-6'}`}>
        <motion.div
          animate={{
            scale: lowPerformance ? [1, 1.1, 1] : [1, 1.2, 1],
            rotate: lowPerformance ? [0, 180, 0] : [0, 360],
          }}
          transition={{
            duration: mobile ? 2.5 : 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="flex justify-center"
        >
          <Heart 
            className={`${mobile ? 'w-12 h-12' : 'w-16 h-16'} text-[#D4AF37] fill-current`} 
          />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: mobile ? 10 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: mobile ? 0.1 : 0.2,
            duration: mobile ? 0.3 : 0.5
          }}
          className={`text-[#D4AF37] ${mobile ? 'text-3xl' : 'text-5xl'}`}
          style={{ fontFamily: 'Great Vibes, cursive' }}
        >
          Praful & Pranjali
        </motion.h2>

        <motion.div
          className="flex space-x-2 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: mobile ? 0.2 : 0.4 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className={`${mobile ? 'w-2 h-2' : 'w-3 h-3'} bg-[#D4AF37] rounded-full`}
              animate={{
                y: lowPerformance ? [0, -5, 0] : [0, -10, 0],
              }}
              transition={{
                duration: mobile ? 0.8 : 0.6,
                repeat: Infinity,
                delay: i * (mobile ? 0.3 : 0.2),
              }}
            />
          ))}
        </motion.div>

        <p className={`text-gray-600 ${mobile ? 'text-xs' : 'text-sm'}`}>
          Loading your invitation...
        </p>
      </div>
    </motion.div>
  );
};

export default Loading;