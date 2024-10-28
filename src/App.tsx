import { lazy, Suspense, useEffect, useState } from 'react';

import reactLogo from '@/assets/react.svg';

import '@/App.css';

// Works also with SSR as expected
const Card = lazy(() => import('./Card'));

function App() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <div>
        <a href="/releases/debut-ep">
          <img
            src="/vite.svg"
            className="logo"
            alt="Vite logo"
          />
        </a>
        <a href="/moments/early-years">
          <img
            src={reactLogo}
            className="logo react"
            alt="React logo"
          />
        </a>
      </div>
      <h1>Vite + React from {isClient ? 'Client' : 'Server'}</h1>

      <Suspense fallback={<p>Loading card component...</p>}>
        <Card />
      </Suspense>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
      <div className="releases--ghost"></div>
      <div
        className="releases--ghost"
        style={{
          '--releases-ghost-opacity': 0.5,
        }}
      >
        <div>👻</div>
      </div>
    </>
  );
}

export default App;
