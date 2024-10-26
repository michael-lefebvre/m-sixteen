# Dev log

## day to day TODOs

- [x] setup the Vite/React/SSG tooling. Generate a static website from dummy data with nested routes.
- [ ] Router, client-side navigation.
- [ ] Generate content from MDX and JSON files.

## 2024-10-26 **project setup**

```sh
$ pnpm create vite-extra .
```

Added the `prerender.js` script based on [Vite's official documentation](https://github.com/vitejs/vite-plugin-vue/blob/main/playground/ssr-vue/prerender.js).

Upgraded to React 19@rc following the [official guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide).

Set up PostCSS. Did minor tweaks to the the config file to accept nested rules.

~~We now know how to distinguish execution context using `import.meta.env` and `import.meta.env.SSR`. This will be useful for permute rendering strategies, eg: use `Suspense` in the client only.~~

> [!WARNING]  
> Using `import.meta.SSR` will trigger an error while hydrating the app.
> We can use `suppressHydrationWarning={true}` to prevent the error from being displayed, but the app will not be hydrated properly.  
> the recommended solution is to [do a two-pass rendering](https://react.dev/reference/react-dom/client/hydrateRoot#handling-different-client-and-server-content), but it makes the logic more complex.

#### A note on the `prerender.js` script

The script is a bit hacky. We need to find a way to not duplicate the routes/content definition between the build script and the legit app code.
The first idea is to use a JSON file to store the routes and content. We can then import this file in the `prerender.js` script and in the app code. The downside is that we lose the ability to use dynamic imports for the content.  
Another approach would be to let the build scripts use the app code to generate the routes and content. This would require a way to run typescript code in the build script. We could use `ts-node` for this but it's important to keep in mind that the app code depends on the Vite config.
Good news, Vitest has a package for this: [`vite-node`](https://www.npmjs.com/package/vite-node).

```sh
$ npx vite-node index.ts
```

A quick test shows that it works. We need to adapt our `tsconfig.json`, and most importantly, we will have to be careful with the `window` object in the app code as it won't be defined in a Node.js environment.
