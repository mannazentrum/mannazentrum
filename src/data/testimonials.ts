export interface Testimonial {
  id: string;
  name: string;
  initials: string;
  avatarBg: string;
  avatarTextColor?: string;
  isLocalGuide?: boolean;
  roleInfo: string;
  source: string;
  rating: number;
  text: string;
  screenshot: {
    src: string;
    name: string;
    code: string;
  };
}

export const testimonialsData: Testimonial[] = [
  {
    id: 'yessy-leie',
    name: 'yessy leie',
    initials: 'y',
    avatarBg: 'bg-[#e91e63]',
    avatarTextColor: 'text-white',
    roleInfo: '3 reviews \u2022 7 bulan lalu',
    source: 'Google Review',
    rating: 5,
    text: 'Miss dan mister di sana baik ,ramah dan telaten. Makanan dan snack yg di siapkan dari sana enak, anak2 suka dan lahap,untuk harga masih terjangkau, activity di sana seru2 utk belajar dan pengalaman anak. Utk kualitas daycare di sana tidak di ragukan lagi TOP BGT lah. Semoga MannaZentrum tambah jaya \uD83E\uDD70\uD83D\uDC4D',
    screenshot: {
      src: '/images/reviews/review-yessy.png',
      name: 'yessy leie',
      code: 'beranda_review_yessy01'
    }
  },
  {
    id: 'william-pieter',
    name: 'William Pieter',
    initials: 'WP',
    avatarBg: 'bg-slate-900',
    avatarTextColor: 'text-amber-400',
    isLocalGuide: true,
    roleInfo: 'Local Guide \u2022 26 reviews \u2022 5 bulan lalu',
    source: 'Google Review',
    rating: 5,
    text: 'Senang banget ketemu tempat penitipan anak seperti ini. Pengasuhnya ramah dan kelihatan benar-benar sayang sama anak-anak. Anak saya cepat akrab dan setiap pulang selalu kelihatan happy. Tempatnya juga bersih dan nyaman, jadi sebagai orang tua rasanya lebih tenang menitipkan anak di sini. Recommended banget \uD83D\uDE0A',
    screenshot: {
      src: '/images/reviews/review-william.png',
      name: 'William Pieter',
      code: 'beranda_review_william01'
    }
  },
  {
    id: 'hanna-fidyanti',
    name: 'Hanna Fidyanti',
    initials: 'HF',
    avatarBg: 'bg-emerald-700',
    avatarTextColor: 'text-white',
    roleInfo: '6 reviews \u2022 2 photos \u2022 6 bulan lalu',
    source: 'Google Review',
    rating: 5,
    text: 'Sudah hampir 2 tahun kami menitipkan anak kami di sini dari dia umur 3 bulan. Disini owner dan miss nya sangat baik dan telaten dalam menjaga dan merawat anak kami. Mereka juga sangat terbuka apabila kami memberikan saran atau pesan untuk anak kami. Disini tidak hanya penitipan, tapi anak kami juga di ajari sensori, agama dan banyak kegiatan lain sehingga dia bisa tumbuh dengan baik. Selain itu setiap bulan nya ada kegiatan outdoor seperti periksa ke dokter gigi, main ke playground. Selain itu disini juga ada live cctv dan laporan kegiatan setiap hari nya ketika anak kami akan kami jemput pulang. Ini sangat membantu kami sebagai orang tua untuk tetap bisa update dengan kegiatan si kecil. Sukses selalu MannaZentrum Daycare \uD83D\uDC4D\uD83D\uDC4D',
    screenshot: {
      src: '/images/reviews/review-hanna.png',
      name: 'Hanna Fidyanti',
      code: 'beranda_review_hanna01'
    }
  },
  {
    id: 'wirza-rahmania',
    name: 'wirza rahmania putri',
    initials: 'w',
    avatarBg: 'bg-[#455a64]',
    avatarTextColor: 'text-white',
    roleInfo: '6 reviews \u2022 1 tahun lalu',
    source: 'Google Review',
    rating: 5,
    text: 'sudah 1 tahun lebih Saya menitipkan anak di MZDaycare ini. Saya selalu rekomendasikan daycare ini karena disini anak tidak hanya dijaga, disuapin, dimandikan, tetapi juga diajarkan pendidikan agama, sosial, dan akademis sesuai usia. setiap hari ada kegiatan yang melatih kepandaian motorik, sensorik, writing, dan bahasa. Anak saya jadi terbiasa dengan schedule yang tertata rapih, bahkan ia meminta utk kegiatan di rumah kalo sedang libur weekend \uD83D\uDE04 Tak lupa ada juga posyandu dan pemeriksaan gigi rutin ke dokter gigi. Miss-miss disini selalu melaporkan hal detail apapun. Ada CCTV juga yg bisa diakses oleh kedua orangtua. Ada raport harian juga secara tertulis. Ownernya selalu evaluasi kekurangan daycare, terbukti dari hari ke hari selalu ada inovasi yang membuat pengelolaan daycare ini menjadi lebih baik. Pengasuhnya juga diberi pelatihan secara berkala. Terima Kasih Mannazentrum Daycare.',
    screenshot: {
      src: '/images/reviews/review-wirza.png',
      name: 'wirza rahmania putri',
      code: 'beranda_review_wirza01'
    }
  },
  {
    id: 'dessy-silaban',
    name: 'dessy silaban',
    initials: 'd',
    avatarBg: 'bg-[#c2185b]',
    avatarTextColor: 'text-white',
    roleInfo: '8 reviews \u2022 1 tahun lalu',
    source: 'Google Review',
    rating: 5,
    text: 'Daycare yang bagus dan nyaman untuk anak. Banyak stimulasi, kreativitas dan sensory play yang membuat anak saya happy dan perkembangannya semakin bagus sejak di daycare. Menu makanan jg bervariasi dan tentunya memperhatikan gizi dan kebersihannya. Guru-guru yang mendampingi juga sangat baik, ramah, ceria dan informatif',
    screenshot: {
      src: '/images/reviews/review-dessy.png',
      name: 'dessy silaban',
      code: 'beranda_review_dessy01'
    }
  },
  {
    id: 'retno-ayu',
    name: 'Retno Ayu Puspita',
    initials: 'RA',
    avatarBg: 'bg-[#6d4c41]',
    avatarTextColor: 'text-white',
    roleInfo: '9 reviews \u2022 6 photos \u2022 1 tahun lalu',
    source: 'Google Review',
    rating: 5,
    text: 'Setelah sekian lama pencarian daycare yg cocok dengan preferensi, akhirnya dipertemukan dengan Mannazentrum Daycare dgn miss Octa, penjelasan di awal sangat informatif sehingga yakin utk menitipkan si kecil di sini, terimakasih banyak Miss Octa dan tim Mannazentrum yg sudah membersamai Sofia, melatih Sofia berprogress utk bsa makan dengan baik, berinteraksi dan jga melatih sensorinya.. Saya selalu pantau di CCTV dan sangat sabar serta ceria semua missnya saat membersamai Sofia.. Sukses selalu utk Mannazentrum yaa.. Smoga ada kesempatan lgi bsa bergabung di Mannazentrum \uD83E\uDD70\uD83E\uDD70\uD83E\uDD70',
    screenshot: {
      src: '/images/reviews/review-retno.png',
      name: 'Retno Ayu Puspita',
      code: 'beranda_review_retno01'
    }
  },
  {
    id: 'rina-ocktaviani',
    name: 'Rina Ocktaviani Yudina',
    initials: 'RY',
    avatarBg: 'bg-[#00897b]',
    avatarTextColor: 'text-white',
    roleInfo: '7 reviews \u2022 1 photo \u2022 1 tahun lalu',
    source: 'Google Review',
    rating: 5,
    text: 'Daycare yang bagus \uD83D\uDC4D kegiatan sensori rutin, buat anak jadi tidak bosan dan menjadi semakin pintar. banyak perkembangan baik yang didapatkan anak saya. saat masa adaptasi di sebulan pertama, para miss/pengajar sangat sabar menghadapi anak saya dan menanggapi keluhan saya \uD83D\uDC4D terima kasih banyak untuk para miss, terima kasih banyak mannazentrum. sukses selalu untuk mannazentrum \uD83D\uDC4D',
    screenshot: {
      src: '/images/reviews/review-rina.png',
      name: 'Rina Ocktaviani Yudina',
      code: 'beranda_review_rina01'
    }
  },
  {
    id: 'maria-patricia',
    name: 'Maria Patricia',
    initials: 'M',
    avatarBg: 'bg-[#e65100]',
    avatarTextColor: 'text-white',
    roleInfo: '7 reviews \u2022 1 photo \u2022 2 tahun lalu',
    source: 'Google Review',
    rating: 5,
    text: 'Saya tipe orang pemilih sekali dan sulit percaya terkait penitipan anak. Berbulan-bulan mencari daycare yang pas tapi belum ketemu dan tidak mau coba2 krn takut anak jd korban coba2 \uD83D\uDE04 Finally ketemu Mannazentrum, Thank God sudah pimpin kami ke sini. Puji Tuhan anak2 tidak hanya sebatas dititip tapi juga ada kegiatan sensori, motorik, menggambar dan bahkan dibantu untuk buat PR menulis \uD83D\uDE04\uD83D\uDE04 Jadi waktu anak dijemput pulang kerja, tinggal main sama anak2. Miss2 nya sabar dan selalu update hal yg penting sampai terkait jatuh atau lainnya. Saya selalu tanya anak saya apakah happy, anak saya bahkan merindukan moment untuk kembali ke daycare saat libur',
    screenshot: {
      src: '/images/reviews/review-maria.png',
      name: 'Maria Patricia',
      code: 'beranda_review_maria01'
    }
  }
];
