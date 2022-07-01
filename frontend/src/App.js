import React,{useEffect} from "react";
import './styles/App.css';
import { Route, Routes } from 'react-router-dom';
import Index from './pages/Home';
import Cities from './pages/Cities';
import Error from './pages/Error';
import NavBar from './components/NavBarHeader';
import Footer from './components/Footer';
import ScrollToTop from "react-scroll-to-top";
import Details from './pages/Details';
import { TbArrowBigTop } from 'react-icons/tb';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import Alert from './components/Alert';

function App(props) {
  
  //CUANDO CARGA APP VERIFICA SI EXISTE ALGUN TOKEN EN EL LOCAL STORAGE => SI ES DIFERENTE A NULL QUIERE DECIR QUE EXISTE
  //ENTONCES LO TRAE Y LO GUARDA EN LA CONSTANTE
  //Y LLAMA A UNA ACCION VERIFYTOKEN
  useEffect(()=>{
    if(localStorage.getItem('token') !== null){
      const token= localStorage.getItem('token')
      props.verifyToken(token)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
      <div className="App">
        <NavBar/>
        <Alert/>
        <Routes> 
            <Route path='/' element={<Index/>}/>
            <Route path='/home' element={<Index/>}/>
            <Route path='/cities' element={<Cities/>}/>
            <Route path='/*' element={<Error/>}/>
            <Route path='/city/:id' element={<Details/>} />
            <Route path='/signUp' element={<SignUp/>}/>
            <Route path='/logIn' element={<LogIn/>}/>
        </Routes>
        <Footer/>
        <ScrollToTop smooth style={{backgroundColor:'#cf7126', color:'white', width:'50px',transform:'translateX(1rem)'}} component={<TbArrowBigTop fontSize='large'/>}/>
    </div>
  );
}
export default App;
 //le estas diciendo que primero enruta a details y despues le paso el parametro