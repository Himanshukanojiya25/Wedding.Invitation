import { Heart } from 'lucide-react';
import { WEDDING_DATA } from '../../utils/constants';
import { isMobile, isLowPerformanceDevice } from '../../utils/helpers';

export const Footer = () => {
  const mobile = isMobile();
  const lowPerformance = isLowPerformanceDevice();

  return (
    <footer className="bg-gradient-to-b from-[#FFFBF5] to-[#F8E6E8] py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 md:space-y-6">
          <div className="flex items-center justify-center space-x-2">
            <Heart 
              className={`${mobile ? 'w-4 h-4' : 'w-6 h-6'} text-[#B22222] fill-current`}
              style={{ 
                animation: lowPerformance ? 'none' : 'pulse 2s infinite' 
              }}
            />
            <h3
              className={`${mobile ? 'text-2xl' : 'text-4xl'}`}
              style={{ 
                fontFamily: 'Great Vibes, cursive', 
                color: '#D4AF37' 
              }}
            >
              {WEDDING_DATA.couple.fullNames}
            </h3>
            <Heart 
              className={`${mobile ? 'w-4 h-4' : 'w-6 h-6'} text-[#B22222] fill-current`}
              style={{ 
                animation: lowPerformance ? 'none' : 'pulse 2s infinite' 
              }}
            />
          </div>

          <p className={`text-gray-600 mx-auto ${mobile ? 'text-sm max-w-md' : 'text-base max-w-2xl'}`}>
            Thank you for being part of our special day. Your presence and blessings
            mean the world to us as we begin this beautiful journey together.
          </p>

          <div className={`pt-4 md:pt-6 border-t border-gray-300 ${mobile ? 'mt-4' : 'mt-6'}`}>
            <p className={`text-gray-500 ${mobile ? 'text-xs' : 'text-sm'}`}>
              {WEDDING_DATA.social.hashtag}
            </p>
            <p className={`text-gray-400 ${mobile ? 'text-xs mt-1' : 'text-xs mt-2'}`}>
              &copy; 2025 Praful & Pranjali Wedding. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;