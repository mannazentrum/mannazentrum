import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import { 
  SHOP_PRODUCTS, 
  SHOP_CATEGORIES, 
  SHOP_BLOG_POSTS, 
  DISCOUNT_COUPONS,
  ShopProduct,
  ShopBlogPost
} from '../../data/shopData';
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
  MessageCircle
} from 'lucide-react';

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
  // Auth State
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('manna_shop_admin_user_session');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { }
      }
    }
    return null;
  });

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'customers' | 'marketing' | 'content' | 'seo' | 'reports'>('overview');

  // Products Data State (Initialized from SHOP_PRODUCTS or LocalStorage)
  const [productsList, setProductsList] = useState<ShopProduct[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('manna_shop_admin_products_v1');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { }
      }
    }
    return SHOP_PRODUCTS;
  });

  // Orders State (Stored in LocalStorage)
  const [ordersList, setOrdersList] = useState<any[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('manna_shop_admin_orders_v1');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { }
      }
    }
    // Initial sample orders for fresh look
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
  const [couponsList, setCouponsList] = useState(DISCOUNT_COUPONS);

  // Blog Posts State
  const [blogList, setBlogList] = useState<ShopBlogPost[]>(SHOP_BLOG_POSTS);

  // Product Edit Modal State
  const [editingProduct, setEditingProduct] = useState<ShopProduct | null>(null);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  // Save product state changes
  useEffect(() => {
    localStorage.setItem('manna_shop_admin_products_v1', JSON.stringify(productsList));
  }, [productsList]);

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
    if (role === 'CONTENT_EDITOR') return tab === 'overview' || tab === 'content' || tab === 'marketing' || tab === 'seo';
    if (role === 'CUSTOMER_SERVICE') return tab === 'overview' || tab === 'orders' || tab === 'customers';
    if (role === 'FINANCE') return tab === 'overview' || tab === 'orders' || tab === 'reports';
    return false;
  };

  // Update order status
  const handleUpdateOrderStatus = (orderId: string, newStatus: string) => {
    setOrdersList(prev => prev.map(order => order.orderId === orderId ? { ...order, status: newStatus } : order));
  };

  // Update tracking number
  const handleUpdateTracking = (orderId: string, trackingNumber: string) => {
    setOrdersList(prev => prev.map(order => order.orderId === orderId ? { ...order, trackingNumber } : order));
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
  const lowStockCount = productsList.filter(p => p.stock < 30).length;

  // IF NOT LOGGED IN -> SHOW EMPLOYEE LOGIN SCREEN
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#FAF9F5] flex flex-col justify-center items-center p-4 font-sans text-slate-800">
        <SEO 
          title="Staff Login - Mannazentrum Shop Employee CMS"
          description="Portal masuk staf dan pengelola toko online Mannazentrum Shop."
          canonicalPath="/admin/shop"
        />

        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-stone-200/80 p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-bold text-xl mx-auto shadow-sm">
              M
            </div>
            <h1 className="text-2xl font-light text-slate-900 tracking-tight">
              Portal Staf Mannazentrum Shop
            </h1>
            <p className="text-xs text-slate-500 font-light">
              Pilih peran akun karyawan Anda untuk mengelola inventaris, pesanan, dan operasional toko harian:
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
        title="Admin & Employee CMS - Mannazentrum Shop"
        description="Pusat kendali dan manajemen operasional e-commerce Mannazentrum Shop."
        canonicalPath="/admin/shop"
      />

      {/* Top Admin Navbar */}
      <header className="bg-slate-900 text-white px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between border-b border-slate-800 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-xl bg-white text-slate-900 font-bold flex items-center justify-center text-sm group-hover:bg-amber-400 transition">
              M
            </div>
            <div>
              <span className="font-bold text-sm text-white block leading-tight">
                Mannazentrum <span className="text-amber-400 font-light">CMS</span>
              </span>
              <span className="text-[9px] uppercase tracking-wider text-slate-400">Employee Portal</span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <span className="font-bold text-xs text-white block">{currentUser.name}</span>
            <span className="text-[10px] text-amber-300 font-semibold bg-slate-800 px-2 py-0.5 rounded-full inline-block">
              {currentUser.roleLabel}
            </span>
          </div>

          <Link
            to="/"
            target="_blank"
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
            title="Lihat Website Toko Langsung"
          >
            <ExternalLink className="w-4 h-4" />
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
        <nav className="lg:col-span-3 space-y-1 bg-white p-3.5 rounded-3xl border border-stone-200/80 shadow-xs h-fit">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-3 py-2">
            Modul Operasional Toko
          </p>

          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition ${
              activeTab === 'overview'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-stone-50'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 text-amber-400" />
            <span>A. Overview Dashboard</span>
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
              <span>B. Produk & Stok</span>
            </div>
            {!canAccess('products') && <Lock className="w-3 h-3 text-slate-400" />}
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
              <span>C. Pesanan Masuk</span>
            </div>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-900">
              {ordersList.length}
            </span>
          </button>

          <button
            onClick={() => canAccess('customers') && setActiveTab('customers')}
            disabled={!canAccess('customers')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition ${
              !canAccess('customers') ? 'opacity-40 cursor-not-allowed text-slate-400' :
              activeTab === 'customers'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-stone-50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Users className="w-4 h-4 text-amber-400" />
              <span>D. Pelanggan</span>
            </div>
            {!canAccess('customers') && <Lock className="w-3 h-3 text-slate-400" />}
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
              <span>E. Kupon & Promo</span>
            </div>
            {!canAccess('marketing') && <Lock className="w-3 h-3 text-slate-400" />}
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
              <span>F. Blog & Edukasi</span>
            </div>
            {!canAccess('content') && <Lock className="w-3 h-3 text-slate-400" />}
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
              <span>G. SEO & Meta Search</span>
            </div>
            {!canAccess('seo') && <Lock className="w-3 h-3 text-slate-400" />}
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
              <span>H. Laporan & Kinerja</span>
            </div>
            {!canAccess('reports') && <Lock className="w-3 h-3 text-slate-400" />}
          </button>

        </nav>

        {/* Content Panel Area */}
        <main className="lg:col-span-9 space-y-6">
          
          {/* TAB A: OVERVIEW DASHBOARD */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Metric Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-3xl border border-stone-200/80 shadow-xs space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Pendapatan</span>
                  <span className="text-xl sm:text-2xl font-bold text-slate-900 block">
                    Rp {totalRevenueIdr.toLocaleString('id-ID')}
                  </span>
                  <span className="text-[10px] text-amber-700 font-medium">Berdasarkan pesanan masuk</span>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-stone-200/80 shadow-xs space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Pesanan</span>
                  <span className="text-xl sm:text-2xl font-bold text-slate-900 block">
                    {ordersList.length} Order
                  </span>
                  <span className="text-[10px] text-slate-500 font-light">Domestik ID & ASEAN</span>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-stone-200/80 shadow-xs space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Katalog Produk</span>
                  <span className="text-xl sm:text-2xl font-bold text-slate-900 block">
                    {productsList.length} Produk
                  </span>
                  <span className="text-[10px] text-slate-500 font-light">5 Kategori Aktif</span>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-stone-200/80 shadow-xs space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Stok Menipis</span>
                  <span className="text-xl sm:text-2xl font-bold text-amber-600 block">
                    {lowStockCount} Produk
                  </span>
                  <span className="text-[10px] text-amber-700 font-medium">Perlu restock segera</span>
                </div>
              </div>

              {/* Recent Orders in Overview */}
              <div className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base text-slate-900">Pesanan Pelanggan Terbaru</h3>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs text-amber-700 font-semibold hover:underline"
                  >
                    Lihat Semua ({ordersList.length}) →
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-stone-100 text-slate-400 uppercase text-[10px]">
                        <th className="py-2.5 font-bold">No. Order</th>
                        <th className="py-2.5 font-bold">Pelanggan</th>
                        <th className="py-2.5 font-bold">Negara</th>
                        <th className="py-2.5 font-bold">Total</th>
                        <th className="py-2.5 font-bold">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {ordersList.slice(0, 5).map(o => (
                        <tr key={o.orderId} className="hover:bg-stone-50">
                          <td className="py-3 font-mono font-bold text-slate-900">{o.orderId}</td>
                          <td className="py-3 font-medium text-slate-800">{o.customerName}</td>
                          <td className="py-3 text-slate-600">{o.country}</td>
                          <td className="py-3 font-bold text-slate-900">Rp {o.grandTotal.toLocaleString('id-ID')}</td>
                          <td className="py-3">
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900">
                              {o.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB B: PRODUCTS & STOCK MANAGEMENT */}
          {activeTab === 'products' && (
            <div className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Manajemen Produk & Stok</h3>
                  <p className="text-xs text-slate-500 font-light">
                    Karyawan dapat memperbarui harga, jumlah stok gudang, dan status ketersediaan barang.
                  </p>
                </div>

                <button
                  onClick={() => setIsAddProductOpen(true)}
                  className="bg-slate-900 hover:bg-amber-600 text-white px-4 py-2 rounded-full text-xs font-semibold transition flex items-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Produk Baru</span>
                </button>
              </div>

              {/* Products Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-stone-200 text-slate-400 uppercase text-[10px]">
                      <th className="py-2.5 font-bold">SKU</th>
                      <th className="py-2.5 font-bold">Nama Produk</th>
                      <th className="py-2.5 font-bold">Kategori</th>
                      <th className="py-2.5 font-bold">Harga</th>
                      <th className="py-2.5 font-bold">Stok</th>
                      <th className="py-2.5 font-bold">Kirim ASEAN</th>
                      <th className="py-2.5 font-bold text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {productsList.map((p) => (
                      <tr key={p.id} className="hover:bg-stone-50">
                        <td className="py-3 font-mono font-bold text-slate-900">{p.id.toUpperCase()}</td>
                        <td className="py-3 font-medium text-slate-800">
                          <div className="flex items-center gap-2">
                            <img src={p.image} alt={p.name} className="w-8 h-8 rounded-lg object-cover shrink-0" />
                            <span className="line-clamp-1">{p.name}</span>
                          </div>
                        </td>
                        <td className="py-3 text-amber-700 font-semibold">{p.categoryLabelId}</td>
                        <td className="py-3 font-bold text-slate-900">Rp {p.priceIdr.toLocaleString('id-ID')}</td>
                        <td className="py-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${p.stock < 30 ? 'bg-rose-100 text-rose-800' : 'bg-stone-100 text-slate-700'}`}>
                            {p.stock} unit
                          </span>
                        </td>
                        <td className="py-3 text-center">
                          {p.isAseanReady ? <span className="text-emerald-600 font-bold">✓ Ya</span> : <span className="text-slate-400">-</span>}
                        </td>
                        <td className="py-3 text-right">
                          <button
                            onClick={() => setEditingProduct(p)}
                            className="p-1.5 rounded-lg text-slate-600 hover:text-amber-600 hover:bg-stone-100 transition mr-1"
                            title="Edit Produk"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB C: ORDER MANAGEMENT */}
          {activeTab === 'orders' && (
            <div className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Manajemen Pesanan Masuk</h3>
                  <p className="text-xs text-slate-500 font-light">
                    Kelola status pengiriman, masukkan nomor resi ekspedisi, dan pantau status pesanan.
                  </p>
                </div>

                <button
                  onClick={handleExportCSV}
                  className="border border-stone-200 hover:bg-stone-50 text-slate-700 px-4 py-2 rounded-full text-xs font-semibold transition flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV Logistik</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-stone-200 text-slate-400 uppercase text-[10px]">
                      <th className="py-2.5 font-bold">No. Order</th>
                      <th className="py-2.5 font-bold">Pelanggan</th>
                      <th className="py-2.5 font-bold">Tujuan</th>
                      <th className="py-2.5 font-bold">Total</th>
                      <th className="py-2.5 font-bold">Pembayaran</th>
                      <th className="py-2.5 font-bold">Status</th>
                      <th className="py-2.5 font-bold">No. Resi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {ordersList.map((order) => (
                      <tr key={order.orderId} className="hover:bg-stone-50">
                        <td className="py-3 font-mono font-bold text-slate-900">{order.orderId}</td>
                        <td className="py-3">
                          <span className="font-bold text-slate-900 block">{order.customerName}</span>
                          <span className="text-[10px] text-slate-400 font-light">{order.customerPhone}</span>
                        </td>
                        <td className="py-3 text-slate-600">{order.country}</td>
                        <td className="py-3 font-bold text-slate-900">Rp {order.grandTotal.toLocaleString('id-ID')}</td>
                        <td className="py-3">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-stone-100 text-slate-700 uppercase">
                            {order.paymentMethod}
                          </span>
                        </td>
                        <td className="py-3">
                          <select
                            value={order.status}
                            onChange={(e) => handleUpdateOrderStatus(order.orderId, e.target.value)}
                            className="bg-amber-50 border border-amber-200 text-amber-900 font-semibold text-[11px] rounded-lg px-2 py-1 outline-hidden"
                          >
                            <option value="Menunggu Konfirmasi">Menunggu Konfirmasi</option>
                            <option value="Diproses">Diproses Gudang</option>
                            <option value="Sedang Dikirim">Sedang Dikirim</option>
                            <option value="Selesai">Selesai Diterima</option>
                          </select>
                        </td>
                        <td className="py-3">
                          <input
                            type="text"
                            placeholder="Input No Resi..."
                            defaultValue={order.trackingNumber}
                            onBlur={(e) => handleUpdateTracking(order.orderId, e.target.value)}
                            className="px-2 py-1 bg-stone-50 border border-stone-200 rounded-lg text-xs w-36 font-mono"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB D: CUSTOMERS */}
          {activeTab === 'customers' && (
            <div className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-xs space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Database Pelanggan Toko</h3>
                <p className="text-xs text-slate-500 font-light">
                  Daftar kontak pembeli yang pernah melakukan transaksi di Mannazentrum Shop.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-stone-200 text-slate-400 uppercase text-[10px]">
                      <th className="py-2.5 font-bold">Nama Pembeli</th>
                      <th className="py-2.5 font-bold">Kontak WhatsApp</th>
                      <th className="py-2.5 font-bold">Negara</th>
                      <th className="py-2.5 font-bold text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {ordersList.map((o, idx) => (
                      <tr key={idx} className="hover:bg-stone-50">
                        <td className="py-3 font-bold text-slate-900">{o.customerName}</td>
                        <td className="py-3 text-slate-600">{o.customerPhone}</td>
                        <td className="py-3 text-slate-600">{o.country}</td>
                        <td className="py-3 text-right">
                          <a
                            href={`https://wa.me/${o.customerPhone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-full font-semibold text-[11px]"
                          >
                            <MessageCircle className="w-3 h-3" />
                            <span>Hubungi WA</span>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB E: MARKETING & COUPONS */}
          {activeTab === 'marketing' && (
            <div className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-xs space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Manajemen Kupon & Diskon Promosi</h3>
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

          {/* TAB F: CONTENT MANAGEMENT (BLOG) */}
          {activeTab === 'content' && (
            <div className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-xs space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Manajemen Artikel Edukasi & Blog</h3>
                <p className="text-xs text-slate-500 font-light">
                  Kelola konten panduan gaya hidup sehat, nutrisi pangan, dan tips kebun untuk SEO & AI search.
                </p>
              </div>

              <div className="space-y-3">
                {blogList.map((post) => (
                  <div key={post.slug} className="p-4 rounded-2xl border border-stone-200 hover:border-amber-300 transition flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-bold text-amber-700 uppercase">{post.category}</span>
                      <h4 className="font-bold text-slate-900 text-sm">{post.titleId}</h4>
                      <span className="text-xs text-slate-400 font-light">{post.date} • {post.readTime}</span>
                    </div>
                    <Link
                      to={`/blog/${post.slug}`}
                      target="_blank"
                      className="px-3 py-1.5 rounded-full border border-stone-200 text-xs font-semibold text-slate-700 hover:bg-stone-50 shrink-0"
                    >
                      Lihat Artikel →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB G: SEO & META SEARCH */}
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
                    defaultValue="Mannazentrum Shop - Toko Online Terpadu Kebutuhan Harian Keluarga (Indonesia & Asia Tenggara)"
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

          {/* TAB H: REPORTS & PERFORMANCE */}
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
                      const count = productsList.filter(p => p.category === c.slug).length;
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
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-stone-200">
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
                  defaultValue={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Harga (IDR)</label>
                  <input
                    type="number"
                    defaultValue={editingProduct.priceIdr}
                    onChange={(e) => setEditingProduct({ ...editingProduct, priceIdr: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Stok Gudang (Unit)</label>
                  <input
                    type="number"
                    defaultValue={editingProduct.stock}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Deskripsi Singkat</label>
                <textarea
                  rows={2}
                  defaultValue={editingProduct.shortDescId}
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
                  setProductsList(prev => prev.map(p => p.id === editingProduct.id ? editingProduct : p));
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
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-stone-200">
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
                  slug: target.name.value.toLowerCase().replace(/[^a-z0-9]/g, '-'),
                  name: target.name.value,
                  nameEn: target.name.value,
                  category: target.category.value,
                  categoryLabelId: target.category.value === 'pakaian' ? 'Pakaian Keluarga' : target.category.value === 'makanan' ? 'Bahan Makanan Sehat' : 'Tanaman & Bibit',
                  categoryLabelEn: 'Family Product',
                  priceIdr: Number(target.price.value),
                  weightGrams: Number(target.weight.value),
                  rating: 5.0,
                  reviewCount: 1,
                  stock: Number(target.stock.value),
                  image: target.image.value || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800',
                  badges: ['Produk Baru'],
                  isBestSeller: false,
                  isAseanReady: true,
                  shortDescId: target.desc.value,
                  shortDescEn: target.desc.value,
                  descriptionId: target.desc.value,
                  descriptionEn: target.desc.value,
                  specs: [{ labelId: 'Kondisi', labelEn: 'Condition', value: 'Baru & Segel' }]
                };
                setProductsList([newProd, ...productsList]);
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
                  <input required name="stock" type="number" placeholder="50" className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl" />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Berat (Gram) *</label>
                  <input required name="weight" type="number" placeholder="500" className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl" />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">URL Gambar Produk (Unsplash / CDN)</label>
                <input name="image" type="url" placeholder="https://images.unsplash.com/..." className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl" />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Deskripsi Produk *</label>
                <textarea required name="desc" rows={2} placeholder="Penjelasan manfaat dan keunggulan bahan alami..." className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl" />
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
                  Tambahkan Produk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
