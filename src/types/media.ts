import { AssetProps } from './asset';

export interface PhotoProps extends AssetProps {
  // this property should be relegated to an `MDX` file to ease the author's edit
  caption?: string;
  // We must find a generic way to handle the alt attribute
  // without wasting time on each entry
  alt?: string;
  // a blurhash based background color of the image, use as a placeholder on lazy loading
  placeholder: string;
}

export type VideoSource = 'youtube' | 'vimeo';

export interface VideoProps extends AssetProps {
  // by default, a video is hosted on the CDN and the source is the same as the asset
  // but in some cases, the video is hosted on a third-party platform, like YouTube or Vimeo
  source?: VideoSource;
  // a preview image displayed on video loading
  poster: AssetProps & {
    placeholder: string;
  };
  // optional for now, but it sounds like it may be required in the future
  title?: string;
  // same questionning as for the `PhotoProps` 'caption' field
  caption?: string;
  // a gif/mp4 preview of the video to display on hover, ala YouTube
  preview?: AssetProps;
}
