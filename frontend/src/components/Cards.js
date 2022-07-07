import React, {useEffect} from "react";
import ErrorSearch from '../components/ErrorSearch';
import { Link as LinkRouter } from "react-router-dom";

import {useDispatch, useSelector} from 'react-redux';
import citiesActions from '../redux/actions/citiesActions'

export default function CardsCities(){
    const dispatch= useDispatch()

    useEffect(()=>{
      dispatch(citiesActions.getAllCities())
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])   
    //const cities= useSelector(store=> store.citiesReducer.cities)
   
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
               <div className="group">
                    <svg className="icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
                    <input className="input-search" placeholder="Search city" type='text'
                    onKeyUp={search}/>
               </div>
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