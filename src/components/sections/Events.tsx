import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Sparkles, Heart } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { Countdown } from '../ui/Countdown';
import { WEDDING_DATA } from '../../utils/constants';
import { ParticleSystem } from '../three/ParticleSystem';
import { SparkleEffects } from '../three/SparkleEffects';
import { componentColors, neonGradients, glowEffects } from '../../utils/colors';
import { sectionAnimations, hoverGlow, floatingAnimations } from '../../utils/animations';

interface EventsProps {
  isMobile?: boolean;
}

export const Events = ({ isMobile = false }: EventsProps) => {
  const events = [
    {
      ...WEDDING_DATA.events.haldi,
      icon: Sparkles,
      gradient: 'from-[#FFD700] via-[#FF1493] to-[#00FFFF]',
      glow: glowEffects.gold,
      description: 'A sacred ceremony filled with turmeric blessings, laughter, and joyous celebrations.',
      particles: ['#FFD700', '#FFA500']
    },
    {
      ...WEDDING_DATA.events.wedding,
      icon: Heart,
      gradient: 'from-[#8A2BE2] via-[#FF1493] to-[#FFD700]',
      glow: glowEffects.purple,
      description: 'The magical moment we unite our souls and begin our eternal journey together.',
      particles: ['#FF1493', '#8A2BE2']
    },
  ];

  return (
    <section id="events" className="relative py-16 md:py-20 overflow-hidden" style={{ background: componentColors.hero.background }}>
      {/* Animated Background - Conditionally render for mobile */}
      {!isMobile && (
        <div className="absolute inset-0">
          <Canvas>
            <ParticleSystem 
              count={isMobile ? 20 : 50} 
              behavior="float"
              colors={['#FF1493', '#FFD700', '#00FFFF', '#8A2BE2']}
              area={[30, 20, 30]}
            />
            <SparkleEffects count={isMobile ? 30 : 80} intensity={0.8} />
          </Canvas>
        </div>
      )}

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          variants={sectionAnimations}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, margin: isMobile ? "-50px" : "-100px" }}
          className="text-center mb-12 md:mb-20"
        >
          <motion.h2
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
            style={{ 
              fontFamily: 'Great Vibes, cursive',
              background: 'linear-gradient(135deg, #FFD700 0%, #FF1493 50%, #00FFFF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 30px rgba(255, 215, 0, 0.3))'
            }}
          >
            Wedding Events
          </motion.h2>
          <motion.p 
            className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed"
            style={{ textShadow: '0 2px 10px rgba(255, 255, 255, 0.3)' }}
          >
            Join us in celebrating these sacred moments as we unite our hearts in love and tradition
          </motion.p>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-12 md:mb-20"
        >
          <motion.div
            className="text-center mb-8 md:mb-12"
            whileHover={!isMobile ? { scale: 1.02 } : {}}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3
              className="text-2xl md:text-4xl lg:text-5xl text-white mb-6"
              style={{ 
                fontFamily: 'Playfair Display, serif',
                textShadow: glowEffects.multi
              }}
            >
              Counting Down to Forever
            </h3>
          </motion.div>
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 md:p-8 border-2" style={{ borderImage: 'linear-gradient(45deg, #FFD700, #FF1493, #00FFFF) 1' }}>
            <Countdown targetDate={WEDDING_DATA.events.wedding.date} />
          </div>
        </motion.div>

        {/* Events Grid */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 max-w-7xl mx-auto">
          {events.map((event, index) => (
            <motion.div
              key={event.name}
              variants={sectionAnimations}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, margin: isMobile ? "-25px" : "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.3 }}
              whileHover={!isMobile ? "hover" : {}}
              className="group relative"
            >
              {/* Event Card */}
              <motion.div
                variants={!isMobile ? hoverGlow : {}}
                className="relative bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden border-2 transition-all duration-500 group-hover:scale-105"
                style={{ 
                  borderImage: `linear-gradient(45deg, ${event.particles.join(',')}) 1`,
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
                }}
              >
                {/* Animated Header */}
                <div 
                  className={`h-32 md:h-40 bg-gradient-to-r ${event.gradient} relative overflow-hidden`}
                  style={{ boxShadow: event.glow }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <event.icon className="w-12 h-12 md:w-16 md:h-16 text-white drop-shadow-2xl" strokeWidth={1.2} />
                  </div>
                  
                  {/* Floating Particles - Only on desktop */}
                  {!isMobile && (
                    <div className="absolute inset-0">
                      <Canvas>
                        <ParticleSystem
                          count={15}
                          behavior="float"
                          colors={event.particles}
                          area={[8, 4, 8]}
                          speed={0.5}
                        />
                      </Canvas>
                    </div>
                  )}

                  <motion.h3
                    className="text-2xl md:text-4xl text-center text-white font-bold pt-4 absolute bottom-4 left-0 right-0"
                    style={{ 
                      fontFamily: 'Playfair Display, serif',
                      textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
                    }}
                  >
                    {event.name}
                  </motion.h3>
                </div>

                {/* Event Details */}
                <div className="p-6 md:p-8 space-y-4 md:space-y-6">
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center border-b border-white/20 pb-4 md:pb-6"
                  >
                    <p className="text-white/80 italic text-base md:text-lg leading-relaxed">
                      {event.description}
                    </p>
                  </motion.div>

                  <div className="space-y-3 md:space-y-4">
                    {/* Date */}
                    <motion.div
                      whileHover={!isMobile ? { x: 10 } : {}}
                      className="flex items-center space-x-3 md:space-x-4 p-3 md:p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="p-2 md:p-3 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#FF1493]">
                        <Calendar className="w-5 h-5 md:w-6 md:h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-semibold text-lg">{event.displayDate}</p>
                      </div>
                    </motion.div>

                    {/* Time */}
                    <motion.div
                      whileHover={!isMobile ? { x: 10 } : {}}
                      className="flex items-center space-x-3 md:space-x-4 p-3 md:p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="p-2 md:p-3 rounded-xl bg-gradient-to-r from-[#00FFFF] to-[#8A2BE2]">
                        <Clock className="w-5 h-5 md:w-6 md:h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-white/90 text-base md:text-lg">{event.time}</p>
                      </div>
                    </motion.div>

                    {/* Venue */}
                    <motion.div
                      whileHover={!isMobile ? { x: 10 } : {}}
                      className="flex items-center space-x-3 md:space-x-4 p-3 md:p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="p-2 md:p-3 rounded-xl bg-gradient-to-r from-[#FF1493] to-[#FFD700]">
                        <MapPin className="w-5 h-5 md:w-6 md:h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-semibold text-lg">{event.venue}</p>
                        <p className="text-white/70 text-sm md:text-base">{event.address}</p>
                        <p className="text-white/50 text-xs mt-1">{event.location}</p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Animated Divider */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="pt-4"
                  >
                    <div 
                      className="h-1 rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${event.particles.join(', ')})`,
                        boxShadow: '0 0 20px rgba(255, 255, 255, 0.3)'
                      }}
                    />
                  </motion.div>
                </div>

                {/* Hover Glow Effect - Only on desktop */}
                {!isMobile && (
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ boxShadow: '0 0 80px rgba(255, 215, 0, 0.3)' }}
                  />
                )}
              </motion.div>

              {/* Floating Elements - Only on desktop */}
              {!isMobile && (
                <motion.div
                  variants={floatingAnimations.dramatic}
                  className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-gradient-to-r from-[#FF1493] to-[#00FFFF] opacity-80"
                  style={{ boxShadow: '0 0 20px #FF1493' }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};