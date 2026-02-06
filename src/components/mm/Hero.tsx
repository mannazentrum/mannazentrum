
import React from 'react';

export const Hero: React.FC<{ setPage: (p: string) => void }> = ({ setPage }) => (
  <header className="relative min-h-[85vh] flex items-center bg-[#fdfbf7] overflow-hidden px-6">
    <div className="absolute top-0 right-0 w-full md:w-[55%] h-full bg-cover bg-center md:rounded-l-[50px] shadow-2xl" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1600&q=80")', opacity: 0.9 }} />
    <div className="absolute top-0 right-0 w-full md:w-[55%] h-full bg-gradient-to-r from-[#fdfbf7] via-transparent to-transparent"></div>
    <div className="max-w-7xl mx-auto w-full relative z-10 grid md:grid-cols-2">
      <div className="animate-fadeIn">
        <span className="inline-block px-4 py-2 mb-6 text-xs font-bold tracking-widest text-[#8d6e63] bg-white border border-[#8d6e63]/20 rounded-full font-nunito shadow-sm">☀️ Cerdas, Ceria, Bersinar</span>
        <h1 className="text-5xl md:text-7xl font-bold font-playfair text-[#5d4037] leading-[1.1] mb-6">Kembali ke Fitrah, <br/><span className="italic font-light text-[#a1887f]">Merajut Kasih</span> Keluarga</h1>
        <p className="font-nunito text-lg text-[#795548] mb-10 max-w-md">Membangun peradaban dari dalam rumah. Pola makan sehat, jiwa yang tenang, dan kedekatan Ayahanda dengan buah hati.</p>
        <div className="flex gap-4">
          <button onClick={() => setPage('classes')} className="bg-[#5d4037] text-white px-8 py-4 rounded-full font-bold font-nunito text-lg shadow-xl hover:scale-105 transition">Mulai Belajar →</button>
          <button onClick={() => setPage('shop')} className="bg-white text-[#5d4037] border-2 border-[#5d4037]/10 px-8 py-4 rounded-full font-bold font-nunito text-lg hover:bg-[#f5f5f5] transition">Lihat Koleksi</button>
        </div>
      </div>
    </div>
  </header>
);
