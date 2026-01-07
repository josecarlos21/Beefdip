
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Emergency: React.FC = () => {
  const navigate = useNavigate();
  const [holding, setHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (holding) {
      timerRef.current = window.setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            alert('¡Llamando a emergencias 911!');
            setHolding(false);
            return 100;
          }
          return prev + 5;
        });
      }, 50);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setProgress(0);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [holding]);

  return (
    <div className="h-screen flex flex-col bg-[#1a0000] relative overflow-hidden">
      {/* Background Pulse */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <div className="w-[500px] h-[500px] bg-red-600 rounded-full animate-ping"></div>
      </div>

      <header className="p-6 flex items-center justify-between relative z-10">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center">
          <span className="material-symbols-outlined">close</span>
        </button>
        <h2 className="text-white font-black uppercase tracking-widest">Emergencia 911</h2>
        <div className="w-10"></div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-10 text-center relative z-10">
        <div className="mb-12">
          <span className="material-symbols-outlined text-red-500 text-6xl animate-pulse mb-4">gpp_maybe</span>
          <h1 className="text-3xl font-black text-white leading-tight">Mantén presionado para llamar</h1>
          <p className="text-red-200/50 mt-2 font-medium">Suelta para cancelar la acción</p>
        </div>

        {/* SOS Button */}
        <div className="relative">
          <svg className="w-72 h-72 -rotate-90">
            <circle cx="144" cy="144" r="130" fill="none" stroke="#ffffff10" strokeWidth="8" />
            <circle 
              cx="144" cy="144" r="130" 
              fill="none" 
              stroke="#ef4444" 
              strokeWidth="10" 
              strokeDasharray="816" 
              strokeDashoffset={816 - (816 * progress) / 100}
              className="transition-all duration-75"
              strokeLinecap="round"
            />
          </svg>
          <button 
            onMouseDown={() => setHolding(true)}
            onMouseUp={() => setHolding(false)}
            onMouseLeave={() => setHolding(false)}
            onTouchStart={() => setHolding(true)}
            onTouchEnd={() => setHolding(false)}
            className="absolute inset-4 rounded-full bg-gradient-to-br from-red-600 to-red-800 shadow-[0_0_60px_rgba(239,68,68,0.4)] flex flex-col items-center justify-center text-white active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-[80px] mb-2" style={{fontVariationSettings: "'FILL' 1"}}>sos</span>
            <span className="text-2xl font-black tracking-widest">LLAMAR</span>
          </button>
        </div>

        <div className="mt-16 w-full space-y-4">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 flex items-start gap-3 border border-white/10">
            <span className="material-symbols-outlined text-red-500">my_location</span>
            <div className="text-left">
              <p className="text-white font-bold text-sm">Ubicación compartida</p>
              <p className="text-white/40 text-xs mt-1">Puerto Vallarta: Calle Malecon 123. Los servicios de emergencia ya tienen tu GPS.</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="p-10 relative z-10">
        <button onClick={() => navigate(-1)} className="w-full h-14 rounded-2xl border border-white/20 text-white font-bold uppercase tracking-widest text-sm">
          Cancelar Emergencia
        </button>
      </footer>
    </div>
  );
};

export default Emergency;
