import axios from 'axios'
const url="http://localhost:4000"

const itinerariesActions ={
    getItineraries:()=>{
        return async(dispatch, getState)=>{
            const res= await axios.get(`${url}/api/itineraries`)
            //console.log(res.data.response.itinerarys);
            dispatch({type:"GET_ITINERARIES", payload:res.data.response.itinerarys})
        }
    },
    
    getItinerariesByCityId:(id)=>{
        return async (dispatch, getState)=>{
            const res= await axios.get(`${url}/api/itineraries`)
            console.log(res.data.response.itinerarys);
            dispatch({type:"ITINERARIESBYCITY", payload:res.data.response.itinerarys})
        }
    }
}
export default itinerariesActions