import { StrictMode } from 'react';
import { renderToPipeableStream, type RenderToPipeableStreamOptions } from 'react-dom/server';

import AppRouter from '@/routers';

export function render(
  url: string,
  _ssrManifest?: string,
  options?: RenderToPipeableStreamOptions,
) {
  const urlWithLeadingSlash = url.startsWith('/') ? url : `/${url}`;

  return renderToPipeableStream(
    <StrictMode>
      <AppRouter pathname={urlWithLeadingSlash} />
    </StrictMode>,
    options,
  );
}
