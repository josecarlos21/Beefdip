
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-background-default flex flex-col relative overflow-hidden font-heading">
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay muted loop playsInline
          className="w-full h-full object-cover opacity-60 brightness-[0.4] contrast-[1.1]"
          poster="https://images.unsplash.com/photo-1514525253361-bee8718a74a2?auto=format&fit=crop&q=80&w=1000"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-party-crowd-at-a-concert-4024-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-background-overlay/80 z-10 pointer-events-none"></div>
      </div>

      {/* Main Content Flow */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center px-10 pt-20 animate-reveal">
        <div className="w-24 h-24 bg-brand-primary-500 rounded-card flex items-center justify-center shadow-[0_0_80px_rgba(59,130,246,0.5)] mb-10 rotate-6 border-4 border-white/20 active-scale">
          <span className="material-symbols-outlined text-text-primary text-[60px]" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
        </div>
        <h1 className="text-6xl font-black text-text-primary tracking-tighter uppercase italic leading-[0.8] text-center">
          Vallarta<br/><span className="text-brand-primary-500">Live</span>
        </h1>
        <p className="text-[10px] font-black text-text-secondary uppercase tracking-[0.6em] mt-8 italic">Circuit Access Protocol</p>
      </div>

      {/* Form Area - Glass Dock */}
      <div className="relative z-30 w-full max-w-md bg-background-surface/80 backdrop-blur-card rounded-t-[4.5rem] p-10 pb-20 space-y-8 animate-reveal" style={{ animationDelay: '0.2s' }}>
        <div className="flex p-2 bg-background-overlay/40 rounded-card border border-white/5">
          <button 
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-4 text-[10px] font-black rounded-[1.8rem] transition-all active-scale ${isLogin ? 'bg-button-primary-bg text-button-primary-text shadow-xl' : 'text-text-secondary'}`}
          >
            LOGIN
          </button>
          <button 
             onClick={() => setIsLogin(false)}
            className={`flex-1 py-4 text-[10px] font-black rounded-[1.8rem] transition-all active-scale ${!isLogin ? 'bg-button-primary-bg text-button-primary-text shadow-xl' : 'text-text-secondary'}`}
          >
            JOIN
          </button>
        </div>

        <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); navigate('/dashboard'); }}>
          <div className="space-y-4">
            <input 
              type="email" 
              placeholder="System ID / Email"
              className="w-full h-20 px-10 rounded-card bg-background-default/50 border border-border-default text-text-primary placeholder:text-text-secondary focus:ring-2 focus:ring-brand-primary-500/50 transition-all font-black outline-none italic uppercase tracking-widest text-[10px]"
            />
            <input 
              type="password" 
              placeholder="Cipher Key / Password"
              className="w-full h-20 px-10 rounded-card bg-background-default/50 border border-border-default text-text-primary placeholder:text-text-secondary focus:ring-2 focus:ring-brand-primary-500/50 transition-all font-black outline-none italic uppercase tracking-widest text-[10px]"
            />
          </div>
          
          <button 
            type="submit"
            className="w-full h-22 bg-text-primary text-background-default font-black text-sm rounded-card shadow-2xl transition-all active-scale flex items-center justify-center gap-4 uppercase tracking-[0.2em] group"
          >
            Iniciando Protocolo
            <span className="material-symbols-outlined text-3xl group-hover:translate-x-3 transition-transform">bolt</span>
          </button>
        </form>

        <div className="flex items-center justify-center gap-5 opacity-10 pt-4">
           <div className="h-px flex-1 bg-text-primary"></div>
           <span className="text-[8px] font-black tracking-[0.5em] uppercase italic text-text-primary">Encrypted</span>
           <div className="h-px flex-1 bg-text-primary"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
