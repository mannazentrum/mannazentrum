import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { 
  ShoppingBag, 
  Sparkles, 
  Palette, 
  BookOpen, 
  CheckCircle2, 
  MessageCircle, 
  Tag, 
  Heart, 
  ArrowRight,
  Filter
} from 'lucide-react';

interface ProductItem {
  id: string;
  name: string;
  category: 'Mainan' | 'Perlengkapan' | 'Pakaian' | 'Kelas Seni';
  price: number;
  image: string;
  desc: string;
  isPopular?: boolean;
}

const products: ProductItem[] = [
  {
    id: 'p1',
    name: 'Balok Kayu Edukasi Alami & Pinus',
    category: 'Mainan',
    price: 250000,
    image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=600',
    desc: 'Balok susun dari kayu pinus halus tanpa zat pewarna kimia beracun, melatih motorik dan kreativitas bangun ruang.',
    isPopular: true
  },
  {
    id: 'p2',
    name: 'Paket Sensory Playdough Organik',
    category: 'Perlengkapan',
    price: 95000,
    image: 'https://images.unsplash.com/photo-1596464716127-f2a829822391?auto=format&fit=crop&q=80&w=600',
    desc: 'Adonan playdough buatan tangan berbasis tepung gandum & pewarna makanan alami. Aman jika tidak sengaja tertelan balita.',
    isPopular: true
  },
  {
    id: 'p3',
    name: 'Kit Berkebun Cilik & Benih Bunga',
    category: 'Perlengkapan',
    price: 120000,
    image: 'https://images.unsplash.com/photo-1416872928419-eb4295bd92be?auto=format&fit=crop&q=80&w=600',
    desc: 'Sekop mini, pot ramah lingkungan, tanah kompos organik, dan bibit tanaman mudah tumbuh untuk melatih kecintaan pada alam.',
  },
  {
    id: 'p4',
    name: 'Celemek Lukis & Kuas Mini Toddler',
    category: 'Pakaian',
    price: 85000,
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80&w=600',
    desc: 'Celemek anti-air lembut untuk balita bereksplorasi finger painting tanpa khawatir noda membandel di pakaian.',
  },
  {
    id: 'p5',
    name: 'Workshop Akhir Pekan: Little Painter',
    category: 'Kelas Seni',
    price: 150000,
    image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=600&q=80',
    desc: 'Kelas melukis kanvas & stimulasi warna 90 menit dipandu mentor seni Malika Maliaki setiap hari Sabtu.',
    isPopular: true
  },
  {
    id: 'p6',
    name: 'Sabun Cair Calendula Hypoallergenic',
    category: 'Perlengkapan',
    price: 110000,
    image: 'https://images.unsplash.com/photo-1603569283847-aa295f0d016a?auto=format&fit=crop&q=80&w=600',
    desc: 'Formula lembut ekstrak bunga calendula alami untuk kulit sensitif bayi dan balita.',
  }
];

