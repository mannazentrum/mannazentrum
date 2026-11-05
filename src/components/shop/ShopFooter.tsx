import React from 'react';
import { 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  MessageCircle, 
  Mail, 
  MapPin, 
  ExternalLink
} from 'lucide-react';

interface ShopFooterProps {
  language: 'id' | 'en';
  onOpenShippingInfo: () => void;
  onSelectCategory: (cat: string) => void;
}

export const ShopFooter: React.FC<ShopFooterProps> = ({
  language,
  onOpenShippingInfo,
  onSelectCategory,
}) => {
  return (
    <footer className="bg-slate-900 text-slate-300 font-sans border-t border-slate-800">
      
      {/* 4 Pillar Badges (Matching Mannazentrum's Slate-900 & Amber accent style) */}
      <div className="border-b border-slate-800 bg-slate-950/60 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 text-amber-400 flex items-center justify-center shrink-0 border border-slate-700">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-white text-xs sm:text-sm">
                {language === 'id' ? 'Kirim Se-Indonesia & ASEAN' : 'ASEAN & Domestic Shipping'}
              </h5>
              <p className="text-[11px] text-slate-400 font-light mt-0.5">
                {language === 'id' ? 'Layanan cepat ke Malaysia, SG, & nusantara' : 'Reliable air courier to ID, SG, MY & ASEAN'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 text-amber-400 flex items-center justify-center shrink-0 border border-slate-700">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-white text-xs sm:text-sm">
                {language === 'id' ? '100% Produk Alami & Aman' : '100% Pure & Safe Quality'}
              </h5>
              <p className="text-[11px] text-slate-400 font-light mt-0.5">
                {language === 'id' ? 'Beras organik, madu mentah, benih unggul' : 'Certified organic pantry, non-toxic apparel'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 text-amber-400 flex items-center justify-center shrink-0 border border-slate-700">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-white text-xs sm:text-sm">
                {language === 'id' ? 'Garansi Pengiriman Prima' : 'Safe Arrival Guarantee'}
              </h5>
              <p className="text-[11px] text-slate-400 font-light mt-0.5">
                {language === 'id' ? 'Ganti baru jika kemasan rusak saat sampai' : 'Free item replacement if damaged on arrival'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 text-amber-400 flex items-center justify-center shrink-0 border border-slate-700">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-white text-xs sm:text-sm">
                {language === 'id' ? 'Layanan Ramah Pelanggan' : 'Responsive Customer Care'}
              </h5>
              <p className="text-[11px] text-slate-400 font-light mt-0.5">
                {language === 'id' ? 'Konsultasi produk via WhatsApp aktif' : 'Direct product help via WhatsApp desk'}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand Info (Aligned with Mannazentrum Logo Style) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white text-slate-900 rounded-xl flex items-center justify-center font-bold text-lg shadow-sm">
                M
              </div>
              <div>
                <span className="font-semibold text-lg text-white tracking-tight block">
                  Mannazentrum <span className="text-amber-400">Shop</span>
                </span>
                <span className="text-[10px] uppercase tracking-widest text-slate-400">
                  PT. Elrafa Terang Sejahtera
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 font-light leading-relaxed max-w-sm">
              {language === 'id'
                ? 'Pusat belanja online terpadu untuk kebutuhan harian keluarga modern: pakaian katun organik, sembako & makanan sehat, tanaman & benih pekarangan rumah, serta produk ramah lingkungan berstandar nusantara dan Asia Tenggara.'
                : 'Your integrated family daily living store: organic cotton apparel, wholesome pantry groceries, seeds & plants for home gardening, delivering across Indonesia and Southeast Asia.'}
            </p>

            <div className="pt-2 text-xs space-y-2 text-slate-400 font-light">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Pusat Distribusi: Cisauk / Serpong, Tangerang & Jawa Barat, Indonesia</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>shop@mannazentrum.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>WhatsApp Toko: +62 878-8111-0807 (Senin - Sabtu: 08.00 - 18.00 WIB)</span>
              </div>
            </div>
          </div>

          {/* Kategori Cepat */}
          <div className="space-y-3">
            <h6 className="font-medium text-white text-xs uppercase tracking-widest text-slate-300">
              {language === 'id' ? 'Kategori Produk' : 'Product Categories'}
            </h6>
            <ul className="space-y-2.5 text-xs text-slate-400 font-light">
              <li>
                <button onClick={() => onSelectCategory('pakaian')} className="hover:text-amber-400 transition text-left">
                  {language === 'id' ? 'Pakaian & Fashion Keluarga' : 'Family Daily Apparel'}
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('makanan')} className="hover:text-amber-400 transition text-left">
                  {language === 'id' ? 'Beras & Sembako Organik' : 'Organic Groceries & Honey'}
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('tanaman')} className="hover:text-amber-400 transition text-left">
                  {language === 'id' ? 'Bibit Sayuran & Tanaman Hidup' : 'Live Plants & Seeds Pack'}
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('harian')} className="hover:text-amber-400 transition text-left">
                  {language === 'id' ? 'Perawatan Alami & Rumah' : 'Eco-Friendly Home Supplies'}
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('paket')} className="hover:text-amber-400 transition text-left">
                  {language === 'id' ? 'Paket Bundling Hemat' : 'Value Family Bundles'}
                </button>
              </li>
            </ul>
          </div>

          {/* Jangkauan & Bantuan */}
          <div className="space-y-3">
            <h6 className="font-medium text-white text-xs uppercase tracking-widest text-slate-300">
              {language === 'id' ? 'Pengiriman & Layanan' : 'Shipping & Policies'}
            </h6>
            <ul className="space-y-2.5 text-xs text-slate-400 font-light">
              <li>
                <button onClick={onOpenShippingInfo} className="hover:text-amber-400 transition text-left">
                  {language === 'id' ? 'Jalur Pengiriman ASEAN' : 'ASEAN Logistics Coverage'}
                </button>
              </li>
              <li>
                <button onClick={onOpenShippingInfo} className="hover:text-amber-400 transition text-left">
                  {language === 'id' ? 'Standar Kemasan Vakum & Ekspor' : 'Vacuum Packaging Standards'}
                </button>
              </li>
              <li>
                <a 
                  href="https://wa.me/6287881110807?text=Halo%20Admin%20Mannazentrum%20Shop,%20saya%20ingin%20tanya%20kebijakan%20retur%20dan%20klaim." 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-amber-400 transition inline-block"
                >
                  {language === 'id' ? 'Klaim Garansi Kerusakan' : 'Replacement Guarantee'}
                </a>
              </li>
              <li>
                <a 
                  href="https://wa.me/6287881110807?text=Halo%20Admin%20Mannazentrum%20Shop,%20kami%20tertarik%20pembelian%20grosir%20atau%20ekspor." 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-amber-400 transition inline-block"
                >
                  {language === 'id' ? 'Pemesanan Grosir / Reseller' : 'Wholesale & Bulk Orders'}
                </a>
              </li>
            </ul>
          </div>

          {/* Domain Utama Separation Notice & Link */}
          <div className="space-y-3 bg-slate-800/40 p-4 rounded-2xl border border-slate-700/60">
            <h6 className="font-bold text-amber-400 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <span>Portal Utama Mannazentrum</span>
            </h6>
            <p className="text-[11px] text-slate-400 font-light leading-relaxed">
              {language === 'id'
                ? 'shop.mannazentrum.com adalah unit e-commerce resmi mandiri. Untuk portal pendidikan anak, daycare, dan yayasan silakan kunjungi domain utama:'
                : 'shop.mannazentrum.com is the standalone e-commerce portal. To visit our education & daycare foundation, go to:'}
            </p>
            <a
              href="https://www.mannazentrum.com"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition underline underline-offset-4"
            >
              <span>www.mannazentrum.com</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

        {/* Bottom Bar & Payment/Courier Icons */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-light">
          <div>
            © {new Date().getFullYear()} Mannazentrum Shop (shop.mannazentrum.com). PT. Elrafa Terang Sejahtera.
          </div>
          <div className="flex flex-wrap items-center gap-3 text-slate-400">
            <span className="font-semibold text-slate-300">Kurir & Pembayaran:</span>
            <span>JNE</span>
            <span>•</span>
            <span>SiCepat</span>
            <span>•</span>
            <span>Pos Indonesia / EMS</span>
            <span>•</span>
            <span>DHL</span>
            <span>•</span>
            <span>BCA</span>
            <span>•</span>
            <span>Mandiri</span>
            <span>•</span>
            <span>QRIS</span>
            <span>•</span>
            <span>Visa / Master</span>
          </div>
        </div>

      </div>

    </footer>
  );
};
