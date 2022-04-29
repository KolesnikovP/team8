/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import style from './Nav.module.css';

export default function Nav() {
  return (
    <div>
      <div className={style.navBar}>
        <Link to="/">
          <img width="100px" className="logo" src="/img/pngwing.com.png" alt="" />
        </Link>
        <nav>
          <ul className={style.nav__links}>
            <li>
              <Link to="/login">
                <button className={style.mainNavButton} type="button">
                  Войти
                </button>
              </Link>
            </li>
            <li>
              <Link to="/info">
                <button className={style.mainNavButton} type="button">
                  Информация
                </button>
              </Link>
            </li>
            <li>
              <Link to="/addPost">
                <button className={style.mainNavButton} type="button">
                  Найти тиммейта
                </button>
              </Link>
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
