import React, { useState, useEffect, lazy, Suspense } from 'react';
import SplashScreen from './components/SplashScreen';
import { Analytics } from '@vercel/analytics/react';

// Lazy load components for optimal bundle splitting
const CorporateLanding = lazy(() => import('./components/CorporateLanding'));
const MMStoreLanding = lazy(() => import('./components/MMStoreLanding'));
const CompanyProfile = lazy(() => import('./components/CompanyProfile'));
const BusinessUnits = lazy(() => import('./components/BusinessUnits'));
const DaycareLanding = lazy(() => import('./components/DaycareLanding'));

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<'CORPORATE' | 'MM_STORE' | 'COMPANY_PROFILE' | 'BUSINESS_UNITS' | 'DAYCARE'>('CORPORATE');

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
