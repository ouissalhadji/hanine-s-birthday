import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Star } from 'lucide-react';

const Hero: React.FC = () => {
  const [clickCount, setClickCount] = useState(0);

  const handleHeartClick = () => {
    setClickCount(prev => prev + 1);
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden text-center p-6">
      {/* Decorative Elements */}
      <motion.div 
        animate={{ y: [0, -20, 0], opacity: [0.5, 0.8, 0.5] }} 
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 w-32 h-32 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
      />
      <motion.div 
        animate={{ y: [0, -30, 0], opacity: [0.5, 0.8, 0.5] }} 
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-40 right-10 w-32 h-32 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
      />
      <motion.div 
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }} 
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 left-1/3 text-yellow-300 opacity-50"
      >
        <Star size={40} fill="currentColor" />
      </motion.div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="z-10"
      >
        <div className="inline-flex items-center gap-2 p-2 px-6 bg-white/40 backdrop-blur-md rounded-full mb-8 border border-white/50 shadow-lg ring-1 ring-white/60">
          <Sparkles size={16} className="text-yellow-500" />
          <span className="text-gray-700 font-bold uppercase tracking-widest text-xs">
            The Queen's Birthday
          </span>
          <Sparkles size={16} className="text-yellow-500" />
        </div>
      </motion.div>

      <motion.h1
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="font-serif italic text-6xl md:text-8xl lg:text-9xl text-gray-800 drop-shadow-sm z-10 leading-tight"
      >
        Happy <br/>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-400">Birthday</span>
      </motion.h1>
      
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-8 text-2xl md:text-4xl font-light text-gray-700 z-10 font-sans tracking-wide"
      >
        To my Soulmate, <br className="md:hidden"/>
        <span className="font-cursive text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 drop-shadow-md ml-2">
          Hanine
        </span>
      </motion.h2>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="mt-8 max-w-xl text-lg md:text-xl text-gray-600 font-serif italic leading-relaxed"
      >
        "Here's to the one who shines the brightest. May your day be filled with as much joy, laughter, and magic as you bring into my life!"
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.5, type: "spring" }}
        className="mt-12 z-10 relative cursor-pointer"
        onClick={handleHeartClick}
        whileTap={{ scale: 0.9 }}
      >
        <div className="relative pointer-events-none">
            <Heart className="text-red-400 fill-red-400 w-16 h-16 animate-pulse" />
            <motion.div 
                className="absolute inset-0 bg-red-400 blur-xl opacity-40"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
            />
        </div>
        
        {/* Click me hint */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-pink-400 font-bold uppercase tracking-widest animate-bounce"
        >
            Click Me
        </motion.p>

        {/* Explosion Effects */}
        <AnimatePresence>
            {clickCount > 0 && [...Array(20)].map((_, i) => (
                <Particle key={`${clickCount}-${i}`} index={i} />
            ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

const Particle: React.FC<{ index: number }> = ({ index }) => {
    const angle = (Math.random() * 360);
    const distance = 100 + Math.random() * 150;
    const colors = ['#ff7eb3', '#ff6b6b', '#a29bfe', '#7afcff', '#fdcb6e'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = 10 + Math.random() * 20;

    return (
        <motion.div
            initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
            animate={{ 
                x: distance * Math.cos(angle * Math.PI / 180),
                y: distance * Math.sin(angle * Math.PI / 180),
                scale: [0, 1.5, 0],
                opacity: [1, 1, 0],
                rotate: Math.random() * 360
            }}
            transition={{ duration: 1 + Math.random() * 0.8, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 pointer-events-none"
            style={{ color: color }}
        >
            <Heart size={size} fill="currentColor" />
        </motion.div>
    );
};

export default Hero;