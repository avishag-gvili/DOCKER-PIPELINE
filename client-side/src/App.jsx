import React from 'react';
import Header from './stories/header/header'
import Footer from './stories/footer/FooterComponent'
import Settings from './components/settings/manageNotifications/Settings'
import './App.scss';
import RingtoneEditButton from './components/settinPage';

function App() {
  return (
    <div className="App">
      <Header/>
      <RingtoneEditButton/>
      <Settings></Settings>
      <Footer/>
    </div>
  );
}

export default App;
