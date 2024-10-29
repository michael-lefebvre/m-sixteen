import { useMemo } from 'react';

import { Link } from '@/components/Link';
import { allMdxPosts } from '@/mdx';

export function Videos({ slug }: { slug: string }) {
  const page = useMemo(() => allMdxPosts.find((p) => p.path === `/videos/${slug}`), [slug]);

  if (!page) {
    throw new Error(`Page not found: ${slug}`);
  }

  return (
    <>
      <header>
        <h3>Videos</h3>
        <Link href="/">Back</Link>
      </header>
      <div>{page.title}</div>
    </>
  );
}
