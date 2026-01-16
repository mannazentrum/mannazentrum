
export type UserRole = 'admin' | 'guru' | 'orangtua';

export interface User {
  id: string;
  email: string;
  role: UserRole;
}

export interface RegistrationEntry {
  id: string;
  childName: string;
  parentName: string;
  entryDate: string;
}

export interface WebsiteContent {
  id: string;
  // Define other properties of WebsiteContent here
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
