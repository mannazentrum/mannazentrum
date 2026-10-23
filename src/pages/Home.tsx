import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import FloatingCTA from '../components/FloatingCTA';
import PhotoBadge from '../components/PhotoBadge';
import { careerList } from '../data/careers';
import { newsArticles } from '../data/newsData';
import { submitContactForm } from '../services/formService';
import { 
  Heart, 
  ShieldCheck, 
  Sparkles, 
  Utensils, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Calendar,
  BookOpen,
  Baby,
  Smile,
  Building2,
  UserCheck,
  Star,
  Award,
  FileCheck2,
  Navigation,
  Car
} from 'lucide-react';

const Home: React.FC = () => {
  const [showCareerNotice, setShowCareerNotice] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedReviewScreenshot, setSelectedReviewScreenshot] = useState<{ src: string; name: string; code: string } | null>(null);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const target = e.target as typeof e.target & {
      name: { value: string };
      email: { value: string };
      phone: { value: string };
      category: { value: string };
      location: { value: string };
      message: { value: string };
    };

    try {
      await submitContactForm({
        name: target.name.value,
        email: target.email.value,
        phone: target.phone.value,
        message: `[Kategori: ${target.category.value} | Lokasi: ${target.location.value}] ${target.message.value}`,
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
        description="Mannazentrum hadir sebagai mitra orang tua dalam mengasuh dan mendidik buah hati dengan penuh kasih sayang. Layanan Daycare, Preschool resmi berizin di Cisauk, Rumpin & sekitarnya."
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
                  <h3 className="text-2xl font-semibold text-slate-900 tracking-tight mb-2">Terima Kasih!</h3>
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
                    <h3 className="text-2xl font-normal text-slate-900 tracking-tight">Informasi, Survei & Kemitraan</h3>
                    <p className="text-slate-500 text-xs mt-1">Lengkapi data berikut untuk pendaftaran anak atau pertanyaan kemitraan korporat.</p>
                  </div>

                  <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
                    <div>
                      <label htmlFor="name" className="block font-medium text-slate-700 text-xs uppercase tracking-wider mb-1">Nama Lengkap</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        placeholder="Nama Ayah / Bunda / Rekan Kemitraan" 
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="category" className="block font-medium text-slate-700 text-xs uppercase tracking-wider mb-1">Kategori Kebutuhan</label>
                        <select 
                          id="category" 
                          name="category" 
                          className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-slate-800 bg-white transition"
                        >
                          <option value="Orang Tua - Daycare">Orang Tua - Daycare</option>
                          <option value="Orang Tua - Preschool">Orang Tua - Preschool</option>
                          <option value="Orang Tua - Survei Lokasi">Orang Tua - Survei Lokasi</option>
                          <option value="Korporat - Kemitraan B2B">Korporat - Kemitraan B2B</option>
                          <option value="Korporat - CSR & Donasi">Korporat - CSR & Donasi</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="location" className="block font-medium text-slate-700 text-xs uppercase tracking-wider mb-1">Pilihan Lokasi / Area</label>
                        <select 
                          id="location" 
                          name="location" 
                          className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-slate-800 bg-white transition"
                        >
                          <option value="Cisauk (Serpong Garden)">Cisauk (Serpong Garden)</option>
                          <option value="Rumpin & Sekitarnya (Bogor)">Rumpin & Sekitarnya (Bogor)</option>
                          <option value="BSD City / Tangerang">BSD City / Tangerang</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block font-medium text-slate-700 text-xs uppercase tracking-wider mb-1">Pesan / Rincian Pertanyaan</label>
                      <textarea 
                        id="message" 
                        name="message" 
                        rows={3} 
                        placeholder="Tuliskan usia anak, paket yang diinginkan, atau proposal kemitraan..." 
                        className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition" 
                        required
                      ></textarea>
                    </div>
                    <button 
                      type="submit" 
                      className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-medium text-sm hover:bg-slate-800 active:scale-[0.99] transition" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Mengirim Data...' : 'Kirim Formulir'}
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
         ======================================================== */}
      <section className="relative w-full bg-white">
        <div className="relative w-full h-[320px] sm:h-[420px] md:h-[520px] lg:h-[600px] overflow-hidden bg-slate-100">
          <PhotoBadge code="beranda_hero01" position="top-right" />
          <img 
            data-photo-code="beranda_hero01"
            src="/images/hero-banner.jpg" 
            alt="Keluarga besar pendidik dan anak-anak ceria Mannazentrum Daycare & Preschool" 
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
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-12 pb-12 md:pt-16 md:pb-16">
          <div className="max-w-4xl">
            <span className="text-amber-600 font-semibold uppercase tracking-[0.2em] text-xs mb-2 block">
              Mitra Terpercaya Tumbuh Kembang Buah Hati
            </span>
            {/* SEO H1 Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-slate-900 tracking-tight leading-none font-sans">
              Show you care.
            </h1>
            <p className="mt-4 sm:mt-5 text-slate-600 text-base sm:text-lg md:text-xl font-light max-w-3xl leading-relaxed">
              Menghadirkan lingkungan pengasuhan dan pendidikan usia dini yang aman, higienis, penuh kasih sayang, serta menumbuhkan kemandirian anak dengan hati di kawasan Cisauk, Rumpin & sekitarnya.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================
          FASE 3: PEMISAHAN ALUR AUDIENS (ORANG TUA MURID VS KORPORAT)
         ======================================================== */}
      <section className="bg-white pb-16 px-6 sm:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-amber-600 font-semibold uppercase tracking-[0.2em] text-xs block mb-2">
              Jalur Kebutuhan
            </span>
            <h2 className="text-3xl md:text-4xl font-light text-slate-900 tracking-tight">
              Pilih Alur Akses Sesuai Kebutuhan Anda
            </h2>
            <p className="text-slate-500 font-light text-sm mt-2">
              Kemudahan navigasi langsung bagi orang tua yang mencari pengasuhan anak maupun mitra bisnis & instansi.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Alur 1: Orang Tua Murid */}
            <div className="bg-amber-50/50 rounded-[32px] p-8 md:p-10 border border-amber-200/70 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-amber-200/30 rounded-bl-full pointer-events-none"></div>
              
              <div>
                <div className="inline-flex items-center gap-2 bg-amber-500 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
                  <UserCheck className="w-4 h-4" />
                  <span>JALUR AYAH & BUNDA</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-light text-slate-900 tracking-tight mb-3">
                  Mencari Daycare & Preschool Ramah Anak?
                </h3>
                
                <p className="text-slate-600 font-light text-sm leading-relaxed mb-6">
                  Solusi penitipan anak profesional untuk orang tua bekerja di wilayah <strong>Cisauk, Serpong Garden, Rumpin & Bogor</strong>. Didukung ruang steril UV, pemantauan CCTV, menu gizi 4 bintang, dan kurikulum sensori motorik ceria.
                </p>

                <div className="space-y-2.5 mb-8 text-xs font-medium text-slate-700">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Layanan Daycare Bayi (3 bln+) & Balita (Toddler)</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Preschool Playgroup & TK dwibahasa (Bilingual)</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Fasilitas Antar-Jemput Siswa Aman (Cisauk - Rumpin)</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-4 border-t border-amber-200/60">
                <Link
                  to="/daycare"
                  className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-5 py-3 rounded-full transition shadow-sm inline-flex items-center gap-2"
                >
                  <Baby className="w-4 h-4" />
                  <span>Program Daycare</span>
                </Link>
                <Link
                  to="/preschool"
                  className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold px-5 py-3 rounded-full transition shadow-sm inline-flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Program Preschool</span>
                </Link>
                <button
                  onClick={openContactModal}
                  className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-xs font-semibold px-5 py-3 rounded-full transition shadow-sm inline-flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-amber-600" />
                  <span>Jadwalkan Survey Lokasi</span>
                </button>
              </div>
            </div>

            {/* Alur 2: Korporat & Kemitraan */}
            <div className="bg-slate-900 text-white rounded-[32px] p-8 md:p-10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-white/5 rounded-bl-full pointer-events-none"></div>

              <div>
                <div className="inline-flex items-center gap-2 bg-white/10 text-amber-400 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 border border-white/15">
                  <Building2 className="w-4 h-4" />
                  <span>JALUR KORPORAT & KEMITRAAN</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-light text-white tracking-tight mb-3">
                  PT. Elrafa Terang Sejahtera
                </h3>
                
                <p className="text-slate-300 font-light text-sm leading-relaxed mb-6">
                  Holding terintegrasi yang menaungi unit pendidikan, yayasan pengasuhan sosial, penyedia perlengkapan tumbuh kembang anak, dan bimbingan belajar terpercaya berbadan hukum resmi.
                </p>

                <div className="space-y-2.5 mb-8 text-xs font-light text-slate-300">
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Legalitas Badan Hukum Resmi (SK Kemenkumham & NIB)</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Program Corporate Daycare & Kemitraan Karyawan B2B</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Penyaluran CSR & Beasiswa Yayasan Pendidikan Anak</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-800">
                <Link
                  to="/tentang"
                  className="bg-white hover:bg-slate-100 text-slate-900 text-xs font-semibold px-6 py-3 rounded-full transition shadow-sm inline-flex items-center gap-2"
                >
                  <span>Profil Perusahaan</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/unit-bisnis"
                  className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold px-6 py-3 rounded-full transition border border-slate-700 inline-flex items-center gap-2"
                >
                  <span>Unit Bisnis Terpadu</span>
                </Link>
                <button
                  onClick={() => setShowCareerNotice(true)}
                  className="text-slate-400 hover:text-white text-xs font-medium px-4 py-3 transition"
                >
                  Karir & Rekrutmen &rarr;
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          FASE 3: SOCIAL PROOF, LEGALITAS & MULTI-LOKASI SECTION
         ======================================================== */}
      <section className="bg-[#FAF9F5] py-20 md:py-28 px-6 sm:px-10 lg:px-16 border-t border-b border-stone-200/50">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-600 font-semibold uppercase tracking-[0.2em] text-xs block mb-2">
              Kepercayaan & Bukti Sosial
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-slate-900 tracking-tight">
              Standar Legalitas Resmi & Kepuasan Orang Tua
            </h2>
            <p className="text-slate-500 font-light text-sm md:text-base mt-3">
              Didirikan dengan kepatuhan hukum penuh, standar fasilitas higienis medis, dan komitmen pelayanan di wilayah Cisauk hingga Rumpin Bogor.
            </p>
          </div>

          {/* Bagian 1: Badges Legalitas & Izin Resmi */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            
            <div className="bg-white p-7 rounded-3xl border border-stone-200/60 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-semibold text-amber-600 uppercase tracking-widest block">Badan Hukum Resmi</span>
                <h3 className="font-bold text-slate-900 text-base mt-0.5">PT. Elrafa Terang Sejahtera</h3>
                <p className="text-xs text-slate-500 font-light mt-1.5 leading-relaxed">
                  Terdaftar di Kemenkumham RI dengan NIB resmi operasional sektor pendidikan anak usia dini dan pengasuhan anak.
                </p>
              </div>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-stone-200/60 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-semibold text-emerald-600 uppercase tracking-widest block">Kualifikasi Pendidik</span>
                <h3 className="font-bold text-slate-900 text-base mt-0.5">Tersertifikasi Basic Life Support</h3>
                <p className="text-xs text-slate-500 font-light mt-1.5 leading-relaxed">
                  Pengasuh dan guru terlatih penanganan pertolongan pertama anak, gizi MPASI, dan pemantauan tumbuh kembang holistik.
                </p>
              </div>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-stone-200/60 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <Navigation className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-semibold text-indigo-600 uppercase tracking-widest block">Cakupan Wilayah</span>
                <h3 className="font-bold text-slate-900 text-base mt-0.5">Cisauk, Rumpin & Sekitar Bogor</h3>
                <p className="text-xs text-slate-500 font-light mt-1.5 leading-relaxed">
                  Pusat fasilitas di Serpong Garden 1 Cisauk, dengan layanan antar-jemput anak aman menjangkau wilayah Rumpin & perbatasan Bogor.
                </p>
              </div>
            </div>

          </div>

          {/* Bagian 2: Testimoni Otentik Orang Tua (Cards Bintang 5) */}
          <div className="mb-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
              <div>
                <span className="text-amber-600 font-semibold uppercase tracking-[0.2em] text-[11px] block">Testimoni Nyata</span>
                <h3 className="text-2xl md:text-3xl font-light text-slate-900 tracking-tight">Apa Kata Orang Tua Murid?</h3>
              </div>
              <div className="flex items-center gap-1.5 bg-white px-4 py-2 rounded-full border border-stone-200 shadow-sm text-xs text-slate-700">
                <div className="flex text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                </div>
                <span className="font-bold ml-1">5.0 / 5.0</span>
                <span className="text-slate-400">(Ulasan Terverifikasi)</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Review 1: yessy leie */}
              <div className="bg-white p-7 rounded-3xl border border-stone-200/60 shadow-sm flex flex-col justify-between hover:shadow-md transition">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#e91e63] text-white font-bold flex items-center justify-center text-lg shadow-sm">
                        y
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 text-sm leading-snug">yessy leie</h4>
                        <p className="text-[11px] text-slate-400">3 reviews &bull; 7 bulan lalu</p>
                      </div>
                    </div>
                    <span className="text-[10px] bg-slate-100 text-slate-600 font-medium px-2 py-0.5 rounded-full">Google Review</span>
                  </div>

                  <div className="flex text-amber-400 mb-3">
                    <Star className="w-4 h-4 fill-amber-400" /><Star className="w-4 h-4 fill-amber-400" /><Star className="w-4 h-4 fill-amber-400" /><Star className="w-4 h-4 fill-amber-400" /><Star className="w-4 h-4 fill-amber-400" />
                  </div>

                  <p className="text-slate-700 font-light text-sm leading-relaxed mb-6">
                    "Miss dan mister di sana baik ,ramah dan telaten. Makanan dan snack yg di siapkan dari sana enak, anak2 suka dan lahap,untuk harga masih terjangkau, activity di sana seru2 utk belajar dan pengalaman anak. Utk kualitas daycare di sana tidak di ragukan lagi TOP BGT lah. Semoga MannaZentrum tambah jaya 🥰👍"
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-emerald-700 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Ulasan Terverifikasi
                  </span>
                  <button
                    onClick={() => setSelectedReviewScreenshot({ src: '/images/reviews/review-yessy.png', name: 'yessy leie', code: 'beranda_review_yessy01' })}
                    className="text-amber-600 hover:text-amber-700 font-semibold text-[11px] hover:underline"
                  >
                    Lihat Bukti Foto ↗
                  </button>
                </div>
              </div>

              {/* Review 2: William Pieter */}
              <div className="bg-white p-7 rounded-3xl border border-stone-200/60 shadow-sm flex flex-col justify-between hover:shadow-md transition">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-900 text-amber-400 font-bold flex items-center justify-center text-xs shadow-sm relative">
                        WP
                        <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-amber-400 text-slate-900 rounded-full flex items-center justify-center text-[8px] font-black">★</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 text-sm leading-snug">William Pieter</h4>
                        <p className="text-[11px] text-slate-400">Local Guide &bull; 26 reviews &bull; 5 bulan lalu</p>
                      </div>
                    </div>
                    <span className="text-[10px] bg-slate-100 text-slate-600 font-medium px-2 py-0.5 rounded-full">Google Review</span>
                  </div>

                  <div className="flex text-amber-400 mb-3">
                    <Star className="w-4 h-4 fill-amber-400" /><Star className="w-4 h-4 fill-amber-400" /><Star className="w-4 h-4 fill-amber-400" /><Star className="w-4 h-4 fill-amber-400" /><Star className="w-4 h-4 fill-amber-400" />
                  </div>

                  <p className="text-slate-700 font-light text-sm leading-relaxed mb-6">
                    "Senang banget ketemu tempat penitipan anak seperti ini. Pengasuhnya ramah dan kelihatan benar-benar sayang sama anak-anak. Anak saya cepat akrab dan setiap pulang selalu kelihatan happy. Tempatnya juga bersih dan nyaman, jadi sebagai orang tua rasanya lebih tenang menitipkan anak di sini. Recommended banget 😊"
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-emerald-700 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Ulasan Terverifikasi
                  </span>
                  <button
                    onClick={() => setSelectedReviewScreenshot({ src: '/images/reviews/review-william.png', name: 'William Pieter', code: 'beranda_review_william01' })}
                    className="text-amber-600 hover:text-amber-700 font-semibold text-[11px] hover:underline"
                  >
                    Lihat Bukti Foto ↗
                  </button>
                </div>
              </div>

              {/* Review 3: Hanna Fidyanti */}
              <div className="bg-white p-7 rounded-3xl border border-stone-200/60 shadow-sm flex flex-col justify-between hover:shadow-md transition">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center text-xs shadow-sm">
                        HF
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 text-sm leading-snug">Hanna Fidyanti</h4>
                        <p className="text-[11px] text-slate-400">6 reviews &bull; 2 photos &bull; 6 bulan lalu</p>
                      </div>
                    </div>
                    <span className="text-[10px] bg-slate-100 text-slate-600 font-medium px-2 py-0.5 rounded-full">Google Review</span>
                  </div>

                  <div className="flex text-amber-400 mb-3">
                    <Star className="w-4 h-4 fill-amber-400" /><Star className="w-4 h-4 fill-amber-400" /><Star className="w-4 h-4 fill-amber-400" /><Star className="w-4 h-4 fill-amber-400" /><Star className="w-4 h-4 fill-amber-400" />
                  </div>

                  <p className="text-slate-700 font-light text-xs leading-relaxed mb-6 space-y-2">
                    <span className="block font-medium text-slate-800">"Sudah hampir 2 tahun kami menitipkan anak kami di sini dari dia umur 3 bulan."</span>
                    <span className="block mt-1">Disini owner dan miss nya sangat baik dan telaten dalam menjaga dan merawat anak kami. Mereka juga sangat terbuka apabila kami memberikan saran atau pesan untuk anak kami.</span>
                    <span className="block mt-1">Disini tidak hanya penitipan, tapi anak kami juga di ajari sensori, agama dan banyak kegiatan lain sehingga dia bisa tumbuh dengan baik. Selain itu setiap bulan nya ada kegiatan outdoor seperti periksa ke dokter gigi, main ke playground.</span>
                    <span className="block mt-1">Selain itu disini juga ada live cctv dan laporan kegiatan setiap hari nya ketika anak kami akan kami jemput pulang. Ini sangat membantu kami sebagai orang tua untuk tetap bisa update dengan kegiatan si kecil. Sukses selalu MannaZentrum Daycare 👍👍"</span>
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-emerald-700 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Ulasan Terverifikasi
                  </span>
                  <button
                    onClick={() => setSelectedReviewScreenshot({ src: '/images/reviews/review-hanna.png', name: 'Hanna Fidyanti', code: 'beranda_review_hanna01' })}
                    className="text-amber-600 hover:text-amber-700 font-semibold text-[11px] hover:underline"
                  >
                    Lihat Bukti Foto ↗
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          SECTION 3: MISSION & PHILOSOPHY (MATCHING TEMPLATE IMAGE 2)
         ======================================================== */}
      <section className="bg-white py-20 md:py-28 px-6 sm:px-10 lg:px-16 border-b border-stone-200/40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-4 sm:gap-6 items-end">
              <div className="pt-12 sm:pt-16">
                <div className="relative overflow-hidden shadow-sm bg-white rounded-2xl">
                  <PhotoBadge code="beranda_filosofi01" position="top-left" />
                  <img 
                    data-photo-code="beranda_filosofi01"
                    src="/images/beranda_filosofi01.jpg" 
                    alt="Tim pengasuh dan pendidik berdedikasi Mannazentrum Daycare" 
                    className="w-full aspect-[3/4] object-cover hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
              </div>
              
              <div className="-mt-8 sm:-mt-12">
                <div className="relative overflow-hidden shadow-sm bg-white rounded-2xl">
                  <PhotoBadge code="beranda_filosofi02" position="top-left" />
                  <img 
                    data-photo-code="beranda_filosofi02"
                    src="/images/beranda_filosofi02.jpg" 
                    alt="Kebersamaan hangat pendidik dan anak-anak di ruang aktivitas Mannazentrum Daycare" 
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
                <span>Pelajari Lebih Lanjut Tentang Kami</span>
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
              <div className="relative overflow-hidden bg-slate-100 rounded-2xl mb-6">
                <PhotoBadge code="beranda_pilar_daycare01" position="top-left" />
                <img 
                  data-photo-code="beranda_pilar_daycare01"
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
                Layanan pengasuhan harian penuh kasih dengan gizi seimbang, toilet training, stimulasi motorik, dan pemantauan tumbuh kembang berkala di Cisauk & Rumpin.
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
              <div className="relative overflow-hidden bg-slate-100 rounded-2xl mb-6">
                <PhotoBadge code="beranda_pilar_preschool01" position="top-left" />
                <img 
                  data-photo-code="beranda_pilar_preschool01"
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
              <div className="relative overflow-hidden bg-slate-100 rounded-2xl mb-6">
                <PhotoBadge code="beranda_pilar_toko01" position="top-left" />
                <img 
                  data-photo-code="beranda_pilar_toko01"
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
          SECTION 6: LATEST NEWS & PARENTING ARTICLES
         ======================================================== */}
      <section className="bg-white py-20 px-6 sm:px-10 lg:px-16 border-t border-slate-100">
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
            {newsArticles.slice(0, 3).map((article, idx) => (
              <article key={article.id} className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group">
                <div className="relative overflow-hidden aspect-[16/10] bg-slate-100">
                  <PhotoBadge code={`beranda_artikel0${idx + 1}`} position="top-left" />
                  <img 
                    data-photo-code={`beranda_artikel0${idx + 1}`}
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



      {/* Review Screenshot Lightbox Modal */}
      {selectedReviewScreenshot && (
        <div 
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedReviewScreenshot(null)}
        >
          <div 
            className="bg-white rounded-[32px] p-6 max-w-lg w-full shadow-2xl relative my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Ulasan Asli Google: {selectedReviewScreenshot.name}
                </span>
              </div>
              <button 
                onClick={() => setSelectedReviewScreenshot(null)}
                className="w-9 h-9 rounded-full bg-slate-100 text-slate-400 hover:text-slate-900 flex items-center justify-center text-xl transition"
                aria-label="Tutup Screenshot"
              >
                &times;
              </button>
            </div>
            
            <div className="relative overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 flex items-center justify-center">
              <PhotoBadge code={selectedReviewScreenshot.code} position="top-left" />
              <img 
                data-photo-code={selectedReviewScreenshot.code}
                src={selectedReviewScreenshot.src} 
                alt={`Screenshot Ulasan Google ${selectedReviewScreenshot.name}`} 
                className="w-full h-auto max-h-[70vh] object-contain shadow-inner"
              />
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400">
              <span>Google Maps Verified Review ⭐ 5.0</span>
              <button
                onClick={() => setSelectedReviewScreenshot(null)}
                className="bg-slate-900 text-white px-5 py-2 rounded-full text-xs font-medium hover:bg-slate-800 transition"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Bottom Floating WhatsApp & Survey CTA */}
      <FloatingCTA onOpenSurvey={openContactModal} />

      <Footer onOpenContact={openContactModal} />
    </div>
  );
};

export default Home;
