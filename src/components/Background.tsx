import React from 'react';
export const Background = () => {
  return <div className="absolute inset-0 w-full h-full bg-white z-0">
      {/* Pixel Art Background Layer */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'url("/background.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          imageRendering: 'pixelated', // Preserve pixel art quality - fallback for unsupported browsers
          WebkitImageRendering: '-webkit-crisp-edges', // Safari
          MozImageRendering: '-moz-crisp-edges', // Firefox
        } as React.CSSProperties}
      />
      
      {/* Subtle overlay to ensure text readability */}
      <div className="absolute inset-0 w-full h-full bg-black/10" />
      
      {/* Optional: Light grid overlay for desktop feel - reduced opacity */}
      <div className="absolute inset-0 w-full h-full" style={{
      backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.1)),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.1))
          `,
      backgroundSize: '40px 40px',
      backgroundPosition: '0 0, 0 0',
      backgroundRepeat: 'repeat',
      opacity: 0.3
    }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
    </div>;
};