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

export const SHOP_PRODUCTS: ShopProduct[] = [
  // --- PAKAIAN & FASHION KELUARGA ---
  {
    id: 'app-01',
    slug: 'set-piyama-katun-organik-anak',
    name: 'Set Piyama Katun Organik Anak & Balita',
    nameEn: 'Organic Cotton Kids & Toddler Pajamas Set',
    category: 'pakaian',
    categoryLabelId: 'Pakaian Keluarga',
    categoryLabelEn: 'Family Apparel',
    priceIdr: 125000,
    weightGrams: 200,
    rating: 4.9,
    reviewCount: 142,
    stock: 48,
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800',
    badges: ['Organik 100%', 'Best Seller'],
    isBestSeller: true,
    isAseanReady: true,
    shortDescId: 'Bahan 100% katun combed organik bersertifikasi OEKO-TEX, sangat adem dan aman untuk kulit bayi/anak sensitif.',
    shortDescEn: '100% OEKO-TEX certified organic cotton, breathable and gentle on sensitive baby skin.',
    descriptionId: 'Set piyama lengan panjang & celana panjang untuk anak usia 1 hingga 7 tahun. Ditenun dari serat kapas organik tanpa pewarna kimia berat, berpori udara tinggi sehingga mencegah biang keringat saat tidur maupun beraktivitas di iklim tropis Indonesia & Asia Tenggara.',
    descriptionEn: 'Long-sleeve pajama set for kids aged 1-7. Made from organic cotton fibers with non-toxic dyes, highly breathable for tropical climates across ASEAN.',
    specs: [
      { labelId: 'Bahan', labelEn: 'Material', value: '100% Organic Combed Cotton 40s' },
      { labelId: 'Ukuran', labelEn: 'Sizes', value: 'S (1-2 th), M (3-4 th), L (5-7 th)' },
      { labelId: 'Warna', labelEn: 'Colors', value: 'Sage Green, Terracotta, Oat Milk' },
      { labelId: 'Sertifikasi', labelEn: 'Certification', value: 'OEKO-TEX Standard 100 Safe' }
    ],
    careInstructionsId: 'Cuci dengan air suhu ruang atau mesin cuci putaran lembut. Jangan gunakan pemutih berbahan klorin.',
    careInstructionsEn: 'Machine wash cold on gentle cycle. Do not bleach.'
  },
  {
    id: 'app-02',
    slug: 'kaos-polos-serat-bambu-premium',
    name: 'Kaos Polos Serat Bambu Premium Sejuk (Dewasa/Unisex)',
    nameEn: 'Premium Bamboo Fiber Daily T-Shirt (Unisex)',
    category: 'pakaian',
    categoryLabelId: 'Pakaian Keluarga',
    categoryLabelEn: 'Family Apparel',
    priceIdr: 110000,
    weightGrams: 220,
    rating: 4.8,
    reviewCount: 98,
    stock: 65,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800',
    badges: ['Anti-Bakteri', 'Ultra Soft'],
    isBestSeller: true,
    isAseanReady: true,
    shortDescId: 'Terbuat dari 70% serat bambu alami dan 30% katun, menyerap keringat 3x lebih cepat dan anti-bau.',
    shortDescEn: 'Made of 70% natural bamboo & 30% cotton, absorbs moisture 3x faster with natural antibacterial properties.',
    descriptionId: 'Kaos harian keluarga dengan potongan reguler modern yang pas untuk Ayah maupun Ibu. Serat bambu memberikan efek sejuk alami (cooling effect), menjadikannya pakaian paling nyaman untuk aktivitas harian di cuaca tropis.',
    descriptionEn: 'Daily unisex regular-fit tee for parents. Natural cooling sensation ideal for Southeast Asia weather.',
    specs: [
      { labelId: 'Bahan', labelEn: 'Material', value: '70% Natural Bamboo, 30% Premium Cotton' },
      { labelId: 'Ukuran', labelEn: 'Sizes', value: 'S, M, L, XL, XXL' },
      { labelId: 'Warna', labelEn: 'Colors', value: 'Off-White, Deep Navy, Forest Green, Sandstone' }
    ]
  },
  {
    id: 'app-03',
    slug: 'homewear-set-daster-rayon-sejuk',
    name: 'Homewear Set Daster Rayon Sejuk Ibu Rumah Tangga',
    nameEn: 'Breathable Rayon Daily Homewear Set for Moms',
    category: 'pakaian',
    categoryLabelId: 'Pakaian Keluarga',
    categoryLabelEn: 'Family Apparel',
    priceIdr: 135000,
    weightGrams: 250,
    rating: 4.9,
    reviewCount: 175,
    stock: 52,
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80&w=800',
    badges: ['Busui Friendly', 'Jatuh & Lembut'],
    isBestSeller: false,
    isAseanReady: true,
    shortDescId: 'Setelan rumah santai bahan katun rayon premium bertekstur jatuh, dilengkapi kancing depan aktif untuk ibu menyusui.',
    shortDescEn: 'Premium flowing rayon homewear with front buttons suitable for nursing mothers.',
    descriptionId: 'Set baju rumah dan celana santai wanita yang elegan dan nyaman. Bahan rayon viscose adem tidak nerawang, jahitan ganda rapi, dilengkapi saku samping serbaguna.',
    descriptionEn: 'Comfortable women homewear set made of cooling rayon viscose. Non-sheer with dual side pockets.',
    specs: [
      { labelId: 'Bahan', labelEn: 'Material', value: '100% Rayon Viscose Superfine' },
      { labelId: 'Fitur', labelEn: 'Features', value: 'Kancing depan (Busui), pinggang karet elastis' },
      { labelId: 'Ukuran', labelEn: 'Sizes', value: 'All Size fit to L-XL (Lingkar Dada 115cm)' }
    ]
  },
  {
    id: 'app-04',
    slug: 'apron-kanvas-katun-dapur-kebun',
    name: 'Apron Kanvas Katun Tahan Percikan Dapur & Kebun',
    nameEn: 'Heavy Cotton Canvas Kitchen & Gardening Apron',
    category: 'pakaian',
    categoryLabelId: 'Pakaian Keluarga',
    categoryLabelEn: 'Family Apparel',
    priceIdr: 95000,
    weightGrams: 280,
    rating: 4.7,
    reviewCount: 64,
    stock: 35,
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800',
    badges: ['Multifungsi'],
    isAseanReady: true,
    shortDescId: 'Celemek kanvas tebal dengan 3 saku utilitas untuk memasak bersama keluarga maupun berkebun.',
    shortDescEn: 'Sturdy canvas apron with 3 utility pockets for family cooking and home gardening.',
    descriptionId: 'Celemek pelindung serbaguna dengan tali silang punggung (cross-back) yang ergonomis dan tidak membebani leher. Sangat ideal untuk aktivitas memasak hidangan sehat atau merawat tanaman di pekarangan.',
    descriptionEn: 'Ergonomic cross-back canvas apron preventing neck fatigue during kitchen or garden work.',
    specs: [
      { labelId: 'Bahan', labelEn: 'Material', value: 'Canvas Twill Cotton 10oz' },
      { labelId: 'Fitur', labelEn: 'Features', value: '3 saku depan, pengait handuk/gunting' }
    ]
  },

  // --- BAHAN MAKANAN & SEMBAKO SEHAT ---
  {
    id: 'food-01',
    slug: 'beras-organik-pandan-wangi',
    name: 'Beras Organik Pandan Wangi Pilihan (Kemasan Vakum 2.5 kg)',
    nameEn: 'Organic Pandan Wangi Rice (Vacuum Packed 2.5 kg)',
    category: 'makanan',
    categoryLabelId: 'Bahan Makanan Sehat',
    categoryLabelEn: 'Healthy Groceries',
    priceIdr: 78000,
    weightGrams: 2550,
    rating: 5.0,
    reviewCount: 310,
    stock: 90,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=800',
    badges: ['Bebas Pestisida', 'Kemasan Vakum'],
    isBestSeller: true,
    isAseanReady: true,
    shortDescId: 'Ditanam dengan sistem pertanian alami tanpa pestisida kimia. Nasi pulen, harum wangi alami, dan kaya serat.',
    shortDescEn: 'Pesticide-free naturally farmed rice. Fluffy, fragrant, and nutrient-dense in airtight vacuum bag.',
    descriptionId: 'Beras pandan wangi asli dari petani binaan ramah lingkungan. Dikemas dalam plastik kedap udara (vacuum seal) food-grade sehingga tahan simpan lama, bebas kutu, dan higienis sampai ke meja makan keluarga Anda di Indonesia maupun negara Asia Tenggara.',
    descriptionEn: 'Freshly milled organic fragrant rice vacuum-sealed for maximum shelf-life and hygiene across ASEAN shipping.',
    specs: [
      { labelId: 'Berat Bersih', labelEn: 'Net Weight', value: '2.5 Kilogram' },
      { labelId: 'Asal', labelEn: 'Origin', value: 'Pertanian Alami Jawa Barat & Jateng' },
      { labelId: 'Masa Simpan', labelEn: 'Shelf Life', value: '12 Bulan (Kondisi Vakum Tertutup)' }
    ],
    careInstructionsId: 'Simpan di tempat kering dan sejuk. Setelah segel dibuka, masukkan ke dalam wadah kedap udara.',
    careInstructionsEn: 'Store in a cool dry place. Keep in an airtight container once opened.'
  },
  {
    id: 'food-02',
    slug: 'madu-hutan-liar-murni-nusantara',
    name: 'Madu Hutan Liar Murni Nusantara (Raw Honey 500g)',
    nameEn: 'Pure Wild Forest Honey (Raw Honey 500g)',
    category: 'makanan',
    categoryLabelId: 'Bahan Makanan Sehat',
    categoryLabelEn: 'Healthy Groceries',
    priceIdr: 115000,
    weightGrams: 650,
    rating: 4.9,
    reviewCount: 228,
    stock: 45,
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=800',
    badges: ['100% Raw Honey', 'Tanpa Pengawet'],
    isBestSeller: true,
    isAseanReady: true,
    shortDescId: 'Madu mentah tanpa proses pasteurisasi berlebih, menjaga enzim aktif, propolis alami, dan antioksidan utuh.',
    shortDescEn: 'Unpasteurized wild raw honey preserving live beneficial enzymes, propolis, and antioxidants.',
    descriptionId: 'Dipanen secara lestari dari lebah liar (Apis dorsata) di hutan tropis Indonesia. Memberikan energi alami, memperkuat imunitas keluarga, serta aman digunakan sebagai pemanis alami untuk sarapan, teh herbal, dan ramuan herbal.',
    descriptionEn: 'Sustainably harvested raw blossom honey from native forest bees. Boosts family daily immunity.',
    specs: [
      { labelId: 'Isi Bersih', labelEn: 'Net Volume', value: '500 gram (Botol Kaca Tebal Food-Grade)' },
      { labelId: 'Karakter', labelEn: 'Characteristics', value: 'Manis floral legit dengan aroma nektar alami' }
    ]
  },
  {
    id: 'food-03',
    slug: 'minyak-kelapa-murni-vco-500ml',
    name: 'Minyak Kelapa Murni (Extra Virgin Coconut Oil / VCO 500ml)',
    nameEn: 'Cold-Pressed Extra Virgin Coconut Oil (VCO 500ml)',
    category: 'makanan',
    categoryLabelId: 'Bahan Makanan Sehat',
    categoryLabelEn: 'Healthy Groceries',
    priceIdr: 65000,
    weightGrams: 600,
    rating: 4.8,
    reviewCount: 114,
    stock: 55,
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=800',
    badges: ['Cold Pressed', 'Multi-Khasiat'],
    isAseanReady: true,
    shortDescId: 'Minyak kelapa murni perasan dingin (cold pressed), kaya asam laurat untuk imunitas dan dressing salad sehat.',
    shortDescEn: 'Cold-pressed extra virgin coconut oil rich in lauric acid for cooking, dressing, or skin moisture.',
    descriptionId: 'VCO tanpa pemanasan tinggi (no heat method) sehingga menghasilkan minyak bening sejernih kristal dengan aroma kelapa lembut. Baik dikonsumsi langsung 1-2 sendok per hari, minyak tumis sehat, maupun perawatan kulit & rambut balita.',
    descriptionEn: 'Pure unheated VCO crystal clear oil. Great for dietary health, salad seasoning, or natural moisturizing.',
    specs: [
      { labelId: 'Kandungan', labelEn: 'Content', value: '100% Virgin Coconut Oil (Lauric Acid > 50%)' },
      { labelId: 'Isi', labelEn: 'Volume', value: '500 ml' }
    ]
  },
  {
    id: 'food-04',
    slug: 'paket-rempah-dapur-nusantara-organik',
    name: 'Paket Rempah Dapur Nusantara Organik (Set 5 Toples Bumbu)',
    nameEn: 'Organic Indonesian Kitchen Spices Gift Set (5 Jars)',
    category: 'makanan',
    categoryLabelId: 'Bahan Makanan Sehat',
    categoryLabelEn: 'Healthy Groceries',
    priceIdr: 92000,
    weightGrams: 550,
    rating: 4.9,
    reviewCount: 86,
    stock: 40,
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800',
    badges: ['Tanpa MSG', 'Kemasan Kaca'],
    isAseanReady: true,
    shortDescId: 'Kunyit bubuk murni, jahe merah, kayu manis ceylon, lada putih Bangka, dan ketumbar sangrai dalam toples rapat.',
    shortDescEn: 'Set of 5 essential pure spice powders in airtight spice jars: Turmeric, Red Ginger, Cinnamon, White Pepper, Coriander.',
    descriptionId: 'Bumbu dapur pilihan petani lokal nusantara, dikeringkan secara higienis dan digiling halus tanpa tambahan tepung atau pengawet. Hadirkan kehangatan dan kelezatan masakan rumahan berkhasiat untuk keluarga tercinta.',
    descriptionEn: 'Artisan spice collection from Indonesian farms. No preservatives, additive-free essential pantry kit.',
    specs: [
      { labelId: 'Isi Paket', labelEn: 'Package', value: '5 x 60g Toples Kaca Bumbu Segel' },
      { labelId: 'Komposisi', labelEn: 'Composition', value: '100% Rempah Asli Tanpa Garam/MSG Tambahan' }
    ]
  },

  // --- TANAMAN & BIBIT BERKUALITAS ---
  {
    id: 'plant-01',
    slug: 'paket-benih-sayuran-cepat-panen',
    name: 'Paket Benih Sayuran Cepat Panen 8 Varietas (Sayur Keluarga)',
    nameEn: 'Quick-Harvest Home Vegetable Seeds Pack (8 Varieties)',
    category: 'tanaman',
    categoryLabelId: 'Tanaman & Bibit',
    categoryLabelEn: 'Plants & Seeds',
    priceIdr: 58000,
    weightGrams: 150,
    rating: 4.9,
    reviewCount: 195,
    stock: 80,
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6910985b?auto=format&fit=crop&q=80&w=800',
    badges: ['Daya Tumbuh 85%+', 'Mudah Dirawat'],
    isBestSeller: true,
    isAseanReady: true,
    shortDescId: 'Benih pilihan: Pakcoy, Kangkung, Bayam Hijau, Selada Keriting, Tomat Ceri, Cabai Rawit, Mentimun, Terung.',
    shortDescEn: '8 high-germination seed varieties: Bok Choy, Water Spinach, Spinach, Lettuce, Cherry Tomatoes, Chili, Cucumber, Eggplant.',
    descriptionId: 'Set lengkap memulai ketahanan pangan mandiri di rumah. Benih segar terseleksi dengan tingkat perkecambahan tinggi (>85%), cocok ditanam di pekarangan sempit, polybag, maupun sistem hidroponik sederhana perkotaan (urban farming).',
    descriptionEn: 'Complete home garden seed kit with >85% germination rate. Perfect for urban containers and backyard raised beds.',
    specs: [
      { labelId: 'Varietas', labelEn: 'Varieties', value: '8 Jenis Sayuran Daun & Buah Favorit' },
      { labelId: 'Masa Panen', labelEn: 'Harvest Time', value: '25 - 60 Hari (tergantung varietas)' },
      { labelId: 'Panduan', labelEn: 'Guide', value: 'Dilengkapi Buku Panduan Semai & Perawatan' }
    ],
    careInstructionsId: 'Simpan sisa benih di lemari pendingin (suhu 10-15°C) dalam wadah kedap udara untuk memperpanjang daya tumbuh.',
    careInstructionsEn: 'Keep remaining seeds in a dry airtight container in the refrigerator (10-15°C).'
  },
  {
    id: 'plant-02',
    slug: 'kit-starter-berkebun-rumah-lengkap',
    name: 'Kit Starter Berkebun Rumah Lengkap + Media Tanam Organik',
    nameEn: 'Complete Home Gardening Starter Kit + Organic Soil',
    category: 'tanaman',
    categoryLabelId: 'Tanaman & Bibit',
    categoryLabelEn: 'Plants & Seeds',
    priceIdr: 145000,
    weightGrams: 2800,
    rating: 4.8,
    reviewCount: 112,
    stock: 35,
    image: 'https://images.unsplash.com/photo-1416872928419-eb4295bd92be?auto=format&fit=crop&q=80&w=800',
    badges: ['Kit Edukasi Keluarga', 'Komplit'],
    isBestSeller: false,
    isAseanReady: false,
    shortDescId: 'Termasuk sekop mini, 3 pot ramah lingkungan, media tanam kaya mikroba, semprotan air, dan 3 bibit sayur.',
    shortDescEn: 'Includes mini trowel, 3 eco-pots, nutrient-rich microbial soil blend, water spray, and 3 seed packs.',
    descriptionId: 'Solusi praktis mengajak anak dan seluruh keluarga mulai menanam sayur sendiri. Mengajarkan anak mencintai alam, belajar bersabar, serta menikmati sayuran segar bebas bahan kimia langsung dari teras rumah.',
    descriptionEn: 'Hands-on family gardening starter box. Fosters kids love for nature with clean organic harvest at home.',
    specs: [
      { labelId: 'Isi Paket', labelEn: 'Box Content', value: '3 Pot Sabut Kelapa, 2kg Media Tanam Siap Pakai, 1 Sekop, 1 Sprayer, 3 Benih' },
      { labelId: 'Cocok Untuk', labelEn: 'Suitable For', value: 'Pemula, kegiatan edukasi anak sekolah & keluarga' }
    ]
  },
  {
    id: 'plant-03',
    slug: 'bibit-tanaman-herbal-aromaterapi',
    name: 'Bibit Tanaman Herbal Aromaterapi (Mint, Rosemary, Lavender)',
    nameEn: 'Live Potted Culinary & Aromatherapy Herbs Trio',
    category: 'tanaman',
    categoryLabelId: 'Tanaman & Bibit',
    categoryLabelEn: 'Plants & Seeds',
    priceIdr: 89000,
    weightGrams: 900,
    rating: 4.9,
    reviewCount: 78,
    stock: 25,
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=800',
    badges: ['Tanaman Hidup Segar', 'Wangi Alami'],
    isAseanReady: false,
    shortDescId: 'Trio tanaman herbal hidup dalam polybag kokoh, harum mengusir nyamuk dan lezat untuk bumbu dapur segar.',
    shortDescEn: 'Trio of live fragrant potted herbs. Natural mosquito repellent and fresh kitchen culinary seasoning.',
    descriptionId: 'Tanaman herbal hidup siap pajang di dekat jendela dapur atau balkon. Dikirim dengan proteksi packing khusus (batang terlindung dan media basah beroksigen) sehingga sampai segar bugar ke alamat Anda.',
    descriptionEn: 'Fresh potted live herb plants delivered with specialized moisture-retaining protective packaging.',
    specs: [
      { labelId: 'Isi', labelEn: 'Set Includes', value: '1 Pot Peppermint, 1 Pot Rosemary, 1 Pot Lavender' },
      { labelId: 'Kebutuhan Sinar', labelEn: 'Sunlight', value: 'Cahaya matahari pagi 4-6 jam/hari' }
    ],
    careInstructionsId: 'Siram saat permukaan tanah mulai mengering (1-2 hari sekali). Pangkas pucuk daun secara rutin agar tumbuh rimbun.',
    careInstructionsEn: 'Water when topsoil feels dry. Prune leaf tips regularly to promote bushier growth.'
  },
  {
    id: 'plant-04',
    slug: 'pupuk-organik-cair-hayati-plus',
    name: 'Pupuk Organik Cair Hayati Plus Mikroba Subur (Botol 500ml)',
    nameEn: 'Bio-Organic Liquid Fertilizer & Soil Booster (500ml)',
    category: 'tanaman',
    categoryLabelId: 'Tanaman & Bibit',
    categoryLabelEn: 'Plants & Seeds',
    priceIdr: 45000,
    weightGrams: 580,
    rating: 4.8,
    reviewCount: 160,
    stock: 75,
    image: 'https://images.unsplash.com/photo-1617576683096-00fc8eecb3af?auto=format&fit=crop&q=80&w=800',
    badges: ['Organik Hayati', 'Penyubur Akar'],
    isAseanReady: true,
    shortDescId: 'Konsentrat nutrisi alami fermentasi buah & rumput laut. Mempercepat pertumbuhan daun, bunga, dan buah lebat.',
    shortDescEn: 'Fermented plant & kelp nutrient concentrate. Stimulates vigorous roots, lush leaves, and abundant blossoms.',
    descriptionId: 'Pupuk ramah lingkungan yang aman jika tanaman tertempel tangan anak atau hewan peliharaan. Cukup campurkan 5ml pupuk ke dalam 1 liter air dan semprotkan ke daun seminggu sekali untuk tanaman subur menghijau.',
    descriptionEn: 'Safe eco-friendly liquid plant food. Dilute 5ml per 1L of water for weekly foliar feeding.',
    specs: [
      { labelId: 'Isi Bersih', labelEn: 'Volume', value: '500 ml (Cukup untuk 100 Liter Larutan Siap Pakai)' },
      { labelId: 'Aplikasi', labelEn: 'Application', value: 'Semprot daun atau kocor ke perakaran' }
    ]
  },

  // --- KEBUTUHAN HARIAN & PERAWATAN RAMAH LINGKUNGAN ---
  {
    id: 'daily-01',
    slug: 'sabun-mandi-alami-calendula-zaitun',
    name: 'Sabun Mandi Batang Alami Ekstrak Calendula & Zaitun (3 Bar Pack)',
    nameEn: 'Natural Handmade Calendula & Olive Oil Soap (Pack of 3)',
    category: 'harian',
    categoryLabelId: 'Kebutuhan Harian',
    categoryLabelEn: 'Daily Essentials',
    priceIdr: 75000,
    weightGrams: 330,
    rating: 4.9,
    reviewCount: 133,
    stock: 50,
    image: 'https://images.unsplash.com/photo-1607006314584-c74743c069c8?auto=format&fit=crop&q=80&w=800',
    badges: ['SLS/Paraben Free', 'Sensitif Aman'],
    isBestSeller: true,
    isAseanReady: true,
    shortDescId: 'Dibuat dengan metode proses dingin alami, tanpa busa deterjen sintetis SLS/SLES, sangat melembabkan kulit.',
    shortDescEn: 'Cold-processed artisan bars free from sulfates & synthetic fragrances. Gentle for eczema-prone skin.',
    descriptionId: 'Sabun mandi keluarga beraroma menenangkan dari bunga calendula kering dan minyak zaitun murni. Busa lembut alami tidak membuat kulit terasa ketarik atau kering, cocok untuk balita hingga orang dewasa berkulit sensitif.',
    descriptionEn: 'Nourishing natural bath bar with real calendula petals. Hydrates without tightness or irritation.',
    specs: [
      { labelId: 'Isi Paket', labelEn: 'Quantity', value: '3 Batang @ 100 gram' },
      { labelId: 'Bahan Utama', labelEn: 'Key Ingredients', value: 'Minyak Zaitun, Minyak Kelapa, Ekstrak Calendula, Gliserin Nabati' }
    ]
  },
  {
    id: 'daily-02',
    slug: 'pembersih-piring-botol-bayi-bio-enzim',
    name: 'Pembersih Piring & Botol Bayi Bio-Enzim Alami (Refill 1 Liter)',
    nameEn: 'Natural Bio-Enzyme Dish & Baby Bottle Cleanser (1 Liter)',
    category: 'harian',
    categoryLabelId: 'Kebutuhan Harian',
    categoryLabelEn: 'Daily Essentials',
    priceIdr: 49000,
    weightGrams: 1050,
    rating: 4.8,
    reviewCount: 147,
    stock: 60,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800',
    badges: ['Food Grade', 'Ramah Lingkungan'],
    isAseanReady: true,
    shortDescId: 'Formula ekstrak kulit jeruk dan enzim nabati. Mengangkat lemak seketika tanpa residu kimia berbahaya.',
    shortDescEn: 'Citrus peel & vegetable enzyme formula. Cleanses tough grease with zero toxic chemical residue.',
    descriptionId: 'Cairan pembersih ramah lingkungan yang aman untuk mencuci peralatan makan bayi, sayur, dan buah-buahan. Air bilasannya tidak merusak tanah dan aman untuk saluran air rumah tangga.',
    descriptionEn: 'Plant-derived food contact safe cleanser. Biodegradable rinse water safe for greywater systems.',
    specs: [
      { labelId: 'Volume', labelEn: 'Volume', value: '1.000 ml (1 Liter)' },
      { labelId: 'Aroma', labelEn: 'Scent', value: 'Jeruk Nipis Alami Segar' }
    ]
  },
  {
    id: 'daily-03',
    slug: 'beeswax-food-wrap-organik-reusable',
    name: 'Beeswax Food Wrap Organik Reusable (Set 4 Lembar Multi-Ukuran)',
    nameEn: 'Reusable Organic Beeswax Food Wraps (Pack of 4 Sizes)',
    category: 'harian',
    categoryLabelId: 'Kebutuhan Harian',
    categoryLabelEn: 'Daily Essentials',
    priceIdr: 85000,
    weightGrams: 180,
    rating: 4.7,
    reviewCount: 92,
    stock: 42,
    image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&q=80&w=800',
    badges: ['Zero Waste', 'Tahan 1 Tahun'],
    isAseanReady: true,
    shortDescId: 'Pengganti cling wrap plastik! Terbuat dari kain katun dilapisi lilin lebah murni, minyak jojoba, dan getah damar.',
    shortDescEn: 'Eco-friendly alternative to plastic wrap! Made from cotton infused with beeswax, jojoba oil & tree resin.',
    descriptionId: 'Cukup gunakan kehangatan telapak tangan Anda untuk membentuk wrap membungkus keju, potongan buah, mangkuk makanan, atau bekal anak. Bisa dicuci dengan air dingin dan sabun lembut, dapat digunakan berulang hingga 150 kali.',
    descriptionEn: 'Self-sealing food wraps using the warmth of your hands. Washable and reusable for over a year.',
    specs: [
      { labelId: 'Isi Paket', labelEn: 'Set Contains', value: '1x S (18x20cm), 2x M (26x28cm), 1x L (33x35cm)' }
    ]
  },

  // --- PAKET BUNDLING HEMAT ---
  {
    id: 'pack-01',
    slug: 'paket-bundling-keluarga-sehat-mandiri',
    name: 'Paket Bundling Keluarga Sehat Mandiri (Sembako + Bibit + Kaos)',
    nameEn: 'Family Healthy Living Essentials Bundle',
    category: 'paket',
    categoryLabelId: 'Paket Bundling',
    categoryLabelEn: 'Value Bundles',
    priceIdr: 295000,
    weightGrams: 3200,
    rating: 5.0,
    reviewCount: 71,
    stock: 20,
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800',
    badges: ['Hemat 20%', 'Paket Terlaris'],
    isBestSeller: true,
    isAseanReady: true,
    shortDescId: 'Beras Pandan Wangi 2.5kg + Madu Hutan 500g + 1 Kaos Serat Bambu + 1 Paket Benih Sayur 8 Varietas.',
    shortDescEn: '2.5kg Fragrant Rice + 500g Forest Raw Honey + 1 Bamboo T-Shirt + 8-Variety Veggie Seed Pack.',
    descriptionId: 'Paket terlengkap untuk memenuhi gaya hidup sehat keluarga dalam satu kemasan hemat. Sangat cocok sebagai hantaran berkah bagi keluarga terkasih di Indonesia maupun di perantauan Asia Tenggara.',
    descriptionEn: 'The all-in-one curated wellness bundle. Great gift for loved ones in Indonesia and across ASEAN countries.',
    specs: [
      { labelId: 'Potongan Harga', labelEn: 'Savings', value: 'Hemat Rp 76.000 dibanding beli terpisah' },
      { labelId: 'Packing', labelEn: 'Packaging', value: 'Kotak Kardus Tebal Ramah Lingkungan + Pita Hadiah' }
    ]
  }
];

