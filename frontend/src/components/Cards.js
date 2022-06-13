import React from "react";
import cities from './data'

export default function Cities(){

    return(
        <div className="ctn-cards">
            {cities.map(city=>
                <div key={city.id}>
                    <div className='img-carousel' style={{background: `url(${city.image})`}}>
                        <div className='ctn-title'>
                            <h1 className='title-cities'>{city.name}</h1>
                        </div>    
                    </div> 
                </div>

            )}
        </div>
    

    )

}