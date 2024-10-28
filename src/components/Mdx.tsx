import { lazy, use } from 'react';
import type { MDXComponents } from 'mdx/types';

import { allMdxPosts } from '@/mdx';
import type { MdxPage, MdxPromiseType } from '@/types/page';

const mdxComponents: MDXComponents = {
  img: (props) => (
    <img
      {...props}
      className="asd"
    />
  ),
};

async function loadFile(pageId: MdxPage['id']): MdxPromiseType {
  const page = allMdxPosts.find((p) => p.id === pageId);
  if (!page) {
    throw new Error(`Page not found: ${pageId}`);
  }
  return lazy(page.importMdx);
}

function MdxWrapper({
  mdxPromise,
  components,
}: {
  mdxPromise: MdxPromiseType;
  components?: MDXComponents;
}) {
  const MdxCompiled = use(mdxPromise);
  return <MdxCompiled components={{ ...mdxComponents, ...components }} />;
}

export const Mdx = Object.assign(MdxWrapper, {
  load: loadFile,
  components: mdxComponents,
});
