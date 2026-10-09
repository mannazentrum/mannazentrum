import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Web app's Firebase configuration with safe Vite env lookup
const env = (typeof import.meta !== 'undefined' && (import.meta as any).env) || {};

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY || (typeof process !== 'undefined' ? process.env?.VITE_FIREBASE_API_KEY : undefined),
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || (typeof process !== 'undefined' ? process.env?.VITE_FIREBASE_AUTH_DOMAIN : undefined),
  projectId: env.VITE_FIREBASE_PROJECT_ID || (typeof process !== 'undefined' ? process.env?.VITE_FIREBASE_PROJECT_ID : undefined),
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || (typeof process !== 'undefined' ? process.env?.VITE_FIREBASE_STORAGE_BUCKET : undefined),
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || (typeof process !== 'undefined' ? process.env?.VITE_FIREBASE_MESSAGING_SENDER_ID : undefined),
  appId: env.VITE_FIREBASE_APP_ID || (typeof process !== 'undefined' ? process.env?.VITE_FIREBASE_APP_ID : undefined)
};

// Initialize Firebase with singleton pattern
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage };
