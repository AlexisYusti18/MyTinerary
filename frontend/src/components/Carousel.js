import React from 'react';
import Carousel from 'react-grid-carousel';
import '../styles/style.css'
import cities from '../components/data'

function CarouselItem(){
  return (
      <div className='carousel-ctn'>
        <h3 className='title-carousel'>Popular MyTineraries</h3>
        <Carousel loop mobileBreakpoint={0}
      
      responsiveLayout={[
        { 
          breakpoint: 1920,
            cols: 2,
            rows: 2,
            gap: 2, 
            autoplay:3000
          },
        {
          breakpoint: 1200,
          cols: 2,
          rows: 2,
          gap: 5,
          autoplay:3000 
        },
        {
          breakpoint: 1520,
          cols: 2,
          rows: 2,
          gap: 5,
          autoplay:3000 
        },
        
        {
            breakpoint: 510,
            cols: 1,
            rows: 4,
            gap: 10,
            autoplay:3000 
          },
      ]}>
      {cities.map((city,index)=>
          <Carousel.Item key="index">
            <div className='carouselItem-ctn'>
                <div className='img-carousel' style={{background: `url(${city.image})`}}>
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
export default CarouselItem;
    
