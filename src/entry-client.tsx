import '@/index.css';

import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';

import App from '@/App';
import { allMdxPosts } from '@/mdx';
import Page from '@/pages/Moment';

const url = window.location.pathname;

function render() {
  const urlWithLeadingSlash = url.startsWith('/') ? url : `/${url}`;
  const page = allMdxPosts.find((p) => p.path === urlWithLeadingSlash);
  const content = page ? <Page pageId={page.id} /> : <App />;

  return <StrictMode>{content}</StrictMode>;
}

hydrateRoot(document.getElementById('root') as HTMLElement, render());
