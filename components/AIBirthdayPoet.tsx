import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wand2, Loader2, Feather } from 'lucide-react';
import { generateBirthdayWish } from '../services/geminiService.ts';
import { WishRequest } from '../types.ts';

const AIBirthdayPoet: React.FC = () => {
  const [name, setName] = useState('Hanine');
  const [likes, setLikes] = useState('');
  const [tone, setTone] = useState<WishRequest['tone']>('sentimental');
  const [generatedWish, setGeneratedWish] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    setLoading(true);
    const finalLikes = likes || "Friendship, Memories, Happiness, Love";
    const wish = await generateBirthdayWish({ name, likes: finalLikes, tone });
    setGeneratedWish(wish);
    setLoading(false);
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white ring-1 ring-white/50">
        <div className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 p-8 text-white text-center relative overflow-hidden">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-10 -right-10 w-40 h-40 bg-white opacity-10 rounded-full border-2 border-white border-dashed"
          />
          <Feather className="w-12 h-12 mx-auto mb-4 drop-shadow-md" />
          <h2 className="text-4xl font-serif italic mb-2">Soulmate Letters</h2>
          <p className="opacity-90 font-light text-lg">Let AI write a heartfelt note for Hanine</p>
        </div>

        <div className="p-8 md:p-12">
          {!generatedWish ? (
            <form onSubmit={handleGenerate} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">To</label>
                    <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-300 outline-none transition-all"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Tone</label>
                    <select 
                        value={tone}
                        onChange={(e) => setTone(e.target.value as any)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-300 outline-none transition-all appearance-none cursor-pointer"
                    >
                        <option value="sentimental">Deeply Sentimental</option>
                        <option value="funny">Funny & Inside Jokes</option>
                        <option value="inspirational">Inspirational & Empowering</option>
                        <option value="sarcastic">Playfully Sarcastic</option>
                    </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Include memories or things she loves (Optional)
                </label>
                <textarea
                  value={likes}
                  onChange={(e) => setLikes(e.target.value)}
                  placeholder="e.g. Late night drives, our coffee dates, her love for painting..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-300 outline-none h-32 resize-none transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-gray-900 to-gray-700 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:scale-[1.01] transition-all flex items-center justify-center gap-3"
              >
                {loading ? <Loader2 className="animate-spin" /> : <Wand2 size={20} />}
                {loading ? 'Composing...' : 'Write Letter for Hanine'}
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center relative"
            >
              <div className="absolute -top-6 -left-2 text-6xl text-pink-200 font-serif">"</div>
              <h3 className="text-lg font-bold text-gray-400 mb-6 uppercase tracking-widest">A Note for You</h3>
              
              <div className="bg-pink-50/50 p-8 rounded-2xl border border-pink-100">
                <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-serif italic">
                    {generatedWish}
                </p>
              </div>
              
              <div className="absolute -bottom-10 -right-2 text-6xl text-pink-200 font-serif rotate-180">"</div>

              <button
                onClick={() => setGeneratedWish(null)}
                className="mt-10 text-sm font-semibold text-gray-400 hover:text-pink-500 transition-colors flex items-center justify-center gap-2 mx-auto"
              >
                <span className="border-b border-current">Write another one</span>
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AIBirthdayPoet;