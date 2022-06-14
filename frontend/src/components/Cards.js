import React, { useState , useEffect} from "react";
import data from '../components/data'

export default function CardsCities(){

    const[cities, setCities]=useState([])
    const[search, setSearch]=useState("")

    useEffect(()=>{
        setCities(data)
        
        const city = data.filter((city)=>{
            if(city.name !== null){
                return city.name.toLowerCase().startsWith(search.trim().toLowerCase())
            }
            else{ return <p style={{color:'white'}}>no hay</p>}
        }) 

        setCities(city)

    },[search])
        
    return(
        <>
            <div>
                <input type='text'
                onKeyUp={(e)=>{
                    setSearch (e.target.value)
                }}/>
            </div>
            <div className="ctn-cards">
            {cities.map(city=>
                <div key={city.id}>
                    <div className='img-cards' style={{background: `url(${city.image})`}}>
                        <div>
                            <h1 className='title-cards'>{city.name}</h1>
                        </div>    
                    </div> 
                </div>

            )}
            </div>
        </>
    )
}