import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import { 
  SHOP_CATEGORIES, 
  DISCOUNT_COUPONS,
  ShopProduct,
  ShopBlogPost
} from '../../data/shopData';
import { useShop } from '../../context/ShopContext';
import { formatPrice } from '../../utils/shopCurrency';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Tag, 
  FileText, 
  Search, 
  BarChart3, 
  Lock, 
  LogOut, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Truck, 
  Download, 
  Globe, 
  ShieldCheck, 
  ArrowLeft,
  X,
  AlertTriangle,
  ExternalLink,
  MessageCircle,
  Layers,
  Home,
  Phone,
  RotateCcw,
  Settings,
  Save,
  RefreshCw,
  Eye,
  Check,
  Upload,
  Camera,
  Image as ImageIcon,
  Copy,
  Cloud
} from 'lucide-react';
import { saveProductToCloud } from '../../services/shopFirestoreService';

export type UserRole = 'SUPER_ADMIN' | 'STORE_MANAGER' | 'CONTENT_EDITOR' | 'CUSTOMER_SERVICE' | 'FINANCE';

interface AdminUser {
  name: string;
  email: string;
  role: UserRole;
  roleLabel: string;
}

const PRESET_ACCOUNTS: { email: string; role: UserRole; roleLabel: string; name: string }[] = [
  { email: 'owner@mannazentrum.com', role: 'SUPER_ADMIN', roleLabel: 'Owner / Super Admin', name: 'Dr. Hary (Owner)' },
  { email: 'manager@mannazentrum.com', role: 'STORE_MANAGER', roleLabel: 'Store Manager', name: 'Budi Santoso' },
  { email: 'editor@mannazentrum.com', role: 'CONTENT_EDITOR', roleLabel: 'Content Editor', name: 'Sarah Anindita' },
  { email: 'cs@mannazentrum.com', role: 'CUSTOMER_SERVICE', roleLabel: 'Customer Service', name: 'Rina Oktavia' },
  { email: 'finance@mannazentrum.com', role: 'FINANCE', roleLabel: 'Finance Officer', name: 'Dewi Lestari' },
];

