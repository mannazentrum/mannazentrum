
export enum UserRole {
  PARENT = 'PARENT',
  TEACHER = 'TEACHER',
  COORDINATOR = 'COORDINATOR',
  ADMIN = 'ADMIN'
}

export type Gender = 'Laki-laki' | 'Perempuan';

export interface WebsiteContent {
  heroTitle: string;
  heroSubtitle: string;
  announcementActive: boolean;
  announcementText: string;
  whatsappNumber: string;
  tagline: string;
}

export interface AuditEntry {
  id: string;
  action: string;
  user: string;
  timestamp: number;
}

export interface Guardian {
  nama: string;
  nik: string;
  ttl: string;
  pekerjaan: string;
  hp: string;
  email: string;
  alamat: string;
}

export interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  time: string;
  timestamp: number;
  caption?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  minThreshold: number;
  category: string;
  unit: string;
}

export interface MonthlyLog {
  stockAwal: number;
  stockMasuk: number;
  stockKeluar: number;
  expiryDate?: string; // YYYY-MM-DD
}

export interface InventoryNotification {
  id: string;
  type: 'LOW_STOCK' | 'EXPIRY';
  message: string;
  timestamp: number;
}

export interface RegistrationEntry {
  id: string;
  type: 'Orang Tua' | 'Guru' | 'Coordinator';
  status: 'Approved' | 'Not Yet';
  date: string;
  username: string;
  email: string;
  phone: string;
  password?: string;
  signatureAyah?: string; // Base64 signature
  signatureBunda?: string; // Base64 signature
  childData?: {
    fullName: string;
    nickname: string;
    gender: Gender;
    nik: string;
    ttl: string;
    agama: string;
    alamat: string;
    kesehatan: {
      penyakit: string;
      alergi: string;
      kesukaan: string;
      kebiasaan: string;
    };
  };
  ayah?: Guardian;
  bunda?: Guardian;
  personalData: {
    nama: string;
    nik: string;
    ttl: string;
    pekerjaan?: string;
    alamat: string;
  };
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

export interface Child {
  id: string;
  fullName: string;
  nickname: string;
  birthDate: string;
  birthPlace?: string;
  gender: Gender;
  photoUrl: string;
  status: 'Hadir' | 'Sakit' | 'Belum Datang';
  guardianName?: string;
  guardianPhone?: string;
  medicalInfo?: {
    allergies: string;
    therapy: string;
    others: string;
  };
}

export interface Activity {
  type: 'makan' | 'tidur' | 'mandi' | 'eliminasi' | 'stok';
  time: string;
  description: string;
  status?: string;
}

export interface DailyReport {
  childId: string;
  date: string;
  checkIn: string;
  checkOut?: string;
  temp: string;
  activities: Activity[];
}
