import React, {useEffect} from "react";
import ErrorSearch from '../components/ErrorSearch';
import { Link as LinkRouter } from "react-router-dom";

import {useDispatch, useSelector} from 'react-redux';
import citiesActions from '../redux/actions/citiesActions'

export default function CardsCities(){
    //const [citiesFilter ,setCitiesFilter]= useState([])
    
    const dispatch= useDispatch()

    useEffect(()=>{
      dispatch(citiesActions.getAllCities())
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])   
    //const cities= useSelector(store=> store.citiesReducer.cities)
    //console.log(cities);
   
    const search=(e)=>{
        dispatch(citiesActions.filterCities(e.target.value))
        //console.log(e.target.value);
    }
    const filter=useSelector(store=>store.citiesReducer.filterCities)
    //console.log(filter);

    return(
        <div className="cities-ctn">
            <div className="cities-image">
                <h1 className="title">Find your destination now!</h1>
            </div>
            <div className="input-ctn">
                <input className="input-search" placeholder="Search city" type='text'
                    onKeyUp={search}/>
            </div>
            <div className="ctn-cards">
                    {filter.length > 0 ? filter.map(city=>(
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
                    : (<ErrorSearch/>)
                } 
                </div> 
        </div>
    )
}