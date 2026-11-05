import React from 'react';
import { Link } from 'react-router-dom';
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
  onSelectCategory?: (cat: string) => void;
}

export const ShopFooter: React.FC<ShopFooterProps> = ({
  language,
  onOpenShippingInfo,
  onSelectCategory,
}) => {
  return (
    <footer className="bg-slate-900 text-slate-300 font-sans border-t border-slate-800">
      
      {/* 4 Pillar Badges */}
      <div className="border-b border-slate-800 bg-slate-950/60 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          
          <Link to="/shipping-policy" className="flex items-start gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-slate-800 text-amber-400 flex items-center justify-center shrink-0 border border-slate-700 group-hover:bg-amber-500 group-hover:text-slate-950 transition">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-white text-xs sm:text-sm group-hover:text-amber-400 transition">
                {language === 'id' ? 'Kirim Se-Indonesia & ASEAN' : 'ASEAN & Domestic Shipping'}
              </h5>
              <p className="text-[11px] text-slate-400 font-light mt-0.5">
                {language === 'id' ? 'Layanan cepat ke Malaysia, SG, & nusantara' : 'Reliable air courier to ID, SG, MY & ASEAN'}
              </p>
            </div>
          </Link>

          <Link to="/about-us" className="flex items-start gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-slate-800 text-amber-400 flex items-center justify-center shrink-0 border border-slate-700 group-hover:bg-amber-500 group-hover:text-slate-950 transition">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-white text-xs sm:text-sm group-hover:text-amber-400 transition">
                {language === 'id' ? '100% Produk Alami & Aman' : '100% Pure & Safe Quality'}
              </h5>
              <p className="text-[11px] text-slate-400 font-light mt-0.5">
                {language === 'id' ? 'Beras organik, madu mentah, benih unggul' : 'Certified organic pantry, non-toxic apparel'}
              </p>
            </div>
          </Link>

          <Link to="/return-policy" className="flex items-start gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-slate-800 text-amber-400 flex items-center justify-center shrink-0 border border-slate-700 group-hover:bg-amber-500 group-hover:text-slate-950 transition">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-white text-xs sm:text-sm group-hover:text-amber-400 transition">
                {language === 'id' ? 'Garansi Pengiriman Prima' : 'Safe Arrival Guarantee'}
              </h5>
              <p className="text-[11px] text-slate-400 font-light mt-0.5">
                {language === 'id' ? 'Ganti baru jika kemasan rusak saat sampai' : 'Free item replacement if damaged on arrival'}
              </p>
            </div>
          </Link>

          <Link to="/contact" className="flex items-start gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-slate-800 text-amber-400 flex items-center justify-center shrink-0 border border-slate-700 group-hover:bg-amber-500 group-hover:text-slate-950 transition">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-white text-xs sm:text-sm group-hover:text-amber-400 transition">
                {language === 'id' ? 'Layanan Ramah Pelanggan' : 'Responsive Customer Care'}
              </h5>
              <p className="text-[11px] text-slate-400 font-light mt-0.5">
                {language === 'id' ? 'Konsultasi produk via WhatsApp aktif' : 'Direct product help via WhatsApp desk'}
              </p>
            </div>
          </Link>

        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-white text-slate-900 rounded-xl flex items-center justify-center font-bold text-lg shadow-sm group-hover:bg-amber-500 transition">
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
            </Link>

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

          {/* Kategori Cepat (category/...) */}
          <div className="space-y-3">
            <h6 className="font-medium text-white text-xs uppercase tracking-widest text-slate-300">
              <Link to="/category" className="hover:text-amber-400 transition">Kategori Produk</Link>
            </h6>
            <ul className="space-y-2.5 text-xs text-slate-400 font-light">
              <li>
                <Link to="/category/pakaian" className="hover:text-amber-400 transition block">
                  Pakaian & Fashion Keluarga
                </Link>
              </li>
              <li>
                <Link to="/category/makanan" className="hover:text-amber-400 transition block">
                  Beras & Sembako Organik
                </Link>
              </li>
              <li>
                <Link to="/category/tanaman" className="hover:text-amber-400 transition block">
                  Bibit Sayuran & Tanaman Hidup
                </Link>
              </li>
              <li>
                <Link to="/category/harian" className="hover:text-amber-400 transition block">
                  Perawatan Alami & Rumah
                </Link>
              </li>
              <li>
                <Link to="/category/paket" className="hover:text-amber-400 transition block">
                  Paket Bundling Hemat
                </Link>
              </li>
            </ul>
          </div>

          {/* Jangkauan & Kebijakan (shipping-policy, return-policy, blog, about-us) */}
          <div className="space-y-3">
            <h6 className="font-medium text-white text-xs uppercase tracking-widest text-slate-300">
              Informasi & Kebijakan
            </h6>
            <ul className="space-y-2.5 text-xs text-slate-400 font-light">
              <li>
                <Link to="/about-us" className="hover:text-amber-400 transition block">
                  Tentang Kami (About Us)
                </Link>
              </li>
              <li>
                <Link to="/shipping-policy" className="hover:text-amber-400 transition block">
                  Kebijakan Pengiriman (Shipping Policy)
                </Link>
              </li>
              <li>
                <Link to="/return-policy" className="hover:text-amber-400 transition block">
                  Kebijakan Retur & Garansi
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-amber-400 transition block">
                  Blog & Tips Belanja Keluarga
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-amber-400 transition block">
                  Hubungi Kami (Contact)
                </Link>
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
