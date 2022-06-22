//main reducer importa todos los reducers para poder combinarlos en uno solo
//importo todos los reducers 

//un reducer mantiene los estados y con que accion lo vamos a modificar

import {combineReducers} from 'redux'
import citiesReducer from '../reducers/citiesReducer'
//mainReducer contiene toda la info de los demas reducer
const mainReducer= combineReducers({
    citiesReducer
})
export default mainReducer