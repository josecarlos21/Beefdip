
import React from 'react';
import BottomNav from '../components/BottomNav';
import { EVENTS } from '../constants';
import { Link } from 'react-router-dom';

const Events: React.FC = () => {
  return (
    <div className="pb-40 bg-background-default min-h-screen">
      <header className="px-8 pt-16 pb-8 flex items-center justify-between animate-reveal">
        <div>
          <span className="text-[10px] font-black text-primary uppercase tracking-[0.5em] italic">Puerto Vallarta</span>
          <h1 className="text-5xl font-black text-white tracking-tighter uppercase italic mt-1 leading-none">Explorar</h1>
        </div>
        <button className="w-16 h-16 glass-pure rounded-[1.8rem] flex items-center justify-center text-primary active-scale shadow-2xl">
          <span className="material-symbols-outlined text-3xl" style={{fontVariationSettings: "'FILL' 1"}}>favorite</span>
        </button>
      </header>

      <main className="px-6 space-y-12">
        {/* VISUAL CATEGORY TABS */}
        <div className="flex gap-4 overflow-x-auto hide-scrollbar -mx-6 px-6">
          {['Hoy', 'Mañana', 'Semana'].map((tab, idx) => (
            <button 
              key={tab} 
              className={`px-10 py-4 rounded-[2rem] text-[11px] font-black uppercase tracking-[0.3em] transition-all border-2 ${idx === 0 ? 'bg-primary border-primary text-white shadow-xl shadow-primary/30' : 'glass-pure border-white/5 text-white/40'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* FULL IMAGE EVENT GRID */}
        <div className="space-y-10">
          {EVENTS.map((event, idx) => (
            <Link 
              to={`/event/${event.id}`} 
              key={event.id} 
              className="block relative aspect-[4/5] rounded-[4rem] overflow-hidden group shadow-[0_40px_80px_rgba(0,0,0,0.8)] active-scale border border-white/10 animate-reveal"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-background-default via-transparent to-black/20"></div>
              
              {/* Event Badge Floating */}
              <div className="absolute top-8 left-8">
                <span className={`px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl flex items-center gap-2 border border-white/20 ${event.isLive ? 'bg-red-600 text-white animate-pulse' : 'glass-pure text-white'}`}>
                  {event.isLive && <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>}
                  {event.category}
                </span>
              </div>

              <div className="absolute bottom-10 left-10 right-10">
                <div className="flex items-center gap-3 mb-3">
                   <span className="text-[11px] font-black text-primary uppercase tracking-[0.4em] italic">{event.venue}</span>
                   <div className="h-px flex-1 bg-white/10"></div>
                </div>
                <h3 className="text-4xl font-black text-white leading-none uppercase italic tracking-tighter mb-4">{event.title}</h3>
                
                <div className="flex items-center justify-between">
                   <div className="flex gap-4 items-center">
                      <div className="flex flex-col">
                        <span className="text-[8px] font-black text-white/30 uppercase tracking-widest mb-1">Time</span>
                        <span className="text-sm font-black text-white">{event.time}</span>
                      </div>
                      <div className="w-px h-6 bg-white/10"></div>
                      <div className="flex flex-col">
                        <span className="text-[8px] font-black text-white/30 uppercase tracking-widest mb-1">Access</span>
                        <span className="text-sm font-black text-primary italic uppercase tracking-tighter">Pass</span>
                      </div>
                   </div>
                   <div className="w-16 h-16 rounded-[1.5rem] bg-white text-background-default flex items-center justify-center shadow-2xl active-scale">
                      <span className="material-symbols-outlined text-3xl">arrow_forward</span>
                   </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Events;
