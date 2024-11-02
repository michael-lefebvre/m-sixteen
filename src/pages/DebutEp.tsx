import { Suspense } from 'react';

import { DiscographyCover } from '@/components/DiscographyCover';
import { Mdx } from '@/components/Mdx';

export default function DebutEp() {
  const mdxPromise = Mdx.load('ep');

  return (
    <div>
      <h2>Releases/Debut - Ep</h2>
      <DiscographyCover
        releaseId="ep"
        defaultSize="sm"
      />
      <Suspense fallback={<div>Loading...</div>}>
        <Mdx mdxPromise={mdxPromise} />
      </Suspense>
    </div>
  );
}
