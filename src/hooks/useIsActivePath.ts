import { useCallback, useSyncExternalStore } from 'react';

import { getUrl, watchUrl } from '@/utils/navigation';
import { removeTrailingSlash } from '@/utils/path';

function getServerSnapshot() {
  return false;
}

/**
 * `useIsActivePath` return if the provided link is active
 *
 * @param path: string
 * @returns boolean
 */
export const useIsActivePath = (path: string, extact = true) => {
  const getSnapshot = useCallback(() => {
    const currentPathname = removeTrailingSlash(getUrl().pathname);
    const nextPathname = new URL(path, window.location.origin).pathname;
    const pathMatch = extact
      ? currentPathname === nextPathname
      : currentPathname.startsWith(nextPathname);
    return pathMatch;
  }, [path, extact]);

  const isActive = useSyncExternalStore(watchUrl, getSnapshot, getServerSnapshot);
  return isActive;
};
