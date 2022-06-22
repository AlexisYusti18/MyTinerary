import axios from 'axios';
const host="http://localhost:4000"

const citiesActions={

    getAllCities:()=>{
        //LA FUNCION RECIBE EL DISPATCH DESDE EL FRONT PORQUE ES UN HOOK. LOS HOOKS NO SE PUEDEN PASAR ACA PORQUE NO ES UN COMPONENTE
        return async ( dispatch)=>{
            //CREO EL AXIOS
            const response = await axios.get(`${host}/api/cities`)
            //HAGO UN DISPATCH DE TIPO CITIES Y A PAYLOAD(EL-DATO) LE PASO LA RUTA DEL OBJETO
            dispatch({ type:"cities", paylaod: response.data.response.cities})
            
            console.log(response.data.response.cities);
        }
    }
}
export default citiesActions