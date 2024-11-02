import type { DetailedHTMLProps, ImgHTMLAttributes } from 'react';

import spacerGif from '@/assets/1x1.gif?url';
import { DISCOGRAPHY_COVER_SIZES, DiscographyCoverSize } from '@/constants';
import { releaseFromId, type ReleaseId } from '@/mdx/releases';
import { clsx } from '@/utils/clsx';
import { getDiscographyUrl } from '@/utils/path';

type DiscographyCoverProps = DetailedHTMLProps<
  ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
> & {
  releaseId: ReleaseId;
  defaultSize?: DiscographyCoverSize;
};

export const DiscographyCover = ({
  releaseId,
  defaultSize = 'md',
  className,
  ...rest
}: DiscographyCoverProps) => {
  const size = DISCOGRAPHY_COVER_SIZES[defaultSize];
  const release = releaseFromId(releaseId);
  return (
    <picture className={clsx('discography-cover', className)}>
      <source
        sizes=" (max-width:1319px) 296px,(min-width:1320px) and (max-width:1679px) 316px,316px"
        srcSet={[
          getDiscographyUrl(`${releaseId}-48.webp 48w`),
          getDiscographyUrl(`${releaseId}-296.webp 296w`),
          getDiscographyUrl(`${releaseId}-316.webp 316w`),
          getDiscographyUrl(`${releaseId}-632.webp 632w`),
        ].join(',')}
        type="image/webp"
      />
      <source
        sizes=" (max-width:1319px) 296px,(min-width:1320px) and (max-width:1679px) 316px,316px"
        srcSet={[
          getDiscographyUrl(`${releaseId}-48.jpg 48w`),
          getDiscographyUrl(`${releaseId}-296.jpg 296w`),
          getDiscographyUrl(`${releaseId}-316.jpg 316w`),
          getDiscographyUrl(`${releaseId}-632.jpg 632w`),
        ].join(',')}
        type="image/jpeg"
      />
      <img
        {...rest}
        alt={`${release.title} cover`}
        loading="lazy"
        role="presentation"
        decoding="async"
        width={size}
        height={size}
        src={spacerGif}
      />
    </picture>
  );
};
