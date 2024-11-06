import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Header from './components/header';
import Footer from './components/footer';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Header />
    <App />
    <Footer />
  </React.StrictMode>
);

