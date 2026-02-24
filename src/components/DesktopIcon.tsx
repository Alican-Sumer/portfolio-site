import React, { ReactNode } from 'react';

interface DesktopIconProps {
  icon: ReactNode;
  label: string;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({ icon, label }) => {
  return (
    <div className="flex flex-col items-center justify-center mb-5 cursor-pointer group select-none">
      <div
        className="w-14 h-14 flex items-center justify-center rounded-2xl mb-1.5 transition-all duration-200 group-hover:scale-110"
        style={{
          background: 'rgba(255,255,255,0.35)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: '0 0 0 1px rgba(255,255,255,0.6) inset, 0 4px 16px rgba(0,0,0,0.12)',
          border: '1px solid rgba(255,255,255,0.4)',
        }}
      >
        {icon}
      </div>
      <span
        className="text-xs text-white text-center font-medium max-w-[72px] leading-tight"
        style={{ textShadow: '0px 1px 3px rgba(0,0,0,0.7)' }}
      >
        {label}
      </span>
    </div>
  );
};
