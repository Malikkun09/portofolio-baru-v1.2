import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import CertificateThumbnail from '@/components/CertificateThumbnail';
import LazyImage from '@/components/LazyImage';
import { useInView } from '@/hooks/use-in-view';

const certificates = [
  {
    title: 'Belajar Back-end Pemula dengan JavaScript',
    pages: ['/Sertifikat/sertfikat1-1.png', '/Sertifikat/sertfikat1-2.png'],
    description:
      'Certificate from Dicoding for the Beginner Back-end with JavaScript class, proving mastery of basic JS syntax, DOM manipulation, and programming logic.',
  },
  {
    title: 'Belajar Membuat Aplikasi Web dengan React',
    pages: ['/Sertifikat/sertfikat2-1.png', '/Sertifikat/sertfikat2-2.png'],
    description:
      'Certificate of completion for Learning to Create Web Applications with React, proving the ability to build interactive web applications using React.',
  },
  {
    title: 'Belajar Membuat Front-End Web untuk Pemula',
    pages: ['/Sertifikat/sertfikat3-1.png', '/Sertifikat/sertfikat3-2.png'],
    description:
      'Certificate of completion for Learning to Create Front-End Web for Beginners, proving the ability to create website displays using HTML, CSS, and JavaScript.',
  },
  {
    title: 'Belajar Dasar Pemrograman JavaScript',
    pages: ['/Sertifikat/sertfikat4-1.png', '/Sertifikat/sertfikat4-2.png', '/Sertifikat/sertfikat4-3.png'],
    description:
      'Certificate of completion for Learning JavaScript Programming Basics, proving the ability to understand JavaScript basics such as variables, functions, objects, arrays, and DOM.',
  },
  {
    title: 'Belajar Dasar Pemrograman Web',
    pages: ['/Sertifikat/sertfikat5-1.png', '/Sertifikat/sertfikat5-2.png', '/Sertifikat/sertfikat5-3.png'],
    description:
      'Certificate of completion for Learning Basic Web Programming, proving the ability to understand website development basics using HTML, CSS, and JavaScript.',
  },
  {
    title: 'Belajar Dasar Cloud dan Gen AI di AWS',
    pages: ['/Sertifikat/sertfikat6-1.png', '/Sertifikat/sertfikat6-2.png', '/Sertifikat/sertfikat6-3.png'],
    description:
      'Certificate of completion for Learning Cloud and Gen AI Basics on AWS, proving understanding of cloud computing concepts, AWS basic services, and Generative AI technology.',
  },
  {
    title: 'Belajar Structured Concurrency dengan GO',
    pages: ['/Sertifikat/sertfikat7-1.png', '/Sertifikat/sertfikat7-2.png'],
    description:
      'Certificate of completion for Learning Structured Concurrency with GO, proving mastery of concurrent programming concepts in Go.',
  },
  {
    title: 'Building Cloud Solutions with Microsoft Azure',
    pages: ['/Sertifikat/sertfikat8-1.png', '/Sertifikat/sertfikat8-2.png', '/Sertifikat/sertfikat8-3.png', '/Sertifikat/sertfikat8-4.png'],
    description:
      'Certificate for Building Cloud Solutions with Microsoft Azure, demonstrating skills in Azure services and cloud architecture.',
  },
  {
    title: 'Cloud Practitioner Essentials',
    pages: ['/Sertifikat/sertifikat9.png'],
    description:
      'Certificate of Cloud Practitioner Essentials, proving foundational knowledge of cloud concepts and AWS services.',
  },
  {
    title: 'Memulai Dasar Pemrograman untuk Pengembang Software',
    pages: ['/Sertifikat/sertifikat10.png'],
    description:
      'Certificate for Starting Programming Basics for Software Developers, proving understanding of fundamental programming concepts.',
  },
];

interface CertificateCardProps {
  index: number;
  title: string;
  description: string;
  thumbnail: string;
  pageCount: number;
  onOpen: (index: number) => void;
}

