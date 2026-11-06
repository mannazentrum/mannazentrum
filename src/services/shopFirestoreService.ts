/**
 * Firebase Firestore Cloud Service for Mannazentrum Shop Products
 * Provides real-time and on-demand cloud sync so products added in the Admin Panel
 * are visible to all customers across any browser or device.
 */
import { ShopProduct } from '../data/shopData';

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

const getDb = async () => {
  const [{ initializeApp, getApps, getApp }, { getFirestore }] = await Promise.all([
    import('firebase/app'),
    import('firebase/firestore')
  ]);

  const firebaseConfig = getFirebaseConfig();
  const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  return getFirestore(app);
};

export const fetchProductsFromCloud = async (): Promise<ShopProduct[]> => {
  try {
    const db = await getDb();
    const { collection, getDocs } = await import('firebase/firestore');
    const querySnapshot = await getDocs(collection(db, 'shop_products'));
    const products: ShopProduct[] = [];
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data() as ShopProduct;
      if (data && data.id && !data.id.startsWith('app-') && !data.id.startsWith('food-') && !data.id.startsWith('plant-') && !data.id.startsWith('daily-') && !data.id.startsWith('bun-')) {
        products.push(data);
      }
    });
    return products;
  } catch (error) {
    console.warn('Firestore products fetch skipped or offline, using local data:', error);
    return [];
  }
};

export const saveProductToCloud = async (product: ShopProduct): Promise<boolean> => {
  try {
    const db = await getDb();
    const { doc, setDoc } = await import('firebase/firestore');
    await setDoc(doc(db, 'shop_products', product.id), {
      ...product,
      updatedAt: new Date().toISOString()
    });
    return true;
  } catch (error) {
    console.warn('Firestore product save skipped or offline:', error);
    return false;
  }
};

export const deleteProductFromCloud = async (productId: string): Promise<boolean> => {
  try {
    const db = await getDb();
    const { doc, deleteDoc } = await import('firebase/firestore');
    await deleteDoc(doc(db, 'shop_products', productId));
    return true;
  } catch (error) {
    console.warn('Firestore product delete skipped or offline:', error);
    return false;
  }
};
