import { getContextString } from '../data/portfolioContext';

// Claude API configuration
const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';

// Note: In production, this should be handled by a backend service for security
// For demo purposes, we'll simulate the API call
export class ClaudeService {
  private apiKey: string | null = null;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || null;
  }

  async askQuestion(question: string): Promise<string> {
    console.log('Claude service received question:', question);
    
    // For development/demo: Return simulated responses
    if (!this.apiKey) {
      console.log('Using simulated response');
      return new Promise((resolve) => {
        // Simulate API delay
        setTimeout(() => {
          resolve(this.getSimulatedResponse(question));
        }, 800);
      });
    }

    try {
      const response = await fetch(CLAUDE_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-sonnet-20240229',
          max_tokens: 300,
          messages: [
            {
              role: 'system',
              content: getContextString()
            },
            {
              role: 'user', 
              content: question
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`Claude API error: ${response.status}`);
      }

      const data = await response.json();
      return data.content[0].text;
    } catch (error) {
      console.error('Claude API error:', error);
      // Fallback to simulated response
      return this.getSimulatedResponse(question);
    }
  }

  private getSimulatedResponse(question: string): string {
    console.log('Generating simulated response for:', question);
    const lowerQuestion = question.toLowerCase();
    
    // Skills-related questions
    if (lowerQuestion.includes('skill') || lowerQuestion.includes('technology') || lowerQuestion.includes('tech stack') || lowerQuestion.includes('programming')) {
      return `My core technical skills include:

• **Frontend**: React, React Native, TypeScript/JavaScript, HTML/CSS, Tailwind CSS
• **Backend**: Node.js, RESTful APIs
• **Tools**: Vite, Git, Component Architecture
• **Design**: UI/UX Design, Responsive Design

I specialize in creating clean, maintainable code that delivers exceptional user experiences. I'm particularly passionate about modern web development and building scalable applications.`;
    }
    
    // Experience questions
    if (lowerQuestion.includes('experience') || lowerQuestion.includes('work') || lowerQuestion.includes('years') || lowerQuestion.includes('career')) {
      return `I have **5+ years of professional software development experience**, focusing on:

• Frontend development with React ecosystem
• TypeScript for type-safe applications
• Modern CSS frameworks and responsive design
• Component-driven architecture
• Performance optimization and user experience design

I believe in writing clean, maintainable code and enjoy collaborating with teams to solve complex problems while staying current with the latest web development trends.`;
    }
    
    // Project questions
    if (lowerQuestion.includes('project') || lowerQuestion.includes('portfolio') || lowerQuestion.includes('built') || lowerQuestion.includes('work')) {
      return `Here are some of my key projects:

**🛒 E-Commerce Platform** - Full-stack platform with React, TypeScript, and headless CMS featuring product filtering, authentication, and secure checkout.

**📋 Task Management App** - Collaborative tool with real-time updates, notifications, and analytics dashboard using React, Redux, and Firebase.

**💪 Fitness Tracking Mobile App** - Cross-platform React Native app with custom workout plans, progress visualization, and social sharing.

**🖥️ Desktop Portfolio Website** - This unique portfolio you're viewing! Features draggable windows, glass morphism design, and desktop OS interface.`;
    }
    
    // About/background questions
    if (lowerQuestion.includes('about') || lowerQuestion.includes('background') || lowerQuestion.includes('who') || lowerQuestion.includes('tell me')) {
      return `Hi! I'm a passionate software developer with 5+ years of experience building responsive, user-friendly web applications. 

I specialize in React, TypeScript, and modern web development, with a focus on creating clean, maintainable code that delivers exceptional user experiences. I love solving complex problems and staying up-to-date with the latest technologies.

Beyond coding, I'm fascinated by emerging technologies like AI and blockchain, enjoy outdoor activities like hiking and rock climbing, and love reading sci-fi novels.`;
    }
    
    // Contact questions
    if (lowerQuestion.includes('contact') || lowerQuestion.includes('reach') || lowerQuestion.includes('hire') || lowerQuestion.includes('email')) {
      return `I'd love to connect with you! Here's how you can reach me:

📧 **Email**: asumer@ncsu.edu
💼 **LinkedIn**: linkedin.com/in/alican-sumer
💻 **GitHub**: github.com/Alican-Sumer

I'm always open to discussing new opportunities, interesting projects, or just chatting about technology. Feel free to reach out!`;
    }
    
    // Interests questions
    if (lowerQuestion.includes('interest') || lowerQuestion.includes('hobby') || lowerQuestion.includes('free time') || lowerQuestion.includes('outside')) {
      return `When I'm not coding, I enjoy:

🚀 **Technology**: Exploring emerging tech like AI, AR, and blockchain
🏔️ **Outdoor Activities**: Hiking and rock climbing to reconnect with nature
📚 **Reading**: Sci-fi and technical books (huge Neal Stephenson fan!)
🎮 **Gaming**: Strategy and puzzle games that keep my mind sharp

These interests help me stay creative and bring fresh perspectives to my development work.`;
    }
    
    // Education questions
    if (lowerQuestion.includes('education') || lowerQuestion.includes('degree') || lowerQuestion.includes('school') || lowerQuestion.includes('study')) {
      return `I have a **Computer Science background** with a focus on web technologies and software engineering principles. My education provided a strong foundation in:

• Programming concepts and algorithms
• System design and architecture
• Database management
• Software engineering best practices

This academic foundation, combined with my hands-on experience, helps me approach problems systematically and build robust, scalable applications.`;
    }
    
    // React/TypeScript specific
    if (lowerQuestion.includes('react') || lowerQuestion.includes('typescript')) {
      return `I'm deeply experienced with React and TypeScript! I've been working with React for 5+ years and TypeScript for type-safe development.

**React expertise**: Component architecture, hooks, state management, performance optimization, React Native for mobile apps.

**TypeScript benefits**: Better code quality, enhanced developer experience, easier refactoring, and improved team collaboration.

I believe this combination creates more maintainable, scalable applications with better developer productivity.`;
    }
    
    // Default response
    return `That's an interesting question! As a software developer with 5+ years of experience in React and TypeScript, I'd be happy to discuss my background further. 

Feel free to ask me about:
• My technical skills and experience
• Projects I've built
• My interests and background
• How I can help with your needs

You can also explore the desktop windows above to learn more about my work and experience!`;
  }
}

// Export a singleton instance
export const claudeService = new ClaudeService();
