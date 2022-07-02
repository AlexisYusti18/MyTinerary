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
                    view:true, //MOSTRAR LA VISTA
                    message:user.data.message, //MUESTRA MENSAJE 
                    success:user.data.success //COLOR DE ALERT VERDE:TRUE, RED:FALSE
            }
        })
        console.log(user.data.message);
        }
    },
    logIn:(logInUser)=>{
        return async (dispatch, getState)=>{
            const user= await axios.post(`${url}/api/logIn`,{logInUser})
            //console.log(user.data.response.userData);
            //console.log(user.data.response.token);
            //VERIFICO QUE EL SUCCESS SEA TRUE
            if(user.data.success) {
                //SI ES TRUE, AGARRO EL TOKEN QUE VIENE DESDE EL BACK Y LO MANDO AL LOCALSTORAGE CON EL METODO setItem().
                localStorage.setItem('token', user.data.response.token)
                dispatch({type:'USER', payload: user.data.response.userData})
                //dispatch({type:'USERLIST'})
            } else{
                dispatch({
                    type:"MESSAGE" ,
                    payload: {
                        //ALERT
                        view:true, //MOSTRAR LA VISTA
                        message:user.data.message, //MUESTRA MENSAJE 
                        success:user.data.success //COLOR DE ALERT VERDE:TRUE, RED:FALSE
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
    //POR AHORA LO USAMOS EN CASO DE QUE SE REFRESCA LA PAGINA, EN EL PRIMER LOG IN NO PASO POR LA VERIFICACION
    verifyToken:(token)=>{
        return async (dispatch, getState) =>{
            //LLAMO AL HOST DEL BACK Y LE VOY A PASAR EL TOKEN POR HEADERS(CABECERAS). LE VOY A PASAR UN DATO DE TIPO AUTHORIZATION CON EL METODO BEARER(METODO PARA AUTORIZAR GESTIONES DE USUARIO, METODO DE HTTP)
            //ANTES DE LA ULTIMA COMILLA VA UN ESPACIO PARA QUE CUANDO SEA RECIBIA EN PASSPORT SE PUEDA IDENTIFICAR QUE CORRESPONDA A ESE METODO
            await axios.get(`${url}/api/logInToken`, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
                .then(user=>{
                    if(user.data.success) {
                        //SI LA RESPUESTA ES SUCCES HACE EL DISPTACH CON LOS DATOS DEL USUARIO Y EL MENSAJE 
                        dispatch({type:'USER', payload:user.data.response})
                        //dispatch({type:'USERLIST'})
                        dispatch({
                            type:'MESSAGE',
                            payload:{
                                view:true,
                                message:user.data.message, //MUESTRA MENSAJE 
                                success:user.data.success
                            }
                        })
                    } //Y SINO ES SUCCES VA A BORRAR EL TOKEN PORQUE NO PASO POR PASSPORT
                        else{
                            localStorage.removeItem('token')
                        }
                }).catch(error=>{
                    //console.log(error);
                    //AL CACHEAR EL ERROR ESTABLESCO UN CONDICIONAL Y ME FIJO EL STATUS DEL ERROR, SI ES 401 SIGNIFICA QUE EL TOKEN ESTABA PERO NO ERA CORRECTO ENTONCES DOY UN MENSAJE Y ELIMINO EL TOKEN
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