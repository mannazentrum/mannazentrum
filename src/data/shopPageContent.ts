// src/data/shopPageContent.ts
// Default content and types for Manna Shop editable website pages

export interface ShopSiteSettings {
  storeName: string;
  tagline: string;
  announcementBarText: string;
  announcementBarLink: string;
  whatsappNumber: string;
  whatsappDisplay: string;
  email: string;
  address: string;
  operatingHoursWeekday: string;
  operatingHoursWeekend: string;
}

export interface ShopHomeContent {
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  heroCtaText: string;
  heroCtaLink: string;
  pillar1Title: string;
  pillar1Desc: string;
  pillar2Title: string;
  pillar2Desc: string;
  pillar3Title: string;
  pillar3Desc: string;
  pillar4Title: string;
  pillar4Desc: string;
  promoTitle: string;
  promoSubtitle: string;
  promoCoupon: string;
  promoDiscountPercent: number;
  reviewsTitle: string;
  reviewsSubtitle: string;
  newsletterTitle: string;
  newsletterSubtitle: string;
}

export interface ShopAboutContent {
  badge: string;
  title: string;
  subtitle: string;
  storyTitle: string;
  storyParagraph1: string;
  storyParagraph2: string;
  storyParagraph3: string;
  missionTitle: string;
  missionDescription: string;
  farmerCommitmentTitle: string;
  farmerCommitmentDesc: string;
  founderQuote: string;
  founderName: string;
  founderRole: string;
}

export interface ShopContactContent {
  badge: string;
  title: string;
  subtitle: string;
  welcomeMessage: string;
  warehouseTitle: string;
  warehouseAddress: string;
  whatsappLabel: string;
  emailLabel: string;
  hoursLabel: string;
  faq1Question: string;
  faq1Answer: string;
  faq2Question: string;
  faq2Answer: string;
  faq3Question: string;
  faq3Answer: string;
}

export interface ShopShippingPolicyContent {
  badge: string;
  title: string;
  subtitle: string;
  domesticTitle: string;
  domesticHandlingTime: string;
  domesticCarriers: string;
  domesticDescription: string;
  aseanTitle: string;
  aseanDestinations: string;
  aseanDescription: string;
  packagingTitle: string;
  packagingDescription: string;
  quarantineTitle: string;
  quarantineDescription: string;
}

export interface ShopReturnPolicyContent {
  badge: string;
  title: string;
  subtitle: string;
  transitGuaranteeTitle: string;
  transitGuaranteeDays: number;
  transitGuaranteeDesc: string;
  seedGuaranteeTitle: string;
  seedGuaranteeDays: number;
  seedGuaranteeDesc: string;
  clothingExchangeTitle: string;
  clothingExchangeDays: number;
  clothingExchangeDesc: string;
  step1: string;
  step2: string;
  step3: string;
}

export const DEFAULT_SITE_SETTINGS: ShopSiteSettings = {
  storeName: 'Manna Shop',
  tagline: 'Kebutuhan Harian & Herbal Keluarga Se-Indonesia & Asia Tenggara',
  announcementBarText: '🇸🇬 🇲🇾 🇮🇩 Pengiriman Resmi Terpadu ke Seluruh Indonesia, Singapura, Malaysia, & ASEAN! Dapatkan Diskon 10% dengan Kode: HEMAT10',
  announcementBarLink: '/category/paket',
  whatsappNumber: '6287881110807',
  whatsappDisplay: '+62 878-8111-0807',
  email: 'shop@mannazentrum.com',
  address: 'Sentra Logistik Manna Zentrum, Jl. Kemang Timur No. 12, Jakarta Selatan, 12730, Indonesia',
  operatingHoursWeekday: 'Senin - Jumat: 08.00 - 18.00 WIB',
  operatingHoursWeekend: 'Sabtu: 08.00 - 15.00 WIB (Minggu Libur Pengiriman)',
};

