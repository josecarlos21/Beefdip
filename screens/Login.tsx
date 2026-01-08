
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-background-default flex flex-col relative overflow-hidden">
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay muted loop playsInline
          className="w-full h-full object-cover opacity-60 brightness-[0.4] contrast-[1.1]"
          poster="https://images.unsplash.com/photo-1514525253361-bee8718a74a2?auto=format&fit=crop&q=80&w=1000"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-party-crowd-at-a-concert-4024-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 img-scrim-top opacity-80 z-10 pointer-events-none"></div>
        <div className="absolute inset-0 img-scrim-deep z-10 pointer-events-none"></div>
      </div>

      {/* Main Content Flow */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center px-10 pt-20 animate-reveal">
        <div className="w-24 h-24 bg-primary rounded-[2.2rem] flex items-center justify-center shadow-[0_0_80px_rgba(251,146,60,0.5)] mb-10 rotate-6 border-4 border-white/20 active-scale">
          <span className="material-symbols-outlined text-white text-[60px]" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
        </div>
        <h1 className="text-6xl font-black text-white tracking-tighter uppercase italic leading-[0.8] text-center">
          Vallarta<br/><span className="text-primary">Live</span>
        </h1>
        <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.6em] mt-8 italic">Circuit Access Protocol</p>
      </div>

      {/* Form Area - Glass Dock */}
      <div className="relative z-30 w-full max-w-md glass-pure rounded-t-[4.5rem] p-10 pb-20 space-y-8 animate-reveal" style={{ animationDelay: '0.2s' }}>
        <div className="flex p-2 bg-black/40 rounded-[2.2rem] border border-white/5">
          <button 
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-4 text-[10px] font-black rounded-[1.8rem] transition-all active-scale ${isLogin ? 'bg-primary text-white shadow-xl' : 'text-white/30'}`}
          >
            LOGIN
          </button>
          <button 
             onClick={() => setIsLogin(false)}
            className={`flex-1 py-4 text-[10px] font-black rounded-[1.8rem] transition-all active-scale ${!isLogin ? 'bg-primary text-white shadow-xl' : 'text-white/30'}`}
          >
            JOIN
          </button>
        </div>

        <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); navigate('/dashboard'); }}>
          <div className="space-y-4">
            <input 
              type="email" 
              placeholder="System ID / Email"
              className="w-full h-20 px-10 rounded-[2.2rem] bg-white/5 border border-white/10 text-white placeholder:text-white/10 focus:ring-2 focus:ring-primary/50 transition-all font-black outline-none italic uppercase tracking-widest text-[10px]"
            />
            <input 
              type="password" 
              placeholder="Cipher Key / Password"
              className="w-full h-20 px-10 rounded-[2.2rem] bg-white/5 border border-white/10 text-white placeholder:text-white/10 focus:ring-2 focus:ring-primary/50 transition-all font-black outline-none italic uppercase tracking-widest text-[10px]"
            />
          </div>
          
          <button 
            type="submit"
            className="w-full h-22 bg-white text-background-default font-black text-sm rounded-[2.5rem] shadow-2xl transition-all active-scale flex items-center justify-center gap-4 uppercase tracking-[0.2em] group"
          >
            Iniciando Protocolo
            <span className="material-symbols-outlined text-3xl group-hover:translate-x-3 transition-transform">bolt</span>
          </button>
        </form>

        <div className="flex items-center justify-center gap-5 opacity-10 pt-4">
           <div className="h-px flex-1 bg-white"></div>
           <span className="text-[8px] font-black tracking-[0.5em] uppercase italic">Encrypted</span>
           <div className="h-px flex-1 bg-white"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
