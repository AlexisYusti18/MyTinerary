import './styles/App.css';
import { Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import Cities from './pages/Cities';
import Error from './pages/Error'
import NavBarHeader from './components/NavBarHeader';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
        <NavBarHeader/>
        <Routes>
            <Route path='/' element={<Index/>}/>
            <Route path='/index' element={<Index/>}/>
            <Route path='/home' element={<Index/>}/>
            <Route path='/' element={<Cities/>}/>
            <Route path='/cities' element={<Cities/>}/>
            <Route path='/*' element={<Error/>}/>
        </Routes>
        <Footer/>
    </div>
     
  );
}
export default App;
