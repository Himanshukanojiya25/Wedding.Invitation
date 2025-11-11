import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Heart, Star, Clock } from 'lucide-react';
import { WEDDING_DATA } from '../../utils/constants';
import { ParticleSystem } from '../three/ParticleSystem';
import { FloatingHearts } from '../three/FloatingHearts';
import { componentColors, glowEffects } from '../../utils/colors';
import { sectionAnimations, heartBeat } from '../../utils/animations';

export const LoveStory = () => {
  // Filter out the 3rd story (proposal) - only show first 2 stories
  const filteredStories = WEDDING_DATA.loveStory.filter((_, index) => index !== 2);

  return (
    <section id="story" className="relative pt-52 pb-32 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 50%, #2A2A2A 100%)' }}>
      {/* Background Elements */}
      <div className="absolute inset-0">
        <Canvas>
          <FloatingHearts count={20} colors={['#FF1493', '#FFD700']} />
          <ParticleSystem 
            count={60} 
            behavior="orbit"
            colors={['#FF1493', '#00FFFF', '#FFD700']}
            area={[25, 15, 25]}
          />
        </Canvas>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header - Added more margin top */}
        <motion.div
          variants={sectionAnimations}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true }}
          className="text-center mb-20 mt-16"
        >
          <motion.h2
            className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6"
            style={{ 
              fontFamily: 'Great Vibes, cursive',
              background: 'linear-gradient(135deg, #FF1493 0%, #FFD700 50%, #00FFFF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 30px rgba(255, 20, 147, 0.3))'
            }}
          >
            Our Story
          </motion.h2>
          <motion.p 
            className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed"
            style={{ textShadow: '0 2px 10px rgba(255, 255, 255, 0.3)' }}
          >
            Every love story is magical, but ours is written in the stars. Here's how our journey began and blossomed into forever.
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-5xl mx-auto relative">
          {/* Animated Timeline Line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#FF1493] via-[#FFD700] to-[#00FFFF] rounded-full"
            style={{ boxShadow: glowEffects.multi }}
          />

          {filteredStories.map((chapter, index) => (
            <TimelineItem
              key={index}
              chapter={chapter}
              index={index}
              isLeft={index % 2 === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface TimelineItemProps {
  chapter: {
    year: string;
    title: string;
    description: string;
  };
  index: number;
  isLeft: boolean;
}

const TimelineItem = ({ chapter, index, isLeft }: TimelineItemProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const chapterColors = [
    { gradient: 'from-[#FF1493] to-[#FF69B4]', glow: glowEffects.pink },
    { gradient: 'from-[#FFD700] to-[#FFA500]', glow: glowEffects.gold },
    { gradient: 'from-[#00FFFF] to-[#0080FF]', glow: glowEffects.blue },
  ];

  const currentColor = chapterColors[index % chapterColors.length];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -100 : 100, y: 50 }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2, type: "spring" }}
      className={`relative mb-20 ${
        isLeft ? 'md:pr-1/2 md:text-right' : 'md:pl-1/2 md:text-left'
      }`}
    >
      <div className={`md:w-1/2 ${isLeft ? 'md:ml-auto md:pr-16' : 'md:pl-16'}`}>
        {/* Story Card */}
        <motion.div
          whileHover={{ 
            scale: 1.05,
            y: -10,
            boxShadow: '0 40px 60px rgba(0, 0, 0, 0.5)'
          }}
          transition={{ type: "spring", stiffness: 300 }}
          className="group relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border-2 transition-all duration-500 hover:bg-white/15"
          style={{ 
            borderImage: `linear-gradient(45deg, ${currentColor.gradient.replace('from-', '').replace('to-', '')}) 1`,
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
          }}
        >
          {/* Year Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: index * 0.2 + 0.3, type: "spring" }}
            className={`absolute -top-4 ${isLeft ? '-right-4' : '-left-4'} z-20`}
          >
            <div 
              className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${currentColor.gradient} flex items-center justify-center shadow-2xl border-4 border-white/20`}
              style={{ boxShadow: currentColor.glow }}
            >
              <motion.span
                variants={heartBeat}
                animate="animate"
                className="text-white font-bold text-xs"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                2025
              </motion.span>
            </div>
          </motion.div>

          {/* Content */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
            >
              <h3
                className="text-3xl font-bold text-white mb-3"
                style={{ 
                  fontFamily: 'Playfair Display, serif',
                  textShadow: '0 2px 10px rgba(255, 255, 255, 0.3)'
                }}
              >
                {chapter.title}
              </h3>

              <motion.p 
                className="text-white/80 leading-relaxed text-lg"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
              >
                {chapter.description}
              </motion.p>
            </motion.div>

            {/* Animated Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 + 0.6 }}
              className="pt-4"
            >
              <div 
                className="h-1 rounded-full bg-gradient-to-r from-transparent via-white/50 to-transparent"
                style={{ boxShadow: '0 0 20px rgba(255, 255, 255, 0.3)' }}
              />
            </motion.div>

            {/* Decorative Icon */}
            <motion.div
              initial={{ opacity: 0, rotate: -180 }}
              animate={isInView ? { opacity: 1, rotate: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 + 0.7 }}
              className="flex justify-center"
            >
              {index === 0 && <Star className="w-6 h-6 text-[#FFD700] fill-current" />}
              {index === 1 && <Heart className="w-6 h-6 text-[#FF1493] fill-current" />}
              {/* Removed the 3rd icon since we only have 2 stories now */}
            </motion.div>
          </div>

          {/* Hover Glow */}
          <div 
            className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ boxShadow: currentColor.glow }}
          />
        </motion.div>
      </div>

      {/* Timeline Node */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.5, delay: index * 0.2 + 0.3, type: "spring" }}
        className="absolute top-8 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/20 z-10"
        style={{ 
          background: `linear-gradient(135deg, ${currentColor.gradient.replace('from-', '').replace('to-', '')})`,
          boxShadow: currentColor.glow
        }}
      >
        <motion.div
          variants={heartBeat}
          animate="animate"
        >
          <Heart className="w-5 h-5 text-white fill-current drop-shadow-lg" />
        </motion.div>
      </motion.div>

      {/* Connection Line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
        className={`absolute top-16 h-1 bg-gradient-to-r ${isLeft ? 'from-[#FF1493] to-transparent right-0 left-1/2' : 'from-transparent to-[#00FFFF] left-0 right-1/2'} hidden md:block`}
        style={{ boxShadow: '0 0 10px currentColor' }}
      />
    </motion.div>
  );
};