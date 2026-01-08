// Added missing React import to fix the compilation error
import React from 'react';
import { NavLink } from 'react-router-dom';

const BottomNav: React.FC = () => {
  const navItems = [
    { path: '/dashboard', icon: 'home', label: 'Inicio', isHome: true },
    { path: '/map', icon: 'map', label: 'Mapa' },
    { path: '/itinerary', icon: 'confirmation_number', label: 'Itinerario' },
    { path: '/events', icon: 'calendar_month', label: 'Explorar' },
    { path: '/about', icon: 'grid_view', label: 'Más' },
  ];

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 max-w-md mx-auto glass-panel border-t border-white/5 px-4 pt-3 pb-8 z-50 flex justify-between items-center rounded-t-[2.5rem] shadow-2xl"
      role="navigation"
      aria-label="Navegación principal"
    >
      {navItems.map((item) => (
        item.isHome ? (
          <NavLink
            key={item.path}
            to={item.path}
            aria-label={item.label}
            className={({ isActive }) => 
              `w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 relative tap-active ${
                isActive 
                ? 'bg-primary text-white shadow-xl shadow-primary/40 -mt-12 scale-110 border-[4px] border-background-default'
                : 'text-slate-500'
              }`
            }
          >
            {({ isActive }) => (
              <span 
                className="material-symbols-outlined text-[30px]" 
                style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                aria-hidden="true"
              >
                {item.icon}
              </span>
            )}
          </NavLink>
        ) : (
          <NavLink
            key={item.path}
            to={item.path}
            aria-label={item.label}
            className={({ isActive }) => 
              `flex flex-col items-center gap-1 transition-all duration-200 tap-active min-w-[3.5rem] ${isActive ? 'text-primary' : 'text-slate-500'}`
            }
          >
            {({ isActive }) => (
              <>
                <span 
                  className="material-symbols-outlined text-[26px]" 
                  style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                  aria-hidden="true"
                >
                  {item.icon}
                </span>
                <span className="text-[9px] font-black uppercase tracking-tight">{item.label}</span>
              </>
            )}
          </NavLink>
        )
      ))}
    </nav>
  );
};

export default BottomNav;