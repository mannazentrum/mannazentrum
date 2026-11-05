import React from 'react';
import { ShopLayout } from '../../components/shop/ShopLayout';
import SEO from '../../components/SEO';
import { 
  RotateCcw, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  MessageCircle,
  HelpCircle
} from 'lucide-react';

export const ShopReturnPolicyPage: React.FC = () => {
  return (
    <ShopLayout>
      <SEO 
        title="Kebijakan Pengembalian & Garansi (Return Policy) - Mannazentrum Shop"
        description="Informasi garansi, prosedur penukaran pakaian, klaim kerusakan makanan & benih tanaman di Mannazentrum Shop."
        canonicalPath="/return-policy"
      />

      {/* Hero Header */}
      <section className="bg-slate-900 text-white py-14 md:py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-amber-400 font-semibold uppercase tracking-[0.2em] text-xs block">
            Jaminan Kepuasan & Retur
          </span>
          <h1 className="text-3xl sm:text-5xl font-light text-white tracking-tight">
            Kebijakan Pengembalian & Garansi
          </h1>
          <p className="text-slate-300 font-light text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Kepuasan dan ketenangan berbelanja keluarga Anda adalah prioritas utama kami. Kami menyediakan garansi penggantian tanpa proses birokrasi berbelit.
          </p>
        </div>
      </section>

      {/* Policy Details */}
      <section className="py-14 md:py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12 text-slate-700 text-sm leading-relaxed">
        
        {/* Section 1: Garansi Penggantian Barang Rusak */}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-amber-600" />
            <span>1. Garansi 100% Penggantian Barang Rusak saat Pengiriman</span>
          </h2>
          <p className="text-slate-600 font-light">
            Kami menjamin setiap produk sampai di alamat Anda dalam kondisi sempurna. Anda berhak mendapatkan penggantian produk baru secara gratis jika terjadi:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 font-light">
            <li>Kemasan vakum makanan (beras/rempah) robek, kempes, atau bocor saat paket dibuka pertama kali.</li>
            <li>Botol cairan madu, VCO, sabun, atau pupuk cair pecah dalam perjalanan ekspedisi.</li>
            <li>Tanaman herbal hidup patah atau mati akibat keterlambatan ekstrem dari pihak kurir.</li>
            <li>Terdapat cacat jahitan atau noda permanen pabrik pada pakaian keluarga yang diterima.</li>
          </ul>
        </div>

        {/* Section 2: Garansi Daya Tumbuh Benih Sayuran */}
        <div className="space-y-4 pt-4 border-t border-stone-200">
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 flex items-center gap-2.5">
            <CheckCircle2 className="w-6 h-6 text-amber-600" />
            <span>2. Garansi Khusus Benih Tanaman Sayur & Herbal</span>
          </h2>
          <p className="text-slate-600 font-light">
            Kami menguji setiap kelompok benih dengan standar daya tumbuh di atas 85%. Jika benih yang Anda semai sesuai buku panduan dalam waktu 14 hari tidak berkecambah sama sekali, tim agro kami akan mengirimkan <strong>1 paket benih baru pengganti secara cuma-cuma</strong>.
          </p>
        </div>

        {/* Section 3: Penukaran Ukuran Pakaian Keluarga */}
        <div className="space-y-4 pt-4 border-t border-stone-200">
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 flex items-center gap-2.5">
            <RotateCcw className="w-6 h-6 text-amber-600" />
            <span>3. Penukaran Ukuran (Size Exchange) Pakaian</span>
          </h2>
          <p className="text-slate-600 font-light">
            Untuk produk pakaian anak (piyama, kaos katun bambu, setelan rumah), penukaran ukuran diperbolehkan dengan ketentuan:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 font-light">
            <li>Pengajuan dilakukan maksimal <strong>3 hari kalender</strong> sejak paket diterima.</li>
            <li>Pakaian belum dicuci, belum digunakan, dan label merek/hangtag masih terpasang rapi.</li>
            <li>Ongkos kirim penukaran ditanggung oleh pembeli, kecuali jika penukaran terjadi karena kelalaian pengiriman ukuran yang salah dari pihak gudang kami.</li>
          </ul>
        </div>

        {/* Section 4: Cara Mengajukan Klaim Garansi */}
        <div className="space-y-4 pt-4 border-t border-stone-200">
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 flex items-center gap-2.5">
            <Clock className="w-6 h-6 text-amber-600" />
            <span>4. Cara Mudah Mengajukan Klaim (Tanpa Birokrasi)</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="bg-[#FAF9F5] p-5 rounded-2xl border border-stone-200/70 space-y-2 text-xs">
              <span className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-xs">1</span>
              <h4 className="font-bold text-slate-900 text-sm">Ambil Foto / Video</h4>
              <p className="text-slate-500 font-light">
                Ambil foto atau video singkat kondisi barang yang rusak saat unboxing.
              </p>
            </div>

            <div className="bg-[#FAF9F5] p-5 rounded-2xl border border-stone-200/70 space-y-2 text-xs">
              <span className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-xs">2</span>
              <h4 className="font-bold text-slate-900 text-sm">Kirim ke WhatsApp</h4>
              <p className="text-slate-500 font-light">
                Kirimkan bukti dan No. Pesanan Anda ke CS WhatsApp kami di +62 878-8111-0807.
              </p>
            </div>

            <div className="bg-[#FAF9F5] p-5 rounded-2xl border border-stone-200/70 space-y-2 text-xs">
              <span className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-xs">3</span>
              <h4 className="font-bold text-slate-900 text-sm">Penggantian Dikirim</h4>
              <p className="text-slate-500 font-light">
                Tim gudang langsung memproses pengiriman produk pengganti dalam 1x24 jam kerja.
              </p>
            </div>
          </div>
        </div>

        {/* Section 5: Pengembalian Dana (Refund) */}
        <div className="space-y-4 pt-4 border-t border-stone-200">
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 flex items-center gap-2.5">
            <AlertCircle className="w-6 h-6 text-amber-600" />
            <span>5. Pengembalian Dana (Refund)</span>
          </h2>
          <p className="text-slate-600 font-light leading-relaxed">
            Apabila produk pengganti sedang mengalami kekosongan stok (*out of stock*), kami akan menawarkan pengembalian dana 100% (*full refund*) yang ditransfer kembali ke rekening bank atau dompet elektronik pembeli dalam waktu maksimal 2 hari kerja.
          </p>
        </div>

        {/* Quick Contact CTA */}
        <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <span className="font-bold text-base block">Butuh bantuan pengajuan garansi atau penukaran?</span>
            <span className="text-xs text-slate-400 font-light">Hubungi CS WhatsApp kami untuk bantuan kilat</span>
          </div>
          <a
            href="https://wa.me/6287881110807?text=Halo%20Admin%20Mannazentrum%20Shop,%20saya%20ingin%20mengajukan%20klaim%20garansi/retur."
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-6 py-3 rounded-full transition shadow-md"
          >
            Chat CS Garansi
          </a>
        </div>

      </section>
    </ShopLayout>
  );
};
