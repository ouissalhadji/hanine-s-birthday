import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const FloatingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<{ id: number; left: number; scale: number; duration: number }[]>([]);

  useEffect(() => {
    // Generate static hearts for the background
    const newHearts = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, // random position across width
      scale: 0.5 + Math.random() * 1, // random size
      duration: 15 + Math.random() * 20, // random speed (slow)
      delay: Math.random() * 10
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: '110vh', opacity: 0 }}
          animate={{ 
            y: '-10vh', 
            opacity: [0, 0.4, 0],
            x: [0, Math.random() * 50 - 25, 0] // Gentle sway
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.id * 2, // stagger start times
            ease: "linear"
          }}
          style={{
            position: 'absolute',
            left: `${heart.left}%`,
          }}
        >
          <Heart 
            className="text-pink-300 fill-pink-100" 
            style={{ 
                width: `${heart.scale * 30}px`, 
                height: `${heart.scale * 30}px`,
                filter: 'blur(1px)'
            }} 
          />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;