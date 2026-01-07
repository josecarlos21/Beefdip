
import React, { useState, useCallback } from 'react';
import BottomNav from '../components/BottomNav';
import { useNavigate } from 'react-router-dom';

const Itinerary: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState(2);

  return (
    <div className="pb-44 min-h-screen bg-background-dark overflow-x-hidden">
      <header className="px-8 pt-16 pb-6 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-black text-white uppercase italic tracking-tighter">Mi Agenda</h1>
          <p className="text-[9px] text-white/30 font-bold mt-1 uppercase tracking-widest italic">Puerto Vallarta 2026</p>
        </div>
        <div className="w-10 h-10 glass-pure rounded-xl flex items-center justify-center border-white/5">
           <span className="material-symbols-outlined text-white/40 text-xl">event</span>
        </div>
      </header>

      <main className="px-8 space-y-6">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar -mx-8 px-8">
          {[1, 2, 3, 4, 5, 6].map(day => (
            <button 
              key={day} 
              onClick={() => setSelectedDay(day)}
              className={`min-w-[3rem] py-3 rounded-xl transition-all border ${selectedDay === day ? 'bg-primary border-primary text-white shadow-lg' : 'glass-pure border-white/5 text-white/30'}`}
            >
              <span className="text-[7px] font-black uppercase mb-0.5 block italic">FEB</span>
              <span className="text-base font-black italic">{day + 10}</span>
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <div className="relative pl-6">
            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/5"></div>
            
            <div className="relative mb-6 animate-reveal">
              <div className="absolute -left-[6px] top-1.5 w-3 h-3 rounded-full bg-primary border-2 border-background-dark"></div>
              <div onClick={() => navigate('/event/EVT0114')} className="glass-pure rounded-2xl p-3 flex gap-4 items-center active-scale border-white/10">
                <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                  <img src="https://picsum.photos/seed/ev1/200" className="w-full h-full object-cover" alt="" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[7px] font-black text-primary uppercase italic">12:00 PM</span>
                  <h4 className="text-sm font-black text-white uppercase italic leading-none truncate mt-0.5">Foam Pool Party</h4>
                  <p className="text-[7px] text-white/30 uppercase mt-1 truncate">Blue Chairs Resort</p>
                </div>
              </div>
            </div>

            <div className="relative opacity-50">
              <div className="absolute -left-[6px] top-1.5 w-3 h-3 rounded-full bg-white/10 border-2 border-background-dark"></div>
              <div className="glass-pure rounded-2xl p-3 flex gap-4 items-center border-white/5">
                <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 grayscale opacity-40">
                  <img src="https://picsum.photos/seed/ev2/200" className="w-full h-full object-cover" alt="" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[7px] font-black text-white/20 uppercase italic">22:00 PM</span>
                  <h4 className="text-sm font-black text-white/40 uppercase italic mt-0.5 truncate">White Party</h4>
                </div>
              </div>
            </div>
          </div>

          <button className="w-full p-4 border border-dashed border-white/10 rounded-2xl flex items-center justify-center gap-2 group hover:border-primary/40 transition-all active-scale">
            <span className="material-symbols-outlined text-white/20 text-lg">add_circle</span>
            <span className="text-[8px] font-black text-white/20 uppercase tracking-widest italic">Añadir Evento</span>
          </button>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Itinerary;
