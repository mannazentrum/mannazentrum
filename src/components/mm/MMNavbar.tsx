
import React from 'react';

export const MMNavbar: React.FC<{ onBack: () => void, setPage: (p: string) => void, cartCount: number }> = ({ onBack, setPage, cartCount }) => (
  <nav className="sticky top-0 z-50 bg-[#fffdf9]/95 backdrop-blur-md border-b border-[#5d4037]/5 px-6 py-4">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => setPage('home')}>
        <div className="w-10 h-10 bg-[#e6b946] rounded-full flex items-center justify-center text-white font-playfair font-bold text-xl">M</div>
        <h1 className="font-playfair text-2xl font-bold text-[#5d4037]">Malika Maliaki</h1>
      </div>
      <div className="hidden md:flex items-center gap-8 font-nunito font-bold text-[#5d4037]/80 text-sm">
        <button onClick={() => setPage('home')} className="hover:text-[#e6b946] transition">Beranda</button>
        <button className="hover:text-[#e6b946] transition">Tentang Kami</button>
        <button className="hover:text-[#e6b946] transition">Filosofi</button>
        <button onClick={() => setPage('classes')} className="hover:text-[#e6b946] transition">Kelas</button>
        <button onClick={() => setPage('shop')} className="hover:text-[#e6b946] transition">Toko</button>
      </div>
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="hidden md:block text-xs font-bold text-[#5d4037]/50 hover:text-[#5d4037]">← Kembali</button>
        <button className="bg-[#6d4c41] text-white px-6 py-2 rounded-full font-nunito font-bold text-sm hover:bg-[#5d4037] transition shadow-md">Masuk</button>
        <div className="relative cursor-pointer text-[#5d4037]">
            <span className="text-xl">🛒</span>
            {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-[#e6b946] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{cartCount}</span>}
        </div>
      </div>
    </div>
  </nav>
);
