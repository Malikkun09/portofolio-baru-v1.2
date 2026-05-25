import { useEffect, useRef, useState } from 'react';

const experiences = [
  {
    year: '2026',
    title: 'Full Stack (Personal Project)',
    company: 'SkillMatch SMK / KerjaIn From Dicoding',
    description:
      'Building full-stack platform with React (Vite) + TailwindCSS and Laravel 12. Implemented AI roadmap generator and Laravel Sanctum authentication. Focus on modern and usable UI/UX.',
    tags: ['React', 'Laravel', 'AI', 'TailwindCSS'],
  },
  {
    year: '2025',
    title: 'Hackathon Participant',
    company: 'BPJS Hackathon & Web KulinaAI Powered with AI',
    description:
      'Collaborated in a team to create prototypes within limited time. Contributed to frontend development and API integration. Focused on problem solving and presenting solutions to judges.',
    tags: ['React', 'API Integration', 'Teamwork'],
  },
  {
    year: '2024 — 2025',
    title: 'Frontend Student (Self Project)',
    company: 'Various Web Portfolio & UI Projects',
    description:
      'Built responsive websites using HTML, CSS, and JavaScript. Practiced modern UI trends like glassmorphism, dark theme, and 3D elements. Sharpened UX through layout and interaction design.',
    tags: ['HTML', 'CSS', 'JavaScript', '3D'],
  },
  {
    year: '2024',
    title: 'Learning Phase — Web Development',
    company: 'Self Learning',
    description:
      'Learned HTML, CSS, JavaScript basics. Started exploring React and component-based architecture. Created mini projects and UI clones to strengthen fundamentals.',
    tags: ['HTML', 'CSS', 'JavaScript', 'React'],
  },
];

export default function Experience() {
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
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[#3b82f6]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <span className="section-label mb-4 block">Experience</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f0f0f0]">
            Experience
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#8b5cf6]/50 via-[#8b5cf6]/20 to-transparent" />

          {/* Experience items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`relative transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${200 + index * 150}ms` }}
              >
                <div
                  className={`flex flex-col md:flex-row md:items-start gap-6 md:gap-12 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div
                    className={`md:w-1/2 ${
                      index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                    } pl-8 md:pl-0`}
                  >
                    <div className="glass-effect rounded-2xl p-6 hover:border-[#8b5cf6]/30 transition-all duration-300 group">
                      <span className="text-[#8b5cf6] font-mono text-sm font-medium mb-2 block">
                        {exp.year}
                      </span>
                      <h3 className="text-xl font-semibold text-[#f0f0f0] mb-1 group-hover:text-[#8b5cf6] transition-colors">
                        {exp.title}
                      </h3>
                      <p className="text-[#a1a1aa] text-sm mb-3">{exp.company}</p>
                      <p className="text-[#a1a1aa]/80 text-sm leading-relaxed mb-4">
                        {exp.description}
                      </p>
                      <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                        {exp.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 text-xs font-mono text-[#8b5cf6] bg-[#8b5cf6]/10 rounded-full border border-[#8b5cf6]/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="absolute left-0 md:left-1/2 top-6 -translate-x-1/2 w-4 h-4 rounded-full bg-[#8b5cf6] border-4 border-[#0a0a0a] shadow-glow z-10" />

                  {/* Spacer for opposite side */}
                  <div className="hidden md:block md:w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
