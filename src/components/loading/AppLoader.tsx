import { useEffect, useState } from 'react';
import LoadingScreen from './LoadingScreen';

const MIN_LOADING_MS = 2800;

interface AppLoaderProps {
  children: React.ReactNode;
}

export default function AppLoader({ children }: AppLoaderProps) {
  const [phase, setPhase] = useState<'loading' | 'exiting' | 'done'>('loading');
  const [contentReady, setContentReady] = useState(false);
  const [progressComplete, setProgressComplete] = useState(false);

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

  return (
    <>
      {phase !== 'done' && (
        <LoadingScreen
          isExiting={phase === 'exiting'}
          onProgressComplete={() => setProgressComplete(true)}
          onExitComplete={() => setPhase('done')}
        />
      )}
      {phase === 'done' && (
        <div className="animate-in fade-in duration-700">{children}</div>
      )}
    </>
  );
}
