import { useEffect, useState } from 'react';

export function DesktopDoubleClickTip() {
  const [visible, setVisible] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    const hideTimer = setTimeout(() => setFadingOut(true), 5000);
    return () => clearTimeout(hideTimer);
  }, []);

  const handleAnimationEnd = (e: React.AnimationEvent) => {
    if (e.animationName === 'fullscreen-tip-out') setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      onAnimationEnd={handleAnimationEnd}
      className={`
        pointer-events-none
        fixed left-24 top-40 z-30
        ${fadingOut ? 'animate-fullscreen-tip-out' : 'animate-fullscreen-tip-in'}
      `}
    >
      {/* Glassy message box */}
      <div
        className="max-w-xs rounded-2xl px-4 py-3 text-sm text-gray-800 shadow-xl"
        style={{
          background: 'rgba(255, 255, 255, 0.4)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.6) inset, 0 8px 32px rgba(0, 0, 0, 0.12)',
          border: '1px solid rgba(255, 255, 255, 0.5)',
        }}
      >
        <p className="leading-snug">
          <span className="font-semibold">Tip:</span> Double‑click a desktop icon (try{' '}
          <span className="font-semibold">Projects</span>) to open its window.
        </p>
      </div>
    </div>
  );
}

