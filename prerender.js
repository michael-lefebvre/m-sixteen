// Pre-render the app into static HTML.
// run `npm run generate` and then `dist/static` can be served as a static site.

import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const toAbsolute = (p) => path.resolve(__dirname, p);

const manifest = JSON.parse(
  fs.readFileSync(toAbsolute('dist/static/.vite/ssr-manifest.json'), 'utf-8'),
);
const template = fs.readFileSync(toAbsolute('dist/static/index.html'), 'utf-8');
const { render } = await import('./dist/server/entry-server.js');

const routesToPrerender = ['/', '/releases/split-with-the-missing-23rd'];
fs.mkdirSync(toAbsolute('dist/static/releases'));
(async () => {
  // pre-render each route...
  for (const url of routesToPrerender) {
    const rendered = await render(url, manifest);

    const html = template
      .replace(
        /<title>.+<\/title>/,
        `<title>${rendered.title ?? import.meta.env.VITE_APP_TITLE}</title>`,
      )
      .replace(`<!--app-head-->`, rendered.head ?? '')
      .replace(`<!--app-html-->`, rendered.html ?? '');

    const filePath = `dist/static${url === '/' ? '/index' : url}.html`;
    fs.writeFileSync(toAbsolute(filePath), html);
  }

  // done, delete .vite directory including ssr manifest
  fs.rmSync(toAbsolute('dist/static/.vite'), { recursive: true });
  fs.rmSync(toAbsolute('dist/server'), { recursive: true });
})();