export const ShopAdminDashboard: React.FC = () => {
  const {
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
    resetAllContentToDefault,
    showToast
  } = useShop();

  // Auth State
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('manna_shop_admin_user_session');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { }
      }
    }
    // Default logged in as Owner for convenience
    return PRESET_ACCOUNTS[0];
  });

  const [activeTab, setActiveTab] = useState<'overview' | 'pages' | 'products' | 'orders' | 'customers' | 'marketing' | 'content' | 'seo' | 'reports'>('pages');

  // Sub-tab for Page CMS
  const [activePageTab, setActivePageTab] = useState<'home' | 'about' | 'contact' | 'shipping' | 'return' | 'global'>('home');

  // Local draft states for Page CMS editing
  const [draftHome, setDraftHome] = useState(homeContent);
  const [draftAbout, setDraftAbout] = useState(aboutContent);
  const [draftContact, setDraftContact] = useState(contactContent);
  const [draftShipping, setDraftShipping] = useState(shippingPolicyContent);
  const [draftReturn, setDraftReturn] = useState(returnPolicyContent);
  const [draftSettings, setDraftSettings] = useState(siteSettings);

  // Sync draft states with context when context loads
  useEffect(() => { setDraftHome(homeContent); }, [homeContent]);
  useEffect(() => { setDraftAbout(aboutContent); }, [aboutContent]);
  useEffect(() => { setDraftContact(contactContent); }, [contactContent]);
  useEffect(() => { setDraftShipping(shippingPolicyContent); }, [shippingPolicyContent]);
  useEffect(() => { setDraftReturn(returnPolicyContent); }, [returnPolicyContent]);
  useEffect(() => { setDraftSettings(siteSettings); }, [siteSettings]);

  // Orders State (Stored in LocalStorage)
  const [ordersList, setOrdersList] = useState<any[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('manna_shop_admin_orders_v1');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { }
      }
    }
    return [
      {
        orderId: 'MNZ-842911',
        createdAt: '2026-11-04T10:15:00Z',
        customerName: 'Siti Rahmawati',
        customerPhone: '+6281234567890',
        customerEmail: 'siti@gmail.com',
        country: 'Indonesia',
        address: 'Jl. Melati No. 45, Jakarta Selatan (12340)',
        items: [{ id: 'food-01', name: 'Beras Organik Pandan Wangi (2.5kg)', quantity: 2, price: 78000 }],
        subtotal: 156000,
        discount: 15600,
        shipping: 15000,
        grandTotal: 155400,
        paymentMethod: 'QRIS',
        status: 'Diproses',
        trackingNumber: 'JNE-CGK-8928192'
      },
      {
        orderId: 'MNZ-771204',
        createdAt: '2026-11-03T14:30:00Z',
        customerName: 'Ahmad Faiz bin Zulkifli',
        customerPhone: '+60123456789',
        customerEmail: 'faiz@yahoo.com',
        country: 'Malaysia',
        address: 'Bukit Bintang, Kuala Lumpur (55100)',
        items: [{ id: 'app-01', name: 'Set Piyama Katun Organik Anak', quantity: 2, price: 125000 }],
        subtotal: 250000,
        discount: 37500,
        shipping: 110000,
        grandTotal: 322500,
        paymentMethod: 'CARD',
        status: 'Sedang Dikirim',
        trackingNumber: 'EMS-MY-99120412ID'
      }
    ];
  });

  // Coupons State
  const [couponsList] = useState(DISCOUNT_COUPONS);

  // Product Edit & Add State
  const [editingProduct, setEditingProduct] = useState<ShopProduct | null>(null);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newProductImage, setNewProductImage] = useState<string>('');

  // Blog Edit & Add State
  const [editingBlog, setEditingBlog] = useState<ShopBlogPost | null>(null);
  const [isAddBlogOpen, setIsAddBlogOpen] = useState(false);
  const [newBlogImage, setNewBlogImage] = useState<string>('');

  // Search filter in product manager
  const [productSearch, setProductSearch] = useState('');

  // Export & Cloud Sync State
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [isSyncingCloud, setIsSyncingCloud] = useState(false);

  const handleSyncAllToCloud = async () => {
    setIsSyncingCloud(true);
    let successCount = 0;
    for (const p of products) {
      const ok = await saveProductToCloud(p);
      if (ok) successCount++;
    }
    setIsSyncingCloud(false);
    showToast(`✓ Berhasil menyinkronkan ${successCount} produk ke Cloud Firestore!`);
  };

  const handleDownloadProductsJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(products, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "shop_products.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('✓ File shop_products.json berhasil diunduh!');
  };

  const handleCopyCode = () => {
    const code = `export const SHOP_PRODUCTS: ShopProduct[] = ${JSON.stringify(products, null, 2)};`;
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    showToast('✓ Kode SHOP_PRODUCTS berhasil disalin ke clipboard!');
    setTimeout(() => setCopiedCode(false), 2500);
  };

  // Direct Photo Processing & Auto-compression (max 900px, Web-optimized JPEG ~50KB)
  const compressAndConvertImage = (file: File, callback: (base64Url: string) => void) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 900;
        const MAX_HEIGHT = 900;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL('image/jpeg', 0.85);
          callback(compressed);
        } else {
          callback(event.target?.result as string);
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  // Save orders state changes
  useEffect(() => {
    localStorage.setItem('manna_shop_admin_orders_v1', JSON.stringify(ordersList));
  }, [ordersList]);

  const handleLogin = (account: typeof PRESET_ACCOUNTS[0]) => {
    const user: AdminUser = {
      name: account.name,
      email: account.email,
      role: account.role,
      roleLabel: account.roleLabel,
    };
    setCurrentUser(user);
    localStorage.setItem('manna_shop_admin_user_session', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('manna_shop_admin_user_session');
  };

  // Permission Check based on Role
  const canAccess = (tab: typeof activeTab): boolean => {
    if (!currentUser) return false;
    const role = currentUser.role;
    if (role === 'SUPER_ADMIN') return true;
    if (role === 'STORE_MANAGER') return tab !== 'seo';
    if (role === 'CONTENT_EDITOR') return tab === 'overview' || tab === 'pages' || tab === 'content' || tab === 'marketing' || tab === 'seo';
    if (role === 'CUSTOMER_SERVICE') return tab === 'overview' || tab === 'orders' || tab === 'customers';
    if (role === 'FINANCE') return tab === 'overview' || tab === 'orders' || tab === 'reports';
    return false;
  };

  // Update order status
  const handleUpdateOrderStatus = (orderId: string, newStatus: string) => {
    setOrdersList(prev => prev.map(order => order.orderId === orderId ? { ...order, status: newStatus } : order));
    showToast(`Status pesanan ${orderId} diubah menjadi "${newStatus}"`);
  };

  // Update tracking number
  const handleUpdateTracking = (orderId: string, trackingNumber: string) => {
    setOrdersList(prev => prev.map(order => order.orderId === orderId ? { ...order, trackingNumber } : order));
    showToast(`Nomor resi untuk pesanan ${orderId} berhasil disimpan`);
  };

  // Export orders to CSV
  const handleExportCSV = () => {
    const headers = ['Order ID', 'Tanggal', 'Pelanggan', 'No HP', 'Negara', 'Total (Rp)', 'Metode', 'Status', 'No Resi'];
    const rows = ordersList.map(o => [
      o.orderId,
      new Date(o.createdAt).toLocaleDateString('id-ID'),
      `"${o.customerName}"`,
      `"${o.customerPhone}"`,
      `"${o.country}"`,
      o.grandTotal,
      o.paymentMethod,
      o.status,
      `"${o.trackingNumber || '-'}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `manna_shop_orders_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Calculations for Overview Dashboard
  const totalRevenueIdr = ordersList.reduce((sum, o) => sum + (o.grandTotal || 0), 0);
  const lowStockCount = products.filter(p => p.stock < 30).length;

  // Filtered Products for Catalog Table
  const displayProducts = products.filter(p => {
    if (!productSearch.trim()) return true;
    const q = productSearch.toLowerCase();
    return p.name.toLowerCase().includes(q) || p.slug.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
  });

  // IF NOT LOGGED IN -> SHOW LOGIN SCREEN
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#FAF9F5] flex flex-col justify-center items-center p-4 font-sans text-slate-800">
        <SEO 
          title="Staff Login - Mannazentrum Shop Admin CMS"
          description="Portal masuk staf dan pengelola toko online Mannazentrum Shop."
          canonicalPath="/admin/shop"
        />

        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-stone-200/80 p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-bold text-xl mx-auto shadow-sm">
              M
            </div>
            <h1 className="text-2xl font-light text-slate-900 tracking-tight">
              Portal Admin & CMS Manna Shop
            </h1>
            <p className="text-xs text-slate-500 font-light">
              Pilih peran akun Anda untuk mengelola konten halaman website, produk, pesanan, dan operasional toko:
            </p>
          </div>

          <div className="space-y-2.5">
            {PRESET_ACCOUNTS.map((acc) => (
              <button
                key={acc.email}
                onClick={() => handleLogin(acc)}
                className="w-full p-3.5 rounded-2xl border border-stone-200 hover:border-amber-500 hover:bg-amber-50/50 transition flex items-center justify-between text-left group"
              >
                <div>
                  <span className="font-bold text-xs text-slate-900 block group-hover:text-amber-700">
                    {acc.name}
                  </span>
                  <span className="text-[11px] text-slate-400 font-light block">{acc.email}</span>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-stone-100 text-slate-600 group-hover:bg-amber-200 group-hover:text-amber-900">
                  {acc.roleLabel}
                </span>
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-stone-100 flex justify-between items-center text-xs text-slate-500">
            <Link to="/" className="hover:text-amber-600 flex items-center gap-1 transition">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Ke Beranda Toko</span>
            </Link>
            <span className="text-[10px] text-slate-400">Keamanan RBAC Aktif</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-slate-800 flex flex-col">
      <SEO 
        title="Admin & Page CMS - Manna Shop (shop.mannazentrum.com)"
        description="Pusat kendali konten halaman website dan manajemen operasional e-commerce Manna Shop."
        canonicalPath="/admin/shop"
      />

      {/* Top Admin Navbar */}
      <header className="bg-slate-900 text-white px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between border-b border-slate-800 sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-xl bg-white text-slate-900 font-bold flex items-center justify-center text-sm group-hover:bg-amber-400 transition">
              M
            </div>
            <div>
              <span className="font-bold text-sm text-white block leading-tight">
                Manna Shop <span className="text-amber-400 font-light">Admin CMS</span>
              </span>
              <span className="text-[9px] uppercase tracking-wider text-slate-400">Pengelola Toko & Konten Halaman</span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <span className="font-bold text-xs text-white block">{currentUser.name}</span>
            <span className="text-[10px] text-amber-300 font-semibold bg-slate-800 px-2 py-0.5 rounded-full inline-block border border-slate-700">
              {currentUser.roleLabel}
            </span>
          </div>

          <Link
            to="/"
            target="_blank"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 hover:text-white transition text-xs font-semibold border border-slate-700"
            title="Buka Website Toko Langsung di Tab Baru"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Buka Toko</span>
          </Link>

          <button
            onClick={handleLogout}
            className="p-2 rounded-xl bg-slate-800 hover:bg-rose-900 text-slate-300 hover:text-rose-200 transition"
            title="Keluar (Logout)"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Container: Sidebar + Content */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Navigation Sidebar */}
        <nav className="lg:col-span-3 space-y-1.5 bg-white p-3.5 rounded-3xl border border-stone-200/80 shadow-xs h-fit">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-3 py-2">
            Menu Utama CMS
          </p>

          {/* TAB 1: KELOLA HALAMAN WEBSITE (HIGHLIGHTED USER REQUEST) */}
          <button
            onClick={() => setActiveTab('pages')}
            className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition ${
              activeTab === 'pages'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-800 hover:bg-amber-50/70 border border-amber-200/60 bg-amber-50/30'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Layers className="w-4 h-4 text-slate-950" />
              <span>1. Kelola Halaman Web</span>
            </div>
            <span className="text-[10px] bg-slate-900 text-white font-bold px-1.5 py-0.5 rounded-md">
              CMS
            </span>
          </button>

          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition ${
              activeTab === 'overview'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-stone-50'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 text-amber-400" />
            <span>2. Ringkasan Bisnis</span>
          </button>

          <button
            onClick={() => canAccess('products') && setActiveTab('products')}
            disabled={!canAccess('products')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition ${
              !canAccess('products') ? 'opacity-40 cursor-not-allowed text-slate-400' :
              activeTab === 'products'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-stone-50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Package className="w-4 h-4 text-amber-400" />
              <span>3. Katalog Produk & Stok</span>
            </div>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-stone-100 text-slate-700">
              {products.length}
            </span>
          </button>

          <button
            onClick={() => canAccess('orders') && setActiveTab('orders')}
            disabled={!canAccess('orders')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition ${
              !canAccess('orders') ? 'opacity-40 cursor-not-allowed text-slate-400' :
              activeTab === 'orders'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-stone-50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <ShoppingCart className="w-4 h-4 text-amber-400" />
              <span>4. Pesanan & Resi Kirim</span>
            </div>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-900">
              {ordersList.length}
            </span>
          </button>

          <button
            onClick={() => canAccess('content') && setActiveTab('content')}
            disabled={!canAccess('content')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition ${
              !canAccess('content') ? 'opacity-40 cursor-not-allowed text-slate-400' :
              activeTab === 'content'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-stone-50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <FileText className="w-4 h-4 text-amber-400" />
              <span>5. Artikel Edukasi & Blog</span>
            </div>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-stone-100 text-slate-700">
              {blogPosts.length}
            </span>
          </button>

          <button
            onClick={() => canAccess('marketing') && setActiveTab('marketing')}
            disabled={!canAccess('marketing')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition ${
              !canAccess('marketing') ? 'opacity-40 cursor-not-allowed text-slate-400' :
              activeTab === 'marketing'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-stone-50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Tag className="w-4 h-4 text-amber-400" />
              <span>6. Kupon & Promosi</span>
            </div>
          </button>

          <button
            onClick={() => canAccess('seo') && setActiveTab('seo')}
            disabled={!canAccess('seo')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition ${
              !canAccess('seo') ? 'opacity-40 cursor-not-allowed text-slate-400' :
              activeTab === 'seo'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-stone-50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Globe className="w-4 h-4 text-amber-400" />
              <span>7. SEO & AI Search</span>
            </div>
          </button>

          <button
            onClick={() => canAccess('reports') && setActiveTab('reports')}
            disabled={!canAccess('reports')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition ${
              !canAccess('reports') ? 'opacity-40 cursor-not-allowed text-slate-400' :
              activeTab === 'reports'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-stone-50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <BarChart3 className="w-4 h-4 text-amber-400" />
              <span>8. Laporan Penjualan</span>
            </div>
          </button>

          <div className="pt-4 border-t border-stone-200/80 px-2">
            <button
              onClick={() => {
                if (window.confirm('Apakah Anda yakin ingin mengembalikan seluruh konten halaman website ke teks standar awal?')) {
                  resetAllContentToDefault();
                }
              }}
              className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-stone-200 text-slate-500 hover:text-rose-700 hover:bg-rose-50 transition text-[11px]"
              title="Reset Semua Konten ke Teks Awal Pabrikan"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset ke Teks Awal</span>
            </button>
          </div>
        </nav>

        {/* Content Area */}
        <main className="lg:col-span-9 space-y-6">

          {/* ========================================================================= */}
          {/* TAB 1: KELOLA HALAMAN WEBSITE (CMS VISUAL LANGSUNG)                      */}
          {/* ========================================================================= */}
          {activeTab === 'pages' && (
            <div className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-xs space-y-6">
              
              {/* Header Tab */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-xl bg-amber-100 text-amber-900">
                      <Layers className="w-5 h-5 text-amber-700" />
                    </span>
                    <h3 className="text-xl font-bold text-slate-900">Kelola Halaman Website Toko</h3>
                  </div>
                  <p className="text-xs text-slate-500 font-light mt-1">
                    Ubah teks judul, banner promo, alamat, nomor WhatsApp, dan isi halaman pada <strong className="text-slate-800">shop.mannazentrum.com</strong> secara langsung tanpa perlu ubah kode.
                  </p>
                </div>

                {/* Direct Link to View Page */}
                <a
                  href={
                    activePageTab === 'home' ? '/' :
                    activePageTab === 'about' ? '/about-us' :
                    activePageTab === 'contact' ? '/contact' :
                    activePageTab === 'shipping' ? '/shipping-policy' :
                    activePageTab === 'return' ? '/return-policy' : '/'
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full border border-stone-200 text-xs font-semibold text-slate-700 hover:bg-stone-50 flex items-center gap-1.5 shrink-0 self-start sm:self-auto"
                >
                  <Eye className="w-3.5 h-3.5 text-amber-600" />
                  <span>Lihat Halaman Ini Live →</span>
                </a>
              </div>

              {/* Sub-tab Navigation Bar */}
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2 border-b border-stone-100 text-xs">
                <button
                  onClick={() => setActivePageTab('home')}
                  className={`px-4 py-2 rounded-2xl font-bold transition flex items-center gap-2 shrink-0 ${
                    activePageTab === 'home'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-stone-100 text-slate-600 hover:bg-stone-200/70'
                  }`}
                >
                  <Home className="w-3.5 h-3.5 text-amber-400" />
                  <span>🏠 Beranda (Home)</span>
                </button>

                <button
                  onClick={() => setActivePageTab('about')}
                  className={`px-4 py-2 rounded-2xl font-bold transition flex items-center gap-2 shrink-0 ${
                    activePageTab === 'about'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-stone-100 text-slate-600 hover:bg-stone-200/70'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5 text-amber-400" />
                  <span>ℹ️ Tentang Kami</span>
                </button>

                <button
                  onClick={() => setActivePageTab('contact')}
                  className={`px-4 py-2 rounded-2xl font-bold transition flex items-center gap-2 shrink-0 ${
                    activePageTab === 'contact'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-stone-100 text-slate-600 hover:bg-stone-200/70'
                  }`}
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>📞 Kontak & CS</span>
                </button>

                <button
                  onClick={() => setActivePageTab('shipping')}
                  className={`px-4 py-2 rounded-2xl font-bold transition flex items-center gap-2 shrink-0 ${
                    activePageTab === 'shipping'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-stone-100 text-slate-600 hover:bg-stone-200/70'
                  }`}
                >
                  <Truck className="w-3.5 h-3.5 text-amber-400" />
                  <span>🚚 Kebijakan Pengiriman</span>
                </button>

                <button
                  onClick={() => setActivePageTab('return')}
                  className={`px-4 py-2 rounded-2xl font-bold transition flex items-center gap-2 shrink-0 ${
                    activePageTab === 'return'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-stone-100 text-slate-600 hover:bg-stone-200/70'
                  }`}
                >
                  <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                  <span>🔄 Kebijakan Retur & Garansi</span>
                </button>

                <button
                  onClick={() => setActivePageTab('global')}
                  className={`px-4 py-2 rounded-2xl font-bold transition flex items-center gap-2 shrink-0 ${
                    activePageTab === 'global'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-stone-100 text-slate-600 hover:bg-stone-200/70'
                  }`}
                >
                  <Settings className="w-3.5 h-3.5 text-amber-400" />
                  <span>⚙️ Pengaturan Global & Running Text</span>
                </button>
              </div>

              {/* ------------------------------------------------------------- */}
              {/* SUB-TAB A: EDIT BERANDA (HOMEPAGE)                            */}
              {/* ------------------------------------------------------------- */}
              {activePageTab === 'home' && (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    updateHomeContent(draftHome);
                  }}
                  className="space-y-6 text-xs"
                >
                  {/* Hero Banner Section */}
                  <div className="p-5 rounded-2xl bg-[#FAF9F5] border border-stone-200 space-y-4">
                    <div className="flex items-center justify-between border-b border-stone-200/60 pb-2">
                      <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                        <span>🌟 Hero Banner Utama (Paling Atas)</span>
                      </h4>
                      <span className="text-[10px] text-slate-400">Tampil di halaman depan</span>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Badge Kecil (Pojok Atas Hero)</label>
                      <input
                        type="text"
                        value={draftHome.heroBadge}
                        onChange={(e) => setDraftHome({ ...draftHome, heroBadge: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl"
                        placeholder="e.g. ECO-LIVING & FAMILY ESSENTIALS"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Judul Utama Hero (Heading 1)</label>
                      <input
                        type="text"
                        value={draftHome.heroTitle}
                        onChange={(e) => setDraftHome({ ...draftHome, heroTitle: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl font-semibold"
                        placeholder="e.g. Kebutuhan Harian Alami & Berkualitas untuk Keluarga Tercinta"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Subjudul / Paragraf Deskripsi Hero</label>
                      <textarea
                        rows={3}
                        value={draftHome.heroSubtitle}
                        onChange={(e) => setDraftHome({ ...draftHome, heroSubtitle: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl leading-relaxed"
                        placeholder="Deskripsi singkat tentang apa yang dijual dan jangkauan wilayah..."
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Teks Tombol Aksi (CTA)</label>
                        <input
                          type="text"
                          value={draftHome.heroCtaText}
                          onChange={(e) => setDraftHome({ ...draftHome, heroCtaText: e.target.value })}
                          className="w-full px-3.5 py-2 bg-white border border-stone-200 rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Tautan Tombol Aksi (Link)</label>
                        <input
                          type="text"
                          value={draftHome.heroCtaLink}
                          onChange={(e) => setDraftHome({ ...draftHome, heroCtaLink: e.target.value })}
                          className="w-full px-3.5 py-2 bg-white border border-stone-200 rounded-xl font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Promo Section */}
                  <div className="p-5 rounded-2xl bg-[#FAF9F5] border border-stone-200 space-y-4">
                    <div className="flex items-center justify-between border-b border-stone-200/60 pb-2">
                      <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                        <span>🎁 Seksi Spanduk Promo Unggulan</span>
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Judul Promo</label>
                        <input
                          type="text"
                          value={draftHome.promoTitle}
                          onChange={(e) => setDraftHome({ ...draftHome, promoTitle: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Kode Voucher</label>
                          <input
                            type="text"
                            value={draftHome.promoCoupon}
                            onChange={(e) => setDraftHome({ ...draftHome, promoCoupon: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl font-mono uppercase font-bold text-amber-800"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Diskon (%)</label>
                          <input
                            type="number"
                            value={draftHome.promoDiscountPercent}
                            onChange={(e) => setDraftHome({ ...draftHome, promoDiscountPercent: Number(e.target.value) })}
                            className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl font-bold"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Subjudul / Keterangan Promo</label>
                      <textarea
                        rows={2}
                        value={draftHome.promoSubtitle}
                        onChange={(e) => setDraftHome({ ...draftHome, promoSubtitle: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl"
                      />
                    </div>
                  </div>

                  {/* 4 Pilar Kualitas */}
                  <div className="p-5 rounded-2xl bg-[#FAF9F5] border border-stone-200 space-y-4">
                    <div className="flex items-center justify-between border-b border-stone-200/60 pb-2">
                      <h4 className="font-bold text-slate-900 text-sm">🛡️ 4 Pilar Keunggulan Toko</h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-2">
                        <label className="block font-bold text-slate-800">Pilar 1</label>
                        <input
                          type="text"
                          value={draftHome.pillar1Title}
                          onChange={(e) => setDraftHome({ ...draftHome, pillar1Title: e.target.value })}
                          className="w-full px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-lg font-medium"
                        />
                        <textarea
                          rows={2}
                          value={draftHome.pillar1Desc}
                          onChange={(e) => setDraftHome({ ...draftHome, pillar1Desc: e.target.value })}
                          className="w-full px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-[11px]"
                        />
                      </div>

                      <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-2">
                        <label className="block font-bold text-slate-800">Pilar 2</label>
                        <input
                          type="text"
                          value={draftHome.pillar2Title}
                          onChange={(e) => setDraftHome({ ...draftHome, pillar2Title: e.target.value })}
                          className="w-full px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-lg font-medium"
                        />
                        <textarea
                          rows={2}
                          value={draftHome.pillar2Desc}
                          onChange={(e) => setDraftHome({ ...draftHome, pillar2Desc: e.target.value })}
                          className="w-full px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-[11px]"
                        />
                      </div>

                      <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-2">
                        <label className="block font-bold text-slate-800">Pilar 3</label>
                        <input
                          type="text"
                          value={draftHome.pillar3Title}
                          onChange={(e) => setDraftHome({ ...draftHome, pillar3Title: e.target.value })}
                          className="w-full px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-lg font-medium"
                        />
                        <textarea
                          rows={2}
                          value={draftHome.pillar3Desc}
                          onChange={(e) => setDraftHome({ ...draftHome, pillar3Desc: e.target.value })}
                          className="w-full px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-[11px]"
                        />
                      </div>

                      <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-2">
                        <label className="block font-bold text-slate-800">Pilar 4</label>
                        <input
                          type="text"
                          value={draftHome.pillar4Title}
                          onChange={(e) => setDraftHome({ ...draftHome, pillar4Title: e.target.value })}
                          className="w-full px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-lg font-medium"
                        />
                        <textarea
                          rows={2}
                          value={draftHome.pillar4Desc}
                          onChange={(e) => setDraftHome({ ...draftHome, pillar4Desc: e.target.value })}
                          className="w-full px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-[11px]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Action Save Button */}
                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-full bg-slate-900 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition active:scale-95"
                    >
                      <Save className="w-4 h-4 text-amber-300" />
                      <span>Simpan Perubahan Beranda</span>
                    </button>
                  </div>
                </form>
              )}

              {/* ------------------------------------------------------------- */}
              {/* SUB-TAB B: EDIT TENTANG KAMI (/about-us)                      */}
              {/* ------------------------------------------------------------- */}
              {activePageTab === 'about' && (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    updateAboutContent(draftAbout);
                  }}
                  className="space-y-6 text-xs"
                >
                  <div className="p-5 rounded-2xl bg-[#FAF9F5] border border-stone-200 space-y-4">
                    <div className="flex items-center justify-between border-b border-stone-200/60 pb-2">
                      <h4 className="font-bold text-slate-900 text-sm">Header & Pengenalan Halaman Tentang Kami</h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Badge Halaman</label>
                        <input
                          type="text"
                          value={draftAbout.badge}
                          onChange={(e) => setDraftAbout({ ...draftAbout, badge: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Judul Utama Halaman</label>
                        <input
                          type="text"
                          value={draftAbout.title}
                          onChange={(e) => setDraftAbout({ ...draftAbout, title: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl font-bold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Subjudul / Ringkasan Header</label>
                      <textarea
                        rows={2}
                        value={draftAbout.subtitle}
                        onChange={(e) => setDraftAbout({ ...draftAbout, subtitle: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl leading-relaxed"
                      />
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#FAF9F5] border border-stone-200 space-y-4">
                    <div className="flex items-center justify-between border-b border-stone-200/60 pb-2">
                      <h4 className="font-bold text-slate-900 text-sm">Cerita & Filosofi Toko</h4>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Judul Seksi Cerita</label>
                      <input
                        type="text"
                        value={draftAbout.storyTitle}
                        onChange={(e) => setDraftAbout({ ...draftAbout, storyTitle: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Paragraf 1 (Latar Belakang)</label>
                      <textarea
                        rows={3}
                        value={draftAbout.storyParagraph1}
                        onChange={(e) => setDraftAbout({ ...draftAbout, storyParagraph1: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl leading-relaxed"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Paragraf 2 (Tantangan Keluarga & Kualitas)</label>
                      <textarea
                        rows={3}
                        value={draftAbout.storyParagraph2}
                        onChange={(e) => setDraftAbout({ ...draftAbout, storyParagraph2: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl leading-relaxed"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Paragraf 3 (Solusi Manna Shop & Kemitraan Tani)</label>
                      <textarea
                        rows={3}
                        value={draftAbout.storyParagraph3}
                        onChange={(e) => setDraftAbout({ ...draftAbout, storyParagraph3: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl leading-relaxed"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-full bg-slate-900 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition active:scale-95"
                    >
                      <Save className="w-4 h-4 text-amber-300" />
                      <span>Simpan Perubahan Tentang Kami</span>
                    </button>
                  </div>
                </form>
              )}

              {/* ------------------------------------------------------------- */}
              {/* SUB-TAB C: EDIT KONTAK & CS (/contact)                        */}
              {/* ------------------------------------------------------------- */}
              {activePageTab === 'contact' && (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    updateContactContent(draftContact);
                    updateSiteSettings(draftSettings);
                  }}
                  className="space-y-6 text-xs"
                >
                  <div className="p-5 rounded-2xl bg-[#FAF9F5] border border-stone-200 space-y-4">
                    <div className="flex items-center justify-between border-b border-stone-200/60 pb-2">
                      <h4 className="font-bold text-slate-900 text-sm">Saluran Kontak Resmi & WhatsApp</h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Nomor WhatsApp Resmi (Format Angka Tanpa +, e.g. 6287881110807)</label>
                        <input
                          type="text"
                          value={draftSettings.whatsappNumber}
                          onChange={(e) => setDraftSettings({ ...draftSettings, whatsappNumber: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl font-mono font-bold"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Format Tampilan WhatsApp di Layar</label>
                        <input
                          type="text"
                          value={draftSettings.whatsappDisplay}
                          onChange={(e) => setDraftSettings({ ...draftSettings, whatsappDisplay: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl font-medium"
                          placeholder="e.g. +62 878-8111-0807"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Alamat Email Toko</label>
                        <input
                          type="email"
                          value={draftSettings.email}
                          onChange={(e) => setDraftSettings({ ...draftSettings, email: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl font-mono"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Jam Operasional</label>
                        <input
                          type="text"
                          value={draftSettings.operatingHoursWeekday}
                          onChange={(e) => setDraftSettings({ ...draftSettings, operatingHoursWeekday: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Alamat Lengkap Pusat Logistik & Gudang Pengiriman</label>
                      <textarea
                        rows={2}
                        value={draftContact.warehouseAddress}
                        onChange={(e) => setDraftContact({ ...draftContact, warehouseAddress: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl leading-relaxed"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-full bg-slate-900 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition active:scale-95"
                    >
                      <Save className="w-4 h-4 text-amber-300" />
                      <span>Simpan Perubahan Kontak & CS</span>
                    </button>
                  </div>
                </form>
              )}

              {/* ------------------------------------------------------------- */}
              {/* SUB-TAB D: EDIT KEBIJAKAN PENGIRIMAN (/shipping-policy)       */}
              {/* ------------------------------------------------------------- */}
              {activePageTab === 'shipping' && (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    updateShippingPolicyContent(draftShipping);
                  }}
                  className="space-y-6 text-xs"
                >
                  <div className="p-5 rounded-2xl bg-[#FAF9F5] border border-stone-200 space-y-4">
                    <div className="flex items-center justify-between border-b border-stone-200/60 pb-2">
                      <h4 className="font-bold text-slate-900 text-sm">Kebijakan Pengiriman Domestik & ASEAN</h4>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Judul Halaman Pengiriman</label>
                      <input
                        type="text"
                        value={draftShipping.title}
                        onChange={(e) => setDraftShipping({ ...draftShipping, title: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl font-bold"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Subjudul Halaman</label>
                      <input
                        type="text"
                        value={draftShipping.subtitle}
                        onChange={(e) => setDraftShipping({ ...draftShipping, subtitle: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Waktu Pemrosesan Pesanan (Batas Jam Pengiriman)</label>
                      <input
                        type="text"
                        value={draftShipping.domesticHandlingTime}
                        onChange={(e) => setDraftShipping({ ...draftShipping, domesticHandlingTime: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Standar Kemasan Vakum Makanan & Benih</label>
                      <textarea
                        rows={3}
                        value={draftShipping.packagingDescription}
                        onChange={(e) => setDraftShipping({ ...draftShipping, packagingDescription: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl leading-relaxed"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-full bg-slate-900 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition active:scale-95"
                    >
                      <Save className="w-4 h-4 text-amber-300" />
                      <span>Simpan Kebijakan Pengiriman</span>
                    </button>
                  </div>
                </form>
              )}

              {/* ------------------------------------------------------------- */}
              {/* SUB-TAB E: EDIT KEBIJAKAN RETUR & GARANSI (/return-policy)   */}
              {/* ------------------------------------------------------------- */}
              {activePageTab === 'return' && (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    updateReturnPolicyContent(draftReturn);
                  }}
                  className="space-y-6 text-xs"
                >
                  <div className="p-5 rounded-2xl bg-[#FAF9F5] border border-stone-200 space-y-4">
                    <div className="flex items-center justify-between border-b border-stone-200/60 pb-2">
                      <h4 className="font-bold text-slate-900 text-sm">Ketentuan Garansi & Retur Produk</h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Garansi Daya Tumbuh Benih (Jumlah Hari)</label>
                        <input
                          type="number"
                          value={draftReturn.seedGuaranteeDays}
                          onChange={(e) => setDraftReturn({ ...draftReturn, seedGuaranteeDays: Number(e.target.value) })}
                          className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl font-bold"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Garansi Tukar Ukuran Pakaian (Jumlah Hari)</label>
                        <input
                          type="number"
                          value={draftReturn.clothingExchangeDays}
                          onChange={(e) => setDraftReturn({ ...draftReturn, clothingExchangeDays: Number(e.target.value) })}
                          className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl font-bold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Keterangan Garansi Kerusakan Transit 100%</label>
                      <textarea
                        rows={2}
                        value={draftReturn.transitGuaranteeDesc}
                        onChange={(e) => setDraftReturn({ ...draftReturn, transitGuaranteeDesc: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl leading-relaxed"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-full bg-slate-900 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition active:scale-95"
                    >
                      <Save className="w-4 h-4 text-amber-300" />
                      <span>Simpan Kebijakan Retur & Garansi</span>
                    </button>
                  </div>
                </form>
              )}

              {/* ------------------------------------------------------------- */}
              {/* SUB-TAB F: EDIT PENGATURAN GLOBAL & RUNNING TEXT              */}
              {/* ------------------------------------------------------------- */}
              {activePageTab === 'global' && (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    updateSiteSettings(draftSettings);
                  }}
                  className="space-y-6 text-xs"
                >
                  <div className="p-5 rounded-2xl bg-[#FAF9F5] border border-stone-200 space-y-4">
                    <div className="flex items-center justify-between border-b border-stone-200/60 pb-2">
                      <h4 className="font-bold text-slate-900 text-sm">Running Text Pengumuman & Nama Toko</h4>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Teks Running Banner / Bar Pengumuman Atas</label>
                      <textarea
                        rows={2}
                        value={draftSettings.announcementBarText}
                        onChange={(e) => setDraftSettings({ ...draftSettings, announcementBarText: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl font-medium"
                        placeholder="e.g. 🇸🇬 🇲🇾 🇮🇩 Pengiriman Resmi ke Seluruh Indonesia, Singapura, Malaysia, & ASEAN! Diskon 10% dengan Kode: HEMAT10"
                      />
                      <span className="text-[11px] text-slate-400 mt-1 block">
                        Teks ini langsung muncul di bagian paling atas website pada semua halaman.
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Nama Toko Online</label>
                        <input
                          type="text"
                          value={draftSettings.storeName}
                          onChange={(e) => setDraftSettings({ ...draftSettings, storeName: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl font-bold"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Slogan / Tagline Toko</label>
                        <input
                          type="text"
                          value={draftSettings.tagline}
                          onChange={(e) => setDraftSettings({ ...draftSettings, tagline: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-full bg-slate-900 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition active:scale-95"
                    >
                      <Save className="w-4 h-4 text-amber-300" />
                      <span>Simpan Pengaturan Global</span>
                    </button>
                  </div>
                </form>
              )}

            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: OVERVIEW DASHBOARD                                                 */}
          {/* ========================================================================= */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-3xl border border-stone-200/80 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-medium">Total Omset</span>
                    <BarChart3 className="w-4 h-4 text-amber-600" />
                  </div>
                  <span className="text-2xl font-bold text-slate-900 block">
                    Rp {totalRevenueIdr.toLocaleString('id-ID')}
                  </span>
                  <span className="text-[11px] text-emerald-600 font-semibold">
                    ↑ 18.4% dari bulan lalu
                  </span>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-stone-200/80 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-medium">Total Pesanan</span>
                    <ShoppingCart className="w-4 h-4 text-amber-600" />
                  </div>
                  <span className="text-2xl font-bold text-slate-900 block">
                    {ordersList.length} Pesanan
                  </span>
                  <span className="text-[11px] text-slate-500 font-light">
                    Wilayah: ID, MY, SG
                  </span>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-stone-200/80 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-medium">Katalog Aktif</span>
                    <Package className="w-4 h-4 text-amber-600" />
                  </div>
                  <span className="text-2xl font-bold text-slate-900 block">
                    {products.length} Produk
                  </span>
                  <span className="text-[11px] text-slate-500 font-light">
                    5 Kategori Pokok
                  </span>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-stone-200/80 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-medium">Peringatan Stok</span>
                    <AlertTriangle className="w-4 h-4 text-rose-500" />
                  </div>
                  <span className="text-2xl font-bold text-rose-600 block">
                    {lowStockCount} Item
                  </span>
                  <span className="text-[11px] text-rose-600 font-semibold">
                    Stok di bawah 30 unit
                  </span>
                </div>
              </div>

              {/* Quick Actions to Page CMS */}
              <div className="p-6 rounded-3xl bg-linear-to-r from-slate-900 to-slate-800 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
                <div className="space-y-1 text-center sm:text-left">
                  <span className="text-[11px] uppercase tracking-wider text-amber-400 font-bold block">
                    CMS Terpadu
                  </span>
                  <h4 className="text-lg font-bold">Ingin Mengubah Teks & Banner Halaman Toko?</h4>
                  <p className="text-xs text-slate-300 font-light">
                    Buka modul Kelola Halaman Website untuk mengganti teks promo, WhatsApp, dan isi halaman secara langsung.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('pages')}
                  className="px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition shadow-md shrink-0"
                >
                  Buka Pengelola Halaman →
                </button>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: KATALOG PRODUK & STOK                                             */}
          {/* ========================================================================= */}
          {activeTab === 'products' && (
            <div className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Katalog Produk & Persediaan Stok</h3>
                  <p className="text-xs text-slate-500 font-light">
                    Total {products.length} produk terdaftar dalam basis data toko.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Cari produk..."
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      className="pl-8 pr-3 py-1.5 rounded-full border border-stone-200 text-xs w-36 sm:w-44 bg-stone-50"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsExportModalOpen(true)}
                    className="px-3.5 py-2 rounded-full border border-stone-200 bg-stone-50 hover:bg-stone-100 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition shrink-0 cursor-pointer shadow-2xs"
                    title="Ekspor data produk untuk GitHub Desktop & sinkronisasi Cloud Firestore"
                  >
                    <Download className="w-3.5 h-3.5 text-amber-600" />
                    <span>Ekspor untuk GitHub</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsAddProductOpen(true)}
                    className="px-4 py-2 rounded-full bg-slate-900 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-1.5 transition shadow-sm shrink-0 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Tambah Produk</span>
                  </button>
                </div>
              </div>

              {/* Products Table */}
              <div className="overflow-x-auto border border-stone-200 rounded-2xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF9F5] border-b border-stone-200 text-slate-500 uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Produk</th>
                      <th className="py-3 px-4">Kategori</th>
                      <th className="py-3 px-4">Harga (IDR)</th>
                      <th className="py-3 px-4">Stok</th>
                      <th className="py-3 px-4">ASEAN</th>
                      <th className="py-3 px-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {displayProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-amber-50/30 transition">
                        <td className="py-3 px-4 flex items-center gap-3">
                          <img src={p.image} alt={p.name} className="w-10 h-10 rounded-xl object-cover border border-stone-200 shrink-0" />
                          <div>
                            <span className="font-bold text-slate-900 block">{p.name}</span>
                            <span className="text-[10px] text-slate-400">SKU: {p.slug}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded-full bg-stone-100 text-slate-700 text-[10px] font-semibold">
                            {p.category}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-bold text-slate-900">
                          Rp {p.priceIdr.toLocaleString('id-ID')}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`font-bold px-2 py-0.5 rounded-md text-[11px] ${
                            p.stock < 25 ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {p.stock} unit
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          {p.isAseanReady ? (
                            <span className="text-emerald-700 font-bold text-[11px]">✓ Siap</span>
                          ) : (
                            <span className="text-slate-400 text-[11px]">-</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right space-x-1.5">
                          <button
                            onClick={() => setEditingProduct(p)}
                            className="p-1.5 rounded-lg border border-stone-200 text-slate-600 hover:text-amber-700 hover:bg-amber-50"
                            title="Edit Produk"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Hapus produk "${p.name}"?`)) {
                                deleteProduct(p.id);
                              }
                            }}
                            className="p-1.5 rounded-lg border border-stone-200 text-slate-400 hover:text-rose-700 hover:bg-rose-50"
                            title="Hapus Produk"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 4: PESANAN & RESI PENGIRIMAN                                          */}
          {/* ========================================================================= */}
          {activeTab === 'orders' && (
            <div className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Daftar Pesanan & Resi Pengiriman</h3>
                  <p className="text-xs text-slate-500 font-light">
                    Kelola status pesanan masuk dan input nomor resi ekspedisi untuk pelacakan pelanggan.
                  </p>
                </div>

                <button
                  onClick={handleExportCSV}
                  className="px-4 py-2 rounded-full border border-stone-200 text-xs font-semibold text-slate-700 hover:bg-stone-50 flex items-center gap-1.5 shrink-0"
                >
                  <Download className="w-3.5 h-3.5 text-amber-600" />
                  <span>Ekspor CSV</span>
                </button>
              </div>

              <div className="space-y-4">
                {ordersList.map((order) => (
                  <div key={order.orderId} className="p-5 rounded-2xl border border-stone-200/90 bg-[#FAF9F5]/40 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200/60 pb-3">
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-slate-900 text-sm bg-white px-2.5 py-1 rounded-xl border border-stone-200 shadow-2xs">
                          {order.orderId}
                        </span>
                        <span className="text-xs text-slate-400">
                          {new Date(order.createdAt).toLocaleDateString('id-ID', { dateStyle: 'medium' })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Status:</span>
                        <select
                          value={order.status}
                          onChange={(e) => handleUpdateOrderStatus(order.orderId, e.target.value)}
                          className="text-xs font-bold px-3 py-1 rounded-full bg-white border border-stone-300 text-slate-800"
                        >
                          <option value="Menunggu Pembayaran">Menunggu Pembayaran</option>
                          <option value="Diproses">Diproses</option>
                          <option value="Sedang Dikirim">Sedang Dikirim</option>
                          <option value="Selesai">Selesai</option>
                          <option value="Dibatalkan">Dibatalkan</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Pelanggan</span>
                        <span className="font-bold text-slate-900 block">{order.customerName}</span>
                        <span className="text-slate-500 font-light">{order.customerPhone} ({order.country})</span>
                      </div>

                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Alamat Kirim</span>
                        <p className="text-slate-600 font-light line-clamp-2">{order.address}</p>
                      </div>

                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Total Transaksi</span>
                        <span className="font-bold text-emerald-800 text-sm block">
                          Rp {(order.grandTotal || 0).toLocaleString('id-ID')}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">Metode: {order.paymentMethod}</span>
                      </div>
                    </div>

                    {/* Tracking Number Input */}
                    <div className="pt-2 border-t border-stone-200/50 flex flex-wrap items-center gap-2">
                      <Truck className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span className="text-xs font-bold text-slate-700">No. Resi Kurir:</span>
                      <input
                        type="text"
                        defaultValue={order.trackingNumber || ''}
                        placeholder="e.g. JNE-CGK-1092819"
                        onBlur={(e) => handleUpdateTracking(order.orderId, e.target.value)}
                        className="px-3 py-1 bg-white border border-stone-200 rounded-lg text-xs font-mono text-slate-900 w-52"
                      />
                      <span className="text-[10px] text-slate-400 font-light">(Ketik & klik luar kolom untuk simpan)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 5: ARTIKEL EDUKASI & BLOG                                             */}
          {/* ========================================================================= */}
          {activeTab === 'content' && (
            <div className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Manajemen Artikel Edukasi & Blog</h3>
                  <p className="text-xs text-slate-500 font-light">
                    Kelola konten panduan gaya hidup sehat, nutrisi pangan, dan tips kebun untuk SEO & AI search.
                  </p>
                </div>

                <button
                  onClick={() => setIsAddBlogOpen(true)}
                  className="px-4 py-2 rounded-full bg-slate-900 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-1.5 transition shadow-sm shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Tambah Artikel</span>
                </button>
              </div>

              <div className="space-y-3">
                {blogPosts.map((post) => (
                  <div key={post.slug} className="p-4 rounded-2xl border border-stone-200 hover:border-amber-300 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img src={post.image} alt={post.titleId} className="w-12 h-12 rounded-xl object-cover shrink-0 border border-stone-200" />
                      <div>
                        <span className="text-[10px] font-bold text-amber-700 uppercase">{post.category}</span>
                        <h4 className="font-bold text-slate-900 text-sm leading-snug">{post.titleId}</h4>
                        <span className="text-xs text-slate-400 font-light">{post.date} • {post.readTime}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <Link
                        to={`/blog/${post.slug}`}
                        target="_blank"
                        className="px-3 py-1.5 rounded-full border border-stone-200 text-xs font-semibold text-slate-700 hover:bg-stone-50 shrink-0"
                      >
                        Lihat Live →
                      </Link>
                      <button
                        onClick={() => {
                          if (window.confirm(`Hapus artikel "${post.titleId}"?`)) {
                            deleteBlogPost(post.slug);
                          }
                        }}
                        className="p-1.5 rounded-lg border border-stone-200 text-slate-400 hover:text-rose-700 hover:bg-rose-50"
                        title="Hapus Artikel"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 6: KUPON & PROMOSI                                                    */}
          {/* ========================================================================= */}
          {activeTab === 'marketing' && (
            <div className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-xs space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Kupon Diskon & Promosi</h3>
                <p className="text-xs text-slate-500 font-light">
                  Kelola voucher potongan harga untuk keluarga di Indonesia dan Asia Tenggara.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(couponsList).map(([code, c]) => (
                  <div key={code} className="p-4 rounded-2xl bg-[#FAF9F5] border border-stone-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded text-xs">{code}</span>
                      <span className="text-xs font-bold text-emerald-700">Diskon {c.percent}%</span>
                    </div>
                    <p className="text-xs text-slate-600 font-light">{c.label}</p>
                    <span className="text-[10px] text-slate-400 block">Min. Belanja: Rp {c.minOrder.toLocaleString('id-ID')}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 7: SEO & AI SEARCH                                                    */}
          {/* ========================================================================= */}
          {activeTab === 'seo' && (
            <div className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-xs space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Pengaturan SEO Teknis & AI Search</h3>
                <p className="text-xs text-slate-500 font-light">
                  Optimasi keterbacaan Google Search, Meta Tags, Open Graph, dan AI Search (ChatGPT, Perplexity, Gemini).
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Global Store Meta Title</label>
                  <input
                    type="text"
                    readOnly
                    defaultValue="Manna Shop - Toko Online Terpadu Kebutuhan Harian Keluarga (Indonesia & Asia Tenggara)"
                    className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-800 mb-1">Global Store Meta Description</label>
                  <textarea
                    readOnly
                    rows={2}
                    defaultValue="Pusat belanja online keluarga harian: pakaian katun organik, sembako sehat beras & madu mentah, benih tanaman pekarangan & perlengkapan ramah lingkungan untuk pengiriman Indonesia, Singapura, Malaysia, dan Asia Tenggara."
                    className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl font-mono text-xs"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-stone-200 space-y-2">
                  <span className="font-bold text-slate-900 block">Status Structured Data Schema.org</span>
                  <div className="flex flex-wrap gap-2 text-[11px]">
                    <span className="px-2.5 py-1 bg-emerald-100 text-emerald-900 rounded-full font-bold">✓ Organization Schema</span>
                    <span className="px-2.5 py-1 bg-emerald-100 text-emerald-900 rounded-full font-bold">✓ Product & Offer Schema</span>
                    <span className="px-2.5 py-1 bg-emerald-100 text-emerald-900 rounded-full font-bold">✓ BreadcrumbList Schema</span>
                    <span className="px-2.5 py-1 bg-emerald-100 text-emerald-900 rounded-full font-bold">✓ FAQPage Schema</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 8: LAPORAN PENJUALAN                                                  */}
          {/* ========================================================================= */}
          {activeTab === 'reports' && (
            <div className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-xs space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Laporan Penjualan & Kinerja Toko</h3>
                <p className="text-xs text-slate-500 font-light">
                  Statistik performa penjualan berdasarkan kategori produk dan wilayah pengiriman.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-[#FAF9F5] border border-stone-200 space-y-3">
                  <h4 className="font-bold text-slate-900 text-sm">Distribusi Kategori Produk</h4>
                  <div className="space-y-2 text-xs">
                    {SHOP_CATEGORIES.map(c => {
                      const count = products.filter(p => p.category === c.slug).length;
                      return (
                        <div key={c.slug} className="flex justify-between items-center py-1 border-b border-stone-200/50">
                          <span className="text-slate-600">{c.nameId}</span>
                          <span className="font-bold text-slate-900">{count} item</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#FAF9F5] border border-stone-200 space-y-3">
                  <h4 className="font-bold text-slate-900 text-sm">Jalur Pengiriman Teraktif</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center py-1 border-b border-stone-200/50">
                      <span>🇮🇩 Indonesia (Jabodetabek & Jawa)</span>
                      <span className="font-bold text-emerald-700">65% Pengiriman</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-stone-200/50">
                      <span>🇲🇾 Malaysia (Kuala Lumpur & Selangor)</span>
                      <span className="font-bold text-emerald-700">20% Pengiriman</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-stone-200/50">
                      <span>🇸🇬 Singapura</span>
                      <span className="font-bold text-emerald-700">15% Pengiriman</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* EDIT PRODUCT MODAL */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-stone-200 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-stone-100 pb-3">
              <h4 className="font-bold text-base text-slate-900">Edit Produk: {editingProduct.name}</h4>
              <button onClick={() => setEditingProduct(null)} className="p-1 rounded-full text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Nama Produk</label>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Harga (IDR)</label>
                  <input
                    type="number"
                    value={editingProduct.priceIdr}
                    onChange={(e) => setEditingProduct({ ...editingProduct, priceIdr: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Stok Gudang (Unit)</label>
                  <input
                    type="number"
                    value={editingProduct.stock}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl"
                  />
                </div>
              </div>

              {/* PENGGANTI FOTO LANGSUNG DARI PERANGKAT */}
              <div className="space-y-2 p-3.5 bg-[#FAF9F5] rounded-2xl border border-stone-200">
                <div className="flex items-center justify-between">
                  <label className="block font-bold text-slate-800 text-xs">
                    Foto Produk (Langsung dari Perangkat)
                  </label>
                  <span className="text-[10px] text-amber-700 font-semibold bg-amber-100 px-2 py-0.5 rounded-full">
                    📷 File Upload
                  </span>
                </div>

                {editingProduct.image ? (
                  <div className="space-y-3">
                    <div className="relative aspect-4/3 w-full max-w-xs mx-auto rounded-2xl overflow-hidden border border-stone-200 bg-white shadow-sm">
                      <img
                        src={editingProduct.image}
                        alt="Preview Foto Produk"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        ✓ Foto Aktif
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-2">
                      <label className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition shadow-xs active:scale-95">
                        <Camera className="w-3.5 h-3.5" />
                        <span>Pilih Foto Baru dari HP / Laptop</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              compressAndConvertImage(file, (dataUrl) => {
                                setEditingProduct({ ...editingProduct, image: dataUrl });
                              });
                            }
                          }}
                        />
                      </label>

                      <button
                        type="button"
                        onClick={() => setEditingProduct({ ...editingProduct, image: '' })}
                        className="px-3 py-2 rounded-xl border border-stone-200 text-slate-500 hover:text-rose-600 hover:bg-rose-50 text-xs transition"
                      >
                        Hapus Foto
                      </button>
                    </div>
                  </div>
                ) : (
                  <label className="cursor-pointer border-2 border-dashed border-stone-300 hover:border-amber-500 bg-white hover:bg-amber-50/40 rounded-2xl p-6 flex flex-col items-center justify-center text-center transition group block">
                    <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-2 group-hover:scale-105 transition">
                      <Upload className="w-6 h-6 text-amber-700" />
                    </div>
                    <span className="font-bold text-slate-800 text-xs block group-hover:text-amber-800">
                      Klik untuk Memilih Foto Langsung dari Galeri / Kamera
                    </span>
                    <span className="text-[11px] text-slate-400 font-light mt-0.5 block">
                      Mendukung format JPG, PNG, WEBP langsung dari perangkat
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          compressAndConvertImage(file, (dataUrl) => {
                            setEditingProduct({ ...editingProduct, image: dataUrl });
                          });
                        }
                      }}
                    />
                  </label>
                )}
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Deskripsi Singkat</label>
                <textarea
                  rows={2}
                  value={editingProduct.shortDescId}
                  onChange={(e) => setEditingProduct({ ...editingProduct, shortDescId: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setEditingProduct(null)}
                className="px-4 py-2 rounded-full border border-stone-200 text-xs font-semibold text-slate-700"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  updateProduct(editingProduct);
                  setEditingProduct(null);
                }}
                className="px-5 py-2 rounded-full bg-slate-900 hover:bg-amber-600 text-white text-xs font-bold transition shadow-sm"
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD PRODUCT MODAL */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-stone-200 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-stone-100 pb-3">
              <h4 className="font-bold text-base text-slate-900">Tambah Produk Baru ke Toko</h4>
              <button onClick={() => setIsAddProductOpen(false)} className="p-1 rounded-full text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const target = e.target as any;
                const newProd: ShopProduct = {
                  id: `cust-${Date.now().toString().slice(-4)}`,
                  slug: target.name.value.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-'),
                  name: target.name.value,
                  nameEn: target.name.value,
                  category: target.category.value,
                  categoryLabelId: target.category.value === 'pakaian' ? 'Pakaian Keluarga' : target.category.value === 'makanan' ? 'Bahan Makanan Sehat' : target.category.value === 'tanaman' ? 'Tanaman & Bibit' : 'Kebutuhan Harian',
                  categoryLabelEn: 'Family Product',
                  priceIdr: Number(target.price.value),
                  weightGrams: Number(target.weight.value || 500),
                  rating: 5.0,
                  reviewCount: 1,
                  stock: Number(target.stock.value || 50),
                  image: newProductImage || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800',
                  badges: ['Produk Baru'],
                  isBestSeller: false,
                  isAseanReady: true,
                  shortDescId: target.desc.value,
                  shortDescEn: target.desc.value,
                  descriptionId: target.desc.value,
                  descriptionEn: target.desc.value,
                  specs: [{ labelId: 'Kondisi', labelEn: 'Condition', value: 'Baru & Segel' }]
                };
                addProduct(newProd);
                setNewProductImage('');
                setIsAddProductOpen(false);
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="block font-medium text-slate-700 mb-1">Nama Produk *</label>
                <input required name="name" type="text" placeholder="e.g. Minyak Wijen Organik 250ml" className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Kategori *</label>
                  <select name="category" className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl">
                    <option value="makanan">Bahan Makanan Sehat</option>
                    <option value="pakaian">Pakaian Keluarga</option>
                    <option value="tanaman">Tanaman & Bibit</option>
                    <option value="harian">Kebutuhan Harian</option>
                    <option value="paket">Paket Bundling</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Harga (IDR) *</label>
                  <input required name="price" type="number" placeholder="50000" className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Stok Awal (Unit) *</label>
                  <input required name="stock" type="number" defaultValue="50" className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl" />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Berat (Gram)</label>
                  <input name="weight" type="number" defaultValue="500" className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl" />
                </div>
              </div>

              {/* UNGGAH FOTO LANGSUNG DARI PERANGKAT */}
              <div className="space-y-2 p-3.5 bg-[#FAF9F5] rounded-2xl border border-stone-200">
                <div className="flex items-center justify-between">
                  <label className="block font-bold text-slate-800 text-xs">
                    Foto Produk (Pilih Langsung dari Perangkat)
                  </label>
                  <span className="text-[10px] text-amber-700 font-semibold bg-amber-100 px-2 py-0.5 rounded-full">
                    📷 File Upload
                  </span>
                </div>

                {newProductImage ? (
                  <div className="space-y-3">
                    <div className="relative aspect-4/3 w-full max-w-xs mx-auto rounded-2xl overflow-hidden border border-stone-200 bg-white shadow-sm">
                      <img
                        src={newProductImage}
                        alt="Preview Foto Produk Baru"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        ✓ Foto Terpilih
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-2">
                      <label className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition shadow-xs active:scale-95">
                        <Camera className="w-3.5 h-3.5" />
                        <span>Ganti Foto</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              compressAndConvertImage(file, (dataUrl) => {
                                setNewProductImage(dataUrl);
                              });
                            }
                          }}
                        />
                      </label>

                      <button
                        type="button"
                        onClick={() => setNewProductImage('')}
                        className="px-3 py-2 rounded-xl border border-stone-200 text-slate-500 hover:text-rose-600 hover:bg-rose-50 text-xs transition"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                ) : (
                  <label className="cursor-pointer border-2 border-dashed border-stone-300 hover:border-amber-500 bg-white hover:bg-amber-50/40 rounded-2xl p-6 flex flex-col items-center justify-center text-center transition group block">
                    <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-2 group-hover:scale-105 transition">
                      <Upload className="w-6 h-6 text-amber-700" />
                    </div>
                    <span className="font-bold text-slate-800 text-xs block group-hover:text-amber-800">
                      Klik untuk Memilih Foto Langsung dari HP / Laptop
                    </span>
                    <span className="text-[11px] text-slate-400 font-light mt-0.5 block">
                      Pilih dari Galeri, Kamera, atau File Komputer (Otomatis dioptimalkan)
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          compressAndConvertImage(file, (dataUrl) => {
                            setNewProductImage(dataUrl);
                          });
                        }
                      }}
                    />
                  </label>
                )}
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Deskripsi Produk *</label>
                <textarea required name="desc" rows={3} placeholder="Jelaskan keunggulan dan kegunaan produk..." className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl" />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(false)}
                  className="px-4 py-2 rounded-full border border-stone-200 text-xs font-semibold text-slate-700"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-slate-900 hover:bg-amber-600 text-white text-xs font-bold transition shadow-sm"
                >
                  Tambah ke Toko
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD BLOG POST MODAL */}
      {isAddBlogOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-stone-200 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-stone-100 pb-3">
              <h4 className="font-bold text-base text-slate-900">Tulis Artikel Edukasi Baru</h4>
              <button onClick={() => setIsAddBlogOpen(false)} className="p-1 rounded-full text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const target = e.target as any;
                const newPost: ShopBlogPost = {
                  slug: target.title.value.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-'),
                  titleId: target.title.value,
                  titleEn: target.title.value,
                  category: target.category.value,
                  date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
                  readTime: `${target.readTime.value || '4'} min baca`,
                  image: newBlogImage || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800',
                  excerptId: target.excerpt.value,
                  excerptEn: target.excerpt.value,
                  contentId: [target.content.value],
                  contentEn: [target.content.value],
                  relatedProductSlug: ''
                };
                addBlogPost(newPost);
                setNewBlogImage('');
                setIsAddBlogOpen(false);
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="block font-medium text-slate-700 mb-1">Judul Artikel *</label>
                <input required name="title" type="text" placeholder="e.g. 5 Rahasia Memilih Sayur Bebas Kimia" className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Kategori *</label>
                  <select name="category" className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl">
                    <option value="Gaya Hidup & Nutrisi">Gaya Hidup & Nutrisi</option>
                    <option value="Tips Kebun & Bibit">Tips Kebun & Bibit</option>
                    <option value="Pakaian & Alergi Anak">Pakaian & Alergi Anak</option>
                    <option value="Perawatan Ramah Lingkungan">Perawatan Ramah Lingkungan</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Estimasi Waktu Baca (Menit)</label>
                  <input name="readTime" type="number" defaultValue="4" className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl" />
                </div>
              </div>

              {/* UNGGAH GAMBAR ARTIKEL LANGSUNG DARI PERANGKAT */}
              <div className="space-y-2 p-3 bg-[#FAF9F5] rounded-2xl border border-stone-200">
                <div className="flex items-center justify-between">
                  <label className="block font-bold text-slate-800 text-xs">
                    Gambar Sampul Artikel
                  </label>
                  <span className="text-[10px] text-amber-700 font-semibold bg-amber-100 px-2 py-0.5 rounded-full">
                    📷 File Upload
                  </span>
                </div>

                {newBlogImage ? (
                  <div className="space-y-2">
                    <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-stone-200 bg-white">
                      <img
                        src={newBlogImage}
                        alt="Preview Sampul Blog"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex justify-center gap-2">
                      <label className="cursor-pointer inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[11px] transition shadow-xs">
                        <Camera className="w-3 h-3" />
                        <span>Ganti Gambar</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              compressAndConvertImage(file, (dataUrl) => {
                                setNewBlogImage(dataUrl);
                              });
                            }
                          }}
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => setNewBlogImage('')}
                        className="px-2.5 py-1.5 rounded-lg border border-stone-200 text-slate-500 hover:text-rose-600 text-[11px]"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                ) : (
                  <label className="cursor-pointer border-2 border-dashed border-stone-300 hover:border-amber-500 bg-white hover:bg-amber-50/40 rounded-xl p-4 flex flex-col items-center justify-center text-center transition group block">
                    <Upload className="w-5 h-5 text-amber-700 mb-1 group-hover:scale-105 transition" />
                    <span className="font-bold text-slate-800 text-xs block group-hover:text-amber-800">
                      Pilih Foto Sampul dari HP / Laptop
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Otomatis dioptimalkan untuk web
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          compressAndConvertImage(file, (dataUrl) => {
                            setNewBlogImage(dataUrl);
                          });
                        }
                      }}
                    />
                  </label>
                )}
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Ringkasan Singkat (Excerpt)</label>
                <textarea required name="excerpt" rows={2} placeholder="Ringkasan 1-2 kalimat untuk kartu artikel..." className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl" />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Konten Lengkap Artikel</label>
                <textarea required name="content" rows={5} placeholder="Tulis isi panduan atau artikel di sini..." className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl" />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddBlogOpen(false)}
                  className="px-4 py-2 rounded-full border border-stone-200 text-xs font-semibold text-slate-700"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-slate-900 hover:bg-amber-600 text-white text-xs font-bold transition shadow-sm"
                >
                  Terbitkan Artikel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL EKSPOR DATA PRODUK UNTUK GITHUB & CLOUD */}
      {isExportModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-5 shadow-2xl border border-stone-200 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                  📦
                </div>
                <div>
                  <h4 className="font-bold text-base text-slate-900">Ekspor Data Produk untuk GitHub</h4>
                  <p className="text-[11px] text-slate-500">Simpan produk permanen ke repositori kode atau Cloud</p>
                </div>
              </div>
              <button onClick={() => setIsExportModalOpen(false)} className="p-1 rounded-full text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-amber-50/60 border border-amber-200/60 p-4 rounded-2xl text-xs text-amber-900 space-y-2 leading-relaxed">
              <p className="font-bold">ℹ️ Mengapa Perlu Ekspor ke GitHub?</p>
              <p className="text-[11px] text-slate-700">
                Produk yang Anda tambah di Admin Panel disimpan di penyimpanan perangkat Anda dan Cloud Firestore. Agar produk ini menjadi <strong>data bawaan permanen di repositori GitHub & GitHub Desktop</strong> (sehingga otomatis tampil di semua browser dan deploy web):
              </p>
              <ol className="list-decimal pl-4 text-[11px] space-y-1 text-slate-700">
                <li>Klik tombol <strong>Salin Kode Produk (SHOP_PRODUCTS)</strong> di bawah.</li>
                <li>Buka file <code className="bg-amber-100 px-1 py-0.5 rounded font-mono text-slate-900">src/data/shopData.ts</code> di editor Anda atau kirimkan ke chat Antigravity.</li>
                <li>Tempel (paste) kode ke baris <code className="bg-amber-100 px-1 py-0.5 rounded font-mono text-slate-900">export const SHOP_PRODUCTS = [...]</code>, lalu push ke GitHub Desktop!</li>
              </ol>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800">Pratinjau Data ({products.length} Produk Siap Ekspor):</span>
                <span className="text-[11px] text-slate-500">Format: TypeScript Array</span>
              </div>
              
              <div className="relative">
                <pre className="bg-slate-950 text-amber-300 p-4 rounded-2xl text-[11px] font-mono max-h-48 overflow-y-auto overflow-x-auto border border-slate-800">
                  {`export const SHOP_PRODUCTS: ShopProduct[] = ${JSON.stringify(products, null, 2)};`}
                </pre>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-amber-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-sm cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5 text-amber-300" />
                  <span>{copiedCode ? '✓ Berhasil Disalin!' : 'Salin Kode SHOP_PRODUCTS'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadProductsJson}
                  className="w-full py-2.5 px-4 rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-amber-600" />
                  <span>Download File JSON</span>
                </button>
              </div>

              {/* Cloud Sync Button */}
              <div className="pt-2 border-t border-stone-100">
                <button
                  type="button"
                  disabled={isSyncingCloud}
                  onClick={handleSyncAllToCloud}
                  className="w-full py-2.5 px-4 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-950 font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer disabled:opacity-50"
                >
                  <Cloud className="w-3.5 h-3.5 text-amber-700" />
                  <span>{isSyncingCloud ? 'Sedang Menyinkronkan...' : '☁️ Sinkronkan Semua Produk ke Cloud Firestore Sekarang'}</span>
                </button>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setIsExportModalOpen(false)}
                className="px-5 py-2 rounded-full border border-stone-200 text-xs font-semibold text-slate-700 hover:bg-stone-50"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
