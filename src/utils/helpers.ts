// Mobile detection utility
export const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth <= 768;
};

export const isLowPerformanceDevice = () => {
  if (typeof window === 'undefined') return false;
  const userAgent = navigator.userAgent || navigator.vendor;
  return (/android|iphone|ipad|ipod/i.test(userAgent) && /mobi|mobile/i.test(userAgent)) || 
         window.innerWidth <= 768;
};

// Performance-optimized time calculation
export const calculateTimeRemaining = (targetDate: string) => {
  const now = new Date().getTime();
  const target = new Date(targetDate).getTime();
  const difference = target - now;

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, isExpired: false };
};

// Optimized date formatting
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

// Mobile-optimized smooth scroll
export const smoothScroll = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    // Different behavior for mobile vs desktop
    if (isMobile()) {
      // Simpler scroll for mobile with offset for fixed headers
      const offset = 80; // Account for mobile header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    } else {
      // Standard smooth scroll for desktop
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  }
};

// Debounce function for performance
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

// Throttle function for scroll/resize events
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Mobile touch event helpers
export const isTouchDevice = () => {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

// Optimized image loader
export const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    if (isMobile()) {
      // Lazy loading strategy for mobile
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
      img.loading = 'lazy'; // Native lazy loading
    } else {
      // Standard loading for desktop
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    }
  });
};

// Memory management helper
export const cleanupEventListeners = (element: HTMLElement, events: string[]) => {
  events.forEach(event => {
    element.removeEventListener(event, () => {});
  });
};

// Performance monitoring
export const withPerformance = <T extends (...args: any[]) => any>(
  func: T,
  name: string = 'Function'
): ((...args: Parameters<T>) => ReturnType<T>) => {
  return (...args: Parameters<T>): ReturnType<T> => {
    if (process.env.NODE_ENV === 'development') {
      const start = performance.now();
      const result = func.apply(this, args);
      const end = performance.now();
      console.log(`${name} took ${end - start}ms`);
      return result;
    }
    return func.apply(this, args);
  };
};

// Battery saver mode detection
export const getBatteryStatus = async (): Promise<{ level: number; charging: boolean } | null> => {
  if ('getBattery' in navigator) {
    try {
      const battery = await (navigator as any).getBattery();
      return {
        level: battery.level,
        charging: battery.charging
      };
    } catch {
      return null;
    }
  }
  return null;
};

// Adaptive quality based on device
export const getOptimalQuality = (): 'high' | 'medium' | 'low' => {
  if (isLowPerformanceDevice()) return 'low';
  if (isMobile()) return 'medium';
  return 'high';
};

// Network connection detection
export const getConnectionInfo = (): { effectiveType: string; saveData: boolean } => {
  if ('connection' in navigator) {
    const conn = (navigator as any).connection;
    return {
      effectiveType: conn.effectiveType || '4g',
      saveData: conn.saveData || false
    };
  }
  return { effectiveType: '4g', saveData: false };
};

// Optimized event listener with cleanup
export const addOptimizedEventListener = (
  element: HTMLElement | Window, 
  event: string, 
  handler: EventListener, 
  options?: AddEventListenerOptions
) => {
  const optimizedHandler = isMobile() 
    ? throttle(handler, 100)
    : debounce(handler, 50);

  element.addEventListener(event, optimizedHandler, options);
  
  // Return cleanup function
  return () => {
    element.removeEventListener(event, optimizedHandler, options);
  };
};

// Mobile-specific viewport helpers
export const getViewportSize = () => {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
    isPortrait: window.innerHeight > window.innerWidth
  };
};

// Safe local storage with mobile fallbacks
export const safeLocalStorage = {
  get: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set: (key: string, value: string): boolean => {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch {
      return false;
    }
  }
};

export default {
  calculateTimeRemaining,
  formatDate,
  smoothScroll,
  isMobile,
  isLowPerformanceDevice,
  debounce,
  throttle,
  isTouchDevice,
  loadImage,
  cleanupEventListeners,
  withPerformance,
  getBatteryStatus,
  getOptimalQuality,
  getConnectionInfo,
  addOptimizedEventListener,
  getViewportSize,
  safeLocalStorage,
};