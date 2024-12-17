import { useMemo } from 'react';

import { Link } from '@/components/Link';
import { VideoPlayer } from '@/components/VideoPlayer';
import { ENV_BASE_URL } from '@/constants';
import { getVideoByPublicId, videos } from '@/contents/videos';
import { videoFromSlug } from '@/mdx/videos';

export function Videos({ slug }: { slug: string }) {
  const page = useMemo(() => videoFromSlug(slug), [slug]);

  const video = getVideoByPublicId(videos[0].publicId);

  return (
    <>
      <header>
        <h3>Videos</h3>
        <Link href={ENV_BASE_URL}>Back</Link>
      </header>
      <div>{page.title}</div>
      <VideoPlayer {...video} />
    </>
  );
}
