import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { careerList } from '../data/careers';
import { newsArticles } from '../data/newsData';
import { submitContactForm } from '../services/formService';
import { 
  Heart, 
  ShieldCheck, 
  Sparkles, 
  Utensils, 
  Clock, 
  MapPin, 
  Phone, 
  ArrowRight, 
  CheckCircle2, 
  Calendar,
  BookOpen,
  Baby,
  Smile
} from 'lucide-react';

const Home: React.FC = () => {
  const [showCareerNotice, setShowCareerNotice] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
        source: "Beranda Utama",
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting form: ", error);
      alert("Terjadi kendala saat mengirimkan pesan. Silakan coba sesaat lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const openContactModal = () => {
    setIsSubmitted(false);
    setShowContactForm(true);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 antialiased selection:bg-amber-100 selection:text-slate-900">
      <SEO 
        title="Mannazentrum - Daycare, Preschool & Sahabat Tumbuh Kembang Buah Hati" 
        description="Mannazentrum hadir sebagai mitra orang tua dalam mengasuh dan mendidik buah hati dengan penuh kasih sayang. Daycare, Preschool, dan Ekosistem Pendidikan Terpercaya di Tangerang."
        canonicalPath="/"
      />

      <Navbar onOpenContact={openContactModal} />

      {/* Career Page / Modal */}
      {showCareerNotice && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-slate-900/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
          <div className="bg-white w-full max-w-4xl rounded-[40px] shadow-2xl border border-slate-100 overflow-hidden relative my-auto">
            <button 
              onClick={() => setShowCareerNotice(false)}
              className="absolute top-6 right-6 w-11 h-11 bg-slate-50 text-slate-400 hover:text-slate-900 rounded-full flex items-center justify-center text-2xl transition-all z-10"
              aria-label="Tutup Modal Karir"
            >
              &times;
            </button>
            
            <div className="p-8 md:p-14">
              <div className="text-center mb-10">
                <span className="text-amber-600 font-semibold uppercase tracking-[0.25em] text-[11px] mb-2 block">Join Our Team</span>
                <h3 className="text-3xl md:text-4xl font-normal text-slate-900 tracking-tight mb-3">Kesempatan Berkarir</h3>
                <p className="text-slate-500 font-light max-w-lg mx-auto text-sm leading-relaxed">
                  Bergabunglah bersama kami membangun generasi masa depan yang berkarakter, mandiri, dan berdaya saing di unit-unit usaha kami.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                {careerList.map((job, idx) => (
                  <div key={idx} className="bg-slate-50/70 p-5 rounded-2xl border border-slate-100 flex items-center gap-4 group hover:bg-white hover:border-amber-300 hover:shadow-lg transition-all">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl shadow-sm group-hover:scale-105 transition-transform">{job.icon}</div>
                    <div>
                      <h4 className="font-semibold text-slate-900 text-base leading-snug">{job.title}</h4>
                      <p className="text-xs font-medium text-amber-600 tracking-wider uppercase mt-0.5">{job.unit}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-slate-900 p-8 rounded-3xl text-center text-white space-y-4">
                <h4 className="font-medium text-lg tracking-tight">Informasi Kontak Rekrutmen</h4>
                <p className="text-slate-400 text-xs leading-relaxed">Kirimkan resume & portofolio Anda langsung ke kontak resmi kami:</p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2">
                   <div className="bg-white/10 px-5 py-2.5 rounded-full border border-white/15 text-xs font-mono">
                     <span className="text-amber-400 mr-2">✉</span> mannazentruminfo@gmail.com
                   </div>
                   <div className="bg-white/10 px-5 py-2.5 rounded-full border border-white/15 text-xs font-mono">
                     <span className="text-emerald-400 mr-2">💬</span> WA HRD: +62 878-7838-4807
                   </div>
                </div>
                <p className="text-[10px] text-slate-500 italic mt-3 tracking-wider">* Hanya melayani pesan tertulis selama jam kerja operasional</p>
              </div>
              
              <button 
                onClick={() => setShowCareerNotice(false)}
                className="mt-8 w-full text-slate-400 font-semibold text-[11px] uppercase tracking-[0.3em] hover:text-slate-900 transition"
              >
                Tutup Halaman
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact & Registration Modal */}
      {showContactForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-slate-900/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
          <div className="bg-white w-full max-w-lg rounded-[36px] shadow-2xl border border-slate-100 overflow-hidden relative my-auto">
            <button 
              onClick={() => setShowContactForm(false)}
              className="absolute top-6 right-6 w-11 h-11 bg-slate-50 text-slate-400 hover:text-slate-900 rounded-full flex items-center justify-center text-2xl transition-all z-10"
              aria-label="Tutup Formulir Kontak"
            >
              &times;
            </button>
            
            <div className="p-8 md:p-10">
              {isSubmitted ? (
                 <div className="text-center py-10">
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">✓</div>
                  <h3 className="text-2xl font-semibold text-slate-900 tracking-tight mb-2">Terima Kasih Ayah / Bunda!</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">Pesan dan informasi Anda telah kami terima. Tim konselor Mannazentrum akan segera menghubungi Anda melalui WhatsApp.</p>
                  <button 
                    onClick={() => setShowContactForm(false)}
                    className="mt-6 bg-slate-900 text-white px-8 py-2.5 rounded-full text-sm font-medium hover:bg-slate-800 transition"
                  >
                    Selesai
                  </button>
                </div>
              ) : (
                <>
                  <div className="text-center mb-6">
                    <span className="text-amber-600 font-semibold uppercase tracking-[0.2em] text-[10px] block mb-1">Konsultasi & Survei</span>
                    <h3 className="text-2xl font-normal text-slate-900 tracking-tight">Informasi & Pendaftaran</h3>
                    <p className="text-slate-500 text-xs mt-1">Lengkapi data singkat berikut untuk konsultasi program atau menjadwalkan kunjungan lokasi.</p>
                  </div>

                  <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
                    <div>
                      <label htmlFor="name" className="block font-medium text-slate-700 text-xs uppercase tracking-wider mb-1">Nama Orang Tua</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        placeholder="Nama Ayah / Bunda" 
                        className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition" 
                        required 
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block font-medium text-slate-700 text-xs uppercase tracking-wider mb-1">Alamat Email</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        placeholder="email@example.com" 
                        className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition" 
                        required 
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block font-medium text-slate-700 text-xs uppercase tracking-wider mb-1">Nomor WhatsApp Aktif</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        placeholder="Contoh: 08123456789" 
                        className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition" 
                        required 
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block font-medium text-slate-700 text-xs uppercase tracking-wider mb-1">Program yang Diminati / Pertanyaan</label>
                      <textarea 
                        id="message" 
                        name="message" 
                        rows={3} 
                        placeholder="Contoh: Ingin info Daycare balita usia 2 tahun & jadwal kunjungan..." 
                        className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition" 
                        required
                      ></textarea>
                    </div>
                    <button 
                      type="submit" 
                      className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-medium text-sm hover:bg-slate-800 active:scale-[0.99] transition" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Mengirim Data...' : 'Kirim Informasi Konsultasi'}
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

      {/* ========================================================
          HERO BANNER (MATCHING TEMPLATE IMAGE 1)
          - Full-width panoramic photo banner
          - Overlay branding
          - Main Page H1 Heading: Clean, parent-friendly & SEO-optimized
         ======================================================== */}
      <section className="relative w-full bg-white">
        <div className="relative w-full h-[320px] sm:h-[420px] md:h-[520px] lg:h-[600px] overflow-hidden bg-slate-100">
          <img 
            src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=2000&q=85" 
            alt="Pendidik dan anak-anak Mannazentrum belajar balok kayu dengan gembira" 
            className="w-full h-full object-cover object-center select-none"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-transparent pointer-events-none"></div>

          <div className="absolute top-8 left-6 sm:top-10 sm:left-10 md:top-14 md:left-16 text-white drop-shadow-md select-none">
            <span className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white leading-tight block">
              Mannazentrum
            </span>
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-medium text-white/95 mt-0.5">
              CHILDREN'S FOUNDATION & DAYCARE
            </p>
          </div>
        </div>

        {/* Headline section below the photo banner */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-12 pb-14 md:pt-16 md:pb-20">
          <div className="max-w-4xl">
            <span className="text-amber-600 font-semibold uppercase tracking-[0.2em] text-xs mb-2 block">
              Mitra Terpercaya Tumbuh Kembang Buah Hati
            </span>
            {/* SEO H1 Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-slate-900 tracking-tight leading-none font-sans">
              Show you care.
            </h1>
            <p className="mt-4 sm:mt-5 text-slate-600 text-base sm:text-lg md:text-xl font-light max-w-3xl leading-relaxed">
              Menghadirkan lingkungan pengasuhan dan pendidikan usia dini yang aman, higienis, penuh kasih sayang, serta menumbuhkan kemandirian anak dengan hati.
            </p>

            {/* Quick Action Badges */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/daycare"
                className="bg-slate-900 text-white text-xs md:text-sm px-6 py-3 rounded-full font-medium hover:bg-slate-800 transition shadow-sm inline-flex items-center gap-2"
              >
                <Baby className="w-4 h-4" />
                <span>Eksplorasi Daycare</span>
              </Link>
              <Link
                to="/preschool"
                className="bg-amber-500 text-white text-xs md:text-sm px-6 py-3 rounded-full font-medium hover:bg-amber-600 transition shadow-sm inline-flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>Program Preschool</span>
              </Link>
              <button
                onClick={openContactModal}
                className="border border-slate-300 text-slate-800 text-xs md:text-sm px-6 py-3 rounded-full font-medium hover:bg-slate-50 transition inline-flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Jadwalkan Kunjungan Survei</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 2: PARENT ASSURANCE PILLARS
         ======================================================== */}
      <section className="bg-amber-50/40 py-12 px-6 sm:px-10 lg:px-16 border-y border-amber-100/60">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-amber-200/50 flex items-center justify-center text-amber-600 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 text-sm">CCTV & Keamanan 24/7</h4>
              <p className="text-xs text-slate-500 font-light mt-0.5">Area tertutup & aman dipantau</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-amber-200/50 flex items-center justify-center text-emerald-600 shrink-0">
              <Utensils className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 text-sm">Menu Gizi 4 Bintang</h4>
              <p className="text-xs text-slate-500 font-light mt-0.5">Higienis tanpa MSG sintetis</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-amber-200/50 flex items-center justify-center text-indigo-600 shrink-0">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 text-sm">Rasio Terpantau</h4>
              <p className="text-xs text-slate-500 font-light mt-0.5">One-on-one baby & caregiver</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-amber-200/50 flex items-center justify-center text-rose-600 shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 text-sm">Sensori & Seni Kreatif</h4>
              <p className="text-xs text-slate-500 font-light mt-0.5">Didukung Malika Maliaki</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 3: MISSION & PHILOSOPHY (MATCHING TEMPLATE IMAGE 2)
         ======================================================== */}
      <section className="bg-[#FAF9F5] py-20 md:py-28 px-6 sm:px-10 lg:px-16 border-b border-stone-200/40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-4 sm:gap-6 items-end">
              <div className="pt-12 sm:pt-16">
                <div className="overflow-hidden shadow-sm bg-white rounded-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=700&q=80" 
                    alt="Anak-anak belajar dan berinteraksi di meja belajar ruang kelas" 
                    className="w-full aspect-[3/4] object-cover hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
              </div>
              
              <div className="-mt-8 sm:-mt-12">
                <div className="overflow-hidden shadow-sm bg-white rounded-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1596464716127-f2a829822391?auto=format&fit=crop&w=700&q=80" 
                    alt="Anak melakukan kegiatan kreasi dan stimulasi sensorik" 
                    className="w-full aspect-[3/4] object-cover hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6 lg:pl-6">
            <span className="text-amber-600 font-semibold uppercase tracking-[0.2em] text-xs block">
              Filosofi Pengasuhan Kami
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-slate-900 tracking-tight leading-tight">
              The path to global change begins with a single child
            </h2>
            <div className="space-y-4 text-slate-600 font-light text-base md:text-lg leading-relaxed">
              <p>
                Setiap anak adalah anugerah tak ternilai. Mannazentrum Children's Foundation hadir mendampingi orang tua bekerja dengan memberikan perlindungan, stimulasi motorik, dan pendidikan holistik sejak usia dini.
              </p>
              <p>
                Kami menciptakan ruang tumbuh yang hangat, higienis, serta dibimbing oleh para pengasuh dan pendidik bersertifikasi yang mengasuh dengan empati dan ketulusan hati.
              </p>
            </div>
            <div className="pt-2">
              <Link 
                to="/tentang"
                className="inline-flex items-center text-sm font-semibold text-slate-900 hover:text-amber-700 transition group"
              >
                <span>Pelajari Profil PT. Elrafa Terang Sejahtera</span>
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          SECTION 4: 3 PROGRAM PILARS (MATCHING TEMPLATE IMAGE 3)
         ======================================================== */}
      <section className="bg-white py-20 md:py-28 px-6 sm:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
            <span className="text-amber-600 font-semibold uppercase tracking-[0.2em] text-xs block mb-2">
              Layanan Unggulan
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-slate-900 tracking-tight">
              Program Pendidikan & Pengasuhan
            </h2>
            <p className="text-slate-500 font-light text-sm md:text-base mt-3">
              Tiga pilar layanan terpadu untuk memfasilitasi masa emas (golden age) buah hati tercinta.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            
            {/* Column 1: Daycare */}
            <div className="group flex flex-col bg-slate-50/50 p-6 rounded-3xl border border-slate-100 hover:shadow-xl transition-all">
              <div className="overflow-hidden bg-slate-100 rounded-2xl mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?auto=format&fit=crop&w=800&q=80" 
                  alt="Mannazentrum Daycare Bayi & Toddler" 
                  className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-1">Usia 3 Bln - 4 Thn</span>
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-amber-700 transition">
                Mannazentrum Daycare
              </h3>
              <p className="text-slate-500 font-light text-sm leading-relaxed mb-6">
                Layanan pengasuhan harian penuh kasih dengan gizi seimbang, toilet training, stimulasi motorik, dan pemantauan tumbuh kembang berkala.
              </p>
              <div className="mt-auto">
                <Link 
                  to="/daycare"
                  className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-slate-900 hover:text-amber-700"
                >
                  Lihat Fasilitas & Biaya Daycare &rarr;
                </Link>
              </div>
            </div>

            {/* Column 2: Preschool */}
            <div className="group flex flex-col bg-slate-50/50 p-6 rounded-3xl border border-slate-100 hover:shadow-xl transition-all">
              <div className="overflow-hidden bg-slate-100 rounded-2xl mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80" 
                  alt="Mannazentrum Preschool & Playgroup" 
                  className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">Usia 2 - 6 Thn</span>
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-700 transition">
                Preschool & Playgroup
              </h3>
              <p className="text-slate-500 font-light text-sm leading-relaxed mb-6">
                Kelas stimulasi prasekolah berbasis rasa ingin tahu, pembentukan karakter mandiri, pengenalan bahasa, dan eksplorasi sensori ceria.
              </p>
              <div className="mt-auto">
                <Link 
                  to="/preschool"
                  className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-slate-900 hover:text-indigo-700"
                >
                  Kurikulum & Jenjang Kelas &rarr;
                </Link>
              </div>
            </div>

            {/* Column 3: Malika Maliaki */}
            <div className="group flex flex-col bg-slate-50/50 p-6 rounded-3xl border border-slate-100 hover:shadow-xl transition-all">
              <div className="overflow-hidden bg-slate-100 rounded-2xl mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80" 
                  alt="Malika Maliaki Store & Creative Art" 
                  className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <span className="text-xs font-semibold text-rose-600 uppercase tracking-wider mb-1">Eksplorasi Seni</span>
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-rose-700 transition">
                Malika Maliaki Store
              </h3>
              <p className="text-slate-500 font-light text-sm leading-relaxed mb-6">
                Toko perlengkapan stimulasi anak, mainan edukasi kayu ramah lingkungan, kit melukis kreatif, dan workshop kreasi akhir pekan.
              </p>
              <div className="mt-auto">
                <Link 
                  to="/toko"
                  className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-slate-900 hover:text-rose-700"
                >
                  Kunjungi Malika Maliaki &rarr;
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 5: TESTIMONIALS (MATCHING TEMPLATE IMAGE 4)
         ======================================================== */}
      <section className="bg-[#FAF9F5] py-20 md:py-28 px-6 sm:px-10 lg:px-16 border-t border-b border-stone-200/40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-6">
            <div className="overflow-hidden shadow-sm bg-white rounded-3xl">
              <img 
                src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1200&q=80" 
                alt="Pendidik tersenyum bersama anak-anak saat belajar bermain balok" 
                className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-8 lg:pl-4">
            <span className="text-amber-600 font-semibold uppercase tracking-[0.2em] text-xs block">
              Cerita Dari Keluarga Kami
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-slate-900 tracking-tight leading-tight">
              See what our parents and educators have to say
            </h2>

            <div className="space-y-3 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <p className="text-slate-600 font-light italic text-base leading-relaxed">
                "Sebagai ibu yang bekerja di BSD, menitipkan anak di Mannazentrum memberikan rasa tenang luar biasa. Pengasuhnya telaten, laporan harian jelas, dan anak saya tumbuh sangat mandiri dan ceria."
              </p>
              <div className="flex items-center gap-2 pt-1">
                <span className="font-bold text-slate-900 text-sm">Helene P.</span>
                <span className="text-slate-400 text-xs">— Bunda dari Rayyan (Toddler Daycare sejak 2024)</span>
              </div>
            </div>

            <div className="space-y-3 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <p className="text-slate-600 font-light italic text-base leading-relaxed">
                "Kurikulum preschool di sini sangat ramah anak. Anak tidak dipaksa menghafal kaku, melainkan distimulasi lewat sensory play dan rasa ingin tahu. Kemampuan sosialnya berkembang pesat."
              </p>
              <div className="flex items-center gap-2 pt-1">
                <span className="font-bold text-slate-900 text-sm">Shawn G.</span>
                <span className="text-slate-400 text-xs">— Ayah dari Chloe (Preschool Kelas Kindy)</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          SECTION 6: LATEST NEWS & PARENTING ARTICLES
         ======================================================== */}
      <section className="bg-white py-20 md:py-28 px-6 sm:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
            <div>
              <span className="text-amber-600 font-semibold uppercase tracking-[0.2em] text-xs block mb-2">
                Wawasan & Kabar Kegiatan
              </span>
              <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight">
                Tips Parenting & Artikel Terbaru
              </h2>
            </div>
            <Link 
              to="/berita" 
              className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 hover:text-amber-700 transition"
            >
              <span>Lihat Semua Artikel</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newsArticles.slice(0, 3).map((article) => (
              <article key={article.id} className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group">
                <div className="overflow-hidden aspect-[16/10] bg-slate-100">
                  <img 
                    src={article.imageUrl} 
                    alt={article.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                    <span className="bg-amber-50 text-amber-800 font-medium px-2.5 py-1 rounded-full">{article.category}</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg leading-snug mb-3 group-hover:text-amber-600 transition">
                    <Link to="/berita">{article.title}</Link>
                  </h3>
                  <p className="text-slate-500 font-light text-sm line-clamp-2 mb-6">
                    {article.summary}
                  </p>
                  <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                    <span>{article.date}</span>
                    <Link to="/berita" className="text-slate-900 font-semibold hover:text-amber-600">
                      Baca Selengkapnya →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 7: CONTACT & LOCATION MAP
         ======================================================== */}
      <section id="kontak" className="py-20 md:py-28 px-6 sm:px-10 lg:px-16 bg-[#FAF9F5] border-t border-stone-200/40">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
            
            <div className="space-y-8">
              <div>
                <span className="text-amber-600 font-semibold uppercase tracking-[0.2em] text-[11px] block mb-2">Pusat Informasi</span>
                <h2 className="text-3xl md:text-4xl font-light text-slate-900 tracking-tight">Kunjungi & Konsultasikan Buah Hati Anda</h2>
                <p className="text-slate-500 font-light mt-3 leading-relaxed text-sm md:text-base">
                  Tim konselor Mannazentrum siap menjawab pertanyaan seputar program daycare bayi, toddler, preschool, serta memfasilitasi survei lokasi langsung.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-5 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-amber-600 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-slate-900 text-xs uppercase tracking-wider">Alamat Fasilitas & Kantor</h4>
                    <p className="text-slate-600 text-sm leading-relaxed mt-1 font-light">
                      Serpong Garden 1, Cluster Green View, Blok A02 No 12A, Jl Raya Cisauk, Kec. Cisauk, Kab. Tangerang, Banten.
                    </p>
                  </div>
                </div>

                <div className="p-5 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4">
                  <Phone className="w-6 h-6 text-emerald-600 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-slate-900 text-xs uppercase tracking-wider">Layanan Konsultasi WhatsApp</h4>
                    <div className="flex flex-wrap gap-4 mt-1">
                      <a 
                        href="https://wa.me/6287881110807?text=Halo%20Mannazentrum,%20saya%20ingin%20tanya%20informasi%20layanan%20Daycare%20/%20Preschool." 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-slate-800 text-sm font-medium hover:text-emerald-600 transition flex items-center gap-1.5"
                      >
                        +62 878-8111-0807 (Konselor) ↗
                      </a>
                    </div>
                  </div>
                </div>

                <div className="p-5 bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-wrap gap-3">
                  <button
                    onClick={openContactModal}
                    className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-xs font-medium hover:bg-slate-800 transition"
                  >
                    Formulir Survei Lokasi
                  </button>
                  <button
                    onClick={() => setShowCareerNotice(true)}
                    className="border border-slate-300 text-slate-700 px-6 py-2.5 rounded-full text-xs font-medium hover:bg-slate-50 transition"
                  >
                    Info Karir Pendidik
                  </button>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white p-2 rounded-3xl shadow-lg border border-slate-100 overflow-hidden h-[460px]">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.8116548762744!2d106.6385!3d-6.32!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTknMTIuMCJTIDEwNsKwMzgnMTguNiJF!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid" 
                  className="w-full h-full rounded-2xl border-0"
                  allowFullScreen={true}
                  loading="lazy"
                  title="Lokasi Mannazentrum Serpong Garden Cisauk"
                ></iframe>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Floating Fast Action WhatsApp Button */}
      <a 
        href="https://wa.me/6287881110807?text=Halo%20Mannazentrum,%20saya%20ingin%20konsultasi%20mengenai%20Daycare%20/%20Preschool."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white p-3.5 rounded-full shadow-2xl hover:bg-emerald-500 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group"
        aria-label="Chat WhatsApp Langsung"
      >
        <span className="text-xl">💬</span>
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-semibold pr-1">
          Chat WhatsApp
        </span>
      </a>

      <Footer onOpenContact={openContactModal} />
    </div>
  );
};

export default Home;
