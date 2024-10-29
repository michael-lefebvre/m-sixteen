import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';

import AppRouter from '@/routers';

const url = window.location.pathname;

function render() {
  const urlWithLeadingSlash = url.startsWith('/') ? url : `/${url}`;

  return (
    <StrictMode>
      <AppRouter pathname={urlWithLeadingSlash} />
    </StrictMode>
  );
}

hydrateRoot(document.getElementById('root') as HTMLElement, render());
