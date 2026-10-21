import React from 'react';

export const MMNavbar: React.FC<{ onBack: () => void, setPage: (p: string) => void, cartCount: number }> = ({ onBack, setPage, cartCount }) => (
  <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 font-sans">
    <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex justify-between items-center">
      <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => setPage('home')}>
        <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold text-lg group-hover:bg-slate-800 transition">
          M
        </div>
        <div>
          <h1 className="font-semibold text-base md:text-lg text-slate-900 leading-none tracking-tight">Malika Maliaki</h1>
          <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400 mt-0.5">Creative Store & Education</p>
        </div>
      </div>
      
      <nav className="hidden md:flex items-center space-x-8 text-sm font-normal text-slate-600">
        <button onClick={() => setPage('home')} className="hover:text-slate-900 transition font-medium text-slate-900">Beranda</button>
        <button onClick={() => setPage('classes')} className="hover:text-slate-900 transition">Kelas Kreatif</button>
        <button onClick={() => setPage('shop')} className="hover:text-slate-900 transition">Katalog Toko</button>
      </nav>

      <div className="flex items-center space-x-4">
        <button 
          onClick={onBack} 
          className="text-xs md:text-sm font-medium text-slate-600 hover:text-slate-900 transition flex items-center gap-1.5"
        >
          <span>←</span> Kembali ke Beranda
        </button>
        <button 
          onClick={() => setPage('shop')}
          className="bg-slate-900 text-white text-xs md:text-sm px-5 py-2.5 rounded-full font-medium hover:bg-slate-800 transition shadow-sm flex items-center gap-2"
        >
          <span>Toko</span>
          {cartCount > 0 && (
            <span className="bg-amber-400 text-slate-900 text-[10px] px-1.5 py-0.5 rounded-full font-bold">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </div>
  </header>
);
