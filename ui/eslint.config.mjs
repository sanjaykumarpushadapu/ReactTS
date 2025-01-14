import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks'; // For React Hooks rules
import pluginPrettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import pluginTypeScript from '@typescript-eslint/eslint-plugin'; // TypeScript plugin
import tsParser from '@typescript-eslint/parser'; // TypeScript parser

export default [
  {
    ignores: ['dist/**', 'node_modules/**'], // Exclude dist and node_modules from linting
  },
  {
    files: ['webpack.config.js', 'scripts/**/*.js', 'Plugin/*.js'], // Lint specific JavaScript files
    languageOptions: {
      globals: globals.node, // Enable Node.js globals
      sourceType: 'script',
    },
  },
  {
    files: ['src/**/*.{js,mjs,cjs,jsx}'], // Lint JavaScript files in src folder
    languageOptions: {
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // Enable JSX parsing
        },
      },
      globals: {
        __ENV__: 'readonly', // Define __ENV__ as a global variable
      },
    },
  },
  {
    files: ['src/**/*.{ts,tsx}'], // Lint TypeScript files
    languageOptions: {
      parser: tsParser, // Use TypeScript parser
      parserOptions: {
        ecmaVersion: 2020, // Support modern JavaScript features
        sourceType: 'module', // Use ES Modules
        ecmaFeatures: {
          jsx: true, // Enable JSX parsing for TSX
        },
      },
      globals: globals.browser,
    },
    plugins: {
      '@typescript-eslint': pluginTypeScript,
      'react-hooks': pluginReactHooks, // React Hooks plugin
    },
    rules: {
      ...pluginTypeScript.configs.recommended.rules, // Use TypeScript recommended rules

      // React Hooks rules for TypeScript
      'react-hooks/rules-of-hooks': 'error', // Enforce the Rules of Hooks
      'react-hooks/exhaustive-deps': 'warn', // Warn about missing dependencies in useEffect

      // Example additional TypeScript rules:
      '@typescript-eslint/no-unused-vars': 'error', // Disallow unused variables
      '@typescript-eslint/no-explicit-any': 'warn', // Warn against 'any' usage
      '@typescript-eslint/explicit-function-return-type': 'off', // Enforce return types for functions
    },
  },
  pluginJs.configs.recommended, // JavaScript recommended rules
  pluginReact.configs.flat.recommended, // React recommended rules
  {
    plugins: {
      react: pluginReact,
      'react-hooks': pluginReactHooks, // Add React Hooks plugin
      prettier: pluginPrettier,
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect the React version
      },
    },
    rules: {
      // Prettier rules
      'prettier/prettier': 'error', // Flag Prettier formatting issues as errors

      // React-specific rules
      'react/jsx-uses-vars': 'error', // Prevent unused variables in JSX
      'no-unused-vars': ['error', { varsIgnorePattern: '^React$' }], // Ignore React in unused vars
      // React Hooks rules
      'react-hooks/rules-of-hooks': 'error', // Enforce rules of hooks
      'react-hooks/exhaustive-deps': 'warn', // Warn about missing dependencies in useEffect
      'react/prop-types': 'error', // Enforce the use of PropTypes

      // Example additional rules
      quotes: 0,
      'no-debugger': 1,
      semi: [1, 'always'],
      'no-trailing-spaces': 0,
      'eol-last': 0,
      'no-underscore-dangle': 0,
      'no-alert': 0,
      'no-lone-blocks': 0,
      'jsx-quotes': 1,
      'react/jsx-boolean-value': 1,
      'react/jsx-closing-bracket-location': 0,
      'react/jsx-curly-spacing': 1,
      'react/jsx-key': 1,
      'react/jsx-max-props-per-line': 0,
      'react/jsx-no-bind': 0,
      'react/jsx-no-duplicate-props': 1,
      'react/jsx-no-literals': 0,
      'react/jsx-no-undef': 1,
      'react/jsx-pascal-case': 1,
      'react/jsx-sort-prop-types': 0,
      'react/jsx-sort-props': 0,
      'react/no-danger': 1,
      'react/no-did-mount-set-state': 1,
      'react/no-did-update-set-state': 1,
      'react/no-direct-mutation-state': 1,
      'react/no-multi-comp': 1,
      'react/no-set-state': 1,
      'react/no-unknown-property': 1,
      'react/prefer-es6-class': 1,
      'react/self-closing-comp': 1,
      'react/sort-comp': 1,
    },
  },
  prettierConfig, // Add Prettier configuration to ESLint
];
