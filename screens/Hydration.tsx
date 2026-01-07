
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

const Wellness: React.FC = () => {
  const navigate = useNavigate();
  const [water, setWater] = useState(1.8);
  const [food, setFood] = useState(1);
  const [sleep, setSleep] = useState(5);

  const stats = [
    { label: 'Hidratación', val: water, target: 3.0, unit: 'L', color: 'bg-cyan-400', icon: 'water_drop', set: setWater, step: 0.25 },
    { label: 'Energía (Comida)', val: food, target: 3, unit: 'p', color: 'bg-emerald-400', icon: 'restaurant', set: setFood, step: 1 },
    { label: 'Descanso (Horas)', val: sleep, target: 8, unit: 'h', color: 'bg-indigo-400', icon: 'bedtime', set: setSleep, step: 1 }
  ];

  return (
    <div className="pb-40 min-h-screen bg-background-dark font-sans overflow-x-hidden">
      <header className="px-6 pt-12 pb-6 flex items-center justify-between relative z-10">
        <button onClick={() => navigate(-1)} className="w-12 h-12 glass rounded-2xl flex items-center justify-center">
          <span className="material-symbols-outlined text-white">arrow_back</span>
        </button>
        <h1 className="text-xl font-black text-white uppercase italic tracking-tighter">Bienestar Live</h1>
        <div className="w-12"></div>
      </header>

      <main className="px-6 space-y-8 relative z-10">
        {/* BIENVENIDA ALEGRE */}
        <div className="sunset-gradient p-10 rounded-[3rem] shadow-2xl shadow-primary/20 relative overflow-hidden group">
          <div className="relative z-10">
             <h2 className="text-3xl font-black text-white uppercase italic leading-none tracking-tighter">Tu Energía</h2>
             <p className="text-white/80 text-[10px] font-black uppercase tracking-[0.2em] mt-3">Mantente al 100% para la noche</p>
          </div>
          <span className="absolute -right-8 -bottom-8 material-symbols-outlined text-[120px] text-white/10 rotate-12 group-hover:rotate-0 transition-transform duration-700">volunteer_activism</span>
        </div>

        {/* TRACKERS REFINADOS */}
        <div className="space-y-6">
          {stats.map((s) => (
            <div key={s.label} className="glass rounded-[2.5rem] p-6 space-y-4 shadow-xl border border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${s.color}/10 rounded-2xl flex items-center justify-center shadow-inner`}>
                    <span className={`material-symbols-outlined text-2xl ${s.color.replace('bg-', 'text-')}`}>{s.icon}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">{s.label}</span>
                    <p className="text-xs font-bold text-slate-500 mt-0.5">{s.val}{s.unit} logrados</p>
                  </div>
                </div>
                <div className="text-right">
                   <span className="text-xl font-black text-white">{Math.round((s.val / s.target) * 100)}%</span>
                </div>
              </div>
              
              <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden shadow-inner">
                <div 
                  className={`h-full ${s.color} transition-all duration-1000 ease-out shadow-[0_0_20px_rgba(255,255,255,0.1)]`} 
                  style={{ width: `${(s.val / s.target) * 100}%` }}
                ></div>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => s.set(prev => Math.max(0, prev - s.step))}
                  className="flex-1 h-12 glass rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95"
                >
                  Restar
                </button>
                <button 
                  onClick={() => s.set(prev => Math.min(s.target, prev + s.step))}
                  className={`flex-1 h-12 ${s.color} text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl transition-all active:scale-95`}
                >
                  Añadir {s.step}{s.unit}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* TIP DE SALUD CON ESTILO */}
        <div className="bg-background-elevated p-6 rounded-[2rem] border border-white/5 shadow-2xl">
          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 sunset-gradient rounded-xl flex items-center justify-center shrink-0">
               <span className="material-symbols-outlined text-white">lightbulb</span>
            </div>
            <div>
              <h4 className="text-xs font-black text-white uppercase tracking-widest">Consejo del Staff</h4>
              <p className="text-[11px] text-slate-400 mt-2 leading-relaxed font-medium">No olvides cenar fuerte antes de los Main Events en CC Slaughters. La hidratación es clave pero la comida es el motor.</p>
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Wellness;
