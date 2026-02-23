import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
// Sample project data
const projectsData = [{
  id: 1,
  title: 'E-Commerce Platform',
  description: 'A fully responsive e-commerce platform built with React, TypeScript, and a headless CMS. Features include product filtering, user authentication, shopping cart, and secure checkout.',
  image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
  technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Stripe API']
}, {
  id: 2,
  title: 'Task Management App',
  description: 'A collaborative task management application that helps teams organize projects, assign tasks, and track progress. Includes real-time updates, notifications, and analytics dashboard.',
  image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
  technologies: ['React', 'Redux', 'Firebase', 'Material UI', 'Chart.js']
}, {
  id: 3,
  title: 'Fitness Tracking Mobile App',
  description: 'A cross-platform mobile application for tracking workouts, nutrition, and health metrics. Features include custom workout plans, progress visualization, and social sharing capabilities.',
  image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
  technologies: ['React Native', 'TypeScript', 'Redux', 'Firebase', 'Health APIs']
}];
export const ProjectsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const handlePrevious = () => {
    setCurrentIndex(prevIndex => prevIndex === 0 ? projectsData.length - 1 : prevIndex - 1);
  };
  const handleNext = () => {
    setCurrentIndex(prevIndex => prevIndex === projectsData.length - 1 ? 0 : prevIndex + 1);
  };
  const currentProject = projectsData[currentIndex];
  return <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">My Projects</h2>
      <div className="flex-1 flex flex-col">
        <div className="relative flex-1 mb-6 flex flex-col">
          {/* Project Image */}
          <div className="w-full h-80 mb-6 overflow-hidden rounded-lg border border-gray-300">
            <img src={currentProject.image} alt={currentProject.title} className="w-full h-full object-cover" />
          </div>
          {/* Project Details */}
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {currentProject.title}
            </h3>
            <p className="text-gray-700 mb-4">{currentProject.description}</p>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Technologies:</h4>
              <div className="flex flex-wrap gap-2">
                {currentProject.technologies.map((tech, index) => <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {tech}
                  </span>)}
              </div>
            </div>
          </div>
          {/* Page indicator */}
          <div className="text-center text-sm text-gray-500 mt-4">
            Project {currentIndex + 1} of {projectsData.length}
          </div>
        </div>
        {/* Navigation Controls */}
        <div className="flex justify-center gap-6 mt-2">
          <button onClick={handlePrevious} className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors" aria-label="Previous project">
            <ChevronLeftIcon size={24} />
          </button>
          <button onClick={handleNext} className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors" aria-label="Next project">
            <ChevronRightIcon size={24} />
          </button>
        </div>
      </div>
    </div>;
};