const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const chalk = require('chalk'); // Importing chalk for styled console output
const TerserPlugin = require('terser-webpack-plugin'); // Plugin for JS minification in production
const WebpackBar = require('webpackbar'); // show a progress bar during the build process
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //  CSS into separate files for production
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin'); // show error overlays in development mode
const CompressionPlugin = require('compression-webpack-plugin'); // Plugin for compressing assets using Brotli and Gzip
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer'); // analyze the final bundle size
const CopyWebpackPlugin = require('copy-webpack-plugin'); // copy static files (e.g., configuration files)
const { DefinePlugin } = require('webpack'); // define global constants (like environment variables)
module.exports = (env, argv) => {
   // Determine if the environment is 'development' or 'production'
   const isDevelopment = argv.mode === 'development';
   const envName = isDevelopment ? 'Development' : 'Production';
    console.log(`Building for ${envName}...`);
    try {
      const fileNaming = isDevelopment
        ? '[name].js' // In development, we use simple names
        : '[name].[contenthash].js'; // In production, use content hashing for cache-busting
        return {
          entry: './src/index.tsx',
          resolve: {
            extensions: ['.ts', '.tsx', '.js'],
            fallback: {
              querystring: require.resolve('querystring-es3'),
            },
          },
          output: {
            // Output configuration for compiled files
        path: path.resolve(__dirname, 'dist'), // Path to the output directory
        filename: fileNaming, // File name pattern for the main JS bundle
        chunkFilename: isDevelopment ? '[id].js' : '[id].[contenthash].js', // Chunk naming
        clean: true, // Automatically clean the output directory before every buil

          },
          infrastructureLogging: {
            level: 'warn', // Log only warnings and errors to reduce output noise
          },
           optimization: {
                  // Optimize chunks and apply various build enhancements
                  splitChunks: {
                    chunks: 'all', // Split all chunks (including node_modules)
                    maxInitialRequests: 5, // Allow up to 5 initial requests for parallel loading
                    minSize: 30000, // Split chunks if they're greater than 30KB
                    maxSize: 200000, // Split chunks if they're larger than 200KB
                    cacheGroups: {
                      vendor: {
                        // Separate third-party libraries into a 'vendors' chunk
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                        priority: -20, // Give this group lower priority to favor other groups
                      },
                      common: {
                        // Separate common modules used by multiple files into a 'common' chunk
                        test: /[\\/]src[\\/].+\.jsx?$/,
                        name: 'common',
                        chunks: 'all',
                        minChunks: 2, // Only include modules that appear at least twice
                        enforce: true, // Always enforce this rule
                      },
                    },
                  },
                  minimizer: [
                    // Minimize JavaScript files for production
                    new TerserPlugin({
                      parallel: true, // Enable parallel processing for faster builds
                      terserOptions: {
                        compress: {
                          drop_console: true, // Remove console logs for production
                          drop_debugger: true, // Remove debugger statements for production
                          unused: true, // Remove unused code
                        },
                        output: {
                          comments: false, // Remove comments from the output
                        },
                      },
                    }),
                  ],
                },
          devtool: isDevelopment ? 'inline-source-map' : 'source-map', // Enable sourcemaps in development
          module: {
            rules: [
              {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
              },
              {
                test: /\.module\.css$/,
                use: [
                  'style-loader',
                  {
                    loader: 'css-loader',
                    options: {
                      modules: true
                    }
                  }
                ],
                exclude: /node_modules/
              },
              {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                exclude: /\.module\.css$/
              }
            ]
          },
          plugins: [
            new HtmlWebpackPlugin({
              template: './public/index.html'
            }),
             isDevelopment && new ErrorOverlayPlugin(), // Show error overlay in development
             !isDevelopment &&
                      new WebpackBar({
                        name: 'Building',
                        color: 'green',
                        profile: false,
                        clear: true,
                      }),
                          // Extract CSS into separate files in production
                              new MiniCssExtractPlugin({
                                filename: fileNaming.replace('.js', '.css'),
                                chunkFilename: fileNaming.replace('.js', '.css'),
                              }),
                              // Enable Brotli and Gzip compression for assets in production
                                      !isDevelopment &&
                                        new CompressionPlugin({
                                          test: /\.(js|css|html|svg)$/,
                                          algorithm: 'brotliCompress',
                                          filename: '[path][base].br',
                                        }),
                                      !isDevelopment &&
                                        new CompressionPlugin({
                                          test: /\.(js|css|html|svg)$/,
                                          algorithm: 'gzip',
                                          filename: '[path][base].gz',
                                        }),
                                          // Bundle analysis in production to optimize code splitting
                                                !isDevelopment &&
                                                  new BundleAnalyzerPlugin({
                                                    analyzerMode: 'static', // Generates a static HTML report
                                                    reportFilename: 'report.html', // Path for the report
                                                    statsFilename: 'stats.json', // Path for the stats file
                                                    openAnalyzer: false, // Don't automatically open the analyzer in the browser
                                                    generateStatsFile: true, // Generate stats.json file
                                                    logLevel: 'silent', // Set the log level to silent to suppress all output
                                                  }),
                                                   // Copy configuration files to the dist folder
                                                          new CopyWebpackPlugin({
                                                            patterns: [{ from: 'public/config', to: 'config' }],
                                                          }),
                                                              // Define global variables for environment-specific logic
        new DefinePlugin({
          __ENV__: JSON.stringify(envName), // Inject dynamic environment value
        })
      ].filter(Boolean),
          
          devServer: {
            static: {
              directory: path.join(__dirname, 'dist')
            },
            compress: true,
            port: 9000,
            host: 'localhost', // Explicitly set the host to 'localhost' to prevent exposure to the network
            open: true, // Open the browser automatically
            historyApiFallback: true, // Enable single-page application (SPA) routing support
            onListening: (devServer) => {
              const protocol =
                          devServer.options.server.type === 'https' ? 'https' : 'http';
                        const { host, port } = devServer.options;
                        console.log(
                          chalk.green(`Server is listening on ${protocol}://${host}:${port}`)
                        );
            }, // Hook for additional actions after the server starts
            client: {
              logging: 'warn', // Log warnings and errors in the client
              overlay: {
                warnings: true,
                errors: true, // Display errors in the overlay, but hide warnings
              },
            },
            devMiddleware: {
              stats: 'errors-warnings', // Display errors and warnings only in development mode
            },
          },
          
          stats: {
            preset: 'minimal', // Use the 'minimal' preset for build stats
            assets: false, // Show asset details in the build output
            timings: true, // Show build timings for performance analysis
            errors: true, // Show build errors
            warnings: true, // Show build warnings
            colors: true, // Enable colored output for better readability
            modules: false, // Hide module details in the build output,
            performance: true, // Show performance hints in the build output
          },
          };
    } catch (error) {
      console.error(chalk.red(`ERROR: ${err.message}`));
      if (err.details) {
        console.error(chalk.red(`Details: ${err.details}`));
      }
      if (err.stack) {
        console.error(chalk.red(`Stack: ${err.stack}`));
      }
  
    }
};