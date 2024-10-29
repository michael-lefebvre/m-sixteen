import { useMemo } from 'react';

import { Link } from '@/components/Link';
import { momentPageList } from '@/mdx/moments';
import Moment from './Moment';

export function Moments({ slug }: { slug: string }) {
  const page = useMemo(() => momentPageList.find((p) => p.path === `/moments/${slug}`), [slug]);

  if (!page) {
    throw new Error(`Page not found: ${slug}`);
  }

  return (
    <>
      <header>
        <h3>Moments</h3>
        <Link href="/">Back</Link>
      </header>

      <Moment pageId={page.id} />
    </>
  );
}
