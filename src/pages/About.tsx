import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import FloatingCTA from '../components/FloatingCTA';
import PhotoBadge from '../components/PhotoBadge';
import { Shield, Target, Heart, Award, CheckCircle2, Building, Users } from 'lucide-react';

const About: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 antialiased selection:bg-amber-100 selection:text-slate-900">
      <SEO 
        title="Tentang Kami - Daycare Premium & PAUD Cisauk, Serpong Garden, Citra Garden, BSD & Rumpin | Mannazentrum"
        description="Profil PT. Elrafa Terang Sejahtera & Mannazentrum: Ekosistem Daycare Premium dan Pendidikan Anak Usia Dini (PAUD) terpercaya di Cisauk, Serpong Garden, Citra Garden, BSD & Rumpin."
        canonicalPath="/tentang"
      />

      <Navbar />

      {/* Hero Section Banner */}
      <section className="relative w-full bg-slate-900 text-white">
        <div className="relative w-full aspect-[1024/317] max-h-[480px] overflow-hidden bg-slate-950 flex items-center justify-center">
          <PhotoBadge code="tentang_hero01" position="top-right" />
          <img 
            data-photo-code="tentang_hero01"
            src="/images/tentang_hero01.jpg" 
            alt="Tentang Mannazentrum - Pusat Layanan Pendidikan Usia Dini, Bimbel & Daycare di Cisauk & Rumpin" 
            className="w-full h-full object-cover object-center select-none"
            loading="eager"
          />
        </div>

        {/* Page Main H1 Heading */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-12 pb-16 md:pt-16 md:pb-20 bg-white text-slate-900">
          <span className="text-amber-600 font-semibold uppercase tracking-[0.2em] text-xs block mb-3">
            Tentang Kami
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-light text-slate-900 tracking-tight leading-tight">
            Menjadi Terang & Garam bagi Masyarakat
          </h1>
          <p className="mt-4 text-slate-500 text-base sm:text-lg md:text-xl font-light max-w-3xl leading-relaxed">
            PT. Elrafa Terang Sejahtera memayungi ekosistem terpadu pengasuhan anak usia dini (Mannazentrum Daycare & Preschool), stimulasi seni (Malika Maliaki), serta pembinaan tumbuh kembang generasi penerus bangsa.
          </p>
        </div>
      </section>

      {/* Visi Perusahaan (Warm Ivory Background) */}
      <section className="bg-[#FAF9F5] py-20 md:py-28 px-6 sm:px-10 lg:px-16 border-t border-b border-stone-200/40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-6">
            <div className="relative overflow-hidden shadow-sm bg-white rounded-3xl">
              <PhotoBadge code="tentang_visi01" position="top-left" />
              <img 
                data-photo-code="tentang_visi01"
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=80" 
                alt="Pertemuan Visi dan Misi Perusahaan" 
                className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6 lg:pl-6">
            <span className="text-amber-600 font-semibold uppercase tracking-[0.25em] text-[11px] block">
              Fondasi Filosofi
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-slate-900 tracking-tight leading-tight">
              Visi Luhur Perusahaan
            </h2>
            <div className="space-y-4 text-slate-600 font-light text-base md:text-lg leading-relaxed">
              <p>
                Menjadi lembaga pendidikan dan penyedia kebutuhan keluarga yang sejahtera, lestari, dan beriman. 
              </p>
              <p>
                Visi terbesar kami adalah menjadi <strong className="font-semibold text-slate-900">"terang dan garam"</strong> bagi masyarakat di sekitar Mannazentrum Edukasi, serta menjadi teladan dan pelayan yang tulus bagi masyarakat umum di seluruh Indonesia.
              </p>
            </div>
            
            <div className="pt-4 border-t border-stone-200/60">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Prinsip Pelayanan</p>
              <p className="text-lg font-normal text-slate-800 mt-1 italic">
                "Sejahtera, Lestari, dan Beriman — Mengakar Kuat, Berbuah Berkah."
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Misi & Tiga Pilar Layanan */}
      <section className="bg-white py-20 md:py-28 px-6 sm:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
            <span className="text-amber-600 font-semibold uppercase tracking-[0.2em] text-[11px] block mb-2">Tiga Pilar</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-slate-900 tracking-tight">
              Misi & Komitmen Layanan
            </h2>
            <p className="text-slate-500 font-light text-sm md:text-base mt-3">
              Mewujudkan solusi nyata yang mendukung setiap tahapan kehidupan keluarga.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            
            <div className="flex flex-col bg-slate-50/50 p-6 rounded-3xl border border-slate-100">
              <div className="relative overflow-hidden bg-slate-100 rounded-2xl mb-6">
                <PhotoBadge code="tentang_misi01" position="top-left" />
                <img 
                  data-photo-code="tentang_misi01"
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80" 
                  alt="Pendidikan Holistik PAUD dan Bimbingan Belajar" 
                  className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">1. Pendidikan Holistik</h3>
              <p className="text-slate-500 font-light text-sm leading-relaxed">
                Menyediakan layanan pendidikan anak usia dini (PAUD/Daycare/Preschool) dan bimbingan belajar berkualitas sebagai fondasi madrasah karakter bagi generasi masa depan.
              </p>
            </div>

            <div className="flex flex-col bg-slate-50/50 p-6 rounded-3xl border border-slate-100">
              <div className="relative overflow-hidden bg-slate-100 rounded-2xl mb-6">
                <PhotoBadge code="tentang_misi02" position="top-left" />
                <img 
                  data-photo-code="tentang_misi02"
                  src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80" 
                  alt="Infrastruktur dan Kesejahteraan Keluarga" 
                  className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">2. Kesejahteraan Keluarga</h3>
              <p className="text-slate-500 font-light text-sm leading-relaxed">
                Membantu orang tua bekerja mendapatkan rasa aman dengan sistem penitipan anak yang teruji, higienis, serta bernutrisi gizi seimbang.
              </p>
            </div>

            <div className="flex flex-col bg-slate-50/50 p-6 rounded-3xl border border-slate-100">
              <div className="relative overflow-hidden bg-slate-100 rounded-2xl mb-6">
                <PhotoBadge code="tentang_misi03" position="top-left" />
                <img 
                  data-photo-code="tentang_misi03"
                  src="https://images.unsplash.com/photo-1596464716127-f2a829822391?auto=format&fit=crop&w=800&q=80" 
                  alt="Tumbuh Kembang dan Stimulasi Kreativitas" 
                  className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">3. Tumbuh Kembang Kreatif</h3>
              <p className="text-slate-500 font-light text-sm leading-relaxed">
                Melalui unit Malika Maliaki, menyediakan alat stimulasi sensori motorik, workshop kreasi seni anak, dan mainan edukatif berkualitas.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Nilai Fondasi & Tata Kelola */}
      <section className="bg-[#FAF9F5] py-20 px-6 sm:px-10 lg:px-16 border-t border-stone-200/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-amber-600 font-semibold uppercase tracking-[0.2em] text-[11px] block mb-2">Tata Kelola & Nilai Inti</span>
            <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight">Prinsip Kerja & Integritas Kami</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 text-center">
              <div className="w-12 h-12 bg-amber-50 text-amber-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1">Kasih & Empati</h3>
              <p className="text-xs text-slate-500 font-light leading-relaxed">Memperlakukan setiap anak dengan ketulusan seperti keluarga sendiri.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 text-center">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1">Integritas & Amanah</h3>
              <p className="text-xs text-slate-500 font-light leading-relaxed">Transparansi penuh dalam pelaporan harian dan pengelolaan dana pendaftaran.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 text-center">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1">Profesionalisme</h3>
              <p className="text-xs text-slate-500 font-light leading-relaxed">Pendidik terlatih, tersertifikasi, dan menjalani evaluasi berkala.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 text-center">
              <div className="w-12 h-12 bg-rose-50 text-rose-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1">Mitra Orang Tua</h3>
              <p className="text-xs text-slate-500 font-light leading-relaxed">Komunikasi terbuka dua arah demi kemajuan karakter si kecil.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Statement Quote Section */}
      <section className="bg-slate-900 text-white py-20 px-6 sm:px-12 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="text-amber-400 uppercase tracking-[0.3em] font-semibold text-xs block">
            Komitmen Kami
          </span>
          <p className="text-2xl sm:text-3xl md:text-4xl font-light italic leading-snug">
            "Kami ada untuk melayani, memberi teladan, dan memastikan setiap keluarga Indonesia memiliki akses ke pendidikan anak usia dini yang bermutu tinggi dan penuh kasih."
          </p>
          <div className="w-16 h-0.5 bg-amber-400 mx-auto mt-6"></div>
          <p className="text-slate-400 text-xs tracking-widest uppercase pt-2">
            PT. Elrafa Terang Sejahtera & Mannazentrum Foundation
          </p>
        </div>
      </section>

      <FloatingCTA />
      <Footer />
    </div>
  );
};

export default About;
