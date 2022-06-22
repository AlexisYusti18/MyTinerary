import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link as LinkRouter } from "react-router-dom";
import InterpreterModeIcon from '@mui/icons-material/InterpreterMode';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';

export default function CitiesDetails(){

    const {id}= useParams()
    const[cities, setCities]= useState([])

    useEffect(()=>{
        axios.get("http://localhost:4000/api/cities")
        .then((info)=> {
            setCities(info.data.response.cities)
            //console.log(cities);
        })
        //disabled dependencias
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    let card= cities.filter(city=>city._id === id)
    return(
        <div className="ctn-details">
            <div className="details-description">
                {card.map((city,index)=>(

                    <div key={index}>
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
                ))}
            </div>
            <div className="back-cities-ctn">
                <LinkRouter to="/cities" onClick={() => window.scrollTo({top: 0,left: 0,behavior: 'smooth'})}>
                    <button className="back-cities">BACK TO CITIES</button>
                </LinkRouter>
            </div>
        </div>
    )
}