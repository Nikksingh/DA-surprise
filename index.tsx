
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

// Note: index.html currently contains the integrated logic for compatibility with static host deployment.
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}
