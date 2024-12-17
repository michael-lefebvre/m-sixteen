// Stolen from Docusaurus core package
// https://github.com/facebook/docusaurus/blob/0c8635529ee964401f441030c8db869711f87227/packages/docusaurus/src/client/exports/isInternalUrl.ts

export function hasProtocol(url: string): boolean {
  return /^(?:\w*:|\/\/)/.test(url);
}

export default function isInternalUrl(url?: string): boolean {
  return typeof url !== 'undefined' && !hasProtocol(url);
}
