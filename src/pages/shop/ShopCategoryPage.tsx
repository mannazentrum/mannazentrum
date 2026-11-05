import React, { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { ShopLayout } from '../../components/shop/ShopLayout';
import SEO from '../../components/SEO';
import { 
  SHOP_CATEGORIES, 
  SHOP_PRODUCTS, 
  ShopProduct 
} from '../../data/shopData';
import { formatPrice } from '../../utils/shopCurrency';
import { 
  ShoppingBag, 
  Star, 
  Filter, 
  ChevronRight, 
  Flame, 
  Package, 
  Check, 
  ArrowLeft,
  Truck,
  Leaf,
  Shirt,
  Apple,
  Home as HomeIcon
} from 'lucide-react';

const categoryIconMap: Record<string, React.ReactNode> = {
  pakaian: <Shirt className="w-5 h-5" />,
  makanan: <Apple className="w-5 h-5" />,
  tanaman: <Leaf className="w-5 h-5" />,
  harian: <HomeIcon className="w-5 h-5" />,
  paket: <Package className="w-5 h-5" />
};

export const ShopCategoryPage: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug?: string }>();
  const { currency, language, addToCart, setSelectedProduct, products } = useShop();

  const [sortBy, setSortBy] = useState<'popular' | 'price-low' | 'price-high' | 'rating'>('popular');
  const [filterAseanOnly, setFilterAseanOnly] = useState<boolean>(false);

  // If no categorySlug, show all categories index
  const currentCategory = SHOP_CATEGORIES.find((c) => c.slug === categorySlug);

  const filteredProducts = useMemo(() => {
    let prods = products && products.length > 0 ? products : SHOP_PRODUCTS;
    if (categorySlug) {
      prods = prods.filter((p) => p.category === categorySlug);
    }
    if (filterAseanOnly) {
      prods = prods.filter((p) => p.isAseanReady);
    }
    return prods.sort((a, b) => {
      if (sortBy === 'price-low') return a.priceIdr - b.priceIdr;
      if (sortBy === 'price-high') return b.priceIdr - a.priceIdr;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
    });
  }, [categorySlug, filterAseanOnly, sortBy]);

  const pageTitle = currentCategory 
    ? `${language === 'id' ? currentCategory.nameId : currentCategory.nameEn} - Mannazentrum Shop` 
    : 'Semua Kategori Produk - Mannazentrum Shop';

  const pageDescription = currentCategory 
    ? (language === 'id' ? currentCategory.descId : currentCategory.descEn)
    : 'Jelajahi kategori pakaian keluarga katun organik, sembako sehat beras & madu, benih tanaman, dan kebutuhan harian rumah tangga.';

  return (
    <ShopLayout activeCategory={categorySlug || 'semua'}>
      <SEO 
        title={pageTitle}
        description={pageDescription}
        canonicalPath={categorySlug ? `/category/${categorySlug}` : '/category'}
      />

      {/* Breadcrumb Navigation */}
      <div className="bg-[#FAF9F5] border-b border-stone-200/60 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center space-x-2 text-xs text-slate-500">
          <Link to="/" className="hover:text-amber-600 transition">Beranda Toko</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to="/category" className="hover:text-amber-600 transition">Kategori</Link>
          {currentCategory && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-semibold text-slate-900">
                {language === 'id' ? currentCategory.nameId : currentCategory.nameEn}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Category Banner */}
      <div className="bg-slate-900 text-white py-12 md:py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          <div className="md:col-span-8 space-y-3">
            <span className="text-amber-400 text-xs font-semibold uppercase tracking-[0.2em] block">
              {currentCategory ? 'Kategori Belanja' : 'Daftar Kategori Lengkap'}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight">
              {currentCategory 
                ? (language === 'id' ? currentCategory.nameId : currentCategory.nameEn)
                : (language === 'id' ? 'Semua Kategori Produk Keluarga' : 'All Family Product Categories')
              }
            </h1>
            <p className="text-slate-300 font-light text-sm sm:text-base leading-relaxed max-w-2xl">
              {currentCategory 
                ? (language === 'id' ? currentCategory.descId : currentCategory.descEn)
                : 'Penuhi segala keperluan harian dengan bahan alami, kemasan higienis, dan pengiriman kilat se-Indonesia & Asia Tenggara.'
              }
            </p>
          </div>

          <div className="md:col-span-4 flex justify-start md:justify-end">
            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80 text-xs text-slate-300 space-y-2">
              <div className="flex items-center gap-2 text-amber-300 font-bold">
                <Truck className="w-4 h-4 text-amber-400" />
                <span>Pengiriman Siap Kirim</span>
              </div>
              <p className="text-[11px] text-slate-400 font-light">
                Seluruh produk kategori ini dilindungi kemasan berlapis dan garansi penggantian kerusakan 100%.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Subcategory Pills */}
      <div className="border-b border-stone-200/70 bg-white sticky top-[73px] z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <Link
            to="/category"
            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-medium transition ${
              !categorySlug 
                ? 'bg-slate-900 text-white font-semibold' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-stone-100 border border-stone-200/70'
            }`}
          >
            Semua ({products.length})
          </Link>
          {SHOP_CATEGORIES.map((cat) => {
            const count = products.filter(p => p.category === cat.slug).length;
            const isActive = categorySlug === cat.slug;
            return (
              <Link
                key={cat.slug}
                to={`/category/${cat.slug}`}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-medium transition flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-slate-900 text-white font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-stone-100 border border-stone-200/70'
                }`}
              >
                <span>{language === 'id' ? cat.nameId : cat.nameEn}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-stone-100 text-slate-500'}`}>
                  {count}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Product Grid Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        
        {/* Filter & Sort Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 mb-8 border-b border-stone-200">
          <div>
            <h2 className="text-xl sm:text-2xl font-light text-slate-900">
              {filteredProducts.length} Produk Tersedia
            </h2>
            <p className="text-xs text-slate-500 font-light mt-0.5">
              Standar mutu tinggi untuk keluarga di Indonesia dan Asia Tenggara
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setFilterAseanOnly(!filterAseanOnly)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition flex items-center gap-1.5 border ${
                filterAseanOnly
                  ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-xs'
                  : 'bg-white text-slate-700 border-stone-200 hover:bg-stone-50'
              }`}
            >
              <span>🌏</span>
              <span>Siap Kirim ASEAN</span>
            </button>

            <div className="flex items-center gap-1.5 bg-white border border-stone-200 rounded-full px-3 py-1.5 text-xs text-slate-700">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent border-none focus:outline-hidden font-medium text-slate-800 text-xs"
              >
                <option value="popular">Paling Populer</option>
                <option value="price-low">Harga: Terendah</option>
                <option value="price-high">Harga: Tertinggi</option>
                <option value="rating">Rating Tertinggi</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid or Empty State */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 px-4 bg-[#FAF9F5] rounded-3xl border border-stone-200/80 space-y-4">
            <div className="w-16 h-16 bg-amber-100 text-amber-800 rounded-2xl flex items-center justify-center mx-auto text-2xl shadow-xs">
              📦
            </div>
            <div className="space-y-1.5 max-w-md mx-auto">
              <h3 className="text-lg font-bold text-slate-900">Belum Ada Produk Ditampilkan</h3>
              <p className="text-xs text-slate-500 font-light leading-relaxed">
                Produk untuk kategori ini sedang disiapkan oleh tim toko. Anda dapat menambahkan produk baru melalui Admin Panel.
              </p>
            </div>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/admin/shop"
                className="px-5 py-2.5 rounded-full bg-slate-900 hover:bg-amber-600 text-white text-xs font-bold transition shadow-sm"
              >
                + Tambah Produk di Admin Panel
              </Link>
              <Link
                to="/category"
                className="px-5 py-2.5 rounded-full border border-stone-200 text-slate-700 hover:bg-stone-50 text-xs font-semibold transition"
              >
                Lihat Semua Kategori
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-3xl border border-stone-200/80 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
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

              <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{product.rating}</span>
                    <span className="text-slate-400 font-normal">({product.reviewCount})</span>
                    <span className="text-slate-300 mx-1">•</span>
                    <span className="text-slate-500 text-[10px] font-normal">
                      {product.weightGrams >= 1000 ? `${(product.weightGrams / 1000).toFixed(1)} kg` : `${product.weightGrams} g`}
                    </span>
                  </div>

                  <Link
                    to={`/product/${product.slug}`}
                    className="font-bold text-slate-900 text-sm leading-snug group-hover:text-amber-600 transition block line-clamp-2"
                  >
                    {language === 'id' ? product.name : product.nameEn}
                  </Link>

                  <p className="text-xs text-slate-500 font-light line-clamp-2 leading-relaxed">
                    {language === 'id' ? product.shortDescId : product.shortDescEn}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-medium">
                      Harga
                    </span>
                    <span className="font-bold text-slate-900 text-base leading-none">
                      {formatPrice(product.priceIdr, currency)}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Link
                      to={`/product/${product.slug}`}
                      className="px-3 py-2 rounded-full border border-stone-200 text-slate-700 hover:bg-stone-50 text-xs font-medium transition"
                    >
                      Detail
                    </Link>

                    <button
                      onClick={() => addToCart(product, 1)}
                      className="bg-slate-900 hover:bg-amber-600 text-white p-2 sm:px-3 sm:py-2 rounded-full text-xs font-medium transition flex items-center gap-1 shadow-sm active:scale-95"
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

      </div>
    </ShopLayout>
  );
};
