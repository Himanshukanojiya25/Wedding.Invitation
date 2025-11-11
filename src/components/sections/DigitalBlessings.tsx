import { motion } from 'framer-motion';
import { Gift, Heart, QrCode } from 'lucide-react';

export const DigitalBlessings = () => {
  return (
    <section id="blessings" className="py-20 bg-gradient-to-b from-[#FFFBF5] to-[#F8E6E8]">
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
            Digital Blessings
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your presence is the greatest gift, but if you wish to bless us, you may do so here.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-[#D4AF37]"
          >
            <div className="bg-gradient-to-r from-[#D4AF37] via-[#B22222] to-[#D4AF37] py-8 px-6">
              <div className="flex items-center justify-center space-x-3">
                <Gift className="w-8 h-8 text-white" />
                <h3
                  className="text-3xl text-white"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  Send Your Blessings
                </h3>
                <Gift className="w-8 h-8 text-white" />
              </div>
            </div>

            <div className="p-8 md:p-12 space-y-8">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-center"
              >
                <div className="w-64 h-64 mx-auto bg-gradient-to-br from-[#FFFBF5] to-[#F8E6E8] rounded-2xl flex items-center justify-center border-4 border-[#D4AF37] shadow-lg mb-6">
                  <div className="text-center">
                    <QrCode className="w-32 h-32 text-[#D4AF37] mx-auto mb-4 opacity-50" />
                    <p className="text-gray-600 text-sm">UPI QR Code</p>
                    <p className="text-gray-400 text-xs mt-1">Will be displayed here</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-gray-700 font-semibold text-lg">
                    Scan to send your blessings via UPI
                  </p>
                  <div className="inline-block bg-gradient-to-r from-[#F8E6E8] to-[#FFFBF5] px-6 py-3 rounded-xl border-2 border-[#D4AF37]">
                    <p className="text-gray-600 text-sm">
                      UPI ID: <span className="font-mono font-bold text-[#D4AF37]">prafulpranjali@upi</span>
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="border-t-2 border-[#F8E6E8] pt-8"
              >
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center space-x-2">
                    <Heart className="w-5 h-5 text-[#B22222] fill-current" />
                    <p className="text-gray-700 italic">
                      "Your love and blessings are all we need"
                    </p>
                    <Heart className="w-5 h-5 text-[#B22222] fill-current" />
                  </div>
                  <p className="text-gray-600 text-sm max-w-md mx-auto">
                    Your presence at our wedding is the greatest gift of all. However, if you wish
                    to honor us with a gift, you may use the digital payment option above.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-center pt-4"
              >
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#D4AF37]/10 to-[#B22222]/10 px-6 py-3 rounded-full">
                  <span className="text-2xl">🙏</span>
                  <p
                    className="text-xl text-[#D4AF37]"
                    style={{ fontFamily: 'Great Vibes, cursive' }}
                  >
                    With Love & Gratitude
                  </p>
                  <span className="text-2xl">🙏</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center mt-8"
          >
            <p className="text-gray-500 text-sm">
              Thank you for being part of our special day
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
