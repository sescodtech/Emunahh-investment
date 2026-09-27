import React from 'react';

interface LogoProps {
  variant?: 'light' | 'dark';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  layout?: 'horizontal' | 'stacked';
  /** Optional admin-uploaded logo image URL. When set, this image replaces the vector emblem. */
  logoUrl?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'light',
  className = '',
  size = 'md',
  showSubtitle = true,
  layout = 'horizontal',
  logoUrl,
}) => {
  const isDark = variant === 'dark';
  const textColor = isDark ? 'text-white' : 'text-[#0d0a64]';
  const subTextColor = isDark ? 'text-[#e3fff2]' : 'text-[#e7020b]';

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

  // Vector emblem matching the official Emunahh-Invest mark:
  // three ascending navy bars beneath a red rising arrow, cradled by a red sail/wave form.
  const Emblem = logoUrl ? (
    <img
      src={logoUrl}
      alt="Emunahh-Invest Limited logo"
      className={`${iconSizes[size]} shrink-0 object-contain`}
    />
  ) : (
    <svg
      className={`${iconSizes[size]} shrink-0`}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Emunahh-Invest Limited Brand Emblem"
    >
      {/* Red sail / ascent curve base */}
      <path
        d="M14 46C14 46 22 78 50 82C78 78 86 46 86 46C74 62 60 66 50 66C40 66 26 62 14 46Z"
        fill="#e7020b"
      />
      <path
        d="M20 50C28 64 40 70 50 70C60 70 72 64 80 50C70 60 58 63 50 63C42 63 30 60 20 50Z"
        fill="#ffffff"
        opacity="0.25"
      />

      {/* Three ascending navy bars */}
      <rect x="27" y="38" width="10" height="26" rx="1.5" fill={isDark ? '#ffffff' : '#0d0a64'} />
      <rect x="45" y="26" width="10" height="38" rx="1.5" fill={isDark ? '#ffffff' : '#0d0a64'} />
      <rect x="63" y="14" width="10" height="50" rx="1.5" fill={isDark ? '#ffffff' : '#0d0a64'} />

      {/* Rising red arrow */}
      <path
        d="M34 40L70 16"
        stroke="#e7020b"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path d="M60 12L76 14L72 30Z" fill="#e7020b" />
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
