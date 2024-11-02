import ReactPlayer from 'react-player';

import type { VideoProps } from '@/types/media';
import { cldVideoUrl } from '@/utils/cld';
import { intToPx } from '@/utils/design';
import { ImageBase } from './ImageBase';

export const VideoPlayer = (props: VideoProps) => {
  const { publicId, source, width, height, src } = props;
  const videoSource = source ? src : cldVideoUrl(publicId);

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
