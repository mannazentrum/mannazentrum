import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import FloatingCTA from '../components/FloatingCTA';
import PhotoBadge from '../components/PhotoBadge';
import PhotoSlideshow, { PhotoSlideItem } from '../components/PhotoSlideshow';
import { submitContactForm } from '../services/formService';
import { 
  Baby, 
  ShieldCheck, 
  Heart, 
  Utensils, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  Sparkles, 
  Phone,
  HelpCircle,
  Loader2,
  AlertCircle,
  MessageCircle
} from 'lucide-react';

const daycareFacilitySlides: PhotoSlideItem[] = [
  {
    src: '/images/daycare_fasilitas01_1.jpg',
    alt: 'Gedung dan fasad depan Mannazentrum Daycare di Serpong Garden Cisauk',
    title: 'Gedung & Area Depan',
    caption: 'Lingkungan perumahan asri, tertata, tenang, dan aman untuk si kecil di Serpong Garden',
  },
  {
    src: '/images/daycare_fasilitas01_2.jpg',
    alt: 'Plakat identitas resmi Mannazentrum Daycare Green View Blok A2-12A',
    title: 'Identitas Resmi Daycare',
    caption: 'Mannazentrum Daycare: Grow Happy & Healthy Together di Green View Blok A2-12A',
  },
  {
    src: '/images/daycare_fasilitas01_3.jpg',
    alt: 'Teras depan luas berkanopi dan rak sepatu anak Mannazentrum Daycare',
    title: 'Teras & Area Sambutan',
    caption: 'Area beranda bersih terlindung kanopi peneduh dengan gerbang pengaman ganda',
  },
  {
    src: '/images/daycare_fasilitas01_4.jpg',
    alt: 'Area bermain anak dengan rumput sintetis, perosotan kayu pikler, dan alas pelindung',
    title: 'Area Bermain Edukatif',
    caption: 'Fasilitas bermain sensori & motorik ramah anak dengan alas rumput sintetis dan puzzle mat empuk',
  },
  {
    src: '/images/daycare_fasilitas01_5.jpg',
    alt: 'Penyajian menu makan siang higienis 4 bintang dengan sayur segar, lauk ikan, buah potong dan susu',
    title: 'Gizi & Nutrisi Seimbang',
    caption: 'Menu makan siang segar tanpa MSG: gizi 4 bintang lengkap dengan sayur, protein, buah, & susu',
  },
];

