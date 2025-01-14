// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from react-dom/client in React 18
import './index.scss'; // If you have a global CSS file
import App from './App';
import { Provider } from 'react-redux';
import store from './store/store';

const rootElement = document.getElementById('root') as HTMLElement;

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement); // Create the root for React 18
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
} else {
  console.error('Root element not found!');
}
