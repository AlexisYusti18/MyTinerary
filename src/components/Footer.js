import React from "react";
import '../styles/Style.css'
import {Box, Typography} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

export default function Footer(){
    return(
        <Box className="footer-ctn">
            <Typography variant="h3"><span className="colorA">My</span><span className="colorB" >Tinerary</span></Typography>
            <Box>
                <FacebookIcon sx={{margin:'15px', color:'blue'}}/>
                <InstagramIcon sx={{margin:'15px', color:'red' }}/>
                <TwitterIcon sx={{margin:'15px', color:'lightblue'}}/>
            </Box>
            <Typography>©Copyright - All rights reserved - Alexis Yusti</Typography>
        </Box>

    );
}