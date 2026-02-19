
import React, { useState } from 'react';
import { careerList } from '../data/careers';

interface CorporateLandingProps {
  onNavigateToDaycare: () => void;
  onNavigateToMMStore: () => void;
  onNavigateToProfile: () => void;
  onNavigateToBusinessUnits: () => void;
}

const CorporateLanding: React.FC<CorporateLandingProps> = ({ 
  onNavigateToDaycare, 
  onNavigateToMMStore, 
  onNavigateToProfile,
  onNavigateToBusinessUnits,
}) => {
  const [showCareerNotice, setShowCareerNotice] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleCareerClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowCareerNotice(false);
    setShowContactForm(false);
    setShowCareerNotice(true);
  };

  const handlePendaftaranClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowCareerNotice(false);
    setShowContactForm(true);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 relative">
      
      {/* Career Page / Modal */}
      {showCareerNotice && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-slate-900/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
          <div className="bg-white w-full max-w-4xl rounded-[50px] shadow-2xl border-4 border-slate-100 overflow-hidden relative my-auto">
            <button 
              onClick={() => setShowCareerNotice(false)}
              className="absolute top-8 right-8 w-12 h-12 bg-slate-50 text-slate-400 hover:text-slate-900 rounded-full flex items-center justify-center text-2xl transition-all z-10"
            >
              ×
            </button>
            
            <div className="p-10 md:p-16">
              <div className="text-center mb-12">
                <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] mb-3 block">Join Our Team</span>
                <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter leading-none mb-4">Kesempatan Berkarir</h2>
                <p className="text-slate-500 font-medium max-w-xl mx-auto">Bergabunglah bersama kami membangun generasi masa depan yang lebih cerah dan berkarakter di unit-unit bisnis kami.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                {careerList.map((job, idx) => (
                  <div key={idx} className="bg-slate-50 p-6 rounded-[30px] border border-slate-100 flex items-center gap-5 group hover:bg-white hover:border-accent/40 hover:shadow-xl transition-all">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm group-hover:scale-110 transition-transform">{job.icon}</div>
                    <div>
                      <h4 className="font-black text-slate-900 text-lg leading-tight uppercase">{job.title}</h4>
                      <p className="text-xs font-bold text-accent tracking-widest mt-1 uppercase">{job.unit}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-slate-900 p-8 rounded-[40px] text-center text-white space-y-4">
                <h4 className="font-bold text-xl">Informasi Kontak Rekrutmen</h4>
                <p className="text-slate-400 text-sm">Silakan kirimkan berkas lamaran Anda melalui email:</p>
                <div className="flex flex-col md:flex-row justify-center items-center gap-6 pt-2">
                   <div className="bg-white/10 px-6 py-3 rounded-full border border-white/20 font-mono text-sm">
                     <span className="text-accent mr-2">✉️</span> mannazentruminfo@gmail.com
                   </div>
                   <div className="bg-white/10 px-6 py-3 rounded-full border border-white/20 font-mono text-sm">
                     <span className="text-green-500 mr-2">💬</span> WA HRD: +6287878384807
                   </div>
                </div>
                <p className="text-[10px] text-slate-500 italic mt-4 uppercase tracking-widest">* Hanya menerima pesan tertulis di jam operasional</p>
              </div>
              
              <button 
                onClick={() => setShowCareerNotice(false)}
                className="mt-10 w-full text-slate-400 font-bold text-[10px] uppercase tracking-[0.4em] hover:text-slate-900"
              >
                TUTUP HALAMAN
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-slate-900/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
          <div className="bg-white w-full max-w-lg rounded-[50px] shadow-2xl border-4 border-slate-100 overflow-hidden relative my-auto">
            <button 
              onClick={() => setShowContactForm(false)}
              className="absolute top-8 right-8 w-12 h-12 bg-slate-50 text-slate-400 hover:text-slate-900 rounded-full flex items-center justify-center text-2xl transition-all z-10"
            >
              ×
            </button>
            
            <div className="p-10">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter leading-none mb-2">Informasi Pendaftaran</h2>
                <p className="text-slate-500 font-medium">Silakan isi formulir di bawah ini.</p>
              </div>

              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  const target = e.target as typeof e.target & {
                    name: { value: string };
                    email: { value: string };
                    phone: { value: string };
                    message: { value: string };
                  };
                  const name = target.name.value;
                  const email = target.email.value;
                  const phone = target.phone.value;
                  const message = target.message.value;
                  window.location.href = `mailto:info@mannazentrum.com?subject=Pendaftaran&body=Nama:%20${name}%0AEmail:%20${email}%0APhone:%20${phone}%0A%0A${message}`;
                }}
                className="space-y-4"
              >
                <div>
                  <label htmlFor="name" className="font-bold text-slate-800 text-sm">Nama</label>
                  <input type="text" id="name" name="name" className="w-full border border-slate-200 rounded-lg p-3 mt-1" required />
                </div>
                <div>
                  <label htmlFor="email" className="font-bold text-slate-800 text-sm">Alamat Email</label>
                  <input type="email" id="email" name="email" className="w-full border border-slate-200 rounded-lg p-3 mt-1" required />
                </div>
                <div>
                  <label htmlFor="phone" className="font-bold text-slate-800 text-sm">Nomor Telepon</label>
                  <input type="tel" id="phone" name="phone" className="w-full border border-slate-200 rounded-lg p-3 mt-1" required />
                </div>
                <div>
                  <label htmlFor="message" className="font-bold text-slate-800 text-sm">Pesan</label>
                  <textarea id="message" name="message" rows={4} className="w-full border border-slate-200 rounded-lg p-3 mt-1" required></textarea>
                </div>
                <button type="submit" className="w-full bg-slate-900 text-white p-4 rounded-lg font-medium hover:bg-slate-800 transition">Kirim</button>
              </form>
              
              <button 
                onClick={() => setShowContactForm(false)}
                className="mt-6 w-full text-slate-400 font-bold text-[10px] uppercase tracking-[0.4em] hover:text-slate-900"
              >
                TUTUP HALAMAN
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Bar */}
      <div className="bg-slate-900 text-white py-2 px-4 text-xs tracking-widest text-center">
        OFFICIAL WEBSITE OF <button onClick={scrollToTop} className="font-bold hover:underline">PT. ELRAFA TERANG SEJAHTERA</button>
      </div>

      {/* Navigation */}
      <nav className="border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={scrollToTop}>
            <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold text-xl">E</div>
            <div>
              <h1 className="font-bold text-xl leading-none tracking-tight">ELRAFA</h1>
              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500">Terang Sejahtera</p>
            </div>
          </div>
          <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-600 items-center">
            <button onClick={onNavigateToProfile} className="hover:text-slate-900 transition outline-none">Tentang Perusahaan</button>
            <button onClick={onNavigateToBusinessUnits} className="hover:text-slate-900 transition flex items-center">Unit Bisnis</button>
            <button onClick={handleCareerClick} className="hover:text-slate-900 transition flex items-center">Karir</button>
            <button onClick={() => scrollToSection('kontak')} className="hover:text-slate-900 transition flex items-center font-bold text-accent">Kontak</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative bg-slate-50 py-32 px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-7xl font-serif font-bold text-slate-900 mb-6 leading-tight">
            Graha <br/> <span className="text-accent">Inovasi & Edukasi</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            PT. Elrafa Terang Sejahtera berkomitmen menghadirkan solusi layanan pendidikan dan pengembangan sumber daya manusia yang berkualitas, terpercaya, dan berdampak positif bagi masyarakat.
          </p>
          <div className="flex justify-center space-x-4">
             <button onClick={onNavigateToProfile} className="bg-slate-900 text-white px-8 py-3 rounded-full font-medium hover:bg-slate-800 transition">Profil Perusahaan</button>
             <button onClick={onNavigateToBusinessUnits} className="bg-white text-slate-900 border border-slate-200 px-8 py-3 rounded-full font-medium hover:bg-slate-50 transition">Unit Bisnis</button>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 opacity-50"></div>
      </header>

      {/* Business Units Preview */}
      <section id="unit-bisnis" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-accent font-bold uppercase tracking-widest text-xs">Portofolio Kami</span>
            <h3 className="text-3xl font-bold text-slate-900 mt-2">Unit Bisnis Strategis</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-xl hover:border-accent/40 transition-all duration-300 cursor-pointer flex flex-col items-start" onClick={onNavigateToDaycare}>
              <div className="w-14 h-14 bg-accent/20 text-primary rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:bg-accent transition-colors">🧸</div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Mannazentrum Daycare</h4>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">Layanan pengasuhan anak usia dini dengan kurikulum holistik berbasis karakter.</p>
              <span className="mt-auto text-accent font-bold text-sm">Lihat Detail →</span>
            </div>

            <div className="group bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-xl hover:border-pink-200 transition-all duration-300 cursor-pointer flex flex-col items-start" onClick={onNavigateToMMStore}>
              <div className="w-14 h-14 bg-pink-100 text-pink-600 rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:bg-pink-600 transition-colors">🎨</div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Malika Maliaki</h4>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">Online store dan kelas kreatif yang menyediakan perlengkapan seni.</p>
              <span className="mt-auto text-pink-600 font-bold text-sm">Lihat Detail →</span>
            </div>

            <div className="group bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-xl hover:border-blue-200 transition-all duration-300 cursor-pointer flex flex-col items-start" onClick={handlePendaftaranClick}>
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:bg-blue-600 transition-colors">🏫</div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Mannazentrum Preschool</h4>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">Pendidikan Kelompok Bermain (KB), K1 dan K2 dengan fokus pada pengembangan karakter.</p>
              <span className="mt-auto text-blue-600 font-bold text-sm">Informasi Pendaftaran</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontak" className="py-24 px-6 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div className="space-y-8 animate-fadeIn">
              <div>
                <span className="text-accent font-bold uppercase tracking-widest text-xs">Hubungi Kami</span>
                <h3 className="text-4xl font-bold text-slate-900 mt-2">Pusat Informasi & <br/> Korespondensi</h3>
                <p className="text-slate-500 mt-4 leading-relaxed">
                  Silakan hubungi kami untuk pertanyaan seputar unit bisnis, kemitraan, atau informasi pendaftaran. Kami siap melayani Anda.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-5 bg-white rounded-3xl shadow-sm border border-slate-100">
                  <span className="text-3xl">📍</span>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm uppercase tracking-tight">Alamat Kantor Pusat</h4>
                    <p className="text-slate-600 text-sm leading-relaxed mt-1">
                      Serpong Garden 1. Cluster Green View. Blok A02 No 12A. Jl Raya Cisauk. Kec: Cisauk. Kab: Tangerang. Banten.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 bg-white rounded-3xl shadow-sm border border-slate-100">
                  <span className="text-3xl">📞</span>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm uppercase tracking-tight">WhatsApp Corporate</h4>
                    <p className="text-slate-600 text-sm mt-1">+62 878-8111-0807</p>
                    <p className="text-slate-600 text-sm mt-1">0811-1889-3389</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-4 p-5 bg-white rounded-3xl shadow-sm border border-slate-100">
                      <span className="text-3xl">✉️</span>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm uppercase tracking-tight">Informasi Umum</h4>
                        <p className="text-slate-600 text-sm mt-1">info@mannazentrum.com</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-5 bg-white rounded-3xl shadow-sm border border-slate-100">
                      <span className="text-3xl">🧸</span>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm uppercase tracking-tight">Daycare</h4>
                        <p className="text-slate-600 text-sm mt-1">daycare@mannazentrum.com</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-5 bg-white rounded-3xl shadow-sm border border-slate-100">
                      <span className="text-3xl">📚</span>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm uppercase tracking-tight">Bimbel</h4>
                        <p className="text-slate-600 text-sm mt-1">bimbel@mannazentrum.com</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-5 bg-white rounded-3xl shadow-sm border border-slate-100">
                      <span className="text-3xl">🎓</span>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm uppercase tracking-tight">PKBM</h4>
                        <p className="text-slate-600 text-sm mt-1">pkbm@mannazentrum.com</p>
                      </div>
                    </div>
                </div>
              </div>
            </div>

            <div className="relative group animate-fadeIn">
              <div className="absolute -inset-4 bg-accent/5 rounded-[60px] blur-2xl group-hover:bg-accent/10 transition"></div>
              <div className="relative bg-white p-2 rounded-[50px] shadow-2xl border border-slate-100 overflow-hidden h-[500px]">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.8116548762744!2d106.6385!3d-6.32!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTknMTIuMCJTIDEwNsKwMzgnMTguNiJF!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid" 
                  className="w-full h-full rounded-[40px]"
                  allowFullScreen={true}
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16 px-6">
        <div className="max-w-7xl auto grid md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h5 className="font-bold text-xl mb-4">PT. Elrafa Terang Sejahtera</h5>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">Membangun ekosistem pendidikan dan kesejahteraan keluarga yang berkelanjutan di Indonesia.</p>
          </div>
          <div>
            <h6 className="font-bold mb-4 text-xs uppercase tracking-widest text-slate-500">Pintasan</h6>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><button onClick={onNavigateToProfile} className="hover:text-white transition">Tentang Kami</button></li>
              <li><button onClick={onNavigateToBusinessUnits} className="hover:text-white transition">Unit Bisnis</button></li>
              <li><button onClick={handleCareerClick} className="hover:text-white transition">Karir</button></li>
            </ul>
          </div>
          <div>
            <h6 className="font-bold mb-4 text-xs uppercase tracking-widest text-slate-500">Bantuan</h6>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><button onClick={() => scrollToSection('kontak')} className="hover:text-white transition">Kontak Kami</button></li>
              <li>Syarat & Ketentuan</li>
              <li>Kebijakan Privasi</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          &copy; 2025 PT. Elrafa Terang Sejahtera. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default CorporateLanding;
