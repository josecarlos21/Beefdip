
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
      
      {/* MOTOR DE MAPA: Cuadrante de Calle de Alta Resolución (Simulado) */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1569336415962-a4bd9f6dfc0f?auto=format&fit=crop&q=80&w=2000" 
          className="w-full h-full object-cover grayscale brightness-[0.3] contrast-[1.2] scale-125"
          alt="Street Level Map"
        />
        {/* Overlay de Calles Sutiles */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ 
          backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}></div>
        {/* Gradiente de Profundidad */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f111a]/80 via-transparent to-[#0f111a]/90"></div>
      </div>

      {/* INTERFAZ FLOTANTE: Búsqueda Apple Maps Style */}
      <div className="absolute top-14 left-4 right-4 z-50 animate-reveal">
        <div className="glass-pure h-14 rounded-2xl flex items-center px-5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-white/5">
          <span className="material-symbols-outlined text-white/40 mr-3">search</span>
          <input 
            type="text" 
            placeholder="Buscar en Zona Romántica..." 
            className="bg-transparent border-none outline-none text-white text-sm w-full font-medium placeholder:text-white/20"
          />
          <div className="w-px h-6 bg-white/10 mx-3"></div>
          <button className="text-primary font-black text-[10px] uppercase tracking-widest active-scale">Filtros</button>
        </div>
      </div>

      {/* CONTROLES LATERALES MINIMALISTAS */}
      <div className="absolute right-4 top-32 z-50 flex flex-col gap-3 animate-reveal" style={{ animationDelay: '0.2s' }}>
        <button className="w-11 h-11 glass-pure rounded-xl flex items-center justify-center text-white/60 active-scale shadow-xl border-white/5">
          <span className="material-symbols-outlined text-xl">layers</span>
        </button>
        <div className="flex flex-col glass-pure rounded-xl border-white/5 overflow-hidden shadow-xl">
           <button className="w-11 h-11 flex items-center justify-center text-white/60 border-b border-white/5 active:bg-white/5"><span className="material-symbols-outlined text-lg">add</span></button>
           <button className="w-11 h-11 flex items-center justify-center text-white/60 active:bg-white/5"><span className="material-symbols-outlined text-lg">remove</span></button>
        </div>
        <button className="w-11 h-11 bg-white text-background-dark rounded-xl flex items-center justify-center active-scale shadow-2xl">
          <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>my_location</span>
        </button>
      </div>

      {/* CAPA DE PINES: Estética de Marcador de Mapa Profesional */}
      <div className="absolute inset-0 z-20">
        {mapPoints.map((point, i) => {
          const isSelected = selectedIdx === point.eventIdx;
          return (
            <button 
              key={point.id}
              onClick={() => setSelectedIdx(isSelected ? null : point.eventIdx)}
              style={{ top: point.top, left: point.left }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${isSelected ? 'z-40 scale-125' : 'z-20'}`}
            >
              <div className="relative group">
                {/* Marker Pulse FX */}
                {isSelected && <div className="absolute -inset-4 bg-primary/20 rounded-full animate-visual-pulse"></div>}
                
                {/* Marker Body */}
                <div className={`relative flex flex-col items-center transition-transform duration-300 ${isSelected ? '-translate-y-2' : ''}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-2xl border-2 transition-all duration-300 ${isSelected ? 'bg-white border-primary text-primary' : `${point.color} border-white/80 text-white`}`}>
                    <span className="font-black text-xs">{i + 1}</span>
                  </div>
                  {/* Tail/Pin tip */}
                  <div className={`w-3 h-3 rotate-45 -mt-1.5 shadow-xl transition-colors ${isSelected ? 'bg-white' : point.color}`}></div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* BOTTOM SHEET: Detalle del Evento (Solo visible al seleccionar) */}
      <div className={`absolute inset-x-0 bottom-32 z-50 px-4 transition-all duration-500 ease-out ${selectedIdx !== null ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'}`}>
        {selectedEvent && (
          <div className="glass-pure rounded-[2.5rem] p-5 shadow-[0_-20px_80px_rgba(0,0,0,0.8)] border-white/10 relative overflow-hidden">
            {/* Glass decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
            
            <div className="flex gap-4 items-center mb-5">
              <div className="w-14 h-14 rounded-2xl overflow-hidden shrink-0 border border-white/10 shadow-lg">
                <img src={selectedEvent.image} className="w-full h-full object-cover" alt="" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-black text-white uppercase italic truncate leading-none tracking-tight">{selectedEvent.title}</h3>
                  <button onClick={() => setSelectedIdx(null)} className="text-white/20 p-1"><span className="material-symbols-outlined text-lg">close</span></button>
                </div>
                <p className="text-[9px] font-bold text-white/30 uppercase mt-2 italic tracking-widest">{selectedEvent.venue} • {mapPoints.find(p => p.eventIdx === selectedIdx)?.distance}</p>
              </div>
            </div>

            {/* Pulse Module integration (Compact) */}
            {activePoll && (
              <div className="mb-5 bg-white/[0.03] rounded-2xl p-3 border border-white/5">
                <div className="flex justify-between items-center mb-2">
                   <span className="text-[7px] font-black text-primary uppercase tracking-[0.3em] italic flex items-center gap-1">
                     <span className="w-1 h-1 bg-primary rounded-full animate-pulse"></span>
                     Live Pulse
                   </span>
                   <span className="text-[8px] font-bold text-white/40 italic">{activePoll.question}</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {activePoll.options.map(opt => (
                    <div key={opt.id} className="space-y-1">
                      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className={`h-full ${opt.color || 'bg-primary'} transition-all duration-1000`} style={{ width: `${opt.votes}%` }}></div>
                      </div>
                      <div className="flex justify-between text-[6px] font-black uppercase text-white/30">
                        <span>{opt.text}</span>
                        <span>{opt.votes}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => navigate(`/event/${selectedEvent.id}`)} className="h-11 glass-pure rounded-xl text-[9px] font-black uppercase tracking-widest active-scale border-white/10">Detalles</button>
              <button className="h-11 bg-primary text-white rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 active-scale flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-sm">near_me</span>
                Ruta
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Nav de fondo para no tapar los controles del mapa */}
      <BottomNav />
    </div>
  );
};

export default MapView;
