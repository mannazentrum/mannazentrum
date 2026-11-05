import React from 'react';
import { ShopLayout } from '../../components/shop/ShopLayout';
import SEO from '../../components/SEO';
import { 
  Truck, 
  Globe2, 
  PackageCheck, 
  FileCheck2, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { SHIPPING_DESTINATIONS } from '../../data/shopData';
import { useShop } from '../../context/ShopContext';
import { formatPrice } from '../../utils/shopCurrency';

export const ShopShippingPolicyPage: React.FC = () => {
  const { currency } = useShop();

  return (
    <ShopLayout>
      <SEO 
        title="Kebijakan Pengiriman (Shipping Policy) - Mannazentrum Shop"
        description="Panduan dan kebijakan pengiriman produk kebutuhan harian keluarga Mannazentrum Shop ke seluruh wilayah Indonesia dan negara-negara Asia Tenggara."
        canonicalPath="/shipping-policy"
      />

      {/* Hero Header */}
      <section className="bg-slate-900 text-white py-14 md:py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-amber-400 font-semibold uppercase tracking-[0.2em] text-xs block">
            Jalur Logistik & Ekspedisi
          </span>
          <h1 className="text-3xl sm:text-5xl font-light text-white tracking-tight">
            Kebijakan & Panduan Pengiriman
          </h1>
          <p className="text-slate-300 font-light text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Melayani pengantaran cepat, higienis, dan aman ke seluruh pelosok Indonesia serta negara mitra di Asia Tenggara.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-14 md:py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12 text-slate-700 text-sm leading-relaxed">
        
        {/* Section 1: Ringkasan Tarif & Destinasi */}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 flex items-center gap-2.5">
            <Globe2 className="w-6 h-6 text-amber-600" />
            <span>1. Destinasi yang Dilayani & Estimasi Waktu Tiba</span>
          </h2>
          <p className="text-slate-600 font-light">
            Kami mengirimkan pesanan dari pusat gudang kami di kawasan Cisauk / Tangerang (Banten) dan Jawa Barat dengan pilihan ekspedisi terpercaya berikut:
          </p>

          <div className="border border-stone-200 rounded-3xl overflow-hidden divide-y divide-stone-200 text-xs mt-4">
            {SHIPPING_DESTINATIONS.map((dest) => (
              <div key={dest.code} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white hover:bg-[#FAF9F5] transition">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{dest.flag}</span>
                  <div>
                    <span className="font-bold text-slate-900 block text-sm">{dest.nameId}</span>
                    <span className="text-slate-500 font-light">Kurir: {dest.courier}</span>
                  </div>
                </div>
                <div className="text-left sm:text-right shrink-0">
                  <span className="font-bold text-amber-900 text-sm block">
                    Tarif dasar: {formatPrice(dest.baseRateIdr, currency)} / kg
                  </span>
                  <span className="text-slate-400 text-[11px]">
                    +{formatPrice(dest.perKgRateIdr, currency)} / kg selanjutnya
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Jadwal & Pemrosesan Pesanan */}
        <div className="space-y-4 pt-4 border-t border-stone-200">
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 flex items-center gap-2.5">
            <Clock className="w-6 h-6 text-amber-600" />
            <span>2. Jam Operasional & Batas Waktu Pemrosesan (Cut-off Time)</span>
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 font-light">
            <li>
              <strong>Pesanan Masuk Sebelum 14.00 WIB:</strong> Akan diproses dan diserahkan ke pihak ekspedisi pada hari yang sama (Senin – Sabtu).
            </li>
            <li>
              <strong>Pesanan Masuk Setelah 14.00 WIB:</strong> Akan diproses pada hari kerja berikutnya untuk memastikan paket tidak tertimbun di gudang transit ekspedisi.
            </li>
            <li>
              <strong>Hari Minggu & Libur Nasional:</strong> Tidak ada jadwal pengiriman kurir reguler, namun pemesanan melalui website tetap beroperasi 24 jam dan akan dikirim pada hari kerja pertama berikutnya.
            </li>
          </ul>
        </div>

        {/* Section 3: Standar Proteksi Kemasan Makanan & Benih Tanaman */}
        <div className="space-y-4 pt-4 border-t border-stone-200">
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 flex items-center gap-2.5">
            <PackageCheck className="w-6 h-6 text-amber-600" />
            <span>3. Standar Pengemasan Vakum & Karantina Tanaman</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            
            <div className="bg-[#FAF9F5] p-5 rounded-2xl border border-stone-200/70 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">Kemasan Bahan Pangan & Rempah</h4>
              <p className="text-xs text-slate-600 font-light leading-relaxed">
                Beras organik, madu hutan, dan rempah bumbu dikemas dengan plastik food-grade kedap udara (vacuum sealed) tebal 120 micron, melindungi dari kelembaban udara tropis dan kebocoran selama penerbangan kargo udara.
              </p>
            </div>

            <div className="bg-[#FAF9F5] p-5 rounded-2xl border border-stone-200/70 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">Kemasan Benih Sayur & Tanaman Hidup</h4>
              <p className="text-xs text-slate-600 font-light leading-relaxed">
                Benih telah melalui proses pengeringan dengan kadar air standar (&lt;7%) dan dikemas dalam amplop aluminium foil tersegel. Tanaman herbal hidup dilengkapi hidrogel pelembab pada media tanam dan tabung pelindung batang daun.
              </p>
            </div>

          </div>
        </div>

        {/* Section 4: Pelacakan Resi & Notifikasi */}
        <div className="space-y-4 pt-4 border-t border-stone-200">
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 flex items-center gap-2.5">
            <FileCheck2 className="w-6 h-6 text-amber-600" />
            <span>4. Pelacakan Nomor Resi (Airway Bill)</span>
          </h2>
          <p className="text-slate-600 font-light leading-relaxed">
            Setelah paket diserahkan ke pihak kurir logistik (JNE, SiCepat, Pos Indonesia EMS, DHL), pembeli akan menerima nomor resi resmi yang dikirimkan melalui notifikasi pesan WhatsApp atau email yang terdaftar. Anda dapat melacak posisi perjalanan paket Anda secara real-time kapan saja.
          </p>
        </div>

        {/* Section 5: Garansi Kerusakan di Perjalanan */}
        <div className="bg-amber-50/70 border border-amber-200/70 p-6 sm:p-8 rounded-3xl space-y-3">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-base">
            <ShieldCheck className="w-5 h-5 text-amber-700" />
            <span>Garansi 100% Sampai dengan Selamat</span>
          </div>
          <p className="text-xs sm:text-sm text-amber-900/90 font-light leading-relaxed">
            Jika paket Anda tiba dalam kondisi kemasan rusak, bocor, atau isi barang kurang akibat kelalaian penanganan kurir ekspedisi, cukup sertakan video unboxing singkat dan hubungi CS WhatsApp kami. Kami akan mengirimkan paket pengganti tanpa biaya tambahan.
          </p>
        </div>

      </section>
    </ShopLayout>
  );
};
