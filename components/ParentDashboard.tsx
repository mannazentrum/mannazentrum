
import React, { useState, useMemo, useEffect } from 'react';
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { User, RegistrationEntry, Activity } from '../types';

interface ParentDashboardProps {
  user: User;
  onLogout: () => void;
  registrations: RegistrationEntry[];
  dailyReports: Record<string, any>;
}

const ParentDashboard: React.FC<ParentDashboardProps> = ({ user, onLogout, registrations, dailyReports }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [invoices, setInvoices] = useState<any[]>([]);

  const parentReg = useMemo(() => registrations.find(r => r.id === user.id), [registrations, user.id]);
  const child = parentReg?.childData;
  const currentReportKey = `${user.id}-${selectedDate}`;
  const report = dailyReports[currentReportKey];

  useEffect(() => {
    const q = query(collection(db, "billing_files"), where("userId", "==", user.id));
    return onSnapshot(q, (snap) => {
      const docs: any[] = [];
      snap.forEach(d => docs.push({ id: d.id, ...d.data() }));
      setInvoices(docs);
    });
  }, [user.id]);

  const StatusPill = ({ label, value, color }: { label: string, value: string, color?: string }) => (
    <div className="bg-white p-6 rounded-[40px] shadow-xl flex flex-col items-center flex-1 border-b-8 border-black/5">
      <p className="text-[10px] font-black text-black/20 uppercase tracking-widest mb-2">{label}</p>
      <p className={`text-2xl font-black ${color || 'text-[#42210b]'}`}>{value}</p>
    </div>
  );

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#f3b524] relative shadow-2xl overflow-x-hidden flex flex-col font-nunito pb-24">
      {/* Header Parent - Match PDF Page 1 */}
      <header className="p-8 pt-12 flex justify-between items-center">
         <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-[#42210b] rounded-2xl flex items-center justify-center text-4xl shadow-xl border-2 border-white/20">
               {child?.gender === 'Perempuan' ? '👧' : '👶'}
            </div>
            <div className="flex flex-col">
               <h2 className="text-3xl font-black text-[#42210b] uppercase tracking-tighter leading-none">HALO, MAMA {child?.nickname.toUpperCase()}!</h2>
               <p className="text-[10px] font-black text-[#42210b]/40 uppercase tracking-[0.4em] mt-1 italic">LAPORAN HARIAN SI KECIL</p>
            </div>
         </div>
         <button onClick={onLogout} className="w-14 h-14 bg-[#42210b] text-[#f3b524] rounded-2xl flex items-center justify-center shadow-xl">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>
         </button>
      </header>

      {/* Date & PDF - Match PDF Page 1 */}
      <div className="px-8 mb-8 flex gap-4">
         <div className="flex-1 bg-white/40 p-4 rounded-[30px] flex items-center gap-4">
            <span className="text-[9px] font-black text-[#42210b] uppercase tracking-widest ml-2">PILIH TANGGAL:</span>
            <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} className="bg-transparent font-black text-xs text-[#42210b] outline-none" />
         </div>
         <button className="bg-[#42210b] text-white px-6 rounded-[30px] flex items-center gap-3 shadow-lg">
            <span className="text-xl">📄</span>
            <span className="text-[10px] font-black uppercase tracking-widest">BUKA PDF</span>
         </button>
      </div>

      <main className="flex-1 bg-[#fdfbf7] rounded-t-[70px] shadow-[0_-20px_50px_rgba(0,0,0,0.15)] p-8 space-y-8 animate-fadeIn">
         {activeTab === 'home' ? (
           <>
              {/* Tagihan Section */}
              <div className="bg-white p-8 rounded-[45px] shadow-xl border border-black/5 relative overflow-hidden">
                 <div className="flex items-center gap-4 mb-6">
                    <span className="text-2xl">💳</span>
                    <h3 className="text-xs font-black text-[#42210b] uppercase tracking-[0.3em]">TAGIHAN & BILLING</h3>
                 </div>
                 <div className="py-6 text-center">
                    <p className="text-[10px] font-black text-black/20 uppercase tracking-[0.4em] italic">BELUM ADA TAGIHAN TERBIT</p>
                 </div>
              </div>

              {/* Status Pagi - Match PDF Page 1 */}
              <div className="flex gap-4">
                 <StatusPill label="JAM DATANG" value={report?.umum?.jamDatang || '--:--'} />
                 <StatusPill label="SUHU PAGI" value={`${report?.umum?.suhu || '--,-'}°C`} color={parseFloat(report?.umum?.suhu) > 37.5 ? 'text-red-500' : 'text-green-500'} />
              </div>

              {/* Momen Hari Ini - Match PDF Page 2 */}
              <div className="bg-white p-8 rounded-[45px] shadow-xl border border-black/5">
                 <div className="flex items-center gap-4 mb-6">
                    <span className="text-2xl">📸</span>
                    <h3 className="text-xs font-black text-[#42210b] uppercase tracking-[0.3em]">MOMEN HARI INI</h3>
                 </div>
                 <div className="aspect-video bg-gray-100 rounded-[35px] overflow-hidden shadow-inner flex items-center justify-center text-black/10">
                    {report?.gallery?.[0] ? (
                      <img src={report.gallery[0].url} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-4xl font-black uppercase tracking-widest opacity-20">NO PHOTO</span>
                    )}
                 </div>
              </div>

              {/* Stok Barang - Match PDF Page 3 & 4 */}
              <div className="bg-white p-10 rounded-[50px] shadow-xl border border-black/5 space-y-8">
                 <div className="flex items-center gap-4 border-b border-black/5 pb-4">
                    <span className="text-2xl">🧺</span>
                    <h3 className="text-xs font-black text-[#42210b] uppercase tracking-[0.3em]">STOK BARANG</h3>
                 </div>
                 <div className="space-y-4">
                    <p className="text-[10px] font-black text-black/30 uppercase tracking-[0.3em] mb-4">PERSEDIAAN PAKAIAN (SISA)</p>
                    {['Baju lengan panjang', 'Baju lengan pendek', 'Kaos dalam', 'Terusan (dress)', 'Celana dalam / Boxer'].map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center bg-[#fdfbf7] p-4 rounded-3xl border border-black/5 shadow-sm">
                         <span className="text-xs font-bold text-black/60">{item}</span>
                         <span className="bg-red-50 text-red-500 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">1 pcs</span>
                      </div>
                    ))}
                 </div>
                 <div className="space-y-4 pt-4">
                    <p className="text-[10px] font-black text-black/30 uppercase tracking-[0.3em] mb-4">KETERSEDIAAN SKINCARE</p>
                    <div className="grid grid-cols-2 gap-4">
                       {['ODOL', 'SHAMPO', 'SABUN MANDI', 'MINYAK TELON'].map((sc, i) => (
                         <div key={i} className="bg-[#fdfbf7] p-4 rounded-3xl border border-black/5 flex flex-col items-center">
                            <span className="text-[9px] font-black text-black/30 mb-2">{sc}</span>
                            <span className={`px-4 py-1 rounded-full text-[9px] font-black uppercase ${i < 2 ? 'bg-green-50 text-green-500' : 'bg-orange-50 text-orange-500'}`}>
                               {i < 2 ? 'BANYAK' : 'SEDIKIT'}
                            </span>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>

              {/* Nutrisi & Makan - Match PDF Page 5-8 */}
              <div className="bg-white p-10 rounded-[50px] shadow-xl border border-black/5 space-y-8">
                 <div className="flex items-center gap-4 border-b border-black/5 pb-4">
                    <span className="text-2xl">🥗</span>
                    <h3 className="text-xs font-black text-[#42210b] uppercase tracking-[0.3em]">NUTRISI & MAKAN</h3>
                 </div>
                 {['SARAPAN', 'SNACK BUAH', 'MAKAN SIANG', 'SNACK SEHAT'].map((meal, i) => (
                    <div key={i} className="space-y-3 relative pb-6 border-b border-black/5 last:border-0 last:pb-0">
                       <div className="flex justify-between items-center">
                          <span className="text-[10px] font-black text-black/30 uppercase tracking-widest">{meal}</span>
                          <span className="bg-green-50 text-green-500 px-3 py-1 rounded-full text-[9px] font-black uppercase">IKUT</span>
                       </div>
                       <p className="text-xl font-black text-[#42210b]">Menu Standar</p>
                       <p className="text-[10px] font-bold text-green-600 uppercase tracking-widest italic">STATUS: HABIS LAHAP ✓</p>
                    </div>
                 ))}
              </div>

              {/* Stimulasi - Match PDF Page 9 & 10 */}
              <div className="bg-white p-10 rounded-[50px] shadow-xl border border-black/5 space-y-8">
                 <div className="flex items-center gap-4 border-b border-black/5 pb-4">
                    <span className="text-2xl">🧠</span>
                    <h3 className="text-xs font-black text-[#42210b] uppercase tracking-[0.3em]">STIMULASI & KURIKULUM</h3>
                 </div>
                 {['GROSS', 'FINE', "3R'S"].map((cur, i) => (
                    <div key={i} className="space-y-4 pb-6 border-b border-black/5 last:border-0 last:pb-0">
                       <div className="flex justify-between items-center">
                          <span className="text-[11px] font-black text-[#42210b] uppercase tracking-widest">{cur}</span>
                          <span className="bg-[#42210b] text-white px-4 py-1 rounded-full text-[9px] font-black">BSH</span>
                       </div>
                       <div className="bg-[#fdfbf7] p-6 rounded-[35px] border border-black/5 shadow-inner">
                          <p className="text-base font-bold text-[#42210b] mb-4 uppercase">Materi Pembelajaran {i+1}</p>
                          <div className="aspect-video bg-gray-200 rounded-2xl overflow-hidden">
                             {/* Placeholder for curriculum photo/graph */}
                          </div>
                       </div>
                    </div>
                 ))}
              </div>

              {/* Kebersihan & Istirahat - Match PDF Page 11 */}
              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-white p-8 rounded-[45px] shadow-xl border border-black/5 space-y-6">
                    <h3 className="text-[10px] font-black text-[#42210b] uppercase tracking-widest flex items-center gap-2">🚿 KEBERSIHAN</h3>
                    <div className="flex justify-between items-center"><span className="text-xs font-bold text-black/40">Mandi Pagi:</span><span className="text-xs font-black text-green-500">Ya</span></div>
                    <div className="flex justify-between items-center"><span className="text-xs font-bold text-black/40">Mandi Sore:</span><span className="text-xs font-black text-green-500">Ya</span></div>
                 </div>
                 <div className="bg-white p-8 rounded-[45px] shadow-xl border border-black/5 space-y-6">
                    <h3 className="text-[10px] font-black text-[#42210b] uppercase tracking-widest flex items-center gap-2">💤 ISTIRAHAT</h3>
                    <div className="flex justify-between items-center"><span className="text-xs font-bold text-black/40">Tidur Siang:</span><span className="text-xs font-black text-green-500">Ya</span></div>
                    <div className="text-[9px] font-bold text-black/20 uppercase bg-[#fdfbf7] p-3 rounded-2xl shadow-inner leading-relaxed">
                       DETAIL TIDUR:<br/>Durasi: 1.5 Jam<br/>Bangun: 14:00
                    </div>
                 </div>
              </div>

              {/* Laporan Luka - Match PDF Page 12 */}
              <div className="bg-white p-10 rounded-[50px] shadow-xl border border-black/5">
                 <div className="flex items-center gap-4 mb-6">
                    <span className="text-2xl text-blue-500">🩹</span>
                    <h3 className="text-xs font-black text-[#42210b] uppercase tracking-[0.3em]">LAPORAN LUKA</h3>
                 </div>
                 <div className="aspect-square bg-gray-100 rounded-[40px] mb-6 flex items-center justify-center border-4 border-dashed border-black/5">
                    <span className="text-8xl opacity-10">🧍</span>
                 </div>
                 <div className="bg-red-50 p-4 rounded-2xl text-center">
                    <p className="text-[10px] font-black text-red-500 uppercase tracking-widest">TERDAPAT LUKA YANG PERLU DIPERHATIKAN</p>
                 </div>
              </div>
           </>
         ) : (
           <div className="space-y-8 animate-fadeIn">
              <h3 className="text-3xl font-black text-[#42210b] uppercase tracking-tighter">Profil Murid</h3>
              <div className="bg-white p-12 rounded-[60px] shadow-xl border border-black/5 flex flex-col items-center relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-3 bg-[#42210b]"></div>
                 <div className="w-40 h-40 bg-[#42210b] text-white rounded-[50px] flex items-center justify-center text-[100px] mb-10 shadow-2xl border-8 border-white">
                    {child?.gender === 'Perempuan' ? '👧' : '👶'}
                 </div>
                 <h4 className="text-3xl font-black text-[#42210b] uppercase tracking-tighter text-center leading-tight">{child?.fullName}</h4>
                 <p className="text-sm font-bold text-[#42210b]/40 mt-4 uppercase tracking-[0.3em]">"{child?.nickname}"</p>
                 
                 <div className="w-full mt-14 grid grid-cols-2 gap-4">
                    <div className="bg-[#fdfbf7] p-6 rounded-[35px] border border-black/5 shadow-inner text-center">
                       <p className="text-[10px] font-black text-black/20 uppercase mb-2">ID MURID</p>
                       <p className="font-black text-[#42210b] text-lg uppercase tracking-widest">{user.id}</p>
                    </div>
                    <div className="bg-[#fdfbf7] p-6 rounded-[35px] border border-black/5 shadow-inner text-center">
                       <p className="text-[10px] font-black text-black/20 uppercase mb-2">STATUS</p>
                       <p className="font-black text-green-500 text-lg uppercase tracking-widest">AKTIF</p>
                    </div>
                 </div>
              </div>
           </div>
         )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t-8 border-[#42210b] flex justify-around p-6 z-[100] rounded-t-[50px] shadow-[0_-20px_50px_rgba(0,0,0,0.1)]">
        <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center transition-all ${activeTab === 'home' ? 'text-[#42210b] scale-125' : 'opacity-20'}`}>
          <span className="text-4xl">🏠</span>
          <span className="text-[9px] font-black uppercase mt-1 tracking-widest">HOME</span>
        </button>
        <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center transition-all ${activeTab === 'profile' ? 'text-[#42210b] scale-125' : 'opacity-20'}`}>
          <span className="text-4xl">👤</span>
          <span className="text-[9px] font-black uppercase mt-1 tracking-widest">PROFIL</span>
        </button>
      </nav>
    </div>
  );
};

export default ParentDashboard;
