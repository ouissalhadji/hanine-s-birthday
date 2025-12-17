import React from 'react';
import Hero from './components/Hero';
import ReasonsGallery from './components/ReasonsGallery';
import AIBirthdayPoet from './components/AIBirthdayPoet';
import VirtualGift from './components/VirtualGift';
import Confetti from './components/Confetti';
import FloatingHearts from './components/FloatingHearts';
import BirthdayCake from './components/BirthdayCake';
import CelebrationButton from './components/CelebrationButton';

const App: React.FC = () => {
  return (
    <div className="bg-birthday-bg min-h-screen text-gray-800 overflow-x-hidden selection:bg-pink-200">
      <FloatingHearts />
      <Confetti />
      <CelebrationButton />
      
      <main className="container mx-auto relative z-10">
        <Hero />
        
        <div className="space-y-16">
          <ReasonsGallery />
          <BirthdayCake />
          <AIBirthdayPoet />
          <VirtualGift />
        </div>
      </main>

      <footer className="py-12 text-center text-gray-400 text-sm mt-12 relative z-10">
        <p className="font-serif italic text-lg opacity-70">Made with all my ❤️ just for you.</p>
        <p className="mt-2 text-xs opacity-40 uppercase tracking-widest">Forever & Always</p>
      </footer>
    </div>
  );
};

export default App;