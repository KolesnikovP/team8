/* eslint-disable no-unused-vars */
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Nav from '../Nav/Nav';
import Login from '../Login/Login';
import FindForm from '../FindForm/FindForm';
import Profile from '../Profile/Profile';
import style from './App.module.css';
import AccessForm from '../AccessForm/AccessForm';
import { fetchUser } from '../../redux/thunk/user';

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
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = () => {
      fetch('http://localhost:4000/auth/login/success', {
        method: 'GET',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error('authentication has been failed!');
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  return (
    <div className={style.mainPage}>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/addPost" element={<FindForm />} />
          <Route path="/accessForm" element={<AccessForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
