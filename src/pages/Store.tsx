import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { 
  SHOP_REVIEWS, 
  SHOP_CATEGORIES 
} from '../data/shopData';
import { formatPrice } from '../utils/shopCurrency';
import { useShop } from '../context/ShopContext';
import { ShopLayout } from '../components/shop/ShopLayout';
import { 
  ShoppingBag, 
  Sparkles, 
  Star, 
  Truck, 
  Check, 
  Filter, 
  Flame,
  Tag,
  Leaf,
  Shirt,
  Apple,
  Home as HomeIcon,
  Package,
  ArrowRight
} from 'lucide-react';

const categoryIconMap: Record<string, React.ReactNode> = {
  pakaian: <Shirt className="w-5 h-5" />,
  makanan: <Apple className="w-5 h-5" />,
  tanaman: <Leaf className="w-5 h-5" />,
  harian: <HomeIcon className="w-5 h-5" />,
  paket: <Package className="w-5 h-5" />
};

const Store: React.FC = () => {
  const { 
    currency, 
    language, 
    addToCart, 
    applyCoupon, 
    setCartDrawerOpen, 
    setShippingInfoModalOpen,
    products,
    homeContent
  } = useShop();

  const [selectedCategory, setSelectedCategory] = useState<string>('semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'popular' | 'price-low' | 'price-high' | 'rating'>('popular');
  const [filterAseanOnly, setFilterAseanOnly] = useState<boolean>(false);

  // Filtered and Sorted Products from dynamic store state
  const filteredProducts = useMemo(() => {
    const list = products && products.length > 0 ? products : [];
    return list.filter((product) => {
      if (selectedCategory !== 'semua' && product.category !== selectedCategory) {
        return false;
      }
      if (filterAseanOnly && !product.isAseanReady) {
        return false;
      }
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
      return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
    });
  }, [selectedCategory, filterAseanOnly, searchQuery, sortBy]);

  return (
    <ShopLayout
      activeCategory={selectedCategory}
      onSelectCategory={setSelectedCategory}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
    >
      <SEO 
        title="Mannazentrum Shop - Toko Online Terpadu Kebutuhan Harian Keluarga (Indonesia & Asia Tenggara)"
        description="Pusat belanja online keluarga harian: pakaian katun organik, sembako sehat beras & madu mentah, benih tanaman pekarangan & perlengkapan ramah lingkungan untuk pengiriman Indonesia, Singapura, Malaysia, dan Asia Tenggara."
        canonicalPath="/"
      />

      {/* HERO BANNER: PUSAT BELANJA KELUARGA (Mannazentrum's Slate-900 & Warm Amber Palette) */}
      <section className="relative overflow-hidden bg-slate-900 text-white py-14 md:py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <span className="text-amber-400 font-semibold uppercase tracking-[0.2em] text-xs inline-flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>
                {homeContent?.heroBadge || (language === 'id' 
                  ? 'Toko Online Kebutuhan Harian Keluarga' 
                  : 'Integrated Family Daily Living Store'
                )}
              </span>
            </span>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-tight">
              {homeContent?.heroTitle || (language === 'id' ? (
                <>
                  Keperluan Keluarga Harian: <br />
                  <span className="font-semibold text-amber-300">
                    Pakaian, Sembako Sehat & Bibit Tanaman
                  </span>
                </>
              ) : (
                <>
                  Wholesome Family Living: <br />
                  <span className="font-semibold text-amber-300">
                    Apparel, Organic Groceries & Seeds
                  </span>
                </>
              ))}
            </h1>

            <p className="text-slate-300 font-light text-sm sm:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {homeContent?.heroSubtitle || (language === 'id'
                ? 'Koleksi pilihan berbahan alam yang dirancang untuk mendukung gaya hidup sehat keluarga. Melayani pemesanan cepat dengan proteksi kemasan vakum ke seluruh pelosok Indonesia dan negara tetangga (Singapura, Malaysia, Brunei, Thailand).'
                : 'Curated natural essentials for conscious family living. Vacuum-sealed and safely shipped across Indonesia and ASEAN neighbor countries.')}
            </p>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <a
                href={homeContent?.heroCtaLink || '#katalog-produk'}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-7 py-3 rounded-full text-xs sm:text-sm transition shadow-lg shadow-amber-500/20 active:scale-95 flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{homeContent?.heroCtaText || (language === 'id' ? 'Lihat Katalog Produk' : 'Shop Essentials')}</span>
              </a>

              <Link
                to="/shipping-policy"
                className="bg-slate-800 hover:bg-slate-700 text-white font-medium px-6 py-3 rounded-full text-xs sm:text-sm transition border border-slate-700 flex items-center gap-2 active:scale-95"
              >
                <Truck className="w-4 h-4 text-amber-400" />
                <span>{language === 'id' ? 'Jalur Pengiriman ASEAN' : 'ASEAN Shipping Details'}</span>
              </Link>
            </div>

            {/* Micro Highlights */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-amber-400" />
                <span>Bahan Pilihan Alami & Bebas Kimia</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-amber-400" />
                <span>Kemasan Vakum Kedap Udara</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-amber-400" />
                <span>Garansi Penggantian Kerusakan 100%</span>
              </div>
            </div>

          </div>

          {/* Hero Featured Collage */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-800/60 shadow-2xl p-4 sm:p-5 backdrop-blur-xs">
              
              <div className="grid grid-cols-2 gap-3">
                <Link to="/category/makanan" className="relative rounded-2xl overflow-hidden aspect-4/3 group block">
                  <img
                    src="https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=600"
                    alt="Beras Organik"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5">
                    <span className="text-[11px] font-bold text-white">Sembako Sehat</span>
                  </div>
                </Link>

                <Link to="/category/tanaman" className="relative rounded-2xl overflow-hidden aspect-4/3 group block">
                  <img
                    src="https://images.unsplash.com/photo-1592417817098-8f3d6910985b?auto=format&fit=crop&q=80&w=600"
                    alt="Benih Sayuran"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5">
                    <span className="text-[11px] font-bold text-white">Bibit Tanaman</span>
                  </div>
                </Link>

                <Link to="/category/pakaian" className="relative rounded-2xl overflow-hidden aspect-4/3 group block">
                  <img
                    src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=600"
                    alt="Pakaian Katun"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5">
                    <span className="text-[11px] font-bold text-white">Pakaian Katun</span>
                  </div>
                </Link>

                <Link to="/category/harian" className="relative rounded-2xl overflow-hidden aspect-4/3 group block">
                  <img
                    src="https://images.unsplash.com/photo-1607006314584-c74743c069c8?auto=format&fit=crop&q=80&w=600"
                    alt="Perawatan Alami"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5">
                    <span className="text-[11px] font-bold text-white">Kebutuhan Harian</span>
                  </div>
                </Link>
              </div>

              {/* Promo Floating Tag in Mannazentrum Warm Style */}
              <div className="mt-4 p-3.5 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <span className="font-bold text-amber-300 block">Kupon Hemat: ASEANFAM</span>
                    <span className="text-[11px] text-slate-300">Diskon 15% kiriman Indonesia & Asia Tenggara</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    applyCoupon('ASEANFAM');
                    setCartDrawerOpen(true);
                  }}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3 py-1.5 rounded-xl text-[10px] uppercase tracking-wider shrink-0 transition"
                >
                  Klaim Kupon
                </button>
              </div>

            </div>
          </div>

        </div>

      </section>

      {/* QUICK CATEGORY HIGHLIGHT CARDS (Direct Links to /category/:slug) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          
          <Link
            to="/category/pakaian"
            className="p-4 rounded-2xl border transition shadow-sm flex items-center gap-3 text-left bg-white hover:bg-amber-50/60 text-slate-800 border-slate-200/80 hover:border-amber-300 group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-200/50 group-hover:scale-105 transition-transform">
              <Shirt className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-xs sm:text-sm block text-slate-900 group-hover:text-amber-600">Pakaian Keluarga</span>
              <span className="text-[10px] block text-slate-400">Katun & Serat Bambu</span>
            </div>
          </Link>

          <Link
            to="/category/makanan"
            className="p-4 rounded-2xl border transition shadow-sm flex items-center gap-3 text-left bg-white hover:bg-amber-50/60 text-slate-800 border-slate-200/80 hover:border-amber-300 group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-200/50 group-hover:scale-105 transition-transform">
              <Apple className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-xs sm:text-sm block text-slate-900 group-hover:text-amber-600">Bahan Makanan Sehat</span>
              <span className="text-[10px] block text-slate-400">Beras Organik & Madu</span>
            </div>
          </Link>

          <Link
            to="/category/tanaman"
            className="p-4 rounded-2xl border transition shadow-sm flex items-center gap-3 text-left bg-white hover:bg-amber-50/60 text-slate-800 border-slate-200/80 hover:border-amber-300 group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-200/50 group-hover:scale-105 transition-transform">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-xs sm:text-sm block text-slate-900 group-hover:text-amber-600">Tanaman & Bibit</span>
              <span className="text-[10px] block text-slate-400">Benih Panen & Pupuk</span>
            </div>
          </Link>

          <Link
            to="/category/harian"
            className="p-4 rounded-2xl border transition shadow-sm flex items-center gap-3 text-left bg-white hover:bg-amber-50/60 text-slate-800 border-slate-200/80 hover:border-amber-300 group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-200/50 group-hover:scale-105 transition-transform">
              <HomeIcon className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-xs sm:text-sm block text-slate-900 group-hover:text-amber-600">Kebutuhan Harian</span>
              <span className="text-[10px] block text-slate-400">Sabun & Perawatan</span>
            </div>
          </Link>

        </div>
      </section>

      {/* CATALOG SECTION WITH FILTER & PRODUCT GRID */}
      <section id="katalog-produk" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        
        {/* Controls Bar: Search, Category Active, Sort, and ASEAN Ready toggle */}
        <div className="bg-[#FAF9F5] rounded-3xl p-5 sm:p-7 border border-stone-200/70 shadow-xs mb-8 space-y-4">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-amber-600 font-semibold uppercase tracking-[0.2em] text-[11px] block mb-2">
                {language === 'id' ? 'Katalog Pilihan Terbaik' : 'Curated Store Catalog'}
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-slate-900 tracking-tight">
                {selectedCategory === 'semua' && (language === 'id' ? 'Seluruh Produk Keperluan Harian' : 'All Curated Family Products')}
                {selectedCategory === 'pakaian' && (language === 'id' ? 'Koleksi Pakaian Katun Alami' : 'Family Natural Cotton Apparel')}
                {selectedCategory === 'makanan' && (language === 'id' ? 'Sembako, Beras & Madu Sehat' : 'Healthy Pantry, Organic Rice & Raw Honey')}
                {selectedCategory === 'tanaman' && (language === 'id' ? 'Tanaman Hidup, Benih & Pupuk' : 'Live Plants, Certified Seeds & Gardening')}
                {selectedCategory === 'harian' && (language === 'id' ? 'Perawatan Diri & Kebutuhan Rumah' : 'Natural Body Care & Home Essentials')}
                {selectedCategory === 'paket' && (language === 'id' ? 'Paket Bundling Keluarga Hemat' : 'Value Family Bundles')}
              </h2>
              <p className="text-xs text-slate-500 font-light mt-1">
                {language === 'id' 
                  ? `Tersedia ${filteredProducts.length} produk siap kirim ke seluruh Indonesia dan Asia Tenggara.`
                  : `Showing ${filteredProducts.length} high-quality products ready for dispatch across ASEAN.`
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
                    ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-xs'
                    : 'bg-white text-slate-700 border-stone-200/80 hover:bg-stone-50'
                }`}
              >
                <span>🌏</span>
                <span>{language === 'id' ? 'Siap Kirim ASEAN' : 'ASEAN Ready'}</span>
              </button>

              {/* Sorting Dropdown */}
              <div className="flex items-center gap-1.5 bg-white border border-stone-200/80 rounded-full px-3.5 py-2 text-xs text-slate-700 shadow-2xs">
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

        {/* PRODUCTS GRID (Direct Links to /product/:slug) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-3xl border border-stone-200/80 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Image Container with Badges */}
              <Link 
                to={`/product/${product.slug}`}
                className="relative aspect-4/3 bg-slate-100 overflow-hidden block"
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
                    <span className="bg-amber-500 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider shadow">
                      <Flame className="w-3 h-3 inline mr-0.5" /> Best Seller
                    </span>
                  )}
                  {product.isAseanReady && (
                    <span className="bg-slate-900/90 text-amber-300 text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                      🌏 Siap Kirim ASEAN
                    </span>
                  )}
                </div>

                <span className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs text-slate-800 text-[10px] font-medium px-2.5 py-1 rounded-full shadow-xs">
                  {language === 'id' ? product.categoryLabelId : product.categoryLabelEn}
                </span>
              </Link>

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

                  {/* Name Link to /product/:slug */}
                  <Link 
                    to={`/product/${product.slug}`}
                    className="font-bold text-slate-900 text-sm leading-snug group-hover:text-amber-600 transition block line-clamp-2"
                  >
                    {language === 'id' ? product.name : product.nameEn}
                  </Link>

                  {/* Short Description */}
                  <p className="text-xs text-slate-500 font-light line-clamp-2 leading-relaxed">
                    {language === 'id' ? product.shortDescId : product.shortDescEn}
                  </p>
                </div>

                {/* Price & Action Row */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-medium">
                      Harga
                    </span>
                    <span className="font-bold text-slate-900 text-base leading-none">
                      {formatPrice(product.priceIdr, currency)}
                    </span>
                  </div>

                  {/* Action Buttons: Detail & Add to Cart */}
                  <div className="flex items-center gap-1.5">
                    <Link
                      to={`/product/${product.slug}`}
                      className="px-3 py-2 rounded-full border border-stone-200 text-slate-700 hover:bg-stone-50 text-xs font-medium transition"
                      title="Lihat Halaman Produk"
                    >
                      Detail
                    </Link>

                    <button
                      onClick={() => addToCart(product, 1)}
                      className="bg-slate-900 hover:bg-amber-600 text-white p-2 sm:px-3.5 sm:py-2 rounded-full text-xs font-medium transition flex items-center gap-1 shadow-sm active:scale-95"
                      aria-label="Tambah ke Keranjang"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-amber-300" />
                      <span className="hidden sm:inline">+ Pesan</span>
                    </button>
                  </div>

                </div>

              </div>

            </div>
          ))}
        </div>

      </section>

      {/* WHY SHOP WITH US */}
      <section className="bg-[#FAF9F5] py-16 px-4 sm:px-6 lg:px-8 border-y border-stone-200/60">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-amber-600 font-semibold uppercase tracking-[0.2em] text-xs">
              Jaminan Mutu & Keamanan
            </span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-light text-slate-900 tracking-tight">
              Standar Kualitas Tertinggi untuk Keluarga Indonesia & Asia Tenggara
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
              Setiap produk dipilih dan dikurasi dengan ketat: tanpa pengawet sintetik berbahaya pada makanan, serat alami aman alergi pada pakaian anak, dan benih segar berdaya tumbuh tinggi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-7 rounded-3xl border border-stone-200/70 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-xl border border-amber-200/50">
                🌾
              </div>
              <h4 className="font-bold text-slate-900 text-base">Bahan Pangan Organik & Vakum</h4>
              <p className="text-xs text-slate-500 font-light leading-relaxed">
                Beras dan madu dikemas dengan standar kedap udara food-grade, menjaga aroma, nutrisi, dan kebersihan prima hingga berminggu-minggu selama perjalanan.
              </p>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-stone-200/70 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-xl border border-amber-200/50">
                🌱
              </div>
              <h4 className="font-bold text-slate-900 text-base">Benih Cepat Panen & Lolos Uji</h4>
              <p className="text-xs text-slate-500 font-light leading-relaxed">
                Tingkat keberhasilan tumbuh di atas 85%, cocok untuk pekarangan rumah, pot, atau hidroponik sederhana di perkotaan Asia Tenggara.
              </p>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-stone-200/70 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-xl border border-amber-200/50">
                ✈️
              </div>
              <h4 className="font-bold text-slate-900 text-base">Jaringan Ekspedisi Kilat ASEAN</h4>
              <p className="text-xs text-slate-500 font-light leading-relaxed">
                Bekerja sama dengan kurir kargo udara terpercaya (Pos Indonesia EMS, DHL, RaySpeed) dengan pelacakan nomor resi otomatis secara real-time.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* VERIFIED CUSTOMER REVIEWS */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-amber-600 font-semibold uppercase tracking-[0.2em] text-xs block mb-1">
                Ulasan Nyata Pelanggan
              </span>
              <h3 className="text-2xl sm:text-3xl font-light text-slate-900 tracking-tight">
                Dipercaya Keluarga di Indonesia & Luar Negeri
              </h3>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-600">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="font-bold text-slate-900">4.9 / 5.0</span>
              <span className="text-slate-400">dari 1.200+ pesanan terkirim</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {SHOP_REVIEWS.map((rev) => (
              <div key={rev.id} className="bg-[#FAF9F5] p-5 rounded-3xl border border-stone-200/60 shadow-xs flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-700 italic font-light leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-200/60">
                  <span className="font-bold text-xs text-slate-900 block">{rev.author}</span>
                  <span className="text-[11px] text-amber-700 font-medium block">{rev.location}</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Produk: {rev.productName}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </ShopLayout>
  );
};

export default Store;
