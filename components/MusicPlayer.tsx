import React, { useState, useRef, useEffect } from 'react';
import { Music, Pause, Play, Loader2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Set initial volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
    }
  }, []);

  const togglePlay = async () => {
    if (!audioRef.current) return;
    setError(false);

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setIsLoading(true);
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        setIsLoading(false);
      } catch (err) {
        console.error("Playback failed, retrying load:", err);
        // Try to force load and play again
        try {
            audioRef.current.load();
            await audioRef.current.play();
            setIsPlaying(true);
            setIsLoading(false);
        } catch (retryErr) {
            console.error("Retry failed:", retryErr);
            setIsLoading(false);
            setIsPlaying(false);
            setError(true);
        }
      }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {/* Hidden Audio Element with multiple sources for reliability */}
        <audio
            ref={audioRef}
            loop
            preload="none"
            onError={() => {
                console.log("Audio Error detected");
                // If the current source fails, the browser will try the next source automatically.
                // We just log it here.
            }}
            onWaiting={() => setIsLoading(true)}
            onPlaying={() => setIsLoading(false)}
        >
            {/* Source 1: Wikimedia Piano Version (Usually Reliable) */}
            <source src="https://upload.wikimedia.org/wikipedia/commons/d/d3/Happy_Birthday_to_You_Piano.ogg" type="audio/ogg" />
            {/* Source 2: Wikimedia MP3 Fallback */}
            <source src="https://upload.wikimedia.org/wikipedia/commons/transcoded/d/d3/Happy_Birthday_to_You_Piano.ogg/Happy_Birthday_to_You_Piano.ogg.mp3" type="audio/mpeg" />
            {/* Source 3: Google Actions Celebration (Very Reliable Backup - might be instrumental/different) */}
            <source src="https://actions.google.com/sounds/v1/celebrations/happy_birthday_1.ogg" type="audio/ogg" />
        </audio>
        
        <AnimatePresence>
            {(isPlaying || isLoading) && (
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-pink-200 text-pink-600 text-sm font-bold font-serif hidden md:flex items-center gap-2"
                >
                    {isLoading ? (
                        <span>Loading Song...</span>
                    ) : (
                        <>
                            <span>Happy Birthday! 🎹</span>
                            <div className="flex gap-1 items-end h-4">
                                {[1,2,3,4].map(i => (
                                     <motion.div
                                        key={i}
                                        animate={{ height: [4, 16, 8, 12, 4] }}
                                        transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
                                        className="w-1 bg-pink-400 rounded-full"
                                     />
                                ))}
                            </div>
                        </>
                    )}
                </motion.div>
            )}
            
            {error && (
                 <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="bg-red-100 px-4 py-2 rounded-full shadow-lg border border-red-200 text-red-600 text-xs font-bold"
                >
                    Can't play audio 😔
                </motion.div>
            )}
        </AnimatePresence>
      
      <motion.button
        onClick={togglePlay}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={isPlaying ? { 
            boxShadow: "0 0 25px rgba(236, 72, 153, 0.6)",
        } : { 
            scale: [1, 1.1, 1],
            transition: { repeat: Infinity, duration: 2 }
        }}
        className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center border-2 transition-all duration-300 relative ${
          isPlaying 
            ? 'bg-gradient-to-tr from-pink-500 to-rose-500 border-white text-white' 
            : 'bg-white border-pink-200 text-pink-400 hover:border-pink-300'
        }`}
      >
        {isLoading ? (
            <Loader2 size={24} className="animate-spin" />
        ) : isPlaying ? (
            <Pause size={24} fill="currentColor" />
        ) : error ? (
            <AlertCircle size={24} />
        ) : (
            <Play size={24} className="ml-1" fill="currentColor" />
        )}
      </motion.button>
    </div>
  );
};

export default MusicPlayer;