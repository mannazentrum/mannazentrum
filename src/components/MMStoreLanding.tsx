
import React, { useState, useEffect } from 'react';
import { MMProvider, useMM } from './mm/MMContext';
import MMGeminiWidget from './mm/MMGeminiWidget';

const SectionTitle: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="text-center mb-12">
    {subtitle && (
      <span className="inline-block px-4 py-1 mb-4 text-xs font-bold tracking-widest text-[#d4a373] uppercase bg-[#fff8e1] rounded-full font-nunito">
        {subtitle}
      </span>
    )}
    <h2 className="text-4xl md:text-5xl font-bold text-[#5d4037] font-playfair">{title}</h2>
  </div>
);

const formatRp = (price: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);

const MMNavbar: React.FC<{ onBack: () => void, setPage: (p: string) => void, cartCount: number }> = ({ onBack, setPage, cartCount }) => (
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

const Hero: React.FC<{ setPage: (p: string) => void }> = ({ setPage }) => (
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

const Footer: React.FC = () => (
    <footer className="bg-[#4e342e] text-[#d7ccc8] pt-20 pb-10 px-6 font-nunito">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 border-b border-white/10 pb-16">
            <div className="col-span-1 md:col-span-1">
                <h3 className="font-playfair text-2xl font-bold text-white mb-6">Malika Maliaki</h3>
                <p className="text-sm leading-relaxed opacity-80 mb-6">
                    Membangun peradaban mulia dari dalam rumah. Menghidupkan fitrah, mencerdaskan nalar, dan membersihkan jiwa.
                </p>
                <div className="text-xs opacity-50">Part of Mannazentrum Ecosystem</div>
            </div>
            
            <div>
                <h4 className="font-bold text-white mb-6">Jelajahi</h4>
                <ul className="space-y-3 text-sm">
                    <li><a href="#" className="hover:text-[#e6b946] transition">Tentang Kami</a></li>
                    <li><a href="#" className="hover:text-[#e6b946] transition">Kelas Parenting</a></li>
                    <li><a href="#" className="hover:text-[#e6b946] transition">Toko Online</a></li>
                    <li><a href="#" className="hover:text-[#e6b946] transition">Artikel Blog</a></li>
                </ul>
            </div>

            <div>
                <h4 className="font-bold text-white mb-6">Hubungi Kami</h4>
                <ul className="space-y-3 text-sm">
                    <li className="flex gap-2">
                        <span>📍</span> Serpong Garden 1. Cluster Green View. Blok A02 No 12A.
                    </li>
                    <li className="flex gap-2">
                        <span>📞</span> +628111-889-3389
                    </li>
                    <li className="flex gap-2">
                        <span>✉️</span> info@mannazentrum.com
                    </li>
                </ul>
            </div>

            <div>
                <h4 className="font-bold text-white mb-6">Berlangganan</h4>
                <p className="text-sm opacity-80 mb-4">Dapatkan tips parenting dan info produk terbaru.</p>
                <div className="flex bg-white/5 rounded-lg overflow-hidden border border-white/10">
                    <input type="email" placeholder="Email Anda" className="bg-transparent px-4 py-2 text-sm w-full outline-none text-white" />
                    <button className="bg-[#e6b946] text-[#4e342e] px-4 py-2 text-sm font-bold hover:bg-white transition">Kirim</button>
                </div>
            </div>
        </div>
        <div className="text-center pt-10 text-xs opacity-40">
            © 2025 Malika Maliaki. All rights reserved.
        </div>
    </footer>
);

const MMAppContent: React.FC<{ onBackToCorporate: () => void }> = ({ onBackToCorporate }) => {
    const [page, setPage] = useState('home');
    const { cart } = useMM();
    useEffect(() => { window.scrollTo(0,0); }, [page]);
    return (
        <div className="min-h-screen bg-[#fffdf9]">
            {/* Under Construction Banner */}
            <div className="bg-[#fef3c7] border-b border-[#fde68a] py-2 px-4 text-center">
                <p className="text-[#92400e] font-nunito text-xs md:text-sm font-bold">
                    🚧 The Website is still under construction / Website ini masih dalam pengembangan dan perbaikan
                </p>
            </div>
            
            <MMNavbar onBack={onBackToCorporate} setPage={setPage} cartCount={cart.length} />
            {page === 'home' && (
                <>
                    <Hero setPage={setPage} />
                    <div className="py-20 text-center"><h2 className="font-playfair text-3xl text-[#5d4037]">Membangun Fitrah Keluarga</h2></div>
                </>
            )}
            <Footer />
            <MMGeminiWidget />
        </div>
    );
};

const MMStoreLanding: React.FC<{ onBackToCorporate: () => void }> = ({ onBackToCorporate }) => (
  <MMProvider><MMAppContent onBackToCorporate={onBackToCorporate} /></MMProvider>
);

export default MMStoreLanding;
