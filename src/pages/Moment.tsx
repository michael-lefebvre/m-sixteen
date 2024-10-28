import { lazy, LazyExoticComponent, Suspense, use } from 'react';
import type { MDXComponents, MDXProps } from 'mdx/types';

import { allMdxPosts } from '@/mdx';
import type { MdxPage } from '@/types/page';

const mdxComponents: MDXComponents = {
  img: (props) => (
    <img
      {...props}
      className="asd"
    />
  ),
};

type MomentFileType = Promise<LazyExoticComponent<(props: MDXProps) => JSX.Element>>;

async function loadMomentFile(pageId: MdxPage['id']): MomentFileType {
  const page = allMdxPosts.find((p) => p.id === pageId);
  if (!page) {
    throw new Error(`Page not found: ${pageId}`);
  }
  return lazy(page.importMdx);
}

function MomentStory({ moment }: { moment: MomentFileType }) {
  const Mdx = use(moment);
  return <Mdx components={mdxComponents} />;
}

function Moment({ mdxPage }: { mdxPage: MdxPage['id'] }) {
  const moment = loadMomentFile(mdxPage);

  return (
    <>
      <header>
        <h6>Moment</h6>
        <a href="/">Back</a>
      </header>
      <Suspense fallback={<div>Loading...</div>}>
        <MomentStory moment={moment} />
      </Suspense>
    </>
  );
}

export default Moment;
