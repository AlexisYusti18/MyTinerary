import axios from 'axios';
const url="http://localhost:4000"

const userActions={
    signUp:(userData)=>{
        return async(dispatch, getState)=>{
            //console.log(userData);
            const user= await axios.post(`${url}/api/signUp` , {userData})
            //console.log(res);
            dispatch({
                type:"MESSAGE" ,
                payload: {
                    //ALERT
                    view:true,
                    message:user.data.message, 
                    success:user.data.success
            }
        })
        //console.log(user.data.message);
        }
    },
    logIn:(logInUser)=>{
        return async (dispatch, getState)=>{
            const user= await axios.post(`${url}/api/logIn`,{logInUser})
            //console.log(user);
            //console.log(user.data.response.userData);
            //console.log(user.data.response.token);
            if(user.data.success) {
                localStorage.setItem('token', user.data.response.token)
                dispatch({type:'USER', payload: user.data.response.userData})
            } else{
                dispatch({
                    type:"MESSAGE" ,
                    payload: {
                        //ALERT
                        view:true, //MOSTRAR LA VISTA
                        message:user.data.message, //MUESTRA MENSAJE 
                        success:user.data.success //COLOR DE ALERT
                }
                
            })
        }
        //console.log(user.data.message);
        }
    },
    logOut:(closeUser)=>{
        return async(dispatch, getState)=>{
            const user= await axios.post(`${url}/api/logOut`,{closeUser})
            localStorage.removeItem('token')
            dispatch({type:'USER', payload:null})
            return user
        }
    },
    verifyToken:(token)=>{
        //console.log(token);
        return async (dispatch, getState) =>{
            await axios.get(`${url}/api/logInToken`, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
                .then(user=>{
                    //console.log(user);
                    if(user.data.success) {
                        dispatch({type:'USER', payload:user.data.response})
                        //console.log(user.data.response);
                        dispatch({
                            type:'MESSAGE',
                            payload:{
                                view:true,
                                message:user.data.message, //MUESTRA MENSAJE 
                                success:user.data.success
                            }
                        })
                    } 
                        else{
                            localStorage.removeItem('token')
                        }
                }).catch(error=>{
                    //console.log(error);
                    if(error.status === 401){
                        dispatch({
                            type:'MESSAGE',
                            payload:{
                                view:true,
                                message:"Please do your login again" ,//Por favor realiza nuevamente tu logIn
                                success:false
                            }
                        })
                        localStorage.removeItem('token')
                    }
                    
                })
        }
    }
}
export default userActions