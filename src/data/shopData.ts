// src/data/shopData.ts
// Data types, currency rates, shipping matrix, and real-time empty initial catalog for shop.mannazentrum.com

export interface ShopProduct {
  id: string;
  slug: string;
  name: string;
  nameEn: string;
  category: 'pakaian' | 'makanan' | 'tanaman' | 'harian' | 'paket';
  categoryLabelId: string;
  categoryLabelEn: string;
  priceIdr: number;
  weightGrams: number;
  rating: number;
  reviewCount: number;
  stock: number;
  image: string;
  badges: string[];
  isBestSeller?: boolean;
  isAseanReady?: boolean;
  shortDescId: string;
  shortDescEn: string;
  descriptionId: string;
  descriptionEn: string;
  specs: { labelId: string; labelEn: string; value: string }[];
  careInstructionsId?: string;
  careInstructionsEn?: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  productName: string;
}

export interface ShopCategory {
  slug: string;
  nameId: string;
  nameEn: string;
  descId: string;
  descEn: string;
  iconName: string;
  bannerImage: string;
}

export interface ShopBlogPost {
  slug: string;
  titleId: string;
  titleEn: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  excerptId: string;
  excerptEn: string;
  contentId: string;
  contentEn: string;
  relatedProductSlug?: string;
}

export const CURRENCY_RATES = {
  IDR: { symbol: 'Rp', rate: 1, label: 'IDR (Rp)' },
  SGD: { symbol: 'S$', rate: 0.000084, label: 'SGD (S$)' },
  MYR: { symbol: 'RM', rate: 0.00028, label: 'MYR (RM)' },
  USD: { symbol: '$', rate: 0.000062, label: 'USD ($)' },
};

export type CurrencyKey = keyof typeof CURRENCY_RATES;

export const SHOP_CATEGORIES: ShopCategory[] = [
  {
    slug: 'pakaian',
    nameId: 'Pakaian Keluarga',
    nameEn: 'Family Apparel',
    descId: 'Pakaian harian anak, balita, dan orang tua berbahan katun organik & serat bambu yang adem, higienis, dan ramah kulit sensitif tropis.',
    descEn: 'Breathable, non-toxic organic cotton and bamboo daily wear for children and parents.',
    iconName: 'Shirt',
    bannerImage: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=1200'
  },
  {
    slug: 'makanan',
    nameId: 'Bahan Makanan Sehat',
    nameEn: 'Healthy Food & Groceries',
    descId: 'Beras organik kemasan vakum tahan lama, madu mentah hutan liar nusantara, VCO perasan dingin, dan rempah bumbu dapur alami tanpa MSG.',
    descEn: 'Vacuum-packed organic rice, wild raw forest honey, cold-pressed VCO, and pure kitchen spices.',
    iconName: 'Apple',
    bannerImage: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=1200'
  },
  {
    slug: 'tanaman',
    nameId: 'Tanaman & Bibit',
    nameEn: 'Plants & Seeds',
    descId: 'Benih sayuran cepat panen dengan daya tumbuh >85%, starter kit berkebun keluarga, bibit herbal hidup, dan pupuk organik hayati.',
    descEn: 'High-germination edible seeds, potted live culinary herbs, and organic microbial liquid fertilizers.',
    iconName: 'Leaf',
    bannerImage: 'https://images.unsplash.com/photo-1592417817098-8f3d6910985b?auto=format&fit=crop&q=80&w=1200'
  },
  {
    slug: 'harian',
    nameId: 'Kebutuhan Harian',
    nameEn: 'Daily Essentials',
    descId: 'Sabun alami bebas SLS untuk kulit sensitif bayi, cairan pembersih botol bio-enzim food grade, dan beeswax food wrap pengganti plastik.',
    descEn: 'Hypoallergenic botanical soaps, plant enzyme cleansers, and reusable beeswax food wraps.',
    iconName: 'Home',
    bannerImage: 'https://images.unsplash.com/photo-1607006314584-c74743c069c8?auto=format&fit=crop&q=80&w=1200'
  },
  {
    slug: 'paket',
    nameId: 'Paket Bundling Hemat',
    nameEn: 'Value Bundles',
    descId: 'Paket kurasi lengkap kombinasi sembako sehat, benih sayuran, dan pakaian harian dengan diskon istimewa hingga 20%.',
    descEn: 'All-in-one curated wellness bundles combining organic staples, seeds, and soft tees.',
    iconName: 'Package',
    bannerImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200'
  }
];

