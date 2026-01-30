
# MZdaycare - Comprehensive System Documentation
**Version:** 6.3.1-visual-production
**Standard Restore Point:** NeuesStartJanuari26
**Owner:** PT. Elrafa Terang Sejahtera

---

## 1. Cloud Infrastructure
Sistem telah bermigrasi sepenuhnya dari penyimpanan lokal ke **Firebase Cloud Infrastructure**.
- **Database**: Google Firestore (NoSQL) untuk sinkronisasi data real-time antar perangkat.
- **Media Storage**: Firebase Storage untuk menyimpan foto aktivitas, tanda tangan digital, dan dokumen PDF.
- **Real-time Sync**: Menggunakan listener `onSnapshot` sehingga perubahan data (seperti approval akun atau menu baru) muncul seketika tanpa refresh halaman.

## 2. Visual Synchronization (06Apha20 Update)
- **Staff Dashboard**: Layout manajemen user, pendaftaran, dan data murid telah diselaraskan 1:1 dengan referensi visual korporat. Menggunakan skema warna cokelat tua (#42210b) dan kuning aksen (#f3b524).
- **Parent Dashboard**: Tampilan mobile-first yang mengikuti desain laporan harian si kecil. Mencakup modul Nutrisi, Stimulasi, Kebersihan, dan Istirahat.
- **Digital Branding**: Logo dikembangkan dengan gaya watercolor/soft clouds yang elegan.

## 3. Business Control Center (CMS & Settings)
- **CMS Module**: Admin dapat mengubah konten website (hero, pengumuman, WA) secara terpusat di Firestore.
- **User Management**: 
  - Status pendaftaran (Approved/Not Yet) tersinkronisasi secara cloud.
  - Reset password dan penghapusan user kini berdampak langsung pada database pusat.

## 4. Technical Specs
- **React 18**: Core framework.
- **Firebase SDK**: Digunakan untuk koneksi Firestore dan Storage.
- **Gemini API**: Menenagai "Malika AI Advisor" dengan konteks perusahaan yang dinamis.

---
*Checkpoint Created: NeuesStartJanuari26 - Vercel deployment successful.*
*Checkpoint Created: 16JanJam15 - Stable Dependencies & Font Fix*
