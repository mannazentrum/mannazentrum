# PANDUAN PENGGUNA EMPLOYEE CMS & ADMIN DASHBOARD
## Manna Shop Eco-Family (`https://shop.mannazentrum.com/admin/shop`)

Dokumen ini diperuntukkan bagi pemilik toko (*Owner*), karyawan operasional, customer service, manajer toko, editor konten, dan tim keuangan untuk mengelola konten halaman website dan operasional harian toko online Manna Shop.

---

### 1. Cara Mengakses Admin Dashboard
- **URL Akses:**
  - `https://shop.mannazentrum.com/admin/shop`
  - Atau `https://shop.mannazentrum.com/admin`
  - *(Pada lingkungan lokal: `http://localhost:5173/admin?view=shop`)*
  - Atau klik tombol **"⚙️ Admin Toko"** pada bar pengumuman paling atas di toko online.
- **Struktur Peran (Role-Based Access Control / RBAC):**
  1. **Owner / Super Admin:** Akses penuh ke seluruh modul, pengeditan seluruh halaman website, pengaturan diskon, dan ekspor data keuangan.
  2. **Store Manager:** Mengelola stok produk, harga, dan alur pemrosesan pesanan.
  3. **Content Editor:** Menambah dan menyunting artikel edukasi/blog, halaman website, spanduk promosi, dan FAQ.
  4. **Customer Service (CS):** Memantau pesanan masuk, melayani konfirmasi pelanggan, dan memperbarui status resi kirim.
  5. **Finance:** Memverifikasi status pembayaran (QRIS / Transfer Bank) dan mengunduh laporan keuangan.

---

### 2. Modul 1: Kelola Halaman Website (Visual Page CMS)
Modul ini memungkinkan Anda merubah konten halaman website toko secara langsung tanpa perlu menyentuh kode pemrograman:

1. Klik menu **"1. Kelola Halaman Web"** di sidebar admin.
2. Pilih sub-tab halaman yang ingin Anda ubah:
   - **🏠 Beranda (Home):**
     - *Badge Atas*: Ubah teks penanda kecil (e.g. `ECO-LIVING & FAMILY ESSENTIALS`).
     - *Judul Utama (H1)*: Ubah tajuk besar toko online di halaman depan.
     - *Deskripsi Hero*: Ubah kalimat penjelasan mengenai kurasi produk dan jangkauan kirim.
     - *Tombol CTA*: Ubah teks dan tautan tombol utama.
     - *Spanduk Promo*: Ubah judul promo, kode kupon (e.g. `ASEANFAM`), dan besaran diskon %.
     - *4 Pilar Kualitas*: Ubah judul dan keterangan 4 nilai keunggulan toko.
   - **ℹ️ Tentang Kami (`/about-us`):**
     - Ubah judul, subjudul, cerita asal-usul toko, dan paragraf komitmen petani lokal.
   - **📞 Kontak & CS (`/contact`):**
     - Ubah nomor WhatsApp resmi penerima pesanan/chat.
     - Ubah format tampilan nomor di layar.
     - Ubah email resmi, jam operasional, dan alamat gudang pengiriman.
   - **🚚 Kebijakan Pengiriman (`/shipping-policy`):**
     - Ubah batas jam pemrosesan pesanan (*cut-off time*).
     - Ubah standar pengemasan vakum makanan dan dokumen karantina bibit tanaman.
   - **🔄 Kebijakan Retur & Garansi (`/return-policy`):**
     - Ubah jumlah hari garansi kecambah benih (e.g. 14 hari).
     - Ubah garansi tukar ukuran pakaian anak/dewasa.
   - **⚙️ Pengaturan Global & Running Text:**
     - Ubah teks pengumuman berjalan (*announcement bar*) paling atas yang tampil di seluruh halaman website.
     - Ubah nama toko dan slogan/tagline.
3. Klik tombol **"💾 Simpan Perubahan Halaman"** di bagian bawah formulir. Perubahan akan langsung aktif seketika di website toko!
4. Klik tombol **"Lihat Halaman Ini Live →"** di pojok kanan atas untuk mengecek hasilnya langsung.

---

### 3. Modul 2: Mengelola Katalog Produk & Stok
1. Buka Tab **3. Katalog Produk & Stok**.
2. **Menambah Produk Baru:**
   - Klik tombol **+ Tambah Produk** di pojok kanan atas.
   - Masukkan nama produk, kategori, harga (IDR), stok gudang, tautan foto produk, dan deskripsi.
   - Klik **Tambah ke Toko**. Produk baru akan langsung tayang di katalog dan halaman kategori.
3. **Menyunting Produk:**
   - Klik ikon **Edit (Pensil)** pada baris produk yang ingin diubah.
   - Ubah harga atau tambah persediaan stok gudang, lalu klik **Simpan Perubahan**.
4. **Menghapus Produk:**
   - Klik ikon **Hapus (Tempat Sampah)** untuk mencabut produk dari etalase.

---

### 4. Modul 3: Mengelola Pesanan Masuk (Orders & Resi)
1. Buka Tab **4. Pesanan & Resi Kirim**.
2. **Mengubah Status Pesanan:**
   - Pilih status pada dropdown: `Menunggu Pembayaran`, `Diproses`, `Sedang Dikirim`, `Selesai`, atau `Dibatalkan`.
3. **Memasukkan Nomor Resi Kurir (AWB):**
   - Ketik nomor resi kurir (misal: `JNE-CGK-1092819` atau `EMS-MY-99120412ID`) pada kolom No. Resi.
   - Klik di luar kotak input; sistem akan menyimpan resi secara otomatis.
4. **Ekspor Rekap Pesanan:**
   - Klik tombol **Ekspor CSV** untuk mengunduh berkas laporan dalam format Excel/Spreadsheet.

---

### 5. Modul 4: Artikel Edukasi & Blog
1. Buka Tab **5. Artikel Edukasi & Blog**.
2. Klik **+ Tambah Artikel** untuk mempublikasikan artikel panduan baru (judul, kategori, foto sampul, ringkasan, dan isi lengkap).
3. Artikel yang diterbitkan akan langsung terindeks di halaman `/blog` untuk mendukung SEO dan pencarian AI (Google, ChatGPT, Perplexity).

---

### 6. Fitur Pengembalian ke Standar Awal (Reset)
Jika Anda ingin membatalkan semua perubahan teks yang pernah dilakukan dan mengembalikan seluruh tampilan ke konten awal pabrikan, klik tombol **"Reset ke Teks Awal"** di bagian bawah sidebar admin.