export const DEFAULT_HOME_CONTENT: ShopHomeContent = {
  heroBadge: 'ECO-LIVING & FAMILY ESSENTIALS',
  heroTitle: 'Kebutuhan Harian Alami & Berkualitas untuk Keluarga Tercinta',
  heroSubtitle: 'Pilihan kurasi busana serat organik, sembako sehat beras & madu mentah, bibit tanaman herbal pekarangan, dan produk rumah tangga ramah lingkungan untuk keluarga Indonesia & Asia Tenggara.',
  heroCtaText: 'Jelajahi Produk Kami',
  heroCtaLink: '#katalog-produk',
  pillar1Title: '100% Alami & Organik',
  pillar1Desc: 'Bebas pestisida sintetis, pewarna tekstil berbahaya, dan bahan kimia agresif.',
  pillar2Title: 'Kirim Se-Indonesia & ASEAN',
  pillar2Desc: 'Pengiriman aman dengan standar ekspor dan karantina tanaman resmi ke SG, MY, BN, TH, PH.',
  pillar3Title: 'Kemasan Vakum Higienis',
  pillar3Desc: 'Menjaga kesegaran beras organik dan higienitas pakaian anak dari kontaminasi udara.',
  pillar4Title: 'Garansi Sampai & Tumbuh',
  pillar4Desc: '100% penggantian jika produk rusak saat transit, serta garansi daya kecambah benih.',
  promoTitle: 'Paket Hemat Keluarga ASEAN',
  promoSubtitle: 'Hemat hingga 15% untuk pembelian paket sembako berkah & kit berkebun keluarga dengan kupon eksklusif.',
  promoCoupon: 'ASEANFAM',
  promoDiscountPercent: 15,
  reviewsTitle: 'Dipercaya Ribuan Keluarga',
  reviewsSubtitle: 'Ulasan nyata dari para ibu, ayah, dan pecinta gaya hidup sehat di Jakarta, Surabaya, Kuala Lumpur, hingga Singapura.',
  newsletterTitle: 'Dapatkan Tips Hidup Sehat & Promo Eksklusif',
  newsletterSubtitle: 'Bergabunglah dengan buletin mingguan kami mengenai nutrisi alami keluarga dan panduan berkebun pekarangan.',
};

export const DEFAULT_ABOUT_CONTENT: ShopAboutContent = {
  badge: 'Mengenal Manna Shop',
  title: 'Menyemai Gaya Hidup Sehat & Alami untuk Seluruh Keluarga',
  subtitle: 'Pusat perlengkapan harian terpadu: dari pakaian serat alami lembut si kecil, bahan pangan pokok organik, hingga bibit tanaman untuk ketahanan pangan mandiri di pekarangan rumah.',
  storyTitle: 'Berasal dari Kepedulian Nyata akan Kualitas Hidup Si Kecil & Rumah Tangga',
  storyParagraph1: 'Manna Shop lahir dari kesadaran mendalam bahwa kesehatan keluarga dimulai dari apa yang dipakai, apa yang dimakan, dan bagaimana lingkungan sekitar rumah dirawat setiap hari.',
  storyParagraph2: 'Banyak keluarga menghadapi tantangan paparan residu pestisida pada bahan pangan pokok, pakaian anak berbahan sintetis panas yang memicu alergi kulit tropis, serta keterbatasan pasokan benih berkualitas untuk berkebun di lahan sempit.',
  storyParagraph3: 'Melalui Manna Shop, kami menghadirkan kurasi produk yang telah melewati standar ketat, bermitra langsung dengan kelompok tani organik lokal nusantara dan pengrajin tekstil ramah lingkungan.',
  missionTitle: 'Misi Kami untuk Keluarga di Asia Tenggara',
  missionDescription: 'Menyediakan akses mudah, transparan, dan terjangkau terhadap produk kebutuhan harian alami berstandar mutu tinggi untuk keluarga di seluruh Indonesia dan negara-negara tetangga di kawasan Asia Tenggara.',
  farmerCommitmentTitle: 'Kemitraan Berkelanjutan dengan Petani Lokal',
  farmerCommitmentDesc: 'Setiap butir beras, tetes madu hutan Sumbawa, dan benih tanaman yang Anda pesan mendukung langsung kesejahteraan petani lokal dengan harga beli yang adil (fair trade).',
  founderQuote: 'Keluarga sehat adalah fondasi generasi cerdas. Kami mendedikasikan Manna Shop agar setiap ibu dan ayah bisa memberikan yang terbaik untuk rumah tangganya.',
  founderName: 'Tim Manajemen Mannazentrum',
  founderRole: 'PT. Elrafa Terang Sejahtera',
};

export const DEFAULT_CONTACT_CONTENT: ShopContactContent = {
  badge: 'Layanan Pelanggan & Bantuan',
  title: 'Kami Siap Membantu Anda',
  subtitle: 'Punya pertanyaan mengenai ketersediaan stok, waktu pengiriman ke wilayah Anda, atau konsultasi produk keluarga? Hubungi tim kami sekarang.',
  welcomeMessage: 'Tim customer service kami merespons chat WhatsApp dengan cepat selama jam operasional.',
  warehouseTitle: 'Sentra Logistik & Pengiriman',
  warehouseAddress: 'Jl. Kemang Timur No. 12, Jakarta Selatan, DKI Jakarta 12730, Indonesia',
  whatsappLabel: 'WhatsApp CS Resmi (Respon Cepat)',
  emailLabel: 'Surat Elektronik (Email Penawaran & Ekspor)',
  hoursLabel: 'Jam Operasional & Pengiriman',
  faq1Question: 'Apakah Manna Shop bisa mengirim ke Singapura dan Malaysia?',
  faq1Answer: 'Ya, kami melayani pengiriman resmi ke seluruh wilayah Indonesia serta negara-negara ASEAN seperti Singapura, Malaysia, Brunei, Thailand, dan Filipina dengan ekspedisi udara terpercaya.',
  faq2Question: 'Bagaimana cara memesan paket grosir atau reseller?',
  faq2Answer: 'Anda dapat langsung menghubungi nomor WhatsApp kami di +62 878-8111-0807 dengan menyertakan daftar produk dan estimasi volume yang dibutuhkan untuk mendapatkan harga grosir.',
  faq3Question: 'Apakah bibit tanaman aman dikirim antar pulau atau ke luar negeri?',
  faq3Answer: 'Semua bibit kami dikemas dalam kemasan kedap udara dan dilengkapi sertifikasi kesehatan tanaman (Phytosanitary inspection standard) sehingga aman dan legal melewati proses karantina bandara.',
};

