import { Route, Routes } from 'react-router';
import LabTabs from './stories/tabs/tabs';
import Header from './stories/header/header'
import Footer from './stories/footer/FooterComponent'
import './App.scss';
import RingtoneEditButton from './components/settinPage';

function App() {
  return (
    <div className="App">
      <Header/>
      <RingtoneEditButton/>
      <Footer/>
    </div>
  );
}

export default App;
