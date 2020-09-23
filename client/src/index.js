import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import MaintenancePage from './components/pages/MaintenancePage';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import './index.css';

const underMaintenance = process?.env?.REACT_APP_MAINTENANCE?.toLowerCase() === 'true';

const toRender = underMaintenance ? (
  <MaintenancePage />
) : (
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.render(
  toRender,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
