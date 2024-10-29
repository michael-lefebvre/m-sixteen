import { useEffect, useState } from 'react';

// Stolen from:
// https://github.com/Daydreamer-riri/vite-react-ssg/blob/bc14923bb952e9b3b1b9e95f5d4ca2cfbde417d2/src/client/hooks/useIsClient.ts
export function useIsClient() {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  return isBrowser;
}
