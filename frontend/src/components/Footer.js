import React from "react";
import '../styles/style.css'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Link as LinkRouter } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';

export default function Footer(){
    const pages= [{to: '/home', name: 'Home'}, { to:'/cities', name:'Cities'},{to:'/signUp' , name:'Sign Up'}, {to:'/logIn', name:'Log In'}]
    return(
        <div className="footer-ctn">
            <div className="datos">
                <div>
                    <LocationOnIcon sx={{fontSize:'40px', backgroundColor:'#1a2221', color:'white', borderRadius:'100%'}}/>
                    <p style={{color:'#1a2221'}}>Germany, Berlin</p>
                </div>
                <div>
                    <EmailIcon sx={{fontSize:'40px', backgroundColor:'#1a2221', color:'white', borderRadius:'100%'}}/>
                    <p style={{color:'#1a2221'}}>mytinerary@gmail.com</p>
                </div>
            </div>

            <div>
                <div>
                    <FacebookIcon sx={{margin:'15px', color:'#1a2221', fontSize:'30px', cursor:'pointer'}}/>
                    <InstagramIcon sx={{margin:'15px', color:'#1a2221' , fontSize:'30px', cursor:'pointer'}}/>
                    <TwitterIcon sx={{margin:'15px', color:'#1a2221', fontSize:'30px', cursor:'pointer'}}/>
                </div>
            </div>

            <div>
                <h1 style={{color:'#1a2221'}}>Navigate</h1>
                <div style={{display:'flex', justifyContent:'center', flexDirection:'column'}} >
                    {pages.map((page, index)=>(
                        <LinkRouter style={{textDecoration:'none'}} key={index} to={page.to} onClick={() => window.scrollTo({top: 0,left: 0,behavior: 'smooth'})}>
                            <p style={{color:'#1a2221',textDecoration:'none'}}>{page.name}</p>
                        </LinkRouter>
                    ))}
                </div>
            </div>
        </div>

  );
}