import { getContextString } from '../data/portfolioContext';
import { portfolioContext } from '../data/portfolioContext';

const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';

function buildResponseFromContext(question: string): string {
  const q = question.toLowerCase().trim();
  const { personalInfo, about, skills, education, experience, projects, leadership, interests, interestsIntro, workStyle } = portfolioContext;

  // About / who / background
  if (/\b(about|who are you|tell me about|background|introduce|yourself)\b/.test(q)) {
    return about.trim();
  }

  // Contact / email / hire / reach
  if (/\b(contact|email|reach|hire|phone|linkedin|github|connect)\b/.test(q)) {
    return `You can reach me at:\n\n📧 **Email**: ${personalInfo.email}\n📞 **Phone**: ${personalInfo.phone}\n💼 **LinkedIn**: ${personalInfo.linkedin}\n💻 **GitHub**: ${personalInfo.github}\n\nI'm open to opportunities and happy to connect!`;
  }

  // Skills / technologies / tech stack
  if (/\b(skill|technolog|tech stack|programming|language|framework|tool|what can you do)\b/.test(q)) {
    return `My technical skills include:\n\n${skills.map((s) => `• ${s}`).join('\n')}\n\n${workStyle.trim()}`;
  }

  // Education / degree / school
  if (/\b(education|degree|school|university|study|graduate|major)\b/.test(q)) {
    return `${education.degree} from ${education.school} (${education.location}), graduating ${education.graduation}. Concentration: ${education.concentration}.\n\nRelevant coursework: ${education.coursework.join(', ')}.`;
  }

  // Experience / work / job / career
  if (/\b(experience|work|job|career|intern|employed|role)\b/.test(q)) {
    const lines = experience.map(
      (e) => `**${e.role}** @ ${e.org} (${e.period})\n${e.bullets.map((b) => `• ${b}`).join('\n')}`
    );
    return `My experience:\n\n${lines.join('\n\n')}`;
  }

  // Leadership / club / lead
  if (/\b(leadership|lead|club|mentor)\b/.test(q)) {
    const lines = leadership.map(
      (l) => `**${l.role}**, ${l.org} (${l.period})\n${l.bullets.map((b) => `• ${b}`).join('\n')}`
    );
    return `Leadership roles:\n\n${lines.join('\n\n')}`;
  }

  // Projects / built / portfolio
  if (/\b(project|built|portfolio|palate|app)\b/.test(q)) {
    const lines = projects.map(
      (p) => `**${p.title}** (${p.period})\n${p.description}\nTechnologies: ${p.technologies.join(', ')}`
    );
    return `Here are some of my projects:\n\n${lines.join('\n\n')}`;
  }

  // Interests / hobbies / free time
  if (/\b(interest|hobby|hobbies|free time|outside work|fortnite|climbing|travel|restaurant)\b/.test(q)) {
    return `${interestsIntro}\n\nI'm also interested in: ${interests.map((i) => `${i.category} (${i.description})`).join('; ')}.`;
  }

  // Resume / CV
  if (/\b(resume|cv|download)\b/.test(q)) {
    return `You can download my resume from the Resume window on the desktop (double‑click the Resume icon). My email is ${personalInfo.email} if you'd like to reach out.`;
  }

  // Work style / how you work
  if (/\b(work style|how you work|approach|prefer)\b/.test(q)) {
    return workStyle.trim();
  }

  // Default: suggest topics from context
  return `I'm ${personalInfo.name}, a ${personalInfo.title}. You can ask me about:\n\n• **Background** — about me and my story\n• **Skills** — technologies and tools I use\n• **Education** — degree, school, coursework\n• **Experience** — roles and internships\n• **Projects** — e.g. Palate, CRM, SimCLR\n• **Leadership** — club and mentoring\n• **Interests** — Fortnite, climbing, travel, food\n• **Contact** — email, phone, LinkedIn, GitHub\n\nTry something like "What's your experience?" or "Tell me about your projects."`;
}

export class ClaudeService {
  private apiKey: string | null = null;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || null;
  }

  async askQuestion(question: string): Promise<string> {
    if (!this.apiKey) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(buildResponseFromContext(question));
        }, 400);
      });
    }

    try {
      const response = await fetch(CLAUDE_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-3-sonnet-20240229',
          max_tokens: 300,
          messages: [
            { role: 'system', content: getContextString() },
            { role: 'user', content: question },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`Claude API error: ${response.status}`);
      }

      const data = await response.json();
      return data.content[0].text;
    } catch {
      return buildResponseFromContext(question);
    }
  }
}

export const claudeService = new ClaudeService();
