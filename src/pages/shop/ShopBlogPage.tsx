import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShopLayout } from '../../components/shop/ShopLayout';
import SEO from '../../components/SEO';
import { SHOP_BLOG_POSTS, SHOP_PRODUCTS } from '../../data/shopData';
import { 
  BookOpen, 
  Clock, 
  Calendar, 
  ChevronRight, 
  ArrowLeft, 
  Share2, 
  ArrowRight,
  ShoppingBag
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { formatPrice } from '../../utils/shopCurrency';

export const ShopBlogPage: React.FC = () => {
  const { postSlug } = useParams<{ postSlug?: string }>();
  const { currency, addToCart, blogPosts, products } = useShop();

  const postsList = blogPosts && blogPosts.length > 0 ? blogPosts : SHOP_BLOG_POSTS;
  const currentPost = postsList.find((p) => p.slug === postSlug);

  // If viewing single blog post
  if (postSlug && currentPost) {
    const recommendedProduct = products && products.length > 0 ? products[0] : null;

    return (
      <ShopLayout>
        <SEO 
          title={`${currentPost.titleId} - Mannazentrum Shop Blog`}
          description={currentPost.excerptId}
          canonicalPath={`/blog/${currentPost.slug}`}
        />

        {/* Breadcrumb */}
        <div className="bg-[#FAF9F5] border-b border-stone-200/60 py-3 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto flex items-center space-x-2 text-xs text-slate-500 overflow-x-auto scrollbar-none">
            <Link to="/" className="hover:text-amber-600 transition shrink-0">Beranda</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <Link to="/blog" className="hover:text-amber-600 transition shrink-0">Blog Edukasi</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="font-semibold text-slate-900 truncate">{currentPost.titleId}</span>
          </div>
        </div>

        {/* Article Container */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-8">
          
          <div className="space-y-4">
            <span className="inline-block bg-amber-100 text-amber-900 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
              {currentPost.category}
            </span>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-light text-slate-900 tracking-tight leading-tight">
              {currentPost.titleId}
            </h1>
            <div className="flex items-center gap-4 text-xs text-slate-500 border-b border-stone-200 pb-4">
              <span>Penulis: <strong>{currentPost.author}</strong></span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{currentPost.date}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{currentPost.readTime}</span>
              </span>
            </div>
          </div>

          <div className="relative aspect-16/9 rounded-3xl overflow-hidden bg-stone-100 border border-stone-200 shadow-md">
            <img
              src={currentPost.image}
              alt={currentPost.titleId}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="prose prose-slate max-w-none text-sm sm:text-base leading-relaxed text-slate-700 whitespace-pre-line font-light">
            {currentPost.contentId}
          </div>

          {/* Related Product Callout (If product available) */}
          {recommendedProduct && (
            <div className="bg-[#FAF9F5] p-6 rounded-3xl border border-stone-200/70 flex flex-col sm:flex-row items-center justify-between gap-4 mt-10">
              <div className="flex items-center gap-4">
                <img
                  src={recommendedProduct.image}
                  alt={recommendedProduct.name}
                  className="w-16 h-16 rounded-2xl object-cover shrink-0 border border-stone-200"
                />
                <div>
                  <span className="text-[10px] uppercase font-bold text-amber-700 block tracking-wider">Produk Terkait Artikel Ini</span>
                  <h4 className="font-bold text-slate-900 text-sm">{recommendedProduct.name}</h4>
                  <span className="font-bold text-amber-900 text-xs">{formatPrice(recommendedProduct.priceIdr, currency)}</span>
                </div>
              </div>
              <Link
                to={`/product/${recommendedProduct.slug}`}
                className="bg-slate-900 hover:bg-amber-600 text-white font-medium text-xs px-5 py-2.5 rounded-full transition shrink-0"
              >
                Lihat Detail Produk →
              </Link>
            </div>
          )}

          <div className="pt-6 border-t border-stone-200 flex justify-between items-center">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-amber-600 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Daftar Artikel</span>
            </Link>
          </div>

        </article>
      </ShopLayout>
    );
  }

  // Blog Index List
  return (
    <ShopLayout>
      <SEO 
        title="Blog & Tips Belanja Keluarga Sehat - Mannazentrum Shop"
        description="Artikel edukasi seputar nutrisi makanan organik, panduan berkebun sayuran rumah tangga, dan gaya hidup sehat ramah lingkungan untuk keluarga Indonesia & Asia Tenggara."
        canonicalPath="/blog"
      />

      {/* Hero Header */}
      <section className="bg-slate-900 text-white py-14 md:py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-amber-400 font-semibold uppercase tracking-[0.2em] text-xs block">
            Kabar, Tips & Edukasi Keluarga
          </span>
          <h1 className="text-3xl sm:text-5xl font-light text-white tracking-tight">
            Blog & Panduan Hidup Sehat
          </h1>
          <p className="text-slate-300 font-light text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Wawasan terpercaya seputar nutrisi pangan bebas pestisida, tips berkebun praktis di pekarangan rumah, dan perawatan ramah lingkungan.
          </p>
        </div>
      </section>

      {/* Blog Cards Grid */}
      <section className="py-14 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {postsList.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-3xl border border-stone-200/80 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              <Link to={`/blog/${post.slug}`} className="relative aspect-16/10 bg-slate-100 overflow-hidden block">
                <img
                  src={post.image}
                  alt={post.titleId}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-amber-900 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                  {post.category}
                </span>
              </Link>

              <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>

                  <Link
                    to={`/blog/${post.slug}`}
                    className="font-bold text-slate-900 text-base leading-snug group-hover:text-amber-600 transition block line-clamp-2"
                  >
                    {post.titleId}
                  </Link>

                  <p className="text-xs text-slate-500 font-light line-clamp-3 leading-relaxed">
                    {post.excerptId}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">Oleh: {post.author}</span>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="text-xs font-semibold text-amber-700 hover:text-amber-900 inline-flex items-center gap-1 transition"
                  >
                    <span>Baca Selengkapnya</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </ShopLayout>
  );
};
