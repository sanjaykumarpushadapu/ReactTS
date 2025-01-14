// // configLoader.js
// declare const __ENV__: string;

// let cachedConfig: unknown = null;

// const loadConfig = async () => {
//   if (cachedConfig) return cachedConfig;

//   const env = __ENV__; // `__ENV__` is injected by Webpack at build time
//   try {
//     const response = await fetch(`/config/appSettings.${env}.json`);
//     if (!response.ok) {
//       throw new Error(`Failed to load configuration for ${env}`);
//     }
//     cachedConfig = await response.json();
//     return cachedConfig;
//   } catch (error) {
//     console.error('Error loading configuration:', error);
//     throw error;
//   }
// };

// const getConfigByKey = async (key: string) => {
//   const config = await loadConfig();
//   return (config as { [key: string]: unknown })[key];
// };

// export { loadConfig, getConfigByKey };
