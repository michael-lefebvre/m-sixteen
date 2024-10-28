import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import mdx from '@mdx-js/rollup';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    {
      enforce: 'pre',
      ...mdx(),
    },
    react(),
  ],
  // TODO: Use Vite's define option to pass environment variables to the app and server, not process.env
  // 🤔 first, we should wrap the value with JSON.stringify(
  // 🤨 second, what's the point of this?
  define: {
    'process.env': process.env,
  },
  build: {
    manifest: true,
    ssrManifest: true,
    outDir: 'build',
    emptyOutDir: true,
    copyPublicDir: false,
  },
  server: {
    port: 3004,
    open: '/',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
