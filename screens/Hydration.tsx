
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

const Wellness: React.FC = () => {
  const navigate = useNavigate();
  const [water, setWater] = useState(1.8);
  const [food, setFood] = useState(1);
  const [sleep, setSleep] = useState(5);

  const stats = [
    { label: 'BEBE AGUA', desc: 'Mantén el ritmo', val: water, target: 3.0, unit: 'L', color: 'bg-cyan-400', icon: 'water_drop', set: setWater, step: 0.25 },
    { label: 'COME BIEN', desc: 'Energía constante', val: food, target: 3, unit: 'p', color: 'bg-emerald-400', icon: 'restaurant', set: setFood, step: 1 },
    { label: 'DUERME', desc: 'Descanso vital', val: sleep, target: 8, unit: 'h', color: 'bg-indigo-400', icon: 'bedtime', set: setSleep, step: 1 }
  ];

  return (
    <div className="pb-44 min-h-screen bg-background-dark font-sans overflow-x-hidden">
      <header className="relative h-44 w-full flex items-center px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent"></div>
        <div className="relative z-10 flex justify-between w-full items-center pt-6 animate-reveal">
           <button onClick={() => navigate(-1)} className="w-11 h-11 glass-pure rounded-xl flex items-center justify-center active-scale border-white/10">
             <span className="material-symbols-outlined text-white text-xl">arrow_back</span>
           </button>
           <div className="text-right">
             <h1 className="text-2xl font-black text-white uppercase italic tracking-tighter leading-none">Mi Estado</h1>
             <p className="text-[9px] font-black text-primary uppercase mt-2 italic tracking-widest leading-none">Optimización Vital</p>
           </div>
        </div>
      </header>

      <main className="px-8 -mt-6 space-y-8 relative z-30">
        {stats.map((s, idx) => (
          <div key={s.label} className="glass-pure rounded-[2.8rem] p-6 space-y-4 border border-white/5 shadow-2xl animate-reveal" style={{ animationDelay: `${idx * 0.1}s` }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className={`w-11 h-11 ${s.color}/10 rounded-2xl flex items-center justify-center border border-white/5 shadow-inner`}>
                  <span className={`material-symbols-outlined text-xl ${s.color.replace('bg-', 'text-')}`}>{s.icon}</span>
                </div>
                <div>
                  <span className="text-[11px] font-black text-white uppercase tracking-[0.2em] italic leading-none">{s.label}</span>
                  <p className="text-[8px] font-bold text-white/20 uppercase mt-1.5 italic tracking-tight">{s.desc}</p>
                </div>
              </div>
              <span className="text-xl font-black text-white italic tracking-tighter">{Math.round((s.val / s.target) * 100)}%</span>
            </div>
            
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden shadow-inner">
              <div className={`h-full ${s.color} transition-all duration-1000 ease-out`} style={{ width: `${(s.val / s.target) * 100}%` }}></div>
            </div>

            <div className="flex gap-3 pt-1">
              <button onClick={() => s.set(prev => Math.max(0, prev - s.step))} className="flex-1 h-10 glass-pure rounded-xl text-[8px] font-black uppercase italic active-scale border-white/5 opacity-60">Menos</button>
              <button onClick={() => s.set(prev => Math.min(s.target, prev + s.step))} className={`flex-[1.5] h-10 ${s.color} text-background-dark rounded-xl text-[8px] font-black uppercase italic active-scale shadow-lg`}>Añadir {s.unit}</button>
            </div>
          </div>
        ))}

        <div className="p-6 bg-white/[0.01] border border-dashed border-white/10 rounded-[2.2rem] flex gap-5 items-start">
           <span className="material-symbols-outlined text-primary text-2xl animate-pulse shrink-0">tips_and_updates</span>
           <p className="text-[10px] font-bold text-white/20 uppercase italic leading-relaxed tracking-tight">
             La hidratación evita el cansancio extremo. El sol de Vallarta no perdona: bebe agua entre cada trago para seguir el ritmo.
           </p>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Wellness;
