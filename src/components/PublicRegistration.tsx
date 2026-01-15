
import React, { useState } from 'react';
// Import WebsiteContent type for props definition
import { WebsiteContent } from '../types';

interface PublicRegistrationProps {
  onBack: () => void;
  // Added websiteContent prop to match usage in App.tsx
  websiteContent?: WebsiteContent;
}

const PublicRegistration: React.FC<PublicRegistrationProps> = ({ onBack, websiteContent }) => {
  const [formData, setFormData] = useState({
    namaAyah: '',
    telpAyah: '',
    namaIbu: '',
    telpIbu: '',
    namaAnak: '',
    tglLahir: '',
    fasilitas: 'Daycare Full Day'
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate sending email logic
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      console.log('Sending registration to: info@mannazentrum.com', formData);
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-pdf-cream flex items-center justify-center p-6">
        <div className="max-w-lg w-full bg-white rounded-[40px] shadow-2xl p-10 text-center space-y-6 animate-fadeIn">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mx-auto shadow-sm">
            ✓
          </div>
          <h2 className="text-3xl font-black font-rounded text-pdf-brown">Pendaftaran Berhasil!</h2>
          <p className="text-pdf-brown/70">
            Terima kasih telah mendaftar. Data Anda telah dikirimkan ke tim kami di <strong>info@mannazentrum.com</strong>.
          </p>
          <div className="bg-orange-50 p-6 rounded-3xl border border-orange-100">
             <p className="text-sm text-orange-800 font-bold mb-3 italic">Butuh respon cepat?</p>
             <a 
               href={`https://wa.me/${websiteContent?.whatsappNumber || '6287881110807'}`} 
               target="_blank" 
               rel="noopener noreferrer"
               className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-full font-bold hover:bg-green-600 transition"
             >
               <span>Chat WA Admin</span>
             </a>
          </div>
          <button 
            onClick={onBack}
            className="w-full bg-pdf-brown text-white py-4 rounded-2xl font-bold shadow-md hover:bg-opacity-90 transition-all"
          >
            Kembali ke Beranda Daycare
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pdf-cream py-12 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-pdf-brown font-bold hover:opacity-70 transition group bg-white/50 px-6 py-2 rounded-full shadow-sm border border-pdf-brown/5"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Kembali ke Website Daycare
        </button>

        <div className="bg-white rounded-[50px] shadow-2xl overflow-hidden border border-pdf-brown/5">
          {/* Header Image/Banner */}
          <div className="bg-pdf-brown p-10 text-center relative overflow-hidden">
             <div className="relative z-10">
               <h1 className="text-3xl font-black font-rounded text-white mb-2">Form Pendaftaran Murid Baru</h1>
               <p className="text-orange-200 text-sm font-medium">Lengkapi data di bawah untuk bergabung dengan Mannazentrum</p>
             </div>
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
             <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-500/10 rounded-full -ml-8 -mb-8 blur-xl"></div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Ayah */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-pdf-brown/60 ml-1">1. Nama Ayah</label>
                <input 
                  required
                  type="text" 
                  name="namaAyah"
                  value={formData.namaAyah}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 rounded-2xl bg-pdf-cream/30 border border-pdf-brown/10 focus:ring-2 ring-orange-200 outline-none font-bold text-pdf-brown transition"
                  placeholder="Nama Lengkap Ayah"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-pdf-brown/60 ml-1">2. No Telp Ayah</label>
                <input 
                  required
                  type="tel" 
                  name="telpAyah"
                  value={formData.telpAyah}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 rounded-2xl bg-pdf-cream/30 border border-pdf-brown/10 focus:ring-2 ring-orange-200 outline-none font-bold text-pdf-brown transition"
                  placeholder="Contoh: 0812xxxx"
                />
              </div>

              {/* Ibu */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-pdf-brown/60 ml-1">3. Nama Ibu</label>
                <input 
                  required
                  type="text" 
                  name="namaIbu"
                  value={formData.namaIbu}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 rounded-2xl bg-pdf-cream/30 border border-pdf-brown/10 focus:ring-2 ring-orange-200 outline-none font-bold text-pdf-brown transition"
                  placeholder="Nama Lengkap Ibu"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-pdf-brown/60 ml-1">4. No Telp Ibu</label>
                <input 
                  required
                  type="tel" 
                  name="telpIbu"
                  value={formData.telpIbu}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 rounded-2xl bg-pdf-cream/30 border border-pdf-brown/10 focus:ring-2 ring-orange-200 outline-none font-bold text-pdf-brown transition"
                  placeholder="Contoh: 0812xxxx"
                />
              </div>

              {/* Anak */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-black uppercase tracking-widest text-pdf-brown/60 ml-1">5. Nama Anak</label>
                <input 
                  required
                  type="text" 
                  name="namaAnak"
                  value={formData.namaAnak}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 rounded-2xl bg-pdf-cream/30 border border-pdf-brown/10 focus:ring-2 ring-orange-200 outline-none font-bold text-pdf-brown transition"
                  placeholder="Nama Lengkap Si Kecil"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-pdf-brown/60 ml-1">6. Tanggal Lahir</label>
                <input 
                  required
                  type="date" 
                  name="tglLahir"
                  value={formData.tglLahir}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 rounded-2xl bg-pdf-cream/30 border border-pdf-brown/10 focus:ring-2 ring-orange-200 outline-none font-bold text-pdf-brown transition"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-pdf-brown/60 ml-1">7. Pilihan Fasilitas</label>
                <select 
                  name="fasilitas"
                  value={formData.fasilitas}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 rounded-2xl bg-pdf-cream/30 border border-pdf-brown/10 focus:ring-2 ring-orange-200 outline-none font-bold text-pdf-brown transition appearance-none"
                >
                  <option value="Daycare Full Day">Daycare Full Day</option>
                  <option value="Daycare Halfday">Daycare Halfday</option>
                </select>
              </div>
            </div>

            <div className="pt-6">
              <button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-pdf-brown text-white py-5 rounded-3xl font-black text-xl shadow-xl hover:bg-orange-600 transition transform active:scale-95 disabled:opacity-50"
              >
                {isLoading ? 'Mengirim Data...' : 'Kirim Pendaftaran'}
              </button>
              <div className="mt-6 flex flex-col items-center gap-4">
                <p className="text-center text-[10px] text-pdf-brown/40 font-bold uppercase tracking-widest">
                  Data akan dikirimkan ke info@mannazentrum.com
                </p>
                <button 
                  type="button"
                  onClick={onBack}
                  className="text-pdf-brown/60 hover:text-pdf-brown text-sm font-bold flex items-center gap-2 transition"
                >
                  Batal dan Kembali ke Website
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PublicRegistration;
