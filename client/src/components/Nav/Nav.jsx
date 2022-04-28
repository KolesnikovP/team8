/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import style from './style.css';

export default function Nav() {
  return (
    <div>
      <div className="navBar">
        <img width="100px" className="logo" src="img/pngwing.com.png" alt="" />
        <nav>
          <ul className="nav__links">
            <li>
              <Link to="/"> Домой</Link>
            </li>
            <li>
              <Link to="/login"> Логин</Link>
            </li>
            <li>
              <Link to="/registration"> Регистрация</Link>
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
