import { lazy, Suspense, type FC } from 'react';

const ReleaseEpLazy = lazy(() => import('./DebutEp'));
const ReleaseSplitLazy = lazy(() => import('./Split'));
const ReleaseAlbumLazy = lazy(() => import('./Album'));

export const Releases: FC<{ release: string }> = ({ release }) => {
  return (
    <div>
      <h2>Releases</h2>
      <Suspense fallback={<div>Loading...</div>}>
        {
          {
            'debut-ep': <ReleaseEpLazy />,
            'split-with-the-missing-23rd': <ReleaseSplitLazy />,
            'self-titled': <ReleaseAlbumLazy />,
          }[release]
        }
      </Suspense>
    </div>
  );
};
