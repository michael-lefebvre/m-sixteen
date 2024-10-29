import { Suspense } from 'react';

import { Mdx } from '@/components/Mdx';

export default function Split() {
  const mdxPromise = Mdx.load('split');

  return (
    <div>
      <h2>Releases/Split</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <Mdx mdxPromise={mdxPromise} />
      </Suspense>
    </div>
  );
}
