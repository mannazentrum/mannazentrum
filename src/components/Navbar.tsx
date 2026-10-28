import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Heart, Sparkles, MessageCircle, Building2, UserCheck, Calendar, Clock, MapPin } from 'lucide-react';

interface NavbarProps {
  onOpenContact?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const parentLinks = [
    { to: '/', label: 'Beranda' },
    { to: '/daycare', label: 'Daycare' },
    { to: '/preschool', label: 'Preschool' },
    { to: '/berita', label: 'News & Tips' },
    { to: '/contact', label: 'Pusat Informasi' },
  ];

  const corporateLinks = [
    { to: '/tentang', label: 'Tentang Kami' },
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
      {/* Top Audience Announcement Bar (Responsive Mobile-First) */}
      <div className="bg-slate-900 text-white text-[11px] sm:text-xs py-2 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex justify-center items-center">
          <div className="flex items-center gap-2 text-center">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
            <span className="text-slate-300 leading-tight sm:leading-normal">
              <span className="font-semibold text-amber-300 sm:font-normal sm:text-slate-300">Pendaftaran Dibuka: </span>
              Daycare (3 bln - 4 thn) & Preschool (2 - 6 thn) di Cisauk, Serpong Garden, Citra Garden, BSD & Rumpin.
            </span>
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
            <span>Jadwalkan Kunjungan</span>
          </button>
        </div>

        {/* Mobile Header Buttons (Quick Action + Large Accessible Hamburger) */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={handleCtaClick}
            className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold px-3 py-2 rounded-full shadow-sm active:scale-95 transition"
            aria-label="Jadwalkan Kunjungan"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Kunjungan</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-11 h-11 flex items-center justify-center rounded-xl text-slate-700 hover:bg-slate-100 active:bg-slate-200 transition focus:outline-none"
            aria-label="Buka Menu Navigasi"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu (Mobile-First Touch Friendly & Clean) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-5 py-6 space-y-4 animate-fadeIn shadow-2xl max-h-[85vh] overflow-y-auto">
          {/* Quick Segment Cards */}
          <div className="bg-amber-50/60 p-3.5 rounded-2xl border border-amber-200/80 mb-2">
            <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider block mb-2">
              Jalur Kebutuhan:
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <Link 
                to="/" 
                onClick={() => setMobileMenuOpen(false)}
                className="bg-white p-3 rounded-xl text-center font-semibold shadow-sm border border-amber-200 text-slate-900 flex items-center justify-center gap-2 active:bg-amber-50"
              >
                <UserCheck className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Orang Tua Murid</span>
              </Link>
              <Link 
                to="/tentang" 
                onClick={() => setMobileMenuOpen(false)}
                className="bg-white p-3 rounded-xl text-center font-medium shadow-sm border border-slate-200 text-slate-700 flex items-center justify-center gap-2 active:bg-slate-50"
              >
                <Building2 className="w-4 h-4 text-slate-500 shrink-0" />
                <span>Korporat / Bisnis</span>
              </Link>
            </div>
          </div>

          {/* Navigation Links with large touch targets (min 48px height) */}
          <nav className="flex flex-col space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 pt-2">
              Layanan Untuk Buah Hati:
            </span>
            {parentLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl text-[15px] font-medium transition flex items-center justify-between min-h-[48px] active:scale-[0.99] ${
                    isActive
                      ? 'bg-amber-100/70 text-slate-900 font-bold'
                      : 'text-slate-800 hover:bg-slate-50'
                  }`
                }
              >
                <span>{link.label}</span>
                <span className="text-slate-400 text-xs font-normal">&rarr;</span>
              </NavLink>
            ))}

            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 pt-3">
              Tentang Kami & Perusahaan:
            </span>
            {corporateLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl text-[15px] font-medium transition flex items-center justify-between min-h-[48px] active:scale-[0.99] ${
                    isActive
                      ? 'bg-slate-100 text-slate-900 font-bold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`
                }
              >
                <span>{link.label}</span>
                <span className="text-slate-400 text-xs font-normal">&rarr;</span>
              </NavLink>
            ))}
          </nav>

          {/* Large Thumb-Friendly Mobile Action Buttons */}
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
            <button
              onClick={handleCtaClick}
              className="w-full min-h-[50px] inline-flex items-center justify-center gap-2.5 bg-slate-900 text-white py-3.5 px-4 rounded-2xl text-sm font-semibold hover:bg-slate-800 active:scale-[0.98] transition shadow-md"
            >
              <Calendar className="w-5 h-5 text-amber-400 shrink-0" />
              <span>Jadwalkan Kunjungan (School Tour)</span>
            </button>

            <a
              href="https://wa.me/6287881110807?text=Halo%20Mannazentrum,%20saya%20ingin%20konsultasi%20layanan%20Daycare%20/%20Preschool."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-[50px] inline-flex items-center justify-center gap-2.5 bg-emerald-600 text-white py-3.5 px-4 rounded-2xl text-sm font-semibold hover:bg-emerald-700 active:scale-[0.98] transition shadow-md"
            >
              <MessageCircle className="w-5 h-5 shrink-0" />
              <span>Chat WhatsApp Konselor (+62 878-8111-0807)</span>
            </a>

            {/* Quick Operational Info in Mobile Drawer */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-[11px] text-slate-500 space-y-1">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Buka: <strong>Senin - Jumat 07.00 - 18.00 WIB</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Serpong Garden 1 Cisauk & Rumpin Bogor</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
