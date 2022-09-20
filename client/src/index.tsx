import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GlobalStyle } from './components/styles/GlobalStyles';
import './index.css';

const app = document.getElementById('app')!;
const root = ReactDOM.createRoot(app);

root.render(
  <>
    <GlobalStyle />
    <App />
  </>,
);
