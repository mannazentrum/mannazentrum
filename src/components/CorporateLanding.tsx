import React, { useState } from 'react';
import { careerList } from '../data/careers';
import { submitContactForm } from '../services/formService';

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
        source: "Corporate Landing",
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting form: ", error);
      alert("Terjadi kendala saat mengirimkan pesan. Silakan coba sesaat lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleCareerClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowCareerNotice(true);
    setShowContactForm(false);
  };

  const handlePendaftaranClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowCareerNotice(false);
    setIsSubmitted(false);
    setShowContactForm(true);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 antialiased selection:bg-amber-100 selection:text-slate-900">
      
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
                <h2 className="text-3xl md:text-4xl font-normal text-slate-900 tracking-tight mb-3">Kesempatan Berkarir</h2>
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
                  <h2 className="text-2xl font-semibold text-slate-900 tracking-tight mb-2">Terima Kasih!</h2>
                  <p className="text-slate-500 text-sm leading-relaxed">Pesan dan informasi Anda telah kami terima. Tim konselor Mannazentrum akan segera menghubungi Anda melalui WhatsApp atau Email.</p>
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
                    <span className="text-amber-600 font-semibold uppercase tracking-[0.2em] text-[10px] block mb-1">Hubungi Kami</span>
                    <h2 className="text-2xl font-normal text-slate-900 tracking-tight">Informasi & Pendaftaran</h2>
                    <p className="text-slate-500 text-xs mt-1">Silakan lengkapi data singkat berikut untuk konsultasi atau survei lokasi.</p>
                  </div>

                  <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
                    <div>
                      <label htmlFor="name" className="block font-medium text-slate-700 text-xs uppercase tracking-wider mb-1">Nama Lengkap</label>
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
                      <label htmlFor="phone" className="block font-medium text-slate-700 text-xs uppercase tracking-wider mb-1">Nomor WhatsApp</label>
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
                      <label htmlFor="message" className="block font-medium text-slate-700 text-xs uppercase tracking-wider mb-1">Pertanyaan / Unit Layanan</label>
                      <textarea 
                        id="message" 
                        name="message" 
                        rows={3} 
                        placeholder="Saya ingin bertanya mengenai pendaftaran Daycare / Preschool / survei..." 
                        className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition" 
                        required
                      ></textarea>
                    </div>
                    <button 
                      type="submit" 
                      className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-medium text-sm hover:bg-slate-800 active:scale-[0.99] transition" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Mengirim Data...' : 'Kirim Informasi'}
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

      {/* Modern Editorial Header / Navigation */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-slate-100 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex justify-between items-center">
          {/* Logo Brand */}
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={scrollToTop}>
            <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold text-lg group-hover:bg-slate-800 transition">
              M
            </div>
            <div>
              <div className="font-semibold text-base md:text-lg text-slate-900 leading-none tracking-tight">Mannazentrum</div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400 mt-0.5">PT. Elrafa Terang Sejahtera</p>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="hidden lg:flex items-center space-x-8 text-sm font-normal text-slate-600">
            <button onClick={scrollToTop} className="hover:text-slate-900 transition font-medium text-slate-900">Beranda</button>
            <button onClick={onNavigateToProfile} className="hover:text-slate-900 transition">Tentang Kami</button>
            <button onClick={onNavigateToBusinessUnits} className="hover:text-slate-900 transition">Unit Bisnis</button>
            <button onClick={onNavigateToDaycare} className="hover:text-slate-900 transition">Daycare</button>
            <button onClick={onNavigateToMMStore} className="hover:text-slate-900 transition">Malika Maliaki</button>
            <button onClick={handleCareerClick} className="hover:text-slate-900 transition">Karir</button>
            <button onClick={() => scrollToSection('kontak')} className="hover:text-slate-900 transition">Kontak</button>
          </nav>

          {/* Direct CTA */}
          <div className="flex items-center space-x-3">
            <button 
              onClick={handlePendaftaranClick}
              className="bg-slate-900 text-white text-xs md:text-sm px-5 py-2.5 rounded-full font-medium hover:bg-slate-800 transition active:scale-95 shadow-sm"
            >
              Hubungi Kami
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================
          SECTION 1 (HERO BANNER - MATCHING TEMPLATE IMAGE 1)
          - Full-width panoramic hero image with children & caregiver
          - Upper-left white text: "Lily River / CHILDREN'S FOUNDATION"
          - Below the image: Large clean minimalist "Show you care."
         ======================================================== */}
      <section className="relative w-full bg-white">
        {/* Full-width photo container */}
        <div className="relative w-full h-[320px] sm:h-[420px] md:h-[520px] lg:h-[620px] overflow-hidden bg-slate-100">
          <img 
            src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=2000&q=85" 
            alt="Children and educator playing and learning with wooden blocks" 
            className="w-full h-full object-cover object-center select-none"
            loading="eager"
          />
          {/* Subtle gradient overlay to guarantee text legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none"></div>

          {/* Logo overlay on top-left of image (Matching Template Image 1: 'Lily River / CHILDREN'S FOUNDATION') */}
          <div className="absolute top-8 left-6 sm:top-10 sm:left-10 md:top-14 md:left-16 text-white drop-shadow-md select-none">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white leading-tight">
              Mannazentrum
            </h2>
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-medium text-white/95 mt-0.5">
              CHILDREN'S FOUNDATION & DAYCARE
            </p>
          </div>
        </div>

        {/* Headline section below the photo banner (Matching Template Image 1: 'Show you care.') */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-12 pb-16 md:pt-16 md:pb-24">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-slate-900 tracking-tight leading-none font-sans">
            Show you care.
          </h1>
          <p className="mt-4 sm:mt-5 text-slate-500 text-base sm:text-lg md:text-xl font-light max-w-2xl leading-relaxed">
            Menghadirkan lingkungan pengasuhan dan pendidikan anak usia dini yang aman, penuh kasih, dan menumbuhkan karakter mulia sejak dini.
          </p>
        </div>
      </section>

      {/* ========================================================
          SECTION 2 (MATCHING TEMPLATE IMAGE 2)
          - Background: Warm ivory (#FAF9F5)
          - Left: 2 staggered/offset photos (lower left, upper right)
          - Right: "The path to global change begins with a single child"
         ======================================================== */}
      <section className="bg-[#FAF9F5] py-20 md:py-28 px-6 sm:px-10 lg:px-16 border-t border-b border-stone-200/40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: 2 Staggered Offset Photos */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-4 sm:gap-6 items-end">
              {/* Lower left photo (children around curved classroom table) */}
              <div className="pt-12 sm:pt-16">
                <div className="overflow-hidden shadow-sm bg-white">
                  <img 
                    src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=700&q=80" 
                    alt="Anak-anak belajar dan berinteraksi di meja belajar ruang kelas" 
                    className="w-full aspect-[3/4] object-cover hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
              </div>
              
              {/* Higher right photo (child focused on craft/sensory play) */}
              <div className="-mt-8 sm:-mt-12">
                <div className="overflow-hidden shadow-sm bg-white">
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

          {/* Right Column: Mission Text */}
          <div className="lg:col-span-6 space-y-6 lg:pl-6">
            <h2 className="text-2xl md:text-3xl font-light text-slate-900 tracking-tight leading-tight">
              The path to global change begins with a single child
            </h2>
            <div className="space-y-4 text-slate-600 font-light text-base md:text-lg leading-relaxed">
              <p>
                Sadly, not every kid grows up in a positive environment. The Mannazentrum Children's Foundation is committed to helping the most vulnerable children, providing them with protection, education, and support.
              </p>
              <p>
                Setiap anak adalah anugerah tak ternilai yang berhak mendapatkan ruang bertumbuh yang hangat, higienis, serta dibimbing oleh para pengasuh dan pendidik yang penuh empati.
              </p>
              <p className="text-slate-800 font-normal">
                We are committed to transforming their lives because we know that it will change the world we live in.
              </p>
            </div>
            <div className="pt-2">
              <button 
                onClick={onNavigateToProfile}
                className="inline-flex items-center text-sm font-medium text-slate-900 hover:text-amber-700 transition group"
              >
                <span>Pelajari Visi & Komitmen Kami</span>
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          SECTION 3 (MATCHING TEMPLATE IMAGE 3)
          - Background: Pure White
          - Centered Headline: "How to make a difference"
          - 3 Columns: "Sponsor a child", "Volunteer your time", "Go the extra mile"
         ======================================================== */}
      <section className="bg-white py-20 md:py-28 px-6 sm:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Centered Heading */}
          <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-slate-900 tracking-tight">
              How to make a difference
            </h2>
            <p className="text-slate-500 font-light text-sm md:text-base mt-3">
              Tiga pilar layanan kami untuk menghadirkan masa depan yang lebih cerah bagi si kecil.
            </p>
          </div>

          {/* 3 Columns Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            
            {/* Column 1: Sponsor a child / Daycare */}
            <div className="group cursor-pointer flex flex-col" onClick={onNavigateToDaycare}>
              <div className="overflow-hidden bg-slate-100 mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?auto=format&fit=crop&w=800&q=80" 
                  alt="Sponsor a child - Mannazentrum Daycare" 
                  className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-amber-700 transition">
                Sponsor a child
              </h3>
              <p className="text-slate-500 font-light text-sm leading-relaxed mb-4">
                We provide holistic daycare and loving care to nurture children's physical, emotional, and social development with balanced daily nutrition.
              </p>
              <div className="mt-auto">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-900 group-hover:underline">
                  Lihat Program Daycare &rarr;
                </span>
              </div>
            </div>

            {/* Column 2: Volunteer your time / Preschool */}
            <div className="group cursor-pointer flex flex-col" onClick={handlePendaftaranClick}>
              <div className="overflow-hidden bg-slate-100 mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80" 
                  alt="Volunteer your time - Preschool and Playgroup" 
                  className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-amber-700 transition">
                Volunteer your time
              </h3>
              <p className="text-slate-500 font-light text-sm leading-relaxed mb-4">
                We organize character-building preschool classes, learning discovery camps, and early education that empower kids with confidence.
              </p>
              <div className="mt-auto">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-900 group-hover:underline">
                  Informasi Preschool &rarr;
                </span>
              </div>
            </div>

            {/* Column 3: Go the extra mile / Malika Maliaki & Creative Arts */}
            <div className="group cursor-pointer flex flex-col" onClick={onNavigateToMMStore}>
              <div className="overflow-hidden bg-slate-100 mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80" 
                  alt="Go the extra mile - Malika Maliaki and Creative Art" 
                  className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-amber-700 transition">
                Go the extra mile
              </h3>
              <p className="text-slate-500 font-light text-sm leading-relaxed mb-4">
                We foster creative workshops, sensory art materials, and active exploration through our specialized Malika Maliaki store.
              </p>
              <div className="mt-auto">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-900 group-hover:underline">
                  Kunjungi Malika Maliaki &rarr;
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 4 (MATCHING TEMPLATE IMAGE 4)
          - Background: Warm ivory (#FAF9F5)
          - Left: Single large photo of caregiver and children playing blocks
          - Right: "See what our sponsors and volunteers have to say" + Quotes
         ======================================================== */}
      <section className="bg-[#FAF9F5] py-20 md:py-28 px-6 sm:px-10 lg:px-16 border-t border-b border-stone-200/40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Photo of caregiver playing with children at the table */}
          <div className="lg:col-span-6">
            <div className="overflow-hidden shadow-sm bg-white">
              <img 
                src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1200&q=80" 
                alt="Teacher and smiling kids playing with wooden blocks at table" 
                className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Column: Heading & Testimonials */}
          <div className="lg:col-span-6 space-y-8 lg:pl-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-slate-900 tracking-tight leading-tight">
              See what our sponsors and volunteers have to say
            </h2>

            {/* Quote 1 */}
            <div className="space-y-2">
              <p className="text-slate-600 font-light italic text-base md:text-lg leading-relaxed">
                "When I visited Mannazentrum, I was blown away by the sincere devotion and care given to each child. Seeing how my daughter blossomed into an independent, happy toddler was a heartwarming experience."
              </p>
              <p className="text-slate-900 font-bold text-sm tracking-tight pt-1">
                -- Helene P., orang tua murid Daycare sejak 2022
              </p>
            </div>

            {/* Quote 2 */}
            <div className="space-y-2 pt-2">
              <p className="text-slate-600 font-light italic text-base md:text-lg leading-relaxed">
                "Spending time with the kids and seeing their happiness as they learn from us is a rewarding experience. Knowing I am helping make their foundation better in such an impactful way is an amazing feeling."
              </p>
              <p className="text-slate-900 font-bold text-sm tracking-tight pt-1">
                -- Shawn G., pendidik usia dini sejak 2021
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          SECTION 5 (MATCHING TEMPLATE IMAGE 5)
          - Background: Pure White
          - Left: 2 Staggered photos (small lower left, taller right)
          - Right: "Meet the partners who help us transform lives" + List
         ======================================================== */}
      <section className="bg-white py-20 md:py-28 px-6 sm:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: 2 Staggered Collaboration Photos */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-12 gap-4 items-end">
              {/* Lower left smaller photo (hands joined in team huddle) */}
              <div className="col-span-5 pb-4">
                <div className="overflow-hidden shadow-sm bg-slate-100">
                  <img 
                    src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=600&q=80" 
                    alt="Hands joined in teamwork and solidarity" 
                    className="w-full aspect-square object-cover hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
              </div>
              
              {/* Right taller photo (team smiling around laptop) */}
              <div className="col-span-7">
                <div className="overflow-hidden shadow-sm bg-slate-100">
                  <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" 
                    alt="Pendidik dan tim profesional bermitra bersama" 
                    className="w-full aspect-[3/4] object-cover hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Heading & Partners List */}
          <div className="lg:col-span-6 space-y-6 lg:pl-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-slate-900 tracking-tight leading-tight">
              Meet the partners who help us transform lives
            </h2>
            <p className="text-slate-600 font-light text-base md:text-lg leading-relaxed">
              Businesses and fellow foundations have given their time and support to help us make a difference in children's lives. Bersama unit bisnis kami, kami membangun ekosistem komprehensif bagi keluarga Indonesia.
            </p>

            <ul className="space-y-3 pt-2 text-slate-700 font-medium text-base">
              <li className="flex items-center space-x-3">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-900"></span>
                <span>PT. Elrafa Terang Sejahtera (Holding & Tata Kelola)</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-900"></span>
                <span>Mannazentrum Daycare & Preschool Foundation</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-900"></span>
                <span>Malika Maliaki (Creative Store & Art Workshops)</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-900"></span>
                <span>Jasa Layanan Terpadu & Antar-Jemput Siswa</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-900"></span>
                <span>Komunitas Pemerhati Parenting & Tumbuh Kembang Cisauk</span>
              </li>
            </ul>

            <div className="pt-4 flex flex-wrap gap-4">
              <button 
                onClick={onNavigateToBusinessUnits}
                className="bg-slate-900 text-white px-7 py-3 rounded-full text-xs font-medium hover:bg-slate-800 transition shadow-sm"
              >
                Lihat Unit Bisnis
              </button>
              <button 
                onClick={handlePendaftaranClick}
                className="border border-slate-300 text-slate-900 px-7 py-3 rounded-full text-xs font-medium hover:bg-slate-50 transition"
              >
                Kemitraan & Donasi
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          SECTION 6 (CONTACT, LOCATION & MAP)
         ======================================================== */}
      <section id="kontak" className="py-20 md:py-28 px-6 sm:px-10 lg:px-16 bg-[#FAF9F5] border-t border-stone-200/40">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
            
            {/* Left Contact Info */}
            <div className="space-y-8">
              <div>
                <span className="text-amber-600 font-semibold uppercase tracking-[0.2em] text-[11px] block mb-2">Hubungi Kami</span>
                <h3 className="text-3xl md:text-4xl font-light text-slate-900 tracking-tight">Pusat Informasi & Korespondensi</h3>
                <p className="text-slate-500 font-light mt-3 leading-relaxed text-sm md:text-base">
                  Silakan hubungi kami untuk pertanyaan seputar pendaftaran daycare, preschool, konsultasi tumbuh kembang anak, atau kemitraan usaha.
                </p>
              </div>

              <div className="space-y-4">
                {/* Office */}
                <div className="p-5 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4">
                  <span className="text-2xl mt-0.5">📍</span>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-xs uppercase tracking-wider">Alamat Kantor Pusat</h4>
                    <p className="text-slate-600 text-sm leading-relaxed mt-1 font-light">
                      Serpong Garden 1, Cluster Green View, Blok A02 No 12A, Jl Raya Cisauk, Kec. Cisauk, Kab. Tangerang, Banten.
                    </p>
                  </div>
                </div>

                {/* Phone & WhatsApp */}
                <div className="p-5 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4">
                  <span className="text-2xl mt-0.5">💬</span>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-xs uppercase tracking-wider">Layanan WhatsApp</h4>
                    <div className="flex flex-wrap gap-4 mt-1">
                      <a 
                        href="https://wa.me/6287881110807?text=Halo%20Mannazentrum,%20saya%20ingin%20bertanya%20informasi%20layanan." 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-slate-800 text-sm font-medium hover:text-emerald-600 transition flex items-center gap-1.5"
                      >
                        +62 878-8111-0807 ↗
                      </a>
                      <a 
                        href="https://wa.me/6281118893389?text=Halo%20Mannazentrum,%20saya%20ingin%20bertanya%20informasi%20pendaftaran." 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-slate-800 text-sm font-medium hover:text-emerald-600 transition flex items-center gap-1.5"
                      >
                        0811-1889-3389 ↗
                      </a>
                    </div>
                  </div>
                </div>

                {/* Emails Grid */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                    <h5 className="font-semibold text-slate-900 text-xs uppercase tracking-wider">Informasi Umum</h5>
                    <p className="text-slate-500 text-xs mt-1 font-mono">info@mannazentrum.com</p>
                  </div>
                  <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                    <h5 className="font-semibold text-slate-900 text-xs uppercase tracking-wider">Daycare & Preschool</h5>
                    <p className="text-slate-500 text-xs mt-1 font-mono">daycare@mannazentrum.com</p>
                  </div>
                  <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                    <h5 className="font-semibold text-slate-900 text-xs uppercase tracking-wider">Bimbingan Belajar</h5>
                    <p className="text-slate-500 text-xs mt-1 font-mono">bimbel@mannazentrum.com</p>
                  </div>
                  <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                    <h5 className="font-semibold text-slate-900 text-xs uppercase tracking-wider">PKBM Terpadu</h5>
                    <p className="text-slate-500 text-xs mt-1 font-mono">pkbm@mannazentrum.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Map */}
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

      {/* Modern Minimalist Editorial Footer */}
      <footer className="bg-slate-900 text-white py-16 px-6 sm:px-10 lg:px-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white text-slate-900 rounded-md flex items-center justify-center font-bold text-base">M</div>
              <span className="font-semibold text-lg tracking-tight">Mannazentrum</span>
            </div>
            <p className="text-slate-400 text-sm max-w-sm font-light leading-relaxed">
              Membangun ekosistem pendidikan usia dini, pengasuhan holistik, dan kesejahteraan keluarga yang berkelanjutan di bawah naungan PT. Elrafa Terang Sejahtera.
            </p>
          </div>

          <div>
            <h6 className="font-medium mb-4 text-xs uppercase tracking-widest text-slate-400">Pintasan Navigasi</h6>
            <ul className="space-y-2.5 text-sm font-light text-slate-400">
              <li><button onClick={onNavigateToProfile} className="hover:text-white transition">Tentang Kami</button></li>
              <li><button onClick={onNavigateToBusinessUnits} className="hover:text-white transition">Unit Bisnis</button></li>
              <li><button onClick={onNavigateToDaycare} className="hover:text-white transition">Daycare</button></li>
              <li><button onClick={onNavigateToMMStore} className="hover:text-white transition">Malika Maliaki</button></li>
              <li><button onClick={handleCareerClick} className="hover:text-white transition">Karir</button></li>
            </ul>
          </div>

          <div>
            <h6 className="font-medium mb-4 text-xs uppercase tracking-widest text-slate-400">Hubungi Kami</h6>
            <ul className="space-y-2.5 text-sm font-light text-slate-400">
              <li><button onClick={() => scrollToSection('kontak')} className="hover:text-white transition">Pusat Kontak</button></li>
              <li><button onClick={handlePendaftaranClick} className="hover:text-white transition">Formulir Pendaftaran</button></li>
              <li>Cisauk, Tangerang, Banten</li>
              <li>WhatsApp: +62 878-8111-0807</li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 font-light gap-4">
          <p>&copy; {new Date().getFullYear()} PT. Elrafa Terang Sejahtera. All Rights Reserved.</p>
          <p className="tracking-wider uppercase text-[10px]">Mannazentrum Children's Foundation & Daycare</p>
        </div>
      </footer>

    </div>
  );
};

export default CorporateLanding;
