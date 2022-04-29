/* eslint-disable no-unused-vars */
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { store } from '../../store';
import Nav from '../Nav/Nav';
import Login from '../Login/Login';
import style from './App.module.css';

function App() {
  return (
    <div className={style.mainPage}>
      <BrowserRouter>
        <Provider store={store}>
          <Nav />
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
