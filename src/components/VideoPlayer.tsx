import ReactPlayerVanilia from 'react-player/file';
import ReactPlayerVimeo from 'react-player/vimeo';
import ReactPlayerYt from 'react-player/youtube';

import { ENV_BASE_URL } from '@/constants';
import { getAssetByPublicId } from '@/contents/assets';
import { getVideoByPublicId } from '@/contents/videos';
import type { VideoProps } from '@/types/media';
import { cldImageUrl, cldVideoUrl } from '@/utils/cld';
import { intToPx } from '@/utils/design';
import isInternalUrl from '@/utils/isInternalUrl';
import { withLeadingBasePath } from '@/utils/path';
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
  const poster = getAssetByPublicId(props.poster);
  const hasPoster = poster && poster.kind === 'image';
  const hasPosterSrc = hasPoster && poster.src;
  const posterCleanSrc = hasPosterSrc
    ? isInternalUrl(poster.src)
      ? withLeadingBasePath(poster.src!, ENV_BASE_URL)
      : poster.src
    : null;
  const posterSource = hasPoster && posterCleanSrc ? posterCleanSrc : cldImageUrl(props.poster);
  console.log('props', props);
  console.log('posterSource', posterSource, poster);
  console.log('videoSource', videoSource, video);
  return (
    <ReactPlayer
      light={
        posterSource && (
          <ImageBase
            src={posterSource}
            alt="Thumbnail"
          />
        )
      }
      url={videoSource}
      width={intToPx(width)}
      height={intToPx(height)}
      controls
      previewTabIndex={-1}
    />
  );
};
