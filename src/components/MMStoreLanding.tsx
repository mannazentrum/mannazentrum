
import React, { useState, useEffect } from 'react';
import { MMProvider, useMM } from './mm/MMContext';
import { MMNavbar, Hero, Footer } from './mm';

const MMAppContent: React.FC<{ onBackToCorporate: () => void }> = ({ onBackToCorporate }) => {
    const [page, setPage] = useState('home');
    const { cart } = useMM();
    useEffect(() => { window.scrollTo(0,0); }, [page]);
    return (
        <div className="min-h-screen bg-[#fffdf9]">
            {/* Under Construction Banner */}
            <div className="bg-[#fef3c7] border-b border-[#fde68a] py-2 px-4 text-center">
                <p className="text-[#92400e] font-nunito text-xs md:text-sm font-bold">
                    🚧 The Website is still under construction / Website ini masih dalam pengembangan dan perbaikan
                </p>
            </div>
            
            <MMNavbar onBack={onBackToCorporate} setPage={setPage} cartCount={cart.length} />
            {page === 'home' && (
                <>
                    <Hero setPage={setPage} />
                    <div className="py-20 text-center"><h2 className="font-playfair text-3xl text-[#5d4037]">Membangun Fitrah Keluarga</h2></div>
                </>
            )}
            <Footer />
        </div>
    );
};

const MMStoreLanding: React.FC<{ onBackToCorporate: () => void }> = ({ onBackToCorporate }) => (
  <MMProvider><MMAppContent onBackToCorporate={onBackToCorporate} /></MMProvider>
);

export default MMStoreLanding;
