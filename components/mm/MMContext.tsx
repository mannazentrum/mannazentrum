
import React, { createContext, useContext, useState, useEffect } from 'react';

// --- Types ---
export interface MMProduct {
  id: string;
  name: string;
  category: 'Pakaian' | 'Mainan' | 'Buku' | 'Perlengkapan';
  price: number;
  image: string;
  isNew?: boolean;
}

export interface MMCourse {
  id: string;
  title: string;
  category: 'Anak' | 'Dewasa' | 'Parenting';
  description: string;
  price: number;
  image: string;
  features: string[];
}

export interface MMCartItem {
  id: string;
  itemId: string;
  name: string;
  price: number;
  type: 'product' | 'course';
  quantity: number;
}

export interface MMUser {
  username: string;
  name: string;
  role: 'admin' | 'customer';
}

interface MMContextType {
  user: MMUser | null;
  login: (u: string, p: string) => boolean;
  logout: () => void;
  products: MMProduct[];
  addProduct: (p: MMProduct) => void;
  deleteProduct: (id: string) => void;
  courses: MMCourse[];
  addCourse: (c: MMCourse) => void;
  deleteCourse: (id: string) => void;
  cart: MMCartItem[];
  addToCart: (item: MMProduct | MMCourse, type: 'product' | 'course') => void;
  removeFromCart: (id: string) => void;
  cartTotal: number;
}

// --- Mock Data ---
const INITIAL_PRODUCTS: MMProduct[] = [
  { id: 'p1', name: 'Sabun & Pembersih Alami', category: 'Perlengkapan', price: 95000, image: 'https://images.unsplash.com/photo-1603569283847-aa295f0d016a?auto=format&fit=crop&q=80&w=400', isNew: true },
  { id: 'p2', name: 'Balok Kayu Edukasi Alami', category: 'Mainan', price: 250000, image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=400' },
  { id: 'p3', name: 'Gaun Wanita Anggun', category: 'Pakaian', price: 320000, image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80&w=400' },
  { id: 'p4', name: 'Paket Berkebun Keluarga', category: 'Perlengkapan', price: 120000, image: 'https://images.unsplash.com/photo-1416872928419-eb4295bd92be?auto=format&fit=crop&q=80&w=400', isNew: true },
];

const INITIAL_COURSES: MMCourse[] = [
  { 
    id: 'c1', 
    title: 'Akademi Balita Fitrah', 
    category: 'Anak', 
    description: 'Stimulasi tumbuh kembang anak usia 3-6 tahun berbasis alam.', 
    price: 350000, 
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=400',
    features: ['Motorik Kasar', 'Pengenalan Alam', 'Adab Sehari-hari']
  },
  { 
    id: 'c2', 
    title: 'School of Great Father', 
    category: 'Parenting', 
    description: 'Kelas khusus Ayah untuk menjadi pemimpin visioner.', 
    price: 500000, 
    image: 'https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?auto=format&fit=crop&q=80&w=400',
    features: ['Visi Misi Keluarga', 'Bonding Ayah Anak', 'Manajemen Emosi']
  },
  { 
    id: 'c3', 
    title: 'Bengkel Hati Ibu', 
    category: 'Dewasa', 
    description: 'Menata hati dan manajemen rumah tangga yang efektif.', 
    price: 450000, 
    image: 'https://images.unsplash.com/photo-1531123414780-f74242c2b052?auto=format&fit=crop&q=80&w=400',
    features: ['Self Healing', 'Manajemen Waktu', 'Resep Sehat']
  },
];

const MMContext = createContext<MMContextType | undefined>(undefined);

export const MMProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<MMUser | null>(null);
  const [products, setProducts] = useState<MMProduct[]>(INITIAL_PRODUCTS);
  const [courses, setCourses] = useState<MMCourse[]>(INITIAL_COURSES);
  const [cart, setCart] = useState<MMCartItem[]>([]);

  // Simulate local storage persistence (simplified)
  useEffect(() => {
    // In a real app, load from localStorage here
  }, []);

  const login = (u: string, p: string) => {
    if (u === 'admin' && p === 'admin123') {
      setUser({ username: 'admin', name: 'Administrator', role: 'admin' });
      return true;
    }
    if (u === 'bunda' && p === 'bunda123') {
      setUser({ username: 'bunda', name: 'Bunda Cerdas', role: 'customer' });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setCart([]);
  };

  const addProduct = (p: MMProduct) => setProducts([...products, p]);
  const deleteProduct = (id: string) => setProducts(products.filter(p => p.id !== id));

  const addCourse = (c: MMCourse) => setCourses([...courses, c]);
  const deleteCourse = (id: string) => setCourses(courses.filter(c => c.id !== id));

  const addToCart = (item: MMProduct | MMCourse, type: 'product' | 'course') => {
    const existing = cart.find(c => c.itemId === item.id && c.type === type);
    if (existing) {
      setCart(cart.map(c => c.id === existing.id ? { ...c, quantity: c.quantity + 1 } : c));
    } else {
      const newItem: MMCartItem = {
        id: Date.now().toString(),
        itemId: item.id,
        name: 'name' in item ? item.name : item.title,
        price: item.price,
        type,
        quantity: 1
      };
      setCart([...cart, newItem]);
    }
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(c => c.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <MMContext.Provider value={{
      user, login, logout,
      products, addProduct, deleteProduct,
      courses, addCourse, deleteCourse,
      cart, addToCart, removeFromCart, cartTotal
    }}>
      {children}
    </MMContext.Provider>
  );
};

export const useMM = () => {
  const context = useContext(MMContext);
  if (!context) throw new Error('useMM must be used within MMProvider');
  return context;
};
