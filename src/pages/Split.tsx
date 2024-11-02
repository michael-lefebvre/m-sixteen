import { Suspense } from 'react';

import { DiscographyCover } from '@/components/DiscographyCover';
import { Mdx } from '@/components/Mdx';

export default function Split() {
  const mdxPromise = Mdx.load('split');

  return (
    <div>
      <h2>Releases/Split</h2>
      <DiscographyCover
        releaseId="split"
        defaultSize="sm"
      />
      <Suspense fallback={<div>Loading...</div>}>
        <Mdx mdxPromise={mdxPromise} />
      </Suspense>
    </div>
  );
}
