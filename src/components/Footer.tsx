import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Heart, Shield, Clock, LogIn } from 'lucide-react';

interface FooterProps {
  onOpenContact?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenContact }) => {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-12 px-6 sm:px-10 lg:px-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        
        {/* Col 1 & 2: Brand Info */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white text-slate-900 rounded-xl flex items-center justify-center font-bold text-lg">
              M
            </div>
            <div>
              <span className="font-semibold text-lg tracking-tight block">Mannazentrum</span>
              <span className="text-[10px] uppercase tracking-widest text-slate-400">PT. Elrafa Terang Sejahtera</span>
            </div>
          </div>
          <p className="text-slate-400 text-sm max-w-sm font-light leading-relaxed">
            Menghadirkan ekosistem pengasuhan anak usia dini, preschool berkarakter, dan stimulasi kreatif berbasis kasih untuk tumbuh kembang optimal si kecil.
          </p>
          <div className="flex items-center gap-3 pt-2 text-xs text-slate-400">
            <span className="inline-flex items-center gap-1.5 bg-slate-800 px-3 py-1.5 rounded-full">
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              <span>Aman & Higienis</span>
            </span>
            <span className="inline-flex items-center gap-1.5 bg-slate-800 px-3 py-1.5 rounded-full">
              <Heart className="w-3.5 h-3.5 text-rose-400" />
              <span>Penuh Kasih</span>
            </span>
          </div>
        </div>

        {/* Col 3: Navigasi Layanan & Portal */}
        <div>
          <h3 className="font-medium mb-4 text-xs uppercase tracking-widest text-slate-300">Layanan Pendidikan</h3>
          <ul className="space-y-2.5 text-sm font-light text-slate-400">
            <li>
              <Link to="/daycare" className="hover:text-amber-400 transition">Daycare Anak</Link>
            </li>
            <li>
              <Link to="/preschool" className="hover:text-amber-400 transition">Preschool & Playgroup</Link>
            </li>
            <li>
              <a 
                href="https://shop.mannazentrum.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-amber-400 transition inline-flex items-center gap-1"
              >
                <span>Toko Manna Maliaki</span>
                <span className="text-[10px]">↗</span>
              </a>
            </li>
            <li>
              <Link to="/berita" className="hover:text-amber-400 transition">News & Tips</Link>
            </li>
            <li className="pt-2 border-t border-slate-800">
              <a 
                href="https://laporan.mannazentrum.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-amber-400 hover:text-amber-300 transition inline-flex items-center gap-1.5 font-medium text-xs"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Portal Laporan Siswa (Login) ↗</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Col 4: Perusahaan */}
        <div>
          <h3 className="font-medium mb-4 text-xs uppercase tracking-widest text-slate-300">Profil & Legalitas</h3>
          <ul className="space-y-2.5 text-sm font-light text-slate-400">
            <li>
              <Link to="/tentang" className="hover:text-amber-400 transition">Tentang Kami</Link>
            </li>
            <li>
              <Link to="/unit-bisnis" className="hover:text-amber-400 transition">Unit Bisnis</Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className="hover:text-amber-400 transition"
              >
                Pusat Informasi & Lokasi
              </Link>
            </li>
            {onOpenContact && (
              <li>
                <button onClick={onOpenContact} className="hover:text-amber-400 transition">
                  Formulir Konsultasi
                </button>
              </li>
            )}
          </ul>
        </div>

        {/* Col 5: Kontak Cepat */}
        <div>
          <h3 className="font-medium mb-4 text-xs uppercase tracking-widest text-slate-300">Hubungi Kami</h3>
          <ul className="space-y-3 text-xs font-light text-slate-400">
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>Serpong Garden 1, Green View A02 No 12A, Jl Raya Cisauk, Tangerang</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
              <a href="https://wa.me/6287881110807" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                +62 878-8111-0807 (WhatsApp)
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-amber-400 shrink-0" />
              <span>info@mannazentrum.com</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-slate-400 shrink-0" />
              <span>Senin - Jumat: 07:00 - 18:00</span>
            </li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 font-light gap-4">
        <p>&copy; {new Date().getFullYear()} PT. Elrafa Terang Sejahtera. All Rights Reserved.</p>
        <p className="tracking-wider uppercase text-[10px]">Mannazentrum Children's Foundation & Daycare Cisauk</p>
      </div>
    </footer>
  );
};

export default Footer;
