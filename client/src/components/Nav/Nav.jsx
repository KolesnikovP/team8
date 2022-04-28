/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import style from './style.css';

export default function Nav() {

  return (
    <div>
      <div className="navBar">
        <Link to="/">
          <img width="100px" className="logo" src="img/pngwing.com.png" alt="" />
        </Link>
        <nav>
          <ul className="nav__links">
            <li>
              <Link to="/http://localhost:4000/api/auth/steam">Войти</Link>
            </li>
            <li>
              <Link to="/info"> Информация</Link>
            </li>
          </ul>
        </nav>
        <Link to="/profile">
          <button type="button">Профиль твой</button>
        </Link>
      </div>
    </div>
  );
}
