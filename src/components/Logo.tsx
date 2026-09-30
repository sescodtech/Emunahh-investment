import React from 'react';

interface LogoProps {
  variant?: 'light' | 'dark';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  layout?: 'horizontal' | 'stacked';
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
  const subTextColor = isDark ? 'text-white/60' : 'text-slate-500';

  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
    xl: 'w-14 h-14',
  };

  const titleSizes = {
    sm: 'text-[13px]',
    md: 'text-[15px] sm:text-[16px]',
    lg: 'text-[19px] sm:text-[21px]',
    xl: 'text-[24px] sm:text-[27px]',
  };

  const subtitleSizes = {
    sm: 'text-[7px]',
    md: 'text-[8px]',
    lg: 'text-[9px]',
    xl: 'text-[10px]',
  };

  const emblem = logoUrl ? (
    <img
      src={logoUrl}
      alt="Emunahh-Invest Limited logo"
      className={`${iconSizes[size]} shrink-0 object-contain`}
      decoding="async"
    />
  ) : (
    <svg
      className={`${iconSizes[size]} shrink-0`}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M14 46C14 46 22 78 50 82C78 78 86 46 86 46C74 62 60 66 50 66C40 66 26 62 14 46Z"
        fill="#d91c23"
      />
      <path
        d="M20 50C28 64 40 70 50 70C60 70 72 64 80 50C70 60 58 63 50 63C42 63 30 60 20 50Z"
        fill="#ffffff"
        opacity="0.22"
      />
      <rect x="27" y="38" width="10" height="26" rx="1.5" fill={isDark ? '#ffffff' : '#0d0a64'} />
      <rect x="45" y="26" width="10" height="38" rx="1.5" fill={isDark ? '#ffffff' : '#0d0a64'} />
      <rect x="63" y="14" width="10" height="50" rx="1.5" fill={isDark ? '#ffffff' : '#0d0a64'} />
      <path d="M34 40L70 16" stroke="#d91c23" strokeWidth="5" strokeLinecap="round" />
      <path d="M60 12L76 14L72 30Z" fill="#d91c23" />
    </svg>
  );

  const wordmark = (
    <div className={`flex min-w-0 flex-col ${layout === 'stacked' ? 'items-center' : 'justify-center'}`}>
      <span className={`${titleSizes[size]} ${textColor} whitespace-nowrap font-[800] uppercase leading-none tracking-[-0.035em]`}>
        EMUNAHH-INVEST
      </span>
      {showSubtitle && (
        <span className={`${subtitleSizes[size]} ${subTextColor} mt-1.5 whitespace-nowrap font-[650] uppercase leading-none tracking-[0.16em]`}>
          Financial &amp; Investment Company
        </span>
      )}
    </div>
  );

  if (layout === 'stacked') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        {emblem}
        <div className="mt-2.5">{wordmark}</div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 ${className}`}>
      {emblem}
      {wordmark}
    </div>
  );
};
