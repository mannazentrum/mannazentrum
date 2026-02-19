
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { collection, onSnapshot, doc, setDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { User, UserRole, WebsiteContent } from './types';
import SplashScreen from './components/SplashScreen';
import CorporateLanding from './components/CorporateLanding';
import { Analytics } from '@vercel/analytics/react';

// Lazy load components
const MMStoreLanding = lazy(() => import('./components/MMStoreLanding'));
const CompanyProfile = lazy(() => import('./components/CompanyProfile'));
const BusinessUnits = lazy(() => import('./components/BusinessUnits'));
const DaycareLanding = lazy(() => import('./components/DaycareLanding'));

const App: React.FC = () => {
  const [dbSyncing, setDbSyncing] = useState(false);
  const [viewMode, setViewMode] = useState<'CORPORATE' | 'MM_STORE' | 'COMPANY_PROFILE' | 'BUSINESS_UNITS' | 'DAYCARE'>('CORPORATE');
  const [user, setUser] = useState<User | null>(null);

  const [websiteContent, setWebsiteContent] = useState<WebsiteContent>({
    heroTitle: 'Membangun Generasi Cerdas & Berkarakter',
    heroSubtitle: 'Mannazentrum hadir sebagai mitra orang tua dalam mengasuh dan mendidik buah hati dengan penuh kasih sayang.',
    announcementActive: true,
    announcementText: 'Pendaftaran Murid Baru Gelombang 2 Telah Dibuka!',
    whatsappNumber: '6287881110807',
    tagline: 'Cerdas, Ceria, Bersinar'
  });

  // Set the document title based on the view mode
  useEffect(() => {
    if (viewMode === 'MM_STORE') {
      document.title = 'Malika Maliaki - Store';
    } else if (viewMode === 'DAYCARE') {
      document.title = 'Daycare & Preschool - Mannazentrum';
    } else {
      document.title = 'Corporate - Mannazentrum';
    }
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
    });

    return () => {
      unsubCms();
    };
  }, []);

  const themeClasses = viewMode === 'MM_STORE' ? 'bg-cream text-primary' : 'bg-white text-primary';

  return (
    <div className={`App ${themeClasses}`}>
      <Suspense fallback={<SplashScreen />}>
        {/* NAVIGASI KOMPONEN LANDING */}
        {viewMode === 'CORPORATE' && (
          <CorporateLanding
            onNavigateToDaycare={() => setViewMode('DAYCARE')}
            onNavigateToMMStore={() => setViewMode('MM_STORE')}
            onNavigateToProfile={() => setViewMode('COMPANY_PROFILE')}
            onNavigateToBusinessUnits={() => setViewMode('BUSINESS_UNITS')}
          />
        )}

        {viewMode === 'COMPANY_PROFILE' && <CompanyProfile onBack={() => setViewMode('CORPORATE')} />}

        {viewMode === 'BUSINESS_UNITS' && (
          <BusinessUnits
            onBack={() => setViewMode('CORPORATE')}
            onNavigateToDaycare={() => setViewMode('DAYCARE')}
            onNavigateToMMStore={() => setViewMode('MM_STORE')}
          />
        )}

        {viewMode === 'DAYCARE' && <DaycareLanding onBack={() => setViewMode('CORPORATE')} />}

        {viewMode === 'MM_STORE' && <MMStoreLanding onBackToCorporate={() => setViewMode('CORPORATE')} />}
        <Analytics />
      </Suspense>
    </div>
  );
};

export default App;