const Daycare: React.FC = () => {
  const [showContactForm, setShowContactForm] = useState(false);
  const [showPosterModal, setShowPosterModal] = useState(false);
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
        source: "Halaman Daycare",
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting form: ", error);
      setSubmitError("Terjadi kendala saat mengirimkan pendaftaran. Silakan coba kembali atau hubungi kami langsung via WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const openForm = () => {
    setIsSubmitted(false);
    setSubmitError(null);
    setShowContactForm(true);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 antialiased selection:bg-amber-100 selection:text-slate-900">
      <SEO 
        title="Daycare Premium di Cisauk, Serpong Garden, Citra Garden, BSD & Rumpin | Mannazentrum"
        description="Layanan Daycare Premium anak usia 3 bulan - 4 tahun di Cisauk, Serpong Garden, Citra Garden, BSD & Rumpin. CCTV 24 jam, rasio perawat terpantau, menu gizi 4 bintang, dan stimulasi motorik harian."
        canonicalPath="/daycare"
      />

      <Navbar onOpenContact={openForm} />

      {/* Contact Form Modal */}
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
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 border border-emerald-200">✓</div>
                  <span className="text-emerald-700 font-semibold uppercase tracking-[0.2em] text-[11px] block mb-1">Pendaftaran Terkirim</span>
                  <h3 className="text-2xl font-semibold text-slate-900 tracking-tight mb-2">Terima Kasih, Ayah & Bunda!</h3>
                  <p className="text-slate-600 text-sm leading-relaxed max-w-sm mx-auto">
                    Informasi pendaftaran daycare ananda telah berhasil kami terima. Tim konselor Mannazentrum akan segera menghubungi nomor WhatsApp Anda.
                  </p>
                  <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button 
                      onClick={() => setShowContactForm(false)}
                      className="w-full sm:w-auto bg-slate-900 text-white px-7 py-3 rounded-full text-xs font-semibold hover:bg-slate-800 transition"
                    >
                      Selesai
                    </button>
                    <a
                      href="https://wa.me/6287881110807?text=Halo%20Mannazentrum,%20saya%20sudah%20mendaftar%20di%20halaman%20Daycare%20dan%20ingin%20tanya%20info%20lebih%20lanjut."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-full text-xs font-semibold transition inline-flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Chat WhatsApp Admin</span>
                    </a>
                  </div>
                </div>
              ) : (
                <>
                  <div className="text-center mb-6">
                    <span className="text-amber-600 font-semibold uppercase tracking-[0.2em] text-[10px] block mb-1">Konsultasi & Survei Daycare</span>
                    <h3 className="text-2xl font-normal text-slate-900 tracking-tight">Formulir Pendaftaran Daycare</h3>
                    <p className="text-slate-500 text-xs mt-1">Lengkapi data singkat berikut untuk informasi paket bulanan/harian atau menjadwalkan visit langsung di Cisauk, Serpong Garden, Citra Garden, BSD & Rumpin.</p>
                  </div>

                  {submitError && (
                    <div className="mb-4 p-3.5 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-800 flex items-start gap-2.5 animate-fadeIn">
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-semibold">{submitError}</p>
                        <a
                          href="https://wa.me/6287881110807?text=Halo%20Mannazentrum,%20saya%20ingin%20tanya%20info%20Daycare."
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 text-emerald-700 underline font-medium inline-block"
                        >
                          Hubungi Konselor via WhatsApp (+62 878-8111-0807) &rarr;
                        </a>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
                    <div>
                      <label htmlFor="name" className="block font-medium text-slate-700 text-xs uppercase tracking-wider mb-1">Nama Orang Tua</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        placeholder="Nama Ayah / Bunda" 
                        className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition disabled:bg-slate-50" 
                        disabled={isSubmitting}
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
                        className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition disabled:bg-slate-50" 
                        disabled={isSubmitting}
                        required 
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block font-medium text-slate-700 text-xs uppercase tracking-wider mb-1">Nomor WhatsApp</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        placeholder="Contoh: 08123456789" 
                        className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition disabled:bg-slate-50" 
                        disabled={isSubmitting}
                        required 
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block font-medium text-slate-700 text-xs uppercase tracking-wider mb-1">Usia Bayi / Balita & Pilihan Paket</label>
                      <textarea 
                        id="message" 
                        name="message" 
                        rows={3} 
                        placeholder="Contoh: Balita usia 18 bulan, berminat paket Full-Day di area Cisauk / Serpong Garden..." 
                        className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition disabled:bg-slate-50" 
                        disabled={isSubmitting}
                        required
                      ></textarea>
                    </div>
                    <button 
                      type="submit" 
                      className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-medium text-sm hover:bg-slate-800 active:scale-[0.99] transition flex items-center justify-center gap-2 shadow-sm disabled:opacity-75 disabled:cursor-not-allowed" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                          <span>Sedang Mengirim Data Pendaftaran...</span>
                        </>
                      ) : (
                        <span>Kirim Informasi Pendaftaran</span>
                      )}
                    </button>
                  </form>
                  
                  <button 
                    onClick={() => setShowContactForm(false)}
                    className="mt-5 w-full text-slate-400 font-semibold text-[10px] uppercase tracking-[0.25em] hover:text-slate-900 transition"
                    disabled={isSubmitting}
                  >
                    Batal
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Hero Banner with Photo */}
      <section className="relative w-full overflow-hidden bg-slate-900 text-white">
        <div className="relative w-full h-[360px] md:h-[480px]">
          <PhotoBadge code="daycare_hero01" position="top-right" />
          <img 
            data-photo-code="daycare_hero01"
            src="https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=2000&q=80" 
            alt="Pengasuh Mannazentrum Daycare merawat balita dengan penuh perhatian" 
            className="w-full h-full object-cover opacity-60"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
          
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <span className="text-amber-400 font-semibold uppercase tracking-[0.25em] text-xs mb-3 block">
                Nurturing with Love & Excellence
              </span>
              {/* Primary H1 Heading */}
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight leading-tight mb-4">
                Daycare Premium di Cisauk, Serpong Garden, Citra Garden, BSD & Rumpin
              </h1>
              <p className="text-slate-300 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed mb-8">
                Layanan Daycare Premium anak usia 3 bulan hingga 4 tahun di Serpong Garden Cisauk, Citra Garden, BSD & Rumpin, berfokus pada kasih sayang tulus, gizi seimbang, dan stimulasi kemandirian.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button 
                  onClick={openForm} 
                  className="bg-white text-slate-900 px-7 py-3 rounded-full text-xs font-semibold hover:bg-slate-100 transition shadow-md"
                >
                  Jadwalkan Kunjungan Survei
                </button>
                <a 
                  href="https://wa.me/6287881110807?text=Halo%20Mannazentrum,%20saya%20ingin%20tanya%20jadwal%20dan%20biaya%20Daycare." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-emerald-600 text-white px-7 py-3 rounded-full text-xs font-semibold hover:bg-emerald-500 transition shadow-md flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Chat WhatsApp Konselor</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Layanan Daycare Cards */}
      <section className="py-20 md:py-28 px-6 sm:px-10 lg:px-16 bg-[#FAF9F5] border-b border-stone-200/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-amber-600 font-semibold uppercase tracking-[0.2em] text-[11px] block mb-2">Program Pengasuhan</span>
            <h2 className="text-3xl md:text-4xl font-light text-slate-900 tracking-tight">Pilihan Program Daycare Premium Sesuai Tahapan Usia</h2>
            <p className="text-slate-500 font-light mt-2 text-sm md:text-base">Pengasuhan profesional dengan perhatian personal sesuai perkembangan spesifik si kecil.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col">
              <div className="w-12 h-12 bg-amber-50 text-amber-700 rounded-2xl flex items-center justify-center text-2xl mb-6">🍼</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Infant & Baby Care</h3>
              <p className="text-xs font-semibold text-amber-600 tracking-wider uppercase mb-4">Usia 3 - 18 Bulan</p>
              <p className="text-slate-500 font-light text-sm leading-relaxed mb-6">
                Rasio pengasuh terpantau, stimulasi tummy time, motorik dini, kebersihan botol & peralatan steril, serta pencatatan asupan ASI/MPASI secara harian.
              </p>
              <button onClick={openForm} className="mt-auto text-xs font-semibold text-slate-900 hover:text-amber-700 transition">Konsultasi Paket Bayi →</button>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-700 rounded-2xl flex items-center justify-center text-2xl mb-6">🧸</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Toddler Daycare</h3>
              <p className="text-xs font-semibold text-emerald-600 tracking-wider uppercase mb-4">Usia 1.5 - 3 Tahun</p>
              <p className="text-slate-500 font-light text-sm leading-relaxed mb-6">
                Pembiasaan toilet training, stimulasi sensori motorik halus, sosialisasi teman sebaya, serta menu makan siang sehat dan bernutrisi gizi seimbang.
              </p>
              <button onClick={openForm} className="mt-auto text-xs font-semibold text-slate-900 hover:text-emerald-700 transition">Konsultasi Paket Toddler →</button>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-700 rounded-2xl flex items-center justify-center text-2xl mb-6">🎒</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">After-School & Half Day</h3>
              <p className="text-xs font-semibold text-indigo-600 tracking-wider uppercase mb-4">Usia 3 - 6 Tahun</p>
              <p className="text-slate-500 font-light text-sm leading-relaxed mb-6">
                Penitipan sepulang sekolah atau setengah hari. Termasuk makan siang hangat, istirahat siang nyaman, pendampingan PR ringan, dan aktivitas bermain bebas yang edukatif.
              </p>
              <button onClick={openForm} className="mt-auto text-xs font-semibold text-slate-900 hover:text-indigo-700 transition">Konsultasi Paket Half-Day →</button>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities & Hygiene */}
      <section className="py-20 md:py-28 px-6 sm:px-10 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <PhotoSlideshow 
              slides={daycareFacilitySlides}
              badgeCode="daycare_fasilitas01"
              autoPlayInterval={4500}
            />
          </div>
          <div className="lg:col-span-6 space-y-6 lg:pl-6">
            <span className="text-amber-600 font-semibold uppercase tracking-[0.2em] text-[11px] block">Keamanan & Kenyamanan</span>
            <h2 className="text-3xl md:text-4xl font-light text-slate-900 tracking-tight">Fasilitas Ramah Anak & Higienis Terstandar</h2>
            <p className="text-slate-600 font-light text-base leading-relaxed">
              Kami menyadari bahwa keamanan dan kebersihan adalah prioritas utama setiap orang tua. Di Mannazentrum, seluruh sudut ruang telah dirancang dengan material aman (child-proof) dan disanitasi secara berkala.
            </p>
            <ul className="space-y-3 text-slate-700 font-medium text-sm">
              <li className="flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Area bermain indoor & outdoor berlantai busa pelindung</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Kamar tidur ber-AC dengan sterilisasi UV harian</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Menu makanan dan camilan segar dimasak langsung setiap hari tanpa MSG</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Laporan aktivitas harian terperinci via WhatsApp untuk Ayah & Bunda</span>
              </li>
            </ul>
            <div className="pt-2">
              <button 
                onClick={openForm} 
                className="bg-slate-900 text-white px-7 py-3 rounded-full text-xs font-semibold hover:bg-slate-800 transition"
              >
                Jadwalkan Kunjungan Fisik
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Routine Schedule Table */}
      <section className="py-20 px-6 sm:px-10 lg:px-16 bg-[#FAF9F5] border-t border-b border-stone-200/40">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-amber-600 font-semibold uppercase tracking-[0.2em] text-[11px] block mb-2">Rutinitas Harian</span>
            <h2 className="text-3xl md:text-4xl font-light text-slate-900 tracking-tight">Jadwal Aktivitas Si Kecil di Daycare</h2>
            <p className="text-slate-500 font-light mt-2 text-sm max-w-xl mx-auto">
              Ritme teratur membantu anak merasa aman, tenang, dan terlatih disiplin mandiri sesuai panduan resmi Daily Schedule of Daycare.
            </p>
            <div className="mt-4 flex justify-center">
              <button
                onClick={() => setShowPosterModal(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-stone-200 text-xs font-semibold text-slate-700 hover:text-amber-600 hover:border-amber-300 shadow-sm transition active:scale-95"
              >
                <span>Lihat Poster Jadwal Resmi</span>
                <span className="text-amber-600 font-bold">↗</span>
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {[
              {
                time: '07:00 - 08:00',
                title: 'Menyambut Kedatangan Anak & Mandi Pagi',
                desc: 'Sambutan hangat pengasuh, cek kesehatan & suhu tubuh anak, serta mandi pagi segar untuk anak yang belum mandi dari rumah.'
              },
              {
                time: '07:00 - 09:00',
                title: 'Sarapan (dari Orang Tua)',
                desc: 'Waktu sarapan pagi sehat sesuai bekal bergizi yang dibawakan Ayah & Bunda.'
              },
              {
                time: '09:00 - 09:30',
                title: 'Berjemur 10 Menit & Main Bebas',
                desc: 'Aktivitas berjemur di bawah sinar matahari pagi untuk asupan Vitamin D alami, diikuti bermain bebas santai.'
              },
              {
                time: '09:30 - 11:00',
                title: 'Persiapan Kegiatan (Circle Time) & Toilet Training (Ganti Popok)',
                desc: 'Berdoa, bernyanyi ceria, stimulasi sensori & motorik edukatif, serta toilet training dan penggantian popok bersih.'
              },
              {
                time: '11:00 - 11:30',
                title: 'Cuci Tangan & Snack Buah',
                desc: 'Pembiasaan cuci tangan higienis, dilanjutkan menikmati camilan buah segar potong kaya vitamin.'
              },
              {
                time: '11:30 - 12:45',
                title: 'Cuci Tangan & Makan Siang (Sesi 1 / Infant)',
                desc: (
                  <>
                    <span>Menu makan siang bernutrisi 4 bintang hangat seimbang karbohidrat, protein, sayuran segar, dan buah.</span>
                    <span className="block mt-1 text-slate-600">
                      Makan siang bervariasi setiap hari dan berotasi berkala demi keseimbangan gizi si buah hati.
                    </span>
                  </>
                )
              },
              {
                time: '11:45 - 12:45',
                title: 'Cuci Tangan & Makan Siang (Sesi 2 / Toddler)',
                desc: 'Makan siang mandiri anak balita/toddler didampingi para pengasuh dengan penuh kesabaran dan kehangatan.'
              },
              {
                time: '12:45 - 14:30',
                title: 'Ganti Popok, Pipis, Cuci Kaki & Tangan, Tidur Siang',
                desc: 'Rutinitas higienis sebelum deep nap di ruang tidur steril ber-AC yang sejuk, tenang, dan diiringi alunan musik lembut.'
              },
              {
                time: '14:30 - 15:00',
                title: 'Cuci Tangan & Snack Time : Healthy Food',
                desc: 'Bangun tidur perlahan, cuci tangan, hidrasi air putih, dan menikmati camilan sore sehat bernutrisi.'
              },
              {
                time: '15:00 - 16:00',
                title: 'Mandi Sore',
                desc: 'Mandi sore segar dengan air hangat/bersih, perawatan tubuh anak, dan berganti pakaian sore yang nyaman.'
              },
              {
                time: '16:00 - 17:00',
                title: 'Cuci Tangan & Makan Sore (Sesi 1 / Infant)',
                desc: 'Cuci tangan dan asupan makan sore hangat bernutrisi bagi si kecil sebelum beraktivitas kembali.'
              },
              {
                time: '16:30 - 17:00',
                title: 'Cuci Tangan & Makan Sore (Sesi 2 / Toddler)',
                desc: 'Makan sore bergizi bagi anak balita untuk melengkapi energi sebelum waktu pulang.'
              },
              {
                time: '17:00 - 17:30',
                title: 'Outdoor Playtime & Menunggu Dijemput',
                desc: 'Bermain di area luar yang aman dan menyenangkan, melatih motorik kasar sambil bersiap dijemput.'
              },
              {
                time: '17:30 - 19:00',
                title: 'Bermain Bebas, Waktu Penjemputan Anak',
                desc: 'Aktivitas santai di ruang bermain hingga serah terima kepada orang tua disertai laporan kegiatan harian via WhatsApp.'
              },
            ].map((schedule, i) => (
              <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:shadow-sm transition">
                <div className="flex items-start gap-3">
                  <span className="font-mono text-xs font-semibold px-3 py-1 bg-amber-50 text-amber-800 rounded-full shrink-0 mt-0.5">
                    {schedule.time}
                  </span>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm">{schedule.title}</h3>
                    <div className="text-slate-500 font-light text-xs mt-0.5 leading-relaxed">{schedule.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 sm:px-10 lg:px-16 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-amber-600 font-semibold uppercase tracking-[0.2em] text-[11px] block mb-2">Tanya Jawab</span>
            <h2 className="text-3xl md:text-4xl font-light text-slate-900 tracking-tight">Pertanyaan yang Sering Diajukan</h2>
          </div>

          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-[#FAF9F5] border border-stone-200/50">
              <h3 className="font-semibold text-slate-900 text-base mb-2">Berapa rasio antara pengasuh dan anak di Mannazentrum?</h3>
              <p className="text-slate-600 font-light text-sm leading-relaxed">
                Untuk bayi (infant), rasio maksimal adalah 1:2 hingga 1:3. Untuk balita (toddler), rasionya 1:4 hingga 1:5. Rasio ini menjamin setiap anak mendapatkan perhatian personal dan pengawasan intensif.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF9F5] border border-stone-200/50">
              <h3 className="font-semibold text-slate-900 text-base mb-2">Apakah orang tua dapat membawa ASI perah (ASIP) sendiri?</h3>
              <p className="text-slate-600 font-light text-sm leading-relaxed">
                Tentu. Kami memiliki freezer khusus ASIP dan sistem pemanasan warmer bersuhu standar medis untuk menjaga kualitas nutrisi ASI perah si kecil.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF9F5] border border-stone-200/50">
              <h3 className="font-semibold text-slate-900 text-base mb-2">Bagaimana cara menjadwalkan trial atau kunjungan survei?</h3>
              <p className="text-slate-600 font-light text-sm leading-relaxed">
                Ayah & Bunda cukup mengisi formulir survei di website ini atau langsung menghubungi WhatsApp admin kami di 0878-8111-0807. Kunjungan dibuka setiap hari kerja pukul 09:00 - 15:00.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Bottom Floating WhatsApp & Survey CTA */}
      <FloatingCTA onOpenSurvey={openForm} />

      {/* Schedule Poster Lightbox Modal */}
      {showPosterModal && (
        <div 
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn"
          onClick={() => setShowPosterModal(false)}
        >
          <div 
            className="bg-white rounded-[32px] p-6 max-w-lg w-full shadow-2xl relative my-auto max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Daily Schedule of Daycare
                </span>
              </div>
              <button 
                onClick={() => setShowPosterModal(false)}
                className="w-9 h-9 rounded-full bg-slate-100 text-slate-400 hover:text-slate-900 flex items-center justify-center text-xl transition"
                aria-label="Tutup Poster"
              >
                &times;
              </button>
            </div>

            <div className="relative overflow-auto rounded-2xl border border-slate-100 bg-stone-50 flex items-center justify-center p-2">
              <img 
                src="/images/daily-schedule-daycare.jpg" 
                alt="Poster Resmi Daily Schedule of Daycare MannaZentrum" 
                className="w-full h-auto max-h-[68vh] object-contain rounded-xl shadow-xs"
              />
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400">
              <span>MannaZentrum Daycare Routine Poster</span>
              <button
                onClick={() => setShowPosterModal(false)}
                className="bg-slate-900 text-white px-5 py-2 rounded-full text-xs font-medium hover:bg-slate-800 transition"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer onOpenContact={openForm} />
    </div>
  );
};

export default Daycare;
