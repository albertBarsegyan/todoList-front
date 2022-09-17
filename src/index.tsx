import React from 'react';

import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { Provider as ReduxProvider } from 'react-redux';
import App from './App';

import './styles/index.css';
import { store } from './store';
import PopupProvider from './components/popups/popupProvider';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ReduxProvider store={store}>
        <PopupProvider>
          <App />
        </PopupProvider>
      </ReduxProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
