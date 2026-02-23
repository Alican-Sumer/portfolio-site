// Portfolio context data for Claude API to reference when answering questions
export const portfolioContext = {
  personalInfo: {
    name: "John Doe", // Replace with your actual name
    title: "Software Developer",
    email: "asumer@ncsu.edu", // From your current code
    location: "North Carolina", // Based on email domain
    linkedin: "https://www.linkedin.com/in/alican-sumer", // From your current code
    github: "https://github.com/Alican-Sumer", // From your current code
  },
  
  about: `
    I'm a passionate software developer with 5 years of experience building responsive, 
    user-friendly web applications. My focus is on creating clean, maintainable code 
    that delivers exceptional user experiences. I specialize in React, TypeScript, 
    and modern web development technologies.
  `,
  
  skills: [
    "React & React Native",
    "TypeScript/JavaScript", 
    "HTML/CSS/Tailwind",
    "Node.js",
    "UI/UX Design",
    "Modern Web Development",
    "Responsive Design",
    "Component Architecture"
  ],
  
  projects: [
    {
      title: "E-Commerce Platform",
      description: "A fully responsive e-commerce platform built with React, TypeScript, and a headless CMS. Features include product filtering, user authentication, shopping cart, and secure checkout.",
      technologies: ["React", "TypeScript", "Node.js", "MongoDB", "Stripe API"],
      highlights: "Modern UI, fast performance, seamless checkout experience"
    },
    {
      title: "Task Management App", 
      description: "A collaborative task management application that helps teams organize projects, assign tasks, and track progress. Includes real-time updates, notifications, and analytics dashboard.",
      technologies: ["React", "Redux", "Firebase", "Material UI", "Chart.js"],
      highlights: "Real-time collaboration, analytics dashboard, team management"
    },
    {
      title: "Fitness Tracking Mobile App",
      description: "A cross-platform mobile application for tracking workouts, nutrition, and health metrics. Features include custom workout plans, progress visualization, and social sharing capabilities.", 
      technologies: ["React Native", "TypeScript", "Redux", "Firebase", "Health APIs"],
      highlights: "Cross-platform, health API integration, social features"
    },
    {
      title: "Desktop Portfolio Website",
      description: "An innovative portfolio website that mimics a desktop operating system interface with draggable windows, a taskbar, and interactive components. Built with React and TypeScript.",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Vite", "Lucide React"],
      highlights: "Unique desktop UI, draggable windows, glass morphism design"
    }
  ],
  
  interests: [
    {
      category: "Technology",
      description: "Fascinated by emerging technologies like AI, AR, and blockchain. Always exploring new frameworks and development tools."
    },
    {
      category: "Outdoor Activities", 
      description: "Avid hiker and rock climber, enjoying reconnecting with nature and physical challenges."
    },
    {
      category: "Reading",
      description: "Love sci-fi and technical books, particularly works by authors like Neal Stephenson."
    },
    {
      category: "Gaming",
      description: "Enjoy strategy and puzzle games that help unwind while keeping the mind sharp."
    }
  ],
  
  experience: `
    5+ years of professional software development experience focusing on:
    - Frontend development with React ecosystem
    - TypeScript for type-safe applications  
    - Modern CSS frameworks like Tailwind
    - Component-driven architecture
    - Responsive and accessible web design
    - Performance optimization
    - User experience design
  `,
  
  education: "Computer Science background with focus on web technologies and software engineering principles",
  
  workStyle: `
    I believe in writing clean, maintainable code and creating exceptional user experiences. 
    I enjoy collaborating with teams, solving complex problems, and staying up-to-date with 
    the latest web development trends and best practices.
  `
};

// Helper function to create a context string for Claude
export const getContextString = (): string => {
  return `
You are an AI assistant helping visitors learn about ${portfolioContext.personalInfo.name}, a ${portfolioContext.personalInfo.title}.

ABOUT:
${portfolioContext.about}

SKILLS: ${portfolioContext.skills.join(', ')}

KEY PROJECTS:
${portfolioContext.projects.map(p => 
  `- ${p.title}: ${p.description} (Technologies: ${p.technologies.join(', ')})`
).join('\n')}

INTERESTS: ${portfolioContext.interests.map(i => 
  `${i.category}: ${i.description}`
).join(' | ')}

EXPERIENCE: ${portfolioContext.experience}

CONTACT: 
- Email: ${portfolioContext.personalInfo.email}
- LinkedIn: ${portfolioContext.personalInfo.linkedin}
- GitHub: ${portfolioContext.personalInfo.github}

Please answer questions about this person's background, experience, skills, and projects in a helpful and professional manner. Keep responses concise but informative. If asked about something not covered in this context, politely indicate that you don't have that specific information but can help with what you do know about their professional background.
  `.trim();
};

