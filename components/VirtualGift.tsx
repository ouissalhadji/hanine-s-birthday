import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Heart, X, Sparkles } from 'lucide-react';

const VirtualGift: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="py-32 px-4 text-center relative">
      <h2 className="text-4xl font-serif italic text-gray-800 mb-12">One Last Treasure...</h2>
      
      <div className="flex justify-center perspective-1000">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
                key="envelope"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotateX: -90 }}
                whileHover={{ scale: 1.05, y: -10 }}
                onClick={() => setIsOpen(true)}
                className="cursor-pointer relative group"
            >
              <div className="w-72 h-48 bg-pink-100 rounded-lg shadow-2xl flex items-center justify-center border-b-4 border-pink-200 relative overflow-hidden z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />
                <Mail size={64} className="text-pink-400" />
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-yellow-200 rounded-full blur-xl opacity-50 group-hover:opacity-80 transition-opacity" />
              </div>
              {/* Flap of envelope simulation */}
              <div className="absolute top-0 left-0 w-0 h-0 border-l-[144px] border-l-transparent border-t-[96px] border-t-pink-200 border-r-[144px] border-r-transparent z-20 origin-top transform transition-transform group-hover:rotate-x-180" />
              
              <motion.div 
                className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white px-4 py-1 rounded-full shadow-md text-sm font-bold text-pink-500 whitespace-nowrap z-30"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                For Hanine
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="letter"
              initial={{ opacity: 0, scale: 0.5, rotateX: 90 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
              className="relative max-w-lg w-full bg-[#fffcf5] p-8 md:p-12 rounded-lg shadow-2xl"
              style={{
                backgroundImage: 'linear-gradient(#e5e5e5 1px, transparent 1px)',
                backgroundSize: '100% 24px'
              }}
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
              >
                <X size={24} />
              </button>

              <div className="absolute -top-4 -left-4 text-yellow-400 animate-spin-slow">
                <Sparkles size={40} fill="currentColor"/>
              </div>
              
              <div className="font-serif text-gray-800 text-left leading-relaxed text-lg md:text-xl space-y-6">
                <p className="font-bold text-2xl text-pink-600 mb-6">Dearest Hanine,</p>
                
                <p>
                  Happy Birthday to the keeper of my secrets and the sister of my soul. 
                  Life is a beautiful journey, but it is a masterpiece because I get to walk it with you.
                </p>
                
                <p>
                  You are my safe harbor and my wildest adventure all wrapped in one. 
                  May this year bring you as much joy as you bring into my life every single day.
                </p>
                
                <p>
                  I love you more than words can say. Forever and always.
                </p>

                <div className="text-right mt-8 font-cursive text-3xl text-pink-500 transform -rotate-2">
                  ~ Your Bestie
                </div>
              </div>
              
              <motion.div 
                className="mt-8 flex justify-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <Heart className="text-red-400 fill-red-200" />
                <Heart className="text-pink-400 fill-pink-200" />
                <Heart className="text-purple-400 fill-purple-200" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default VirtualGift;