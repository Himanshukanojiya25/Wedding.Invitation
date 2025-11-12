import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Heart, Users, Crown, Sparkles } from 'lucide-react';
import { WEDDING_DATA } from '../../utils/constants';
import { ParticleSystem } from '../three/ParticleSystem';
import { FloatingHearts } from '../three/FloatingHearts';
import { SparkleEffects } from '../three/SparkleEffects';
import { componentColors, glowEffects } from '../../utils/colors';
import { sectionAnimations, heartBeat } from '../../utils/animations';

interface FamilyProps {
  isMobile?: boolean;
}

export const Family = ({ isMobile = false }: FamilyProps) => {
  return (
    <section id="family" className="relative py-16 md:py-20 overflow-hidden" style={{ background: 'linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 50%, #1A1A1A 100%)' }}>
      {/* Background Elements - Conditionally render for mobile */}
      {!isMobile && (
        <div className="absolute inset-0">
          <Canvas>
            <FloatingHearts count={15} colors={['#FF1493', '#FFD700', '#00FFFF']} />
            <ParticleSystem 
              count={isMobile ? 20 : 50} 
              behavior="float"
              colors={['#FFD700', '#FF1493', '#8A2BE2']}
              area={[25, 15, 25]}
            />
            <SparkleEffects count={isMobile ? 30 : 60} intensity={1} />
          </Canvas>
        </div>
      )}

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          variants={sectionAnimations}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true }}
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
            Our Beloved Family
          </motion.h2>
          <motion.p 
            className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed"
            style={{ textShadow: '0 2px 10px rgba(255, 255, 255, 0.3)' }}
          >
            With the eternal blessings of our parents and the unwavering support of our families, we embark on this sacred journey together.
          </motion.p>
        </motion.div>

        {/* Main Family Card */}
        <motion.div
          variants={sectionAnimations}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true }}
          className="max-w-4xl md:max-w-5xl mx-auto"
        >
          <motion.div
            whileHover={!isMobile ? { scale: 1.02 } : {}}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden border-2 shadow-2xl"
            style={{ 
              borderImage: 'linear-gradient(45deg, #FFD700, #FF1493, #00FFFF, #8A2BE2) 1',
              boxShadow: '0 40px 60px rgba(0, 0, 0, 0.5)'
            }}
          >
            {/* Header */}
            <div 
              className="bg-gradient-to-r from-[#FFD700] via-[#FF1493] to-[#00FFFF] py-8 md:py-12 px-6 md:px-8 relative overflow-hidden"
              style={{ boxShadow: glowEffects.multi }}
            >
              {/* Animated Background - Only on desktop */}
              {!isMobile && (
                <div className="absolute inset-0">
                  <Canvas>
                    <ParticleSystem
                      count={25}
                      behavior="orbit"
                      colors={['#FFFFFF', '#FFD700', '#FF1493']}
                      area={[15, 8, 15]}
                    />
                  </Canvas>
                </div>
              )}

              <div className="relative z-10 flex items-center justify-center space-x-4 md:space-x-6">
                <motion.div
                  variants={heartBeat}
                  animate="animate"
                >
                  <Crown className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-white drop-shadow-2xl" />
                </motion.div>
                <motion.h3
                  className="text-2xl md:text-4xl lg:text-5xl text-white text-center"
                  style={{ 
                    fontFamily: 'Playfair Display, serif',
                    textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
                  }}
                >
                  Blessings of Our Parents
                </motion.h3>
                <motion.div
                  variants={heartBeat}
                  animate="animate"
                >
                  <Crown className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-white drop-shadow-2xl" />
                </motion.div>
              </div>
            </div>

            {/* Parents Section */}
            <div className="p-6 md:p-8 lg:p-12">
              <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
                {/* Father Card */}
                <motion.div
                  whileHover={!isMobile ? { scale: 1.05, y: -10 } : {}}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="group relative text-center p-6 md:p-8 bg-white/5 backdrop-blur-lg rounded-2xl border-2 transition-all duration-500 hover:bg-white/10"
                  style={{ 
                    borderImage: 'linear-gradient(45deg, #FFD700, #FFA500) 1',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  {/* Animated Icon */}
                  <motion.div
                    whileHover={!isMobile ? { rotate: 360, scale: 1.2 } : {}}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 mx-auto mb-4 md:mb-6 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/20 relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                      boxShadow: glowEffects.gold
                    }}
                  >
                    <Users className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 text-white drop-shadow-lg" strokeWidth={1.5} />
                    
                    {/* Floating Particles - Only on desktop */}
                    {!isMobile && (
                      <div className="absolute inset-0">
                        <Canvas>
                          <ParticleSystem
                            count={8}
                            behavior="orbit"
                            colors={['#FFFFFF', '#FFD700']}
                            area={[2, 2, 2]}
                            size={0.1}
                          />
                        </Canvas>
                      </div>
                    )}
                  </motion.div>

                  <motion.h4
                    className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 md:mb-3"
                    style={{ 
                      fontFamily: 'Playfair Display, serif',
                      textShadow: '0 2px 10px rgba(255, 255, 255, 0.3)'
                    }}
                  >
                    {WEDDING_DATA.parents.father}
                  </motion.h4>
                  <motion.p 
                    className="text-white/70 text-base md:text-lg uppercase tracking-wider font-light"
                    style={{ textShadow: '0 2px 8px rgba(255, 255, 255, 0.2)' }}
                  >
                    Father of the Groom
                  </motion.p>

                  {/* Hover Glow - Only on desktop */}
                  {!isMobile && (
                    <div 
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ boxShadow: '0 0 60px rgba(255, 215, 0, 0.4)' }}
                    />
                  )}
                </motion.div>

                {/* Mother Card */}
                <motion.div
                  whileHover={!isMobile ? { scale: 1.05, y: -10 } : {}}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="group relative text-center p-6 md:p-8 bg-white/5 backdrop-blur-lg rounded-2xl border-2 transition-all duration-500 hover:bg-white/10"
                  style={{ 
                    borderImage: 'linear-gradient(45deg, #FF1493, #DC143C) 1',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  {/* Animated Icon */}
                  <motion.div
                    whileHover={!isMobile ? { rotate: -360, scale: 1.2 } : {}}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 mx-auto mb-4 md:mb-6 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/20 relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, #FF1493 0%, #DC143C 100%)',
                      boxShadow: glowEffects.pink
                    }}
                  >
                    <Heart className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 text-white fill-current drop-shadow-lg" strokeWidth={1.5} />
                    
                    {/* Floating Particles - Only on desktop */}
                    {!isMobile && (
                      <div className="absolute inset-0">
                        <Canvas>
                          <ParticleSystem
                            count={8}
                            behavior="orbit"
                            colors={['#FFFFFF', '#FF1493']}
                            area={[2, 2, 2]}
                            size={0.1}
                          />
                        </Canvas>
                      </div>
                    )}
                  </motion.div>

                  <motion.h4
                    className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 md:mb-3"
                    style={{ 
                      fontFamily: 'Playfair Display, serif',
                      textShadow: '0 2px 10px rgba(255, 255, 255, 0.3)'
                    }}
                  >
                    {WEDDING_DATA.parents.mother}
                  </motion.h4>
                  <motion.p 
                    className="text-white/70 text-base md:text-lg uppercase tracking-wider font-light"
                    style={{ textShadow: '0 2px 8px rgba(255, 255, 255, 0.2)' }}
                  >
                    Mother of the Groom
                  </motion.p>

                  {/* Hover Glow - Only on desktop */}
                  {!isMobile && (
                    <div 
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ boxShadow: '0 0 60px rgba(255, 20, 147, 0.4)' }}
                    />
                  )}
                </motion.div>
              </div>

              {/* Blessing Quote */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-center pt-6 md:pt-8 border-t border-white/20"
              >
                <motion.p 
                  className="text-white/90 leading-relaxed text-base md:text-lg lg:text-xl max-w-3xl mx-auto italic mb-6 md:mb-8"
                  style={{ textShadow: '0 2px 10px rgba(255, 255, 255, 0.2)' }}
                >
                  "With eternally grateful hearts, we honor our parents whose boundless love, 
                  divine guidance, and sacred blessings have illuminated our path. As we begin 
                  this celestial chapter, we carry forward the timeless values and cherished 
                  traditions they've instilled within our souls."
                </motion.p>
                
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.5, type: "spring" }}
                  className="flex items-center justify-center space-x-4 md:space-x-6"
                >
                  <div 
                    className="h-px flex-1 bg-gradient-to-r from-transparent to-[#FFD700]"
                    style={{ boxShadow: '0 0 10px #FFD700' }}
                  />
                  <motion.div
                    variants={heartBeat}
                    animate="animate"
                  >
                    <Sparkles className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-[#FFD700] fill-current" />
                  </motion.div>
                  <div 
                    className="h-px flex-1 bg-gradient-to-l from-transparent to-[#FF1493]"
                    style={{ boxShadow: '0 0 10px #FF1493' }}
                  />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Closing Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-8 md:mt-12"
          >
            <div 
              className="inline-block bg-white/10 backdrop-blur-lg rounded-2xl px-6 py-6 md:px-10 md:py-8 border-2 shadow-2xl"
              style={{ 
                borderImage: 'linear-gradient(45deg, #00FFFF, #8A2BE2) 1',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)'
              }}
            >
              <motion.p
                className="text-xl md:text-2xl lg:text-3xl text-[#FFD700] mb-2 md:mb-3"
                style={{ 
                  fontFamily: 'Great Vibes, cursive',
                  textShadow: glowEffects.gold
                }}
              >
                United by Eternal Love, Blessed by Divine Family
              </motion.p>
              <motion.p 
                className="text-white/80 text-base md:text-lg"
                style={{ textShadow: '0 2px 8px rgba(255, 255, 255, 0.2)' }}
              >
                We are thrilled to celebrate with all our cherished loved ones
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};