import React, { useEffect, useState } from 'react';
import { Desktop } from './components/Desktop';
import { Taskbar } from './components/Taskbar';
import { Background } from './components/Background';
import { FullscreenTip } from './components/FullscreenTip';

export function App() {
  const [showFullscreenTip, setShowFullscreenTip] = useState(false);

  useEffect(() => {
    // Wait for the desktop icon tip to finish before showing fullscreen tip
    const timer = setTimeout(() => setShowFullscreenTip(true), 5500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Background />
      <Desktop />
      <Taskbar />
      {showFullscreenTip && <FullscreenTip />}
    </div>
  );
}