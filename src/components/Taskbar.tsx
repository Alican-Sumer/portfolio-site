import React, { useEffect, useState } from 'react';
import { LinkedinIcon, GithubIcon } from 'lucide-react';
import { SearchBar } from './SearchBar';
import { claudeService } from '../services/claudeService';
export const Taskbar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });
  const handleLinkedInClick = () => {
    window.open('https://www.linkedin.com/in/alican-sumer', '_blank');
  };
  const handleGithubClick = () => {
    window.open('https://github.com/Alican-Sumer', '_blank');
  };

  const handleSearch = async (query: string): Promise<string> => {
    return await claudeService.askQuestion(query);
  };

  return <div className="absolute bottom-0 left-0 right-0 h-10 bg-black/80 backdrop-blur-md z-20 flex items-center justify-between px-2">
      <div className="flex items-center gap-4">
        <button onClick={handleLinkedInClick} className="p-1.5 rounded-full hover:bg-white/10 transition-colors" title="LinkedIn">
          <LinkedinIcon size={20} className="text-blue-400" />
        </button>
        <button onClick={handleGithubClick} className="p-1.5 rounded-full hover:bg-white/10 transition-colors" title="GitHub">
          <GithubIcon size={20} className="text-white" />
        </button>
        
        {/* Search Bar positioned after icons */}
        <div className="flex items-center">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>
      
      <div className="text-white text-sm font-medium">{formattedTime}</div>
    </div>;
};