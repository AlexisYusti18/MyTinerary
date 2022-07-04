import React, { useEffect } from "react";
import Carousel from 'react-grid-carousel';
import '../styles/style.css'
import {useDispatch, useSelector} from 'react-redux';
import citiesActions from '../redux/actions/citiesActions'

export default function CarouselCiudades(){

    const dispatch= useDispatch()

    useEffect(()=>{
      //DESPACHO EL GET ALL CITIES
      dispatch(citiesActions.getAllCities())
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
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
            {cities?.map((city,index)=>
                <Carousel.Item key={index}>
                  <div className='carouselItem-ctn'>
                      <div className='img-carousel' style={{background: `url(${city.image})`, backgroundPosition:'center'}}>
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
//LO USAMOS PARA ENVIAR ACCIONES A LA STORE.
//DISPATCH ES UNA FUNCION DE REDUX QUE SIRVE PARA REALIZAR UN CAMBIO DE ESTADO.
//mapDispatchToProps: PERMITE CREAR FUNCIONES QUE SE ENVIAN CUANDO SE LAS LLAMA Y PASAR ESAS FUNCIONES COMO ACCESORIOS AL COMPONENTE.
// const mapDispatchToProps= {
//   getAllCities: citiesAction.getAllCities
// }

// //DEVUELVE UN OBJETO CON LOS DATOS QUE NECESITA EL COMPONENTE
// const mapStateToPros = (state)=>{
//   return{
//       allCities: state.citiesReducer.cities
//   }
// } 
