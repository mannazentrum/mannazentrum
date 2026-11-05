# BACKUP & ROLLBACK PROCEDURE
## Mannazentrum Codebase & Manna Shop

**Project:** Mannazentrum Web Platform  
**Target Subdomain:** `https://shop.mannazentrum.com/`  
**Protected Domains:** `https://www.mannazentrum.com/` & `https://laporan.mannazentrum.com/`  
**Current Working Branch:** `feature/store-improvement`  

---

### 1. Snapshot Git & Riwayat Cabang (Branching Strategy)
- Seluruh perbaikan dan modernisasi toko e-commerce dikerjakan di dalam branch terisolasi:
  ```bash
  git branch
  # * feature/store-improvement
  #   main
  ```
- Cabang `main` tetap bersih dan memegang versi stabil sebelum proses modernisasi dimulai.

---

### 2. Langkah-Langkah Pencadangan (Backup)
Sebelum melakukan merge atau deploy ke lingkungan live:
1. **Pencadangan Berkas Sumber Daya (Git Commit):**
   ```bash
   git add .
   git commit -m "feat(shop): complete modern shop redesign, multi-currency, ASEAN shipping, and employee CMS"
   ```
2. **Pencadangan Tagging:**
   ```bash
   git tag -a v2.1-shop-modernization -m "Release of Manna Shop Eco-Family with ASEAN reach"
   ```
3. **Pencadangan Data Pesanan & Penyimpanan:**
   - Data pesanan toko tersimpan pada key `manna_shop_admin_orders_v1` di browser storage/Cloud Firestore.
   - Ekspor seluruh pesanan melalui tombol **Ekspor CSV** di Admin Dashboard sebelum pembersihan cache.

---

### 3. Prosedur Pembatalan Cepat (Emergency Rollback)
Jika terjadi kendala pada server staging atau produksi, ikuti langkah berikut untuk mengembalikan keadaan seperti semula dalam < 1 menit:

#### Skenario A: Mengembalikan ke Cabang `main` Asli
```bash
# 1. Pastikan repo berada di direktori proyek
cd "c:\Projects\My Website\Tranfer FirebaseToAntigravity\mannazentrum"

# 2. Checkout kembali ke main branch
git checkout main

# 3. Bangun ulang aplikasi
npm run build

# 4. Deploy ulang ke hosting (Vercel / Firebase)
```

#### Skenario B: Pembatalan Spesifik Commit
```bash
# Batalkan commit terakhir tanpa menghapus perubahan kerja:
git reset --soft HEAD~1

# Atau kembalikan file App.tsx ke versi main:
git checkout main -- src/App.tsx
```

---

### 4. Jaminan Isolasi Sistem
Kode routing pada `src/App.tsx` menggunakan pendeteksian hostname dinamis:
- Jika diakses dari `shop.mannazentrum.com`, aplikasi menjalankan rute toko baru.
- Jika diakses dari `www.mannazentrum.com`, aplikasi **100%** menjalankan halaman profil Daycare, Preschool, Unit Bisnis, Berita, dan Kontak seperti semula tanpa perubahan komponen.
