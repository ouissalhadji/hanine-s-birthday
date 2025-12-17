import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Sparkles, PartyPopper } from 'lucide-react';

const BirthdayCake: React.FC = () => {
  const [candles, setCandles] = useState([true, true, true, true, true]);
  const [allExtinguished, setAllExtinguished] = useState(false);

  const extinguishCandle = (index: number) => {
    const newCandles = [...candles];
    newCandles[index] = false;
    setCandles(newCandles);
  };

  useEffect(() => {
    if (candles.every(c => !c)) {
      setAllExtinguished(true);
    }
  }, [candles]);

  return (
    <section className="py-24 px-4 text-center relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-12"
        >
            <h2 className="text-4xl md:text-5xl font-serif italic text-gray-800 mb-4">Make a Wish</h2>
            <p className="text-gray-500 text-lg">
                {allExtinguished 
                    ? "YAY! May all your wishes come true! ✨" 
                    : "Close your eyes, make a wish, and click the flames to blow out the candles!"}
            </p>
        </motion.div>

        <div className="relative h-80 flex items-end justify-center">
            {/* Cake Base */}
            <div className="relative">
                {/* Plate */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-80 h-4 bg-gray-200 rounded-full shadow-lg" />
                
                {/* Bottom Tier */}
                <div className="w-64 h-24 bg-pink-200 rounded-lg mx-auto relative border-b-8 border-pink-300 shadow-inner flex items-center justify-center">
                    <div className="w-full absolute top-2 border-t-4 border-dashed border-white/50" />
                </div>
                
                {/* Top Tier */}
                <div className="w-48 h-20 bg-pink-300 rounded-lg mx-auto -mt-2 relative border-b-8 border-pink-400 shadow-inner">
                    <div className="absolute -left-1 top-0 w-50 h-4 bg-white rounded-full opacity-50 blur-[1px]" />
                </div>

                {/* Candles Container */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex gap-4 md:gap-8 items-end">
                    {candles.map((isLit, index) => (
                        <div key={index} className="relative flex flex-col items-center">
                            {/* Flame */}
                            <AnimatePresence>
                                {isLit && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ 
                                            scale: [1, 1.1, 1, 1.2, 1],
                                            rotate: [-2, 2, -2]
                                        }}
                                        exit={{ scale: 0, opacity: 0, y: -20 }}
                                        transition={{ duration: 0.5, repeat: Infinity }}
                                        onClick={() => extinguishCandle(index)}
                                        className="cursor-pointer absolute -top-8 w-4 h-6 bg-gradient-to-t from-orange-500 via-yellow-400 to-yellow-200 rounded-full shadow-[0_0_20px_rgba(255,165,0,0.6)] z-20"
                                    >
                                        <div className="absolute inset-0 bg-yellow-300 blur-sm rounded-full animate-pulse" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            
                            {/* Candle Stick */}
                            <div className="w-4 h-12 bg-gradient-to-b from-blue-200 to-blue-300 rounded-sm border border-blue-100 shadow-sm" />
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Celebration Overlay */}
        <AnimatePresence>
            {allExtinguished && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-8"
                >
                    <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur px-8 py-4 rounded-full shadow-2xl border border-yellow-200">
                        <PartyPopper className="text-yellow-500 w-8 h-8" />
                        <span className="text-2xl font-cursive text-pink-500">Happy Birthday Hanine!</span>
                        <PartyPopper className="text-yellow-500 w-8 h-8" />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
      </div>

      {/* Floating Sparkles Background specific for this section */}
      <div className="absolute inset-0 pointer-events-none">
          {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                    y: [0, -100], 
                    opacity: [0, 1, 0] 
                }}
                transition={{ 
                    duration: Math.random() * 5 + 3, 
                    repeat: Infinity, 
                    delay: Math.random() * 5 
                }}
                className="absolute text-yellow-200"
                style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                }}
              >
                  <Sparkles size={Math.random() * 20 + 10} />
              </motion.div>
          ))}
      </div>
    </section>
  );
};

export default BirthdayCake;