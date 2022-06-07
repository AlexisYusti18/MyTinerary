import './styles/App.css';
import NavBarHeader from './components/NavBarHeader';
import WelcomeMain from './components/WelcomeMain';
import CalltoAction from './components/CallToAction';
import Carrousel from './components/Carrousel';

function App() {
  return (
    <div className="App">
      <NavBarHeader/>
      <WelcomeMain/>
      <CalltoAction/>
      <Carrousel/>
    </div>
  );
}
export default App;
