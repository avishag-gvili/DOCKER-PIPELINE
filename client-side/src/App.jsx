import React from 'react';
import Header from './stories/header/header'
import Footer from './stories/footer/FooterComponent'
import Settings from './components/settings/manageNotifications/Settings.jsx';
import './App.scss';
import RingtoneEditButton from './components/settinPage';

function App() {
  return (
    <div className="App">
      <Header/>
<<<<<<< HEAD
      <RingtoneEditButton/>
      <ManageNotifications></ManageNotifications>
=======
      <Settings></Settings>
>>>>>>> ef2cc66e7e2001d380be0be9466446f42fe65db7
      <Footer/>
    </div>
  );
}

export default App;
