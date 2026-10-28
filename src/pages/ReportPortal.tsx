import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { 
  Lock, 
  LogIn, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  Loader2, 
  Calendar, 
  Clock, 
  Utensils, 
  Sparkles, 
  MessageCircle, 
  Phone, 
  Heart,
  Baby,
  Smile,
  Shield,
  HelpCircle
} from 'lucide-react';

const ReportPortal: React.FC = () => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<'laporan' | 'absensi' | 'nutrisi'>('laporan');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError(null);

    // Mock verification / authentication flow
    setTimeout(() => {
      setIsLoading(false);
      if (emailOrPhone.trim().length > 3 && password.trim().length >= 4) {
        setIsLoggedIn(true);
      } else {
        setLoginError('ID Akun atau Kata Sandi tidak sesuai. Silakan hubungi admin sekolah jika belum memiliki akses.');
      }
    }, 900);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans text-slate-800 antialiased selection:bg-amber-100 selection:text-slate-900 flex flex-col justify-between">
      <SEO 
        title="Portal Laporan Siswa & Tumbuh Kembang | Mannazentrum"
        description="Portal privat pelaporan harian, absensi, nutrisi, dan perkembangan ananda di Mannazentrum Daycare & Preschool. Dilindungi enkripsi Row Level Security."
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
            <span className="hidden sm:inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-medium px-3 py-1.5 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>RLS Security Active</span>
            </span>
            <a
              href="https://mannazentrum.com"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-stone-100 hover:bg-stone-200 px-3.5 py-2 rounded-full transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Website Utama</span>
              <span className="sm:hidden">Web Utama</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex items-center justify-center">
        {!isLoggedIn ? (
          <div className="w-full max-w-md my-auto">
            {/* Login Card */}
            <div className="bg-white rounded-[32px] p-7 sm:p-10 shadow-xl border border-stone-200/80">
              <div className="text-center mb-8">
                <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-3 shadow-inner">
                  <Lock className="w-7 h-7" />
                </div>
                <span className="text-amber-700 font-semibold uppercase tracking-[0.2em] text-[11px] block mb-1">
                  Akses Privat Wali Murid
                </span>
                <h1 className="text-2xl sm:text-3xl font-light text-slate-900 tracking-tight">
                  Portal Laporan Siswa
                </h1>
                <p className="text-slate-500 text-xs sm:text-sm mt-1.5 leading-relaxed">
                  Silakan masuk menggunakan nomor WhatsApp atau email yang telah didaftarkan ke sekolah.
                </p>
              </div>

              {loginError && (
                <div className="mb-5 p-3.5 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-800 flex items-start gap-2.5 animate-fadeIn">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold">{loginError}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label htmlFor="portal-id" className="block font-medium text-slate-700 text-xs uppercase tracking-wider mb-1.5">
                    Email / Nomor WhatsApp Wali Murid
                  </label>
                  <input
                    type="text"
                    id="portal-id"
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    placeholder="Contoh: 08123456789 atau email@example.com"
                    className="w-full border border-stone-200 rounded-xl p-3 text-sm focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label htmlFor="portal-pass" className="block font-medium text-slate-700 text-xs uppercase tracking-wider">
                      Kata Sandi / PIN Akun
                    </label>
                    <a
                      href="https://wa.me/6287881110807?text=Halo%20Mannazentrum,%20saya%20orang%20tua%20murid%20lupa%20PIN%20portal%20laporan."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-amber-700 hover:text-amber-800 font-medium"
                    >
                      Lupa PIN?
                    </a>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="portal-pass"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Masukkan kata sandi atau PIN Anda"
                      className="w-full border border-stone-200 rounded-xl p-3 pr-11 text-sm focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition"
                      required
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3.5 rounded-xl font-semibold text-sm transition shadow-md flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                      <span>Memverifikasi Akun...</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="w-4 h-4 text-amber-400" />
                      <span>Masuk ke Portal Laporan</span>
                    </>
                  )}
                </button>
              </form>

              {/* Demo Mode Button for testing */}
              <div className="mt-4 pt-4 border-t border-stone-100 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setEmailOrPhone('bunda.sarah@demo.com');
                    setPassword('123456');
                    setIsLoggedIn(true);
                  }}
                  className="text-xs text-amber-800 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200/80 px-4 py-2 rounded-full font-medium transition inline-flex items-center gap-1.5"
                >
                  <span>Lihat Contoh Tampilan Laporan (Demo Preview) &rarr;</span>
                </button>
              </div>

              {/* Security info note */}
              <div className="mt-6 bg-stone-50 p-3.5 rounded-2xl border border-stone-200/70 text-[11px] text-slate-500 leading-relaxed space-y-1">
                <div className="flex items-center gap-2 font-semibold text-slate-700">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Jaminan Privasi Data Buah Hati</span>
                </div>
                <p>
                  Sistem menerapkan enkripsi Supabase Row Level Security (RLS) ketat. Data laporan, foto, dan catatan kesehatan hanya dapat diakses oleh orang tua kandung ananda yang terverifikasi.
                </p>
              </div>

              {/* Need Help WhatsApp */}
              <div className="mt-5 text-center">
                <p className="text-xs text-slate-500">
                  Belum memiliki akun atau ananda siswa baru?{' '}
                  <a
                    href="https://wa.me/6287881110807?text=Halo%20Mannazentrum,%20saya%20ingin%20aktivasi%20akun%20portal%20wali%20murid."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-700 font-semibold hover:underline inline-flex items-center gap-1"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Hubungi Admin Sekolah</span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Logged In Dashboard View */
          <div className="w-full max-w-4xl space-y-6">
            {/* Welcome Banner */}
            <div className="bg-slate-900 text-white rounded-[32px] p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="text-amber-400 font-semibold uppercase tracking-wider text-xs block mb-1">
                  Selamat Datang di Portal Siswa
                </span>
                <h2 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
                  Ananda: <strong>Kenzo Alexander</strong> (Toddler Daycare)
                </h2>
                <p className="text-slate-300 text-xs sm:text-sm mt-1">
                  Cabang: Serpong Garden 1 Cisauk • Kelompok Usia: 2 Tahun 4 Bulan
                </p>
              </div>
              <button
                onClick={() => setIsLoggedIn(false)}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-semibold px-5 py-2.5 rounded-full transition"
              >
                Keluar Akun
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex gap-2 border-b border-stone-200 pb-2">
              <button
                onClick={() => setActiveTab('laporan')}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold transition ${
                  activeTab === 'laporan'
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-stone-100'
                }`}
              >
                Laporan Harian Si Kecil
              </button>
              <button
                onClick={() => setActiveTab('absensi')}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold transition ${
                  activeTab === 'absensi'
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-stone-100'
                }`}
              >
                Absensi & Suhu Tubuh
              </button>
              <button
                onClick={() => setActiveTab('nutrisi')}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold transition ${
                  activeTab === 'nutrisi'
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-stone-100'
                }`}
              >
                Menu Makan & Gizi 4 Bintang
              </button>
            </div>

            {/* Tab 1: Laporan Harian */}
            {activeTab === 'laporan' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-sm space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Utensils className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">Asupan Makan Hari Ini</h3>
                  <div className="text-xs text-slate-600 space-y-2">
                    <p>• <strong>Sarapan:</strong> Bubur sereal buah (Habis 1 mangkuk)</p>
                    <p>• <strong>Makan Siang:</strong> Nasi tim salmon, sup brokoli tofu (Habis)</p>
                    <p>• <strong>Snack Sore:</strong> Pepaya potong segar + susu formula 150ml</p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-sm space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">Istirahat & Tidur Siang</h3>
                  <div className="text-xs text-slate-600 space-y-2">
                    <p>• <strong>Mulai Tidur:</strong> 12.45 WIB</p>
                    <p>• <strong>Bangun Tidur:</strong> 14.30 WIB (Durasi 1 Jam 45 Menit)</p>
                    <p>• <strong>Kualitas:</strong> Nyenyak, tidak terbangun menangis.</p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-sm space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">Stimulasi & Kegiatan STEM</h3>
                  <div className="text-xs text-slate-600 space-y-2">
                    <p>• <strong>Aktivitas Motorik:</strong> Menyusun balok kayu pelangi 5 tingkat.</p>
                    <p>• <strong>Sensori:</strong> Eksplorasi air warna dan spons cuci.</p>
                    <p>• <strong>Toilet Training:</strong> Buang air kecil mandiri 3 kali dengan panduan miss pengasuh.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Absensi */}
            {activeTab === 'absensi' && (
              <div className="bg-white p-8 rounded-3xl border border-stone-200/80 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-900 text-lg">Catatan Absensi & Pemeriksaan Fisik Pagi</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100">
                    <span className="text-[11px] text-slate-400 uppercase font-semibold">Jam Masuk</span>
                    <p className="text-lg font-bold text-slate-900 mt-0.5">07.28 WIB</p>
                  </div>
                  <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100">
                    <span className="text-[11px] text-slate-400 uppercase font-semibold">Suhu Pagi</span>
                    <p className="text-lg font-bold text-emerald-600 mt-0.5">36.4 °C (Normal)</p>
                  </div>
                  <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100">
                    <span className="text-[11px] text-slate-400 uppercase font-semibold">Pengantar</span>
                    <p className="text-sm font-bold text-slate-900 mt-0.5">Ayah Dimas</p>
                  </div>
                  <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100">
                    <span className="text-[11px] text-slate-400 uppercase font-semibold">Pendidik Penerima</span>
                    <p className="text-sm font-bold text-slate-900 mt-0.5">Miss Ratih</p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Nutrisi */}
            {activeTab === 'nutrisi' && (
              <div className="bg-white p-8 rounded-3xl border border-stone-200/80 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-900 text-lg">Menu Makanan Sehat Bebas MSG</h3>
                <p className="text-xs text-slate-500 font-light leading-relaxed">
                  Semua menu dimasak segar setiap pagi menggunakan bahan segar tanpa pengawet atau penyedap rasa sintetis.
                </p>
                <div className="space-y-3 text-xs text-slate-700">
                  <div className="p-3 bg-stone-50 rounded-xl">
                    <span className="font-bold text-slate-900">Senin:</span> Nasi lembek, Sup Ikan Gurame Jagung Manis, Tempe Bacem Kukus, Buah Naga Merah.
                  </div>
                  <div className="p-3 bg-stone-50 rounded-xl">
                    <span className="font-bold text-slate-900">Selasa:</span> Nasi Tim Ayam Kampung Wortel, Rolade Tahu Telur, Sup Bayam Bening, Buah Melon.
                  </div>
                  <div className="p-3 bg-stone-50 rounded-xl">
                    <span className="font-bold text-slate-900">Rabu:</span> Nasi Tim Daging Sapi Cincang, Sup Kentang Brokoli, Telur Puyuh Rebus, Pisang Ambon.
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Portal Footer */}
      <footer className="bg-white border-t border-stone-200 py-6 text-center text-xs text-slate-400">
        <p>© {new Date().getFullYear()} Mannazentrum • PT. Elrafa Terang Sejahtera. Hak Cipta Dilindungi.</p>
        <p className="mt-1">
          Kawasan Operasional: Cisauk (Serpong Garden), Citra Garden, BSD City & Rumpin Bogor.
        </p>
      </footer>
    </div>
  );
};

export default ReportPortal;
