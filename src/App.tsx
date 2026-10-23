import React, { lazy, Suspense } from 'react';
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

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="App bg-white text-slate-800 font-sans antialiased min-h-screen">
        <Suspense fallback={<SplashScreen />}>
          <Routes>
            {/* Rute Utama Bersih & SEO-Friendly */}
            <Route path="/" element={<Home />} />
            <Route path="/tentang" element={<About />} />
            <Route path="/daycare" element={<Daycare />} />
            <Route path="/preschool" element={<Preschool />} />
            <Route path="/toko" element={<Store />} />
            <Route path="/berita" element={<News />} />
            <Route path="/unit-bisnis" element={<BusinessUnitsPage />} />
            <Route path="/contact" element={<Contact />} />

            {/* Aliases & Fallbacks */}
            <Route path="/kontak" element={<Navigate to="/contact" replace />} />
            <Route path="/pusat-informasi" element={<Navigate to="/contact" replace />} />
            <Route path="/store" element={<Navigate to="/toko" replace />} />
            <Route path="/about" element={<Navigate to="/tentang" replace />} />
            <Route path="/blog" element={<Navigate to="/berita" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Analytics />
        </Suspense>
      </div>
    </BrowserRouter>
  );
};

export default App;
