import axios from 'axios';
const url="http://localhost:4000"

const citiesActions={

    getAllCities:()=>{
        //LA FUNCION RECIBE EL DISPATCH DESDE EL FRONT PORQUE ES UN HOOK. LOS HOOKS NO SE PUEDEN PASAR ACA PORQUE NO ES UN COMPONENTE
        return async ( dispatch, getState)=>{
            //CREO EL AXIOS- ESPERO Y OBTENGO LA API HACIENDO UNA LLAMADA ASINCRONA MEDIANTE UNA FUNCION ANONIMA
            const response = await axios.get(`${url}/api/cities`)
            //HAGO UN DISPATCH DE TIPO CITIES Y A PAYLOAD HACE LA CARGA DE DATA DE LA API
            dispatch({ type:"GET_CITIES", payload: response.data.response.cities})
            //console.log(response.data.response.cities);
        }
    },
    getOneCity:(id)=>{
        return async (dispatch, getState)=>{
            const response= await axios.get(`${url}/api/cities/${id}`)
            //console.log(response);
            //DISPATCH: HERRAMIENTA DE ENVIO DE DATOS HACIA LOS REDUCER O HACIA LAS ACTIONS
            dispatch({type:"ONE_CITY", payload: response.data.response})
        }
    },
    //VALUE PARAMETRO DE REFERENCIA PARA LUEGO USARLO EN EL FILTRO DE REDUCER
    filterCities:(value)=>{
        return(dispatch, getState)=>{
            dispatch({type:"FILTER_CITIES", payload:value})
        }
    }
}
export default citiesActions