import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Code2 } from 'lucide-react';

const projects = [
  {
    title: 'API Downloader',
    description:
      'API service for downloading content with database management and neat endpoints.',
    image: '/images/project-api.jpg',
    tags: ['Node.js', 'Express', 'MySQL'],
    color: 'from-[#8b5cf6]/30 to-[#7c3aed]/30',
    letter: 'A',
    link: '#',
  },
  {
    title: 'JKN Mobile & Desktop Powered AI',
    description:
      'Application combining modern frontend and AI features to assist JKN users.',
    image: '/images/project-jkn.jpg',
    tags: ['React', 'Electron', 'AI'],
    color: 'from-[#3b82f6]/30 to-[#2563eb]/30',
    letter: 'J',
    link: '#',
  },
  {
    title: 'Courtline Website',
    description:
      'Information and services website focusing on clean design and fast performance.',
    image: '/images/project-court.jpg',
    tags: ['Next.js', 'TailwindCSS', 'UI/UX'],
    color: 'from-[#f59e0b]/30 to-[#d97706]/30',
    letter: 'C',
    link: '#',
  },
  {
    title: 'Teacher & Student Attendance',
    description:
      'Web-based attendance recording system for teachers and students in school environment.',
    image: '/images/project-attendance.jpg',
    tags: ['Laravel', 'MySQL', 'Bootstrap'],
    color: 'from-[#ec4899]/30 to-[#db2777]/30',
    letter: 'K',
    link: '#',
  },
  {
    title: 'Media 2 Link',
    description:
      'Simple tool to manage and share multiple media links in one page.',
    image: '/images/project-media.jpg',
    tags: ['React', 'Vite', 'REST API'],
    color: 'from-[#8b5cf6]/30 to-[#a855f7]/30',
    letter: 'M',
    link: '#',
  },
  {
    title: 'Chat with Social Media',
    description:
      'Experiment integrating chat into social media with focus on automation and workflow.',
    image: '/images/project-chat.jpg',
    tags: ['Node.js', 'Webhooks', 'API'],
    color: 'from-[#06b6d4]/30 to-[#0891b2]/30',
    letter: 'C',
    link: '#',
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#8b5cf6]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <span className="section-label mb-4 block">Projects</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f0f0f0]">
            Featured Work
          </h2>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`group relative transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <div className="relative bg-[#111111] rounded-2xl overflow-hidden border border-white/5 hover:border-[#8b5cf6]/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-glow">
                {/* Image or colored header */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />

                  {/* Letter badge */}
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <span className="text-lg font-bold text-white/60">
                      {project.letter}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-[#f0f0f0] mb-2 group-hover:text-[#8b5cf6] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-[#a1a1aa] mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-xs font-mono text-[#8b5cf6] bg-[#8b5cf6]/10 rounded-md border border-[#8b5cf6]/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                    <button
                      onClick={() => alert('Coming soon!')}
                      className="flex items-center gap-1.5 text-sm text-[#a1a1aa] hover:text-[#8b5cf6] transition-colors"
                    >
                      <Code2 size={14} />
                      <span>Code</span>
                    </button>
                    <button
                      onClick={() => alert('Coming soon!')}
                      className="flex items-center gap-1.5 text-sm text-[#a1a1aa] hover:text-[#8b5cf6] transition-colors"
                    >
                      <ExternalLink size={14} />
                      <span>Live</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
