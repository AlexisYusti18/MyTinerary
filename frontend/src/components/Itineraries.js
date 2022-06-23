import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useEffect } from 'react';
import itinerariesActions from '../redux/actions/itinerariesActions';

export default function Itineraries(){

    const dispatch= useDispatch()

    useEffect(()=>{
      dispatch(itinerariesActions.getItineraries())
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const itineraries=useSelector(store=>store.itinerariesReducer.itineraries)
   // console.log(itineraries);
    
    return(
        <div>
            {itineraries?.map((itinerary,index)=>
                <div key={index}>
                    <h1>{itinerary.title}</h1>
                    <img src={itinerary.userimage} alt="img" style={{borderRadius:"100%", height:"10rem"}}/>
                </div>


            )}
        </div>
    )
}