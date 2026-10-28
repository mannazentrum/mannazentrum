import React, { useEffect } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  MessageCircle, 
  ArrowLeft, 
  Clock, 
  Lock, 
  Baby, 
  Heart, 
  CheckCircle2,
  Home,
  ExternalLink
} from 'lucide-react';
import SEO from '../components/SEO';

const ReportPortal: React.FC = () => {
  useEffect(() => {
    // Alihkan langsung ke subdomain resmi jika dibuka dari domain utama
    if (typeof window !== 'undefined' && !window.location.hostname.startsWith('laporan.')) {
      window.location.replace('https://laporan.mannazentrum.com');
    }
  }, []);
  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans text-slate-800 antialiased selection:bg-amber-100 selection:text-slate-900 flex flex-col justify-between">
      <SEO 
        title="The Page is Under Construction | Portal Laporan Mannazentrum"
        description="The Page is Under Construction. Portal Laporan Siswa & Tumbuh Kembang Mannazentrum Daycare & Preschool sedang dalam tahap pengembangan sistem untuk keamanan dan kenyamanan wali murid."
        canonicalPath="/laporan"
      />

      {/* Top Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-stone-200/80 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <a 
              href="https://mannazentrum.com" 
              className="flex items-center space-x-3 group"
              title="Kembali ke Website Utama"
            >
              <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:bg-amber-600 transition-colors">
                M
              </div>
              <div>
                <span className="font-semibold text-base sm:text-lg text-slate-900 leading-none tracking-tight block">
                  Mannazentrum
                </span>
                <p className="text-[10px] uppercase tracking-[0.2em] text-amber-700 font-semibold mt-0.5">
                  PORTAL LAPORAN SISWA
                </p>
              </div>
            </a>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-800 border border-amber-200 text-xs font-medium px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span>Under Construction</span>
            </span>
            <a
              href="https://mannazentrum.com"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-stone-100 hover:bg-stone-200 px-3.5 py-2 rounded-full transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Website Utama</span>
              <span className="sm:hidden">Web</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Hero Section */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 w-full flex items-center justify-center">
        <div className="w-full max-w-3xl my-auto">
          {/* Main Card */}
          <div className="bg-white rounded-[32px] sm:rounded-[40px] p-8 sm:p-14 shadow-2xl border border-stone-200/80 relative overflow-hidden text-center">
            
            {/* Ambient Background Accent Glow */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-amber-100/50 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200/90 text-amber-900 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.2em] mb-6 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Sistem Sedang Ditingkatkan</span>
            </div>

            {/* Exact Required Title */}
            <h1 className="text-3xl sm:text-5xl font-light text-slate-900 tracking-tight leading-tight mb-4">
              The Page is Under Construction
            </h1>

            {/* Subtitle / Description */}
            <p className="text-slate-600 text-sm sm:text-base font-light max-w-xl mx-auto leading-relaxed mb-8">
              Portal Laporan Siswa & Tumbuh Kembang Ananda Mannazentrum sedang dalam proses pengembangan dan integrasi sistem keamanan database terpadu.
            </p>

            {/* Information Grid / Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 text-left">
              <div className="bg-[#FAF9F5] p-5 rounded-2xl border border-stone-200/70 hover:border-amber-300 transition-all">
                <div className="w-10 h-10 bg-amber-100 text-amber-700 rounded-xl flex items-center justify-center mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h2 className="font-semibold text-slate-900 text-sm mb-1">Enkripsi RLS Ketat</h2>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Kami mengonfigurasi Row Level Security agar catatan tumbuh kembang buah hati hanya dapat diakses oleh orang tua kandung.
                </p>
              </div>

              <div className="bg-[#FAF9F5] p-5 rounded-2xl border border-stone-200/70 hover:border-amber-300 transition-all">
                <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center mb-3">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <h2 className="font-semibold text-slate-900 text-sm mb-1">Laporan via WhatsApp</h2>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Selama pemeliharaan sistem, rekapan harian, nutrisi & foto aktivitas ananda tetap dikirim rutin oleh pendidik melalui WhatsApp.
                </p>
              </div>

              <div className="bg-[#FAF9F5] p-5 rounded-2xl border border-stone-200/70 hover:border-amber-300 transition-all">
                <div className="w-10 h-10 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center mb-3">
                  <Clock className="w-5 h-5" />
                </div>
                <h2 className="font-semibold text-slate-900 text-sm mb-1">Peningkatan Fitur</h2>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Fitur rekam absensi realtime, grafik perkembangan, dan kartu evaluasi bulanan sedang dalam tahap finalisasi uji coba.
                </p>
              </div>
            </div>

            {/* Dark Alert Box */}
            <div className="bg-slate-900 text-white p-6 sm:p-7 rounded-3xl mb-8 text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                    Layanan Bantuan Wali Murid
                  </span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Butuh informasi harian ananda atau konfirmasi absensi saat ini?
                </p>
              </div>
              <a
                href="https://wa.me/6287881110807?text=Halo%20Mannazentrum,%20saya%20wali%20murid%20ingin%20menanyakan%20laporan%20harian%20ananda."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-3 rounded-xl text-xs font-semibold tracking-wide transition shadow-lg shrink-0 w-full sm:w-auto"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Hubungi Admin Sekolah</span>
              </a>
            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="https://laporan.mannazentrum.com"
                className="inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-500 text-white px-6 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase transition shadow-md w-full sm:w-auto"
              >
                <span>Buka laporan.mannazentrum.com</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href="https://mannazentrum.com"
                className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase transition shadow-md w-full sm:w-auto"
              >
                <Home className="w-4 h-4 text-amber-400" />
                <span>Kembali ke Website Utama</span>
              </a>
              <a
                href="https://mannazentrum.com/kontak"
                className="inline-flex items-center justify-center gap-2 bg-stone-100 hover:bg-stone-200 text-slate-700 px-6 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase transition w-full sm:w-auto"
              >
                <span>Kontak & Lokasi</span>
              </a>
            </div>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-stone-200 py-6 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 space-y-1">
          <p>© {new Date().getFullYear()} Mannazentrum • PT. Elrafa Terang Sejahtera. Hak Cipta Dilindungi.</p>
          <p className="text-[11px] text-slate-400">
            Pusat Edukasi & Daycare Premium melayani Cisauk (Serpong Garden), Citra Garden, BSD City & Rumpin Bogor.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ReportPortal;
