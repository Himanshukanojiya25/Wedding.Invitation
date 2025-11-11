import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { calculateTimeRemaining } from '../../utils/helpers';

interface CountdownProps {
  targetDate: string;
}

export const Countdown = ({ targetDate }: CountdownProps) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeRemaining(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeRemaining(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  if (timeLeft.isExpired) {
    return (
      <div className="text-center py-8">
        <p className="text-2xl text-[#D4AF37]" style={{ fontFamily: 'Great Vibes, cursive' }}>
          The celebration has begun!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {timeUnits.map((unit, index) => (
        <motion.div
          key={unit.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-white rounded-xl shadow-lg p-6 border-2 border-[#F8E6E8] hover:border-[#D4AF37] transition-colors duration-300"
        >
          <motion.div
            key={unit.value}
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-[#D4AF37] mb-2"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            {String(unit.value).padStart(2, '0')}
          </motion.div>
          <div className="text-sm md:text-base text-gray-600 uppercase tracking-wider">
            {unit.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
};
