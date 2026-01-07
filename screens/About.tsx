
import React from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

const About: React.FC = () => {
  const navigate = useNavigate();

  const hospitals = [
    { name: 'Hospital CMQ Premiere', dist: '1.2 km', tel: '322 226 6500' },
    { name: 'Hospital San Javier', dist: '3.5 km', tel: '322 226 1010' }
  ];

  return (
    <div className="pb-44 bg-background-dark min-h-screen">
      <header className="px-8 pt-16 pb-8">
        <h1 className="text-3xl font-black text-white uppercase italic tracking-tighter">Utilidades</h1>
        <p className="text-[9px] text-primary font-black mt-1 uppercase tracking-[0.4em] italic">Servicios y Soporte</p>
      </header>

      <main className="px-8 space-y-10">
        {/* Acciones Rápidas */}
        <div className="grid grid-cols-2 gap-4">
          <button onClick={() => navigate('/emergency')} className="h-28 bg-red-600/10 rounded-3xl flex flex-col items-center justify-center gap-2 border border-red-500/20 active-scale">
            <span className="material-symbols-outlined text-red-500 text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>emergency</span>
            <span className="text-[9px] font-black text-red-500 uppercase tracking-widest italic">S.O.S Botón</span>
          </button>
          <button className="h-28 bg-amber-500/10 rounded-3xl flex flex-col items-center justify-center gap-2 border border-amber-500/20 active-scale">
            <span className="material-symbols-outlined text-amber-500 text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>volunteer_activism</span>
            <span className="text-[9px] font-black text-amber-500 uppercase tracking-widest italic">Donaciones</span>
          </button>
        </div>

        {/* Hospitales */}
        <section className="space-y-4">
          <h3 className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] px-1 italic">Hospitales Recomendados</h3>
          <div className="glass-pure rounded-3xl overflow-hidden border border-white/5 divide-y divide-white/5">
            {hospitals.map(h => (
              <div key={h.name} className="p-4 flex justify-between items-center bg-white/[0.02]">
                <div>
                  <p className="text-xs font-black text-white uppercase italic">{h.name}</p>
                  <p className="text-[8px] font-bold text-white/20 uppercase mt-1 italic">{h.dist} • {h.tel}</p>
                </div>
                <button className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center active-scale">
                  <span className="material-symbols-outlined text-lg text-white/60">call</span>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Sobre Mí */}
        <section className="space-y-4">
          <h3 className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] px-1 italic">Sobre la App</h3>
          <div className="glass-pure rounded-3xl p-6 border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent">
             <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                   <span className="material-symbols-outlined text-primary">person</span>
                </div>
                <div>
                   <p className="text-xs font-black text-white uppercase italic">Hecho por un Local</p>
                   <p className="text-[8px] font-bold text-white/30 uppercase italic">Vallarta Live Dev Core</p>
                </div>
             </div>
             <p className="text-[10px] text-white/50 leading-relaxed italic uppercase font-bold tracking-tight">
               Diseñé esta app para que navegues Puerto Vallarta con inteligencia. Sin protocolos aburridos, solo lo que necesitas: buenos eventos, salud y seguridad.
             </p>
          </div>
        </section>

        <div className="text-center pt-4 opacity-10">
           <p className="text-[7px] font-black text-white uppercase tracking-[0.8em] italic">VALLARTA LIVE // V.3.6</p>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default About;
