
import React from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

const About: React.FC = () => {
  const navigate = useNavigate();

  // Configuración de utilidades con paleta mate "tenue"
  const menuItems = [
    {
      id: 'sos',
      icon: 'emergency_share',
      outerColor: 'bg-[#1e2330]', // Slate muy oscuro
      innerColor: 'bg-red-500/10', // Acento sutil
      iconColor: 'text-red-400',
      action: () => navigate('/emergency')
    },
    {
      id: 'security',
      icon: 'shield_lock',
      outerColor: 'bg-[#1e2330]',
      innerColor: 'bg-indigo-500/10',
      iconColor: 'text-indigo-300',
      action: () => {}
    },
    {
      id: 'hospitals',
      icon: 'local_hospital',
      outerColor: 'bg-[#1e2330]',
      innerColor: 'bg-emerald-500/10',
      iconColor: 'text-emerald-300',
      action: () => {}
    },
    {
      id: 'food',
      icon: 'restaurant',
      outerColor: 'bg-[#1e2330]',
      innerColor: 'bg-amber-500/10',
      iconColor: 'text-amber-200',
      action: () => {}
    },
    {
      id: 'donate',
      icon: 'volunteer_activism',
      outerColor: 'bg-[#1e2330]',
      innerColor: 'bg-rose-500/10',
      iconColor: 'text-rose-300',
      action: () => {}
    },
    {
      id: 'who',
      icon: 'info',
      outerColor: 'bg-[#1e2330]',
      innerColor: 'bg-slate-400/10',
      iconColor: 'text-slate-300',
      action: () => {}
    }
  ];

  return (
    <div className="h-screen bg-[#0a0f1e] overflow-hidden flex flex-col relative px-8 pt-16 pb-32">
      {/* Luces de ambiente ultra-tenues */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(251,146,60,0.03),transparent_70%)] pointer-events-none"></div>
      
      {/* Indicador de Status Superior */}
      <header className="mb-12 animate-reveal flex flex-col items-center">
        <div className="flex gap-2 opacity-20">
          <div className="w-2 h-2 rounded-full bg-white"></div>
          <div className="w-12 h-2 rounded-full bg-white/40"></div>
          <div className="w-2 h-2 rounded-full bg-white"></div>
        </div>
        <p className="text-[8px] font-black text-white/10 uppercase tracking-[1em] mt-4">System Utilities Interface</p>
      </header>

      {/* GRID: Cuadrados con Óvalos anidados */}
      <main className="flex-1 grid grid-cols-2 gap-5 auto-rows-max min-h-0 overflow-y-auto hide-scrollbar">
        {menuItems.map((item, idx) => (
          <button
            key={item.id}
            onClick={item.action}
            className={`group relative aspect-square ${item.outerColor} rounded-[3rem] active-scale transition-all duration-500 shadow-2xl animate-reveal overflow-hidden border border-white/[0.03]`}
            style={{ animationDelay: `${idx * 0.05}s` }}
          >
            {/* El Óvalo (Cápsula) Interno */}
            <div className={`absolute -bottom-8 left-4 right-4 top-1/3 ${item.innerColor} rounded-full transition-all duration-700 group-active:translate-y-2 group-active:scale-90`}></div>
            
            {/* Contenedor del Icono Anclado al Inferior */}
            <div className="absolute inset-0 flex items-end justify-center pb-6">
              <span 
                className={`material-symbols-outlined text-[64px] ${item.iconColor} transition-transform duration-500 group-hover:scale-110 group-active:scale-95`}
                style={{ fontVariationSettings: "'FILL' 1, 'wght' 300" }}
              >
                {item.icon}
              </span>
            </div>

            {/* Sutil reflejo en el borde superior */}
            <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          </button>
        ))}
      </main>

      {/* FOOTER: Minimalista y elegante */}
      <footer className="mt-10 flex flex-col items-center animate-reveal" style={{ animationDelay: '0.4s' }}>
        <div className="flex items-center gap-4 grayscale opacity-10 hover:opacity-40 transition-all duration-1000">
          <div className="flex flex-col items-center">
            <p className="text-[7px] font-black text-white uppercase tracking-[0.4em] leading-none mb-2">Puerto Vallarta</p>
            <div className="h-[1px] w-8 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
          </div>
          <div className="w-px h-5 bg-white/10"></div>
          <div className="flex items-center gap-2">
             <span className="text-[6px] font-black text-emerald-500/50 uppercase tracking-[0.2em]">Validated Session</span>
             <div className="w-1 h-1 rounded-full bg-emerald-500/30 animate-pulse"></div>
          </div>
        </div>
      </footer>

      <BottomNav />
    </div>
  );
};

export default About;
