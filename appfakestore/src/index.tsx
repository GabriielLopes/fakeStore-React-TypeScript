import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import store from './store';
import App from './App';

import Header from './components/header';
import Footer from './components/footer';
import { Cart } from './components/cart';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <Header />
      <App />
      <Cart />
      <Footer />
    </React.StrictMode>
  </Provider>,
);
