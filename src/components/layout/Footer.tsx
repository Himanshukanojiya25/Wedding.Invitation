import { Heart } from 'lucide-react';
import { WEDDING_DATA } from '../../utils/constants';

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#FFFBF5] to-[#F8E6E8] py-12">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center space-x-2">
            <Heart className="w-6 h-6 text-[#B22222] fill-current animate-pulse" />
            <h3
              className="text-4xl"
              style={{ fontFamily: 'Great Vibes, cursive', color: '#D4AF37' }}
            >
              {WEDDING_DATA.couple.fullNames}
            </h3>
            <Heart className="w-6 h-6 text-[#B22222] fill-current animate-pulse" />
          </div>

          <p className="text-gray-600 max-w-2xl mx-auto">
            Thank you for being part of our special day. Your presence and blessings
            mean the world to us as we begin this beautiful journey together.
          </p>

          <div className="pt-6 border-t border-gray-300">
            <p className="text-sm text-gray-500">
              {WEDDING_DATA.social.hashtag}
            </p>
            <p className="text-xs text-gray-400 mt-2">
              &copy; 2025 Praful & Pranjali Wedding. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
