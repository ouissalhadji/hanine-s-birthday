import React from 'react';
import { motion } from 'framer-motion';
import { MemoryPhoto } from '../types';

const PHOTOS: MemoryPhoto[] = [
  { id: 1, url: 'https://picsum.photos/seed/bestie1/400/500', caption: 'That time we got lost', rotation: -2 },
  { id: 2, url: 'https://picsum.photos/seed/bestie2/400/500', caption: 'Best coffee ever', rotation: 3 },
  { id: 3, url: 'https://picsum.photos/seed/bestie3/400/500', caption: 'Summer vibes', rotation: -1 },
  { id: 4, url: 'https://picsum.photos/seed/bestie4/400/500', caption: 'Unstoppable duo', rotation: 2 },
];

const MemoryLane: React.FC = () => {
  return (
    <section className="py-20 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-cursive text-gray-800 mb-4">Down Memory Lane</h2>
        <p className="text-gray-500 max-w-xl mx-auto">Just a few snapshots of us being awesome.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {PHOTOS.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
            className="bg-white p-3 shadow-lg rounded-sm transform transition-all"
            style={{ transform: `rotate(${photo.rotation}deg)` }}
          >
            <div className="overflow-hidden mb-3 aspect-[4/5] bg-gray-100">
              <img 
                src={photo.url} 
                alt={photo.caption} 
                className="w-full h-full object-cover hover:opacity-90 transition-opacity"
              />
            </div>
            <p className="font-cursive text-center text-xl text-gray-700">{photo.caption}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MemoryLane;