import React, {useState} from "react";

import Collapsible from 'react-collapsible';
import dolar from '../assets/dolar.png'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Comments from '../components/Comments'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import {useDispatch, useSelector} from 'react-redux';
import citiesActions from '../redux/actions/citiesActions'
import Swal from 'sweetalert2'
import commentsActions from "../redux/actions/commentsActions";


export default function Tinerary({itinerary,setReload}){
    const dispatch= useDispatch()
    // const [reload,setReload]=useState(false)
    const [text, setText]=useState('')
    const user=useSelector(store=>store.userReducer.user)


    async function likeOrDislike(idItinerario){
        //console.log(idItinerario)
        await dispatch(citiesActions.likeAndDislike(idItinerario))
        setReload(R=>!R)
    }

    async function addComment(id){
        const data={
            itineraryId:id,
            comments:text
        }
        await dispatch(commentsActions.addComment(data))
        setReload(R=>!R)
        setText("")
    }
    const viewAlert=()=>{
        Swal.fire({
            icon:'error',
            title:'you must log in',
            timer:1500,
        })
    }
    return(
        <>
        <div className="itineraries-card">
                        {console.log(itinerary)}
                            <div className="title-itinerary">
                                <h1 className="title-cards">{itinerary.title}</h1>
                            </div>
                            <div className="likes">
                                {user ?
                                <>
                                <button className="button-like" onClick={()=>likeOrDislike(itinerary._id)}>
                                    {itinerary.likes?.includes(user.id) ?(<div style={{color:'red'}}><FavoriteIcon id={itinerary._id} sx={{cursor:'pointer'}}/></div>) : 
                                    (<div style={{color:'red'}}><FavoriteBorderIcon id={itinerary._id} sx={{cursor:'pointer'}}/></div>)}{itinerary?.likes.length}
                                </button>
                                </>
                                :  (
                                <button className="button-like" onClick={()=>viewAlert()}>
                                    <FavoriteBorderIcon id={itinerary._id} sx={{cursor:'pointer'}}/>
                                    <p>{itinerary?.likes.length}</p>
                                </button>)
                            }
                            </div>
                            <div className="name-image">
                                <p className="title-cards">{itinerary.name}</p>
                                <img src={itinerary.userimage} style={{borderRadius:"100%", height:"6rem"}} alt="img-user"/>
                            </div>
                            <div className="title-price">Price:{Array(itinerary.price).fill().map((index,price)=>(
                                <img key={price} src={dolar} alt='imgDolar' style={{width:'50px'}}/>))}
                            </div>
                            <p className="title-price">Duration: {itinerary.time}hs</p>
                            <div className="tags">
                                <p className="title-price">#{itinerary.tag}  #{itinerary.tag2}  #{itinerary.tag3}</p>
                            </div>
                            <Collapsible  trigger={<KeyboardArrowDownIcon/>} triggerWhenOpen={<ArrowUpwardIcon/>} transitionTime="1000" transitionCloseTime="100" className="view-more">
                                    <ImageList sx={{ width:'100%', height:'30vh'}} cols={3} rowHeight={200} className='sepuede'>
                                    {itinerary.activities?.length > 0 ? itinerary.activities?.map((activity, index)=>(
                                        <ImageListItem key={index} className='editimg'>
                                            <div className="img-activities" style={{background:`url(${activity.image})`, backgroundPosition:'center', backgroundSize:'cover', backgroundRepeat:'no-repeat'}}>
                                                <p className="title-cities-activities">{activity.name}</p>
                                            </div>
                                        </ImageListItem>
                                ))  : 
                                     <div>
                                        <p className="err-activites">There are no activities for this itinerary yet.</p>
                                    </div>}
                                    </ImageList>
                        <div/>
                            
                            <div className="back-comment">
                                    <p style={{color:'white'}}>COMMENTS({itinerary.comments.length})</p>
                                {itinerary?.comments.map((comment)=>
                                    <Comments comment={comment} key={comment._id} setReload={setReload}/>
                                    )}
                                    {user?
                                    <div className="ctn-text-button">
                                        <div className="text-comment" contentEditable onInput={(event)=>setText(event.currentTarget.textContent)}></div>
                                        <button className="button-send" onClick={()=>addComment(itinerary._id)}>comment</button>
                                    </div>
                                            :
                                            <div className="ctn-text-button">
                                                <div contentEditable  className="text-comment" sx={{width:'80%', backgroundColor:'white'}}></div>
                                                <button className="button-send" onClick={()=>viewAlert()}>comment</button>
                                            </div> 
                                    }
                            </div>
                            </Collapsible>
                    </div>
        
        </>
    )
}