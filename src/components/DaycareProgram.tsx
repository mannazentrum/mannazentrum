
import React, { useEffect } from 'react';
import Logo from './Logo';

interface DaycareProgramProps {
  onBack: () => void;
}

const DaycareProgram: React.FC<DaycareProgramProps> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const programs = [
    "Program Infant (6 - 12 Bulan)",
    "Program Toddler (1 - 3 Tahun)",
    "Program Preschool (3 - 6 Tahun)",
    "Program After School Care"
  ];

  return (
    <div className="min-h-screen bg-[#f3b524] font-nunito flex flex-col p-6 lg:p-12">
      <header className="mb-8 animate-fadeIn">
        <h1 className="text-6xl font-black text-[#42210b] uppercase tracking-tighter">PROGRAM DAYCARE</h1>
      </header>

      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-7xl bg-[#fdfbf7] rounded-[80px] border-[5px] border-[#42210b] shadow-2xl overflow-hidden animate-fadeIn">
          <div className="p-16 lg:p-24 grid md:grid-cols-2 gap-20">
            {/* Struktur Program */}
            <div className="space-y-10">
              <h2 className="text-4xl font-black text-[#42210b] uppercase tracking-tight">STRUKTUR PROGRAM</h2>
              <ul className="space-y-6">
                {programs.map((prog, idx) => (
                  <li key={idx} className="flex items-center gap-4 group">
                    <span className="w-2 h-2 bg-[#42210b] rounded-full group-hover:scale-150 transition-transform"></span>
                    <span className="text-xl font-bold text-[#42210b]/80 group-hover:text-[#42210b] transition-colors">{prog}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Nilai Utama */}
            <div className="space-y-10">
              <h2 className="text-4xl font-black text-[#42210b] uppercase tracking-tight">NILAI UTAMA</h2>
              <p className="text-2xl font-bold text-[#42210b]/50 leading-relaxed italic">
                "Membangun karakter mulia melalui pengasuhan berbasis fitrah, nutrisi alami, and stimulasi motorik terpadu."
              </p>
            </div>
          </div>

          {/* Tutup Button */}
          <div className="p-10 lg:p-16 pt-0">
            <button 
              onClick={onBack}
              className="w-full bg-[#42210b] text-white py-8 rounded-full font-black text-xl uppercase tracking-[0.3em] shadow-2xl hover:bg-black transition-all active:scale-95"
            >
              TUTUP
            </button>
          </div>
        </div>
      </main>

      <footer className="mt-8 text-center opacity-30">
        <p className="text-[10px] font-black uppercase tracking-[0.5em]">© Mannazentrum Ecosystem 2024</p>
      </footer>
    </div>
  );
};

export default DaycareProgram;
