import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Image as ImageIcon } from 'lucide-react';
import { WEDDING_DATA } from '../../utils/constants';

export const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const placeholders = Array.from(
    { length: WEDDING_DATA.gallery.placeholders },
    (_, i) => i + 1
  );

  return (
    <section id="gallery" className="py-20 bg-gradient-to-b from-[#F8E6E8] to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2
            className="text-5xl md:text-6xl text-[#D4AF37] mb-4"
            style={{ fontFamily: 'Great Vibes, cursive' }}
          >
            Photo Gallery
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Capturing precious moments and beautiful memories from our journey together.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
          {placeholders.map((index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              onClick={() => setSelectedImage(index)}
              className="aspect-square bg-gradient-to-br from-[#FFFBF5] to-[#F8E6E8] rounded-xl overflow-hidden cursor-pointer shadow-lg border-2 border-[#F8E6E8] hover:border-[#D4AF37] transition-all duration-300"
            >
              <div className="w-full h-full flex flex-col items-center justify-center p-6">
                <ImageIcon className="w-12 h-12 text-[#D4AF37] mb-3 opacity-50" />
                <p className="text-sm text-gray-500 text-center">
                  Photo {index}
                </p>
                <p className="text-xs text-gray-400 mt-2 text-center">
                  Image will be added
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12"
        >
          <div className="inline-block bg-white rounded-xl shadow-lg px-8 py-4 border-2 border-[#D4AF37]">
            <p className="text-gray-700">
              <span className="font-semibold text-[#D4AF37]">Coming Soon:</span> Beautiful moments
              from our journey will be added here
            </p>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full cursor-default"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-[#D4AF37] transition-colors"
                aria-label="Close"
              >
                <X className="w-8 h-8" />
              </button>

              <div className="bg-gradient-to-br from-[#FFFBF5] to-[#F8E6E8] rounded-2xl p-12 border-4 border-[#D4AF37]">
                <div className="aspect-square flex flex-col items-center justify-center">
                  <ImageIcon className="w-24 h-24 text-[#D4AF37] mb-6 opacity-50" />
                  <p className="text-2xl text-gray-700 font-semibold mb-2">
                    Photo {selectedImage}
                  </p>
                  <p className="text-gray-500">
                    Beautiful wedding photo will be displayed here
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
