import ReactPlayerVanilia from 'react-player/file';
import ReactPlayerVimeo from 'react-player/vimeo';
import ReactPlayerYt from 'react-player/youtube';

import { getVideoByPublicId } from '@/contents/videos';
import type { VideoProps } from '@/types/media';
import { cldVideoUrl } from '@/utils/cld';
import { intToPx } from '@/utils/design';
import { ImageBase } from './ImageBase';

const ReactPlayerFromSource = {
  youtube: ReactPlayerYt,
  vimeo: ReactPlayerVimeo,
  file: ReactPlayerVanilia,
};

export const VideoPlayer = (props: VideoProps) => {
  const { publicId, source } = props;
  const video = getVideoByPublicId(publicId);
  const { width, height, src } = video;

  const videoSource = source ? src : cldVideoUrl(publicId);
  const ReactPlayer = ReactPlayerFromSource[source || 'file'];

  return (
    <ReactPlayer
      light={
        <ImageBase
          src={props.poster.src}
          alt="Thumbnail"
        />
      }
      url={videoSource}
      width={intToPx(width)}
      height={intToPx(height)}
      controls
      previewTabIndex={-1}
    />
  );
};
