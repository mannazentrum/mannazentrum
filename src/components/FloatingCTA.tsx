import React, { useState } from 'react';
import { MessageCircle, Calendar, X, Sparkles, MapPin, Send } from 'lucide-react';
import { submitContactForm } from '../services/formService';

interface FloatingCTAProps {
  onOpenSurvey?: () => void;
}

const FloatingCTA: React.FC<FloatingCTAProps> = ({ onOpenSurvey }) => {
  const [showSurveyModal, setShowSurveyModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showBadges, setShowBadges] = useState<boolean>(() => {
    const saved = localStorage.getItem('mz_show_photo_badges');
    return saved === null ? true : saved === 'true';
  });

  const togglePhotoBadges = () => {
    const next = !showBadges;
    setShowBadges(next);
    localStorage.setItem('mz_show_photo_badges', String(next));
    window.dispatchEvent(new Event('mz-photo-badge-toggle'));
  };

  const handleOpen = () => {
    if (onOpenSurvey) {
      onOpenSurvey();
    } else {
      setShowSurveyModal(true);
      setIsSubmitted(false);
    }
  };

  const handleSurveySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const target = e.target as typeof e.target & {
      name: { value: string };
      phone: { value: string };
      childAge: { value: string };
      location: { value: string };
      preferredDate: { value: string };
    };

    try {
      await submitContactForm({
        name: target.name.value,
        phone: target.phone.value,
        email: 'survey-request@mannazentrum.com',
        message: `[SURVEY LOKASI] Usia Anak: ${target.childAge.value} | Pilihan Wilayah: ${target.location.value} | Rencana Tanggal Visit: ${target.preferredDate.value}`,
        source: 'Floating CTA Survey Modal',
      });
      setIsSubmitted(true);
    } catch (err) {
      console.error('Error submitting survey request:', err);
      alert('Terjadi kesalahan. Silakan hubungi kami langsung via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Kode Label Foto (Untuk Manajemen Konten & Persiapan Aset Foto) */}
      <button
        onClick={togglePhotoBadges}
        className="fixed bottom-5 left-4 sm:left-6 z-50 flex items-center gap-2 bg-slate-950/90 hover:bg-slate-900 text-amber-300 px-3.5 py-2.5 rounded-full shadow-2xl border border-amber-400/40 text-xs font-mono font-medium backdrop-blur-md hover:scale-105 active:scale-95 transition-all"
        title="Klik untuk menyembunyikan atau menampilkan kode posisi foto di seluruh website"
      >
        <span className={`w-2 h-2 rounded-full ${showBadges ? 'bg-amber-400 animate-pulse' : 'bg-slate-500'}`}></span>
        <span>Kode Foto: {showBadges ? 'AKTIF' : 'NONAKTIF'}</span>
      </button>

      {/* Sticky Bottom Floating Bar / Widget */}
      <div className="fixed bottom-5 right-4 sm:right-6 z-50 flex flex-col sm:flex-row items-end sm:items-center gap-2.5">
        
        {/* Sticky CTA: Jadwalkan Kunjungan / Survey Lokasi */}
        <button
          onClick={handleOpen}
          className="group flex items-center gap-2.5 bg-slate-900 hover:bg-slate-800 text-white px-5 py-3 rounded-full shadow-2xl border border-slate-700/50 hover:scale-105 active:scale-95 transition-all duration-300"
          aria-label="Jadwalkan Kunjungan atau Survey Lokasi"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
          <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="text-xs md:text-sm font-semibold tracking-tight">
            Jadwalkan Kunjungan (School Tour)
          </span>
        </button>

        {/* WhatsApp Fast Action Button */}
        <a
          href="https://wa.me/6287881110807?text=Halo%20Mannazentrum,%20saya%20ingin%20jadwalkan%20kunjungan%20survei%20lokasi%20atau%20tanya%20Daycare%20/%20Preschool."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white p-3 sm:px-4 sm:py-3 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 group"
          aria-label="Chat WhatsApp Admin"
        >
          <MessageCircle className="w-5 h-5 shrink-0" />
          <span className="hidden sm:inline text-xs md:text-sm font-semibold">
            WhatsApp Konselor
          </span>
        </a>
      </div>

      {/* Survey & Kunjungan Modal */}
      {showSurveyModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-slate-900/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
          <div className="bg-white w-full max-w-lg rounded-[36px] shadow-2xl border border-slate-100 overflow-hidden relative my-auto">
            <button
              onClick={() => setShowSurveyModal(false)}
              className="absolute top-6 right-6 w-11 h-11 bg-slate-50 text-slate-400 hover:text-slate-900 rounded-full flex items-center justify-center text-2xl transition-all z-10"
              aria-label="Tutup Formulir Survey"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8 md:p-10">
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                    ✓
                  </div>
                  <h3 className="text-2xl font-semibold text-slate-900 tracking-tight mb-2">
                    Jadwal Survey Terkirim!
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed max-w-sm mx-auto mb-6">
                    Terima kasih Ayah / Bunda. Tim konselor Mannazentrum akan menghubungi via WhatsApp untuk mengonfirmasi jam kunjungan dan titik temu lokasi.
                  </p>
                  <button
                    onClick={() => setShowSurveyModal(false)}
                    className="bg-slate-900 text-white px-8 py-2.5 rounded-full text-xs font-semibold hover:bg-slate-800 transition"
                  >
                    Tutup
                  </button>
                </div>
              ) : (
                <>
                  <div className="text-center mb-6">
                    <span className="text-amber-600 font-semibold uppercase tracking-[0.2em] text-[10px] block mb-1">
                      Kunjungan Langsung
                    </span>
                    <h3 className="text-2xl font-normal text-slate-900 tracking-tight">
                      Jadwalkan Survey Lokasi
                    </h3>
                    <p className="text-slate-500 text-xs mt-1.5 leading-relaxed">
                      Kunjungi langsung fasilitas kami di <strong>Cisauk (Serpong Garden)</strong> atau layanan area <strong>Rumpin & Bogor</strong>.
                    </p>
                  </div>

                  <form onSubmit={handleSurveySubmit} className="space-y-4 text-left">
                    <div>
                      <label htmlFor="survey-name" className="block font-medium text-slate-700 text-xs uppercase tracking-wider mb-1">
                        Nama Ayah / Bunda
                      </label>
                      <input
                        type="text"
                        id="survey-name"
                        name="name"
                        placeholder="Contoh: Bunda Sarah"
                        className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-slate-800 transition"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="survey-phone" className="block font-medium text-slate-700 text-xs uppercase tracking-wider mb-1">
                        Nomor WhatsApp Aktif
                      </label>
                      <input
                        type="tel"
                        id="survey-phone"
                        name="phone"
                        placeholder="Contoh: 08123456789"
                        className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-slate-800 transition"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="survey-childAge" className="block font-medium text-slate-700 text-xs uppercase tracking-wider mb-1">
                          Usia Anak
                        </label>
                        <select
                          id="survey-childAge"
                          name="childAge"
                          className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-slate-800 transition bg-white"
                          required
                        >
                          <option value="3-12 Bulan (Infant)">3 - 12 Bulan (Infant)</option>
                          <option value="1-3 Tahun (Toddler)">1 - 3 Tahun (Toddler)</option>
                          <option value="3-4 Tahun (Playgroup)">3 - 4 Tahun (Playgroup)</option>
                          <option value="4-6 Tahun (TK/Kindy)">4 - 6 Tahun (TK/Kindy)</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="survey-location" className="block font-medium text-slate-700 text-xs uppercase tracking-wider mb-1">
                          Wilayah Domisili
                        </label>
                        <select
                          id="survey-location"
                          name="location"
                          className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-slate-800 transition bg-white"
                          required
                        >
                          <option value="Cisauk / Serpong Garden">Cisauk / Serpong Garden (Tangerang)</option>
                          <option value="Rumpin & Sekitarnya (Bogor)">Rumpin & Sekitarnya (Bogor)</option>
                          <option value="BSD City / Serpong">BSD City / Serpong</option>
                          <option value="Lainnya">Wilayah Lainnya</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="survey-date" className="block font-medium text-slate-700 text-xs uppercase tracking-wider mb-1">
                        Rencana Tanggal Visit
                      </label>
                      <input
                        type="date"
                        id="survey-date"
                        name="preferredDate"
                        className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-slate-800 transition"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-medium text-sm hover:bg-slate-800 transition active:scale-[0.99] flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isSubmitting ? 'Mengirim Jadwal...' : 'Konfirmasi Jadwal Survey'}</span>
                    </button>
                  </form>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-center gap-2 text-[11px] text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-amber-500" />
                    <span>Lokasi: Cluster Green View Blok A02/12A Cisauk & Antar Jemput Rumpin</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingCTA;
