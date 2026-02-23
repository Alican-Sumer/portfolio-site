import React, { useEffect, useState } from 'react';
import { MonitorIcon, FolderIcon, BookOpenIcon, UsersIcon, MapIcon, DownloadIcon } from 'lucide-react';
import { DesktopIcon } from './DesktopIcon';
import { Window } from './Window';
import { ProjectsCarousel } from './ProjectsCarousel';
export const Desktop = () => {
  const [openWindows, setOpenWindows] = useState<{
    aboutMe: boolean;
    interests: boolean;
    resume: boolean;
    projects: boolean;
  }>({
    aboutMe: false,
    interests: false,
    resume: false,
    projects: false
  });
  // For center positioning of fixed windows
  const [windowCenter, setWindowCenter] = useState({
    x: 0,
    y: 0
  });
  // Calculate center position for fixed windows
  useEffect(() => {
    const updateWindowCenter = () => {
      const width = window.innerWidth;
      const height = window.innerHeight - 40; // Adjust for taskbar
      setWindowCenter({
        x: (width - 1000) / 2,
        y: (height - 700) / 2 // 700 is the projects window height
      });
    };
    updateWindowCenter();
    window.addEventListener('resize', updateWindowCenter);
    return () => window.removeEventListener('resize', updateWindowCenter);
  }, []);
  const handleIconDoubleClick = (iconId: string) => {
    if (iconId === 'about-me') {
      setOpenWindows(prev => ({
        ...prev,
        aboutMe: true
      }));
    } else if (iconId === 'interests') {
      setOpenWindows(prev => ({
        ...prev,
        interests: true
      }));
    } else if (iconId === 'resume') {
      setOpenWindows(prev => ({
        ...prev,
        resume: true
      }));
    } else if (iconId === 'projects') {
      setOpenWindows(prev => ({
        ...prev,
        projects: true
      }));
    }
  };
  const handleCloseWindow = (windowId: string) => {
    if (windowId === 'about-me') {
      setOpenWindows(prev => ({
        ...prev,
        aboutMe: false
      }));
    } else if (windowId === 'interests') {
      setOpenWindows(prev => ({
        ...prev,
        interests: false
      }));
    } else if (windowId === 'resume') {
      setOpenWindows(prev => ({
        ...prev,
        resume: false
      }));
    } else if (windowId === 'projects') {
      setOpenWindows(prev => ({
        ...prev,
        projects: false
      }));
    }
  };
  const handleEmailClick = () => {
    window.location.href = 'mailto:asumer@ncsu.edu';
  };
  const handleResumeDownload = () => {
    // Replace with actual resume download URL
    const resumeUrl = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
    window.open(resumeUrl, '_blank');
  };
  return <div className="absolute inset-0 z-10" style={{
    height: 'calc(100vh - 40px)'
  }}>
      <div className="absolute top-4 left-4">
        <div className="flex flex-col gap-2">
          <div onDoubleClick={() => handleIconDoubleClick('about-me')}>
            <DesktopIcon icon={<img src="/profile-photo.jpg" alt="About Me" className="w-9 h-9 rounded-full object-cover" />} label="About Me" />
          </div>
          <div onDoubleClick={() => handleIconDoubleClick('interests')}>
            <DesktopIcon icon={<FolderIcon className="text-yellow-300" />} label="Interests" />
          </div>
          <div onDoubleClick={() => handleIconDoubleClick('projects')}>
            <DesktopIcon icon={<BookOpenIcon className="text-green-300" />} label="Projects" />
          </div>
          <div onDoubleClick={() => handleIconDoubleClick('resume')}>
            <DesktopIcon icon={<UsersIcon className="text-yellow-200" />} label="Resume" />
          </div>
          <div onClick={handleEmailClick}>
            <DesktopIcon icon={<MapIcon className="text-blue-200" />} label="Email Me" />
          </div>
        </div>
      </div>
      {/* Render windows */}
      {openWindows.aboutMe && <Window title="About Me" onClose={() => handleCloseWindow('about-me')} initialPosition={{
      x: 150,
      y: 100
    }}>
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4 items-start">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80" alt="Profile" className="rounded-md w-32 h-32 object-cover mb-2" style={{
            maxWidth: '100%'
          }} />
              <div>
                <h2 className="text-xl font-bold text-gray-800">John Doe</h2>
                <p className="text-gray-700">
                  Welcome to my digital portfolio! I'm a passionate software
                  developer with expertise in React, TypeScript, and modern web
                  development.
                </p>
              </div>
            </div>
            <p className="text-gray-700">
              I have 5 years of experience building responsive, user-friendly
              web applications. My focus is on creating clean, maintainable code
              that delivers exceptional user experiences.
            </p>
            <h3 className="text-lg font-semibold text-gray-800 mt-4">Skills</h3>
            <ul className="list-disc pl-5 text-gray-700">
              <li>React & React Native</li>
              <li>TypeScript/JavaScript</li>
              <li>HTML/CSS/Tailwind</li>
              <li>Node.js</li>
              <li>UI/UX Design</li>
            </ul>
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Recent Project
              </h3>
              <div className="mt-2 flex flex-col sm:flex-row gap-3">
                <img src="https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80" alt="Project screenshot" className="rounded border border-gray-300 w-full max-w-xs object-cover" style={{
              maxWidth: '100%'
            }} />
                <p className="text-gray-700">
                  My latest project was a responsive e-commerce platform built
                  with React, TypeScript, and a headless CMS. It features a
                  modern UI, fast performance, and seamless checkout experience.
                </p>
              </div>
            </div>
          </div>
        </Window>}
      {openWindows.interests && <Window title="Interests" onClose={() => handleCloseWindow('interests')} initialPosition={{
      x: 250,
      y: 150
    }}>
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800">My Interests</h2>
            <p className="text-gray-700">
              Beyond coding, I'm passionate about a variety of hobbies and
              interests that keep me inspired and balanced.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Technology
                </h3>
                <div className="flex flex-col items-center sm:items-start mt-2">
                  <img src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80" alt="Technology" className="rounded mb-2 w-full max-w-[200px] h-auto" style={{
                maxWidth: '100%'
              }} />
                  <p className="text-gray-700">
                    I'm fascinated by emerging technologies like AI, AR, and
                    blockchain.
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Outdoor Activities
                </h3>
                <div className="flex flex-col items-center sm:items-start mt-2">
                  <img src="https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80" alt="Hiking" className="rounded mb-2 w-full max-w-[200px] h-auto" style={{
                maxWidth: '100%'
              }} />
                  <p className="text-gray-700">
                    I'm an avid hiker and rock climber, reconnecting with
                    nature.
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Reading</h3>
                <div className="flex flex-col items-center sm:items-start mt-2">
                  <img src="https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80" alt="Books" className="rounded mb-2 w-full max-w-[200px] h-auto" style={{
                maxWidth: '100%'
              }} />
                  <p className="text-gray-700">
                    I love sci-fi and technical books by authors like Neal
                    Stephenson.
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Gaming</h3>
                <div className="flex flex-col items-center sm:items-start mt-2">
                  <img src="https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80" alt="Gaming" className="rounded mb-2 w-full max-w-[200px] h-auto" style={{
                maxWidth: '100%'
              }} />
                  <p className="text-gray-700">
                    Strategy and puzzle games help me unwind while keeping my
                    mind sharp.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Window>}
      {openWindows.resume && <Window title="Resume" onClose={() => handleCloseWindow('resume')} initialPosition={{
      x: 300,
      y: 120
    }} initialSize={{
      width: 700,
      height: 600
    }}>
          <div className="flex flex-col h-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Resume</h2>
            <div className="flex items-center mb-4">
              <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors" onClick={handleResumeDownload}>
                <DownloadIcon size={16} />
                Download Resume
              </button>
            </div>
            <div className="flex-1 border border-gray-300 rounded bg-gray-50 overflow-hidden">
              <iframe src="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" className="w-full h-full" title="Resume PDF"></iframe>
            </div>
          </div>
        </Window>}
      {openWindows.projects && <Window title="Projects" onClose={() => handleCloseWindow('projects')} initialPosition={windowCenter} initialSize={{
      width: 1000,
      height: 700
    }} isDraggable={false} isResizable={false}>
          <ProjectsCarousel />
        </Window>}
    </div>;
};