//DEFINO EL ESTADO INICIAL
const initialState={
    cities: [],
    filter:[]
} 

//COMO PARAMETRO LE LLEGA EL ESTADO INICIAL Y LA ACCION Y DEVUELVE EL MISMO ESTADO
//ACTION: SON OBJETOS QUE CAMBIAN ALGO
const citiesReducer=( state=initialState, action)=>{
    
    switch (action.type){
        //MEDIANTE UN SWITCH EVALUO EL TIPO DE ACCION QUE LLEGA
        case "cities":
        return{
            //LOS 3 PUNTOS SIGNIFICAN QUE ESTA TOMANDO EL ESTADO ACTUAL
            ...state,
            cities: action.paylaod
            //PAYLOAD: ES EL VALOR DE CARGA=> PUEDE IR CUALQUIER NOMBRE PERO ES BUENA PRACTICA USARLO ASI
        }
        // case "filter":
        //     let cityFilter = cities?.filter(city=>city.name.toLowerCase().startsWith(search.trim().toLowerCase()))
        //     return{
        //         ...state,
        //         filterData:cityFilter
        //     }
        
        default: return state
    }
}
export default citiesReducer