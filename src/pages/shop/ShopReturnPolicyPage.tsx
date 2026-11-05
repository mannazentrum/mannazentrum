import React from 'react';
import { ShopLayout } from '../../components/shop/ShopLayout';
import SEO from '../../components/SEO';
import { useShop } from '../../context/ShopContext';
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
  const { returnPolicyContent, language } = useShop();

  return (
    <ShopLayout>
      <SEO 
        title={language === 'en'
          ? "Return Policy & Guarantee - Mannazentrum Shop"
          : "Kebijakan Pengembalian & Garansi (Return Policy) - Mannazentrum Shop"}
        description={language === 'en'
          ? "Warranty guidelines, apparel exchange policy, food vacuum-seal damage claims, and hassle-free replacements."
          : "Informasi garansi, prosedur penukaran pakaian, klaim kerusakan makanan & benih tanaman di Mannazentrum Shop."}
        canonicalPath="/return-policy"
      />

      {/* Hero Header */}
      <section className="bg-slate-900 text-white py-14 md:py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-amber-400 font-semibold uppercase tracking-[0.2em] text-xs block">
            {language === 'en' ? 'Satisfaction Guarantee & Returns' : (returnPolicyContent?.badge || 'Jaminan Kepuasan & Retur')}
          </span>
          <h1 className="text-3xl sm:text-5xl font-light text-white tracking-tight">
            {language === 'en' ? 'Returns & Replacement Policy' : (returnPolicyContent?.title || 'Kebijakan Pengembalian & Garansi')}
          </h1>
          <p className="text-slate-300 font-light text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            {language === 'en'
              ? 'Your family peace of mind is our utmost priority. We provide straightforward replacements without burdensome bureaucratic hurdles.'
              : (returnPolicyContent?.subtitle || 'Kepuasan dan ketenangan berbelanja keluarga Anda adalah prioritas utama kami. Kami menyediakan garansi penggantian tanpa proses birokrasi berbelit.')}
          </p>
        </div>
      </section>

      {/* Policy Details */}
      <section className="py-14 md:py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12 text-slate-700 text-sm leading-relaxed">
        
        {/* Section 1: Garansi Penggantian Barang Rusak */}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-amber-600" />
            <span>{language === 'en' ? '1. 100% Transit Damage Replacement Guarantee' : '1. Garansi 100% Penggantian Barang Rusak saat Pengiriman'}</span>
          </h2>
          <p className="text-slate-600 font-light">
            {language === 'en'
              ? 'We ensure every product reaches your doorstep in pristine condition. You are entitled to a free new replacement parcel in any of the following cases:'
              : 'Kami menjamin setiap produk sampai di alamat Anda dalam kondisi sempurna. Anda berhak mendapatkan penggantian produk baru secara gratis jika terjadi:'}
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 font-light">
            <li>{language === 'en' ? 'A vacuum-sealed pantry pouch (rice, grains, raw honey) arrives punctured or deflated upon opening.' : 'Kemasan vakum makanan (beras/rempah) robek, kempes, atau bocor saat paket dibuka pertama kali.'}</li>
            <li>{language === 'en' ? 'Bottles of raw honey, VCO, natural soap, or liquid plant foods crack or leak during transit.' : 'Botol cairan madu, VCO, sabun, atau pupuk cair pecah dalam perjalanan ekspedisi.'}</li>
            <li>{language === 'en' ? 'Live potted plants or herbs arrive damaged or dried due to severe courier delays.' : 'Tanaman herbal hidup patah atau mati akibat keterlambatan ekstrem dari pihak kurir.'}</li>
            <li>{language === 'en' ? 'Fabric defects, faulty stitching, or stains are found on newly received family apparel.' : 'Terdapat cacat jahitan atau noda permanen pabrik pada pakaian keluarga yang diterima.'}</li>
          </ul>
        </div>

        {/* Section 2: Garansi Daya Tumbuh Benih Sayuran */}
        <div className="space-y-4 pt-4 border-t border-stone-200">
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 flex items-center gap-2.5">
            <CheckCircle2 className="w-6 h-6 text-amber-600" />
            <span>{language === 'en' ? '2. Special Garden Seed Germination Warranty' : '2. Garansi Khusus Benih Tanaman Sayur & Herbal'}</span>
          </h2>
          <p className="text-slate-600 font-light">
            {language === 'en'
              ? 'All certified seeds undergo germination trials with over 85% success rates. If your sown seeds follow the supplied instructions and fail to sprout within 14 days, our agronomy team will dispatch 1 fresh seed packet replacement free of charge.'
              : 'Kami menguji setiap kelompok benih dengan standar daya tumbuh di atas 85%. Jika benih yang Anda semai sesuai buku panduan dalam waktu 14 hari tidak berkecambah sama sekali, tim agro kami akan mengirimkan 1 paket benih baru pengganti secara cuma-cuma.'}
          </p>
        </div>

        {/* Section 3: Penukaran Ukuran Pakaian Keluarga */}
        <div className="space-y-4 pt-4 border-t border-stone-200">
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 flex items-center gap-2.5">
            <RotateCcw className="w-6 h-6 text-amber-600" />
            <span>{language === 'en' ? '3. Apparel Size Exchange Policy' : '3. Penukaran Ukuran (Size Exchange) Pakaian'}</span>
          </h2>
          <p className="text-slate-600 font-light">
            {language === 'en'
              ? 'For kids and family apparel (pajamas, organic tees, loungewear), size exchanges are accepted under the following conditions:'
              : 'Untuk produk pakaian anak (piyama, kaos katun bambu, setelan rumah), penukaran ukuran diperbolehkan dengan ketentuan:'}
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 font-light">
            <li>{language === 'en' ? 'Exchange requests submitted within 3 calendar days of receipt.' : 'Pengajuan dilakukan maksimal 3 hari kalender sejak paket diterima.'}</li>
            <li>{language === 'en' ? 'Garments must be unwashed, unworn, and have brand hangtags intact.' : 'Pakaian belum dicuci, belum digunakan, dan label merek/hangtag masih terpasang rapi.'}</li>
            <li>{language === 'en' ? 'Return shipping is borne by the customer, unless the mismatch arose from an incorrect warehouse pick.' : 'Ongkos kirim penukaran ditanggung oleh pembeli, kecuali jika penukaran terjadi karena kelalaian pengiriman ukuran yang salah dari pihak gudang kami.'}</li>
          </ul>
        </div>

        {/* Section 4: Cara Mengajukan Klaim Garansi */}
        <div className="space-y-4 pt-4 border-t border-stone-200">
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 flex items-center gap-2.5">
            <Clock className="w-6 h-6 text-amber-600" />
            <span>{language === 'en' ? '4. 3-Step Simple Claim Process' : '4. Cara Mudah Mengajukan Klaim (Tanpa Birokrasi)'}</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="bg-[#FAF9F5] p-5 rounded-2xl border border-stone-200/70 space-y-2 text-xs">
              <span className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-xs">1</span>
              <h4 className="font-bold text-slate-900 text-sm">
                {language === 'en' ? 'Snap Photo / Video' : 'Ambil Foto / Video'}
              </h4>
              <p className="text-slate-500 font-light">
                {language === 'en'
                  ? 'Record a brief unboxing clip or snap clear photos of the damaged goods.'
                  : 'Ambil foto atau video singkat kondisi barang yang rusak saat unboxing.'}
              </p>
            </div>

            <div className="bg-[#FAF9F5] p-5 rounded-2xl border border-stone-200/70 space-y-2 text-xs">
              <span className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-xs">2</span>
              <h4 className="font-bold text-slate-900 text-sm">
                {language === 'en' ? 'Send via WhatsApp' : 'Kirim ke WhatsApp'}
              </h4>
              <p className="text-slate-500 font-light">
                {language === 'en'
                  ? 'Forward photos and your Order ID to our WhatsApp desk at +62 878-8111-0807.'
                  : 'Kirimkan bukti dan No. Pesanan Anda ke CS WhatsApp kami di +62 878-8111-0807.'}
              </p>
            </div>

            <div className="bg-[#FAF9F5] p-5 rounded-2xl border border-stone-200/70 space-y-2 text-xs">
              <span className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-xs">3</span>
              <h4 className="font-bold text-slate-900 text-sm">
                {language === 'en' ? 'Fast Replacement' : 'Penggantian Dikirim'}
              </h4>
              <p className="text-slate-500 font-light">
                {language === 'en'
                  ? 'Our warehouse dispatches replacement parcels within 24 business hours.'
                  : 'Tim gudang langsung memproses pengiriman produk pengganti dalam 1x24 jam kerja.'}
              </p>
            </div>
          </div>
        </div>

        {/* Section 5: Pengembalian Dana (Refund) */}
        <div className="space-y-4 pt-4 border-t border-stone-200">
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 flex items-center gap-2.5">
            <AlertCircle className="w-6 h-6 text-amber-600" />
            <span>{language === 'en' ? '5. Refund Policy' : '5. Pengembalian Dana (Refund)'}</span>
          </h2>
          <p className="text-slate-600 font-light leading-relaxed">
            {language === 'en'
              ? 'If an eligible replacement item is out of stock, we provide a 100% full refund returned to your original bank account or e-wallet within 2 business days.'
              : 'Apabila produk pengganti sedang mengalami kekosongan stok (out of stock), kami akan menawarkan pengembalian dana 100% (full refund) yang ditransfer kembali ke rekening bank atau dompet elektronik pembeli dalam waktu maksimal 2 hari kerja.'}
          </p>
        </div>

        {/* Quick Contact CTA */}
        <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <span className="font-bold text-base block">
              {language === 'en' ? 'Need help with a return or replacement?' : 'Butuh bantuan pengajuan garansi atau penukaran?'}
            </span>
            <span className="text-xs text-slate-400 font-light">
              {language === 'en' ? 'Contact our WhatsApp care desk for immediate support' : 'Hubungi CS WhatsApp kami untuk bantuan kilat'}
            </span>
          </div>
          <a
            href="https://wa.me/6287881110807?text=Halo%20Admin%20Mannazentrum%20Shop,%20saya%20ingin%20mengajukan%20klaim%20garansi/retur."
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-6 py-3 rounded-full transition shadow-md"
          >
            {language === 'en' ? 'Chat Care Desk' : 'Chat CS Garansi'}
          </a>
        </div>

      </section>
    </ShopLayout>
  );
};
