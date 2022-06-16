import  React from "react";
import '../styles/style.css'
import Box from '@mui/material/Box';
import logo from '../assets/logo.png'

function Welcome(){
    return(
        <Box className="fondo">
             <img className="logo" src={logo} alt='logo'/>
             <h1 className="title">MyTinerary</h1>
             <h2 className="subtitulo">Find your perfect trip, designed by insiders who know and love their cities!</h2>
        </Box>
    )
}
export default Welcome;