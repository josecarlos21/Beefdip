
import React, { useState, useEffect } from 'react';
import BottomNav from '../components/BottomNav';
import { Link } from 'react-router-dom';
import { EVENTS } from '../constants';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({ water: 72, food: 45, sleep: 60 });
  const featuredEvent = EVENTS[0]; // White Party

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        water: Math.max(10, prev.water - 0.05),
        food: Math.max(10, prev.food - 0.03),
        sleep: Math.max(10, prev.sleep - 0.02)
      }));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pb-32 min-h-screen font-sans bg-background-dark overflow-x-hidden">
      {/* HERO SECTION - Sunset Vibe */}
      <section className="relative h-[40vh] w-full overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1512100356956-c1226c9965a8?q=80&w=2000&auto=format&fit=crop" 
          className="w-full h-full object-cover brightness-75"
          alt="Puerto Vallarta Sunset"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-background-dark/20"></div>
        
        <header className="absolute top-0 left-0 right-0 p-6 pt-12 flex justify-between items-center z-20">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 sunset-gradient rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 rotate-3">
              <span className="material-symbols-outlined text-white">local_fire_department</span>
            </div>
            <h1 className="text-xl font-black text-white tracking-tighter uppercase italic">
              Vallarta<span className="text-primary">Live</span>
            </h1>
          </div>
          <button className="w-11 h-11 glass rounded-2xl flex items-center justify-center text-slate-700 is-inactive" aria-disabled="true">
            <span className="material-symbols-outlined">notifications</span>
          </button>
        </header>

        <div className="absolute bottom-8 left-6 right-6">
          <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-1">Puerto Vallarta Pride</p>
          <h2 className="text-4xl font-black text-white leading-[0.9] tracking-tighter uppercase italic drop-shadow-2xl">
            BEARADISE <br/>WEEK 2026
          </h2>
        </div>
      </section>

      <main className="px-6 -mt-4 relative z-10 space-y-6">
        
        {/* EVENTO DESTACADO - TIPO BENTO IMAGEN COMPLETA */}
        <Link to={`/event/${featuredEvent.id}`} className="block relative h-64 rounded-[2.5rem] overflow-hidden group shadow-2xl active:scale-[0.98] transition-all">
          <img src={featuredEvent.image} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={featuredEvent.title} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
          
          <div className="absolute top-4 left-4">
             <span className="bg-primary/90 backdrop-blur-md text-white text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">Destacado</span>
          </div>

          <div className="absolute bottom-4 left-4 right-4 glass p-4 rounded-3xl flex items-center justify-between border-white/20">
             <div>
                <h3 className="text-lg font-black text-white uppercase italic leading-none">{featuredEvent.title}</h3>
                <p className="text-[10px] text-white/70 font-bold uppercase tracking-widest mt-1">{featuredEvent.venue}</p>
             </div>
             <div className="flex items-center gap-4 text-right">
                <div className="flex flex-col">
                   <span className="text-[8px] font-black text-white/50 uppercase">Hora</span>
                   <span className="text-xs font-black text-primary">{featuredEvent.time}</span>
                </div>
                <div className="flex flex-col">
                   <span className="text-[8px] font-black text-white/50 uppercase">Dist.</span>
                   <span className="text-xs font-black text-white">450m</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                   <span className="material-symbols-outlined text-white text-sm">chevron_right</span>
                </div>
             </div>
          </div>
        </Link>

        {/* WELLNESS TRACKERS - ARMONIOSO */}
        <Link to="/hydration" className="glass rounded-[2.5rem] p-6 space-y-4 block active:scale-[0.98] transition-all hover:-translate-y-0.5">
          <div className="flex items-center justify-between">
             <h4 className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] italic">Estado de Vitalidad</h4>
             <span className="material-symbols-outlined text-primary text-lg">bolt</span>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
             <div className="bg-background-elevated rounded-2xl p-3 flex flex-col items-center">
                <span className="material-symbols-outlined text-cyan-400 text-xl mb-1">water_drop</span>
                <span className="text-xs font-black text-slate-900">{Math.round(stats.water)}%</span>
             </div>
             <div className="bg-background-elevated rounded-2xl p-3 flex flex-col items-center">
                <span className="material-symbols-outlined text-emerald-400 text-xl mb-1">restaurant</span>
                <span className="text-xs font-black text-slate-900">{Math.round(stats.food)}%</span>
             </div>
             <div className="bg-background-elevated rounded-2xl p-3 flex flex-col items-center">
                <span className="material-symbols-outlined text-indigo-400 text-xl mb-1">bedtime</span>
                <span className="text-xs font-black text-slate-900">{Math.round(stats.sleep)}%</span>
             </div>
          </div>
        </Link>

        {/* ACCESS GRID */}
        <div className="grid grid-cols-2 gap-4">
          <Link to="/map" className="glass h-32 rounded-[2rem] flex flex-col items-center justify-center group active:scale-95 transition-all hover:-translate-y-0.5">
             <span className="material-symbols-outlined text-primary text-3xl mb-1 group-hover:scale-110 transition-transform">explore</span>
             <span className="text-[9px] font-black text-slate-800 uppercase tracking-widest">Explorar Mapa</span>
          </Link>
          <Link to="/itinerary" className="glass h-32 rounded-[2rem] flex flex-col items-center justify-center group active:scale-95 transition-all hover:-translate-y-0.5">
             <span className="material-symbols-outlined text-primary text-3xl mb-1 group-hover:scale-110 transition-transform">confirmation_number</span>
             <span className="text-[9px] font-black text-slate-800 uppercase tracking-widest">Tickets</span>
          </Link>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Dashboard;
