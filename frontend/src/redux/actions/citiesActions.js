import axios from 'axios';
const url="http://localhost:4000"

const citiesActions={

    getAllCities:()=>{
        return async ( dispatch, getState)=>{
            const response = await axios.get(`${url}/api/cities`)
            dispatch({ type:"GET_CITIES", payload: response.data.response.cities})
            //console.log(response.data.response.cities);
        }
    },
    getOneCity:(id)=>{
        return async (dispatch, getState)=>{
            const response= await axios.get(`${url}/api/cities/${id}`)
            //console.log(response);
            dispatch({type:"ONE_CITY", payload: response.data.response})
        }
    },
   
    filterCities:(value)=>{
        return(dispatch, getState)=>{
            dispatch({type:"FILTER_CITIES", payload:value})
        }
    },
    //RECIBE COMO PARAMETRO EL ID DEL ITINERARIO
     likeAndDislike:(id)=>{
        //console.log(id)
        const token= localStorage.getItem('token')
        //console.log(token);
        return async()=>{
            try{
                let res= await axios.put(`${url}/api/likes/${id}`, {},
                // let res= await axios.put(url+'/api/likes/'+ id, {},
                {
                    headers:{
                        'Authorization':'Bearer '+token
                    }
                })
                //console.log(res)
                return res

            }catch(error){
                console.log(error)
            }
        }
    },
}
export default citiesActions