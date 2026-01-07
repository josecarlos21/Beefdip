
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import BottomNav from '../components/BottomNav';
import { EVENTS, POLLS } from '../constants';
import { useNavigate } from 'react-router-dom';

const MapView: React.FC = () => {
  const navigate = useNavigate();
  const [selectedIdx, setSelectedIdx] = useState(0);
  const selectedEvent = EVENTS[selectedIdx];
  const [timeMode, setTimeMode] = useState<'day' | 'sunset' | 'night'>('night');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 17) setTimeMode('day');
    else if (hour >= 17 && hour < 20) setTimeMode('sunset');
    else setTimeMode('night');
  }, []);

  const mapPoints = useMemo(() => [
    { id: 'p1', top: '38%', left: '45%', color: 'bg-primary', eventIdx: 0, distance: '180m' },
    { id: 'p2', top: '55%', left: '62%', color: 'bg-accent', eventIdx: 1, distance: '1.4km' },
    { id: 'p3', top: '48%', left: '28%', color: 'bg-cyan-400', eventIdx: 2, distance: '650m' },
    { id: 'p4', top: '22%', left: '75%', color: 'bg-indigo-500', eventIdx: 3, distance: '4.2km' },
  ], []);

  const activePoll = useMemo(() => POLLS.find(p => p.id === selectedEvent.pollId), [selectedEvent.pollId]);

  const mapLayers = {
    day: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=2000",
    sunset: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2000",
    night: "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&q=80&w=2000"
  };

  return (
    <div className="h-screen bg-background-dark overflow-hidden flex flex-col relative">
      <div className="absolute inset-0 z-0 bg-[#05080f]">
        {Object.entries(mapLayers).map(([mode, url]) => (
          <div key={mode} className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out will-change-opacity ${timeMode === mode ? 'opacity-30' : 'opacity-0'}`}>
            <img src={url} className="w-full h-full object-cover grayscale brightness-[0.4] contrast-[1.4]" alt="" />
          </div>
        ))}
      </div>

      {/* Numerical Pins */}
      <div className="absolute inset-0 z-10">
        {mapPoints.map((point, i) => (
          <button 
            key={point.id}
            onClick={() => setSelectedIdx(point.eventIdx)}
            style={{ top: point.top, left: point.left }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300 active-scale ${selectedIdx === point.eventIdx ? 'z-40 scale-125' : 'opacity-40'}`}
          >
            <div className={`w-9 h-9 rounded-full ${point.color} border-2 border-white flex items-center justify-center shadow-2xl`}>
              <span className="text-white font-black text-xs">{i + 1}</span>
            </div>
            {selectedIdx === point.eventIdx && <div className="absolute inset-0 rounded-full animate-ping bg-white/20"></div>}
          </button>
        ))}
      </div>

      <header className="relative z-50 p-6 pt-12 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="w-11 h-11 glass-pure rounded-xl flex items-center justify-center active-scale">
          <span className="material-symbols-outlined text-white text-xl">arrow_back_ios_new</span>
        </button>
        <div className="glass-pure px-4 py-1.5 rounded-xl border-white/5">
           <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em]">Mapa de Eventos</span>
        </div>
        <div className="w-11"></div>
      </header>

      {/* Detalle del Evento (Compacto) */}
      <section className="mt-auto relative z-50 p-6 mb-40 flex justify-center w-full animate-reveal" key={selectedIdx}>
        <div className="glass-pure w-full max-w-[280px] rounded-[2rem] p-4 shadow-2xl border border-white/10">
          <div className="flex gap-3 items-center mb-3">
            <div className="w-11 h-11 rounded-lg overflow-hidden shrink-0 border border-white/10 shadow-lg">
              <img src={selectedEvent.image} className="w-full h-full object-cover" alt="" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xs font-black text-white uppercase italic truncate leading-none">{selectedEvent.title}</h3>
              <p className="text-[8px] font-bold text-white/30 uppercase mt-1.5 italic">{selectedEvent.venue} • {mapPoints[selectedIdx].distance}</p>
            </div>
          </div>

          {activePoll && (
            <div className="bg-white/[0.03] rounded-xl p-3 border border-white/5 mb-3">
              <p className="text-[9px] font-black text-primary/80 italic mb-2 uppercase">Live Pulse</p>
              <div className="space-y-1.5">
                {activePoll.options.map(opt => (
                  <div key={opt.id} className="space-y-0.5">
                    <div className="flex justify-between text-[7px] font-black text-white/40 uppercase">
                      <span>{opt.text}</span>
                      <span>{opt.votes}%</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className={`h-full ${opt.color || 'bg-primary'}`} style={{ width: `${opt.votes}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <button onClick={() => navigate(`/event/${selectedEvent.id}`)} className="flex-1 h-9 glass-pure rounded-lg text-[8px] font-black uppercase tracking-widest active-scale">INFO</button>
            <button className="flex-[1.5] h-9 bg-primary text-white rounded-lg text-[8px] font-black uppercase tracking-widest active-scale">Ruta</button>
          </div>
        </div>
      </section>

      <BottomNav />
    </div>
  );
};

export default MapView;
