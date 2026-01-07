
import React from 'react';
import { NavLink } from 'react-router-dom';

const BottomNav: React.FC = () => {
  const navItems = [
    { path: '/dashboard', icon: 'home', label: 'Inicio', isHome: true },
    { path: '/map', icon: 'map', label: 'Mapa' },
    { path: '/itinerary', icon: 'confirmation_number', label: 'Tickets' },
    { path: '/events', icon: 'calendar_month', label: 'Explorar' },
    { path: '/about', icon: 'grid_view', label: 'Más' },
  ];

  return (
    // Updated container with token-based classes: 'glass', 'border-nav-border', 'rounded-t-xl'
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto glass border-t border-nav-border px-6 pt-3 pb-8 z-50 flex justify-between items-center rounded-t-xl shadow-2xl">
      {navItems.map((item) => (
        item.isHome ? (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 relative ${
                isActive 
                ? 'bg-primary text-white shadow-xl shadow-primary/40 -mt-12 scale-105 border-[3px] border-background-dark' 
                : 'text-slate-600 hover:text-slate-400'
              }`
            }
          >
            {({ isActive }) => (
              <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>{item.icon}</span>
            )}
          </NavLink>
        ) : (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-primary' : 'text-slate-600 hover:text-slate-400'}`
            }
          >
            {({ isActive }) => (
              <>
                <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>{item.icon}</span>
                <span className="text-[8px] font-bold uppercase tracking-tight">{item.label}</span>
              </>
            )}
          </NavLink>
        )
      ))}
    </nav>
  );
};

export default BottomNav;
