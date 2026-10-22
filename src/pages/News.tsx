import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import FloatingCTA from '../components/FloatingCTA';
import { newsArticles, Article } from '../data/newsData';
import { 
  Search, 
  Calendar, 
  Clock, 
  User, 
  BookOpen, 
  ArrowRight, 
  Tag, 
  Share2, 
  X,
  Sparkles
} from 'lucide-react';

const News: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = ['Semua', 'Tips Parenting', 'Tumbuh Kembang', 'Berita Kegiatan'];

  const filteredArticles = newsArticles.filter((art) => {
    const matchesCategory = selectedCategory === 'Semua' || art.category === selectedCategory;
    const matchesSearch = 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 antialiased selection:bg-amber-100 selection:text-slate-900">
      <SEO 
        title="Berita, Tips Parenting & Tumbuh Kembang Anak | Mannazentrum"
        description="Kumpulan artikel edukatif, panduan parenting ramah anak, stimulasi sensori motorik, serta berita kegiatan seru di Mannazentrum Daycare & Preschool Cisauk."
        canonicalPath="/berita"
      />

      <Navbar />

      {/* Article Detail Reading Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-slate-900/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
          <div className="bg-white w-full max-w-3xl rounded-[36px] shadow-2xl border border-slate-100 overflow-hidden relative my-auto max-h-[90vh] flex flex-col">
            <button 
              onClick={() => setActiveArticle(null)}
              className="absolute top-6 right-6 w-11 h-11 bg-white/90 text-slate-500 hover:text-slate-900 rounded-full flex items-center justify-center text-2xl transition-all z-10 shadow-sm"
              aria-label="Tutup Artikel"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="overflow-y-auto p-6 md:p-10">
              <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden mb-6 bg-slate-100">
                <img 
                  src={activeArticle.imageUrl} 
                  alt={activeArticle.title} 
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mb-3">
                <span className="bg-amber-100 text-amber-900 font-medium px-3 py-1 rounded-full">
                  {activeArticle.category}
                </span>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {activeArticle.date}</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {activeArticle.readTime}</span>
                <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {activeArticle.author}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-normal text-slate-900 tracking-tight leading-snug mb-6">
                {activeArticle.title}
              </h2>

              <div className="prose prose-slate max-w-none text-slate-600 font-light text-base leading-relaxed whitespace-pre-line space-y-4">
                {activeArticle.content}
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center">
                <span className="text-xs text-slate-400">Diterbitkan oleh PT. Elrafa Terang Sejahtera</span>
                <button 
                  onClick={() => setActiveArticle(null)}
                  className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-xs font-medium hover:bg-slate-800 transition"
                >
                  Tutup Bacaan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header Banner */}
      <section className="bg-[#FAF9F5] border-b border-stone-200/40 py-16 md:py-24 px-6 sm:px-10 lg:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-amber-600 font-semibold uppercase tracking-[0.25em] text-xs mb-3 block">
            Jurnal & Wawasan Keluarga
          </span>
          {/* Primary H1 Heading */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-light text-slate-900 tracking-tight leading-tight mb-4">
            Berita, Artikel Parenting & Tips Tumbuh Kembang
          </h1>
          <p className="text-slate-500 font-light text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Dapatkan panduan praktis pengasuhan balita, inspirasi stimulasi sensori dari para ahli, serta dokumentasi kegiatan seru di Mannazentrum.
          </p>

          {/* Search Bar */}
          <div className="mt-8 max-w-xl mx-auto relative">
            <input 
              type="text" 
              placeholder="Cari topik artikel (contoh: tantrum, sensori, nutrisi)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-stone-200/80 rounded-full py-3.5 pl-12 pr-6 text-sm text-slate-800 placeholder-slate-400 shadow-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition"
            />
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          </div>

          {/* Categories Pill Bar */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-stone-100 border border-stone-200/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20 px-6 sm:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <h2 className="text-2xl font-light text-slate-900 tracking-tight">
              {selectedCategory === 'Semua' ? 'Semua Artikel & Berita' : `Kategori: ${selectedCategory}`}
            </h2>
            <p className="text-xs text-slate-400 mt-1">Menampilkan {filteredArticles.length} artikel terbitan Mannazentrum</p>
          </div>

          {filteredArticles.length === 0 ? (
            <div className="text-center py-20 bg-slate-50 rounded-3xl border border-slate-100">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-slate-800">Artikel Tidak Ditemukan</h3>
              <p className="text-xs text-slate-500 mt-1">Coba kata kunci pencarian lain atau pilih kategori Semua.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <article 
                  key={article.id} 
                  className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col group cursor-pointer"
                  onClick={() => setActiveArticle(article)}
                >
                  <div className="overflow-hidden aspect-[16/10] bg-slate-100">
                    <img 
                      src={article.imageUrl} 
                      alt={article.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                      <span className="bg-amber-50 text-amber-800 font-medium px-2.5 py-1 rounded-full">
                        {article.category}
                      </span>
                      <span>{article.readTime}</span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-lg leading-snug mb-3 group-hover:text-amber-600 transition">
                      {article.title}
                    </h3>

                    <p className="text-slate-500 font-light text-sm line-clamp-3 mb-6">
                      {article.summary}
                    </p>

                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                      <span>{article.date}</span>
                      <span className="text-slate-900 font-semibold group-hover:text-amber-600 flex items-center gap-1">
                        <span>Baca Selengkapnya</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bottom Newsletter/Consultation Box */}
      <section className="bg-[#FAF9F5] py-16 px-6 sm:px-10 lg:px-16 border-t border-stone-200/40">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <Sparkles className="w-8 h-8 text-amber-600 mx-auto" />
          <h2 className="text-2xl sm:text-3xl font-light text-slate-900 tracking-tight">
            Punya Pertanyaan Spesifik Seputar Tumbuh Kembang Buah Hati?
          </h2>
          <p className="text-slate-500 text-sm font-light max-w-lg mx-auto">
            Konsultasikan tahapan milestone dan persiapan sekolah anak Anda bersama tim pengasuh & konselor Mannazentrum Cisauk.
          </p>
          <div className="pt-2">
            <a
              href="https://wa.me/6287881110807?text=Halo%20Mannazentrum,%20saya%20membaca%20artikel%20di%20website%20dan%20ingin%20konsultasi."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-slate-900 text-white px-7 py-3 rounded-full text-xs font-semibold hover:bg-slate-800 transition"
            >
              <span>Konsultasi WhatsApp Gratis</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <FloatingCTA />
      <Footer />
    </div>
  );
};

export default News;
