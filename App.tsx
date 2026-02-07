
import React, { useState, useRef } from 'react';
import { FloatingHearts } from './components/FloatingHearts';
import { ValentineCard } from './components/ValentineCard';
import { SuccessView } from './components/SuccessView';
import { SadView } from './components/SadView';

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
    <div className="h-screen w-screen relative overflow-hidden flex items-center justify-center selection:bg-rose-200">
      {/* Background Music */}
      <audio 
        ref={audioRef} 
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" 
        loop 
      />

      {/* Floating Hearts Particles */}
      <FloatingHearts />

      {/* Main Content layer */}
      <main className="relative z-10 w-full h-full flex items-center justify-center p-4">
        <div className="w-full max-w-[450px] floating-card heart-melt flex items-center justify-center">
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
      <div className="fixed bottom-6 right-8 items-center gap-2 text-rose-500/40 font-romantic text-2xl select-none hidden md:flex pointer-events-none">
        Forever & Always Yours ❤️
      </div>
    </div>
  );
};

export default App;
