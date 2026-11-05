# DEVELOPMENT_PLAN: MANNAZENTRUM ONLINE STORE MODERNIZATION

**Proyek:** Peningkatan Skala Menyeluruh `https://shop.mannazentrum.com/`  
**Rencana Eksekusi Berfase (15 Fasa)**  
**Target:** Tanpa Downtime & Backward Compatible Penuh

---

## Roadmap Pengembangan

### Fase 1 & 2: Analisis & Lingkungan Pengembangan (Selesai)
- [x] Branch `feature/store-improvement` dibuat.
- [x] Dokumen `TECH_STACK_REPORT.md` selesai.
- [x] Dokumen `EXISTING_FEATURES_INVENTORY.md` selesai.
- [x] Pengecekan build & dependensi.

### Fase 3: Peningkatan Beranda (Homepage Enhancement)
- [x] Responsive announcement bar terpadu.
- [x] Header e-commerce modern dengan pencarian real-time dan currency selector.
- [x] Hero banner bernuansa Mannazentrum Warm Slate & Honey Amber.
- [x] Pilihan kategori cepat, produk terpopuler, ulasan lintas negara ASEAN.
- [x] Newsletter subscription section dan trust badge jaminan mutu.

### Fase 4 & 5: Katalog & Detail Produk (Catalog & Product Detail)
- [x] Navigasi hierarkis `/category` dan `/category/:categorySlug`.
- [x] Filter harga, ketersediaan stok, dan kurir ASEAN.
- [x] Halaman produk individual `/product/:productSlug` dengan galeri, deskripsi, spesifikasi, dan panduan perawatan.
- [x] Structured Data (JSON-LD: Product, Offer, Breadcrumb) untuk SEO Google & AI Search.

### Fase 6: Keranjang & Alur Checkout (Cart & Checkout Streamlining)
- [x] Keranjang belanja slide-over dengan kupon diskon dinamis.
- [x] Form checkout terpadu dengan estimasi ongkir otomatis ke Indonesia & 5 negara ASEAN.
- [x] Pilihan pembayaran aman: QRIS, Virtual Account, Kartu Kredit, WhatsApp Direct Invoice.

### Fase 7 & 8: Employee CMS & Admin Dashboard (RBAC & Manajemen Toko)
- [ ] Buat modul Admin Dashboard khusus Toko di `/admin/shop` (atau `/shop-admin`):
  - **Overview Dashboard:** Total penjualan, pesanan aktif, pendapatan harian/bulanan, stok menipis (low-stock alert).
  - **Manajemen Produk:** Tambah produk baru, edit nama, harga, stok, upload gambar, ubah status aktif/non-aktif.
  - **Manajemen Pesanan:** Melihat daftar pesanan, mengubah status (Menunggu Pembayaran, Diproses, Dikirim, Selesai), input nomor resi pengiriman.
  - **Manajemen Pelanggan:** Daftar riwayat pembeli dan nomor kontak WhatsApp.
  - **Manajemen Promosi & Kupon:** Menambah dan mengaktifkan kode voucher diskon.
  - **Manajemen Konten Blog:** Menulis dan mengedit artikel edukasi keluarga.
  - **Role-Based Access Control (RBAC):** Super Admin (Owner), Store Manager, Content Editor, CS, Finance.
  - **Proteksi Autentikasi:** Login aman staff dengan role badge dan logout.

### Fase 9 & 10: Technical SEO, Geo & AI Search Readiness
- [ ] Optimasi `sitemap.xml` agar mencakup seluruh URL toko (`/category/*`, `/product/*`, `/about-us`, `/contact`, `/shipping-policy`, `/return-policy`, `/blog/*`).
- [ ] Optimasi `robots.txt` dengan instruksi ramah crawler AI (Googlebot, Bingbot, Perplexity, GPTBot).
- [ ] JSON-LD Structured Data: `Organization`, `WebSite`, `Product`, `FAQPage`, `BreadcrumbList`.

### Fase 11: E-commerce Event Tracking & Integrasi
- [ ] Pelacakan event e-commerce GA4: `view_item`, `add_to_cart`, `begin_checkout`, `purchase`.
- [ ] Tombol pintas konsultasi WhatsApp Business CS toko.

### Fase 12, 13 & 15: Verifikasi & Deliverables
- [ ] Uji coba menyeluruh semua modul dan fungsi keranjang belanja.
- [ ] Verifikasi `npm run build` bebas error.
- [ ] Pembuatan `TESTING_REPORT.md`, `SEO_IMPLEMENTATION_REPORT.md`, dan `CMS_USER_MANUAL.md`.
