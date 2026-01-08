
import React, { useState, useEffect, useMemo } from 'react';
import BottomNav from '../components/BottomNav';
import { Link } from 'react-router-dom';
import { EVENTS } from '../constants';

const Dashboard: React.FC = () => {
  const [energy, setEnergy] = useState({ water: 82, food: 65, rest: 50 });
  const featured = useMemo(() => EVENTS[0], []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setEnergy(prev => ({
        water: Math.max(15, prev.water - 0.1),
        food: Math.max(15, prev.food - 0.08),
        rest: Math.max(15, prev.rest - 0.05)
      }));
    }, 12000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background-default pb-44 overflow-x-hidden">
      {/* IMMERSIVE HERO AREA */}
      <section className="relative h-[85vh] w-full overflow-hidden">
        <video 
          autoPlay muted loop playsInline
          className="w-full h-full object-cover brightness-[0.5] contrast-[1.2] scale-[1.02] will-change-transform"
          poster={featured.image}
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-party-crowd-at-a-concert-4024-large.mp4" type="video/mp4" />
        </video>
        
        <div className="absolute inset-0 img-scrim-top z-10 opacity-80"></div>
        <div className="absolute inset-0 img-scrim-deep z-20"></div>

        <header className="absolute top-0 left-0 right-0 p-8 pt-16 flex justify-between items-start z-30">
          <div className="flex items-center gap-4 animate-reveal">
            <div className="w-14 h-14 bg-primary rounded-[1.4rem] flex items-center justify-center shadow-2xl rotate-6 border border-white/20 active-scale">
              <span className="material-symbols-outlined text-white text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-black text-white tracking-tighter uppercase italic leading-none">Vallarta</h1>
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.5em] mt-1 ml-1 opacity-80 leading-none">Live</span>
            </div>
          </div>
          <button className="w-14 h-14 glass-pure rounded-[1.4rem] flex items-center justify-center text-white active-scale shadow-xl">
            <span className="material-symbols-outlined text-2xl">notifications_active</span>
          </button>
        </header>

        <div className="absolute top-[42%] -translate-y-1/2 left-8 right-8 z-30 animate-reveal" style={{ animationDelay: '0.2s' }}>
           <div className="flex items-center gap-3 mb-4">
              <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-ping"></div>
              <span className="text-[10px] font-black text-white/60 uppercase tracking-[0.5em] italic leading-none">Headliner Tonight</span>
           </div>
           <h2 className="text-6xl font-black text-white leading-[0.8] tracking-tighter uppercase italic drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
              {featured.title.split(' ')[0]}<br/>
              <span className="text-primary">{featured.title.split(' ').slice(1).join(' ')}</span>
           </h2>
        </div>

        <div className="absolute bottom-20 left-8 right-8 z-30 flex justify-between items-end animate-reveal" style={{ animationDelay: '0.4s' }}>
           <Link to="/hydration" className="flex gap-4 p-4 py-5 glass-pure rounded-[2.8rem] border border-white/10 active-scale shadow-2xl">
              {[
                { icon: 'water_drop', color: 'text-cyan-400', val: energy.water },
                { icon: 'restaurant', color: 'text-emerald-400', val: energy.food },
                { icon: 'bedtime', color: 'text-indigo-400', val: energy.rest }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                   <span className={`material-symbols-outlined ${stat.color} text-xl`}>{stat.icon}</span>
                   <div className="w-8 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className={`h-full ${stat.color.replace('text', 'bg')} transition-all duration-1000`} style={{ width: `${stat.val}%` }}></div>
                   </div>
                </div>
              ))}
           </Link>
           <Link to="/map" className="w-26 h-26 bg-primary rounded-full flex items-center justify-center shadow-[0_20px_80px_rgba(251,146,60,0.4)] border-[8px] border-background-default active-scale animate-float">
              <span className="material-symbols-outlined text-white text-[48px]" style={{ fontVariationSettings: "'FILL' 1" }}>near_me</span>
              <div className="absolute inset-0 rounded-full border border-white/20 animate-visual-pulse"></div>
           </Link>
        </div>
      </section>

      <main className="px-8 mt-16 relative z-40 space-y-20">
        <section>
          <div className="flex justify-between items-end mb-10 px-1">
             <div className="space-y-1">
                <h3 className="text-[10px] font-black text-white/20 uppercase tracking-[0.6em] italic leading-none">Vibe Radar</h3>
                <span className="text-xl font-black text-white uppercase italic tracking-tighter">Eventos Activos</span>
             </div>
             <Link to="/events" className="text-[10px] font-black text-primary uppercase tracking-widest active-scale">Ver Todos</Link>
          </div>
          
          <div className="flex gap-8 overflow-x-auto hide-scrollbar -mx-8 px-8 py-4">
            {EVENTS.slice(1).map((event) => (
              <Link 
                key={event.id} 
                to={`/event/${event.id}`} 
                className="relative min-w-[300px] h-[400px] rounded-[4rem] overflow-hidden group shadow-2xl active-scale border border-white/5"
              >
                <img src={event.image} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-background-default/95 via-transparent to-transparent"></div>
                <div className="absolute bottom-10 left-10 right-10">
                   <div className="flex items-center gap-2 mb-3">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
                      <span className="text-[9px] font-black text-primary uppercase tracking-widest italic">{event.category}</span>
                   </div>
                   <h4 className="text-2xl font-black text-white uppercase italic tracking-tighter leading-none truncate">{event.title}</h4>
                   <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mt-4 italic truncate">{event.venue}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-2 gap-8 pb-16">
           <Link to="/itinerary" className="h-56 glass-pure rounded-[3.5rem] flex flex-col items-center justify-center gap-6 active-scale shadow-2xl group border border-white/5">
              <div className="w-18 h-18 bg-white/5 rounded-[2rem] flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors">
                 <span className="material-symbols-outlined text-white text-[36px]">confirmation_number</span>
              </div>
              <span className="text-[11px] font-black text-white/40 uppercase tracking-widest italic">Protocol ID</span>
           </Link>
           <Link to="/emergency" className="h-56 glass-pure rounded-[3.5rem] flex flex-col items-center justify-center gap-6 active-scale shadow-2xl border border-red-900/15 group">
              <div className="w-18 h-18 bg-red-600/90 rounded-[2rem] flex items-center justify-center shadow-lg group-hover:bg-red-500 transition-colors">
                 <span className="material-symbols-outlined text-white text-[36px]" style={{ fontVariationSettings: "'FILL' 1" }}>gpp_maybe</span>
              </div>
              <span className="text-[11px] font-black text-red-500 uppercase tracking-widest italic leading-none">S.O.S Mode</span>
           </Link>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Dashboard;
