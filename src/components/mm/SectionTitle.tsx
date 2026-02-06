
import React from 'react';

export const SectionTitle: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="text-center mb-12">
    {subtitle && (
      <span className="inline-block px-4 py-1 mb-4 text-xs font-bold tracking-widest text-[#d4a373] uppercase bg-[#fff8e1] rounded-full font-nunito">
        {subtitle}
      </span>
    )}
    <h2 className="text-4xl md:text-5xl font-bold text-[#5d4037] font-playfair">{title}</h2>
  </div>
);
