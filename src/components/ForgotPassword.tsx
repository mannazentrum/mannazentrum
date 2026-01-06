
import React, { useState } from 'react';

interface ForgotPasswordProps {
  onBack: () => void;
  onBackToLanding?: () => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onBack, onBackToLanding }) => {
  const [step, setStep] = useState(1); // 1: Input Email, 2: OTP, 3: New Pass, 4: Success
  const [contact, setContact] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const handleSendOtp = () => {
    if (contact) {
      // Simulate API call
      setTimeout(() => setStep(2), 500);
    }
  };

  const handleVerifyOtp = () => {
    if (otp.join('').length === 4) {
      setStep(3);
    }
  };

  const handleChangePass = () => {
    if (newPass && newPass === confirmPass) {
      setStep(4);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  return (
    <div className="min-h-screen bg-pdf-yellow flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-pdf-cream rounded-[40px] p-8 card-shadow relative">
        <button onClick={onBack} className="absolute top-8 left-8 text-2xl text-pdf-brown font-bold hover:scale-110 transition-transform">
          ←
        </button>
        
        {step === 1 && onBackToLanding && (
          <button 
            onClick={onBackToLanding}
            className="absolute top-8 right-8 text-xs font-bold text-pdf-brown/50 hover:text-pdf-brown flex items-center gap-1"
          >
            Halaman Website <span>→</span>
          </button>
        )}
        
        <div className="flex flex-col items-center pt-8">
          <div className="bg-white p-4 rounded-full mb-4 shadow-sm">
             <span className="text-4xl">🔐</span>
          </div>
          <h2 className="text-2xl font-bold font-rounded text-pdf-brown mb-2">Reset Password</h2>
          
          {step === 1 && (
            <div className="w-full space-y-6 mt-4 animate-fadeIn">
              <p className="text-center text-sm text-pdf-brown/70">
                Masukkan alamat email atau nomor handphone yang terdaftar untuk menerima kode verifikasi.
              </p>
              <div className="space-y-2">
                <label className="font-bold text-pdf-brown ml-2">Email / No. HP</label>
                <input 
                  type="text" 
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full px-6 py-4 rounded-full border-none shadow-inner bg-white text-pdf-brown text-lg"
                  placeholder="contoh@email.com"
                />
              </div>
              <button 
                onClick={handleSendOtp}
                className="w-full bg-pdf-brown text-white py-4 rounded-full font-bold text-xl hover:opacity-90 shadow-lg"
              >
                Kirim Kode OTP
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="w-full space-y-6 mt-4 animate-fadeIn">
              <p className="text-center text-sm text-pdf-brown/70">
                Kode OTP telah dikirim ke <span className="font-bold">{contact}</span>.
              </p>
              <div className="flex justify-center space-x-4">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-${idx}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    className="w-14 h-14 rounded-2xl border-2 border-pdf-brown/20 text-center text-2xl font-bold text-pdf-brown bg-white focus:border-pdf-brown focus:ring-2 ring-pdf-brown/20 outline-none"
                  />
                ))}
              </div>
              <p className="text-center text-xs text-pdf-brown/50">Tidak menerima kode? <span className="font-bold cursor-pointer hover:underline">Kirim ulang</span></p>
              <button 
                onClick={handleVerifyOtp}
                className="w-full bg-pdf-brown text-white py-4 rounded-full font-bold text-xl hover:opacity-90 shadow-lg"
              >
                Verifikasi
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="w-full space-y-6 mt-4 animate-fadeIn">
              <p className="text-center text-sm text-pdf-brown/70">
                Silakan buat password baru untuk akun Anda.
              </p>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="font-bold text-pdf-brown ml-2">Password Baru</label>
                  <input 
                    type="password" 
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    className="w-full px-6 py-4 rounded-full border-none shadow-inner bg-white text-pdf-brown"
                    placeholder="******"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-bold text-pdf-brown ml-2">Konfirmasi Password</label>
                  <input 
                    type="password" 
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                    className="w-full px-6 py-4 rounded-full border-none shadow-inner bg-white text-pdf-brown"
                    placeholder="******"
                  />
                </div>
              </div>
              <button 
                onClick={handleChangePass}
                className="w-full bg-pdf-brown text-white py-4 rounded-full font-bold text-xl hover:opacity-90 shadow-lg"
              >
                Simpan Password
              </button>
            </div>
          )}

          {step === 4 && (
            <div className="w-full space-y-6 mt-4 text-center animate-fadeIn">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto text-white text-4xl shadow-lg">
                ✓
              </div>
              <h3 className="text-xl font-bold text-pdf-brown">Berhasil!</h3>
              <p className="text-sm text-pdf-brown/70">
                Password Anda telah berhasil diperbarui. Silakan login kembali menggunakan password baru.
              </p>
              <button 
                onClick={onBack}
                className="w-full bg-pdf-brown text-white py-4 rounded-full font-bold text-xl hover:opacity-90 shadow-lg mt-4"
              >
                Kembali ke Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
