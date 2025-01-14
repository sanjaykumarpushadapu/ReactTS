// src/types/import.meta.hot.ts
declare module 'webpack/hot/dev-server' {
  interface ImportMeta {
    hot?: {
      accept: (callback: () => void) => void;
    };
  }
}
