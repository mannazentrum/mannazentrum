
import React, { useEffect } from 'react';

interface CompanyProfileProps {
  onBack: () => void;
}

const CompanyProfile: React.FC<CompanyProfileProps> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 pb-20">
      {/* Header / Nav */}
      <nav className="bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={onBack}>
            <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold text-xl">E</div>
            <div>
              <h1 className="font-bold text-xl leading-none tracking-tight">ELRAFA</h1>
              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500">Terang Sejahtera</p>
            </div>
          </div>
          <button 
            onClick={onBack}
            className="text-slate-600 hover:text-slate-900 font-medium text-sm flex items-center gap-2 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Kembali ke Beranda
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-24 px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto relative z-10">
          <span className="text-orange-500 font-bold tracking-widest text-xs uppercase mb-4 block">Tentang Kami</span>
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 leading-tight">
            Menjadi Terang & Garam <br/> bagi Masyarakat.
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
            Membangun ekosistem yang menyejahterakan keluarga Indonesia melalui inovasi layanan dan nilai-nilai luhur.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-600/10 skew-x-12 transform translate-x-1/4"></div>
      </section>

      {/* Content Sections */}
      <div className="max-w-5xl mx-auto px-6 mt-20 space-y-24">
        
        {/* Visi Section */}
        <section className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <span className="w-12 h-1 bg-orange-600"></span> Visi Perusahaan
            </h3>
            <p className="text-lg text-slate-600 leading-relaxed text-justify">
              Menjadi lembaga pendidikan dan penyedia kebutuhan bagi keluarga sejahtera, lestari, dan beriman. 
              Visi terbesar kami adalah menjadi <span className="font-bold text-slate-900 italic">"terang dan garam"</span> bagi masyarakat di sekitar 
              <span className="text-orange-600 font-bold"> Manna Center Edukasi</span>, serta menjadi teladan dan pelayan yang tulus bagi masyarakat umum di seluruh Indonesia.
            </p>
          </div>
          <div className="bg-slate-50 p-10 rounded-[40px] border border-slate-100">
             <div className="text-5xl mb-6">🕯️</div>
             <p className="text-slate-500 italic">"Sejahtera, Lestari, dan Beriman"</p>
          </div>
        </section>

        {/* Misi Section */}
        <section className="space-y-12">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-slate-900">Misi & Komitmen Layanan</h3>
            <p className="text-slate-500 mt-2">Menyediakan solusi holistik untuk kehidupan rumah tangga dan pendidikan.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white border border-slate-200 p-8 rounded-3xl hover:shadow-xl transition shadow-sm">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-6">🏫</div>
              <h4 className="text-xl font-bold mb-4">Pendidikan Holistik</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Menyediakan layanan pendidikan berkualitas, terutama Pendidikan Anak Usia Dini (PAUD) dan bimbingan belajar sebagai madrasah pertama bagi generasi masa depan.
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-8 rounded-3xl hover:shadow-xl transition shadow-sm">
              <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center text-3xl mb-6">🏠</div>
              <h4 className="text-xl font-bold mb-4">Infrastruktur Keluarga</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Memenuhi kebutuhan rumah tangga melalui ketersediaan bangunan yang fungsional, terutama fokus pada kedaulatan energi melalui pembangkit tenaga listrik mandiri.
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-8 rounded-3xl hover:shadow-xl transition shadow-sm">
              <div className="w-14 h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center text-3xl mb-6">🌱</div>
              <h4 className="text-xl font-bold mb-4">Tumbuh Kembang</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Menyediakan peralatan dan perlengkapan keluarga yang dirancang khusus untuk mendukung tumbuh kembang anak secara fisik, mental, and spiritual.
              </p>
            </div>
          </div>
        </section>

        {/* Summary Statement */}
        <section className="bg-orange-600 text-white rounded-[60px] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <h4 className="text-2xl md:text-4xl font-serif font-bold italic leading-tight">
              "Kami ada untuk melayani, memberi teladan, dan memastikan setiap keluarga Indonesia memiliki akses ke pendidikan dan kebutuhan hidup yang layak."
            </h4>
            <div className="w-20 h-1 bg-white mx-auto"></div>
            <p className="text-orange-100 uppercase tracking-[0.3em] font-bold text-sm">
              <button onClick={onBack} className="hover:underline">PT. Elrafa Terang Sejahtera</button>
            </p>
          </div>
          {/* Decorative Circle */}
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        </section>

      </div>

      {/* Simple Footer */}
      <footer className="mt-32 pt-12 border-t border-slate-100 text-center">
        <button onClick={onBack} className="bg-slate-900 text-white px-8 py-3 rounded-full font-bold hover:bg-slate-800 transition shadow-lg">
          Kembali ke Dashboard Korporat
        </button>
        <p className="text-slate-400 text-xs mt-8">&copy; 2025 <button onClick={onBack} className="hover:underline font-medium">PT. Elrafa Terang Sejahtera</button></p>
      </footer>
    </div>
  );
};

export default CompanyProfile;