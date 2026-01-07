
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col items-center justify-center p-8">
      {/* Branding */}
      <div className="flex flex-col items-center mb-12 animate-fade-in">
        <div className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center shadow-2xl shadow-primary/30 mb-6 rotate-3">
          <span className="material-symbols-outlined text-white text-[48px]">local_fire_department</span>
        </div>
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">
          Vallarta<span className="text-primary">Live</span>
        </h1>
        <p className="text-gray-500 font-medium text-sm mt-2 text-center">
          La experiencia definitiva de Beefdip & Bearadise
        </p>
      </div>

      {/* Login Card */}
      <div className="w-full bg-white dark:bg-background-surface rounded-[2.5rem] p-8 shadow-2xl dark:shadow-none border border-gray-100 dark:border-white/5 space-y-6">
        <div className="flex p-1 bg-gray-100 dark:bg-black/20 rounded-2xl">
          <button 
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-3 text-sm font-black rounded-xl transition-all ${isLogin ? 'bg-white dark:bg-gray-700 text-primary shadow-sm' : 'text-gray-500'}`}
          >
            Iniciar Sesión
          </button>
          <button 
             onClick={() => setIsLogin(false)}
            className={`flex-1 py-3 text-sm font-black rounded-xl transition-all ${!isLogin ? 'bg-white dark:bg-gray-700 text-primary shadow-sm' : 'text-gray-500'}`}
          >
            Registrarse
          </button>
        </div>

        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); navigate('/dashboard'); }}>
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-2">Correo</label>
            <input 
              type="email" 
              placeholder="usuario@ejemplo.com"
              className="w-full h-14 px-5 rounded-2xl border-gray-100 dark:border-white/10 dark:bg-black/20 focus:ring-primary focus:border-primary transition-all font-medium"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-2">Contraseña</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full h-14 px-5 rounded-2xl border-gray-100 dark:border-white/10 dark:bg-black/20 focus:ring-primary focus:border-primary transition-all font-medium"
            />
          </div>
          <button 
            type="submit"
            className="w-full h-16 bg-primary hover:bg-primary-hover text-white font-black text-lg rounded-2xl shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-2 group"
          >
            {isLogin ? 'Entrar a la Fiesta' : 'Crear Cuenta'}
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </button>
        </form>

        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100 dark:border-white/5"></div></div>
          <div className="relative flex justify-center text-xs uppercase font-black text-gray-400"><span className="bg-white dark:bg-background-surface px-4 tracking-widest">O continúa con</span></div>
        </div>

        <div className="flex gap-3">
          <button className="flex-1 h-14 border border-gray-200 dark:border-white/10 rounded-2xl flex items-center justify-center hover:bg-gray-50 transition-colors">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-6 h-6" alt="Google" />
          </button>
          <button className="flex-1 h-14 border border-gray-200 dark:border-white/10 rounded-2xl flex items-center justify-center hover:bg-gray-50 transition-colors">
            <span className="material-symbols-outlined text-black dark:text-white text-3xl">apple</span>
          </button>
        </div>
      </div>

      <p className="mt-8 text-xs text-gray-400 font-medium text-center leading-relaxed">
        Al continuar, aceptas nuestros<br/>
        <a href="#" className="text-primary font-bold">Términos de Servicio</a> y <a href="#" className="text-primary font-bold">Privacidad</a>.
      </p>
    </div>
  );
};

export default Login;
