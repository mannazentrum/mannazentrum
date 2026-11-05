import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  Check, 
  Sparkles,
  ShieldCheck,
  Truck
} from 'lucide-react';
import { ShopProduct, CurrencyKey, DISCOUNT_COUPONS } from '../../data/shopData';
import { formatPrice } from '../../utils/shopCurrency';

export interface CartItem {
  product: ShopProduct;
  quantity: number;
}

interface ShopCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onProceedToCheckout: () => void;
  currency: CurrencyKey;
  language: 'id' | 'en';
  couponCode: string;
  onApplyCoupon: (code: string) => boolean;
  onRemoveCoupon: () => void;
  discountPercent: number;
}

export const ShopCartDrawer: React.FC<ShopCartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
  currency,
  language,
  couponCode,
  onApplyCoupon,
  onRemoveCoupon,
  discountPercent,
}) => {
  const [inputCoupon, setInputCoupon] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isOpen) return null;

  const subtotalIdr = cart.reduce((sum, item) => sum + (item.product.priceIdr * item.quantity), 0);
  const discountAmountIdr = (subtotalIdr * discountPercent) / 100;
  const totalWeightGrams = cart.reduce((sum, item) => sum + (item.product.weightGrams * item.quantity), 0);
  const finalTotalIdr = Math.max(0, subtotalIdr - discountAmountIdr);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const success = onApplyCoupon(inputCoupon.trim().toUpperCase());
    if (success) {
      setCouponError('');
      setInputCoupon('');
    } else {
      setCouponError(language === 'id' ? 'Kode kupon tidak valid atau belum memenuhi minimum order.' : 'Invalid coupon code or minimum order not reached.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">
                  {language === 'id' ? 'Keranjang Belanja' : 'Your Shopping Cart'}
                </h3>
                <span className="text-xs text-slate-500">
                  {cart.length} {language === 'id' ? 'jenis produk' : 'items'} ({totalWeightGrams >= 1000 ? `${(totalWeightGrams / 1000).toFixed(1)} kg` : `${totalWeightGrams} g`})
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 divide-y divide-slate-100">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4 space-y-4">
                <div className="w-16 h-16 rounded-3xl bg-slate-100 flex items-center justify-center text-slate-400">
                  <ShoppingBag className="w-8 h-8 text-slate-300" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-800 text-base">
                    {language === 'id' ? 'Keranjang Anda Masih Kosong' : 'Your Cart is Empty'}
                  </h4>
                  <p className="text-xs text-slate-500 max-w-xs">
                    {language === 'id'
                      ? 'Temukan kebutuhan pakaian keluarga, sembako sehat organik, dan benih tanaman harian di katalog kami.'
                      : 'Explore daily apparel, organic pantry groceries, and fresh seeds in our store catalog.'}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="bg-slate-900 text-white text-xs font-semibold px-6 py-2.5 rounded-full hover:bg-emerald-700 transition"
                >
                  {language === 'id' ? 'Mulai Belanja' : 'Start Shopping'}
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.product.id} className="pt-4 first:pt-0 flex gap-3.5">
                  <img
                    src={item.product.image}
                    alt={language === 'id' ? item.product.name : item.product.nameEn}
                    className="w-20 h-20 rounded-2xl object-cover bg-slate-100 shrink-0 border border-slate-100"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-bold text-xs sm:text-sm text-slate-900 leading-snug">
                          {language === 'id' ? item.product.name : item.product.nameEn}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-slate-400 hover:text-rose-500 p-1 transition"
                          title="Hapus barang"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-[10px] text-emerald-700 font-semibold block mt-0.5">
                        {language === 'id' ? item.product.categoryLabelId : item.product.categoryLabelEn}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="font-extrabold text-xs sm:text-sm text-slate-900">
                        {formatPrice(item.product.priceIdr * item.quantity, currency)}
                      </span>

                      {/* Quantity Controls */}
                      <div className="flex items-center border border-slate-200 rounded-full bg-slate-50">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center text-slate-600 hover:text-slate-900 font-bold text-xs"
                        >
                          -
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-slate-600 hover:text-slate-900 font-bold text-xs"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area (if items exist) */}
          {cart.length > 0 && (
            <div className="p-5 sm:p-6 border-t border-slate-100 bg-slate-50/70 space-y-4">
              
              {/* Coupon Code Input */}
              <div className="space-y-1.5">
                {couponCode ? (
                  <div className="flex items-center justify-between bg-emerald-100/70 border border-emerald-300 text-emerald-900 px-3 py-2 rounded-xl text-xs">
                    <div className="flex items-center gap-1.5 font-semibold">
                      <Tag className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{couponCode} (-{discountPercent}%)</span>
                    </div>
                    <button
                      onClick={onRemoveCoupon}
                      className="text-emerald-700 hover:text-emerald-900 font-bold text-xs underline"
                    >
                      {language === 'id' ? 'Hapus' : 'Remove'}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value)}
                      placeholder={language === 'id' ? 'Punya kode kupon? (mis: KELUARGABARU)' : 'Promo code? (e.g. ASEANFAM)'}
                      className="flex-1 px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:border-emerald-500 focus:outline-hidden"
                    />
                    <button
                      type="submit"
                      className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-xl transition"
                    >
                      {language === 'id' ? 'Pakai' : 'Apply'}
                    </button>
                  </form>
                )}
                {couponError && (
                  <p className="text-[11px] text-rose-600 pl-1">{couponError}</p>
                )}
              </div>

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                <div className="flex justify-between">
                  <span>{language === 'id' ? 'Subtotal Produk' : 'Product Subtotal'}</span>
                  <span className="font-semibold text-slate-800">{formatPrice(subtotalIdr, currency)}</span>
                </div>

                {discountPercent > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>{language === 'id' ? `Diskon Kupon (${discountPercent}%)` : `Discount (${discountPercent}%)`}</span>
                    <span>-{formatPrice(discountAmountIdr, currency)}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-500 text-[11px]">
                  <span>{language === 'id' ? 'Estimasi Ongkos Kirim' : 'Estimated Shipping'}</span>
                  <span className="italic">{language === 'id' ? 'Dihitung saat Checkout' : 'Calculated at checkout'}</span>
                </div>

                <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
                  <span className="font-bold text-slate-900 text-sm">
                    {language === 'id' ? 'Total Sementara' : 'Estimated Total'}
                  </span>
                  <span className="font-extrabold text-emerald-800 text-lg">
                    {formatPrice(finalTotalIdr, currency)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={onProceedToCheckout}
                  className="w-full py-3.5 px-4 bg-slate-900 hover:bg-emerald-700 text-white rounded-full font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition active:scale-95"
                >
                  <span>{language === 'id' ? 'Lanjut ke Pembayaran' : 'Proceed to Checkout'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex justify-between items-center px-2 pt-1 text-[11px] text-slate-500">
                  <button
                    onClick={onClearCart}
                    className="hover:text-rose-600 underline transition"
                  >
                    {language === 'id' ? 'Kosongkan Keranjang' : 'Clear Cart'}
                  </button>
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{language === 'id' ? 'Checkout Aman & Terenkripsi' : 'Safe & Encrypted Checkout'}</span>
                  </span>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
