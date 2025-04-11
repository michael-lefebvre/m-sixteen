# Dev log

## day to day TODOs

- [x] setup the Vite/React/SSG tooling. Generate a static website from dummy data with nested routes.
- [x] Router, client-side navigation.
- [x] Generate content from MDX and JSON files.
- [ ] Structured media data. Image + Video components.
- [ ] All the content models, discography, concerts, etc., mergable into a single page a.k.a. the "Timeline".
- [x] Update React 19 to stable release.
- [ ] Lightbox component for the media with view transition.
- [ ] List valuable pages to prerender for SEO.
- [ ] Define responsive layouts detection and breakpoints.
- [ ] Resolve routes/path helpers.

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

## 2024-10-27 **Basic routing and server-rendered content**

I added a basic routing system, defining the routes in several Array objects, with a `path` property to define the URL. I imitated the structure of the [yeolyi blog](https://yeolyi.com/post/blog-ssr), but fixed the issue with calling the `lazy` function from the component (I must remember to share my findings with the author). I installed all the `MDX` dependencies and created placeholder files for the content.  
The current file structure is a bit messy. The main issue is that a "story" could need to import subcomponents and putting everything in the same folder is not a good idea. I will have to find a way to organize the files.

> [!IMPORTANT]  
> **I was all wrong!**  
> The `renderToString` API not only prevents us from distinguishing server from client content but also prohibits the use of `Suspense` in the server-rendered content. We must change our approach to use `renderToPipeableStream` instead.

Switching to `renderToPipeableStream` was not as straightforward as I thought. There is a gap between the official React documentation and the examples in the `create-vite-extra` repository, and the "streaming" method makes the templating logic more complex. It's not as easy as just searching and replacing patterns. We need to rethink the way we handle the content and the layout.

Here are some resources that helped me understand the issue:

- [Waiting for all content to load for crawlers and static generation](https://19.react.dev/reference/react-dom/server/renderToPipeableStream#waiting-for-all-content-to-load-for-crawlers-and-static-generation)
- [fixtures/fizz/server/render-to-buffer.js](https://github.com/facebook/react/blob/fe04dbcbc4185d7c9d7afebbe18589d2b681a88c/fixtures/fizz/server/render-to-buffer.js#L21)
- [React Streaming example is different than the React recomendation](https://github.com/bluwy/create-vite-extra/issues/61)
- [React SSR with custom html](https://stackoverflow.com/a/72859191/3908378)

## 2024-10-28 **content generation**

I adapted the `prerender.js` script to import the page list from the app code. The new script, `generate.ts`, uses the `vite-node` package to run the app code in a Node.js environment. This way, we can use dynamic imports for the content.

The new workflow is as follows:

- Run `pnpm run build`.
- A prebuild script cleans the `dist` and `build` folders.
- The build script generates the client and server bundles into the `build` folder.
- A post-build script runs `vite-node generate.ts`:
  - It copies the `public` folder to the `dist` folder.
  - Get a list of all the pages from the app code.
  - Create all the nested folders from the pages list.
  - Generate the content for each page by calling the `build/server/entry-server.js` script.
  - Save the content in the `dist` folder.

In a perfect world, we would run the `generate.ts` script as a post-build Vite plugin to clean the repository. But it seems that I must tweak the TS config to make it work and I'm not sure it's worth the effort.

I'm still wondering about the benefits of using the manifest files as they are not used to generate the content. I guess it's a way to add the preload tags in the HTML template. I will have to investigate this further.

I introduced new Tags into the `index.html` template as "canonical," meta descriptions. I need to include them in the content generation process, plus fix the issue with the `base` property. Until the site is hosted at the root of the domain, the `base` property must adapt to the subfolder where the site is hosted.

## 2024-10-29 **Router and client-side navigation**

I did a quick test with the `react-router-dom` package. At first, I thought it would be a good idea to use the `StaticRouter` for the server-rendered content and the `BrowserRouter` for the client-rendered content. But I ended up with a tone of unnecessary refactoring. I will stick to a minimal pseudo-router and a rip-off of the `bloody-use-url` package for the client-side navigation.  
It's not perfect, but it's good enough for now.

## 2024-11-01 **Media components**

First, we copy-pasted the `picture`/`source`/`img` components from [Apple Music](https://music.apple.com/fr/album/m-sixteen/1128780088), including the medias themselves to create a specific component for band releases called `DiscographyCover`. Later, we will have to decide if the 296/316 variant is worth the effort.

We created a barebone `AssetProps` interface to handle the media data, regardless of the kind (image or video) and add a `PhotoProps` and `VideoProps` interfaces that extend the `AssetProps` interface with the specific properties of each kind of media. They aren't clean yet, I'm doubtful about some "duplicate" properties, but it's a start.

Then, we add a `ImageBase` component to handle any kind of image usage (photo, video poster, etc.). We extend it with a `LazyImage` component that uses the `IntersectionObserver` API to lazy load the images.

We also add the `ReactPlayer` package to handle the video content.

## 2024-11-02 **Content models**

> [!IMPORTANT]  
> I removed the `withLeadingBasePath` function from the `Link` component. It's not the responsibility of the component to handle the base path. We must provide the full and correct URL to the component. So, it's the job of each page definition to generate the correct URL depending on the context.

At this point, I think the correct approach is to see the content schema as a pyramid, with a common base for every entity accessible from an URL, and extending this base with specific properties for each kind of entity (discography, concerts, etc.).

Concerning the `Asset`, it's seems less verbose to centralize them all in a single list, and only reference them in the content by their `publicId`. This way, it will be easier to write scripts to manage files upload or update, or any other kind of batch operation.

to sum up, we have the following content base:

```ts
// pseudo code, WIP

interface Asset {
  publicId: string;
  kind: 'photo' | 'video';
  width: number;
  height: number;
  // ...
}

interface PageMeta {
  title: string;
  description: string;
  src?: Asset['publicId'];
}

interface PageMdx {
  importMdx: () => Promise<typeof import('*.mdx')>;
};

interface Page & PageMeta {
  pageId: string;
  path: string;
  kind: 'release' | 'concert' | 'video' | 'photo';
}

interface Release extends Page & PageMdx {
  kind: 'release';
  cover: Asset['publicId'];
  tracks: string[];
  // ...
}

interface Video extends Page {
  kind: 'video';
  video: Asset['publicId'];
  // ...
}
```

## 2024-12-12 **Notes**

After a long break, I'm back on the project. I'm still struggling with the content model.

Fun fact: The same day I returned to the project, `react@19` and `react-router@7` was released.
I will have to update the project to use the latest and stable versions of `react` and codmods, then look for potential breaking changes.

I'm not sure if I should use `react-router`. The modified `bloody-use-url` package works well despite the massive number of missing features like routes/path helpers.
The major benefit of `react-router@7` is that it delegates the pre-rendering `vite` plugin to the package. But I feel like it's a bit overkill for my needs,
It will force us to adopt the `react-router` way of doing things, and I'm not sure it's worth the effort.

By the way, it was a good opportunity to rethink the code-splitting strategy. The whole website concept is based on unique section layouts. Without a proper code-splitting strategy, the initial loading will be too heavy.
We can't just isolate each section with its dependencies, as it will make assets preloading a complex task to escape the FOUC (Flash Of Unstyled Content) and the FOUT (Flash Of Unstyled Text).

We must identify the critical UI elements like CSS themes, fonts, and other global assets and preload them using link tags in the HTML template.
The JSX part of this critical UI will be included in the initial bundle as a `/routes` component file, with all the async loader and suspense logic.
The non-critical UI elements will be lazy-loaded from a `/pages` component.

Interesting reads:

- [Fix Your Annoying Popups with the CloseWatcher API](https://logaretm.com/blog/fix-your-annoying-popups-with-the-closewatcher-api/) • we may find a better way to manage `TopLayer` component state.
- [How to lazy load YouTube videos with vanilla JavaScript](https://gomakethings.com/how-to-lazy-load-youtube-videos-with-vanilla-javascript/) • an lightweight alternative to the `ReactPlayer` package. [alternative with vimeo included](https://dev.to/madsstoumann/how-to-embed-youtube-and-vimeo-the-light-way-2pek)
- [SPA Lazy Loading Pitfalls](https://reacttraining.com/blog/spa-lazy-loading-pitfalls) • a good reminder of the pitfalls of lazy loading in a SPA context.
- [How <canvas> Saved the Day - Handling Large Images in the Browser](https://dev.to/tomj/how-saved-the-day-handling-large-images-in-the-browser-7e6)

## 2024-12-26 **Quick notes**

Two API responses as inspiration for the image/video content model:

- `https://react-tweet.vercel.app/api/tweet/1847032286476488785`: `video_info`includes aspect ratio as array. The `sizes` object lists the available pressets for the image including the resize method (crop or fit).
- `https://api.fxtwitter.com/status/1847032286476488785`: the `media` object includes well structured data for the image and video content.
