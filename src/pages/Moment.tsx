import { Suspense } from 'react';

import { Mdx } from '@/components/Mdx';
import type { MdxPageId } from '@/types/page';

const mdxComponents: typeof Mdx.components = {
  img: (props) => (
    <img
      {...props}
      className="LOL"
    />
  ),
  h1: (props) => (
    <h1
      {...props}
      className="LOL"
    />
  ),
};

function Moment({ pageId }: { pageId: MdxPageId }) {
  const mdxPromise = Mdx.load(pageId);

  return (
    <>
      <header>
        <h6>Moment</h6>
        <a href="/">Back</a>
      </header>
      <Suspense fallback={<div>Loading...</div>}>
        <Mdx
          mdxPromise={mdxPromise}
          components={mdxComponents}
        />
      </Suspense>
    </>
  );
}

export default Moment;
