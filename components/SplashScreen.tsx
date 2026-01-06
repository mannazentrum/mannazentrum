
import React from 'react';
import Logo from './Logo';

const SplashScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cream">
      <div className="w-48 h-48 mb-8 flex items-center justify-center animate-pulse">
         <Logo size="xl" />
      </div>
      <h1 className="text-3xl font-black font-rounded text-brown mb-4 tracking-wider uppercase">MZdaycare</h1>
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-orange-accent rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="w-3 h-3 bg-orange-accent rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-3 h-3 bg-orange-accent rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
      </div>
    </div>
  );
};

export default SplashScreen;
