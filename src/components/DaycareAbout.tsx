
import React, { useEffect } from 'react';
import Logo from './Logo';

interface DaycareAboutProps {
  onBack: () => void;
}

const DaycareAbout: React.FC<DaycareAboutProps> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#f7f3e3] font-nunito text-[#42210b] pb-20">
      {/* Navigation Simulation Bar */}
      <nav className="sticky top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-[#42210b]/10 px-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between h-20 items-center">
          <div className="flex items-center space-x-3">
            <Logo size="sm" />
            <div className="flex flex-col">
              <span className="font-black text-xl tracking-tight leading-none uppercase">MANNAZENTRUM</span>
              <span className="text-[10px] tracking-widest uppercase opacity-60 font-bold">Daycare & Preschool</span>
            </div>
          </div>
          <button 
            onClick={onBack}
            className="bg-[#42210b] text-white px-8 py-2.5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-black transition shadow-lg"
          >
            ← Kembali
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-[#42210b] text-white py-24 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="bg-[#f3b524] text-[#42210b] font-black tracking-widest text-[10px] uppercase px-4 py-1.5 rounded-full mb-6 inline-block shadow-xl">Tentang Kami</span>
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[0.95] tracking-tighter">
            Membangun Karakter <br/> Melalui Kasih Sayang.
          </h1>
          <p className="text-xl text-white/90 max-w-2xl leading-relaxed font-medium">
            Mitra terpercaya orang tua dalam memberikan pengasuhan berkualitas tinggi di lingkungan yang aman dan menstimulasi secara holistik.
          </p>
        </div>
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#f3b524]/10 rounded-full blur-3xl"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      </section>

      {/* Main Narrative */}
      <div className="max-w-4xl mx-auto px-6 mt-16 space-y-16">
        <section className="bg-white p-10 md:p-16 rounded-[60px] shadow-2xl border border-[#42210b]/5 leading-relaxed relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-[#f3b524]"></div>
          <h2 className="text-4xl font-black mb-10 tracking-tight text-[#42210b] uppercase">MannaZentrum Daycare</h2>
          <div className="space-y-8 text-lg text-[#42210b] text-justify leading-relaxed font-bold">
            <p className="opacity-95">
              MannaZentrum Daycare (atau dikenal sebagai <span className="text-[#f3b524] bg-[#42210b] px-2 py-0.5 rounded">MZ Daycare</span>) adalah penyedia layanan pengasuhan anak yang berlokasi di area strategis <span className="underline decoration-[#f3b524] decoration-4 underline-offset-4">Serpong Garden – Green View</span>. Kami hadir sebagai solusi bagi orang tua yang mendambakan keamanan dan kenyamanan maksimal bagi buah hati mereka.
            </p>
            <p className="opacity-95">
              Setiap hari di MZ Daycare diisi dengan aktivitas berkualitas yang dirancang untuk menstimulasi motorik dan kognitif anak. Kami sangat memperhatikan asupan nutrisi, dengan menyajikan <span className="italic text-[#42210b]">makanan bergizi seimbang tanpa bahan pengawet maupun MSG (vetsin)</span>, dimasak segar setiap hari.
            </p>
            <p className="opacity-95">
              Keamanan adalah prioritas mutlak kami, didukung oleh sistem monitoring <span className="bg-[#f3b524]/20 px-2 rounded">CCTV 15 jam</span> dan kebijakan pembatasan jumlah anak per rumah (limited intake) guna memastikan setiap anak mendapatkan perhatian yang intim, personal, dan hangat dari para pendidik kami.
            </p>
            <p className="opacity-95">
              Berlokasi di lingkungan yang asri dan bebas polusi, kami juga menjalin kemitraan strategis dengan <span className="font-black">Dokter Spesialis Anak (Pediatric), Dokter Gigi, serta Psikolog Profesional</span> untuk memantau perkembangan fisik dan mental anak secara berkala. Fokus utama kami sederhana: <span className="text-2xl font-black block mt-4 text-[#42210b]/60 tracking-tighter uppercase italic">"Happy Kids and Relaxed Parents"</span>.
            </p>
          </div>
        </section>

        {/* Key Features Grid */}
        <section className="space-y-10">
          <h3 className="text-3xl font-black text-center uppercase tracking-tighter">Keunggulan Utama</h3>
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-[40px] shadow-xl hover:scale-105 transition-all border-b-4 border-[#f3b524] flex items-start gap-6">
              <div className="bg-[#42210b] text-[#f3b524] p-4 rounded-2xl text-2xl shadow-inner">📍</div>
              <div>
                <h4 className="font-black text-xl mb-1 uppercase tracking-tight">Lokasi Strategis</h4>
                <p className="text-sm text-[#42210b]/70 font-bold leading-snug">Berada di Serpong Garden – Green View, Blok A2/12a. Lingkungan eksklusif dan tenang.</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-[40px] shadow-xl hover:scale-105 transition-all border-b-4 border-[#f3b524] flex items-start gap-6">
              <div className="bg-[#42210b] text-[#f3b524] p-4 rounded-2xl text-2xl shadow-inner">🌳</div>
              <div>
                <h4 className="font-black text-xl mb-1 uppercase tracking-tight">Lingkungan Asri</h4>
                <p className="text-sm text-[#42210b]/70 font-bold leading-snug">Area hijau yang luas, jauh dari kebisingan jalan raya dan polusi kendaraan berat.</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-[40px] shadow-xl hover:scale-105 transition-all border-b-4 border-[#f3b524] flex items-start gap-6">
              <div className="bg-[#42210b] text-[#f3b524] p-4 rounded-2xl text-2xl shadow-inner">👩‍🏫</div>
              <div>
                <h4 className="font-black text-xl mb-1 uppercase tracking-tight">Layanan Personal</h4>
                <p className="text-sm text-[#42210b]/70 font-bold leading-snug">Intake terbatas menjamin setiap anak mendapatkan kasih sayang dan pengawasan maksimal.</p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-8 rounded-[40px] shadow-xl hover:scale-105 transition-all border-b-4 border-[#f3b524] flex items-start gap-6">
              <div className="bg-[#42210b] text-[#f3b524] p-4 rounded-2xl text-2xl shadow-inner">🩺</div>
              <div>
                <h4 className="font-black text-xl mb-1 uppercase tracking-tight">Medical Support</h4>
                <p className="text-sm text-[#42210b]/70 font-bold leading-snug">Didukung oleh tim medis profesional untuk pemantauan kesehatan rutin tanpa biaya tambahan.</p>
              </div>
            </div>

          </div>
        </section>

        {/* Final Vision */}
        <section className="bg-[#f3b524] text-[#42210b] rounded-[60px] p-16 text-center shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#42210b]/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <h3 className="text-4xl md:text-5xl font-black leading-none italic tracking-tighter uppercase">
              "Happy Kids, <br/> Calm Parents"
            </h3>
            <div className="w-20 h-2 bg-[#42210b] mx-auto rounded-full"></div>
            <p className="font-bold text-lg opacity-80 uppercase tracking-widest">Visi Utama Mannazentrum Daycare</p>
          </div>
        </section>

      </div>

      {/* Footer Button */}
      <div className="mt-24 text-center">
        <button 
          onClick={onBack}
          className="bg-[#42210b] text-white px-12 py-5 rounded-full font-black text-lg hover:bg-black shadow-2xl transition transform hover:-translate-y-2 uppercase tracking-widest"
        >
          Kembali ke Beranda
        </button>
        <div className="mt-12 text-[10px] font-black uppercase tracking-[0.5em] opacity-40">
          <p>Mannazentrum Ecosystem • Since 2024</p>
        </div>
      </div>
    </div>
  );
};

export default DaycareAbout;
