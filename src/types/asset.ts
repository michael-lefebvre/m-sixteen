export type AssetKind = 'image' | 'video';

export type AssetFormat = 'avif' | 'gif' | 'jpg' | 'mp4' | 'ogg' | 'ogv' | 'png' | 'webm' | 'webp';

export type AssetVideoSource = 'youtube' | 'vimeo';

type AssetBase =
  | {
      kind: 'image';
      // a blurhash based background color of the image, use as a placeholder on lazy loading
      placeholder?: string;
      source?: never;
    }
  | {
      kind: 'video';
      // question still remains: how to handle the poster? if it's a video, it should not have a placeholder
      // but we know that we can generate a image from the video, and that requires to identify the correct Cloudinary file format
      // ... 🤔
      placeholder?: never;
      // source of the video, e.g. youtube, vimeo, etc.
      source?: AssetVideoSource;
    };

export type AssetProps = AssetBase & {
  publicId: string;
  // publicId should be enough to generate the src
  // we keep src for cases where we need to override the publicId
  // e.g. content stored locally, not in the CDN
  src?: string;
  // the width and height of the asset in pixels to calculate the aspect ratio
  width: number;
  height: number;
  kind: AssetKind;
  // finally, the format ain't useful for the src generation, let's remove it
  //format?: AssetFormat;
};
