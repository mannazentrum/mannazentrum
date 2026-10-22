import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
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
  HelpCircle
} from 'lucide-react';

const Daycare: React.FC = () => {
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
        source: "Halaman Daycare",
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
        title="Mannazentrum Daycare - Layanan Penitipan Anak Penuh Kasih Cisauk | Tangerang"
        description="Layanan penitipan bayi dan anak (Daycare) terpercaya di Cisauk Tangerang. CCTV 24 jam, rasio perawat terpantau, menu gizi 4 bintang, dan stimulasi motorik harian."
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
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">✓</div>
                  <h3 className="text-2xl font-semibold text-slate-900 tracking-tight mb-2">Terima Kasih Ayah / Bunda!</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">Informasi konsultasi daycare telah kami terima. Tim pengasuh Mannazentrum akan segera menghubungi nomor WhatsApp Anda.</p>
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
                    <span className="text-amber-600 font-semibold uppercase tracking-[0.2em] text-[10px] block mb-1">Konsultasi & Survei Daycare</span>
                    <h3 className="text-2xl font-normal text-slate-900 tracking-tight">Formulir Pendaftaran Daycare</h3>
                    <p className="text-slate-500 text-xs mt-1">Lengkapi data singkat berikut untuk informasi paket bulanan/harian atau menjadwalkan visit langsung.</p>
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
                      <label htmlFor="message" className="block font-medium text-slate-700 text-xs uppercase tracking-wider mb-1">Usia Bayi / Balita & Pilihan Paket</label>
                      <textarea id="message" name="message" rows={3} placeholder="Contoh: Balita usia 18 bulan, berminat paket Full-Day..." className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition" required></textarea>
                    </div>
                    <button type="submit" className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-medium text-sm hover:bg-slate-800 transition" disabled={isSubmitting}>
                      {isSubmitting ? 'Mengirim Data...' : 'Kirim Informasi Pendaftaran'}
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

      {/* Hero Banner with Photo */}
      <section className="relative w-full overflow-hidden bg-slate-900 text-white">
        <div className="relative w-full h-[360px] md:h-[480px]">
          <img 
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
                Mannazentrum Daycare: Rumah Kedua Buah Hati di Cisauk
              </h1>
              <p className="text-slate-300 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed mb-8">
                Layanan pengasuhan anak usia 3 bulan hingga 4 tahun di Serpong Garden Cisauk, Tangerang, yang berfokus pada kasih sayang tulus, gizi seimbang, dan stimulasi kemandirian.
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
            <h2 className="text-3xl md:text-4xl font-light text-slate-900 tracking-tight">Pilihan Program Daycare Sesuai Tahapan Usia</h2>
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
            <div className="overflow-hidden shadow-sm bg-slate-100 rounded-3xl">
              <img 
                src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1000&q=80" 
                alt="Fasilitas bermain bersih dan ramah anak di Mannazentrum" 
                className="w-full aspect-[4/3] object-cover"
                loading="lazy"
              />
            </div>
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
          <div className="text-center mb-14">
            <span className="text-amber-600 font-semibold uppercase tracking-[0.2em] text-[11px] block mb-2">Rutinitas Harian</span>
            <h2 className="text-3xl md:text-4xl font-light text-slate-900 tracking-tight">Jadwal Aktivitas Si Kecil di Daycare</h2>
            <p className="text-slate-500 font-light mt-2 text-sm">Ritme teratur membantu anak merasa aman, tenang, dan terlatih disiplin mandiri.</p>
          </div>

          <div className="space-y-3">
            {[
              { time: '07:00 - 08:30', title: 'Kedatangan & Cek Kesehatan Pagi', desc: 'Pengecekan suhu tubuh, sambutan hangat pengasuh, dan sarapan ringan/susu.' },
              { time: '08:30 - 09:30', title: 'Morning Circle & Senam Motorik Kasar', desc: 'Bernyanyi, berdoa bersama, peregangan tubuh, dan stimulasi motorik ceria.' },
              { time: '09:30 - 10:30', title: 'Sensory Play & Art Workshop', desc: 'Aktivitas eksplorasi tekstur, meremas playdough, dan pengenalan warna bersama Malika Maliaki.' },
              { time: '10:30 - 11:30', title: 'Mandi Pagi / Toilet Training & Persiapan Makan Siang', desc: 'Kebersihan tubuh, pembiasaan cuci tangan, dan belajar makan mandiri.' },
              { time: '11:30 - 12:30', title: 'Makan Siang Bernutrisi 4 Bintang', desc: 'Menu hangat berimbang protein, karbohidrat, sayuran segar, dan buah potong.' },
              { time: '12:30 - 15:00', title: 'Deep Nap Time (Tidur Siang Nyenyak)', desc: 'Istirahat di ruang tidur steril ber-AC diiringi musik pengantar tidur lembut.' },
              { time: '15:00 - 16:00', title: 'Bangun, Mandi Sore & Snack Sore Sehat', desc: 'Mandi sore segar, minum susu, dan buah segar atau kudapan bernutrisi.' },
              { time: '16:00 - 18:00', title: 'Free Play Edukatif & Penjemputan Orang Tua', desc: 'Bermain balok kayu, membaca buku cerita, dan serah terima anak kepada orang tua.' },
            ].map((schedule, i) => (
              <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:shadow-sm transition">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-semibold px-3 py-1 bg-amber-50 text-amber-800 rounded-full shrink-0">
                    {schedule.time}
                  </span>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm">{schedule.title}</h3>
                    <p className="text-slate-500 font-light text-xs mt-0.5">{schedule.desc}</p>
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
                Untuk bayi (infant), rasio maksimal adalah 1:1 hingga 1:2. Untuk balita (toddler), rasionya 1:3 hingga 1:4. Rasio ini menjamin setiap anak mendapatkan perhatian personal dan pengawasan intensif.
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

      <Footer onOpenContact={openForm} />
    </div>
  );
};

export default Daycare;
