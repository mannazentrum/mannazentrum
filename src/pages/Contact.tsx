import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import FloatingCTA from '../components/FloatingCTA';
import PhotoBadge from '../components/PhotoBadge';
import { careerList } from '../data/careers';
import { submitContactForm } from '../services/formService';
import { 
  MapPin, 
  Phone, 
  Clock, 
  ExternalLink, 
  Calendar, 
  Car, 
  Train, 
  CheckCircle2, 
  Mail, 
  Sparkles,
  Send,
  Building2,
  Navigation,
  Loader2,
  AlertCircle
} from 'lucide-react';

const GOOGLE_MAPS_SEARCH_URL = "https://www.google.com/maps/search/?api=1&query=-6.327342509230009,106.63988146193053";
const GOOGLE_MAPS_EMBED_URL = "https://maps.google.com/maps?q=-6.327342509230009,106.63988146193053&t=&z=17&ie=UTF8&iwloc=&output=embed";

const Contact: React.FC = () => {
  const [showCareerNotice, setShowCareerNotice] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    const target = e.target as typeof e.target & {
      name: { value: string };
      email: { value: string };
      phone: { value: string };
      category: { value: string };
      location: { value: string };
      preferredDate: { value: string };
      message: { value: string };
    };

    try {
      await submitContactForm({
        name: target.name.value,
        email: target.email.value || 'info@mannazentrum.com',
        phone: target.phone.value,
        message: `[Kategori: ${target.category.value} | Lokasi: ${target.location.value} | Rencana Tanggal: ${target.preferredDate.value || '-'}] ${target.message.value}`,
        source: 'Halaman Pusat Informasi',
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form: ', error);
      setSubmitError('Terjadi kendala saat mengirimkan pesan. Silakan hubungi kami langsung via WhatsApp untuk respon cepat.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSurveyForm = () => {
    const el = document.getElementById('formulir-survei');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 antialiased selection:bg-amber-100 selection:text-slate-900">
      <SEO 
        title="Kontak & Lokasi Daycare Premium di Cisauk, Serpong Garden, Citra Garden, BSD & Rumpin | Mannazentrum" 
        description="Kunjungi fasilitas Daycare Premium dan Preschool Mannazentrum di Serpong Garden Cisauk, Citra Garden, BSD & Rumpin. Panduan Google Maps, jadwal survei lokasi, dan formulir konsultasi pendaftaran."
        canonicalPath="/contact"
      />

      <Navbar onOpenContact={scrollToSurveyForm} />

      {/* Career Notice Modal */}
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
                  Bergabunglah bersama kami membangun generasi masa depan yang berkarakter, mandiri, dan berdaya saing di unit-unit usaha Mannazentrum.
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

      {/* Hero Header */}
      <section className="relative w-full bg-slate-900 text-white">
        <div className="relative w-full h-[260px] sm:h-[340px] md:h-[400px] overflow-hidden">
          <PhotoBadge code="contact_hero01" position="top-right" />
          <img 
            data-photo-code="contact_hero01"
            src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=2000&q=85" 
            alt="Pusat Informasi dan Lokasi Mannazentrum Cisauk" 
            className="w-full h-full object-cover opacity-50 select-none"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent"></div>

          <div className="absolute top-8 left-6 sm:top-10 sm:left-10 md:top-14 md:left-16 text-white drop-shadow-md select-none">
            <span className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight block">
              Mannazentrum
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-medium text-amber-300 mt-1 block">
              PUSAT INFORMASI & GOOGLE LOCATION
            </span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-10 pb-12 md:pt-14 md:pb-16 bg-white text-slate-900">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mb-3 uppercase tracking-wider font-medium">
            <Link to="/" className="hover:text-amber-600 transition">Beranda</Link>
            <span>/</span>
            <span className="text-amber-600 font-semibold">Pusat Informasi & Lokasi</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-slate-900 tracking-tight leading-tight">
            Pusat Informasi & Lokasi: Daycare Premium di Cisauk, Serpong Garden, Citra Garden, BSD & Rumpin
          </h1>
          <p className="mt-3 text-slate-500 text-sm sm:text-base md:text-lg font-light max-w-3xl leading-relaxed">
            Temukan lokasi resmi Mannazentrum di Serpong Garden Cisauk, panduan rute navigasi, kontak layanan konselor, serta formulir pendaftaran dan survei langsung fasilitas buah hati Anda.
          </p>
        </div>
      </section>

      {/* ========================================================
          MAIN SECTION: CONTACT & GOOGLE LOCATION MAP
          (Directly matching user's attached design)
         ======================================================== */}
      <section className="py-12 md:py-20 px-6 sm:px-10 lg:px-16 bg-[#FAF9F5] border-t border-b border-stone-200/40">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
            
            {/* Left Column: Info Cards & Action Buttons */}
            <div className="space-y-6 md:space-y-8">
              <div>
                <span className="text-amber-600 font-semibold uppercase tracking-[0.2em] text-[11px] block mb-2">
                  Pusat Informasi
                </span>
                <h2 className="text-3xl md:text-4xl font-light text-slate-900 tracking-tight">
                  Kunjungi & Konsultasikan Buah Hati Anda
                </h2>
                <p className="text-slate-500 font-light mt-3 leading-relaxed text-sm md:text-base">
                  Tim konselor Mannazentrum siap menjawab pertanyaan seputar program daycare bayi, toddler, preschool, serta memfasilitasi survei lokasi langsung di Serpong Garden Cisauk atau area layanan Rumpin Bogor.
                </p>
              </div>

              <div className="space-y-4">
                {/* Alamat Fasilitas */}
                <div className="p-5 sm:p-6 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4 hover:shadow-md transition">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-900 text-xs uppercase tracking-wider">
                      ALAMAT FASILITAS & KANTOR
                    </h4>
                    <p className="text-slate-600 text-sm leading-relaxed mt-1 font-light">
                      Serpong Garden 1, Cluster Green View, Blok A02 No 12A, Jl Raya Cisauk, Kec. Cisauk, Kab. Tangerang, Banten (Dekat BSD City & Rumpin).
                    </p>
                    <a 
                      href={GOOGLE_MAPS_SEARCH_URL}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-2.5 text-xs font-semibold text-amber-700 hover:text-amber-800 transition"
                    >
                      <span>Buka Petunjuk Arah di Google Maps</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Layanan Konsultasi WhatsApp */}
                <div className="p-5 sm:p-6 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4 hover:shadow-md transition">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-900 text-xs uppercase tracking-wider">
                      LAYANAN KONSULTASI WHATSAPP
                    </h4>
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
                    <p className="text-[11px] text-slate-400 mt-1">Layanan respon cepat Senin - Sabtu (07.00 - 18.00 WIB)</p>
                  </div>
                </div>

                {/* Jam Operasional */}
                <div className="p-5 sm:p-6 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4 hover:shadow-md transition">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-5 h-5 text-sky-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-900 text-xs uppercase tracking-wider">
                      JAM OPERASIONAL & PENERIMAAN
                    </h4>
                    <div className="mt-1 space-y-0.5 text-xs text-slate-600 font-light">
                      <p><strong className="font-medium text-slate-800">Senin – Jumat:</strong> 07.00 – 18.00 WIB</p>
                      <p><strong className="font-medium text-slate-800">Sabtu:</strong> Sesuai Perjanjian Survei Lokasi</p>
                      <p><strong className="font-medium text-slate-800">Minggu & Libur Nasional:</strong> Tutup</p>
                    </div>
                  </div>
                </div>

                {/* Buttons Matching Screenshot */}
                <div className="p-5 bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-wrap gap-3">
                  <button
                    onClick={scrollToSurveyForm}
                    className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-xs font-medium hover:bg-slate-800 transition active:scale-95 shadow-sm"
                  >
                    Formulir Survei Lokasi
                  </button>
                  <button
                    onClick={() => setShowCareerNotice(true)}
                    className="border border-slate-300 text-slate-700 px-6 py-2.5 rounded-full text-xs font-medium hover:bg-slate-50 transition active:scale-95"
                  >
                    Info Karir Pendidik
                  </button>
                  <a
                    href="https://wa.me/6287881110807?text=Halo%20Mannazentrum,%20saya%20ingin%20konsultasi%20langsung."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-5 py-2.5 rounded-full text-xs font-medium hover:bg-emerald-100 transition"
                  >
                    Chat Konselor ↗
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Google Map Card with Open in Maps button */}
            <div className="relative sticky top-28">
              <div className="bg-white p-2 sm:p-3 rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden">
                {/* Floating "Open in Maps" Button Overlay (like in original Google Maps preview) */}
                <div className="relative h-[440px] sm:h-[500px] w-full rounded-2xl overflow-hidden">
                  <div className="absolute top-3 left-3 z-20">
                    <a
                      href={GOOGLE_MAPS_SEARCH_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/95 backdrop-blur-md text-blue-600 hover:text-blue-700 text-xs font-medium px-3.5 py-2 rounded-lg shadow-md border border-slate-200 flex items-center gap-1.5 hover:bg-white transition"
                    >
                      <span>Open in Maps</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <iframe 
                    src={GOOGLE_MAPS_EMBED_URL} 
                    className="w-full h-full border-0 rounded-2xl"
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Lokasi Google Maps Mannazentrum Serpong Garden Cisauk"
                  ></iframe>
                </div>

                {/* Footnote under map */}
                <div className="px-4 py-3 bg-slate-50 rounded-2xl mt-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>Mannazentrum Daycare: -6.32734, 106.63988 (Cluster Green View)</span>
                  </div>
                  <a 
                    href={GOOGLE_MAPS_SEARCH_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-600 hover:text-amber-700 font-medium inline-flex items-center gap-1"
                  >
                    <span>Navigasi GPS Sekarang</span>
                    <span>&rarr;</span>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          ACCESSIBILITY & TRANSPORT GUIDE
         ======================================================== */}
      <section className="py-16 md:py-24 px-6 sm:px-10 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-amber-600 font-semibold uppercase tracking-[0.2em] text-[11px] block mb-2">
              Aksesibilitas Wilayah
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-slate-900 tracking-tight">
              Panduan Rute Menuju Mannazentrum
            </h2>
            <p className="text-slate-500 font-light mt-2 text-sm md:text-base">
              Lokasi strategis berada di kawasan Serpong Garden Cisauk dengan akses mudah via transportasi umum maupun jalan utama.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#FAF9F5] p-6 rounded-3xl border border-stone-200/50 space-y-3">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-amber-600 shadow-sm">
                <Train className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-slate-900 text-base">Via KRL Commuter Line</h3>
              <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-light">
                Hanya <strong>5 - 7 menit</strong> dari Stasiun KRL Cisauk dan Pasar Modern Intermoda BSD City. Sangat nyaman bagi orang tua pekerja komuter Jakarta - BSD - Cisauk.
              </p>
            </div>

            <div className="bg-[#FAF9F5] p-6 rounded-3xl border border-stone-200/50 space-y-3">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm">
                <Car className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-slate-900 text-base">Via Tol & Kendaraan Pribadi</h3>
              <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-light">
                Dekat dari Gerbang Tol Serbaraja (Serpong - Balaraja) dan Jalan Boulevard BSD Utama. Lingkungan cluster one-gate system dengan keamanan 24 jam.
              </p>
            </div>

            <div className="bg-[#FAF9F5] p-6 rounded-3xl border border-stone-200/50 space-y-3">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-sky-600 shadow-sm">
                <Navigation className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-slate-900 text-base">Jangkauan Area Rumpin & Sekitarnya</h3>
              <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-light">
                Melayani keluarga di wilayah Cisauk, Suradita, Rumpin Bogor, Cicangkal, Cibogo, dan BSD Selatan dengan fleksibilitas jadwal antar-jemput.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          ONLINE SURVEY & CONSULTATION FORM SECTION
         ======================================================== */}
      <section id="formulir-survei" className="py-16 md:py-24 px-6 sm:px-10 lg:px-16 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-10">
            <span className="text-amber-400 font-semibold uppercase tracking-[0.25em] text-[11px] mb-2 block">
              Formulir Kunjungan & Survei Lokasi
            </span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white">
              Jadwalkan Kunjungan Buah Hati Anda
            </h2>
            <p className="text-slate-400 font-light max-w-xl mx-auto text-sm leading-relaxed mt-2">
              Ingin melihat langsung ruang stimulasi, higienitas, dan berbincang dengan tim pendidik kami? Silakan lengkapi formulir di bawah ini.
            </p>
          </div>

          <div className="bg-white text-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
            {isSubmitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center text-2xl mx-auto border border-emerald-200">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <span className="text-emerald-700 font-semibold uppercase tracking-[0.2em] text-[11px] block">
                  Permintaan Terkirim
                </span>
                <h3 className="text-2xl font-semibold text-slate-900 tracking-tight">Terima Kasih Banyak, Ayah & Bunda!</h3>
                <p className="text-slate-600 text-sm leading-relaxed max-w-md mx-auto">
                  Permintaan survei dan konsultasi Anda telah berhasil kami simpan. Konselor Mannazentrum akan segera menghubungi Anda via WhatsApp untuk konfirmasi waktu visit.
                </p>
                <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => { setIsSubmitted(false); setSubmitError(null); }}
                    className="w-full sm:w-auto bg-slate-900 text-white px-7 py-2.5 rounded-full text-xs font-semibold hover:bg-slate-800 transition"
                  >
                    Kirim Formulir Lain
                  </button>
                  <a
                    href="https://wa.me/6287881110807?text=Halo%20Mannazentrum,%20saya%20sudah%20mengirimkan%20formulir%20survei%20lokasi."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 text-white px-6 py-2.5 rounded-full text-xs font-medium hover:bg-emerald-700 transition shadow-sm"
                  >
                    <span>Konfirmasi Cepat via WhatsApp &rarr;</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                {submitError && (
                  <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-800 flex items-start gap-2.5 animate-fadeIn">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-semibold">{submitError}</p>
                      <a
                        href="https://wa.me/6287881110807?text=Halo%20Mannazentrum,%20saya%20ingin%20tanya%20info%20jadwal%20survei."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 text-emerald-700 underline font-medium inline-block"
                      >
                        Hubungi Konselor via WhatsApp (+62 878-8111-0807) &rarr;
                      </a>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="form-name" className="block font-medium text-slate-700 text-xs uppercase tracking-wider mb-1">
                      Nama Orang Tua / Wali *
                    </label>
                    <input 
                      type="text" 
                      id="form-name" 
                      name="name" 
                      placeholder="Contoh: Bunda Sarah / Ayah Dimas" 
                      className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition disabled:bg-slate-50" 
                      disabled={isSubmitting}
                      required 
                    />
                  </div>

                  <div>
                    <label htmlFor="form-phone" className="block font-medium text-slate-700 text-xs uppercase tracking-wider mb-1">
                      Nomor WhatsApp Aktif *
                    </label>
                    <input 
                      type="tel" 
                      id="form-phone" 
                      name="phone" 
                      placeholder="08123456789" 
                      className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition disabled:bg-slate-50" 
                      disabled={isSubmitting}
                      required 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="form-email" className="block font-medium text-slate-700 text-xs uppercase tracking-wider mb-1">
                      Alamat Email (Opsional)
                    </label>
                    <input 
                      type="email" 
                      id="form-email" 
                      name="email" 
                      placeholder="email@example.com" 
                      className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition disabled:bg-slate-50" 
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label htmlFor="form-category" className="block font-medium text-slate-700 text-xs uppercase tracking-wider mb-1">
                      Program yang Diminati *
                    </label>
                    <select 
                      id="form-category" 
                      name="category" 
                      className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-slate-800 bg-white transition disabled:bg-slate-50"
                      disabled={isSubmitting}
                    >
                      <option value="Daycare Bayi (3 - 18 Bulan)">Daycare Bayi (3 - 18 Bulan)</option>
                      <option value="Daycare Toddler (1.5 - 3 Tahun)">Daycare Toddler (1.5 - 3 Tahun)</option>
                      <option value="Preschool & Playgroup">Preschool & Playgroup</option>
                      <option value="Survei Lokasi & Fasilitas Saja">Survei Lokasi & Fasilitas Saja</option>
                      <option value="Kemitraan Korporat & CSR">Kemitraan Korporat & CSR</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="form-location" className="block font-medium text-slate-700 text-xs uppercase tracking-wider mb-1">
                      Pilihan Wilayah / Cabang *
                    </label>
                    <select 
                      id="form-location" 
                      name="location" 
                      className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-slate-800 bg-white transition disabled:bg-slate-50"
                      disabled={isSubmitting}
                    >
                      <option value="Cisauk (Serpong Garden 1)">Cisauk (Serpong Garden 1)</option>
                      <option value="Citra Garden Serpong">Citra Garden Serpong</option>
                      <option value="Area Sekitar BSD City">Area Sekitar BSD City</option>
                      <option value="Layanan Area Rumpin Bogor">Layanan Area Rumpin Bogor</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="form-date" className="block font-medium text-slate-700 text-xs uppercase tracking-wider mb-1">
                      Rencana Tanggal Survei (Opsional)
                    </label>
                    <input 
                      type="date" 
                      id="form-date" 
                      name="preferredDate" 
                      className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition bg-white disabled:bg-slate-50" 
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="form-message" className="block font-medium text-slate-700 text-xs uppercase tracking-wider mb-1">
                    Catatan / Usia Anak / Kebutuhan Khusus
                  </label>
                  <textarea 
                    id="form-message" 
                    name="message" 
                    rows={3} 
                    placeholder="Contoh: Usia anak 20 bulan, berencana masuk bulan depan, mohon info rincian biaya..." 
                    className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition disabled:bg-slate-50" 
                    disabled={isSubmitting}
                    required
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-medium text-sm hover:bg-slate-800 active:scale-[0.99] transition shadow-md flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                      <span>Sedang Mengirim Data Formulir...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-amber-400" />
                      <span>Kirim Permintaan Survei & Konsultasi</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Floating CTA Buttons */}
      <FloatingCTA onOpenSurvey={scrollToSurveyForm} />

      {/* Footer */}
      <Footer onOpenContact={scrollToSurveyForm} />
    </div>
  );
};

export default Contact;
