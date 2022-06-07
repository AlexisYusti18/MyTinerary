import  React from "react";
import '../styles/style.css'
//import fondo from '../assets/paisaje.jpg'
import Box from '@mui/material/Box';
import logo from '../assets/logo.png'

function Welcome(){
    return(
        <Box className="fondo">
             <img className="logo" src={logo} alt='logo'/>
             <h1 className="titulo">"Find your perfect trip, designed by insiders who know and love their cities"</h1>
        </Box>
    )
}
export default Welcome;