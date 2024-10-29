import { startTransition, useEffect, useState } from 'react';
import { URLPattern } from 'urlpattern-polyfill';

import ClientOnly from '@/components/ClientOnly';
import { ErrorBoundary as RootErrorBoundary } from '@/components/ErrorBoundary';
import { Link } from '@/components/Link';
import { PointerLayout as Layout } from '@/layouts/Pointer';
import { Home } from '@/pages/Home';
import { Moments } from '@/pages/Moments';
import { Releases } from '@/pages/Releases';
import { Videos } from '@/pages/Videos';
import { watchUrl } from '@/utils/navigation';

const params = { release: null, moment: null, video: null } as const;
type ParamsKeys = keyof typeof params;

type ParamsProps = { [key in ParamsKeys]: string | null };

const defaultParams: ParamsProps = { ...params };

const routesPattern = new URLPattern({
  pathname: '{/releases/:release}?{/moments/:moment}?{/videos/:video}?',
});

const getPathnameParams = (pathname: string) => {
  if (pathname === '/') return defaultParams;
  const urlObject = new URL(pathname, import.meta.env.VITE_APP_CANONICAL);
  const match = routesPattern.exec(urlObject);
  if (!match) throw new Error('Invalid pathname');

  const groups = match.pathname.groups;
  return {
    release: groups.release ?? null,
    moment: groups.moment ?? null,
    video: groups.video ?? null,
  };
};

const isNoParamsSet = (params: ParamsProps) => {
  return Object.values(params).every((value) => value === null);
};

const AppRouter = ({ pathname }: { pathname: string }) => {
  const [params, setParams] = useState<ParamsProps>(() => getPathnameParams(pathname));
  const [error, setError] = useState<Error['message'] | null>(null);

  useEffect(() => {
    const unwatchUrl = watchUrl(({ pathname }) => {
      try {
        const newParams = getPathnameParams(pathname);
        startTransition(() => setParams(newParams));
      } catch (error) {
        if (error instanceof Error) setError(error.message);
      }
    });

    return () => {
      unwatchUrl();
    };
  }, []);

  const { release, moment, video } = params;
  const hasNoParams = isNoParamsSet(params);
  const hasError = error !== null;

  return (
    <RootErrorBoundary>
      {!hasError && (
        <Layout>
          {hasNoParams && <Home />}
          {release && <Releases release={release} />}
          {moment && <Moments slug={moment} />}
          {video && <Videos slug={video} />}
        </Layout>
      )}
      {hasError && (
        <div>
          <h1>Error</h1>
          <p>{error}</p>
          <Link
            href="/"
            onClick={() => setError(null)}
          >
            Go back to home
          </Link>
        </div>
      )}
      <ClientOnly>{() => <pre>{JSON.stringify(params, null, 2)}</pre>}</ClientOnly>
    </RootErrorBoundary>
  );
};

export default AppRouter;
