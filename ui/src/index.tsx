import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss'; // Import global SCSS styles
import './styles/main.scss'; // Import additional SCSS styles if needed
import App from './App';

// Find the root element in the HTML
const rootElement = document.getElementById('root') as HTMLElement | null;
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('Failed to find the root element');
}
