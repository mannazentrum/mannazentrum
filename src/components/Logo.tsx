
import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Logo: React.FC<LogoProps> = ({ className = "", size = "md" }) => {
  const sizeMap = {
    sm: "w-10 h-10",
    md: "w-16 h-16",
    lg: "w-24 h-24",
    xl: "w-32 h-32"
  };

  return (
    <div className={`${sizeMap[size]} ${className} relative flex items-center justify-center bg-transparent overflow-hidden`}>
      {/* Background Elements: Soft Watercolor Clouds */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[5%] left-[5%] w-[45%] h-[35%] bg-blue-300/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-[0%] left-[25%] w-[35%] h-[30%] bg-blue-200/30 rounded-full blur-xl" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <svg viewBox="0 0 160 140" className="w-[90%] h-auto drop-shadow-md overflow-visible">
          {/* Graduation Cap Icon - Positioned above the Black Peak */}
          <g transform="translate(48, 20) scale(0.6)">
            {/* Support post/chimney as seen in image */}
            <rect x="-3" y="15" width="6" height="18" className="fill-stone-500" />
            {/* Cap outline */}
            <path
              d="M-20 5 L0 15 L20 5 L0 -5 Z"
              fill="none"
              strokeWidth="3"
              strokeLinejoin="round"
              className="stroke-stone-500"
            />
            <path
              d="M-20 5 V12 C-20 12, 0 22, 20 12 V5"
              fill="none"
              strokeWidth="3"
              strokeLinejoin="round"
              className="stroke-stone-500"
            />
            {/* Tassel detail */}
            <circle cx="20" cy="5" r="3" className="fill-stone-500" />
          </g>

          {/* Roof Line - Black Segment (Left Peak) */}
          <path
            d="M15 110 L50 65 L80 110"
            strokeWidth="14"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stroke-black"
          />

          {/* Roof Line - Brown Segment (Right Peak - Higher) */}
          <path
            d="M80 110 L115 30 L145 95"
            strokeWidth="14"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stroke-primary"
          />

          {/* Red Heart - Positioned inside the Brown Peak area */}
          <path
            d="M110 65 C110 60, 118 60, 118 65 C118 73, 110 80, 110 80 C110 80, 102 73, 102 65 C102 60, 110 60, 110 65"
            className="animate-pulse fill-red-600"
            style={{ transformOrigin: '110px 70px' }}
          />
        </svg>
      </div>
    </div>
  );
};

export default Logo;
