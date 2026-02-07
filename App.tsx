
import React, { useState, useRef } from 'react';
import { FloatingHearts } from './components/FloatingHearts.tsx';
import { ValentineCard } from './components/ValentineCard.tsx';
import { SuccessView } from './components/SuccessView.tsx';
import { SadView } from './components/SadView.tsx';

const App: React.FC = () => {
  const [view, setView] = useState<'question' | 'accepted' | 'rejected'>('question');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleAccept = () => {
    setView('accepted');
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    }
  };

  const handleReject = () => setView('rejected');
  const handleRetry = () => setView('question');

  return (
    <div className="h-full w-full relative overflow-hidden flex items-center justify-center bg-transparent">
      {/* Background Music - Relaxing Romantic */}
      <audio 
        ref={audioRef} 
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" 
        loop 
      />

      {/* Floating Hearts Particles */}
      <FloatingHearts />

      {/* Main Content layer */}
      <main className="relative z-10 w-full h-full flex items-center justify-center p-4">
        <div className="w-full max-w-[500px] flex items-center justify-center heart-melt floating-card">
          {view === 'question' && (
            <ValentineCard onAccept={handleAccept} onReject={handleReject} />
          )}
          {view === 'accepted' && (
            <SuccessView />
          )}
          {view === 'rejected' && (
            <SadView onRetry={handleRetry} />
          )}
        </div>
      </main>

      {/* Decorative footer text */}
      <div className="fixed bottom-8 right-10 items-center gap-3 text-white/70 font-romantic text-3xl select-none hidden lg:flex pointer-events-none drop-shadow-lg">
        Yours Forever ❤️
      </div>
    </div>
  );
};

export default App;
