
import React, { useState, useMemo } from 'react';
import BottomNav from '../components/BottomNav';
import { EVENTS, POLLS } from '../constants';
import { useNavigate } from 'react-router-dom';

const MapView: React.FC = () => {
  const navigate = useNavigate();
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const selectedEvent = selectedIdx !== null ? EVENTS[selectedIdx] : null;

  // Coordenadas relativas simulando un cuadrante de calles específico de la Zona Romántica
  const mapPoints = useMemo(() => [
    { id: 'p1', top: '45%', left: '52%', color: 'bg-primary', eventIdx: 0, distance: '120m' },
    { id: 'p2', top: '32%', left: '38%', color: 'bg-accent', eventIdx: 1, distance: '450m' },
    { id: 'p3', top: '65%', left: '25%', color: 'bg-cyan-500', eventIdx: 2, distance: '300m' },
    { id: 'p4', top: '20%', left: '68%', color: 'bg-indigo-500', eventIdx: 3, distance: '1.2km' },
  ], []);

  const activePoll = useMemo(() => {
    return selectedEvent?.pollId ? POLLS.find(p => p.id === selectedEvent.pollId) : null;
  }, [selectedEvent]);

  return (
    <div className="h-screen bg-[#0f111a] overflow-hidden flex flex-col relative" role="main">
      
      {/* MOTOR DE MAPA: Enfoque de calle de alta fidelidad */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1569336415962-a4bd9f6dfc0f?auto=format&fit=crop&q=80&w=2000" 
          className="w-full h-full object-cover grayscale brightness-[0.25] contrast-[1.3] scale-110"
          alt="Street Map"
        />
        {/* Calles sutiles */}
        <div className="absolute inset-0 opacity-[0.15]" style={{ 
          backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e] via-transparent to-[#0a0f1e]/40"></div>
      </div>

      {/* HEADER MINIMALISTA */}
      <div className="absolute top-14 left-4 right-4 z-50 animate-reveal">
        <div className="glass-pure h-12 rounded-2xl flex items-center px-4 shadow-xl border-white/5">
          <span className="material-symbols-outlined text-white/30 text-xl mr-3">search</span>
          <input 
            type="text" 
            placeholder="Buscar en Zona Romántica..." 
            className="bg-transparent border-none outline-none text-white text-[11px] w-full font-bold placeholder:text-white/10 italic uppercase tracking-widest"
          />
          <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 ml-2">
            <span className="material-symbols-outlined text-white/40 text-sm">filter_list</span>
          </div>
        </div>
      </div>

      {/* CONTROLES DE NAVEGACIÓN COMPACTOS */}
      <div className="absolute right-4 top-32 z-40 flex flex-col gap-2 animate-reveal" style={{ animationDelay: '0.1s' }}>
        <button className="w-10 h-10 glass-pure rounded-xl flex items-center justify-center text-white/40 active-scale border-white/5">
          <span className="material-symbols-outlined text-lg">layers</span>
        </button>
        <button className="w-10 h-10 bg-white text-background-default rounded-xl flex items-center justify-center active-scale shadow-2xl">
          <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>my_location</span>
        </button>
      </div>

      {/* PINES DE EVENTOS */}
      <div className="absolute inset-0 z-20">
        {mapPoints.map((point, i) => {
          const isSelected = selectedIdx === point.eventIdx;
          return (
            <button 
              key={point.id}
              onClick={() => setSelectedIdx(isSelected ? null : point.eventIdx)}
              style={{ top: point.top, left: point.left }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${isSelected ? 'z-40 scale-110' : 'z-20 scale-90 opacity-60'}`}
            >
              <div className="flex flex-col items-center">
                 <div className={`w-9 h-9 rounded-full flex items-center justify-center shadow-2xl border-2 transition-all ${isSelected ? 'bg-white border-primary text-primary' : `${point.color} border-white text-white`}`}>
                    <span className="font-black text-[10px]">{i + 1}</span>
                 </div>
                 <div className={`w-2 h-2 rotate-45 -mt-1 shadow-xl ${isSelected ? 'bg-white' : point.color}`}></div>
                 {isSelected && <div className="absolute -inset-2 bg-primary/20 rounded-full animate-visual-pulse -z-10"></div>}
              </div>
            </button>
          );
        })}
      </div>

      {/* TARJETA DE EVENTO (POPUP ARMONIOSO) */}
      <div className={`absolute inset-x-4 bottom-[108px] z-50 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${selectedIdx !== null ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95 pointer-events-none'}`}>
        {selectedEvent && (
          <div className="glass-pure rounded-[2rem] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.8)] border-white/10">
            <div className="flex gap-4 items-center">
              {/* Imagen pequeña y definida */}
              <div className="w-12 h-12 rounded-[1rem] overflow-hidden shrink-0 border border-white/10 shadow-md">
                <img src={selectedEvent.image} className="w-full h-full object-cover" alt="" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h3 className="text-[12px] font-black text-white uppercase italic truncate leading-none tracking-tight">{selectedEvent.title}</h3>
                  <button onClick={() => setSelectedIdx(null)} className="text-white/20 hover:text-white -mt-1 -mr-1"><span className="material-symbols-outlined text-sm">close</span></button>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[7px] font-black text-primary uppercase tracking-widest italic">{selectedEvent.venue}</span>
                  <div className="w-1 h-1 rounded-full bg-white/10"></div>
                  <span className="text-[7px] font-bold text-white/30 uppercase italic">{mapPoints.find(p => p.eventIdx === selectedIdx)?.distance}</span>
                </div>
              </div>
            </div>

            {/* Live Poll (Versión Micro) */}
            {activePoll && (
              <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between gap-4">
                <div className="flex-1">
                   <div className="flex justify-between text-[6px] font-black text-white/20 uppercase tracking-widest mb-1.5">
                      <span className="flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-primary animate-pulse"></span> PULSE</span>
                      <span>{activePoll.options[0].votes}%</span>
                   </div>
                   <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${activePoll.options[0].votes}%` }}></div>
                   </div>
                </div>
                <button 
                  onClick={() => navigate(`/event/${selectedEvent.id}`)}
                  className="px-4 h-8 bg-primary text-white rounded-xl text-[8px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 active-scale"
                >
                  INFO
                </button>
              </div>
            )}
            
            {!activePoll && (
              <div className="mt-4 flex gap-2">
                 <button onClick={() => navigate(`/event/${selectedEvent.id}`)} className="flex-1 h-9 glass-pure rounded-xl text-[8px] font-black uppercase tracking-widest border-white/5">Detalles</button>
                 <button className="flex-1 h-9 bg-primary text-white rounded-xl text-[8px] font-black uppercase tracking-widest shadow-lg shadow-primary/20">Ir Ahora</button>
              </div>
            )}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default MapView;
