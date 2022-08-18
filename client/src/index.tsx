import React from 'react';
import ReactDOM from 'react-dom/client';
import Context from './Context';
import App from './components/App';

const app = document.getElementById('app')!;
const root = ReactDOM.createRoot(app);

root.render(
  <Context>
    <App />
  </Context>,
);
