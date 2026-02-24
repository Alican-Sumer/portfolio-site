import React from 'react';
import { Desktop } from './components/Desktop';
import { Taskbar } from './components/Taskbar';
import { Background } from './components/Background';
import { FullscreenTip } from './components/FullscreenTip';

export function App() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Background />
      <Desktop />
      <Taskbar />
      <FullscreenTip />
    </div>
  );
}