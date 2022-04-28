/* eslint-disable no-unused-vars */
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { store } from '../../store';
import Nav from '../Nav/Nav';
import style from './style.css';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Nav />
        <div className="all">
          <Routes>
            <Route />
          </Routes>
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
