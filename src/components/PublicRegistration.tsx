
import React, { useState, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { WebsiteContent, ParentRegistrationData } from '../types';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

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
            <h1 className="text-4xl font-bold mb-12" style={{ color: '#4D4D4D' }}>DAFTAR AKUN BARU</h1>
            <div className="flex justify-center gap-8">
              <div 
                className="bg-white rounded-2xl p-8 cursor-pointer"
                onClick={() => setStep(1)}
              >
                <p className="text-6xl">👨‍👩‍👧</p>
                <p className="mt-4 font-bold" style={{ color: '#4D4D4D' }}>AKUN ORANG TUA</p>
              </div>
              <div 
                className="bg-white rounded-2xl p-8 cursor-pointer"
                onClick={() => setStep(1)} // This should ideally lead to a different flow
              >
                <p className="text-6xl">👩‍🏫</p>
                <p className="mt-4 font-bold" style={{ color: '#4D4D4D' }}>AKUN GURU</p>
              </div>
            </div>
            <button onClick={onBack} className="mt-12 underline" style={{ color: '#4D4D4D' }}>BATALKAN</button>
          </div>
        );
      case 1:
        return <ParentRegistrationForm onBack={() => setStep(0)} />;
      default:
        return <div>Unknown Step</div>;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#F9F4E8' }}>
      {renderContent()}
    </div>
  );
};

