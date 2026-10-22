import React from 'react';

const SplashScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FAF9F5] font-sans">
      <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-bold text-3xl mb-6 shadow-md animate-pulse">
        M
      </div>
      <span className="text-xl font-semibold text-slate-900 tracking-tight mb-2 block">Mannazentrum</span>
      <p className="text-[11px] uppercase tracking-[0.25em] text-slate-400 font-medium mb-6">PT. Elrafa Terang Sejahtera</p>
      <div className="flex space-x-2">
        <div className="w-2 h-2 bg-slate-900 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="w-2 h-2 bg-slate-900 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-2 h-2 bg-slate-900 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
      </div>
    </div>
  );
};

export default SplashScreen;
