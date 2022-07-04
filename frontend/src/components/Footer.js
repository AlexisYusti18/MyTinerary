import React from "react";
import '../styles/style.css'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Link as LinkRouter } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function Footer(){
    const pages= [{to: '/home', name: 'Home'}, { to:'/cities', name:'Cities'},{to:'/signUp' , name:'Sign Up'}, {to:'/logIn', name:'Log In'}]
    const icons=[<FacebookIcon/>,<InstagramIcon/>,<TwitterIcon/>,<LinkedInIcon/>,<GitHubIcon/>]
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
                <div style={{display:'flex'}}>
                    {icons.map((icon, index)=>(
                        <span key={index} style={{margin:'7px', color:'#1a2221', fontSize:'4rem', cursor:'pointer'}}>{icon}</span>
                    ))}
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