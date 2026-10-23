import React, { useState, useEffect } from 'react';

interface PhotoBadgeProps {
  code: string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}

export const PhotoBadge: React.FC<PhotoBadgeProps> = ({ 
  code, 
  position = 'top-left',
  className = '' 
}) => {
  const [showBadges, setShowBadges] = useState<boolean>(() => {
    const saved = localStorage.getItem('mz_show_photo_badges');
    return saved === null ? true : saved === 'true';
  });

  useEffect(() => {
    const handleToggle = () => {
      const saved = localStorage.getItem('mz_show_photo_badges');
      setShowBadges(saved === null ? true : saved === 'true');
    };
    window.addEventListener('mz-photo-badge-toggle', handleToggle);
    return () => window.removeEventListener('mz-photo-badge-toggle', handleToggle);
  }, []);

  if (!showBadges) return null;

  const positionClasses = {
    'top-left': 'top-3 left-3',
    'top-right': 'top-3 right-3',
    'bottom-left': 'bottom-3 left-3',
    'bottom-right': 'bottom-3 right-3',
  }[position];

  return (
    <div 
      data-badge-code={code}
      className={`absolute ${positionClasses} z-20 pointer-events-none select-none bg-slate-950/85 text-amber-300 border border-amber-400/40 text-[10px] md:text-xs font-mono font-bold px-2.5 py-0.5 rounded-md shadow-md backdrop-blur-sm flex items-center gap-1.5 tracking-wide ${className}`}
      title={`Kode Posisi Foto: ${code}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
      <span>{code}</span>
    </div>
  );
};

export default PhotoBadge;
