import React, { useState } from 'react';
import { submitContactForm } from '../services/formService';

interface DaycareLandingProps {
  onBack: () => void;
}

const DaycareLanding: React.FC<DaycareLandingProps> = ({ onBack }) => {
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
        source: "Daycare/Preschool Landing",
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
                  <h2 className="text-2xl font-semibold text-slate-900 tracking-tight mb-2">Terima Kasih!</h2>
                  <p className="text-slate-500 text-sm leading-relaxed">Informasi survei dan konsultasi pendaftaran telah kami terima. Kami akan segera menghubungi Ayah / Bunda.</p>
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
                    <span className="text-amber-600 font-semibold uppercase tracking-[0.2em] text-[10px] block mb-1">Konsultasi & Survei</span>
                    <h2 className="text-2xl font-normal text-slate-900 tracking-tight">Informasi Pendaftaran</h2>
                    <p className="text-slate-500 text-xs mt-1">Isi formulir berikut untuk menjadwalkan kunjungan lokasi atau mengetahui biaya pendaftaran.</p>
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
                      <label htmlFor="message" className="block font-medium text-slate-700 text-xs uppercase tracking-wider mb-1">Usia Anak & Program yang Diminati</label>
                      <textarea id="message" name="message" rows={3} placeholder="Contoh: Anak usia 2 tahun, berminat untuk program Daycare Full-Day..." className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition" required></textarea>
                    </div>
                    <button type="submit" className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-medium text-sm hover:bg-slate-800 transition" disabled={isSubmitting}>
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

      {/* Navigation */}
      <nav className="border-b border-slate-100 sticky top-0 bg-white/95 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex justify-between items-center">
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={onBack}>
            <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold text-lg group-hover:bg-slate-800 transition">M</div>
            <div>
              <h1 className="font-semibold text-base md:text-lg text-slate-900 leading-none tracking-tight">Mannazentrum</h1>
              <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400 mt-0.5">Daycare & Preschool</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={onBack} 
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition flex items-center gap-1.5"
            >
              <span>←</span> Kembali ke Beranda
            </button>
            <button 
              onClick={openForm} 
              className="bg-slate-900 text-white text-xs md:text-sm px-5 py-2.5 rounded-full font-medium hover:bg-slate-800 transition shadow-sm"
            >
              Daftar / Survei
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Banner with Photo */}
      <section className="relative w-full overflow-hidden bg-slate-900 text-white">
        <div className="relative w-full h-[360px] md:h-[480px]">
          <img 
            src="https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=2000&q=80" 
            alt="Anak-anak dan pengasuh Mannazentrum Daycare" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
          
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <span className="text-amber-400 font-semibold uppercase tracking-[0.25em] text-xs mb-3 block">
                Nurturing with Love & Excellence
              </span>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight leading-tight mb-4">
                Mannazentrum Daycare & Preschool
              </h2>
              <p className="text-slate-300 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed mb-8">
                Lembaga pengasuhan dan pendidikan anak usia dini (Daycare, KB, K1, K2) di Cisauk, Tangerang, yang berfokus pada pembentukan karakter, stimulasi motorik, dan kemandirian.
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
                  <span>Chat WhatsApp</span> ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Layanan Cards */}
      <section className="py-20 md:py-28 px-6 sm:px-10 lg:px-16 bg-[#FAF9F5] border-b border-stone-200/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-amber-600 font-semibold uppercase tracking-[0.2em] text-[11px] block mb-2">Program Kami</span>
            <h3 className="text-3xl md:text-4xl font-light text-slate-900 tracking-tight">Pilihan Program Sesuai Tahapan Usia</h3>
            <p className="text-slate-500 font-light mt-2 text-sm md:text-base">Kurikulum holistik dirancang khusus untuk memfasilitasi masa emas (golden age) si kecil.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col">
              <div className="w-12 h-12 bg-amber-50 text-amber-700 rounded-2xl flex items-center justify-center text-2xl mb-6">🍼</div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">Infant & Baby Care</h4>
              <p className="text-xs font-semibold text-amber-600 tracking-wider uppercase mb-4">Usia 3 - 18 Bulan</p>
              <p className="text-slate-500 font-light text-sm leading-relaxed mb-6">
                Pengasuhan one-on-one rasio terpantau, stimulasi tummy time, motorik dini, sanitasi steril, serta pencatatan asupan ASI/MPASI secara real-time.
              </p>
              <button onClick={openForm} className="mt-auto text-xs font-semibold text-slate-900 hover:text-amber-700 transition">Konsultasi Program →</button>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-700 rounded-2xl flex items-center justify-center text-2xl mb-6">🧸</div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">Toddler Daycare</h4>
              <p className="text-xs font-semibold text-emerald-600 tracking-wider uppercase mb-4">Usia 1.5 - 3 Tahun</p>
              <p className="text-slate-500 font-light text-sm leading-relaxed mb-6">
                Pembiasaan toilet training, stimulasi sensori & motorik halus, sosialisasi teman sebaya, serta menu makan siang sehat dan bernutrisi gizi seimbang.
              </p>
              <button onClick={openForm} className="mt-auto text-xs font-semibold text-slate-900 hover:text-emerald-700 transition">Konsultasi Program →</button>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col">
              <div className="w-12 h-12 bg-blue-50 text-blue-700 rounded-2xl flex items-center justify-center text-2xl mb-6">🎨</div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">Preschool & KB (K1-K2)</h4>
              <p className="text-xs font-semibold text-blue-600 tracking-wider uppercase mb-4">Usia 3 - 6 Tahun</p>
              <p className="text-slate-500 font-light text-sm leading-relaxed mb-6">
                Kurikulum pra-sekolah interaktif, pengenalan fonik, literasi dini, sains eksploratif, serta pembentukan karakter mandiri dan berbudi pekerti luhur.
              </p>
              <button onClick={openForm} className="mt-auto text-xs font-semibold text-slate-900 hover:text-blue-700 transition">Konsultasi Program →</button>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities & Hygiene */}
      <section className="py-20 md:py-28 px-6 sm:px-10 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <div className="overflow-hidden shadow-sm bg-slate-100">
              <img 
                src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1000&q=80" 
                alt="Fasilitas bermain bersih dan ramah anak" 
                className="w-full aspect-[4/3] object-cover"
                loading="lazy"
              />
            </div>
          </div>
          <div className="lg:col-span-6 space-y-6 lg:pl-6">
            <span className="text-amber-600 font-semibold uppercase tracking-[0.2em] text-[11px] block">Keamanan & Kenyamanan</span>
            <h3 className="text-3xl md:text-4xl font-light text-slate-900 tracking-tight">Fasilitas Ramah Anak & Higienis Terstandar</h3>
            <p className="text-slate-600 font-light text-base leading-relaxed">
              Kami menyadari bahwa keamanan dan kebersihan adalah prioritas utama setiap orang tua. Di Mannazentrum, seluruh sudut ruang telah dirancang dengan material aman (child-proof) dan disanitasi secara berkala.
            </p>
            <ul className="space-y-3 text-slate-700 font-medium text-sm">
              <li className="flex items-center space-x-3">
                <span className="text-emerald-600">✓</span>
                <span>Area bermain indoor & outdoor berlantai busa pelindung</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="text-emerald-600">✓</span>
                <span>Kamar tidur ber-AC dengan sterilisasi UV harian</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="text-emerald-600">✓</span>
                <span>Menu makanan dan camilan segar dimasak langsung setiap hari</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="text-emerald-600">✓</span>
                <span>Laporan aktivitas harian terperinci untuk Ayah & Bunda</span>
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

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-6 border-t border-slate-800 text-center text-xs text-slate-500 font-light">
        <p>&copy; {new Date().getFullYear()} Mannazentrum Daycare & Preschool - PT. Elrafa Terang Sejahtera.</p>
      </footer>

    </div>
  );
};

export default DaycareLanding;
