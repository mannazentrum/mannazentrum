
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { RegistrationEntry, Gender, Guardian } from '../types';

interface RegistrationFormProps {
  onBack: () => void;
  onBackToLanding?: () => void;
  onRegister: (data: RegistrationEntry) => void;
}

type RegType = 'parent' | 'teacher' | null;

const inputClass = "p-2 rounded-lg border-2 border-[#42210b] text-[#42210b] placeholder:text-[#42210b] placeholder:opacity-60 bg-transparent w-full";
const primaryBtnClass = "w-full bg-[#42210b] text-white p-3 rounded-full mt-6 font-bold uppercase tracking-wider shadow-md hover:bg-black transition-all active:scale-95 border-b-4 border-black/30";
const secondaryBtnClass = "w-1/2 bg-white text-[#42210b] border-2 border-[#42210b] p-3 rounded-full font-bold uppercase tracking-wider shadow-md hover:bg-gray-100 transition-all active:scale-95";
const labelClass = "text-xs font-black uppercase text-[#42210b]/60 mb-2 block tracking-widest ml-1";

const GuardianInputGroup = React.memo(({ 
  title, 
  data, 
  onFieldChange 
}: { 
  title: string, 
  data: Guardian, 
  onFieldChange: (field: keyof Guardian, value: string) => void 
}) => {
  return (
    <div className="space-y-6 p-8 bg-[#42210b]/5 rounded-[50px] border border-[#42210b]/5 shadow-inner">
      <h4 className="text-[#42210b] font-black uppercase tracking-widest text-sm border-b-2 border-[#42210b]/10 pb-2">{title}</h4>
      <div className="space-y-1">
        <label className={labelClass}>Nama Lengkap</label>
        <input 
          type="text" 
          className={inputClass} 
          value={data.nama} 
          onChange={e => onFieldChange('nama', e.target.value)} 
        />
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-1">
          <label className={labelClass}>NIK KTP</label>
          <input 
            type="text" 
            className={inputClass} 
            value={data.nik} 
            onChange={e => onFieldChange('nik', e.target.value)} 
          />
        </div>
        <div className="space-y-1">
          <label className={labelClass}>Tempat, Tgl Lahir</label>
          <input 
            type="text" 
            className={inputClass} 
            value={data.ttl} 
            onChange={e => onFieldChange('ttl', e.target.value)} 
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-1">
          <label className={labelClass}>Pekerjaan</label>
          <input 
            type="text" 
            className={inputClass} 
            value={data.pekerjaan} 
            onChange={e => onFieldChange('pekerjaan', e.target.value)} 
          />
        </div>
        <div className="space-y-1">
          <label className={labelClass}>No. Handphone (WhatsApp)</label>
          <input 
            type="text" 
            className={inputClass} 
            value={data.hp} 
            onChange={e => onFieldChange('hp', e.target.value)} 
          />
        </div>
      </div>
      <div className="space-y-1">
        <label className={labelClass}>Alamat Email</label>
        <input 
          type="email" 
          className={inputClass} 
          value={data.email} 
          onChange={e => onFieldChange('email', e.target.value)} 
        />
      </div>
      <div className="space-y-1">
        <label className={labelClass}>Alamat Domisili</label>
        <textarea 
          className={`${inputClass} h-24`} 
          value={data.alamat} 
          onChange={e => onFieldChange('alamat', e.target.value)}
        ></textarea>
      </div>
    </div>
  );
});

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onBack, onBackToLanding, onRegister }) => {
  const [regType, setRegType] = useState<RegType>(null);
  const [staffRole, setStaffRole] = useState<'Guru' | 'Coordinator'>('Guru');
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [sigAyah, setSigAyah] = useState<string>('');
  const [sigBunda, setSigBunda] = useState<string>('');

  const [ayahData, setAyahData] = useState<Guardian>({ nama: '', nik: '', ttl: '', pekerjaan: '', hp: '', email: '', alamat: '' });
  const [bundaData, setBundaData] = useState<Guardian>({ nama: '', nik: '', ttl: '', pekerjaan: '', hp: '', email: '', alamat: '' });

  const handleAyahChange = useCallback((field: keyof Guardian, value: string) => {
    setAyahData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleBundaChange = useCallback((field: keyof Guardian, value: string) => {
    setBundaData(prev => ({ ...prev, [field]: value }));
  }, []);

  const [childInfo, setChildInfo] = useState({
    fullName: '', nickname: '', gender: 'Laki-laki' as Gender, nik: '', ttl: '', agama: '', alamat: ''
  });
  const [healthInfo, setHealthInfo] = useState({
    penyakit: '', alergi: '', kesukaan: '', kebiasaan: ''
  });
  const [personalData, setPersonalData] = useState({
    nama: '', nik: '', ttl: '', pekerjaan: '', hp: '', email: '', alamat: ''
  });
  const [accountData, setAccountData] = useState({
    username: '', email: '', phone: '', password: ''
  });

  const canvasRefAyah = useRef<HTMLCanvasElement>(null);
  const canvasRefIbu = useRef<HTMLCanvasElement>(null);

  const clearCanvas = (ref: React.RefObject<HTMLCanvasElement>) => {
    const canvas = ref.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const captureSignaturesAndContinue = () => {
    if (canvasRefAyah.current) setSigAyah(canvasRefAyah.current.toDataURL());
    if (canvasRefIbu.current) setSigBunda(canvasRefIbu.current.toDataURL());
    setStep(6);
  };

  const handleFinalSubmit = async () => {
    setUploading(true);
    const regId = `REG-${Math.floor(1000 + Math.random() * 9000)}`;
    
    let urlAyah = "";
    let urlBunda = "";

    try {
      // UPLOAD SIGNATURES TO FIREBASE STORAGE
      if (sigAyah) {
        const storageRef = ref(storage, `signatures/${regId}_ayah.png`);
        await uploadString(storageRef, sigAyah, 'data_url');
        urlAyah = await getDownloadURL(storageRef);
      }
      if (sigBunda) {
        const storageRef = ref(storage, `signatures/${regId}_bunda.png`);
        await uploadString(storageRef, sigBunda, 'data_url');
        urlBunda = await getDownloadURL(storageRef);
      }

      const newEntry: RegistrationEntry = {
        id: regId,
        type: regType === 'parent' ? 'Orang Tua' : staffRole,
        status: 'Not Yet',
        date: new Date().toISOString().split('T')[0],
        username: accountData.username,
        email: accountData.email || (regType === 'parent' ? bundaData.email : personalData.email),
        phone: accountData.phone || (regType === 'parent' ? bundaData.hp : personalData.hp),
        password: accountData.password,
        signatureAyah: urlAyah,
        signatureBunda: urlBunda,
        ayah: regType === 'parent' ? ayahData : undefined,
        bunda: regType === 'parent' ? bundaData : undefined,
        personalData: regType === 'teacher' ? {
          nama: personalData.nama,
          nik: personalData.nik,
          ttl: personalData.ttl,
          pekerjaan: staffRole,
          alamat: personalData.alamat
        } : {
          nama: bundaData.nama,
          nik: bundaData.nik,
          ttl: bundaData.ttl,
          pekerjaan: bundaData.pekerjaan,
          alamat: bundaData.alamat
        },
        childData: regType === 'parent' ? {
          ...childInfo,
          kesehatan: healthInfo
        } : undefined
      };

      onRegister(newEntry);
      setIsSubmitted(true);
    } catch (e) {
      console.error("Upload Registration Error:", e);
      alert("Gagal mengunggah data pendaftaran. Cek koneksi internet Anda.");
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    if (regType === 'parent' && step === 5) {
      const setupCanvas = (canvas: HTMLCanvasElement) => {
        let drawing = false;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.strokeStyle = '#42210b'; 
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        const getPos = (e: any) => {
          const rect = canvas.getBoundingClientRect();
          const clientX = e.clientX || e.touches?.[0].clientX;
          const clientY = e.clientY || e.touches?.[0].clientY;
          return { x: clientX - rect.left, y: clientY - rect.top };
        };
        const startDrawing = (e: any) => { drawing = true; const pos = getPos(e); ctx.beginPath(); ctx.moveTo(pos.x, pos.y); };
        const draw = (e: any) => { if (!drawing) return; const pos = getPos(e); ctx.lineTo(pos.x, pos.y); ctx.stroke(); };
        const stopDrawing = () => { drawing = false; };
        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', stopDrawing);
        canvas.addEventListener('touchstart', startDrawing, { passive: false });
        canvas.addEventListener('touchmove', draw, { passive: false });
        canvas.addEventListener('touchend', stopDrawing);
      };
      setTimeout(() => {
        if (canvasRefAyah.current) setupCanvas(canvasRefAyah.current);
        if (canvasRefIbu.current) setupCanvas(canvasRefIbu.current);
      }, 100);
    }
  }, [step, regType]);

  const renderParentStep = () => {
    switch (step) {
      case 1: 
        return (
          <div className="space-y-6 animate-fadeIn">
            <h3 className="text-2xl font-black font-rounded text-[#42210b] uppercase tracking-tight">Langkah 1: Identitas Anak</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-1"><label className={labelClass}>Nama Lengkap Anak</label><input type="text" className={inputClass} value={childInfo.fullName} onChange={e => setChildInfo({...childInfo, fullName: e.target.value})} /></div>
              <div className="space-y-1"><label className={labelClass}>Nama Panggilan</label><input type="text" className={inputClass} value={childInfo.nickname} onChange={e => setChildInfo({...childInfo, nickname: e.target.value})} /></div>
              <div className="space-y-1"><label className={labelClass}>Jenis Kelamin</label><select className={inputClass} value={childInfo.gender} onChange={e => setChildInfo({...childInfo, gender: e.target.value as Gender})}><option value="Laki-laki">Laki-laki</option><option value="Perempuan">Perempuan</option></select></div>
              <div className="space-y-1"><label className={labelClass}>NIK Anak (Opsional)</label><input type="text" className={inputClass} value={childInfo.nik} onChange={e => setChildInfo({...childInfo, nik: e.target.value})} /></div>
              <div className="space-y-1"><label className={labelClass}>Tempat, Tanggal Lahir</label><input type="text" className={inputClass} value={childInfo.ttl} onChange={e => setChildInfo({...childInfo, ttl: e.target.value})} /></div>
              <div className="space-y-1"><label className={labelClass}>Agama</label><input type="text" className={inputClass} value={childInfo.agama} onChange={e => setChildInfo({...childInfo, agama: e.target.value})} /></div>
            </div>
            <div className="space-y-1"><label className={labelClass}>Alamat Lengkap Domisili Anak</label><textarea className={`${inputClass} h-24`} value={childInfo.alamat} onChange={e => setChildInfo({...childInfo, alamat: e.target.value})}></textarea></div>
          </div>
        );
      case 2: 
        return (
          <div className="space-y-10 animate-fadeIn">
            <div>
              <h3 className="text-2xl font-black font-rounded text-[#42210b] uppercase tracking-tight">Langkah 2: Data Wali / Orang Tua</h3>
              <p className="text-[10px] font-black text-[#42210b]/40 uppercase tracking-widest mt-1">Lengkapi data Ayah dan Bunda secara terpisah (Sama-sama Wali)</p>
            </div>
            <div className="space-y-12">
              <GuardianInputGroup title="1. Wali: Ayah" data={ayahData} onFieldChange={handleAyahChange} />
              <GuardianInputGroup title="2. Wali: Bunda" data={bundaData} onFieldChange={handleBundaChange} />
            </div>
          </div>
        );
      case 3: 
        return (
          <div className="space-y-8 animate-fadeIn">
            <div><h3 className="text-2xl font-black font-rounded text-[#42210b] uppercase tracking-tight leading-none mb-2">Langkah 3: Riwayat & Kebiasaan</h3><p className="text-xs font-bold text-[#42210b]/40 uppercase tracking-widest">Informasi penting untuk kenyamanan anak di daycare</p></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3"><label className={labelClass}>🏥 Riwayat Penyakit</label><textarea className={`${inputClass} h-32 text-sm`} value={healthInfo.penyakit} onChange={e => setHealthInfo({...healthInfo, penyakit: e.target.value})}></textarea></div>
              <div className="space-y-3"><label className={labelClass}>🚫 Alergi</label><textarea className={`${inputClass} h-32 text-sm`} value={healthInfo.alergi} onChange={e => setHealthInfo({...healthInfo, alergi: e.target.value})}></textarea></div>
              <div className="space-y-3"><label className={labelClass}>🧸 Kesukaan</label><textarea className={`${inputClass} h-32 text-sm`} value={healthInfo.kesukaan} onChange={e => setHealthInfo({...healthInfo, kesukaan: e.target.value})}></textarea></div>
              <div className="space-y-3"><label className={labelClass}>💤 Kebiasaan</label><textarea className={`${inputClass} h-32 text-sm`} value={healthInfo.kebiasaan} onChange={e => setHealthInfo({...healthInfo, kebiasaan: e.target.value})}></textarea></div>
            </div>
          </div>
        );
      case 4: 
        return (
          <div className="space-y-6 animate-fadeIn">
            <h3 className="text-2xl font-black font-rounded text-[#42210b] uppercase tracking-tight">Langkah 4: Kesepakatan & Tata Tertib</h3>
            <div className="h-96 overflow-y-auto p-8 bg-[#42210b] text-white/90 rounded-[40px] text-sm leading-relaxed space-y-6 shadow-2xl border-4 border-white/10">
              <div className="space-y-2"><h4 className="font-black text-orange-400 uppercase tracking-widest text-xs">Poin 1: Kehadiran</h4><p>Orang tua menyetujui anak untuk mengikuti seluruh jadwal harian stimulasi.</p></div>
              <div className="space-y-2"><h4 className="font-black text-orange-400 uppercase tracking-widest text-xs">Poin 2: Administrasi</h4><p>Pembayaran iuran bulanan (SPP) dilakukan paling lambat tanggal 5.</p></div>
              <div className="space-y-2"><h4 className="font-black text-orange-400 uppercase tracking-widest text-xs">Poin 3: Kesehatan</h4><p>Anak yang sakit menular disarankan beristirahat di rumah.</p></div>
            </div>
          </div>
        );
      case 5: 
         return (
          <div className="space-y-8 animate-fadeIn">
            <div><h3 className="text-2xl font-black font-rounded text-[#42210b] uppercase tracking-tight leading-none mb-2">Langkah 5: Validasi Tanda Tangan</h3></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4"><span className="text-sm font-black text-[#42210b] uppercase tracking-widest block text-center">Ayah / Wali</span><div className="relative border-2 border-[#42210b] rounded-lg bg-white overflow-hidden shadow-inner"><canvas ref={canvasRefAyah} width={400} height={200} className="w-full h-48 cursor-crosshair touch-none"></canvas><button type="button" onClick={() => clearCanvas(canvasRefAyah)} className="absolute top-1 right-1 px-2 text-sm rounded border-2 border-[#42210b] text-[#42210b] hover:bg-gray-100 transition-all">Reset</button></div></div>
              <div className="space-y-4"><span className="text-sm font-black text-[#42210b] uppercase tracking-widest block text-center">Bunda / Wali</span><div className="relative border-2 border-[#42210b] rounded-lg bg-white overflow-hidden shadow-inner"><canvas ref={canvasRefIbu} width={400} height={200} className="w-full h-48 cursor-crosshair touch-none"></canvas><button type="button" onClick={() => clearCanvas(canvasRefIbu)} className="absolute top-1 right-1 px-2 text-sm rounded border-2 border-[#42210b] text-[#42210b] hover:bg-gray-100 transition-all">Reset</button></div></div>
            </div>
          </div>
         );
      case 6: 
        return (
          <div className="space-y-8 animate-fadeIn">
            <div><h3 className="text-2xl font-black font-rounded text-[#42210b] uppercase tracking-tight leading-none mb-2">Langkah 6: Pengaturan Akun Portal</h3></div>
            <div className="space-y-6 max-w-xl mx-auto">
               <div className="space-y-1"><label className={labelClass}>Username Pilihan</label><input type="text" className={inputClass} value={accountData.username} onChange={e => setAccountData({...accountData, username: e.target.value})} /></div>
               <div className="space-y-1"><label className={labelClass}>Password Akun</label><input type="password" className={inputClass} value={accountData.password} onChange={e => setAccountData({...accountData, password: e.target.value})} /></div>
               <div className="p-6 bg-yellow-100 rounded-3xl border border-yellow-200"><p className="text-xs font-bold text-yellow-800 italic">* Simpan username dan password Anda. Akun baru akan aktif setelah mendapatkan persetujuan Admin.</p></div>
            </div>
          </div>
        );
      default: return null;
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-pdf-cream p-6 flex flex-col items-center justify-center">
        <div className="max-w-xl w-full bg-white rounded-[60px] shadow-2xl p-16 text-center border-4 border-[#42210b] animate-fadeIn">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-5xl mx-auto mb-10 border-2 border-green-200">✨</div>
          <h3 className="text-4xl font-black font-rounded text-[#42210b] mb-6 uppercase tracking-tighter">Pendaftaran Selesai!</h3>
          <p className="text-lg text-[#42210b]/60 mb-10 font-bold">Data pendaftaran telah diarsipkan ke Cloud. Admin akan mereview dalam 1x24 jam.</p>
          <button onClick={onBack} className={primaryBtnClass}>Ke Halaman Login</button>
        </div>
      </div>
    );
  }

  if (!regType) {
    return (
      <div className="min-h-screen bg-pdf-cream p-6 flex flex-col items-center justify-center animate-fadeIn">
        <h2 className="text-5xl font-black font-rounded text-[#42210b] mb-20 uppercase tracking-tighter text-center">Daftar Akun Baru</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-5xl">
          <button onClick={() => setRegType('parent')} className="bg-white p-16 rounded-[80px] shadow-2xl border-4 border-transparent hover:border-[#42210b] transition-all group flex flex-col items-center transform hover:-translate-y-4"><span className="text-7xl mb-10">👨‍👩‍👧</span><span className="text-3xl font-black text-[#42210b] uppercase text-center">Registrasi <br/> Orang Tua</span></button>
          <button onClick={() => setRegType('teacher')} className="bg-white p-16 rounded-[80px] shadow-2xl border-4 border-transparent hover:border-[#42210b] transition-all group flex flex-col items-center transform hover:-translate-y-4"><span className="text-7xl mb-10">👩‍🏫</span><span className="text-3xl font-black text-[#42210b] uppercase text-center">Registrasi <br/> Staff / Guru</span></button>
        </div>
        <button onClick={onBack} className="mt-20 text-[#42210b]/40 font-black hover:text-[#42210b] uppercase tracking-[0.3em] text-[10px] border-b-2 border-transparent hover:border-[#42210b] pb-1">Batal</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pdf-cream p-6 flex flex-col items-center overflow-y-auto">
      <div className="w-full max-w-5xl bg-white rounded-[70px] shadow-2xl p-10 md:p-20 border-2 border-[#42210b]/5 my-10 relative">
        <div className="flex items-center justify-between mb-16">
          <button onClick={() => setRegType(null)} className="w-14 h-14 bg-pdf-cream text-[#42210b] rounded-full flex items-center justify-center text-3xl hover:scale-110">←</button>
          <div className="text-center"><h2 className="text-3xl font-black font-rounded text-[#42210b] uppercase tracking-tighter">{regType === 'parent' ? 'Formulir Orang Tua' : 'Formulir Staf/Guru'}</h2><p className="text-[10px] font-black text-[#42210b]/40 uppercase tracking-[0.4em] mt-2">Mannazentrum Cloud Sync</p></div>
          {regType === 'parent' && <div className="flex flex-col items-end"><span className="text-[10px] font-black uppercase text-[#42210b]/30">Progress</span><span className="bg-[#42210b] text-white px-6 py-2 rounded-full text-xs font-black uppercase shadow-lg mt-1">{step} / 6</span></div>}
        </div>
        
        {regType === 'parent' ? renderParentStep() : (
           <div className="space-y-8 animate-fadeIn max-w-2xl mx-auto">
              <div className="space-y-1">
                <label className={labelClass}>Role Pengguna</label>
                <select 
                  className={inputClass} 
                  value={staffRole} 
                  onChange={e => setStaffRole(e.target.value as 'Guru' | 'Coordinator')}
                >
                  <option value="Guru">Guru / Staff Operasional</option>
                  <option value="Coordinator">Koordinator Program</option>
                </select>
              </div>
              <div className="space-y-1"><label className={labelClass}>Nama Lengkap ({staffRole})</label><input type="text" className={inputClass} value={personalData.nama} onChange={e => setPersonalData({...personalData, nama: e.target.value})} /></div>
              <div className="space-y-1"><label className={labelClass}>NIK KTP</label><input type="text" className={inputClass} value={personalData.nik} onChange={e => setPersonalData({...personalData, nik: e.target.value})} /></div>
              <div className="space-y-1"><label className={labelClass}>No. Handphone</label><input type="text" className={inputClass} value={personalData.hp} onChange={e => setPersonalData({...personalData, hp: e.target.value})} /></div>
              <div className="grid grid-cols-2 gap-8 pt-4"><div className="space-y-1"><label className={labelClass}>Username Login</label><input type="text" className={inputClass} value={accountData.username} onChange={e => setAccountData({...accountData, username: e.target.value})} /></div><div className="space-y-1"><label className={labelClass}>Password</label><input type="password" className={inputClass} value={accountData.password} onChange={e => setAccountData({...accountData, password: e.target.value})} /></div></div>
              <button disabled={uploading} onClick={handleFinalSubmit} className={`${primaryBtnClass} text-2xl`}>
                {uploading ? 'Menyimpan ke Cloud...' : 'Kirim Pendaftaran'}
              </button>
           </div>
        )}
        
        {regType === 'parent' && (
          <div className="mt-24 flex gap-8">
            {step > 1 && <button onClick={() => setStep(step - 1)} className={`${secondaryBtnClass} flex-1`}>Kembali</button>}
            <button disabled={uploading} onClick={() => {
              if (step === 5) captureSignaturesAndContinue();
              else if (step < 6) setStep(step + 1);
              else handleFinalSubmit();
            }} className={`${primaryBtnClass} flex-[2]`}>
              {uploading ? '⌛ Tunggu...' : (step === 6 ? 'Selesaikan' : 'Lanjutkan')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;
