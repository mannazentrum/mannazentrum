import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { Baby, ShoppingBag, BookOpen, Truck, ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react';

const BusinessUnitsPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 antialiased selection:bg-amber-100 selection:text-slate-900">
      <SEO 
        title="Unit Bisnis & Portofolio Layanan - PT. Elrafa Terang Sejahtera"
        description="Jelajahi unit bisnis terintegrasi di bawah naungan PT. Elrafa Terang Sejahtera: Mannazentrum Daycare & Preschool, Malika Maliaki Store, Bimbingan Belajar, dan Jasa Terpadu."
        canonicalPath="/unit-bisnis"
      />

      <Navbar />

      {/* Hero Banner */}
      <section className="relative w-full bg-slate-900 text-white">
        <div className="relative w-full h-[300px] sm:h-[380px] md:h-[450px] overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=2000&q=85" 
            alt="Unit Bisnis dan Portofolio Layanan PT. Elrafa Terang Sejahtera" 
            className="w-full h-full object-cover opacity-60 select-none"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent"></div>

          <div className="absolute top-8 left-6 sm:top-10 sm:left-10 md:top-14 md:left-16 text-white drop-shadow-md select-none">
            <span className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight block">
              PT. Elrafa Terang Sejahtera
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-medium text-white/95 mt-1 block">
              INTEGRATED BUSINESS ECOSYSTEM
            </span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-12 pb-16 md:pt-16 md:pb-20 bg-white text-slate-900">
          <span className="text-amber-600 font-semibold uppercase tracking-[0.2em] text-xs block mb-3">
            Ekosistem Usaha Kami
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-light text-slate-900 tracking-tight leading-tight">
            Unit Bisnis & Portofolio Terpadu
          </h1>
          <p className="mt-4 text-slate-500 text-base sm:text-lg md:text-xl font-light max-w-3xl leading-relaxed">
            Menyinergikan layanan pendidikan usia dini, pengasuhan anak berkualitas, stimulasi kreatif, bimbingan belajar, dan kebutuhan keluarga Indonesia dalam satu tata kelola profesional.
          </p>
        </div>
      </section>

      {/* Units Grid Section */}
      <section className="bg-[#FAF9F5] py-20 px-6 sm:px-10 lg:px-16 border-t border-stone-200/40">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Unit 1: Daycare & Preschool */}
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100 grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-5 overflow-hidden rounded-2xl bg-slate-100 aspect-[4/3]">
              <img 
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80" 
                alt="Mannazentrum Daycare & Preschool" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="md:col-span-7 space-y-4">
              <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider block">Unit Pendidikan Utama</span>
              <h2 className="text-2xl md:text-3xl font-light text-slate-900">
                Mannazentrum Daycare & Preschool
              </h2>
              <p className="text-slate-600 font-light text-sm leading-relaxed">
                Pusat pengasuhan anak usia 3 bulan - 4 tahun dan preschool berkarakter dengan fasilitas aman, kurikulum holistik berbasis bermain (play-based), gizi seimbang, dan pendidik bersertifikasi di Cisauk, Tangerang.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link 
                  to="/daycare"
                  className="bg-slate-900 text-white text-xs px-5 py-2.5 rounded-full font-medium hover:bg-slate-800 transition"
                >
                  Detail Daycare →
                </Link>
                <Link 
                  to="/preschool"
                  className="bg-amber-500 text-white text-xs px-5 py-2.5 rounded-full font-medium hover:bg-amber-600 transition"
                >
                  Detail Preschool →
                </Link>
              </div>
            </div>
          </div>

          {/* Unit 2: Malika Maliaki */}
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100 grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-5 overflow-hidden rounded-2xl bg-slate-100 aspect-[4/3]">
              <img 
                src="https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80" 
                alt="Malika Maliaki Store & Workshop" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="md:col-span-7 space-y-4">
              <span className="text-xs font-semibold text-rose-600 uppercase tracking-wider block">Unit Kreatif & Merchandise</span>
              <h2 className="text-2xl md:text-3xl font-light text-slate-900">
                Malika Maliaki (Creative Store & Art Workshops)
              </h2>
              <p className="text-slate-600 font-light text-sm leading-relaxed">
                Menyediakan perlengkapan stimulasi sensori anak, alat melukis berbahan ramah lingkungan, mainan edukasi kayu tanpa toksin, dan kelas seni akhir pekan untuk mengasah imajinasi si kecil.
              </p>
              <div className="pt-2">
                <Link 
                  to="/toko"
                  className="inline-flex items-center gap-2 bg-slate-900 text-white text-xs px-6 py-2.5 rounded-full font-medium hover:bg-slate-800 transition"
                >
                  <span>Kunjungi Toko Malika Maliaki</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Unit 3: Bimbingan Belajar & PKBM */}
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100 grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-5 overflow-hidden rounded-2xl bg-slate-100 aspect-[4/3]">
              <img 
                src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80" 
                alt="Bimbingan Belajar dan Edukasi Lanjutan" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="md:col-span-7 space-y-4">
              <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider block">Unit Pengembangan Lanjutan</span>
              <h2 className="text-2xl md:text-3xl font-light text-slate-900">
                Bimbingan Belajar & Edukasi Terpadu
              </h2>
              <p className="text-slate-600 font-light text-sm leading-relaxed">
                Mendampingi anak usia sekolah dasar dalam penguatan literasi, numerasi, calistung santai, pendampingan PR harian, serta persiapan akademik dengan suasana yang menyenangkan.
              </p>
              <div className="pt-2">
                <a 
                  href="https://wa.me/6287881110807?text=Halo%20Mannazentrum,%20saya%20ingin%20info%20Bimbingan%20Belajar."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-slate-300 text-slate-800 text-xs px-6 py-2.5 rounded-full font-medium hover:bg-slate-50 transition"
                >
                  <span>Konsultasi Bimbel via WhatsApp</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BusinessUnitsPage;
