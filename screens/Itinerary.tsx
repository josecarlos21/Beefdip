
import React, { useState } from 'react';
import BottomNav from '../components/BottomNav';
import { useNavigate } from 'react-router-dom';

const Itinerary: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState(2);

  return (
    <div className="pb-40 min-h-screen bg-background-dark font-sans">
      <header className="px-6 pt-12 pb-6">
        <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">Mi Agenda</h1>
        <p className="text-[10px] text-primary font-black mt-1 uppercase tracking-[0.25em]">Planner Oficial 2026</p>
      </header>

      <main className="px-6 space-y-8">
        {/* Selector de Fecha Serio */}
        <div className="flex gap-4 overflow-x-auto hide-scrollbar -mx-6 px-6">
          {[1, 2, 3, 4, 5, 6].map(day => (
            <button 
              key={day} 
              onClick={() => setSelectedDay(day)}
              className={`min-w-[4rem] flex flex-col items-center py-4 rounded-2xl transition-all border ${selectedDay === day ? 'bg-primary border-primary text-white shadow-xl shadow-primary/20' : 'glass border-slate-200/60 text-slate-500'}`}
            >
              <span className="text-[9px] font-black uppercase tracking-widest mb-1 opacity-70">FEB</span>
              <span className="text-xl font-bold">{day + 10}</span>
            </button>
          ))}
        </div>

        {/* Timeline Refinado */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest">Actividades del Día</h3>
            <span className="text-[9px] font-bold text-primary px-3 py-1 bg-primary/10 rounded-full">3 Confirmados</span>
          </div>

          <div className="relative pl-4 space-y-8">
            {/* Línea de conexión minimalista */}
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-slate-200"></div>

            {/* Item 1 */}
            <div className="relative pl-8">
              <div className="absolute left-0 top-1 w-4 h-4 rounded-full glass border-primary/50 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
              </div>
              <div onClick={() => navigate('/event/EVT0114')} className="glass rounded-3xl p-5 flex gap-4 items-center active:scale-[0.98] transition-all hover:-translate-y-0.5">
                <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0">
                  <img src="https://picsum.photos/seed/ev1/200" className="w-full h-full object-cover grayscale-[0.3]" alt="Event" />
                </div>
                <div className="flex-1">
                  <span className="text-[9px] font-bold text-primary uppercase">12:00 PM</span>
                  <h4 className="text-base font-black text-slate-900 uppercase tracking-tight leading-tight">Foam Party Mantamar</h4>
                  <p className="text-[10px] text-slate-500 uppercase mt-1">Playa Los Muertos</p>
                </div>
              </div>
            </div>

            {/* Item 2 */}
            <div className="relative pl-8 opacity-60">
              <div className="absolute left-0 top-1 w-4 h-4 rounded-full glass border-white/20 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-500"></div>
              </div>
              <div className="glass rounded-3xl p-5 flex gap-4 items-center">
                <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 grayscale">
                  <img src="https://picsum.photos/seed/ev2/200" className="w-full h-full object-cover" alt="Event" />
                </div>
                <div className="flex-1">
                  <span className="text-[9px] font-bold text-slate-400 uppercase">18:30 PM</span>
                  <h4 className="text-base font-black text-slate-900 uppercase tracking-tight leading-tight">Sunset Cocktails</h4>
                  <p className="text-[10px] text-slate-500 uppercase mt-1">The Blue Chairs</p>
                </div>
              </div>
            </div>

            {/* Botón Añadir Minimalista */}
            <div className="relative pl-8">
               <button className="w-full p-6 border border-dashed border-slate-200 rounded-3xl flex items-center justify-center gap-2 group hover:border-primary/50 transition-colors is-inactive" aria-disabled="true" type="button">
                  <span className="material-symbols-outlined text-slate-500 group-hover:text-primary">add_circle</span>
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Añadir Evento</span>
               </button>
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Itinerary;
