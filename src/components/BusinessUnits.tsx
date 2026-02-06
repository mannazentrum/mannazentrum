
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
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-800">
      {/* Header */}
      <nav className="bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={onBack}>
            <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold text-xl">E</div>
            <div>
              <h1 className="font-bold text-xl leading-none tracking-tight">ELRAFA</h1>
              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500">Terang Sejahtera</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button 
              onClick={onBack}
              className="text-slate-600 hover:text-slate-900 font-medium text-sm flex items-center gap-2 group"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span> Kembali
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-white py-20 px-6 border-b border-slate-100">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-orange-600 font-bold tracking-widest text-xs uppercase mb-4 block">Portofolio Perusahaan</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">Unit Bisnis Strategis</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            PT. Elrafa Terang Sejahtera mengelola berbagai lini bisnis yang berfokus pada kesejahteraan keluarga, 
            mulai dari pendidikan anak usia dini hingga solusi gaya hidup holistik.
          </p>
        </div>
      </section>

      {/* Grid Units */}
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Unit 1: Daycare */}
          <div className="bg-white rounded-[40px] overflow-hidden shadow-sm border border-slate-100 group hover:shadow-xl transition-all duration-500">
            <div className="h-64 bg-pdf-yellow/10 flex items-center justify-center relative overflow-hidden">
               <span className="text-8xl group-hover:scale-110 transition-transform duration-500">🧸</span>
               <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent"></div>
            </div>
            <div className="p-10 space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Mannazentrum Daycare</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Layanan pengasuhan anak harian yang mengutamakan keamanan, kenyamanan, dan stimulasi tumbuh kembang yang tepat.
                </p>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center text-xs text-slate-400 font-medium">
                  <span className="w-1.5 h-1.5 bg-pdf-yellow rounded-full mr-2"></span> Full Day Care
                </li>
                <li className="flex items-center text-xs text-slate-400 font-medium">
                  <span className="w-1.5 h-1.5 bg-pdf-yellow rounded-full mr-2"></span> Half Day Care
                </li>
                <li className="flex items-center text-xs text-slate-400 font-medium">
                  <span className="w-1.5 h-1.5 bg-pdf-yellow rounded-full mr-2"></span> Holistic Curriculum
                </li>
              </ul>
              <button 
                onClick={onNavigateToDaycare}
                className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition shadow-lg"
              >
                Kunjungi Website
              </button>
            </div>
          </div>

          {/* Unit 2: Malika Maliaki */}
          <div className="bg-white rounded-[40px] overflow-hidden shadow-sm border border-slate-100 group hover:shadow-xl transition-all duration-500">
            <div className="h-64 bg-pink-50 flex items-center justify-center relative overflow-hidden">
               <span className="text-8xl group-hover:scale-110 transition-transform duration-500">🎨</span>
               <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent"></div>
            </div>
            <div className="p-10 space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Malika Maliaki</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Lini gaya hidup keluarga yang menyediakan produk herbal, alami, serta workshop kreatif untuk orang tua dan anak.
                </p>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center text-xs text-slate-400 font-medium">
                  <span className="w-1.5 h-1.5 bg-pink-400 rounded-full mr-2"></span> Holistic Store
                </li>
                <li className="flex items-center text-xs text-slate-400 font-medium">
                  <span className="w-1.5 h-1.5 bg-pink-400 rounded-full mr-2"></span> Creative Classes
                </li>
                <li className="flex items-center text-xs text-slate-400 font-medium">
                  <span className="w-1.5 h-1.5 bg-pink-400 rounded-full mr-2"></span> Parenting Advisor
                </li>
              </ul>
              <button 
                onClick={onNavigateToMMStore}
                className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition shadow-lg"
              >
                Buka Online Store
              </button>
            </div>
          </div>

          {/* Unit 3: Preschool */}
          <div className="bg-white rounded-[40px] overflow-hidden shadow-sm border border-slate-100 group hover:shadow-xl transition-all duration-500">
            <div className="h-64 bg-blue-50 flex items-center justify-center relative overflow-hidden">
               <span className="text-8xl group-hover:scale-110 transition-transform duration-500">🏫</span>
               <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent"></div>
            </div>
            <div className="p-10 space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Mannazentrum Preschool</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Lembaga pendidikan usia dini (KB, K1, K2) yang menitikberatkan pada pembentukan karakter dan kemandirian.
                </p>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center text-xs text-slate-400 font-medium">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span> Kelompok Bermain (KB)
                </li>
                <li className="flex items-center text-xs text-slate-400 font-medium">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span> Kindergarten K1 & K2
                </li>
                <li className="flex items-center text-xs text-slate-400 font-medium">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span> Character Building
                </li>
              </ul>
              <button 
                onClick={onNavigateToDaycare}
                className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition shadow-lg"
              >
                Informasi Pendaftaran
              </button>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <p className="text-slate-400 text-sm italic">
            "Bagian dari ekosistem Manna Center Edukasi - Melayani untuk Negeri"
          </p>
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
            <p>&copy; 2025 <button onClick={onBack} className="hover:underline font-medium">PT. Elrafa Terang Sejahtera</button></p>
            <div className="flex gap-6">
               <span>WA: +628111-889-3389</span>
               <span>Email: info@mannazentrum.com</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BusinessUnits;
