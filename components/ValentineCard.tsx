
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
  const romanticImage = "https://images.unsplash.com/photo-1516589174184-c68526514282?auto=format&fit=crop&q=80&w=1000&h=1200";

  const moveButton = useCallback(() => {
    const rangeX = window.innerWidth > 768 ? 250 : 150;
    const rangeY = 180;
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
      
      if (distance < 130) {
        moveButton();
      }
    };
    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, [moveButton]);

  return (
    <div className="glass rounded-[3.5rem] p-6 md:p-10 text-center border border-white/50 shadow-2xl w-full min-h-[650px] flex flex-col items-center justify-between space-y-6">
      <div className="relative w-full h-72 md:h-80 overflow-hidden rounded-[2.5rem] shadow-lg border border-white/30 flex-shrink-0">
        <img
          src={romanticImage}
          alt="Deep Romantic Moment"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-rose-900/60 to-transparent flex items-end justify-center pb-6">
          <p className="text-white text-xl font-romantic tracking-widest drop-shadow-lg">My world revolves around you...</p>
        </div>
      </div>

      <div className="flex-grow flex flex-col justify-center space-y-4">
        <h1 className="text-5xl md:text-6xl font-romantic text-rose-700 drop-shadow-sm leading-tight">
          My Love...
        </h1>
        
        <p className="text-lg md:text-xl text-rose-900 font-serif-elegant italic leading-relaxed px-4">
          "You are the best thing that ever happened to me, and I never want to let you go."
        </p>

        <h2 className="text-2xl md:text-3xl font-serif-elegant font-bold text-rose-800 flex items-center justify-center gap-2 mt-2">
          <Heart className="w-6 h-6 fill-rose-600 text-rose-600 animate-pulse" />
          Will you be my Valentine?
          <Heart className="w-6 h-6 fill-rose-600 text-rose-600 animate-pulse" />
        </h2>
      </div>

      <div className="w-full flex flex-row items-center justify-center gap-4 md:gap-8 h-24 relative">
        <button
          onClick={onAccept}
          className="group relative px-10 md:px-14 py-4 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-full text-xl md:text-2xl font-bold shadow-xl hover:scale-110 hover:brightness-110 active:scale-95 transition-all z-20"
        >
          <span className="relative z-10 flex items-center gap-3">
            YES! <Sparkles className="w-6 h-6 fill-white" />
          </span>
        </button>

        <div
          ref={noButtonRef}
          style={{
            transform: `translate(${noButtonPos.x}px, ${noButtonPos.y}px)`,
            transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
            position: 'relative',
            zIndex: 10
          }}
        >
          <button
            className="px-8 md:px-12 py-3 bg-white/60 text-rose-400 rounded-full text-lg md:text-xl font-medium border border-rose-200 backdrop-blur-md cursor-default pointer-events-none"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};
