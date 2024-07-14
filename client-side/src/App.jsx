import './App.scss';

import { Route, Routes } from 'react-router';
import LabTabs from './stories/tabs/tabs';
import Header from './stories/header/header'
import './App.scss';
import ManageNotifications from './components/notifications/manage-notifications/ManageNotifications.jsx';

function App() {
  return (
    <div className="App">
      <Header/>
      <ManageNotifications></ManageNotifications>
    </div>
  );
}

export default App;
