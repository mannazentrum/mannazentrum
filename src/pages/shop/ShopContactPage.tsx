import React, { useState } from 'react';
import { ShopLayout } from '../../components/shop/ShopLayout';
import SEO from '../../components/SEO';
import { 
  MessageCircle, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  HelpCircle,
  PhoneCall
} from 'lucide-react';

export const ShopContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `*PESAN DARI WEBSITE SHOP.MANNAZENTRUM.COM*\nNama: ${name}\nEmail: ${email}\nNo HP: ${phone}\nPesan: ${message}`
    );
    window.open(`https://wa.me/6287881110807?text=${text}`, '_blank');
    setSubmitted(true);
  };

  return (
    <ShopLayout>
      <SEO 
        title="Hubungi Kami - Mannazentrum Shop | Layanan Pelanggan & Konsultasi"
        description="Kontak layanan pelanggan Mannazentrum Shop untuk informasi produk, pemesanan grosir, konsultasi pengiriman ke seluruh Indonesia dan Asia Tenggara."
        canonicalPath="/contact"
      />

      {/* Hero Header */}
      <section className="bg-slate-900 text-white py-14 md:py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-amber-400 font-semibold uppercase tracking-[0.2em] text-xs block">
            Layanan Pelanggan & Bantuan
          </span>
          <h1 className="text-3xl sm:text-5xl font-light text-white tracking-tight">
            Kami Siap Membantu Anda
          </h1>
          <p className="text-slate-300 font-light text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            Punya pertanyaan mengenai ketersediaan stok, waktu pengiriman ke wilayah Anda, atau konsultasi produk keluarga? Hubungi tim kami sekarang.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-14 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-amber-600 font-semibold uppercase tracking-[0.2em] text-xs block">
                Pusat Kontak
              </span>
              <h2 className="text-2xl sm:text-3xl font-light text-slate-900 tracking-tight">
                Hubungi Kami Kapan Saja
              </h2>
              <p className="text-xs text-slate-500 font-light leading-relaxed">
                Tim dukungan pelanggan kami merespons chat WhatsApp dengan cepat selama jam operasional.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              
              <a
                href="https://wa.me/6287881110807?text=Halo%20Admin%20Mannazentrum%20Shop,%20saya%20ingin%20konsultasi%20pemesanan."
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-3xl bg-[#FAF9F5] border border-stone-200/80 hover:border-amber-400 transition flex items-start gap-4 group block"
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-6 h-6 text-amber-700" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm group-hover:text-amber-600 transition">
                    WhatsApp Customer Care (Utama)
                  </h4>
                  <p className="text-xs text-slate-500 font-light mt-0.5">
                    +62 878-8111-0807 (Respon cepat)
                  </p>
                  <span className="text-[11px] font-semibold text-amber-700 block mt-1">
                    Buka WhatsApp →
                  </span>
                </div>
              </a>

              <div className="p-5 rounded-3xl bg-[#FAF9F5] border border-stone-200/80 flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-amber-700" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    Surat Elektronik (Email)
                  </h4>
                  <p className="text-xs text-slate-500 font-light mt-0.5">
                    shop@mannazentrum.com
                  </p>
                  <span className="text-[11px] text-slate-400 block mt-1">
                    Untuk penawaran grosir & kemitraan ekspor
                  </span>
                </div>
              </div>

              <div className="p-5 rounded-3xl bg-[#FAF9F5] border border-stone-200/80 flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-amber-700" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    Jam Operasional & Dispatch
                  </h4>
                  <p className="text-xs text-slate-500 font-light mt-0.5">
                    Senin - Sabtu: 08.00 - 18.00 WIB
                  </p>
                  <span className="text-[11px] text-slate-400 block mt-1">
                    Pesanan sebelum jam 14.00 WIB dikirim pada hari yang sama
                  </span>
                </div>
              </div>

              <div className="p-5 rounded-3xl bg-[#FAF9F5] border border-stone-200/80 flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-amber-700" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    Pusat Distribusi & Pergudangan
                  </h4>
                  <p className="text-xs text-slate-500 font-light mt-0.5 leading-relaxed">
                    Kawasan Cisauk / Serpong Garden, Tangerang, Banten 15345, Indonesia.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Quick Message Form Column */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-stone-200/80 shadow-md p-6 sm:p-10 space-y-6">
              
              <div className="border-b border-stone-100 pb-4">
                <h3 className="text-xl sm:text-2xl font-light text-slate-900">
                  Kirim Pesan / Permintaan Khusus
                </h3>
                <p className="text-xs text-slate-500 font-light mt-1">
                  Isi formulir di bawah ini dan kami akan segera meneruskan konfirmasi ke WhatsApp Customer Service kami.
                </p>
              </div>

              {submitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">Pesan Telah Diteruskan!</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Terima kasih. Tim kami telah menerima pesan Anda dan akan merespons secepatnya.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs text-amber-700 font-semibold underline"
                  >
                    Kirim Pesan Lain
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ibu Melinda"
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:border-amber-500 focus:bg-white outline-hidden text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">
                        No. WhatsApp / HP *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +62 812 3456 789"
                        className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:border-amber-500 focus:bg-white outline-hidden text-xs"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">
                        Email (opsional)
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. melinda@gmail.com"
                        className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:border-amber-500 focus:bg-white outline-hidden text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">
                      Pesan / Pertanyaan Anda *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tuliskan produk yang diminati, estimasi alamat pengiriman, atau pertanyaan lainnya..."
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:border-amber-500 focus:bg-white outline-hidden text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 bg-slate-900 hover:bg-amber-600 text-white rounded-full font-bold text-xs flex items-center justify-center gap-2 transition active:scale-95 shadow-md"
                  >
                    <Send className="w-4 h-4" />
                    <span>Kirim Pesan via WhatsApp CS</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>
      </section>
    </ShopLayout>
  );
};
