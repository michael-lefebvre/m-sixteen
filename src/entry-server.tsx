import { StrictMode } from 'react';
import { renderToPipeableStream, type RenderToPipeableStreamOptions } from 'react-dom/server';

import AppRouter from '@/routers';
import { withLeadingSlash } from '@/utils/path';

export function render(
  url: string,
  _ssrManifest?: string,
  options?: RenderToPipeableStreamOptions,
) {
  const urlWithLeadingSlash = withLeadingSlash(url);

  return renderToPipeableStream(
    <StrictMode>
      <AppRouter pathname={urlWithLeadingSlash} />
    </StrictMode>,
    options,
  );
}
