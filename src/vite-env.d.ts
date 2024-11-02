/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_CANONICAL: string;
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_DESCRIPTION: string;
  readonly VITE_CLOUDINARY_NAME: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.mdx' {
  let MDXComponent: (props: Record<string, unknown>) => JSX.Element;
  export default MDXComponent;
}
