import React, { useState } from 'react';
import { 
  X, 
  Star, 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  Package, 
  Check, 
  Share2, 
  Sparkles,
  Info
} from 'lucide-react';
import { ShopProduct, CurrencyKey } from '../../data/shopData';
import { formatPrice } from '../../utils/shopCurrency';

interface ShopProductModalProps {
  product: ShopProduct | null;
  onClose: () => void;
  currency: CurrencyKey;
  language: 'id' | 'en';
  onAddToCart: (product: ShopProduct, quantity: number) => void;
  onDirectCheckout: (product: ShopProduct, quantity: number) => void;
}

export const ShopProductModal: React.FC<ShopProductModalProps> = ({
  product,
  onClose,
  currency,
  language,
  onAddToCart,
  onDirectCheckout,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [copied, setCopied] = useState(false);

  if (!product) return null;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-slate-100 text-slate-700 flex items-center justify-center shadow-md transition"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Product Image Area */}
          <div className="relative bg-slate-100 aspect-square md:aspect-auto overflow-hidden">
            <img
              src={product.image}
              alt={language === 'id' ? product.name : product.nameEn}
              className="w-full h-full object-cover"
            />
            
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5 items-start">
              {product.badges.map((b, i) => (
                <span 
                  key={i} 
                  className="bg-emerald-700 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm uppercase tracking-wider"
                >
                  {b}
                </span>
              ))}
              {product.isAseanReady && (
                <span className="bg-amber-400 text-slate-900 text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                  <span>🌏</span> {language === 'id' ? 'Siap Kirim ASEAN' : 'ASEAN Shipping Ready'}
                </span>
              )}
            </div>
          </div>

          {/* Product Details Area */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            
            <div className="space-y-3">
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold text-emerald-700 uppercase tracking-wider text-[11px]">
                  {language === 'id' ? product.categoryLabelId : product.categoryLabelEn}
                </span>
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-slate-400 font-normal">({product.reviewCount} ulasan)</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                {language === 'id' ? product.name : product.nameEn}
              </h2>

              {/* Price */}
              <div className="flex items-baseline gap-3 pt-1">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {formatPrice(product.priceIdr, currency)}
                </span>
                <span className="text-xs text-slate-500">
                  / {product.weightGrams >= 1000 ? `${(product.weightGrams / 1000).toFixed(1)} kg` : `${product.weightGrams} g`}
                </span>
              </div>

              {/* Stock Notice */}
              <div className="flex items-center gap-2 text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100">
                <Check className="w-4 h-4" />
                <span>
                  {language === 'id' 
                    ? `Stok Tersedia: ${product.stock} unit (Siap dikirim hari ini)` 
                    : `In Stock: ${product.stock} units (Ships within 24h)`
                  }
                </span>
              </div>

              {/* Full Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-2">
                {language === 'id' ? product.descriptionId : product.descriptionEn}
              </p>

              {/* Specifications Table */}
              <div className="bg-slate-50 rounded-2xl p-3.5 space-y-2 border border-slate-100 text-xs">
                <span className="font-bold text-slate-800 text-[11px] block uppercase tracking-wider">
                  {language === 'id' ? 'Spesifikasi Produk' : 'Product Specifications'}
                </span>
                {product.specs.map((s, idx) => (
                  <div key={idx} className="flex justify-between py-1 border-b border-slate-200/50 last:border-none">
                    <span className="text-slate-500">{language === 'id' ? s.labelId : s.labelEn}</span>
                    <span className="font-semibold text-slate-800 text-right">{s.value}</span>
                  </div>
                ))}
              </div>

              {/* Care Instructions / Tips if any */}
              {product.careInstructionsId && (
                <div className="bg-amber-50/70 border border-amber-200/60 rounded-2xl p-3 text-xs text-amber-900 flex items-start gap-2">
                  <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block mb-0.5">
                      {language === 'id' ? 'Petunjuk Perawatan / Penyimpanan:' : 'Care & Storage Tips:'}
                    </span>
                    <p className="font-normal text-amber-800/90 leading-relaxed">
                      {language === 'id' ? product.careInstructionsId : product.careInstructionsEn}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Actions: Quantity + Add to Cart + Buy Now */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-700">
                    {language === 'id' ? 'Jumlah' : 'Quantity'}:
                  </span>
                  <div className="flex items-center border border-slate-200 rounded-full bg-slate-50">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 flex items-center justify-center text-slate-600 hover:text-slate-900 font-bold"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-slate-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="w-8 h-8 flex items-center justify-center text-slate-600 hover:text-slate-900 font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleShare}
                  className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 transition"
                  title="Bagikan produk"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copied ? (language === 'id' ? 'Tersalin!' : 'Copied!') : (language === 'id' ? 'Bagikan' : 'Share')}</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  onClick={() => {
                    onAddToCart(product, quantity);
                    onClose();
                  }}
                  className="w-full py-3 px-4 rounded-full border border-slate-900 text-slate-900 hover:bg-slate-50 font-semibold text-xs flex items-center justify-center gap-2 transition active:scale-95 shadow-xs"
                >
                  <ShoppingBag className="w-4 h-4 text-emerald-700" />
                  <span>{language === 'id' ? '+ Keranjang' : '+ Add to Cart'}</span>
                </button>

                <button
                  onClick={() => {
                    onDirectCheckout(product, quantity);
                    onClose();
                  }}
                  className="w-full py-3 px-4 rounded-full bg-slate-900 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center gap-2 transition active:scale-95 shadow-md"
                >
                  <span>{language === 'id' ? 'Beli Sekarang' : 'Buy Now'}</span>
                </button>
              </div>

              <p className="text-[10px] text-center text-slate-400">
                {language === 'id' 
                  ? '🔒 Transaksi aman, packing vakum/rapi, garansi sampai dalam kondisi prima se-Indonesia & Asia Tenggara.'
                  : '🔒 Secure transactions, vacuum-sealed packing, arrival guarantee across ID & ASEAN.'}
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