export const SHOP_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-01',
    author: 'Siti Rahmawati',
    location: 'Jakarta Selatan, Indonesia',
    rating: 5,
    date: '3 hari yang lalu',
    comment: 'Beras pandan wangi dan madunya luar biasa enak dan wangi! Anak-anak makan jadi jauh lebih lahap. Pengiriman ke Jakarta sehari sampai.',
    productName: 'Beras Organik Pandan Wangi & Madu Hutan'
  },
  {
    id: 'rev-02',
    author: 'Ahmad Faiz bin Zulkifli',
    location: 'Kuala Lumpur, Malaysia',
    rating: 5,
    date: '1 minggu yang lalu',
    comment: 'Pesan benih sayuran dan piyama katun sampai ke KL dalam 4 hari melalui Pos/EMS. Packing sangat rapi, benih sudah mulai berkecambah di balkoni!',
    productName: 'Paket Benih Sayuran & Piyama Katun Anak'
  },
  {
    id: 'rev-03',
    author: 'Grace Tan',
    location: 'Jurong East, Singapore',
    rating: 5,
    date: '2 minggu yang lalu',
    comment: 'Ordered the organic spices set and cold-pressed VCO. Fragrance is incredible and authentic. The currency converter and WhatsApp checkout made buying so easy.',
    productName: 'Paket Rempah Dapur Nusantara & VCO'
  },
  {
    id: 'rev-04',
    author: 'Bambang Sudarsono',
    location: 'Surabaya, Indonesia',
    rating: 5,
    date: '2 minggu yang lalu',
    comment: 'Kaos bambunya adem banget dipakai siang hari panas terik. Jahitan kuat dan bahannya jatuh nyaman.',
    productName: 'Kaos Polos Serat Bambu Premium'
  }
];

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
