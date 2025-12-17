import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Confetti: React.FC = () => {
  const [pieces, setPieces] = useState<{ id: number; x: number; delay: number; color: string }[]>([]);

  useEffect(() => {
    const colors = ['#ff7eb3', '#7afcff', '#feff9c', '#ff6b6b', '#a29bfe'];
    const newPieces = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setPieces(newPieces);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          initial={{ y: -20, x: `${piece.x}vw`, opacity: 1, rotate: 0 }}
          animate={{ y: '110vh', rotate: 360 }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: piece.delay,
            ease: "linear"
          }}
          style={{
            position: 'absolute',
            width: '10px',
            height: '10px',
            backgroundColor: piece.color,
            borderRadius: '2px',
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;