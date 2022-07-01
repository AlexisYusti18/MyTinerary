import axios from 'axios';
const url="http://localhost:4000"

const userActions={
    signUp:(userData)=>{
        return async(dispatch, getState)=>{
            //console.log(userData);
            const res= await axios.post(`${url}/api/signUp` , {userData})
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
            const user= await axios.post(`${url}/api/logIn`,{logInUser})
            //console.log(res);
            //VERIFICO QUE EL SUCCESS SEA TRUE
            if(user.data.success) {
                //SI ES TRUE, AGARRO EL TOKEN QUE VIENE DESDE EL BACK Y LO MANDO AL LOCALSTORAGE CON EL METODO setItem().
                localStorage.setItem('token', user.data.response.token)
                dispatch({type:'USER', payload: user.data.response.userData})
                dispatch({type:'USERLIST'})
            }
            dispatch({
                type:"MESSAGE" ,
                payload: {
                    //ALERT
                    view: true, //MOSTRAR LA VISTA
                    message:user.data.message, //MUESTRA MENSAJE 
                    success: user.data.success //COLOR DE ALERT VERDE:TRUE, RED:FALSE
            }

            })
        }
    },
    verifyToken:(token)=>{
        return async (dispatch, getState) =>{
            //LLAMO AL HOST DEL BACK Y LE VOY A PASAR EL TOKEN POR HEADERS(CABECERAS). LE VOY A PASAR UN DATO DE TIPO AUTHORIZATION CON EL METODO BREARER(METODO PARA AUTORIZAR GESTIONES DE USUARIO)
            //ANTES DE LA ULTIMA COMILLA VA UN ESPACIO PARA QUE CUANDO SEA RECIBIA EN PASSPORT SE PUEDA IDENTIFICAR QUE CORRESPONDA A ESE METODO
            await axios.get(`${url}/logInToken`, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
                .then(user=>{
                    if(user.data.success) {
                        dispatch({type:'USER', payload:user.data.response})
                        dispatch({type:'USERLIST'})
                        dispatch({

                        })
                    }
                })
        }
    }
    // },
    // signOut :(closeUser)=>{
    //     return async (disptach, getState) =>{
    //         const user= await axios.post(`${url}/api/signOut`, {closeUser})
    //         localStorage.removeItem('token')
    //         dispatch({type:'USER', payload:null})
    //         dispatch({type:'USERLIST'})
    //         return user
    //     }
    // }
}
export default userActions