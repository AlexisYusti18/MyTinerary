import React,{useEffect} from "react";
import './styles/App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Cities from './pages/Cities';
import NavBar from './components/NavBarHeader';
import Footer from './components/Footer';
import ScrollToTop from "react-scroll-to-top";
import Details from './pages/Details';
import { TbArrowBigTop } from 'react-icons/tb';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import Alert from './components/Alert';
import userActions from "./redux/actions/userActions";
import { connect } from 'react-redux';

function App(props) {
  
  //CUANDO CARGA APP VERIFICA SI EXISTE ALGUN TOKEN EN EL LOCAL STORAGE => SI ES DIFERENTE A NULL QUIERE DECIR QUE EXISTE
  //ENTONCES LO TRAE Y LO GUARDA EN LA CONSTANTE
  //Y LLAMA A UNA ACCION VERIFYTOKEN
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
            {/* <Route path='/signUp' element={<SignUp/>}/>
            <Route path='/logIn' element={<LogIn/>}/> */}
            {!props.user && <Route path='/signUp' element={<SignUp/>}/>}
            {!props.user && <Route path='/logIn' element={<LogIn/>}/>}
        </Routes>
        <Footer/>
        <ScrollToTop smooth style={{backgroundColor:'#cf7126', color:'white', width:'50px',transform:'translateX(1rem)'}} component={<TbArrowBigTop fontSize='large'/>}/>
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
 //le estas diciendo que primero enruta a details y despues le paso el parametro