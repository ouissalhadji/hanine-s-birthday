import React, { useEffect, useRef, useState } from 'react';
import { PartyPopper, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  size: number;
}

const CelebrationButton: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [showText, setShowText] = useState(false);
  const particles = useRef<Particle[]>([]);
  const animationFrame = useRef<number>(0);

  const colors = ['#ff7eb3', '#7afcff', '#feff9c', '#ff6b6b', '#a29bfe', '#fdcb6e'];

  const createExplosion = (x: number, y: number) => {
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount;
      const velocity = 2 + Math.random() * 4;
      particles.current.push({
        x,
        y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        alpha: 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 2 + Math.random() * 3,
      });
    }
  };

  const loop = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    for (let i = particles.current.length - 1; i >= 0; i--) {
      const p = particles.current[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.05; // gravity
      p.alpha -= 0.01; // fade

      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();

      if (p.alpha <= 0) {
        particles.current.splice(i, 1);
      }
    }

    if (particles.current.length > 0 || isActive) {
      animationFrame.current = requestAnimationFrame(loop);
    } else {
        const ctx = canvas.getContext('2d');
        if(ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const handleClick = () => {
    setIsActive(true);
    setShowText(true);
    
    // Launch random explosions
    let count = 0;
    const interval = setInterval(() => {
        if (canvasRef.current) {
            const x = Math.random() * canvasRef.current.width;
            const y = Math.random() * (canvasRef.current.height * 0.6); // Top 60% of screen
            createExplosion(x, y);
        }
        count++;
        if (count > 15) {
            clearInterval(interval);
            setIsActive(false);
            setTimeout(() => setShowText(false), 2000);
        }
    }, 300);

    // Start loop if not running
    if (particles.current.length === 0) {
        loop();
    }
  };

  useEffect(() => {
    const handleResize = () => {
        if (canvasRef.current) {
            canvasRef.current.width = window.innerWidth;
            canvasRef.current.height = window.innerHeight;
        }
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationFrame.current);
    };
  }, []);

  return (
    <>
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 pointer-events-none z-[60]"
      />
      
      <AnimatePresence>
        {showText && (
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.5 }}
                className="fixed inset-0 pointer-events-none z-[55] flex items-center justify-center"
            >
                <h2 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500 drop-shadow-2xl text-center font-cursive rotate-[-5deg]">
                    BESTIES<br/>FOREVER! 💖
                </h2>
            </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-yellow-300 text-yellow-600 text-sm font-bold font-serif hidden md:flex items-center gap-2"
        >
            <span>Click for a Surprise! ✨</span>
        </motion.div>
      
        <motion.button
            onClick={handleClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={{ 
                boxShadow: ["0 0 0px #fde047", "0 0 20px #fde047", "0 0 0px #fde047"],
            }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-16 h-16 rounded-full shadow-2xl flex items-center justify-center border-4 border-white bg-gradient-to-tr from-yellow-400 to-orange-400 text-white"
        >
            <PartyPopper size={28} fill="currentColor" />
        </motion.button>
      </div>
    </>
  );
};

export default CelebrationButton;