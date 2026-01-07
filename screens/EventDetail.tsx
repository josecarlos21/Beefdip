
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { EVENTS } from '../constants';
import BottomNav from '../components/BottomNav';

const EventDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = EVENTS.find(e => e.id === id) || EVENTS[0];

  const [density, setDensity] = useState(52);
  const [waterLevel, setWaterLevel] = useState(78);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDensity(prev => Math.max(30, Math.min(prev + (Math.random() > 0.5 ? 2 : -2), 95)));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pb-40 min-h-screen bg-background-dark font-sans relative">
      {/* High Energy Immersive Hero */}
      <section className="relative h-[550px] w-full overflow-hidden">
        <img 
          src={event.image} 
          className="absolute inset-0 w-full h-full object-cover grayscale-[0.2] brightness-[0.4] scale-105"
          alt="Venue View"
        />
        {/* Scrims del sistema para legibilidad extrema */}
        <div className="absolute inset-0 img-scrim-top z-10 pointer-events-none opacity-70"></div>
        <div className="absolute inset-0 img-scrim-deep z-10 pointer-events-none"></div>

        {/* Back & Share Header */}
        <div className="relative z-20 px-6 py-12 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="w-12 h-12 rounded-[1.2rem] glass-pure flex items-center justify-center text-white active:scale-90 transition-transform border border-white/10">
            <span className="material-symbols-outlined text-2xl">arrow_back</span>
          </button>
          <div className="flex items-center gap-3">
            <div className="bg-red-600 px-4 py-1.5 rounded-full flex items-center gap-2 shadow-xl shadow-red-600/30 border border-white/20">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
              <span className="text-white text-[9px] font-black tracking-widest uppercase">Live Status</span>
            </div>
            <button className="w-12 h-12 rounded-[1.2rem] glass-pure flex items-center justify-center text-white border border-white/10">
              <span className="material-symbols-outlined text-xl">share</span>
            </button>
          </div>
        </div>

        {/* Experience Overlay Text */}
        <div className="absolute bottom-16 left-8 right-8 z-20">
          <div className="flex flex-col gap-1 mb-4">
             <span className="text-[10px] font-black text-primary uppercase tracking-[0.5em] italic">{event.venue}</span>
             <h2 className="text-5xl font-black text-white leading-none tracking-tighter uppercase italic drop-shadow-2xl">
               Main <span className="text-primary not-italic underline decoration-4 underline-offset-8">Stage</span>
             </h2>
          </div>

          <div className="flex items-center gap-10 mb-8 mt-8">
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-white/40 uppercase tracking-widest italic">Densidad</span>
              <span className="text-4xl font-black text-white leading-none flex items-baseline gap-1 tracking-tighter mt-1">
                {density} 
                <span className="text-[10px] font-bold opacity-30 uppercase tracking-tighter">pers/m²</span>
              </span>
            </div>
            <div className="w-px h-12 bg-white/10 self-end"></div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-white/40 uppercase tracking-widest italic">Sonic Vibe</span>
              <span className="text-lg font-black text-white leading-none uppercase tracking-tighter italic mt-1.5">Melodic Circuit</span>
            </div>
          </div>

          {/* Sutil recommendation box - Glass & Focus */}
          <div className="glass-pure rounded-[2.8rem] p-6 border border-white/10 shadow-2xl relative overflow-hidden group">
             <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-black text-primary uppercase tracking-[0.4em] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                    Radar Inteligente
                  </span>
                  <span className="material-symbols-outlined text-white/10 text-4xl group-hover:rotate-12 transition-transform">auto_awesome</span>
                </div>
                <div>
                  <h3 className="text-xl font-black text-white uppercase tracking-tight italic leading-none">Zona <span className="text-primary">Premium</span></h3>
                  <p className="text-[10px] text-white/40 font-bold leading-relaxed mt-2.5 max-w-[240px] uppercase tracking-tight italic">
                    Flujo de personas optimizado en barra lateral. Tiempo de espera: 2 min.
                  </p>
                </div>
                <button className="w-full bg-primary text-white text-[10px] font-black h-14 rounded-2xl uppercase tracking-[0.3em] shadow-xl shadow-primary/20 active:scale-95 transition-all">
                  Navegar a la Zona
                </button>
             </div>
          </div>
        </div>
      </section>

      <main className="px-8 -mt-8 relative z-30 space-y-8">
        {/* Quick Stats Grid */}
        <section className="grid grid-cols-3 gap-4">
          <Link to="/hydration" className="bg-cyan-500 rounded-[2.2rem] h-36 flex flex-col justify-between p-5 text-white shadow-xl shadow-cyan-600/20 active:scale-95 transition-all border border-white/10">
            <span className="material-symbols-outlined text-2xl">water_drop</span>
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest italic leading-none mb-1.5">Nivel</p>
              <p className="text-xl font-black leading-none">{waterLevel}%</p>
            </div>
          </Link>
          <Link to="/map" className="glass-pure rounded-[2.2rem] h-36 flex flex-col justify-between p-5 text-white shadow-xl border border-white/5 active-scale transition-all">
            <span className="material-symbols-outlined text-2xl text-primary">explore</span>
            <div>
              <p className="text-[9px] font-black text-white/30 uppercase tracking-widest italic leading-none mb-1.5">Radar</p>
              <p className="text-[11px] font-black uppercase leading-none tracking-tight">Main Hall</p>
            </div>
          </Link>
          <Link to="/emergency" className="bg-red-600 rounded-[2.2rem] h-36 flex flex-col justify-between p-5 text-white shadow-xl shadow-red-600/20 active-scale transition-all border border-white/10">
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>gpp_maybe</span>
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest italic leading-none mb-1.5">Ayuda</p>
              <p className="text-[11px] font-black uppercase leading-none tracking-tight">Protocolo</p>
            </div>
          </Link>
        </section>

        {/* Event Meta Card */}
        <div className="glass-pure rounded-[3rem] p-8 border border-white/5 shadow-2xl space-y-8">
           <div className="flex flex-col gap-2">
              <h4 className="text-3xl font-black text-white leading-tight uppercase italic tracking-tighter">{event.title}</h4>
              <div className="flex items-center gap-3">
                 <span className="text-[10px] text-primary font-black uppercase tracking-widest italic">{event.time} — {event.endTime || 'LATE'}</span>
                 <div className="w-1 h-1 rounded-full bg-white/20"></div>
                 <span className="text-[10px] text-white/40 font-black uppercase tracking-widest italic">{event.price}</span>
              </div>
           </div>
           
           <div className="h-px w-full bg-white/5"></div>

           <p className="text-white/40 text-[11px] leading-relaxed font-bold uppercase italic tracking-tight">
             Sincronización total con la producción de {event.venue}. Audio certificado y visuales reactivos en tiempo real. Se recomienda llegar antes de la medianoche para evitar bloqueos en el acceso principal.
           </p>

           <button className="w-full h-18 bg-white text-background-dark font-black text-sm rounded-[2rem] shadow-2xl flex items-center justify-center gap-4 active-scale transition-all uppercase tracking-[0.2em]">
             Comprar Tickets
             <span className="material-symbols-outlined text-2xl">local_activity</span>
           </button>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default EventDetail;
