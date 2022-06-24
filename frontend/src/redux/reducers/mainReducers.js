//MAINREDUCER IMPORTA TODOS LOS REDUCER PARA PODER USARLOS. CONTIENE TODA LA INFO DE LOS DEMAS REDUCERS
//REDUCER: MANTIENE EL ESTADO Y CON QUE ACCION LO VAMOS A MODIFICA

//COMBINE-REDUCERS: JUNTA A TODOS LOS REDUCTORES Y LOS ALMACENA EN UN SOLO OBJETO
import {combineReducers} from 'redux'
import citiesReducer from '../reducers/citiesReducer';

const mainReducer= combineReducers({
    citiesReducer,

})
export default mainReducer