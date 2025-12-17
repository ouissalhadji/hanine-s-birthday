import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sun, Star, Anchor, Sparkles, Gem, Infinity } from 'lucide-react';

const REASONS = [
  {
    id: 1,
    icon: <Sun className="w-8 h-8 text-yellow-600" />,
    title: "Your Light",
    text: "You have this incredible ability to brighten even the darkest days just by walking into the room. Your smile is my favorite thing.",
    color: "bg-gradient-to-br from-orange-100 to-yellow-100 border-orange-200"
  },
  {
    id: 2,
    icon: <Anchor className="w-8 h-8 text-blue-600" />,
    title: "My Anchor",
    text: "Thank you for keeping me grounded when the world spins too fast. You are the one person I can always count on, no matter what.",
    color: "bg-gradient-to-br from-blue-100 to-purple-100 border-blue-200"
  },
  {
    id: 3,
    icon: <Star className="w-8 h-8 text-pink-600" />,
    title: "Your Spirit",
    text: "Your energy is unmatched. You inspire me to be better, wilder, and happier. You make life an adventure.",
    color: "bg-gradient-to-br from-pink-100 to-rose-100 border-pink-200"
  },
  {
    id: 4,
    icon: <Heart className="w-8 h-8 text-red-600" />,
    title: "Our Bond",
    text: "It's not just friendship; it's a soul connection. We understand each other without saying a word. Sisters by heart, forever.",
    color: "bg-gradient-to-br from-purple-100 to-indigo-100 border-purple-200"
  },
  {
    id: 5,
    icon: <Gem className="w-8 h-8 text-indigo-600" />,
    title: "Soul Mirror",
    text: "You see the best in me even when I can't see it myself. You help me become the person I was meant to be.",
    color: "bg-gradient-to-br from-indigo-100 to-violet-100 border-indigo-200"
  },
  {
    id: 6,
    icon: <Infinity className="w-8 h-8 text-teal-600" />,
    title: "Forever Home",
    text: "No matter where we are in the world, as long as I'm with you, I am home. You are my safe place and my peace.",
    color: "bg-gradient-to-br from-teal-100 to-emerald-100 border-teal-200"
  }
];

const ReasonsGallery: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-24 px-4 max-w-7xl mx-auto relative z-10">
      <div className="text-center mb-16 relative">
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="absolute left-1/2 -top-10 -translate-x-1/2"
        >
            <Sparkles className="text-yellow-400 w-12 h-12 opacity-50 animate-pulse" />
        </motion.div>
        <h2 className="text-4xl md:text-5xl font-serif italic text-gray-800 mb-6">Why You Are Special</h2>
        <p className="text-gray-500 max-w-xl mx-auto text-lg font-light">A few reasons why having you as a best friend is the greatest gift of all.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {REASONS.map((reason, index) => (
          <motion.div
            key={reason.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, type: "spring" }}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
            className={`
                relative p-8 rounded-2xl border shadow-lg hover:shadow-2xl transition-all duration-500 cursor-default group overflow-hidden
                ${reason.color}
            `}
          >
            <div className="relative z-10">
                <div className="bg-white/60 w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-sm backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                    {reason.icon}
                </div>
                <h3 className="text-2xl font-cursive text-gray-800 mb-4">{reason.title}</h3>
                <p className="text-gray-600 leading-relaxed font-sans">{reason.text}</p>
            </div>
            
            {/* Decorative background glow */}
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-white opacity-20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
            <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-24 h-24 bg-white opacity-20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ReasonsGallery;