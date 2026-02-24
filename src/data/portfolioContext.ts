// Portfolio context data for Claude API to reference when answering questions
export const portfolioContext = {
  personalInfo: {
    name: "Alican Sumer",
    title: "Computer Science Student",
    email: "asumer@ncsu.edu",
    phone: "(919) 852-1802",
    location: "Raleigh, NC",
    citizenship: "US Citizen",
    linkedin: "https://www.linkedin.com/in/Alican-Sumer",
    github: "https://github.com/Alican-Sumer",
  },

  about: `
    Hi, I'm Alican, a Computer Science student at North Carolina State University with a strong passion for full stack engineering and building products that solve problems encountered in daily life. I've built a solid foundation in software design, core computer science fundamentals, and analytical problem-solving which reflects in the projects I've done.

    I'm skilled in Java, Python, SQL, and TypeScript, and I've built projects using tools and technologies like Docker, GitHub, REST APIs, and JWT authentication. My most exciting ongoing project is Palate, a restaurant discovery and food-focused social media mobile app designed to revolutionize how people explore and share dining experiences.

    I'm currently seeking a Software Engineer opportunity where I can contribute, learn quickly, and grow alongside a team.
  `,

  skills: [
    "Python (pandas, NumPy, PyTorch)",
    "Java",
    "C",
    "TypeScript",
    "SQL (Postgres)",
    "Docker",
    "Git/GitHub",
    "REST APIs",
    "JWT Authentication",
    "React & React Native",
    "Node.js",
    "Attention to Detail",
    "Problem Solving",
    "Leadership",
    "Analytical Thinking",
  ],

  education: {
    school: "North Carolina State University",
    location: "Raleigh, NC",
    degree: "B.S. in Computer Science",
    graduation: "May 2026",
    concentration: "AI",
    coursework: [
      "Data Structures & Algorithms",
      "Machine Learning",
      "Trustworthy & Efficient Deep Learning",
      "Software Engineering",
      "Operating Systems",
      "Linear Algebra",
      "Database Management",
    ],
  },

  experience: [
    {
      role: "Undergraduate Research - Microtransit Message Bot",
      org: "NCSU Institute for Transportation Research & Education",
      location: "Raleigh, NC",
      period: "Aug 2025 - Dec 2025",
      bullets: [
        "Researched and developed an LLM-powered persuasive messaging system for public microtransit networks to increase rider flexibility and shared-ride utilization in underserved communities.",
        "Built a full-stack prototype using Python, Streamlit, and MongoDB, integrating the OpenRouter API for personalized persuasion strategies based on rider priorities, empathy profiles, and scheduling willingness.",
      ],
    },
    {
      role: "Technical Intern",
      org: "UnitedHealth Group",
      location: "Raleigh, NC",
      period: "May 2022 - Aug 2022",
      bullets: [
        "Led a cross-functional team of 5 to design and develop a Java-based communications prototype for senior residents (video calling, voice messages, photo sharing, texting, video messages).",
        "Implemented 20+ accessibility features for WCAG 2.1 Level AA: screen reader support, voice control, high-contrast themes, minimum 44x44dp touch targets.",
        "Validated prototype through usability testing with seniors (65+) across varying tech comfort levels.",
      ],
    },
  ],

  projects: [
    {
      title: "Full-Stack Restaurant Discovery App",
      period: "Aug 2025 - Present",
      description:
        "Architected and containerized 3 microservices (Auth, User, Restaurant) using Node.js, TypeScript, and Express with PostgreSQL, Redis, and Neo4j, targeting <200ms API latency at scale. Built cross-platform mobile app (iOS/Android) with React Native and Expo plus React web app. Implemented JWT authentication, Redis session management, and rate limiting; maintained 80% code coverage with Jest and Supertest. Integrated Google Places API with Redis caching and PostgreSQL persistence. Designed 100-point multi-factor recommendation engine to score and rank restaurants.",
      technologies: ["Node.js", "TypeScript", "Express", "PostgreSQL", "Redis", "Neo4j", "React Native", "Expo", "React", "JWT", "Jest", "Supertest", "Google Places API"],
      highlights: "Microservices, <200ms latency target, 80% test coverage, multi-factor recommendation engine",
    },
    {
      title: "Web CRM Application",
      period: "Mar 2025 - June 2025",
      description:
        "Designed and built a web application for field-based customer acquisition and contract management, streamlining door-to-door sales and achieving ~50% reduction in customer onboarding time. Created CRM with real-time sync, contract tracking, employee assignment algorithms, and automated contact processing. Implemented responsive mobile-first UI with digital form validation and cloud storage, eliminating manual paperwork for field sales teams.",
      technologies: ["Web", "CRM", "Real-time sync", "Mobile-first UI", "Cloud storage"],
      highlights: "50% reduction in onboarding time, real-time sync, mobile-first",
    },
    {
      title: "SimCLR Implementation",
      period: "Jan 2025 - Feb 2025",
      description:
        "Implemented SimCLR self-supervised learning framework on CIFAR-10 using PyTorch with a ResNet-18 encoder and NCE loss, achieving 87% linear evaluation accuracy. Built end-to-end pipeline with custom data augmentation, t-SNE visualizations, and TensorBoard logging.",
      technologies: ["PyTorch", "SimCLR", "ResNet-18", "CIFAR-10", "TensorBoard", "t-SNE"],
      highlights: "87% linear eval accuracy, custom augmentation, TensorBoard",
    },
  ],

  leadership: [
    {
      org: "Neurotech Club @ NCSU",
      role: "Software Engineer Lead",
      location: "Raleigh, NC",
      period: "Oct 2025 - Present",
      bullets: [
        "Spearheaded EEG signal processing pipelines using Python and SciPy; led engineers through preprocessing, artifact removal, and feature extraction for club research.",
        "Developed a PyTorch ANN to classify epilepsy brain states on the Bonn EEG dataset (96.4% accuracy across 5 diagnostic categories).",
        "Mentored and coordinated engineering efforts: project milestones, code reviews, and end-to-end ML workflows from signal processing to evaluation.",
      ],
    },
  ],

  interests: [
    { category: "Technical", description: "Python, PyTorch, full-stack (TypeScript, Node, React Native), ML/AI, and building systems with clear APIs and tests." },
    { category: "Leadership", description: "Leading engineering efforts, mentoring, code reviews, and defining project milestones in research and club settings." },
    { category: "Research", description: "LLM-powered systems, EEG/neurotech, self-supervised learning, and accessibility (WCAG, usability testing)." },
    { category: "Languages", description: "English (Fluent), German (Fluent)." },
  ],

  interestsIntro: `Before becoming a software engineer, I dreamed of being a professional Fortnite player. I competed for about seven years, ranking top 100 in North America for two consecutive years and earning $50,000 in tournament winnings. It was my passion for a long time, and I spent 6–8 hours a day playing. Now that my career plans have shifted, I spend my free time climbing, traveling, and trying new restaurants. Most of my money goes toward travel and food…`,

  workStyle: `
    I focus on clean architecture, measurable outcomes, and inclusive design. I enjoy full-stack and ML work,
    leading small teams, and solving problems from data and algorithms to APIs and UX.
  `,
};

