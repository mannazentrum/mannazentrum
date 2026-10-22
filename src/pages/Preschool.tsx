import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import FloatingCTA from '../components/FloatingCTA';
import { submitContactForm } from '../services/formService';
import { 
  BookOpen, 
  Sparkles, 
  Heart, 
  GraduationCap, 
  Palette, 
  CheckCircle2, 
  Music, 
  Globe, 
  Phone,
  Calendar
} from 'lucide-react';

const Preschool: React.FC = () => {
  const [showContactForm, setShowContactForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
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

    try {
      await submitContactForm({
        name,
        email,
        phone,
        message,
        source: "Halaman Preschool",
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting form: ", error);
      alert("Terjadi kendala saat mengirimkan pesan. Silakan coba sesaat lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const openForm = () => {
    setIsSubmitted(false);
    setShowContactForm(true);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 antialiased selection:bg-amber-100 selection:text-slate-900">
      <SEO 
        title="Mannazentrum Preschool - Pendidikan Prasekolah & Playgroup Cisauk Tangerang"
        description="Pendidikan anak usia dini berbasis play-based learning, pembentukan karakter mulia, stimulasi sensori, pengenalan literasi & numerasi ceria di Cisauk."
        canonicalPath="/preschool"
      />

      <Navbar onOpenContact={openForm} />

      {/* Modal Pendaftaran Preschool */}
      {showContactForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-slate-900/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
          <div className="bg-white w-full max-w-lg rounded-[36px] shadow-2xl border border-slate-100 overflow-hidden relative my-auto">
            <button 
              onClick={() => setShowContactForm(false)}
              className="absolute top-6 right-6 w-11 h-11 bg-slate-50 text-slate-400 hover:text-slate-900 rounded-full flex items-center justify-center text-2xl transition-all z-10"
              aria-label="Tutup Formulir Pendaftaran"
            >
              &times;
            </button>
            
            <div className="p-8 md:p-10">
              {isSubmitted ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">✓</div>
                  <h3 className="text-2xl font-semibold text-slate-900 tracking-tight mb-2">Terima Kasih Ayah / Bunda!</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">Formulir pendaftaran / trial preschool telah kami terima. Tim konselor kami akan segera menghubungi Ayah / Bunda via WhatsApp.</p>
                  <button 
                    onClick={() => setShowContactForm(false)}
                    className="mt-6 bg-slate-900 text-white px-8 py-2.5 rounded-full text-sm font-medium hover:bg-slate-800 transition"
                  >
                    Tutup
                  </button>
                </div>
              ) : (
                <>
                  <div className="text-center mb-6">
                    <span className="text-amber-600 font-semibold uppercase tracking-[0.2em] text-[10px] block mb-1">Trial & Pendaftaran Siswa</span>
                    <h3 className="text-2xl font-normal text-slate-900 tracking-tight">Formulir Preschool & Playgroup</h3>
                    <p className="text-slate-500 text-xs mt-1">Dapatkan jadwal trial gratis atau informasi biaya kurikulum preschool Mannazentrum.</p>
                  </div>

                  <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
                    <div>
                      <label htmlFor="name" className="block font-medium text-slate-700 text-xs uppercase tracking-wider mb-1">Nama Orang Tua</label>
                      <input type="text" id="name" name="name" placeholder="Nama Ayah / Bunda" className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition" required />
                    </div>
                    <div>
                      <label htmlFor="email" className="block font-medium text-slate-700 text-xs uppercase tracking-wider mb-1">Alamat Email</label>
                      <input type="email" id="email" name="email" placeholder="email@example.com" className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition" required />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block font-medium text-slate-700 text-xs uppercase tracking-wider mb-1">Nomor WhatsApp</label>
                      <input type="tel" id="phone" name="phone" placeholder="Contoh: 08123456789" className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition" required />
                    </div>
                    <div>
                      <label htmlFor="message" className="block font-medium text-slate-700 text-xs uppercase tracking-wider mb-1">Usia Anak & Jenjang Kelas (Playgroup / TK-A / TK-B)</label>
                      <textarea id="message" name="message" rows={3} placeholder="Contoh: Anak usia 3 tahun, ingin mendaftar kelas Playgroup..." className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition" required></textarea>
                    </div>
                    <button type="submit" className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-medium text-sm hover:bg-slate-800 transition" disabled={isSubmitting}>
                      {isSubmitting ? 'Mengirim Data...' : 'Kirim Formulir Konsultasi'}
                    </button>
                  </form>
                  
                  <button 
                    onClick={() => setShowContactForm(false)}
                    className="mt-5 w-full text-slate-400 font-semibold text-[10px] uppercase tracking-[0.25em] hover:text-slate-900 transition"
                  >
                    Batal
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Hero Banner Section */}
      <section className="relative w-full overflow-hidden bg-slate-900 text-white">
        <div className="relative w-full h-[360px] md:h-[480px]">
          <img 
            src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=2000&q=80" 
            alt="Anak-anak preschool belajar interaktif dengan gembira" 
            className="w-full h-full object-cover opacity-60 select-none"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
          
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <span className="text-amber-400 font-semibold uppercase tracking-[0.25em] text-xs mb-3 block">
                Joyful Early Childhood Education
              </span>
              {/* Primary H1 Heading */}
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight leading-tight mb-4">
                Mannazentrum Preschool: Tumbuh Cerdas, Mandiri & Berkarakter
              </h1>
              <p className="text-slate-300 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed mb-8">
                Pendidikan usia dini berkualitas dengan kurikulum holistik yang menggabungkan metode bermain aktif, stimulasi sensori, dan penguatan nilai kasih.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button 
                  onClick={openForm} 
                  className="bg-amber-500 text-white px-7 py-3 rounded-full text-xs font-semibold hover:bg-amber-600 transition shadow-md"
                >
                  Daftar Trial Class Gratis
                </button>
                <a 
                  href="https://wa.me/6287881110807?text=Halo%20Mannazentrum,%20saya%20tertarik%20dengan%20program%20Preschool." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-7 py-3 rounded-full text-xs font-semibold transition shadow-md flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>Konsultasi Program</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Jenjang Kelas Preschool */}
      <section className="py-20 md:py-28 px-6 sm:px-10 lg:px-16 bg-[#FAF9F5] border-b border-stone-200/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-amber-600 font-semibold uppercase tracking-[0.2em] text-[11px] block mb-2">Jenjang Pendidikan</span>
            <h2 className="text-3xl md:text-4xl font-light text-slate-900 tracking-tight">Kelas Sesuai Tahapan Usia & Minat Anak</h2>
            <p className="text-slate-500 font-light mt-2 text-sm md:text-base">Setiap jenjang kelas didampingi oleh dua orang guru dalam rasio kelas yang kecil dan intim.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Playgroup */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col">
              <div className="w-12 h-12 bg-amber-50 text-amber-700 rounded-2xl flex items-center justify-center text-2xl mb-6">🌱</div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">Playgroup (Kelompok Bermain)</h3>
              <p className="text-xs font-semibold text-amber-600 tracking-wider uppercase mb-4">Usia 2 - 3 Tahun</p>
              <p className="text-slate-500 font-light text-sm leading-relaxed mb-6">
                Fokus pada sosialisasi teman sebaya, stimulasi sensori motorik, pengenalan emosi diri, dan kemandirian dasar (toilet training & merapikan mainan).
              </p>
              <button onClick={openForm} className="mt-auto text-xs font-semibold text-slate-900 hover:text-amber-700 transition">Info Kurikulum Playgroup →</button>
            </div>

            {/* Kindergarten A */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-700 rounded-2xl flex items-center justify-center text-2xl mb-6">⭐</div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">Kindergarten A (TK-A)</h3>
              <p className="text-xs font-semibold text-indigo-600 tracking-wider uppercase mb-4">Usia 3 - 4 Tahun</p>
              <p className="text-slate-500 font-light text-sm leading-relaxed mb-6">
                Pengenalan fonik alfabet, konsep berhitung sederhana melalui benda konkrit, bernyanyi lagu dwibahasa, dan eksplorasi sains alamiah yang seru.
              </p>
              <button onClick={openForm} className="mt-auto text-xs font-semibold text-slate-900 hover:text-indigo-700 transition">Info Kurikulum TK-A →</button>
            </div>

            {/* Kindergarten B */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-700 rounded-2xl flex items-center justify-center text-2xl mb-6">🎓</div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">Kindergarten B (TK-B)</h3>
              <p className="text-xs font-semibold text-emerald-600 tracking-wider uppercase mb-4">Usia 4 - 6 Tahun</p>
              <p className="text-slate-500 font-light text-sm leading-relaxed mb-6">
                Kesiapan transisi masuk Sekolah Dasar (SD): literasi mandiri, problem solving, kerja sama tim, presentasi cerita singkat, dan kepemimpinan berkarakter.
              </p>
              <button onClick={openForm} className="mt-auto text-xs font-semibold text-slate-900 hover:text-emerald-700 transition">Info Kurikulum TK-B →</button>
            </div>
          </div>
        </div>
      </section>

      {/* Kurikulum & Pilar Belajar */}
      <section className="py-20 md:py-28 px-6 sm:px-10 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-amber-600 font-semibold uppercase tracking-[0.2em] text-[11px] block mb-2">Metode Pendidikan</span>
            <h2 className="text-3xl md:text-4xl font-light text-slate-900 tracking-tight">4 Pilar Keunggulan Kurikulum Mannazentrum</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-[#FAF9F5] rounded-3xl border border-stone-200/50">
              <Sparkles className="w-8 h-8 text-amber-600 mb-4" />
              <h3 className="font-bold text-slate-900 text-lg mb-2">Play-Based Learning</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Anak belajar secara alami lewat permainan terstruktur tanpa beban hafalan yang memicu stres.
              </p>
            </div>

            <div className="p-6 bg-[#FAF9F5] rounded-3xl border border-stone-200/50">
              <Palette className="w-8 h-8 text-rose-600 mb-4" />
              <h3 className="font-bold text-slate-900 text-lg mb-2">Art & Sensory Workshop</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Bermitra dengan Malika Maliaki untuk menyediakan material melukis dan kriya berkualitas bebas toksik.
              </p>
            </div>

            <div className="p-6 bg-[#FAF9F5] rounded-3xl border border-stone-200/50">
              <Globe className="w-8 h-8 text-indigo-600 mb-4" />
              <h3 className="font-bold text-slate-900 text-lg mb-2">Bilingual Immersion</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Pengenalan kosakata Bahasa Inggris sehari-hari melalui lagu, sapaan pagi, dan cerita bergambar.
              </p>
            </div>

            <div className="p-6 bg-[#FAF9F5] rounded-3xl border border-stone-200/50">
              <Heart className="w-8 h-8 text-emerald-600 mb-4" />
              <h3 className="font-bold text-slate-900 text-lg mb-2">Character First</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Menanamkan sopan santun, empati pada teman, rasa syukur, serta tanggung jawab menjaga lingkungan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bottom Section */}
      <section className="bg-slate-900 text-white py-20 px-6 sm:px-12 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="text-amber-400 uppercase tracking-[0.25em] font-semibold text-xs block">
            Bergabung Bersama Kami
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight">
            Siapkan Fondasi Masa Depan Si Kecil Sejak Dini
          </h2>
          <p className="text-slate-300 text-sm md:text-base font-light max-w-xl mx-auto">
            Daftarkan buah hati Anda untuk mengikuti trial session selama 1 hari dan rasakan hangatnya atmosfer belajar di Mannazentrum Preschool.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <button
              onClick={openForm}
              className="bg-amber-500 text-white px-8 py-3.5 rounded-full text-xs font-semibold hover:bg-amber-600 transition shadow-lg"
            >
              Jadwalkan Trial Class Sekarang
            </button>
            <a
              href="https://wa.me/6287881110807"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 text-white px-8 py-3.5 rounded-full text-xs font-semibold hover:bg-white/20 transition"
            >
              Hubungi via WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Sticky Bottom Floating WhatsApp & Survey CTA */}
      <FloatingCTA onOpenSurvey={openForm} />

      <Footer onOpenContact={openForm} />
    </div>
  );
};

export default Preschool;
