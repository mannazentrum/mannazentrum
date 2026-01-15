
import React, { useState } from 'react';
import { WebsiteContent } from '../types';

interface PublicRegistrationProps {
  onBack: () => void;
  websiteContent?: WebsiteContent;
}

const PublicRegistration: React.FC<PublicRegistrationProps> = ({ onBack, websiteContent }) => {
  const [step, setStep] = useState(0);

  const renderContent = () => {
    switch (step) {
      case 0:
        return (
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-12">DAFTAR AKUN BARU</h1>
            <div className="flex justify-center gap-8">
              <div 
                className="bg-white rounded-2xl p-8 cursor-pointer"
                onClick={() => setStep(1)}
              >
                <p className="text-6xl">👨‍👩‍👧</p>
                <p className="mt-4 font-bold">AKUN ORANG TUA</p>
              </div>
              <div 
                className="bg-white rounded-2xl p-8 cursor-pointer"
                onClick={() => setStep(1)} // This should ideally lead to a different flow
              >
                <p className="text-6xl">👩‍🏫</p>
                <p className="mt-4 font-bold">AKUN GURU</p>
              </div>
            </div>
            <button onClick={onBack} className="mt-12 underline">BATALKAN</button>
          </div>
        );
      case 1:
        return <ParentRegistrationForm onBack={() => setStep(0)} />;
      default:
        return <div>Unknown Step</div>;
    }
  };

  return (
    <div className="min-h-screen bg-yellow-100 flex items-center justify-center p-4">
      {renderContent()}
    </div>
  );
};