const CertificateCard = memo(function CertificateCard({
  index,
  title,
  description,
  thumbnail,
  pageCount,
  onOpen,
}: CertificateCardProps) {
  const handleClick = useCallback(() => onOpen(index), [index, onOpen]);

  return (
    <article
      onClick={handleClick}
      className="bg-[#111111] rounded-2xl overflow-hidden border border-white/5 hover:border-[#8b5cf6]/30 transition-colors duration-300 group cursor-pointer [content-visibility:auto] [contain-intrinsic-size:0_320px]"
    >
      <div className="relative aspect-[3/2] overflow-hidden bg-[#0d0d0d] isolate">
        <CertificateThumbnail
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
        />
        {pageCount > 1 && (
          <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded-full text-xs text-white pointer-events-none">
            {pageCount} pages
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-sm font-semibold text-[#f0f0f0] line-clamp-2 group-hover:text-[#8b5cf6] transition-colors mb-2">
          {title}
        </h3>
        <p className="text-xs text-[#a1a1aa]/80 leading-relaxed line-clamp-3">{description}</p>
      </div>
    </article>
  );
});

interface CertificateModalProps {
  certIndex: number;
  currentPage: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSelectPage: (page: number) => void;
}

function CertificateModal({
  certIndex,
  currentPage,
  onClose,
  onPrev,
  onNext,
  onSelectPage,
}: CertificateModalProps) {
  const cert = certificates[certIndex];
  const pageCount = cert.pages.length;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
        aria-label="Close certificate preview"
      >
        <X size={20} className="text-white" />
      </button>

      <div className="relative max-w-4xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
        <div className="relative min-h-[40vh] flex items-center justify-center">
          <LazyImage
            key={`${certIndex}-${currentPage}`}
            src={cert.pages[currentPage]}
            alt={`${cert.title} - Page ${currentPage + 1}`}
            className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            loading="eager"
          />
        </div>

        {pageCount > 1 && (
          <>
            <button
              onClick={onPrev}
              disabled={currentPage === 0}
              className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-10 h-10 rounded-full glass-effect flex items-center justify-center transition-all duration-300 ${
                currentPage === 0
                  ? 'opacity-30 cursor-not-allowed'
                  : 'opacity-100 hover:bg-[#8b5cf6]/20 cursor-pointer'
              }`}
              aria-label="Previous page"
            >
              <ChevronLeft size={20} className="text-[#f0f0f0]" />
            </button>
            <button
              onClick={onNext}
              disabled={currentPage === pageCount - 1}
              className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-10 h-10 rounded-full glass-effect flex items-center justify-center transition-all duration-300 ${
                currentPage === pageCount - 1
                  ? 'opacity-30 cursor-not-allowed'
                  : 'opacity-100 hover:bg-[#8b5cf6]/20 cursor-pointer'
              }`}
              aria-label="Next page"
            >
              <ChevronRight size={20} className="text-[#f0f0f0]" />
            </button>

            <div className="flex justify-center gap-2 mt-4">
              {cert.pages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => onSelectPage(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === currentPage ? 'w-6 bg-[#8b5cf6]' : 'bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function Certificates() {
  const sectionRef = useRef<HTMLElement>(null);
  const { ref: headerRef, inView: headerInView } = useInView<HTMLDivElement>({
    threshold: 0.2,
    rootMargin: '0px',
    triggerOnce: true,
  });
  const [selectedCert, setSelectedCert] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    document.body.style.overflow = selectedCert !== null ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedCert]);

  const openModal = useCallback((index: number) => {
    setSelectedCert(index);
    setCurrentPage(0);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedCert(null);
    setCurrentPage(0);
  }, []);

  const handleModalPrev = useCallback(() => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  }, []);

  const handleModalNext = useCallback(() => {
    setCurrentPage((prev) => {
      if (selectedCert === null) return prev;
      return Math.min(certificates[selectedCert].pages.length - 1, prev + 1);
    });
  }, [selectedCert]);

  const handleSelectPage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return (
    <section
      id="certificates"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] bg-[#8b5cf6]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-700 ${
            headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="section-label mb-4 block">Certificates</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f0f0f0] mb-4">
            Sertifikat Pencapaian
          </h2>
          <p className="text-[#a1a1aa] max-w-2xl mx-auto">
            A collection of certificates with graduation achievements and attendance that I earned
            while learning and creating.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {certificates.map((cert, index) => (
            <CertificateCard
              key={cert.title}
              index={index}
              title={cert.title}
              description={cert.description}
              thumbnail={cert.pages[0]}
              pageCount={cert.pages.length}
              onOpen={openModal}
            />
          ))}
        </div>
      </div>

      {selectedCert !== null && (
        <CertificateModal
          certIndex={selectedCert}
          currentPage={currentPage}
          onClose={closeModal}
          onPrev={handleModalPrev}
          onNext={handleModalNext}
          onSelectPage={handleSelectPage}
        />
      )}
    </section>
  );
}
