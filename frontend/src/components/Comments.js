import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {useDispatch, useSelector} from 'react-redux';
import commentsActions from "../redux/actions/commentsActions";

export default function Comments({comment, setReload}){
    console.log(comment)
    const dispatch= useDispatch()
    const [modify,setModify]=useState()
    const user=useSelector(store=>store.userReducer.user)
    

    async function modifyComment(id){
        const commentModify={
            commentId:id,
            comment:modify
        }
        await dispatch(commentsActions.modifyComment(commentModify))
        setReload(R=>!R)
    }

    async function deleteComment(id){
        await dispatch(commentsActions.deleteComment(id))
        setReload(R=>!R)
    }

    return(
    <>
        {user.id === comment.userId ?
           <div className="ctn-texto">
                    <img className='img-user' src={user.imageUser} alt='imageUser'/>
                    <p className='nameuser'>{user.name} {user.lastName}</p>
                    <div className="viewText" suppressContentEditableWarning={true} type="text" onInput={(e)=>setModify(e.currentTarget.textContent)} contentEditable >{comment.comment}</div>
                    <div style={{display:'flex'}}>
                        <button onClick={()=>modifyComment(comment._id)} className='tooltip'><EditIcon/></button>
                        <button onClick={()=>deleteComment(comment._id)} className='tooltip'><DeleteForeverIcon/></button>
                    </div>
            </div> : 
                    <div>
                        <p className="viewText">{comment.comment}</p>
                    </div>
            }
    </>
    )
}
// import { useState } from 'react';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
// import {useDispatch, useSelector} from 'react-redux';
// import commentsActions from "../redux/actions/commentsActions";
// import ImageList from '@mui/material/ImageList';
// import ImageListItem from '@mui/material/ImageListItem';

// export default function Comments({comment, setReload}){

//     const dispatch= useDispatch()
//     const [modify,setModify]=useState()
//     const user=useSelector(store=>store.userReducer.user)
    

//     async function modifyComment(id){
//         const commentModify={
//             commentId:id,
//             comment:modify
//         }
//         await dispatch(commentsActions.modifyComment(commentModify))
//         setReload(R=>!R)
//     }

//     async function deleteComment(id){
//         await dispatch(commentsActions.deleteComment(id))
//         setReload(R=>!R)
//     }

//     return(
       
//         <>  
//             {user.id === comment.userId ?
//                 <ImageList className="ctn-texto">
//                     <ImageListItem sx={{ width:'100%', height:'30vh'}} cols={3} rowHeight={100}>
//                     <div>
//                         <p>{user.name} {user.lastName}</p>
//                         <img className='img-user' src={user.imageUser} alt='imageUser'/>
//                     </div>
//                     <div className="viewText" suppressContentEditableWarning={true} type="text" onInput={(e)=>setModify(e.currentTarget.textContent)} contentEditable >{comment.comment}</div>
//                     <div style={{display:'flex'}}>
//                         <button onClick={()=>modifyComment(comment._id)} className='tooltip'><EditIcon/></button>
//                         <button onClick={()=>deleteComment(comment._id)} className='tooltip'><DeleteForeverIcon/></button>
//                     </div>
//                     </ImageListItem>
//                 </ImageList>
//                     : 
//                         <>
//                             <p className="viewText">{comment.comment}</p>
//                         </>
//             }
//         </>
//     )
// }