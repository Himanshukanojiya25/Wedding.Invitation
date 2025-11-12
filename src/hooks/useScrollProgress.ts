import { useState, useEffect, useRef } from 'react';

interface ScrollState {
  progress: number;
  direction: 'up' | 'down' | 'none';
  velocity: number;
  isScrolling: boolean;
  sectionProgress: { [key: string]: number };
  currentSection: string;
  isAtTop: boolean;
  isAtBottom: boolean;
}

interface UseScrollProgressReturn extends ScrollState {
  ref: React.RefObject<HTMLElement>;
  scrollTo: (elementId: string, offset?: number) => void;
  scrollToTop: () => void;
  scrollToBottom: () => void;
  isSectionVisible: (sectionId: string) => boolean;
  getSectionProgress: (sectionId: string) => number;
}

interface SectionConfig {
  id: string;
  threshold?: number;
  offset?: number;
}

export const useScrollProgress = (
  sections: SectionConfig[] = []
): UseScrollProgressReturn => {
  const ref = useRef<HTMLElement>(null);
  const lastScrollY = useRef<number>(0);
  const lastScrollTime = useRef<number>(Date.now());
  const scrollTimeout = useRef<NodeJS.Timeout>();
  const observerRef = useRef<IntersectionObserver>();

  const [state, setState] = useState<ScrollState>({
    progress: 0,
    direction: 'none',
    velocity: 0,
    isScrolling: false,
    sectionProgress: {},
    currentSection: '',
    isAtTop: true,
    isAtBottom: false,
  });

  // Mobile optimization: Throttle scroll events more aggressively on mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const throttleDelay = isMobile ? 32 : 16; // ~30fps on mobile, ~60fps on desktop

  // Calculate scroll progress and velocity
  useEffect(() => {
    const element = ref.current || document.documentElement;
    let animationFrameId: number;

    const updateScrollState = () => {
      const currentScrollY = element.scrollTop;
      const currentTime = Date.now();
      const deltaTime = currentTime - lastScrollTime.current;

      if (deltaTime > 0) {
        const scrollHeight = element.scrollHeight - window.innerHeight;
        const newProgress = scrollHeight > 0 ? currentScrollY / scrollHeight : 0;
        const deltaY = currentScrollY - lastScrollY.current;
        const velocity = Math.abs(deltaY) / deltaTime;
        const direction: 'up' | 'down' | 'none' = deltaY > 0 ? 'down' : deltaY < 0 ? 'up' : 'none';

        setState(prev => ({
          ...prev,
          progress: newProgress,
          direction,
          velocity,
          isScrolling: true,
          isAtTop: currentScrollY <= 0,
          isAtBottom: currentScrollY >= scrollHeight - 5,
        }));

        lastScrollY.current = currentScrollY;
        lastScrollTime.current = currentTime;
      }

      animationFrameId = requestAnimationFrame(updateScrollState);
    };

    // Throttle scroll events for better performance
    const handleScroll = () => {
      if (!scrollTimeout.current) {
        scrollTimeout.current = setTimeout(() => {
          updateScrollState();
          scrollTimeout.current = undefined;
        }, throttleDelay);
      }
    };

    const handleScrollEnd = () => {
      setState(prev => ({ ...prev, isScrolling: false }));
    };

    // Use requestAnimationFrame for smooth updates
    animationFrameId = requestAnimationFrame(updateScrollState);

    // Mobile optimization: Use passive scroll listeners
    const scrollOptions = isMobile ? { passive: true } : {};
    
    element.addEventListener('scroll', handleScroll, scrollOptions);
    window.addEventListener('scrollend', handleScrollEnd, scrollOptions);

    return () => {
      cancelAnimationFrame(animationFrameId);
      element.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scrollend', handleScrollEnd);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [isMobile, throttleDelay]);

  // Intersection Observer for section tracking
  useEffect(() => {
    if (sections.length === 0) return;

    const options = {
      root: ref.current || null,
      rootMargin: isMobile ? '-5% 0px -5% 0px' : '-10% 0px -10% 0px', // Smaller margin on mobile
      threshold: buildThresholdList(isMobile ? 50 : 100), // Fewer steps on mobile
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const sectionId = entry.target.id;
        const ratio = entry.intersectionRatio;

        setState(prev => ({
          ...prev,
          sectionProgress: {
            ...prev.sectionProgress,
            [sectionId]: ratio,
          },
        }));

        // Update current section based on highest visibility
        if (ratio > 0.5) {
          setState(prev => ({ ...prev, currentSection: sectionId }));
        }
      });
    }, options);

    // Observe all sections
    sections.forEach(section => {
      const element = document.getElementById(section.id);
      if (element) {
        observerRef.current?.observe(element);
      }
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [sections, isMobile]);

  // Build threshold array for Intersection Observer
  const buildThresholdList = (numSteps: number): number[] => {
    const thresholds: number[] = [];
    for (let i = 1.0; i <= numSteps; i++) {
      const ratio = i / numSteps;
      thresholds.push(ratio);
    }
    return thresholds;
  };

  // Smooth scroll to element
  const scrollTo = (elementId: string, offset: number = 0): void => {
    const element = document.getElementById(elementId);
    if (!element) return;

    const elementRect = element.getBoundingClientRect();
    const absoluteElementTop = elementRect.top + window.pageYOffset;
    const scrollPosition = absoluteElementTop - offset;

    // Mobile optimization: Use instant scroll for better UX
    const behavior = isMobile ? 'auto' : 'smooth';
    
    window.scrollTo({
      top: scrollPosition,
      behavior,
    });
  };

  // Scroll to top
  const scrollToTop = (): void => {
    const behavior = isMobile ? 'auto' : 'smooth';
    window.scrollTo({
      top: 0,
      behavior,
    });
  };

  // Scroll to bottom
  const scrollToBottom = (): void => {
    const behavior = isMobile ? 'auto' : 'smooth';
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior,
    });
  };

  // Check if section is visible
  const isSectionVisible = (sectionId: string): boolean => {
    return (state.sectionProgress[sectionId] || 0) > 0.1;
  };

  // Get specific section progress
  const getSectionProgress = (sectionId: string): number => {
    return state.sectionProgress[sectionId] || 0;
  };

  // Parallax effect calculator
  const getParallaxOffset = (speed: number = 0.5): number => {
    return state.progress * window.innerHeight * speed;
  };

  // Scroll-triggered animation progress
  const getAnimationProgress = (start: number = 0, end: number = 1): number => {
    const range = end - start;
    const adjustedProgress = (state.progress - start) / range;
    return Math.max(0, Math.min(1, adjustedProgress));
  };

  return {
    ...state,
    ref,
    scrollTo,
    scrollToTop,
    scrollToBottom,
    isSectionVisible,
    getSectionProgress,
    // Additional utilities
    getParallaxOffset,
    getAnimationProgress,
  };
};

// 🎯 SECTION-BASED SCROLL HOOK
export const useSectionScroll = (sectionIds: string[] = []) => {
  const sections: SectionConfig[] = sectionIds.map(id => ({ id }));
  const scroll = useScrollProgress(sections);

  // Get current section index
  const currentSectionIndex = sectionIds.indexOf(scroll.currentSection);

  // Get next and previous sections
  const nextSection = currentSectionIndex < sectionIds.length - 1 ? sectionIds[currentSectionIndex + 1] : null;
  const prevSection = currentSectionIndex > 0 ? sectionIds[currentSectionIndex - 1] : null;

  // Scroll to next section
  const scrollToNext = () => {
    if (nextSection) {
      scroll.scrollTo(nextSection);
    }
  };

  // Scroll to previous section
  const scrollToPrev = () => {
    if (prevSection) {
      scroll.scrollTo(prevSection);
    }
  };

  // Check if at first section
  const isFirstSection = currentSectionIndex === 0;

  // Check if at last section
  const isLastSection = currentSectionIndex === sectionIds.length - 1;

  return {
    ...scroll,
    currentSectionIndex,
    nextSection,
    prevSection,
    scrollToNext,
    scrollToPrev,
    isFirstSection,
    isLastSection,
    sectionIds,
  };
};

// ✨ SCROLL-Triggered ANIMATION HOOK
export const useScrollTrigger = (
  triggerPoint: number = 0.5,
  options: { once?: boolean; threshold?: number } = {}
) => {
  const [isTriggered, setIsTriggered] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const { once = true, threshold = 0.1 } = options;

  // Mobile optimization
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const progress = entry.intersectionRatio;
        
        if (progress >= triggerPoint && !isTriggered) {
          setIsTriggered(true);
          if (once) {
            observer.unobserve(element);
          }
        } else if (progress < triggerPoint && !once) {
          setIsTriggered(false);
        }
      },
      {
        threshold: buildThresholdSteps(threshold),
        rootMargin: isMobile ? '0px 0px -5% 0px' : '0px 0px -10% 0px',
      }
    );

    observer.observe(element);

    return () => observer.unobserve(element);
  }, [triggerPoint, once, threshold, isTriggered, isMobile]);

  const buildThresholdSteps = (step: number): number[] => {
    const steps: number[] = [];
    for (let i = 0; i <= 1; i += step) {
      steps.push(i);
    }
    return steps;
  };

  return {
    ref,
    isTriggered,
    trigger: () => setIsTriggered(true),
    reset: () => setIsTriggered(false),
  };
};

// 📊 SCROLL PROGRESS PRESETS
export const scrollPresets = {
  gentle: {
    smooth: true,
    threshold: 0.1,
    rootMargin: '0px 0px -20% 0px',
  },
  precise: {
    smooth: true,
    threshold: 0.01,
    rootMargin: '0px 0px -10% 0px',
  },
  aggressive: {
    smooth: false,
    threshold: 0.5,
    rootMargin: '0px 0px -30% 0px',
  },
  mobile: {
    smooth: false,
    threshold: 0.2,
    rootMargin: '0px 0px -5% 0px',
  },
};

export default useScrollProgress;