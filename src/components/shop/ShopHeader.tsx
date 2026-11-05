import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Globe, 
  Truck, 
  MessageCircle, 
  ShieldCheck, 
  X, 
  Menu,
  HeartHandshake,
  ChevronDown
} from 'lucide-react';
import { CurrencyKey, CURRENCY_RATES } from '../../data/shopData';

interface ShopHeaderProps {
  currentCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  currency: CurrencyKey;
  onChangeCurrency: (c: CurrencyKey) => void;
  language: 'id' | 'en';
  onChangeLanguage: (l: 'id' | 'en') => void;
  onOpenShippingInfo: () => void;
}

export const ShopHeader: React.FC<ShopHeaderProps> = ({
  currentCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  cartCount,
  onOpenCart,
  currency,
  onChangeCurrency,
  language,
  onChangeLanguage,
  onOpenShippingInfo,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const categories = [
    { id: 'semua', labelId: 'Semua Produk', labelEn: 'All Products' },
    { id: 'pakaian', labelId: 'Pakaian Keluarga', labelEn: 'Family Apparel' },
    { id: 'makanan', labelId: 'Bahan Makanan Sehat', labelEn: 'Healthy Food & Groceries' },
    { id: 'tanaman', labelId: 'Tanaman & Bibit', labelEn: 'Plants & Seeds' },
    { id: 'harian', labelId: 'Kebutuhan Harian', labelEn: 'Daily Essentials' },
    { id: 'paket', labelId: 'Paket Bundling Hemat', labelEn: 'Value Bundles' },
  ];

  const handleCategoryClick = (catId: string) => {
    onSelectCategory(catId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-xs font-sans">
      {/* Top Banner: Regional ASEAN Scope & Quick Controls */}
      <div className="bg-emerald-950 text-emerald-100 text-[11px] sm:text-xs py-2 px-4 sm:px-6 border-b border-emerald-900/60">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 bg-emerald-800/80 text-emerald-200 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider">
              <span>🇮🇩</span><span>🇸🇬</span><span>🇲🇾</span> ASEAN Delivery
            </span>
            <span className="hidden sm:inline text-emerald-200">
              {language === 'id' 
                ? 'Melayani pengiriman harian ke seluruh Indonesia & Asia Tenggara (Singapura, Malaysia, dll).'
                : 'Delivering daily essentials across Indonesia & Southeast Asia (Singapore, Malaysia, etc).'
              }
            </span>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            {/* Shipping Info Trigger */}
            <button 
              onClick={onOpenShippingInfo}
              className="hidden md:flex items-center gap-1 hover:text-white transition text-[11px] text-emerald-200 underline decoration-dotted"
            >
              <Truck className="w-3.5 h-3.5" />
              <span>{language === 'id' ? 'Info Ongkir & Ekspor' : 'Shipping & Customs'}</span>
            </button>

            {/* Language Selector */}
            <div className="flex items-center gap-1 bg-emerald-900/80 px-2 py-0.5 rounded-md border border-emerald-800">
              <Globe className="w-3 h-3 text-emerald-300" />
              <button 
                onClick={() => onChangeLanguage('id')} 
                className={`px-1 font-semibold rounded text-[10px] transition ${language === 'id' ? 'text-amber-300 font-bold' : 'text-emerald-300 hover:text-white'}`}
              >
                ID
              </button>
              <span className="text-emerald-600 text-[10px]">|</span>
              <button 
                onClick={() => onChangeLanguage('en')} 
                className={`px-1 font-semibold rounded text-[10px] transition ${language === 'en' ? 'text-amber-300 font-bold' : 'text-emerald-300 hover:text-white'}`}
              >
                EN
              </button>
            </div>

            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1 bg-emerald-900/80 hover:bg-emerald-800 text-emerald-200 px-2 py-0.5 rounded-md border border-emerald-800 text-[11px] font-medium transition"
              >
                <span>{CURRENCY_RATES[currency].label}</span>
                <ChevronDown className="w-3 h-3 text-emerald-400" />
              </button>

              {currencyDropdownOpen && (
                <div className="absolute right-0 mt-1 w-36 bg-white text-slate-800 rounded-lg shadow-xl border border-slate-200 py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                  {(Object.keys(CURRENCY_RATES) as CurrencyKey[]).map((cur) => (
                    <button
                      key={cur}
                      onClick={() => {
                        onChangeCurrency(cur);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-emerald-50 transition flex items-center justify-between ${currency === cur ? 'text-emerald-700 bg-emerald-50/60 font-semibold' : 'text-slate-600'}`}
                    >
                      <span>{CURRENCY_RATES[cur].label}</span>
                      {currency === cur && <span className="text-emerald-600">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>
      </div>

      {/* Main Bar: Logo, Search, CS, Cart Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        
        {/* Brand Logo for shop.mannazentrum.com */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => handleCategoryClick('semua')}
            className="flex items-center gap-3 text-left group"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
              <ShoppingBag className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight leading-none group-hover:text-emerald-700 transition">
                  MANNA<span className="text-emerald-600 font-light">SHOP</span>
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                  Store
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-normal leading-tight mt-0.5 hidden xs:block">
                {language === 'id' ? 'Keperluan Harian Keluarga & Gaya Hidup Sehat' : 'Daily Family Essentials & Healthy Living'}
              </p>
            </div>
          </button>
        </div>

        {/* Search Bar (Desktop & Tablet) */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={
                language === 'id' 
                  ? 'Cari pakaian, beras, madu, bibit sayur, sabun...' 
                  : 'Search clothes, rice, honey, seeds, organic soap...'
              }
              className="w-full pl-10 pr-10 py-2.5 bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-xs text-slate-800 rounded-full border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition outline-hidden"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button 
                onClick={() => onSearchChange('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Action Controls: CS WhatsApp & Cart Drawer Trigger */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* WhatsApp CS Toko */}
          <a
            href="https://wa.me/6287881110807?text=Halo%20Admin%20Manna%20Shop,%20saya%20ingin%20konsultasi%20produk%20dan%20pemesanan%20keluarga."
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-full border border-emerald-200 text-emerald-700 bg-emerald-50/60 hover:bg-emerald-100 transition text-xs font-semibold"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>{language === 'id' ? 'CS WhatsApp Toko' : 'Store WhatsApp CS'}</span>
          </a>

          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            aria-label="Buka Keranjang Belanja"
            className="relative flex items-center gap-2 bg-slate-900 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-full text-xs font-semibold transition shadow-sm active:scale-95"
          >
            <ShoppingBag className="w-4 h-4 text-amber-300" />
            <span className="hidden sm:inline">{language === 'id' ? 'Keranjang' : 'Cart'}</span>
            <span className="bg-amber-400 text-slate-950 font-black text-[10px] min-w-[20px] h-5 px-1.5 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition"
            aria-label="Menu Kategori"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>

      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={
              language === 'id' 
                ? 'Cari pakaian, beras, bibit tanaman...' 
                : 'Search apparel, groceries, seeds...'
            }
            className="w-full pl-9 pr-9 py-2 bg-slate-50 text-xs text-slate-800 rounded-full border border-slate-200 focus:outline-hidden focus:border-emerald-500"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          {searchQuery && (
            <button 
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Dedicated E-Commerce Navigation Tabs (INDEPENDENT from domain utama) */}
      <div className="border-t border-slate-100 bg-white/95 backdrop-blur-sm overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center space-x-1 sm:space-x-2 py-2">
          {categories.map((cat) => {
            const isActive = currentCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-semibold transition duration-150 flex-shrink-0 ${
                  isActive
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {language === 'id' ? cat.labelId : cat.labelEn}
              </button>
            );
          })}

          <button
            onClick={onOpenShippingInfo}
            className="whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 transition flex items-center gap-1.5 flex-shrink-0 ml-auto border border-emerald-200/70"
          >
            <Truck className="w-3.5 h-3.5 text-emerald-700" />
            <span>{language === 'id' ? 'Pengiriman Indonesia & ASEAN' : 'Indonesia & ASEAN Delivery'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu for categories */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 px-4 py-4 space-y-2 shadow-lg animate-in slide-in-from-top duration-200">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            {language === 'id' ? 'Kategori Produk Toko' : 'Store Product Categories'}
          </p>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition ${
                currentCategory === cat.id
                  ? 'bg-emerald-50 text-emerald-800 font-bold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {language === 'id' ? cat.labelId : cat.labelEn}
            </button>
          ))}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => {
                onOpenShippingInfo();
                setMobileMenuOpen(false);
              }}
              className="text-xs text-emerald-700 font-semibold flex items-center gap-1.5"
            >
              <Truck className="w-4 h-4" />
              <span>{language === 'id' ? 'Informasi Kirim ASEAN' : 'ASEAN Shipping Details'}</span>
            </button>
            <a
              href="https://wa.me/6287881110807"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs bg-emerald-600 text-white px-3 py-1.5 rounded-full font-semibold"
            >
              WA Toko
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
