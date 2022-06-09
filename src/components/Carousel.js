import React from 'react';
import Carousel from 'react-grid-carousel';
import '../styles/Style.css'
//import '../components/Data'


const cities=[
  {
      name:"Rothenburg, Germany",
      image:"https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  },
  {
      name:"Dhërmi, Albania",
      image:"https://images.unsplash.com/photo-1595190588814-ae94398addf7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
  },
  {
      name:"Andorra",
      image:"https://images.unsplash.com/photo-1586508577371-677932dfae8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1110&q=80"
  },
  {
      name:"Hallstat, Austria",
      image:"https://images.unsplash.com/photo-1597086831879-756db15e81d3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
  },
  {
      name:"Brussels, Belgium",
      image:"https://images.unsplash.com/photo-1567031538362-ee02eefeb68d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  },
  {
      name:"Palih, Bosnia",
      image:"https://images.unsplash.com/photo-1526997237335-45a11b46ecb3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1075&q=80"
  },
  {
      name:"Porto, Portugal",
      image:"https://images.unsplash.com/photo-1569959220744-ff553533f492?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1164&q=80"
  },
  {
      name:"Visovac, Croatia",
      image:"https://images.unsplash.com/photo-1554585343-acd99e31977b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  },
  {
      name:"Sevilla, Spain",
      image:"https://images.unsplash.com/photo-1559564477-6e8582270002?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  },
  {
      name:"Dinan, France",
      image:"https://images.unsplash.com/photo-1473951574080-01fe45ec8643?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1204&q=80"
  },
  {
      name:"Athens, Greece",
      image:"https://images.unsplash.com/photo-1555993539-1732b0258235?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  },
  {
      name:"Italy, Rome",
      image:"https://img.freepik.com/foto-gratis/coliseo-roma-italia-noche_31965-4991.jpg?w=2000"
  }
];
//console.log(cities);

function CarouselItem(){
    //data.map()
    
    return (
      <div className='carousel-ctn'>
        <h3 className='title-carousel'>Popular MyTineraries</h3>
          <Carousel loop mobileBreakpoint={300}
      
      responsiveLayout={[
        { 
          breakpoint: 1920,
            cols: 2,
            rows: 2,
            gap: 2, 
            autoplay:9000
          },
        {
          breakpoint: 1200,
          cols: 2,
          rows: 2,
          gap: 5,
          autoplay:9000 
        },
        {
          breakpoint: 1520,
          cols: 2,
          rows: 2,
          gap: 5,
          autoplay:9000 
        },
        
        {
            breakpoint: 510,
            cols: 1,
            rows: 4,
            gap: 10,
            autoplay:9000 
          },
      ]}>
      {cities && cities.map(citys=>
          <Carousel.Item key="index">
            <div className='carouselItem-ctn'>
                <p className='title-cities'>{citys.name}</p>   
                <img className='img-carousel' src={citys.image} alt={citys.name}/>
            </div>
          </Carousel.Item>

      )}
    </Carousel>

      </div>
    )
    
}
export default CarouselItem;
//cuando cities sea true