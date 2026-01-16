
export enum UserRole {
  ADMIN = 'admin',
  TEACHER = 'guru',
  PARENT = 'orangtua',
  COORDINATOR = 'coordinator',
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
}

export interface RegistrationEntry {
  id: string;
  username: string;
  password?: string;
  type: 'Orang Tua' | 'Guru' | 'Coordinator';
  status: 'Pending' | 'Approved' | 'Rejected';
  personalData: any; 
  entryDate: string;
}

export interface WebsiteContent {
  heroTitle: string;
  heroSubtitle: string;
  announcementActive: boolean;
  announcementText: string;
  whatsappNumber: string;
  tagline: string;
}

export interface ParentRegistrationData {
  childName: string;
  childNickname: string;
  childGender: string;
  childNik: string;
  childBirthPlace: string;
  childReligion: string;
  childAddress: string;
  parentName: string;
  parentNik: string;
  parentBirthPlace: string;
  parentJob: string;
  parentPhone: string;
  parentEmail: string;
  parentAddress: string;
  healthHistory: string;
  allergies: string;
  favoriteFoodAndToy: string;
  sleepAndTantrumHabits: string;
  fatherSignature: string;
  motherSignature: string;
}
