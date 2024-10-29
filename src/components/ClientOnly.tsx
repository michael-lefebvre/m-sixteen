import { isValidElement, type ReactNode } from 'react';

import { useIsClient } from '@/hooks/useIsClient';

// Similar comp to the one described here:
// https://www.joshwcomeau.com/react/the-perils-of-rehydration/#abstractions
// Stolen from:
// https://github.com/Daydreamer-riri/vite-react-ssg/blob/bc14923bb952e9b3b1b9e95f5d4ca2cfbde417d2/src/client/components/ClientOnly.tsx

export interface ClientOnlyProps {
  children?: () => ReactNode;
  fallback?: ReactNode;
}

export default function ClientOnly({ children, fallback }: ClientOnlyProps) {
  const isBrowser = useIsClient();

  if (isBrowser) {
    if (typeof children !== 'function' && import.meta.env.DEV) {
      throw new Error(
        `ssg error: The children of <ClientOnly> must be a "render function", e.g. <ClientOnly>{() => <span>{window.location.href}</span>}</ClientOnly>.
Current type: ${isValidElement(children) ? 'React element' : typeof children}`,
      );
    }
    return <>{children?.()}</>;
  }

  return fallback ?? null;
}
