import React from "react";
import Carousel from 'react-grid-carousel';
import '../styles/style.css'
import {useSelector} from 'react-redux';


export default function CarouselCiudades(){

    //LE PIDO DE CITIESREDUCER QUE ME TRAIGA EL ESTADO CITIES
    const cities= useSelector(store=> store.citiesReducer.cities)
    //USESELECTOR= EXTRAE LOS DATOS QUE LE PIDAMOS DEL DEL STORE
    //console.log(cities);

    return(
            <div className='carousel-ctn'>
              <h3 className='title-carousel'>Popular MyTineraries</h3>
              <Carousel loop mobileBreakpoint={0}
            
            responsiveLayout={[
              { 
                breakpoint:4160,
                  cols: 2,
                  rows: 2,
                  gap: 2,
                  loop: true,
                  autoplay:3000
                },
              {
                breakpoint: 1200,
                cols: 2,
                rows: 2,
                gap: 5,
                loop: true,
                autoplay:3000 
              },
              {
                breakpoint: 1520,
                cols: 2,
                rows: 2,
                gap: 5,
                loop: true,
                autoplay:3000 
              },
              
              {
                  breakpoint: 650,
                  cols: 1,
                  rows: 4,
                  gap: 10,
                  loop: true,
                  autoplay:3000 
                },
            ]}>
            {cities?.map((city,index)=>
                <Carousel.Item key={index}>
                  <div className='carouselItem-ctn'>
                      <div className='img-carousel' style={{background: `url(${city.image})`, backgroundPosition:'center', backgroundSize:'cover'}}>
                            <div className='ctn-title'>
                                <h1 className='title-cities'>{city.name}</h1>
                            </div>    
                      </div> 
                  </div>
                </Carousel.Item>
            )}
          </Carousel>
        </div>
    )
    
}