import React, { useEffect } from 'react';
import { Heart, Stars } from 'lucide-react';
import confetti from 'canvas-confetti';

export const SuccessView: React.FC = () => {
  useEffect(() => {
    const end = Date.now() + (8 * 1000);
    const colors = ['#e11d48', '#fb7185', '#fda4af', '#fcd34d', '#ffffff'];

    (function frame() {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 75,
        origin: { x: 0, y: 0.8 },
        colors: colors
      });
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 75,
        origin: { x: 1, y: 0.8 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  }, []);

  return (
    <div className="glass rounded-[3.5rem] p-6 md:p-8 text-center border border-white/60 shadow-2xl animate-in fade-in zoom-in duration-1000 w-full min-h-[560px] max-h-[92vh] flex flex-col items-center justify-between space-y-3">
      {/* Top Icon Section */}
      <div className="flex justify-center flex-shrink-0">
        <div className="relative">
          <Heart className="w-10 h-10 md:w-12 md:h-12 text-rose-600 fill-rose-600 animate-[bounce_1.5s_infinite]" />
          <Stars className="absolute -top-3 -right-3 w-6 h-6 md:w-8 md:h-8 text-amber-400 animate-pulse" />
        </div>
      </div>
      
      {/* Middle Content Section */}
      <div className="flex-grow flex flex-col justify-center space-y-2 md:space-y-4 w-full">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-romantic text-rose-600 leading-none drop-shadow-sm">
          My Heart is Full!
        </h1>
        
        <p className="text-base md:text-lg font-serif-elegant text-rose-800/90 italic leading-snug px-4 max-w-[320px] mx-auto">
          "I promise to cherish you and love you more with every passing sunset."
        </p>
        
        {/* Updated Image - Celebration scene from screenshot */}
        <div className="relative w-full max-w-[280px] aspect-[4/3] overflow-hidden rounded-[2rem] shadow-xl border-4 border-white/80 mx-auto transform hover:scale-[1.01] transition-transform duration-700">
          <img 
            src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=1200" 
            alt="Romantic Celebration"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800";
            }}
          />
          <div className="absolute inset-0 bg-rose-500/5 pointer-events-none"></div>
        </div>
      </div>

      {/* Footer Banner Section */}
      <div className="bg-gradient-to-b from-rose-50/90 to-white/90 py-3 px-4 rounded-[2rem] border border-rose-100 shadow-inner w-full flex-shrink-0 transform -rotate-1">
        <p className="text-2xl md:text-3xl lg:text-4xl text-rose-600 font-romantic tracking-widest drop-shadow-sm">
          Always & Forever ❤️
        </p>
      </div>

      {/* Small Decorative Hearts */}
      <div className="flex justify-center gap-2 flex-shrink-0">
        {[1,2,3,4,5].map(i => (
            <div key={i} className={`w-5 h-5 rounded-full bg-white/90 backdrop-blur-sm border border-rose-100 flex items-center justify-center shadow-md animate-bounce`} style={{ animationDelay: `${i * 0.15}s` }}>
                <Heart className="w-2.5 h-2.5 text-rose-500 fill-rose-500" />
            </div>
        ))}
      </div>
    </div>
  );
};