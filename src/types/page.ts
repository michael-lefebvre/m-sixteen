import type { LazyExoticComponent } from 'react';
import type { MDXProps } from 'mdx/types';

/*
 Logic for the `Page` and `MdxPage` types inspired by [yeolyi blog](https://github.com/yeolyi/blog)
 */
export type Page = {
  // The unique identifier for the page
  // may be it's the role of the `path` field
  id: string;
  title: string;
  description: string;
  // The URL pathname of the page
  path: string;
  // A optional image URL for SEO
  src?: string;
};

export type MdxPage = Page & {
  importMdx: () => Promise<typeof import('*.mdx')>;
  // Uselss for now, let's see if it could help to organize the timeline
  dateStr?: string;
  // for the cover image, similar to the `RiverProps` 'align' & 'imageTextRatio'
  // let's keep it for reference
  objectFit?: 'contain' | 'cover';
};

export type VideoPage = Page & {};

export type ReleasePage = Page &
  Pick<MdxPage, 'importMdx'> & {
    nestedPath?: string[];
  };

export type MdxPageId = MdxPage['id'];

export type MdxPromiseType = Promise<LazyExoticComponent<(props: MDXProps) => JSX.Element>>;
