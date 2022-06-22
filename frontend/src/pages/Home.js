import React from "react";
import WelcomeMain from '../components/WelcomeMain';
import CalltoAction from '../components/CallToAction';
import Carousel from '../components/Carousel';

export default function Index(){
    return(
        <>
            <WelcomeMain/>
            <CalltoAction/>
            <div className='carousel-ctn'>
                <Carousel/>
            </div> 
        </>
    );
}