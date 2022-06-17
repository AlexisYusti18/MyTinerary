import React, { useState , useEffect} from "react";
import axios from 'axios'
import ErrorSearch from '../components/ErrorSearch';
import { Link as LinkRouter } from "react-router-dom";


export default function CardsCities(){
    //estado de cada ciudad=> funcion que cambia el estado
    const[cities, setCities]=useState([])
    //creo un estado para la busqueda
    const[search, setSearch]=useState('')
    //filtro para limpiar busqueda
    const[filtercities, setFilterCities]= useState([])

    useEffect(()=>{
        axios.get("http://localhost:4000/api/cities")
        .then((info)=> setCities(info.data.response.cities))
    },[]);
    //console.log(cities);
    
    useEffect(()=>{
        let cityFilter = cities?.filter(city=>city.name.toLowerCase().startsWith(search.trim().toLowerCase()))
        setFilterCities(cityFilter)
    },[search, cities]);

    return(
        <div className="cities-ctn">
            <div className="cities-image">
                <h1 className="title">Find your destination now!</h1>
            </div>
            <div className="input-ctn">
                <input className="input-search" placeholder="Search city" type='text'
                    onKeyUp={(e)=>{
                        setSearch(e.target.value)
                }}/>
            </div>
            <div className="ctn-cards">
                    {filtercities.length > 0 ? filtercities.map(city=>(
                        <div key={city._id} className="card-body">
                            <div className="cards" style={{background: `url(${city.image})`}}>
                                
                                    <div className="cities-title-ctn">
                                        <h1 className='title-cities'>{city.name}</h1>
                                    </div>
                                    <div className="cities-button-ctn">
                                        <LinkRouter to={`/city/${city._id}`} onClick={() => window.scrollTo({top: 0,left: 0,behavior: 'smooth'})}>
                                            <button className="details-button" >See more</button>
                                        </LinkRouter>
                                    </div>
                            </div> 
                        </div>
                ))  
                    : (<ErrorSearch></ErrorSearch>)
                } 
                </div> 
        </div>
    )
}
