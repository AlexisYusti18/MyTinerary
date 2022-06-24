//MAINREDUCER IMPORTA TODOS LOS REDUCER PARA PODER USARLOS. CONTIENE TODA LA INFO DE LOS DEMAS RECUER
//REDUCER: MANTIENE EL ESTADO Y CON QUE ACCION LO VAMOS A MODIFICA

import {combineReducers} from 'redux'
import citiesReducer from '../reducers/citiesReducer';

const mainReducer= combineReducers({
    citiesReducer,

})
export default mainReducer