import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, Construction } from 'lucide-react';
import { portfolioContext } from '../data/portfolioContext';

const projectImages: Record<number, string> = {
  0: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  1: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
};

type ProjectSlot = {
  id: number;
  title: string;
  period?: string;
  description?: string;
  image?: string;
  technologies?: string[];
  isPlaceholder?: boolean;
};

const projectsData: ProjectSlot[] = [
  ...portfolioContext.projects.map((p, i) => ({
    id: i + 1,
    title: p.title,
    period: p.period,
    description: p.description,
    image: projectImages[i] ?? 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    technologies: p.technologies,
  })),
  { id: 3, title: 'Under Construction', isPlaceholder: true },
];

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
            className={`h-full flex flex-col ${direction === 'next' ? 'animate-project-next' : 'animate-project-prev'}`}
          >
          {currentProject.isPlaceholder ? (
            <div className="flex flex-1 flex-col items-center justify-center min-h-0">
              <div
                className="flex flex-col items-center justify-center rounded-2xl px-12 py-16 w-full max-w-md"
                style={{
                  background: 'rgba(255, 255, 255, 0.35)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  boxShadow: '0 0 0 1px rgba(255,255,255,0.6) inset, 0 8px 32px rgba(0,0,0,0.08)',
                  border: '1px solid rgba(255,255,255,0.5)',
                }}
              >
                <Construction size={40} className="text-gray-400 mb-6" strokeWidth={1.5} />
                <h3 className="text-xl font-semibold tracking-tight text-gray-800 mb-1">
                  Under Construction
                </h3>
                <p className="text-sm text-gray-500 tracking-wide">Coming soon</p>
              </div>
            </div>
          ) : currentProject.title === 'SimCLR Implementation' ? (
            <div className="flex-1 flex flex-col min-h-0 overflow-auto">
              <h3 className="text-xl font-semibold text-gray-800 mb-1 shrink-0">SimCLR Implementation</h3>
              <p className="text-sm text-gray-500 mb-4 shrink-0">{currentProject.period}</p>
              <div className="flex gap-6 mb-8 items-start">
                <div className="flex-1 min-w-0 space-y-4 text-gray-700 text-sm leading-relaxed">
                  <p>
                    SimCLR is a self-supervised machine learning framework for learning visual representations without labeled data. Rather than directly performing image classification, it trains a model to learn meaningful feature embeddings that can later be used for downstream tasks like classification. At its core, SimCLR relies on the contrastive learning paradigm: it pulls together different augmented views of the same image while pushing apart representations of different images. By applying image transformations (such as color distortion, blur, cropping, and resizing) and comparing these transformed views, SimCLR learns a similarity metric that captures underlying visual structure.
                  </p>
                  <p>
                    To dive further into the technical details, the following is a breakdown of each step of the process.
                  </p>
                  <p>
                    Data augmentation: For each image in the dataset, two random image augmentations are applied. These range from random cropping and resizing, color jittering, Gaussian blur, horizontal flipping, and grayscale conversion.
                  </p>
                  <p>
                    Next, these images are passed into ResNet to extract high dimensional features. The input size to this step is 224×224×3 and outputs a 2048 dimensional vector.
                  </p>
                  <p>
                    This vector then goes through a projection head, consisting of a dense neural network (2 layers of 2048 nodes with a ReLU activation function with the NCE loss function applied).
                  </p>
                  <p>
                    A note about the NCE loss function, it tries to equate images that are similar and distance images that are unsimilar, this is computed using the cosine similarity metric on the feature vectors.
                  </p>
                </div>
                <div className="flex-shrink-0 w-72">
                  <img src="/SimCLR.png" alt="SimCLR framework diagram" className="w-full h-auto rounded-lg border border-gray-200 object-contain" />
                  <p className="mt-2 text-xs text-gray-500">
                    <a href="https://simclr.github.io/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline">Source</a>
                  </p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-72">
                  <img src="/tsne.png" alt="t-SNE visualization of embeddings" className="w-full h-auto rounded-lg border border-gray-200 object-contain" />
                </div>
                <div className="flex-1 min-w-0 space-y-4 text-gray-700 text-sm leading-relaxed">
                  <p>
                    I used t-SNE to visualize the embeddings in 2D. I plotted these every five epochs using the following configuration: 47 perplexity, a learning rate of 1 (empirically the most stable), unsupervised setup (supervise=0), and 1000 iterations. Notably, the t-SNE plots revealed emerging clusters of images sharing similar color schemes. These clusters were not globally unified but rather appeared in multiple local groups, indicating that the model was effectively capturing visual similarity despite not having access to labels. My implementation achieved 87% linear evaluation accuracy on the CIFAR-10 dataset.
                  </p>
                </div>
              </div>
            </div>
          ) : currentProject.title === 'Full-Stack Restaurant Discovery App' ? (
            <div className="flex-1 flex flex-col min-h-0 overflow-auto">
              <div className="mb-6 shrink-0">
                <h3 className="text-xl font-semibold text-gray-800 tracking-tight">Full-Stack Restaurant Discovery App</h3>
                <p className="text-sm text-gray-500 mt-0.5">{currentProject.period}</p>
              </div>
              <div className="flex gap-8 items-start">
                <div className="flex-1 min-w-0 space-y-5">
                  <div className="rounded-xl px-4 py-3.5 bg-gray-50/80 border border-gray-100">
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {"Palate is an app that gamifies eating out and turns it into a fun experience. Initialize your food preferences and get local restaurant recommendations based on your/group preferences. Follow friends and keep up with their reviews/experiences at restaurants. Develop your \u201CPalate\u201D with every restaurant you go to. Share your Palate with friends."}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2.5">Technical highlights</h4>
                    <ul className="space-y-2 text-gray-700 text-sm leading-relaxed">
                      <li><strong className="text-gray-800 font-medium">Microservices + Docker</strong> — Auth, User, Restaurant services over HTTP with isolated DBs.</li>
                      <li><strong className="text-gray-800 font-medium">WebSocket (Socket.IO)</strong> — Live notifications, party queue, online status, instant messaging.</li>
                      <li><strong className="text-gray-800 font-medium">JWT + Refresh</strong> — 15-min access, 7-day refresh in Redis; web & mobile OAuth.</li>
                      <li><strong className="text-gray-800 font-medium">Geospatial check-in</strong> — PostgreSQL cube/earthdistance, 100m radius verification.</li>
                      <li><strong className="text-gray-800 font-medium">Redis caching</strong> — 1h TTL Places, 10min TTL verification codes.</li>
                      <li><strong className="text-gray-800 font-medium">2FA</strong> — SMS (Twilio) & Email (SES), 10min Redis-backed codes, rate limiting.</li>
                    </ul>
                  </div>
                  <div className="space-y-3 pt-1 border-t border-gray-200">
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Greatest challenge</h4>
                      <p className="text-gray-700 text-sm leading-relaxed">Recommendations rely on Google Places (ratings, cuisines, distance). Shallow or inaccurate cuisine data leads to boring suggestions that don’t deliver an “exciting discovery” experience.</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Solution in progress</h4>
                      <p className="text-gray-700 text-sm leading-relaxed">NLP on user-generated reviews (Google, Yelp, Instagram) to extract sentiment, dish mentions, and patterns (e.g. “outdoor seating,” “romantic,” “Instagram-worthy”) so we surface why people loved a place, not just a number.</p>
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0 w-96">
                  <div className="rounded-2xl overflow-hidden border border-gray-200/80 shadow-lg" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
                    <video
                      src="/palate-demo.mp4"
                      className="w-full h-auto block"
                      playsInline
                      muted
                      loop
                      autoPlay
                      onCanPlay={(e) => {
                        const v = e.currentTarget;
                        if (v.paused) v.play().catch(() => {});
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
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
                {(currentProject.technologies ?? []).map((tech: string, index: number) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
            </>
          )}
          </div>
        </div>
        <div className="flex flex-col items-center gap-3 flex-shrink-0 pt-2">
          <p className="text-center text-sm text-gray-500">
            Project {currentIndex + 1} of {projectsData.length}
          </p>
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
    </div>
  );
};
