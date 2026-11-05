import React, { useState, useEffect, useMemo } from 'react';
import SEO from '../components/SEO';
import { 
  ShopProduct, 
  SHOP_PRODUCTS, 
  SHOP_REVIEWS, 
  CurrencyKey, 
  DISCOUNT_COUPONS 
} from '../data/shopData';
import { formatPrice } from '../utils/shopCurrency';
import { ShopHeader } from '../components/shop/ShopHeader';
import { ShopCartDrawer, CartItem } from '../components/shop/ShopCartDrawer';
import { ShopProductModal } from '../components/shop/ShopProductModal';
import { ShopCheckoutModal } from '../components/shop/ShopCheckoutModal';
import { ShopShippingInfoModal } from '../components/shop/ShopShippingInfoModal';
import { ShopFooter } from '../components/shop/ShopFooter';
import { 
  ShoppingBag, 
  Sparkles, 
  Star, 
  Truck, 
  ShieldCheck, 
  Package, 
  ArrowRight, 
  Heart, 
  Check, 
  Filter, 
  Flame,
  Globe2,
  Tag,
  Leaf,
  Shirt,
  Apple,
  Home as HomeIcon,
  HelpCircle,
  MessageCircle
} from 'lucide-react';

const CART_STORAGE_KEY = 'manna_shop_cart_items_v1';
const CURRENCY_STORAGE_KEY = 'manna_shop_currency_pref';
const LANG_STORAGE_KEY = 'manna_shop_lang_pref';

