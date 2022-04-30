/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import style from './Nav.module.css';

export default function Nav({ user }) {
  const steam = () => {
    window.open('http://localhost:4000/auth/steam', '_self');
  };
  const logout = () => {
    window.open('http://localhost:4000/auth/logout', '_self');
  };
  return (
    <div>
      <div className={style.navBar}>
        <Link to="/">
          <img width="100px" className="logo" src="/img/pngwing.com.png" alt="" />
        </Link>
        {!user ? (
          <nav>
            <ul className={style.nav__links}>
              <li>
                <Link to="/login">
                  <button onClick={steam} className={style.mainNavButton} type="button">
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
            </ul>
          </nav>
        ) : (
          <ul className="list">
            <li className="listItem">
              <img src={user.photos[0].value} alt="" className="avatar" />
            </li>
            <li>
              <Link to="/addPost">
                <button className={style.mainNavButton} type="button">
                  Найти тиммейта
                </button>
              </Link>
            </li>
            <li className="listItem">{user.displayName}</li>
            <button onClick={logout} className={style.mainNavButton} type="button">
              Выйти
            </button>
          </ul>
        )}
      </div>
    </div>
  );
}
