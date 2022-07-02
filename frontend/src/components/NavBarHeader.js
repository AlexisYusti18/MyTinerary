import React , {useState} from 'react';
import {AppBar,Box,IconButton,Toolbar, Tooltip,Typography,Menu,Container,Button,MenuItem, Avatar,} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import '../styles/style.css'
import noregister from "../assets/register.png"
import { Link as LinkRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOut from '../components/LogOut';

const ResponsiveAppBar=(props)=>{
    const pages = [ {to: '/home', name: 'Home'}, { to:'/cities', name:'Cities'}];
    const form=[{to:'/signUp' , name:'Sign Up'}, {to:'/logIn', name:'Log In'}];
  
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] =useState(null);

    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };

    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };
  
  return (
    <AppBar position="static" sx={{backgroundColor:'white' ,minHeight:'8vh', display:'flex', justifyContent:'center', alignItems:'center'}}>
      <Container maxWidth="xl">
        <Toolbar>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon className='menu-color' />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page, index) => (
                <LinkRouter key={index} to={page.to} onClick={handleCloseNavMenu}  style={{ textDecoration: 'none' }}>
                    <MenuItem>
                        <Typography textAlign="center">{page.name}</Typography>
                    </MenuItem>
                </LinkRouter>
              ))}
            </Menu>
          </Box>
          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page, index) => (
              <LinkRouter key={index} to={page.to}  style={{ textDecoration: 'none' }} onClick={() => window.scrollTo({top: 0,left: 0,behavior: 'smooth'})}>
                <Button sx={{ my: 2, color: 'white', display: 'block' }}>{page.name}</Button>
              </LinkRouter>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
          
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {props.user ?
                      <Avatar src={props.user.imageUser}/>
                      :<img className='usuario-noregistrado' src={noregister} alt='persona'/>
                  }
                </IconButton>
            
          </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}>
               {props.user ? 
                <LogOut onClose={handleCloseUserMenu}/>
                : form.map((page, index) => (
                <LinkRouter key={index} to={page.to} onClick={handleCloseNavMenu}  style={{ textDecoration: 'none' }}>
                    <MenuItem>
                        <Typography textAlign="center">{page.name}</Typography>
                    </MenuItem>
                </LinkRouter>))
              
              }
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

const mapStateToProps=(state)=>{
  return{
    user:state.userReducer.user
  }
}
export default connect(mapStateToProps, null)(ResponsiveAppBar)