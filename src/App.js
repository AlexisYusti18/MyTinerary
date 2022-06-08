import './styles/App.css';
import NavBarHeader from './components/NavBarHeader';
import WelcomeMain from './components/WelcomeMain';
import CalltoAction from './components/CallToAction';
import Carousel from './components/Carousel';

function App() {
  return (
    <div className="App">
      <NavBarHeader/>
      <WelcomeMain/>
      <CalltoAction/>
      <div className='carousel-ctn'>
          <Carousel/>
      </div>
     
    </div>
  );
}
export default App;
