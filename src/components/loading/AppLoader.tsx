import { useCallback, useEffect, useState } from 'react';
import LoadingScreen from './LoadingScreen';

const MIN_LOADING_MS = 2800;
const PROGRESS_DURATION_MS = 3800;

interface AppLoaderProps {
  children: React.ReactNode;
}

export default function AppLoader({ children }: AppLoaderProps) {
  const [phase, setPhase] = useState<'loading' | 'exiting' | 'done'>('loading');
  const [contentReady, setContentReady] = useState(false);
  const [progressComplete, setProgressComplete] = useState(false);

  const handleProgressComplete = useCallback(() => {
    setProgressComplete(true);
  }, []);

  const handleExitComplete = useCallback(() => {
    setPhase('done');
  }, []);

  useEffect(() => {
    const start = Date.now();

    const waitForContent = Promise.all([
      new Promise<void>((resolve) => {
        if (document.readyState === 'complete') {
          resolve();
          return;
        }
        window.addEventListener('load', () => resolve(), { once: true });
      }),
      document.fonts?.ready ?? Promise.resolve(),
    ]);

    waitForContent.then(() => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, MIN_LOADING_MS - elapsed);
      window.setTimeout(() => setContentReady(true), remaining);
    });
  }, []);

  useEffect(() => {
    if (contentReady && progressComplete && phase === 'loading') {
      setPhase('exiting');
    }
  }, [contentReady, progressComplete, phase]);

  const showLoader = phase !== 'done';

  return (
    <>
      <div className={phase === 'done' ? 'animate-fade-in' : undefined} aria-hidden={showLoader}>
        {children}
      </div>

      {showLoader && (
        <LoadingScreen
          isExiting={phase === 'exiting'}
          progressDurationMs={PROGRESS_DURATION_MS}
          onProgressComplete={handleProgressComplete}
          onExitComplete={handleExitComplete}
        />
      )}
    </>
  );
}
