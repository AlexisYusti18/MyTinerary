import React, {useEffect,useState} from "react";
import { useParams } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import citiesActions from '../redux/actions/citiesActions'
import { Link as LinkRouter } from "react-router-dom";
import InterpreterModeIcon from '@mui/icons-material/InterpreterMode';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import ErrorSearch from './ErrorSearch';
import Tinerary from "../components/Tinerary";


function CitiesDetails(){
    const {id}= useParams()
    const dispatch= useDispatch()
    const [reload,setReload]=useState(false)
    
    useEffect(()=>{
        dispatch(citiesActions.getOneCity(id))
        //eslint-disable-next-line
    },[reload])
    const city=useSelector(store=> store.citiesReducer.oneCity)
    // console.log(city)

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
                        <Tinerary itinerary={itinerary} key={itinerary._id} setReload={setReload}/>
                        ) 
                        :(<ErrorSearch/>)
                    }
                <LinkRouter to="/cities" onClick={() => window.scrollTo({top: 0,left: 0,behavior: 'smooth'})}>
                    <button className="back-cities">BACK TO CITIES</button>
                </LinkRouter>
            </div>
            
            
        </div>
           
   </>
   )
}
export default CitiesDetails
