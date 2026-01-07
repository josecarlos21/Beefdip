
import React, { useState } from 'react';
import BottomNav from '../components/BottomNav';
import { VENUES, EVENTS } from '../constants';
import { useNavigate } from 'react-router-dom';

const MapView: React.FC = () => {
  const navigate = useNavigate();
  const [selectedEvent, setSelectedEvent] = useState(EVENTS[0]);

  // Simulamos puntos en un mapa visual estilo Google Maps Dark con coordenadas relativas
  const mapPoints = [
    { id: '1', top: '35%', left: '42%', color: 'bg-primary', eventIdx: 0 },
    { id: '2', top: '58%', left: '62%', color: 'bg-accent', eventIdx: 1 },
    { id: '3', top: '48%', left: '25%', color: 'bg-cyan-400', eventIdx: 2 },
    { id: '4', top: '25%', left: '75%', color: 'bg-indigo-500', eventIdx: 3 },
  ];

  return (
    <div className="h-screen bg-background-dark font-sans overflow-hidden flex flex-col relative">
      {/* FONDO DE MAPA INMERSIVO */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000" 
          className="w-full h-full object-cover opacity-60 mix-blend-overlay grayscale-[0.3]"
          alt="Map Background"
        />
        {/* Capa de rejilla/grid para dar estilo tecnológico/cartográfico */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-background-dark/60 via-transparent to-background-dark"></div>
        
        {/* Puntos de Eventos Interactivos */}
        {mapPoints.map((point) => (
          <button 
            key={point.id}
            onClick={() => setSelectedEvent(EVENTS[point.eventIdx])}
            style={{ top: point.top, left: point.left }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 group transition-all duration-300 ${selectedEvent.id === EVENTS[point.eventIdx].id ? 'scale-125' : 'scale-100'}`}
          >
            <div className={`w-10 h-10 ${point.color} rounded-full animate-ping absolute opacity-20 group-hover:opacity-40`}></div>
            <div className={`w-12 h-12 ${point.color} rounded-full border-4 border-white/20 shadow-[0_0_20px_rgba(0,0,0,0.5)] relative z-10 flex items-center justify-center transition-all group-active:scale-150`}>
               <span className="material-symbols-outlined text-white text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                 {selectedEvent.id === EVENTS[point.eventIdx].id ? 'stars' : 'location_on'}
               </span>
            </div>
            {/* Etiqueta flotante mini */}
            <div className={`absolute -bottom-8 left-1/2 -translate-x-1/2 glass px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap`}>
              <span className="text-[8px] font-black text-white uppercase tracking-widest">{EVENTS[point.eventIdx].venue}</span>
            </div>
          </button>
        ))}
      </div>

      {/* HEADER MINIMALISTA */}
      <header className="relative z-50 p-6 pt-12 flex items-center justify-between pointer-events-none">
        <button onClick={() => navigate(-1)} className="w-12 h-12 glass rounded-2xl flex items-center justify-center pointer-events-auto active:scale-90 transition-all border-white/10">
          <span className="material-symbols-outlined text-white">arrow_back</span>
        </button>
        <div className="glass px-6 py-2.5 rounded-2xl flex flex-col items-center pointer-events-auto border-white/10">
           <span className="text-[9px] font-black text-primary uppercase tracking-[0.3em] italic leading-none">Vallarta Live</span>
           <h1 className="text-[10px] font-black text-white/40 uppercase tracking-tighter mt-1">Navegación en Tiempo Real</h1>
        </div>
        <button className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-primary pointer-events-auto active:scale-90 transition-all border-white/10">
          <span className="material-symbols-outlined">explore</span>
        </button>
      </header>

      {/* TARJETA DE EVENTO ARMÓNICA - Diseño compacto y elegante */}
      <div className="mt-auto relative z-50 p-6 mb-32 flex justify-center w-full">
        <div className="glass w-full max-w-[360px] rounded-[2.5rem] p-5 flex gap-5 items-center border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-fade-in-up">
           <div className="w-20 h-20 rounded-[1.5rem] overflow-hidden shrink-0 border border-white/10 shadow-lg relative">
              <img src={selectedEvent.image} className="w-full h-full object-cover" alt={selectedEvent.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
           </div>
           
           <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                <span className="text-[8px] font-black text-primary uppercase tracking-widest">Siguiente Evento</span>
              </div>
              <h3 className="text-base font-black text-white uppercase italic truncate tracking-tight">{selectedEvent.title}</h3>
              
              <div className="flex items-center gap-4 mt-3">
                 <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                    <span className="material-symbols-outlined text-primary text-xs">schedule</span>
                    <span className="text-[9px] font-black text-white/80 uppercase">{selectedEvent.time}</span>
                 </div>
                 <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                    <span className="material-symbols-outlined text-cyan-400 text-xs">directions_walk</span>
                    <span className="text-[9px] font-black text-white/80 uppercase">8 min</span>
                 </div>
              </div>
           </div>

           <button 
             onClick={() => navigate(`/event/${selectedEvent.id}`)}
             className="w-12 h-12 sunset-gradient rounded-2xl flex items-center justify-center text-white active:scale-90 transition-all shadow-xl shadow-primary/30 shrink-0"
           >
              <span className="material-symbols-outlined text-xl">near_me</span>
           </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default MapView;
