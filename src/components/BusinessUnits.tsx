import React, { useEffect } from 'react';

interface BusinessUnitsProps {
  onBack: () => void;
  onNavigateToDaycare: () => void;
  onNavigateToMMStore: () => void;
}

const BusinessUnits: React.FC<BusinessUnitsProps> = ({ 
  onBack, 
  onNavigateToDaycare, 
  onNavigateToMMStore,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 antialiased selection:bg-amber-100 selection:text-slate-900">
      
      {/* Header */}
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
        <div className="relative w-full h-[300px] sm:h-[380px] md:h-[450px] overflow-hidden bg-slate-900">
          <img 
            src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=2000&q=85" 
            alt="Unit Bisnis dan Portofolio Layanan" 
            className="w-full h-full object-cover opacity-60 select-none"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent"></div>

          <div className="absolute top-8 left-6 sm:top-10 sm:left-10 md:top-14 md:left-16 text-white drop-shadow-md select-none">
            <span className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight block">
              Unit Bisnis Strategis
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-medium text-white/95 mt-1 block">
              OUR STRATEGIC ECOSYSTEM
            </span>
          </div>
        </div>

        {/* Headline Below Banner */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-12 pb-16 md:pt-16 md:pb-20">
          <span className="text-amber-600 font-semibold uppercase tracking-[0.2em] text-xs block mb-3">Portofolio Kami</span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-light text-slate-900 tracking-tight leading-tight">
            Menghadirkan Solusi Terpadu Bagi Keluarga.
          </h1>
          <p className="mt-4 text-slate-500 text-base sm:text-lg md:text-xl font-light max-w-3xl leading-relaxed">
            PT. Elrafa Terang Sejahtera mengelola berbagai lini bisnis yang berfokus pada kesejahteraan keluarga, mulai dari pendidikan anak usia dini hingga solusi gaya hidup dan transportasi ramah keluarga.
          </p>
        </div>
      </section>

      {/* Grid of Business Units */}
      <main className="bg-[#FAF9F5] py-20 md:py-28 px-6 sm:px-10 lg:px-16 border-t border-b border-stone-200/40">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Unit 1: Daycare */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 flex flex-col group hover:shadow-lg transition-all duration-500">
              <div className="h-64 overflow-hidden bg-slate-100 relative">
                <img 
                  src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1000&q=80" 
                  alt="Mannazentrum Daycare" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div className="p-8 md:p-10 flex flex-col flex-1">
                <div className="mb-4">
                  <span className="text-amber-600 font-semibold uppercase tracking-wider text-xs">Pendidikan & Pengasuhan</span>
                  <h3 className="text-2xl font-bold text-slate-900 mt-1">Mannazentrum Daycare</h3>
                </div>
                <p className="text-slate-500 font-light text-sm leading-relaxed mb-6">
                  Layanan pengasuhan anak harian yang mengutamakan rasa aman, kasih sayang tulus, serta stimulasi tumbuh kembang fisik dan motorik yang terarah.
                </p>
                <ul className="space-y-2.5 mb-8 text-slate-700 text-xs font-medium">
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-900"></span>
                    <span>Full Day Care & Half Day Care</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-900"></span>
                    <span>Menu Makanan & Gizi Seimbang Harian</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-900"></span>
                    <span>Laporan Aktivitas Harian Terperinci</span>
                  </li>
                </ul>
                <button 
                  onClick={onNavigateToDaycare}
                  className="mt-auto w-full bg-slate-900 text-white py-3.5 rounded-full text-xs font-semibold hover:bg-slate-800 transition shadow-sm"
                >
                  Kunjungi Halaman Daycare →
                </button>
              </div>
            </div>

            {/* Unit 2: Malika Maliaki */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 flex flex-col group hover:shadow-lg transition-all duration-500">
              <div className="h-64 overflow-hidden bg-slate-100 relative">
                <img 
                  src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1000&q=80" 
                  alt="Malika Maliaki Store and Workshops" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div className="p-8 md:p-10 flex flex-col flex-1">
                <div className="mb-4">
                  <span className="text-amber-600 font-semibold uppercase tracking-wider text-xs">Gaya Hidup & Seni</span>
                  <h3 className="text-2xl font-bold text-slate-900 mt-1">Malika Maliaki</h3>
                </div>
                <p className="text-slate-500 font-light text-sm leading-relaxed mb-6">
                  Toko perlengkapan edukasi keluarga, ruang eksplorasi seni, serta kelas parenting kreatif yang berakar pada fitrah dan kebersamaan keluarga.
                </p>
                <ul className="space-y-2.5 mb-8 text-slate-700 text-xs font-medium">
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-900"></span>
                    <span>Holistic Store & Perlengkapan Seni</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-900"></span>
                    <span>Creative Workshops & Sensori</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-900"></span>
                    <span>Parenting & Family Wellness</span>
                  </li>
                </ul>
                <button 
                  onClick={onNavigateToMMStore}
                  className="mt-auto w-full bg-slate-900 text-white py-3.5 rounded-full text-xs font-semibold hover:bg-slate-800 transition shadow-sm"
                >
                  Buka Toko Kreatif →
                </button>
              </div>
            </div>

            {/* Unit 3: Preschool */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 flex flex-col group hover:shadow-lg transition-all duration-500">
              <div className="h-64 overflow-hidden bg-slate-100 relative">
                <img 
                  src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1000&q=80" 
                  alt="Mannazentrum Preschool" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div className="p-8 md:p-10 flex flex-col flex-1">
                <div className="mb-4">
                  <span className="text-amber-600 font-semibold uppercase tracking-wider text-xs">Pendidikan Usia Dini</span>
                  <h3 className="text-2xl font-bold text-slate-900 mt-1">Mannazentrum Preschool</h3>
                </div>
                <p className="text-slate-500 font-light text-sm leading-relaxed mb-6">
                  Pendidikan pra-sekolah (KB, K1, K2) berbasis kurikulum karakter dan kemandirian, menyiapkan anak memasuki jenjang sekolah dasar dengan antusiasme belajar tinggi.
                </p>
                <ul className="space-y-2.5 mb-8 text-slate-700 text-xs font-medium">
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-900"></span>
                    <span>Kelompok Bermain (KB) & Kindergarten</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-900"></span>
                    <span>Penguatan Karakter & Sosial Emosional</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-900"></span>
                    <span>Eksplorasi Sains & Fonik Interaktif</span>
                  </li>
                </ul>
                <button 
                  onClick={onNavigateToDaycare}
                  className="mt-auto w-full bg-slate-900 text-white py-3.5 rounded-full text-xs font-semibold hover:bg-slate-800 transition shadow-sm"
                >
                  Informasi Pendaftaran →
                </button>
              </div>
            </div>

            {/* Unit 4: Jasa Layanan */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 flex flex-col group hover:shadow-lg transition-all duration-500">
              <div className="h-64 overflow-hidden bg-slate-100 relative">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80" 
                  alt="Jasa Layanan Terpadu" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div className="p-8 md:p-10 flex flex-col flex-1">
                <div className="mb-4">
                  <span className="text-amber-600 font-semibold uppercase tracking-wider text-xs">Layanan Terpadu</span>
                  <h3 className="text-2xl font-bold text-slate-900 mt-1">Jasa Layanan Terpadu</h3>
                </div>
                <p className="text-slate-500 font-light text-sm leading-relaxed mb-6">
                  Solusi pendukung operasional keluarga dan institusi, mulai dari pembuatan platform digital website hingga transportasi antar-jemput siswa yang aman.
                </p>
                <ul className="space-y-2.5 mb-8 text-slate-700 text-xs font-medium">
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-900"></span>
                    <span>Pembuatan Website & Solusi Digital</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-900"></span>
                    <span>Antar-Jemput Siswa Aman & Terjadwal</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-900"></span>
                    <span>Transportasi VIP & Kebutuhan Khusus</span>
                  </li>
                </ul>
                <a 
                  href="https://wa.me/6287881110807?text=Halo,%20saya%20ingin%20konsultasi%20mengenai%20Jasa%20Layanan%20Terpadu." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-auto w-full text-center bg-slate-900 text-white py-3.5 rounded-full text-xs font-semibold hover:bg-slate-800 transition shadow-sm block"
                >
                  Konsultasi Layanan ↗
                </a>
              </div>
            </div>

          </div>
        </div>
      </main>

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

export default BusinessUnits;