// REAL SHOP PRODUCTS CATALOG
export const SHOP_PRODUCTS: ShopProduct[] = [
  {
    id: "cust-9433",
    slug: "glow-home-anti-sumbat-wc-saluran-air-wastafel-mampet",
    name: "Glow Home | Anti Sumbat WC Saluran Air Wastafel Mampet",
    nameEn: "Glow Home | Anti Clog Drain Cleaner Sink & Toilet",
    category: "harian",
    categoryLabelId: "Kebutuhan Harian",
    categoryLabelEn: "Daily Essentials",
    priceIdr: 47000,
    weightGrams: 500,
    rating: 5.0,
    reviewCount: 1,
    stock: 5,
    image: "/images/products/glow-home-anti-sumbat.jpg",
    badges: ["Produk Baru", "Bundle Get 2"],
    isBestSeller: true,
    isAseanReady: true,
    shortDescId: "Pembersih dan pelancar saluran pipa mampet ampuh melarutkan kotoran organik, lemak dapur, dan gumpalan rambut dengan busa aktif tanpa merusak pipa.",
    shortDescEn: "Powerful active foam drain cleaner that dissolves organic waste, kitchen grease, and hair clogs safely and effectively.",
    descriptionId: "Glow Home Anti Sumbat Saluran adalah formula pembersih konsentrat dengan busa aktif kuat yang dirancang khusus untuk mengatasi masalah saluran air mampet. Ampuh menghancurkan sumbatan sisa lemak, minyak, kotoran makanan berlendir, dan rambut pada wastafel cuci piring, floor drain kamar mandi, maupun kloset secara cepat tanpa perlu membongkar pipa. Dilengkapi formula antibakteri dan aroma segar yang efektif melenyapkan bau tak sedap.",
    descriptionEn: "Glow Home Anti-Clog Drain Cleaner features a powerful active foam formula engineered to unclog drains swiftly. Effectively dissolves blockages caused by grease, cooking oils, food residue, and hair in kitchen sinks, bathroom floor drains, and toilets without dismantling pipes. Infused with antibacterial agents and fresh scent to eliminate bad odors.",
    specs: [
      { labelId: "Kondisi", labelEn: "Condition", value: "Baru & Segel Resmi" },
      { labelId: "Kemasan", labelEn: "Package", value: "Bundle Get 2 Botol" },
      { labelId: "Kapasitas Bersih", labelEn: "Net Weight", value: "500 Gram" },
      { labelId: "Aplikasi", labelEn: "Usage", value: "Wastafel Dapur, Kloset/WC, Saluran Air Kamar Mandi" },
      { labelId: "Keunggulan", labelEn: "Key Features", value: "Busa Aktif Kuat, Aman untuk Pipa PVC, Aroma Segar Anti Bau" }
    ],
    careInstructionsId: "Tuangkan cairan secukupnya ke lubang saluran, diamkan 15-30 menit agar busa aktif melarutkan sumbatan, lalu siram dengan air mengalir.",
    careInstructionsEn: "Pour an adequate amount into the drain, wait 15-30 minutes for the active foam to dissolve the clog, then flush with running water."
  }
];

// DUMMY REVIEWS REMOVED: Initial reviews are empty.
export const SHOP_REVIEWS: ReviewItem[] = [];