const ParentRegistrationForm: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [formStep, setFormStep] = useState(1);
  
  const nextStep = () => setFormStep(prev => prev + 1);
  const prevStep = () => setFormStep(prev => prev - 1);

  return (
    <div className="bg-white rounded-2xl p-8 max-w-2xl w-full">
      <div className="flex justify-between items-center mb-4">
        <button onClick={formStep === 1 ? onBack : prevStep} className="text-2xl">←</button>
        <h2 className="text-2xl font-bold">REGISTRASI ORANG TUA</h2>
        <div className="bg-gray-800 text-white px-4 py-1 rounded-full">
          LANGKAH {formStep}/6
        </div>
      </div>
      
      {formStep === 1 && (
        <div>
          <h3 className="font-bold mb-4">Langkah 1: Data Anak</h3>
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Nama Lengkap Anak" className="bg-yellow-700 text-white placeholder-white p-2 rounded-lg" />
            <input type="text" placeholder="Nama Panggilan" className="bg-yellow-700 text-white placeholder-white p-2 rounded-lg" />
            <select className="bg-yellow-700 text-white p-2 rounded-lg">
              <option>Laki-laki</option>
              <option>Perempuan</option>
            </select>
            <input type="text" placeholder="NIK Anak" className="bg-yellow-700 text-white placeholder-white p-2 rounded-lg" />
            <input type="text" placeholder="Tempat, Tanggal Lahir" className="bg-yellow-700 text-white placeholder-white p-2 rounded-lg" />
            <input type="text" placeholder="Agama" className="bg-yellow-700 text-white placeholder-white p-2 rounded-lg" />
            <input type="text" placeholder="Alamat Anak" className="bg-yellow-700 text-white placeholder-white p-2 rounded-lg col-span-2" />
          </div>
          <button onClick={nextStep} className="w-full bg-yellow-700 text-white p-3 rounded-full mt-6 font-bold">LANJUT</button>
        </div>
      )}

      {formStep === 2 && (
        <div>
          <h3 className="font-bold mb-4">Langkah 2: Data Orang Tua</h3>
          <div className="space-y-4">
            <input type="text" placeholder="Nama Lengkap Orang Tua" className="w-full bg-yellow-700 text-white placeholder-white p-2 rounded-lg" />
            <input type="text" placeholder="NIK KTP" className="w-full bg-yellow-700 text-white placeholder-white p-2 rounded-lg" />
            <input type="text" placeholder="Tempat, Tanggal Lahir" className="w-full bg-yellow-700 text-white placeholder-white p-2 rounded-lg" />
            <input type="text" placeholder="Pekerjaan" className="w-full bg-yellow-700 text-white placeholder-white p-2 rounded-lg" />
            <input type="text" placeholder="No. Handphone (WA)" className="w-full bg-yellow-700 text-white placeholder-white p-2 rounded-lg" />
            <input type="email" placeholder="Email" className="w-full bg-yellow-700 text-white placeholder-white p-2 rounded-lg" />
            <input type="text" placeholder="Alamat Domisili" className="w-full bg-yellow-700 text-white placeholder-white p-2 rounded-lg" />
          </div>
          <div className="flex gap-4 mt-6">
            <button onClick={prevStep} className="w-1/2 border-2 border-yellow-700 text-yellow-700 p-3 rounded-full font-bold">KEMBALI</button>
            <button onClick={nextStep} className="w-1/2 bg-yellow-700 text-white p-3 rounded-full font-bold">LANJUT</button>
          </div>
        </div>
      )}
      
      {formStep === 3 && (
        <div>
          <h3 className="font-bold mb-4">Langkah 3: Kesehatan & Kebiasaan</h3>
          <div className="space-y-4">
            <input type="text" placeholder="Riwayat Penyakit" className="w-full bg-yellow-700 text-white placeholder-white p-2 rounded-lg" />
            <input type="text" placeholder="Alergi" className="w-full bg-yellow-700 text-white placeholder-white p-2 rounded-lg" />
            <input type="text" placeholder="Makanan & Mainan Kesukaan" className="w-full bg-yellow-700 text-white placeholder-white p-2 rounded-lg" />
            <input type="text" placeholder="Kebiasaan Tidur & Tantrum" className="w-full bg-yellow-700 text-white placeholder-white p-2 rounded-lg" />
          </div>
          <div className="flex gap-4 mt-6">
            <button onClick={prevStep} className="w-1/2 border-2 border-yellow-700 text-yellow-700 p-3 rounded-full font-bold">KEMBALI</button>
            <button onClick={nextStep} className="w-1/2 bg-yellow-700 text-white p-3 rounded-full font-bold">LANJUT</button>
          </div>
        </div>
      )}

      {formStep === 4 && (
        <div>
          <h3 className="font-bold mb-4">Langkah 4: Kesepakatan</h3>
          <div className="bg-yellow-700 text-white p-4 rounded-lg space-y-2">
            <p>Poin 1: Bersedia mengikuti jadwal kegiatan daycare.</p>
            <p>Poin 2: Melakukan pembayaran tepat waktu.</p>
            <p>Poin 3: Komunikasi proaktif dengan guru.</p>
            <p>Poin 4: Mematuhi tata tertib Mannazentrum Daycare.</p>
          </div>
          <div className="flex gap-4 mt-6">
            <button onClick={prevStep} className="w-1/2 border-2 border-yellow-700 text-yellow-700 p-3 rounded-full font-bold">KEMBALI</button>
            <button onClick={nextStep} className="w-1/2 bg-yellow-700 text-white p-3 rounded-full font-bold">LANJUT</button>
          </div>
        </div>
      )}

      {formStep === 5 && (
        <div>
          <h3 className="font-bold mb-4">Langkah 5: Tanda Tangan</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-center">Ayah</label>
              <div className="bg-yellow-700 h-32 rounded-lg mt-2 relative">
                <button className="absolute top-1 right-1 bg-white text-yellow-700 px-2 text-sm rounded">Hapus</button>
              </div>
            </div>
            <div>
              <label className="block text-center">Ibu</label>
              <div className="bg-yellow-700 h-32 rounded-lg mt-2 relative">
                <button className="absolute top-1 right-1 bg-white text-yellow-700 px-2 text-sm rounded">Hapus</button>
              </div>
            </div>
          </div>
          <div className="flex gap-4 mt-6">
            <button onClick={prevStep} className="w-1/2 border-2 border-yellow-700 text-yellow-700 p-3 rounded-full font-bold">KEMBALI</button>
            <button onClick={nextStep} className="w-1/2 bg-yellow-700 text-white p-3 rounded-full font-bold">LANJUT</button>
          </div>
        </div>
      )}
       
    </div>
  );
};

export default PublicRegistration;
