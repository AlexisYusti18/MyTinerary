import React, { useEffect} from "react";
import { useParams } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import citiesActions from '../redux/actions/citiesActions'
import { Link as LinkRouter } from "react-router-dom";
import InterpreterModeIcon from '@mui/icons-material/InterpreterMode';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import '../styles/style.css'
import Collapsible from 'react-collapsible';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ErrorSearch from '../components/ErrorSearch';

export default function CitiesDetails(){
    const {id}= useParams()
    //CONST DISPATCH:LO DECLARO EN UNA CONSTANTE PARA USARLO GLOBAL Y SE USAN EN LA CABEZERA DE LA FUNCION- GENERA UN ENVIO
    //PERMITE TRAES LAS ACCIONES Y USARLAS
    
    //SI LO USO DIRECTO EN EL USEEFFECT NO ME DEJARIA PORQUE SE DEBE DECLARAR FUERA DE LA CABECERA DE LA FUNCION Y ADENTRO SE REUSA
    const dispatch= useDispatch()
   
    //MEDIANTE UN useEffect LAMO A CITIESACTIONS Y AL MEDOTO DEL OBJETO GetOneCity QUE TIENE COMO PARAMETRO EL id
    useEffect(()=>{
        dispatch(citiesActions.getOneCity(id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])

    const city= useSelector(store=> store.citiesReducer.oneCity)
    //EXTRAE LOS DATOS QUE LE PIDAMOS DEL DEL STORE
    //console.log(city);
    //console.log(city.itineraries);
    return(
    <>
        <div className="ctn-details">
            <div className="details-description">
                    <div>
                        <div className='img-card-details' style={{background: `url(${city.image})`}}>
                                <h1 className="title">{city.name} , {city.country}</h1>
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
                                {itinerary.likes}
                                0 <FavoriteBorderIcon sx={{color:"white", cursor:"pointer"}}/>
                            </div>
                            <div className="name-image">
                                <p className="title-cards">{itinerary.name}</p>
                                <img src={itinerary.userimage} style={{borderRadius:"100%", height:"6rem"}} alt="img-user"/>
                            </div>
                            <div className="price-time"> Price:
                                <div className="title-cards">{Array(itinerary.price).fill().map((index)=> (
                                    //PASO EL NUMERO A ARRAY MEDIANTE EL METODO Array, CON EL METODO FILL ME MODIFICA ESE ARRAY Y MAPEO ESE ARRAY TRANSFORMADO. HAGO UN RETURN Y DEVUELVO IN BILLETE
                                        <p key={index}>💵</p>
                                    )
                                    )}</div>
                                <p className="title-cards">Duration: {itinerary.time}hs</p>
                            </div>
                            <div className="tags">
                                <p className="title-cards">#{itinerary.tag}  #{itinerary.tag2}  #{itinerary.tag3}</p>
                            </div>
                  
                    <Collapsible  trigger="View More" triggerWhenOpen="Close" transitionTime="1000" transitionCloseTime="300" className="view-more">
                        <div className="img-activities">                                                                   
                            <h3 className="activities-title">ACTIVITIES</h3>
                        </div>
                    </Collapsible>
                    </div>
                        ) : (<ErrorSearch/>)
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