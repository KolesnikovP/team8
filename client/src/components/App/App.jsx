/* eslint-disable no-unused-vars */
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { store } from '../../store';
import Nav from '../Nav/Nav';
import Login from '../Login/Login';
import FindForm from '../FindForm/FindForm';
import style from './App.module.css';

function App() {
  // function changeBg() {
  //   const pngs = [
  //     'url("../../../public/img/dota1.png")',
  //     'url("../../../public/img/dota1.png")',
  //     'url("../../../public/img/dota1.png")',
  //     'url("../../../public/img/dota1.png")',
  //     'url(../../../public/img/terror.png)',
  //     'url(../../../public/img/terror2.png)',
  //   ];
  //   const section = document.querySelector('*');
  //   const bg = pngs[Math.floor(Math.random() * pngs.length)];

  //   section.style.backgroundImage = bg;
  // }
  // useEffect(() => {
  //   setInterval(changeBg, 1500);
  // }, []);
  return (
    <div className={style.mainPage}>
      <BrowserRouter>
        <Provider store={store}>
          <Nav />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/addPost" element={<FindForm />} />
          </Routes>
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
