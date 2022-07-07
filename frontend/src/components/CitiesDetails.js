import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import citiesActions from '../redux/actions/citiesActions'
import { Link as LinkRouter } from "react-router-dom";
import InterpreterModeIcon from '@mui/icons-material/InterpreterMode';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import Collapsible from 'react-collapsible';
import ErrorSearch from './ErrorSearch';

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

function CitiesDetails(){
    const {id}= useParams()
    const dispatch= useDispatch()
    const [likes,setLikes]=useState()

    useEffect(()=>{
        dispatch(citiesActions.getOneCity(id))
        //eslint-disable-next-line
      },[])
    const city=useSelector(store=> store.citiesReducer.oneCity)
    //console.log(city)
    
    async function likeOrDislike(){
        const res=dispatch(citiesActions.likeAndDislike(city.itineraries._id))
        //console.log(likes)
        setLikes(res)
     }
     const user=useSelector(store=>store.userReducer.user)

     useEffect(()=>{
        dispatch(citiesActions.likeAndDislike(id))
        //eslint-disable-next-line
      },[])
    

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
                                <button onClick={likeOrDislike}> {likes?.includes(user.id) ?
                                    (<div style={{color:'red'}}>
                                        <FavoriteIcon sx={{cursor:'pointer'}}/>
                                    </div>) : 
                                    (<div style={{color:'red'}}>
                                        <FavoriteBorderIcon sx={{cursor:'pointer'}}/>
                                    </div>)}
                                </button>
                                :   (<div>
                                        <FavoriteBorderIcon sx={{cursor:'pointer'}}/>
                                    </div>)
                            }
                                <p>{likes?.length}</p>
                               
                            </div>



                            <div className="name-image">
                                <p className="title-cards">{itinerary.name}</p>
                                <img src={itinerary.userimage} style={{borderRadius:"100%", height:"6rem"}} alt="img-user"/>
                            </div>
                            <div className="title-price">Price:{Array(itinerary.price).fill().map((index,price)=>(
                                <div key={price}>💰</div>))}
                            </div>
                            <p className="title-cards">Duration: {itinerary.time}hs</p>
                            <div className="tags">
                                <p className="title-cards">#{itinerary.tag}  #{itinerary.tag2}  #{itinerary.tag3}</p>
                            </div>
                            <Collapsible  trigger="View More" triggerWhenOpen="Close" transitionTime="1000" transitionCloseTime="100" className="view-more">
                                <div className="img-activities">                                                                   
                                    <div>{itinerary.activities?.map((activity, index)=>(
                                       <div key={index} style={{display:'flex'}}>
                                        <img src={activity.image} alt='img' style={{width:'90px'}}/>
                                        <p>{activity.name}</p>
                                       </div>
                                    ))}
                                    </div>
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
