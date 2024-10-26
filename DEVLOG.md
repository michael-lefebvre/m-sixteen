# Dev log

## day to day TODOs

- [x] setup the Vite/React/SSG tooling. Generate a static website from dummy data with nested routes.
- [ ] Router, client-side navigation.
- [ ] Generate content from MDX and JSON files.

## 2024-10-26 **project setup**

> pnpm create vite-extra .

Added the `prerender.js` script based on [Vite's official documentation](https://github.com/vitejs/vite-plugin-vue/blob/main/playground/ssr-vue/prerender.js).

Upgraded to React 19@rc following the [official guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide).

Set up PostCSS. Did minor tweaks to the the config file to accept nested rules.

We now know how to distinguish execution context using `import.meta.env` and `import.meta.env.SSR`. This will be useful for permute rendering strategies, eg: use `Suspense` in the client only.
