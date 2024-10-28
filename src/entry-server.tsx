import { StrictMode } from 'react';
import { renderToPipeableStream, type RenderToPipeableStreamOptions } from 'react-dom/server';

import App from '@/App';
import { allMdxPosts } from '@/mdx';
import Page from '@/pages/Moment';

export function render(
  url: string,
  _ssrManifest?: string,
  options?: RenderToPipeableStreamOptions,
) {
  const urlWithLeadingSlash = url.startsWith('/') ? url : `/${url}`;
  const page = allMdxPosts.find((p) => p.path === urlWithLeadingSlash);
  const content = page ? <Page mdxPage={page.id} /> : <App />;

  return renderToPipeableStream(<StrictMode>{content}</StrictMode>, options);
}
