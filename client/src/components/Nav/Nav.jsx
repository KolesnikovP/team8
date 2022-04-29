/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import style from './style.css';

export default function Nav() {
  const [auntificate, setAuntificate] = useState(false);

  useEffect(() => {
    fetch('http://localhost:4000/api/check')
      .then((data) => data.json())
      .then((response) => console.log(response));
  }, []);
  function steamAuth() {
    window.open('http://localhost:4000/api/auth/steam');
  }
  return (
    <div>
      <div className="navBar">
        <Link to="/">
          <img width="100px" className="logo" src="img/pngwing.com.png" alt="" />
        </Link>
        {!auntificate ? (
          <nav>
            <ul className="nav__links">
              <li>
                <button type="button" onClick={steamAuth}>
                  Войти
                </button>
              </li>
              <li>
                <Link to="/info"> Информация</Link>
              </li>
              <li>
                <Link to="/addPost">Найти тиммейта</Link>
               </li>
            </ul>
          </nav>
        ) : (
          <Link to="/profile">
            <button type="button">Профиль твой</button>
          </Link>
        )}
      </div>
    </div>
  );
}
