import React, { ReactNode } from 'react';
interface DesktopIconProps {
  icon: ReactNode;
  label: string;
  size?: 'sm' | 'md' | 'lg';
}
export const DesktopIcon: React.FC<DesktopIconProps> = ({
  icon,
  label,
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-14 h-14'
  };
  return <div className="relative flex flex-col items-center justify-center mb-6 cursor-pointer group">
      {/* Windows-style hover effect */}
      <div className="absolute inset-0 -m-1 rounded bg-blue-500/0 group-hover:bg-blue-500/20 transition-colors duration-100 ease-out"></div>
      <div className={`${sizeClasses[size]} relative flex items-center justify-center bg-white/10 backdrop-blur-sm rounded p-2 mb-1 group-hover:bg-white/20 transition-colors z-10`}>
        {icon}
      </div>
      <span className="relative text-xs text-white text-center font-medium max-w-[80px] px-2 py-0.5 z-10" style={{
      textShadow: '0px 1px 2px rgba(0, 0, 0, 0.8)'
    }}>
        {label}
      </span>
    </div>;
};