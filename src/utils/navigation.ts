/**
 * Stolen/inspired from `bloody-use-url`
 * Didn't use the package because I just needed the core functionality
 * and didn't want to add all the ts-patterns dependencies/logic
 * Mathias, if you see this, remember that I'm still loving you!
 */

type UrlType = {
  path: string[];
  pathname: string;
};

let lastLocation: string | undefined;
let lastUrl: UrlType | undefined;

const UNUSED = '';

const parsePathname = (pathname: string) => (pathname === '/' ? [] : pathname.slice(1).split('/'));

const dispatchPopState = () => {
  const event = new Event('popstate');
  window.dispatchEvent(event);
};

/**
 * Navigate to URL.
 *
 * @param to URL to navigate to
 */
export const push = (to: string | URL) => {
  if (typeof to === 'string') to = new URL(to, window.location.origin);
  window.history.pushState(null, UNUSED, to);
  dispatchPopState();
};

/**
 * Navigate to URL without creating a new `history` entry
 *
 * @param to URL to navigate to
 */
export const replace = (to: string | URL) => {
  if (typeof to === 'string') to = new URL(to, window.location.origin);
  window.history.replaceState(null, UNUSED, to);
  dispatchPopState();
};

export const getUrl = (serverUrl?: string): UrlType => {
  const currentLocation = serverUrl ?? window.location.href;

  // Memoizes last URL as expected by useSyncExternalStore
  if (currentLocation === lastLocation && lastUrl !== undefined) {
    return lastUrl;
  }

  const parsedUrl = new URL(currentLocation);
  const pathname = parsedUrl.pathname;
  const url = {
    path: parsePathname(pathname),
    pathname,
  };
  lastLocation = currentLocation;
  lastUrl = url;
  return url;
};

export const watchUrl = (func: (url: UrlType) => void) => {
  const onChange = () => {
    func(getUrl());
  };

  window.addEventListener('popstate', onChange, false);
  return () => {
    window.removeEventListener('popstate', onChange, false);
  };
};