const ParentRegistrationForm: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState<ParentRegistrationData>({} as ParentRegistrationData);
  const fatherSigRef = useRef<SignatureCanvas>(null);
  const motherSigRef = useRef<SignatureCanvas>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignatureEnd = (name: string, ref: React.RefObject<SignatureCanvas>) => {
    if (ref.current) {
      const dataUrl = ref.current.toDataURL();
      setFormData({ ...formData, [name]: dataUrl });
    }
  };

  const clearSignature = (name: string, ref: React.RefObject<SignatureCanvas>) => {
    if (ref.current) {
      ref.current.clear();
      setFormData({ ...formData, [name]: '' });
    }
  };
  
  const nextStep = () => setFormStep(prev => prev + 1);
  const prevStep = () => setFormStep(prev => prev - 1);

  const submitData = async () => {
    try {
      await addDoc(collection(db, 'parentRegistrations'), formData);
      alert('Registrasi berhasil!');
      onBack(); // Kembali ke halaman utama setelah sukses
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('Terjadi kesalahan saat menyimpan data. Silakan coba lagi.');
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8 max-w-2xl w-full">
      <div className="flex justify-between items-center mb-4">
        <button onClick={formStep === 1 ? onBack : prevStep} className="text-2xl">←</button>
        <h2 className="text-2xl font-bold" style={{ color: '#4D4D4D' }}>REGISTRASI ORANG TUA</h2>
        <div className="text-white px-4 py-1 rounded-full" style={{ backgroundColor: '#4D4D4D' }}>
          LANGKAH {formStep}/6
        </div>
      </div>
      
      {formStep === 1 && (
        <div>
          <h3 className="font-bold mb-4" style={{ color: '#4D4D4D' }}>Langkah 1: Data Anak</h3>
          <div className="grid grid-cols-2 gap-4">
            <input name="childName" onChange={handleChange} type="text" placeholder="Nama Lengkap Anak" className="p-2 rounded-lg" style={{ backgroundColor: '#6B4F4F', color: 'white' }} />
            <input name="childNickname" onChange={handleChange} type="text" placeholder="Nama Panggilan" className="p-2 rounded-lg" style={{ backgroundColor: '#6B4F4F', color: 'white' }} />
            <select name="childGender" onChange={handleChange} className="p-2 rounded-lg" style={{ backgroundColor: '#6B4F4F', color: 'white' }}>
              <option>Laki-laki</option>
              <option>Perempuan</option>
            </select>
            <input name="childNik" onChange={handleChange} type="text" placeholder="NIK Anak" className="p-2 rounded-lg" style={{ backgroundColor: '#6B4F4F', color: 'white' }} />
            <input name="childBirthPlace" onChange={handleChange} type="text" placeholder="Tempat, Tanggal Lahir" className="p-2 rounded-lg" style={{ backgroundColor: '#6B4F4F', color: 'white' }} />
            <input name="childReligion" onChange={handleChange} type="text" placeholder="Agama" className="p-2 rounded-lg" style={{ backgroundColor: '#6B4F4F', color: 'white' }} />
            <input name="childAddress" onChange={handleChange} type="text" placeholder="Alamat Anak" className="col-span-2 p-2 rounded-lg" style={{ backgroundColor: '#6B4F4F', color: 'white' }} />
          </div>
          <button onClick={nextStep} className="w-full text-white p-3 rounded-full mt-6 font-bold" style={{ backgroundColor: '#6B4F4F' }}>LANJUT</button>
        </div>
      )}

      {formStep === 2 && (
        <div>
          <h3 className="font-bold mb-4" style={{ color: '#4D4D4D' }}>Langkah 2: Data Orang Tua</h3>
          <div className="space-y-4">
            <input name="parentName" onChange={handleChange} type="text" placeholder="Nama Lengkap Orang Tua" className="w-full p-2 rounded-lg" style={{ backgroundColor: '#6B4F4F', color: 'white' }} />
            <input name="parentNik" onChange={handleChange} type="text" placeholder="NIK KTP" className="w-full p-2 rounded-lg" style={{ backgroundColor: '#6B4F4F', color: 'white' }} />
            <input name="parentBirthPlace" onChange={handleChange} type="text" placeholder="Tempat, Tanggal Lahir" className="w-full p-2 rounded-lg" style={{ backgroundColor: '#6B4F4F', color: 'white' }} />
            <input name="parentJob" onChange={handleChange} type="text" placeholder="Pekerjaan" className="w-full p-2 rounded-lg" style={{ backgroundColor: '#6B4F4F', color: 'white' }} />
            <input name="parentPhone" onChange={handleChange} type="text" placeholder="No. Handphone (WA)" className="w-full p-2 rounded-lg" style={{ backgroundColor: '#6B4F4F', color: 'white' }} />
            <input name="parentEmail" onChange={handleChange} type="email" placeholder="Email" className="w-full p-2 rounded-lg" style={{ backgroundColor: '#6B4F4F', color: 'white' }} />
            <input name="parentAddress" onChange={handleChange} type="text" placeholder="Alamat Domisili" className="w-full p-2 rounded-lg" style={{ backgroundColor: '#6B4F4F', color: 'white' }} />
          </div>
          <div className="flex gap-4 mt-6">
            <button onClick={prevStep} className="w-1/2 border-2 p-3 rounded-full font-bold" style={{ borderColor: '#6B4F4F', color: '#6B4F4F' }}>KEMBALI</button>
            <button onClick={nextStep} className="w-1/2 text-white p-3 rounded-full font-bold" style={{ backgroundColor: '#6B4F4F' }}>LANJUT</button>
          </div>
        </div>
      )}
      
      {formStep === 3 && (
        <div>
          <h3 className="font-bold mb-4" style={{ color: '#4D4D4D' }}>Langkah 3: Kesehatan & Kebiasaan</h3>
          <div className="space-y-4">
            <input name="healthHistory" onChange={handleChange} type="text" placeholder="Riwayat Penyakit" className="w-full p-2 rounded-lg" style={{ backgroundColor: '#6B4F4F', color: 'white' }} />
            <input name="allergies" onChange={handleChange} type="text" placeholder="Alergi" className="w-full p-2 rounded-lg" style={{ backgroundColor: '#6B4F4F', color: 'white' }} />
            <input name="favoriteFoodAndToy" onChange={handleChange} type="text" placeholder="Makanan & Mainan Kesukaan" className="w-full p-2 rounded-lg" style={{ backgroundColor: '#6B4F4F', color: 'white' }} />
            <input name="sleepAndTantrumHabits" onChange={handleChange} type="text" placeholder="Kebiasaan Tidur & Tantrum" className="w-full p-2 rounded-lg" style={{ backgroundColor: '#6B4F4F', color: 'white' }} />
          </div>
          <div className="flex gap-4 mt-6">
            <button onClick={prevStep} className="w-1/2 border-2 p-3 rounded-full font-bold" style={{ borderColor: '#6B4F4F', color: '#6B4F4F' }}>KEMBALI</button>
            <button onClick={nextStep} className="w-1/2 text-white p-3 rounded-full font-bold" style={{ backgroundColor: '#6B4F4F' }}>LANJUT</button>
          </div>
        </div>
      )}

      {formStep === 4 && (
        <div>
          <h3 className="font-bold mb-4" style={{ color: '#4D4D4D' }}>Langkah 4: Kesepakatan</h3>
          <div className="p-4 rounded-lg space-y-2" style={{ backgroundColor: '#6B4F4F', color: 'white' }}>
            <p>Poin 1: Bersedia mengikuti jadwal kegiatan daycare.</p>
            <p>Poin 2: Melakukan pembayaran tepat waktu.</p>
            <p>Poin 3: Komunikasi proaktif dengan guru.</p>
            <p>Poin 4: Mematuhi tata tertib Mannazentrum Daycare.</p>
          </div>
          <div className="flex gap-4 mt-6">
            <button onClick={prevStep} className="w-1/2 border-2 p-3 rounded-full font-bold" style={{ borderColor: '#6B4F4F', color: '#6B4F4F' }}>KEMBALI</button>
            <button onClick={nextStep} className="w-1/2 text-white p-3 rounded-full font-bold" style={{ backgroundColor: '#6B4F4F' }}>LANJUT</button>
          </div>
        </div>
      )}

      {formStep === 5 && (
        <div>
          <h3 className="font-bold mb-4" style={{ color: '#4D4D4D' }}>Langkah 5: Tanda Tangan</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-center" style={{ color: '#4D4D4D' }}>Ayah</label>
              <div className="h-32 rounded-lg mt-2 relative" style={{ backgroundColor: '#6B4F4F' }}>
                <SignatureCanvas 
                  ref={fatherSigRef} 
                  penColor='white' 
                  canvasProps={{className: 'w-full h-full'}} 
                  onEnd={() => handleSignatureEnd('fatherSignature', fatherSigRef)}
                />
                <button onClick={() => clearSignature('fatherSignature', fatherSigRef)} className="absolute top-1 right-1 bg-white px-2 text-sm rounded" style={{ color: '#6B4F4F' }}>Hapus</button>
              </div>
            </div>
            <div>
              <label className="block text-center" style={{ color: '#4D4D4D' }}>Ibu</label>
              <div className="h-32 rounded-lg mt-2 relative" style={{ backgroundColor: '#6B4F4F' }}>
                <SignatureCanvas 
                  ref={motherSigRef} 
                  penColor='white' 
                  canvasProps={{className: 'w-full h-full'}} 
                  onEnd={() => handleSignatureEnd('motherSignature', motherSigRef)}
                />
                <button onClick={() => clearSignature('motherSignature', motherSigRef)} className="absolute top-1 right-1 bg-white px-2 text-sm rounded" style={{ color: '#6B4F4F' }}>Hapus</button>
              </div>
            </div>
          </div>
          <div className="flex gap-4 mt-6">
            <button onClick={prevStep} className="w-1/2 border-2 p-3 rounded-full font-bold" style={{ borderColor: '#6B4F4F', color: '#6B4F4F' }}>KEMBALI</button>
            <button onClick={submitData} className="w-1/2 text-white p-3 rounded-full font-bold" style={{ backgroundColor: '#6B4F4F' }}>LANJUT</button>
          </div>
        </div>
      )}
       
    </div>
  );
};

export default PublicRegistration;