const Store: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = ['Semua', 'Mainan', 'Perlengkapan', 'Pakaian', 'Kelas Seni'];

  const filteredProducts = products.filter(
    (p) => selectedCategory === 'Semua' || p.category === selectedCategory
  );

  const handleOrder = (product: ProductItem) => {
    const text = encodeURIComponent(
      `Halo Malika Maliaki, saya berminat memesan produk: ${product.name} (Rp ${product.price.toLocaleString('id-ID')}). Apakah stok masih tersedia?`
    );
    window.open(`https://wa.me/6287881110807?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 antialiased selection:bg-amber-100 selection:text-slate-900">
      <SEO 
        title="Malika Maliaki Store - Perlengkapan Stimulasi, Seni & Mainan Edukatif"
        description="Katalog produk stimulasi sensori, mainan edukatif kayu aman, perlengkapan belajar, dan kelas seni anak dari unit usaha Malika Maliaki (Mannazentrum)."
        canonicalPath="/toko"
      />

      <Navbar />

      {/* Top Banner Notice */}
      <div className="bg-[#FAF9F5] border-b border-stone-200/60 py-2.5 px-4 text-center">
        <p className="text-slate-600 font-sans text-xs font-normal">
          ✨ <strong className="font-semibold text-slate-900">Malika Maliaki</strong> — Unit Edukasi Kreatif & Perlengkapan Stimulasi Anak PT. Elrafa Terang Sejahtera
        </p>
      </div>

      {/* Hero Header */}
      <section className="relative bg-white py-16 md:py-24 px-6 sm:px-10 lg:px-16 border-b border-slate-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-amber-600 font-semibold uppercase tracking-[0.2em] text-xs block">
              Eksplorasi Kreatif & Stimulasi Anak
            </span>
            {/* Primary H1 Heading */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-light text-slate-900 tracking-tight leading-tight">
              Malika Maliaki: Menyemai Kreativitas & Rasa Ingin Tahu
            </h1>
            <p className="text-slate-600 font-light text-base md:text-lg max-w-2xl leading-relaxed">
              Koleksi mainan edukasi berbasis bahan alam, sensory play kit higienis, serta workshop seni yang mendukung imajinasi dan stimulasi motorik buah hati.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#katalog"
                className="bg-slate-900 text-white px-7 py-3 rounded-full text-xs font-medium hover:bg-slate-800 transition shadow-sm"
              >
                Lihat Katalog Produk
              </a>
              <a
                href="https://wa.me/6287881110807?text=Halo%20Malika%20Maliaki,%20saya%20ingin%20tanya%20katalog%20lengkap%20dan%20pemesanan."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 text-white px-7 py-3 rounded-full text-xs font-medium hover:bg-emerald-500 transition shadow-sm flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Pemesanan via WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-3xl shadow-xl bg-slate-100">
              <img 
                src="https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=80" 
                alt="Eksplorasi seni dan kebersamaan keluarga Malika Maliaki" 
                className="w-full aspect-[4/3] object-cover"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Catalog & Filter Section */}
      <section id="katalog" className="py-20 px-6 sm:px-10 lg:px-16 bg-[#FAF9F5]">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-amber-600 font-semibold uppercase tracking-[0.2em] text-[11px] block mb-2">
                Pilihan Terbaik
              </span>
              <h2 className="text-3xl md:text-4xl font-light text-slate-900 tracking-tight">
                Katalog Produk & Merchandise Edukasi
              </h2>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition ${
                    selectedCategory === cat
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-stone-200/70'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div 
                key={product.id} 
                className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col group"
              >
                <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {product.isPopular && (
                    <span className="absolute top-4 left-4 bg-amber-500 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider shadow">
                      Favorit Anak
                    </span>
                  )}
                  <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-slate-800 text-[10px] font-medium px-2.5 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-bold text-slate-900 text-lg leading-snug mb-2 group-hover:text-amber-600 transition">
                    {product.name}
                  </h3>
                  <p className="text-slate-500 font-light text-xs leading-relaxed mb-6">
                    {product.desc}
                  </p>

                  <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase text-slate-400 block tracking-wider">Harga</span>
                      <span className="font-bold text-slate-900 text-base">
                        Rp {product.price.toLocaleString('id-ID')}
                      </span>
                    </div>
                    <button
                      onClick={() => handleOrder(product)}
                      className="inline-flex items-center gap-1.5 bg-slate-900 text-white text-xs px-4 py-2.5 rounded-full font-medium hover:bg-emerald-600 transition shadow-sm active:scale-95"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Pesan</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Workshop Information Section */}
      <section className="bg-white py-20 px-6 sm:px-10 lg:px-16">
        <div className="max-w-4xl mx-auto bg-amber-50/60 p-8 md:p-12 rounded-[36px] border border-amber-200/60 flex flex-col md:flex-row items-center gap-8">
          <div className="w-16 h-16 bg-amber-500 text-white rounded-2xl flex items-center justify-center text-3xl shrink-0 shadow-md">
            🎨
          </div>
          <div className="space-y-2 text-center md:text-left flex-grow">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Ingin Menyelenggarakan Workshop Seni di Sekolah / Komunitas Anda?
            </h2>
            <p className="text-slate-600 font-light text-sm leading-relaxed">
              Malika Maliaki menyediakan paket mentor seni, material canvas, dan playdough kit untuk kegiatan field trip dan acara parenting.
            </p>
          </div>
          <a
            href="https://wa.me/6287881110807?text=Halo%20Malika%20Maliaki,%20kami%20tertarik%20mengadakan%20workshop%20seni%20kreatif."
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-slate-900 text-white px-6 py-3 rounded-full text-xs font-semibold hover:bg-slate-800 transition shadow-sm"
          >
            Hubungi Kemitraan
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Store;
