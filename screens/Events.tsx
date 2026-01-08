
import React, { useState } from 'react';
import BottomNav from '../components/BottomNav';
import { EVENTS } from '../constants';
import { Link } from 'react-router-dom';

const Events: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Hoy');
  return (
    <div className="pb-40 bg-background-dark min-h-screen">
      <header className="px-6 pt-12 pb-6 sticky top-0 bg-background-dark/90 backdrop-blur-md z-40 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-black text-primary uppercase tracking-[0.25em] italic">Puerto Vallarta</p>
          <h1 className="text-4xl font-black tracking-tighter uppercase text-slate-900">Explorar</h1>
        </div>
        <button className="w-12 h-12 rounded-full bg-white shadow-lg shadow-gray-200/50 border border-white flex items-center justify-center text-primary is-inactive" aria-disabled="true">
          <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>favorite</span>
        </button>
      </header>

      <main className="px-6 space-y-8">
        {/* Horizontal Calendar Tabs - More colorful active state */}
        <div className="flex gap-3 overflow-x-auto hide-scrollbar -mx-6 px-6">
          {['Hoy', 'Mañana', 'Esta Semana', 'Próximos'].map((tab) => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)}
              aria-pressed={activeTab === tab}
              className={`px-7 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest whitespace-nowrap transition-all border-2 ${activeTab === tab ? 'bg-primary text-white border-primary shadow-lg shadow-primary/30' : 'bg-white text-slate-500 border-white shadow-sm hover:-translate-y-0.5'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Live Section */}
        <section>
          <div className="flex items-center justify-between mb-5 px-1">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500 animate-ping"></span>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase italic">En Vivo</h2>
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pulsando Ahora</span>
          </div>
          
          <div className="space-y-6">
            {EVENTS.filter(e => e.isLive).map(event => (
              <Link to={`/event/${event.id}`} key={event.id} className="block group">
                <div className="bg-[#f0f9ff] rounded-[3rem] overflow-hidden shadow-lg shadow-blue-100/50 border-4 border-white transition-all active:scale-[0.98]">
                  <div className="relative aspect-[16/10]">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                    <div className="absolute top-6 left-6">
                      <span className="bg-red-600 text-white text-[10px] font-black px-4 py-2 rounded-xl flex items-center gap-2 uppercase tracking-[0.2em] shadow-2xl">
                        <span className="material-symbols-outlined text-lg animate-pulse">sensors</span>
                        On Air
                      </span>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex-1 pr-4">
                        <h3 className="text-3xl font-black text-slate-900 leading-none mb-2 uppercase tracking-tight">{event.title}</h3>
                        <p className="text-primary font-black text-[11px] flex items-center gap-1.5 uppercase tracking-widest italic">
                          <span className="material-symbols-outlined text-base">location_on</span>
                          {event.venue}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Cierre</p>
                        <p className="font-black text-slate-900 text-xl leading-none">{event.endTime}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <button className="h-14 bg-white text-blue-600 font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl flex items-center justify-center gap-2 shadow-sm border border-blue-50 is-inactive" aria-disabled="true" type="button">
                        <span className="material-symbols-outlined text-xl">map</span>
                        Sede
                      </button>
                      <button className="h-14 bg-primary text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-primary/20 is-inactive" aria-disabled="true" type="button">
                        <span className="material-symbols-outlined text-xl">local_activity</span>
                        Entrar
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Regular Events - Bento List */}
        <section className="space-y-4">
           <h2 className="text-2xl font-black text-slate-900 tracking-tight px-1 uppercase italic">Próximos Hoy</h2>
           {EVENTS.filter(e => !e.isLive).map((event, idx) => {
             const colors = [
               { bg: 'bg-[#fff7ed]', text: 'text-orange-950', primary: 'text-orange-500', shadow: 'shadow-orange-100' },
               { bg: 'bg-[#fefce8]', text: 'text-yellow-950', primary: 'text-yellow-600', shadow: 'shadow-yellow-100' },
               { bg: 'bg-[#f5f3ff]', text: 'text-purple-950', primary: 'text-purple-600', shadow: 'shadow-purple-100' }
             ];
             const style = colors[idx % colors.length];
             return (
               <Link to={`/event/${event.id}`} key={event.id} className={`flex gap-5 p-5 ${style.bg} rounded-[2.5rem] border-4 border-white items-center shadow-lg ${style.shadow} active:scale-95 transition-all hover:-translate-y-0.5`}>
                  <div className="w-24 h-24 rounded-3xl overflow-hidden shrink-0 shadow-md ring-4 ring-white/50">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className={`text-[10px] font-black ${style.primary} uppercase tracking-[0.2em] mb-1.5`}>{event.time} — {event.endTime || 'Late'}</p>
                    <h3 className={`font-black text-xl ${style.text} leading-tight uppercase tracking-tight`}>{event.title}</h3>
                    <p className="text-[10px] text-slate-400 font-black mt-1 uppercase tracking-widest italic">{event.venue}</p>
                  </div>
                  <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-primary shadow-sm">
                    <span className="material-symbols-outlined">chevron_right</span>
                  </div>
               </Link>
             );
           })}
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default Events;
