import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { MapPin, Navigation, Calendar, Compass, ExternalLink } from 'lucide-react';
import { WEDDING_DATA } from '../../utils/constants';
import { ParticleSystem } from '../three/ParticleSystem';
import { SparkleEffects } from '../three/SparkleEffects';
import { componentColors, glowEffects } from '../../utils/colors';
import { sectionAnimations } from '../../utils/animations';

export const Venue = () => {
  const venues = [
    {
      ...WEDDING_DATA.events.haldi,
      mapUrl:'https://maps.app.goo.gl/ZtYVDMXKj2zMeRyEA?g_st=ipc',
      gradient: 'from-[#FFD700] to-[#FFA500]',
      glow: glowEffects.gold,
      icon: Calendar,
      particles: ['#FFD700', '#FFA500'],
      image: null // No image for Haldi
    },
    {
      ...WEDDING_DATA.events.wedding,
      mapUrl: 'https://maps.app.goo.gl/P5z5Bxhexik7dUNM8',
      image: 'https://cdn0.weddingwire.in/vendor/7837/3_2/640/jpg/om-bhavan-1_15_267837-157172015919894.jpeg',
      gradient: 'from-[#8A2BE2] to-[#4B0082]',
      glow: glowEffects.purple,
      icon: Compass,
      particles: ['#8A2BE2', '#4B0082']
    },
  ];

  return (
    <section id="venue" className="relative py-20 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 50%, #0A0A0A 100%)' }}>
      {/* Background Elements */}
      <div className="absolute inset-0">
        <Canvas>
          <ParticleSystem 
            count={120} 
            behavior="float"
            colors={['#FF1493', '#00FFFF', '#FFD700']}
            area={[35, 25, 35]}
          />
          <SparkleEffects count={100} intensity={0.7} />
        </Canvas>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          variants={sectionAnimations}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.h2
            className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6"
            style={{ 
              fontFamily: 'Great Vibes, cursive',
              background: 'linear-gradient(135deg, #00FFFF 0%, #8A2BE2 50%, #FF1493 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 30px rgba(0, 255, 255, 0.3))'
            }}
          >
            Venue
          </motion.h2>
          <motion.p 
            className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed"
            style={{ textShadow: '0 2px 10px rgba(255, 255, 255, 0.3)' }}
          >
            Discover the magical venues where our dreams will become reality. We eagerly await your presence!
          </motion.p>
        </motion.div>

        {/* Venues Grid */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {venues.map((venue, index) => (
            <motion.div
              key={venue.name}
              variants={sectionAnimations}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.3 }}
              className="group relative"
            >
              {/* Venue Card */}
              <motion.div
                whileHover={{ scale: 1.03, y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden border-2 shadow-2xl"
                style={{ 
                  borderImage: `linear-gradient(45deg, ${venue.particles.join(',')}) 1`,
                  boxShadow: '0 30px 50px rgba(0, 0, 0, 0.4)'
                }}
              >
                {/* Animated Header */}
                <div 
                  className={`h-48 bg-gradient-to-r ${venue.gradient} relative overflow-hidden`}
                  style={{ boxShadow: venue.glow }}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <venue.icon className="w-16 h-16 text-white mb-4 drop-shadow-2xl" />
                    <motion.h3
                      className="text-4xl text-center text-white font-bold"
                      style={{ 
                        fontFamily: 'Playfair Display, serif',
                        textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
                      }}
                    >
                      {venue.name}
                    </motion.h3>
                    <motion.p 
                      className="text-white/90 text-lg mt-2"
                      style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)' }}
                    >
                      {venue.displayDate}
                    </motion.p>
                  </div>

                  {/* Floating Particles */}
                  <div className="absolute inset-0">
                    <Canvas>
                      <ParticleSystem
                        count={25}
                        behavior="orbit"
                        colors={venue.particles}
                        area={[12, 8, 8]}
                        speed={0.3}
                      />
                    </Canvas>
                  </div>
                </div>

                {/* Venue Details */}
                <div className="p-8 space-y-6">
                  {/* Location Details */}
                  <motion.div
                    whileHover={{ x: 10 }}
                    className="flex items-start space-x-4 p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300 group/item"
                  >
                    <div className="p-3 rounded-xl bg-gradient-to-r from-[#FF1493] to-[#FFD700] flex-shrink-0">
                      <MapPin className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-bold text-xl mb-2 group-hover/item:text-[#FFD700] transition-colors duration-300">
                        {venue.venue}
                      </p>
                      <p className="text-white/80 text-lg leading-relaxed">{venue.address}</p>
                      <p className="text-white/60 text-sm mt-2">{venue.location}</p>
                    </div>
                  </motion.div>

                  {/* Venue Image or Map Placeholder */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="h-80 rounded-2xl overflow-hidden border-2 relative group/map"
                    style={{ 
                      borderImage: `linear-gradient(45deg, ${venue.particles.join(',')}) 1`,
                    }}
                  >
                    {venue.image ? (
                      // Show Lawn Image for Wedding
                      <div className="relative w-full h-full">
                        <img 
                          src={venue.image} 
                          alt={venue.venue}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover/map:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover/map:bg-black/10 transition-all duration-500" />
                        <div className="absolute bottom-4 left-4 right-4 text-white">
                          <p className="text-lg font-semibold drop-shadow-lg">{venue.venue}</p>
                          <p className="text-sm opacity-90 drop-shadow-lg">Beautiful Wedding Venue</p>
                        </div>
                      </div>
                    ) : (
                      // Show Map Placeholder for Haldi
                      <div 
                        className="w-full h-full flex flex-col items-center justify-center"
                        style={{ background: 'linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 100%)' }}
                      >
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          className="w-32 h-32 rounded-full border-4 border-dashed opacity-30"
                          style={{ borderColor: venue.particles[0] }}
                        />
                        <MapPin className="w-20 h-20 absolute text-white/50" />
                        <div className="text-center mt-24">
                          <p className="text-white/70 text-lg mb-2">Interactive 3D Map</p>
                          <p className="text-white/50 text-sm">{venue.location}</p>
                        </div>
                      </div>
                    )}

                    {/* Hover Effect */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover/map:opacity-100 transition-opacity duration-500"
                      style={{ 
                        background: `radial-gradient(circle at center, ${venue.particles[0]}20, transparent 70%)`
                      }}
                    />
                  </motion.div>

                  {/* Directions Button */}
                  <motion.a
                    href={venue.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)' }}
                    whileTap={{ scale: 0.95 }}
                    className="group/btn flex items-center justify-center space-x-3 w-full py-5 rounded-2xl font-bold text-lg transition-all duration-500 relative overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${venue.particles.join(', ')})`,
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)'
                    }}
                  >
                    {/* Animated Background */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(135deg, ${venue.particles.reverse().join(', ')})`
                      }}
                    />

                    <Navigation className="w-6 h-6 text-white relative z-10" />
                    <span className="text-white relative z-10">Get Directions</span>

                    {/* Sparkle Effect */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="absolute right-6 w-4 h-4 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"
                    >
                      <div className="w-full h-full rounded-full bg-white/80" />
                    </motion.div>
                  </motion.a>
                </div>

                {/* Hover Glow */}
                <div 
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ boxShadow: `0 0 80px ${venue.particles[0]}40` }}
                />
              </motion.div>

              {/* Floating Decorative Element */}
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 180, 360]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 w-12 h-12 rounded-full opacity-80"
                style={{ 
                  background: `radial-gradient(circle, ${venue.particles[0]}, transparent 70%)`,
                  boxShadow: `0 0 30px ${venue.particles[0]}`
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Help Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div 
            className="inline-block bg-white/10 backdrop-blur-lg rounded-2xl px-10 py-8 border-2 shadow-2xl"
            style={{ 
              borderImage: 'linear-gradient(45deg, #FF1493, #00FFFF) 1',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)'
            }}
          >
            <motion.p 
              className="text-white text-xl"
              style={{ textShadow: '0 2px 10px rgba(255, 255, 255, 0.3)' }}
            >
              <span className="font-bold text-[#FFD700]">Need Assistance?</span> Feel free to contact 
              us for directions or accommodation recommendations     Pravin Zalte - 9834036893
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};