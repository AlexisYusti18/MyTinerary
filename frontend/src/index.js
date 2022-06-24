import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

//CONFIGURE STORE: UNA FUNCION QUE DEVUELVE UN STORE OBJETO
import {configureStore} from '@reduxjs/toolkit';
//PROVIDER: HACE QUE EL REDUX STORE ESTE DISPONIBLE PARA CUALQUIER COMPONENTE QUE NECEESITE LA STORE
import { Provider } from 'react-redux';
//MAINREDUCER IMPORTA TODOS LOS REDUCER PARA PODER USARLOS. CONTIENE TODA LA INFO DE LOS DEMAS REDUCERS
import mainReducer from '../src/redux/reducers/mainReducers';

//REDUCER: FUNCION QUE RECIBE 2 PARAMETROS EL ESTADO INICIAL Y UNA ACCION
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

