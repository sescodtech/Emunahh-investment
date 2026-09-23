import React from 'react';

interface LogoProps {
  variant?: 'light' | 'dark';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  layout?: 'horizontal' | 'stacked';
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'light',
  className = '',
  size = 'md',
  showSubtitle = true,
  layout = 'horizontal',
}) => {
  const isDark = variant === 'dark';
  const textColor = isDark ? 'text-white' : 'text-[#071A2B]';
  const subTextColor = isDark ? 'text-[#C6A15B]' : 'text-[#087A5A]';
  const globeBg = isDark ? '#071A2B' : '#071A2B';

  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-8 h-8 sm:w-9 sm:h-9',
    lg: 'w-11 h-11',
    xl: 'w-14 h-14',
  };

  const titleSizes = {
    sm: 'text-xs sm:text-sm font-extrabold tracking-tight',
    md: 'text-base sm:text-lg font-extrabold tracking-tight',
    lg: 'text-xl sm:text-2xl font-extrabold tracking-tight',
    xl: 'text-2xl sm:text-3xl font-extrabold tracking-tight',
  };

  const subSizes = {
    sm: 'text-[7px] tracking-[0.14em]',
    md: 'text-[8px] sm:text-[8.5px] tracking-[0.16em]',
    lg: 'text-[10px] tracking-[0.18em]',
    xl: 'text-[12px] tracking-[0.2em]',
  };

  // SVG Emblem matching brand mark in official brand palette
  const Emblem = (
    <svg
      className={`${iconSizes[size]} shrink-0`}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Emunahh-Invest Brand Emblem"
    >
      {/* Outer Pin Body */}
      <path
        d="M50 8C32 8 18 22 18 40C18 56 36 78 50 94C64 78 82 56 82 40C82 22 68 8 50 8Z"
        fill={isDark ? '#087A5A' : '#071A2B'}
      />

      {/* Dynamic green fold on lower left curve of pin */}
      <path
        d="M18 40C18 51 26 65 38 80L50 94C38 80 18 58 18 40Z"
        fill="#087A5A"
      />

      {/* Inner Globe */}
      <circle cx="50" cy="40" r="19" fill={globeBg} />

      {/* Coordinate Lat/Long lines */}
      <ellipse cx="50" cy="40" rx="10" ry="19" stroke="#087A5A" strokeWidth="1.8" fill="none" opacity="0.9" />
      <line x1="31" y1="40" x2="69" y2="40" stroke="#087A5A" strokeWidth="1.8" opacity="0.9" />
      <ellipse cx="50" cy="40" rx="19" ry="8" stroke="#087A5A" strokeWidth="1.5" strokeDasharray="3 2" fill="none" opacity="0.8" />

      {/* Jet Airplane taking off upward right */}
      <g transform="translate(52, 33) rotate(-35)">
        <path d="M0 -15 L3.5 -3 L3.5 14 L0 11 L-3.5 14 L-3.5 -3 Z" fill="#C6A15B" />
        <path d="M0 -2 L19 10 L16 13 L0 5 L-16 13 L-19 10 Z" fill="#087A5A" />
        <path d="M0 8 L7 16 L4 17 L0 13 L-4 17 L-7 16 Z" fill="#04513E" />
        <line x1="0" y1="13" x2="0" y2="23" stroke="#C6A15B" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
      </g>
    </svg>
  );

  if (layout === 'stacked') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        {Emblem}
        <div className="mt-2.5 flex flex-col items-center leading-none">
          <span className={`${titleSizes[size]} ${textColor} font-sans uppercase font-extrabold tracking-tight`}>
            EMUNAHH-INVEST
          </span>
          {showSubtitle && (
            <span className={`font-bold uppercase ${subSizes[size]} ${subTextColor} mt-1`}>
              FINANCIAL AND INVESTMENT COMPANY
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 ${className}`}>
      {Emblem}
      <div className="flex flex-col justify-center leading-none">
        <span className={`${titleSizes[size]} ${textColor} font-sans uppercase leading-tight font-extrabold tracking-tight`}>
          EMUNAHH-INVEST
        </span>
        {showSubtitle && (
          <span className={`font-bold uppercase ${subSizes[size]} ${subTextColor} mt-1`}>
            FINANCIAL AND INVESTMENT COMPANY
          </span>
        )}
      </div>
    </div>
  );
};
