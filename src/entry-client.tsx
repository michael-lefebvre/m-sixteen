import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';

import AppRouter from '@/routers';
import { withLeadingSlash } from '@/utils/path';

const urlWithLeadingSlash = withLeadingSlash(window.location.pathname);

hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <StrictMode>
    <AppRouter pathname={urlWithLeadingSlash} />
  </StrictMode>,
);
