import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Loading } from './components/layout/Loading';
import { Hero } from './components/sections/Hero';
import { LoveStory } from './components/sections/LoveStory';
import { Events } from './components/sections/Events';
import { Family } from './components/sections/Family';
import { Venue } from './components/sections/Venue';

function App() {
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Advanced mobile detection
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      const isAndroid = /Android/.test(navigator.userAgent);
      
      // Mobile pe heavy animations disable
      setIsMobile(mobile || isIOS || isAndroid);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('orientationchange', checkMobile);

    // Loading timer
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('orientationchange', checkMobile);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && <Loading />}
      </AnimatePresence>

      {!loading && (
        <div className={`min-h-screen bg-[#0A0A0A] overflow-hidden ${isMobile ? 'mobile-optimized' : ''}`}>
          <Header isMobile={isMobile} />
          <main>
            <Hero isMobile={isMobile} />
            <LoveStory isMobile={isMobile} />
            <Events isMobile={isMobile} />
            <Family isMobile={isMobile} />
            <Venue isMobile={isMobile} />
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;