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
    apiKey: env.VITE_FIREBASE_API_KEY || 'AIzaSyBfFN6_qH1YCWFkETy31h3Rg8o_jHfmCQQ',
    authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || 'mannazentrum-connect.firebaseapp.com',
    projectId: env.VITE_FIREBASE_PROJECT_ID || 'mannazentrum-connect',
    storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || 'mannazentrum-connect.firebasestorage.app',
    messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || '810652390808',
    appId: env.VITE_FIREBASE_APP_ID || '1:810652390808:web:4a03e0cdb760961e9707ed'
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
