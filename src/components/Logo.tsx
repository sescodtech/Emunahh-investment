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
  const textColor = isDark ? 'text-white' : 'text-[#002B99]';
  const subTextColor = isDark ? 'text-[#00E676]' : 'text-[#00A859]';

  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  };

  const titleSizes = {
    sm: 'text-sm font-extrabold tracking-tight',
    md: 'text-lg sm:text-xl font-extrabold tracking-tight',
    lg: 'text-2xl sm:text-3xl font-extrabold tracking-tight',
    xl: 'text-3xl sm:text-4xl font-extrabold tracking-tight',
  };

  const subSizes = {
    sm: 'text-[8px] tracking-[0.14em]',
    md: 'text-[9px] sm:text-[10px] tracking-[0.16em]',
    lg: 'text-[11px] sm:text-[12px] tracking-[0.18em]',
    xl: 'text-[13px] tracking-[0.2em]',
  };

  // SVG Emblem exactly modeled after uploaded image
  const Emblem = (
    <svg
      className={`${iconSizes[size]} shrink-0 drop-shadow-sm`}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Emunahh Official Brand Emblem"
    >
      {/* Outer Location Pin in Royal Blue */}
      <path
        d="M50 8C32 8 18 22 18 40C18 56 36 78 50 94C64 78 82 56 82 40C82 22 68 8 50 8Z"
        fill="#002B99"
      />

      {/* Dynamic emerald green fold on lower left curve of pin */}
      <path
        d="M18 40C18 51 26 65 38 80L50 94C38 80 18 58 18 40Z"
        fill="#00A859"
      />

      {/* Inner Globe Sphere (Midnight Blue) */}
      <circle cx="50" cy="40" r="19" fill="#001854" />

      {/* Globe Longitude and Latitude Grid Lines (Green) */}
      <ellipse cx="50" cy="40" rx="10" ry="19" stroke="#00A859" strokeWidth="1.8" fill="none" opacity="0.85" />
      <line x1="31" y1="40" x2="69" y2="40" stroke="#00A859" strokeWidth="1.8" opacity="0.85" />
      <ellipse cx="50" cy="40" rx="19" ry="8" stroke="#00A859" strokeWidth="1.5" strokeDasharray="3 2" fill="none" opacity="0.75" />

      {/* Green Supersonic Jet Airplane taking off diagonally upward-right */}
      <g transform="translate(52, 33) rotate(-35)">
        {/* Fuselage */}
        <path d="M0 -15 L3.5 -3 L3.5 14 L0 11 L-3.5 14 L-3.5 -3 Z" fill="#00E676" />
        {/* Main Swept Wings */}
        <path d="M0 -2 L19 10 L16 13 L0 5 L-16 13 L-19 10 Z" fill="#00C853" />
        {/* Tail Wings */}
        <path d="M0 8 L7 16 L4 17 L0 13 L-4 17 L-7 16 Z" fill="#00A859" />
        {/* Speed Trail */}
        <line x1="0" y1="13" x2="0" y2="23" stroke="#00E676" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
      </g>
    </svg>
  );

  if (layout === 'stacked') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        {Emblem}
        <div className="mt-2.5 flex flex-col items-center leading-none">
          <span className={`${titleSizes[size]} ${textColor} font-sans uppercase`}>
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
    <div className={`flex items-center gap-3 ${className}`}>
      {Emblem}
      {/* Brand name with descriptor strictly underneath */}
      <div className="flex flex-col justify-center leading-none">
        <span className={`${titleSizes[size]} ${textColor} font-sans uppercase leading-tight`}>
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
