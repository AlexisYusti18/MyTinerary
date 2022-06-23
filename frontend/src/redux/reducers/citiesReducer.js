//DEFINO EL ESTADO INICIAL
const initialState={
    cities: [],
    filterCities:[],
    oneCity:[]
} 

//COMO PARAMETRO LE LLEGA EL ESTADO INICIAL Y LA ACCION Y DEVUELVE EL MISMO ESTADO
//ACTION: SON OBJETOS QUE CAMBIAN ALGO
const citiesReducer=( state=initialState, action)=>{
    //console.log(state);
    switch (action.type){
        //MEDIANTE UN SWITCH EVALUO EL TIPO DE ACCION QUE LLEGA
        case "GET_CITIES":
        return{
            //LOS 3 PUNTOS SIGNIFICAN QUE ESTA TOMANDO EL ESTADO ACTUAL
            ...state,
            cities: action.payload,
            filterCities: action.payload
            //PAYLOAD: ES EL VALOR DE CARGA=> PUEDE IR CUALQUIER NOMBRE PERO ES BUENA PRACTICA USARLO ASI
        }
        case "ONE_CITY":
            console.log(action.payload);    
        return{
                
                ...state,
                oneCity:action.payload
            }
        case "FILTER_CITIES":
            // DE MI ESTADO TOMA TODAS LAS CIUDADES Y LAS FILTRA
            return{
                ...state,
                filterCities: state.cities.filter(city=>city.name.toLowerCase().startsWith(action.payload.trim().toLowerCase()))
                //ACA USO EL VALUE PERO LO PASO COMO ACTION.PAYLOAD
            }
        default: return state
    }
}
export default citiesReducer