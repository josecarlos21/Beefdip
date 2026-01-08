
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
    <div className="pb-32 min-h-screen bg-background-dark font-sans relative">
      {/* High Energy Immersive Hero */}
      <section className="relative h-[520px] w-full overflow-hidden">
        <img 
          src={event.image} 
          className="absolute inset-0 w-full h-full object-cover grayscale-[0.2] brightness-[0.3] scale-105"
          alt="Venue View"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-background-dark/20 to-background-dark"></div>

        {/* Back & Share Header */}
        <div className="relative z-10 px-5 py-4 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white active:scale-90 transition-transform border border-white/10">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div className="flex items-center gap-2">
            <div className="bg-red-600 px-3 py-1 rounded-full flex items-center gap-2 shadow-lg shadow-red-600/30">
              <span className="text-white text-[10px] font-black tracking-widest uppercase animate-pulse">Live</span>
            </div>
            <button className="w-10 h-10 rounded-full bg-white/70 backdrop-blur-md flex items-center justify-center text-slate-700 border border-white/40 is-inactive" aria-disabled="true">
              <span className="material-symbols-outlined text-lg">share</span>
            </button>
          </div>
        </div>

        {/* Experience Overlay Text */}
        <div className="absolute bottom-12 left-5 right-5 z-10">
          <div className="flex flex-col gap-1 mb-2">
             <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">{event.venue}</span>
             <h2 className="text-6xl font-black text-white leading-none tracking-tighter uppercase italic">
               Main <span className="text-primary not-italic underline decoration-4 underline-offset-8">Hall</span>
             </h2>
          </div>

          <div className="flex items-center gap-8 mb-8 mt-6">
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Densidad</span>
              <span className="text-3xl font-black text-white leading-none flex items-baseline gap-1">
                {density} 
                <span className="text-xs font-medium opacity-40 uppercase">pers/m²</span>
              </span>
            </div>
            <div className="w-px h-10 bg-white/10"></div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Beat</span>
              <span className="text-base font-bold text-white leading-none uppercase tracking-tighter italic">High Energy House</span>
            </div>
          </div>

          {/* Sutil recommendation box - Blurred & Floating */}
          <div className="bg-white/5 backdrop-blur-2xl rounded-[2.5rem] p-6 border border-white/10 shadow-2xl relative overflow-hidden animate-pulse-slow">
             <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-black text-primary uppercase tracking-[0.3em] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                    Ruta Recomendada
                  </span>
                  <span className="material-symbols-outlined text-white/20 text-4xl">auto_awesome</span>
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight">VIP <span className="italic text-primary">Terrace</span></h3>
                  <p className="text-[11px] text-white/50 font-medium leading-relaxed mt-2 max-w-[220px]">
                    Detectamos una zona con 40% menos de densidad y vista directa al DJ Booth.
                  </p>
                </div>
                <button className="w-full bg-primary text-white text-xs font-black py-4 rounded-2xl uppercase tracking-[0.2em] shadow-xl shadow-primary/20 active:scale-95 transition-all is-inactive" aria-disabled="true" type="button">
                  Navegar a la Zona
                </button>
             </div>
          </div>
        </div>
      </section>

      <main className="px-5 -mt-6 relative z-20 space-y-6">
        {/* Quick Stats Grid */}
        <section className="grid grid-cols-3 gap-3">
          <Link to="/hydration" className="bg-blue-600 rounded-3xl h-36 flex flex-col justify-between p-5 text-white shadow-lg shadow-blue-600/20 active:scale-95 transition-all hover:-translate-y-1">
            <span className="material-symbols-outlined">water_drop</span>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest">Agua</p>
              <p className="text-xl font-black">{waterLevel}%</p>
            </div>
          </Link>
          <Link to="/map" className="bg-background-surface rounded-3xl h-36 flex flex-col justify-between p-5 border border-gray-100 shadow-sm active:scale-95 transition-all hover:-translate-y-1">
            <span className="material-symbols-outlined text-primary">explore</span>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Ubicación</p>
              <p className="text-sm font-black uppercase leading-none text-slate-900">Cerca Stage</p>
            </div>
          </Link>
          <Link to="/emergency" className="bg-red-600 rounded-3xl h-36 flex flex-col justify-between p-5 text-white shadow-lg shadow-red-600/20 active:scale-95 transition-all hover:-translate-y-1">
            <span className="material-symbols-outlined">sos</span>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest">Ayuda</p>
              <p className="text-base font-black uppercase leading-none">Emergencia</p>
            </div>
          </Link>
        </section>

        {/* Event Meta Card */}
        <div className="bg-background-surface rounded-[2.5rem] p-7 border border-gray-100 shadow-sm space-y-6">
           <div className="flex flex-col gap-1">
              <h4 className="text-2xl font-black text-slate-900 leading-tight uppercase italic">{event.title}</h4>
              <p className="text-sm text-primary font-bold uppercase tracking-widest">{event.time} - {event.endTime || 'LATE'}</p>
           </div>
           
           <div className="flex gap-4">
              <div className="flex-1 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Precio</p>
                <p className="text-xs font-black text-slate-900">{event.price}</p>
              </div>
              <div className="flex-1 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Categoría</p>
                <p className="text-xs font-black text-slate-900 uppercase">{event.category}</p>
              </div>
           </div>

           <p className="text-gray-500 text-sm leading-relaxed font-medium">
             Experimenta la producción más grande de la semana en {event.venue}. Sonido reforzado, shows de láser y los mejores visuales de Puerto Vallarta. 
           </p>

           <button className="w-full h-16 bg-primary text-white font-black text-lg rounded-[2rem] shadow-2xl shadow-primary/30 flex items-center justify-center gap-3 active:scale-95 transition-all uppercase tracking-tighter is-inactive" aria-disabled="true" type="button">
             Comprar Tickets
             <span className="material-symbols-outlined">local_activity</span>
           </button>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default EventDetail;
