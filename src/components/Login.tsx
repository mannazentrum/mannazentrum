
import React, { useState } from 'react';
import { UserRole } from '../types';
import Logo from './Logo';

interface LoginProps {
  onLogin: (username: string, password: string) => void;
  onRegister: () => void;
  onForgotPassword: () => void;
  onBackToLanding?: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onRegister, onForgotPassword, onBackToLanding }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

  const handleLoginAttempt = () => {
    onLogin(username, password);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 relative overflow-hidden bg-[#f3b524]">
      {/* Back to Website Button */}
      {onBackToLanding && (
        <button 
          onClick={onBackToLanding}
          className="absolute top-6 left-6 flex items-center gap-2 bg-white/40 hover:bg-white/60 px-5 py-2.5 rounded-full text-[#42210b] font-black text-xs transition-all shadow-sm z-10 uppercase tracking-widest"
        >
          <span>←</span> Kembali ke Website
        </button>
      )}

      {/* Decorative Stickers */}
      <div className="absolute top-10 left-10 text-4xl opacity-30 select-none animate-pulse">☁️</div>
      <div className="absolute bottom-20 right-10 text-6xl opacity-30 select-none">🌷</div>

      <div className="w-full max-w-lg bg-[#fdfbf7] rounded-[60px] p-12 card-shadow flex flex-col items-center space-y-8 border-b-[10px] border-[#42210b]/5">
        {/* Logo Section */}
        <div className="flex flex-col items-center">
          <Logo size="xl" className="mb-4" />
          <h1 className="text-3xl font-black tracking-[0.2em] text-[#42210b] font-nunito uppercase">MANNAZENTRUM</h1>
          <p className="text-[10px] font-black text-[#42210b]/40 tracking-[0.4em] uppercase -mt-1">Connect System</p>
        </div>

        <div className="w-full space-y-6">
          <div className="space-y-2">
            <label className="text-[#42210b]/40 font-black text-[10px] uppercase tracking-widest ml-4">Username</label>
            <input 
              type="text" 
              className="w-full px-8 py-5 rounded-full border-none shadow-inner bg-[#f0f0f0] text-[#42210b] font-bold focus:ring-4 focus:ring-[#f3b524]/20 outline-none placeholder:opacity-30"
              placeholder="Username pendaftaran"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-[#42210b]/40 font-black text-[10px] uppercase tracking-widest ml-4">Password</label>
            <div className="relative">
              <input 
                type={showPass ? 'text' : 'password'}
                className="w-full px-8 py-5 rounded-full border-none shadow-inner bg-[#f0f0f0] text-[#42210b] font-bold focus:ring-4 focus:ring-[#f3b524]/20 outline-none"
                placeholder="******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button 
                onClick={() => setShowPass(!showPass)}
                className="absolute right-8 top-1/2 -translate-y-1/2 text-[#42210b]/30 hover:text-[#42210b] transition-colors"
              >
                {showPass ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <button 
            onClick={handleLoginAttempt}
            className="w-full bg-white text-[#42210b] py-5 rounded-full font-black text-xl hover:bg-[#f3b524] transition-all shadow-xl active:scale-95 uppercase tracking-widest border-4 border-[#42210b]/5"
          >
            LOGIN
          </button>
        </div>

        <div className="pt-4 text-center space-y-6 w-full">
          <div className="flex flex-col items-center">
            <button 
              onClick={onRegister}
              className="bg-white/50 px-8 py-3 rounded-full text-[#42210b] font-black text-[10px] hover:bg-white hover:shadow-md transition-all border border-[#42210b]/10 uppercase tracking-widest"
            >
              Daftar Akun Baru
            </button>
          </div>
          <button onClick={onForgotPassword} className="text-[#42210b]/40 font-black text-[10px] hover:text-[#42210b] uppercase tracking-widest">
            Lupa password? Klik di sini
          </button>
        </div>

        <p className="text-[9px] text-[#42210b]/30 pt-4 uppercase font-black tracking-[0.2em]">© Mannazentrum Digital Eco 2024</p>
      </div>
    </div>
  );
};

export default Login;
