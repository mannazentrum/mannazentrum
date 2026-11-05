# TECH_STACK_REPORT: MANNAZENTRUM ONLINE STORE (shop.mannazentrum.com)

**Penyusun:** Senior Full-Stack Developer & E-Commerce Architect  
**Tanggal Analisis:** 5 November 2026  
**Status Proyek:** Production Ready / Incremental Modernization  
**Domain Operasional:**  
- Domain Utama: `https://www.mannazentrum.com` (Yayasan, Daycare & Preschool, Informasi Korporat)  
- Subdomain Toko: `https://shop.mannazentrum.com` (Toko Online Terpadu Kebutuhan Keluarga)  
- Subdomain Laporan: `https://laporan.mannazentrum.com` (Portal Evaluasi Siswa & Wali Murid)

---

## 1. Arsitektur Frontend
- **Framework Utama:** React 18.2.0 (SPA Client-Side Rendered via Vite 5.1.4)
- **Bahasa Pemrograman:** TypeScript 5.2.2 (Strict Type Checking)
- **Styling & Design System:** Tailwind CSS 3.4.1 + PostCSS + Autoprefixer
- **Desain & Tema Warna:**
  - `primary`: `#42210b` (Deep Espresso Brown)
  - `accent`: `#f3b524` / Amber-500 & Amber-600 (Warm Golden Honey)
  - `warm-ivory`: `#FAF9F5`
  - `slate-900`: Modern Dark Slate (Charcoal)
- **Ikonografi:** Lucide React 1.61.0
- **Routing:** React Router DOM 7.18.4 (Subdomain-aware routing via `window.location.hostname`)
- **Bundle Optimation & Lazy Loading:**
  - Dynamic `import()` dan React `lazy()` + `Suspense`
  - Chunk splitting otomatis per halaman e-commerce
- **Web Analytics:** Vercel Analytics 1.6.1 + Google Analytics 4 Ready

---

## 2. Arsitektur Backend & Database
- **Cloud Infrastructure:** Google Firebase Cloud Platform (`mannazentrum-connect`)
  - **NoSQL Database:** Google Cloud Firestore (Collections: `formSubmissions`, `shop_orders`, `shop_products`, `shop_customers`, `shop_articles`)
  - **Storage:** Firebase Cloud Storage (Media upload gambar produk dan sertifikat)
  - **Auth SDK:** Firebase Authentication (Staff / Employee Admin RBAC)
- **Relational / Security Layer:** Supabase Database (PostgreSQL dengan Row-Level Security / RLS)
- **Local Fallback & Client Cache:** LocalStorage untuk keranjang belanja dan preferensi multi-currency (IDR, SGD, MYR, USD) & bilingual (ID/EN)

---

## 3. Integrasi Pembayaran & Logistik (E-Commerce)
- **Metode Pembayaran:**
  - QRIS (GoPay, OVO, ShopeePay, Dana, LinkAja)
  - Virtual Account Bank (BCA, Mandiri, BRI, BNI)
  - Kartu Kredit / Internasional (Visa & MasterCard)
  - WhatsApp Direct Invoice Checkout (+62 878-8111-0807)
- **Jaringan Kurir & Ekspedisi:**
  - **Domestik Indonesia:** JNE, SiCepat, J&T Express, Paxel (Cold-chain), GoSend / Grab Sameday
  - **Asia Tenggara (ASEAN):** Pos Indonesia EMS, DHL International Express, FedEx, RaySpeed Logistics (Singapura, Malaysia, Brunei, Thailand, Filipina)
- **Standar Proteksi:**
  - Vacuum Sealed 120 micron untuk sembako dan madu
  - Karantina & sertifikasi kadar air benih tanaman (<7%)
  - Garansi penggantian 100% kerusakan dalam perjalanan

---

## 4. Hosting, Serverless & Deployment
- **Hosting Provider:** Vercel Cloud Serverless Edge Platform
- **Konfigurasi Routing (`vercel.json`):**
  - Path rewrites: `/(.*) -> /index.html` (SPA fallback)
  - Edge redirects: Subdomain routing otomatis untuk `/toko`, `/store`, `/shop` ke `https://shop.mannazentrum.com`
- **SSL / TLS:** Full TLS 1.3 Encryption dengan wildcard certificate pada `*.mannazentrum.com`
