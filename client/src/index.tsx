import React from 'react';
import ReactDOM from 'react-dom/client';
import Context from './Context';
import App from './components/App';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { GlobalStyle } from './components/styles/GlobalStyles';

const app = document.getElementById('app')!;
const root = ReactDOM.createRoot(app);

root.render(
  <Context>
    <GlobalStyle whiteColor />
    <App />
  </Context>,
);
