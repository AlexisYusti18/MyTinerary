import React, {useEffect,useState} from "react";
import { useParams } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import citiesActions from '../redux/actions/citiesActions'
import { Link as LinkRouter } from "react-router-dom";
import InterpreterModeIcon from '@mui/icons-material/InterpreterMode';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import Collapsible from 'react-collapsible';
import ErrorSearch from './ErrorSearch';
import dolar from '../assets/dolar.png'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import commentsActions from "../redux/actions/commentsActions";
import Swal from 'sweetalert2'
import { TextField } from "@mui/material";

function CitiesDetails(){
    const {id}= useParams()
    const dispatch= useDispatch()
    
    const [reload,setReload]=useState(false)
    const [text, setText]=useState('')
    const [modify,setModify]=useState()

    const user=useSelector(store=>store.userReducer.user)


    useEffect(()=>{
        dispatch(citiesActions.getOneCity(id))

        //eslint-disable-next-line
    },[reload])
    const city=useSelector(store=> store.citiesReducer.oneCity)
    //console.log(city)

    const viewAlert=()=>{
        Swal.fire({
            icon:'error',
            title:'You must be logged in to comment',
            timer:1500
        })
    }

    async function likeOrDislike(idItinerario){
        //console.log(idItinerario)
        await dispatch(citiesActions.likeAndDislike(idItinerario))
        setReload(!reload)
    }

    async function addComment(id){
        const data={
            itineraryId:id,
            comments:text
        }
        await dispatch(commentsActions.addComment(data))
        setReload(!reload)
        setText("")
    }
    
    async function modifyComment(id){
        const commentModify={
            commentId:id,
            comment:modify
        }
        await dispatch(commentsActions.modifyComment(commentModify))
        setReload(!reload)
    }

    async function deleteComment(id){
        await dispatch(commentsActions.deleteComment(id))
        setReload(!reload)
    }
    

    return(
    <>
        <div className="ctn-details">
            <div className="details-description">
                    <div>
                        <div className='img-card-details' style={{background: `url(${city.image})`}}>
                                <h1 className="title-city-details">{city.name} , {city.country}</h1>
                        </div>
                        <div className="datos-cities">
                            <img className="flag" src={city.imagebanner} alt="flag"/>
                            <div>
                                <LocalAtmIcon sx={{color:'white' , fontSize:'60px'}}/>
                                <p style={{color:'white'}}>{city.currency}</p>
                            </div>
                            <div>
                                <InterpreterModeIcon  sx={{color:'white', fontSize:'60px'}} />
                                <p style={{color:'white'}}>{city.language}</p>
                            </div>
                        </div>
                    </div>
            </div>
            <div className="itineraries-ctn">
                {city.itineraries?.length > 0 ?  city.itineraries?.map((itinerary,index)=>
                    <div key={index} className="itineraries-card">
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
                            <p className="title-cards">Duration: {itinerary.time}hs</p>
                            <div className="tags">
                                <p className="title-cards">#{itinerary.tag}  #{itinerary.tag2}  #{itinerary.tag3}</p>
                            </div>
                            <Collapsible  trigger={<KeyboardArrowDownIcon/>} triggerWhenOpen={<ArrowUpwardIcon/>} transitionTime="1000" transitionCloseTime="100" className="view-more">
                                    <ImageList sx={{ width:'100%', height:'30vh'}} cols={3} rowHeight={200}>
                                    {itinerary.activities?.map((activity, index)=>(
                                        <ImageListItem key={index}>
                                            <div className="img-activities" style={{background:`url(${activity.image})`, backgroundPosition:'center', backgroundSize:'cover', backgroundRepeat:'no-repeat'}}>
                                                <p className="title-cities-activities">{activity.name}</p>
                                            </div>
                                        </ImageListItem>
                                                                                     
                                    ))}
                                    </ImageList>
                                <p style={{color:'yellow'}}>COMMENTS({itinerary.comments.length})</p>
                            <div style={{minHeight:'20vw'}}>
                            {itinerary?.comments.map((comment,index)=>
                                    <div key={index} className="ctn-texto">  
                                       {/* <div>
                                            <p>{comment.comment}</p>
                                        </div> */}
                                        {user ?
                                            <div className="ctn-texto">
                                                <p>User:{user.name}</p>
                                                {/* <img style={{width:'10vw',borderRadius:'50%'}}  src={user.imageUser} alt="imgUser"/> */}
                                                <div style={{backgroundColor:'white', color:'red'}} suppressContentEditableWarning={true} type="text" onInput={(e)=>setModify(e.currentTarget.textContent)} contentEditable >{comment.comment}</div>
                                                <button onClick={()=>modifyComment(comment._id)} className='tooltip'><EditIcon/></button>
                                                <button onClick={()=>deleteComment(comment._id)} className='tooltip'><DeleteForeverIcon/></button>
                                            </div>
                                        
                                            : 
                                            <>
                                                
                                                <p>{comment.comment}</p>
                                            </>
                                    }
                                    </div>
                                    )}
                                    {user?
                                    <div>
                                        <div className="text-comment" contentEditable placeholder='send comment' onInput={(event)=>setText(event.currentTarget.textContent)}></div>
                                        <button className="button-send" onClick={()=>addComment(itinerary._id)}>Send</button>
                                    </div>
                                            :
                                     
                                            <div className="button-textfield">
                                            <TextField sx={{width:'80%', backgroundColor:'white'}}></TextField>
                                            <button className="button-send" onClick={()=>viewAlert()}>comment</button>
                                        </div> 
                                       

                                    }
                            </div>
                                {/* {itinerary?.comments.map((comment,index)=>
                                    <div key={index}>  
                                        {user ?
                                            <div>
                                                <p>{user.name}</p>
                                                <img style={{width:'10vw',borderRadius:'50%'}}  src={user.imageUser} alt="imgUser"/>
                                                <div style={{color:'white'}} suppressContentEditableWarning={true} type="text" onInput={(e)=>setModify(e.currentTarget.textContent)} contentEditable >{comment.comment}</div>
                                                <button onClick={()=>modifyComment(comment._id)} className='tooltip'><EditIcon/></button>
                                                <button onClick={()=>deleteComment(comment._id)} className='tooltip'><DeleteForeverIcon/></button>
                                            </div>
                                        
                                            : 

                                            <>
                                                <p>{comment.comment}</p>
                                            </>
                                    }
                                    </div>
                                    )}
                                    {user?
                                    <div className="button-textfield">
                                        <TextField onInput={(event)=>setText(event.currentTarget.textContent)} className="text-comment" contentEditable sx={{width:'80%', backgroundColor:'white'}}></TextField>
                                        <button className="button-send" onClick={()=>addComment(itinerary._id)}>comment</button>
                                    </div>
                                        : 
                                        <div className="button-textfield">
                                            <TextField sx={{width:'80%', backgroundColor:'white'}}></TextField>
                                            <button className="button-send" onClick={()=>viewAlert()}>comment</button>
                                        </div>
                                }
                            </div> */}
                            </Collapsible>
                    </div>
                        ) :(<ErrorSearch/>)
                    }
        </div>
            <div className="back-cities-ctn">
                <LinkRouter to="/cities" onClick={() => window.scrollTo({top: 0,left: 0,behavior: 'smooth'})}>
                    <button className="back-cities">BACK TO CITIES</button>
                </LinkRouter>
            </div>
    </div>
           
   </>
   )
}
export default CitiesDetails
