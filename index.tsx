
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Polyfill process for browser environments to prevent crashes on static hosting
if (typeof window !== 'undefined' && !window.process) {
  (window as any).process = {
    env: {
      API_KEY: ''
    }
  };
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
