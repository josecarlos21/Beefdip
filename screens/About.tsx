
import React from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

const About: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="pb-40 bg-background-dark min-h-screen font-sans overflow-x-hidden">
      {/* VENTANA SOCIAL - CABECERA CON IMAGEN */}
      <div className="relative h-64 w-full">
        <img 
          src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=1000" 
          className="w-full h-full object-cover"
          alt="Social Cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/40 to-transparent"></div>
        
        {/* APP ICON OVERLAY */}
        <div className="absolute -bottom-10 left-6 flex items-end gap-5">
           <div className="w-28 h-28 sunset-gradient rounded-[2.5rem] border-[6px] border-background-dark shadow-2xl flex items-center justify-center rotate-6 relative z-10">
              <span className="material-symbols-outlined text-white text-5xl">local_fire_department</span>
           </div>
           <div className="pb-12">
              <h1 className="text-2xl font-black text-white uppercase italic tracking-tighter">Vallarta<span className="text-primary">Live</span></h1>
              <div className="flex items-center gap-2 mt-0.5">
                 <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                 <p className="text-[10px] font-black text-white/70 uppercase tracking-widest">v2.5.0 Premium</p>
              </div>
           </div>
        </div>
      </div>

      <main className="px-6 mt-20 space-y-10">
        {/* BOTONES DE ACCIÓN RÁPIDA - INTEGRADOS Y ESTILIZADOS */}
        <div className="flex gap-4 p-1 glass rounded-[2.5rem] border-slate-200/70 shadow-xl">
           <button 
             onClick={() => navigate('/emergency')}
             className="flex-1 h-24 bg-red-600/10 hover:bg-red-600/20 rounded-[2.2rem] flex flex-col items-center justify-center gap-2 active:scale-95 transition-all group border border-red-500/20"
           >
              <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-red-600/30 group-hover:scale-110 transition-transform">
                 <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>emergency</span>
              </div>
              <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">S.O.S</span>
           </button>
           
           <button className="flex-1 h-24 bg-amber-500/10 hover:bg-amber-500/20 rounded-[2.2rem] flex flex-col items-center justify-center gap-2 active:scale-95 transition-all group border border-amber-500/20 is-inactive" aria-disabled="true">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-amber-600/30 group-hover:scale-110 transition-transform">
                 <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>volunteer_activism</span>
              </div>
              <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Donar</span>
           </button>
        </div>

        {/* LISTA DE CONFIGURACIÓN */}
        <div className="space-y-6">
           <div className="space-y-3">
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] px-2 italic">Ajustes de Usuario</h3>
              <div className="glass rounded-[2.5rem] overflow-hidden border border-slate-200/60 shadow-lg">
                {[
                  { label: 'Mi Perfil', icon: 'person_outline', color: 'text-blue-400' },
                  { label: 'Preferencias', icon: 'tune', color: 'text-amber-400' },
                  { label: 'Notificaciones', icon: 'notifications_none', color: 'text-pink-400' },
                  { label: 'Seguridad', icon: 'verified_user', color: 'text-emerald-400' }
                ].map((item, idx, arr) => (
                  <button 
                    key={item.label}
                    className={`w-full p-6 flex items-center justify-between hover:bg-white/5 transition-colors is-inactive ${idx !== arr.length - 1 ? 'border-b border-slate-200/50' : ''}`}
                    aria-disabled="true"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-white/5`}>
                        <span className={`material-symbols-outlined ${item.color} text-2xl`}>{item.icon}</span>
                      </div>
                      <span className="text-sm font-bold text-slate-900 uppercase tracking-tight">{item.label}</span>
                    </div>
                    <span className="material-symbols-outlined text-slate-400">chevron_right</span>
                  </button>
                ))}
              </div>
           </div>

           <div className="space-y-3">
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] px-2 italic">Comunidad</h3>
              <div className="flex justify-between gap-3">
                 {[
                   { icon: 'facebook', color: 'hover:text-blue-500' },
                   { icon: 'instagram', color: 'hover:text-pink-500' },
                   { icon: 'twitter', color: 'hover:text-sky-400' },
                   { icon: 'share', color: 'hover:text-primary' }
                 ].map(social => (
                   <button key={social.icon} className={`flex-1 h-14 glass rounded-2xl flex items-center justify-center text-slate-400 ${social.color} transition-all active:scale-95 border-slate-200/60 is-inactive`} aria-disabled="true">
                      <span className="material-symbols-outlined text-xl">{social.icon === 'share' ? 'ios_share' : social.icon}</span>
                   </button>
                 ))}
              </div>
           </div>
        </div>

        <p className="text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] italic pt-10 pb-4">
           Pulsando con el ❤️ de Vallarta
        </p>
      </main>

      <BottomNav />
    </div>
  );
};

export default About;
