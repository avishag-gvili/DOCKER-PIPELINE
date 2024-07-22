import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import Footer from './stories/footer/FooterComponent';
import { router } from './router/router.jsx';
import { store } from './redux/store.jsx';
import './App.scss';
import Loader from './stories/loader/loader.jsx';

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Provider store={store}>
        <Footer />
        <Loader/>
      </Provider>
    </>
  );
}
export default App;
