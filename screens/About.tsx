
import React from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

const About: React.FC = () => {
  const navigate = useNavigate();

  const hospitals = [
    { name: 'Hospital CMQ Premiere', dist: '1.2 km', tel: '322 226 6500' },
    { name: 'Hospital San Javier', dist: '3.5 km', tel: '322 226 1010' },
    { name: 'Cruz Roja PV', dist: '2.1 km', tel: '322 222 1533' }
  ];

  return (
    <div className="pb-44 bg-background-dark min-h-screen font-sans overflow-x-hidden">
      <header className="px-8 pt-16 pb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-white uppercase italic tracking-tighter">Ajustes</h1>
          <p className="text-[9px] text-primary font-black mt-1 uppercase tracking-[0.4em] italic opacity-60">Utilidades Vitales</p>
        </div>
        <div className="w-14 h-14 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center">
           <span className="material-symbols-outlined text-white/30 text-2xl">grid_view</span>
        </div>
      </header>

      <main className="px-8 space-y-10">
        {/* Acciones Críticas / Seguridad */}
        <section className="grid grid-cols-2 gap-4 animate-reveal">
          <button onClick={() => navigate('/emergency')} className="h-32 bg-red-600/10 rounded-[2.2rem] flex flex-col items-center justify-center gap-3 border border-red-500/20 active-scale group">
            <div className="w-11 h-11 bg-red-600 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform shadow-red-600/20">
              <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>emergency</span>
            </div>
            <span className="text-[9px] font-black text-red-500 uppercase tracking-widest italic leading-none">Protocolo SOS</span>
          </button>
          <button className="h-32 bg-amber-500/10 rounded-[2.2rem] flex flex-col items-center justify-center gap-3 border border-amber-500/20 active-scale group">
            <div className="w-11 h-11 bg-amber-500 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform shadow-amber-500/20">
              <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>volunteer_activism</span>
            </div>
            <span className="text-[9px] font-black text-amber-500 uppercase tracking-widest italic leading-none">Donar Ahora</span>
          </button>
        </section>

        {/* Directorio de Salud */}
        <section className="space-y-4 animate-reveal" style={{ animationDelay: '0.1s' }}>
          <div className="flex justify-between items-center px-1">
            <h3 className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] italic">Servicios de Salud</h3>
            <span className="text-[7px] font-black text-emerald-400 uppercase italic flex items-center gap-1.5 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20">
              <span className="w-1 h-1 bg-emerald-400 rounded-full animate-pulse"></span>
              24/7 ACTIVO
            </span>
          </div>
          <div className="glass-pure rounded-[2.5rem] overflow-hidden border border-white/5 divide-y divide-white/5 shadow-2xl">
            {hospitals.map(h => (
              <div key={h.name} className="p-5 flex justify-between items-center hover:bg-white/[0.02] transition-colors">
                <div>
                  <p className="text-xs font-black text-white uppercase italic tracking-tight">{h.name}</p>
                  <p className="text-[8px] font-bold text-white/20 uppercase mt-1 italic">{h.dist} • {h.tel}</p>
                </div>
                <button className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 active-scale">
                  <span className="material-symbols-outlined text-base text-white/60">call</span>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Sobre Mí (Developer Core) */}
        <section className="space-y-4 animate-reveal" style={{ animationDelay: '0.2s' }}>
          <h3 className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] italic px-1">Sobre Mí</h3>
          <div className="glass-pure rounded-[2.5rem] p-6 border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent shadow-2xl">
             <div className="flex items-center gap-5 mb-5">
                <div className="w-14 h-14 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shadow-inner overflow-hidden shadow-primary/20">
                   <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover grayscale" alt="Dev" />
                </div>
                <div>
                   <p className="text-sm font-black text-white uppercase italic tracking-tighter leading-none">Vallarta Local Dev</p>
                   <p className="text-[8px] font-bold text-white/20 uppercase mt-2 italic tracking-widest">Ingeniería Visual PV-2026</p>
                </div>
             </div>
             <p className="text-[11px] text-white/40 leading-relaxed italic uppercase font-bold tracking-tight">
               He creado esta plataforma para que navegues Puerto Vallarta con total fluidez. Mi misión es darte las mejores herramientas para que disfrutes de cada fiesta con seguridad, estilo y toda la vibra local.
             </p>
             <div className="flex gap-4 pt-6 opacity-40">
                {['alternate_email', 'share'].map(icon => (
                  <button key={icon} className="w-9 h-9 rounded-xl glass-pure flex items-center justify-center border-white/5 text-white active-scale">
                    <span className="material-symbols-outlined text-base">{icon}</span>
                  </button>
                ))}
             </div>
          </div>
        </section>

        <div className="text-center pt-6 opacity-5 flex flex-col items-center">
           <div className="h-px w-10 bg-white mb-4"></div>
           <p className="text-[6px] font-black text-white uppercase tracking-[1em] italic">Vallarta Live Engine v3.9</p>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default About;
