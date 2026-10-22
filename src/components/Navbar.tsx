import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Heart, Sparkles, MessageCircle } from 'lucide-react';

interface NavbarProps {
  onOpenContact?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Beranda' },
    { to: '/tentang', label: 'Tentang Kami' },
    { to: '/daycare', label: 'Daycare' },
    { to: '/preschool', label: 'Preschool' },
    { to: '/toko', label: 'Toko MM' },
    { to: '/berita', label: 'Berita & Parenting' },
  ];

  const handleCtaClick = () => {
    setMobileMenuOpen(false);
    if (onOpenContact) {
      onOpenContact();
    } else {
      window.open('https://wa.me/6287881110807?text=Halo%20Mannazentrum,%20saya%20ingin%20konsultasi%20pendaftaran%20Daycare%20/%20Preschool.', '_blank');
    }
  };

  return (
    <header className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-slate-100 z-50 transition-all">
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
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `px-3.5 py-2 rounded-full transition-all ${
                  isActive
                    ? 'text-slate-900 bg-amber-50 font-semibold text-amber-900'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
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
            <MessageCircle className="w-4 h-4" />
            <span>Konsultasi & Survei</span>
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
        <div className="lg:hidden bg-white border-b border-slate-100 px-6 py-6 space-y-3 animate-fadeIn shadow-xl">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl text-sm font-medium transition ${
                    isActive
                      ? 'bg-amber-50 text-amber-900 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
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
              className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 text-white py-3 rounded-xl text-sm font-medium hover:bg-amber-600 transition"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Daftar / Hubungi Kami</span>
            </button>
            <a
              href="https://wa.me/6287881110807?text=Halo%20Mannazentrum,%20saya%20ingin%20tanya%20informasi%20layanan."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-emerald-50 text-emerald-700 py-3 rounded-xl text-sm font-medium hover:bg-emerald-100 transition"
            >
              <span>WhatsApp Admin (+62 878-8111-0807)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
