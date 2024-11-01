import App from '@/App';

export const HTML = ({ cssPath }: { cssPath: string }) => {
  return (
    <html lang="en">
      <head>
        {import.meta.env.DEV && <DevScripts />}
        <meta charSet="UTF-8" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta
          name="description"
          content={import.meta.env.VITE_APP_DESCRIPTION}
        />
        <title>{import.meta.env.VITE_APP_TITLE}</title>
        <link
          rel="stylesheet"
          href={cssPath}
        />
      </head>
      <body>
        <div id="root">
          <App />
        </div>
        {import.meta.env.DEV && (
          <script
            type="module"
            src="/src/entry-client.tsx"
          />
        )}
      </body>
    </html>
  );
};

const DevScripts = () => (
  <>
    <script
      type="module"
      dangerouslySetInnerHTML={{
        __html: `import RefreshRuntime from '/@react-refresh';
RefreshRuntime.injectIntoGlobalHook(window);
window.$RefreshReg$ = () => {};
window.$RefreshSig$ = () => (type) => type;
window.__vite_plugin_react_preamble_installed__ = true;`,
      }}
    />
    <script
      type="module"
      src="/@vite/client"
    />
  </>
);
