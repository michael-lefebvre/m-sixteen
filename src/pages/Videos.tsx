import { useMemo } from 'react';

import { Link } from '@/components/Link';
import { VideoPlayer } from '@/components/VideoPlayer';
import { videoPageList } from '@/mdx';
import { VideoProps } from '@/types/media';

// TEMPORARY, must be merged with the `VideoProps` sources
const videos: VideoProps[] = [
  {
    publicId: 'videos/the-change_banska-b',
    format: 'mp4',
    width: 640,
    height: 480,
    kind: 'video',
    title: 'The change (Banska B, Slovakia)',
    caption: 'Live in Banska Bystrica, Slovakia',
    poster: {
      publicId: 'videos/the-change_banska-b.jpg',
      src: 'https://res.cloudinary.com/m-sixteen/video/upload/f_auto,q_auto/v1/videos/the-change_banska-b.jpg',
      format: 'jpg',
      width: 640,
      height: 480,
      kind: 'video',
      // placeholder: '97,63,45',
      placeholder: '255,0,0',
    },
    preview: {
      src: 'https://res.cloudinary.com/m-sixteen/video/upload/c_scale,w_240/du_10,so_40/ac_none/videos/the-change_banska-b.mp4',
      width: 240,
      height: 180, // ratio rounded 2.66: 480/2.66 = 180
      kind: 'video',
      format: 'mp4',
      publicId: 'videos/the-change_banska-b.mp4',
    },
  },
  {
    publicId: 'videos/shaihulud',
    source: 'youtube',
    src: 'https://youtu.be/iKuVj7a3Cj8',
    format: 'mp4',
    width: 640,
    height: 480,
    title: 'Shai Hulud Opening',
    caption: 'Understress live at Paris',
    kind: 'video',
    poster: {
      publicId: 'videos/shaihulud.jpg',
      src: 'https://i9.ytimg.com/vi_webp/iKuVj7a3Cj8/mq1.webp?sqp=COz-lbkG&rs=AOn4CLBMwf9HCASywEVbjX_mB39xTa8-Dg',
      format: 'jpg',
      width: 640,
      height: 480,
      kind: 'image',
      placeholder: '255,0,0',
    },
  },
];

export function Videos({ slug }: { slug: string }) {
  const page = useMemo(() => videoPageList.find((p) => p.path === `/videos/${slug}`), [slug]);

  if (!page) {
    throw new Error(`Page not found: ${slug}`);
  }

  // TEMP: Random video index
  const videoIndex = Math.floor(Math.random() * 100 + 1) % 2;

  return (
    <>
      <header>
        <h3>Videos</h3>
        <Link href="/">Back</Link>
      </header>
      <div>{page.title}</div>
      <VideoPlayer {...videos[videoIndex]} />
    </>
  );
}
