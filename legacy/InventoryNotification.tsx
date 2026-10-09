
import React from 'react';
import { InventoryNotification } from '../types';

interface InventoryNotificationProps {
  notifications: InventoryNotification[];
  onClear: (id: string) => void;
}

const InventoryNotification: React.FC<InventoryNotificationProps> = ({ notifications, onClear }) => {
  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-24 right-6 z-[100] flex flex-col gap-3 w-72 pointer-events-none no-print">
      {notifications.map((n) => (
        <div 
          key={n.id} 
          className={`pointer-events-auto p-4 rounded-2xl shadow-2xl border-l-4 transform transition-all animate-bounceIn flex justify-between items-start gap-4 ${
            n.type === 'LOW_STOCK' ? 'bg-[#42210b] border-[#f3b524] text-white' : 'bg-[#cc3333] border-white text-white'
          }`}
        >
          <div className="flex-1">
            <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">
              {n.type === 'LOW_STOCK' ? '⚠️ Stok Rendah' : '⏰ Kadaluarsa'}
            </p>
            <p className="text-xs font-bold leading-tight">{n.message}</p>
          </div>
          <button onClick={() => onClear(n.id)} className="text-white/40 hover:text-white font-black text-lg">×</button>
        </div>
      ))}
    </div>
  );
};

export default InventoryNotification;
