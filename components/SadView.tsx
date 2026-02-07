
import React, { useEffect, useRef } from 'react';
import { CloudRain, Frown, RotateCcw } from 'lucide-react';

interface SadViewProps {
  onRetry: () => void;
}

export const SadView: React.FC<SadViewProps> = ({ onRetry }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Play crying sound effect
    audioRef.current = new Audio('https://www.myinstants.com/media/sounds/crying-meme-sound-effect.mp3');
    audioRef.current.volume = 0.5;
    audioRef.current.play().catch(e => console.log("Audio failed to play", e));
    
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  return (
    <div className="glass rounded-[2.5rem] p-4 md:p-8 text-center border border-white/60 shadow-2xl animate-in fade-in slide-in-from-bottom-10 duration-700 w-full mx-auto max-h-[95vh] overflow-hidden flex flex-col items-center justify-center space-y-4">
      <div className="flex justify-center relative flex-shrink-0">
        <CloudRain className="w-16 h-16 text-blue-400 absolute -top-4 animate-bounce opacity-50" />
        <Frown className="w-20 h-20 text-gray-500 animate-pulse" />
      </div>

      <h1 className="text-4xl md:text-5xl font-romantic text-gray-700 leading-tight flex-shrink-0">
        Oh No... My Heart Is Broken!
      </h1>

      <div className="relative w-32 h-32 md:w-44 md:h-44 flex-shrink-0 overflow-hidden rounded-full border-4 border-gray-200 shadow-inner">
        <img 
          src="https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?auto=format&fit=crop&q=80&w=600" 
          alt="Crying face" 
          className="w-full h-full object-cover filter grayscale"
        />
        <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay"></div>
      </div>

      <p className="text-lg md:text-xl font-serif-elegant text-gray-600 italic leading-snug flex-shrink-0">
        "I guess I'll just be alone in the rain..."
      </p>

      <button
        onClick={onRetry}
        className="group flex items-center justify-center gap-2 px-8 py-3 bg-gray-200 hover:bg-rose-500 hover:text-white text-gray-700 rounded-full text-lg md:text-xl font-bold transition-all shadow-md flex-shrink-0"
      >
        <RotateCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
        Let me reconsider!
      </button>
    </div>
  );
};
