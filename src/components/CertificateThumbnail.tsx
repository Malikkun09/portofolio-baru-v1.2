import { memo, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { useInView } from '@/hooks/use-in-view';
import { requestImageLoadSlot } from '@/hooks/use-image-load-queue';

interface CertificateThumbnailProps {
  src: string;
  alt: string;
  className?: string;
}

/**
 * Thumbnail loader for certificate grid:
 * - No <img> until card is near viewport (tight Intersection Observer)
 * - Max 2 concurrent full-size decodes via global queue
 * - Skeleton until image is ready
 */
const CertificateThumbnail = memo(function CertificateThumbnail({
  src,
  alt,
  className,
}: CertificateThumbnailProps) {
  const { ref, inView } = useInView<HTMLDivElement>({
    rootMargin: '0px 0px 48px 0px',
    threshold: 0.08,
    triggerOnce: true,
  });

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const releaseRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!inView || imageSrc) return;

    let cancelled = false;

    requestImageLoadSlot().then((release) => {
      if (cancelled) {
        release();
        return;
      }
      releaseRef.current = release;
      setImageSrc(src);
    });

    return () => {
      cancelled = true;
    };
  }, [inView, imageSrc, src]);

  useEffect(() => {
    return () => {
      releaseRef.current?.();
      releaseRef.current = null;
    };
  }, []);

  const finishLoad = () => {
    setLoaded(true);
    releaseRef.current?.();
    releaseRef.current = null;
  };

  return (
    <div ref={ref} className="relative w-full h-full min-h-[120px]">
      {!loaded && (
        <Skeleton className="absolute inset-0 rounded-none bg-white/[0.04] animate-none" />
      )}
      {imageSrc && (
        <img
          src={imageSrc}
          alt={alt}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          onLoad={finishLoad}
          onError={finishLoad}
          className={cn(
            className,
            'transition-opacity duration-300',
            loaded ? 'opacity-100' : 'opacity-0',
          )}
        />
      )}
    </div>
  );
});

export default CertificateThumbnail;
