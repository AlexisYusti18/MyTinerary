const initialState={
    alert:{
        view:false, //PARA QUE MUESTRA EL MENSAJE
        message:'', //MENSAJE
        success: false //VA A CAMBIAR EL COLOR DE LA ALERT
    }
}

const usersReducer=(state= initialState, action)=>{
    switch (action.type) {
        
        case 'MESSAGE':
            return {
                ...state,
                alert: action.payload
            }
            default:
                    return state
    }       
}
export default usersReducer