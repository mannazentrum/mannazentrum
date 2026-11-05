import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SplashScreen from './components/SplashScreen';
import { Analytics } from '@vercel/analytics/react';
import { ShopProvider } from './context/ShopContext';

// Lazy loaded page components for optimal bundle splitting
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Daycare = lazy(() => import('./pages/Daycare'));
const Preschool = lazy(() => import('./pages/Preschool'));
const News = lazy(() => import('./pages/News'));
const BusinessUnitsPage = lazy(() => import('./pages/BusinessUnitsPage'));
const Contact = lazy(() => import('./pages/Contact'));
const ReportPortal = lazy(() => import('./pages/ReportPortal'));

// Store & Subdomain Pages (shop.mannazentrum.com)
const Store = lazy(() => import('./pages/Store'));
const ShopCategoryPage = lazy(() => import('./pages/shop/ShopCategoryPage').then(m => ({ default: m.ShopCategoryPage })));
const ShopProductPage = lazy(() => import('./pages/shop/ShopProductPage').then(m => ({ default: m.ShopProductPage })));
const ShopAboutPage = lazy(() => import('./pages/shop/ShopAboutPage').then(m => ({ default: m.ShopAboutPage })));
const ShopContactPage = lazy(() => import('./pages/shop/ShopContactPage').then(m => ({ default: m.ShopContactPage })));
const ShopShippingPolicyPage = lazy(() => import('./pages/shop/ShopShippingPolicyPage').then(m => ({ default: m.ShopShippingPolicyPage })));
const ShopReturnPolicyPage = lazy(() => import('./pages/shop/ShopReturnPolicyPage').then(m => ({ default: m.ShopReturnPolicyPage })));
const ShopBlogPage = lazy(() => import('./pages/shop/ShopBlogPage').then(m => ({ default: m.ShopBlogPage })));
const ShopAdminDashboard = lazy(() => import('./pages/shop/ShopAdminDashboard').then(m => ({ default: m.ShopAdminDashboard })));

// Redirect helper to official shop subdomain
const RedirectToShop: React.FC = () => {
  useEffect(() => {
    window.location.replace('https://shop.mannazentrum.com');
  }, []);
  return null;
};

// Redirect helper to official student report portal
const RedirectToReportPortal: React.FC = () => {
  useEffect(() => {
    window.location.replace('https://laporan.mannazentrum.com');
  }, []);
  return null;
};

const App: React.FC = () => {
  const isShopSubdomain = typeof window !== 'undefined' && (
    window.location.hostname === 'shop.mannazentrum.com' ||
    window.location.hostname.startsWith('shop.') ||
    window.location.search.includes('view=shop') ||
    window.location.search.includes('shop=1')
  );

  const isReportSubdomain = typeof window !== 'undefined' && (
    window.location.hostname === 'laporan.mannazentrum.com' ||
    window.location.hostname.startsWith('laporan.') ||
    window.location.hostname.startsWith('portal.')
  );

  return (
    <BrowserRouter>
      <div className="App bg-white text-slate-800 font-sans antialiased min-h-screen">
        <Suspense fallback={<SplashScreen />}>
          {isShopSubdomain ? (
            <ShopProvider>
              <Routes>
                {/* Rute Khusus Subdomain shop.mannazentrum.com */}
                <Route path="/" element={<Store />} />

                {/* Struktur Kategori: /category/ & /category/:categorySlug */}
                <Route path="/category" element={<ShopCategoryPage />} />
                <Route path="/category/:categorySlug" element={<ShopCategoryPage />} />

                {/* Struktur Produk: /product/:productSlug */}
                <Route path="/product/:productSlug" element={<ShopProductPage />} />

                {/* Halaman Informasi & Kebijakan Toko */}
                <Route path="/about-us" element={<ShopAboutPage />} />
                <Route path="/about" element={<Navigate to="/about-us" replace />} />
                <Route path="/tentang-kami" element={<Navigate to="/about-us" replace />} />

                <Route path="/contact" element={<ShopContactPage />} />
                <Route path="/kontak" element={<Navigate to="/contact" replace />} />

                <Route path="/shipping-policy" element={<ShopShippingPolicyPage />} />
                <Route path="/pengiriman" element={<Navigate to="/shipping-policy" replace />} />

                <Route path="/return-policy" element={<ShopReturnPolicyPage />} />
                <Route path="/retur" element={<Navigate to="/return-policy" replace />} />
                <Route path="/garansi" element={<Navigate to="/return-policy" replace />} />

                <Route path="/blog" element={<ShopBlogPage />} />
                <Route path="/blog/:postSlug" element={<ShopBlogPage />} />

                {/* Portal Karyawan & Dashboard Manajemen Toko (CMS) */}
                <Route path="/admin" element={<ShopAdminDashboard />} />
                <Route path="/admin/shop" element={<ShopAdminDashboard />} />
                <Route path="/dashboard" element={<ShopAdminDashboard />} />
                <Route path="/cms" element={<Navigate to="/admin" replace />} />

                {/* Aliases & Fallbacks Subdomain */}
                <Route path="/toko" element={<Navigate to="/" replace />} />
                <Route path="/store" element={<Navigate to="/" replace />} />
                <Route path="/shop" element={<Navigate to="/" replace />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </ShopProvider>
          ) : isReportSubdomain ? (
            <Routes>
              {/* Rute Khusus Subdomain laporan.mannazentrum.com */}
              <Route path="/" element={<ReportPortal />} />
              <Route path="/login" element={<ReportPortal />} />
              <Route path="/laporan" element={<ReportPortal />} />
              <Route path="/dashboard" element={<ReportPortal />} />
              <Route path="/portal" element={<ReportPortal />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          ) : (
            <Routes>
              {/* Rute Utama Bersih & SEO-Friendly (www.mannazentrum.com) */}
              <Route path="/" element={<Home />} />
              <Route path="/tentang" element={<About />} />
              <Route path="/daycare" element={<Daycare />} />
              <Route path="/preschool" element={<Preschool />} />
              <Route path="/berita" element={<News />} />
              <Route path="/unit-bisnis" element={<BusinessUnitsPage />} />
              <Route path="/contact" element={<Contact />} />

              {/* Pengalihan Rute Portal Laporan Siswa ke Subdomain Resmi https://laporan.mannazentrum.com */}
              <Route path="/laporan" element={<RedirectToReportPortal />} />
              <Route path="/portal" element={<RedirectToReportPortal />} />
              <Route path="/portal-laporan" element={<RedirectToReportPortal />} />
              <Route path="/portal-siswa" element={<RedirectToReportPortal />} />
              <Route path="/portal-wali-murid" element={<RedirectToReportPortal />} />
              <Route path="/login" element={<RedirectToReportPortal />} />

              {/* Pengalihan Rute Toko Lama ke Subdomain https://shop.mannazentrum.com */}
              <Route path="/toko" element={<RedirectToShop />} />
              <Route path="/shop" element={<RedirectToShop />} />
              <Route path="/store" element={<RedirectToShop />} />

              {/* Aliases & Fallbacks */}
              <Route path="/kontak" element={<Navigate to="/contact" replace />} />
              <Route path="/pusat-informasi" element={<Navigate to="/contact" replace />} />
              <Route path="/about" element={<Navigate to="/tentang" replace />} />
              <Route path="/blog" element={<Navigate to="/berita" replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          )}
          <Analytics />
        </Suspense>
      </div>
    </BrowserRouter>
  );
};

export default App;
