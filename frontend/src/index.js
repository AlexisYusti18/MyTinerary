import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';


import {configureStore} from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import mainReducer from '../src/redux/reducers/mainReducers';

const reduxStore= configureStore({reducer: mainReducer})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={reduxStore}>
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