export const DEFAULT_SHIPPING_POLICY_CONTENT: ShopShippingPolicyContent = {
  badge: 'Transparansi Logistik',
  title: 'Kebijakan Pengiriman Resmi & Kemasan Aman',
  subtitle: 'Kami memastikan setiap produk dikemas dengan standar higienis tinggi dan sampai di tujuan dengan selamat di seluruh Indonesia dan Asia Tenggara.',
  domesticTitle: 'Pengiriman Domestik Seluruh Indonesia',
  domesticHandlingTime: 'Pesanan sebelum pukul 14.00 WIB dikirim pada hari yang sama.',
  domesticCarriers: 'JNE (Reguler, YES), SiCepat, J&T Cargo, GoSend/GrabExpress (Area Jabodetabek).',
  domesticDescription: 'Estimasi tiba untuk wilayah Jabodetabek adalah 1-2 hari kerja, Pulau Jawa 2-3 hari kerja, dan Luar Pulau Jawa 3-5 hari kerja dengan nomor resi pelacakan online otomatis.',
  aseanTitle: 'Pengiriman Regional Asia Tenggara (ASEAN)',
  aseanDestinations: 'Singapura, Malaysia (Barat & Timur), Brunei Darussalam, Thailand, Filipina.',
  aseanDescription: 'Menggunakan kurir udara internasional (EMS International / DHL Express). Estimasi tiba di Singapura & Malaysia adalah 3-5 hari kerja. Sudah termasuk dokumen inspeksi karantina benih tanaman.',
  packagingTitle: 'Standar Kemasan Vakum & Food Grade',
  packagingDescription: 'Bahan pangan seperti beras organik dan biji chia divakum kedap udara untuk mencegah kutu dan menjaga kesegaran. Pakaian dikemas dalam polybag ramah lingkungan, dan madu dikemas dengan pelindung gelembung tebal tebal (bubble air column).',
  quarantineTitle: 'Karantina Tumbuhan & Benih Tanaman',
  quarantineDescription: 'Setiap paket benih dan bibit telah melewati seleksi benih unggul bersertifikasi dengan daya kecambah teruji di atas 85%, aman melalui pemindaian sinar X-ray bandara.',
};

export const DEFAULT_RETURN_POLICY_CONTENT: ShopReturnPolicyContent = {
  badge: 'Jaminan Kepuasan Pelanggan',
  title: 'Kebijakan Pengembalian & Garansi 100%',
  subtitle: 'Kenyamanan dan ketenangan belanja keluarga Anda adalah prioritas mutlak kami. Kami memberikan garansi penuh untuk setiap produk yang Anda terima.',
  transitGuaranteeTitle: 'Garansi Kerusakan Transit 100%',
  transitGuaranteeDays: 7,
  transitGuaranteeDesc: 'Jika produk rusak, botol madu pecah, atau kemasan bocor saat proses pengiriman, kami akan mengirimkan pengganti baru secara gratis atau pengembalian dana penuh dalam 7 hari.',
  seedGuaranteeTitle: 'Garansi Daya Tumbuh Benih 14 Hari',
  seedGuaranteeDays: 14,
  seedGuaranteeDesc: 'Jika benih tidak berkecambah dalam 14 hari dengan mengikuti petunjuk semai kami, kirimkan foto media semai ke tim CS untuk mendapatkan paket benih pengganti gratis.',
  clothingExchangeTitle: 'Tukar Ukuran Pakaian Anak & Dewasa',
  clothingExchangeDays: 7,
  clothingExchangeDesc: 'Ukuran piyama atau baju tidak pas? Anda dapat menukarkan ukuran dalam 7 hari setelah barang diterima, asalkan pakaian belum dicuci dan label masih terpasang rapi.',
  step1: 'Foto atau rekam video unboxing produk yang bermasalah secara jelas.',
  step2: 'Kirimkan pesan ke WhatsApp Customer Service di +62 878-8111-0807 dengan menyebutkan nomor pesanan Anda.',
  step3: 'Tim kami akan memvalidasi dalam 1x24 jam kerja dan langsung memproses pengiriman produk pengganti tanpa biaya tambahan.',
};
