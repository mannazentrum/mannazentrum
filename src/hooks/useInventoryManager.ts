
import { useState, useEffect, useMemo, useCallback } from 'react';
import { InventoryItem, MonthlyLog, InventoryNotification } from '../types';

const STORAGE_KEY_ITEMS = 'mz_inventory_items';
const STORAGE_KEY_LOGS = 'mz_inventory_logs';

export const useInventoryManager = (activeDate: string) => {
  const monthKey = useMemo(() => activeDate.substring(0, 7), [activeDate]); // YYYY-MM

  const [items, setItems] = useState<InventoryItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_ITEMS);
    return saved ? JSON.parse(saved) : [
      { id: 'i1', name: 'Betadine', minThreshold: 5, category: 'Medis', unit: 'Botol' },
      { id: 'i2', name: 'Sabun Cuci Piring', minThreshold: 3, category: 'Sanitasi', unit: 'Pcs' },
      { id: 'i3', name: 'Tisue Gulung', minThreshold: 4, category: 'Sanitasi', unit: 'Pack' }
    ];
  });

  const [logs, setLogs] = useState<Record<string, Record<string, MonthlyLog>>>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_LOGS);
    return saved ? JSON.parse(saved) : {};
  });

  const [notifications, setNotifications] = useState<InventoryNotification[]>([]);

  // Persistence
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_ITEMS, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(logs));
  }, [logs]);

  const getPreviousMonthKey = (currentKey: string) => {
    const date = new Date(currentKey + '-01');
    date.setMonth(date.getMonth() - 1);
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    return `${y}-${m}`;
  };

  const checkAndCarryOver = useCallback(() => {
    const prevKey = getPreviousMonthKey(monthKey);
    
    setLogs(prevLogs => {
      const newLogs = { ...prevLogs };
      let hasChanges = false;

      items.forEach(item => {
        if (!newLogs[item.id]) newLogs[item.id] = {};
        
        if (!newLogs[item.id][monthKey]) {
          const prevLog = newLogs[item.id][prevKey];
          const carryOverStock = prevLog ? (prevLog.stockAwal + prevLog.stockMasuk - prevLog.stockKeluar) : 0;
          
          newLogs[item.id][monthKey] = {
            stockAwal: Math.max(0, carryOverStock),
            stockMasuk: 0,
            stockKeluar: 0,
            expiryDate: prevLog?.expiryDate
          };
          hasChanges = true;
        }
      });

      return hasChanges ? newLogs : prevLogs;
    });
  }, [monthKey, items]);

  // Run carry-over check whenever month changes
  useEffect(() => {
    checkAndCarryOver();
  }, [monthKey, checkAndCarryOver]);

  const updateLog = (itemId: string, data: Partial<MonthlyLog>) => {
    setLogs(prev => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        [monthKey]: {
          ...prev[itemId][monthKey],
          ...data
        }
      }
    }));
  };

  const addItem = (item: InventoryItem) => {
    setItems(prev => [...prev, item]);
  };

  const updateItem = (updatedItem: InventoryItem) => {
    setItems(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
  };

  const deleteItem = (id: string) => {
    if (window.confirm('Hapus item inventaris ini secara permanen?')) {
      setItems(prev => prev.filter(i => i.id !== id));
      setLogs(prev => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
    }
  };

  // Notification logic
  useEffect(() => {
    const newAlerts: InventoryNotification[] = [];
    const today = new Date();
    
    items.forEach(item => {
      const current = logs[item.id]?.[monthKey];
      if (!current) return;

      const stockAkhir = current.stockAwal + current.stockMasuk - current.stockKeluar;
      
      // Low Stock Alert
      if (stockAkhir < item.minThreshold) {
        newAlerts.push({
          id: `low-${item.id}`,
          type: 'LOW_STOCK',
          message: `Stok ${item.name} menipis: sisa ${stockAkhir} ${item.unit}.`,
          timestamp: Date.now()
        });
      }

      // Expiry Alert (H-7)
      if (current.expiryDate) {
        const exp = new Date(current.expiryDate);
        const diff = (exp.getTime() - today.getTime()) / (1000 * 3600 * 24);
        if (diff >= 0 && diff <= 7) {
          newAlerts.push({
            id: `exp-${item.id}`,
            type: 'EXPIRY',
            message: `${item.name} mendekati kadaluarsa (${current.expiryDate}).`,
            timestamp: Date.now()
          });
        }
      }
    });

    setNotifications(newAlerts);
  }, [logs, items, monthKey]);

  return {
    items,
    logs,
    monthKey,
    notifications,
    updateLog,
    addItem,
    updateItem,
    deleteItem,
    clearNotification: (id: string) => setNotifications(prev => prev.filter(n => n.id !== id))
  };
};
