
import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, doc, setDoc, query } from "firebase/firestore";
import { db } from "./firebase";
import { User, UserRole, RegistrationEntry, WebsiteContent } from './types';
import Login from './components/Login';
import SplashScreen from './components/SplashScreen';
import RegistrationForm from './components/RegistrationForm';
import ParentDashboard from './components/ParentDashboard';
import StaffDashboard from './components/StaffDashboard';
import ForgotPassword from './components/ForgotPassword';
import WebsiteLanding from './components/WebsiteLanding';
import CorporateLanding from './components/CorporateLanding';
import MMStoreLanding from './components/MMStoreLanding';
import CompanyProfile from './components/CompanyProfile';
import BusinessUnits from './components/BusinessUnits';
import PublicRegistration from './components/PublicRegistration';
import DaycareAbout from './components/DaycareAbout';
import DaycareProgram from './components/DaycareProgram';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [dbSyncing, setDbSyncing] = useState(false);
  const [viewMode, setViewMode] = useState<'CORPORATE' | 'DAYCARE_LANDING' | 'APP' | 'MM_STORE' | 'COMPANY_PROFILE' | 'BUSINESS_UNITS' | 'PUBLIC_REGISTRATION' | 'DAYCARE_ABOUT' | 'DAYcare_PROGRAM'>('CORPORATE'); 
  const [user, setUser] = useState<User | null>(null);
  const [showRegistration, setShowRegistration] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const [websiteContent, setWebsiteContent] = useState<WebsiteContent>({
    heroTitle: 'Membangun Generasi Cerdas & Berkarakter',
    heroSubtitle: 'Mannazentrum hadir sebagai mitra orang tua dalam mengasuh dan mendidik buah hati dengan penuh kasih sayang.',
    announcementActive: true,
    announcementText: 'Pendaftaran Murid Baru Gelombang 2 Telah Dibuka!',
    whatsappNumber: '6287881110807',
    tagline: 'Cerdas, Ceria, Bersinar'
  });
  const [registrations, setRegistrations] = useState<RegistrationEntry[]>([]);
  const [dailyReports, setDailyReports] = useState<Record<string, any>>({});
  const [scheduledMenus, setScheduledMenus] = useState<any[]>([]);
  const [scheduledCurriculums, setScheduledCurriculums] = useState<any[]>([]);

  // Conditional Styling
  useEffect(() => {
    const isPortal = user && (user.role === 'ADMIN' || user.role === 'TEACHER' || user.role === 'COORDINATOR');
    const portalStylesheet = document.getElementById('portal-styles');

    if (isPortal && !portalStylesheet) {
      const link = document.createElement('link');
      link.id = 'portal-styles';
      link.rel = 'stylesheet';
      link.href = '/src/portal.css';
      document.head.appendChild(link);
    } else if (!isPortal && portalStylesheet) {
      portalStylesheet.remove();
    }
  }, [user]);

  // SMART THEME ENGINE
  useEffect(() => {
    const root = document.documentElement;
    const themes = {
      CORPORATE: { primary: '#0f172a', accent: '#ea580c', bg: '#f8fafc', title: 'Corporate - Mannazentrum' },
      DAYCARE: { primary: '#42210b', accent: '#f3b524', bg: '#f7f3e3', title: 'Daycare - Mannazentrum' },
      MM_STORE: { primary: '#5d4037', accent: '#e6b946', bg: '#fffdf9', title: 'Malika Maliaki - Store' }
    };

    let activeTheme = themes.CORPORATE;
    if (viewMode.startsWith('DAYCARE') || viewMode === 'APP' || viewMode === 'PUBLIC_REGISTRATION') {
      activeTheme = themes.DAYCARE;
    } else if (viewMode === 'MM_STORE') {
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
    const unsubRegs = onSnapshot(query(collection(db, "registrations")), (snap) => {
      const data: RegistrationEntry[] = [];
      snap.forEach(doc => data.push(doc.data() as RegistrationEntry));
      setRegistrations(data);
      setLoading(false);
    });

    const unsubReports = onSnapshot(query(collection(db, "daily_reports")), (snap) => {
      const reports: Record<string, any> = {};
      snap.forEach(doc => reports[doc.id] = doc.data());
      setDailyReports(reports);
    });

    const unsubCms = onSnapshot(doc(db, "settings", "website_cms"), (doc) => {
      if (doc.exists()) setWebsiteContent(doc.data() as WebsiteContent);
    });

    const unsubMenus = onSnapshot(query(collection(db, "scheduled_menus")), (snap) => {
      const data: any[] = [];
      snap.forEach(doc => data.push(doc.data()));
      setScheduledMenus(data);
    });

    const unsubCurrs = onSnapshot(query(collection(db, "scheduled_curriculums")), (snap) => {
      const data: any[] = [];
      snap.forEach(doc => data.push(doc.data()));
      setScheduledCurriculums(data);
    });

    return () => {
      unsubRegs(); unsubReports(); unsubCms(); unsubMenus(); unsubCurrs();
    };
  }, []);

  const handleLogin = (username: string, pass: string) => {
    if (username === 'admin' && pass === 'password') {
      setUser({ id: 'admin', name: 'Staff Mannazentrum', role: UserRole.ADMIN });
      return;
    }
    const found = registrations.find(r => r.username === username && r.password === pass);
    if (found) {
      if (found.status === 'Approved') {
        let role = UserRole.TEACHER;
        if (found.type === 'Orang Tua') role = UserRole.PARENT;
        if (found.type === 'Coordinator') role = UserRole.COORDINATOR;
        setUser({ id: found.id, name: found.personalData.nama, role });
      } else {
        alert('Akun Anda belum aktif. Mohon hubungi Admin.');
      }
    } else {
      alert('Login gagal. Periksa kembali username/password.');
    }
  };

  if (loading) return <SplashScreen />;

  // NAVIGASI KOMPONEN LANDING
  if (viewMode === 'CORPORATE') return (
    <CorporateLanding 
      onNavigateToDaycare={() => setViewMode('DAYCARE_LANDING')} 
      onNavigateToMMStore={() => setViewMode('MM_STORE')} 
      onNavigateToProfile={() => setViewMode('COMPANY_PROFILE')} 
      onNavigateToBusinessUnits={() => setViewMode('BUSINESS_UNITS')} 
      onNavigateToApp={() => setViewMode('APP')}
    />
  );
  
  if (viewMode === 'COMPANY_PROFILE') return <CompanyProfile onBack={() => setViewMode('CORPORATE')} />;
  
  if (viewMode === 'BUSINESS_UNITS') return (
    <BusinessUnits 
      onBack={() => setViewMode('CORPORATE')} 
      onNavigateToDaycare={() => setViewMode('DAYCARE_LANDING')} 
      onNavigateToMMStore={() => setViewMode('MM_STORE')} 
      onNavigateToApp={() => setViewMode('APP')}
    />
  );
  
  if (viewMode === 'PUBLIC_REGISTRATION') return <PublicRegistration onBack={() => setViewMode('DAYCARE_LANDING')} websiteContent={websiteContent} />;
  if (viewMode === 'DAYCARE_ABOUT') return <DaycareAbout onBack={() => setViewMode('DAYCARE_LANDING')} />;
  if (viewMode === 'DAYCARE_PROGRAM') return <DaycareProgram onBack={() => setViewMode('DAYCARE_LANDING')} />;
  
  if (viewMode === 'DAYCARE_LANDING') return (
    <WebsiteLanding 
      onNavigateToApp={() => setViewMode('APP')} 
      onNavigateToRegistration={() => setViewMode('PUBLIC_REGISTRATION')} 
      onNavigateToAbout={() => setViewMode('DAYCARE_ABOUT')} 
      onNavigateToProgram={() => setViewMode('DAYCARE_PROGRAM')} 
      onNavigateToCorporate={() => setViewMode('CORPORATE')} 
      cmsContent={websiteContent} 
    />
  );
  
  if (viewMode === 'MM_STORE') return <MMStoreLanding onBackToCorporate={() => setViewMode('CORPORATE')} />;

  // AUTH LOGIC (LOGIN SCREEN)
  if (!user) {
    if (showRegistration) return <RegistrationForm onBack={() => setShowRegistration(false)} onRegister={(reg) => syncToCloud("registrations", reg.id, reg)} />;
    if (showForgotPassword) return <ForgotPassword onBack={() => setShowForgotPassword(false)} />;
    return (
      <Login 
        onLogin={handleLogin} 
        onRegister={() => setShowRegistration(true)} 
        onForgotPassword={() => setShowForgotPassword(true)} 
        onBackToLanding={() => setViewMode('DAYCARE_LANDING')} 
      />
    );
  }

  // DASHBOARD LOGIC
  return (
    <div className="min-h-screen transition-colors duration-700 ease-in-out bg-[var(--bg-app)] relative">
      {dbSyncing && (
        <div className="fixed top-4 right-4 z-[300] bg-[var(--primary-color)] text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-2xl animate-pulse flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
          Cloud Syncing...
        </div>
      )}

      {user.role === UserRole.PARENT ? (
        <ParentDashboard 
          user={user} 
          onLogout={() => setUser(null)} 
          registrations={registrations}
          dailyReports={dailyReports}
        />
      ) : (
        <StaffDashboard 
          user={user} 
          onLogout={() => setUser(null)} 
          registrations={registrations}
          onUpdateStatus={(id, status) => syncToCloud("registrations", id, { status })}
          onSaveReport={(childId, date, data) => syncToCloud("daily_reports", `${childId}-${date}`, data)}
          dailyReports={dailyReports}
          scheduledMenus={scheduledMenus}
          setScheduledMenu={(date, data) => syncToCloud("scheduled_menus", date, data)}
          scheduledCurriculums={scheduledCurriculums}
          setScheduledCurriculum={(date, data) => syncToCloud("scheduled_curriculums", date, data)}
          websiteContent={websiteContent}
          setWebsiteContent={(cms) => syncToCloud("settings", "website_cms", cms)}
        />
      )}
    </div>
  );
};

export default App;
