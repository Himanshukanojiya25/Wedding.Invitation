import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { calculateTimeRemaining, isMobile, isLowPerformanceDevice } from '../../utils/helpers';

interface CountdownProps {
  targetDate: string;
}

export const Countdown = ({ targetDate }: CountdownProps) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeRemaining(targetDate));
  const mobile = isMobile();
  const lowPerformance = isLowPerformanceDevice();

  // Optimized timer for mobile - less frequent updates to save battery
  useEffect(() => {
    const updateInterval = mobile ? 2000 : 1000; // 2 seconds on mobile, 1 second on desktop
    
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeRemaining(targetDate));
    }, updateInterval);

    return () => clearInterval(timer);
  }, [targetDate, mobile]);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  if (timeLeft.isExpired) {
    return (
      <div className="text-center py-8">
        <p className="text-xl md:text-2xl text-[#D4AF37]" style={{ fontFamily: 'Great Vibes, cursive' }}>
          The celebration has begun!
        </p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-2 ${mobile ? 'gap-3' : 'gap-4 md:gap-6'}`}>
      {timeUnits.map((unit, index) => (
        <motion.div
          key={unit.label}
          initial={{ opacity: 0, y: mobile ? 10 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: mobile ? "-20px" : "-50px" }}
          transition={{ 
            duration: mobile ? 0.3 : 0.5, 
            delay: index * (mobile ? 0.05 : 0.1) 
          }}
          className={`
            bg-white rounded-xl shadow-lg border-2 border-[#F8E6E8] 
            hover:border-[#D4AF37] transition-colors duration-300
            ${mobile ? 'p-3' : 'p-4 md:p-6'}
          `}
        >
          <motion.div
            key={unit.value}
            initial={{ scale: 1 }}
            animate={{ 
              scale: lowPerformance ? 1 : [1, 1.1, 1] 
            }}
            transition={{ 
              duration: mobile ? 0.4 : 0.3,
              repeat: lowPerformance ? 0 : Infinity,
              repeatDelay: 1
            }}
            className={`
              font-bold text-[#D4AF37] mb-1
              ${mobile ? 'text-2xl' : 'text-3xl md:text-5xl'}
            `}
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            {String(unit.value).padStart(2, '0')}
          </motion.div>
          <div className={`
            text-gray-600 uppercase tracking-wider
            ${mobile ? 'text-xs' : 'text-sm md:text-base'}
          `}>
            {unit.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Countdown;