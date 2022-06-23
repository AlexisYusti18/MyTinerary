import React, { useEffect} from "react";
import { useParams } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import citiesActions from '../redux/actions/citiesActions'
import { Link as LinkRouter } from "react-router-dom";
import InterpreterModeIcon from '@mui/icons-material/InterpreterMode';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';

import background from "../assets/activities.png"
import Collapsible from 'react-collapsible';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


export default function CitiesDetails(){
    const {id}= useParams()

    const dispatch= useDispatch()
    useEffect(()=>{
        dispatch(citiesActions.getOneCity(id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])
    const city= useSelector(store=> store.citiesReducer.oneCity)
    console.log(city.itineraries);
    //console.log(card)

    return(
        <>
        <div className="ctn-details">
            <div className="details-description">
                    <div>
                        <div className='img-card-details' style={{background: `url(${city.image})`}}>
                                <h1 className="title-error">{city.name} , {city.country}</h1>
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
        <div className="asd">
            {city.itineraries?.map((itinerary,index)=>
                <div key={index} className="itineraries-card">
                    <div>
                        <div>
                            <h1>{itinerary.title}</h1>
                            0<FavoriteBorderIcon/>
                         </div>
                        <div>
                            <p>{itinerary.name}</p>
                            <img src={itinerary.userimage} style={{borderRadius:"100%", height:"6rem"}} alt="img-user"/>
                        </div>
                        <div>
                            <p>${itinerary.price}</p>
                            <p>{itinerary.time} Hours</p>
                        </div>
                        <div>
                            <p>#{itinerary.tag}  #{itinerary.tag2}  #{itinerary.tag3}</p>
                        </div>
                </div>
                <Collapsible trigger="View More" className="view-more">
                    <div style={{height:"5rem", backgroundColor:"yellow", color:"orange"}}>ACTIVIDADES</div>
                    <img src={background} alt="back-activities" style={{width:"40vw", height:"35vh"}}/>                                                                   
                </Collapsible>
                </div>)}
            {city.itineraries2?.map((itinerary, index)=>
                 <div key={index} className="itineraries-card">
                 <div>
                     <div>
                         <h1>{itinerary.title}</h1>
                         0<FavoriteBorderIcon/>
                      </div>
                     <div>
                         <p>{itinerary.name}</p>
                         <img src={itinerary.userimage} style={{borderRadius:"100%", height:"6rem"}} alt="img-user"/>
                     </div>
                     <div>
                         <p>${itinerary.price}</p>
                         <p>{itinerary.time} Hours</p>
                     </div>
                     <div>
                         <p>#{itinerary.tag}  #{itinerary.tag2}  #{itinerary.tag3}</p>
                     </div>
             </div>
             <Collapsible trigger="View More" className="view-more">
                 <div style={{height:"5rem", backgroundColor:"yellow", color:"orange"}}>ACTIVIDADES</div>
                 <img src={background} alt="back-activities" style={{width:"40vw", height:"35vh"}}/>                                                                   
             </Collapsible>
             </div>)}
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