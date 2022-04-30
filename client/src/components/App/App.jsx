/* eslint-disable no-unused-vars */
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { store } from '../../store';
import Nav from '../Nav/Nav';
import Login from '../Login/Login';
import FindForm from '../FindForm/FindForm';
import style from './App.module.css';

function App() {
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
  return (
    <div className={style.mainPage}>
      <BrowserRouter>
        <Provider store={store}>
          <Nav user={user} />
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
