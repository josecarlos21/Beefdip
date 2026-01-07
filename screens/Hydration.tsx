
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

const Wellness: React.FC = () => {
  const navigate = useNavigate();
  const [water, setWater] = useState(1.8);
  const [food, setFood] = useState(1);
  const [sleep, setSleep] = useState(5);

  const stats = [
    { label: 'BEBE AGUA', val: water, target: 3.0, unit: 'L', color: 'bg-cyan-400', icon: 'water_drop', set: setWater, step: 0.25 },
    { label: 'COME BIEN', val: food, target: 3, unit: 'p', color: 'bg-emerald-400', icon: 'restaurant', set: setFood, step: 1 },
    { label: 'DUERME', val: sleep, target: 8, unit: 'h', color: 'bg-indigo-400', icon: 'bedtime', set: setSleep, step: 1 }
  ];

  return (
    <div className="pb-44 min-h-screen bg-background-dark font-sans overflow-x-hidden">
      <header className="relative h-48 w-full flex items-center px-8">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent"></div>
        <div className="relative z-10 flex justify-between w-full items-center pt-8">
           <button onClick={() => navigate(-1)} className="w-11 h-11 glass-pure rounded-xl flex items-center justify-center active-scale">
             <span className="material-symbols-outlined text-white text-xl">arrow_back</span>
           </button>
           <div className="text-right">
             <h1 className="text-xl font-black text-white uppercase italic tracking-tighter">Mi Estado</h1>
             <p className="text-[9px] font-black text-primary uppercase mt-1 italic tracking-widest">Optimización Vital</p>
           </div>
        </div>
      </header>

      <main className="px-8 -mt-6 space-y-8 relative z-30">
        {stats.map((s) => (
          <div key={s.label} className="glass-pure rounded-[2.5rem] p-6 space-y-4 border border-white/5 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 ${s.color}/10 rounded-xl flex items-center justify-center border border-white/5`}>
                  <span className={`material-symbols-outlined text-xl ${s.color.replace('bg-', 'text-')}`}>{s.icon}</span>
                </div>
                <div>
                  <span className="text-[10px] font-black text-white uppercase tracking-[0.2em] italic">{s.label}</span>
                  <p className="text-[8px] font-bold text-white/30 uppercase mt-1 italic">{s.val}{s.unit} logrados</p>
                </div>
              </div>
              <span className="text-lg font-black text-white italic">{Math.round((s.val / s.target) * 100)}%</span>
            </div>
            
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div className={`h-full ${s.color} transition-all duration-1000`} style={{ width: `${(s.val / s.target) * 100}%` }}></div>
            </div>

            <div className="flex gap-2 pt-2">
              <button onClick={() => s.set(prev => Math.max(0, prev - s.step))} className="flex-1 h-10 glass-pure rounded-xl text-[8px] font-black uppercase italic active-scale border-white/5">Menos</button>
              <button onClick={() => s.set(prev => Math.min(s.target, prev + s.step))} className={`flex-[1.5] h-10 ${s.color} text-background-dark rounded-xl text-[8px] font-black uppercase italic active-scale`}>Más {s.label.split(' ')[0]}</button>
            </div>
          </div>
        ))}

        <div className="p-6 bg-white/[0.02] border border-dashed border-white/10 rounded-[2rem] flex gap-4 items-center">
           <span className="material-symbols-outlined text-primary animate-pulse">tips_and_updates</span>
           <p className="text-[9px] font-bold text-white/40 uppercase italic leading-relaxed tracking-tight">
             La hidratación es clave. El sol de Vallarta es fuerte, no olvides beber agua entre cada trago.
           </p>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Wellness;
