import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  ShopProduct, 
  CurrencyKey, 
  DISCOUNT_COUPONS 
} from '../data/shopData';
import { CartItem } from '../components/shop/ShopCartDrawer';

const CART_STORAGE_KEY = 'manna_shop_cart_items_v2';
const CURRENCY_STORAGE_KEY = 'manna_shop_currency_pref';
const LANG_STORAGE_KEY = 'manna_shop_lang_pref';

interface ShopContextType {
  cart: CartItem[];
  totalCartCount: number;
  currency: CurrencyKey;
  setCurrency: (c: CurrencyKey) => void;
  language: 'id' | 'en';
  setLanguage: (l: 'id' | 'en') => void;
  addToCart: (product: ShopProduct, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  directCheckout: (product: ShopProduct, quantity?: number) => void;
  cartDrawerOpen: boolean;
  setCartDrawerOpen: (open: boolean) => void;
  checkoutModalOpen: boolean;
  setCheckoutModalOpen: (open: boolean) => void;
  shippingInfoModalOpen: boolean;
  setShippingInfoModalOpen: (open: boolean) => void;
  selectedProduct: ShopProduct | null;
  setSelectedProduct: (product: ShopProduct | null) => void;
  couponCode: string;
  discountPercent: number;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<CurrencyKey>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(CURRENCY_STORAGE_KEY);
      if (saved && (saved === 'IDR' || saved === 'SGD' || saved === 'MYR' || saved === 'USD')) {
        return saved as CurrencyKey;
      }
    }
    return 'IDR';
  });

  const [language, setLanguageState] = useState<'id' | 'en'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(LANG_STORAGE_KEY);
      if (saved === 'id' || saved === 'en') return saved;
    }
    return 'id';
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(CART_STORAGE_KEY);
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  });

  const [couponCode, setCouponCode] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);

  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [shippingInfoModalOpen, setShippingInfoModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ShopProduct | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  const setCurrency = (c: CurrencyKey) => {
    setCurrencyState(c);
    localStorage.setItem(CURRENCY_STORAGE_KEY, c);
  };

  const setLanguage = (l: 'id' | 'en') => {
    setLanguageState(l);
    localStorage.setItem(LANG_STORAGE_KEY, l);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const addToCart = (product: ShopProduct, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.findIndex((item) => item.product.id === product.id);
      if (existing > -1) {
        const updated = [...prev];
        updated[existing].quantity = Math.min(product.stock, updated[existing].quantity + quantity);
        return updated;
      }
      return [...prev, { product, quantity }];
    });

    showToast(
      language === 'id'
        ? `✓ ${quantity}x "${product.name}" ditambahkan ke keranjang`
        : `✓ ${quantity}x "${product.nameEn}" added to cart`
    );
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
    setCouponCode('');
    setDiscountPercent(0);
  };

  const directCheckout = (product: ShopProduct, quantity: number = 1) => {
    addToCart(product, quantity);
    setCheckoutModalOpen(true);
  };

  const applyCoupon = (code: string): boolean => {
    const coupon = DISCOUNT_COUPONS[code];
    if (!coupon) return false;

    const subtotal = cart.reduce((sum, item) => sum + (item.product.priceIdr * item.quantity), 0);
    if (subtotal < coupon.minOrder) return false;

    setCouponCode(code);
    setDiscountPercent(coupon.percent);
    showToast(`Kupon ${code} diterapkan! Hemat ${coupon.percent}%`);
    return true;
  };

  const removeCoupon = () => {
    setCouponCode('');
    setDiscountPercent(0);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <ShopContext.Provider
      value={{
        cart,
        totalCartCount,
        currency,
        setCurrency,
        language,
        setLanguage,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        directCheckout,
        cartDrawerOpen,
        setCartDrawerOpen,
        checkoutModalOpen,
        setCheckoutModalOpen,
        shippingInfoModalOpen,
        setShippingInfoModalOpen,
        selectedProduct,
        setSelectedProduct,
        couponCode,
        discountPercent,
        applyCoupon,
        removeCoupon,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
