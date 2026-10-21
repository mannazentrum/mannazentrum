import React, { useEffect } from 'react';

interface CompanyProfileProps {
  onBack: () => void;
}

const CompanyProfile: React.FC<CompanyProfileProps> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 antialiased selection:bg-amber-100 selection:text-slate-900">
      
      {/* Header / Nav */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-slate-100 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex justify-between items-center">
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={onBack}>
            <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold text-lg group-hover:bg-slate-800 transition">
              M
            </div>
            <div>
              <div className="font-semibold text-base md:text-lg text-slate-900 leading-none tracking-tight">Mannazentrum</div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400 mt-0.5">PT. Elrafa Terang Sejahtera</p>
            </div>
          </div>

          <button 
            onClick={onBack}
            className="text-slate-600 hover:text-slate-900 font-medium text-xs md:text-sm flex items-center gap-2 group px-4 py-2 rounded-full hover:bg-slate-50 transition"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Kembali ke Beranda
          </button>
        </div>
      </header>

      {/* Hero Section Banner */}
      <section className="relative w-full bg-white">
        <div className="relative w-full h-[320px] sm:h-[400px] md:h-[480px] overflow-hidden bg-slate-900">
          <img 
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2000&q=85" 
            alt="Komitmen Tim PT. Elrafa Terang Sejahtera" 
            className="w-full h-full object-cover opacity-60 select-none"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent"></div>

          <div className="absolute top-8 left-6 sm:top-10 sm:left-10 md:top-14 md:left-16 text-white drop-shadow-md select-none">
            <span className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight block">
              PT. Elrafa Terang Sejahtera
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-medium text-white/95 mt-1 block">
              ABOUT OUR COMPANY & CORE PURPOSE
            </span>
          </div>
        </div>

        {/* Headline Below Banner */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-12 pb-16 md:pt-16 md:pb-20">
          <span className="text-amber-600 font-semibold uppercase tracking-[0.2em] text-xs block mb-3">Tentang Kami</span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-light text-slate-900 tracking-tight leading-tight">
            Menjadi Terang & Garam bagi Masyarakat.
          </h1>
          <p className="mt-4 text-slate-500 text-base sm:text-lg md:text-xl font-light max-w-3xl leading-relaxed">
            Membangun ekosistem terpadu yang menyejahterakan keluarga Indonesia melalui inovasi layanan pendidikan usia dini, pengasuhan holistik, dan komitmen sosial berkelanjutan.
          </p>
        </div>
      </section>

      {/* Visi Perusahaan (Warm Ivory Background) */}
      <section className="bg-[#FAF9F5] py-20 md:py-28 px-6 sm:px-10 lg:px-16 border-t border-b border-stone-200/40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Photo Frame */}
          <div className="lg:col-span-6">
            <div className="overflow-hidden shadow-sm bg-white">
              <img 
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=80" 
                alt="Pertemuan Visi dan Misi Perusahaan" 
                className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Column: Visi Content */}
          <div className="lg:col-span-6 space-y-6 lg:pl-6">
            <span className="text-amber-600 font-semibold uppercase tracking-[0.25em] text-[11px] block">Fondasi Filosofi</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-slate-900 tracking-tight leading-tight">
              Visi Luhur Perusahaan
            </h2>
            <div className="space-y-4 text-slate-600 font-light text-base md:text-lg leading-relaxed">
              <p>
                Menjadi lembaga pendidikan dan penyedia kebutuhan keluarga yang sejahtera, lestari, dan beriman. 
              </p>
              <p>
                Visi terbesar kami adalah menjadi <strong className="font-semibold text-slate-900">"terang dan garam"</strong> bagi masyarakat di sekitar Manna Center Edukasi, serta menjadi teladan dan pelayan yang tulus bagi masyarakat umum di seluruh Indonesia.
              </p>
            </div>
            
            <div className="pt-4 border-t border-stone-200/60">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Prinsip Pelayanan</p>
              <p className="text-lg font-normal text-slate-800 mt-1 italic">
                "Sejahtera, Lestari, dan Beriman — Mengakar Kuat, Berbuah Berkah."
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Misi & Komitmen (Pure White) */}
      <section className="bg-white py-20 md:py-28 px-6 sm:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
            <span className="text-amber-600 font-semibold uppercase tracking-[0.2em] text-[11px] block mb-2">Tiga Pilar</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-slate-900 tracking-tight">
              Misi & Komitmen Layanan
            </h2>
            <p className="text-slate-500 font-light text-sm md:text-base mt-3">
              Mewujudkan solusi nyata yang mendukung setiap tahapan kehidupan keluarga.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            
            {/* Pilar 1 */}
            <div className="flex flex-col group">
              <div className="overflow-hidden bg-slate-100 mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80" 
                  alt="Pendidikan Holistik PAUD dan Bimbingan Belajar" 
                  className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Pendidikan Holistik</h3>
              <p className="text-slate-500 font-light text-sm leading-relaxed">
                Menyediakan layanan pendidikan anak usia dini (PAUD/Daycare) dan bimbingan belajar berkualitas sebagai madrasah pertama bagi generasi masa depan.
              </p>
            </div>

            {/* Pilar 2 */}
            <div className="flex flex-col group">
              <div className="overflow-hidden bg-slate-100 mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80" 
                  alt="Infrastruktur dan Kesejahteraan Keluarga" 
                  className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Infrastruktur Keluarga</h3>
              <p className="text-slate-500 font-light text-sm leading-relaxed">
                Memenuhi kebutuhan rumah tangga yang fungsional, berkelanjutan, serta mendukung kedaulatan lingkungan keluarga yang sehat dan harmonis.
              </p>
            </div>

            {/* Pilar 3 */}
            <div className="flex flex-col group">
              <div className="overflow-hidden bg-slate-100 mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1596464716127-f2a829822391?auto=format&fit=crop&w=800&q=80" 
                  alt="Tumbuh Kembang dan Stimulasi Kreativitas" 
                  className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Tumbuh Kembang Optimal</h3>
              <p className="text-slate-500 font-light text-sm leading-relaxed">
                Menyediakan peralatan stimulasi, ruang kreasi, dan perlengkapan keluarga yang dirancang khusus untuk mengoptimalkan potensi fisik, mental, dan spiritual anak.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Statement Quote Section */}
      <section className="bg-slate-900 text-white py-20 px-6 sm:px-12 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="text-amber-400 uppercase tracking-[0.3em] font-semibold text-xs block">
            Komitmen Kami
          </span>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-light italic leading-snug">
            "Kami ada untuk melayani, memberi teladan, dan memastikan setiap keluarga Indonesia memiliki akses ke pendidikan dan kebutuhan hidup yang layak."
          </h3>
          <div className="w-16 h-0.5 bg-amber-400 mx-auto mt-6"></div>
          <p className="text-slate-400 text-xs tracking-widest uppercase pt-2">
            PT. Elrafa Terang Sejahtera
          </p>
        </div>
      </section>

      {/* Modern Editorial Footer */}
      <footer className="bg-slate-950 text-white py-12 px-6 border-t border-slate-800 text-center text-xs text-slate-500 font-light">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} PT. Elrafa Terang Sejahtera. All Rights Reserved.</p>
          <button onClick={onBack} className="text-slate-400 hover:text-white transition">
            Kembali ke Beranda Utama →
          </button>
        </div>
      </footer>

    </div>
  );
};

export default CompanyProfile;
