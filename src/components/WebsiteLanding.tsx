
import React, { useState } from 'react';
import { WebsiteContent } from '../types';
import Logo from './Logo';

interface WebsiteLandingProps {
  onNavigateToApp: () => void;
  onNavigateToRegistration: () => void;
  onNavigateToAbout: () => void;
  onNavigateToProgram: () => void;
  onNavigateToCorporate: () => void;
  cmsContent?: WebsiteContent;
}

const WebsiteLanding: React.FC<WebsiteLandingProps> = ({ 
  onNavigateToApp, 
  onNavigateToRegistration,
  onNavigateToAbout,
  onNavigateToProgram,
  onNavigateToCorporate,
  cmsContent
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const content = cmsContent || {
    heroTitle: 'Membangun Generasi Cerdas & Berkarakter',
    heroSubtitle: 'Mannazentrum hadir sebagai mitra orang tua dalam mengasuh dan mendidik buah hati dengan penuh kasih sayang.',
    announcementActive: true,
    announcementText: 'Pendaftaran Murid Baru Gelombang 2 Telah Dibuka!',
    whatsappNumber: '6287881110807',
    tagline: 'Daycare & Preschool'
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#42210b]">
      {/* Dynamic Announcement Bar */}
      {content.announcementActive && (
        <div className="bg-[#42210b] text-white text-[10px] py-2 px-4 text-center border-b border-[#f3b524] animate-fadeIn">
          <span className="font-black uppercase tracking-[0.2em]">📢 {content.announcementText}</span>
        </div>
      )}

      {/* Navigation */}
      <nav className="sticky top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-[#42210b]/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
            <Logo size="sm" />
            <div className="flex flex-col">
              <span className="font-black text-xl font-nunito tracking-tight leading-none">MANNAZENTRUM</span>
              <span className="text-[9px] tracking-[0.3em] uppercase opacity-40 font-bold">Daycare & Preschool</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">
            <button onClick={() => scrollToSection('beranda')} className="font-bold text-xs uppercase tracking-widest hover:text-[#f3b524] transition-colors">Beranda</button>
            <button onClick={onNavigateToAbout} className="font-bold text-xs uppercase tracking-widest hover:text-[#f3b524] transition-colors">Tentang</button>
            <button onClick={onNavigateToProgram} className="font-bold text-xs uppercase tracking-widest hover:text-[#f3b524] transition-colors">Program</button>
            <button onClick={onNavigateToApp} className="bg-[#f3b524] text-[#42210b] px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white border-2 border-[#42210b]/5 transition-all shadow-xl flex items-center gap-2">
              <span>🔐</span> Portal App
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="text-3xl text-[#42210b] p-2 transition-transform duration-300"
              style={{ transform: isMenuOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
            >
              {isMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-white shadow-2xl border-b-4 border-[#f3b524] animate-fadeIn z-[60]">
            <div className="flex flex-col p-8 space-y-6">
              <button 
                onClick={() => { scrollToSection('beranda'); setIsMenuOpen(false); }} 
                className="text-left font-black text-sm uppercase tracking-[0.2em] py-2 border-b border-black/5"
              >
                🏠 Beranda
              </button>
              <button 
                onClick={() => { onNavigateToAbout(); setIsMenuOpen(false); }} 
                className="text-left font-black text-sm uppercase tracking-[0.2em] py-2 border-b border-black/5"
              >
                ✨ Tentang Kami
              </button>
              <button 
                onClick={() => { onNavigateToProgram(); setIsMenuOpen(false); }} 
                className="text-left font-black text-sm uppercase tracking-[0.2em] py-2 border-b border-black/5"
              >
                🧩 Program
              </button>
              <button 
                onClick={() => { onNavigateToApp(); setIsMenuOpen(false); }} 
                className="w-full bg-[#f3b524] text-[#42210b] py-5 rounded-3xl font-black text-xs uppercase tracking-[0.2em] shadow-xl flex justify-center items-center gap-3"
              >
                <span>🔐</span> LOGIN PORTAL APP
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="beranda" className="pt-24 pb-32 px-6 bg-[#fdfbf7] relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-10 animate-fadeIn">
            <span className="bg-[#f3b524]/20 text-[#42210b] px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">Since 2024</span>
            <h1 className="text-5xl md:text-7xl font-black font-nunito leading-[1.1] text-[#42210b] tracking-tighter">
              {content.heroTitle}
            </h1>
            <p className="text-xl opacity-60 leading-relaxed max-w-lg font-medium">
              {content.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 pt-4">
              <button onClick={onNavigateToRegistration} className="bg-[#42210b] text-white px-12 py-5 rounded-full font-black text-lg hover:scale-105 shadow-2xl transition transform uppercase tracking-widest">Daftar Online</button>
              <button onClick={onNavigateToAbout} className="bg-white text-[#42210b] border-2 border-[#42210b]/10 px-12 py-5 rounded-full font-black text-lg hover:bg-gray-50 transition uppercase tracking-widest">Kenali Kami</button>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-[#f3b524] rounded-[60px] blur-3xl opacity-20 group-hover:opacity-30 transition"></div>
            <div className="relative bg-white p-6 rounded-[60px] shadow-2xl rotate-2 group-hover:rotate-0 transition-transform duration-700">
               <img src="https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=1000&q=80" alt="Happy Kids" className="rounded-[45px] w-full h-auto aspect-[4/3] object-cover" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WebsiteLanding;
