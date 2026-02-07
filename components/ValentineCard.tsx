import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Heart, Sparkles } from 'lucide-react';

interface ValentineCardProps {
  onAccept: () => void;
  onReject: () => void;
}

export const ValentineCard: React.FC<ValentineCardProps> = ({ onAccept, onReject }) => {
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const noButtonRef = useRef<HTMLDivElement>(null);

  const confusedImages = [
    "https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1584940120743-8981ca35b011?auto=format&fit=crop&q=80&w=800"
  ];

  const [currentImage] = useState(() => confusedImages[Math.floor(Math.random() * confusedImages.length)]);

  const moveButton = useCallback(() => {
    const rangeX = window.innerWidth > 768 ? 200 : 120;
    const rangeY = 150;
    let newX = (Math.random() - 0.5) * rangeX * 2;
    let newY = (Math.random() - 0.5) * rangeY * 2;
    setNoButtonPos({ x: newX, y: newY });
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!noButtonRef.current) return;
      const rect = noButtonRef.current.getBoundingClientRect();
      const buttonCenterX = rect.left + rect.width / 2;
      const buttonCenterY = rect.top + rect.height / 2;
      const distance = Math.hypot(e.clientX - buttonCenterX, e.clientY - buttonCenterY);
      if (distance < 90) {
        moveButton();
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [moveButton]);

  return (
    <div className="glass rounded-[3rem] p-6 md:p-10 text-center border border-white/50 shadow-2xl w-full max-w-[460px] min-h-[680px] flex flex-col items-center justify-between space-y-6">
      <div className="relative w-full h-80 md:h-96 overflow-hidden rounded-[2.5rem] shadow-xl border border-white/40 flex-shrink-0 bg-rose-50">
        <img
          src={currentImage}
          alt="Funny Confused Expression"
          className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110"
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-rose-900/40 via-transparent to-transparent flex items-end justify-center pb-8">
          <p className="text-white text-2xl font-romantic tracking-[0.2em] drop-shadow-lg">Wait... what?</p>
        </div>
      </div>

      <div className="flex-grow flex flex-col justify-center space-y-4 px-2">
        <h1 className="text-5xl md:text-6xl font-romantic text-rose-700 drop-shadow-sm leading-tight">
          Hey Honey...
        </h1>
        <p className="text-lg md:text-xl text-rose-900 font-serif-elegant italic leading-relaxed">
          "Are you really sure about this?"
        </p>
        <h2 className="text-2xl md:text-3xl font-serif-elegant font-bold text-rose-800 flex items-center justify-center gap-3 mt-4">
          <Heart className="w-7 h-7 fill-rose-600 text-rose-600 animate-pulse" />
          Will you be my Valentine?
          <Heart className="w-7 h-7 fill-rose-600 text-rose-600 animate-pulse" />
        </h2>
      </div>

      <div className="w-full flex flex-row items-center justify-center gap-6 md:gap-12 h-24 relative mt-4">
        <button
          onClick={onAccept}
          className="group relative px-12 md:px-16 py-4 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-full text-2xl font-bold shadow-xl hover:scale-110 hover:brightness-110 active:scale-95 transition-all z-20"
        >
          <span className="relative z-10 flex items-center gap-3">
            YES! <Sparkles className="w-6 h-6 fill-white animate-spin-slow" />
          </span>
          <div className="absolute inset-0 rounded-full bg-rose-400 blur-lg opacity-0 group-hover:opacity-40 transition-opacity"></div>
        </button>

        <div
          ref={noButtonRef}
          style={{
            transform: `translate(${noButtonPos.x}px, ${noButtonPos.y}px)`,
            transition: 'transform 0.25s cubic-bezier(0.17, 0.67, 0.83, 0.67)',
            position: 'relative',
            zIndex: 10
          }}
          onMouseEnter={moveButton}
        >
          <button
            className="px-10 py-3 bg-white/40 text-rose-400 rounded-full text-xl font-medium border border-rose-200 backdrop-blur-md cursor-default pointer-events-none md:pointer-events-auto"
            onClick={(e) => {
              e.preventDefault();
              moveButton();
            }}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};