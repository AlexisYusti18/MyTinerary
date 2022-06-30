import axios from 'axios';
const host="http://localhost:4000"

const userActions={
    signUp:(userData)=>{
        return async(dispatch, getState)=>{
            const res= await axios.post(`${host}/api/signUp` , {userData})
            //console.log(res);
            dispatch({
                type:"MESSAGE" ,
                payload: {
                    //ALERT
                    view: true, //MOSTRAR LA VISTA
                    message:res.data.message, //MUESTRA MENSAJE 
                    success: res.data.success //COLOR DE ALERT VERDE:TRUE, RED:FALSE
            }
        })
        console.log(res.data.message);
    }
    },
    logIn:(logInUser)=>{
        return async (dispatch, getState)=>{
            const res= await axios.post(`${host}/api/logIn` , {logInUser})
            //console.log(res);
            dispatch({
                type:"MESSAGE" ,
                payload: {
                    //ALERT
                    view: true, //MOSTRAR LA VISTA
                    message:res.data.message, //MUESTRA MENSAJE 
                    success: res.data.success //COLOR DE ALERT VERDE:TRUE, RED:FALSE
            }

            })
        }
    }
}
export default userActions