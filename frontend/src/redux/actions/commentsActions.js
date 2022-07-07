import axios from 'axios'
const url="http://localhost:4000"

const commentsActions={
    
    addComment:(comment)=>{
        const token= localStorage.getItem('token')

        return async(dispatch, getState)=>{
            //SI EL COMENTARIO NO ESTA VACIO=> QUE EL CAPO A CARGAR TENGA ALGO
            if(comment.comment !== '') {
                //SI COMMENT NO ESTA VACIO, SE HACE EL PEDIDO LA RUTA
                const res= await axios.post(`${url}/api/comment`, {comment},{
                    headers:{
                        'Authorization':'Bearer '+token
                    }
                })
                console.log(res)
                dispatch({
                    type:'MESSAGE',
                    payload:{
                        view:true,
                        message: res,
                        success:res
                    }
                })
                return res
            } else{
                dispatch({
                    type:'MESSAGE',
                    payload:{
                        view:true,
                        message:'Enter a comment before sending'//Ingresa un comentario antes de enviar
                    }
                })
            }
        }
    },
    modifyComment: (comment)=>{
        const token= localStorage.getItem('token')
        return async (dispatch, getState)=>{
            const res= await axios.put(`${url}/api/comment`, {comment}, {
                headers:{
                    'Authorization':'Bearer '+token
                }
            })
            dispatch({
                type:'MESSAGE',
                payload:{
                    view:true,
                    message:res,
                    success:res
                }
            })
            return res
        }
    },
    deleteComment:(id)=>{
        const token= localStorage.getItem('token')
        
        return async(dispatch, getState)=>{
            const res= await axios.post(`${url}/comment/${id}`, {}, {
                headers:{
                    'Authorization':'Bearer '+token
                }
            })
            dispatch({
                type:'MESSAGE',
                payload:{
                    view:true,
                    message:res,
                    success:res
                }
            })
        }
    }
}
export default commentsActions