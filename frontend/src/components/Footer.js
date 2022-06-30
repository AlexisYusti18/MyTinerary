import React from "react";
import '../styles/style.css'
import {Box, Typography} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Link as LinkRouter } from 'react-router-dom';
//import logo from '../assets/logo.png'

export default function Footer(){
    const pages= [{to: '/home', name: 'Home'}, { to:'/cities', name:'Cities'},{to:'/signUp' , name:'Sign Up'}, {to:'/logIn', name:'Log In'}]
    return(
        <Box className="footer-ctn">
            <Box sx={{display:'flex', justifyContent:'center', flexDirection:'row'}} >
                {pages.map((page, index)=>(
                    <LinkRouter key={index} to={page.to} onClick={() => window.scrollTo({top: 0,left: 0,behavior: 'smooth'})}>
                        <button style={{padding:'15px', margin:'10px'}} className="back-cities">{page.name}</button>
                    </LinkRouter>
                ))}
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