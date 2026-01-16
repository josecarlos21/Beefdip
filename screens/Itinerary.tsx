
import React, { useState } from 'react';
import BottomNav from '../components/BottomNav';
import { useNavigate } from 'react-router-dom';
import { EVENTS } from '../constants';

const Itinerary: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState(2);

  return (
    <div className="pb-44 min-h-screen bg-background-default overflow-x-hidden">
      <header className="px-8 pt-16 pb-6 flex justify-between items-end animate-reveal">
        <div>
          <h1 className="text-2xl font-black text-white uppercase italic tracking-tighter leading-none">Mi Agenda</h1>
          <p className="text-[9px] text-primary font-black mt-2 uppercase tracking-[0.4em] italic opacity-60">Vallarta Live 2026</p>
        </div>
        <div className="w-10 h-10 glass-pure rounded-xl flex items-center justify-center border-white/5">
           <span className="material-symbols-outlined text-white/20 text-xl">event_note</span>
        </div>
      </header>

      <main className="px-8 space-y-8">
        {/* Compact Date Selector */}
        <div className="flex gap-2.5 overflow-x-auto hide-scrollbar -mx-8 px-8">
          {[1, 2, 3, 4, 5, 6].map(day => (
            <button 
              key={day} 
              onClick={() => setSelectedDay(day)}
              className={`min-w-[3.2rem] py-3.5 rounded-2xl transition-all border ${selectedDay === day ? 'bg-primary border-primary text-white shadow-lg' : 'glass-pure border-white/5 text-white/20'}`}
            >
              <span className="text-[7px] font-black uppercase block italic opacity-50 mb-0.5">FEB</span>
              <span className="text-base font-black italic">{day + 10}</span>
            </button>
          ))}
        </div>

        <div className="space-y-6 relative pl-1">
          {/* Subtle Vertical Timeline */}
          <div className="absolute left-[2px] top-0 bottom-6 w-[1px] bg-white/5"></div>
          
          {[EVENTS[0], EVENTS[1]].map((event, idx) => (
            <div key={idx} className="relative pl-7 animate-reveal" style={{ animationDelay: `${idx * 0.1}s` }}>
              {/* Timeline Dot */}
              <div className="absolute left-[-2.5px] top-4 w-[6px] h-[6px] rounded-full bg-primary shadow-[0_0_10px_rgba(251,146,60,0.5)] z-10"></div>
              
              <div 
                onClick={() => navigate(`/event/${event.id}`)} 
                className="glass-pure rounded-[1.8rem] p-3.5 flex gap-4 items-center active-scale border-white/5 hover:bg-white/[0.03] transition-colors"
              >
                <div className="w-11 h-11 rounded-xl overflow-hidden shrink-0 border border-white/5 shadow-md">
                  <img src={event.image} className="w-full h-full object-cover grayscale-[0.2]" alt="" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[8px] font-black text-primary uppercase italic tracking-widest">{event.time}</span>
                  <h4 className="text-sm font-black text-white uppercase italic leading-none mt-1 truncate">{event.title}</h4>
                  <p className="text-[8px] text-white/20 font-bold uppercase mt-1.5 truncate tracking-tight">{event.venue}</p>
                </div>
                <span className="material-symbols-outlined text-white/10 text-lg">arrow_forward_ios</span>
              </div>
            </div>
          ))}

          <button className="ml-7 w-full p-4 border border-dashed border-white/10 rounded-[1.5rem] flex items-center justify-center gap-2 group hover:border-primary/40 transition-all active-scale opacity-60">
            <span className="material-symbols-outlined text-white/20 text-lg">add</span>
            <span className="text-[8px] font-black text-white/20 uppercase tracking-widest italic">Añadir</span>
          </button>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Itinerary;