export const SHIPPING_DESTINATIONS = [
  { code: 'ID', nameId: 'Indonesia (Domestik)', nameEn: 'Indonesia (Domestic)', flag: '🇮🇩', baseRateIdr: 15000, perKgRateIdr: 10000, courier: 'JNE, SiCepat, J&T, Paxel, Gosend' },
  { code: 'SG', nameId: 'Singapura (Singapore)', nameEn: 'Singapore', flag: '🇸🇬', baseRateIdr: 120000, perKgRateIdr: 65000, courier: 'Pos Indonesia EMS / DHL / RaySpeed (3-5 Hari)' },
  { code: 'MY', nameId: 'Malaysia (Semenanjung & Sabah/Sarawak)', nameEn: 'Malaysia', flag: '🇲🇾', baseRateIdr: 110000, perKgRateIdr: 60000, courier: 'Pos Indonesia EMS / Teleport / DHL Express (3-5 Hari)' },
  { code: 'BN', nameId: 'Brunei Darussalam', nameEn: 'Brunei Darussalam', flag: '🇧🇳', baseRateIdr: 140000, perKgRateIdr: 75000, courier: 'Pos Indonesia Air Parcel / EMS' },
  { code: 'TH', nameId: 'Thailand', nameEn: 'Thailand', flag: '🇹🇭', baseRateIdr: 150000, perKgRateIdr: 80000, courier: 'DHL International Express / EMS' },
  { code: 'PH', nameId: 'Filipina (Philippines)', nameEn: 'Philippines', flag: '🇵🇭', baseRateIdr: 160000, perKgRateIdr: 85000, courier: 'FedEx / Pos Indonesia EMS' },
];

export const DISCOUNT_COUPONS: Record<string, { percent: number; minOrder: number; label: string }> = {
  'KELUARGABARU': { percent: 10, minOrder: 100000, label: 'Diskon 10% Pengguna Baru' },
  'ASEANFAM': { percent: 15, minOrder: 250000, label: 'Diskon 15% Khusus Keluarga ASEAN' },
  'HEMATSEHAT': { percent: 5, minOrder: 50000, label: 'Diskon 5% Belanja Sehat' }
};

