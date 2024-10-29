import { Suspense } from 'react';

import { Mdx } from '@/components/Mdx';

export default function Album() {
  const mdxPromise = Mdx.load('album');

  return (
    <div>
      <h2>Releases/Album</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <Mdx mdxPromise={mdxPromise} />
      </Suspense>
    </div>
  );
}
