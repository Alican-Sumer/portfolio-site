import React, { useEffect, useState } from 'react';
import { DesktopIcon } from './DesktopIcon';
import { Window } from './Window';
import { ProjectsCarousel } from './ProjectsCarousel';
import { InterestsCarousel } from './InterestsCarousel';
import { ResumeViewer } from './ResumeViewer';
import { portfolioContext } from '../data/portfolioContext';
export const Desktop = () => {
  const [openWindows, setOpenWindows] = useState({
    aboutMe: false,
    interests: false,
    resume: false,
    projects: false
  });
  // Stack order: last item = topmost window. zIndex = 50 + index.
  const [windowStack, setWindowStack] = useState<string[]>([]);
  const [projectCarouselIndex, setProjectCarouselIndex] = useState(0);
  // Center position for windows (account for taskbar)
  const [clientSize, setClientSize] = useState(() => ({
    w: typeof window !== 'undefined' ? window.innerWidth : 1024,
    h: typeof window !== 'undefined' ? window.innerHeight - 40 : 680
  }));
  const WINDOW_INITIAL_WIDTH = 1300;
  const WINDOW_INITIAL_HEIGHT = 910;
  const centerPositionFor = (width: number, height: number) => ({
    x: Math.max(0, (clientSize.w - width) / 2),
    y: Math.max(0, (clientSize.h - height) / 2)
  });
  useEffect(() => {
    const onResize = () => setClientSize({
      w: window.innerWidth,
      h: window.innerHeight - 40
    });
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  const handleIconDoubleClick = (iconId: string) => {
    const key = iconId === 'about-me' ? 'aboutMe' : iconId === 'interests' ? 'interests' : iconId === 'resume' ? 'resume' : 'projects';
    setOpenWindows(prev => ({ ...prev, [key]: true }));
    setWindowStack(prev => [...prev.filter(id => id !== iconId), iconId]);
  };
  const handleCloseWindow = (windowId: string) => {
    const key = windowId === 'about-me' ? 'aboutMe' : windowId === 'interests' ? 'interests' : windowId === 'resume' ? 'resume' : 'projects';
    setOpenWindows(prev => ({ ...prev, [key]: false }));
    setWindowStack(prev => prev.filter(id => id !== windowId));
  };
  const handleWindowFocus = (windowId: string) => {
    setWindowStack(prev => [...prev.filter(id => id !== windowId), windowId]);
  };
  const getZIndex = (windowId: string) => {
    const i = windowStack.indexOf(windowId);
    return i === -1 ? 50 : 50 + i;
  };
  const handleEmailClick = () => {
    window.location.href = 'mailto:asumer@ncsu.edu';
  };
  const handleResumeDownload = () => {
    window.open('/Alican Sumer Resume.pdf', '_blank');
  };
  const handleOpenProjectsToFirst = () => {
    setOpenWindows(prev => ({ ...prev, projects: true }));
    setProjectCarouselIndex(0);
    setWindowStack(prev => [...prev.filter(id => id !== 'projects'), 'projects']);
  };
  return <div className="absolute inset-0 z-10" style={{
    height: 'calc(100vh - 40px)'
  }}>
      <div className="absolute top-4 left-4">
        <div className="flex flex-col gap-2">
          <div onDoubleClick={() => handleIconDoubleClick('about-me')}>
            <DesktopIcon label="About Me" icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-gray-800">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
            } />
          </div>
          <div onDoubleClick={() => handleIconDoubleClick('interests')}>
            <DesktopIcon label="Interests" icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-gray-800">
                <path d="M12 21C12 21 4 14.5 4 9a8 8 0 0 1 8-8 8 8 0 0 1 8 8c0 5.5-8 12-8 12z" />
                <circle cx="12" cy="9" r="2.5" fill="currentColor" stroke="none" />
              </svg>
            } />
          </div>
          <div onDoubleClick={() => handleIconDoubleClick('projects')}>
            <DesktopIcon label="Projects" icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-gray-800">
                <rect x="3" y="3" width="8" height="8" rx="1.5" />
                <rect x="13" y="3" width="8" height="8" rx="1.5" />
                <rect x="3" y="13" width="8" height="8" rx="1.5" />
                <rect x="13" y="13" width="8" height="8" rx="1.5" />
              </svg>
            } />
          </div>
          <div onDoubleClick={() => handleIconDoubleClick('resume')}>
            <DesktopIcon label="Resume" icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-gray-800">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="8" y1="13" x2="16" y2="13" />
                <line x1="8" y1="17" x2="13" y2="17" />
              </svg>
            } />
          </div>
          <div onClick={handleEmailClick}>
            <DesktopIcon label="Email Me" icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-gray-800">
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <polyline points="2 7 12 13 22 7" />
              </svg>
            } />
          </div>
        </div>
      </div>
      {/* Render windows */}
      {openWindows.aboutMe && <Window title="About Me" onClose={() => handleCloseWindow('about-me')} initialPosition={centerPositionFor(WINDOW_INITIAL_WIDTH, WINDOW_INITIAL_HEIGHT)} initialSize={{ width: WINDOW_INITIAL_WIDTH, height: WINDOW_INITIAL_HEIGHT }} zIndex={getZIndex('about-me')} onFocus={() => handleWindowFocus('about-me')}>
          <div className="flex h-full min-h-0 flex-col items-center justify-center text-center">
            <div className="flex flex-col items-center gap-4">
              <img src="/profile-photo.jpg" alt="Profile" className="rounded-md w-32 h-32 object-cover" style={{ maxWidth: '100%' }} />
              <div>
                <h2 className="text-xl font-bold text-gray-800">{portfolioContext.personalInfo.name}</h2>
                <p className="text-sm text-gray-600 mt-0.5">{portfolioContext.personalInfo.title} · {portfolioContext.education.school}</p>
                <p className="text-gray-700 mt-3 max-w-2xl mx-auto whitespace-pre-line">
                  {portfolioContext.about.trim().split(/(Palate)/).map((part, i) =>
                    part === 'Palate' ? (
                      <button
                        key={i}
                        type="button"
                        className="text-blue-600 underline hover:text-blue-800 font-medium"
                        onClick={handleOpenProjectsToFirst}
                      >
                        Palate
                      </button>
                    ) : (
                      part
                    )
                  )}
                </p>
                <p className="text-gray-600 text-sm mt-3">
                  {portfolioContext.personalInfo.phone} · {portfolioContext.personalInfo.email}
                </p>
              </div>
            </div>
          </div>
        </Window>}
      {openWindows.interests && <Window title="Interests & More" onClose={() => handleCloseWindow('interests')} initialPosition={centerPositionFor(WINDOW_INITIAL_WIDTH, WINDOW_INITIAL_HEIGHT)} initialSize={{ width: WINDOW_INITIAL_WIDTH, height: WINDOW_INITIAL_HEIGHT }} zIndex={getZIndex('interests')} onFocus={() => handleWindowFocus('interests')}>
          <InterestsCarousel introParagraph={portfolioContext.interestsIntro} />
        </Window>}
      {openWindows.resume && <Window title="Resume" onClose={() => handleCloseWindow('resume')} initialPosition={centerPositionFor(WINDOW_INITIAL_WIDTH, WINDOW_INITIAL_HEIGHT)} initialSize={{ width: WINDOW_INITIAL_WIDTH, height: WINDOW_INITIAL_HEIGHT }} zIndex={getZIndex('resume')} onFocus={() => handleWindowFocus('resume')}>
          <ResumeViewer onDownload={handleResumeDownload} />
        </Window>}
      {openWindows.projects && <Window title="Projects" onClose={() => handleCloseWindow('projects')} initialPosition={centerPositionFor(WINDOW_INITIAL_WIDTH, WINDOW_INITIAL_HEIGHT)} initialSize={{ width: WINDOW_INITIAL_WIDTH, height: WINDOW_INITIAL_HEIGHT }} zIndex={getZIndex('projects')} onFocus={() => handleWindowFocus('projects')}>
          <ProjectsCarousel currentIndex={projectCarouselIndex} onIndexChange={setProjectCarouselIndex} />
        </Window>}
    </div>;
};