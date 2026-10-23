import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SplashScreen from './components/SplashScreen';
import { Analytics } from '@vercel/analytics/react';

// Lazy loaded page components for optimal bundle splitting
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Daycare = lazy(() => import('./pages/Daycare'));
const Preschool = lazy(() => import('./pages/Preschool'));
const Store = lazy(() => import('./pages/Store'));
const News = lazy(() => import('./pages/News'));
const BusinessUnitsPage = lazy(() => import('./pages/BusinessUnitsPage'));
const Contact = lazy(() => import('./pages/Contact'));

// Redirect helper to official shop subdomain
const RedirectToShop: React.FC = () => {
  useEffect(() => {
    window.location.replace('https://shop.mannazentrum.com');
  }, []);
  return null;
};

const App: React.FC = () => {
  const isShopSubdomain = typeof window !== 'undefined' && (
    window.location.hostname === 'shop.mannazentrum.com' ||
    window.location.hostname.startsWith('shop.')
  );

  return (
    <BrowserRouter>
      <div className="App bg-white text-slate-800 font-sans antialiased min-h-screen">
        <Suspense fallback={<SplashScreen />}>
          {isShopSubdomain ? (
            <Routes>
              {/* Rute Khusus Subdomain shop.mannazentrum.com */}
              <Route path="/" element={<Store />} />
              <Route path="/toko" element={<Navigate to="/" replace />} />
              <Route path="/store" element={<Navigate to="/" replace />} />
              <Route path="/shop" element={<Navigate to="/" replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          ) : (
            <Routes>
              {/* Rute Utama Bersih & SEO-Friendly (Halaman /toko dialihkan ke subdomain resmi) */}
              <Route path="/" element={<Home />} />
              <Route path="/tentang" element={<About />} />
              <Route path="/daycare" element={<Daycare />} />
              <Route path="/preschool" element={<Preschool />} />
              <Route path="/berita" element={<News />} />
              <Route path="/unit-bisnis" element={<BusinessUnitsPage />} />
              <Route path="/contact" element={<Contact />} />

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
