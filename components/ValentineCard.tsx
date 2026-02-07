
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Heart, Sparkles } from 'lucide-react';

interface ValentineCardProps {
  onAccept: () => void;
  onReject: () => void;
}

export const ValentineCard: React.FC<ValentineCardProps> = ({ onAccept, onReject }) => {
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const noButtonRef = useRef<HTMLDivElement>(null);

  // High-quality romantic imagery
  const romanticImage = "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=1000&h=1200";

  const moveButton = useCallback(() => {
    // Range of motion for the "No" button
    const rangeX = window.innerWidth > 768 ? 200 : 120;
    const rangeY = 150;
    const newX = (Math.random() - 0.5) * rangeX;
    const newY = (Math.random() - 0.5) * rangeY;
    setNoButtonPos({ x: newX, y: newY });
  }, []);

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!noButtonRef.current) return;
      const rect = noButtonRef.current.getBoundingClientRect();
      const buttonCenterX = rect.left + rect.width / 2;
      const buttonCenterY = rect.top + rect.height / 2;
      const distance = Math.hypot(e.clientX - buttonCenterX, e.clientY - buttonCenterY);
      
      // If cursor gets too close, move the button away
      if (distance < 120) {
        moveButton();
      }
    };
    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, [moveButton]);

  return (
    <div className="glass rounded-[3.5rem] p-8 md:p-12 text-center border border-white/60 shadow-2xl w-full min-h-[680px] flex flex-col items-center justify-between space-y-6">
      <div className="relative w-full h-80 md:h-96 overflow-hidden rounded-[2.5rem] shadow-md border border-rose-50 flex-shrink-0">
        <img
          src={romanticImage}
          alt="Emotional Romantic Moment"
          className="w-full h-full object-cover brightness-95"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-rose-900/40 to-transparent flex items-end justify-center pb-6">
          <p className="text-white text-xl font-romantic tracking-widest drop-shadow-lg">Every heartbeat leads to you...</p>
        </div>
      </div>

      <div className="flex-grow flex flex-col justify-center space-y-4">
        <h1 className="text-5xl md:text-7xl font-romantic text-rose-600 drop-shadow-sm leading-tight">
          My Darling...
        </h1>
        
        <p className="text-lg md:text-xl text-rose-800/70 font-serif-elegant italic leading-relaxed px-4">
          "I want to wake up next to you every morning and fall in love with you every single day."
        </p>

        <h2 className="text-2xl md:text-3xl font-serif-elegant font-bold text-rose-700 flex items-center justify-center gap-2 mt-4">
          <Heart className="w-6 h-6 fill-rose-500 text-rose-500 animate-pulse" />
          Will you be my Valentine?
          <Heart className="w-6 h-6 fill-rose-500 text-rose-500 animate-pulse" />
        </h2>
      </div>

      <div className="w-full flex flex-row items-center justify-center gap-4 md:gap-8 h-32 relative">
        <button
          onClick={onAccept}
          className="group relative px-10 md:px-14 py-4 md:py-5 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-full text-xl md:text-2xl font-bold shadow-xl hover:scale-105 hover:shadow-rose-300/50 active:scale-95 transition-all z-20"
        >
          <span className="relative z-10 flex items-center gap-3">
            YES! <Sparkles className="w-6 h-6 fill-white" />
          </span>
        </button>

        <div
          ref={noButtonRef}
          style={{
            transform: `translate(${noButtonPos.x}px, ${noButtonPos.y}px)`,
            transition: 'transform 0.15s ease-out',
            position: 'relative',
            zIndex: 10
          }}
        >
          <button
            className="px-8 md:px-12 py-3 md:py-4 bg-white/40 text-rose-300 rounded-full text-lg md:text-xl font-medium border border-rose-100/50 backdrop-blur-md transition-all cursor-default whitespace-nowrap opacity-80"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};
