import React, { useState, useEffect } from 'react';
import { MMProvider, useMM } from './mm/MMContext';
import { MMNavbar, Hero, Footer } from './mm';

const MMAppContent: React.FC<{ onBackToCorporate: () => void }> = ({ onBackToCorporate }) => {
  const [page, setPage] = useState('home');
  const { cart } = useMM();
  
  useEffect(() => { 
    window.scrollTo(0, 0); 
  }, [page]);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 antialiased selection:bg-amber-100 selection:text-slate-900">
      {/* Top Notice */}
      <div className="bg-[#FAF9F5] border-b border-stone-200/60 py-2.5 px-4 text-center">
        <p className="text-slate-600 font-sans text-xs font-normal">
          ✨ <strong className="font-medium text-slate-900">Malika Maliaki</strong> — Kelas Kreatif, Edukasi Seni, & Perlengkapan Stimulasi Anak
        </p>
      </div>
      
      <MMNavbar onBack={onBackToCorporate} setPage={setPage} cartCount={cart.length} />
      
      {page === 'home' && (
        <>
          <Hero setPage={setPage} />
        </>
      )}
      
      <Footer />
    </div>
  );
};

const MMStoreLanding: React.FC<{ onBackToCorporate: () => void }> = ({ onBackToCorporate }) => (
  <MMProvider>
    <MMAppContent onBackToCorporate={onBackToCorporate} />
  </MMProvider>
);

export default MMStoreLanding;
