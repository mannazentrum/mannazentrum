
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
        <h2 className="text-2xl font-bold" style={{ color: '#4D4D4D' }}>FORMULIR ORANG TUA</h2>
        <div className="text-white px-4 py-1 rounded-full" style={{ backgroundColor: '#4D4D4D' }}>
          PROGRESS
        </div>
      </div>
      
      {formStep === 1 && (
        <div>
          <h3 className="font-bold mb-4 text-left" style={{ color: '#4D4D4D' }}>LANGKAH 1: IDENTITAS ANAK</h3>
          <div className="grid grid-cols-2 gap-4">
            <input name="childName" value={formData.childName || ''} onChange={handleChange} type="text" placeholder="NAMA LENGKAP ANAK" className="p-2 rounded-lg border" />
            <input name="childNickname" value={formData.childNickname || ''} onChange={handleChange} type="text" placeholder="NAMA PANGGILAN" className="p-2 rounded-lg border" />
            <select name="childGender" value={formData.childGender || ''} onChange={handleChange} className="p-2 rounded-lg border">
              <option>Laki-laki</option>
              <option>Perempuan</option>
            </select>
            <input name="childNik" value={formData.childNik || ''} onChange={handleChange} type="text" placeholder="NIK ANAK (OPSIONAL)" className="p-2 rounded-lg border" />
            <input name="childBirthPlace" value={formData.childBirthPlace || ''} onChange={handleChange} type="text" placeholder="TEMPAT, TANGGAL LAHIR" className="p-2 rounded-lg border" />
            <input name="childReligion" value={formData.childReligion || ''} onChange={handleChange} type="text" placeholder="AGAMA" className="p-2 rounded-lg border" />
            <input name="childAddress" value={formData.childAddress || ''} onChange={handleChange} type="text" placeholder="ALAMAT LENGKAP DOMISILI ANAK" className="col-span-2 p-2 rounded-lg border" />
          </div>
          <button onClick={nextStep} className="w-full text-white p-3 rounded-full mt-6 font-bold" style={{ backgroundColor: '#4D4D4D' }}>LANJUTKAN</button>
        </div>
      )}

      {formStep === 2 && (
        <div>
          <h3 className="font-bold mb-4 text-left" style={{ color: '#4D4D4D' }}>LANGKAH 2: DATA WALI / ORANG TUA</h3>
          <div className="space-y-4">
            <p className="text-left font-bold" style={{color: '#4D4D4D'}}>1. WALI: AYAH</p>
            <input name="fatherName" value={formData.fatherName || ''} onChange={handleChange} type="text" placeholder="NAMA LENGKAP" className="w-full p-2 rounded-lg border" />
            <input name="fatherNik" value={formData.fatherNik || ''} onChange={handleChange} type="text" placeholder="NIK KTP" className="w-full p-2 rounded-lg border" />
            <input name="fatherBirthPlace" value={formData.fatherBirthPlace || ''} onChange={handleChange} type="text" placeholder="TEMPAT, TGL LAHIR" className="w-full p-2 rounded-lg border" />
            <input name="fatherJob" value={formData.fatherJob || ''} onChange={handleChange} type="text" placeholder="PEKERJAAN" className="w-full p-2 rounded-lg border" />
            <input name="fatherPhone" value={formData.fatherPhone || ''} onChange={handleChange} type="text" placeholder="NO. HANDPHONE (WHATSAPP)" className="w-full p-2 rounded-lg border" />
            <input name="fatherEmail" value={formData.fatherEmail || ''} onChange={handleChange} type="email" placeholder="ALAMAT EMAIL" className="w-full p-2 rounded-lg border" />
            <input name="fatherAddress" value={formData.fatherAddress || ''} onChange={handleChange} type="text" placeholder="ALAMAT DOMISILI" className="w-full p-2 rounded-lg border" />
          </div>
          <div className="space-y-4 mt-6">
            <p className="text-left font-bold" style={{color: '#4D4D4D'}}>2. WALI: BUNDA</p>
            <input name="motherName" value={formData.motherName || ''} onChange={handleChange} type="text" placeholder="NAMA LENGKAP" className="w-full p-2 rounded-lg border" />
            <input name="motherNik" value={formData.motherNik || ''} onChange={handleChange} type="text" placeholder="NIK KTP" className="w-full p-2 rounded-lg border" />
            <input name="motherBirthPlace" value={formData.motherBirthPlace || ''} onChange={handleChange} type="text" placeholder="TEMPAT, TGL LAHIR" className="w-full p-2 rounded-lg border" />
            <input name="motherJob" value={formData.motherJob || ''} onChange={handleChange} type="text" placeholder="PEKERJAAN" className="w-full p-2 rounded-lg border" />
            <input name="motherPhone" value={formData.motherPhone || ''} onChange={handleChange} type="text" placeholder="NO. HANDPHONE (WHATSAPP)" className="w-full p-2 rounded-lg border" />
            <input name="motherEmail" value={formData.motherEmail || ''} onChange={handleChange} type="email" placeholder="ALAMAT EMAIL" className="w-full p-2 rounded-lg border" />
            <input name="motherAddress" value={formData.motherAddress || ''} onChange={handleChange} type="text" placeholder="ALAMAT DOMISILI" className="w-full p-2 rounded-lg border" />
          </div>
          <div className="flex gap-4 mt-6">
            <button onClick={prevStep} className="w-1/2 border-2 p-3 rounded-full font-bold" style={{ borderColor: '#4D4D4D', color: '#4D4D4D' }}>KEMBALI</button>
            <button onClick={nextStep} className="w-1/2 text-white p-3 rounded-full font-bold" style={{ backgroundColor: '#4D4D4D' }}>LANJUTKAN</button>
          </div>
        </div>
      )}
      
      {formStep === 3 && (
        <div>
          <h3 className="font-bold mb-4 text-left" style={{ color: '#4D4D4D' }}>LANGKAH 3: RIWAYAT & KEBIASAAN</h3>
          <p className="text-sm text-left mb-4" style={{ color: '#4D4D4D' }}>INFORMASI PENTING UNTUK KENYAMANAN ANAK DI DAYCARE</p>
          <div className="space-y-4">
            <input name="healthHistory" value={formData.healthHistory || ''} onChange={handleChange} type="text" placeholder="RIWAYAT PENYAKIT" className="w-full p-2 rounded-lg border" />
            <input name="allergies" value={formData.allergies || ''} onChange={handleChange} type="text" placeholder="ALERGI" className="w-full p-2 rounded-lg border" />
            <input name="favoriteFoodAndToy" value={formData.favoriteFoodAndToy || ''} onChange={handleChange} type="text" placeholder="KESUKAAN" className="w-full p-2 rounded-lg border" />
            <input name="sleepAndTantrumHabits" value={formData.sleepAndTantrumHabits || ''} onChange={handleChange} type="text" placeholder="KEBIASAAN" className="w-full p-2 rounded-lg border" />
          </div>
          <div className="flex gap-4 mt-6">
            <button onClick={prevStep} className="w-1/2 border-2 p-3 rounded-full font-bold" style={{ borderColor: '#4D4D4D', color: '#4D4D4D' }}>KEMBALI</button>
            <button onClick={nextStep} className="w-1/2 text-white p-3 rounded-full font-bold" style={{ backgroundColor: '#4D4D4D' }}>LANJUTKAN</button>
          </div>
        </div>
      )}

      {formStep === 4 && (
        <div>
          <h3 className="font-bold mb-4 text-left" style={{ color: '#4D4D4D' }}>LANGKAH 4: KESEPAKATAN & TATA TERTIB</h3>
          <div className="p-4 rounded-lg space-y-2 border">
            <p className="font-bold text-red-500">POIN 1: KEHADIRAN</p>
            <p className="font-bold text-red-500">POIN 2: ADMINISTRASI</p>
            <p className="font-bold text-red-500">POIN 3: KESEHATAN</p>
          </div>
          <div className="flex gap-4 mt-6">
            <button onClick={prevStep} className="w-1/2 border-2 p-3 rounded-full font-bold" style={{ borderColor: '#4D4D4D', color: '#4D4D4D' }}>KEMBALI</button>
            <button onClick={nextStep} className="w-1/2 text-white p-3 rounded-full font-bold" style={{ backgroundColor: '#4D4D4D' }}>LANJUTKAN</button>
          </div>
        </div>
      )}

      {formStep === 5 && (
        <div>
          <h3 className="font-bold mb-4 text-left" style={{ color: '#4D4D4D' }}>LANGKAH 5: VALIDASI TANDA TANGAN</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-center" style={{ color: '#4D4D4D' }}>AYAH / WALI</label>
              <div className="h-32 rounded-lg mt-2 relative border">
                <SignatureCanvas 
                  ref={fatherSigRef} 
                  penColor='black' 
                  canvasProps={{className: 'w-full h-full'}} 
                  onEnd={() => handleSignatureEnd('fatherSignature', fatherSigRef)}
                />
                <button onClick={() => clearSignature('fatherSignature', fatherSigRef)} className="absolute top-1 right-1 bg-white px-2 text-sm rounded border">RESET</button>
              </div>
            </div>
            <div>
              <label className="block text-center" style={{ color: '#4D4D4D' }}>BUNDA / WALI</label>
              <div className="h-32 rounded-lg mt-2 relative border">
                <SignatureCanvas 
                  ref={motherSigRef} 
                  penColor='black' 
                  canvasProps={{className: 'w-full h-full'}} 
                  onEnd={() => handleSignatureEnd('motherSignature', motherSigRef)}
                />
                <button onClick={() => clearSignature('motherSignature', motherSigRef)} className="absolute top-1 right-1 bg-white px-2 text-sm rounded border">RESET</button>
              </div>
            </div>
          </div>
          <div className="flex gap-4 mt-6">
            <button onClick={prevStep} className="w-1/2 border-2 p-3 rounded-full font-bold" style={{ borderColor: '#4D4D4D', color: '#4D4D4D' }}>KEMBALI</button>
            <button onClick={submitData} className="w-1/2 text-white p-3 rounded-full font-bold" style={{ backgroundColor: '#4D4D4D' }}>KIRIM</button>
          </div>
        </div>
      )}
       
    </div>
  );
};

export default PublicRegistration;