// Helper function to create a context string for Claude
export const getContextString = (): string => {
  const { personalInfo, about, skills, education, experience, projects, leadership, interests, interestsIntro, workStyle } = portfolioContext;
  return `
You are an AI assistant helping visitors learn about ${personalInfo.name}, a ${personalInfo.title} at ${education.school}.

ABOUT:
${about}

CONTACT: ${personalInfo.citizenship} | ${personalInfo.phone} | ${personalInfo.email} | LinkedIn: ${personalInfo.linkedin} | GitHub: ${personalInfo.github}

EDUCATION: ${education.degree}, ${education.school} (${education.graduation}). Concentration: ${education.concentration}. Coursework: ${education.coursework.join(', ')}

SKILLS: ${skills.join(', ')}

EXPERIENCE:
${experience.map((e) => `- ${e.role} @ ${e.org} (${e.period}): ${e.bullets.join(' ')}`).join('\n')}

LEADERSHIP:
${leadership.map((l) => `- ${l.role}, ${l.org} (${l.period}): ${l.bullets.join(' ')}`).join('\n')}

PROJECTS:
${projects.map((p) => `- ${p.title} (${p.period}): ${p.description} [${p.technologies.join(', ')}]`).join('\n')}

INTERESTS / AREAS: ${interests.map((i) => `${i.category}: ${i.description}`).join(' | ')}

PERSONAL / INTERESTS STORY: ${interestsIntro}

WORK STYLE: ${workStyle.trim()}

Answer questions about this person's background, experience, skills, projects, and education in a helpful and professional manner. Keep responses concise and accurate. If asked about something not in this context, say you don't have that information but can help with what you do know.
  `.trim();
};
