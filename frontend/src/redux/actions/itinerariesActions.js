import axios from 'axios';
const host="http://localhost:4000"

const itinerariesActions={
    getItineraries:()=>{
        return async(dispatch, getState)=>{
            const info= await axios.get(`${host}/api/itineraries`)
            //console.log(info.data.response.itinerarys);
            dispatch({type:"GET_ITINERARIES", payload: info.data.response.itinerarys})
        }
    }
}
export default itinerariesActions