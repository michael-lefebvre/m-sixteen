import { Suspense } from 'react';

import { DiscographyCover } from '@/components/DiscographyCover';
import { Mdx } from '@/components/Mdx';

export default function Album() {
  const mdxPromise = Mdx.load('album');

  return (
    <div>
      <h2>Releases/Album</h2>
      <DiscographyCover
        releaseId="album"
        defaultSize="sm"
      />
      <Suspense fallback={<div>Loading...</div>}>
        <Mdx mdxPromise={mdxPromise} />
      </Suspense>
    </div>
  );
}
