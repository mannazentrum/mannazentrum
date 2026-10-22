export interface Article {
  id: string;
  slug: string;
  title: string;
  category: 'Tips Parenting' | 'Tumbuh Kembang' | 'Aktivitas Anak' | 'Berita Kegiatan';
  summary: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  imageUrl: string;
}

export const newsArticles: Article[] = [
  {
    id: '1',
    slug: 'mengatasi-toddler-tantrum-dengan-empati',
    title: '5 Cara Menghadapi Toddler Tantrum dengan Tenang dan Penuh Empati',
    category: 'Tips Parenting',
    summary: 'Tantrum adalah bagian wajar dari perkembangan emosi balita. Pelajari bagaimana pendidik Mannazentrum merespon emosi anak tanpa amarah.',
    content: `Fase tantrum pada anak usia 1-4 tahun kerap menjadi tantangan terbesar bagi orang tua. Pada usia ini, kemampuan bahasa anak belum seimbang dengan intensitas emosi yang mereka rasakan. 

Berikut adalah 5 pendekatan berbasis pengasuhan positif yang diterapkan di Mannazentrum:

1. **Jaga Ketenangan Orang Tua Terlebih Dahulu**: Anak merefleksikan regulasi emosi orang dewasa di sekitarnya. Tarik napas dalam sebelum merespon.
2. **Validasi Perasaan Anak**: Katakan, "Bunda paham kamu sedang sedih karena mainannya harus disimpan." Validasi bukan berarti menyetujui perilaku merusak, melainkan mengakui emosinya.
3. **Ciptakan Ruang Tenang (Calm Corner)**: Hindari hukuman fisik atau mengurung anak. Sediakan ruang aman di mana anak bisa duduk bersama bantal lembut atau boneka favoritnya.
4. **Beri Pilihan Terbatas**: Memberi kontrol sederhana seperti, "Mau pakai sepatu biru atau merah?" dapat mengurangi rasa frustrasi anak.
5. **Apresiasi Saat Anak Berhasil Tenang**: Ketika badai emosi reda, peluk si kecil dan puji usahanya dalam menenangkan diri.`,
    author: 'Tim Konselor Mannazentrum',
    date: '20 Oktober 2026',
    readTime: '4 menit baca',
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '2',
    slug: 'pentingnya-sensory-play-anak-usia-dini',
    title: 'Mengapa Stimulasi Sensory Play Sangat Krusial untuk Otak Balita?',
    category: 'Tumbuh Kembang',
    summary: 'Bermain pasir, air, dan tekstur bukan sekadar mengotori tangan, melainkan membangun jutaan koneksi saraf otak si kecil.',
    content: `Di Mannazentrum dan kelas kreatif Malika Maliaki, stimulasi sensori menjadi pilar utama harian. Saat anak menyentuh berbagai tekstur seperti pasir kinetik, adonan playdough berbahan alami, air, atau biji-bijian, lima inderanya bekerja secara serempak.

Manfaat utama sensory play:
- **Pengembangan Bahasa**: Anak belajar kosakata baru seperti 'kasar', 'licin', 'hangat', 'lengket'.
- **Keterampilan Motorik Halus**: Meremas, mencubit, dan menuang melatih otot tangan yang kelak krusial untuk memegang pensil.
- **Regulasi Diri (Calming Effect)**: Banyak anak yang kembali tenang dan fokus setelah 15 menit bermain tekstur basah atau berpasir.`,
    author: 'Divisi Kurikulum Malika Maliaki',
    date: '15 Oktober 2026',
    readTime: '3 menit baca',
    imageUrl: 'https://images.unsplash.com/photo-1596464716127-f2a829822391?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '3',
    slug: 'tips-menyiapkan-anak-pertama-kali-daycare',
    title: 'Tips Mempersiapkan Buah Hati Menghadapi Hari Pertama di Daycare',
    category: 'Tips Parenting',
    summary: 'Kecemasan perpisahan (separation anxiety) adalah hal alami. Simak tips praktis agar masa transisi anak ke daycare berjalan mulus.',
    content: `Memasuki lingkungan baru merupakan tonggak besar bagi anak maupun orang tua yang bekerja. Berikut langkah persiapan efektif:

1. **Lakukan Kunjungan Survei Bersama**: Ajak anak mengunjungi fasilitas Mannazentrum sebelum hari pertama agar ia akrab dengan wajah guru dan suasana ruangan.
2. **Ceritakan Kisah Positif**: Bacakan buku bertema sekolah atau daycare, ceritakan betapa menyenangkannya bermain balok dan bernyanyi bersama teman-teman.
3. **Bangun Rutinitas Bangun Pagi**: Selaraskan jam tidur dan bangun setidaknya 1 minggu sebelum jadwal masuk.
4. **Ritual Pamitan yang Konsisten & Singkat**: Selalu pamit dengan senyum dan kata-kata jelas ("Bunda berangkat kerja dulu, sore nanti Bunda jemput ya!"). Jangan menyelinap pergi secara diam-diam.`,
    author: 'Kepala Pengasuh Mannazentrum',
    date: '10 Oktober 2026',
    readTime: '5 menit baca',
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '4',
    slug: 'kegiatan-cooking-class-mini-chef-mannazentrum',
    title: 'Keseruan Cooking Class Mini Chef: Mengenalkan Sayur dan Buah pada Balita',
    category: 'Berita Kegiatan',
    summary: 'Dokumentasi kegiatan mingguan anak-anak Mannazentrum membuat salad buah dan mini sandwich sehat dengan penuh antusias.',
    content: `Pekan lalu, ruang bermain Mannazentrum berubah menjadi dapur cilik yang ceria! Anak-anak mengenakan celemek mini dan topi koki dalam kegiatan 'Mini Chef Day'.

Anak-anak diajak:
- Mengenal aneka buah lokal: melon manis, buah naga ungu, dan pisang segar.
- Melatih koordinasi mata dan tangan dengan memotong buah lunak menggunakan pisau tumpul khusus anak.
- Belajar berbagi dan menyajikan makanan kepada teman sebangku.

Hasilnya? Anak-anak yang tadinya enggan menyentuh buah di rumah, dengan lahap menghabiskan kreasi salad mereka sendiri!`,
    author: 'Humas Mannazentrum',
    date: '05 Oktober 2026',
    readTime: '3 menit baca',
    imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '5',
    slug: 'nutrisi-seimbang-daycare-mannazentrum',
    title: 'Standar Gizi & Menu Higienis di Mannazentrum Daycare Cisauk',
    category: 'Tumbuh Kembang',
    summary: 'Bagaimana menu harian disusun bersama ahli gizi untuk mendukung berat badan ideal, imunitas, dan kecerdasan anak usia emas.',
    content: `Kami percaya bahwa asupan makanan sehat adalah fondasi pertumbuhan fisik dan kecerdasan otak balita. Di Mannazentrum:

- **Bebas Pengawet & MSG Sintetis**: Seluruh makanan dimasak segar setiap hari menggunakan kaldu alami dan bumbu segar.
- **Komposisi 4 Bintang**: Setiap piring makan mengandung karbohidrat kompleks, protein hewani berkualitas (ikan, telur, ayam kampung), protein nabati, dan serat sayuran warna-warni.
- **Snack Sehat Pagi & Sore**: Jus buah murni tanpa gula tambahan, puding susu almond, dan kudapan tradisional kaya zat besi.`,
    author: 'Tim Nutrisi & Kesehatan Anak',
    date: '28 September 2026',
    readTime: '4 menit baca',
    imageUrl: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80',
  },
];
