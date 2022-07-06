import React,{useEffect} from "react";
import {useDispatch} from 'react-redux';
import './styles/App.css';
import citiesActions from '../src/redux/actions/citiesActions'
import userActions from "./redux/actions/userActions";
import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './pages/Home';
import Cities from './pages/Cities';
import NavBar from './components/NavBarHeader';
import Footer from './components/Footer';
import ScrollToTop from "react-scroll-to-top";
import Details from './pages/Details';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import Alert from './components/Alert';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
// import { TbArrowBigTop } from 'react-icons/tb';


function App(props) {
  
  const dispatch= useDispatch()
  useEffect(()=>{
    //DESPACHO EL GET ALL CITIES
    dispatch(citiesActions.getAllCities())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  useEffect(()=>{
    if(localStorage.getItem('token') !== null){
      const token=localStorage.getItem('token')
      props.verifyToken(token)
      //console.log(token)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
      <div className="App">
        <NavBar/>
        <Alert/>
        <Routes> 
            <Route path='/' element={<Home/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/cities' element={<Cities/>}/>
            <Route path='/*' element={<Home/>}/>
            <Route path='/city/:id' element={<Details/>} />
            {!props.user && <Route path='/signUp' element={<SignUp/>}/>}
            {!props.user && <Route path='/logIn' element={<LogIn/>}/>}
        </Routes>
        <Footer/>
        <ScrollToTop smooth style={{backgroundColor:'#1a2221', color:'white', width:'50px',transform:'translateX(1rem)'}} component={<AirplanemodeActiveIcon fontSize='large'/>}/>
      </div>
  );
}
const mapDispatchToProps ={
  verifyToken: userActions.verifyToken,
}
const mapStateToProps=(state)=>{
  return {
      user:state.userReducer.user
  }
}
export default connect (mapStateToProps, mapDispatchToProps)(App);