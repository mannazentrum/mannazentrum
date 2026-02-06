
import React from 'react';

export const Footer: React.FC = () => (
    <footer className="bg-[#4e342e] text-[#d7ccc8] pt-20 pb-10 px-6 font-nunito">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 border-b border-white/10 pb-16">
            <div className="col-span-1 md:col-span-1">
                <h3 className="font-playfair text-2xl font-bold text-white mb-6">Malika Maliaki</h3>
                <p className="text-sm leading-relaxed opacity-80 mb-6">
                    Membangun peradaban mulia dari dalam rumah. Menghidupkan fitrah, mencerdaskan nalar, dan membersihkan jiwa.
                </p>
                <div className="text-xs opacity-50">Part of Mannazentrum Ecosystem</div>
            </div>
            
            <div>
                <h4 className="font-bold text-white mb-6">Jelajahi</h4>
                <ul className="space-y-3 text-sm">
                    <li><a href="#" className="hover:text-[#e6b946] transition">Tentang Kami</a></li>
                    <li><a href="#" className="hover:text-[#e6b946] transition">Kelas Parenting</a></li>
                    <li><a href="#" className="hover:text-[#e6b946] transition">Toko Online</a></li>
                    <li><a href="#" className="hover:text-[#e6b946] transition">Artikel Blog</a></li>
                </ul>
            </div>

            <div>
                <h4 className="font-bold text-white mb-6">Hubungi Kami</h4>
                <ul className="space-y-3 text-sm">
                    <li className="flex gap-2">
                        <span>📍</span> Serpong Garden 1. Cluster Green View. Blok A02 No 12A.
                    </li>
                    <li className="flex gap-2">
                        <span>📞</span> +628111-889-3389
                    </li>
                    <li className="flex gap-2">
                        <span>✉️</span> info@mannazentrum.com
                    </li>
                </ul>
            </div>

            <div>
                <h4 className="font-bold text-white mb-6">Berlangganan</h4>
                <p className="text-sm opacity-80 mb-4">Dapatkan tips parenting dan info produk terbaru.</p>
                <div className="flex bg-white/5 rounded-lg overflow-hidden border border-white/10">
                    <input type="email" placeholder="Email Anda" className="bg-transparent px-4 py-2 text-sm w-full outline-none text-white" />
                    <button className="bg-[#e6b946] text-[#4e342e] px-4 py-2 text-sm font-bold hover:bg-white transition">Kirim</button>
                </div>
            </div>
        </div>
        <div className="text-center pt-10 text-xs opacity-40">
            © 2025 Malika Maliaki. All rights reserved.
        </div>
    </footer>
);
