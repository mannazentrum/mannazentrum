
import React, { useState, useRef, useEffect } from 'react';
import { User, UserRole, RegistrationEntry, WebsiteContent } from '../types';
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import Logo from './Logo';

interface StaffDashboardProps {
  user: User;
  onLogout: () => void;
  registrations: RegistrationEntry[];
  onUpdateStatus: (id: string, newStatus: 'Approved' | 'Not Yet') => void;
  onSaveReport?: (childId: string, date: string, data: any) => void;
  dailyReports?: Record<string, any>;
  scheduledMenus: any[];
  setScheduledMenu: (date: string, data: any) => void;
  scheduledCurriculums: any[];
  setScheduledCurriculum: (date: string, data: any) => void;
  websiteContent?: WebsiteContent;
  setWebsiteContent?: (content: WebsiteContent) => void;
}

const StaffDashboard: React.FC<StaffDashboardProps> = ({ 
  user, onLogout, registrations, onUpdateStatus, scheduledMenus, 
  setScheduledMenu, scheduledCurriculums, setScheduledCurriculum,
  websiteContent, setWebsiteContent
}) => {
  const isAdmin = user.role === UserRole.ADMIN;
  const [managementView, setManagementView] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [controlTab, setControlTab] = useState<'USER' | 'CMS' | 'AI' | 'LOG'>('USER');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Functional Input States
  const [menuInputs, setMenuInputs] = useState({ sarapan: '', snackPagi: '', makanSiang: '', snackSore: '' });
  const [currInputs, setCurrInputs] = useState({ 
    gross: ['', '', ''], 
    fine: ['', '', ''], 
    threeRs: ['', '', ''] 
  });

  const goHome = () => setManagementView(null);

  const managementItems = [
    "ADMIN APPROVAL", "ARSIP PENDAFTARAN", "DATA ANAK", "DATA ORANG TUA",
    "DATA GURU & KOORDINATOR", "PROGRAM DAYCARE", "JADWAL MENU MAKANAN",
    "JADWAL KURIKULUM", "PAYROLL KARYAWAN", "BILLING & INVOICES", "PUSAT KONTROL SISTEM"
  ];

  const handlePdfTrigger = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      setTimeout(() => {
        setIsUploading(false);
        alert(`Berhasil mengunggah: ${file.name}`);
      }, 1500);
    }
  };

  const renderEmptyState = (message: string) => (
    <div className="flex flex-col items-center justify-center py-32 opacity-20">
      <span className="text-8xl mb-8">📂</span>
      <p className="font-black uppercase tracking-[0.6em] text-2xl text-[#42210b]">{message}</p>
      <p className="text-sm font-bold mt-4 uppercase tracking-[0.2em] text-[#42210b]">Sistem menunggu data disetujui</p>
    </div>
  );

  const renderManagementContent = () => {
    const SectionTitle = ({ title }: { title: string }) => (
      <h2 className="text-6xl font-black text-[#42210b] uppercase tracking-tighter mb-14 leading-none">{title}</h2>
    );

    const activeMurid = registrations.filter(r => r.type === 'Orang Tua' && r.status === 'Approved');

    switch (managementView) {
      case 'ADMIN APPROVAL':
        return (
          <div className="max-w-7xl mx-auto animate-fadeIn">
            <SectionTitle title="APPROVAL QUEUE" />
            <div className="bg-white rounded-[70px] shadow-2xl p-12 border border-black/5 overflow-hidden">
               {registrations.filter(r => r.status === 'Not Yet').length === 0 ? (
                 renderEmptyState("Antrean Kosong")
               ) : (
                 <table className="w-full text-left">
                   <thead className="bg-[#42210b] text-white">
                     <tr className="text-[12px] font-black uppercase tracking-[0.4em]">
                        <th className="p-10 pl-14 rounded-tl-[40px]">Tipe</th>
                        <th className="p-10">Nama Pendaftar</th>
                        <th className="p-10">Tgl Daftar</th>
                        <th className="p-10">Status</th>
                        <th className="p-10 text-right pr-14 rounded-tr-[40px]">Aksi</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-black/5">
                     {registrations.filter(r => r.status === 'Not Yet').map(reg => (
                       <tr key={reg.id} className="hover:bg-[#fdfbf7] transition-all group">
                         <td className="p-10 pl-14 font-bold text-xs uppercase text-black/40">{reg.type}</td>
                         <td className="p-10 font-black text-[#42210b] uppercase text-2xl leading-none">{reg.personalData?.nama}</td>
                         <td className="p-10 text-black/40 text-sm font-black">{reg.date}</td>
                         <td className="p-10">
                            <span className="bg-red-50 text-red-600 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-inner">PENDING</span>
                         </td>
                         <td className="p-10 text-right pr-14">
                            <button onClick={() => onUpdateStatus(reg.id, 'Approved')} className="bg-[#42210b] text-white px-12 py-5 rounded-full font-black text-[11px] uppercase tracking-widest hover:bg-black shadow-2xl transition-all active:scale-95">APPROVE USER 🔐</button>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               )}
            </div>
          </div>
        );

      case 'ARSIP PENDAFTARAN':
        return (
          <div className="max-w-7xl mx-auto animate-fadeIn">
            <SectionTitle title="ARSIP PENDAFTARAN" />
            <div className="bg-white rounded-[70px] shadow-2xl overflow-hidden border border-black/5 p-12">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[12px] font-black text-black/30 uppercase tracking-[0.4em] border-b border-black/5">
                    <th className="pb-10 pl-8">TIPE</th>
                    <th className="pb-10">NAMA PENDAFTAR</th>
                    <th className="pb-10">TGL DAFTAR</th>
                    <th className="pb-10">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {registrations.filter(r => r.status === 'Approved').map(reg => (
                    <tr key={reg.id} className="hover:bg-[#fdfbf7] transition-all group">
                      <td className="py-12 pl-8 font-bold text-sm uppercase text-black/40 leading-none">{reg.type}</td>
                      <td className="py-12 font-black text-[#42210b] uppercase text-3xl tracking-tighter leading-none group-hover:scale-105 transition-transform origin-left">{reg.personalData?.nama}</td>
                      <td className="py-12 text-black/40 text-base font-bold">{reg.date}</td>
                      <td className="py-12">
                        <span className="bg-[#e6fcf5] text-[#20c997] px-10 py-3.5 rounded-full text-[12px] font-black uppercase tracking-[0.2em] shadow-sm">APPROVED</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {registrations.filter(r => r.status === 'Approved').length === 0 && renderEmptyState("Arsip Kosong")}
            </div>
          </div>
        );

      case 'DATA ANAK':
        return (
          <div className="max-w-7xl mx-auto animate-fadeIn">
            <SectionTitle title="DATA MURID AKTIF" />
            {activeMurid.length === 0 ? (
              renderEmptyState("Data Murid Kosong")
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
                {activeMurid.map(reg => (
                  <div key={reg.id} className="bg-white rounded-[80px] shadow-2xl p-14 flex flex-col items-start border border-black/5 group hover:-translate-y-5 transition-all duration-700">
                    <div className="flex gap-10 items-center mb-14">
                      <div className="w-36 h-36 bg-[#42210b] rounded-[50px] flex items-center justify-center text-8xl shadow-2xl border-[8px] border-white group-hover:rotate-6 transition-transform">
                        {reg.childData?.gender === 'Perempuan' ? '👧' : '👶'}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-4xl font-black text-[#42210b] uppercase leading-none tracking-tighter mb-4">{reg.childData?.fullName}</h4>
                        <div className="h-2 w-20 bg-[#f3b524] rounded-full shadow-lg"></div>
                      </div>
                    </div>
                    
                    <div className="w-full space-y-8 mb-14">
                        <div className="flex justify-between items-center text-[13px] font-bold border-b-2 border-black/5 pb-5">
                          <span className="text-black/30 uppercase tracking-[0.3em]">PANGGILAN:</span>
                          <span className="text-[#42210b] uppercase font-black text-xl tracking-tighter">{reg.childData?.nickname}</span>
                        </div>
                        <div className="flex justify-between items-center text-[13px] font-bold border-b-2 border-black/5 pb-5">
                          <span className="text-black/30 uppercase tracking-[0.3em]">TTL:</span>
                          <span className="text-[#42210b] uppercase font-black text-base">{reg.childData?.ttl}</span>
                        </div>
                    </div>

                    <div className="w-full p-12 bg-[#fff1f1] rounded-[60px] border-2 border-red-100 shadow-inner relative overflow-hidden group/health">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-red-200/20 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                        <p className="text-[12px] font-black text-red-600 uppercase tracking-[0.4em] mb-5">ALERGI & KESEHATAN:</p>
                        <p className="text-2xl font-black text-[#42210b] leading-relaxed italic">{reg.childData?.kesehatan.alergi || 'Tidak Ada Data Alergi'}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'DATA ORANG TUA':
        return (
          <div className="max-w-7xl mx-auto space-y-16 animate-fadeIn">
            <SectionTitle title="DATA ORANG TUA MURID" />
            {activeMurid.length === 0 ? (
              renderEmptyState("Data Orang Tua Kosong")
            ) : (
              activeMurid.map(reg => (
                <div key={reg.id} className="bg-white rounded-[100px] shadow-2xl p-20 border border-black/5 relative hover:shadow-orange-100/50 transition-all duration-1000">
                  <div className="flex justify-between items-center mb-20 border-b-4 border-black/5 pb-12">
                    <h3 className="text-5xl font-black text-[#42210b] uppercase tracking-tighter">KELUARGA: {reg.childData?.fullName.toUpperCase()}</h3>
                    <div className="flex gap-8">
                      <button className="bg-[#42210b] text-white px-14 py-6 rounded-full font-black text-[14px] uppercase tracking-[0.4em] shadow-2xl flex items-center gap-5 hover:bg-black transition-all active:scale-95">📄 BUKA PDF PROFIL</button>
                      <span className="bg-[#f3b524] text-[#42210b] px-14 py-6 rounded-full font-black text-[14px] uppercase tracking-[0.4em] shadow-xl border-b-8 border-black/10">ID: {reg.id}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                    <div className="bg-[#fdfbf7] rounded-[70px] p-16 border border-black/5 shadow-inner flex flex-col group/dad">
                      <div className="flex items-center gap-10 mb-16">
                        <div className="w-28 h-28 bg-[#42210b] text-white rounded-[40px] flex items-center justify-center text-6xl shadow-2xl group-hover/dad:rotate-6 transition-transform">👨</div>
                        <h4 className="text-4xl font-black text-[#42210b] uppercase tracking-tight">DATA AYAH</h4>
                      </div>
                      <div className="space-y-12">
                        <div>
                          <p className="text-[14px] font-black text-black/30 uppercase tracking-[0.5em] mb-4">Nama Lengkap</p>
                          <p className="text-4xl font-black text-[#42210b] uppercase leading-none tracking-tighter">{reg.ayah?.nama || '-'}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-16">
                          <div>
                            <p className="text-[14px] font-black text-black/30 uppercase tracking-[0.5em] mb-4">Pekerjaan</p>
                            <p className="text-xl font-bold text-[#42210b] uppercase">{reg.ayah?.pekerjaan || '-'}</p>
                          </div>
                          <div>
                            <p className="text-[14px] font-black text-black/30 uppercase tracking-[0.5em] mb-4">Whatsapp</p>
                            <p className="text-xl font-black text-[#42210b] border-b-4 border-[#f3b524] inline-block pb-1">{reg.ayah?.hp || '-'}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#fdfbf7] rounded-[70px] p-16 border border-black/5 shadow-inner flex flex-col group/mom">
                      <div className="flex items-center gap-10 mb-16">
                        <div className="w-28 h-28 bg-[#42210b] text-white rounded-[40px] flex items-center justify-center text-6xl shadow-2xl group-hover/mom:-rotate-6 transition-transform">👩</div>
                        <h4 className="text-4xl font-black text-[#42210b] uppercase tracking-tight">DATA BUNDA</h4>
                      </div>
                      <div className="space-y-12">
                        <div>
                          <p className="text-[14px] font-black text-black/30 uppercase tracking-[0.5em] mb-4">Nama Lengkap</p>
                          <p className="text-4xl font-black text-[#42210b] uppercase leading-none tracking-tighter">{reg.bunda?.nama || '-'}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-16">
                          <div>
                            <p className="text-[14px] font-black text-black/30 uppercase tracking-[0.5em] mb-4">Pekerjaan</p>
                            <p className="text-xl font-bold text-[#42210b] uppercase">{reg.bunda?.pekerjaan || '-'}</p>
                          </div>
                          <div>
                            <p className="text-[14px] font-black text-black/30 uppercase tracking-[0.5em] mb-4">Whatsapp</p>
                            <p className="text-xl font-black text-[#42210b] border-b-4 border-[#f3b524] inline-block pb-1">{reg.bunda?.hp || '-'}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        );

      case 'PUSAT KONTROL SISTEM':
        return (
          <div className="max-w-7xl mx-auto space-y-20 animate-fadeIn pb-40">
            <div className="space-y-5 mb-24">
               <h2 className="text-[100px] font-black text-[#42210b] uppercase tracking-tighter leading-none">PUSAT KONTROL</h2>
               <p className="text-xl font-black text-black/30 uppercase tracking-[0.8em] ml-4">KELOLA INFRASTRUKTUR & KONFIGURASI</p>
            </div>
            
            <div className="bg-[#fdfbf7] rounded-full p-4 flex gap-6 max-w-6xl shadow-2xl border border-black/5">
               {(['USER', 'CMS', 'AI', 'LOG'] as const).map(tab => (
                 <button 
                  key={tab} 
                  onClick={() => setControlTab(tab)}
                  className={`flex-1 py-8 rounded-full font-black text-base uppercase tracking-[0.4em] transition-all duration-500 shadow-sm ${controlTab === tab ? 'bg-[#42210b] text-white scale-105 shadow-2xl' : 'text-black/30 hover:text-black hover:bg-black/5'}`}
                 >
                   {tab === 'USER' ? 'MANAJEMEN USER' : tab === 'CMS' ? 'CMS WEBSITE' : tab === 'AI' ? 'KONTROL AI' : 'AUDIT LOG'}
                 </button>
               ))}
            </div>

            <div className="bg-white rounded-[120px] shadow-2xl overflow-hidden border border-black/5 min-h-[900px] mt-24 p-20 relative">
               {controlTab === 'USER' && (
                  <div className="animate-fadeIn">
                    <table className="w-full text-left rounded-[70px] overflow-hidden shadow-inner">
                       <thead className="bg-[#42210b] text-white">
                          <tr className="text-sm font-black uppercase tracking-[0.5em]">
                             <th className="p-14 pl-20">USER / LOGIN</th>
                             <th className="p-14 text-center">TIPE AKUN</th>
                             <th className="p-14 text-center">KONTAK</th>
                             <th className="p-14 text-center">STATUS</th>
                             <th className="p-14 pr-20 text-center">AKSI</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-black/5">
                          {registrations.map(reg => (
                             <tr key={reg.id} className="hover:bg-[#fdfbf7] transition-all group">
                                <td className="p-14 pl-20">
                                   <p className="font-black text-[#42210b] text-4xl uppercase leading-none mb-4 group-hover:scale-110 transition-transform origin-left tracking-tighter">{reg.username}</p>
                                   <p className="text-[12px] font-bold text-black/30 uppercase tracking-[0.5em] italic">REG-ID: {reg.id}</p>
                                </td>
                                <td className="p-14 text-center font-black text-base text-black/40 uppercase tracking-[0.4em]">{reg.type}</td>
                                <td className="p-14 text-center">
                                   <span className="font-black text-2xl text-[#42210b] border-b-4 border-[#f3b524] pb-1 tracking-tighter">{reg.phone}</span>
                                </td>
                                <td className="p-14 text-center">
                                   <span className={`px-12 py-5 rounded-full text-[12px] font-black uppercase tracking-widest shadow-xl border-b-4 border-black/10 ${reg.status === 'Approved' ? 'bg-[#e6fcf5] text-[#20c997]' : 'bg-red-50 text-red-500 animate-pulse'}`}>
                                      {reg.status.toUpperCase()}
                                   </span>
                                </td>
                                <td className="p-14 text-center pr-20">
                                   <div className="flex gap-8 justify-center">
                                      <button className="bg-[#f3b524] p-8 rounded-[40px] shadow-2xl hover:scale-125 transition-all active:scale-90 text-white text-4xl border-b-8 border-black/10">🔑</button>
                                      <button onClick={() => deleteDoc(doc(db, "registrations", reg.id))} className="bg-[#ff4d4d] p-8 rounded-[40px] shadow-2xl hover:scale-125 transition-all text-white text-4xl active:scale-90 border-b-8 border-black/10">🗑️</button>
                                   </div>
                                </td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                  </div>
               )}

               {controlTab === 'CMS' && (
                 <div className="animate-fadeIn grid md:grid-cols-2 gap-24">
                    <div className="bg-[#fdfbf7] rounded-[100px] p-24 border border-black/5 shadow-inner">
                       <h4 className="text-5xl font-black text-[#42210b] uppercase mb-16 flex items-center gap-8">💻 HERO BANNER</h4>
                       <div className="space-y-16">
                          <div className="space-y-6">
                             <label className="text-sm font-black text-black/30 uppercase tracking-[0.6em] ml-12">JUDUL UTAMA WEBSITE</label>
                             <textarea 
                               className="w-full bg-white p-16 rounded-[70px] font-black text-[#42210b] text-4xl outline-none border-4 border-transparent focus:border-[#f3b524] shadow-2xl min-h-[220px] resize-none transition-all tracking-tighter" 
                               defaultValue={websiteContent?.heroTitle} 
                             />
                          </div>
                          <div className="space-y-6">
                             <label className="text-sm font-black text-black/30 uppercase tracking-[0.6em] ml-12">SUB-JUDUL HERO</label>
                             <textarea 
                               className="w-full bg-white p-16 rounded-[70px] font-bold text-black/50 text-xl outline-none border-4 border-transparent focus:border-[#f3b524] shadow-2xl min-h-[280px] resize-none transition-all leading-relaxed" 
                               defaultValue={websiteContent?.heroSubtitle} 
                             />
                          </div>
                       </div>
                    </div>
                    <div className="space-y-24">
                       <div className="bg-[#fdfbf7] rounded-[100px] p-24 border border-black/5 shadow-inner">
                          <div className="flex justify-between items-center mb-16">
                             <h4 className="text-5xl font-black text-[#42210b] uppercase flex items-center gap-8">📢 PENGUMUMAN</h4>
                             <div className="w-28 h-14 bg-[#42210b] rounded-full relative p-2 cursor-pointer shadow-2xl transition-transform active:scale-95">
                                <div className="absolute right-2 w-10 h-10 bg-[#f3b524] rounded-full shadow-2xl border-4 border-white/20"></div>
                             </div>
                          </div>
                          <div className="space-y-6">
                             <label className="text-sm font-black text-black/30 uppercase tracking-[0.6em] ml-12">ISI TEKS PENGUMUMAN</label>
                             <textarea 
                               className="w-full bg-white p-14 rounded-[60px] font-bold text-[#42210b] text-2xl outline-none border-4 border-transparent focus:border-[#f3b524] shadow-2xl min-h-[160px] resize-none transition-all" 
                               defaultValue={websiteContent?.announcementText} 
                             />
                          </div>
                       </div>
                       <div className="bg-[#fdfbf7] rounded-[100px] p-24 border border-black/5 shadow-inner">
                          <h4 className="text-5xl font-black text-[#42210b] uppercase mb-16 flex items-center gap-8">📞 KONTAK RESMI</h4>
                          <div className="space-y-6">
                             <label className="text-sm font-black text-black/30 uppercase tracking-[0.6em] ml-12">NOMOR WHATSAPP ADMIN</label>
                             <input 
                               className="w-full bg-white px-16 py-10 rounded-full font-black text-[#42210b] text-4xl outline-none border-4 border-transparent focus:border-[#f3b524] shadow-2xl transition-all tracking-tighter" 
                               defaultValue={websiteContent?.whatsappNumber} 
                             />
                          </div>
                       </div>
                    </div>
                    <button className="md:col-span-2 bg-[#42210b] text-white py-16 rounded-[100px] font-black text-5xl uppercase tracking-[0.7em] shadow-[0_50px_150px_rgba(0,0,0,0.4)] hover:bg-black transition-all active:scale-95 border-b-[15px] border-black/30">SINKRONISASI WEBSITE 🌐</button>
                 </div>
               )}

               {controlTab === 'AI' && (
                 <div className="animate-fadeIn max-w-7xl mx-auto flex flex-col items-center py-24">
                    <div className="w-60 h-60 bg-[#42210b] rounded-[80px] flex items-center justify-center text-[130px] text-[#f3b524] shadow-[0_40px_100px_rgba(0,0,0,0.5)] mb-20 border-[12px] border-white group hover:rotate-12 transition-all">✨</div>
                    <h3 className="text-[120px] font-black text-[#42210b] uppercase tracking-tighter mb-8 text-center leading-none">AI TRAINING</h3>
                    <p className="text-2xl font-black text-black/30 uppercase tracking-[1em] mb-24 text-center">PERSONALISE MALIKA AI ADVISOR</p>
                    <div className="w-full bg-[#fdfbf7] rounded-[120px] p-32 border border-black/5 shadow-inner group">
                       <label className="text-xl font-black text-black/20 uppercase tracking-[0.6em] mb-10 block ml-20 group-hover:text-[#f3b524] transition-colors">INSTRUCTION CONTEXT (SYSTEM MESSAGE)</label>
                       <textarea 
                         className="w-full bg-white min-h-[600px] p-24 rounded-[90px] font-bold text-[#42210b] text-3xl outline-none border-8 border-transparent focus:border-[#f3b524] shadow-[0_50px_100px_rgba(0,0,0,0.1)] transition-all leading-relaxed scrollbar-hide" 
                         placeholder="Tulis instruksi AI di sini..." 
                         defaultValue="Anda adalah AI Advisor untuk 'Malika Maliaki', sebuah brand lifestyle keluarga holistik. Gaya bicara Anda: Ramah, Islami (universal), bijaksana, dan menenangkan. Fokus topik: Parenting, pendidikan anak fitrah, produk herbal/alami, dan manajemen rumah tangga. Jika ditanya harga spesifik produk, arahkan ke katalog. Jawab dengan ringkas." 
                       />
                       <button className="w-full mt-20 bg-[#42210b] text-white py-16 rounded-[70px] font-black text-4xl uppercase tracking-[0.5em] shadow-[0_40px_100px_rgba(0,0,0,0.4)] hover:bg-black transition-all border-b-[15px] border-black/30">UPDATE KONTROL AI 🧠</button>
                    </div>
                 </div>
               )}

               {controlTab === 'LOG' && (
                 <div className="animate-fadeIn p-20">
                    <div className="flex justify-between items-center mb-20 px-14">
                       <h3 className="text-6xl font-black text-[#42210b] uppercase tracking-tighter">RIWAYAT AKTIVITAS ADMIN (AUDIT LOG)</h3>
                       <button className="bg-red-50 text-red-500 px-16 py-6 rounded-full font-black text-base uppercase tracking-[0.4em] hover:bg-red-100 transition shadow-2xl active:scale-95 border-b-4 border-red-200">CLEAR LOGS</button>
                    </div>
                    <div className="w-full bg-[#fdfbf7] rounded-[120px] py-80 border-[12px] border-dashed border-black/5 flex flex-col items-center justify-center opacity-30">
                       <span className="text-[200px] mb-16 drop-shadow-2xl">📜</span>
                       <p className="text-5xl font-black text-black uppercase tracking-[0.8em] italic">BELUM ADA AKTIVITAS TERCATAT</p>
                    </div>
                 </div>
               )}
            </div>
          </div>
        );

      case null:
        return (
          <div className="flex flex-col items-center py-10 space-y-24 animate-fadeIn min-h-[85vh] justify-center px-10">
            <h2 className="text-[150px] font-black text-[#42210b] uppercase tracking-tighter leading-none text-center drop-shadow-2xl">PILIH MURID</h2>
            <div className="flex flex-wrap justify-center gap-32 w-full max-w-8xl pb-40">
              {activeMurid.length === 0 ? (
                <div className="bg-white/50 backdrop-blur-3xl rounded-[120px] p-32 border-[10px] border-dashed border-[#42210b]/10 text-center animate-pulse">
                   <p className="text-5xl font-black text-[#42210b] uppercase tracking-[1em] opacity-20">Menunggu Data Aktif...</p>
                </div>
              ) : (
                activeMurid.map(reg => (
                  <div key={reg.id} className="cursor-pointer group flex flex-col items-center">
                    <div className="bg-white rounded-[160px] shadow-[0_80px_160px_rgba(0,0,0,0.25)] p-28 flex flex-col items-center justify-between relative overflow-hidden group-hover:-translate-y-20 transition-all duration-1000 w-[450px] h-[750px] border-b-[40px] border-black/5">
                      <div className="w-full flex flex-col items-center pt-16">
                        <div className="w-64 h-64 bg-[#42210b] text-white rounded-[90px] flex items-center justify-center text-[150px] shadow-[0_40px_100px_rgba(0,0,0,0.4)] mb-28 border-[12px] border-white group-hover:rotate-12 transition-all duration-1000">
                          {reg.childData?.gender === 'Perempuan' ? '👧' : '👶'}
                        </div>
                        <p className="font-black text-[#42210b] text-9xl uppercase tracking-tighter text-center leading-[0.8]">{reg.childData?.nickname}</p>
                      </div>
                      <div className="pb-16"><span className="text-[24px] font-black text-[#42210b]/30 uppercase tracking-[0.8em] border-t-8 border-black/5 pt-8">APPROVED</span></div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        );

      default: return null;
    }
  };

  return (
    <div className={`min-h-screen font-nunito flex flex-col transition-colors duration-1000 bg-[#f3b524]`}>
      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="application/pdf" className="hidden" />

      {/* Header - Match Screen 1 */}
      <header className="p-16 px-28 flex justify-between items-center relative z-[1000]">
         <div onClick={goHome} className="flex items-center gap-14 cursor-pointer group">
            <Logo size="lg" className="bg-transparent shadow-none border-none p-0 group-hover:scale-125 transition-transform duration-1000 drop-shadow-2xl" />
            <div className="flex flex-col">
               <h1 className="text-8xl font-black text-[#42210b] uppercase leading-none tracking-tighter mb-2">MZdaycare</h1>
               <div className="flex items-center gap-6 mt-2">
                 <p className="text-[20px] font-black text-[#42210b]/50 uppercase tracking-[0.6em]">{isAdmin ? 'ADMIN DASHBOARD' : 'Staff Portal'}</p>
                 <div className="w-6 h-6 rounded-full bg-green-500 animate-pulse shadow-[0_0_30px_rgba(34,197,94,1)] border-4 border-white/20"></div>
               </div>
            </div>
         </div>
         <div className="flex items-center gap-16">
            {isAdmin && (
              <div className="relative group">
                 <button className="bg-[#42210b] text-white px-24 py-8 rounded-full font-black text-[18px] uppercase tracking-[0.6em] flex items-center gap-10 shadow-[0_30px_100px_rgba(0,0,0,0.5)] hover:bg-black transition-all active:scale-95 border-b-[12px] border-black/30">MANAJEMEN <span className="text-[16px] opacity-40">▼</span></button>
                 <div className="absolute top-full right-0 pt-8 w-[550px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-1000 z-[1001] translate-y-10 group-hover:translate-y-0">
                    <div className="bg-[#42210b] rounded-[90px] shadow-[0_60px_150px_rgba(0,0,0,0.7)] overflow-hidden py-16 border-[12px] border-white/5">
                      {managementItems.map((item, idx) => (
                        <button key={idx} onClick={() => setManagementView(item)} className="w-full text-left px-28 py-8 hover:bg-white/10 font-black text-[17px] uppercase tracking-widest text-white/60 hover:text-white transition-all hover:pl-32 border-b-2 border-white/5 last:border-0">{item}</button>
                      ))}
                    </div>
                 </div>
              </div>
            )}
            <div className="bg-white/95 px-20 py-8 rounded-full flex items-center gap-10 shadow-[0_20px_80px_rgba(0,0,0,0.2)] border-8 border-black/5 hover:border-[#42210b]/20 transition-all">
               <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} className="bg-transparent font-black text-[#42210b] text-3xl outline-none uppercase tracking-tighter" />
            </div>
            <button onClick={onLogout} className="w-32 h-32 bg-[#42210b] text-[#f3b524] rounded-[50px] flex items-center justify-center shadow-[0_30px_100px_rgba(0,0,0,0.4)] hover:scale-110 hover:bg-black transition-all active:scale-90 border-[10px] border-white/10 group">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>
            </button>
         </div>
      </header>

      {/* Main Content - Match Screen 1 Big Rounded Corner */}
      <main className={`flex-1 ${managementView === null ? '' : 'bg-[#fdfbf7] mt-12 rounded-t-[180px] shadow-[0_-60px_200px_rgba(0,0,0,0.4)]'} overflow-hidden flex flex-col relative z-10`}>
        <div className="flex-1 overflow-y-auto no-scrollbar p-32 lg:p-48">
          {renderManagementContent()}
        </div>
      </main>
    </div>
  );
};

export default StaffDashboard;
