import './App.scss';

import { Route, Routes } from 'react-router';
import LabTabs from './stories/tabs/tabs';
import Header from './stories/header/header';
import './App.scss';
import RingtoneEditButton from './components/settinPage';

function App() {
  return (
    <div className="App">
      <Header/>
      <RingtoneEditButton/>
    </div>
  );
}

export default App;
