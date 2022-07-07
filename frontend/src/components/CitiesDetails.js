import React, {useEffect, useState} from "react";
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

import Carousel from 'react-grid-carousel';

function CitiesDetails(){
    const {id}= useParams()
    const dispatch= useDispatch()
    const [reload,setReload]=useState(false)
    const [inputText, setInputText]=useState('')

    useEffect(()=>{
        dispatch(citiesActions.getOneCity(id))
        //eslint-disable-next-line
    },[reload])
    const city=useSelector(store=> store.citiesReducer.oneCity)
    //console.log(city)
    
    async function likeOrDislike(idItinerario){
        //console.log(idItinerario)
        await dispatch(citiesActions.likeAndDislike(idItinerario))
        //console.log(res)
        setReload(!reload)
    }

    async function commentAdd(event){
        const commentData={
            // itinerary:itinerary._id,
            comment:inputText
        }
        
    }
    
    
    
    
    
    
    
    const user=useSelector(store=>store.userReducer.user)

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
                                    {itinerary.likes?.includes(user.id) ?
                                    (<div style={{color:'red'}}>
                                        
                                        <FavoriteIcon id={itinerary._id} sx={{cursor:'pointer'}}/>
                                    </div>) : 
                                    (<div style={{color:'red'}}>
                                        <FavoriteBorderIcon id={itinerary._id} sx={{cursor:'pointer'}}/>
                                    </div>)}
                                    {itinerary?.likes.length}
                                </button>
                                </>
                                :  (<div><FavoriteBorderIcon id={itinerary._id} sx={{cursor:'pointer'}}/></div>)
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
                                <Carousel loop mobileBreakpoint={0} responsiveLayout={[{ breakpoint:4160,cols:1,rows:1,gap:2,autoplay:3000,hideArrow:true}]} className='aeste'>
                                    {itinerary.activities?.map((activity, index)=>(
                                        <Carousel.Item key={index} className='aeste'>
                                            <div className="img-activities" style={{background:`url(${activity.image})`, backgroundPosition:'center', backgroundSize:'cover', backgroundRepeat:'no-repeat'}}>
                                                <p className="title-activities">{activity.name}</p>
                                            </div>
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                            <div style={{height:'40vw'}}>
                                {itinerary?.comments.map((comment,index)=>
                                    <>
                                        {comment.userId?._id !== user?.id ?
                                        <div key={index}>
                                            <div>
                                                <p>{comment.userId.name}</p><p>{new Date(comment.data).toUTCString()}</p>
                                            </div>
                                            <div>
                                                <p>{comment.comment}</p>
                                            </div>
                                        </div> :
                                        <div>aa</div>}
                                    
                                    
                                    </>
                                    )}
                            </div>
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
   </>)
}
export default CitiesDetails
// export default connect(mapStateToProps,mapDispatchToProps)(CitiesDetails)
