//MAINREDUCER IMPORTA TODOS LOS REDUCER PARA PODER USARLOS. CONTIENE TODA LA INFO DE LOS DEMAS REDUCERS
//REDUCER: MANTIENE EL ESTADO Y CON QUE ACCION LO VAMOS A MODIFICA

//COMBINE-REDUCERS: JUNTA A TODOS LOS REDUCTORES Y LOS GUARDA EN UN SOLO OBJETO
import {combineReducers} from 'redux'
import citiesReducer from '../reducers/citiesReducer';
import userReducer from '../reducers/userReducer'

const mainReducer= combineReducers({
    citiesReducer, userReducer
})
export default mainReducer