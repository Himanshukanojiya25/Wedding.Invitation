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

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && <Loading />}
      </AnimatePresence>

      {!loading && (
        <div className="min-h-screen bg-[#0A0A0A] overflow-hidden">
          <Header />
          <main>
            <Hero />
            <LoveStory />
            <Events />
            <Family />
            <Venue />
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;