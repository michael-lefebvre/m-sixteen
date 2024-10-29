import { Suspense } from 'react';

import { Mdx } from '@/components/Mdx';

export default function DebutEp() {
  const mdxPromise = Mdx.load('ep');

  return (
    <div>
      <h2>Releases/Debut - Ep</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <Mdx mdxPromise={mdxPromise} />
      </Suspense>
    </div>
  );
}
