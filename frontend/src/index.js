import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import {configureStore} from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import mainReducer from '../src/redux/reducers/mainReducers';

// creo un store, a traves del metodo createStore le paso mainreducer que es el que contiene todos los reducer y le digo que va hacer uso de applyMiddleware y el middleware que va a utilizar es thunk(thunk permite almacenar funciones y ejecutarlas de manera asincrona)
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

//provider va a permitir a cada componente hacer el uso del store

