import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Heart, Sparkles, MessageCircle, Building2, UserCheck, Calendar } from 'lucide-react';

interface NavbarProps {
  onOpenContact?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isCorporateRoute = location.pathname === '/tentang' || location.pathname === '/unit-bisnis';

  const parentLinks = [
    { to: '/', label: 'Beranda' },
    { to: '/daycare', label: 'Daycare' },
    { to: '/preschool', label: 'Preschool' },
    { to: '/toko', label: 'Toko MM' },
    { to: '/berita', label: 'Tips Parenting' },
  ];

  const corporateLinks = [
    { to: '/tentang', label: 'Profil PT. Elrafa' },
    { to: '/unit-bisnis', label: 'Unit Bisnis' },
  ];

  const handleCtaClick = () => {
    setMobileMenuOpen(false);
    if (onOpenContact) {
      onOpenContact();
    } else {
      window.open('https://wa.me/6287881110807?text=Halo%20Mannazentrum,%20saya%20ingin%20jadwalkan%20kunjungan%20survei%20lokasi.', '_blank');
    }
  };

  return (
    <header className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-slate-100 z-50 transition-all">
      {/* Top Audience Segmentation Bar */}
      <div className="bg-slate-900 text-white text-[11px] py-1.5 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-slate-300">
              Penerimaan Siswa & Pendaftaran Daycare Cisauk, Rumpin & Sekitarnya Telah Dibuka
            </span>
          </div>

          {/* Quick Audience Switcher */}
          <div className="flex items-center gap-3 font-medium">
            <span className="text-slate-400 text-[10px] uppercase tracking-wider hidden md:inline">Pilihan Alur:</span>
            <Link 
              to="/" 
              className={`hover:text-amber-300 transition flex items-center gap-1 ${!isCorporateRoute ? 'text-amber-400 font-semibold' : 'text-slate-300'}`}
            >
              <UserCheck className="w-3 h-3" />
              <span>Orang Tua Murid</span>
            </Link>
            <span className="text-slate-600">|</span>
            <Link 
              to="/tentang" 
              className={`hover:text-amber-300 transition flex items-center gap-1 ${isCorporateRoute ? 'text-amber-400 font-semibold' : 'text-slate-300'}`}
            >
              <Building2 className="w-3 h-3" />
              <span>Korporat & Kemitraan</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
        
        {/* Brand Logo */}
        <Link 
          to="/" 
          className="flex items-center space-x-3 group"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:bg-amber-600 transition-colors">
            M
          </div>
          <div>
            <span className="font-semibold text-base md:text-lg text-slate-900 leading-none tracking-tight block">
              Mannazentrum
            </span>
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 mt-0.5">
              PT. Elrafa Terang Sejahtera
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 text-sm font-medium text-slate-600">
          {parentLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `px-3 py-2 rounded-full transition-all ${
                  isActive
                    ? 'text-slate-900 bg-amber-50 font-semibold text-amber-900'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          <span className="text-slate-200">|</span>

          {corporateLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `px-3 py-2 rounded-full transition-all text-xs ${
                  isActive
                    ? 'text-slate-900 bg-slate-100 font-semibold'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Right CTA */}
        <div className="hidden lg:flex items-center space-x-3">
          <button
            onClick={handleCtaClick}
            className="inline-flex items-center gap-2 bg-slate-900 text-white text-xs md:text-sm px-5 py-2.5 rounded-full font-medium hover:bg-amber-600 transition-colors shadow-sm active:scale-95"
          >
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>Survey Lokasi</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 transition focus:outline-none"
            aria-label="Buka Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-100 px-6 py-6 space-y-4 animate-fadeIn shadow-xl">
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 mb-2">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">Pilih Jalur Akses:</span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <Link 
                to="/" 
                onClick={() => setMobileMenuOpen(false)}
                className="bg-white p-2.5 rounded-xl text-center font-medium shadow-sm border border-slate-100 text-slate-900 flex items-center justify-center gap-1.5"
              >
                <UserCheck className="w-3.5 h-3.5 text-amber-600" />
                <span>Orang Tua Murid</span>
              </Link>
              <Link 
                to="/tentang" 
                onClick={() => setMobileMenuOpen(false)}
                className="bg-white p-2.5 rounded-xl text-center font-medium shadow-sm border border-slate-100 text-slate-900 flex items-center justify-center gap-1.5"
              >
                <Building2 className="w-3.5 h-3.5 text-slate-600" />
                <span>Korporat / Bisnis</span>
              </Link>
            </div>
          </div>

          <nav className="flex flex-col space-y-1">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-2 pt-2">Menu Layanan Anak:</span>
            {parentLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-2.5 rounded-xl text-sm font-medium transition ${
                    isActive
                      ? 'bg-amber-50 text-amber-900 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-2 pt-3">Menu Korporat:</span>
            {corporateLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-2.5 rounded-xl text-sm font-medium transition ${
                    isActive
                      ? 'bg-slate-100 text-slate-900 font-semibold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
            <button
              onClick={handleCtaClick}
              className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 text-white py-3 rounded-xl text-sm font-medium hover:bg-slate-800 transition shadow-sm"
            >
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Jadwalkan Survey Lokasi</span>
            </button>
            <a
              href="https://wa.me/6287881110807?text=Halo%20Mannazentrum,%20saya%20ingin%20tanya%20informasi%20layanan."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-emerald-50 text-emerald-700 py-3 rounded-xl text-sm font-medium hover:bg-emerald-100 transition"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Admin (+62 878-8111-0807)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
