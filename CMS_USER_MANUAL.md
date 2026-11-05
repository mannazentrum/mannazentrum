# PANDUAN PENGGUNA EMPLOYEE CMS & ADMIN DASHBOARD
## Manna Shop Eco-Family (`https://shop.mannazentrum.com/admin/shop`)

Dokumen ini diperuntukkan bagi karyawan operasional, customer service, manajer toko, editor konten, dan tim keuangan untuk mengelola toko online Manna Shop sehari-hari.

---

### 1. Cara Mengakses Admin Dashboard
- **URL Akses:**
  - `https://shop.mannazentrum.com/admin/shop`
  - Atau `https://shop.mannazentrum.com/admin`
  - *(Pada lingkungan lokal development: `http://localhost:5173/admin?view=shop`)*
- **Struktur Peran (Role-Based Access Control / RBAC):**
  1. **Owner / Super Admin:** Akses penuh ke seluruh modul, pengaturan diskon, dan ekspor data keuangan.
  2. **Store Manager:** Mengelola stok produk, harga, dan alur pemrosesan pesanan.
  3. **Content Editor:** Menambah dan menyunting artikel edukasi/blog, spanduk promosi, dan FAQ.
  4. **Customer Service (CS):** Memantau pesanan masuk, melayani konfirmasi pelanggan, dan memperbarui status resi kirim.
  5. **Finance:** Memverifikasi status pembayaran (QRIS / Transfer Bank) dan mengunduh laporan keuangan.

---

### 2. Mengelola Pesanan (Order Management)
1. Buka Tab **Pesanan**.
2. Anda akan melihat daftar pesanan yang diurutkan dari yang terbaru.
3. **Mengubah Status Pesanan:**
   - Gunakan menu pilihan dropdown pada kolom status:
     - `Pending` (Menunggu Pembayaran)
     - `Processing` (Pembayaran Diterima / Sedang Dikemas)
     - `Shipped` (Sudah Dikirim ke Ekspedisi)
     - `Delivered` (Pesanan Telah Tiba di Pelanggan)
     - `Cancelled` (Pesanan Dibatalkan)
4. **Memasukkan Nomor Resi Pengiriman (AWB):**
   - Klik kolom input **No. Resi** di sebelah kanan status.
   - Ketik nomor resi dari kurir (misal: JNE: `JNE-CGK-1092839` atau DHL Express: `DHL-SG-889102`).
   - Tekan tombol **Simpan**. Sistem akan menyimpan nomor resi secara otomatis ke basis data pesanan.
5. **Ekspor Laporan Pesanan:**
   - Klik tombol **Ekspor CSV** di pojok kanan atas untuk mengunduh rekap transaksi dalam format Microsoft Excel / Google Sheets.

---

### 3. Mengelola Katalog Produk (Product Management)
1. Buka Tab **Produk**.
2. **Menambah Produk Baru:**
   - Klik tombol **+ Tambah Produk Baru** di pojok kanan atas.
   - Isi formulir modal:
     - *Nama Produk*: misal "Bibit Tomat Cherry Organik"
     - *Kategori*: Pilih Pakaian, Makanan Sehat, Tanaman & Bibit, Keperluan Harian, atau Paket Hemat.
     - *Harga (IDR)* & *Harga Coret/Diskon* (jika ada).
     - *Jumlah Stok*: misal 50.
     - *URL Gambar Produk*: Tautan gambar (Unsplash / Firebase Storage / CDN).
     - *Spesifikasi*: misal "Isi 100 butir, daya kecambah 92%".
     - *Petunjuk Perawatan / Pemakaian*: misal "Simpan di tempat sejuk & kering".
   - Klik **Simpan Produk**. Produk baru akan langsung muncul di katalog toko.
3. **Menyunting / Memperbarui Stok Produk:**
   - Cari produk yang diinginkan pada daftar produk.
   - Klik tombol **Edit** untuk memperbarui harga atau jumlah persediaan stok.

---

### 4. Mengelola Kupon Diskon (Marketing & Promotions)
1. Buka Tab **Kupon & Promo**.
2. Sistem memiliki kupon default yang siap pakai:
   - `HEMAT10` : Potongan 10% untuk pesanan keluarga pertama.
   - `ASEANFAM` : Potongan 15% untuk pengiriman ke Singapura & Malaysia.
   - `LEBARAN` : Potongan 12% untuk pembelian paket sembako & busana muslim.
3. Karyawan dapat menonaktifkan kupon yang sudah kedaluwarsa atau menambah kode kupon promosi baru.

---

### 5. Keamanan & Kebijakan Data
- Jangan pernah membagikan tautan sesi login atau kredensial internal kepada pihak luar.
- Setiap pembaruan status dan resi tersimpan secara real-time pada penyimpanan lokal/cloud yang terisolasi dari domain utama sekolah Mannazentrum.
