import React from 'react';
import { 
  X, 
  Truck, 
  Globe, 
  ShieldCheck, 
  PackageCheck, 
  Plane, 
  Clock, 
  HelpCircle,
  FileCheck2
} from 'lucide-react';
import { SHIPPING_DESTINATIONS, CurrencyKey } from '../../data/shopData';
import { formatPrice } from '../../utils/shopCurrency';

interface ShopShippingInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: CurrencyKey;
  language: 'id' | 'en';
}

export const ShopShippingInfoModal: React.FC<ShopShippingInfoModalProps> = ({
  isOpen,
  onClose,
  currency,
  language,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 font-sans animate-in fade-in duration-200">
      <div 
        className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            <Globe className="w-3.5 h-3.5" />
            <span>Indonesia & ASEAN Cross-Border Logistics</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            {language === 'id' ? 'Jangkauan & Panduan Pengiriman' : 'Shipping Coverage & Guidelines'}
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            {language === 'id'
              ? 'Manna Shop menjangkau seluruh pulau di Indonesia serta negara Asia Tenggara dengan kurir terpercaya dan protokol proteksi kemasan makanan & tanaman standar ekspor.'
              : 'Manna Shop ships across Indonesia archipelago and Southeast Asian countries with trusted air express partners and food/plant safety packaging standards.'}
          </p>
        </div>

        {/* Rates & Destination Grid */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
            <Truck className="w-4 h-4 text-emerald-700" />
            <span>{language === 'id' ? 'Daftar Tarif & Estimasi Waktu Tiba' : 'Rates & Estimated Delivery Time'}</span>
          </h4>

          <div className="border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-200 text-xs">
            {SHIPPING_DESTINATIONS.map((dest) => (
              <div key={dest.code} className="p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-50 transition">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{dest.flag}</span>
                  <div>
                    <span className="font-bold text-slate-900 block">{language === 'id' ? dest.nameId : dest.nameEn}</span>
                    <span className="text-[11px] text-slate-500">{dest.courier}</span>
                  </div>
                </div>
                <div className="text-right sm:text-right shrink-0">
                  <span className="font-extrabold text-emerald-800 block text-sm">
                    {formatPrice(dest.baseRateIdr, currency)}
                    <span className="text-[10px] font-normal text-slate-500"> / kg awal</span>
                  </span>
                  <span className="text-[10px] text-slate-400">
                    +{formatPrice(dest.perKgRateIdr, currency)} / kg berikutnya
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Safety Packaging Protocols */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-1.5 text-xs">
            <PackageCheck className="w-5 h-5 text-emerald-700 mb-1" />
            <h5 className="font-bold text-slate-900">
              {language === 'id' ? 'Vakum & Kedap Udara' : 'Vacuum Sealed Food'}
            </h5>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              {language === 'id'
                ? 'Beras, rempah, dan madu dikemas vakum food-grade tebal, aman dari kebocoran dan tahan suhu udara selama transit pesawat.'
                : 'Rice, spices, and honey are packed in vacuum-sealed food-grade barriers.'}
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-1.5 text-xs">
            <FileCheck2 className="w-5 h-5 text-emerald-700 mb-1" />
            <h5 className="font-bold text-slate-900">
              {language === 'id' ? 'Karantina & Benih Aman' : 'Seed Quarantine Safe'}
            </h5>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              {language === 'id'
                ? 'Benih sayuran dan herbal kami dikeringkan dengan kadar air standar (<7%) dan lolos verifikasi kepatuhan ekspor/impor agrikultur.'
                : 'Seeds are lab-tested with <7% moisture content, compliant with regional plant regulations.'}
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-1.5 text-xs">
            <ShieldCheck className="w-5 h-5 text-emerald-700 mb-1" />
            <h5 className="font-bold text-slate-900">
              {language === 'id' ? 'Garansi Kerusakan' : 'Arrival Guarantee'}
            </h5>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              {language === 'id'
                ? 'Jika produk pecah, cacat, atau rusak dalam perjalanan ekspedisi, kami kirimkan penggantian 100% tanpa biaya tambahan.'
                : 'Free replacement guarantee if items arrive damaged during transit.'}
            </p>
          </div>

        </div>

        {/* Direct CS Help */}
        <div className="bg-emerald-950 text-white rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-amber-300 shrink-0" />
            <div>
              <span className="font-bold block">
                {language === 'id' ? 'Punya pertanyaan khusus tentang ekspor atau volume besar?' : 'Need bulk order or special destination delivery?'}
              </span>
              <span className="text-emerald-200 text-[11px]">
                {language === 'id' ? 'Hubungi tim logistik kami via WhatsApp' : 'Contact our logistics desk directly via WhatsApp'}
              </span>
            </div>
          </div>
          <a
            href="https://wa.me/6287881110807?text=Halo%20Admin%20Logistik%20Manna%20Shop,%20saya%20ingin%20tanya%20pengiriman%20internasional."
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2 rounded-full transition text-xs"
          >
            Chat Tim Logistik
          </a>
        </div>

      </div>
    </div>
  );
};
