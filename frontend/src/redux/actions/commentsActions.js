import axios from 'axios'
const url="http://localhost:4000"

const commentsActions={
    
    addComment:(data)=>{
        const token= localStorage.getItem('token')
        //console.log(token)
        return async(dispatch, getState)=>{
            if(data.comment !== "") {
                const res= await axios.post(`${url}/api/comment`, {data},{
                    headers:{
                        'Authorization':'Bearer '+token
                    }
                })
                dispatch({
                    type:'MESSAGE',
                    payload:{
                        view:true,
                        message: res.data.message,
                        success:res.data.success
                    }
                })
                return res
            } else{
                dispatch({
                    type:'MESSAGE',
                    payload:{
                        view:true,
                        message:'Enter a comment before sending'
                    }
                })
            }
        }
    },
    modifyComment: (commentModify)=>{
        //console.log(commentModify)
        const token= localStorage.getItem('token')
        return async (dispatch, getState)=>{
            const res= await axios.put(`${url}/api/comment`, {commentModify}, {
                headers:{
                    'Authorization':'Bearer '+token
                }
            })
            dispatch({
                type:'MESSAGE',
                payload:{
                    view:true,
                    message:res.data.message,
                    success:res.data.success
                }
            })
            return res
        }
    },
    deleteComment:(id)=>{
        const token= localStorage.getItem('token')
        
        return async(dispatch, getState)=>{
            const res= await axios.post(`${url}/api/comment/${id}`, {}, {
                headers:{
                    'Authorization':'Bearer '+token
                }
            })
            dispatch({
                type:'MESSAGE',
                payload:{
                    view:true,
                    message:res.data.message,
                    success:res.data.success
                }
            })
        }
    }
}
export default commentsActions