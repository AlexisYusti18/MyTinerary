import './styles/App.css';
import { Route, Routes } from 'react-router-dom';
import Index from './pages/Home';
import Cities from './pages/Cities';
import Error from './pages/Error'
import NavBarHeader from './components/NavBarHeader';
import Footer from './components/Footer';

import ScrollToTop from "react-scroll-to-top";
import { TbArrowBigTop } from "react-icons/tb";

function App() {
  return (
    <div className="App">
        <NavBarHeader/>
        <Routes>
            <Route path='/' element={<Index/>}/>
            <Route path='/home' element={<Index/>}/>
            <Route path='/cities' element={<Cities/>}/>
            <Route path='/*' element={<Error/>}/>
        </Routes>
        <Footer/>
        <ScrollToTop smooth style={{backgroundColor:'#cf7126', color:'white', width:'50px'}} component={<TbArrowBigTop fontSize='large'/>}/>
    </div>
     
  );
}
export default App;
