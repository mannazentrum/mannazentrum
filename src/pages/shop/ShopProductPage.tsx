import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { ShopLayout } from '../../components/shop/ShopLayout';
import SEO from '../../components/SEO';
import { ShopStructuredData } from '../../components/shop/ShopStructuredData';
import { 
  SHOP_PRODUCTS, 
  ShopProduct 
} from '../../data/shopData';
import { formatPrice } from '../../utils/shopCurrency';
import { trackViewItem, trackAddToCart } from '../../utils/shopAnalytics';
import { 
  ShoppingBag, 
  Star, 
  ChevronRight, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  Check, 
  Share2, 
  MessageCircle, 
  Info,
  ArrowLeft,
  HelpCircle
} from 'lucide-react';

export const ShopProductPage: React.FC = () => {
  const { productSlug } = useParams<{ productSlug: string }>();
  const navigate = useNavigate();
  const { currency, language, addToCart, directCheckout } = useShop();

  const [quantity, setQuantity] = useState(1);
  const [copied, setCopied] = useState(false);

  const product = SHOP_PRODUCTS.find((p) => p.slug === productSlug);

  useEffect(() => {
    if (product) {
      trackViewItem(product);
      window.scrollTo(0, 0);
    }
  }, [productSlug, product]);

  if (!product) {
    return (
      <ShopLayout>
        <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
          <h1 className="text-2xl font-bold text-slate-900">Produk Tidak Ditemukan</h1>
          <p className="text-sm text-slate-500 font-light">
            Produk yang Anda cari mungkin telah diperbarui atau dipindahkan ke kategori lain.
          </p>
          <Link
            to="/category"
            className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-2.5 rounded-full text-xs font-semibold hover:bg-amber-600 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Katalog Kategori</span>
          </Link>
        </div>
      </ShopLayout>
    );
  }

  const relatedProducts = SHOP_PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleAddToCartClick = () => {
    addToCart(product, quantity);
    trackAddToCart(product, quantity);
  };

  const handleBuyNowClick = () => {
    trackAddToCart(product, quantity);
    directCheckout(product, quantity);
  };

  const handleDirectWAOrder = () => {
    const waText = encodeURIComponent(
      `Halo Admin Mannazentrum Shop, saya tertarik memesan produk:\n*${product.name}*\nJumlah: ${quantity} unit\nMohon informasi stok & ongkir ke kota saya.`
    );
    window.open(`https://wa.me/6287881110807?text=${waText}`, '_blank');
  };

  const productFaqs = [
    {
      question: `Bagaimana proteksi pengemasan produk ${product.name}?`,
      answer: `Setiap produk dikemas dengan proteksi berlapis: bahan makanan dikemas kedap udara vakum 120 micron, cairan disegel ganda tahan tekanan kabin pesawat, dan benih dilindungi amplop aluminium foil anti-lembab.`
    },
    {
      question: `Apakah pesanan ini bisa dikirim ke luar kota atau luar negeri (ASEAN)?`,
      answer: `Ya, kami melayani pengiriman ke seluruh kota/kabupaten di Indonesia serta negara Asia Tenggara (Singapura, Malaysia, Brunei, Thailand, Filipina) dengan estimasi waktu 2-5 hari kerja.`
    },
    {
      question: `Bagaimana jika paket saya tiba dalam kondisi rusak atau bocor?`,
      answer: `Kami memberikan garansi penggantian 100% tanpa biaya tambahan. Cukup kirimkan foto unboxing singkat ke CS WhatsApp kami di +62 878-8111-0807 dan tim kami segera memproses kiriman pengganti.`
    }
  ];

  const currentUrl = typeof window !== 'undefined' ? window.location.href : `https://shop.mannazentrum.com/product/${product.slug}`;

  return (
    <ShopLayout activeCategory={product.category}>
      <SEO 
        title={`${product.name} - Mannazentrum Shop`}
        description={product.shortDescId}
        canonicalPath={`/product/${product.slug}`}
      />

      {/* Structured Data for Google Rich Snippets & AI Search */}
      <ShopStructuredData 
        type="product" 
        product={product} 
        url={currentUrl} 
      />
      <ShopStructuredData 
        type="breadcrumb" 
        items={[
          { name: "Beranda", url: "https://shop.mannazentrum.com/" },
          { name: "Kategori", url: "https://shop.mannazentrum.com/category" },
          { name: product.categoryLabelId, url: `https://shop.mannazentrum.com/category/${product.category}` },
          { name: product.name, url: currentUrl }
        ]} 
      />
      <ShopStructuredData
        type="faq"
        faqs={productFaqs}
      />

      {/* Breadcrumb Navigation */}
      <div className="bg-[#FAF9F5] border-b border-stone-200/60 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center space-x-2 text-xs text-slate-500 overflow-x-auto scrollbar-none">
          <Link to="/" className="hover:text-amber-600 transition shrink-0">Beranda</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <Link to="/category" className="hover:text-amber-600 transition shrink-0">Kategori</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <Link to={`/category/${product.category}`} className="hover:text-amber-600 transition shrink-0">
            {language === 'id' ? product.categoryLabelId : product.categoryLabelEn}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="font-semibold text-slate-900 truncate">
            {language === 'id' ? product.name : product.nameEn}
          </span>
        </div>
      </div>

      {/* Product Detail Main Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Left Column: Image Showcase */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative rounded-3xl overflow-hidden bg-stone-100 aspect-square border border-stone-200/80 shadow-md">
              <img
                src={product.image}
                alt={language === 'id' ? product.name : product.nameEn}
                className="w-full h-full object-cover"
              />

              {/* Badges Overlay */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 items-start">
                {product.badges.map((b, i) => (
                  <span
                    key={i}
                    className="bg-amber-500 text-white text-[10px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider shadow"
                  >
                    {b}
                  </span>
                ))}
                {product.isAseanReady && (
                  <span className="bg-slate-900 text-amber-300 text-[10px] font-bold px-3 py-1 rounded-full shadow flex items-center gap-1">
                    <span>🌏</span> Siap Kirim ASEAN
                  </span>
                )}
              </div>
            </div>

            {/* Quick Guarantees under image */}
            <div className="grid grid-cols-3 gap-3 pt-2 text-center text-[11px] text-slate-600">
              <div className="p-3 rounded-2xl bg-[#FAF9F5] border border-stone-200/60 space-y-1">
                <Truck className="w-4 h-4 text-amber-600 mx-auto" />
                <span className="font-semibold block text-slate-800">Kirim Kilat</span>
                <span className="text-[10px] text-slate-400">ID & Asia Tenggara</span>
              </div>
              <div className="p-3 rounded-2xl bg-[#FAF9F5] border border-stone-200/60 space-y-1">
                <ShieldCheck className="w-4 h-4 text-amber-600 mx-auto" />
                <span className="font-semibold block text-slate-800">100% Asli</span>
                <span className="text-[10px] text-slate-400">Bahan Alami Pilihan</span>
              </div>
              <div className="p-3 rounded-2xl bg-[#FAF9F5] border border-stone-200/60 space-y-1">
                <RotateCcw className="w-4 h-4 text-amber-600 mx-auto" />
                <span className="font-semibold block text-slate-800">Garansi Aman</span>
                <span className="text-[10px] text-slate-400">Ganti Rugi Rusak</span>
              </div>
            </div>
          </div>

          {/* Right Column: Info, Price, Specifications, Actions */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Link
                  to={`/category/${product.category}`}
                  className="text-xs font-semibold uppercase tracking-wider text-amber-600 hover:underline"
                >
                  {language === 'id' ? product.categoryLabelId : product.categoryLabelEn}
                </Link>
                <button
                  onClick={handleShare}
                  className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 transition"
                  title="Bagikan tautan produk"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copied ? 'Tautan Tersalin!' : 'Bagikan'}</span>
                </button>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-light text-slate-900 tracking-tight leading-tight">
                {language === 'id' ? product.name : product.nameEn}
              </h1>

              {/* Rating & Review */}
              <div className="flex items-center gap-2 text-xs">
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                </div>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500">{product.reviewCount} ulasan pembeli</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500">
                  SKU: <strong className="font-mono text-slate-700">{product.id.toUpperCase()}</strong>
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500">
                  Berat: {product.weightGrams >= 1000 ? `${(product.weightGrams / 1000).toFixed(1)} kg` : `${product.weightGrams} g`}
                </span>
              </div>

              {/* Price Banner */}
              <div className="pt-2">
                <div className="bg-[#FAF9F5] p-5 rounded-2xl border border-stone-200/70 flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-medium">
                      Harga Produk
                    </span>
                    <span className="text-3xl sm:text-4xl font-bold text-slate-900">
                      {formatPrice(product.priceIdr, currency)}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-800 bg-amber-100/70 px-2.5 py-1 rounded-full">
                      <Check className="w-3.5 h-3.5 text-amber-700" />
                      <span>Stok: {product.stock} unit</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Short Description */}
              <p className="text-sm text-slate-600 font-light leading-relaxed pt-2">
                {language === 'id' ? product.descriptionId : product.descriptionEn}
              </p>

              {/* Specifications Table */}
              <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/60 text-xs space-y-2">
                <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block">
                  Spesifikasi & Detail
                </span>
                {product.specs.map((s, idx) => (
                  <div key={idx} className="flex justify-between py-1 border-b border-stone-200/50 last:border-none">
                    <span className="text-slate-500">{language === 'id' ? s.labelId : s.labelEn}</span>
                    <span className="font-semibold text-slate-800 text-right">{s.value}</span>
                  </div>
                ))}
              </div>

              {/* Care Instructions if any */}
              {product.careInstructionsId && (
                <div className="bg-amber-50/70 border border-amber-200/60 rounded-2xl p-3.5 text-xs text-amber-900 flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block mb-0.5">Petunjuk Perawatan / Penyimpanan:</span>
                    <p className="font-light text-amber-800 leading-relaxed">
                      {language === 'id' ? product.careInstructionsId : product.careInstructionsEn}
                    </p>
                  </div>
                </div>
              )}

              {/* Quantity Selector & Order Buttons */}
              <div className="pt-4 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-slate-700">Jumlah Pesanan:</span>
                  <div className="flex items-center border border-stone-200 rounded-full bg-white shadow-2xs">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-9 h-9 flex items-center justify-center text-slate-600 hover:text-slate-900 font-bold"
                    >
                      -
                    </button>
                    <span className="w-10 text-center text-xs font-bold text-slate-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="w-9 h-9 flex items-center justify-center text-slate-600 hover:text-slate-900 font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={handleAddToCartClick}
                    className="w-full py-3.5 px-6 rounded-full border border-slate-900 text-slate-900 hover:bg-amber-50 font-semibold text-xs flex items-center justify-center gap-2 transition active:scale-95 shadow-xs"
                  >
                    <ShoppingBag className="w-4 h-4 text-amber-600" />
                    <span>+ Masukkan Keranjang</span>
                  </button>

                  <button
                    onClick={handleBuyNowClick}
                    className="w-full py-3.5 px-6 rounded-full bg-slate-900 hover:bg-amber-600 text-white font-semibold text-xs flex items-center justify-center gap-2 transition active:scale-95 shadow-md"
                  >
                    <span>Beli Sekarang</span>
                  </button>
                </div>

                <button
                  onClick={handleDirectWAOrder}
                  className="w-full py-3 px-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs flex items-center justify-center gap-2 transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Pesan Langsung via WhatsApp CS</span>
                </button>
              </div>

            </div>

          </div>

        </div>

        {/* Product FAQs Section */}
        <div className="mt-16 pt-10 border-t border-stone-200 space-y-6">
          <div className="space-y-1">
            <span className="text-amber-600 font-semibold uppercase tracking-[0.2em] text-[11px] block">
              Tanya Jawab Produk
            </span>
            <h3 className="text-xl sm:text-2xl font-light text-slate-900">
              Pertanyaan yang Sering Diajukan Seputar Produk Ini
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {productFaqs.map((faq, index) => (
              <div key={index} className="bg-[#FAF9F5] p-5 rounded-2xl border border-stone-200/70 space-y-2">
                <div className="flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm leading-snug">{faq.question}</h4>
                </div>
                <p className="text-xs text-slate-500 font-light leading-relaxed pl-6">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 pt-10 border-t border-stone-200">
            <h3 className="text-xl sm:text-2xl font-light text-slate-900 mb-8">
              Produk Terkait di Kategori yang Sama
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-3xl border border-stone-200/80 overflow-hidden shadow-xs hover:shadow-lg transition flex flex-col group"
                >
                  <Link to={`/product/${p.slug}`} className="relative aspect-4/3 bg-slate-100 block overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                  <div className="p-4 flex flex-col flex-1 justify-between space-y-3">
                    <Link
                      to={`/product/${p.slug}`}
                      className="font-bold text-slate-900 text-xs leading-snug group-hover:text-amber-600 transition line-clamp-2"
                    >
                      {p.name}
                    </Link>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                      <span className="font-bold text-slate-900 text-xs">
                        {formatPrice(p.priceIdr, currency)}
                      </span>
                      <button
                        onClick={() => addToCart(p, 1)}
                        className="bg-slate-900 hover:bg-amber-600 text-white p-2 rounded-full text-xs font-medium transition"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </ShopLayout>
  );
};
