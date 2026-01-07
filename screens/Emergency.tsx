
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Emergency: React.FC = () => {
  const navigate = useNavigate();
  const [holding, setHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<number | null>(null);

  // Gestión de timer estricta para evitar memory leaks
  useEffect(() => {
    if (holding) {
      timerRef.current = window.setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            // Acción crítica
            if (timerRef.current) clearInterval(timerRef.current);
            alert('¡Llamando a emergencias 911! Su ubicación ha sido enviada.');
            setHolding(false);
            return 100;
          }
          return prev + 4; // ~1.2s para completar
        });
      }, 50);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = null;
      setProgress(0);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [holding]);

  return (
    <div className="h-screen flex flex-col bg-[#1a0000] relative overflow-hidden" role="alert">
      {/* Background Pulse FX */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none" aria-hidden="true">
        <div className="w-[600px] h-[600px] bg-red-600 rounded-full animate-ping"></div>
      </div>

      <header className="p-8 pt-14 flex items-center justify-between relative z-10">
        <button onClick={() => navigate(-1)} className="w-14 h-14 rounded-2xl glass-morphism text-white flex items-center justify-center active-scale tap-target">
          <span className="material-symbols-outlined text-3xl">close</span>
        </button>
        <div className="flex flex-col items-center">
          <h2 className="text-white text-xs font-black uppercase tracking-[0.5em] italic">Centro de Alerta</h2>
          <span className="text-red-500 text-[10px] font-bold uppercase mt-1">Puerto Vallarta 911</span>
        </div>
        <div className="w-14"></div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-10 text-center relative z-10">
        <div className="mb-16">
          <div className="w-24 h-24 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-600/30">
            <span className="material-symbols-outlined text-red-500 text-5xl animate-pulse">gpp_maybe</span>
          </div>
          <h1 className="text-4xl font-black text-white leading-none uppercase italic tracking-tighter">Acción Crítica</h1>
          <p className="text-red-200/40 mt-4 text-[10px] font-black uppercase tracking-widest leading-relaxed">
            Mantén presionado el botón central<br/>para activar el protocolo de ayuda.
          </p>
        </div>

        {/* SOS Button Interface */}
        <div className="relative">
          {/* Progress Ring */}
          <svg className="w-80 h-80 -rotate-90">
            <circle cx="160" cy="160" r="145" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
            <circle 
              cx="160" cy="160" r="145" 
              fill="none" 
              stroke="#ef4444" 
              strokeWidth="12" 
              strokeDasharray="911" 
              strokeDashoffset={911 - (911 * progress) / 100}
              className="transition-all duration-75"
              strokeLinecap="round"
            />
          </svg>
          
          <button 
            onMouseDown={() => setHolding(true)}
            onMouseUp={() => setHolding(false)}
            onMouseLeave={() => setHolding(false)}
            onTouchStart={(e) => { e.preventDefault(); setHolding(true); }}
            onTouchEnd={() => setHolding(false)}
            className="absolute inset-8 rounded-full bg-gradient-to-br from-red-600 to-red-900 shadow-[0_0_80px_rgba(239,68,68,0.5)] flex flex-col items-center justify-center text-white active:scale-95 transition-transform border-4 border-white/20"
          >
            <span className="material-symbols-outlined text-[100px] leading-none mb-2" style={{fontVariationSettings: "'FILL' 1"}}>sos</span>
            <span className="text-2xl font-black tracking-[0.2em] uppercase italic">Pánico</span>
          </button>
        </div>

        <div className="mt-20 w-full space-y-4">
          <div className="glass-morphism rounded-[2.5rem] p-6 flex items-start gap-4 border-red-900/20">
            <span className="material-symbols-outlined text-red-500 text-3xl">location_on</span>
            <div className="text-left">
              <p className="text-white font-black text-xs uppercase tracking-widest leading-none">GPS Activo</p>
              <p className="text-white/40 text-[10px] font-bold uppercase mt-2 tracking-tight leading-relaxed italic">Malecón PV: Zona Romántica.<br/>Datos sincronizados con C4.</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="p-10 pb-14 relative z-10">
        <button onClick={() => navigate(-1)} className="w-full h-18 rounded-[2rem] border-2 border-white/10 text-white/40 text-[10px] font-black uppercase tracking-[0.3em] italic hover:text-white transition-colors active-scale">
          Cancelar y Volver
        </button>
      </footer>
    </div>
  );
};

export default Emergency;