const Store: React.FC = () => {
  // Category & Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>('semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'popular' | 'price-low' | 'price-high' | 'rating'>('popular');
  const [filterAseanOnly, setFilterAseanOnly] = useState<boolean>(false);

  // Internationalization & Preferences
  const [currency, setCurrency] = useState<CurrencyKey>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(CURRENCY_STORAGE_KEY);
      if (saved && (saved === 'IDR' || saved === 'SGD' || saved === 'MYR' || saved === 'USD')) {
        return saved as CurrencyKey;
      }
    }
    return 'IDR';
  });

  const [language, setLanguage] = useState<'id' | 'en'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(LANG_STORAGE_KEY);
      if (saved === 'id' || saved === 'en') return saved;
    }
    return 'id';
  });

  // Cart State (Persisted in localStorage)
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(CART_STORAGE_KEY);
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse cart storage', e);
      }
    }
    return [];
  });

  // Coupons
  const [couponCode, setCouponCode] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);

  // Modals & Drawers
  const [selectedProduct, setSelectedProduct] = useState<ShopProduct | null>(null);
  const [cartDrawerOpen, setCartDrawerOpen] = useState<boolean>(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState<boolean>(false);
  const [shippingInfoModalOpen, setShippingInfoModalOpen] = useState<boolean>(false);

  // Toast / Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Sync currency to localStorage
  const handleCurrencyChange = (c: CurrencyKey) => {
    setCurrency(c);
    localStorage.setItem(CURRENCY_STORAGE_KEY, c);
  };

  // Sync language to localStorage
  const handleLanguageChange = (l: 'id' | 'en') => {
    setLanguage(l);
    localStorage.setItem(LANG_STORAGE_KEY, l);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Cart operations
  const handleAddToCart = (product: ShopProduct, quantity: number = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const newCart = [...prev];
        newCart[existingIndex].quantity = Math.min(
          product.stock,
          newCart[existingIndex].quantity + quantity
        );
        return newCart;
      } else {
        return [...prev, { product, quantity }];
      }
    });

    showToast(
      language === 'id' 
        ? `✓ ${quantity}x "${product.name}" ditambahkan ke keranjang` 
        : `✓ ${quantity}x "${product.nameEn}" added to cart`
    );
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
    setCouponCode('');
    setDiscountPercent(0);
  };

  const handleDirectCheckout = (product: ShopProduct, quantity: number = 1) => {
    handleAddToCart(product, quantity);
    setCheckoutModalOpen(true);
  };

  const handleApplyCoupon = (code: string): boolean => {
    const coupon = DISCOUNT_COUPONS[code];
    if (!coupon) return false;

    const subtotal = cart.reduce((sum, item) => sum + (item.product.priceIdr * item.quantity), 0);
    if (subtotal < coupon.minOrder) return false;

    setCouponCode(code);
    setDiscountPercent(coupon.percent);
    showToast(`Kupon ${code} berhasil diterapkan! Hemat ${coupon.percent}%`);
    return true;
  };

  const handleRemoveCoupon = () => {
    setCouponCode('');
    setDiscountPercent(0);
  };

  // Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    return SHOP_PRODUCTS.filter((product) => {
      // Category Filter
      if (selectedCategory !== 'semua' && product.category !== selectedCategory) {
        return false;
      }
      // ASEAN Ready Filter
      if (filterAseanOnly && !product.isAseanReady) {
        return false;
      }
      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = product.name.toLowerCase().includes(q) || product.nameEn.toLowerCase().includes(q);
        const matchDesc = product.descriptionId.toLowerCase().includes(q) || product.shortDescId.toLowerCase().includes(q);
        const matchCat = product.categoryLabelId.toLowerCase().includes(q);
        if (!matchName && !matchDesc && !matchCat) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.priceIdr - b.priceIdr;
      if (sortBy === 'price-high') return b.priceIdr - a.priceIdr;
      if (sortBy === 'rating') return b.rating - a.rating;
      // Default: popular / best seller first
      return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
    });
  }, [selectedCategory, filterAseanOnly, searchQuery, sortBy]);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 antialiased selection:bg-emerald-100 selection:text-emerald-900">
      
      <SEO 
        title="Manna Shop - Toko Online Terpadu Kebutuhan Harian Keluarga (Indonesia & Asia Tenggara)"
        description="Pusat belanja online keluarga harian: pakaian katun organik, sembako sehat beras & madu mentah, benih tanaman pekarangan & perlengkapan ramah lingkungan untuk pengiriman Indonesia, Singapura, Malaysia, dan Asia Tenggara."
        canonicalPath="/shop"
      />

      {/* DEDICATED SHOP HEADER & TABS (SEPARATED FROM MAIN DOMAIN) */}
      <ShopHeader
        currentCategory={selectedCategory}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartCount={totalCartCount}
        onOpenCart={() => setCartDrawerOpen(true)}
        currency={currency}
        onChangeCurrency={handleCurrencyChange}
        language={language}
        onChangeLanguage={handleLanguageChange}
        onOpenShippingInfo={() => setShippingInfoModalOpen(true)}
      />

      {/* HERO BANNER: PUSAT BELANJA KELUARGA NUSANTARA & ASEAN */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-slate-900 to-slate-950 text-white py-12 md:py-20 px-4 sm:px-6 lg:px-8 border-b border-emerald-900/50">
        
        {/* Subtle Background Glow & Pattern */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-800/60 border border-emerald-600/40 text-emerald-200 text-xs font-semibold backdrop-blur-xs">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>
                {language === 'id' 
                  ? 'Toko Online Kebutuhan Harian Terpadu' 
                  : 'Integrated Family Daily Living Store'
                }
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              {language === 'id' ? (
                <>
                  Penuhi Keperluan Keluarga:{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-200">
                    Pakaian, Sembako Sehat, Hingga Bibit Tanaman
                  </span>
                </>
              ) : (
                <>
                  Wholesome Daily Family Living:{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-200">
                    Apparel, Organic Groceries & Seeds
                  </span>
                </>
              )}
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              {language === 'id'
                ? 'Koleksi pilihan ramah lingkungan dan alami yang dirancang untuk mendukung gaya hidup sehat keluarga. Melayani pemesanan cepat dengan proteksi kemasan vakum ke seluruh pelosok Indonesia dan negara tetangga (Singapura, Malaysia, Brunei, Thailand).'
                : 'Curated eco-friendly essentials for conscious family living. Vacuum-sealed and safely shipped across Indonesia and ASEAN neighbor countries.'}
            </p>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <a
                href="#katalog-produk"
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-7 py-3 rounded-full text-xs sm:text-sm transition shadow-lg shadow-emerald-500/25 active:scale-95 flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{language === 'id' ? 'Belanja Sekarang' : 'Shop Essentials'}</span>
              </a>

              <button
                onClick={() => setShippingInfoModalOpen(true)}
                className="bg-slate-800/80 hover:bg-slate-700 text-white font-semibold px-6 py-3 rounded-full text-xs sm:text-sm transition border border-slate-700 flex items-center gap-2 active:scale-95"
              >
                <Truck className="w-4 h-4 text-emerald-400" />
                <span>{language === 'id' ? 'Jalur Pengiriman ASEAN' : 'ASEAN Shipping Details'}</span>
              </button>
            </div>

            {/* Micro Highlights */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Bebas Bahan Kimia Berbahaya</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Kemasan Vakum Tahan Lama</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Garansi Tiba Dalam Kondisi Segar</span>
              </div>
            </div>

          </div>

          {/* Hero Featured Collage */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-emerald-800/60 bg-slate-800/50 shadow-2xl p-4 sm:p-5 backdrop-blur-xs">
              
              <div className="grid grid-cols-2 gap-3">
                <div className="relative rounded-2xl overflow-hidden aspect-4/3 group">
                  <img
                    src="https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=600"
                    alt="Beras Organik"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5">
                    <span className="text-[11px] font-bold text-white">Sembako Sehat</span>
                  </div>
                </div>

                <div className="relative rounded-2xl overflow-hidden aspect-4/3 group">
                  <img
                    src="https://images.unsplash.com/photo-1592417817098-8f3d6910985b?auto=format&fit=crop&q=80&w=600"
                    alt="Benih Sayuran"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5">
                    <span className="text-[11px] font-bold text-white">Bibit Tanaman</span>
                  </div>
                </div>

                <div className="relative rounded-2xl overflow-hidden aspect-4/3 group">
                  <img
                    src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=600"
                    alt="Pakaian Katun"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5">
                    <span className="text-[11px] font-bold text-white">Pakaian Katun</span>
                  </div>
                </div>

                <div className="relative rounded-2xl overflow-hidden aspect-4/3 group">
                  <img
                    src="https://images.unsplash.com/photo-1607006314584-c74743c069c8?auto=format&fit=crop&q=80&w=600"
                    alt="Perawatan Alami"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5">
                    <span className="text-[11px] font-bold text-white">Kebutuhan Harian</span>
                  </div>
                </div>
              </div>

              {/* Promo Floating Tag */}
              <div className="mt-4 p-3 rounded-2xl bg-gradient-to-r from-emerald-800/80 to-teal-800/80 border border-emerald-600/50 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-amber-300 shrink-0" />
                  <div>
                    <span className="font-bold text-white block">Kode Kupon: ASEANFAM</span>
                    <span className="text-[11px] text-emerald-200">Diskon 15% untuk kiriman domestik & Asia Tenggara</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleApplyCoupon('ASEANFAM');
                    setCartDrawerOpen(true);
                  }}
                  className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-3 py-1.5 rounded-xl text-[10px] uppercase tracking-wider shrink-0 transition"
                >
                  Klaim Kupon
                </button>
              </div>

            </div>
          </div>

        </div>

      </section>

      {/* QUICK CATEGORY HIGHLIGHT CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          
          <button
            onClick={() => setSelectedCategory('pakaian')}
            className={`p-4 rounded-2xl border transition shadow-sm flex items-center gap-3 text-left ${
              selectedCategory === 'pakaian'
                ? 'bg-emerald-800 text-white border-emerald-700'
                : 'bg-white hover:bg-emerald-50/50 text-slate-800 border-slate-200/80'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <Shirt className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-xs sm:text-sm block">Pakaian Keluarga</span>
              <span className={`text-[10px] block ${selectedCategory === 'pakaian' ? 'text-emerald-200' : 'text-slate-400'}`}>Katun & Serat Bambu</span>
            </div>
          </button>

          <button
            onClick={() => setSelectedCategory('makanan')}
            className={`p-4 rounded-2xl border transition shadow-sm flex items-center gap-3 text-left ${
              selectedCategory === 'makanan'
                ? 'bg-emerald-800 text-white border-emerald-700'
                : 'bg-white hover:bg-emerald-50/50 text-slate-800 border-slate-200/80'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <Apple className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-xs sm:text-sm block">Bahan Makanan Sehat</span>
              <span className={`text-[10px] block ${selectedCategory === 'makanan' ? 'text-emerald-200' : 'text-slate-400'}`}>Beras Organik & Madu</span>
            </div>
          </button>

          <button
            onClick={() => setSelectedCategory('tanaman')}
            className={`p-4 rounded-2xl border transition shadow-sm flex items-center gap-3 text-left ${
              selectedCategory === 'tanaman'
                ? 'bg-emerald-800 text-white border-emerald-700'
                : 'bg-white hover:bg-emerald-50/50 text-slate-800 border-slate-200/80'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-xs sm:text-sm block">Tanaman & Bibit</span>
              <span className={`text-[10px] block ${selectedCategory === 'tanaman' ? 'text-emerald-200' : 'text-slate-400'}`}>Benih Cepat Panen & Pupuk</span>
            </div>
          </button>

          <button
            onClick={() => setSelectedCategory('harian')}
            className={`p-4 rounded-2xl border transition shadow-sm flex items-center gap-3 text-left ${
              selectedCategory === 'harian'
                ? 'bg-emerald-800 text-white border-emerald-700'
                : 'bg-white hover:bg-emerald-50/50 text-slate-800 border-slate-200/80'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center shrink-0">
              <HomeIcon className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-xs sm:text-sm block">Kebutuhan Harian</span>
              <span className={`text-[10px] block ${selectedCategory === 'harian' ? 'text-emerald-200' : 'text-slate-400'}`}>Sabun Alami & Pembersih</span>
            </div>
          </button>

        </div>
      </section>

      {/* CATALOG SECTION WITH FILTER & PRODUCT GRID */}
      <section id="katalog-produk" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        
        {/* Controls Bar: Search, Category Active, Sort, and ASEAN Ready toggle */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-xs mb-8 space-y-4">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-700 block mb-1">
                {language === 'id' ? 'Katalog Lengkap & Terverifikasi' : 'Certified Product Catalog'}
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {selectedCategory === 'semua' && (language === 'id' ? 'Seluruh Produk Pilihan Keluarga' : 'All Curated Family Products')}
                {selectedCategory === 'pakaian' && (language === 'id' ? 'Pakaian & Busana Katun Alami' : 'Family Natural Cotton Apparel')}
                {selectedCategory === 'makanan' && (language === 'id' ? 'Sembako, Beras & Bahan Makanan Sehat' : 'Healthy Pantry, Organic Rice & Raw Honey')}
                {selectedCategory === 'tanaman' && (language === 'id' ? 'Tanaman Hidup, Benih Unggul & Media Tanam' : 'Live Plants, Certified Seeds & Gardening')}
                {selectedCategory === 'harian' && (language === 'id' ? 'Perawatan Diri Alami & Perlengkapan Rumah' : 'Natural Body Care & Home Essentials')}
                {selectedCategory === 'paket' && (language === 'id' ? 'Paket Bundling Keluarga Hemat' : 'Value Family Bundles')}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {language === 'id' 
                  ? `Menampilkan ${filteredProducts.length} produk siap kirim dengan standar kualitas tinggi`
                  : `Showing ${filteredProducts.length} high-quality products ready for dispatch`
                }
              </p>
            </div>

            {/* Filter Toggle & Sorting */}
            <div className="flex flex-wrap items-center gap-2.5">
              
              {/* Filter ASEAN Ready Only */}
              <button
                onClick={() => setFilterAseanOnly(!filterAseanOnly)}
                className={`px-3.5 py-2 rounded-full text-xs font-semibold transition flex items-center gap-1.5 border ${
                  filterAseanOnly
                    ? 'bg-amber-400 text-slate-950 border-amber-500 shadow-xs'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span>🌏</span>
                <span>{language === 'id' ? 'Khusus Siap Kirim ASEAN' : 'ASEAN Export Ready'}</span>
              </button>

              {/* Sorting Dropdown */}
              <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-full px-3 py-1.5 text-xs text-slate-700">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent border-none focus:outline-hidden font-medium text-slate-800 text-xs pr-1"
                >
                  <option value="popular">{language === 'id' ? 'Paling Populer' : 'Most Popular'}</option>
                  <option value="price-low">{language === 'id' ? 'Harga: Terendah' : 'Price: Low to High'}</option>
                  <option value="price-high">{language === 'id' ? 'Harga: Tertinggi' : 'Price: High to Low'}</option>
                  <option value="rating">{language === 'id' ? 'Rating Tertinggi' : 'Highest Rated'}</option>
                </select>
              </div>

            </div>
          </div>

        </div>

        {/* PRODUCTS GRID */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <Package className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-slate-800 text-lg">
              {language === 'id' ? 'Tidak Ada Produk yang Sesuai' : 'No Products Found'}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {language === 'id' 
                ? 'Coba ganti kata kunci pencarian atau matikan filter untuk melihat katalog lainnya.'
                : 'Try altering your search keywords or clearing filters to view other products.'}
            </p>
            <button
              onClick={() => {
                setSelectedCategory('semua');
                setSearchQuery('');
                setFilterAseanOnly(false);
              }}
              className="px-5 py-2.5 rounded-full bg-slate-900 text-white font-semibold text-xs hover:bg-emerald-700 transition"
            >
              {language === 'id' ? 'Reset Filter' : 'Reset Filters'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Image Container with Badges */}
                <div 
                  className="relative aspect-4/3 bg-slate-100 overflow-hidden cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                >
                  <img
                    src={product.image}
                    alt={language === 'id' ? product.name : product.nameEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  {/* Badges Overlay */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
                    {product.isBestSeller && (
                      <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-sm uppercase tracking-wider flex items-center gap-1">
                        <Flame className="w-3 h-3 text-amber-900" />
                        <span>Best Seller</span>
                      </span>
                    )}
                    {product.isAseanReady && (
                      <span className="bg-emerald-800 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                        🌏 Siap Kirim ASEAN
                      </span>
                    )}
                  </div>

                  <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-slate-800 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                    {language === 'id' ? product.categoryLabelId : product.categoryLabelEn}
                  </span>
                </div>

                {/* Body Content */}
                <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
                  
                  <div className="space-y-2">
                    {/* Rating & Review */}
                    <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{product.rating}</span>
                      <span className="text-slate-400 font-normal">({product.reviewCount})</span>
                      <span className="text-slate-300 mx-1">•</span>
                      <span className="text-slate-500 text-[10px] font-normal">
                        {product.weightGrams >= 1000 ? `${(product.weightGrams / 1000).toFixed(1)} kg` : `${product.weightGrams} g`}
                      </span>
                    </div>

                    {/* Name */}
                    <h3 
                      onClick={() => setSelectedProduct(product)}
                      className="font-bold text-slate-900 text-sm leading-snug group-hover:text-emerald-700 transition cursor-pointer line-clamp-2"
                    >
                      {language === 'id' ? product.name : product.nameEn}
                    </h3>

                    {/* Short Description */}
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {language === 'id' ? product.shortDescId : product.shortDescEn}
                    </p>
                  </div>

                  {/* Price & Action Row */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-medium">
                        {language === 'id' ? 'Harga' : 'Price'}
                      </span>
                      <span className="font-black text-slate-900 text-base sm:text-lg leading-none">
                        {formatPrice(product.priceIdr, currency)}
                      </span>
                    </div>

                    {/* Action Buttons: Detail & Add to Cart */}
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="px-3 py-2 rounded-full border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-semibold transition"
                        title="Lihat Rincian"
                      >
                        {language === 'id' ? 'Detail' : 'View'}
                      </button>

                      <button
                        onClick={() => handleAddToCart(product, 1)}
                        className="bg-slate-900 hover:bg-emerald-700 text-white p-2 sm:px-3 sm:py-2 rounded-full text-xs font-bold transition flex items-center gap-1 shadow-sm active:scale-95"
                        aria-label="Tambah ke Keranjang"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-amber-300" />
                        <span className="hidden sm:inline">+ Beli</span>
                      </button>
                    </div>

                  </div>

                </div>

              </div>
            ))}
          </div>
        )}

      </section>

      {/* WHY SHOP WITH US (STANDAR MUTU & EKSPOR NUSANTARA) */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-emerald-700 font-bold uppercase tracking-widest text-xs">
              {language === 'id' ? 'Jaminan Mutu & Keamanan' : 'Quality & Safety Assurance'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {language === 'id' 
                ? 'Standar Kualitas Tertinggi untuk Keluarga Indonesia & Asia Tenggara' 
                : 'High-Standard Living for Southeast Asian Families'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              {language === 'id'
                ? 'Setiap produk dipilih dan dikurasi dengan ketat: tanpa pengawet sintetik berbahaya pada makanan, serat alami aman alergi pada pakaian anak, dan benih segar berdaya tumbuh tinggi.'
                : 'Every single item is strictly curated: chemical-free organic groceries, allergy-friendly natural clothing fibers, and tested high-germination home garden seeds.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200/60 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                🌾
              </div>
              <h4 className="font-bold text-slate-900 text-base">
                {language === 'id' ? 'Bahan Pangan Organik & Vakum' : 'Airtight Vacuum Food Protection'}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {language === 'id'
                  ? 'Beras dan madu dikemas dengan standar kedap udara food-grade, menjaga aroma, nutrisi, dan kebersihan prima hingga berminggu-minggu selama perjalanan.'
                  : 'Grains, honey, and whole spices are vacuum-sealed for pristine freshness and long shelf stability.'}
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200/60 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                🌱
              </div>
              <h4 className="font-bold text-slate-900 text-base">
                {language === 'id' ? 'Benih Cepat Panen & Lolos Uji' : 'Tested High Germination Seeds'}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {language === 'id'
                  ? 'Tingkat keberhasilan tumbuh di atas 85%, cocok untuk pekarangan rumah, pot, atau hidroponik sederhana di perkotaan Asia Tenggara.'
                  : 'Over 85% germination rate, ideal for urban container planting, balconies, and backyard edible gardens.'}
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200/60 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
                ✈️
              </div>
              <h4 className="font-bold text-slate-900 text-base">
                {language === 'id' ? 'Jaringan Ekspedisi Kilat ASEAN' : 'Express ASEAN Courier Network'}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {language === 'id'
                  ? 'Bekerja sama dengan kurir kargo udara terpercaya (Pos Indonesia EMS, DHL, RaySpeed) dengan pelacakan nomor resi otomatis secara real-time.'
                  : 'Partnered with premier international air couriers ensuring rapid 3-5 business day transit with live tracking.'}
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* VERIFIED CUSTOMER REVIEWS (CROSS-BORDER ASEAN) */}
      <section className="bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-emerald-700 font-bold uppercase tracking-widest text-xs block mb-1">
                {language === 'id' ? 'Ulasan Nyata Pelanggan' : 'Real Customer Experiences'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {language === 'id' ? 'Dipercaya Keluarga di Indonesia & Luar Negeri' : 'Trusted by Families Across Indonesia & ASEAN'}
              </h3>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-600">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="font-bold text-slate-900">4.9 / 5.0</span>
              <span>dari 1.200+ pesanan terkirim</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {SHOP_REVIEWS.map((rev) => (
              <div key={rev.id} className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-700 italic leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <span className="font-bold text-xs text-slate-900 block">{rev.author}</span>
                  <span className="text-[11px] text-emerald-700 font-medium block">{rev.location}</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Produk: {rev.productName}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FLOATING ACTION PILL FOR CART (MOBILE & DESKTOP) */}
      {cart.length > 0 && (
        <div className="fixed bottom-6 right-6 z-40 animate-in fade-in slide-in-from-bottom duration-300">
          <button
            onClick={() => setCartDrawerOpen(true)}
            className="flex items-center gap-3 bg-slate-950 hover:bg-emerald-800 text-white px-5 py-3.5 rounded-full shadow-2xl border border-emerald-500/30 transition-transform active:scale-95"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-amber-300" />
              <span className="absolute -top-2 -right-2 bg-emerald-500 text-slate-950 font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                {totalCartCount}
              </span>
            </div>
            <div className="text-left pr-2">
              <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider leading-none">
                {language === 'id' ? 'Keranjang Anda' : 'Your Cart'}
              </span>
              <span className="font-extrabold text-xs text-emerald-300">
                {formatPrice(
                  cart.reduce((sum, item) => sum + (item.product.priceIdr * item.quantity), 0),
                  currency
                )}
              </span>
            </div>
          </button>
        </div>
      )}

      {/* TOAST POPUP */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs font-semibold px-5 py-3 rounded-full shadow-2xl border border-slate-700 animate-in fade-in zoom-in-95 duration-200">
          {toastMessage}
        </div>
      )}

      {/* MODALS & DRAWERS */}
      <ShopProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        currency={currency}
        language={language}
        onAddToCart={handleAddToCart}
        onDirectCheckout={handleDirectCheckout}
      />

      <ShopCartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onProceedToCheckout={() => {
          setCartDrawerOpen(false);
          setCheckoutModalOpen(true);
        }}
        currency={currency}
        language={language}
        couponCode={couponCode}
        onApplyCoupon={handleApplyCoupon}
        onRemoveCoupon={handleRemoveCoupon}
        discountPercent={discountPercent}
      />

      <ShopCheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        cart={cart}
        currency={currency}
        language={language}
        discountPercent={discountPercent}
        couponCode={couponCode}
        onOrderSuccess={() => {
          setCart([]);
          setCouponCode('');
          setDiscountPercent(0);
        }}
      />

      <ShopShippingInfoModal
        isOpen={shippingInfoModalOpen}
        onClose={() => setShippingInfoModalOpen(false)}
        currency={currency}
        language={language}
      />

      {/* DEDICATED SHOP FOOTER (SEPARATED FROM MAIN DOMAIN) */}
      <ShopFooter
        language={language}
        onOpenShippingInfo={() => setShippingInfoModalOpen(true)}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
      />

    </div>
  );
};

export default Store;
