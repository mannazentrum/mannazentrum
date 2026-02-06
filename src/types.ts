
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

export interface WebsiteContent {
  heroTitle: string;
  heroSubtitle: string;
  announcementActive: boolean;
  announcementText: string;
  whatsappNumber: string;
  tagline: string;
}
