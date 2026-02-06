
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { collection, onSnapshot, doc, setDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { User, UserRole, WebsiteContent } from './types';
import SplashScreen from './components/SplashScreen';

// Lazy load components
const CorporateLanding = lazy(() => import('./components/CorporateLanding'));
const MMStoreLanding = lazy(() => import('./components/MMStoreLanding'));
const CompanyProfile = lazy(() => import('./components/CompanyProfile'));
const BusinessUnits = lazy(() => import('./components/BusinessUnits'));

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [dbSyncing, setDbSyncing] = useState(false);
  const [viewMode, setViewMode] = useState<'CORPORATE' | 'MM_STORE' | 'COMPANY_PROFILE' | 'BUSINESS_UNITS'>('CORPORATE');
  const [user, setUser] = useState<User | null>(null);

  const [websiteContent, setWebsiteContent] = useState<WebsiteContent>({
    heroTitle: 'Membangun Generasi Cerdas & Berkarakter',
    heroSubtitle: 'Mannazentrum hadir sebagai mitra orang tua dalam mengasuh dan mendidik buah hati dengan penuh kasih sayang.',
    announcementActive: true,
    announcementText: 'Pendaftaran Murid Baru Gelombang 2 Telah Dibuka!',
    whatsappNumber: '6287881110807',
    tagline: 'Cerdas, Ceria, Bersinar'
  });

  // SMART THEME ENGINE
  useEffect(() => {
    const root = document.documentElement;
    const themes = {
      CORPORATE: { primary: '#0f172a', accent: '#ea580c', bg: '#f8fafc', title: 'Corporate - Mannazentrum' },
      MM_STORE: { primary: '#5d4037', accent: '#e6b946', bg: '#fffdf9', title: 'Malika Maliaki - Store' }
    };

    let activeTheme = themes.CORPORATE;
    if (viewMode === 'MM_STORE') {
      activeTheme = themes.MM_STORE;
    }

    root.style.setProperty('--primary-color', activeTheme.primary);
    root.style.setProperty('--accent-color', activeTheme.accent);
    root.style.setProperty('--bg-app', activeTheme.bg);
    document.title = activeTheme.title;
  }, [viewMode]);

  const syncToCloud = async (collectionName: string, docId: string, data: any) => {
    setDbSyncing(true);
    try {
      await setDoc(doc(db, collectionName, docId), data, { merge: true });
    } catch (e) {
      console.error(`Cloud Sync Error [${collectionName}]:`, e);
    } finally {
      setDbSyncing(false);
    }
  };

  useEffect(() => {
    // Fetch essential data for landing pages first
    const unsubCms = onSnapshot(doc(db, "settings", "website_cms"), (doc) => {
      if (doc.exists()) {
        setWebsiteContent(doc.data() as WebsiteContent);
      }
      setLoading(false); // Set loading to false after fetching CMS content
    });

    return () => {
      unsubCms();
    };
  }, []);

  if (loading) return <SplashScreen />;

  return (
    <Suspense fallback={<SplashScreen />}>
      {/* NAVIGASI KOMPONEN LANDING */}
      {viewMode === 'CORPORATE' && (
        <CorporateLanding
          onNavigateToDaycare={() => alert('Daycare functionality is currently under reconstruction.')}
          onNavigateToMMStore={() => setViewMode('MM_STORE')}
          onNavigateToProfile={() => setViewMode('COMPANY_PROFILE')}
          onNavigateToBusinessUnits={() => setViewMode('BUSINESS_UNITS')}
          onNavigateToApp={() => alert('The app is currently under reconstruction.')}
        />
      )}

      {viewMode === 'COMPANY_PROFILE' && <CompanyProfile onBack={() => setViewMode('CORPORATE')} />}

      {viewMode === 'BUSINESS_UNITS' && (
        <BusinessUnits
          onBack={() => setViewMode('CORPORATE')}
          onNavigateToDaycare={() => alert('Daycare functionality is currently under reconstruction.')}
          onNavigateToMMStore={() => setViewMode('MM_STORE')}
          onNavigateToApp={() => alert('The app is currently under reconstruction.')}
        />
      )}

      {viewMode === 'MM_STORE' && <MMStoreLanding onBackToCorporate={() => setViewMode('CORPORATE')} />}

    </Suspense>
  );
};

export default App;
