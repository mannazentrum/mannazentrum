/**
 * On-Demand Firebase Form Submission Service
 * Loads Firebase libraries dynamically only when the user submits a form.
 * This saves ~600kB+ from the initial critical bundle.
 */

interface FormSubmissionData {
  [key: string]: any;
  source: string;
}

const getFirebaseConfig = () => {
  const env = (import.meta as any).env || {};
  return {
    apiKey: env.VITE_FIREBASE_API_KEY,
    authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: env.VITE_FIREBASE_APP_ID
  };
};

export const submitContactForm = async (data: FormSubmissionData) => {
  // Dynamically import Firebase libraries only when needed
  const [{ initializeApp, getApps, getApp }, { getFirestore, collection, addDoc }] = await Promise.all([
    import('firebase/app'),
    import('firebase/firestore')
  ]);

  const firebaseConfig = getFirebaseConfig();
  const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const docRef = await addDoc(collection(db, "formSubmissions"), {
    ...data,
    submittedAt: new Date()
  });

  return docRef.id;
};
