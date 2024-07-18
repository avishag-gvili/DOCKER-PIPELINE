import { Route, Routes } from 'react-router';
import LabTabs from './stories/tabs/tabs';
import Header from './stories/header/header';
import Footer from './stories/footer/FooterComponent';
import './App.scss';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router.jsx';
import { store } from './redux/store.jsx';
import { Provider } from 'react-redux';

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Provider store={store}>
        <Footer />
      </Provider>
    </>
  );
}
export default App;