export const SHOP_BLOG_POSTS: ShopBlogPost[] = [
  {
    slug: '5-manfaat-beras-organik-untuk-imunitas-keluarga',
    titleId: '5 Manfaat Beras Organik Pandan Wangi untuk Kesehatan Anak & Imunitas Keluarga',
    titleEn: '5 Benefits of Organic Fragrant Rice for Kids Health & Family Immunity',
    category: 'Nutrisi & Makanan Sehat',
    author: 'Tim Nutrisi Manna Shop',
    date: '4 November 2026',
    readTime: '4 menit baca',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=800',
    excerptId: 'Mengapa beralih ke beras organik tanpa pestisida kimia dapat menurunkan risiko alergi pada balita dan meningkatkan stamina harian keluarga.',
    excerptEn: 'Why shifting to chemical-free organic rice significantly reduces allergy risks in toddlers and improves family daily stamina.',
    contentId: `Beras adalah makanan pokok harian jutaan keluarga di Indonesia dan Asia Tenggara. Namun, sebagian besar beras konvensional yang beredar di pasaran telah melalui proses pemupukan kimia sintetis dan penyemprotan pestisida berkala.

Berikut adalah 5 alasan utama mengapa keluarga modern kini memilih beras organik:
1. Bebas Residu Logam Berat & Pestisida: Anak-anak memiliki organ hati yang masih sensitif. Makanan bebas racun kimia adalah pondasi imunitas utama mereka.
2. Kandungan Serat & Mineral Utuh: Beras organik diproses secara minimal sehingga aleuron dan lapisan bekatul kaya vitamin B kompleks tetap terjaga.
3. Wangi Alami Menggugah Selera Makan Anak: Tanpa pewangi buatan, aroma daun pandan alami membuat si kecil makan lebih lahap tanpa perlu dipaksa.
4. Kemasan Kedap Udara Vakum: Bebas dari kutu beras dan jamur meski disimpan berbulan-bulan di iklim tropis lembab.
5. Mendukung Petani Lokal yang Berkelanjutan: Pembelian beras organik menjaga kelestarian tanah dan air tanah di pedesaan Indonesia.`,
    contentEn: `Rice is the heart of family dining across Southeast Asia. Discover why conscious families choose pesticide-free fragrant vacuum-packed rice to safeguard their kids' growing immunity and promote sustainable local agriculture.`
  },
  {
    slug: 'panduan-mudah-menanam-sayuran-cepat-panen-di-rumah',
    titleId: 'Panduan Mudah Menanam Sayuran Cepat Panen di Pekarangan Rumah',
    titleEn: 'A Beginner Guide to Quick-Harvest Urban Backyard Gardening',
    category: 'Berkebun & Tanaman',
    author: 'Agro Edukasi Manna',
    date: '28 Oktober 2026',
    readTime: '5 menit baca',
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6910985b?auto=format&fit=crop&q=80&w=800',
    excerptId: 'Langkah praktis mengajak buah hati menanam kangkung, pakcoy, dan selada dalam pot di balkon atau teras sempit dalam 30 hari panen.',
    excerptEn: 'Practical steps to grow water spinach, bok choy, and lettuce in pots or balconies with 30-day harvest cycles.',
    contentId: `Berkebun di rumah bukan hanya tentang menghasilkan sayuran segar bebas bahan kimia, melainkan sarana stimulasi sensorik dan pendidikan karakter bagi anak-anak.

Langkah-langkah memulai kebun sayur mini:
1. Pilih Benih Berdaya Tumbuh Tinggi (>85%): Gunakan benih segar tersegel yang tahan iklim tropis seperti kangkung, bayam, dan pakcoy.
2. Siapkan Media Tanam Bernutrisi: Campuran tanah subur, kompos matang, dan sekam bakar dengan perbandingan seimbang menjamin aerasi akar yang sehat.
3. Siram Lembut Pagi & Sore: Jangan gunakan semprotan terlalu deras agar benih yang baru berkecambah tidak hanyut atau patah.
4. Sinar Matahari yang Cukup: Letakkan pot di tempat yang terkena sinar matahari minimal 4 jam sehari.
5. Panen Bersama: Dalam 25-35 hari, sayuran siap dipetik segar untuk hidangan makan malam keluarga tercinta!`,
    contentEn: `Gardening is a wonderful screen-free family ritual that teaches children patience, biology, and healthy eating habits right from their home balcony.`
  },
  {
    slug: 'mengapa-serat-bambu-menjadi-pilihan-terbaik-pakaian-anak-tropis',
    titleId: 'Mengapa Serat Bambu Alami Pilihan Terbaik untuk Pakaian Anak di Iklim Tropis',
    titleEn: 'Why Natural Bamboo Fiber Is the Ultimate Choice for Tropical Kids Wear',
    category: 'Gaya Hidup & Busana',
    author: 'Tim Tekstil Alami Manna',
    date: '20 Oktober 2026',
    readTime: '3 menit baca',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800',
    excerptId: 'Karakteristik sejuk alami, daya serap keringat tinggi, dan serat hipoalergenik yang menjaga anak tetap ceria tanpa biang keringat.',
    excerptEn: 'Natural cooling properties, superior moisture-wicking, and hypoallergenic fibers that keep children rash-free in hot weather.',
    contentId: `Suhu udara yang hangat dan kelembaban tinggi di Indonesia, Malaysia, dan Singapura seringkali memicu biang keringat serta rasa gerah pada balita dan anak-anak.

Serat bambu alami menawarkan solusi inovatif:
- Efek Dingin Alami: Terasa 2-3 derajat lebih sejuk di kulit dibandingkan katun biasa.
- Anti-Bakteri Alami (Bamboo Kun): Mencegah bau apek keringat meski anak beraktivitas aktif seharian.
- Kelembutan Setara Sutra: Sangat lembut sehingga tidak menimbulkan gesekan kasar pada lipatan leher atau ketiak anak.`,
    contentEn: `Learn about the thermal-regulating science behind bamboo apparel and why it has become the standard for children daily comfort across ASEAN.`
  }
];
