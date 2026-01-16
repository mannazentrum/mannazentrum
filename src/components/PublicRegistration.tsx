
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
          <div className="text-center text-[#42210b]">
            <h1 className="text-4xl font-bold mb-12">DAFTAR AKUN BARU</h1>
            <div className="flex justify-center gap-8">
              <div 
                className="bg-white rounded-2xl p-8 cursor-pointer border-2 border-transparent hover:border-[#42210b] transition-all"
                onClick={() => setStep(1)}
              >
                <p className="text-6xl">👨‍👩‍👧</p>
                <p className="mt-4 font-bold">AKUN ORANG TUA</p>
              </div>
              <div 
                className="bg-white rounded-2xl p-8 cursor-pointer border-2 border-transparent hover:border-[#42210b] transition-all"
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
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#F9F4E8]">
      {renderContent()}
    </div>
  );
};

const ParentRegistrationForm: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState<ParentRegistrationData>({} as ParentRegistrationData);
  const fatherSigRef = useRef<SignatureCanvas>(null);
  const motherSigRef = useRef<SignatureCanvas>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
      onBack();
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('Terjadi kesalahan saat menyimpan data. Silakan coba lagi.');
    }
  };

  const inputClass = "p-2 rounded-lg border-2 border-[#42210b] text-[#42210b] placeholder:text-[#42210b] placeholder:opacity-60 bg-transparent w-full";
  const primaryBtnClass = "w-full bg-[#42210b] text-white p-3 rounded-full mt-6 font-bold uppercase tracking-wider shadow-md hover:bg-black transition-all active:scale-95 border-b-4 border-black/30";
  const secondaryBtnClass = "w-1/2 bg-white text-[#42210b] border-2 border-[#42210b] p-3 rounded-full font-bold uppercase tracking-wider shadow-md hover:bg-gray-100 transition-all active:scale-95";

  return (
    <div className="bg-white rounded-2xl p-8 max-w-2xl w-full text-[#42210b]">
      <div className="flex justify-between items-center mb-4">
        <button onClick={formStep === 1 ? onBack : prevStep} className="text-2xl">←</button>
        <h2 className="text-2xl font-bold">FORMULIR ORANG TUA</h2>
        <div className="text-white px-4 py-1 rounded-full bg-gray-700">
          PROGRESS
        </div>
      </div>
      
      {formStep === 1 && (
        <div>
          <h3 className="font-bold mb-4 text-left">LANGKAH 1: IDENTITAS ANAK</h3>
          <div className="grid grid-cols-2 gap-4">
            <input name="childName" value={formData.childName || ''} onChange={handleChange} type="text" placeholder="NAMA LENGKAP ANAK" className={inputClass} />
            <input name="childNickname" value={formData.childNickname || ''} onChange={handleChange} type="text" placeholder="NAMA PANGGILAN" className={inputClass} />
            <select name="childGender" value={formData.childGender || ''} onChange={handleChange} className={inputClass}>
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
            <input name="childNik" value={formData.childNik || ''} onChange={handleChange} type="text" placeholder="NIK ANAK (OPSIONAL)" className={inputClass} />
            <input name="childBirthPlace" value={formData.childBirthPlace || ''} onChange={handleChange} type="text" placeholder="TEMPAT, TANGGAL LAHIR" className={inputClass} />
            <input name="childReligion" value={formData.childReligion || ''} onChange={handleChange} type="text" placeholder="AGAMA" className={inputClass} />
            <textarea name="childAddress" value={formData.childAddress || ''} onChange={handleChange} placeholder="ALAMAT LENGKAP DOMISILI ANAK" className={`${inputClass} col-span-2`} />
          </div>
          <button onClick={nextStep} className={primaryBtnClass}>LANJUTKAN</button>
        </div>
      )}

      {formStep === 2 && (
        <div>
          <h3 className="font-bold mb-4 text-left">LANGKAH 2: DATA WALI / ORANG TUA</h3>
          <div className="space-y-4">
            <p className="text-left font-bold">1. WALI: AYAH</p>
            <input name="fatherName" value={formData.fatherName || ''} onChange={handleChange} type="text" placeholder="NAMA LENGKAP" className={inputClass} />
            <input name="fatherNik" value={formData.fatherNik || ''} onChange={handleChange} type="text" placeholder="NIK KTP" className={inputClass} />
            <input name="fatherBirthPlace" value={formData.fatherBirthPlace || ''} onChange={handleChange} type="text" placeholder="TEMPAT, TGL LAHIR" className={inputClass} />
            <input name="fatherJob" value={formData.fatherJob || ''} onChange={handleChange} type="text" placeholder="PEKERJAAN" className={inputClass} />
            <input name="fatherPhone" value={formData.fatherPhone || ''} onChange={handleChange} type="text" placeholder="NO. HANDPHONE (WHATSAPP)" className={inputClass} />
            <input name="fatherEmail" value={formData.fatherEmail || ''} onChange={handleChange} type="email" placeholder="ALAMAT EMAIL" className={inputClass} />
            <textarea name="fatherAddress" value={formData.fatherAddress || ''} onChange={handleChange} placeholder="ALAMAT DOMISILI" className={inputClass} />
          </div>
          <div className="space-y-4 mt-6">
            <p className="text-left font-bold">2. WALI: BUNDA</p>
            <input name="motherName" value={formData.motherName || ''} onChange={handleChange} type="text" placeholder="NAMA LENGKAP" className={inputClass} />
            <input name="motherNik" value={formData.motherNik || ''} onChange={handleChange} type="text" placeholder="NIK KTP" className={inputClass} />
            <input name="motherBirthPlace" value={formData.motherBirthPlace || ''} onChange={handleChange} type="text" placeholder="TEMPAT, TGL LAHIR" className={inputClass} />
            <input name="motherJob" value={formData.motherJob || ''} onChange={handleChange} type="text" placeholder="PEKERJAAN" className={inputClass} />
            <input name="motherPhone" value={formData.motherPhone || ''} onChange={handleChange} type="text" placeholder="NO. HANDPHONE (WHATSAPP)" className={inputClass} />
            <input name="motherEmail" value={formData.motherEmail || ''} onChange={handleChange} type="email" placeholder="ALAMAT EMAIL" className={inputClass} />
            <textarea name="motherAddress" value={formData.motherAddress || ''} onChange={handleChange} placeholder="ALAMAT DOMISILI" className={inputClass} />
          </div>
          <div className="flex gap-4 mt-6">
            <button onClick={prevStep} className={secondaryBtnClass}>KEMBALI</button>
            <button onClick={nextStep} className={`${primaryBtnClass} w-1/2 mt-0`}>LANJUTKAN</button>
          </div>
        </div>
      )}
      
      {formStep === 3 && (
        <div>
          <h3 className="font-bold mb-4 text-left">LANGKAH 3: RIWAYAT & KEBIASAAN</h3>
          <p className="text-sm text-left mb-4">INFORMASI PENTING UNTUK KENYAMANAN ANAK DI DAYCARE</p>
          <div className="space-y-4">
            <textarea name="healthHistory" value={formData.healthHistory || ''} onChange={handleChange} placeholder="RIWAYAT PENYAKIT" className={inputClass} />
            <textarea name="allergies" value={formData.allergies || ''} onChange={handleChange} placeholder="ALERGI" className={inputClass} />
            <textarea name="favoriteFoodAndToy" value={formData.favoriteFoodAndToy || ''} onChange={handleChange} placeholder="KESUKAAN" className={inputClass} />
            <textarea name="sleepAndTantrumHabits" value={formData.sleepAndTantrumHabits || ''} onChange={handleChange} placeholder="KEBIASAAN" className={inputClass} />
          </div>
          <div className="flex gap-4 mt-6">
            <button onClick={prevStep} className={secondaryBtnClass}>KEMBALI</button>
            <button onClick={nextStep} className={`${primaryBtnClass} w-1/2 mt-0`}>LANJUTKAN</button>
          </div>
        </div>
      )}

      {formStep === 4 && (
        <div>
          <h3 className="font-bold mb-4 text-left">LANGKAH 4: KESEPAKATAN & TATA TERTIB</h3>
          <div className="p-4 rounded-lg space-y-2 border-2 border-[#42210b]">
            <p className="font-bold text-red-500">POIN 1: KEHADIRAN</p>
            <p className="font-bold text-red-500">POIN 2: ADMINISTRASI</p>
            <p className="font-bold text-red-500">POIN 3: KESEHATAN</p>
          </div>
          <div className="flex gap-4 mt-6">
            <button onClick={prevStep} className={secondaryBtnClass}>KEMBALI</button>
            <button onClick={nextStep} className={`${primaryBtnClass} w-1/2 mt-0`}>LANJUTKAN</button>
          </div>
        </div>
      )}

      {formStep === 5 && (
        <div>
          <h3 className="font-bold mb-4 text-left">LANGKAH 5: VALIDASI TANDA TANGAN</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-center">AYAH / WALI</label>
              <div className="h-32 rounded-lg mt-2 relative border-2 border-[#42210b]">
                <SignatureCanvas 
                  ref={fatherSigRef} 
                  penColor='#42210b'
                  canvasProps={{className: 'w-full h-full'}}
                  onEnd={() => handleSignatureEnd('fatherSignature', fatherSigRef)}
                />
                <button onClick={() => clearSignature('fatherSignature', fatherSigRef)} className="absolute top-1 right-1 px-2 text-sm rounded border-2 border-[#42210b] text-[#42210b] hover:bg-gray-100 transition-all">RESET</button>
              </div>
            </div>
            <div>
              <label className="block text-center">BUNDA / WALI</label>
              <div className="h-32 rounded-lg mt-2 relative border-2 border-[#42210b]">
                <SignatureCanvas 
                  ref={motherSigRef} 
                  penColor='#42210b' 
                  canvasProps={{className: 'w-full h-full'}} 
                  onEnd={() => handleSignatureEnd('motherSignature', motherSigRef)}
                />
                <button onClick={() => clearSignature('motherSignature', motherSigRef)} className="absolute top-1 right-1 px-2 text-sm rounded border-2 border-[#42210b] text-[#42210b] hover:bg-gray-100 transition-all">RESET</button>
              </div>
            </div>
          </div>
          <div className="flex gap-4 mt-6">
            <button onClick={prevStep} className={secondaryBtnClass}>KEMBALI</button>
            <button onClick={submitData} className={`${primaryBtnClass} w-1/2 mt-0`}>KIRIM</button>
          </div>
        </div>
      )}
       
    </div>
  );
};

export default PublicRegistration;
