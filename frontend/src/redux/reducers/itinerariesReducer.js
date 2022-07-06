const initialState={
    itineraries:[],
    itineraryByCity:[]
}

const itinerariesReducer=(state=initialState, action)=>{
    switch (action.type){
        case "GET_ITINERARIES":
            return {
                ...state,
                itineraries: action.payload
            }
            
        case "ITINERARIESBYCITY":
            return {
                ...state,
                itineraryByCity: action.payload
            }
            default: return state
    }
}
export default itinerariesReducer