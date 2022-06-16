import React from "react";
import '../styles/style.css'
import {Box, Typography} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Link as LinkRouter } from 'react-router-dom';
//import logo from '../assets/logo.png'

export default function Footer(){
    return(
        <Box className="footer-ctn">
            <Box sx={{display:'flex', justifyContent:'center', flexDirection:'row'}} >
                <LinkRouter to={"/home"} style={{ textDecoration: 'none'}} onClick={() => window.scrollTo({top: 0,left: 0,behavior: 'smooth'})}>
                   <Typography sx={{color:'white', textDecoration:'none', fontSize:'30px', bgcolor:'#492c36', padding:'2px 5px', borderRadius:'2px'}}>Home</Typography>
                </LinkRouter>
                <LinkRouter to={"/cities"} style={{ textDecoration: 'none' }} onClick={() => window.scrollTo({top: 0,left: 0,behavior: 'smooth'})}>
                    <Typography sx={{color:'white', textDecoration:'none', fontSize:'30px' ,bgcolor:'#492c36', padding:'2px 5px', borderRadius:'2px'}}>Cities</Typography>
                </LinkRouter>
            </Box>
            <Box>
                <FacebookIcon sx={{margin:'15px', color:'white', fontSize:'30px', cursor:'pointer'}}/>
                <InstagramIcon sx={{margin:'15px', color:'white' , fontSize:'30px', cursor:'pointer'}}/>
                <TwitterIcon sx={{margin:'15px', color:'white', fontSize:'30px', cursor:'pointer'}}/>
            </Box>
            <Typography className="title-footer">©Copyright - All rights reserved - Alexis Yusti</Typography>
        </Box>

  );
}