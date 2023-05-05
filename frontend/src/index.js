import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';     // provider will provide state to component
import {store} from './store'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <BrowserRouter>   {/*to use redux wrap whole app.js inside redux */}
    <Provider store={store}>        {/* provider component don't know to which state to implment so add store={} prop */}
    <App />
    </Provider>
    </BrowserRouter>
  // </React.StrictMode>
);

