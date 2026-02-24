import { useEffect, useState } from 'react';

export function FullscreenTip() {
  const [visible, setVisible] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    const hideTimer = setTimeout(() => setFadingOut(true), 4000);
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
        fixed bottom-16 right-6 z-30 max-w-xs rounded-2xl px-4 py-3
        text-sm text-gray-800 shadow-xl
        ${fadingOut ? 'animate-fullscreen-tip-out' : 'animate-fullscreen-tip-in'}
      `}
      style={{
        background: 'rgba(255, 255, 255, 0.4)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.6) inset, 0 8px 32px rgba(0, 0, 0, 0.12)',
        border: '1px solid rgba(255, 255, 255, 0.5)',
      }}
    >
      <p className="leading-snug">
        Press <kbd className="rounded bg-black/10 px-1.5 py-0.5 font-mono text-xs font-medium">F11</kbd> on Windows or{' '}
        <kbd className="rounded bg-black/10 px-1.5 py-0.5 font-mono text-xs font-medium">Ctrl</kbd> +{' '}
        <kbd className="rounded bg-black/10 px-1.5 py-0.5 font-mono text-xs font-medium">⌘</kbd> +{' '}
        <kbd className="rounded bg-black/10 px-1.5 py-0.5 font-mono text-xs font-medium">F</kbd> on Mac for a full experience.
      </p>
    </div>
  );
}
