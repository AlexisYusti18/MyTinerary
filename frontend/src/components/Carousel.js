import React, { useEffect } from "react";
import { connect } from "react-redux";
import citiesAction from "../redux/actions/citiesActions";
import Carousel from 'react-grid-carousel';
import '../styles/style.css'

const CarouselCiudades=(props)=>{

    useEffect(()=>{
        props.getAllCities()
        console.log(props);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return(
            <div className='carousel-ctn'>
              <h3 className='title-carousel'>Popular MyTineraries</h3>
              <Carousel loop mobileBreakpoint={0}
            
            responsiveLayout={[
              { 
                breakpoint:2160,
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
                  breakpoint: 650,
                  cols: 1,
                  rows: 4,
                  gap: 10,
                  autoplay:3000 
                },
            ]}>
            {props.allCities?.map((city,index)=>
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
//lo usamos para enviar acciones a la store. Dispatche una función de Redux para desencadenar un cambio de estado.
//mapDispatchToProps: permite crear funciones que se envían cuando se las llama y pasar esas funciones como accesorios a su componente.
const mapDispatchToProps= {
  getAllCities: citiesAction.getAllCities
}

//devuelve un objeto simple que contenga los datos que necesita el componente:
const mapStateToPros = (state)=>{
  return{
      allCities: state.citiesReducer.cities
  }
} 
export default connect (mapStateToPros, mapDispatchToProps) (CarouselCiudades)