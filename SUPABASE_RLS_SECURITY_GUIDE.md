# Panduan Keamanan Data Anak & Konfigurasi Supabase RLS (Mannazentrum)

Dokumen ini memandu implementasi keamanan ketat untuk basis data **Supabase** pada sistem pelaporan siswa (**`laporan.mannazentrum.com`**) dan transisinya dengan website utama (**`www.mannazentrum.com`**).

---

## 1. Arsitektur Pemisahan Sistem (Publik vs Privat)

* **Website Utama (`www.mannazentrum.com`)**:
  * Bersifat publik (Company Profile, Informasi Program, Formulir Survei/Kontak).
  * Tautan akses langsung ke portal siswa ditempatkan di:
    * **Pojok kanan atas Navbar Desktop** (`Portal Laporan`)
    * **Header Mobile & Menu Drawer** (`Portal Siswa & Wali Murid`)
    * **Footer Halaman** (`Portal Laporan Siswa (Login)`)
    * **Rute Aliases**: `/laporan`, `/portal`, `/login` dialihkan secara otomatis ke `https://laporan.mannazentrum.com`.
* **Portal Siswa (`laporan.mannazentrum.com`)**:
  * Bersifat privat dan terotentikasi penuh.
  * Menggunakan **Supabase Auth** untuk orang tua dan guru.
  * Dilindungi **Row Level Security (RLS)** ketat agar tidak ada kebocoran data anak antar-wali murid maupun ke publik.

---

## 2. Implementasi Kebijakan Supabase RLS (Row Level Security)

File migrasi SQL telah disiapkan di:
`supabase/migrations/20261028_rls_security_child_data.sql`

### Prinsip Utama Keamanan:
1. **Zero Access untuk Pengunjung Publik (`anon`)**:
   Kunci anonim (`anon key`) yang ada di browser publik tidak memiliki hak `SELECT`, `INSERT`, `UPDATE`, atau `DELETE` pada tabel siswa, laporan harian, jadwal, dan absensi.
2. **Isolasi Antar-Orang Tua (Anti-IDOR / Anti-Leaking)**:
   Orang tua yang login hanya dapat melihat data anak yang memiliki relasi resmi di tabel `parent_student_mappings` (`parent_user_id = auth.uid()`). Orang tua **A** sama sekali tidak bisa membaca data anak milik orang tua **B**.
3. **Pemisahan Peran Guru & Staf (RBAC)**:
   Hanya staf/pendidik yang terdaftar di `staff_profiles` yang berhak membuat dan memperbarui laporan harian atau absensi siswa.

---

## 3. Cara Menerapkan File SQL ke Supabase

1. Buka dashboard proyek Supabase Anda di [https://supabase.com/dashboard](https://supabase.com/dashboard).
2. Pilih proyek basis data `laporan.mannazentrum.com`.
3. Di panel menu kiri, klik menu **SQL Editor**.
4. Klik **New query**, lalu salin (copy) seluruh isi file:
   `supabase/migrations/20261028_rls_security_child_data.sql`
5. Tempel (paste) ke editor SQL, lalu klik tombol **Run** (Ctrl + Enter).
6. Pastikan muncul notifikasi **"Success. No rows returned"**.

---

## 4. Cara Menguji Keamanan (Security Verification Checklist)

### Tes 1: Uji Akses Publik Tanpa Login (Harus Gagal / Ditolak)
Jalankan perintah berikut di terminal menggunakan `curl` dengan `anon key`:
```bash
curl -X GET 'https://<PROJECT-REF>.supabase.co/rest/v1/students' \
  -H "apikey: <ANON_KEY>" \
  -H "Authorization: Bearer <ANON_KEY>"
```
* **Hasil yang Benar**: Harus menghasilkan respons kosong `[]` atau kode error `401 Unauthorized` / `403 Forbidden`. Tidak boleh ada satu pun data murid yang bocor.

### Tes 2: Uji Akses Laporan Harian Publik
```bash
curl -X GET 'https://<PROJECT-REF>.supabase.co/rest/v1/daily_reports' \
  -H "apikey: <ANON_KEY>" \
  -H "Authorization: Bearer <ANON_KEY>"
```
* **Hasil yang Benar**: Respons kosong `[]`.

---

## 5. Keamanan Penyimpanan Foto Anak (Supabase Storage)

1. Buka menu **Storage** di Supabase Dashboard.
2. Pastikan bucket penyimpanan foto anak (misalnya `child-photos` atau `activity-reports`) diatur sebagai **Private Bucket** (toggle `Public bucket` posisi **OFF**).
3. Buat Storage RLS Policy agar URL foto hanya dapat diunduh melalui Signed URL berdurasi terbatas (misal: 1 jam) yang di-generate oleh akun orang tua terverifikasi.
