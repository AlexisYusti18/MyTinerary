import React from "react";
import '../styles/Style.css'
import {Box, Typography} from '@mui/material';
import {Link as LinkRouter} from "react-router-dom";

export default function CalltoAction(){
    return(
        <Box className='fondo-call'>
           <Typography className="title-callToAction" >Haven't you visited the city of your dreams yet?</Typography>
            <LinkRouter to={'/cities'}>
                <button className='callToAction'>Choose your next destination, now</button>
            </LinkRouter>
        </Box>
    );
}