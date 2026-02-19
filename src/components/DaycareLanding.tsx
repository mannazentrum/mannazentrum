
import React, { useState } from 'react';
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore"; 

interface DaycareLandingProps {
  onBack: () => void;
}

const DaycareLanding: React.FC<DaycareLandingProps> = ({ onBack }) => {
  const [showContactForm, setShowContactForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const target = e.target as typeof e.target & {
      name: { value: string };
      email: { value: string };
      phone: { value: string };
      message: { value: string };
    };
    const name = target.name.value;
    const email = target.email.value;
    const phone = target.phone.value;
    const message = target.message.value;

    try {
      await addDoc(collection(db, "formSubmissions"), {
        name,
        email,
        phone,
        message,
        submittedAt: new Date(),
        source: "Daycare/Preschool Landing",
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting form: ", error);
      alert("There was an error submitting your form. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 relative">

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-slate-900/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
          <div className="bg-white w-full max-w-lg rounded-[50px] shadow-2xl border-4 border-slate-100 overflow-hidden relative my-auto">
            <button 
              onClick={() => setShowContactForm(false)}
              className="absolute top-8 right-8 w-12 h-12 bg-slate-50 text-slate-400 hover:text-slate-900 rounded-full flex items-center justify-center text-2xl transition-all z-10"
            >
              ×
            </button>
            
            <div className="p-10">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter leading-none mb-2">Terima Kasih!</h2>
                  <p className="text-slate-500 font-medium">Pesan Anda telah kami terima. Tim kami akan segera menghubungi Anda.</p>
                  <button 
                    onClick={() => setShowContactForm(false)}
                    className="mt-8 bg-slate-900 text-white px-8 py-3 rounded-full font-medium hover:bg-slate-800 transition"
                  >
                    Tutup
                  </button>
                </div>
              ) : (
                <>
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter leading-none mb-2">Informasi Pendaftaran</h2>
                    <p className="text-slate-500 font-medium">Silakan isi formulir di bawah ini.</p>
                  </div>

                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="font-bold text-slate-800 text-sm">Nama</label>
                      <input type="text" id="name" name="name" className="w-full border border-slate-200 rounded-lg p-3 mt-1" required />
                    </div>
                    <div>
                      <label htmlFor="email" className="font-bold text-slate-800 text-sm">Alamat Email</label>
                      <input type="email" id="email" name="email" className="w-full border border-slate-200 rounded-lg p-3 mt-1" required />
                    </div>
                    <div>
                      <label htmlFor="phone" className="font-bold text-slate-800 text-sm">Nomor Telepon</label>
                      <input type="tel" id="phone" name="phone" className="w-full border border-slate-200 rounded-lg p-3 mt-1" required />
                    </div>
                    <div>
                      <label htmlFor="message" className="font-bold text-slate-800 text-sm">Pesan</label>
                      <textarea id="message" name="message" rows={4} className="w-full border border-slate-200 rounded-lg p-3 mt-1" required></textarea>
                    </div>
                    <button type="submit" className="w-full bg-slate-900 text-white p-4 rounded-lg font-medium hover:bg-slate-800 transition" disabled={isSubmitting}>
                      {isSubmitting ? 'Mengirim...' : 'Kirim'}
                    </button>
                  </form>
                  
                  <button 
                    onClick={() => setShowContactForm(false)}
                    className="mt-6 w-full text-slate-400 font-bold text-[10px] uppercase tracking-[0.4em] hover:text-slate-900"
                  >
                    TUTUP HALAMAN
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={onBack}>
            <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold text-xl">E</div>
            <div>
              <h1 className="font-bold text-xl leading-none tracking-tight">ELRAFA</h1>
              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500">Terang Sejahtera</p>
            </div>
          </div>
          <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-600 items-center">
            <button onClick={onBack} className="hover:text-slate-900 transition outline-none">Kembali</button>
          </div>
        </div>
      </nav>

      <header className="relative bg-slate-50 py-32 px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-7xl font-serif font-bold text-slate-900 mb-6 leading-tight">
            Mannazentrum <br/> <span className="text-accent">Daycare & Preschool</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
           Lembaga pendidikan dan penitipan anak usia dini (Daycare, KB, K1, K2) yang menitikberatkan pada pembentukan karakter dan kemandirian. 
          </p>
          <div className="flex justify-center space-x-4">
             <button onClick={() => { setIsSubmitted(false); setShowContactForm(true); }} className="bg-slate-900 text-white px-8 py-3 rounded-full font-medium hover:bg-slate-800 transition">Informasi Pendaftaran</button>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 opacity-50"></div>
      </header>

    </div>
  );
};

export default DaycareLanding;
