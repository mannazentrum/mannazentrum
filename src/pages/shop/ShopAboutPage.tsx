import React from 'react';
import { Link } from 'react-router-dom';
import { ShopLayout } from '../../components/shop/ShopLayout';
import SEO from '../../components/SEO';
import { 
  Heart, 
  ShieldCheck, 
  Globe2, 
  Leaf, 
  Sparkles, 
  CheckCircle2, 
  Truck, 
  Package, 
  MessageCircle, 
  ArrowRight 
} from 'lucide-react';

export const ShopAboutPage: React.FC = () => {
  return (
    <ShopLayout>
      <SEO 
        title="Tentang Kami - Mannazentrum Shop | Keperluan Keluarga Indonesia & Asia Tenggara"
        description="Mengenal Mannazentrum Shop: Toko online kebutuhan harian keluarga modern yang berfokus pada pakaian katun organik, sembako sehat beras & madu mentah, benih tanaman pekarangan, dan produk ramah lingkungan."
        canonicalPath="/about-us"
      />

      {/* Hero Header */}
      <section className="bg-slate-900 text-white py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center space-y-5 relative z-10">
          <span className="text-amber-400 font-semibold uppercase tracking-[0.2em] text-xs block">
            Mengenal Mannazentrum Shop
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-light text-white tracking-tight leading-tight">
            Menyemai Gaya Hidup Sehat & Alami untuk Seluruh Keluarga
          </h1>
          <p className="text-slate-300 font-light text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Hadir sebagai pusat perlengkapan keluarga harian terpadu: dari pakaian serat alami lembut anak, bahan pangan pokok organik, hingga bibit tanaman untuk ketahanan pangan mandiri di pekarangan rumah.
          </p>
        </div>
      </section>

      {/* Story & Philosophy */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-amber-600 font-semibold uppercase tracking-[0.2em] text-xs block">
              Cerita & Filosofi Kami
            </span>
            <h2 className="text-2xl sm:text-4xl font-light text-slate-900 tracking-tight leading-snug">
              Berasal dari Kepedulian Nyata akan Kualitas Hidup Si Kecil & Rumah Tangga
            </h2>
            <div className="space-y-4 text-slate-600 font-light text-sm sm:text-base leading-relaxed">
              <p>
                Mannazentrum Shop lahir dari kesadaran mendalam bahwa kesehatan keluarga dimulai dari apa yang dipakai, apa yang dimakan, dan bagaimana lingkungan sekitar rumah dirawat setiap hari.
              </p>
              <p>
                Banyak keluarga di perkotaan menghadapi tantangan paparan residu pestisida pada bahan pangan pokok, pakaian anak berbahan sintetis panas yang memicu alergi kulit tropis, serta keterbatasan ruang pekarangan untuk berkebun.
              </p>
              <p>
                Oleh karena itu, kami mengkurasi secara ketat produk-produk kebutuhan pokok keluarga: beras pandan wangi tanpa zat kimia, madu liar mentah kaya enzim, pakaian katun combed & serat bambu bersertifikasi, serta kit benih sayuran cepat panen yang siap kirim ke seluruh kota di Indonesia maupun lintas negara ke Asia Tenggara (Singapura, Malaysia, Brunei, dan sekitarnya).
              </p>
            </div>

            <div className="pt-2">
              <Link
                to="/category"
                className="inline-flex items-center gap-2 bg-slate-900 text-white px-7 py-3 rounded-full text-xs font-medium hover:bg-amber-600 transition shadow-sm"
              >
                <span>Jelajahi Produk Pilihan</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-stone-100 aspect-4/3 border border-stone-200">
              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200"
                alt="Kebersamaan keluarga sehat Mannazentrum Shop"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 4 Core Pillars */}
      <section className="bg-[#FAF9F5] py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-y border-stone-200/60">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-amber-600 font-semibold uppercase tracking-[0.2em] text-xs">
              4 Pilar Standar Kualitas
            </span>
            <h3 className="text-2xl sm:text-4xl font-light text-slate-900 tracking-tight">
              Komitmen Kami pada Setiap Paket yang Dikirim
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white p-7 rounded-3xl border border-stone-200/70 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-xl border border-amber-200/50">
                🌱
              </div>
              <h4 className="font-bold text-slate-900 text-base">Alami & Ramah Lingkungan</h4>
              <p className="text-xs text-slate-500 font-light leading-relaxed">
                Bebas dari bahan pengawet kimia berbahaya, pewarna tekstil beracun, serta busa deterjen detergen sintetis berlebih.
              </p>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-stone-200/70 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-xl border border-amber-200/50">
                🌾
              </div>
              <h4 className="font-bold text-slate-900 text-base">Mitra Petani Nusantara</h4>
              <p className="text-xs text-slate-500 font-light leading-relaxed">
                Membeli langsung dari petani lokal binaan dengan harga yang adil, menjaga ekosistem tanah dan perairan alami.
              </p>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-stone-200/70 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-xl border border-amber-200/50">
                📦
              </div>
              <h4 className="font-bold text-slate-900 text-base">Standar Vakum Ekspor</h4>
              <p className="text-xs text-slate-500 font-light leading-relaxed">
                Kemasan kedap udara tebal menjamin beras, madu, dan rempah tetap bersih higienis dan awet dalam perjalanan jarak jauh.
              </p>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-stone-200/70 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-xl border border-amber-200/50">
                🌏
              </div>
              <h4 className="font-bold text-slate-900 text-base">Jangkauan Indonesia & ASEAN</h4>
              <p className="text-xs text-slate-500 font-light leading-relaxed">
                Dukungan multi-mata uang, jalur kurir kilat udara, dan kemudahan konfirmasi pesanan langsung via WhatsApp.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* CTA Box */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-5 border border-slate-800">
          <h3 className="text-2xl sm:text-3xl font-light tracking-tight">
            Siap Menghadirkan Kebaikan Alami ke Rumah Anda?
          </h3>
          <p className="text-slate-300 font-light text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Pesan hari ini dan rasakan perbedaannya. Tim layanan pelanggan kami siap membantu konsultasi produk keluarga dan pengiriman setiap saat.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link
              to="/category"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-7 py-3 rounded-full text-xs transition shadow-md"
            >
              Mulai Belanja
            </Link>
            <Link
              to="/contact"
              className="bg-slate-800 hover:bg-slate-700 text-white font-medium px-6 py-3 rounded-full text-xs transition border border-slate-700"
            >
              Hubungi Layanan Pelanggan
            </Link>
          </div>
        </div>
      </section>
    </ShopLayout>
  );
};
