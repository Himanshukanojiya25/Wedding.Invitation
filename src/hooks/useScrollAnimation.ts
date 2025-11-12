import { useEffect, useState, useRef } from 'react';

export const useScrollAnimation = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { 
        threshold,
        // Mobile optimization: Use passive scrolling
        ...(typeof window !== 'undefined' && 'ontouchstart' in window 
          ? { root: null, rootMargin: '0px 0px -10% 0px' }
          : {}
        )
      }
    );

    const element = document.getElementById('scroll-target');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold]);

  return isVisible;
};

export const useScrollPosition = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Mobile optimization: Use passive scroll listener
    const options = typeof window !== 'undefined' && 'ontouchstart' in window 
      ? { passive: true } 
      : {};

    window.addEventListener('scroll', handleScroll, options);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollY;
};