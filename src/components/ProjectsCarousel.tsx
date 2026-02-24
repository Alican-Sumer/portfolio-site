import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { portfolioContext } from '../data/portfolioContext';

const projectImages: Record<number, string> = {
  0: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  1: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  2: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
};

const projectsData = portfolioContext.projects.map((p, i) => ({
  id: i + 1,
  title: p.title,
  period: p.period,
  description: p.description,
  image: projectImages[i] ?? 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  technologies: p.technologies,
}));

type ProjectsCarouselProps = {
  currentIndex?: number;
  onIndexChange?: React.Dispatch<React.SetStateAction<number>>;
};

export const ProjectsCarousel = ({ currentIndex: controlledIndex, onIndexChange }: ProjectsCarouselProps) => {
  const [internalIndex, setInternalIndex] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const currentIndex = controlledIndex !== undefined ? controlledIndex : internalIndex;
  const setCurrentIndex = onIndexChange ?? setInternalIndex;
  const handlePrevious = () => {
    setDirection('prev');
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? projectsData.length - 1 : prevIndex - 1));
  };
  const handleNext = () => {
    setDirection('next');
    setCurrentIndex((prevIndex) => (prevIndex === projectsData.length - 1 ? 0 : prevIndex + 1));
  };
  const currentProject = projectsData[currentIndex];
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex flex-col">
        <div className="relative flex-1 mb-6 flex flex-col overflow-hidden">
          <div
            key={currentIndex}
            className={direction === 'next' ? 'animate-project-next' : 'animate-project-prev'}
          >
          <div className="w-full h-80 mb-6 overflow-hidden rounded-lg border border-gray-300">
            <img src={currentProject.image} alt={currentProject.title} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-800 mb-1">{currentProject.title}</h3>
            <p className="text-sm text-gray-500 mb-2">{currentProject.period}</p>
            <p className="text-gray-700 mb-4">{currentProject.description}</p>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {currentProject.technologies.map((tech: string, index: number) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="text-center text-sm text-gray-500 mt-4">
            Project {currentIndex + 1} of {projectsData.length}
          </div>
          </div>
        </div>
        <div className="flex justify-center gap-6 -mt-2">
          <button
            onClick={handlePrevious}
            className="flex items-center justify-center w-12 h-12 rounded-full transition-all duration-200"
            style={{
              background: 'rgba(255,255,255,0.35)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              boxShadow: '0 0 0 1px rgba(255,255,255,0.6) inset, 0 2px 12px rgba(0,0,0,0.12)',
              border: '1px solid rgba(255,255,255,0.4)',
            }}
            aria-label="Previous project"
          >
            <ChevronLeftIcon size={22} className="text-gray-700" />
          </button>
          <button
            onClick={handleNext}
            className="flex items-center justify-center w-12 h-12 rounded-full transition-all duration-200"
            style={{
              background: 'rgba(255,255,255,0.35)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              boxShadow: '0 0 0 1px rgba(255,255,255,0.6) inset, 0 2px 12px rgba(0,0,0,0.12)',
              border: '1px solid rgba(255,255,255,0.4)',
            }}
            aria-label="Next project"
          >
            <ChevronRightIcon size={22} className="text-gray-700" />
          </button>
        </div>
      </div>
    </div>
  );
};
