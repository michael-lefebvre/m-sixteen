export type AssetKind = 'image' | 'video';

export type AssetFormat = 'avif' | 'gif' | 'jpg' | 'mp4' | 'ogg' | 'ogv' | 'png' | 'webm' | 'webp';

export interface AssetProps {
  publicId: string;
  // publicId should be enough to generate the src
  // we keep src for cases where we need to override the publicId
  // e.g. content stored locally, not in the CDN
  src?: string;
  width: number;
  height: number;
  kind: AssetKind;
  format: AssetFormat;
}
