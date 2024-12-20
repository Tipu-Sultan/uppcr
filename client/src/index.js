import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import { SnackbarProvider } from 'notistack';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <SnackbarProvider autoHideDuration={2500} maxSnack={3} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <App />
    </SnackbarProvider>,
  </Provider>
  </React.StrictMode>
);

