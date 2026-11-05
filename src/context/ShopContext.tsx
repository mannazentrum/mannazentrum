import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  ShopProduct, 
  CurrencyKey, 
  DISCOUNT_COUPONS,
  SHOP_PRODUCTS,
  ShopBlogPost,
  SHOP_BLOG_POSTS
} from '../data/shopData';
import { 
  ShopSiteSettings,
  ShopHomeContent,
  ShopAboutContent,
  ShopContactContent,
  ShopShippingPolicyContent,
  ShopReturnPolicyContent,
  DEFAULT_SITE_SETTINGS,
  DEFAULT_HOME_CONTENT,
  DEFAULT_ABOUT_CONTENT,
  DEFAULT_CONTACT_CONTENT,
  DEFAULT_SHIPPING_POLICY_CONTENT,
  DEFAULT_RETURN_POLICY_CONTENT
} from '../data/shopPageContent';
import { CartItem } from '../components/shop/ShopCartDrawer';

const CART_STORAGE_KEY = 'manna_shop_cart_items_v2';
const CURRENCY_STORAGE_KEY = 'manna_shop_currency_pref';
const LANG_STORAGE_KEY = 'manna_shop_lang_pref';

// Page content storage keys
const STORAGE_KEYS = {
  SETTINGS: 'manna_shop_site_settings_v1',
  HOME: 'manna_shop_home_content_v1',
  ABOUT: 'manna_shop_about_content_v1',
  CONTACT: 'manna_shop_contact_content_v1',
  SHIPPING: 'manna_shop_shipping_policy_content_v1',
  RETURN: 'manna_shop_return_policy_content_v1',
  PRODUCTS: 'manna_shop_admin_products_v1',
  BLOGS: 'manna_shop_blog_posts_v1',
};

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

  // Website Page Content & Catalog CMS Management
  products: ShopProduct[];
  addProduct: (product: ShopProduct) => void;
  updateProduct: (product: ShopProduct) => void;
  deleteProduct: (productId: string) => void;

  blogPosts: ShopBlogPost[];
  addBlogPost: (post: ShopBlogPost) => void;
  updateBlogPost: (post: ShopBlogPost) => void;
  deleteBlogPost: (slug: string) => void;

  siteSettings: ShopSiteSettings;
  updateSiteSettings: (settings: Partial<ShopSiteSettings>) => void;

  homeContent: ShopHomeContent;
  updateHomeContent: (content: Partial<ShopHomeContent>) => void;

  aboutContent: ShopAboutContent;
  updateAboutContent: (content: Partial<ShopAboutContent>) => void;

  contactContent: ShopContactContent;
  updateContactContent: (content: Partial<ShopContactContent>) => void;

  shippingPolicyContent: ShopShippingPolicyContent;
  updateShippingPolicyContent: (content: Partial<ShopShippingPolicyContent>) => void;

  returnPolicyContent: ShopReturnPolicyContent;
  updateReturnPolicyContent: (content: Partial<ShopReturnPolicyContent>) => void;

  resetAllContentToDefault: () => void;
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

  // -------------------------------------------------------------
  // DYNAMIC WEBSITE PAGE CONTENT & CMS STATES
  // -------------------------------------------------------------
  const [siteSettings, setSiteSettings] = useState<ShopSiteSettings>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (saved) {
        try { return { ...DEFAULT_SITE_SETTINGS, ...JSON.parse(saved) }; } catch (e) { }
      }
    }
    return DEFAULT_SITE_SETTINGS;
  });

  const [homeContent, setHomeContent] = useState<ShopHomeContent>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEYS.HOME);
      if (saved) {
        try { return { ...DEFAULT_HOME_CONTENT, ...JSON.parse(saved) }; } catch (e) { }
      }
    }
    return DEFAULT_HOME_CONTENT;
  });

  const [aboutContent, setAboutContent] = useState<ShopAboutContent>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEYS.ABOUT);
      if (saved) {
        try { return { ...DEFAULT_ABOUT_CONTENT, ...JSON.parse(saved) }; } catch (e) { }
      }
    }
    return DEFAULT_ABOUT_CONTENT;
  });

  const [contactContent, setContactContent] = useState<ShopContactContent>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEYS.CONTACT);
      if (saved) {
        try { return { ...DEFAULT_CONTACT_CONTENT, ...JSON.parse(saved) }; } catch (e) { }
      }
    }
    return DEFAULT_CONTACT_CONTENT;
  });

  const [shippingPolicyContent, setShippingPolicyContent] = useState<ShopShippingPolicyContent>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEYS.SHIPPING);
      if (saved) {
        try { return { ...DEFAULT_SHIPPING_POLICY_CONTENT, ...JSON.parse(saved) }; } catch (e) { }
      }
    }
    return DEFAULT_SHIPPING_POLICY_CONTENT;
  });

  const [returnPolicyContent, setReturnPolicyContent] = useState<ShopReturnPolicyContent>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEYS.RETURN);
      if (saved) {
        try { return { ...DEFAULT_RETURN_POLICY_CONTENT, ...JSON.parse(saved) }; } catch (e) { }
      }
    }
    return DEFAULT_RETURN_POLICY_CONTENT;
  });

  const [products, setProducts] = useState<ShopProduct[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { }
      }
    }
    return SHOP_PRODUCTS;
  });

  const [blogPosts, setBlogPosts] = useState<ShopBlogPost[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEYS.BLOGS);
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { }
      }
    }
    return SHOP_BLOG_POSTS;
  });

  // Save Cart
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Page Content Updaters
  const updateSiteSettings = (settings: Partial<ShopSiteSettings>) => {
    setSiteSettings(prev => {
      const updated = { ...prev, ...settings };
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
      return updated;
    });
    showToast('✓ Pengaturan situs berhasil diperbarui!');
  };

  const updateHomeContent = (content: Partial<ShopHomeContent>) => {
    setHomeContent(prev => {
      const updated = { ...prev, ...content };
      localStorage.setItem(STORAGE_KEYS.HOME, JSON.stringify(updated));
      return updated;
    });
    showToast('✓ Konten Beranda berhasil diperbarui!');
  };

  const updateAboutContent = (content: Partial<ShopAboutContent>) => {
    setAboutContent(prev => {
      const updated = { ...prev, ...content };
      localStorage.setItem(STORAGE_KEYS.ABOUT, JSON.stringify(updated));
      return updated;
    });
    showToast('✓ Konten Halaman Tentang Kami berhasil disimpan!');
  };

  const updateContactContent = (content: Partial<ShopContactContent>) => {
    setContactContent(prev => {
      const updated = { ...prev, ...content };
      localStorage.setItem(STORAGE_KEYS.CONTACT, JSON.stringify(updated));
      return updated;
    });
    showToast('✓ Konten Halaman Kontak & CS berhasil disimpan!');
  };

  const updateShippingPolicyContent = (content: Partial<ShopShippingPolicyContent>) => {
    setShippingPolicyContent(prev => {
      const updated = { ...prev, ...content };
      localStorage.setItem(STORAGE_KEYS.SHIPPING, JSON.stringify(updated));
      return updated;
    });
    showToast('✓ Kebijakan Pengiriman berhasil disimpan!');
  };

  const updateReturnPolicyContent = (content: Partial<ShopReturnPolicyContent>) => {
    setReturnPolicyContent(prev => {
      const updated = { ...prev, ...content };
      localStorage.setItem(STORAGE_KEYS.RETURN, JSON.stringify(updated));
      return updated;
    });
    showToast('✓ Kebijakan Retur & Garansi berhasil disimpan!');
  };

  // Products Updaters
  const addProduct = (newProd: ShopProduct) => {
    setProducts(prev => {
      const updated = [newProd, ...prev];
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(updated));
      return updated;
    });
    showToast(`✓ Produk "${newProd.name}" berhasil ditambahkan!`);
  };

  const updateProduct = (updatedProd: ShopProduct) => {
    setProducts(prev => {
      const updated = prev.map(p => p.id === updatedProd.id ? updatedProd : p);
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(updated));
      return updated;
    });
    showToast(`✓ Produk "${updatedProd.name}" berhasil diperbarui!`);
  };

  const deleteProduct = (productId: string) => {
    setProducts(prev => {
      const updated = prev.filter(p => p.id !== productId);
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(updated));
      return updated;
    });
    showToast('✓ Produk berhasil dihapus dari katalog.');
  };

  // Blog Posts Updaters
  const addBlogPost = (post: ShopBlogPost) => {
    setBlogPosts(prev => {
      const updated = [post, ...prev];
      localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(updated));
      return updated;
    });
    showToast(`✓ Artikel "${post.titleId}" berhasil diterbitkan!`);
  };

  const updateBlogPost = (post: ShopBlogPost) => {
    setBlogPosts(prev => {
      const updated = prev.map(p => p.slug === post.slug ? post : p);
      localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(updated));
      return updated;
    });
    showToast(`✓ Artikel "${post.titleId}" berhasil diperbarui!`);
  };

  const deleteBlogPost = (slug: string) => {
    setBlogPosts(prev => {
      const updated = prev.filter(p => p.slug !== slug);
      localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(updated));
      return updated;
    });
    showToast('✓ Artikel berhasil dihapus.');
  };

  const resetAllContentToDefault = () => {
    setSiteSettings(DEFAULT_SITE_SETTINGS);
    setHomeContent(DEFAULT_HOME_CONTENT);
    setAboutContent(DEFAULT_ABOUT_CONTENT);
    setContactContent(DEFAULT_CONTACT_CONTENT);
    setShippingPolicyContent(DEFAULT_SHIPPING_POLICY_CONTENT);
    setReturnPolicyContent(DEFAULT_RETURN_POLICY_CONTENT);
    setProducts(SHOP_PRODUCTS);
    setBlogPosts(SHOP_BLOG_POSTS);

    Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
    showToast('✓ Seluruh konten website berhasil dikembalikan ke standar awal!');
  };

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

        // Content CMS
        products,
        addProduct,
        updateProduct,
        deleteProduct,

        blogPosts,
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,

        siteSettings,
        updateSiteSettings,

        homeContent,
        updateHomeContent,

        aboutContent,
        updateAboutContent,

        contactContent,
        updateContactContent,

        shippingPolicyContent,
        updateShippingPolicyContent,

        returnPolicyContent,
        updateReturnPolicyContent,

        resetAllContentToDefault
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
