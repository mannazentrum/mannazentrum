# EXISTING_FEATURES_INVENTORY: MANNAZENTRUM ONLINE STORE

**Inventarisasi Fitur & Komponen Operasional**  
**Terakhir Diperbarui:** 5 November 2026

---

## 1. Domain Utama (`www.mannazentrum.com`) - Dilindungi Penuh
| Halaman / Fitur | Lokasi Komponen | Status Operasional | Keterangan |
| :--- | :--- | :--- | :--- |
| Beranda Yayasan | `src/pages/Home.tsx` | Aktif (100%) | Tidak disentuh, mempertahankan form pendaftaran daycare & preschool |
| Tentang Kami | `src/pages/About.tsx` | Aktif (100%) | Profil korporat PT. Elrafa Terang Sejahtera |
| Daycare | `src/pages/Daycare.tsx` | Aktif (100%) | Paket penitipan anak Cisauk, Serpong Garden, BSD |
| Preschool | `src/pages/Preschool.tsx` | Aktif (100%) | Kurikulum usia dini bilingual |
| News & Tips | `src/pages/News.tsx` | Aktif (100%) | Berita parenting & perkembangan anak |
| Unit Bisnis | `src/pages/BusinessUnitsPage.tsx` | Aktif (100%) | Profil divisi usaha Mannazentrum |
| Kontak & Kunjungan | `src/pages/Contact.tsx` | Aktif (100%) | Form survei lokasi & integrasi Firebase Firestore |

---

## 2. Subdomain Toko (`shop.mannazentrum.com`) - Diperluas & Ditingkatkan
| Halaman / Fitur | Rute URL | Lokasi Komponen | Keterangan |
| :--- | :--- | :--- | :--- |
| **Beranda Toko** | `/` | `src/pages/Store.tsx` | Hero banner hangat, kategori cards, produk terpopuler, ulasan ASEAN |
| **Daftar Kategori** | `/category` | `src/pages/shop/ShopCategoryPage.tsx` | Katalog 5 kategori utama keperluan keluarga |
| **Halaman Kategori** | `/category/:categorySlug` | `src/pages/shop/ShopCategoryPage.tsx` | Filter siap kirim ASEAN, sorting harga/rating, grid produk |
| **Detail Produk** | `/product/:productSlug` | `src/pages/shop/ShopProductPage.tsx` | Galeri foto, SKU, spesifikasi, tips perawatan, tombol beli instan, ulasan |
| **Tentang Kami Toko** | `/about-us` | `src/pages/shop/ShopAboutPage.tsx` | Misi keluarga sehat, 4 pilar mutu alami, kemitraan petani lokal |
| **Kontak CS Toko** | `/contact` | `src/pages/shop/ShopContactPage.tsx` | CS WhatsApp, email toko, pusat gudang Tangerang/Jabar, form kirim pesan |
| **Kebijakan Pengiriman** | `/shipping-policy` | `src/pages/shop/ShopShippingPolicyPage.tsx` | Tarif & kurir ID & ASEAN (Pos EMS, DHL), kemasan vakum makanan, benih |
| **Kebijakan Retur** | `/return-policy` | `src/pages/shop/ShopReturnPolicyPage.tsx` | Garansi 100% barang rusak, garansi benih tumbuh 14 hari, penukaran ukuran baju |
| **Blog & Edukasi** | `/blog` & `/blog/:postSlug` | `src/pages/shop/ShopBlogPage.tsx` | Artikel nutrisi beras organik, tips kebun keluarga, tekstil serat bambu |
| **Keranjang Slide-over** | Drawer (Global) | `src/components/shop/ShopCartDrawer.tsx` | Edit kuantiti, hapus item, voucher diskon, hitung subtotal & total otomatis |
| **Checkout Terpadu** | Modal (Global) | `src/components/shop/ShopCheckoutModal.tsx` | Pilihan negara (ID, SG, MY, BN, TH, PH), ongkir otomatis, VA/QRIS/Card/WA invoice |
| **Multi-Currency** | Header / Selector | `src/utils/shopCurrency.ts` | Konversi harga real-time IDR (Rp), SGD (S$), MYR (RM), USD ($) |
| **Dwi-Bahasa** | Header / Selector | `ShopHeader.tsx` & `ShopContext.tsx` | Alih bahasa satu klik: Bahasa Indonesia & English |

---

## 3. Data Produk Eksisting (16 Produk Terpadu)
- `app-01`: Set Piyama Katun Organik Anak & Balita (`set-piyama-katun-organik-anak`)
- `app-02`: Kaos Polos Serat Bambu Premium Sejuk (`kaos-polos-serat-bambu-premium`)
- `app-03`: Homewear Set Daster Rayon Sejuk Ibu (`homewear-set-daster-rayon-sejuk`)
- `app-04`: Apron Kanvas Katun Dapur & Kebun (`apron-kanvas-katun-dapur-kebun`)
- `food-01`: Beras Organik Pandan Wangi Vakum 2.5kg (`beras-organik-pandan-wangi`)
- `food-02`: Madu Hutan Liar Murni Nusantara 500g (`madu-hutan-liar-murni-nusantara`)
- `food-03`: Minyak Kelapa Murni VCO 500ml (`minyak-kelapa-murni-vco-500ml`)
- `food-04`: Paket Rempah Dapur Nusantara Organik (`paket-rempah-dapur-nusantara-organik`)
- `plant-01`: Paket Benih Sayuran Cepat Panen 8 Varietas (`paket-benih-sayuran-cepat-panen`)
- `plant-02`: Kit Starter Berkebun Rumah Lengkap (`kit-starter-berkebun-rumah-lengkap`)
- `plant-03`: Bibit Tanaman Herbal Aromaterapi Trio (`bibit-tanaman-herbal-aromaterapi`)
- `plant-04`: Pupuk Organik Cair Hayati Plus (`pupuk-organik-cair-hayati-plus`)
- `daily-01`: Sabun Mandi Alami Calendula & Zaitun (`sabun-mandi-alami-calendula-zaitun`)
- `daily-02`: Pembersih Piring & Botol Bayi Bio-Enzim (`pembersih-piring-botol-bayi-bio-enzim`)
- `daily-03`: Beeswax Food Wrap Organik Reusable (`beeswax-food-wrap-organik-reusable`)
- `pack-01`: Paket Bundling Keluarga Sehat Mandiri (`paket-bundling-keluarga-sehat-mandiri`)
