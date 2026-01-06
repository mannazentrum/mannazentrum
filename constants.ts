
import { Child, DailyReport } from './types';

export const COLORS = {
  brown: '#42210b',
  yellow: '#f3b524',
  cream: '#f7f3e3',
};

// Data anak yang lebih lengkap sesuai permintaan database
export const MOCK_CHILDREN: Child[] = [
  {
    id: '1',
    fullName: 'Budi Santoso',
    nickname: 'Budi',
    birthDate: '2021-01-15',
    birthPlace: 'Jakarta',
    gender: 'Laki-laki',
    photoUrl: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Budi',
    status: 'Hadir',
    guardianName: 'Ayah Budi',
    guardianPhone: '081234567890',
    medicalInfo: {
      allergies: 'Telur, Debu',
      therapy: 'Tidak ada',
      others: 'Suka tidur miring ke kanan'
    }
  },
  {
    id: '2',
    fullName: 'Siti Aminah',
    nickname: 'Siti',
    birthDate: '2021-05-10',
    birthPlace: 'Tangerang',
    gender: 'Perempuan',
    photoUrl: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Siti',
    status: 'Hadir',
    guardianName: 'Ibu Siti',
    guardianPhone: '081298765432',
    medicalInfo: {
      allergies: 'Dingin',
      therapy: 'Nebulizer jika sesak',
      others: 'Anak sangat aktif'
    }
  },
  {
    id: '3',
    fullName: 'Andi Wijaya',
    nickname: 'Andi',
    birthDate: '2020-11-20',
    birthPlace: 'Bekasi',
    gender: 'Laki-laki',
    photoUrl: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Andi',
    status: 'Sakit',
    guardianName: 'Ayah Andi',
    guardianPhone: '081311223344',
    medicalInfo: {
      allergies: 'Kacang-kacangan',
      therapy: 'Tidak ada',
      others: 'Mudah tantrum jika lapar'
    }
  }
];

export const MOCK_REPORTS: Record<string, DailyReport> = {
  '1': {
    childId: '1',
    date: '2024-05-20',
    checkIn: '07:30',
    temp: '36.5',
    activities: []
  }
};
