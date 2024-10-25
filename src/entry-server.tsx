import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from '@/App';

export function render(url: string) {
  const urlWithLeadingSlash = url.startsWith('/') ? url : `/${url}`;
  let title = import.meta.env.VITE_APP_TITLE;
  if (urlWithLeadingSlash.startsWith('/releases/')) {
    const slug = urlWithLeadingSlash.replace('/releases/', '');
    title = 'Split w/ the Missing 23rd - ' + slug;
  }

  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
  return { html, title };
}
