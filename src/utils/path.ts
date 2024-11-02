import { ENV_BASE_URL } from '@/constants';

export function joinUrlSegments(a: string, b: string): string {
  if (!a || !b) return a || b || '';

  if (a[a.length - 1] === '/') a = a.substring(0, a.length - 1);

  if (b[0] !== '/') b = `/${b}`;

  return a + b;
}

export function removeLeadingSlash(str: string): string {
  return str[0] === '/' ? str.slice(1) : str;
}

export function removeTrailingSlash(str: string): string {
  return str.replace(/\/+$/, '');
}

export function stripBase(path: string, base: string): string {
  if (path === base) return '/';

  const devBase = withTrailingSlash(base);
  return path.startsWith(devBase) ? path.slice(devBase.length - 1) : path;
}

export function withTrailingSlash(path: string): string {
  if (path[path.length - 1] !== '/') return `${path}/`;

  return path;
}

export function withLeadingSlash(path: string): string {
  if (path[0] !== '/') return `/${path}`;
  return path;
}

export function withLeadingBasePath(path: string, base: string): string {
  if (path === '/') return base;
  if (path[0] === '/') return joinUrlSegments(base, path.slice(1));
  return joinUrlSegments(base, path);
}

const staticBaseURL = joinUrlSegments(ENV_BASE_URL, 'static');

export const getStaticUrl = (relativePath: string) => joinUrlSegments(staticBaseURL, relativePath);

export const getPhotoUrl = (path: string) => getStaticUrl(joinUrlSegments('photos', path));

export const getReleaseUrl = (path: string) => getStaticUrl(joinUrlSegments('releases', path));

export const getDiscographyUrl = (path: string) =>
  getStaticUrl(joinUrlSegments('discography', path));
